# AE Skill: padrão autônomo de motion design

[![Remotion](https://img.shields.io/badge/Feito%20com-Remotion-blue.svg)](https://remotion.dev)
[![TypeScript](https://img.shields.io/badge/Linguagem-TypeScript-blue.svg)](https://www.typescriptlang.org/)
[![Licença: MIT](https://img.shields.io/badge/Licen%C3%A7a-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **"Convertendo a linguagem artística do After Effects na precisão do código."**

Este repositório é uma **skill de IA** especializada para orientar modelos de linguagem na criação de motion design de alto nível com **Remotion**. A skill conecta o repertório visual do After Effects com engenharia de vídeo determinística, versionável e orientada por código.

---

## Experiência "nível Apple"

Vídeo deve ser tão reproduzível quanto código. O projeto base inclui uma sequência promocional que demonstra princípios centrais de motion design com blur de movimento, física de molas e composição programática.

### Ver o showcase
- [**Showcase completo da skill (MP4)**](./base-project/out/full-showcase.mp4)
- [**Promo estilo Apple (MP4)**](./base-project/out/apple-promo.mp4)

---

## Princípios centrais: camada de tradução

Não basta "escrever código": a skill mapeia conceitos cinematográficos e ontológicos para componentes React.

| Conceito no AE | Implementação em Remotion | Ferramenta principal |
| :--- | :--- | :--- |
| **Null Objects** | Wrappers `div` pais com `makeTransform` | `@remotion/animation-utils` |
| **Track Mattes** | `clipPath` ou containers com `overflow: hidden` | CSS padrão |
| **Wiggle** | `noise2D(seed, frame)` | `@remotion/noise` |
| **Easy Ease** | `interpolate(f, [range], [output], { easing })` | `Easing.bezier` |
| **Física** | `spring({ frame, fps, config })` | Núcleo do Remotion |
| **Motion Blur** | `<CameraMotionBlur>` | `@remotion/motion-blur` |

---

## Primeiros passos

### 1. Clonar e instalar
```bash
git clone <your-repo-url>
cd ae-skill/base-project
npm install
```

### 2. Pré-visualização e render
```bash
# Iniciar o Studio
npm run dev

# Render padrão da skill: frames em RAM + Intel VA-API quando disponível
npm run render

# Fallback por CPU
npm run render:cpu
```

O render padrão armazena frames em `/dev/shm/remotion-vaapi-*` quando há armazenamento em RAM disponível, codifica com FFmpeg `h264_vaapi` usando Intel VA-API e depois muxa o áudio AAC mixado pelo Remotion. Veja [`base-project/docs/linux-intel-gpu-remotion.md`](./base-project/docs/linux-intel-gpu-remotion.md).

A base de conhecimento grande em PDF foi convertida para Markdown pesquisável em [`references/knowledge/INDEX.md`](./references/knowledge/INDEX.md). Use `rg` em `references/knowledge` antes de abrir chunks de página.

---

## Por que design determinístico?

Diferente de arquivos de vídeo tradicionais, este projeto é:

- **Amigável ao Git**: cada frame nasce de código versionável.
- **Paramétrico**: altere uma cor ou string e renderize novamente.
- **Sem drift**: nada de `Math.random()`. Sem flicker. Todo render é reprodutível.
- **Nativo para IA**: feito para agentes entenderem, modificarem e validarem.

---

## Manifesto da skill

A lógica central da skill está em [`SKILL.md`](./SKILL.md). O arquivo contém o mapeamento ontológico usado pelo agente para gerar animações em Remotion.

---

**Construído com café e cinismo por [Antigravity](https://github.com/google-deepmind).**
*"Porque se você ainda está criando keyframes manualmente em 2026, o gargalo é você."*
