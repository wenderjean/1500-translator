export const removeAccent = text => {
  if(!str.normalize) return text
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
}

