import { useState } from 'react';

function MessageFilters({ onFilterChange, onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all');

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
        onFilterChange(newFilter);
    };

    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        onSearch(term);
    };

    return (
        <div className="flex gap-4 mb-6 items-center">
            <input
                type="search"
                placeholder="Search messages..."
                value={searchTerm}
                onChange={handleSearch}
                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
            />
            <select
                value={filter}
                onChange={(e) => handleFilterChange(e.target.value)}
                className="px-4 py-2 border rounded-lg bg-white focus:ring-2 focus:ring-gold focus:border-transparent"
            >
                <option value="all">All Messages</option>
                <option value="unread">Unread</option>
                <option value="read">Read</option>
                <option value="urgent">Urgent</option>
            </select>
        </div>
    );
}

export default MessageFilters;
