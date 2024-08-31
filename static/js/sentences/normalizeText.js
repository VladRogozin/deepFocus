

// Функция для нормализации строки: приведение к нижнему регистру и удаление неалфавитных символов
export function normalizeText(text) {
    return text.toLowerCase().replace(/[^a-zа-яё0-9\s]/gi, '').replace(/\s+/g, ' ').trim();
}