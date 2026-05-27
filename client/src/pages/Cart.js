import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { QRCodeCanvas as QRCode } from 'qrcode.react';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart, totalPrice } = useCart();
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(null);

  const handlePlaceOrder = async () => {
    if (!user) {
      toast.error('Please login to place an order!');
      navigate('/login');
      return;
    }
    if (cartItems.length === 0) {
      toast.error('Your cart is empty!');
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/orders`,
        {
          items: cartItems.map(i => ({
            menu_item_id: i.id,
            quantity: i.quantity,
            price_at_purchase: i.price
          })),
          total_amount: totalPrice
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOrder(res.data);
      clearCart();
      toast.success('Order placed successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to place order!');
    } finally {
      setLoading(false);
    }
  };

  if (order) {
    return (
      <div style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>
        <div className="card">
          <div style={{ fontSize: '60px', marginBottom: '16px' }}>✅</div>
          <h2 style={{ color: '#4caf50', marginBottom: '8px' }}>Order Placed!</h2>
          <p style={{ color: '#888', marginBottom: '24px' }}>
            Show this QR code at the counter to collect your order
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
            <QRCode
              value={JSON.stringify({ orderId: order.id, total: order.total_amount })}
              size={200}
            />
          </div>
          <p style={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '8px' }}>
            Order #{order.id}
          </p>
          <p style={{ color: '#ff6b35', fontSize: '20px', fontWeight: 'bold', marginBottom: '24px' }}>
            Total: ₹{order.total_amount}
          </p>
          <button onClick={() => navigate('/orders')} className="btn-primary" style={{ width: '100%' }}>
            View My Orders
          </button>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '60px' }}>
        <div style={{ fontSize: '80px', marginBottom: '16px' }}>🛒</div>
        <h2 style={{ color: '#888', marginBottom: '16px' }}>Your cart is empty!</h2>
        <button onClick={() => navigate('/menu')} className="btn-primary">
          Browse Menu
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '20px' }}>🛒 Your Cart</h2>

      {cartItems.map(item => (
        <div key={item.id} className="card" style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', padding: '16px'
        }}>
          <div style={{ flex: 1 }}>
            <h3 style={{ marginBottom: '4px' }}>{item.name}</h3>
            <p style={{ color: '#ff6b35', fontWeight: 'bold' }}>₹{item.price}</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              style={{
                width: '32px', height: '32px', borderRadius: '50%',
                border: '1px solid #ddd', backgroundColor: '#f5f5f5',
                fontSize: '18px', cursor: 'pointer'
              }}
            >-</button>
            <span style={{ fontWeight: 'bold', fontSize: '16px' }}>{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              style={{
                width: '32px', height: '32px', borderRadius: '50%',
                border: '1px solid #ddd', backgroundColor: '#f5f5f5',
                fontSize: '18px', cursor: 'pointer'
              }}
            >+</button>
            <button
              onClick={() => removeFromCart(item.id)}
              style={{
                backgroundColor: '#ffebee', color: '#e53935',
                border: 'none', padding: '6px 12px',
                borderRadius: '6px', cursor: 'pointer'
              }}
            >🗑️</button>
          </div>
          <div style={{ minWidth: '80px', textAlign: 'right', fontWeight: 'bold' }}>
            ₹{(item.price * item.quantity).toFixed(2)}
          </div>
        </div>
      ))}

      <div className="card" style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
          <span style={{ fontSize: '18px', fontWeight: 'bold' }}>Total Amount:</span>
          <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#ff6b35' }}>
            ₹{totalPrice.toFixed(2)}
          </span>
        </div>
        <button
          onClick={handlePlaceOrder}
          disabled={loading}
          className="btn-primary"
          style={{ width: '100%', padding: '14px', fontSize: '16px' }}
        >
          {loading ? 'Placing Order...' : '✅ Place Order & Pay'}
        </button>
      </div>
    </div>
  );
};

export default Cart;