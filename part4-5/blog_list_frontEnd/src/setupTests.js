let savedItems = {}

const localStorageMock = {
    
    setItem: (key, item) => {
        savedItems[key] = item
    },
    
    getItem: (key) => savedItems[key] || null,

    clear: () => {
        savedItems = {}
    }
}

Object.defineProperty(window, 'localStorage', { value: localStorageMock })