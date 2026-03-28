import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { Canvas } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, ContactShadows } from '@react-three/drei';

const Scene3D: React.FC = () => {
    const frame = useCurrentFrame();
    
    // Rotação baseada nos frames para o Three.js
    const rotation = frame * 0.05;

    return (
        <group rotation={[rotation * 0.5, rotation, 0]}>
            <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                {/* O "Cérebro" da Skill em 3D (Simbolizado por uma esfera distorcida) */}
                <Sphere args={[1, 100, 100]}>
                    <MeshDistortMaterial
                        color="#38BDF8"
                        speed={5}
                        distort={0.4}
                        radius={1}
                    />
                </Sphere>
            </Float>
            <ContactShadows 
                position={[0, -2, 0]} 
                opacity={0.4} 
                scale={10} 
                blur={2} 
                far={4.5} 
            />
        </group>
    );
};

export const ThreeDShowcaseScene: React.FC = () => {
    return (
        <AbsoluteFill style={{ backgroundColor: '#000' }}>
            {/* O Remotion funciona perfeitamente com Canvas do React Three Fiber */}
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={2} color="#fff" />
                <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#A78BFA" />
                
                <Scene3D />
                
            </Canvas>

            {/* Overlay de Texto Apple-Style */}
            <AbsoluteFill style={{ 
                justifyContent: 'center', 
                alignItems: 'center', 
                pointerEvents: 'none' 
            }}>
                <h1 style={{ 
                    color: 'white', 
                    fontSize: 80, 
                    fontWeight: 900, 
                    letterSpacing: '-0.04em',
                    textShadow: '0 0 40px rgba(56, 189, 248, 0.4)'
                }}>
                    3D DIMENSION
                </h1>
                <p style={{ color: '#666', fontSize: 24 }}>Native WebGL x Remotion Integration</p>
            </AbsoluteFill>
        </AbsoluteFill>
    );
};
