import { markketplace } from '@config';

export const receiptPage = async (session_id: string) => {
  console.log('activating receipt page', { session_id });

  // markketplace.STRAPI_URL = 'http://localhost:1337';
  const request = await fetch(`${markketplace.STRAPI_URL}/api/markket`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      action: 'stripe.receipt',
      session_id
    }),
  });

  const response = await request.json();

  const addressOutput = document.querySelector('[data-output="shipping-address"]');
  const amountOutput = document.querySelector('[data-output="total-amount"]');
  const emailOutput = document.querySelector('[data-output="customer-email"]');

  if (addressOutput) {
    const address = response?.data?.link?.shipping_details?.address;
    addressOutput.innerHTML = address ? `${address.line1} ${address.line2} - ${address.city} ${address.state} ${address.postal_code}` : '';
  }

  if (amountOutput) {
    amountOutput.innerHTML = ((response?.data?.link?.amount_total || 0) / 100).toString();
  }

  if (emailOutput) {
    emailOutput.innerHTML = response?.data?.link?.customer_details?.email || '';
  }

  console.log({ request });
};
