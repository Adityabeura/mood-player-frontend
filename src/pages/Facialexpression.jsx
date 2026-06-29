import React, { useRef, useEffect, useState } from "react";
import * as faceapi from "face-api.js";
import { Camera, RefreshCw, Music, Play, Square } from "lucide-react";

export default function FaceExpressionDetector() {
  const videoRef = useRef(null);
  const [expression, setExpression] = useState("");
  const [songs, setSongs] = useState([]);
  const [playingIndex, setPlayingIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);

  const BACKEND_URL = "https://mood-player-backend.onrender.com";

  // Load Models
  const loadModels = async () => {
    try {
      const MODEL_URL = "/models";
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
      startVideo();
    } catch (error) {
      console.error("Error loading models:", error);
    }
  };

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        setIsCameraReady(true);
      })
      .catch((error) => {
        console.error("Error accessing camera:", error);
        setExpression("Camera access denied");
      });
  };

  useEffect(() => {
    loadModels();
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Detect Mood
  const detectMood = async () => {
    if (!isCameraReady) {
      setExpression("Camera not ready");
      return;
    }

    setLoading(true);
    try {
      const detection = await faceapi
        .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceExpressions();

      if (!detection) {
        setExpression("No face detected");
        setLoading(false);
        return;
      }

      const mood = Object.entries(detection.expressions).sort(
        (a, b) => b[1] - a[1]
      )[0][0];

      setExpression(mood);
      await fetchSongs(mood);
    } catch (error) {
      console.error("Error detecting mood:", error);
      setExpression("Detection failed");
    } finally {
      setLoading(false);
    }
  };

  // Fetch songs
  const fetchSongs = async (mood) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/songs/${mood}`);
      const data = await res.json();
      setSongs(data.songs || []);
      setPlayingIndex(null);
    } catch (err) {
      console.error(err);
      setSongs([]);
    }
  };

  // Get mood emoji
  const getMoodEmoji = (mood) => {
    const emojis = {
      happy: "😊",
      sad: "😢",
      angry: "😠",
      fearful: "😨",
      disgusted: "🤢",
      surprised: "😮",
      neutral: "😐",
    };
    return emojis[mood?.toLowerCase()] || "🎵";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50/80 via-white to-purple-50/80 px-4 py-12 flex flex-col items-center">
      
      <div className="max-w-6xl w-full">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 tracking-tight">
            Mood Music AI
          </h1>
          <p className="text-sm text-gray-500 max-w-md mx-auto">
            Let AI detect your facial expression and recommend Hindi songs that match your mood.
          </p>
        </div>

        {/* Webcam & Controls */}
        <div className="flex flex-col items-center">
          
          {/* Webcam Card */}
          <div className="w-full max-w-md bg-white/70 backdrop-blur-sm rounded-xl border border-white/50 shadow-sm overflow-hidden">
            <div className="relative aspect-video bg-gray-100">
              <video
                ref={videoRef}
                autoPlay
                muted
                className="w-full h-full object-cover"
              />
              {!isCameraReady && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                  <div className="text-center">
                    <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-xs text-gray-400">Starting camera...</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Detect Button */}
          <button
            onClick={detectMood}
            disabled={loading}
            className="mt-6 px-6 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Detecting...
              </>
            ) : (
              <>
                <Camera className="w-4 h-4" />
                Detect Mood
              </>
            )}
          </button>

          {/* Mood Display */}
          {expression && (
            <div className="mt-4 flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-sm rounded-lg border border-white/50">
              <span className="text-xl">{getMoodEmoji(expression)}</span>
              <span className="text-sm font-medium text-gray-700 capitalize">
                {expression}
              </span>
            </div>
          )}
        </div>

        {/* Songs Section */}
        {songs.length > 0 && (
          <div className="mt-12">
            <div className="flex items-center gap-2 mb-4">
              <Music className="w-4 h-4 text-indigo-600" />
              <h2 className="text-sm font-semibold text-gray-700">
                Recommended Songs
              </h2>
              <span className="text-xs text-gray-400">({songs.length})</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {songs.map((song, index) => (
                <div
                  key={index}
                  className="group bg-white/70 backdrop-blur-sm rounded-xl border border-white/50 shadow-sm hover:shadow-md hover:border-indigo-200/50 transition-all duration-300 overflow-hidden"
                >
                  {/* Thumbnail/Video */}
                  <div className="relative aspect-video bg-gray-100">
                    {playingIndex !== index ? (
                      <img
                        src={`https://img.youtube.com/vi/${song.videoId}/hqdefault.jpg`}
                        alt={song.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <iframe
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/${song.videoId}?autoplay=1`}
                        allowFullScreen
                        allow="autoplay"
                      ></iframe>
                    )}
                  </div>

                  {/* Song Info */}
                  <div className="p-4">
                    <h3 className="text-sm font-medium text-gray-900 line-clamp-1">
                      {song.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {song.artist || "Unknown Artist"}
                    </p>

                    {/* Play Button */}
                    <button
                      onClick={() =>
                        setPlayingIndex(playingIndex === index ? null : index)
                      }
                      className="mt-3 w-full px-3 py-1.5 rounded-md bg-indigo-50 text-indigo-600 text-xs font-medium hover:bg-indigo-100 transition-colors inline-flex items-center justify-center gap-1.5"
                    >
                      {playingIndex === index ? (
                        <>
                          <Square className="w-3 h-3" />
                          Stop
                        </>
                      ) : (
                        <>
                          <Play className="w-3 h-3" />
                          Play
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !expression && songs.length === 0 && (
          <div className="mt-12 text-center">
            <div className="inline-flex p-4 rounded-full bg-white/50 border border-white/50 mb-3">
              <Music className="w-6 h-6 text-gray-300" />
            </div>
            <p className="text-xs text-gray-400">
              Click "Detect Mood" to get song recommendations
            </p>
          </div>
        )}
      </div>
    </div>
  );
}