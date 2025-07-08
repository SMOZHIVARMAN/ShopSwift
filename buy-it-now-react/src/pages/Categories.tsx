
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/products';
import { Product } from '../types';

const Categories: React.FC = () => {
  const { categoryId } = useParams();
  const [sortBy, setSortBy] = useState('name');

  let filteredProducts: Product[] = products;
  let pageTitle = 'All Products';

  if (categoryId) {
    const category = categories.find(c => c.id === categoryId);
    if (category) {
      filteredProducts = products.filter(p => p.category === category.name);
      pageTitle = category.name;
    }
  }

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{pageTitle}</h1>
            <p className="text-gray-600">
              {sortedProducts.length} product{sortedProducts.length !== 1 ? 's' : ''} available
            </p>
          </div>
          
          <div className="mt-4 sm:mt-0">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
            </select>
          </div>
        </div>

        {/* Categories Grid (if showing all categories) */}
        {!categoryId && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Shop by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {categories.map((category) => (
                <a
                  key={category.id}
                  href={`/category/${category.id}`}
                  className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="text-center text-white">
                      <h3 className="text-lg font-semibold">{category.name}</h3>
                      <p className="text-sm">{category.itemCount} items</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {sortedProducts.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">This category doesn't have any products yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;
