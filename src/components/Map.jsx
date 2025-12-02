import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom marker icon
const createCustomIcon = (priceRange, isSelected) => {
  const colors = {
    '€': '#10b981',
    '€€': '#f59e0b',
    '€€€': '#ec4899'
  };
  
  const color = colors[priceRange] || '#ec4899';
  
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        background-color: ${color};
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: 14px;
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        transform: ${isSelected ? 'scale(1.3)' : 'scale(1)'};
        transition: transform 0.2s;
      ">
        ${priceRange}
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });
};

// Component to handle map updates
function MapUpdater({ selectedSalon }) {
  const map = useMap();
  
  useEffect(() => {
    if (selectedSalon) {
      map.flyTo([selectedSalon.lat, selectedSalon.lng], 14, {
        duration: 1
      });
    }
  }, [selectedSalon, map]);
  
  return null;
}

function Map({ salons, selectedSalon, hoveredSalon, onMarkerClick }) {
  const parisCenter = [48.8566, 2.3522];

  return (
    <MapContainer
      center={parisCenter}
      zoom={12}
      style={{ width: '100%', height: '100%' }}
      className="z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      <MapUpdater selectedSalon={selectedSalon} />
      
      <MarkerClusterGroup
        chunkedLoading
        maxClusterRadius={50}
      >
        {salons.map(salon => (
          <Marker
            key={salon.id}
            position={[salon.lat, salon.lng]}
            icon={createCustomIcon(
              salon.priceRange, 
              selectedSalon?.id === salon.id || hoveredSalon === salon.id
            )}
            eventHandlers={{
              click: () => onMarkerClick(salon)
            }}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-bold text-gray-800">{salon.name}</h3>
                <p className="text-sm text-gray-600">{salon.area}</p>
                <p className="text-sm font-semibold text-pink-600 mt-1">{salon.priceRange}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}

export default Map;