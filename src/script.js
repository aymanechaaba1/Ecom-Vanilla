'use strict';

// State & Data
const state = {
  products: [
    {
      id: 1,
      productTitle: 'Cap Wool',
      productImg:
        'https://cdn.shopify.com/s/files/1/0612/2477/9832/products/Varsity-C_Cap-Corduroy-Yellow_Back_1080x_84d2dd15-2063-485f-b46a-a071d8e2b1ea.webp?v=1676406573',
      productPrice: 29,
      productQuantity: 1,
      productDesc:
        'Made by the well-respected and renowned athletic garments company Ebbets Field Flannels. Hand-sewn from genuine wool baseball cloth. This cap is built to last a lifetime.',
    },
    {
      id: 2,
      productTitle: 'Cap Ebbets Corduroy',
      productImg:
        'https://cdn.shopify.com/s/files/1/0612/2477/9832/products/Varsity-C_Cap-Corduroy-Pink_Back_1080x_23513aa7-ea3e-42c1-a62e-5d68f424e551.webp?v=1676406569&width=360',
      productPrice: 39,
      productQuantity: 1,
      productDesc:
        'Made by the well-respected and renowned athletic garments company Ebbets Field Flannels. Hand-sewn from genuine wool baseball cloth. This cap is built to last a lifetime.',
    },
    {
      id: 3,
      productTitle: 'Cap Wool',
      productImg:
        'https://cdn.shopify.com/s/files/1/0612/2477/9832/products/Ebbets-C_Cap_Camel_Back_1080x_50142e26-b3dc-4003-8bc7-5f5a2cf98fdd.webp?v=1676406501&width=360',
      productPrice: 19,
      productQuantity: 1,
      productDesc:
        'Made by the well-respected and renowned athletic garments company Ebbets Field Flannels. Hand-sewn from genuine wool baseball cloth. This cap is built to last a lifetime.',
    },
  ],
  cart: [],
};

// DOM Elements
const appContainerEl = document.getElementById('app');
const overlayEl = document.querySelector('.overlay');
const addProductFormEl = document.querySelector('.form-add-product');
const btnAddProductEl = document.querySelector('.btn-add-product');
const inputUploadProductImageEl = document.querySelector(
  '.input-upload-product-img'
);
const cartBtn = document.querySelector('.cart-btn');
const totalCartItemsEl = document.querySelector('.total-cart-items');
const containerEl = document.querySelector('.app-container');
const productsContainerEl = document.querySelector('.products');

// Config

// Helpers
const render = (markup, parent, pos = 'afterbegin') => {
  parent.insertAdjacentHTML(pos, markup);
};

const formatCurrency = (val) =>
  new Intl.NumberFormat(navigator.language, {
    style: 'currency',
    currency: 'USD',
  }).format(val);

// Components
const ProductPreview = ({ id = 0, imgUrl, title, price }) => {
  return `
    <!-- PRODUCT PREVIEW -->
    <a href="#${id}">  
      <div class="product-preview flex flex-col gap-2 cursor-pointer" data-product-id=${id}>
        <img
          src=${imgUrl}
          alt=${title}
          class="w-full h-72 object-cover rounded-md"
        />
        <div class="product-title">${title}</div>
        <div class="product-price font-bold">${formatCurrency(price)}</div>
      </div>
    </a>
    <!-- END PRODUCT PREVIEW -->
  `;
};

const ProductPage = ({ id, imgUrl, title, price, desc }) => {
  return `
    <!-- PRODUCT PAGE -->
    <div class="product product-page flex gap-10 p-7 m-auto max-w-full" data-product-id=${id}>
      <img
        src=${imgUrl}
        alt=${title}
        class="rounded-md w-1/2"
      />
      <div class="product-info flex flex-1 flex-col gap-4">
        <h1 class="product-title text-5xl">${title}</h1>
        <p class="product-price font-bold">${formatCurrency(price)}</p>
        <div class="product-quantity w-44 space-y-2">
          <label for="product-quantity">Quantity</label>
          <div class="flex justify-between rounded-md border py-3 px-5">
            <button class="btn-increment-quantity text-xl">+</button>
            <div class="quantity-val font-bold">1</div>
            <button class="btn-decrement-quantity text-xl">-</button>
          </div>
        </div>
        <div class="btns flex flex-col gap-3 w-2/3">
          <button class="btn-add-to-cart w-full btn-add-to-cart border rounded-md py-4 px-7">
            Add to Cart
          </button>
          <button
            class="w-full btn-buy-now rounded-md bg-yellow-300 hover:bg-yellow-400 py-4 px-7"
          >
            Buy Now
          </button>
        </div>

        <div class="product-desc">${desc}</div>
        <div class="btns-share space-x-4 gap-6 mt-8">
          <button
            class="flex items-center gap-2 cursor-pointer text-gray-600 hover:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
              />
            </svg>
            <div>Share</div>
          </button>
        </div>
      </div>
    </div>
    <!-- END PRODUCT PAGE -->
  `;
};

const cartProductPreview = ({
  id,
  productImg,
  productTitle,
  productPrice,
  productQuantity,
}) => {
  return `
    <div
    class="product-cart-preview flex gap-14 items-center"
    data-product-id=${id}
  >
    <img
      src=${productImg}
      class="h-40 object-cover rounded-md"
    />
    <div class="space-y-2 flex-1">
      <h1 class="text-3xl">${productTitle}</h1>
      <p>${formatCurrency(productPrice)}</p>
    </div>

    <div class="quantity-val">${productQuantity}</div>
    <div class="flex">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="btn-remove-item-from-cart w-6 h-6 cursor-pointer"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
        />
      </svg>
    </div>
    <div class="total-val font-bold">${formatCurrency(
      productPrice * productQuantity
    )}</div>
  </div>
  `;
};

const CheckoutBtn = () => {
  return `
    <button class="bg-yellow-300 py-3 px-12 font-bold uppercase text-center rounded-md">Checkout</button>
  `;
};

const CartSubtotal = ({ message }) => {
  const subtotal = state.cart.reduce(
    (sum, product) => (sum += product.productPrice * product.productQuantity),
    0
  );

  return `
    <div class="flex flex-col items-end space-y-4 m-7 py-7 border-t">
      <div class="flex items-center gap-4">
        <h4 class="uppercase">Subtotal</h4>
        <span class="subtotal-val font-bold">${formatCurrency(subtotal)}</span>
      </div>
      <p>${message}</p>
      ${CheckoutBtn()}
    </div>
  `;
};

const Cart = ({ cartProducts }) => {
  return `
    <!-- CART -->
    <div class="cart">
      <div class="flex items-center justify-between p-7">
        <h1 class="text-3xl">Cart</h1>
      </div>
      <div class="flex gap-14 px-7">
        <div class="flex-1 text-sm text-gray-400 uppercase">product</div>
        <div></div>
        <div class="text-sm text-gray-400 uppercase">quantity</div>
        <div></div>
        <div class="text-sm text-gray-400 uppercase">total</div>
      </div>
      <div class="cart-products space-y-4 p-7">
        ${cartProducts
          .map((product) =>
            cartProductPreview({
              id: product.id,
              productImg: product.productImg,
              productTitle: product.productTitle,
              productPrice: product.productPrice,
              productQuantity: product.productQuantity,
            })
          )
          .join('')}
      </div>
    </div>
    ${CartSubtotal({
      message: 'Taxes and shipping calculated at checkout.',
    })}
    <!-- END CART -->
  `;
};

const NotificationPopup = ({ message, success = true }) => {
  return `
    <div
      class="notification popup fixed left-1/2 -translate-x-1/2 translate-y-full rounded-md shadow-md py-3 px-6 flex items-center gap-3"
    >
      ${
        success
          ? `
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6 text-green-600"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      `
          : ''
      }
      ${
        !success
          ? `
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6 text-red-600"
          >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        `
          : ''
      }
      <span>${message}</span>
    </div>
  `;
};

// Event Handlers
const handleShowForm = (e) => {
  overlayEl.classList.remove('hidden');
  addProductFormEl.classList.remove('hidden');
  addProductFormEl.classList.add('grid');
  e.target.blur();
};

const handleHideForm = (e = null) => {
  overlayEl.classList.add('hidden');
  addProductFormEl.classList.add('hidden');
  addProductFormEl.classList.remove('grid');
};

const showFileUploader = (e) => {
  const btnUploadProductImg = e.target.closest('.btn-upload-product-img');
  if (!btnUploadProductImg) return;

  btnUploadProductImg && inputUploadProductImageEl?.click();
};

const handleUploadProductImage = (e) => {
  const [fileSelected] = e.target.files;

  const reader = new FileReader();

  reader.onload = (e) => {
    // console.log(e.target.result);
  };
  reader.readAsDataURL(fileSelected);
};

const handleAddProduct = (e) => {
  const addProduct = () => {
    // Get Form Data
    const formData = [...new FormData(addProductFormEl)];
    const objFormData = Object.fromEntries(formData);

    // Add obj to state
    const productObj = {
      id: Math.floor(Math.random() * 100),
      productImg: objFormData.product_img,
      productTitle: objFormData.product_title,
      productPrice: +objFormData.product_price,
      productDesc: objFormData.product_desc,
      productQuantity: 1,
    };

    // Check if the product already exists
    if (state.products.some((product) => product.id === productObj.id)) return;

    state.products.push(productObj);

    // Reset form & hide it
    addProductFormEl.reset();
    handleHideForm();

    // Render it
    const ProductsEl = ProductPreview({
      id: productObj.id,
      imgUrl: productObj.productImg,
      title: productObj.productTitle,
      price: productObj.productPrice,
    });

    render(ProductsEl, productsContainerEl);
  };

  e.preventDefault();

  const btnSubmit = e.target.closest('.btn-submit');
  if (!btnSubmit) return;

  btnSubmit && addProduct();
};

const handleShowProductPage = (e) => {
  const { hash } = window.location;
  const productId = +hash.slice(1);

  // Get product obj
  const productObj = state.products.find((product) => product.id === productId);
  if (!productObj) return;

  //Render it
  const ProductPageEl = ProductPage({
    id: productObj.id,
    imgUrl: productObj.productImg,
    title: productObj.productTitle,
    price: productObj.productPrice,
    desc: productObj.productDesc,
  });

  // Render it
  containerEl.innerHTML = '';
  render(ProductPageEl, containerEl);
};

const handleAddToCart = (e) => {
  const productClicked = e.target.closest('.product');
  const btnIncrementQuantity = e.target.closest('.btn-increment-quantity');
  const btnDecrementQuantity = e.target.closest('.btn-decrement-quantity');
  const btnAddToCartEl = e.target.closest('.btn-add-to-cart');
  if (!productClicked) return;

  const { productId } = productClicked.dataset;

  // find product
  const productObj = state.products.find(
    (product) => product.id === +productId
  );

  const incrementQuantity = () => {
    // Quantity val is the next element sibling of btn increment quantity
    const quantityValEl = e.target.nextElementSibling;
    productObj.productQuantity++;
    quantityValEl.textContent = productObj.productQuantity;
  };

  const decrementQuantity = () => {
    // Quantity val is the prev element sibling of btn decrement quantity
    const quantityValEl = e.target.previousElementSibling;
    productObj.productQuantity--;
    quantityValEl.textContent = productObj.productQuantity;
  };

  const popupEl = document.querySelector('.popup');

  const hideNotification = () => {
    popupEl.classList.remove('fixed');
    popupEl.classList.add('hidden');
  };

  const addToCart = () => {
    // push  product to cart
    state.cart.push(productObj);

    // show a success notification for 3s
    const NotificationPopupEl = NotificationPopup({
      message: 'Product Added Successfuly',
    });
    if (popupEl) return;
    render(NotificationPopupEl, appContainerEl);
    // setTimeout(hideNotification, 2000);

    // increment total cart items
    totalCartItemsEl.textContent = state.cart.length;
  };

  btnIncrementQuantity && incrementQuantity();
  productObj.productQuantity > 0 && btnDecrementQuantity && decrementQuantity();
  btnAddToCartEl && addToCart();
};

const handleShowCart = (e) => {
  const showCart = () => {
    // empty container
    containerEl.innerHTML = '';

    // render cart
    const CartEl = Cart({
      cartProducts: state.cart,
    });
    render(CartEl, containerEl);
  };

  const { hash } = window.location;
  hash.slice(1) === 'cart' && showCart();
};

const handleRemoveItemFromCart = (e) => {
  const btnRemove = e.target.closest('.btn-remove-item-from-cart');
  const clickedProduct = e.target.closest('.product-cart-preview');
  const subtotalValEl = document.querySelector('.subtotal-val');
  if (!btnRemove) return;

  const { productId } = clickedProduct.dataset;

  // remove product from cart
  const productObjIndex = state.cart.findIndex(
    (product) => product.id === +productId
  );
  state.cart.splice(productObjIndex, 1);
  console.log(state.cart);

  // remove product from ui
  clickedProduct.remove();

  // update cart subtotal
  const subtotal = state.cart.reduce(
    (sum, product) => (sum += product.productPrice * product.productQuantity),
    0
  );
  state.cart.subtotal = subtotal;
  subtotalValEl.textContent = formatCurrency(state.cart.subtotal);
};

// Init
const renderProducts = (products, parent) => {
  parent.innerHTML = '';
  const ProductsPreviewEl = products
    .map((product) =>
      ProductPreview({
        id: product.id,
        imgUrl: product.productImg,
        title: product.productTitle,
        price: product.productPrice,
      })
    )
    .join('');
  parent.insertAdjacentHTML('afterbegin', ProductsPreviewEl);
};
renderProducts(state.products, productsContainerEl);

btnAddProductEl.addEventListener('click', handleShowForm);
overlayEl.addEventListener('click', handleHideForm);
document.addEventListener('keydown', (e) => {
  e.key === 'Escape' && handleHideForm();
});
addProductFormEl.addEventListener('click', handleAddProduct);
// addProductFormEl.addEventListener('click', showFileUploader, false);
// inputUploadProductImageEl.addEventListener('change', handleUploadProductImage);
['hashchange', 'load'].forEach((ev) => {
  window.addEventListener(ev, handleShowProductPage);
});
containerEl.addEventListener('click', handleAddToCart);
window.addEventListener('hashchange', handleShowCart);
totalCartItemsEl.textContent = state.cart.length;
containerEl.addEventListener('click', handleRemoveItemFromCart);
