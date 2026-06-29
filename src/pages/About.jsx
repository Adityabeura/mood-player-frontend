import { Brain, Music2, Camera, ShieldCheck, Sparkles } from "lucide-react";
import { useEffect, useRef } from "react";

export default function About() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationId;
    let particles = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.2 + 0.05;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99, 102, 241, ${this.opacity})`;
        ctx.fill();
      }
    }

    const init = () => {
      resizeCanvas();
      particles = [];
      const particleCount = Math.min(40, Math.floor((canvas.width * canvas.height) / 20000));
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      // Draw connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.03 * (1 - distance / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    init();
    animate();

    window.addEventListener("resize", () => {
      resizeCanvas();
      init();
    });

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  const features = [
    {
      icon: Camera,
      title: "Facial Expression Detection",
      description: "Analyzes your live webcam feed to understand emotions including happiness, sadness, anger, calmness, and more.",
    },
    {
      icon: Brain,
      title: "AI Model Processing",
      description: "All mood detection happens locally on your device using lightweight AI models — fast, secure, and private.",
    },
    {
      icon: Music2,
      title: "Music Recommendation Engine",
      description: "Fetches mood-matched Hindi songs and plays them directly inside the app with a smooth inline player.",
    },
    {
      icon: ShieldCheck,
      title: "Fully Private",
      description: "No video or mood data is ever uploaded — everything runs in-browser, ensuring complete user privacy.",
    },
    {
      icon: Sparkles,
      title: "Smooth & Modern UI",
      description: "Built with React and TailwindCSS for a beautiful, responsive, and seamless experience on mobile and desktop.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50/80 via-white to-purple-50/80 px-6 py-20 flex flex-col items-center relative overflow-hidden">
      
      {/* Background Animation */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Soft gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-100/20 via-transparent to-purple-100/20 pointer-events-none"></div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl w-full">
        
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            About{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              MoodMusic AI
            </span>
          </h1>
          <p className="text-base text-gray-600 max-w-3xl mx-auto leading-relaxed">
            An emotion-aware music recommendation platform that brings you songs matching your vibe.
            Using advanced AI and real-time facial expression analysis, we curate the perfect Hindi songs
            for your mood — all privately in your browser.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/50 shadow-sm hover:shadow-md hover:border-indigo-200/50 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-indigo-50 group-hover:bg-indigo-100 transition-colors flex-shrink-0">
                    <Icon className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Note */}
        <div className="mt-12 text-center">
          <p className="text-xs text-gray-400">
            Built with ❤️ using React, TailwindCSS, and face-api.js
          </p>
        </div>
      </div>
    </div>
  );
}