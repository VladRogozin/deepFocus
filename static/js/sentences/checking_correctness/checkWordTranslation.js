import { normalizeText } from '../normalizeText.js';
import { nextElement } from '../showElement.js';
import { showAlert } from '../showAlert.js';


export function checkWordTranslation(correctTranslation) {
    const userTranslation = document.getElementById('userTranslation').value;
    if (normalizeText(userTranslation) === normalizeText(correctTranslation)) {
        showAlert("Правильно!", "success");
        nextElement();
    } else {
        showAlert("Неправильно, попробуйте снова.", "danger");
    }
}