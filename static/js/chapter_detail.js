import { createStoryElement } from './create_story_element.js';
import { createDialogueElement } from './create_dialogue_element.js';
import { toggleAudioPlayback } from './toggle_audio_playback.js';



document.addEventListener('DOMContentLoaded', () => {
  const chapterTitle = document.querySelector('.chapter-title');
  const chapterDescription = document.querySelector('.chapter-description');
  const chatContainer = document.querySelector('.chat-container');
  const continueBtn = document.getElementById('continue-btn');
  const endMessage = document.getElementById('end-message');
  let currentIndex = 0;
  let dialogueElements = [];

  function showNextMessage() {
    if (currentIndex >= dialogueElements.length) {
      continueBtn.style.display = 'none';
      endMessage.style.display = 'block';
      return;
    }

    const messageElement = document.getElementById(`message-${currentIndex}`);
    const audioElement = document.getElementById(`audio${currentIndex}`);
    const testElement = document.getElementById(`test-${currentIndex}`);
    const playPauseButton = messageElement.querySelector('.play-pause') || messageElement.querySelector('.story-play-pause');

    messageElement.style.display = 'flex';
    // Убедитесь, что testElement найден перед добавлением класса
    if (testElement) {
      testElement.style.display = 'block'; // Сначала делаем элемент видимым
      setTimeout(() => {
        testElement.classList.add('show'); // Затем добавляем класс show для анимации
      }, 10); // Небольшая задержка, чтобы анимация сработала корректно
    }

    if (playPauseButton) {
      playPauseButton.style.display = 'inline';
    }

    if (audioElement) {
      audioElement.play();
      if (playPauseButton) {
        playPauseButton.querySelector('.play-icon').src = '/static/img/icon-pause.svg';
      }
      audioElement.addEventListener('ended', () => {
        continueBtn.style.display = 'block';
        scrollToContinueButton();
        if (playPauseButton) {
          playPauseButton.querySelector('.play-icon').src = '/static/img/icon-play.svg';
        }
      });
    } else {
      continueBtn.style.display = 'block';
      scrollToContinueButton();
    }
  }

  function scrollToContinueButton() {
    continueBtn.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  }

  continueBtn.addEventListener('click', () => {
    continueBtn.style.display = 'none';
    currentIndex++;
    showNextMessage();
  });

  function showContentHeader() {
    const contentHeader = document.querySelector('.content-header');
    contentHeader.style.opacity = 1;
    setTimeout(() => {
      showNextMessage();
    }, 2000);
  }

  const chapterId = window.location.pathname.split('/').slice(-2, -1)[0];
  fetch(`/api/chapter/${chapterId}/`)
    .then(response => response.json())
    .then(data => {
      chapterTitle.textContent = data.title;
      chapterDescription.textContent = data.description;

      showContentHeader();

      dialogueElements = data.dialogue_elements;

      dialogueElements.forEach((element, index) => {
        let messageElement;
        if (element.type_element === 'stories') {
          messageElement = createStoryElement(element, index);
        } else {
          messageElement = createDialogueElement(element, index);
        }
        chatContainer.appendChild(messageElement);
      });

    })
    .catch(error => console.error('Error fetching data:', error));
});
