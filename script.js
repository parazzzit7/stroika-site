// script.js
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            if (e.target.textContent === 'Добавить в корзину') {
                alert('Товар добавлен в корзину!');
            }
        });
    });
});