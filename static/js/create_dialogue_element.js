import { toggleAudioPlayback } from './toggle_audio_playback.js';
import { generateTestHTML } from './generate_test_html.js';


export  function createDialogueElement(element, index) {
    // Определите шаблоны HTML
    const messageDivHTML = `
      <div class="chat-message" id="message-${index}" style="display: none;">
        ${element.image ? `
          <div class="chat-image">
            <img src="${element.image}" alt="Image for ${element.sentence}" class="img-fluid">
          </div>
        ` : ''}
        <div class="chat-content">
          ${element.audio ? `
            <div class="chat-audio">
              <audio id="audio${index}" src="${element.audio}" preload="auto"></audio>
              <button class="play-pause" data-audio-id="${index}" style="display: none;">
                <img src="/static/img/icon-play.svg" alt="Play" class="play-icon">
              </button>
            </div>
          ` : ''}
          <div class="chat-text">
            <p>${element.sentence}</p>
            <button class="toggle-translation" data-translation-id="${index}">•••</button>
            <div class="translation" id="translation${index}" style="display: none;">
              ${element.translation}
            </div>
          </div>
        </div>
      </div>

        ${generateTestHTML(element, index)}

    `;

    // Создайте элемент и вставьте HTML
    const messageDiv = document.createElement('div');
    messageDiv.innerHTML = messageDivHTML;

    // Найдите элементы для добавления событий
    const toggleTranslationButton = messageDiv.querySelector('.toggle-translation');
    const translationDiv = messageDiv.querySelector('.translation');
    const playPauseButton = messageDiv.querySelector('.play-pause');
    const audioElement = messageDiv.querySelector('audio');

    // Событие для отображения/скрытия перевода
    toggleTranslationButton.addEventListener('click', () => {
      translationDiv.style.display = translationDiv.style.display === 'none' ? 'block' : 'none';
    });

    if (element.test) {
        const options = messageDiv.querySelectorAll(`input[name="test-${index}"]`);
        const resultElement = messageDiv.querySelector('.test-result');
        const correctAnswer = element.test.antwort;

        options.forEach(option => {
          option.addEventListener('click', () => {
            const selectedValue = option.value;
            if (selectedValue === correctAnswer) {
              resultElement.textContent = 'Gut!';
            } else {
              resultElement.textContent = 'Noch einmal!';
            }
            resultElement.style.display = 'block';
          });
        });
    }


    // Событие нажатия на кнопку Play/Pause
    if (playPauseButton) {
      playPauseButton.addEventListener('click', () => {
        toggleAudioPlayback(audioElement, playPauseButton);
      });
    }

    return messageDiv;
  }