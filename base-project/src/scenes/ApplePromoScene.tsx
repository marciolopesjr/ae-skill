import {
  AbsoluteFill,
  Easing,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { CameraMotionBlur } from '@remotion/motion-blur';
import { noise2D } from '@remotion/noise';
import { makeTransform, rotate, scale, translateX, translateY } from '@remotion/animation-utils';
import { Aperture, Command, Layers3, Sparkles, WandSparkles, Zap } from 'lucide-react';

const EASE_APPLE = Easing.bezier(0.16, 1, 0.3, 1);
const CANVAS_WIDTH = 1920;
const CANVAS_HEIGHT = 1080;
const INTRO_END_FRAME = 145;
const PRODUCT_REVEAL_FRAME = 120;
const FEATURE_START_FRAME = 248;
const FINALE_START_FRAME = 455;
const SPRING_DURATION_IN_FRAMES = 72;
const SHEEN_DURATION_IN_FRAMES = 130;
const FLOAT_FREQUENCY = 0.42;
const FLOAT_AMPLITUDE = 10;

const colors = {
  white: '#ffffff',
  ink: '#111111',
  graphite: '#252525',
  midGray: '#6f6f6f',
  softGray: '#e9e9ed',
  hairline: '#d9d9df',
  blue: '#007aff',
  cyan: '#62d6ff',
  violet: '#8f5cff',
  pink: '#ff4f9a',
  green: '#30d158',
};

const fontStack =
  'Inter, SF Pro Display, SF Pro Text, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif';

const fade = (frame: number, inputRange: [number, number, number, number]) => {
  return interpolate(frame, inputRange, [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: EASE_APPLE,
  });
};

const reveal = (frame: number, inputRange: [number, number], outputRange = [0, 1]) => {
  return interpolate(frame, inputRange, outputRange, {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: EASE_APPLE,
  });
};

const SoftWhiteStage: React.FC = () => {
  const frame = useCurrentFrame();
  const ambientShift = noise2D('apple-white-stage-shift', frame / 180, 0) * 10;

  return (
    <AbsoluteFill style={{ backgroundColor: colors.white, overflow: 'hidden' }}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, #ffffff 0%, #fbfbfd 42%, #f4f5f7 100%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 210 + ambientShift,
          top: 120,
          width: 1500,
          height: 760,
          background:
            'radial-gradient(circle at 50% 42%, rgba(0,122,255,0.10), rgba(255,255,255,0) 58%)',
          filter: 'blur(42px)',
          opacity: 0.9,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 220,
          right: 220,
          bottom: 112,
          height: 2,
          background:
            'linear-gradient(90deg, rgba(255,255,255,0), rgba(17,17,17,0.12), rgba(255,255,255,0))',
          filter: 'blur(1px)',
        }}
      />
    </AbsoluteFill>
  );
};

const ProductMonogram: React.FC<{ frameOffset: number }> = ({ frameOffset }) => {
  const frame = useCurrentFrame() - frameOffset;
  const { fps } = useVideoConfig();
  const coreScale = spring({
    frame,
    fps,
    config: {
      mass: 1,
      stiffness: 90,
      damping: 18,
    },
    durationInFrames: SPRING_DURATION_IN_FRAMES,
  });
  const ringRotate = reveal(frame, [20, 150], [0, 42]);
  const sparkOpacity = fade(frame, [70, 100, 170, 215]);

  return (
    <div
      style={{
        position: 'relative',
        width: 430,
        height: 430,
        transform: makeTransform([scale(coreScale)]),
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 34,
          borderRadius: 108,
          background:
            'linear-gradient(145deg, rgba(255,255,255,0.98), rgba(238,240,245,0.92))',
          border: `1px solid ${colors.hairline}`,
          boxShadow:
            '0 34px 86px rgba(34, 37, 45, 0.13), inset 0 1px 0 rgba(255,255,255,0.98)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 72,
          borderRadius: 82,
          background:
            'conic-gradient(from 210deg, #007aff, #62d6ff, #8f5cff, #ff4f9a, #30d158, #007aff)',
          opacity: 0.98,
          transform: makeTransform([rotate(ringRotate, 'deg')]),
          boxShadow: '0 24px 58px rgba(0, 122, 255, 0.20)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 91,
          borderRadius: 70,
          background:
            'linear-gradient(160deg, rgba(255,255,255,0.95), rgba(246,247,250,0.82))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,1)',
        }}
      >
        <Command size={102} strokeWidth={1.35} color={colors.ink} />
      </div>
      <Sparkles
        size={38}
        color={colors.violet}
        style={{
          position: 'absolute',
          right: 56,
          top: 58,
          opacity: sparkOpacity,
          filter: 'drop-shadow(0 18px 25px rgba(143,92,255,0.25))',
        }}
      />
    </div>
  );
};

const FloatingLayer: React.FC<{
  delay: number;
  title: string;
  caption: string;
  icon: React.ReactNode;
  accentColor: string;
  x: number;
  y: number;
}> = ({ delay, title, caption, icon, accentColor, x, y }) => {
  const frame = useCurrentFrame();
  const localFrame = frame - delay;
  const { fps } = useVideoConfig();
  const timeInSeconds = frame / fps;
  const layerOpacity = fade(localFrame, [0, 24, 120, 152]);
  const layerY = reveal(localFrame, [0, 48], [36, 0]);
  const floatX = noise2D(`${title}-float-x`, timeInSeconds * FLOAT_FREQUENCY, 0) * FLOAT_AMPLITUDE;
  const floatY = noise2D(`${title}-float-y`, timeInSeconds * FLOAT_FREQUENCY, 0) * FLOAT_AMPLITUDE;

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: 336,
        height: 138,
        opacity: layerOpacity,
        transform: makeTransform([translateX(floatX), translateY(layerY + floatY)]),
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 34,
          background: 'rgba(255,255,255,0.76)',
          border: `1px solid ${colors.hairline}`,
          boxShadow:
            '0 22px 52px rgba(38, 42, 52, 0.10), inset 0 1px 0 rgba(255,255,255,0.98)',
          backdropFilter: 'blur(18px)',
          padding: 28,
          display: 'grid',
          gridTemplateColumns: '54px 1fr',
          columnGap: 20,
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: 54,
            height: 54,
            borderRadius: 18,
            background: accentColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: `0 18px 34px ${accentColor}40`,
          }}
        >
          {icon}
        </div>
        <div>
          <div
            style={{
              fontSize: 25,
              lineHeight: 1,
              fontWeight: 720,
              color: colors.ink,
              letterSpacing: 0,
              marginBottom: 9,
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 16,
              lineHeight: 1.28,
              fontWeight: 520,
              color: colors.midGray,
              letterSpacing: 0,
            }}
          >
            {caption}
          </div>
        </div>
      </div>
    </div>
  );
};

const IntroTypography: React.FC = () => {
  const frame = useCurrentFrame();
  const headlineOpacity = fade(frame, [0, 28, 108, INTRO_END_FRAME]);
  const headlineY = reveal(frame, [0, 56], [34, 0]);
  const subheadOpacity = fade(frame, [22, 48, 112, INTRO_END_FRAME]);

  return (
    <AbsoluteFill
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        opacity: headlineOpacity,
        transform: makeTransform([translateY(headlineY)]),
      }}
    >
      <div
        style={{
          fontSize: 88,
          lineHeight: 0.94,
          fontWeight: 780,
          color: colors.ink,
          letterSpacing: 0,
          textAlign: 'center',
          maxWidth: 980,
        }}
      >
        Motion design,
        <br />
        engineered.
      </div>
      <div
        style={{
          marginTop: 34,
          fontSize: 27,
          lineHeight: 1.22,
          fontWeight: 520,
          color: colors.midGray,
          letterSpacing: 0,
          textAlign: 'center',
          opacity: subheadOpacity,
          maxWidth: 760,
        }}
      >
        After Effects discipline. Remotion precision.
      </div>
    </AbsoluteFill>
  );
};

const ProductReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const localFrame = frame - PRODUCT_REVEAL_FRAME;
  const groupOpacity = reveal(localFrame, [0, 36]);
  const finaleLift = reveal(frame, [FINALE_START_FRAME - 10, FINALE_START_FRAME + 78], [0, -205]);
  const finaleScale = reveal(frame, [FINALE_START_FRAME - 10, FINALE_START_FRAME + 78], [1, 0.62]);
  const groupY = reveal(localFrame, [0, 76], [52, 0]) + finaleLift;
  const productScale = spring({
    frame: localFrame,
    fps: 30,
    config: {
      mass: 1.15,
      stiffness: 76,
      damping: 17,
    },
    durationInFrames: 88,
  });
  const floorScale = reveal(localFrame, [18, 86], [0.78, 1]);

  return (
    <AbsoluteFill
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        opacity: groupOpacity,
        transform: makeTransform([translateY(groupY)]),
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: 546,
          top: 742,
          width: 828,
          height: 96,
          borderRadius: '50%',
          background:
            'radial-gradient(ellipse at center, rgba(28,31,38,0.18), rgba(28,31,38,0.06) 46%, rgba(255,255,255,0) 72%)',
          filter: 'blur(12px)',
          transform: makeTransform([scale(floorScale)]),
        }}
      />
      <div style={{ transform: makeTransform([scale((0.72 + productScale * 0.28) * finaleScale)]) }}>
        <ProductMonogram frameOffset={PRODUCT_REVEAL_FRAME} />
      </div>
    </AbsoluteFill>
  );
};

const FeaturePass: React.FC = () => {
  const frame = useCurrentFrame();
  const localFrame = frame - FEATURE_START_FRAME;
  const titleOpacity = fade(localFrame, [0, 24, 154, 186]);
  const titleY = reveal(localFrame, [0, 58], [22, 0]);

  return (
    <AbsoluteFill>
      <div
        style={{
          position: 'absolute',
          left: 676,
          top: 132,
          width: 568,
          textAlign: 'center',
          opacity: titleOpacity,
          transform: makeTransform([translateY(titleY)]),
        }}
      >
        <div
          style={{
            fontSize: 56,
            lineHeight: 1,
            fontWeight: 760,
            color: colors.ink,
            letterSpacing: 0,
          }}
        >
          Built frame by frame.
        </div>
        <div
          style={{
            marginTop: 18,
            fontSize: 22,
            lineHeight: 1.28,
            fontWeight: 520,
            color: colors.midGray,
            letterSpacing: 0,
          }}
        >
          Deterministic animation with cinematic control.
        </div>
      </div>

      <FloatingLayer
        delay={FEATURE_START_FRAME + 22}
        title="Keyframes"
        caption="Bezier timing with exact frame control."
        accentColor={colors.blue}
        x={235}
        y={350}
        icon={<Aperture size={27} color={colors.white} strokeWidth={1.8} />}
      />
      <FloatingLayer
        delay={FEATURE_START_FRAME + 54}
        title="Compositing"
        caption="Masks, mattes and layered depth."
        accentColor={colors.violet}
        x={1348}
        y={332}
        icon={<Layers3 size={28} color={colors.white} strokeWidth={1.8} />}
      />
      <FloatingLayer
        delay={FEATURE_START_FRAME + 86}
        title="Dynamics"
        caption="Springs, noise and organic motion."
        accentColor={colors.pink}
        x={310}
        y={666}
        icon={<Zap size={29} color={colors.white} strokeWidth={1.8} />}
      />
      <FloatingLayer
        delay={FEATURE_START_FRAME + 116}
        title="Automation"
        caption="Parametric renders without drift."
        accentColor={colors.green}
        x={1280}
        y={668}
        icon={<WandSparkles size={28} color={colors.white} strokeWidth={1.8} />}
      />
    </AbsoluteFill>
  );
};

const Finale: React.FC = () => {
  const frame = useCurrentFrame();
  const localFrame = frame - FINALE_START_FRAME;
  const finaleOpacity = reveal(localFrame, [0, 44]);
  const headlineY = reveal(localFrame, [0, 72], [38, 0]);
  const shineX = reveal(localFrame, [50, 50 + SHEEN_DURATION_IN_FRAMES], [-360, 520]);

  return (
    <AbsoluteFill
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        opacity: finaleOpacity,
      }}
    >
      <div
        style={{
          position: 'relative',
          width: 760,
          height: 128,
          overflow: 'hidden',
          transform: makeTransform([translateY(150 + headlineY)]),
        }}
      >
        <div
          style={{
            fontSize: 84,
            lineHeight: 1,
            fontWeight: 800,
            color: colors.ink,
            letterSpacing: 0,
            textAlign: 'center',
          }}
        >
          AE Skill Pro
        </div>
        <div
          style={{
            position: 'absolute',
            top: -12,
            left: 0,
            width: 220,
            height: 144,
            background:
              'linear-gradient(100deg, rgba(255,255,255,0), rgba(255,255,255,0.92), rgba(255,255,255,0))',
            transform: makeTransform([translateX(shineX), rotate(8, 'deg')]),
            mixBlendMode: 'screen',
          }}
        />
      </div>
      <div
        style={{
          marginTop: 154,
          fontSize: 28,
          lineHeight: 1.2,
          fontWeight: 540,
          color: colors.midGray,
          letterSpacing: 0,
          textAlign: 'center',
        }}
      >
        Production motion for autonomous agents.
      </div>
    </AbsoluteFill>
  );
};

const ApplePromoTimeline: React.FC = () => {
  return (
    <>
      <Sequence durationInFrames={INTRO_END_FRAME + 24}>
        <IntroTypography />
      </Sequence>
      <ProductReveal />
      <FeaturePass />
      <Finale />
    </>
  );
};

export const ApplePromoScene: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        width: CANVAS_WIDTH,
        height: CANVAS_HEIGHT,
        backgroundColor: colors.white,
        fontFamily: fontStack,
      }}
    >
      <SoftWhiteStage />
      <CameraMotionBlur samples={6} shutterAngle={90}>
        <ApplePromoTimeline />
      </CameraMotionBlur>
    </AbsoluteFill>
  );
};
