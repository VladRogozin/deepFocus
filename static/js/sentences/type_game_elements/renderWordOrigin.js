import { checkWordOrigin } from '../checking_correctness/checkWordOrigin.js';



// Рендеринг для типа 'word_origin'
export function renderWordOrigin(element) {
    const gameContainer = document.getElementById('gameContainer');

    gameContainer.innerHTML = `
    <div class="fade-in visible">
        <h3 class="mb-4">Введите перевод слова "${element.translation}":</h3>
        ${element.image ? `<div class="d-flex justify-content-center mb-3">
            <img src="${element.image}" alt="Image" class="img-fluid" style="max-width: 100%; width: ${window.innerWidth >= 768 ? '300px' : '200px'}; height: auto;">
        </div>` : ''}

        <input type="text" class="form-control mb-3" id="userGermanWord" placeholder="Введите перевод">
        <button id="checkWordOriginBtn" class="btn btn-primary">Проверить</button>
    </div>
    `;

    // Добавляем обработчик события через JavaScript
    const checkButton = document.getElementById('checkWordOriginBtn');
    checkButton.addEventListener('click', () => {
        checkWordOrigin(element.german_word);
    });
}