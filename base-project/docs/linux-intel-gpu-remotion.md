# Linux Intel GPU Rendering Notes

## Status

Remotion 4 supports hardware-accelerated encoding on Linux through NVENC, which requires an NVIDIA GPU. Intel integrated GPUs are not supported by Remotion's `--hardware-acceleration` path at the time this note was written.

For Intel iGPUs, treat acceleration as two separate concerns:

1. Chromium frame rendering: try to use a native OpenGL backend for WebGL-heavy scenes.
2. FFmpeg encoding: use a separate VA-API or QSV pipeline after Remotion has rendered frames.

## Chromium / WebGL Path

Use Chrome for Testing and force a Chromium GL backend:

```bash
npx remotion render MasterShowcase out/master-showcase.mp4 \
  --chrome-mode=chrome-for-testing \
  --gl=angle-egl \
  --enable-multiprocess-on-linux \
  --log=verbose
```

If `angle-egl` is unstable on a given Intel driver stack, test these values in order:

```bash
--gl=egl
--gl=angle
--gl=vulkan
```

Verify with verbose Remotion logs and `intel_gpu_top` while rendering. For browser-level diagnosis outside Remotion, run Chromium or Chrome with the same GL/VA-API flags and inspect `chrome://gpu`.

## Default Skill Render

The default render command for this skill is:

```bash
npm run render
```

It renders a PNG image sequence via Remotion, stores frames in RAM when `/dev/shm` is writable, encodes the image sequence with FFmpeg VA-API using constant QP mode, then muxes Remotion's mixed AAC audio when the composition has timeline audio.

## RAM Frame Store

By default, the script uses:

```bash
/dev/shm/remotion-vaapi-${COMPOSITION}
```

If `/dev/shm` is unavailable, it falls back to:

```bash
out/intel-vaapi-frames-${COMPOSITION}
```

For machines with 8 GB RAM, keep frame storage under 2 GB for routine renders and under 3 GB only for controlled benchmarks. Use `KEEP_FRAMES=1` only when debugging or benchmarking; otherwise the script deletes the temporary frames after a successful encode.

## Intel VA-API Encoding

```bash
chmod +x scripts/render-intel-vaapi-preview.sh
npm run render
```

Useful overrides:

```bash
COMPOSITION=ApplePromo OUTPUT=out/apple-promo-vaapi.mp4 ./scripts/render-intel-vaapi-preview.sh
VAAPI_DEVICE=/dev/dri/renderD129 VAAPI_QP=18 ./scripts/render-intel-vaapi-preview.sh
REMOTION_GL=egl ./scripts/render-intel-vaapi-preview.sh
FRAME_DIR=/dev/shm/remotion-vaapi-debug KEEP_FRAMES=1 ./scripts/render-intel-vaapi-preview.sh
INCLUDE_AUDIO=0 ./scripts/render-intel-vaapi-preview.sh
```

On the local Linux Intel setup tested here, VA-API only accepted CQP for H.264 encode. Bitrate-based options failed with `Driver does not support any RC mode compatible with selected options (supported modes: CQP)`.

## Audio Mixing

The frame render intentionally runs with `--muted`. Audio is rendered as a separate AAC file by `scripts/render-audio.cjs`, which calls Remotion's programmatic `renderMedia({ codec: 'aac' })` API. This keeps Remotion responsible for timeline mixing, including `<Sequence>` offsets, trims, animated volume, playback rate, and multiple audio tracks.

To validate audio mixing without the VA-API video step:

```bash
npm run render:audio -- AudioReactive out/audio-reactive.aac
```

The final MP4 is muxed without recompressing either stream:

```bash
ffmpeg -i video-only.mp4 -i mixed.aac \
  -map 0:v:0 -map 1:a:0 \
  -c:v copy -c:a copy -shortest \
  out/final.mp4
```

Do not mux `public/audio.mp3` directly into `MasterShowcase`: that composition starts the audio-reactive scene later in the timeline. Use `INCLUDE_AUDIO=0` only for video-only benchmarks or intentionally silent renders.

## Driver Checks

Install and run:

```bash
vainfo
ffmpeg -hide_banner -encoders | rg 'h264_vaapi|hevc_vaapi|h264_qsv|hevc_qsv'
ls -l /dev/dri/renderD*
```

For Intel, VA-API generally needs the iHD media driver on newer hardware or the i965 driver on older hardware. FFmpeg can create VA-API devices from a DRM render node such as `/dev/dri/renderD128`; QSV on Linux can derive from VA-API.

The Linux user running the render must have permission to open the render node. On many distributions this means membership in the `render` and/or `video` groups, followed by a fresh login session.

## QSV Variant

If FFmpeg has Intel Quick Sync support, test this encoder after rendering the frame sequence:

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

QSV support depends on how FFmpeg was built (`libvpl`/MediaSDK) and on the installed Intel media stack. VA-API is the first Linux Intel path to validate because it is easier to inspect with `vainfo`.

## Native Remotion FFmpeg Override

Remotion exposes an FFmpeg override hook in renderer APIs, but the official docs warn that this is an unstable escape hatch. Use it only after the frame-sequence pipeline proves that VA-API/QSV is worth the complexity. A direct override must handle both Remotion's encoding and muxing phases and can break on patch-level Remotion updates.

## Sources

- Remotion hardware acceleration: https://www.remotion.dev/docs/hardware-acceleration
- Remotion Chromium GL flag: https://www.remotion.dev/docs/chromium-flags
- Remotion render CLI flags: https://www.remotion.dev/docs/cli/render
- Chromium VA-API notes: https://chromium.googlesource.com/chromium/src/+/refs/heads/main/docs/gpu/vaapi.md
- FFmpeg hardware device options: https://ffmpeg.org/ffmpeg.html
- Intel Linux media framework guide: https://www.intel.com/content/www/us/en/developer/articles/guide/open-source-media-framework-get-started-guide.html
