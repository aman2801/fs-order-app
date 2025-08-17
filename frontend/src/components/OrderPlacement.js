import React from 'react';

const OrderPlacement = ({ cart, onOrderConfirmed, styles, authToken }) => {
  if (!cart || cart.length === 0) {
    return (
      <div style={styles.container}>
        <p style={styles.message}>Your cart is empty.</p>
        <button onClick={() => onOrderConfirmed()} style={styles.button}>Back to Products</button>
      </div>
    );
  }

  const handleConfirmOrder = async () => {
    try {
      const response = await fetch('https://fs-order-6thtkdxyw-amandeep-singhs-projects-fef51fc7.vercel.app/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': authToken,
        },
        body: JSON.stringify({
          products: cart.map(item => ({
            product: item._id, // Use 'product' key
            quantity: item.quantity
          }))
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      alert('Order placed successfully!');
      onOrderConfirmed(); // Clear cart and go back to products
    } catch (error) {
      console.error('Order placement failed:', error);
      alert(`Order placement failed: ${error.message}`);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Confirm Order</h2>
      <ul style={styles.productList}> {/* Reusing productList style for cart items */}
        {cart.map((item, index) => (
          <li key={item.id || index} style={styles.productItem}> {/* Fallback to index if item.id is missing */}
            <span>{item.description} </span>
            <span>Total: {item.quantity}</span>
          </li>
        ))}
      </ul>
      <button onClick={handleConfirmOrder} style={styles.button}>Confirm Order</button>
      <button onClick={() => onOrderConfirmed()} style={styles.secondaryButton}>Cancel</button>
    </div>
  );
};

export default OrderPlacement;
