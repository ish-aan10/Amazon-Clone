import {cart, removeFromCart, updateDeliveryOptions, updateQuantity} from "../data/cart.js";
import {products} from "../data/products.js";
import {formatCurrency} from "./utils/money.js";
import { deliveryOptions } from "../data/delivery-options.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

function renderOrderSummary() {
    let cartSummaryHTML = '';

    cart.forEach((cartItem) => {
        const productId = cartItem.productId;

        let matchingProduct;

        products.forEach((product) => {
            if (product.id === productId) {
                matchingProduct = product;
            }
        });

        const deliveryOptionId = cartItem.deliveryOptionId;

        let deliveryOption;

        deliveryOptions.forEach((option) => {
            if(option.id === deliveryOptionId) {
                deliveryOption = option;
            }
        });

        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDays,'days');
        const dateString = deliveryDate.format('dddd, MMMM D');

        cartSummaryHTML += `
                    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
                        <div class="delivery-date">
                            Delivery Date: ${dateString}
                        </div>
                        <div class="cart-item-details-grid">
                            <img class="product-image" src="${matchingProduct.image}">
                            <div class="cart-item-details">
                                <div class="product-name">
                                    ${matchingProduct.name}
                                </div>
                                <div class="product-price">
                                    &#8377; ${formatCurrency(matchingProduct.pricePaisa)}
                                </div>
                                <div class="product-quantity">
                                    <span>Quantity : <span class="quantity-label  js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span></span>
                                    <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">Update</span>
                                    <input class="quantity-input js-quantity-input-${matchingProduct.id}">
                                    <span class="save-quantity-link link-primary js-save-link" data-product-id="${matchingProduct.id}">Save</span>
                                    <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">Delete</span>
                                </div>
                            </div>
                            <div class="delivery-options">
                                <div class="delivery-option-title">
                                    Choose a delivery option:
                                </div>
                                ${deliveryOptionsHTML(matchingProduct, cartItem)}
                            </div> 
                        </div>
                    </div>`;
    });

    function deliveryOptionsHTML(matchingProduct, cartItem) {
        let deliveryHTML = '';

        deliveryOptions.forEach((deliveryOption) => {
            const today = dayjs();
            const deliveryDate = today.add(
                deliveryOption.deliveryDays,'days'
            );
            const dateString = deliveryDate.format('dddd, MMMM D');
            const priceString = deliveryOption.pricePaisa === 0 ? "FREE" : `&#8377; ${formatCurrency(deliveryOption.pricePaisa)} -`;

            const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

            deliveryHTML += `   <div class="delivery-option js-delivery-option" 
                                data-product-id="${matchingProduct.id}"
                                data-delivery-option-id="${deliveryOption.id}">
                                    <input type="radio" 
                                    ${isChecked ? "checked" : ""}
                                    class="delivery-option-input" name="${matchingProduct.id}">
                                    <div>
                                        <div class="delivery-option-date">${dateString}</div>
                                        <div class="delivery-option-price">${priceString} Shipping</div>
                                    </div>
                                </div>`;
        });

        return deliveryHTML;
    }

    document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

    document.querySelectorAll(".js-delete-link").forEach((link) => {
        link.addEventListener("click", () => {
            const productId = link.dataset.productId;
            removeFromCart(productId);

            const container = document.querySelector(`.js-cart-item-container-${productId}`);
            container.remove();
        });
    });

    document.querySelectorAll(".js-update-link").forEach((link) => {
        link.addEventListener("click", () => {
            const productId = link.dataset.productId;

            const container = document.querySelector(`.js-cart-item-container-${productId}`);
            container.classList.add("is-editing-quantity");
        });
    });

    document.querySelectorAll(".js-save-link").forEach((link) => {
        link.addEventListener("click", () => {
            const productId = link.dataset.productId;

            const container = document.querySelector(`.js-cart-item-container-${productId}`);
            container.classList.remove("is-editing-quantity");
            
            const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
            const newQuantity = Number(quantityInput.value);

            if (newQuantity < 0 || newQuantity >= 1000) {
                alert("Quantity should be at least 0 or less than 1000");
                return;
            }

            const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);
            quantityLabel.innerHTML = newQuantity;

            updateQuantity(productId, newQuantity);
        });
    });

    document.querySelectorAll(".js-delivery-option").forEach((element) => {
        element.addEventListener("click", () => {
            const {productId, deliveryOptionId} = element.dataset;
            updateDeliveryOptions(productId, deliveryOptionId);
            renderOrderSummary();
        });
    });

}

renderOrderSummary();