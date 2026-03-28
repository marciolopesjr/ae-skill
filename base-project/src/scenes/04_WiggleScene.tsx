import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { noise2D } from '@remotion/noise';

export const WiggleScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const t = frame / fps; // OBRIGATÓRIO: normalizar por fps
  const frequency = 1;
  const amplitude = 150;

  const wX = noise2D('x-seed', t * frequency, 0) * amplitude;
  const wY = noise2D('y-seed', t * frequency, 0) * amplitude;

  return (
    <AbsoluteFill style={{ backgroundColor: '#111827', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ padding: 20, color: '#374151', fontFamily: 'Inter', position: 'absolute', top: 50 }}>
        Wiggle Contínuo (@remotion/noise)
      </div>

      <div style={{
        width: 150,
        height: 150,
        backgroundColor: '#10B981',
        borderRadius: '25%',
        transform: `translate(${wX}px, ${wY}px)`,
        boxShadow: `0 0 50px rgba(16, 185, 129, 0.5)`
      }} />
    </AbsoluteFill>
  );
};
