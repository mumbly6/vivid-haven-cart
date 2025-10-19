import { useCallback } from "react";
import Particles from "react-tsparticles";
import type { Engine } from "tsparticles-engine";
import { loadStarsPreset } from "tsparticles-preset-stars";

export const ParticlesBackground = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadStarsPreset(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        preset: "stars",
        background: {
          opacity: 0,
        },
        particles: {
          color: {
            value: "#a855f7",
          },
          move: {
            speed: 0.5,
          },
          opacity: {
            value: 0.3,
          },
          size: {
            value: 2,
          },
          number: {
            value: 50,
          },
        },
      }}
      className="absolute inset-0 -z-10"
    />
  );
};
