// Elimina etiquetas HTML, saltos de línea extraños y espacios dobles
export const limpiarTextoIA = (texto) => {
  if (!texto) return "";

  const sinHTML = texto.replace(/<[^>]+>/g, "");

  const limpio = sinHTML
    .replace(/\n/g, " ")
    .replace(/\s+/g, " ")
    .replace(/^\s+|\s+$/g, "");

  return limpio.replace(/^IA:\s*/i, "");
};

// Divide el texto limpio en párrafos
export const dividirEnParrafos = (texto) => {
  const limpio = limpiarTextoIA(texto);

  // Divide por puntos seguidos de espacio o saltos de línea
  return limpio.split(/\.\s+|\n+/).map(p => p.trim()).filter(p => p.length > 0);
};
