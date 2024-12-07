import {cart, removeFromCart, calculateCartQuantity, updateDeliveryOption} from '../cart.js';
import {products, getProduct} from '../products_data.js';
import {formatCurrency} from '../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions, getDeliveryOption} from '../deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';

export function renderOrderSummary(){
  let cartSummaryHTML ='';

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    const matchingProduct = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateOnPage = deliveryDate.format('dddd, MMMM D');

    cartSummaryHTML +=
    `
      <div class="cart_item_container cart_item_container-${matchingProduct.id}">
        <div class="delivery_date">
          Delivery date: ${dateOnPage}
        </div>

        <div class="cart_item_details_grid">
          <img class="product_image" src="${matchingProduct.image}" alt="product image">


          <div class="cart_item_details">
            <div class="product_name">
              ${matchingProduct.name}
            </div>
            <div class="product_price">
              ${matchingProduct.getPrice()}
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
            ${deliveryOptionsHTML(matchingProduct, cartItem)}
          </div>
        </div>
      </div>
    `;
  });

  function deliveryOptionsHTML(matchingProduct, cartItem){
    let html = '';

    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
      const dateOnPage = deliveryDate.format('dddd, MMMM D');

      const  priceOnPage = deliveryOption.priceCents === 0 ? 'Free' : `$${formatCurrency(deliveryOption.priceCents)} -`;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      html += 
      ` 
        <div class="delivery_option" 
          data-product-id="${matchingProduct.id}"
          data-delivery-option-id="${deliveryOption.id}">
          <input type="radio" 
            ${isChecked ? 'checked' : ''}
            class="delivery_option_input"
            name="delivery_option_${matchingProduct.id}">
          <div>
            <div class="delivery_option_date">
              ${dateOnPage}
            </div>
            <div class="delivery_option_price">
              ${priceOnPage} Shipping
            </div>
          </div>
        </div>
      `
    });
    return html;
  }

  document.querySelector('.order_summary').innerHTML = cartSummaryHTML;

  document.querySelectorAll('.delete_quantity_link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);
      
      const container = document.querySelector(`.cart_item_container-${productId}`);
      container.remove();
      renderPaymentSummary();
      updateCartQuantity();
    });
  });

  document.querySelectorAll('.delivery_option').forEach((element) => {
    element.addEventListener('click', () => {
      const {productId, deliveryOptionId} = element.dataset;
      //^^ is shorthand property for -->
      //const productId = element.dataset.productId;
      //const deliveryOptionId = element.dataset.deliveryOptionId;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
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
};
