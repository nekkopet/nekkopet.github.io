import { type Product } from '../interfaces';
import { markketplace } from '@config';
/**
 *
 */
export const ProductSlideshow = function () {
  // Front matter TS is executed in the ~server during the build process
  // import confetti from 'canvas-confetti';

  const buttons = document.querySelectorAll("[data-astro-image]");

  // Add event listeners to fire confetti when a button is clicked.
  buttons.forEach(button => {
    button.addEventListener("click", e => {
      const jsonData = e.target?.getAttribute('data-astro-image');

      try {
        const jsonObject = JSON.parse(jsonData || ''); // Parse the JSON string
        const heroImage = document.querySelector(".hero-image");
        console.log({ heroImage })

        if (heroImage) {
          heroImage.src = jsonObject.url;
        }

      } catch (error) {
        console.error("Error parsing JSON", error);
      }
    });
  });
};

export type Price = {
  amount?: number,
  currency: string,
  product?: string,
  unit_amount?: string,
  price?: string,
  quantity?: number,
  STRIPE_ID?: string,
  Description?: string,
};

export type PaymentLinkOptions = {
  totalPrice: number,
  product: string,
  prices: Price[],
  includes_shipping: boolean,
  stripe_test: boolean,
};

/**
 * Sends a POST request to the API, to request a unique stripe payment link
 * We redirect buyers there to complete the purchase
 *
 * @returns {Promise<Response>} Payment link
 */
export const createPaymentLink = async (options: PaymentLinkOptions, isTest: boolean = true): Promise<Response> => {
  console.log("Creating payment link", { options, isTest });

  const prices = options.prices;

  const body = {
    prices,
    total: options.totalPrice,
    product: options.product,
    action: 'stripe.link',
    includes_shipping: options.includes_shipping,
    stripe_test: options.stripe_test,
  };

  // markketplace.STRAPI_URL = 'http://localhost:1337';
  const request = await fetch(`${markketplace.STRAPI_URL}/api/markket`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const response = await request.json();

  console.log("Payment link", { request, response });

  const url = response?.data?.link?.response?.url;
  if (request.ok && url) {
    window.location.href = url;
  }

  return request;
};

/**
 * Creates event listeners, and other needed scripts in the /product/:slug page, or wherever is embedded
 */
export const ProductForm = function () {
  console.log('Activating ProductForm');
  const options: PaymentLinkOptions = {
    totalPrice: 0,
    product: '',
    prices: [],
    includes_shipping: true,
    stripe_test: false,
  };

  const form = document.querySelector('form[data-product-price]')

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();

    console.log('submit event', { options });

    const response = await createPaymentLink({
      totalPrice: options.totalPrice,
      product: options.product,
      prices: options.prices,
      includes_shipping: options.includes_shipping,
      stripe_test: options.stripe_test,
    });

    console.log({ options, response });
  });

  form?.addEventListener('change', async () => {
    console.log('change event');
    options.prices = [];

    const productDataString = form.getAttribute('data-product-json');

    if (!productDataString) {
      console.error('No product data');
      return;
    }

    const productData = JSON.parse(productDataString) as Product;

    if (productData.Name?.match(/test/i)) {
      // @TODO: Read from Product JSON
      options.stripe_test = true;
    }

    if (productData.Name?.match(/digital/i)) {
      // @TODO: Read from Product JSON
      options.includes_shipping = false;
    }

    options.product = '' + productData.id;

    let customPriceInput = document.querySelector('[data-input="custom-price"]')?.value;
    let customPrice = 0;
    if (customPriceInput) {
      customPriceInput = parseInt(customPriceInput, 10);
      options.prices.push({
        unit_amount: customPriceInput,
        currency: 'usd',
        product: productData.SKU,
      })
      customPrice = customPriceInput;
    }

    let quantityInput = document.querySelector('[data-input="quantity"]')?.value;
    let priceOption = document.querySelector('[data-input="product.prices"]')?.value;
    quantityInput = parseInt(quantityInput || '1', 10) || 1;
    const selectedPrice = productData?.PRICES?.find((price: Price) => price.STRIPE_ID === priceOption);

    if (selectedPrice?.STRIPE_ID) {
      options.prices.push({
        quantity: quantityInput,
        price: selectedPrice?.STRIPE_ID,
      } as Price);
    }

    const descriptionOutput = document.querySelector('[data-output="product.price.description"]');
    if (descriptionOutput) {
      descriptionOutput.innerHTML = selectedPrice?.Description || '';
    }

    const totalPrice = ((selectedPrice?.Price || 0) * quantityInput) + customPrice;
    options.totalPrice = totalPrice;

    const priceOutput = document.querySelector('[data-output="total"]');
    if (priceOutput) {
      priceOutput.innerHTML = `${totalPrice || '0'}`;
    }

    const submitButton = document.querySelector('[data-action-button="submit"]');
    if (submitButton) {
      submitButton.removeAttribute('disabled');
    }
  });
};
