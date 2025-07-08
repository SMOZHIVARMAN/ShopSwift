import { Product, Category, Review } from '../types';

const sampleReviews: Review[] = [
  {
    id: 1,
    userName: "John D.",
    rating: 5,
    comment: "Excellent product! Highly recommended. The quality is outstanding and delivery was super fast.",
    date: "2024-01-15"
  },
  {
    id: 2,
    userName: "Sarah M.",
    rating: 4,
    comment: "Good value for money. Works as expected but could be improved in some areas.",
    date: "2024-01-10"
  },
  {
    id: 3,
    userName: "Mike R.",
    rating: 5,
    comment: "Perfect! Exactly what I was looking for. Great build quality and amazing features.",
    date: "2024-01-08"
  },
  {
    id: 4,
    userName: "Lisa K.",
    rating: 3,
    comment: "It's okay, nothing special but gets the job done. Average quality for the price.",
    date: "2024-01-05"
  }
];

export const products: Product[] = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    price: 1199,
    originalPrice: 1299,
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400",
    category: "Electronics",
    rating: 4.8,
    description: "Latest iPhone with advanced camera system and A17 Pro chip. Experience the ultimate in mobile technology with stunning photos, incredible performance, and all-day battery life.",
    reviews: sampleReviews
  },
  {
    id: 2,
    name: "MacBook Air M2",
    price: 999,
    originalPrice: 1199,
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400",
    category: "Electronics",
    rating: 4.9,
    description: "Powerful laptop with M2 chip, featuring incredible performance and up to 18 hours of battery life. Perfect for work, creativity, and everything in between.",
    reviews: sampleReviews
  },
  {
    id: 3,
    name: "Nike Air Max 270",
    price: 150,
    originalPrice: 180,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
    category: "Fashion",
    rating: 4.5,
    description: "Comfortable running shoes with Max Air unit for exceptional cushioning. Perfect for daily wear and athletic activities.",
    reviews: sampleReviews
  },
  {
    id: 4,
    name: "Sony WH-1000XM4",
    price: 349,
    originalPrice: 399,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
    category: "Electronics",
    rating: 4.7,
    description: "Industry-leading noise-canceling wireless headphones with 30-hour battery life and premium sound quality.",
    reviews: sampleReviews
  },
  {
    id: 5,
    name: "Samsung 4K Smart TV",
    price: 799,
    originalPrice: 899,
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400",
    category: "Electronics",
    rating: 4.6,
    description: "55-inch 4K Smart TV with HDR support and built-in streaming apps. Enjoy crystal-clear picture quality and smart features.",
    reviews: sampleReviews
  },
  {
    id: 6,
    name: "Leather Jacket",
    price: 299,
    originalPrice: 399,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400",
    category: "Fashion",
    rating: 4.4,
    description: "Premium genuine leather jacket with classic design. Perfect for style and comfort in any season.",
    reviews: sampleReviews
  },
  {
    id: 7,
    name: "Coffee Maker",
    price: 129,
    originalPrice: 159,
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400",
    category: "Home & Kitchen",
    rating: 4.3,
    description: "Automatic drip coffee maker with programmable timer and thermal carafe. Brew perfect coffee every time.",
    reviews: sampleReviews
  },
  {
    id: 8,
    name: "Gaming Chair",
    price: 249,
    originalPrice: 299,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
    category: "Home & Kitchen",
    rating: 4.5,
    description: "Ergonomic gaming chair with lumbar support and adjustable height. Perfect for long gaming sessions.",
    reviews: sampleReviews
  }
];

export const categories: Category[] = [
  {
    id: "electronics",
    name: "Electronics",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300",
    itemCount: 156
  },
  {
    id: "fashion",
    name: "Fashion",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=300",
    itemCount: 89
  },
  {
    id: "home-kitchen",
    name: "Home & Kitchen",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300",
    itemCount: 234
  },
  {
    id: "books",
    name: "Books",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300",
    itemCount: 67
  }
];
