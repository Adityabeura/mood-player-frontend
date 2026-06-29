import { Music, Github, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white/80 backdrop-blur-sm border-t border-gray-200/50 mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-8">
        
        {/* Main Footer Content */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-indigo-600 flex items-center justify-center">
              <Music className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-900 tracking-tight">
              MoodMusic
            </span>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {["Home", "Features", "Songs", "About"].map((item) => (
              <a
                key={item}
                href={`/${item.toLowerCase()}`}
                className="text-xs text-gray-500 hover:text-gray-900 transition-colors"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/Adiii08"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-900 transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://www.instagram.com/_adiiihere/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-900 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/adityabeura/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-900 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-6"></div>

        {/* Bottom Text */}
        <div className="text-center">
          <p className="text-xs text-gray-400">
            © {currentYear} MoodMusic AI • Built with <span className="text-red-400">❤</span> and AI
          </p>
        </div>
      </div>
    </footer>
  );
}