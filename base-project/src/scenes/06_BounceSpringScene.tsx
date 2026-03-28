import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export const BounceSpringScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const elScale = spring({
    frame,
    fps,
    config: {
      mass: 2,         // mais pesado
      stiffness: 80,   // rigidez
      damping: 8,      // amortecimento
    },
    durationInFrames: 60, // Senta após 60 fps
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#1E1B4B', justifyContent: 'center', alignItems: 'center' }}>
      
      <div style={{ color: '#A5B4FC', fontFamily: 'Inter', position: 'absolute', top: 50 }}>
        Bounce / Inércia via Spring Physics (Garantido assentamento no durationInFrames)
      </div>

      <div style={{
        width: 250,
        height: 250,
        backgroundColor: '#4338CA',
        borderRadius: 125,
        transform: `scale(${elScale})`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 32,
        fontFamily: 'Inter',
        boxShadow: '0 20px 50px rgba(67, 56, 202, 0.6)'
      }}>
        BOUNCE
      </div>

    </AbsoluteFill>
  );
};
