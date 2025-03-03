import React from "react";

const StripeCheckout = () => {
  const stripe = window.Stripe("pk_test_51Qi8tPBrvnAB2ikXXB8OweXeWxs5NqnitLcnm0FNGzbQaKS1pPBGpJdWRtruDDg3bb1maaQSqYC7KIZ13mhtqsYZ00Uj7qpoY3"); // Replace with your Stripe publishable key

  const handleCheckout = () => {
    fetch("http://localhost:8085/api/v1/payment/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to create checkout session");
        }
        return response.json();
      })
      .then((data) => {
        return stripe.redirectToCheckout({ sessionId: data.sessionId });
      })
      .then((result) => {
        if (result.error) {
          alert(result.error.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  

  return (
    <button onClick={handleCheckout} id="checkout-button" className="bg-teal-200 text-gray-800 font-medium py-2 px-6 rounded-md hover:bg-teal-300 transition-colors w-24">
      Pay 
    </button>
  );
};

export default StripeCheckout;
