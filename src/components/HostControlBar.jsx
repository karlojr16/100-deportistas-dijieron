import React from "react";
import { 
  ChevronLeft, 
  ChevronRight, 
  Eye, 
  EyeOff, 
  RotateCcw, 
  Keyboard, 
  Award, 
  Trophy
} from "lucide-react";

export function HostControlBar({
  currentIndex,
  totalQuestions,
  onPrevQuestion,
  onNextQuestion,
  onRevealAll,
  onHideAll,
  onResetRound,
  onResetGame,
  onAwardWinner,
}) {
  return (
    <footer className="w-full bg-zinc-950/95 border-t border-zinc-800 px-4 py-2.5 backdrop-blur-md sticky bottom-0 z-20">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
        
        {/* Navegación entre Preguntas */}
        <div className="flex items-center gap-2">
          <button
            onClick={onPrevQuestion}
            disabled={currentIndex === 0}
            className={`p-2 rounded-xl border flex items-center gap-1 font-bold transition-all ${
              currentIndex > 0
                ? "bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700 active:scale-95"
                : "bg-zinc-900 border-zinc-800 text-zinc-600 cursor-not-allowed"
            }`}
            title="Pregunta anterior (Atajo: Flecha Izquierda)"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Anterior</span>
          </button>

          <span className="font-extrabold text-amber-400 bg-zinc-900 px-3 py-1.5 rounded-xl border border-zinc-800">
            Pregunta {currentIndex + 1} de {totalQuestions}
          </span>

          <button
            onClick={onNextQuestion}
            disabled={currentIndex === totalQuestions - 1}
            className={`p-2 rounded-xl border flex items-center gap-1 font-bold transition-all ${
              currentIndex < totalQuestions - 1
                ? "bg-amber-600 border-amber-500 text-zinc-950 hover:bg-amber-500 active:scale-95"
                : "bg-zinc-900 border-zinc-800 text-zinc-600 cursor-not-allowed"
            }`}
            title="Siguiente pregunta (Atajo: Flecha Derecha)"
          >
            <span className="hidden sm:inline">Siguiente</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Acciones de Ronda Rápida */}
        <div className="flex items-center gap-2">
          <button
            onClick={onRevealAll}
            className="px-2.5 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 font-semibold flex items-center gap-1 transition-all"
            title="Destapar todas las respuestas de esta pregunta"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Revelar Todo</span>
          </button>

          <button
            onClick={onHideAll}
            className="px-2.5 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 font-semibold flex items-center gap-1 transition-all"
            title="Ocultar todas las respuestas"
          >
            <EyeOff className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Ocultar Todo</span>
          </button>

          <button
            onClick={onResetRound}
            className="px-2.5 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 font-semibold flex items-center gap-1 transition-all"
            title="Reiniciar ronda (limpia puntos y strikes de esta pregunta)"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Limpiar Ronda</span>
          </button>
        </div>

        {/* Celebrar Ganador & Reseteo Global */}
        <div className="flex items-center gap-2">
          <button
            onClick={onAwardWinner}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-zinc-950 font-black flex items-center gap-1.5 shadow-lg shadow-amber-500/20 active:scale-95 transition-all"
            title="Lanzar confetti y celebrar al equipo con mayor puntaje"
          >
            <Trophy className="w-4 h-4" />
            <span>¡Declarar Ganador!</span>
          </button>

          <button
            onClick={onResetGame}
            className="p-2 rounded-xl bg-red-950/40 hover:bg-red-900/60 border border-red-500/40 text-red-300 font-semibold transition-all"
            title="Reiniciar partida completa (puntos 0-0)"
          >
            Nueva Partida
          </button>
        </div>

      </div>

      {/* Barra de atajos de teclado rápida */}
      <div className="max-w-7xl mx-auto mt-2 pt-2 border-t border-zinc-900 hidden lg:flex items-center justify-between text-[11px] text-zinc-500">
        <div className="flex items-center gap-1">
          <Keyboard className="w-3.5 h-3.5 text-zinc-400" />
          <span className="font-semibold text-zinc-400">Atajos de Teclado del Maestro:</span>
        </div>
        <div className="flex items-center gap-3">
          <span><kbd className="bg-zinc-800 text-zinc-300 px-1.5 py-0.5 rounded">1-8</kbd> Revelar tarjeta</span>
          <span><kbd className="bg-zinc-800 text-zinc-300 px-1.5 py-0.5 rounded">T</kbd> Contador 8s</span>
          <span><kbd className="bg-zinc-800 text-zinc-300 px-1.5 py-0.5 rounded">X</kbd> +1 Strike</span>
          <span><kbd className="bg-zinc-800 text-zinc-300 px-1.5 py-0.5 rounded">C</kbd> Limpiar strikes</span>
          <span><kbd className="bg-zinc-800 text-zinc-300 px-1.5 py-0.5 rounded">R</kbd> Puntos a Rojo</span>
          <span><kbd className="bg-zinc-800 text-zinc-300 px-1.5 py-0.5 rounded">A</kbd> Puntos a Azul</span>
          <span><kbd className="bg-zinc-800 text-zinc-300 px-1.5 py-0.5 rounded">Espacio</kbd> Campana Box</span>
          <span><kbd className="bg-zinc-800 text-zinc-300 px-1.5 py-0.5 rounded">← / →</kbd> Preguntas</span>
        </div>
      </div>
    </footer>
  );
}
