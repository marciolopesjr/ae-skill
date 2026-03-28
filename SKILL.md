---
name: remotion-autonomous-agent
description: Base de conhecimento ontológica para geração autônoma de vídeos com Remotion + React
---
# Remotion AI Agent Skill
> Base de conhecimento ontológica para geração autônoma de vídeos com Remotion + React

## 1. IDENTIDADE DO AGENTE

Você é um **motion designer sênior operando via código**. Seu equivalente humano domina Adobe After Effects, mas você trabalha 100% em React + Remotion. Nunca gere pseudo-código ou explicações — apenas código funcional, renderizável, sem erros de importação.

---

## 2. MAPEAMENTO CONCEITUAL: After Effects → Remotion

| After Effects | Remotion | Comportamento |
|---|---|---|
| Composition | `<Composition />` | Define `id`, `fps`, `durationInFrames`, `width`, `height`, `defaultProps` |
| Pre-comp / In-Out | `<Sequence from={N} durationInFrames={N}>` | Barreira de renderização isolada — componentes só são avaliados no DOM quando visíveis |
| Null Object (parenting) | `<AbsoluteFill>` wrapper + CSS `transform` | Hierarquia DOM herda transformações do pai |
| Track Matte (Alpha/Luma) | CSS `mask-image` / SVG `<clipPath>` | Mascaramento via luminância ou canal alfa |
| Keyframes | `interpolate(frame, [in, out], [v1, v2], opts)` | Mapeamento declarativo tempo → valor visual |
| `wiggle(freq, amp)` | `@remotion/noise` → `noise2D(seed, freq * t)` | Ruído de gradiente contínuo (Simplex/Perlin), nunca aleatório puro |
| `loopOut("cycle")` | `interpolate()` com `extrapolateRight: 'wrap'` | Repetição cíclica de domínio |
| Easy Ease | `Easing.bezier(0.25, 0.1, 0.25, 1.0)` | Curva cúbica de Bézier — SEMPRE usar, nunca interpolação linear |
| Bounce/inertia | `spring({ frame, fps, config: { mass, stiffness, damping } })` | Física elástica determinística |

---

## 3. HOOKS FUNDAMENTAIS

```tsx
const frame = useCurrentFrame();           // frame absoluto atual
const { fps, durationInFrames, width, height } = useVideoConfig();
```

**REGRA:** `useCurrentFrame()` NUNCA pode ser chamado dentro do componente raiz que contém `<CameraMotionBlur>`. Abstraia a animação em um componente filho.

---

## 4. INTERPOLAÇÃO — REGRAS DE USO

```tsx
import { interpolate, Easing } from 'remotion';

// Estrutura obrigatória: (valor, [entrada], [saída], opções)
const opacity = interpolate(frame, [0, 30], [0, 1], {
  extrapolateLeft: 'clamp',   // SEMPRE clamp para evitar overflow
  extrapolateRight: 'clamp',  // SEMPRE clamp para valores que param
  easing: Easing.bezier(0.25, 0.1, 0.25, 1.0), // NUNCA linear
});
```

### Modalidades de Extrapolação

| Modalidade | Uso |
|---|---|
| `clamp` | **Padrão obrigatório** para opacidade, escala, rotações com parada definida |
| `extend` | Trajetórias que saem da tela continuamente sem ponto de parada |
| `wrap` | Ciclos infinitos — equivalente a `loopOut("cycle")` |
| `identity` | Debug ou funções de tempo complexas aninhadas |

### Curvas de Bézier por Intenção

```tsx
Easing.bezier(0.25, 0.1, 0.25, 1.0)  // Ease In-Out padrão — uso geral
Easing.bezier(0.4, 0.0, 0.2, 1.0)    // Material Design — UI moderna
Easing.bezier(0.8, 0.22, 0.96, 0.65) // Impacto dramático / inércia / gravidade
Easing.bezier(0.0, 0.0, 0.2, 1.0)    // Deceleration — entrada de elementos
Easing.bezier(0.4, 0.0, 1.0, 1.0)    // Acceleration — saída de elementos
```

---

## 5. SPRING PHYSICS — QUANDO E COMO USAR

**Palavras-chave no prompt que ATIVAM spring:** `salto`, `elástico`, `orgânico`, `surgimento dinâmico`, `bounce`, `interface de app`, `transição natural`.

```tsx
import { spring, useCurrentFrame, useVideoConfig } from 'remotion';

const frame = useCurrentFrame();
const { fps } = useVideoConfig();

const scale = spring({
  frame,
  fps,
  config: {
    mass: 1,         // massa do objeto (maior = mais lento/pesado)
    stiffness: 100,  // rigidez da mola (maior = mais rápido)
    damping: 10,     // amortecimento (menor = mais oscilações)
  },
  durationInFrames: 45, // CRÍTICO: garante assentamento no tempo exato
});
// Retorna 0→1. Multiplique pelo valor alvo: scale * 1.2 + 0
```

---

## 6. WIGGLE — IMPLEMENTAÇÃO CORRETA

```tsx
import { noise2D } from '@remotion/noise';
import { useCurrentFrame, useVideoConfig } from 'remotion';

const frame = useCurrentFrame();
const { fps } = useVideoConfig();

const t = frame / fps; // OBRIGATÓRIO: normalizar por fps

const x = noise2D('seed-x', t * frequency, 0) * amplitude;
const y = noise2D('seed-y', t * frequency, 0) * amplitude;
// Seeds únicas por eixo garantem movimentos independentes
```

**Para grids/oceanos de pontos (noise3D):**
```tsx
import { noise3D } from '@remotion/noise';
const value = noise3D('seed', x / gridSize, y / gridSize, t); // t = tempo
```

---

## 7. HIERARQUIA ESPACIAL (Null Object Pattern)

```tsx
import { AbsoluteFill } from 'remotion';
import { makeTransform, translateX, translateY, scale, rotate } from '@remotion/animation-utils';

// Wrapper age como Null Object — controla filhos
<AbsoluteFill style={{
  transform: makeTransform([
    translateX(panX),
    translateY(panY),
    scale(zoom),
    rotate(angle), // ORDEM IMPORTA no CSS transform
  ])
}}>
  {/* todos os filhos herdam as transformações */}
  <Scene1 />
  <Scene2 />
</AbsoluteFill>
```

---

## 8. COMPOSITING E MASCARAMENTO

```tsx
// Alpha Matte básico (fade direcional)
<div style={{
  maskImage: 'linear-gradient(to right, transparent, black)',
  WebkitMaskImage: 'linear-gradient(to right, transparent, black)',
}} />

// Clip path geométrico animado
<div style={{
  clipPath: `polygon(0 0, ${progress * 100}% 0, ${progress * 100}% 100%, 0 100%)`,
}} />
```

### ⚠️ ALERTA ANTI-FLICKER (regra crítica de produção)

**NUNCA** usar `background-image` CSS ou `mask-image` com URLs para imagens renderizadas.

**SEMPRE** usar o componente `<Img>` do Remotion para qualquer imagem:
```tsx
import { Img, staticFile } from 'remotion';
<Img src={staticFile('foto.jpg')} /> // Remotion aguarda carregamento antes de avançar o frame
// CSS background-image NÃO aguarda — gera frames em branco na exportação
```

---

## 9. MOTION BLUR

```tsx
import { CameraMotionBlur } from '@remotion/motion-blur';

// REGRA: useCurrentFrame() NUNCA dentro do mesmo componente que CameraMotionBlur
const MyScene = () => {
  return (
    <CameraMotionBlur
      shutterAngle={180}  // 180° = padrão cinematográfico 24fps
      // 90-45° = ação/esporte (estroboscópico)
      // 270-360° = fluido/espectral/sonho
      samples={8}         // 5-10 é o range aceitável (qualidade vs performance)
    >
      <AnimatedChild /> {/* animação fica aqui, ISOLADA */}
    </CameraMotionBlur>
  );
};

const AnimatedChild = () => {
  const frame = useCurrentFrame(); // OK aqui dentro
  // ...
};
```

---

## 10. SVG PATHS ANIMADOS

```tsx
import { evolvePath, interpolatePath } from '@remotion/paths';

// Trim Paths (desenhar progressivamente)
const progress = interpolate(frame, [0, 60], [0, 1], { extrapolateRight: 'clamp' });
const { strokeDasharray, strokeDashoffset } = evolvePath(progress, pathD);
<path d={pathD} strokeDasharray={strokeDasharray} strokeDashoffset={strokeDashoffset} />

// Path Morphing (transformar uma forma em outra)
const morphed = interpolatePath(progress, pathA, pathB);
<path d={morphed} />
```

---

## 11. ÁUDIO

```tsx
import { Audio, staticFile } from 'remotion';

<Audio
  src={staticFile('trilha.mp3')}
  trimBefore={30}   // corta silêncio inicial (em frames)
  trimAfter={120}   // corta cauda (em frames)
  volume={(f) =>    // fade in/out programático
    interpolate(f, [0, 20, 100, 120], [0, 1, 1, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  }
/>
```

---

## 12. 3D COM REACT THREE FIBER

```tsx
import { ThreeCanvas } from '@remotion/three';
import { useVideoTexture } from '@remotion/three'; // preview
// import { useOffthreadVideoTexture } from '@remotion/three'; // EXPORTAÇÃO (pixel-perfect)

// remotion.config.ts — OBRIGATÓRIO para AWS/servidores sem GPU
Config.setChromiumOpenGlRenderer('angle');
```

---

## 13. ESQUEMA JSON DE COMPOSIÇÃO

Estrutura para geração autônoma via LLM (evita alucinação de código):

```json
{
  "metadata": {
    "fps": 30,
    "width": 1920,
    "height": 1080,
    "durationInFrames": 300
  },
  "scenes": [
    {
      "id": "intro",
      "from": 0,
      "durationInFrames": 90,
      "components": [
        {
          "type": "Text",
          "props": { "text": "Hello World", "fontSize": 80 },
          "animation": {
            "property": "opacity",
            "keyframes": [0, 30],
            "values": [0, 1],
            "easing": "easeInOut",
            "extrapolate": "clamp"
          }
        }
      ]
    }
  ],
  "camera": {
    "pan": { "x": 0, "y": 0 },
    "zoom": 1.0
  }
}
```

---

## 14. REGRAS DE VALIDAÇÃO — CHECKLIST PRÉ-OUTPUT

Antes de gerar qualquer código Remotion, verificar:

- [ ] Todas as imagens usam `<Img>` (não `<img>` ou `background-image`)
- [ ] Todo `interpolate()` tem `extrapolateLeft` e `extrapolateRight` definidos
- [ ] Nenhuma interpolação linear (sempre usar `easing: Easing.bezier(...)`)
- [ ] `useCurrentFrame()` não está no mesmo nível que `<CameraMotionBlur>`
- [ ] `spring()` tem `durationInFrames` definido se houver sequenciamento preciso
- [ ] Seeds do `noise2D/noise3D` são strings únicas por propriedade
- [ ] Imports são do pacote correto (`remotion`, `@remotion/noise`, etc.)
- [ ] Nenhum `Math.random()` (não-determinístico — quebra renderização frame-a-frame)

---

## 15. MÓDULOS ESPECIALIZADOS (carregar sob demanda)

| Domínio | Arquivo | Ativar quando |
|---|---|---|
| Animações 3D | `rules/3d.md` | "3D", "tridimensional", "câmera orbital", "WebGL" |
| Spring/interpolação | `rules/animations.md` | "elástico", "bounce", "curva", "física" |
| Tipografia dinâmica | `rules/measuring-text.md` | Texto gerado por dados, overflow, safe zones |
| Imagens | `rules/images.md` | Qualquer mídia estática |
| Áudio reativo | `rules/audio.md` | "sincronizar com música", "EQ visual", "batida" |

---

## 16. ANTI-PADRÕES — NUNCA FAZER

```tsx
// ❌ Aleatório não-determinístico
const x = Math.random() * 100;

// ❌ Imagem via CSS
<div style={{ backgroundImage: 'url(foto.jpg)' }} />

// ❌ useCurrentFrame no pai do motion blur
const Parent = () => {
  const frame = useCurrentFrame(); // ERRO
  return <CameraMotionBlur><Child /></CameraMotionBlur>;
};

// ❌ Interpolação linear (robótica)
interpolate(frame, [0, 30], [0, 1]) // sem easing = movimento mecânico

// ❌ spring sem durationInFrames em sequências
spring({ frame, fps, config: {...} }) // duração imprevisível
```
