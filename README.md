# 🥊 100 Deportistas Dijeron • Dinastía Ontiveros
### 🎃 Especial de Halloween (Kickboxing, Muay Thai y Boxeo)

Aplicación web interactiva inspirada en el formato de *"100 Mexicanos Dijeron"*, creada especialmente para la fiesta y convivio de Halloween de la academia **DINASTÍA ONTIVEROS**.

---

## 🚀 Cómo Iniciar el Juego

### Opción 1 (La más fácil en Windows):
Haz doble clic sobre el archivo **`INICIAR_JUEGO.bat`**.  
Se abrirá automáticamente en tu navegador predeterminado (Chrome, Edge, etc.).

### Opción 2 (Por terminal):
```bash
npm run dev
```

> **Consejo para usar en el dojo:** Como corre en modo `--host`, si tu laptop y tu celular están en la misma red Wi-Fi (o compartes datos desde el celular con Zona Wi-Fi), puedes abrir en el celular la dirección que te muestra la terminal (ejemplo: `http://192.168.1.XX:5173`) y poner el celular en la mesa con el **Pulsador Móvil** mientras la laptop proyecta el **Tablero TV**.

---

## 🥋 Características y Funcionalidades

1. **Tablero Principal (Para Proyector o TV):**
   - Logo oficial de **Dinastía Ontiveros** con modo **🎃 Halloween** y modo **🥋 Dojo Clásico**.
   - Tarjetas abatibles con efecto 3D flip card numeradas del 1 al 8.
   - Marcador para **Equipo Rojo** y **Equipo Azul** con iconos de guantes de boxeo.
   - Puntos acumulados de la ronda con multiplicadores (x1, x2, x3).
   - **Contador de 8 Segundos con Alarma y Strike Automático:** Si el alumno no dice la palabra a tiempo, suena la alarma y se le otorga un tache automáticamente.
   - **3 Strikes / Taches (XXX):** Al llegar a 3 taches, se activa en pantalla la alerta de **¡ROBO DE PUNTOS PARA EL RIVAL!**.
   - Efectos de sonido integrados mediante Web Audio API (100% offline, cero archivos faltantes):
     - Campanazo de boxeo (Round start).
     - Ding de acierto de TV.
     - Buzzer grave de error / strike ("¡EHHH!").
     - Alarma de tiempo agotado.
     - Timbre de pulsador.
     - Fanfarria triunfal y lluvia de confetti.

2. **Pulsador Móvil Dividido (Para Celular):**
   - Pantalla dividida mitad **Rojo** / mitad **Azul**.
   - Detección de milisegundos para saber quién oprimió primero.
   - Bloqueo instantáneo con vibración en el móvil y aviso en pantalla gigante.

3. **Gestor de Preguntas (Panel de Administración):**
   - Agrega tus propias preguntas con hasta 8 respuestas y sus puntajes.
   - Edita o elimina preguntas existentes.
   - Descarga tus preguntas en un archivo JSON como respaldo.
   - Restaura en cualquier momento las preguntas originales de Dinastía Ontiveros.

4. **Ronda Rápida / Muerte Súbita (Fast Money):**
   - Cronómetro de 20 segundos para preguntas relámpago con los capitanes.

---

## ⌨️ Atajos de Teclado del Maestro / Conductor

| Tecla | Acción |
| :--- | :--- |
| **`1` al `8`** | Revela la respuesta correspondiente |
| **`T`** | Inicia / Reinicia el contador de **8 segundos** |
| **`X`** | Suma un **Strike / Tache** |
| **`C`** | Limpia los strikes de la ronda |
| **`R`** | Asigna todos los puntos de la ronda al **Equipo Rojo** |
| **`A`** | Asigna todos los puntos de la ronda al **Equipo Azul** |
| **`Espacio`** | Suena la campana oficial de boxeo |
| **`←` / `→`** | Cambia a la pregunta anterior o siguiente |
| **`F11`** | Activa la pantalla completa para proyector |

---

## 📝 Preguntas Precargadas de la Academia
- Frases de la Maestra Yared (`"¿Sale?"`, `"¡Sube la guardia!"`, etc.)
- Olvidos clásicos (bucal, vendas, cinta, toalla, agua).
- Castigos más temidos (burpees, saltos en escuadra, abdominales en V).
- Frases prohibidas en el tatami (`"No puedo"`, `"Ya me cansé"`).
- Sparrings, monstruos de Halloween boxeadores, y anécdotas del gimnasio.
