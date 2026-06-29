import { Sparkles, Brain, Music2, ShieldCheck, PlayCircle, Smartphone } from "lucide-react";
import { useEffect, useRef } from "react";

export default function Features() {
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
      icon: Brain,
      title: "AI-Powered Mood Detection",
      description: "Detects emotions like happiness, sadness, anger, calmness, and more using face-api.js — all inside your browser.",
    },
    {
      icon: Music2,
      title: "Mood-Based Song Suggestions",
      description: "Once your mood is recognized, you get tailored Hindi songs that match your emotional vibe instantly.",
    },
    {
      icon: ShieldCheck,
      title: "Fast & Private",
      description: "All processing happens locally on your device — no uploads, no storage, complete privacy.",
    },
    {
      icon: PlayCircle,
      title: "Inline YouTube Player",
      description: "Enjoy songs directly inside the page with a smooth thumbnail-to-video player experience.",
    },
    {
      icon: Sparkles,
      title: "Dynamic Mood Scanning",
      description: "Scan again anytime — recommendations refresh based on your current mood.",
    },
    {
      icon: Smartphone,
      title: "Responsive Modern UI",
      description: "Fully responsive React + TailwindCSS UI for smooth browsing on any device.",
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
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3 tracking-tight">
            App{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Features
            </span>
          </h1>
          <p className="text-sm text-gray-500 max-w-2xl mx-auto">
            Everything you need to discover the perfect music for your mood
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

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-xs text-gray-400">
            Ready to experience the future of mood-based music?
          </p>
          <a
            href="/detector"
            className="inline-block mt-2 px-4 py-1.5 rounded-md bg-indigo-600 text-white text-xs font-medium hover:bg-indigo-700 transition-colors"
          >
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
}