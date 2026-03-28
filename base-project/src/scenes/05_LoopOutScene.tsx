import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from 'remotion';

export const LoopOutScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Ciclo infinito (emula loopOut("cycle") extrapolando os valores via wrap)
  const rotatingAngle = interpolate(frame, [0, 60], [0, 360], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'wrap', // Repetição cíclica!
    easing: Easing.bezier(0.25, 0.1, 0.25, 1.0)
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#09090B', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ color: '#D4D4D8', fontFamily: 'Inter', position: 'absolute', top: 50 }}>
        loopOut("cycle") com 'wrap' Extrapolation
      </div>

      {/* Rotação cíclica */}
      <div style={{
        width: 150,
        height: 150,
        border: '10px solid #EAB308',
        borderRadius: 20,
        transform: `rotate(${rotatingAngle}deg)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ width: 20, height: 20, backgroundColor: 'white', position: 'absolute', top: -10 }} />
      </div>

    </AbsoluteFill>
  );
};
