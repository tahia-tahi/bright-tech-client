import React, { useState } from "react";

const SubscribeSection = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    // এখানে API call add করতে পারো
    console.log("Subscribed:", email);
    setSubmitted(true);
    setEmail("");
  };

  return (
    <section className="bg-gray-900 py-16 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Stay Updated!
        </h2>
        <p className="text-gray-300 mb-8">
          Subscribe to our newsletter to get the latest updates and offers.
        </p>

        <form
          onSubmit={handleSubscribe}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="px-4 py-3 rounded-lg w-full sm:w-auto flex-1 focus:outline-white border border-white"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Subscribe
          </button>
        </form>

        {submitted && (
          <p className="mt-4 text-green-400 font-medium">
            Thank you for subscribing!
          </p>
        )}
      </div>
    </section>
  );
};

export default SubscribeSection;
