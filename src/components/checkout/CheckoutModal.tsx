import { type FC, useEffect, useState } from "react";
import {
  createPaymentLink,
  type PaymentLinkOptions,
  type Price,
} from "scripts/ui.product";
import type { CollectionEntry } from "astro:content";

interface Props {
  prices: Price[];
  product: CollectionEntry<"products">["data"];
  store: CollectionEntry<"stores">;
}

const CheckoutModal: FC<Props> = ({ prices, product, store }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPriceId, setSelectedPriceId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [tip, setTip] = useState(0);
  const [total, setTotal] = useState(0);
  const [selectedPrice, setSelectedPrice] = useState({} as Price);

  const [options, setOptions] = useState({
    totalPrice: 0,
    product: product.id,
    prices: [],
    stripe_test: !!product?.Name?.match(/test/i),
    includes_shipping: !product?.Name?.match(/digital/i),
    store_id: store?.data?.documentId,
  } as PaymentLinkOptions);

  useEffect(() => {
    const price = prices.find((p) => p.STRIPE_ID === selectedPriceId);
    const basePrice = parseInt(price?.Price || '0', 10);
    const subtotal = basePrice * quantity;
    const newTotal = subtotal + tip;

    const option_prices: Price[] = [
      {
        quantity,
        price: selectedPriceId,
        currency: "usd",
      } as Price,
    ];

    if (tip > 0) {
      option_prices.push({
        unit_amount: String(tip),
        currency: "usd",
        product: product?.SKU,
      } as Price);
    }

    setOptions((prev) => ({
      ...prev,
      totalPrice: newTotal,
      prices: option_prices,
    }));

    setTotal(Number(newTotal));
    setSelectedPrice(price as Price);
  }, [selectedPriceId, quantity, tip]);

  const redirectToPaymentLink = async (e: any) => {
    e.preventDefault();
    const link = await createPaymentLink(options);
    console.log("Payment link:", link);
  };

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsModalOpen(false);
      }
  };

    if (isModalOpen) {
      window.addEventListener('keydown', handleEsc);
    }

    return () => {
      window.removeEventListener('keydown', handleEsc);
  };
  }, [isModalOpen]);

  return (
    <>
      <button
        className="w-full mb-5 flex items-center justify-center rounded-lg bg-sky-600 px-6 py-3 text-base font-semibold text-white hover:bg-sky-700 transition"
        onClick={() => setIsModalOpen(true)}
      >
        Continue to Payment
      </button>
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={(e) =>
            (e.target as Element).classList.contains("fixed") &&
            setIsModalOpen(false)
          }
        >
          <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl ">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-white transition"
              onClick={() => setIsModalOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            <form onSubmit={redirectToPaymentLink}>
              <h2 className="text-xl font-semibold text-gray-900  mb-1">
                Checkout: {product?.Title || product?.Name}
              </h2>
              <p className="text-sm text-gray-500  mb-4">
                Select your preferred option and customize your order.
              </p>
              <div className="mb-4">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium mb-1"
                >
                  Product Options
                </label>
                <select
                  id="price"
                  name="price"
                  className="w-full rounded-md border border-gray-300  bg-white  px-3 py-2 text-base focus:ring-sky-500 focus:border-sky-500"
                  onChange={(e) => setSelectedPriceId(e.target.value)}
                >
                  <option value="">Select an option</option>
                  {prices.map((price) => (
                    <option key={price.STRIPE_ID} value={price.STRIPE_ID}>
                      {price.Name.replace(/_/g, " ")} — ${price.Price}{" "}
                      {price.Currency}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="quantity"
                  className="block text-sm font-medium mb-1"
                >
                  Quantity
                </label>
                <input
                  type="number"
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full rounded-md border border-gray-300  bg-white  px-3 py-2 text-base focus:ring-sky-500 focus:border-sky-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="tip"
                  className="block text-sm font-medium mb-1"
                >
                  Tip / Custom Price
                </label>
                <input
                  type="number"
                  id="tip"
                  value={tip}
                  onChange={(e) => setTip(Number(e.target.value))}
                  className="w-full rounded-md border border-gray-300  bg-white  px-3 py-2 text-base focus:ring-sky-500 focus:border-sky-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Total</label>
                <p className="text-2xl font-semibold">${total || 0}</p>
              </div>
              <div className="mb-4">
                <button
                  type="submit"
                  disabled={total <= 0 || !selectedPrice?.Description || quantity < 1}
                  className="w-full rounded-lg bg-sky-600 px-5 py-3 text-white font-semibold hover:bg-sky-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue to Payment
                </button>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {total > 0
                  ? selectedPrice?.Description || "Continue using custom price"
                  : "Please select an option and enter a valid total."}
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CheckoutModal;
