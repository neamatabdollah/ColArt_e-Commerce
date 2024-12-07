import {cart, addToCartFunction, calculateCartQuantity} from './cart.js';
import {products} from './products_data.js';
import {formatCurrency} from './utils/money.js';


let productsHTML ='';
products.forEach((product) => {
  productsHTML += `
    <div class="product_container">
      <div class="product_image_container">
        <img class="product_image" src="${product.image}" alt="Frame image">
      </div>  

      <div class="product_name">
        ${product.name}
      </div>   

      <div class="product_rating_container">
        <img class="product_rating_stars"
          src="${product.getStarsUrl()}">
        <div class="product_rating_count">
          ${product.rating.count}
        </div>
      </div>

      <div class="product_price">
        ${product.getPrice()}
      </div>

      <div class="product_quantity_container">
        <select class="selection_quantity js_selection_quantity_${product.id}">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>
  
      <div class="product_spacer"></div>

      <div class="added_to_cart added_to_cart_${product.id}">
        <img src="images/checkmark.png">
        Added
      </div>

      <button class="add_to_cart_button" data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>
  `;
  
});

document.querySelector('.js_all_products').innerHTML = productsHTML;
let addToCartButton = document.querySelectorAll('.add_to_cart_button');

function updateCartQuantity(){
  const cartQuantity = calculateCartQuantity();
  document.querySelector('.cart_quantity').innerHTML = `Cart(${cartQuantity})`;
};
updateCartQuantity();

addToCartButton.forEach(function(button) {
  button.addEventListener('click', function() {
    // const productId = button.dataset.productId;
    const {productId} = button.dataset;
    let selectionValue = document.querySelector(`.js_selection_quantity_${productId}`);
    let quantity = Number(selectionValue.value);
    addToCartFunction(productId, quantity);
    updateCartQuantity();
  });
});