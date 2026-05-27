import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0,
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      padding: '0 30px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      height: '65px', zIndex: 1000,
      boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
      borderBottom: '1px solid rgba(255,107,53,0.3)'
    }}>
      <Link to="/menu" style={{
        color: 'white', textDecoration: 'none',
        fontSize: '22px', fontWeight: 'bold',
        background: 'linear-gradient(135deg, #ff6b35, #f7c59f)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>
        🍽️ Smart Canteen
      </Link>

      <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
        <Link to="/menu" style={{
          color: '#ccc', textDecoration: 'none',
          fontSize: '15px', fontWeight: '500',
          transition: 'color 0.3s'
        }}>Menu</Link>

        <Link to="/cart" style={{
          color: '#ccc', textDecoration: 'none',
          position: 'relative', fontSize: '15px'
        }}>
          🛒 Cart
          {totalItems > 0 && (
            <span style={{
              position: 'absolute', top: '-8px', right: '-12px',
              background: 'linear-gradient(135deg, #ff6b35, #f7c59f)',
              color: 'white', borderRadius: '50%',
              width: '18px', height: '18px',
              fontSize: '11px', display: 'flex',
              alignItems: 'center', justifyContent: 'center', fontWeight: 'bold'
            }}>
              {totalItems}
            </span>
          )}
        </Link>

        {user && <Link to="/orders" style={{ color: '#ccc', textDecoration: 'none', fontSize: '15px' }}>My Orders</Link>}
        {user?.role === 'admin' && <Link to="/admin" style={{ color: '#ccc', textDecoration: 'none', fontSize: '15px' }}>Admin</Link>}

        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{
              color: '#f7c59f', fontSize: '14px', fontWeight: 'bold'
            }}>Hi, {user.first_name}!</span>
            <button onClick={handleLogout} style={{
              background: 'linear-gradient(135deg, #ff6b35, #e55a28)',
              color: 'white', border: 'none',
              padding: '7px 16px', borderRadius: '8px',
              cursor: 'pointer', fontWeight: 'bold',
              boxShadow: '0 2px 10px rgba(255,107,53,0.4)'
            }}>Logout</button>
          </div>
        ) : (
          <Link to="/login" style={{
            background: 'linear-gradient(135deg, #ff6b35, #e55a28)',
            color: 'white', padding: '7px 18px',
            borderRadius: '8px', textDecoration: 'none',
            fontWeight: 'bold',
            boxShadow: '0 2px 10px rgba(255,107,53,0.4)'
          }}>Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;