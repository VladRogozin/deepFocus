import { normalizeText } from '../normalizeText.js';
import { nextElement } from '../showElement.js';
import { showAlert } from '../showAlert.js';


export function checkWordOrigin(correctGermanWord) {
    const userGermanWord = document.getElementById('userGermanWord').value;
    if (normalizeText(userGermanWord) === normalizeText(correctGermanWord)) {
        showAlert("Правильно!", "success");
        nextElement();
    } else {
        showAlert("Неправильно, попробуйте снова.", "danger");
    }
}
