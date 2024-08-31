import { checkSentenceOrder } from '../checking_correctness/checkSentenceOrder.js';
import { speakWord } from '../speakWord.js';

export function renderSentenceOrder(element) {
    const gameContainer = document.getElementById('gameContainer');
    const words = element.german_sentence.split(' ');

    // Перемешиваем слова
    shuffleArray(words);

    // Добавляем контент с fade-in классом
    gameContainer.innerHTML = `
        <div class="fade-in visible">
            <h3 class="mb-4" style="color: #fdd03b;">Соберите предложение:</h3>
            <h3 class="mb-4 text-white p-3 rounded text-center" style="background-color: #4a9396;">${element.translation}</h3>

            ${element.image ? `<div class="d-flex justify-content-center mb-3">
                <img src="${element.image}" alt="Image" class="img-fluid" style="max-width: 100%; width: ${window.innerWidth >= 768 ? '300px' : '200px'}; height: auto;">
            </div>` : ''}

            <!-- Контейнер для ответа -->
            <div id="targetBox" class="border p-3 rounded mb-3" style="min-height: 100px; border-color: #b4d9ec;"></div>

            <!-- Контейнер для выбора слов -->
            <div id="wordsBox" class="border p-3 rounded mb-3" style="min-height: 100px; border-color: #b4d9ec;">
                ${words.map(word => `<button class="btn text-white m-1 word-button" style="background-color: #00202e;">${word}</button>`).join('')}
            </div>

            <button id="checkSentenceOrderBtn" class="btn mt-2" style="background-color: #fdd03b; color: #00202e;">Проверить</button>
        </div>
    `;

    // Добавляем обработчики событий для кнопок после рендеринга
    const wordButtons = document.querySelectorAll('#wordsBox .word-button');
    wordButtons.forEach(button => {
        button.addEventListener('click', () => {
            moveWordToTarget(button.textContent, button);
        });
    });

    // Добавляем обработчик события для кнопки "Проверить"
    const checkButton = document.getElementById('checkSentenceOrderBtn');
    checkButton.addEventListener('click', () => {
        checkSentenceOrder(element.german_sentence);  // Используем event listener вместо onclick
    });
}
// Функция для перемещения слова из контейнера выбора в контейнер ответа (с озвучиванием)
export function moveWordToTarget(word, btnElement) {
    const targetBox = document.getElementById('targetBox');
    const wordsBox = document.getElementById('wordsBox');

    // Добавляем слово в контейнер ответа
    const newWordElement = document.createElement('button');
    newWordElement.className = 'btn text-white m-1 word-button';
    newWordElement.style.backgroundColor = '#00202e';
    newWordElement.textContent = word;
    newWordElement.onclick = function () {
        moveWordBackToChoices(word, newWordElement); // Возвращение слова в контейнер выбора
    };
    targetBox.appendChild(newWordElement);

    // Удаляем слово из контейнера выбора
    wordsBox.removeChild(btnElement);

    // Озвучиваем слово при добавлении в контейнер ответа
    speakWord(word);
}

// Функция для перемещения слова обратно в контейнер выбора (без озвучивания)
export function moveWordBackToChoices(word, btnElement) {
    const wordsBox = document.getElementById('wordsBox');
    const targetBox = document.getElementById('targetBox');

    // Добавляем слово обратно в контейнер выбора
    const newWordElement = document.createElement('button');
    newWordElement.className = 'btn text-white m-1 word-button';
    newWordElement.style.backgroundColor = '#00202e';
    newWordElement.textContent = word;
    newWordElement.onclick = function () {
        moveWordToTarget(word, newWordElement); // Добавляем обратно в контейнер ответа
    };
    wordsBox.appendChild(newWordElement);

    // Удаляем слово из контейнера ответа
    targetBox.removeChild(btnElement);
}


// Вспомогательная функция для перемешивания массива
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
