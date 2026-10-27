import React, { useState, useRef } from "react";
import { RotateCcw, Volume2, ArrowLeft, Trophy, Smartphone } from "lucide-react";
import { sounds } from "../utils/soundManager";

export function BuzzerView({ onBackToBoard }) {
  const [winner, setWinner] = useState(null); // 'red' | 'blue' | null
  const [touchTimes, setTouchTimes] = useState({});
  const [timeDiff, setTimeDiff] = useState(null);
  const [orientation, setOrientation] = useState("horizontal"); // 'horizontal' | 'vertical'

  const lockRef = useRef(false);

  const handlePress = (team) => {
    const now = performance.now();

    // Si ya hubo ganador, solo registramos la diferencia de tiempo si es el otro equipo
    if (lockRef.current) {
      if (!timeDiff && winner && winner !== team) {
        const diff = Math.round(now - (touchTimes[winner] || now));
        setTimeDiff(diff);
      }
      return;
    }

    // Bloquear inmediatamente para que no haya empate
    lockRef.current = true;
    setWinner(team);
    setTouchTimes({ [team]: now });

    // Vibración en dispositivos móviles soportados
    if (navigator.vibrate) {
      try {
        navigator.vibrate([120, 60, 200]);
      } catch (e) {
        // Ignorar si no está permitido
      }
    }

    // Sonido distintivo del timbre
    sounds.playBuzzer(team);
  };

  const handleReset = () => {
    lockRef.current = false;
    setWinner(null);
    setTouchTimes({});
    setTimeDiff(null);
  };

  return (
    <div className="w-full min-h-[90vh] flex flex-col bg-zinc-950 text-white select-none">
      
      {/* Barra de control superior para el réferi */}
      <div className="bg-zinc-900 border-b border-zinc-800 px-4 py-2 flex items-center justify-between text-xs">
        <button
          onClick={onBackToBoard}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Tablero</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="font-bold text-zinc-400 hidden sm:inline">
            Modo Pulsador Móvil:
          </span>
          <button
            onClick={() => setOrientation(orientation === "horizontal" ? "vertical" : "horizontal")}
            className="px-2.5 py-1 rounded bg-zinc-800 text-zinc-300 hover:text-white flex items-center gap-1"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="capitalize">{orientation}</span>
          </button>

          <button
            onClick={handleReset}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black shadow-md transition-all active:scale-95"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reiniciar Pulsador</span>
          </button>
        </div>
      </div>

      {/* Pantalla Dividida: Rojo / Azul */}
      <div className={`flex-1 flex ${orientation === "horizontal" ? "flex-col sm:flex-row" : "flex-col"} relative overflow-hidden`}>
        
        {/* BOTÓN LADO ROJO */}
        <button
          onPointerDown={() => handlePress("red")}
          className={`flex-1 flex flex-col items-center justify-center p-6 transition-all duration-150 active:scale-95 ${
            winner === "red"
              ? "bg-red-600 shadow-[inset_0_0_80px_rgba(0,0,0,0.6)] animate-pulse"
              : winner === "blue"
              ? "bg-red-950/40 opacity-40 grayscale"
              : "bg-gradient-to-br from-red-600 to-red-900 hover:from-red-500 hover:to-red-800 border-4 border-red-500/50"
          }`}
        >
          <div className="text-center pointer-events-none">
            <span className="text-6xl md:text-8xl block mb-2 filter drop-shadow">🥊</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-wider uppercase text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
              EQUIPO ROJO
            </h2>
            <p className="text-xs md:text-sm font-bold uppercase text-red-200 mt-2 tracking-widest bg-black/40 px-3 py-1 rounded-full inline-block">
              ¡Toca Aquí Primero!
            </p>
          </div>
        </button>

        {/* BOTÓN LADO AZUL */}
        <button
          onPointerDown={() => handlePress("blue")}
          className={`flex-1 flex flex-col items-center justify-center p-6 transition-all duration-150 active:scale-95 ${
            winner === "blue"
              ? "bg-blue-600 shadow-[inset_0_0_80px_rgba(0,0,0,0.6)] animate-pulse"
              : winner === "red"
              ? "bg-blue-950/40 opacity-40 grayscale"
              : "bg-gradient-to-br from-blue-600 to-blue-900 hover:from-blue-500 hover:to-blue-800 border-4 border-blue-500/50"
          }`}
        >
          <div className="text-center pointer-events-none">
            <span className="text-6xl md:text-8xl block mb-2 filter drop-shadow">🥊</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-wider uppercase text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
              EQUIPO AZUL
            </h2>
            <p className="text-xs md:text-sm font-bold uppercase text-blue-200 mt-2 tracking-widest bg-black/40 px-3 py-1 rounded-full inline-block">
              ¡Toca Aquí Primero!
            </p>
          </div>
        </button>

        {/* OVERLAY DEL GANADOR AL PRESIONAR */}
        {winner && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center p-4">
            <div className={`p-6 md:p-8 rounded-3xl border-4 shadow-2xl text-center transform scale-105 transition-all max-w-md ${
              winner === "red"
                ? "bg-gradient-to-b from-red-600 to-red-950 border-white text-white shadow-red-600/80"
                : "bg-gradient-to-b from-blue-600 to-blue-950 border-white text-white shadow-blue-600/80"
            }`}>
              <Trophy className="w-16 h-16 mx-auto mb-2 text-yellow-300 animate-bounce" />
              <h3 className="text-2xl md:text-4xl font-black uppercase tracking-wider">
                ¡¡GANA LA PALABRA EL EQUIPO {winner === "red" ? "ROJO" : "AZUL"}!!
              </h3>
              {timeDiff && (
                <p className="text-sm font-bold text-yellow-200 mt-2 bg-black/30 px-3 py-1 rounded-full">
                  Ganó por {timeDiff} milisegundos de ventaja
                </p>
              )}
              <span className="text-xs font-semibold block mt-4 text-white/80">
                Pulsa el botón de arriba para la siguiente pregunta
              </span>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
