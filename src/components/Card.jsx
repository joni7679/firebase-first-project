import React from 'react';

function Card({ products }) {
  console.log("Card image URL:", products.image);

  return (
    <div className="p-2 w-full max-w-md">
      <div className="bg-white p-3 rounded-2xl shadow-[inset_0_0px_3px_rgba(0,0,0,0.6)] hover:-translate-y-1 transition-transform duration-300">
        <div className="flex justify-center items-center">
          <img
            className="rounded-lg h-80 w-full object-contain mb-2"
            src={products.image}
            alt={products.title}
          />
        </div>

        <h2 className="text-xl text-black font-bold truncate">{products.title}</h2>
        <h2 className="text-xl text-black font-semibold">₹ {products.price}</h2>
        <h2 className="text-xl text-black mb-1">
          <span className="font-semibold">Category:</span> {products.category}
        </h2>

        <div className="flex space-x-2 justify-between mt-2">
          <button className="bg-[#100d0d] cursor-pointer px-5 py-1.5 text-white rounded-lg">
            Add to Cart
          </button>
          <button className="bg-[#0f81d9] cursor-pointer px-5 py-1.5 text-white rounded-lg">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
