import { Composition, Sequence } from 'remotion';
import { NullObjectScene } from './scenes/01_NullObjectScene';
import { TrackMatteScene } from './scenes/02_TrackMatteScene';
import { KeyframesEaseScene } from './scenes/03_KeyframesEaseScene';
import { WiggleScene } from './scenes/04_WiggleScene';
import { LoopOutScene } from './scenes/05_LoopOutScene';
import { BounceSpringScene } from './scenes/06_BounceSpringScene';
import { MotionBlurScene } from './scenes/07_MotionBlurScene';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="E01-NullObject"
        component={NullObjectScene}
        durationInFrames={120}
        fps={30}
        width={1920}
        height={1080}
      />
      
      <Composition
        id="E02-TrackMatte"
        component={TrackMatteScene}
        durationInFrames={120}
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="E03-KeyframesEase"
        component={KeyframesEaseScene}
        durationInFrames={90}
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="E04-Wiggle"
        component={WiggleScene}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="E05-LoopOut"
        component={LoopOutScene}
        durationInFrames={300} // Cíclico
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="E06-BounceSpring"
        component={BounceSpringScene}
        durationInFrames={90}
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="E07-MotionBlur"
        component={MotionBlurScene}
        durationInFrames={120}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* 
        A Master Compilation (Emulando "Sequences") 
        1. Pre-comp / In-Out usando <Sequence from={N} durationInFrames={N}> 
      */}
      <Composition
        id="MasterShowcase"
        durationInFrames={840} // 120 + 120 + 90 + 300 + 300(loopOut override?) etc..
        fps={30}
        width={1920}
        height={1080}
        component={() => (
          <>
            <Sequence from={0} durationInFrames={120}>
              <NullObjectScene />
            </Sequence>
            <Sequence from={120} durationInFrames={120}>
              <TrackMatteScene />
            </Sequence>
            <Sequence from={240} durationInFrames={90}>
              <KeyframesEaseScene />
            </Sequence>
            <Sequence from={330} durationInFrames={120}>
              <WiggleScene />
            </Sequence>
            <Sequence from={450} durationInFrames={120}>
              <LoopOutScene />
            </Sequence>
            <Sequence from={570} durationInFrames={90}>
              <BounceSpringScene />
            </Sequence>
            <Sequence from={660} durationInFrames={120}>
              <MotionBlurScene />
            </Sequence>
          </>
        )}
      />
    </>
  );
};
