import { cart, addToCart } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

let productsHTML = "";

updateCartQuantity();

products.forEach(product => {
    productsHTML += 
    `<div class="product-container">
        <div class="product-image-container">
            <img src="${product.image}" class="product-image">
        </div>
        <div class="product-name limit text-to-2-lines">
            ${product.name}
        </div>
        <div class="product-rating-container">
            <img src="images/rating/rating-${product.rating.stars * 10}.png" class="product-rating-stars">                        
            <div class="product-rating-count link-primary">
                ${product.rating.count}
            </div>
        </div>
        <div class="product-price">
            &#8377; ${formatCurrency(product.pricePaisa)}
        </div>
        <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
                <option selected value="1">1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
        </select>
        </div>
        <div class="product-spacer"></div>
        <div class="added-to-cart js-added-message-${product.id}">
            <img src="images/icons/checkmark.png">Added
        </div>
        <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">Add to Cart</button>
    </div>`;
});

document.querySelector(".js-product-grid").innerHTML = productsHTML;

function updateCartQuantity() {
    let cartQuantity = 0;

    cart.forEach((item) => {
        cartQuantity += item.quantity;
    });
    
    if (cartQuantity < 10){
        document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
    } else {
        document.querySelector(".js-cart-quantity").innerHTML = "9+";
    }
}

const addedMessageTimeout = {};

document.querySelectorAll(".js-add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
        const  productId = button.dataset.productId;
        const quantity = Number
        (document.querySelector(`.js-quantity-selector-${productId}`).value);

        const addedMessage = document.querySelector(`.js-added-message-${productId}`);
        addedMessage.classList.add("added-to-cart-2");

        setTimeout(() => {
            const previousTimeoutId = addedMessageTimeout[productId];
            if (previousTimeoutId) {
                clearTimeout(previousTimeoutId);
            }

            const timeoutId = 
            setTimeout(() => {
                addedMessage.classList.remove("added-to-cart-2");
            }, 2000);

            addedMessageTimeout[productId] = timeoutId;
        });

        addToCart(productId, quantity);
        updateCartQuantity();
    });
});