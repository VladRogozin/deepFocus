import { normalizeText } from '../normalizeText.js';
import { nextElement } from '../showElement.js';
import { showAlert } from '../showAlert.js';




// Проверка предложений с помощью ввода текста
export function checkAudioSentence(correctSentence) {
    const userSentence = document.getElementById('userSentence').value;
    if (normalizeText(userSentence) === normalizeText(correctSentence)) {
        showAlert("Правильно!", "success");
        nextElement();
    } else {
        showAlert("Неправильно, попробуйте снова.", "danger");
    }
}