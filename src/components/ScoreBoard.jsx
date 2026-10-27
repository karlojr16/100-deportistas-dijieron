import React from "react";
import { Bell, Trophy, Plus, Minus } from "lucide-react";
import { sounds } from "../utils/soundManager";

export function ScoreBoard({
  redScore,
  blueScore,
  roundPoints,
  multiplier,
  setMultiplier,
  currentRound,
  totalRounds,
  category,
  onAwardPoints,
  onManualScoreAdjust,
}) {
  const handleBell = () => {
    sounds.playBoxingBell();
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-2">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-stretch">
        
        {/* EQUIPO ROJO */}
        <div className="md:col-span-4 bg-gradient-to-br from-red-950/80 via-red-900/60 to-zinc-950 p-4 rounded-2xl border-2 border-red-600/70 shadow-lg shadow-red-950/50 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 text-red-500/10 font-black text-8xl pointer-events-none select-none">
            🥊
          </div>
          <div className="flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🥊</span>
              <div>
                <h3 className="font-black text-red-400 tracking-wider text-sm md:text-base uppercase">
                  EQUIPO ROJO
                </h3>
                <span className="text-[11px] text-zinc-400">Dinastía Ontiveros</span>
              </div>
            </div>
            {/* Botón rápido para otorgarle los puntos acumulados de la ronda */}
            <button
              onClick={() => onAwardPoints("red")}
              disabled={roundPoints === 0}
              className={`px-3 py-1 rounded-lg text-xs font-bold uppercase transition-all shadow ${
                roundPoints > 0
                  ? "bg-red-600 hover:bg-red-500 text-white shadow-red-600/40 hover:scale-105 active:scale-95"
                  : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
              }`}
              title="Dar todos los puntos de la ronda al Equipo Rojo (Atajo: R)"
            >
              + {roundPoints} Pts
            </button>
          </div>

          <div className="my-2 text-center z-10">
            <span className="text-5xl md:text-6xl font-black text-white tracking-tight drop-shadow-[0_4px_12px_rgba(239,68,68,0.7)]">
              {redScore}
            </span>
            <span className="block text-xs uppercase font-bold text-red-300/80 tracking-widest mt-1">
              Puntos Globales
            </span>
          </div>

          {/* Ajuste fino manual (+5 / -5) */}
          <div className="flex items-center justify-center gap-2 z-10 pt-1 border-t border-red-800/40">
            <button
              onClick={() => onManualScoreAdjust("red", -5)}
              className="p-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs"
              title="Restar 5 puntos"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] text-zinc-400 font-medium">Ajuste manual</span>
            <button
              onClick={() => onManualScoreAdjust("red", 5)}
              className="p-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs"
              title="Sumar 5 puntos"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* CENTRO: BANCO DE PUNTOS DE LA RONDA & MULTIPLICADOR */}
        <div className="md:col-span-4 bg-zinc-950/90 p-4 rounded-2xl border-2 border-amber-500/50 shadow-lg flex flex-col justify-between items-center text-center relative">
          <div className="flex items-center justify-between w-full">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
              Ronda {currentRound} / {totalRounds}
            </span>
            <button
              onClick={handleBell}
              className="p-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-semibold flex items-center gap-1 transition-all"
              title="Sonar campana de box (Atajo: Espacio)"
            >
              <Bell className="w-3.5 h-3.5" />
              <span>Campana</span>
            </button>
          </div>

          <div className="my-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block mb-0.5">
              PUNTOS EN JUEGO
            </span>
            <div className="inline-block bg-zinc-900 px-6 py-2 rounded-2xl border-2 border-amber-500 shadow-inner">
              <span className="text-4xl md:text-5xl font-black text-amber-400 tracking-wider">
                {roundPoints}
              </span>
            </div>
            <div className="mt-1 text-[11px] text-zinc-400 truncate max-w-xs">
              {category && <span className="bg-zinc-800 px-2 py-0.5 rounded text-amber-300">{category}</span>}
            </div>
          </div>

          {/* Selector de Multiplicador x1, x2, x3 */}
          <div className="flex items-center gap-1.5 bg-zinc-900 p-1 rounded-xl border border-zinc-800">
            <span className="text-[10px] text-zinc-400 px-1 font-semibold uppercase">Multiplicador:</span>
            {[1, 2, 3].map((m) => (
              <button
                key={m}
                onClick={() => setMultiplier(m)}
                className={`px-2.5 py-0.5 rounded-lg text-xs font-black transition-all ${
                  multiplier === m
                    ? "bg-amber-500 text-zinc-950 shadow-md shadow-amber-500/30 scale-105"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                }`}
              >
                x{m}
              </button>
            ))}
          </div>
        </div>

        {/* EQUIPO AZUL */}
        <div className="md:col-span-4 bg-gradient-to-br from-blue-950/80 via-blue-900/60 to-zinc-950 p-4 rounded-2xl border-2 border-blue-600/70 shadow-lg shadow-blue-950/50 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 text-blue-500/10 font-black text-8xl pointer-events-none select-none">
            🥊
          </div>
          <div className="flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🥊</span>
              <div>
                <h3 className="font-black text-blue-400 tracking-wider text-sm md:text-base uppercase">
                  EQUIPO AZUL
                </h3>
                <span className="text-[11px] text-zinc-400">Dinastía Ontiveros</span>
              </div>
            </div>
            {/* Botón rápido para otorgarle los puntos acumulados de la ronda */}
            <button
              onClick={() => onAwardPoints("blue")}
              disabled={roundPoints === 0}
              className={`px-3 py-1 rounded-lg text-xs font-bold uppercase transition-all shadow ${
                roundPoints > 0
                  ? "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/40 hover:scale-105 active:scale-95"
                  : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
              }`}
              title="Dar todos los puntos de la ronda al Equipo Azul (Atajo: A)"
            >
              + {roundPoints} Pts
            </button>
          </div>

          <div className="my-2 text-center z-10">
            <span className="text-5xl md:text-6xl font-black text-white tracking-tight drop-shadow-[0_4px_12px_rgba(59,130,246,0.7)]">
              {blueScore}
            </span>
            <span className="block text-xs uppercase font-bold text-blue-300/80 tracking-widest mt-1">
              Puntos Globales
            </span>
          </div>

          {/* Ajuste fino manual (+5 / -5) */}
          <div className="flex items-center justify-center gap-2 z-10 pt-1 border-t border-blue-800/40">
            <button
              onClick={() => onManualScoreAdjust("blue", -5)}
              className="p-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs"
              title="Restar 5 puntos"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] text-zinc-400 font-medium">Ajuste manual</span>
            <button
              onClick={() => onManualScoreAdjust("blue", 5)}
              className="p-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs"
              title="Sumar 5 puntos"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
