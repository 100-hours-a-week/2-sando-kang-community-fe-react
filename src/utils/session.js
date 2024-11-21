export function saveLocalStorage(key, value) {
    localStorage.removeItem(key);
    localStorage.setItem(key, value);
}
  
export function getLocalStorage(key) {
    const storedValue = localStorage.getItem(key);
    return storedValue;
}