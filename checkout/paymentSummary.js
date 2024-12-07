import {cart, removeFromCart, calculateCartQuantity} from '../cart.js';
import {getProduct} from '../products_data.js';
import {getDeliveryOption} from '../deliveryOptions.js';
import {formatCurrency} from '../utils/money.js';
//import {addOrder} from '../orders.js';

export function renderPaymentSummary(){
  let productPriceCents = 0;
  let shippingPriceCents = 0;

  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPriceCents += deliveryOption.priceCents;
  });
  
  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
  const taxCents = totalBeforeTaxCents * 0.1;
  const totalCents = totalBeforeTaxCents + taxCents;

  const paymentSummaryHTML =`
    <div class="payment_summary_title">
      Order Summary
    </div>

    <div class="payment_summary_row">
      <div>Items (${calculateCartQuantity()}):</div>
      <div class="payment_summary_money">
        $${formatCurrency(productPriceCents)}
      </div>
    </div>

    <div class="payment_summary_row">
      <div>Shipping &amp; handling:</div>
      <div class="payment_summary_money">
        $${formatCurrency(shippingPriceCents)}
      </div>
    </div>

    <div class="payment_summary_row subtotal_row">
      <div>Total before tax:</div>
      <div class="payment_summary_money">
        $${formatCurrency(totalBeforeTaxCents)}
      </div>
    </div>

    <div class="payment_summary_row">
      <div>Estimated tax (10%):</div>
      <div class="payment_summary_money">
        $${formatCurrency(taxCents)}
      </div>
    </div>

    <div class="payment_summary_row total_row">
      <div>Order total:</div>
      <div class="payment_summary_money">$
        ${formatCurrency(totalCents)}
      </div>
    </div>

    <button type="button" class="place_order_button button_primary">
      Place your order
    </button>
  `;
  document.querySelector('.payment_summary').innerHTML = paymentSummaryHTML;


  /*
  //when press Place your order button, send data to backend
  document.querySelector('.place_order_button').addEventListener('click', async () => {
    // add error handling using try/catch
    try {
      const response = await fetch('https://backend_url', {
        method: 'POST',
        //headers gives the backend more information about our request
        headers: {
          'Content-Type': 'application/json'
        },
        //body is the actual data we send to the backend
        body: JSON.stringify({
          cart: cart
        })
      });

      const order = await response.json();
      console.log(order);
      addOrder(order);
    } catch (error) {
      console.log('Unexpected error. Try again later.');
    }

    window.location.href = 'orders.html';
  });
  */
 
};