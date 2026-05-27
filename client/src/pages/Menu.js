import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useCart } from '../context/CartContext';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [vegFilter, setVegFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchMenu();
    fetchCategories();
  }, []);

  const fetchMenu = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/menu`);
      setMenuItems(res.data);
    } catch (err) {
      toast.error('Failed to load menu!');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/menu/categories`);
      setCategories(res.data);
    } catch (err) {
      console.error('Failed to load categories');
    }
  };

  const filteredItems = menuItems.filter(item => {
    const categoryMatch = selectedCategory === 'all' || item.category_id === parseInt(selectedCategory);
    const vegMatch = vegFilter === 'all' ||
      (vegFilter === 'veg' && item.is_vegetarian) ||
      (vegFilter === 'nonveg' && !item.is_vegetarian);
    return categoryMatch && vegMatch;
  });

  const handleAddToCart = (item) => {
    addToCart(item);
    toast.success(`${item.name} added to cart!`);
  };

  if (loading) return <div className="loading">Loading menu...</div>;

  return (
    <div>
      <h2 style={{ marginBottom: '20px', color: '#333' }}>🍽️ Today's Menu</h2>

      {/* Filters */}
      <div style={{
        display: 'flex', gap: '12px', marginBottom: '24px',
        flexWrap: 'wrap', alignItems: 'center'
      }}>
        <select
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
          style={{
            padding: '8px 16px', borderRadius: '8px',
            border: '1px solid #ddd', fontSize: '14px', cursor: 'pointer'
          }}
        >
          <option value="all">All Categories</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>

        <div style={{ display: 'flex', gap: '8px' }}>
          {['all', 'veg', 'nonveg'].map(filter => (
            <button
              key={filter}
              onClick={() => setVegFilter(filter)}
              style={{
                padding: '8px 16px', borderRadius: '8px', border: 'none',
                cursor: 'pointer', fontWeight: 'bold',
                backgroundColor: vegFilter === filter ? '#ff6b35' : '#fff',
                color: vegFilter === filter ? 'white' : '#333',
                boxShadow: '0 1px 4px rgba(0,0,0,0.1)'
              }}
            >
              {filter === 'all' ? 'All' : filter === 'veg' ? '🟢 Veg' : '🔴 Non-Veg'}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Grid */}
      {filteredItems.length === 0 ? (
        <div className="loading">No items found!</div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '20px'
        }}>
          {filteredItems.map(item => (
            <div key={item.id} className="card" style={{ padding: '16px' }}>
              <div style={{
                backgroundColor: '#f5f5f5', borderRadius: '8px',
                height: '140px', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '48px', marginBottom: '12px'
              }}>
                {item.is_vegetarian ? '🟢' : '🔴'}
              </div>
              <h3 style={{ marginBottom: '6px' }}>{item.name}</h3>
              <p style={{ color: '#888', fontSize: '13px', marginBottom: '10px' }}>
                {item.description}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#ff6b35' }}>
                  ₹{item.price}
                </span>
                <button
                  onClick={() => handleAddToCart(item)}
                  className="btn-primary"
                  style={{ padding: '8px 16px', fontSize: '14px' }}
                >
                  + Add
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Menu;