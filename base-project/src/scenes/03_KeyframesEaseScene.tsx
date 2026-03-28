import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from 'remotion';

export const KeyframesEaseScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Movimento Mecânico (Interpolação Linear Proibida - só pra contraste visual, se quiser)
  // Mas de acordo com as regras, SEMPRE usamos Bézier.
  const goodEase = interpolate(frame, [10, 60], [-400, 400], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.25, 0.1, 0.25, 1.0) // Easing padrão
  });

  const dramaticEase = interpolate(frame, [10, 60], [-400, 400], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.8, 0.22, 0.96, 0.65) // Impacto dramático (Lento pra começar, rápido no fim)
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#18181B', justifyContent: 'center', alignItems: 'center' }}>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: 60, width: '100%', alignItems: 'center' }}>
        
        {/* Good Ease */}
        <div style={{ width: 1000, position: 'relative', height: 100 }}>
          <div style={{ color: '#A1A1AA', fontFamily: 'Inter', position: 'absolute', top: -30 }}>Easing: Padrão (0.25, 0.1, 0.25, 1)</div>
          <div style={{
            width: 100, height: 100, borderRadius: 50,
            background: 'linear-gradient(135deg, #A855F7 0%, #EC4899 100%)',
            position: 'absolute',
            left: '50%',
            transform: `translateX(calc(-50% + ${goodEase}px))`,
            boxShadow: '0 10px 25px rgba(236, 72, 153, 0.5)'
          }} />
        </div>

        {/* Dramatic Ease */}
        <div style={{ width: 1000, position: 'relative', height: 100 }}>
          <div style={{ color: '#A1A1AA', fontFamily: 'Inter', position: 'absolute', top: -30 }}>Easing: Dramático (0.8, 0.22, 0.96, 0.65)</div>
          <div style={{
            width: 100, height: 100, borderRadius: 50,
            background: 'linear-gradient(135deg, #3B82F6 0%, #2DD4BF 100%)',
            position: 'absolute',
            left: '50%',
            transform: `translateX(calc(-50% + ${dramaticEase}px))`,
            boxShadow: '0 10px 25px rgba(45, 212, 191, 0.5)'
          }} />
        </div>
        
      </div>

    </AbsoluteFill>
  );
};
