# Notas de renderização com GPU Intel no Linux

## Status

O Remotion 4 oferece suporte a encode acelerado por hardware no Linux via NVENC, o que exige GPU NVIDIA. GPUs integradas Intel não são atendidas pelo caminho `--hardware-acceleration` do Remotion no momento em que esta nota foi escrita.

Para iGPUs Intel, trate aceleração como duas frentes separadas:

1. Renderização de frames no Chromium: tentar usar um backend OpenGL nativo para cenas pesadas em WebGL.
2. Encode no FFmpeg: usar um pipeline VA-API ou QSV separado depois que o Remotion renderizar os frames.

## Caminho Chromium / WebGL

Use Chrome for Testing e force um backend GL do Chromium:

```bash
npx remotion render MasterShowcase out/master-showcase.mp4 \
  --chrome-mode=chrome-for-testing \
  --gl=angle-egl \
  --enable-multiprocess-on-linux \
  --log=verbose
```

Se `angle-egl` ficar instável em uma pilha de driver Intel específica, teste estes valores em ordem:

```bash
--gl=egl
--gl=angle
--gl=vulkan
```

Verifique com logs verbosos do Remotion e `intel_gpu_top` durante o render. Para diagnóstico no nível do navegador fora do Remotion, rode Chromium ou Chrome com as mesmas flags GL/VA-API e inspecione `chrome://gpu`.

## Render padrão da skill

O comando de render padrão desta skill é:

```bash
npm run render
```

Ele renderiza uma sequência de imagens PNG via Remotion, armazena frames em RAM quando `/dev/shm` é gravável, codifica a sequência com FFmpeg VA-API usando modo QP constante e depois muxa o áudio AAC mixado pelo Remotion quando a composição tem áudio na timeline.

## Armazenamento de frames em RAM

Por padrão, o script usa:

```bash
/dev/shm/remotion-vaapi-${COMPOSITION}
```

Se `/dev/shm` não estiver disponível, o fallback é:

```bash
out/intel-vaapi-frames-${COMPOSITION}
```

Em máquinas com 8 GB de RAM, mantenha os frames abaixo de 2 GB em renders de rotina e abaixo de 3 GB apenas em benchmarks controlados. Use `KEEP_FRAMES=1` somente para debug ou benchmark; caso contrário, o script apaga os frames temporários após um encode bem-sucedido.

## Encode Intel VA-API

```bash
chmod +x scripts/render-intel-vaapi-preview.sh
npm run render
```

Overrides úteis:

```bash
COMPOSITION=ApplePromo OUTPUT=out/apple-promo-vaapi.mp4 ./scripts/render-intel-vaapi-preview.sh
VAAPI_DEVICE=/dev/dri/renderD129 VAAPI_QP=18 ./scripts/render-intel-vaapi-preview.sh
REMOTION_GL=egl ./scripts/render-intel-vaapi-preview.sh
FRAME_DIR=/dev/shm/remotion-vaapi-debug KEEP_FRAMES=1 ./scripts/render-intel-vaapi-preview.sh
INCLUDE_AUDIO=0 ./scripts/render-intel-vaapi-preview.sh
```

Na máquina Linux Intel testada localmente, VA-API aceitou apenas CQP para encode H.264. Opções baseadas em bitrate falharam com `Driver does not support any RC mode compatible with selected options (supported modes: CQP)`.

## Mixagem de áudio

O render de frames roda intencionalmente com `--muted`. O áudio é renderizado como um arquivo AAC separado por `scripts/render-audio.cjs`, que chama a API programática `renderMedia({ codec: 'aac' })` do Remotion. Assim, o Remotion continua responsável pela mixagem da timeline, incluindo offsets de `<Sequence>`, trims, volume animado, playback rate e múltiplas faixas.

Para validar a mixagem de áudio sem a etapa de vídeo VA-API:

```bash
npm run render:audio -- AudioReactive out/audio-reactive.aac
```

O MP4 final é muxado sem recomprimir nenhum dos streams:

```bash
ffmpeg -i video-only.mp4 -i mixed.aac \
  -map 0:v:0 -map 1:a:0 \
  -c:v copy -c:a copy -shortest \
  out/final.mp4
```

Não muxe `public/audio.mp3` diretamente em `MasterShowcase`: essa composição inicia a cena reativa a áudio mais tarde na timeline. Use `INCLUDE_AUDIO=0` apenas para benchmarks somente de vídeo ou renders intencionalmente mudos.

## Checagens de driver

Instale e rode:

```bash
vainfo
ffmpeg -hide_banner -encoders | rg 'h264_vaapi|hevc_vaapi|h264_qsv|hevc_qsv'
ls -l /dev/dri/renderD*
```

Em Intel, VA-API geralmente precisa do driver de mídia iHD em hardware mais novo ou do driver i965 em hardware mais antigo. O FFmpeg consegue criar devices VA-API a partir de um nó DRM de render, como `/dev/dri/renderD128`; QSV no Linux pode derivar de VA-API.

O usuário Linux que roda o render precisa ter permissão para abrir o nó de render. Em muitas distribuições isso significa pertencer aos grupos `render` e/ou `video`, seguido de uma nova sessão de login.

## Variante QSV

Se o FFmpeg tiver suporte a Intel Quick Sync, teste este encoder depois de renderizar a sequência de frames:

```bash
ffmpeg -hide_banner -y \
  -init_hw_device qsv=hw,child_device=/dev/dri/renderD128 \
  -filter_hw_device hw \
  -framerate 30 \
  -i /dev/shm/remotion-vaapi-MasterShowcase/element-%04d.png \
  -c:v h264_qsv \
  -b:v 12M \
  out/master-showcase-qsv.mp4
```

O suporte a QSV depende de como o FFmpeg foi compilado (`libvpl`/MediaSDK) e da pilha de mídia Intel instalada. VA-API é o primeiro caminho Intel Linux a validar porque é mais fácil de inspecionar com `vainfo`.

## Override nativo de FFmpeg no Remotion

O Remotion expõe um hook de override do FFmpeg nas APIs de renderer, mas a documentação oficial avisa que isso é uma rota de escape instável. Use somente depois que o pipeline por sequência de frames provar que VA-API/QSV justifica a complexidade. Um override direto precisa lidar com as fases de encode e mux do Remotion e pode quebrar em atualizações de patch do Remotion.

## Fontes

- Aceleração por hardware no Remotion: https://www.remotion.dev/docs/hardware-acceleration
- Flag GL do Chromium no Remotion: https://www.remotion.dev/docs/chromium-flags
- Flags de render CLI do Remotion: https://www.remotion.dev/docs/cli/render
- Notas de VA-API no Chromium: https://chromium.googlesource.com/chromium/src/+/refs/heads/main/docs/gpu/vaapi.md
- Opções de hardware device do FFmpeg: https://ffmpeg.org/ffmpeg.html
- Guia Intel Linux Media Framework: https://www.intel.com/content/www/us/en/developer/articles/guide/open-source-media-framework-get-started-guide.html
