import React from 'react';
import SearchBar from '../components/SearchBar';

export default function SearchPage(){
  const handleSearch = (term) => {
    console.log('Search Term:', term);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Search</h1>
      <SearchBar textholder="Type to search..." onSearch={handleSearch} />
    </div>
  );
};