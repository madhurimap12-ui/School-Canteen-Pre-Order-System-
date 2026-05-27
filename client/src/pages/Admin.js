import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const [orders, setOrders] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [activeTab, setActiveTab] = useState('orders');
  const [loading, setLoading] = useState(true);
  const { user, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      toast.error('Access denied!');
      navigate('/menu');
      return;
    }
    fetchOrders();
    fetchMenu();
  }, [user]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/orders/all`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(res.data);
    } catch (err) {
      toast.error('Failed to load orders!');
    } finally {
      setLoading(false);
    }
  };

  const fetchMenu = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/menu`);
      setMenuItems(res.data);
    } catch (err) {
      console.error('Failed to load menu');
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/orders/${orderId}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Order status updated!');
      fetchOrders();
    } catch (err) {
      toast.error('Failed to update status!');
    }
  };

  const toggleItemAvailability = async (itemId, currentStatus) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/menu/${itemId}`,
        { is_available: !currentStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Item updated!');
      fetchMenu();
    } catch (err) {
      toast.error('Failed to update item!');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: '#ff9800', confirmed: '#2196f3',
      preparing: '#9c27b0', ready: '#4caf50',
      collected: '#8bc34a', cancelled: '#f44336'
    };
    return colors[status] || '#888';
  };

  if (loading) return <div className="loading">Loading admin panel...</div>;

  return (
    <div>
      <h2 style={{ marginBottom: '20px' }}>⚙️ Admin Panel</h2>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
        {['orders', 'menu'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '10px 24px', borderRadius: '8px', border: 'none',
              cursor: 'pointer', fontWeight: 'bold', fontSize: '15px',
              backgroundColor: activeTab === tab ? '#ff6b35' : '#fff',
              color: activeTab === tab ? 'white' : '#333',
              boxShadow: '0 1px 4px rgba(0,0,0,0.1)'
            }}
          >
            {tab === 'orders' ? '📋 Orders' : '🍽️ Menu Items'}
          </button>
        ))}
      </div>

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div>
          <h3 style={{ marginBottom: '16px' }}>All Orders ({orders.length})</h3>
          {orders.length === 0 ? (
            <div className="loading">No orders yet!</div>
          ) : (
            orders.map(order => (
              <div key={order.id} className="card" style={{
                display: 'flex', justifyContent: 'space-between',
                alignItems: 'center', flexWrap: 'wrap', gap: '12px'
              }}>
                <div>
                  <h3>Order #{order.id}</h3>
                  <p style={{ color: '#888', fontSize: '13px' }}>
                    {new Date(order.order_date).toLocaleString()}
                  </p>
                  <p style={{ fontWeight: 'bold', color: '#ff6b35' }}>₹{order.total_amount}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{
                    backgroundColor: getStatusColor(order.status),
                    color: 'white', padding: '4px 12px',
                    borderRadius: '20px', fontSize: '13px'
                  }}>
                    {order.status.toUpperCase()}
                  </span>
                  <select
                    value={order.status}
                    onChange={e => updateOrderStatus(order.id, e.target.value)}
                    style={{
                      padding: '6px 12px', borderRadius: '6px',
                      border: '1px solid #ddd', cursor: 'pointer'
                    }}
                  >
                    {['pending', 'confirmed', 'preparing', 'ready', 'collected', 'cancelled'].map(s => (
                      <option key={s} value={s}>{s.toUpperCase()}</option>
                    ))}
                  </select>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Menu Tab */}
      {activeTab === 'menu' && (
        <div>
          <h3 style={{ marginBottom: '16px' }}>Menu Items ({menuItems.length})</h3>
          {menuItems.map(item => (
            <div key={item.id} className="card" style={{
              display: 'flex', justifyContent: 'space-between',
              alignItems: 'center', flexWrap: 'wrap', gap: '12px'
            }}>
              <div>
                <h3>{item.name}</h3>
                <p style={{ color: '#888', fontSize: '13px' }}>{item.description}</p>
                <p style={{ color: '#ff6b35', fontWeight: 'bold' }}>₹{item.price}</p>
              </div>
              <button
                onClick={() => toggleItemAvailability(item.id, item.is_available)}
                style={{
                  padding: '8px 16px', borderRadius: '8px', border: 'none',
                  cursor: 'pointer', fontWeight: 'bold',
                  backgroundColor: item.is_available ? '#4caf50' : '#f44336',
                  color: 'white'
                }}
              >
                {item.is_available ? '✅ Available' : '❌ Unavailable'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Admin;