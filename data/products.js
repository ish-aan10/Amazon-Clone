import { formatCurrency } from "../scripts/utils/money.js";

export function getProduct(productId) {
    let matchingProduct;

    products.forEach((product) => {
        if (product.id === productId) {
            matchingProduct = product;
        }
    });

    return matchingProduct;
}


class Product {
    id;
    image;
    name;
    rating;
    pricePaisa;

    constructor(productDetails) {
        this.id = productDetails.id;
        this.image = productDetails.image;
        this.name = productDetails.name;
        this.rating = productDetails.rating;
        this.pricePaisa = productDetails.pricePaisa;
    }

    getStarsUrl() {
        return `images/rating/rating-${this.rating.stars * 10}.png`;
    }

    getPrice() {
        return `&#8377; ${formatCurrency(this.pricePaisa)}`;
    }
}

const product1 = new Product({
    id: '1',
    image: 'images/products/product_1.webp',
    name: 'Cosmic Byte ARES Wireless Controller for PC',
    rating: {
        stars: 4.0,
        count: 3345
    },
    pricePaisa: 189900
});

export const products = [{
    id: '1',
    image: 'images/products/product_1.webp',
    name: 'Cosmic Byte ARES Wireless Controller for PC',
    rating: {
        stars: 4.0,
        count: 3345
    },
    pricePaisa: 189900
}, {
    id: '2',
    image: "images/products/product_2.webp",
    name: "Lenovo ThinkPad 6th Gen Intel Core i5 Thin & Light HD Laptop",
    rating: {
        stars: 3.5,
        count: 258
    },
    pricePaisa: 1703500
}, {
    id: '3',
    image: "images/products/product_3.webp",
    name: "Men T Shirt || T-Shirt for Men || Plain T Shirt || T-Shirt (T-30-33)",
    rating: {
        stars: 5.0,
        count: 38
    },
    pricePaisa: 30900
}, {
    id: '4',
    image: "images/products/product_4.webp",
    name: "The Souled Store|Official Batman: Logo (Drip) Mens T-Shirts",
    rating: {
        stars: 4.0,
        count: 34
    },
    pricePaisa: 79900
}, {
    id: '5',
    image: "images/products/product_5.webp",
    name: "Men Track Pants",
    rating: {
        stars: 3.5,
        count: 46
    },
    pricePaisa: 98900
}, {
    id: '6',
    image: "images/products/product_6.webp",
    name: "Dell 15 Thin & Light Laptop, 12th Gen Intel Core i5-1235U Processor",
    rating: {
        stars: 4.0,
        count: 614
    },
    pricePaisa: 4699000
}, {
    id: '7',
    image: "images/products/product_7.webp",
    name: "Redragon K631 PRO 65% 3-Mode Wireless RGB Gaming Keyboard",
    rating: {
        stars: 4.5,
        count: 203
    },
    pricePaisa: 469000
}, {
    id: '8',
    image: "images/products/product_8.webp",
    name: "Mens Downshifter Running Shoes 13Nike Downshifter 13",
    rating: {
        stars: 3.0,
        count: 8
    },
    pricePaisa: 320900
}, {
    id: '9',
    image: "images/products/product_9.webp",
    name: "Cosmic Byte Stellaris Controller, 3 Modes Wifi + Bluetooth + Wired PC",
    rating: {
        stars: 4.0,
        count: 59
    },
    pricePaisa: 299900
}, {
    id: '10',
    image: "images/products/product_10.webp",
    name: "Casual Sneaker Shoes for Men | Stylish and Comfortable",
    rating: {
        stars: 4.0,
        count: 1337
    },
    pricePaisa: 169900
}, {
    id: '11',
    image: "images/products/product_11.webp",
    name: "Casual Shirt for Men|| Shirt for Men|| Men Stylish Shirt",
    rating: {
        stars: 3.5,
        count: 620
    },
    pricePaisa: 44900
}, {
    id: '12',
    image: "images/products/product_12.webp",
    name: "Razer DeathAdder Essential White Edition - 6400 DPI",
    rating: {
        stars: 4.5,
        count: 24657
    },
    pricePaisa: 124900
},].map((productDetails) => {
    return new Product(productDetails);
});