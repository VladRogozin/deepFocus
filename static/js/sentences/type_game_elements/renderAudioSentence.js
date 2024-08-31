import { playAudio } from '../playAudio.js';
import { checkAudioSentence } from '../checking_correctness/checkAudioSentence.js';

// Рендеринг для типа 'audio_sentence'
export function renderAudioSentence(element) {
    const gameContainer = document.getElementById('gameContainer');
    gameContainer.innerHTML = `
    <div class="fade-in visible">
        <h3 class="mb-4">Что вы услышали?</h3>
        ${element.image ? `<div class="d-flex justify-content-center mb-3">
            <img src="${element.image}" alt="Image" class="img-fluid" style="max-width: 100%; width: ${window.innerWidth >= 768 ? '300px' : '200px'}; height: auto;">
        </div>` : ''}

        <div class="audio-controls d-flex justify-content-center mb-3">
            <!-- Кнопка с изображением без следов кнопки -->
            <button id="playNormal" class="me-3" style="border: none; background: none; padding: 0;">
                <img id="playNormalImage" src="{% static 'img/sound_static.png' %}" alt="Play Normal" style="width: 40px; height: 40px;">
            </button>

            <button id="playSlow" class="ms-3" style="border: none; background: none; padding: 0;">
                <img id="playSlowImage" src="{% static 'img/slow_sound.png' %}" alt="Play Slow" style="width: 40px; height: 40px;">
            </button>
        </div>

        <audio id="audioPlayer" src="${element.audio}" style="display: none;"></audio>
        <input type="text" class="form-control mb-3" id="userSentence" placeholder="Напишите предложение здесь">
        <button id="checkSentenceBtn" class="btn btn-primary">Проверить</button>
    </div>
    `;

    // Привязываем обработчики событий для аудиокнопок через JavaScript
    document.getElementById('playNormal').addEventListener('click', () => {
        playAudio('normal', element.audio);  // Воспроизводим аудио в нормальной скорости
    });

    document.getElementById('playSlow').addEventListener('click', () => {
        playAudio('slow', element.audio);  // Воспроизводим аудио в замедленной скорости
    });

    // Привязываем обработчик событий для кнопки проверки предложения
    document.getElementById('checkSentenceBtn').addEventListener('click', () => {
        checkAudioSentence(element.german_sentence);  // Проверяем правильность введенного предложения
    });
}
