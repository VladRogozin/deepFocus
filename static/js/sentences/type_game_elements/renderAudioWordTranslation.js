import { playAudio } from '../playAudio.js';
import { checkAudioWordTranslation } from '../checking_correctness/checkAudioWordTranslation.js';

// Рендеринг для типа 'audio_word_translation'
export function renderAudioWordTranslation(element) {
    const gameContainer = document.getElementById('gameContainer');
    gameContainer.innerHTML = `
    <div class="fade-in visible">
        <h3 class="mb-4">Как перевести?</h3>

        <div class="audio-controls d-flex justify-content-center mb-3">
            <button id="playNormal" class="me-3" style="border: none; background: none; padding: 0;">
                <img id="playNormalImage" src="{% static 'img/sound_static.png' %}" alt="Play Normal" style="width: 40px; height: 40px;">
            </button>

            <button id="playSlow" class="ms-3" style="border: none; background: none; padding: 0;">
                <img id="playSlowImage" src="{% static 'img/slow_sound.png' %}" alt="Play Slow" style="width: 40px; height: 40px;">
            </button>
        </div>

        <audio id="audioPlayer" src="${element.audio}" style="display: none;"></audio>
        <input type="text" class="form-control mb-3" id="userAudioTranslation" placeholder="Введите перевод">
        <button id="checkAudioTranslationBtn" class="btn btn-primary">Проверить</button>
    </div>
    `;

    // Привязываем обработчики событий для аудиокнопок через JavaScript
    document.getElementById('playNormal').addEventListener('click', () => {
        playAudio('normal', element.audio);
    });

    document.getElementById('playSlow').addEventListener('click', () => {
        playAudio('slow', element.audio);
    });

    // Привязываем обработчик события для проверки перевода
    document.getElementById('checkAudioTranslationBtn').addEventListener('click', () => {
        checkAudioWordTranslation(element.translation);
    });
}
