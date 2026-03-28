import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from 'remotion';
import { CameraMotionBlur } from '@remotion/motion-blur';

const AnimatedChild: React.FC = () => {
  const frame = useCurrentFrame(); // OK AQUI (Longe do CameraMotionBlur)

  const fastMovement = interpolate(frame, [10, 40, 70], [-500, 500, -500], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.25, 0.1, 0.25, 1.0)
  });

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
      <div style={{
        width: 150, 
        height: 150, 
        backgroundColor: '#DC2626',
        borderRadius: 20,
        transform: `translateX(${fastMovement}px)`,
        color: 'white',
        fontWeight: 'bold',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 24,
        fontFamily: 'Inter',
        boxShadow: '0 0 50px rgba(220, 38, 38, 0.8)'
      }}>
        WOOSH
      </div>
    </AbsoluteFill>
  );
};

export const MotionBlurScene: React.FC = () => {
  // ⚠️ ERRO: Nunca chame useCurrentFrame() aqui, ou o blur dará crash ⚠️

  return (
    <AbsoluteFill style={{ backgroundColor: '#111827' }}>
      <div style={{ color: '#9CA3AF', fontFamily: 'Inter', position: 'absolute', top: 50, left: '30%' }}>
        Camera Motion Blur (180° = Padrão Filme)
      </div>

      <CameraMotionBlur
        shutterAngle={180} // 180° = Padrão cinematográfico de filme
        samples={10}       // 10 samples pra não dar engasgo de GPU
      >
        <AnimatedChild />
      </CameraMotionBlur>
    </AbsoluteFill>
  );
};
