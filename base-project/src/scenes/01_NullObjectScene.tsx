import { AbsoluteFill } from 'remotion';
import { makeTransform, translateX, translateY, scale, rotate } from '@remotion/animation-utils';

export const NullObjectScene: React.FC = () => {
  // Simulando controladores vindos de props ou hook
  const panX = 100;
  const panY = 50;
  const zoom = 1.2;
  const angle = 15;

  return (
    <AbsoluteFill style={{ backgroundColor: '#0A0A0A', justifyContent: 'center', alignItems: 'center' }}>
      
      {/* WRAPPER = NULL OBJECT */}
      <AbsoluteFill
        style={{
          transform: makeTransform([
            translateX(panX),
            translateY(panY),
            scale(zoom),
            rotate(angle, 'deg'),
          ]),
          justifyContent: 'center', 
          alignItems: 'center'
        }}
      >
        <div style={{
          padding: 40,
          background: 'linear-gradient(135deg, #FF3366 0%, #FF9933 100%)',
          borderRadius: 30,
          boxShadow: '0 20px 40px rgba(255, 51, 102, 0.3)'
        }}>
          <h1 style={{ fontFamily: 'Inter, sans-serif', color: 'white', margin: 0, fontSize: 60, fontWeight: 800 }}>
            Herdando do Pai (Null)
          </h1>
        </div>
      </AbsoluteFill>
      
    </AbsoluteFill>
  );
};
