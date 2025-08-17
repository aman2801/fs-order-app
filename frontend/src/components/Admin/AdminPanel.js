import React, { useState } from 'react';
import AdminProducts from './AdminProducts';
import AdminOrders from './AdminOrders';

const AdminPanel = ({ styles, authToken }) => {
  const [activeTab, setActiveTab] = useState('products'); // 'products' or 'orders'

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Admin Panel</h2>
      <nav style={styles.nav}>
        <button onClick={() => setActiveTab('products')} style={styles.navButton}>Products</button>
        <button onClick={() => setActiveTab('orders')} style={styles.navButton}>Orders</button>
      </nav>
      <main>
        {activeTab === 'products' && <AdminProducts styles={styles} authToken={authToken} />}
        {activeTab === 'orders' && <AdminOrders styles={styles} authToken={authToken} />}
      </main>
    </div>
  );
};

export default AdminPanel;
