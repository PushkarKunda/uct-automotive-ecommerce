import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useSelector } from 'react-redux';
import CheckoutForm from '../components/CheckoutForm';
import { Link } from 'react-router-dom';

// Fetch the public key from env or use a test key
const stripePromise = loadStripe('pk_test_placeholder_key_here'); 

const CheckoutScreen = () => {
  const [clientSecret, setClientSecret] = useState('');
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    // Only attempt if there are items
    if (cart.cartItems.length > 0) {
      // Typically you'd send a real token in headers using Redux user state
      fetch('http://localhost:5000/api/payment/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cart.cartItems }),
      })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret))
        .catch(err => console.error("Error creating payment intent:", err));
    }
  }, [cart.cartItems]);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  if (cart.cartItems.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Link to="/" className="text-blue-600 hover:underline">Go back to shopping</Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Complete Your Order</h1>
      <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        )}
      </div>
    </div>
  );
};

export default CheckoutScreen;
