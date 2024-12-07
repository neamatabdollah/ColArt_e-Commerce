import {formatCurrency} from './utils/money.js';

export function getProduct(productId){
  let matchingProduct;
  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });
  return matchingProduct;
};

/*
export const products = [{
    id: '1',
    image: 'images/products/img1.jpg',
    name: 'Frame of a Curly Black Hair Woman - 1 Piece',
    rating: {
        stars: 4.5,
        count: 85
    },
    priceCents: 290
}, {
    id: '2',
    image: 'images/products/img2.jpg',
    name: 'Frame of a Girl with Blue Headband - 1 Piece',
    rating: {
        stars: 3.5,
        count: 57
    },
    priceCents: 295
}, {
    id: '3',
    image: 'images/products/img3.jpg',
    name: 'Frame of a Blonde Girl with Two Braids - 1 Piece',
    rating: {
        stars: 4,
        count: 93
    },
    priceCents: 399
}, {
    id: '4',
    image: 'images/products/img4.jpg',
    name: 'Frame of a Woman with a Big Earrings - 1 Piece',
    rating: {
        stars: 5,
        count: 67
    },
    priceCents: 295
}, {
    id: '5',
    image: 'images/products/img5.jpg',
    name: 'Frame of a Brown Skin Woman - 1 Piece',
    rating: {
        stars: 4.5,
        count: 107
    },
    priceCents: 299
}, {
    id: '6',
    image: 'images/products/img6.jpg',
    name: 'Frame of Brown Circle & Green Leaves - 2 Pieces',
    rating: {
        stars: 4,
        count: 93
    },
    priceCents: 395
}, {
    id: '7',
    image: 'images/products/img7.jpg',
    name: 'Frame of a Bohemian Designs - 3 Pieces',
    rating: {
        stars: 3.5,
        count: 53
    },
    priceCents: 650
}];
*/


// converting an object into a class
class Product {
    id;
    image;
    name;
    rating;
    priceCents;

    constructor(productDetails){
        this.id = productDetails.id;
        this.image = productDetails.image;
        this.name = productDetails.name;
        this.rating = productDetails.rating;
        this.priceCents = productDetails.priceCents;
    }
    
    getStarsUrl(){
        // move the code of HTML from javascript.js to here (line 20)
        return `images/rating/rating-${this.rating.stars * 10}.png`;
    }

    getPrice(){
        // move the code of HTML from javascript.js to here (line 27) ..
        return `$${formatCurrency(this.priceCents)}`;
    }
}

// -----------------------------
// ---- inheritance feature ----
// -----------------------------
class Person extends Product {
  numberOfPieces;

  constructor(productDetails) {
    super(productDetails); //it calls the constructor of the parent class (Product), instead of writing all details of it again...
    this.numberOfPieces = productDetails.numberOfPieces;
  }
}

export const products = [{
    id: '1',
    image: 'images/products/img1.jpg',
    name: 'Frame of a Curly Black Hair Woman - 1 Piece',
    rating: {
        stars: 4.5,
        count: 85
    },
    priceCents: 290,
    numberOfPieces: '1 Piece',
    type: "person"
}, {
    id: '2',
    image: 'images/products/img2.jpg',
    name: 'Frame of a Girl with Blue Headband - 1 Piece',
    rating: {
        stars: 3.5,
        count: 57
    },
    priceCents: 295,
    numberOfPieces: '1 Piece',
    type: "person"
}, {
    id: '3',
    image: 'images/products/img3.jpg',
    name: 'Frame of a Blonde Girl with Two Braids - 1 Piece',
    rating: {
        stars: 4,
        count: 93
    },
    priceCents: 399,
    numberOfPieces: '1 Piece',
    type: "person"
}, {
    id: '4',
    image: 'images/products/img4.jpg',
    name: 'Frame of a Woman with a Big Earrings - 1 Piece',
    rating: {
        stars: 5,
        count: 67
    },
    priceCents: 295,
    numberOfPieces: '1 Piece',
    type: "person"
}, {
    id: '5',
    image: 'images/products/img5.jpg',
    name: 'Frame of a Brown Skin Woman - 1 Piece',
    rating: {
        stars: 4.5,
        count: 107
    },
    priceCents: 299,
    numberOfPieces: '1 Piece',
    type: "person"
}, {
    id: '6',
    image: 'images/products/img6.jpg',
    name: 'Frame of Brown Circle & Green Leaves - 2 Pieces',
    rating: {
        stars: 4,
        count: 93
    },
    priceCents: 395,
    numberOfPieces: '2 Pieces',
    type: "leaves"
}, {
    id: '7',
    image: 'images/products/img7.jpg',
    name: 'Frame of a Bohemian Designs - 3 Pieces',
    rating: {
        stars: 3.5,
        count: 53
    },
    priceCents: 650,
    numberOfPieces: '3 Pieces',
    type: "bohemian"
}].map((productDetails) => {
    if(productDetails.type === "person"){
        return new Person(productDetails);
    }
    return new Product(productDetails);
});


/*
// to load products from backend using callback feature, instead of this file data :
export let products= [];

export function loadProducts(fun){
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', () =>{
        products = JSON.parse(xhr.response).map((productDetails) => {
            if(productDetails.type === "person"){
                return new Person(productDetails);
            }
            return new Product(productDetails);
        });
        fun();
    });

    //-------- Error Handeling --------
    xhr.addEventListener('error',(error) => {
        console.log('Unexpected error. Please try again later.');
    });

    xhr.open('GET', 'https://backend_url');
    xhr.send();
};
//at javascript.js file write this code :
//edit this line at the start of the page .. 
    import {products, loadProducts} from './products_data.js';
//add this line after importing lines 
    loadProducts(renderProductsGrid);
    function renderProductsGrid(){
        //put all the code here which starts from --> let productsHTML ='';
    };
//at checkout.js
    import {loadProducts} from './checkout.js';
//add this line after importing lines 
    loadProducts(() => {
    // put the existing 2 lines inside this function
        renderOrderSummary();
        renderPaymentSummary();
    });
*/

/*
//load products from backend using fetch() feature
export function loadProductsFetch() {
    const promise = fetch('https://backend_url').then((response) => {
        return response.json();
    }).then((productsData) => {
        products = productsData.map((productDetails) => {
            if(productDetails.type === "person"){
                return new Person(productDetails);
            }
            return new Product(productDetails);
        // -------- Handle errors in Promises ----------
        });  
    }).catch((error) => {
        console.log('Unexpected error. Please try again later.');
    });
    return promise;
};
//at checkout.js
import {loadProducts, loadProductsFetch} from './checkout.js';
Promise.all([
    loadProductsFetch(),
    new Promise(() => {
        loadCart(() => {
            resolve();
        });
    })
]).then((values) => {
    renderOrderSummary();
    renderPaymentSummary();
});
*/

/*
//load products from backend using Async Await feature
//at checkout.js
async function loadPage() {
    //---------- error handling in async await ----------
    try {
        // throw 'error1';

        await loadProductsFetch();
        const value = await new Promise((resolve, reject) => {
            // throw 'error2'; 
            loadCart(() => {
                // reject('error3');
                resolve(value1);
            });
        });
    } catch (error) {
        console.log('Unexpected error. Please try again later.');
    };

    renderOrderSummary();
    renderPaymentSummary();
};
loadPage();
*/