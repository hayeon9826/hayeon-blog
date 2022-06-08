export function getValue(key) {
    if (typeof window === 'undefined') return;
    return JSON.parse(window.localStorage.getItem(key));
  }
  
  export function setValue(key, value) {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(key, JSON.stringify(value));
  }