// Находим все табы (кнопки)
const tabs = document.querySelectorAll('.tab');
const roomsContainer = document.getElementById('roomsContainer');
const roomDescriptionElement = document.getElementById('roomDescription');
let roomHistories = {};
let timers = {};

// Функция для отображения выбранной комнаты
function showRoom(roomId, roomImage, roomDescription) {
    // Скрываем все комнаты
    const rooms = document.querySelectorAll('.room-info');
    rooms.forEach(room => {
        room.style.display = 'none';
    });

    // Показываем выбранную комнату
    const currentRoom = document.getElementById(`room-${roomId}`);
    currentRoom.style.display = 'block';

    // Обновляем описание комнаты
    roomDescriptionElement.textContent = roomDescription;

    // Меняем фоновое изображение
    const bodyElement = document.body;
    if (roomImage) {
        bodyElement.style.backgroundImage = `url('${roomImage}')`;
        bodyElement.style.backgroundSize = 'cover'; // Изображение заполняет весь экран
        bodyElement.style.backgroundPosition = 'center'; // Центрирование изображения
        bodyElement.style.backgroundRepeat = 'no-repeat'; // Изображение не повторяется
    } else {
        bodyElement.style.backgroundImage = '';  // Если изображения нет, убираем фон
    }
}

// Определяем объект для хранения стилей для каждого имени
const nameStyles = {};

// Определяем доступные цвета
const availableColors = ['#AEC6CF', '#C1E1C1','#FFDAC1', '#c3b5c4', '#c7b1ad'];
let colorIndex = 0;

function hexToRgba(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function getRandomDelay(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomIndex(max) {
    return Math.floor(Math.random() * max);
}

function showMessagesForRoom(roomId, dialoguesData) {
    const messagesContainer = document.getElementById(`messages-${roomId}`);
    messagesContainer.classList.add('custom-scrollbar');

    if (!roomHistories[roomId]) {
        roomHistories[roomId] = {
            dialogues: dialoguesData.split(';'),
            messagesShown: []
        };
    }

    const roomData = roomHistories[roomId];
    const dialogues = roomData.dialogues;

    function showNextMessage() {
        if (dialogues.length === 0) {
            return;
        }

        roomData.messageIndex = getRandomIndex(dialogues.length);

        let dialogueMessages = dialogues[roomData.messageIndex].split('|');
        let idx = 0;

        function showMessage() {
            if (idx < dialogueMessages.length) {
                const [name, message] = dialogueMessages[idx].split(': ', 2);

                if (!nameStyles[name]) {
                    const backgroundColor = hexToRgba(availableColors[colorIndex % availableColors.length], 0.85);
                    const borderColor = availableColors[colorIndex % availableColors.length];
                    nameStyles[name] = {
                        backgroundColor,
                        borderColor,
                    };
                    colorIndex++;
                }

                const { backgroundColor, borderColor } = nameStyles[name];

                const messageHTML = `
                    <div class="mb-1 p-1" style="background-color: ${backgroundColor}; border-radius: 15px; font-family: 'Roboto', sans-serif;">
                        <div  class="p-2" >
                            <span class="" style="font-size: 14px; font-weight: bold; color: #472b4f">
                                &nbsp;&nbsp;&nbsp;&nbsp;${name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </span>
                            <span style="font-size: 14px; color: #223d4d">
                                ${message}
                            </span>

                        </div>

                    </div>
                `;

                messagesContainer.insertAdjacentHTML('beforeend', messageHTML);
                messagesContainer.scrollTop = messagesContainer.scrollHeight;

                roomData.messagesShown.push(dialogueMessages[idx]);
                idx++;

                const delay = getRandomDelay(6000, 10000);

                timers[roomId] = setTimeout(showMessage, delay);
            } else {
                timers[roomId] = setTimeout(showNextMessage, 11000);
            }
        }

        showMessage();
    }

    if (!timers[roomId]) {
        showNextMessage();
    }
}

tabs.forEach(tab => {
    tab.addEventListener('click', function () {
        const roomId = tab.getAttribute('data-room-id');
        const roomImage = tab.getAttribute('data-room-image');
        const roomDescription = tab.getAttribute('data-room-description');
        const dialoguesData = tab.getAttribute('data-dialogues');

        console.log(`Room ID: ${roomId}, Image: ${roomImage}, Description: ${roomDescription}`);

        showRoom(roomId, roomImage, roomDescription);
        showMessagesForRoom(roomId, dialoguesData);
    });
});

// Автоматически показываем первую комнату при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    if (tabs.length > 0) {
        const firstTab = tabs[0];
        const firstRoomId = firstTab.getAttribute('data-room-id');
        const firstRoomImage = firstTab.getAttribute('data-room-image');
        const firstRoomDescription = firstTab.getAttribute('data-room-description'); // Получаем описание первой комнаты
        const firstDialoguesData = firstTab.getAttribute('data-dialogues');

        // Показываем первую комнату
        showRoom(firstRoomId, firstRoomImage, firstRoomDescription);
        showMessagesForRoom(firstRoomId, firstDialoguesData);
    }
});








// Код для работы аудиоплеера
const audioPlayer = document.getElementById('audioPlayer');
const playPauseBtn = document.getElementById('playPause');
const playPauseIcon = document.getElementById('playPauseIcon');
const prevTrackBtn = document.getElementById('prevTrack');
const nextTrackBtn = document.getElementById('nextTrack');
const trackTitle = document.getElementById('trackTitle');

let currentTrackIndex = 0;

function loadTrack(index) {
    if (index >= 0 && index < tracks.length) {
        const track = tracks[index];
        audioPlayer.src = track.url;
        audioPlayer.load();
        audioPlayer.play();
        playPauseIcon.src = "/static/img/pause.svg"; // Используйте абсолютный путь
        trackTitle.textContent = track.title;
    }
}

playPauseBtn.addEventListener('click', function () {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playPauseIcon.src = "/static/img/pause.svg";
    } else {
        audioPlayer.pause();
        playPauseIcon.src = "/static/img/play.svg";
    }
});

nextTrackBtn.addEventListener('click', function () {
    currentTrackIndex++;
    if (currentTrackIndex >= tracks.length) {
        currentTrackIndex = 0;
    }
    loadTrack(currentTrackIndex);
});

prevTrackBtn.addEventListener('click', function () {
    currentTrackIndex--;
    if (currentTrackIndex < 0) {
        currentTrackIndex = tracks.length - 1;
    }
    loadTrack(currentTrackIndex);
});

audioPlayer.addEventListener('ended', function () {
    currentTrackIndex++;
    if (currentTrackIndex >= tracks.length) {
        currentTrackIndex = 0;
    }
    loadTrack(currentTrackIndex);
});

loadTrack(currentTrackIndex);







// Код для работы с таймером
const startTimerBtn = document.getElementById('startTimer');
const timerDisplay = document.getElementById('timerDisplay');
let workDuration = 30 * 60;
let breakDuration = 10 * 60;
let isWorkTime = true;
let timer;

const workSound = new Audio("/static/audio/start.mp3");
const breakSound = new Audio("/static/audio/start.mp3");

function updateTimerDisplay(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    // Изменяем цвет текста в зависимости от того, идет ли рабочее время или перерыв
    if (isWorkTime) {
        console.log('Work time: applying work-time class');
        timerDisplay.classList.remove('break-time');
        timerDisplay.classList.add('work-time');
    } else {
        console.log('Break time: applying break-time class');
        timerDisplay.classList.remove('work-time');
        timerDisplay.classList.add('break-time');
    }
}

function startTimer() {
    let time = isWorkTime ? workDuration : breakDuration;
    updateTimerDisplay(time);
    timer = setInterval(() => {
        time--;
        updateTimerDisplay(time);

        if (time <= 0) {
            clearInterval(timer);
            isWorkTime = !isWorkTime;
            if (isWorkTime) {
                workSound.play();
            } else {
                breakSound.play();
            }
            startTimer();
        }
    }, 1000);
}

startTimerBtn.addEventListener('click', function () {
    startTimer();
    startTimerBtn.disabled = true;
});

updateTimerDisplay(workDuration);



        const toggleNavbarBtn = document.getElementById('toggleNavbar');
        const navbar = document.querySelector('.navbar');

        toggleNavbarBtn.addEventListener('click', function () {
            if (navbar.style.display === 'none') {
                navbar.style.display = 'flex';
                toggleNavbarBtn.textContent = 'Hide Navbar';
            } else {
                navbar.style.display = 'none';
                toggleNavbarBtn.textContent = 'Show Navbar';
            }
        });

        if (navbar.style.display === 'none') {
            toggleNavbarBtn.textContent = 'Show Navbar';
        } else {
            toggleNavbarBtn.textContent = 'Hide Navbar';
        }


