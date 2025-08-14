# 🚀 Instrucciones para Live Server - PEPE MOON

## 📋 Opciones para Ver tu Website

### 🎯 **Opción 1: Abrir Directamente (Más Simple)**
1. Ve a la carpeta `web`
2. Haz **doble clic** en `index.html`
3. Se abrirá en tu navegador predeterminado
4. ✅ **Ventaja**: No requiere instalación adicional

### 🌐 **Opción 2: Live Server con Node.js**
1. **Reinicia** tu terminal/PowerShell (para que reconozca Node.js)
2. Navega a la carpeta `web`: `cd web`
3. Ejecuta: `npx live-server --port=8080 --open=/index.html`
4. Se abrirá automáticamente en `http://localhost:8080`
5. ✅ **Ventaja**: Actualización automática al cambiar archivos

### 🐍 **Opción 3: Python (si tienes Python instalado)**
1. Abre terminal en la carpeta `web`
2. Ejecuta: `python -m http.server 8080`
3. Abre tu navegador y ve a `http://localhost:8080`
4. ✅ **Ventaja**: Python viene preinstalado en Windows 10/11

### 💻 **Opción 4: VS Code Live Server (Recomendado)**
1. Instala **VS Code** si no lo tienes
2. Abre la carpeta `web` en VS Code
3. Instala la extensión **"Live Server"** (Ritwick Dey)
4. Haz clic derecho en `index.html` → "Open with Live Server"
5. ✅ **Ventaja**: Mejor experiencia de desarrollo

## 🚀 **Scripts Automáticos**

### **Windows (Batch)**
- Doble clic en `start-server.bat`
- Se ejecutará automáticamente

### **PowerShell**
- Haz clic derecho en `start-server.ps1`
- Selecciona "Ejecutar con PowerShell"

## 🔧 **Solución de Problemas**

### **❌ "Node no se reconoce"**
- **Solución**: Reinicia tu terminal/PowerShell
- **Alternativa**: Usa la Opción 1 (abrir directamente)

### **❌ Puerto 8080 ocupado**
- **Solución**: Cambia el puerto en los scripts
- **Ejemplo**: `--port=3000` en lugar de `--port=8080`

### **❌ No se abre automáticamente**
- **Solución**: Abre manualmente `http://localhost:8080`
- **Alternativa**: Usa la Opción 1

## 📱 **Ver en Móvil**

### **Misma Red WiFi**
1. Encuentra tu IP local: `ipconfig` en Windows
2. En tu móvil, ve a: `http://TU_IP:8080`
3. **Ejemplo**: `http://192.168.1.100:8080`

### **Túnel Local (ngrok)**
1. Instala ngrok: `npm install -g ngrok`
2. Ejecuta: `ngrok http 8080`
3. Usa la URL que te da ngrok

## 🎮 **Probar los Juegos**

Una vez que tengas el servidor funcionando:

1. **Flappy Pepe**: Haz clic en el botón del juego
2. **Snake Pepe**: Usa las flechas del teclado
3. **Tetris Pepe**: Flechas para mover y rotar

## 🌟 **Recomendación**

Para desarrollo rápido, usa la **Opción 1** (abrir directamente).
Para desarrollo profesional, usa la **Opción 4** (VS Code + Live Server).

---

**🚀 ¡Tu website PEPE MOON está lista para la luna! 🌙**


