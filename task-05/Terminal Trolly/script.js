fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((json) => {
    const productslist = json;
    displayProducts(productslist);

    const terminalOutput = document.querySelector('.terminal-output');
    const terminalInput = document.querySelector('input[type="text"]');
    let cart = [];

    function handleInput() {
      const input = terminalInput.value.trim().toLowerCase(); 
      const [command, ...args] = input.split(' ');

      if (command === 'help') {
        viewCommand();
      } else if (command === 'list') {
        listProducts();
      } else if (command === 'details') {
        viewDetails(args[0]);
      } else if (command === 'add') {
        addToCart(args[0]);
      } else if (command === 'remove') {
        removeFromCart(args[0]);
      } else if (command === 'cart') {
        viewCart();
      } else if (command === 'buy') {
        buyItems();
      } else if (command === 'clear') {
        clearScreen();
      } else if (command === 'search') {
        searchProduct(args.join(' '));
      } else if (command === 'sort') {
        sortProducts(args[0]);
      } else {
        terminalOutput.textContent += `Invalid command: ${command}\n`;
      }
      

      terminalInput.value = ''; 
    }

    function viewCommand() {
      terminalOutput.innerHTML += "Available Commands:\n1) help,\n2) list,\n3) details 'product_id',\n4) add 'product_id',\n5) remove 'product id',\n6) cart,\n7) buy,\n8) clear,\n9) search 'product_name',\n10) sort 'price/name'\n";
    }

    function listProducts() {
      const products = productslist;
      for (let i = 0; i < products.length; i++) {
        let product = products[i];
        terminalOutput.innerHTML += `ID: ${product.id}, Name: ${product.title}, Price: $${product.price}\n`;
      }
    }

    function viewDetails(productId) {
      const product = productslist.find(p => p.id == productId);
      if (product) {
        terminalOutput.innerHTML +=`ID: ${product.id},\n Name: ${product.title},\n Price: $${product.price},\n Description: ${product.description}\n`;
      } else {
        terminalOutput.innerHTML += `Product with ID ${productId} not found.\n`;
      }
    }

    function addToCart(productId) {
      let product = null;
      for (let i = 0; i < productslist.length; i++) {
        if (productslist[i].id == productId) {
          product = productslist[i];
          break; 
        }
      }

      if (product) {
        cart.push(product); 
        terminalOutput.innerHTML +=` Added product with ID ${product.id} to the cart.\n`;
        updateCartPrice(); 
      } else {
        terminalOutput.innerHTML +=`Product with ID ${productId} not found.\n` ;
      }
    }

    function removeFromCart(productId) {
      cart = cart.filter(product => product.id != productId);
      terminalOutput.innerHTML += `Removed product with ID ${productId} from the cart.\n`;
      updateCartPrice();
    }
  

    function viewCart() {
      if (cart.length === 0) {
        terminalOutput.innerHTML += "Your cart is empty.\n";
      } else {
        terminalOutput.innerHTML += "Items in your cart:\n";
        cart.forEach(product => {
          terminalOutput.innerHTML += `ID: ${product.id}, Name: ${product.title}, Price: $${product.price}, Description: ${product.description}\n`;
        });
      }
    }

    function buyItems() {
      if (cart.length === 0) {
        terminalOutput.innerHTML += "Your cart is empty. Add items to cart before proceeding to buy.\n";
      } else {
       
        sessionStorage.setItem('cart', JSON.stringify(cart));
        window.open('buy.html', '_blank');
      }
    }
    

    function clearScreen() {
      terminalOutput.innerHTML = '';
    }

    function searchProduct(productName) {
      let matchingProduct;
      for (const p of productslist) {
        if (p.title.toLowerCase().includes(productName.trim().toLowerCase())) {
        matchingProduct = p;
        break;
        }
      }
      if (matchingProduct) {
        terminalOutput.innerHTML +=` Found: ID: ${matchingProduct.id}, Name: ${matchingProduct.title}, Price: $${matchingProduct.price}\n`;
      } else {
        terminalOutput.innerHTML += `Product named '${productName}' not found.\n`;
      }
    }

    function sortProducts(criteria) {
      if (criteria === 'price') {
        productslist.sort((a, b) => a.price - b.price);
      } else if (criteria === 'name') {
        productslist.sort((a, b) => a.title.localeCompare(b.title));
      }

      
      const productsContainer = document.getElementById("products");
      productsContainer.innerHTML = ''; 
      displayProducts(productslist); 

     
      productslist.forEach(product => {
        terminalOutput.innerHTML += `ID: ${product.id}, Name: ${product.title}, Price: $${product.price}\n`;
      });
    }

    function updateCartPrice() {
      let totalPrice = 0;
      for (let i = 0; i < cart.length; i++) {
        totalPrice += cart[i].price;
      }
      const cartPriceElement = document.getElementById('cart-price');
      cartPriceElement.innerHTML = `$${totalPrice.toFixed(2)}`;
    }

    
    terminalInput.addEventListener('keydown', function(event) {
      if (event.key === 'Enter') {
        handleInput();
      }
    });
  });

function displayProducts(products) {
  const productsContainer = document.getElementById("products");

  for (let i = 0; i < products.length; i++) {
    const product = products[i];

    const productElement = document.createElement("div");
    productElement.className = "product";

    const image = document.createElement("img");
    image.src = product.image; 
    image.alt = product.title;
    productElement.appendChild(image);

    const titleinfo=document.createElement("div");
    titleinfo.className="info";

    const productname=document.createElement("p");
    productname.className="name";
    productname.innerHTML=product.category;

    titleinfo.appendChild(productname);

    productElement.appendChild(titleinfo);

    const actualPriceValue = product.price + 100;

    const heart = document.createElement("i");
    heart.className="far fa-heart";
    heart.style.float="left";
    productElement.appendChild(heart);
  
    const actualPrice = document.createElement("p");
    actualPrice.className="actualprice";
    actualPrice.innerText =` $${actualPriceValue}`;
    actualPrice.style.color = "red";
    actualPrice.style.textDecoration = "line-through";
    productElement.appendChild(actualPrice);
  
    const price = document.createElement("p");
    price.className="price";
    price.innerText =` $${product.price}`;
    productElement.appendChild(price);

    const cartIcon = document.createElement("i");
    cartIcon.className="fas fa-shopping-cart";
    cartIcon.style.float="right";
    productElement.appendChild(cartIcon);

    productsContainer.appendChild(productElement);
  }
}



