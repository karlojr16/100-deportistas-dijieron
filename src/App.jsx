import React, { useState, useEffect, useMemo, useCallback } from "react";
import confetti from "canvas-confetti";
import { Header } from "./components/Header";
import { ScoreBoard } from "./components/ScoreBoard";
import { TimerCountdown } from "./components/TimerCountdown";
import { BoardAnswers } from "./components/BoardAnswers";
import { StrikeOverlay } from "./components/StrikeOverlay";
import { HostControlBar } from "./components/HostControlBar";
import { BuzzerView } from "./components/BuzzerView";
import { QuestionEditorModal } from "./components/QuestionEditorModal";
import { FastMoneyModal } from "./components/FastMoneyModal";
import { RulesModal } from "./components/RulesModal";
import { sounds } from "./utils/soundManager";
import { loadQuestions, saveQuestions, loadSettings, saveSettings } from "./utils/storage";

export function App() {
  // Configuración y persistencia
  const initialSettings = useMemo(() => loadSettings(), []);
  const [theme, setTheme] = useState(initialSettings.theme || "halloween");
  const [muted, setMuted] = useState(!initialSettings.soundEnabled);
  const [multiplier, setMultiplier] = useState(initialSettings.multiplier || 1);

  // Vistas y modales
  const [activeView, setActiveView] = useState("board"); // 'board' | 'buzzer'
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isFastMoneyOpen, setIsFastMoneyOpen] = useState(false);
  const [isRulesOpen, setIsRulesOpen] = useState(false);

  // Banco de preguntas
  const [questions, setQuestions] = useState(() => loadQuestions());
  const [currentIndex, setCurrentIndex] = useState(0);

  // Estado del juego en curso
  const [revealedAnswers, setRevealedAnswers] = useState([]);
  const [strikes, setStrikes] = useState(0);
  const [redScore, setRedScore] = useState(0);
  const [blueScore, setBlueScore] = useState(0);

  const currentQuestion = questions[currentIndex] || questions[0];

  // Sincronizar sonido
  useEffect(() => {
    sounds.setMuted(muted);
    saveSettings({ theme, soundEnabled: !muted, multiplier });
  }, [theme, muted, multiplier]);

  // Puntos acumulados en la ronda actual (con multiplicador)
  const roundPoints = useMemo(() => {
    if (!currentQuestion?.answers) return 0;
    const basePoints = revealedAnswers.reduce((sum, idx) => {
      const answer = currentQuestion.answers[idx];
      return sum + (answer?.points || 0);
    }, 0);
    return basePoints * multiplier;
  }, [revealedAnswers, currentQuestion, multiplier]);

  // Manejo de revelación de respuestas
  const toggleAnswer = useCallback((index) => {
    sounds.init();
    setRevealedAnswers((prev) => {
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index);
      } else {
        sounds.playDing();
        return [...prev, index];
      }
    });
  }, []);

  // Manejo de Strikes / Taches
  const addStrike = useCallback(() => {
    sounds.init();
    sounds.playStrike();
    setStrikes((prev) => (prev < 3 ? prev + 1 : 3));
  }, []);

  const clearStrikes = useCallback(() => {
    setStrikes(0);
  }, []);

  // Otorgar puntos de la ronda a un equipo
  const awardPointsToTeam = useCallback((team) => {
    if (roundPoints === 0) return;
    sounds.init();
    sounds.playVictory();

    // Confetti temático
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.7 },
      colors: team === "red" ? ["#ef4444", "#dc2626", "#f87171"] : ["#3b82f6", "#2563eb", "#60a5fa"],
    });

    if (team === "red") {
      setRedScore((prev) => prev + roundPoints);
    } else {
      setBlueScore((prev) => prev + roundPoints);
    }

    // Limpiar ronda para la siguiente pregunta
    setRevealedAnswers([]);
    setStrikes(0);
  }, [roundPoints]);

  const handleManualScoreAdjust = useCallback((team, amount) => {
    if (team === "red") {
      setRedScore((prev) => Math.max(0, prev + amount));
    } else {
      setBlueScore((prev) => Math.max(0, prev + amount));
    }
  }, []);

  // Navegación de preguntas
  const goToNextQuestion = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setRevealedAnswers([]);
      setStrikes(0);
    }
  }, [currentIndex, questions.length]);

  const goToPrevQuestion = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setRevealedAnswers([]);
      setStrikes(0);
    }
  }, [currentIndex]);

  const revealAllAnswers = useCallback(() => {
    if (!currentQuestion?.answers) return;
    sounds.init();
    sounds.playDing();
    const all = currentQuestion.answers.map((_, i) => i);
    setRevealedAnswers(all);
  }, [currentQuestion]);

  const hideAllAnswers = useCallback(() => {
    setRevealedAnswers([]);
  }, []);

  const resetRound = useCallback(() => {
    setRevealedAnswers([]);
    setStrikes(0);
  }, []);

  const resetGame = useCallback(() => {
    if (confirm("¿Reiniciar toda la partida? Los marcadores de Rojo y Azul volverán a 0.")) {
      setRedScore(0);
      setBlueScore(0);
      setRevealedAnswers([]);
      setStrikes(0);
      setCurrentIndex(0);
    }
  }, []);

  const awardOverallWinner = useCallback(() => {
    sounds.init();
    sounds.playVictory();

    let winColor = "#f59e0b";
    let winnerText = "¡EMPATE EMOCIONANTE!";

    if (redScore > blueScore) {
      winColor = "#ef4444";
      winnerText = "¡CAMPEÓN DE HALLOWEEN: EQUIPO ROJO! 🥊";
    } else if (blueScore > redScore) {
      winColor = "#3b82f6";
      winnerText = "¡CAMPEÓN DE HALLOWEEN: EQUIPO AZUL! 🥊";
    }

    confetti({
      particleCount: 250,
      spread: 100,
      origin: { y: 0.5 },
      colors: [winColor, "#eab308", "#a855f7", "#ffffff"],
    });

    alert(winnerText);
  }, [redScore, blueScore]);

  // Atajos globales de teclado para el maestro / moderador
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Si está escribiendo en un input o en un modal abierto, no interferir
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
      if (isEditorOpen || isFastMoneyOpen || isRulesOpen) return;
      if (activeView !== "board") return;

      if (e.key === " " || e.code === "Space") {
        e.preventDefault();
        sounds.playBoxingBell();
      } else if (e.key === "x" || e.key === "X") {
        e.preventDefault();
        addStrike();
      } else if (e.key === "c" || e.key === "C") {
        e.preventDefault();
        clearStrikes();
      } else if (e.key === "r" || e.key === "R") {
        e.preventDefault();
        awardPointsToTeam("red");
      } else if (e.key === "a" || e.key === "A") {
        e.preventDefault();
        awardPointsToTeam("blue");
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goToNextQuestion();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goToPrevQuestion();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    activeView, 
    isEditorOpen, 
    isFastMoneyOpen, 
    isRulesOpen, 
    addStrike, 
    clearStrikes, 
    awardPointsToTeam, 
    goToNextQuestion, 
    goToPrevQuestion
  ]);

  const isHalloween = theme === "halloween";

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500 font-sans ${
      isHalloween 
        ? "bg-zinc-950 text-zinc-100 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-zinc-950 to-black"
        : "bg-zinc-950 text-zinc-100 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-zinc-950 to-black"
    }`}>
      
      {/* Cabecera Principal */}
      <Header
        activeView={activeView}
        setActiveView={setActiveView}
        theme={theme}
        setTheme={setTheme}
        muted={muted}
        toggleSound={() => setMuted(!muted)}
        onOpenRules={() => setIsRulesOpen(true)}
        onOpenFastMoney={() => setIsFastMoneyOpen(true)}
        onOpenEditor={() => setIsEditorOpen(true)}
      />

      {/* Vista de Pulsador Móvil Dividido (Para celular en mesa) */}
      {activeView === "buzzer" ? (
        <BuzzerView onBackToBoard={() => setActiveView("board")} />
      ) : (
        /* Vista de Tablero Principal (Proyector / TV) */
        <main className="flex-1 flex flex-col justify-between py-2">
          
          <div>
            {/* Marcadores de Equipos & Puntos de Ronda */}
            <ScoreBoard
              redScore={redScore}
              blueScore={blueScore}
              roundPoints={roundPoints}
              multiplier={multiplier}
              setMultiplier={setMultiplier}
              currentRound={currentIndex + 1}
              totalRounds={questions.length}
              category={currentQuestion?.category}
              onAwardPoints={awardPointsToTeam}
              onManualScoreAdjust={handleManualScoreAdjust}
            />

            {/* Temporizador de 8 Segundos (Requisito clave: Strike si no dicen la palabra) */}
            <div className="max-w-6xl mx-auto px-4 my-2">
              <TimerCountdown onTimeExpired={addStrike} />
            </div>

            {/* Cruces de Strike / Taches & Alerta de Robo */}
            <StrikeOverlay
              strikes={strikes}
              onAddStrike={addStrike}
              onClearStrikes={clearStrikes}
            />

            {/* Tablero de Respuestas (Tarjetas Flip 3D) */}
            <BoardAnswers
              questionData={currentQuestion}
              revealedAnswers={revealedAnswers}
              onToggleAnswer={toggleAnswer}
              theme={theme}
            />
          </div>

          {/* Barra de Control Inferior del Moderador */}
          <HostControlBar
            currentIndex={currentIndex}
            totalQuestions={questions.length}
            onPrevQuestion={goToPrevQuestion}
            onNextQuestion={goToNextQuestion}
            onRevealAll={revealAllAnswers}
            onHideAll={hideAllAnswers}
            onResetRound={resetRound}
            onResetGame={resetGame}
            onAwardWinner={awardOverallWinner}
          />

        </main>
      )}

      {/* Modales: Gestor de Preguntas, Ronda Rápida y Reglas */}
      <QuestionEditorModal
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        questions={questions}
        setQuestions={(qs) => {
          setQuestions(qs);
          saveQuestions(qs);
        }}
        onSelectQuestion={(idx) => {
          setCurrentIndex(idx);
          setRevealedAnswers([]);
          setStrikes(0);
        }}
      />

      <FastMoneyModal
        isOpen={isFastMoneyOpen}
        onClose={() => setIsFastMoneyOpen(false)}
      />

      <RulesModal
        isOpen={isRulesOpen}
        onClose={() => setIsRulesOpen(false)}
      />

    </div>
  );
}

export default App;
