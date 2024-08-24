import { toggleAudioPlayback } from './toggle_audio_playback.js';
import { generateTestHTML } from './generate_test_html.js';

export function createStoryElement(element, index) {
    const messageDivHTML = `
      <div class="chat-message-story" id="message-${index}" style="display: none;">
        <div class="story-content">
          <div class="text-button-container">
            <div class="story-text">
              <p>${element.sentence}</p>
            </div>
            <button class="toggle-translation" data-translation-id="${index}">•••</button>
            <div class="translation" id="translation${index}" style="display: none;">
              ${element.translation}
            </div>
          </div>
          ${element.audio ? `
            <div class="story-audio">
              <audio id="audio${index}" src="${element.audio}" preload="auto"></audio>
              <button class="story-play-pause" data-audio-id="${index}">
                <img src="/static/img/icon-play.svg" alt="Play" class="play-icon">
              </button>
            </div>
          ` : ''}
        </div>
        ${element.image ? `
          <div class="story-image">
            <img src="${element.image}" alt="Image for ${element.sentence}" class="img-fluid">
          </div>
        ` : ''}
      </div>

      ${generateTestHTML(element, index)}
    `;

    const messageDiv = document.createElement('div');
    messageDiv.innerHTML = messageDivHTML;

    const toggleTranslationButton = messageDiv.querySelector('.toggle-translation');
    const translationDiv = messageDiv.querySelector('.translation');
    const playPauseButton = messageDiv.querySelector('.story-play-pause');
    const audioElement = messageDiv.querySelector('audio');

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
    if (playPauseButton) {
      playPauseButton.addEventListener('click', () => {
        toggleAudioPlayback(audioElement, playPauseButton);
      });
    }

    return messageDiv;
}
