import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from 'remotion';

export const TrackMatteScene: React.FC = () => {
  const frame = useCurrentFrame();

  const progress = interpolate(frame, [10, 50], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.25, 0.1, 0.25, 1.0)
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#0F172A', justifyContent: 'center', alignItems: 'center' }}>
      
      {/* Background Element (O que será revelado) */}
      <div style={{
        position: 'absolute',
        fontSize: 100,
        fontWeight: 900,
        fontFamily: 'Inter, sans-serif',
        background: 'linear-gradient(90deg, #00C9FF 0%, #92FE9D 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}>
        REVELAÇÃO FLUIDA
      </div>

      {/* Camada superior com CLIP PATH geométrico (Alpha Matte destrutivo) */}
      <AbsoluteFill style={{
        backgroundColor: '#0F172A',
        // Revela a imagem movendo o limite do clipPath do começo para o fim da tela (em eixo X)
        clipPath: `polygon(${progress}% 0, 100% 0, 100% 100%, ${progress}% 100%)`
      }}>
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ color: '#334155', fontSize: 100, fontWeight: 900, fontFamily: 'Inter, sans-serif' }}>
            ESCONDIDO EMBAIXO
          </div>
        </AbsoluteFill>
      </AbsoluteFill>

    </AbsoluteFill>
  );
};
