import React from 'react';
import { MapPin, Star, Phone, Clock } from 'lucide-react';

function SalonCard({ salon, isSelected, isHovered, onMouseEnter, onMouseLeave, onClick }) {
  return (
    <div
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`border rounded-lg overflow-hidden cursor-pointer transition transform hover:shadow-xl ${
        isHovered || isSelected
          ? 'shadow-xl scale-102 border-pink-400'
          : 'shadow-md'
      }`}
    >
      <img 
        src={salon.image} 
        alt={salon.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800">{salon.name}</h3>
          <span className="text-gray-600 font-medium">{salon.priceRange}</span>
        </div>
        
        {salon.rating && (
          <div className="flex items-center gap-1 mb-2">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium text-gray-700">{salon.rating}</span>
            {salon.reviews && (
              <span className="text-gray-500 text-sm">({salon.reviews} reviews)</span>
            )}
          </div>
        )}

        <p className="text-gray-600 text-sm mb-3 flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          {salon.area}
        </p>

        <div className="flex flex-wrap gap-2">
          {salon.services.slice(0, 3).map(service => (
            <span 
              key={service}
              className="bg-pink-50 text-pink-600 px-3 py-1 rounded-full text-xs font-medium"
            >
              {service}
            </span>
          ))}
          {salon.services.length > 3 && (
            <span className="text-gray-500 text-xs py-1">
              +{salon.services.length - 3} more
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default SalonCard;