import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { QRCodeCanvas as QRCode } from 'qrcode.react';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const { user, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/orders/my-orders`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(res.data);
    } catch (err) {
      toast.error('Failed to load orders!');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: '#ff9800',
      confirmed: '#2196f3',
      preparing: '#9c27b0',
      ready: '#4caf50',
      collected: '#8bc34a',
      cancelled: '#f44336'
    };
    return colors[status] || '#888';
  };

  if (loading) return <div className="loading">Loading orders...</div>;

  if (orders.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '60px' }}>
        <div style={{ fontSize: '80px', marginBottom: '16px' }}>📋</div>
        <h2 style={{ color: '#888', marginBottom: '16px' }}>No orders yet!</h2>
        <button onClick={() => navigate('/menu')} className="btn-primary">
          Order Now
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '20px' }}>📋 My Orders</h2>
      {orders.map(order => (
        <div key={order.id} className="card">
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'center', marginBottom: '12px'
          }}>
            <div>
              <h3 style={{ marginBottom: '4px' }}>Order #{order.id}</h3>
              <p style={{ color: '#888', fontSize: '13px' }}>
                {new Date(order.order_date).toLocaleString()}
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{
                backgroundColor: getStatusColor(order.status),
                color: 'white', padding: '4px 12px',
                borderRadius: '20px', fontSize: '13px', fontWeight: 'bold'
              }}>
                {order.status.toUpperCase()}
              </span>
              <p style={{ color: '#ff6b35', fontWeight: 'bold', marginTop: '6px' }}>
                ₹{order.total_amount}
              </p>
            </div>
          </div>

          <button
            onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
            style={{
              backgroundColor: '#f5f5f5', border: 'none',
              padding: '8px 16px', borderRadius: '6px',
              cursor: 'pointer', width: '100%', marginBottom: '8px'
            }}
          >
            {expandedOrder === order.id ? '▲ Hide Details' : '▼ Show Details & QR'}
          </button>

          {expandedOrder === order.id && (
            <div style={{ borderTop: '1px solid #eee', paddingTop: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
                <QRCode
                  value={JSON.stringify({ orderId: order.id, total: order.total_amount })}
                  size={180}
                />
              </div>
              <p style={{ textAlign: 'center', color: '#888', fontSize: '13px' }}>
                Show this QR at the counter
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;