import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
  interpolate,
} from 'remotion';

// Como o Skia está com "Acesso Negado" no Windows do usuário,
// vamos usar uma abordagem de Shader via CSS/SVG que funciona em qualquer lugar.
// Um gradiente animado ultra-complexo que simula um shader.

export const ShaderDemoScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  
  // Coordenadas animadas para os "blobs" do shader
  const t = frame * 0.02;
  const x1 = 50 + 20 * Math.sin(t);
  const y1 = 50 + 20 * Math.cos(t * 0.8);
  const x2 = 50 + 25 * Math.sin(t * 1.2 + 2);
  const y2 = 50 + 25 * Math.cos(t * 0.9 + 1);

  return (
    <AbsoluteFill style={{ backgroundColor: '#000' }}>
      
      {/* O "Shader" Fake: Gradientes Radiais Dinâmicos */}
      <div style={{
        width: '100%',
        height: '100%',
        background: `
          radial-gradient(circle at ${x1}% ${y1}%, #38BDF8 0%, transparent 40%),
          radial-gradient(circle at ${x2}% ${y2}%, #A78BFA 0%, transparent 45%),
          radial-gradient(circle at ${100 - x1}% ${100 - y2}%, #F472B6 0%, transparent 35%)
        `,
        // O Blending é o segredo do look "Shader"
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
