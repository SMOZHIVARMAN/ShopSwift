
import React from 'react';
import { X, Star, ShoppingCart, CreditCard, Heart } from 'lucide-react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { toast } from '../hooks/use-toast';
import { products } from '../data/products';

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
  const { state, dispatch } = useApp();
  const isInWishlist = state.wishlist.some(item => item.id === product.id);

  if (!isOpen) return null;

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleBuyNow = () => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
    toast({
      title: "Proceeding to checkout!",
      description: `${product.name} has been added to your cart.`,
    });
    onClose();
  };

  const handleToggleWishlist = () => {
    if (isInWishlist) {
      dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: product.id });
      toast({
        title: "Removed from wishlist",
        description: `${product.name} has been removed from your wishlist.`,
      });
    } else {
      dispatch({ type: 'ADD_TO_WISHLIST', payload: product });
      toast({
        title: "Added to wishlist!",
        description: `${product.name} has been added to your wishlist.`,
      });
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-4 h-4 fill-yellow-400 text-yellow-400 opacity-50" />);
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }

    return stars;
  };

  const getSimilarProducts = () => {
    return products
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  };

  const similarProducts = getSimilarProducts();

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Product Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {/* Product Info Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-80 object-cover rounded-lg"
              />
            </div>
            
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center space-x-1">
                  {renderStars(product.rating)}
                </div>
                <span className="ml-2 text-sm text-gray-600">
                  ({product.rating}) • {product.reviews?.length || 0} reviews
                </span>
              </div>

              <div className="flex items-center space-x-3 mb-4">
                <span className="text-3xl font-bold text-gray-900">${product.price}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-lg text-gray-500 line-through">${product.originalPrice}</span>
                    <span className="text-lg text-green-600 font-medium">
                      Save ${product.originalPrice - product.price}
                    </span>
                  </>
                )}
              </div>

              <p className="text-gray-600 mb-6">{product.description}</p>

              <div className="space-y-3">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-yellow-400 text-gray-900 py-3 px-6 rounded-lg font-semibold hover:bg-yellow-500 transition-colors flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Add to Cart</span>
                </button>
                
                <button
                  onClick={handleBuyNow}
                  className="w-full bg-orange-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center space-x-2"
                >
                  <CreditCard className="w-5 h-5" />
                  <span>Buy Now</span>
                </button>

                <button
                  onClick={handleToggleWishlist}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 ${
                    isInWishlist
                      ? 'bg-red-500 text-white hover:bg-red-600'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-current' : ''}`} />
                  <span>{isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="border-t pt-8 mb-8">
            <h3 className="text-xl font-bold mb-4">Customer Reviews</h3>
            <div className="space-y-4">
              {product.reviews?.map((review) => (
                <div key={review.id} className="border-b pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{review.userName}</span>
                      <div className="flex items-center">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Similar Products Section */}
          {similarProducts.length > 0 && (
            <div className="border-t pt-8">
              <h3 className="text-xl font-bold mb-4">Similar Products</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {similarProducts.map((similarProduct) => (
                  <div key={similarProduct.id} className="bg-gray-50 rounded-lg p-4">
                    <img
                      src={similarProduct.image}
                      alt={similarProduct.name}
                      className="w-full h-32 object-cover rounded-lg mb-2"
                    />
                    <h4 className="font-medium text-sm mb-1 line-clamp-2">{similarProduct.name}</h4>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-gray-900">${similarProduct.price}</span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs text-gray-600">{similarProduct.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
