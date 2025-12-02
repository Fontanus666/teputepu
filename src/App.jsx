import React, { useState, useMemo } from 'react';
import Map from './components/Map';
import SalonList from './components/SalonList';
import SearchBar from './components/SearchBar';
import Filters from './components/Filters';
import SalonDetail from './components/SalonDetail';
import salonsData from './data/salons.json';
 
function App() {
  const [selectedSalon, setSelectedSalon] = useState(null);
  const [hoveredSalon, setHoveredSalon] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const filteredSalons = useMemo(() => {
    return salonsData.filter(salon => {
      const matchesSearch = salon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           salon.area.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice = priceFilter === 'all' || salon.priceRange === priceFilter;
      const matchesCategory = categoryFilter === 'All' || salon.category === categoryFilter;
      
      return matchesSearch && matchesPrice && matchesCategory;
    });
  }, [searchQuery, priceFilter, categoryFilter]);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-1/4 overflow-y-auto bg-white shadow-lg flex flex-col">
        <div className="p-6 border-b sticky top-0 bg-white z-10 space-y-4">
          <h1 className="text-3xl font-bold text-gray-800">Salons in Paris</h1>
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <Filters 
            priceFilter={priceFilter}
            setPriceFilter={setPriceFilter}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
          />
          <p className="text-sm text-gray-500">
            {filteredSalons.length} salon{filteredSalons.length !== 1 ? 's' : ''} found
          </p>
        </div>
        
        <SalonList 
          salons={filteredSalons}
          selectedSalon={selectedSalon}
          hoveredSalon={hoveredSalon}
          onSalonClick={setSelectedSalon}
          onSalonHover={setHoveredSalon}
          onSalonLeave={() => setHoveredSalon(null)}
        />
      </div>

      {/* Map */}
      <div className="w-3/4 relative">
        <Map 
          salons={filteredSalons}
          selectedSalon={selectedSalon}
          hoveredSalon={hoveredSalon}
          onMarkerClick={setSelectedSalon}
        />
        
        <SalonDetail 
          salon={selectedSalon} 
          onClose={() => setSelectedSalon(null)} 
        />
      </div>
    </div>
  );
}

export default App;