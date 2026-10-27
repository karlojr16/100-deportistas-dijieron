import React, { useState } from "react";
import { 
  X, 
  Plus, 
  Trash2, 
  Edit2, 
  Download, 
  Upload, 
  RotateCcw, 
  Save, 
  Check, 
  AlertCircle 
} from "lucide-react";
import { 
  saveQuestions, 
  resetQuestionsToDefault, 
  exportQuestionsToFile, 
  importQuestionsFromFile 
} from "../utils/storage";

export function QuestionEditorModal({
  isOpen,
  onClose,
  questions,
  setQuestions,
  onSelectQuestion,
}) {
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    question: "",
    category: "Dinastía Ontiveros",
    answers: [
      { text: "", points: 40 },
      { text: "", points: 25 },
      { text: "", points: 15 },
      { text: "", points: 10 },
      { text: "", points: 10 },
    ],
  });
  const [msg, setMsg] = useState(null);

  if (!isOpen) return null;

  const totalPoints = formData.answers.reduce((acc, a) => acc + (parseInt(a.points) || 0), 0);

  const startNew = () => {
    setEditingId("new");
    setFormData({
      question: "",
      category: "Dinastía Ontiveros",
      answers: [
        { text: "", points: 40 },
        { text: "", points: 25 },
        { text: "", points: 15 },
        { text: "", points: 10 },
        { text: "", points: 10 },
      ],
    });
  };

  const startEdit = (q) => {
    setEditingId(q.id);
    setFormData({
      question: q.question,
      category: q.category || "General",
      answers: q.answers.map((a) => ({ ...a })),
    });
  };

  const handleAnswerChange = (index, field, value) => {
    const updated = [...formData.answers];
    updated[index] = {
      ...updated[index],
      [field]: field === "points" ? parseInt(value) || 0 : value,
    };
    setFormData({ ...formData, answers: updated });
  };

  const addAnswerSlot = () => {
    if (formData.answers.length >= 8) return;
    setFormData({
      ...formData,
      answers: [...formData.answers, { text: "", points: 5 }],
    });
  };

  const removeAnswerSlot = (index) => {
    if (formData.answers.length <= 2) return;
    const updated = formData.answers.filter((_, i) => i !== index);
    setFormData({ ...formData, answers: updated });
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.question.trim()) {
      alert("Por favor escribe la pregunta.");
      return;
    }

    const filteredAnswers = formData.answers.filter((a) => a.text.trim() !== "");
    if (filteredAnswers.length < 2) {
      alert("Debes ingresar al menos 2 respuestas con texto.");
      return;
    }

    // Ordenar respuestas de mayor a menor puntaje automáticamente
    filteredAnswers.sort((a, b) => b.points - a.points);

    let updatedList;
    if (editingId === "new") {
      const newQuestion = {
        id: "custom-" + Date.now(),
        question: formData.question.trim(),
        category: formData.category.trim(),
        answers: filteredAnswers,
      };
      updatedList = [...questions, newQuestion];
    } else {
      updatedList = questions.map((q) =>
        q.id === editingId
          ? {
              ...q,
              question: formData.question.trim(),
              category: formData.category.trim(),
              answers: filteredAnswers,
            }
          : q
      );
    }

    setQuestions(updatedList);
    saveQuestions(updatedList);
    setEditingId(null);
    setMsg("¡Pregunta guardada exitosamente!");
    setTimeout(() => setMsg(null), 3000);
  };

  const handleDelete = (id) => {
    if (questions.length <= 1) {
      alert("No puedes borrar la última pregunta del juego.");
      return;
    }
    if (confirm("¿Estás seguro de eliminar esta pregunta?")) {
      const updatedList = questions.filter((q) => q.id !== id);
      setQuestions(updatedList);
      saveQuestions(updatedList);
    }
  };

  const handleResetDefaults = () => {
    if (confirm("¿Deseas restaurar el banco oficial de preguntas de Dinastía Ontiveros? Se reemplazarán las preguntas actuales.")) {
      const defaults = resetQuestionsToDefault();
      setQuestions(defaults);
      setEditingId(null);
      setMsg("Banco de preguntas restaurado a los valores por defecto.");
      setTimeout(() => setMsg(null), 3000);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      importQuestionsFromFile(
        file,
        (imported) => {
          setQuestions(imported);
          setEditingId(null);
          setMsg("¡Preguntas importadas con éxito desde el archivo!");
          setTimeout(() => setMsg(null), 3000);
        },
        (err) => {
          alert("Error: " + err);
        }
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 md:p-6 overflow-y-auto">
      <div className="bg-zinc-950 border-2 border-zinc-700 w-full max-w-4xl rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        
        {/* Header del Modal */}
        <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/60">
          <div>
            <h2 className="text-xl md:text-2xl font-black text-amber-400 uppercase tracking-wide">
              Gestor de Preguntas
            </h2>
            <p className="text-xs text-zinc-400">
              Personaliza las preguntas y respuestas de Dinastía Ontiveros para la fiesta
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mensaje de notificación */}
        {msg && (
          <div className="bg-emerald-950/80 border-b border-emerald-500/50 text-emerald-300 text-xs font-bold px-6 py-2 flex items-center gap-2">
            <Check className="w-4 h-4" />
            <span>{msg}</span>
          </div>
        )}

        {/* Contenido / Tabs */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
          
          {/* Si está editando o creando una pregunta */}
          {editingId ? (
            <form onSubmit={handleSave} className="bg-zinc-900 p-5 rounded-2xl border border-zinc-700 space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <h3 className="font-bold text-amber-300 text-base">
                  {editingId === "new" ? "➕ Crear Nueva Pregunta" : "✏️ Editar Pregunta"}
                </h3>
                <button
                  type="button"
                  onClick={() => setEditingId(null)}
                  className="text-xs text-zinc-400 hover:text-white"
                >
                  Cancelar
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-zinc-300 uppercase mb-1">
                    Pregunta:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. ¿Qué es lo que más se les olvida a los alumnos?"
                    value={formData.question}
                    onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-white text-sm focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase mb-1">
                    Categoría:
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. Dinastía Ontiveros"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-white text-sm focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Lista de Respuestas y Puntos */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-zinc-300 uppercase">
                    Respuestas y Puntos (De más a menos popular):
                  </label>
                  <div className={`text-xs font-black px-2 py-0.5 rounded-lg border ${
                    totalPoints === 100
                      ? "bg-emerald-950/60 text-emerald-400 border-emerald-500/50"
                      : "bg-amber-950/60 text-amber-400 border-amber-500/50"
                  }`}>
                    Total: {totalPoints} Pts {totalPoints === 100 ? "✓ (Ideal 100)" : ""}
                  </div>
                </div>

                <div className="space-y-2">
                  {formData.answers.map((answer, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="w-6 text-center font-bold text-zinc-500 text-xs">
                        #{idx + 1}
                      </span>
                      <input
                        type="text"
                        placeholder={`Respuesta ${idx + 1}`}
                        value={answer.text}
                        onChange={(e) => handleAnswerChange(idx, "text", e.target.value)}
                        className="flex-1 bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-1.5 text-white text-sm focus:border-amber-500 focus:outline-none"
                      />
                      <input
                        type="number"
                        min="1"
                        max="100"
                        placeholder="Pts"
                        value={answer.points}
                        onChange={(e) => handleAnswerChange(idx, "points", e.target.value)}
                        className="w-20 bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-1.5 text-center font-bold text-amber-400 text-sm focus:border-amber-500 focus:outline-none"
                      />
                      {formData.answers.length > 2 && (
                        <button
                          type="button"
                          onClick={() => removeAnswerSlot(idx)}
                          className="p-2 text-zinc-500 hover:text-red-400"
                          title="Eliminar este espacio"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {formData.answers.length < 8 && (
                  <button
                    type="button"
                    onClick={addAnswerSlot}
                    className="mt-3 text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Agregar otra respuesta (Hasta 8)</span>
                  </button>
                )}
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setEditingId(null)}
                  className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black text-xs flex items-center gap-1.5 shadow-md shadow-amber-500/20"
                >
                  <Save className="w-4 h-4" />
                  <span>Guardar Pregunta</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={startNew}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 active:scale-95 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Crear Nueva Pregunta</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => exportQuestionsToFile(questions)}
                  className="px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold flex items-center gap-1.5 border border-zinc-700"
                  title="Descargar respaldo de preguntas a un archivo en tu computadora"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Descargar JSON</span>
                </button>

                <label className="px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold flex items-center gap-1.5 border border-zinc-700 cursor-pointer">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Subir JSON</span>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>

                <button
                  onClick={handleResetDefaults}
                  className="px-3 py-1.5 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-300 text-xs font-semibold flex items-center gap-1.5 border border-red-500/30"
                  title="Restaurar las preguntas originales de la academia"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restaurar Oficiales</span>
                </button>
              </div>
            </div>
          )}

          {/* Lista de Preguntas Existentes */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              Preguntas Disponibles ({questions.length})
            </h4>

            <div className="grid grid-cols-1 gap-2.5">
              {questions.map((q, idx) => (
                <div
                  key={q.id}
                  className="p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-between gap-3 hover:border-zinc-700 transition-all"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-black text-amber-400">
                        #{idx + 1}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                        {q.category}
                      </span>
                      <span className="text-[10px] text-zinc-500">
                        {q.answers.length} respuestas
                      </span>
                    </div>
                    <h5 className="font-bold text-white text-sm truncate">
                      {q.question}
                    </h5>
                    <p className="text-xs text-zinc-400 truncate mt-0.5">
                      Top 1: <strong className="text-zinc-200">{q.answers[0]?.text}</strong> ({q.answers[0]?.points} pts)
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => {
                        onSelectQuestion(idx);
                        onClose();
                      }}
                      className="px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-amber-600 hover:text-zinc-950 text-zinc-300 text-xs font-bold transition-all"
                      title="Jugar esta pregunta en el tablero"
                    >
                      Jugar
                    </button>
                    <button
                      onClick={() => startEdit(q)}
                      className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs"
                      title="Editar"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(q.id)}
                      className="p-2 rounded-lg bg-zinc-800 hover:bg-red-900/60 text-zinc-400 hover:text-red-300 text-xs"
                      title="Eliminar"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
