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
import { noise2D } from '@remotion/noise';
import { makeTransform, scale, rotate } from '@remotion/animation-utils';
import { Code2, BrainCircuit, Zap, Layers, Sparkles } from 'lucide-react';

const EASE_STANDARD = Easing.bezier(0.25, 0.1, 0.25, 1.0);
const EASE_DECELERATE = Easing.bezier(0.0, 0.0, 0.2, 1.0);
const PRINCIPLE_DURATION_IN_FRAMES = 100;
const PRINCIPLE_FADE_IN_FRAMES = 20;
const PRINCIPLE_FADE_OUT_START = 80;
const SPRING_SETTLE_FRAMES = 60;
const WIGGLE_FREQUENCY = 1.5;
const WIGGLE_AMPLITUDE = 20;

const NullObjectApple: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const parentScale = spring({
    frame,
    fps,
    config: {
      mass: 1,
      stiffness: 120,
      damping: 12,
    },
    durationInFrames: SPRING_SETTLE_FRAMES,
  });
  const childRotate = interpolate(frame, [0, SPRING_SETTLE_FRAMES], [0, 45], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: EASE_DECELERATE,
  });
  
  return (
    <div style={{ transform: makeTransform([scale(parentScale)]) }}>
       <div style={{ 
         width: 300, height: 300, border: '2px dashed rgba(255,255,255,0.2)', 
         display: 'flex', justifyContent: 'center', alignItems: 'center' 
       }}>
         <div style={{ 
           width: 150, height: 150, background: 'linear-gradient(135deg, #38BDF8, #1D4ED8)',
           borderRadius: 20, transform: makeTransform([rotate(childRotate)])
         }} />
       </div>
    </div>
  );
};

const TrackMatteApple: React.FC = () => {
  const frame = useCurrentFrame();
  const maskProgress = interpolate(frame, [0, 40], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: EASE_STANDARD,
  });
  
  return (
    <div style={{ 
      width: 400, height: 200, background: '#1e1e1e', borderRadius: 20, overflow: 'hidden',
      display: 'flex', alignItems: 'center', padding: 40, border: '1px solid rgba(255,255,255,0.1)'
    }}>
       <div style={{ 
         width: `${maskProgress}%`, height: '100%', background: 'linear-gradient(90deg, #A78BFA, #7C3AED)',
         borderRadius: 10
       }} />
       <h2 style={{ position: 'absolute', color: 'white', marginLeft: 20, mixBlendMode: 'difference' }}>MASKING</h2>
    </div>
  );
};

const WiggleApple: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const timeInSeconds = frame / fps;
  const wiggleX = noise2D('apple-wiggle-x', timeInSeconds * WIGGLE_FREQUENCY, 0) * WIGGLE_AMPLITUDE;
  const wiggleY = noise2D('apple-wiggle-y', timeInSeconds * WIGGLE_FREQUENCY, 0) * WIGGLE_AMPLITUDE;
  
  return (
    <div style={{ transform: `translate(${wiggleX}px, ${wiggleY}px)` }}>
       <Sparkles size={80} color="#F472B6" />
    </div>
  );
};

const SpringApple: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const jump = spring({
    frame,
    fps,
    config: {
      mass: 1,
      stiffness: 200,
      damping: 10,
    },
    durationInFrames: SPRING_SETTLE_FRAMES,
  });
  const jumpY = interpolate(jump, [0, 1], [0, -100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: EASE_STANDARD,
  });
  
  return (
    <div style={{ transform: `translateY(${jumpY}px)` }}>
       <Zap size={80} color="#FBBF24" fill="#FBBF24" />
    </div>
  );
};

const PrincipleSequence: React.FC<{
  from: number;
  icon: React.ReactNode;
  title: string;
  body: string;
  children: React.ReactNode;
}> = ({ from, icon, title, body, children }) => {
  const frame = useCurrentFrame();
  const sequenceFrame = frame - from;
  const opacity = interpolate(
    sequenceFrame,
    [0, PRINCIPLE_FADE_IN_FRAMES, PRINCIPLE_FADE_OUT_START, PRINCIPLE_DURATION_IN_FRAMES],
    [0, 1, 1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: EASE_STANDARD,
    }
  );

  return (
    <Sequence from={from} durationInFrames={PRINCIPLE_DURATION_IN_FRAMES}>
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', gap: 40, opacity }}>
        {children}
        <div style={{ textAlign: 'left' }}>
          {icon}
          <h2 style={{ color: 'white', fontSize: 40 }}>{title}</h2>
          <p style={{ color: '#94A3B8' }}>{body}</p>
        </div>
      </AbsoluteFill>
    </Sequence>
  );
};

const ApplePromoTimeline: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const finaleFrame = frame - 470;
  const introOpacity = interpolate(frame, [0, 30, 90, 120], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: EASE_STANDARD,
  });
  const finaleOpacity = interpolate(finaleFrame, [0, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: EASE_STANDARD,
  });
  const logoScale = spring({
    frame: finaleFrame,
    fps,
    config: {
      mass: 1,
      stiffness: 120,
      damping: 12,
    },
    durationInFrames: SPRING_SETTLE_FRAMES,
  });

  return (
    <>
      <Sequence durationInFrames={120}>
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
          <h1 style={{ fontSize: 80, fontWeight: 700, color: 'white', opacity: introOpacity }}>
            AE Principles. <span style={{ color: '#666' }}>Now in Code.</span>
          </h1>
        </AbsoluteFill>
      </Sequence>

      <PrincipleSequence
        from={110}
        icon={<Layers color="#38BDF8" size={32} />}
        title="Null Objects"
        body="Perfect hierarchical transform propagation."
      >
        <NullObjectApple />
      </PrincipleSequence>

      <PrincipleSequence
        from={200}
        icon={<Code2 color="#A78BFA" size={32} />}
        title="Track Mattes"
        body="Dynamic clipPath-based alpha masking."
      >
        <TrackMatteApple />
      </PrincipleSequence>

      <PrincipleSequence
        from={290}
        icon={<Sparkles color="#F472B6" size={32} />}
        title="Wiggle & Noise"
        body="Deterministic noise2D for organic life."
      >
        <WiggleApple />
      </PrincipleSequence>

      <PrincipleSequence
        from={380}
        icon={<Zap color="#FBBF24" size={32} />}
        title="Spring Physics"
        body="Physically accurate elastic interactions."
      >
        <SpringApple />
      </PrincipleSequence>

      <Sequence from={470} durationInFrames={180}>
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', opacity: finaleOpacity }}>
          <div style={{ 
            width: 200, height: 200, borderRadius: 50, 
            background: 'linear-gradient(45deg, #00C9FF, #92FE9D)',
            boxShadow: '0 0 100px rgba(0, 201, 255, 0.4)',
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            transform: `scale(${logoScale})`
          }}>
            <BrainCircuit size={120} color="white" />
          </div>
          <h1 style={{ color: 'white', marginTop: 40, fontSize: 60, fontWeight: 800 }}>AE SKILL PRO</h1>
          <p style={{ color: '#666' }}>Engineered by Antigravity</p>
        </AbsoluteFill>
      </Sequence>
    </>
  );
};

export const ApplePromoScene: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#000', fontFamily: 'Inter, -apple-system, sans-serif' }}>
      <CameraMotionBlur samples={12} shutterAngle={180}>
        <ApplePromoTimeline />
      </CameraMotionBlur>
    </AbsoluteFill>
  );
};
