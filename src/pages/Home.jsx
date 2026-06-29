import { Link } from "react-router-dom";
import { Headphones, ArrowRight, Sparkles, Music, Smile } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex flex-col items-center justify-center px-6 py-20 relative overflow-hidden">
      
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-500"></div>
      </div>

      {/* Floating Icons */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-10 opacity-20 hidden lg:block"
      >
        <Music className="w-16 h-16 text-white" />
      </motion.div>
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [10, -10, 10] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 right-10 opacity-20 hidden lg:block"
      >
        <Smile className="w-16 h-16 text-white" />
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex flex-col items-center"
      >
        {/* Hero Icon with Glow Effect */}
        <motion.div
          whileHover={{ scale: 1.05, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          className="mb-10 p-8 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl relative group"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 blur-2xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
          <Headphones className="w-28 h-28 text-white relative z-10" />
          
          {/* Sparkle Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-2 shadow-lg"
          >
            <Sparkles className="w-5 h-5 text-white" />
          </motion.div>
        </motion.div>

        {/* Title with Gradient */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-6xl md:text-7xl font-extrabold text-center mb-6"
        >
          <span className="text-white">Welcome to</span>
          <br />
          <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
            MoodMusic AI
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg md:text-xl text-gray-300 max-w-2xl text-center leading-relaxed mb-12"
        >
          Transform your emotions into music. Our AI analyzes your facial expressions 
          in real-time and recommends the perfect Hindi songs for your mood.
        </motion.p>

        {/* Feature Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap gap-3 justify-center mb-12"
        >
          {["AI Powered", "Real-time", "Hindi Songs", "Emotion Detection"].map((tag, index) => (
            <span
              key={index}
              className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full text-sm text-gray-300 font-medium"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            to="/detector"
            className="group relative px-10 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xl font-semibold shadow-2xl hover:shadow-indigo-500/30 transition-all duration-300 inline-flex items-center gap-3 overflow-hidden"
          >
            <span className="relative z-10">Get Started</span>
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            
            {/* Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </Link>
        </motion.div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 flex items-center gap-6 text-gray-400 text-sm"
        >
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {["https://i.pravatar.cc/30?img=1", "https://i.pravatar.cc/30?img=2", "https://i.pravatar.cc/30?img=3", "https://i.pravatar.cc/30?img=4"].map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt={`User ${i + 1}`}
                  className="w-8 h-8 rounded-full border-2 border-white/10"
                />
              ))}
            </div>
            <span>Join 1,000+ music lovers</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}