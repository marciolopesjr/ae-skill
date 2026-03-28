import { Composition } from 'remotion';
import { MainScene } from './MainScene';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MainShowcase"
        component={MainScene}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
    </>
  );
};
