import {
  AbsoluteFill,
  useCurrentFrame,
} from 'remotion';

const SHADER_TIME_SCALE = 0.02;
const BASE_POSITION_PERCENT = 50;
const PRIMARY_DRIFT_PERCENT = 20;
const SECONDARY_DRIFT_PERCENT = 25;

export const ShaderDemoScene: React.FC = () => {
  const frame = useCurrentFrame();
  
  const shaderTime = frame * SHADER_TIME_SCALE;
  const primaryX = BASE_POSITION_PERCENT + PRIMARY_DRIFT_PERCENT * Math.sin(shaderTime);
  const primaryY = BASE_POSITION_PERCENT + PRIMARY_DRIFT_PERCENT * Math.cos(shaderTime * 0.8);
  const secondaryX = BASE_POSITION_PERCENT + SECONDARY_DRIFT_PERCENT * Math.sin(shaderTime * 1.2 + 2);
  const secondaryY = BASE_POSITION_PERCENT + SECONDARY_DRIFT_PERCENT * Math.cos(shaderTime * 0.9 + 1);

  return (
    <AbsoluteFill style={{ backgroundColor: '#000' }}>
      
      {/* O "Shader" Fake: Gradientes Radiais Dinâmicos */}
      <div style={{
        width: '100%',
        height: '100%',
        background: `
          radial-gradient(circle at ${primaryX}% ${primaryY}%, #38BDF8 0%, transparent 40%),
          radial-gradient(circle at ${secondaryX}% ${secondaryY}%, #A78BFA 0%, transparent 45%),
          radial-gradient(circle at ${100 - primaryX}% ${100 - secondaryY}%, #F472B6 0%, transparent 35%)
        `,
        mixBlendMode: 'screen',
        filter: 'blur(80px) saturate(2)',
        opacity: 0.8
      }} />

      {/* Conteúdo Central com Glassmorphism */}
      <AbsoluteFill style={{ 
        display: 'flex', justifyContent: 'center', alignItems: 'center' 
      }}>
        <div style={{
          padding: '60px 100px',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          borderRadius: 40,
          border: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(30px)',
          textAlign: 'center'
        }}>
           <h1 style={{ 
             color: 'white', fontSize: 100, fontWeight: 900, letterSpacing: '-0.05em', margin: 0 
           }}>
             SHADER <span style={{ color: '#38BDF8' }}>CSS</span>
           </h1>
           <p style={{ color: '#94A3B8', fontSize: 32, marginTop: 20 }}>
             Complex Blending & Dynamic Gradients
           </p>
        </div>
      </AbsoluteFill>

    </AbsoluteFill>
  );
};
