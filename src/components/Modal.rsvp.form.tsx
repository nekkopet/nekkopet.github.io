import React, { useState } from 'react';
import { createRecord } from '../lib/strapi';

interface Props {
  onClose: () => void;
  eventId: string;
}

const RSVPModal = ({ onClose, eventId }: Props) => {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const close = () => {
    setIsOpen(false);
    onClose();
  }

  const handleSubmit = async (e: React.FormEvent) => {
    console.log('sumib');
    e.preventDefault();
    setIsSubmitting(true);

    const response = await createRecord('rsvps', {
      name: formData.name,
      email: formData.email,
      event: eventId,
    }) as Response;

    if (response?.ok) {
      console.log('RSVP submitted successfully');
    }

    close();
  };

  return (
    <>
      <div className="mb-6 mt-7">
        <button
          className="inline-flex items-center rounded-md bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-accent-700 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2"
          onClick={() => setIsOpen(true)}
        >
          RSVP Now
        </button>
      </div>
      {isOpen && (<div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-screen items-center justify-center px-4">
          <div className="fixed inset-0 bg-black opacity-30" onClick={close}></div>

          <div className="relative rounded-lg bg-white p-8 shadow-xl dark:bg-gray-800">
            <button
              onClick={close}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-500"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h3 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
              RSVP for this event
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData((prev: any) => ({ ...prev, name: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent-500 focus:ring-accent-500 dark:border-gray-600 dark:bg-gray-700"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData((prev: any) => ({ ...prev, email: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent-500 focus:ring-accent-500 dark:border-gray-600 dark:bg-gray-700"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-700 w-full rounded-md bg-accent-600 px-4 py-2 text-white hover:bg-accent-700 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Submit RSVP'}
              </button>
            </form>
          </div>
        </div>
      </div>)}
    </>
  );
};

export default RSVPModal;
