import { Link } from "react-router-dom";
import { Headphones, ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";

export default function Home() {
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
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.3 + 0.1;
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
      const particleCount = Math.min(50, Math.floor((canvas.width * canvas.height) / 15000));
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
          
          if (distance < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.05 * (1 - distance / 150)})`;
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50/80 via-white to-purple-50/80 flex flex-col items-center justify-center px-6 py-20 relative overflow-hidden">
      
      {/* Background Animation Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Soft gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-100/20 via-transparent to-purple-100/20 pointer-events-none"></div>

      {/* Main Content */}
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        
        {/* Icon with soft glow */}
        <div className="inline-flex p-4 rounded-2xl bg-white/70 backdrop-blur-sm shadow-lg shadow-indigo-500/5 border border-white/50 mb-8">
          <Headphones className="w-12 h-12 text-indigo-600" />
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
          Welcome to{" "}
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            MoodMusic AI
          </span>
        </h1>

        {/* Description */}
        <p className="text-base text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
          Real-time facial expression analysis that recommends Hindi songs 
          perfectly matched to your current mood.
        </p>

        {/* CTA Button with soft hover */}
        <Link
          to="/detector"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300"
        >
          Get Started
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>

        {/* Divider */}
        <div className="w-12 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto my-8"></div>

        {/* Trust indicators with soft styling */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-xs text-gray-500">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"></span>
            AI Powered
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse delay-150"></span>
            Real-time
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse delay-300"></span>
            Hindi Songs
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse delay-450"></span>
            Emotion Detection
          </span>
        </div>
      </div>
    </div>
  );
}