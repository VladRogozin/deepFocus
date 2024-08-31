



// Обновление прогресса игры
export function updateProgress(gameState) {
    const progressBar = document.getElementById('progressBar');
    const totalElements = gameState.elements.length;
    const currentProgress = Math.round(((gameState.currentIndex + 1) / totalElements) * 100); // Добавляем +1 к индексу
    progressBar.style.width = `${currentProgress}%`;
    progressBar.setAttribute('aria-valuenow', currentProgress);
}
