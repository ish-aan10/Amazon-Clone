import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/delivery-options.js";
import { formatCurrency } from "../utils/money.js";

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

                <button class="place-order-button button-primary">Place your order</button>
    `;

    document.querySelector(".js-payment-summary").innerHTML = paymentSummaryHTML;
}