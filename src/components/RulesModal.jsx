import React from "react";
import { X, Trophy, Keyboard, Smartphone, Bell, Flame, Ghost, CheckCircle2 } from "lucide-react";

export function RulesModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 md:p-6 overflow-y-auto">
      <div className="bg-zinc-950 border-2 border-zinc-700 w-full max-w-2xl rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/80">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-orange-500/20 text-orange-400 border border-orange-500/40">
              <Ghost className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-amber-400 uppercase tracking-wide">
                Reglas y Guía del Juego
              </h2>
              <span className="text-xs text-zinc-400">
                100 Deportistas Dijeron • Dinastía Ontiveros
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

        {/* Contenido */}
        <div className="p-6 overflow-y-auto space-y-5 text-zinc-300 text-sm">
          
          {/* Cómo Jugar */}
          <div>
            <h3 className="font-black text-amber-400 text-base uppercase tracking-wider mb-2 flex items-center gap-2">
              <Flame className="w-4 h-4 text-orange-500" />
              <span>Dinámica de la Competencia</span>
            </h3>
            <ul className="space-y-2 list-disc list-inside text-zinc-300">
              <li>
                <strong>Frente a Frente (Pulsador inicial):</strong> Pasan dos alumnos (uno del Equipo Rojo y uno del Equipo Azul). El réferi lee la pregunta y el que presione primero el pulsador en el celular (o toque su campana física) tiene el turno.
              </li>
              <li>
                <strong>Ganar la Ronda:</strong> Si dice la respuesta #1 (la más popular), su equipo toma el control de la ronda. Si dice una menor, el rival tiene oportunidad de superarlo.
              </li>
              <li>
                <strong>Contador de 8 Segundos:</strong> Cada miembro del equipo tiene <strong>8 segundos</strong> para responder. Si no dice una palabra a tiempo, se escucha la alarma y se le da un <strong>Strike (Tache)</strong> automáticamente.
              </li>
              <li>
                <strong>Regla de los 3 Taches (Strikes):</strong> Si acumulan 3 errores, el turno pasa al equipo contrario para una oportunidad de <strong>¡ROBO DE PUNTOS!</strong>
              </li>
              <li>
                <strong>Multiplicadores:</strong> Ronda 1 vale puntos simples (x1), Ronda 2 puntos dobles (x2) y Ronda 3 puntos triples (x3).
              </li>
            </ul>
          </div>

          {/* Atajos de Teclado del Maestro / Conductor */}
          <div className="bg-zinc-900 p-4 rounded-2xl border border-zinc-800">
            <h3 className="font-black text-amber-400 text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
              <Keyboard className="w-4 h-4 text-amber-400" />
              <span>Atajos Rápidos de Teclado (Para la Laptop)</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-2">
                <kbd className="bg-zinc-800 text-amber-400 font-mono px-2 py-1 rounded border border-zinc-700">1 al 8</kbd>
                <span>Revela la respuesta #</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="bg-zinc-800 text-amber-400 font-mono px-2 py-1 rounded border border-zinc-700">T</kbd>
                <span>Inicia el contador de 8 segundos</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="bg-zinc-800 text-red-400 font-mono px-2 py-1 rounded border border-zinc-700">X</kbd>
                <span>Suma 1 Strike / Tache</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="bg-zinc-800 text-zinc-300 font-mono px-2 py-1 rounded border border-zinc-700">C</kbd>
                <span>Limpia los strikes</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="bg-zinc-800 text-red-400 font-mono px-2 py-1 rounded border border-zinc-700">R</kbd>
                <span>Da los puntos al Equipo Rojo</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="bg-zinc-800 text-blue-400 font-mono px-2 py-1 rounded border border-zinc-700">A</kbd>
                <span>Da los puntos al Equipo Azul</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="bg-zinc-800 text-amber-400 font-mono px-2 py-1 rounded border border-zinc-700">Espacio</kbd>
                <span>Suena campana de boxeo</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="bg-zinc-800 text-zinc-300 font-mono px-2 py-1 rounded border border-zinc-700">← / →</kbd>
                <span>Cambia de pregunta</span>
              </div>
            </div>
          </div>

          {/* Opciones de Pulsador */}
          <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex items-start gap-3">
            <Smartphone className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-white text-xs uppercase mb-0.5">
                Pulsadores Físicos vs Pulsador Celular
              </h4>
              <p className="text-xs text-zinc-400">
                Puedes abrir la vista <strong>Pulsador Celular</strong> en un teléfono acostado en la mesa al centro. Si prefieres usar tus campanitas o timbres físicos que ya tienen en el dojo, ¡también es 100% compatible! Solo usa el teclado para registrar las respuestas.
              </p>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-zinc-900 border-t border-zinc-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black text-xs uppercase transition-all shadow-md"
          >
            ¡Entendido, a Jugar!
          </button>
        </div>

      </div>
    </div>
  );
}
