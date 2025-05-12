// src/utils/localStorage.js
export const saveToLocal = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };
  
  export const loadFromLocal = (key) => {
    const item = localStorage.getItem(key);
    if (item === null) return null;
    try {
      return JSON.parse(item);
    } catch (e) {
      console.error('Error al parsear localStorage:', e);
      return null;
    }
  };