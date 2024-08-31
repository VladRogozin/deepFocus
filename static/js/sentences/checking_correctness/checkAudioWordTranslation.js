import { normalizeText } from '../normalizeText.js';
import { nextElement } from '../showElement.js';
import { showAlert } from '../showAlert.js';


export function checkAudioWordTranslation(correctTranslation) {
    const userAudioTranslation = document.getElementById('userAudioTranslation').value;
    if (normalizeText(userAudioTranslation) === normalizeText(correctTranslation)) {
        showAlert("Правильно!", "success");
        nextElement();
    } else {
        showAlert("Неправильно, попробуйте снова.", "danger");
    }
}