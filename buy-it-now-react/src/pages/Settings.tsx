
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, User, LogOut, ShoppingCart } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { toast } from '../hooks/use-toast';

const Settings: React.FC = () => {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate('/');
  };

  const moveToCart = (productId: number) => {
    const product = state.wishlist.find(p => p.id === productId);
    if (product) {
      dispatch({ type: 'MOVE_TO_CART', payload: product });
      toast({
        title: "Moved to cart!",
        description: `${product.name} has been moved to your cart.`,
      });
    }
  };

  const removeFromWishlist = (productId: number) => {
    const product = state.wishlist.find(p => p.id === productId);
    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: productId });
    toast({
      title: "Removed from wishlist",
      description: `${product?.name} has been removed from your wishlist.`,
    });
  };

  if (!state.isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <User className="mx-auto h-24 w-24 text-gray-400 mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Please sign in</h2>
            <p className="text-lg text-gray-600 mb-8">
              You need to be signed in to access your account settings.
            </p>
            <Link
              to="/login"
              className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Account Settings</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-10 w-10 text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">{state.user?.username}</h2>
                <p className="text-gray-600">{state.user?.email}</p>
              </div>
              
              <div className="mt-6 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Member since</span>
                  <span className="font-medium">January 2024</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total orders</span>
                  <span className="font-medium">12</span>
                </div>
              </div>
              
              <button
                onClick={handleLogout}
                className="w-full mt-6 flex items-center justify-center space-x-2 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>

          {/* Wishlist */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center space-x-2">
                  <Heart className="h-6 w-6 text-red-500" />
                  <h2 className="text-xl font-semibold text-gray-900">
                    My Wishlist ({state.wishlist.length})
                  </h2>
                </div>
              </div>

              {state.wishlist.length === 0 ? (
                <div className="p-12 text-center">
                  <Heart className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Your wishlist is empty</h3>
                  <p className="text-gray-600 mb-6">
                    Save items you love by clicking the heart icon on any product.
                  </p>
                  <Link
                    to="/"
                    className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {state.wishlist.map((item) => (
                    <div key={item.id} className="p-6">
                      <div className="flex items-center space-x-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                          <div className="flex items-center justify-between mt-4">
                            <span className="text-xl font-bold text-gray-900">${item.price}</span>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => moveToCart(item.id)}
                                className="flex items-center space-x-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                              >
                                <ShoppingCart className="h-4 w-4" />
                                <span>Move to Cart</span>
                              </button>
                              <button
                                onClick={() => removeFromWishlist(item.id)}
                                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
