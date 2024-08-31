// Функция для озвучивания слова
export function speakWord(word) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'de-DE'; // Немецкий язык
    utterance.rate = 1.3; // Скорость 1.5 для ускоренного воспроизведения
    window.speechSynthesis.speak(utterance);
}