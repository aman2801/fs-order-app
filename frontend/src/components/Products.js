import React, { useState, useEffect } from 'react';

const Products = ({ onCheckout, styles, authToken }) => {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!authToken) {
        setError('Authentication token is missing. Please log in.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('https://fs-order-6thtkdxyw-amandeep-singhs-projects-fef51fc7.vercel.app/products', {
          headers: {
            'x-auth-token': authToken,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        // Ensure data is an array or contains a products array
        if (Array.isArray(data)) {
          setProducts(data);
        } else if (data && Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          setProducts([]); // Default to empty array if format is unexpected
          setError('Unexpected API response format.');
        }

      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [authToken]); // Re-run effect if authToken changes

  const handleIncrement = (product) => {
    const productId = product.id || product._id;
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [productId]: (prevQuantities[productId] || 0) + 1
    }));
  };

  const handleDecrement = (product) => {
    const productId = product.id || product._id;
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [productId]: Math.max(0, (prevQuantities[productId] || 0) - 1)
    }));
  };

  const handleCheckout = () => {
    const selectedProductsInCart = products.filter(product => quantities[product.id || product._id] > 0)
                                           .map(product => ({
                                             _id: product._id || product.id, // Ensure _id is always present
                                             description: product.description,
                                             quantity: quantities[product.id || product._id],
                                             price: parseFloat(product.price) || 0 // Ensure price is a number
                                           }));
    onCheckout(selectedProductsInCart);
  };

  if (loading) {
    return <div style={styles.container}><p style={styles.message}>Loading products...</p></div>;
  }

  if (error) {
    return <div style={styles.container}><p style={styles.message}>Error: {error}</p></div>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Place your order</h2>
      {products.length === 0 ? (
        <p style={styles.message}>No products available.</p>
      ) : (
        <ul style={styles.productList}>
          {products.map((product, index) => (
            <li key={product.id || index} style={styles.productItem}> {/* Fallback to index if product.id is missing */}
              <span>{product.description} </span>
              <div style={styles.quantityControl}>
                <button onClick={() => handleDecrement(product)} style={styles.quantityButton}>-</button>
                <span style={styles.quantityDisplay}>{quantities[product.id || product._id] || 0}</span>
                <button onClick={() => handleIncrement(product)} style={styles.quantityButton}>+</button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <button onClick={handleCheckout} style={styles.button}>Checkout</button>
    </div>
  );
};

export default Products;