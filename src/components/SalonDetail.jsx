import React from 'react';
import { X, MapPin, Star, Phone, Clock, Globe } from 'lucide-react';

function SalonDetail({ salon, onClose }) {
  if (!salon) return null;

  return (
    <div className="absolute bottom-8 left-8 right-8 bg-white rounded-xl shadow-2xl p-6 max-w-md z-[1000]">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
      >
        <X className="w-6 h-6" />
      </button>

      <img 
        src={salon.image} 
        alt={salon.name}
        className="w-full h-40 object-cover rounded-lg mb-4"
      />

      <h2 className="text-2xl font-bold text-gray-800 mb-2">{salon.name}</h2>
      
      <div className="flex items-center gap-2 mb-3">
        {salon.rating && (
          <>
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold text-gray-700">{salon.rating}</span>
            {salon.reviews && (
              <span className="text-gray-500">({salon.reviews} reviews)</span>
            )}
          </>
        )}
        <span className="ml-auto text-xl font-bold text-gray-700">{salon.priceRange}</span>
      </div>

      <div className="space-y-2 mb-4">
        <p className="text-gray-600 flex items-center gap-2">
          <MapPin className="w-4 h-4 flex-shrink-0" />
          {salon.area}
        </p>
        {salon.hours && (
          <p className="text-gray-600 flex items-center gap-2">
            <Clock className="w-4 h-4 flex-shrink-0" />
            {salon.hours}
          </p>
        )}
        {salon.phone && (
          <p className="text-gray-600 flex items-center gap-2">
            <Phone className="w-4 h-4 flex-shrink-0" />
            {salon.phone}
          </p>
        )}
        {salon.website && (
          <a 
            href={salon.website} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-pink-600 flex items-center gap-2 hover:text-pink-700"
          >
            <Globe className="w-4 h-4 flex-shrink-0" />
            Visit Website
          </a>
        )}
      </div>

      <div className="mb-4">
        <h3 className="font-semibold text-gray-700 mb-2">Services</h3>
        <div className="flex flex-wrap gap-2">
          {salon.services.map(service => (
            <span 
              key={service}
              className="bg-pink-50 text-pink-600 px-3 py-1 rounded-full text-sm font-medium"
            >
              {service}
            </span>
          ))}
        </div>
      </div>

      <button className="w-full bg-pink-500 text-white py-3 rounded-lg font-semibold hover:bg-pink-600 transition">
        Contact Salon
      </button>
    </div>
  );
}

export default SalonDetail;