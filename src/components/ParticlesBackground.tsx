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
            value: ["#c084fc", "#f472b6", "#fb7185"],
          },
          move: {
            speed: 1,
          },
          opacity: {
            value: 0.5,
          },
          size: {
            value: 3,
          },
          number: {
            value: 80,
          },
        },
      }}
      className="absolute inset-0 -z-10"
    />
  );
};
