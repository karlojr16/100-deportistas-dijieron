import { DEFAULT_QUESTIONS } from "../data/defaultQuestions";

const QUESTIONS_KEY = "dinastia_ontiveros_questions_v1";
const SETTINGS_KEY = "dinastia_ontiveros_settings_v1";

export function loadQuestions() {
  try {
    const raw = localStorage.getItem(QUESTIONS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error("Error al cargar preguntas de localStorage:", e);
  }
  return DEFAULT_QUESTIONS;
}

export function saveQuestions(questions) {
  try {
    localStorage.setItem(QUESTIONS_KEY, JSON.stringify(questions));
  } catch (e) {
    console.error("Error al guardar preguntas:", e);
  }
}

export function resetQuestionsToDefault() {
  try {
    localStorage.removeItem(QUESTIONS_KEY);
  } catch (e) {
    console.error("Error al resetear preguntas:", e);
  }
  return DEFAULT_QUESTIONS;
}

export function exportQuestionsToFile(questions) {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(questions, null, 2));
  const downloadAnchor = document.createElement("a");
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `preguntas_dinastia_ontiveros_${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

export function importQuestionsFromFile(file, onSuccess, onError) {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const content = e.target.result;
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed) && parsed.length > 0) {
        saveQuestions(parsed);
        onSuccess(parsed);
      } else {
        onError("El archivo JSON no contiene una lista válida de preguntas.");
      }
    } catch (err) {
      onError("No se pudo leer el archivo JSON: " + err.message);
    }
  };
  reader.readAsText(file);
}

export function loadSettings() {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error("Error al cargar configuración:", e);
  }
  return {
    theme: "halloween", // 'halloween' o 'dojang'
    soundEnabled: true,
    multiplier: 1,
  };
}

export function saveSettings(settings) {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (e) {
    console.error("Error al guardar configuración:", e);
  }
}
