document.addEventListener('DOMContentLoaded', () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCountElement = document.querySelector('.cart-link');
    const cartItemsElement = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const cartDataInput = document.getElementById('cart-data');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    // Добавление в корзину
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const card = e.target.closest('.product-card');
            if (card) {
                const product = {
                    id: card.getAttribute('data-id'),
                    name: card.querySelector('h3').textContent,
                    price: parseFloat(card.querySelector('p:last-child').textContent.match(/\d+/)[0]),
                    quantity: 1
                };
                const existingProduct = cart.find(item => item.id === product.id);
                if (existingProduct) {
                    existingProduct.quantity++;
                } else {
                    cart.push(product);
                }
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCart();
            }
        });
    });

    // Обновление корзины
    function updateCart() {
        if (cartCountElement) cartCountElement.textContent = `Корзина (${cart.length})`;
        let total = 0;
        if (cartItemsElement) cartItemsElement.innerHTML = '';
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            if (cartItemsElement) {
                cartItemsElement.innerHTML += `
                    <div class="cart-item">
                        ${item.name} - ${item.quantity} x ${item.price} руб = ${itemTotal} руб
                        <button class="remove-btn" data-id="${item.id}">Удалить</button>
                    </div>
                `;
            }
        });
        if (cartTotalElement) cartTotalElement.textContent = `Общая сумма: ${total} руб`;
        if (cartDataInput) cartDataInput.value = JSON.stringify(cart);

        // Удаление из корзины
        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                cart = cart.filter(item => item.id !== id);
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCart();
            });
        });
    }

    // Форма заказа
    const orderForm = document.getElementById('order-form');
    if (orderForm) {
        orderForm.addEventListener('submit', (e) => {
            if (cart.length === 0) {
                e.preventDefault();
                alert('Корзина пуста!');
            }
        });
    }

    // Инициализация корзины
    if (window.location.pathname.includes('cart.html') && cartItemsElement) {
        updateCart();
    }
});