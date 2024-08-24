  // Создаем аудио элемент и управляем воспроизведением
export function toggleAudioPlayback(audioElement, playPauseButton) {
    const playIcon = playPauseButton.querySelector('.play-icon');
    if (audioElement.paused) {
      audioElement.play();
      playIcon.src = '/static/img/icon-pause.svg';
    } else {
      audioElement.pause();
      playIcon.src = '/static/img/icon-play.svg';
    }
  }