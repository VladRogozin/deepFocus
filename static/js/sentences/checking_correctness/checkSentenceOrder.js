import { normalizeText } from '../normalizeText.js';
import { nextElement } from '../showElement.js';
import { showAlert } from '../showAlert.js';





export function checkSentenceOrder(correctSentence) {
    const userOrder = Array.from(document.getElementById('targetBox').children).map(el => el.textContent).join(' ');
    if (normalizeText(userOrder) === normalizeText(correctSentence)) {
        showAlert("Правильно!", "success");
        nextElement();
    } else {
        showAlert("Неправильно, попробуйте снова.", "danger");
    }
}
