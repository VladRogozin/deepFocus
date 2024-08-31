


export function showAlert(message, type) {
    const alertContainer = document.getElementById('alertContainer');
    const alert = document.createElement('div');

    // Создание Bootstrap алерта
    alert.className = `alert alert-${type} alert-dismissible fade show`;
    alert.role = "alert";
    alert.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

    // Добавление алерта в контейнер
    alertContainer.appendChild(alert);

    // Удаление алерта через 1.5 секунды
    setTimeout(() => {
        alert.classList.remove('show');
        alert.classList.add('fade');
        setTimeout(() => alert.remove(), 150);
    }, 1500);
}
