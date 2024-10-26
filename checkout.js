import {cart, removeFromCart, calculateCartQuantity} from './cart.js';
import {products} from './products_data.js';
import {formatCurrency} from './utils/money.js';

let cartSummeryHTML ='';

cart.forEach((cartItem) => {
  const productId = cartItem.productId;

  let matchingProduct;
  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  cartSummeryHTML +=
  `
    <div class="cart_item_container cart_item_container-${matchingProduct.id}">
      <div class="delivery_date">
        Delivery date: Tuesday, June 21
      </div>

      <div class="cart_item_details_grid">
        <img class="product_image" src="${matchingProduct.image}" alt="product image">


        <div class="cart_item_details">
          <div class="product_name">
            ${matchingProduct.name}
          </div>
          <div class="product_price">
            $${formatCurrency(matchingProduct.priceCents)}
          </div>
          <div class="product_quantity">
            <span>
              Quantity: <span class="quantity_label">${cartItem.quantity}</span>
            </span>
            <span class="update_quantity_link link_primary" data-product-id= "${matchingProduct.id}">
              Update
            </span>
            <span class="delete_quantity_link link_primary" data-product-id="${matchingProduct.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery_options">
          <div class="delivery_options_title">
            Choose a delivery option:
          </div>
          <!-- first delivery option -->
          <div class="delivery_option">
            <input type="radio" checked
              class="delivery_option_input"
              name="delivery_option_${matchingProduct.id}">
            <div>
              <div class="delivery_option_date">
                Tuesday, June 21
              </div>
              <div class="delivery_option_price">
                FREE Shipping
              </div>
            </div>
          </div>
          <!-- second delivery option -->
          <div class="delivery_option">
            <input type="radio"
              class="delivery_option_input"
              name="delivery_option_${matchingProduct.id}">
            <div>
              <div class="delivery_option_date">
                Wednesday, June 15
              </div>
              <div class="delivery_option_price">
                $4.99 - Shipping
              </div>
            </div>
          </div>
          <!-- third delivery option -->
          <div class="delivery_option">
            <input type="radio"
              class="delivery_option_input"
              name="delivery_option_${matchingProduct.id}">
            <div>
              <div class="delivery_option_date">
                Monday, June 13
              </div>
              <div class="delivery_option_price">
                $9.99 - Shipping
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
});
document.querySelector('.order_summary').innerHTML = cartSummeryHTML;

document.querySelectorAll('.delete_quantity_link').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    removeFromCart(productId);
    
    const container = document.querySelector(`.cart_item_container-${productId}`);
    container.remove();
    updateCartQuantity();
  });
});

// update the cartQuantity in header section to match real quantity when add or delete items
function updateCartQuantity(){
  const cartQuantity = calculateCartQuantity();
  document.querySelector('.update_the_cart_quantity').innerHTML = `${cartQuantity} items`;
};
updateCartQuantity();

document.querySelectorAll('.update_quantity_link').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
  });
});
