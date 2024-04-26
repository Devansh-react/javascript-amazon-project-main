import { cart, removecartitem } from '../data/cart.js';
import { delivery_option } from '../data/deliveryoption.js';
import { product } from '../data/products.js'
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'

let  today=dayjs();
const deliverydate=today.add(7,'day');
console.log(deliverydate.format('dddd,MMMM D'));


let cartsummaryHTML = '';
let matchingitem;

cart.forEach((cartItem) => {
  const productID = cartItem.productID;
  product.forEach((product) => {
    if (product.id === productID) {
      matchingitem = product;
    }
  });

  cartsummaryHTML += `
      <div class="cart-item-container   
       js-cart-item-${matchingitem.id}">
              <div class="delivery-date">
                Delivery date: Tuesday, June 21
              </div>
  
              <div class="cart-item-details-grid">
                <img class="product-image"
                  src="${matchingitem.image}">
  
                <div class="cart-item-details">
                  <div class="product-name">
                  ${matchingitem.name}
                  </div>
                  <div class="product-price">
                    $ ${(matchingitem.priceCents / 100).toFixed(2)}
                  </div>
                  <div class="product-quantity">
                    <span>
                      Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary">
                      Update
                    </span>
                    <span class="delete-quantity-link link-primary js_delete_link" data-product-id=${matchingitem.id}>
                      Delete
                    </span>
                  </div>
                </div>
  
                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                  ${deliveryoptionHTML(matchingitem)}
                  </div>
                </div>
              </div>
            </div>`;
            

            function deliveryoptionHTML(matchingitem){
              let html='';
              delivery_option.forEach((devliveryoption)=>{
                const today =dayjs();
                const delivery_date=today.add( devliveryoption.Date,'days')
                const date=delivery_date.format('dddd , MMMM D')
                const prize_string= devliveryoption.prize ===0 ? 'free' : ` ${(devliveryoption.prize)/100} -`;
               html += `   <div class="delivery-option">
              <input type="radio"
                class="delivery-option-input"
                name="delivery-option-${matchingitem.id}">
              <div>
                <div class="delivery-option-date">
                  ${date}
                </div>
                <div class="delivery-option-price">
                 ${prize_string}- Shipping
                </div>
              </div>
            </div>`
            return html;

              })
              

            }


  // console.log(cartsummaryHTML)
  document.querySelector('.order-summary').innerHTML = cartsummaryHTML;
  document.querySelectorAll('.js_delete_link').forEach((link) => {
    link.addEventListener('click', () => {
      const productID = link.dataset.productId;
      removecartitem(productID);
     const container= document.querySelector(`.js-cart-item-${productID}`);
     container.remove();     
    })
  })
});