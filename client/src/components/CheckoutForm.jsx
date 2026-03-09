import React, { useState } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:5173/payment-success",
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
      <button 
        disabled={isLoading || !stripe || !elements} 
        id="submit"
        className="mt-6 w-full bg-blue-600 text-white py-3 rounded font-bold transition hover:bg-blue-700 disabled:bg-gray-400"
      >
        <span id="button-text">
          {isLoading ? <div className="animate-spin h-5 w-5 border-b-2 border-white mx-auto rounded-full"></div> : "Pay now"}
        </span>
      </button>
      {message && <div id="payment-message" className="mt-4 text-red-600 text-center font-medium">{message}</div>}
    </form>
  );
};

export default CheckoutForm;
