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
import { makeTransform, translateY, scale, rotate } from '@remotion/animation-utils';
import { Code2, BrainCircuit, Wand2, Atom, Zap, Layers, Sparkles } from 'lucide-react';

// --- Sub-components para cada "Princípio" ---

const NullObjectApple: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  // Hierarquia: Parent -> Child
  const parentScale = spring({ frame, fps, config: { damping: 12 } });
  const childRotate = interpolate(frame, [0, 60], [0, 45], { easing: Easing.out(Easing.quad) });
  
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
  const maskProgress = interpolate(frame, [0, 40], [0, 100], { extrapolateRight: 'clamp', easing: Easing.inOut(Easing.ease) });
  
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
  const nx = noise2D('x', frame * 0.05, 0) * 20;
  const ny = noise2D('y', frame * 0.05, 0) * 20;
  
  return (
    <div style={{ transform: `translate(${nx}px, ${ny}px)` }}>
       <Sparkles size={80} color="#F472B6" />
    </div>
  );
};

const SpringApple: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const jump = spring({ frame, fps, config: { stiffness: 200, damping: 10 } });
  
  return (
    <div style={{ transform: `translateY(${interpolate(jump, [0, 1], [0, -100])}px)` }}>
       <Zap size={80} color="#FBBF24" fill="#FBBF24" />
    </div>
  );
};

// --- Main Scene ---

export const ApplePromoScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: '#000', fontFamily: 'Inter, -apple-system, sans-serif' }}>
      <CameraMotionBlur samples={12} shutterAngle={180}>
        
        {/* Intro: O conceito de "Bridging Worlds" */}
        <Sequence from={0} durationInFrames={120}>
           <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
              <h1 style={{ 
                fontSize: 80, fontWeight: 700, color: 'white', opacity: interpolate(frame, [0, 30, 90, 120], [0, 1, 1, 0]) 
              }}>
                AE Principles. <span style={{ color: '#666' }}>Now in Code.</span>
              </h1>
           </AbsoluteFill>
        </Sequence>

        {/* 1. Null Objects & Hierarchy */}
        <Sequence from={110} durationInFrames={100}>
          <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', gap: 40, opacity: interpolate(frame - 110, [0, 20, 80, 100], [0, 1, 1, 0]) }}>
             <NullObjectApple />
             <div style={{ textAlign: 'left' }}>
                <Layers color="#38BDF8" size={32} />
                <h2 style={{ color: 'white', fontSize: 40 }}>Null Objects</h2>
                <p style={{ color: '#94A3B8' }}>Perfect hierarchical transform propagation.</p>
             </div>
          </AbsoluteFill>
        </Sequence>

        {/* 2. Track Mattes & Masking */}
        <Sequence from={200} durationInFrames={100}>
          <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', gap: 40, opacity: interpolate(frame - 200, [0, 20, 80, 100], [0, 1, 1, 0]) }}>
             <TrackMatteApple />
             <div style={{ textAlign: 'left' }}>
                <Code2 color="#A78BFA" size={32} />
                <h2 style={{ color: 'white', fontSize: 40 }}>Track Mattes</h2>
                <p style={{ color: '#94A3B8' }}>Dynamic clipPath-based alpha masking.</p>
             </div>
          </AbsoluteFill>
        </Sequence>

        {/* 3. Wiggle & Noise */}
        <Sequence from={290} durationInFrames={100}>
          <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', gap: 40, opacity: interpolate(frame - 290, [0, 20, 80, 100], [0, 1, 1, 0]) }}>
             <WiggleApple />
             <div style={{ textAlign: 'left' }}>
                <Sparkles color="#F472B6" size={32} />
                <h2 style={{ color: 'white', fontSize: 40 }}>Wiggle & Noise</h2>
                <p style={{ color: '#94A3B8' }}>Deterministic noise2D for organic life.</p>
             </div>
          </AbsoluteFill>
        </Sequence>

        {/* 4. Spring Dynamics */}
        <Sequence from={380} durationInFrames={100}>
          <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', gap: 40, opacity: interpolate(frame - 380, [0, 20, 80, 100], [0, 1, 1, 0]) }}>
             <SpringApple />
             <div style={{ textAlign: 'left' }}>
                <Zap color="#FBBF24" size={32} />
                <h2 style={{ color: 'white', fontSize: 40 }}>Spring Physics</h2>
                <p style={{ color: '#94A3B8' }}>Physically accurate elastic interactions.</p>
             </div>
          </AbsoluteFill>
        </Sequence>

        {/* Finale: The Logo / Brand Reveal */}
        <Sequence from={470} durationInFrames={180}>
           <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', opacity: interpolate(frame - 470, [0, 30], [0, 1]) }}>
              <div style={{ 
                width: 200, height: 200, borderRadius: 50, 
                background: 'linear-gradient(45deg, #00C9FF, #92FE9D)',
                boxShadow: '0 0 100px rgba(0, 201, 255, 0.4)',
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                transform: `scale(${spring({ frame: frame - 470, fps, config: { damping: 12 } })})`
              }}>
                <BrainCircuit size={120} color="white" />
              </div>
              <h1 style={{ color: 'white', marginTop: 40, fontSize: 60, fontWeight: 800 }}>AE SKILL PRO</h1>
              <p style={{ color: '#666' }}>Engineered by Antigravity</p>
           </AbsoluteFill>
        </Sequence>

      </CameraMotionBlur>
    </AbsoluteFill>
  );
};
