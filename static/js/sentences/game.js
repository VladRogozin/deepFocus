import { showElement } from './showElement.js';

// Получаем элемент с id "gameData"
const gameDataElement = document.getElementById('gameData');

// Извлекаем JSON-данные из атрибута data-elements
const gameStateData = JSON.parse(gameDataElement.getAttribute('data-elements'));

// Теперь у нас есть доступ к данным для игры
const gameState = {
    elements: gameStateData || [],  // Убедитесь, что gameStateData — это массив
    currentIndex: 0,
    correctCount: 0
};

// Начало игры
function initializeGame() {
    if (gameState.elements.length > 0) {
        showElement(gameState, gameState.currentIndex); // Передаем gameState как аргумент
    } else {
        alert("No game elements found");
    }
}

// Обновление прогресса игры
function updateProgress() {
    const progressBar = document.getElementById('progressBar');
    const totalElements = gameState.elements.length;
    const currentProgress = Math.round(((gameState.currentIndex + 1) / totalElements) * 100); // Добавляем +1 к индексу
    progressBar.style.width = `${currentProgress}%`;
    progressBar.setAttribute('aria-valuenow', currentProgress);
}

// Запуск игры
initializeGame();