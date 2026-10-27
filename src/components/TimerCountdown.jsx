import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, Timer, AlertOctagon } from "lucide-react";
import { sounds } from "../utils/soundManager";

export function TimerCountdown({ onTimeExpired, isExpiredDisabled = false }) {
  const [timeLeft, setTimeLeft] = useState(8);
  const [isRunning, setIsRunning] = useState(false);
  const [flashAlert, setFlashAlert] = useState(false);

  const timerRef = useRef(null);

  // Escuchar tecla 't' o 'T' global para iniciar o reiniciar el contador de 8 segundos
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignorar si el usuario está escribiendo en un input o textarea
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;

      if (e.key === "t" || e.key === "T") {
        e.preventDefault();
        restartTimer();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Manejo del intervalo del temporizador
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsRunning(false);
            handleExpired();
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

  const handleExpired = () => {
    sounds.playTimeUp();
    setTimeout(() => {
      sounds.playStrike();
    }, 200);

    setFlashAlert(true);
    setTimeout(() => setFlashAlert(false), 1200);

    if (onTimeExpired && !isExpiredDisabled) {
      onTimeExpired();
    }
  };

  const startTimer = () => {
    sounds.init();
    if (timeLeft === 0) {
      setTimeLeft(8);
    }
    sounds.playTick();
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const restartTimer = () => {
    sounds.init();
    setIsRunning(false);
    clearInterval(timerRef.current);
    setTimeLeft(8);
    setTimeout(() => {
      sounds.playTick();
      setIsRunning(true);
    }, 50);
  };

  const resetTimer = () => {
    setIsRunning(false);
    clearInterval(timerRef.current);
    setTimeLeft(8);
  };

  // Porcentaje restante para la barra / anillo
  const percentage = (timeLeft / 8) * 100;

  return (
    <div className={`relative px-3 py-2 rounded-2xl border transition-all duration-300 flex items-center justify-between gap-3 ${
      flashAlert
        ? "bg-red-600 border-red-400 text-white animate-bounce shadow-2xl shadow-red-600/80"
        : timeLeft <= 3 && isRunning
        ? "bg-red-950/60 border-red-500 text-red-200 animate-pulse shadow-lg shadow-red-950/50"
        : isRunning
        ? "bg-amber-950/40 border-amber-500/60 text-amber-200 shadow-md shadow-amber-950/30"
        : "bg-zinc-900/90 border-zinc-700/60 text-zinc-300"
    }`}>
      
      {/* Icono e indicador de segundos */}
      <div className="flex items-center gap-2.5">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xl transition-all ${
          timeLeft <= 3 && isRunning
            ? "bg-red-600 text-white scale-110 shadow-lg shadow-red-600"
            : isRunning
            ? "bg-amber-500 text-zinc-950 scale-105"
            : "bg-zinc-800 text-zinc-300"
        }`}>
          {timeLeft}s
        </div>

        <div>
          <div className="flex items-center gap-1.5">
            <Timer className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Tiempo Límite: 8s
            </span>
          </div>
          <span className="text-[10px] text-zinc-400 block">
            {isRunning 
              ? timeLeft <= 3 
                ? "¡¡Rápido o se da Strike!!" 
                : "Contando segundos..." 
              : "Presiona [T] para iniciar"}
          </span>
        </div>
      </div>

      {/* Barra de progreso visual */}
      <div className="flex-1 max-w-xs mx-2">
        <div className="w-full bg-zinc-800 rounded-full h-2.5 overflow-hidden border border-zinc-700">
          <div
            className={`h-full transition-all duration-1000 ease-linear rounded-full ${
              timeLeft <= 3 ? "bg-red-500" : timeLeft <= 5 ? "bg-orange-500" : "bg-emerald-500"
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Botones de acción */}
      <div className="flex items-center gap-1.5">
        {isRunning ? (
          <button
            onClick={pauseTimer}
            className="px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold flex items-center gap-1 transition-all"
            title="Pausar tiempo"
          >
            <Pause className="w-3.5 h-3.5" />
            <span>Pausar</span>
          </button>
        ) : (
          <button
            onClick={startTimer}
            className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-all shadow ${
              timeLeft === 0
                ? "bg-red-600 hover:bg-red-500 text-white"
                : "bg-amber-500 hover:bg-amber-400 text-zinc-950 shadow-amber-500/30 hover:scale-105"
            }`}
            title="Iniciar cuenta regresiva (Atajo: Tecla T)"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{timeLeft === 0 ? "Reiniciar 8s" : "Iniciar [T]"}</span>
          </button>
        )}

        <button
          onClick={restartTimer}
          className="p-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs transition-all"
          title="Reiniciar a 8 segundos"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
}
