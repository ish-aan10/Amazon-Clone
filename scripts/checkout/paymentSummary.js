import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/delivery-options.js";
import { formatCurrency } from "../utils/money.js";
import { addOrder } from "../../data/orders.js";

export function renderPaymentSummary() {
    let productPricePaisa = 0;
    let shippingPricePaisa = 0;
    
    cart.forEach((cartItem) => {
        const product = getProduct(cartItem.productId);
        productPricePaisa += product.pricePaisa * cartItem.quantity;

        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
        shippingPricePaisa += deliveryOption.pricePaisa;
    });

    const totalPaisa = productPricePaisa + shippingPricePaisa;

    const paymentSummaryHTML = `
                <div class="payment-summary-title">
                    Order Summary
                </div>
                <div class="payment-summary-row">
                    <div>Items:</div>
                    <div class="payment-summary-money">&#8377; ${formatCurrency(productPricePaisa)}</div>
                </div>
                <div class="payment-summary-row">
                    <div>Delivery:</div>
                    <div class="payment-summary-money">&#8377; ${formatCurrency(shippingPricePaisa)}</div> 
                </div>
                <div class="payment-summary-row total-row">
                    <div>Order total:</div>
                    <div class="payment-summary-money">&#8377; ${formatCurrency(totalPaisa)}</div> 
                </div>

                <button class="place-order-button button-primary js-place-order">Place your order</button>
    `;

    document.querySelector(".js-payment-summary").innerHTML = paymentSummaryHTML;

    document.querySelector(".js-place-order").addEventListener('click', async () => {
        try {
            const response = await fetch('https://supersimplebackend.dev/orders', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    cart: cart
                })
            });
    
            const order = await response.json();
            addOrder(order);
        } catch {
            console.log("Unexpected Error. Try Again Later.");
        }

        window.location.href = "orders.html";
    });
}