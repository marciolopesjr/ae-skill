import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Easing,
  Img,
  staticFile,
} from 'remotion';
import {
  makeTransform,
  translateX,
  translateY,
  scale,
  rotate,
} from '@remotion/animation-utils';
import { noise2D } from '@remotion/noise';

export const AnimatedChild: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ====== 1. WIGGLE - Ruído contínuo ======
  const t = frame / fps;
  const frequency = 0.5;
  const amplitude = 50;
  
  // Seeds únicas por eixo para Wiggle (Simplex noise, Não usar Math.random)
  const wiggleX = noise2D('seed-wiggle-x', t * frequency, 0) * amplitude;
  const wiggleY = noise2D('seed-wiggle-y', t * frequency, 0) * amplitude;

  // ====== 2. SPRING PHYSICS - Objeto principal ======
  const elasticScale = spring({
    frame: frame - 15, // Delay de 15 frames
    fps,
    config: {
      mass: 1,
      stiffness: 100,
      damping: 10,
    },
    durationInFrames: 60, // Senta em exatos 60 frames (DETERMINISTICO)
  });

  // ====== 3. INTERPOLAÇÃO COM EXTRAPOLATE CLAMP e BÉZIER ======
  const slideInX = interpolate(frame, [0, 30], [-500, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.25, 0.1, 0.25, 1.0), // Ease In-Out
  });

  const fadeOutAndCycle = interpolate(frame, [0, 60], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'wrap', // emulando loopOut("cycle") do After Effects
  });

  return (
    // Null Object Hierárquico
    <AbsoluteFill
      style={{
        transform: makeTransform([
          translateX(slideInX + wiggleX),
          translateY(wiggleY),
          scale(elasticScale),
          rotate(0), 
        ]),
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: 500,
          height: 500,
          backgroundColor: '#ff4c4c',
          borderRadius: 40,
          position: 'relative',
          overflow: 'hidden',
          // Alpha Matte via CSS maskImage (anti-flicker e determinístico)
          clipPath: `polygon(0 0, ${fadeOutAndCycle * 100}% 0, ${fadeOutAndCycle * 100}% 100%, 0 100%)`
        }}
      >
        <span style={{ 
          color: 'white', 
          fontSize: 60, 
          position: 'absolute', 
          top: '40%', 
          left: '20%',
          fontFamily: 'sans-serif'
        }}>
          DETERMINISMO
        </span>

        {/* 
          Usar Img para imagens externas! 
          Isso previne frames em branco durante a renderização (Anti-flicker)
          <Img src={staticFile('foto.jpg')} style={{ width: '100%' }} /> 
        */}
      </div>
    </AbsoluteFill>
  );
};
