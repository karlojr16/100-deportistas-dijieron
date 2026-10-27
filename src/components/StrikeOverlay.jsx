import React, { useEffect, useState } from "react";
import { X, AlertTriangle, RotateCcw } from "lucide-react";
import { sounds } from "../utils/soundManager";

export function StrikeOverlay({ strikes, onAddStrike, onClearStrikes }) {
  const [shakeAnim, setShakeAnim] = useState(false);

  // Cada vez que cambia la cantidad de strikes (mayor que 0), animar
  useEffect(() => {
    if (strikes > 0) {
      setShakeAnim(true);
      const timer = setTimeout(() => setShakeAnim(false), 600);
      return () => clearTimeout(timer);
    }
  }, [strikes]);

  const hasThreeStrikes = strikes >= 3;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 my-2">
      <div className={`p-3 rounded-2xl border-2 transition-all duration-300 flex flex-col sm:flex-row items-center justify-between gap-3 ${
        hasThreeStrikes
          ? "bg-red-950/90 border-red-500 shadow-2xl shadow-red-900/80 animate-pulse"
          : "bg-zinc-950/80 border-zinc-800"
      }`}>
        
        {/* Título de Sección */}
        <div className="flex items-center gap-2">
          <span className="text-xl">⚠️</span>
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-red-400">
              STRIKES / TACHES
            </span>
            <span className="block text-[11px] text-zinc-400">
              {hasThreeStrikes 
                ? "¡3 Taches alcanzados! Robo de puntos activado" 
                : "Al 3er tache el equipo rival puede robar"}
            </span>
          </div>
        </div>

        {/* Las 3 Cruces (X) Gigantes */}
        <div className={`flex items-center gap-4 ${shakeAnim ? "animate-strike-shake" : ""}`}>
          {[1, 2, 3].map((slot) => {
            const isActive = strikes >= slot;
            return (
              <div
                key={slot}
                onClick={onAddStrike}
                className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl border-2 flex items-center justify-center cursor-pointer transition-all duration-300 select-none ${
                  isActive
                    ? "bg-gradient-to-br from-red-600 to-red-950 border-red-500 text-white shadow-xl shadow-red-600/70 scale-110"
                    : "bg-zinc-900/60 border-zinc-800 text-zinc-700 hover:border-red-900/50 hover:text-zinc-600"
                }`}
                title={`Strike ${slot} (Clic para sumar strike o presiona tecla X)`}
              >
                <X className={`w-10 h-10 md:w-12 md:h-12 stroke-[3.5] ${isActive ? "text-red-100 drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" : ""}`} />
              </div>
            );
          })}
        </div>

        {/* Controles de Strike */}
        <div className="flex items-center gap-2">
          <button
            onClick={onAddStrike}
            className="px-3 py-1.5 rounded-xl bg-red-600/80 hover:bg-red-600 text-white text-xs font-bold uppercase transition-all shadow-md shadow-red-950/50 flex items-center gap-1 active:scale-95"
            title="Sumar 1 Strike (Atajo: Tecla X)"
          >
            <X className="w-3.5 h-3.5 stroke-[3]" />
            <span>+1 Strike [X]</span>
          </button>

          {strikes > 0 && (
            <button
              onClick={onClearStrikes}
              className="p-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold transition-all"
              title="Limpiar strikes (Atajo: Tecla C)"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>

      {/* Banner de ALERTA: ROBO DE PUNTOS */}
      {hasThreeStrikes && (
        <div className="mt-2 p-3 rounded-2xl bg-gradient-to-r from-red-600 via-amber-600 to-red-600 border-2 border-amber-300 text-white text-center shadow-2xl animate-bounce">
          <div className="flex items-center justify-center gap-2 font-black text-sm md:text-base tracking-wider uppercase">
            <AlertTriangle className="w-5 h-5 text-yellow-300 animate-spin" />
            <span>¡¡3 STRIKES!! EL EQUIPO CONTRARIO TIENE 1 INTENTO PARA ROBAR TODOS LOS PUNTOS</span>
            <AlertTriangle className="w-5 h-5 text-yellow-300 animate-spin" />
          </div>
        </div>
      )}
    </div>
  );
}
