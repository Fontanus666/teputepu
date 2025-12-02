import React from 'react';
import SalonCard from './SalonCard';

function SalonList({ salons, selectedSalon, hoveredSalon, onSalonClick, onSalonHover, onSalonLeave }) {
  return (
    <div className="p-4 space-y-4">
      {salons.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No salons found matching your criteria
        </div>
      ) : (
        salons.map(salon => (
          <SalonCard
            key={salon.id}
            salon={salon}
            isSelected={selectedSalon?.id === salon.id}
            isHovered={hoveredSalon === salon.id}
            onClick={() => onSalonClick(salon)}
            onMouseEnter={() => onSalonHover(salon.id)}
            onMouseLeave={onSalonLeave}
          />
        ))
      )}
    </div>
  );
}

export default SalonList;