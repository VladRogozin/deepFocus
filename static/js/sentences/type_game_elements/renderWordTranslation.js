import { checkWordTranslation } from '../checking_correctness/checkWordTranslation.js';

// Рендеринг для типа 'word_translation'
export function renderWordTranslation(element) {
    const gameContainer = document.getElementById('gameContainer');

    gameContainer.innerHTML = `
    <div class="fade-in visible">
        <h3 class="mb-4">Введите перевод слова "${element.german_word}":</h3>
        ${element.image ? `<div class="d-flex justify-content-center mb-3">
            <img src="${element.image}" alt="Image" class="img-fluid" style="max-width: 100%; width: ${window.innerWidth >= 768 ? '300px' : '200px'}; height: auto;">
        </div>` : ''}

        <input type="text" class="form-control mb-3" id="userTranslation" placeholder="Введите перевод">
        <button id="checkTranslationBtn" class="btn btn-primary">Проверить</button>
    </div>
    `;

    // Добавляем обработчик события через JavaScript
    const checkButton = document.getElementById('checkTranslationBtn');
    checkButton.addEventListener('click', () => {
        checkWordTranslation(element.translation);
    });
}