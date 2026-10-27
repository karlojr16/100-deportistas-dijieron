import React, { useState, useEffect, useRef } from "react";
import { X, Play, Pause, RotateCcw, Zap, Trophy, Award } from "lucide-react";
import { sounds } from "../utils/soundManager";
import confetti from "canvas-confetti";

export function FastMoneyModal({ isOpen, onClose }) {
  const [seconds, setSeconds] = useState(20);
  const [isRunning, setIsRunning] = useState(false);
  const [team, setTeam] = useState("red"); // 'red' | 'blue'
  const [slots, setSlots] = useState([
    { question: "1. Frase favorita de la Maestra Yared", answer: "", points: 0 },
    { question: "2. Objeto que más se olvida en la maleta", answer: "", points: 0 },
    { question: "3. Castigo que más odian en Dinastía Ontiveros", answer: "", points: 0 },
    { question: "4. Monstruo de Halloween que pelea Kickboxing", answer: "", points: 0 },
    { question: "5. Cosa que hacen después de entrenar", answer: "", points: 0 },
  ]);

  const timerRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsRunning(false);
            sounds.playTimeUp();
            setTimeout(() => sounds.playStrike(), 300);
            return 0;
          }
          sounds.playTick();
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  if (!isOpen) return null;

  const totalPoints = slots.reduce((acc, s) => acc + (parseInt(s.points) || 0), 0);

  const startTimer = () => {
    sounds.init();
    if (seconds === 0) setSeconds(20);
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    clearInterval(timerRef.current);
    setSeconds(20);
  };

  const handleSlotChange = (index, field, value) => {
    const updated = [...slots];
    updated[index] = {
      ...updated[index],
      [field]: field === "points" ? parseInt(value) || 0 : value,
    };
    setSlots(updated);
  };

  const handleWinCelebration = () => {
    sounds.playVictory();
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#ef4444", "#f97316", "#eab308", "#3b82f6"],
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 md:p-6 overflow-y-auto">
      <div className="bg-zinc-950 border-2 border-amber-500/60 w-full max-w-3xl rounded-3xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-3.5 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/80">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h2 className="text-xl font-black text-amber-400 uppercase tracking-wide">
                Ronda Rápida / Muerte Súbita (20 Segundos)
              </h2>
              <span className="text-xs text-zinc-400">
                El capitán responde 5 preguntas relámpago
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Panel Superior: Temporizador y Selector de Equipo */}
        <div className="p-4 bg-zinc-900/50 border-b border-zinc-800 flex flex-wrap items-center justify-between gap-4">
          {/* Selector de Equipo */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-zinc-400 uppercase">Capitán:</span>
            <button
              onClick={() => setTeam("red")}
              className={`px-3 py-1 rounded-xl text-xs font-black uppercase transition-all ${
                team === "red"
                  ? "bg-red-600 text-white shadow-lg shadow-red-600/40"
                  : "bg-zinc-800 text-zinc-400 hover:text-white"
              }`}
            >
              🥊 Equipo Rojo
            </button>
            <button
              onClick={() => setTeam("blue")}
              className={`px-3 py-1 rounded-xl text-xs font-black uppercase transition-all ${
                team === "blue"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/40"
                  : "bg-zinc-800 text-zinc-400 hover:text-white"
              }`}
            >
              🥊 Equipo Azul
            </button>
          </div>

          {/* Temporizador 20s */}
          <div className="flex items-center gap-3">
            <div className={`px-4 py-1.5 rounded-2xl font-black text-2xl border-2 flex items-center gap-2 ${
              seconds <= 5 && isRunning
                ? "bg-red-600 border-red-400 text-white animate-pulse"
                : "bg-zinc-900 border-amber-500/60 text-amber-400"
            }`}>
              <span>⏱️</span>
              <span>{seconds}s</span>
            </div>

            {isRunning ? (
              <button
                onClick={pauseTimer}
                className="px-3 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold flex items-center gap-1"
              >
                <Pause className="w-3.5 h-3.5" />
                <span>Pausar</span>
              </button>
            ) : (
              <button
                onClick={startTimer}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-black flex items-center gap-1 shadow-md shadow-amber-500/30"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Iniciar 20s</span>
              </button>
            )}

            <button
              onClick={resetTimer}
              className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
              title="Reiniciar a 20s"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Formulario de 5 Respuestas */}
        <div className="p-4 md:p-6 overflow-y-auto space-y-3 flex-1">
          {slots.map((slot, idx) => (
            <div
              key={idx}
              className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col sm:flex-row items-center gap-3"
            >
              <span className="font-bold text-xs text-amber-400 sm:w-1/3 truncate">
                {slot.question}
              </span>
              <input
                type="text"
                placeholder="Respuesta dicha por el capitán..."
                value={slot.answer}
                onChange={(e) => handleSlotChange(idx, "answer", e.target.value)}
                className="flex-1 bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-1.5 text-sm text-white focus:border-amber-500 focus:outline-none w-full"
              />
              <div className="flex items-center gap-1">
                <span className="text-xs text-zinc-400">Pts:</span>
                <input
                  type="number"
                  min="0"
                  max="100"
                  placeholder="0"
                  value={slot.points || ""}
                  onChange={(e) => handleSlotChange(idx, "points", e.target.value)}
                  className="w-16 bg-zinc-950 border border-zinc-700 rounded-xl px-2 py-1.5 text-center font-bold text-amber-400 text-sm focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Footer con Total y Celebración */}
        <div className="p-4 bg-zinc-900 border-t border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-zinc-400 uppercase">Total Acumulado:</span>
            <span className="text-3xl font-black text-amber-400">{totalPoints} Pts</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleWinCelebration}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-zinc-950 font-black text-xs flex items-center gap-1.5 shadow-lg shadow-amber-500/20"
            >
              <Trophy className="w-4 h-4" />
              <span>¡Celebrar Victoria!</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
