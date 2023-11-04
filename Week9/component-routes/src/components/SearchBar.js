import { useState } from "react";

export default function SearchBar({ textholder, onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (event) => {
        event.preventDefault()
        onSearch(searchTerm)
    };
    return (
        <form onSubmit={handleSearch} className="flex items-center">
            <input
                type="text"
                placeholder={textholder}
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="px-4 py-2 w-full border rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
            <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50"
            >
                Search
            </button>
        </form>
    )
}