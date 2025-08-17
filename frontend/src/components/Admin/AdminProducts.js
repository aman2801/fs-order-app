import React, { useState, useEffect } from 'react';

const AdminProducts = ({ styles, authToken }) => {
  const [products, setProducts] = useState([]);
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
        const response = await fetch('https://fs-order-6thtkdxyw-amandeep-singhs-projects-fef51fc7.vercel.app/products/all', {
          headers: {
            'x-auth-token': authToken,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        if (Array.isArray(data)) {
          setProducts(data);
        } else if (data && Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          setProducts([]);
          setError('Unexpected API response format.');
        }

      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [authToken]);

  if (loading) {
    return <div style={styles.container}><p style={styles.message}>Loading products...</p></div>;
  }

  if (error) {
    return <div style={styles.container}><p style={styles.message}>Error: {error}</p></div>;
  }

  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>All Products</h3>
      {products.length === 0 ? (
        <p style={styles.message}>No products found.</p>
      ) : (
        <ul style={styles.productList}>
          {products.map((product, index) => (
            <li key={product.id || index} style={styles.productItem}>
              <span>{product.description}</span>
              <span>Price: ${product.price}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminProducts;
