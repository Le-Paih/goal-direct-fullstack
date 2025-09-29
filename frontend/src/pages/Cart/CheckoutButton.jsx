import { useSelector } from "react-redux";

function CheckoutButton() {
  const items = useSelector((state) => state.cart.items);

  const handleCheckout = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/checkout/create-checkout-session",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items }),
        }
      );

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("No checkout URL returned", data);
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
    }
  };

  if (items.length === 0) return null;

  return (
    <button
      style={{
        backgroundColor: "black",
        color: "white",
        padding: "0.75rem 1.5rem",
        border: "none",
        borderRadius: "0.5rem",
        cursor: "pointer",
        fontWeight: "bold",
      }}
      onClick={handleCheckout}
    >
      Proceed to Checkout
    </button>
  );
}

export default CheckoutButton;
