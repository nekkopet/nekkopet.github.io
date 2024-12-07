// src/components/Subscribe.tsx
import { markketplace } from "@config";

interface Props {
  storeId: string;
  storeName: string;
}

export default function Subscribe({ storeId, storeName }: Props) {
  return (
    <div className="">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const form = e.target as HTMLFormElement;
          const email = (form.elements.namedItem('email') as HTMLInputElement).value;

          try {
            const response = await fetch(`${markketplace.STRAPI_URL}/api/subscribers`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                data: {
                  Email: email,
                  stores: [storeId],
                }
              })
            });

            if (!response.ok) throw new Error();
            form.reset();
            alert('Thanks for subscribing!');
          } catch (error) {
            alert('Something went wrong. Please try again.');
          }
        }}
      >
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Subscribe to {storeName}'s newsletter
          </label>
          <div className="flex gap-2">
            <input
              type="email"
              name="email"
              required
              className="flex-1 rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-accent-500 focus:ring-accent-500"
              placeholder="your@email.com"
            />
            <button
              style={{ background: markketplace.colors.primary, color: 'black' }}
              type="submit"
              className="px-4 py-2 bg-accent-600 text-white rounded-md hover:bg-accent-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-500"
            >
              Subscribe
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
