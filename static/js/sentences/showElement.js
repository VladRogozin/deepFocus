import { renderSentenceOrder } from './type_game_elements/renderSentenceOrder.js';
import { renderAudioSentence } from './type_game_elements/renderAudioSentence.js';
import { renderWordTranslation } from './type_game_elements/renderWordTranslation.js';
import { renderWordOrigin } from './type_game_elements/renderWordOrigin.js';
import { renderAudioWordTranslation } from './type_game_elements/renderAudioWordTranslation.js';
import { updateProgress } from './updateProgress.js';

let gameStateGlob = null;

// Рендеринг элемента игры в зависимости от его типа
export function showElement(gameState, index) {
    // Проверяем, существует ли элемент по данному индексу
    if (!gameState || !gameState.elements || index >= gameState.elements.length || index < 0) {
        console.error('Некорректный индекс или gameState');
        return;
    }

    const element = gameState.elements[index];
    const gameContainer = document.getElementById('gameContainer');

    // Удаляем текущий элемент с эффектом fade-out
    gameContainer.classList.add('fade-out');
    setTimeout(() => {
        // После окончания анимации (500ms), очищаем контейнер
        gameContainer.innerHTML = '';

        // Обновляем прогресс
        updateProgress(gameState);

        gameStateGlob = gameState;

        // Рендерим элемент в зависимости от его типа
        if (element.type === 'sentence_order') {
            renderSentenceOrder(element);
        } else if (element.type === 'audio_sentence') {
            renderAudioSentence(element);
        } else if (element.type === 'word_translation') {
            renderWordTranslation(element);
        } else if (element.type === 'audio_word_translation') {
            renderAudioWordTranslation(element);
        } else if (element.type === 'word_origin') {
            renderWordOrigin(element);
        }

        // Плавное появление нового элемента
        gameContainer.classList.remove('fade-out');
        gameContainer.classList.add('fade-in', 'visible');
    }, 500); // Длительность анимации должна совпадать с transition из CSS
}

// Переход к следующему элементу
export function nextElement() {
    gameStateGlob.currentIndex++;
    if (gameStateGlob.currentIndex < gameStateGlob.elements.length) {
        showElement(gameStateGlob, gameStateGlob.currentIndex); // Передаем и gameStateGlob, и текущий индекс
    } else {
        showAlert("Игра завершена!", "success");
    }
}
