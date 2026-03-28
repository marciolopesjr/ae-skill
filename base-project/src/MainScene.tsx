import { AbsoluteFill } from 'remotion';
import { CameraMotionBlur } from '@remotion/motion-blur';
import { AnimatedChild } from './AnimatedChild';

/**
 * Cena Principal.
 * Regra: NUNCA chame useCurrentFrame() no mesmo nível do CameraMotionBlur
 */
export const MainScene: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#0f0f0f' }}>
      <CameraMotionBlur
        shutterAngle={180} // 180 graus (padrão cinematográfico)
        samples={8}
      >
        <AnimatedChild />
      </CameraMotionBlur>
    </AbsoluteFill>
  );
};
