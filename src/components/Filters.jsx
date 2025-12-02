import React from 'react';

function Filters({ priceFilter, setPriceFilter, categoryFilter, setCategoryFilter }) {
  const categories = ['All', 'Nail Salon', 'Beauty Salon', 'Spa'];
  
  return (
    <div className="space-y-4">
      {/* Price Filter */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Price Range</h3>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setPriceFilter('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              priceFilter === 'all' 
                ? 'bg-pink-500 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setPriceFilter('€')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              priceFilter === '€' 
                ? 'bg-pink-500 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            € Budget
          </button>
          <button
            onClick={() => setPriceFilter('€€')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              priceFilter === '€€' 
                ? 'bg-pink-500 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            €€ Mid
          </button>
          <button
            onClick={() => setPriceFilter('€€€')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              priceFilter === '€€€' 
                ? 'bg-pink-500 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            €€€ Luxury
          </button>
        </div>
      </div>

      {/* Category Filter */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Category</h3>
        <div className="flex gap-2 flex-wrap">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setCategoryFilter(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                categoryFilter === category 
                  ? 'bg-pink-500 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Filters;