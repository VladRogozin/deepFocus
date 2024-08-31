
export function playAudio(speed, audioUrl) {
    const audioPlayer = document.getElementById('audioPlayer');
    const playImage = document.getElementById('playNormalImage'); // Ваше изображение

    // Меняем изображение на GIF для анимации
    playImage.src = "{% static 'img/sound.gif' %}"; // Меняем на анимированный GIF

    // Фиксируем размер изображения для предотвращения изменения размеров
    playImage.style.width = '40px';
    playImage.style.height = '40px';

    // Если аудио уже воспроизводится, перезапускаем его с нужной скоростью
    if (!audioPlayer.src || audioPlayer.src !== audioUrl) {
        audioPlayer.src = audioUrl; // Загружаем аудиофайл
    }
    audioPlayer.currentTime = 0; // Перезапускаем аудио с начала

    // Устанавливаем скорость воспроизведения
    if (speed === 'normal') {
        audioPlayer.playbackRate = 1.0; // Нормальная скорость
        console.log("Playing at normal speed");
    } else if (speed === 'slow') {
        audioPlayer.playbackRate = 0.75; // Замедленная скорость
        console.log("Playing at slow speed (0.85)");
    }

    audioPlayer.play(); // Начинаем воспроизведение

    // Событие окончания аудио
    audioPlayer.onended = function() {
        playImage.src = "{% static 'img/sound_static.png' %}"; // Возвращаем статичное изображение после окончания
    };
}