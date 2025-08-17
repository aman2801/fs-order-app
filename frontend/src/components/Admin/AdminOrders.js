import React, { useState, useEffect } from 'react';

const AdminOrders = ({ styles, authToken }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!authToken) {
        setError('Authentication token is missing. Please log in.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('https://fs-order-6thtkdxyw-amandeep-singhs-projects-fef51fc7.vercel.app/orders/all', {
          headers: {
            'x-auth-token': authToken,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setOrders(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [authToken]);

  if (loading) {
    return <div style={styles.container}><p style={styles.message}>Loading orders...</p></div>;
  }

  if (error) {
    return <div style={styles.container}><p style={styles.message}>Error: {error}</p></div>;
  }

  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>All Orders</h3>
      {orders.length === 0 ? (
        <p style={styles.message}>No orders found.</p>
      ) : (
        <ul style={styles.orderList}>
          {orders.map(order => (
            <li key={order._id} style={styles.orderItem}>
              <span>Order #{order._id}</span>
              <span>User: {order.user.email}</span>
              <span style={styles.orderDate}>{new Date(order.timestamp).toLocaleDateString()}</span>
              <ul style={styles.productList}>
                {order.products && order.products.map((item, itemIndex) => (
                  <li key={item._id || itemIndex} style={styles.productItem}>
                    <span>
                      {item.product.description} (x{item.quantity})
                    </span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminOrders;
