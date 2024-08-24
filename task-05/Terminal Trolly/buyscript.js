document.addEventListener('DOMContentLoaded', function() {
    const cartData = sessionStorage.getItem('cart');
    if (cartData) {
        const cartlist = JSON.parse(cartData);
        displayCart(cartlist); 
    }
});

function displayCart(cart) {
    const cartContainer = document.getElementById('cart-container');
    cartContainer.innerHTML = '';
    let totalPrice = 0;
    for (let i = 0; i < cart.length; i++) {
        const item = cart[i];
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';

        const productimg = document.createElement('img');
        productimg.className="product-img"
        productimg.src = item.image; 
        productimg.alt = item.title;
        cartItem.appendChild(productimg);

        const infoDiv = document.createElement('div');
        infoDiv.className = 'info';

        const title = document.createElement('p');
        title.className = 'title';
        title.textContent = item.title;
        infoDiv.appendChild(title);

        const price = document.createElement('p');
        price.className = 'price';
        price.textContent = `$${item.price}`;
        infoDiv.appendChild(price);

        cartItem.appendChild(infoDiv);

        cartContainer.appendChild(cartItem);

        totalPrice += item.price;
    }
    const Pricesummary = document.getElementById('checkout-details');
    const totalprice = document.createElement('div');
    totalprice.className = 'item';
    const totalpricelabel = document.createElement('div');
    totalpricelabel.className = 'item-label';
    totalpricelabel.innerHTML = 'TOTAL PRICE';
    totalprice.appendChild(totalpricelabel);
    const totalpricevalue = document.createElement('div');
    totalpricevalue.className = 'item-value';
    totalpricevalue.innerHTML = `$${totalPrice.toFixed(2)}`;
    totalprice.appendChild(totalpricevalue);

   

    Pricesummary.appendChild(totalprice);
}


