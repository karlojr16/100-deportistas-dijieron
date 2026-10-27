import React from "react";
import { 
  Flame, 
  Smartphone, 
  Tv, 
  Settings, 
  HelpCircle, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Zap,
  Ghost
} from "lucide-react";

export function Header({
  activeView,
  setActiveView,
  theme,
  setTheme,
  muted,
  toggleSound,
  onOpenRules,
  onOpenFastMoney,
  onOpenEditor,
}) {
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.warn("Error al intentar pantalla completa:", err);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const isHalloween = theme === "halloween";

  return (
    <header className={`w-full px-4 py-3 border-b transition-colors duration-300 ${
      isHalloween 
        ? "bg-zinc-950/90 border-orange-500/30 text-zinc-100 backdrop-blur-md" 
        : "bg-zinc-900/90 border-amber-500/30 text-zinc-100 backdrop-blur-md"
    }`}>
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        
        {/* Logo & Marca Dinastía Ontiveros */}
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-xl border flex items-center justify-center shadow-lg transition-transform hover:scale-105 ${
            isHalloween 
              ? "bg-gradient-to-br from-orange-600 via-red-600 to-purple-800 border-orange-400 text-white shadow-orange-900/40" 
              : "bg-gradient-to-br from-amber-500 to-red-700 border-amber-400 text-white shadow-red-950/40"
          }`}>
            {isHalloween ? <Ghost className="w-6 h-6 animate-pulse" /> : <Flame className="w-6 h-6" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl md:text-2xl font-black tracking-wider uppercase bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-amber-200 to-red-500">
                DINASTÍA ONTIVEROS
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-widest ${
                isHalloween
                  ? "bg-purple-950/80 text-orange-300 border-orange-500/40"
                  : "bg-zinc-800 text-amber-400 border-amber-500/40"
              }`}>
                {isHalloween ? "🎃 Halloween Edition" : "🥋 Dojo Edition"}
              </span>
            </div>
            <p className="text-xs text-zinc-400 font-medium">
              100 Deportistas Dijeron • Kickboxing, Muay Thai & Box
            </p>
          </div>
        </div>

        {/* Selector de Vistas / Navegación */}
        <nav className="flex items-center gap-1.5 bg-zinc-900/80 p-1 rounded-xl border border-zinc-800">
          <button
            onClick={() => setActiveView("board")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs md:text-sm font-semibold transition-all ${
              activeView === "board"
                ? isHalloween
                  ? "bg-orange-600 text-white shadow-md shadow-orange-600/30"
                  : "bg-amber-600 text-white shadow-md shadow-amber-600/30"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800"
            }`}
            title="Pantalla principal para proyectar en TV o proyector"
          >
            <Tv className="w-4 h-4" />
            <span>Tablero TV</span>
          </button>

          <button
            onClick={() => setActiveView("buzzer")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs md:text-sm font-semibold transition-all ${
              activeView === "buzzer"
                ? "bg-gradient-to-r from-red-600 to-blue-600 text-white shadow-md shadow-red-900/40"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800"
            }`}
            title="Pulsador táctil dividido para poner en un celular en la mesa"
          >
            <Smartphone className="w-4 h-4" />
            <span>Pulsador Celular</span>
          </button>

          <button
            onClick={onOpenFastMoney}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs md:text-sm font-semibold text-amber-300 hover:text-white hover:bg-zinc-800 transition-all"
            title="Ronda Relámpago / Desempate (20 segundos)"
          >
            <Zap className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Ronda Rápida</span>
          </button>

          <button
            onClick={onOpenEditor}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs md:text-sm font-semibold text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all"
            title="Gestionar y editar preguntas y respuestas"
          >
            <Settings className="w-4 h-4" />
            <span className="hidden sm:inline">Preguntas</span>
          </button>
        </nav>

        {/* Acciones y Utilidades (Tema, Sonido, Reglas, Pantalla Completa) */}
        <div className="flex items-center gap-2">
          {/* Alternar Tema Halloween / Clásico */}
          <button
            onClick={() => setTheme(isHalloween ? "dojang" : "halloween")}
            className={`px-2.5 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-all ${
              isHalloween
                ? "bg-orange-950/40 border-orange-500/50 text-orange-300 hover:bg-orange-900/50"
                : "bg-amber-950/40 border-amber-500/50 text-amber-300 hover:bg-amber-900/50"
            }`}
            title="Cambiar entre tema de Halloween y tema clásico de la academia"
          >
            {isHalloween ? "🎃 Halloween" : "🥋 Dojo"}
          </button>

          {/* Silenciar / Activar Sonido */}
          <button
            onClick={toggleSound}
            className={`p-2 rounded-lg border text-xs transition-all ${
              muted
                ? "bg-red-950/40 border-red-500/50 text-red-400"
                : "bg-zinc-800 border-zinc-700 text-zinc-300 hover:text-white"
            }`}
            title={muted ? "Sonido silenciado (Clic para activar)" : "Sonido activado"}
          >
            {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Ayuda / Reglas */}
          <button
            onClick={onOpenRules}
            className="p-2 rounded-lg border border-zinc-700 bg-zinc-800 text-zinc-300 hover:text-white transition-all"
            title="Reglas del juego y atajos de teclado"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          {/* Pantalla Completa */}
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-lg border border-zinc-700 bg-zinc-800 text-zinc-300 hover:text-white transition-all"
            title="Alternar Pantalla Completa (F11)"
          >
            <Maximize className="w-4 h-4" />
          </button>
        </div>

      </div>
    </header>
  );
}
