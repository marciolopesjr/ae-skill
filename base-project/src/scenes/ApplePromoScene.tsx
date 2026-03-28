import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  Easing,
  Sequence,
  spring,
} from 'remotion';
import { CameraMotionBlur } from '@remotion/motion-blur';
import { makeTransform, translateY, scale } from '@remotion/animation-utils';
import { Code, BrainCircuit, Wand2, Atom } from 'lucide-react';

const TitleSlide: React.FC<{ text: string; delay?: number }> = ({ text, delay = 0 }) => {
  const frame = useCurrentFrame();
  
  // Apple-style fade up and out
  const opacity = interpolate(frame, [delay, delay + 30, delay + 90, delay + 120], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.4, 0.0, 0.2, 1.0)
  });

  const yPos = interpolate(frame, [delay, delay + 40], [40, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.0, 0.0, 0.2, 1.0) // Deceleration
  });

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', opacity }}>
      <h1 style={{
        fontFamily: 'Inter, -apple-system, sans-serif',
        fontSize: 100,
        fontWeight: 600,
        letterSpacing: '-0.04em',
        color: '#F8FAFC',
        transform: `translateY(${yPos}px)`,
        textShadow: '0 10px 30px rgba(0,0,0,0.5)'
      }}>
        {text}
      </h1>
    </AbsoluteFill>
  );
};

const IconShowcase: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Glassmorphism Container Appearance
  const containerScale = spring({ frame, fps, config: { damping: 12 }, durationInFrames: 60 });
  const containerOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' });

  // Floating Icons With Spring
  const icons = [
    { Icon: Code, color: '#38BDF8', label: '100% Código', delay: 20 },
    { Icon: BrainCircuit, color: '#A78BFA', label: 'Ontológico', delay: 30 },
    { Icon: Wand2, color: '#F472B6', label: 'No UI Magic', delay: 40 },
    { Icon: Atom, color: '#34D399', label: 'Zero Math.random', delay: 50 },
  ];

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
      <div style={{
        display: 'flex',
        gap: 60,
        padding: '60px 100px',
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        borderRadius: 40,
        border: '1px solid rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px)', // Glassmorphism
        opacity: containerOpacity,
        transform: makeTransform([scale(containerScale), translateY(interpolate(frame, [0, 30], [50, 0], {extrapolateRight: 'clamp', easing: Easing.bezier(0,0,0.2,1)}))]),
      }}>
        {icons.map(({ Icon, color, label, delay }, i) => {
          const iconScale = spring({ frame: frame - delay, fps, config: { stiffness: 120, damping: 10 } });
          return (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, transform: `scale(${iconScale})` }}>
              <div style={{
                width: 120, height: 120, borderRadius: 30,
                background: `linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.0))`,
                border: `1px solid ${color}40`,
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                boxShadow: `0 0 40px ${color}20`
              }}>
                <Icon size={64} color={color} strokeWidth={1.5} />
              </div>
              <span style={{ color: '#94A3B8', fontFamily: 'Inter', fontSize: 24, fontWeight: 500 }}>{label}</span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

const FinaleGlow: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, config: { damping: 14 } });
  
  // Apple Glow Effect
  const glowPulse = interpolate(frame, [30, 90], [0.5, 1], { extrapolateRight: 'clamp', easing: Easing.bezier(0.25, 0.1, 0.25, 1) });

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
      <div style={{
        transform: `scale(${entrance}) translateY(${(- (1 - entrance) * 100)}px)`,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20
      }}>
        <div style={{
          position: 'absolute', width: 400, height: 400,
          background: 'linear-gradient(135deg, #00C9FF 0%, #92FE9D 100%)',
          filter: `blur(${100 * glowPulse}px)`,
          opacity: 0.3 * glowPulse,
          borderRadius: 200,
          zIndex: 0
        }} />
        
        <h1 style={{
          fontFamily: 'Inter, -apple-system, sans-serif', fontSize: 130, fontWeight: 800,
          letterSpacing: '-0.05em', margin: 0, zIndex: 1,
          background: 'linear-gradient(to right, #FFF, #A1A1AA)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>
          Remotion Agent
        </h1>
        <p style={{
          fontFamily: 'Inter', fontSize: 32, color: '#71717A', zIndex: 1, margin: 0, fontWeight: 400,
          letterSpacing: '0.02em'
        }}>
          The ultimate autonomous motion design standard.
        </p>
      </div>
    </AbsoluteFill>
  );
};

export const ApplePromoScene: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#000' }}>
      <CameraMotionBlur samples={8} shutterAngle={180}>
        
        {/* Intro */}
        <Sequence from={0} durationInFrames={150}>
          <TitleSlide text="O fim do After Effects." />
        </Sequence>
        
        {/* Secondary Intro */}
        <Sequence from={120} durationInFrames={150}>
          <TitleSlide text="Bem-vindo ao Design Determinístico." />
        </Sequence>

        {/* Feature Icons */}
        <Sequence from={240} durationInFrames={180}>
          <IconShowcase />
        </Sequence>

        {/* Finale */}
        <Sequence from={400} durationInFrames={200}>
          <FinaleGlow />
        </Sequence>

      </CameraMotionBlur>
    </AbsoluteFill>
  );
};
