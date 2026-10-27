import React, { useEffect } from "react";
import { sounds } from "../utils/soundManager";

export function BoardAnswers({
  questionData,
  revealedAnswers,
  onToggleAnswer,
  theme,
}) {
  const isHalloween = theme === "halloween";
  const answers = questionData?.answers || [];

  // Escuchar teclado para teclas 1 al 8 para voltear respuestas
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;

      const num = parseInt(e.key, 10);
      if (!isNaN(num) && num >= 1 && num <= answers.length) {
        e.preventDefault();
        onToggleAnswer(num - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [answers, onToggleAnswer]);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-2">
      {/* Pregunta Principal en Pantalla Gigante */}
      <div className={`text-center p-4 md:p-6 rounded-3xl border-2 mb-4 shadow-2xl relative overflow-hidden transition-all duration-300 ${
        isHalloween
          ? "bg-gradient-to-r from-zinc-950 via-purple-950/70 to-zinc-950 border-orange-500/50 shadow-orange-950/30"
          : "bg-gradient-to-r from-zinc-950 via-amber-950/40 to-zinc-950 border-amber-500/50 shadow-amber-950/30"
      }`}>
        <span className={`inline-block text-[11px] font-black uppercase tracking-widest px-3 py-1 rounded-full border mb-2 ${
          isHalloween
            ? "bg-orange-500/20 text-orange-400 border-orange-500/40"
            : "bg-amber-500/20 text-amber-400 border-amber-500/40"
        }`}>
          {questionData?.category || "100 Deportistas Dijeron"}
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-wide leading-tight drop-shadow-md">
          {questionData?.question || "Cargando pregunta..."}
        </h2>
      </div>

      {/* Grid de Respuestas (2 Columnas x 4 Filas) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 perspective-1000">
        {answers.map((answer, index) => {
          const isRevealed = revealedAnswers.includes(index);
          const answerNumber = index + 1;

          return (
            <div
              key={index}
              onClick={() => onToggleAnswer(index)}
              className="cursor-pointer group select-none min-h-[64px] md:min-h-[72px]"
              title={`Clic o presiona [${answerNumber}] para ${isRevealed ? "ocultar" : "revelar"}`}
            >
              <div
                className={`w-full h-full rounded-2xl border-2 p-1 transition-all duration-500 transform-style-3d ${
                  isRevealed
                    ? isHalloween
                      ? "bg-gradient-to-r from-orange-950/90 via-zinc-900 to-zinc-900 border-orange-500/80 shadow-lg shadow-orange-900/30"
                      : "bg-gradient-to-r from-amber-950/90 via-zinc-900 to-zinc-900 border-amber-500/80 shadow-lg shadow-amber-900/30"
                    : "bg-gradient-to-b from-zinc-900 to-zinc-950 border-zinc-700/80 hover:border-zinc-500 hover:scale-[1.01]"
                }`}
              >
                {isRevealed ? (
                  // TARJETA REVELADA
                  <div className="flex items-center justify-between w-full h-full px-4 py-2 gap-3">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-sm flex-shrink-0 ${
                        isHalloween
                          ? "bg-orange-500 text-zinc-950"
                          : "bg-amber-500 text-zinc-950"
                      }`}>
                        {answerNumber}
                      </div>
                      <span className="font-extrabold text-base md:text-xl text-white tracking-wide truncate">
                        {answer.text}
                      </span>
                    </div>

                    {/* Puntaje de la respuesta */}
                    <div className={`px-4 py-1.5 rounded-xl font-black text-xl md:text-2xl shadow-inner flex items-center justify-center min-w-[56px] ${
                      isHalloween
                        ? "bg-orange-500/20 border border-orange-500/60 text-orange-400"
                        : "bg-amber-500/20 border border-amber-500/60 text-amber-400"
                    }`}>
                      {answer.points}
                    </div>
                  </div>
                ) : (
                  // TARJETA OCULTA (Misterio)
                  <div className="flex items-center justify-center w-full h-full py-3 relative">
                    <div className="w-10 h-10 rounded-2xl bg-zinc-800/90 border border-zinc-700 flex items-center justify-center group-hover:scale-110 group-hover:border-zinc-500 transition-all shadow-md">
                      <span className="font-black text-xl text-zinc-400 group-hover:text-white">
                        {answerNumber}
                      </span>
                    </div>
                    <span className="absolute right-4 text-[11px] text-zinc-600 font-bold uppercase tracking-wider group-hover:text-zinc-400">
                      [Tecla {answerNumber}]
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
