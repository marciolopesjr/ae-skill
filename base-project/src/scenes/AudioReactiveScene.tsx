import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  Audio,
  staticFile,
} from 'remotion';
import { useAudioData, visualizeAudio } from '@remotion/media-utils';

export const AudioReactiveScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  
  // Áudio estático para teste (Coloque um arquivo audio.mp3 na pasta public)
  const audioSrc = staticFile('audio.mp3');
  const audioData = useAudioData(audioSrc);

  if (!audioData) {
    return <AbsoluteFill style={{ backgroundColor: '#000' }} />;
  }

  // Visualização: 16 barras
  const visualization = visualizeAudio({
    fps,
    frame,
    audioData,
    numberOfSamples: 16,
  });

  return (
    <AbsoluteFill style={{ 
      backgroundColor: '#050505', 
      justifyContent: 'center', 
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'row',
      gap: 10
    }}>
      <Audio src={audioSrc} />
      
      {visualization.map((v, i) => {
        return (
          <div
            key={i}
            style={{
              width: 40,
              height: 500 * v,
              backgroundColor: `hsl(${200 + i * 10}, 80%, 60%)`,
              borderRadius: 20,
              boxShadow: `0 0 30px hsla(${200 + i * 10}, 80%, 50%, 0.5)`,
              // Efeito de "glow" reativo
              filter: `brightness(${1 + v})`,
            }}
          />
        );
      })}
      
      <div style={{
        position: 'absolute',
        bottom: 100,
        color: 'white',
        fontFamily: 'Inter',
        fontSize: 32,
        fontWeight: 600,
        opacity: 0.5
      }}>
        Audio Reactive Dynamics
      </div>
    </AbsoluteFill>
  );
};
