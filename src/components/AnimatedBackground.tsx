import { useEffect, useRef } from "react";

export const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fogRef = useRef<HTMLDivElement | null>(null);
  const planetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    let W = canvas.width;
    let H = canvas.height;

    let mouseX = 0.5;
    let mouseY = 0.5;
    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX / W;
      mouseY = e.clientY / H;
    });

    const layers = [
      { count: 120, speed: 0.12 },
      { count: 90, speed: 0.2 },
      { count: 75, speed: 0.35 },
    ];

    const stars: { x: number; y: number; r: number; tw: number; layer: number }[] = [];

    layers.forEach((l, idx) => {
      for (let i = 0; i < l.count; i++) {
        stars.push({
          x: Math.random() * W,
          y: Math.random() * H,
          r: Math.random() * (idx === 2 ? 2.5 : 1.3) + 0.4,
          tw: Math.random() * 0.8 + 0.2,
          layer: idx,
        });
      }
    });

    const flareStars = Array.from({ length: 3 }).map(() => ({
      x: Math.random() * W,
      y: Math.random() * H,
      glow: Math.random() * 90 + 65,
      pulse: Math.random() * 0.002 + 0.001,
    }));

    const asteroids = Array.from({ length: 4 }).map(() => ({
      x: Math.random() * W,
      y: Math.random() * H,
      speed: Math.random() * 0.35 + 0.12,
      size: Math.random() * 7 + 4,
      angle: Math.random() * Math.PI * 2,
      rot: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.006,
    }));

    const drawBg = () => {
      ctx.fillStyle = "rgb(0, 0, 5)";
      ctx.fillRect(0, 0, W, H);
    };

    const drawStars = () => {
      stars.forEach((s) => {
        const dx = (mouseX - 0.5) * layers[s.layer].speed * 35;
        const dy = (mouseY - 0.5) * layers[s.layer].speed * 35;

        const opacity = 0.22 + Math.sin(Date.now() * 0.0015 * s.tw) * 0.2;
        ctx.fillStyle = `rgba(255,255,255,${opacity})`;
        ctx.beginPath();
        ctx.arc(s.x + dx, s.y + dy, s.r, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const drawLensFlare = () => {
      flareStars.forEach((s) => {
        const pulse = 0.7 + Math.sin(Date.now() * s.pulse) * 0.3;

        const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.glow);
        g.addColorStop(0, `rgba(255,255,255,${0.4 * pulse})`);
        g.addColorStop(0.4, `rgba(255,255,255,${0.15 * pulse})`);
        g.addColorStop(1, "rgba(255,255,255,0)");

        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
      });
    };

    const drawAsteroids = () => {
      asteroids.forEach((a) => {
        ctx.save();
        ctx.translate(a.x, a.y);
        ctx.rotate(a.rot);
        ctx.fillStyle = "rgb(150,150,150)";
        ctx.beginPath();
        ctx.ellipse(0, 0, a.size, a.size * 0.55, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        a.x += Math.cos(a.angle) * a.speed;
        a.y += Math.sin(a.angle) * a.speed;
        a.rot += a.rotSpeed;

        if (a.x < -60) a.x = W + 60;
        if (a.x > W + 60) a.x = -60;
        if (a.y < -60) a.y = H + 60;
        if (a.y > H + 60) a.y = -60;
      });
    };

    const loop = () => {
      drawBg();
      drawStars();
      drawLensFlare();
      drawAsteroids();
      requestAnimationFrame(loop);
    };

    loop();

    window.addEventListener("resize", () => {
      resize();
      W = canvas.width;
      H = canvas.height;
    });

    // Fog scroll effect
    window.addEventListener("scroll", () => {
      if (fogRef.current) {
        fogRef.current.style.opacity = (0.1 + window.scrollY / 2500).toString();
      }
    });
  }, []);

  return (
    <>
      {/* Canvas Stars/Asteroids */}
      <canvas ref={canvasRef} className="fixed inset-0 -z-10 pointer-events-none" />

      {/* Space Fog */}
      <div
        ref={fogRef}
        className="fixed inset-0 -z-20 pointer-events-none"
        style={{
          backgroundImage: "url('https://i.ibb.co/Z6sR6fG/nebula.png')",
          backgroundSize: "cover",
          opacity: 0.13,
          filter: "blur(6px)",
          mixBlendMode: "screen",
          transition: "opacity .3s ease-out",
        }}
      />

      {/* Giant planet */}
      <div
        ref={planetRef}
        className="fixed bottom-[-140px] right-[-200px] -z-30 pointer-events-none"
        style={{
          width: "700px",
          height: "700px",
          borderRadius: "50%",
          background: "radial-gradient(circle at 40% 40%, #0a0a12 25%, #000 70%)",
          opacity: 0.55,
          filter: "blur(2px)",
          animation: "planetDrift 45s ease-in-out infinite alternate",
        }}
      />

      <style>{`
        @keyframes planetDrift {
          from { transform: translate(-80px, 0); }
          to   { transform: translate(-10px, -40px); }
        }
      `}</style>
    </>
  );
};
