export const addLocalStorage = (name, value) => {
    localStorage.setItem(name, JSON.stringify(value))
}