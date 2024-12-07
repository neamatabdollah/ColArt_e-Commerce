export let cart = JSON.parse(localStorage.getItem('cart'));

if(!cart){
  cart = [{
    productId: '1',
    quantity: 2,
    deliveryOptionId: '1'
  }, {
    productId: '2',
    quantity: 1,
    deliveryOptionId: '2'
  }];  
}


function saveToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
}

export function addToCartFunction(productId, quantity){
  const addedMessageTimeouts = {};
  // To display "Added" message when click Add to Cart Button
  let addedMessage = document.querySelector(`.added_to_cart_${productId}`);
  addedMessage.classList.add('displayAddedWord');
  // if we click "Add to Cart",and wait 1 to 1.5 sec, and click again, the message 
  // disappears quickly(since the previous setTimeout is still running and will make 
  // the message disappear soon)-- at this code -->
      // setTimeout(function(){
      //   addedMessage.classList.remove('displayAddedWord');
      // },2000);
  // so we use this code to refresh the time everytime we click the button
  const previousTimeoutId = addedMessageTimeouts[productId];
  if (previousTimeoutId) {
    clearTimeout(previousTimeoutId);
  };
  const timeoutId = setTimeout(function() {
    addedMessage.classList.remove('displayAddedWord');
  }, 2000); 
  addedMessageTimeouts[productId] = timeoutId;

  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });
  if (matchingItem){
    matchingItem.quantity += quantity;
  }else {
  cart.push({
    productId: productId,
    quantity: quantity,
    deliveryOptionId: '1'
    });
  }
  saveToStorage();
};

export function removeFromCart(productId){
  const newCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId){
      newCart.push(cartItem);
    }
  });
  cart = newCart;
  saveToStorage();
};

export function calculateCartQuantity(){
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  return cartQuantity;
};

export function updateDeliveryOption(productId, deliveryOptionId){
  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });
  matchingItem.deliveryOptionId = deliveryOptionId;
  saveToStorage();
};