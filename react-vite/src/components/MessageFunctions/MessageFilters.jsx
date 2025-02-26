import { useState } from 'react';

function MessageFilters({ onFilterChange, onSearch, onSort, currentFilter, searchTerm, currentSort }) {
    const [filter, setFilter] = useState(currentFilter || 'all');
    const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm || '');
    const [sortBy, setSortBy] = useState(currentSort || 'newest');

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
        onFilterChange(newFilter);
    };

    const handleSearch = (e) => {
        const term = e.target.value;
        setLocalSearchTerm(term);
        onSearch(term);
    };

    const handleSortChange = (e) => {
        const value = e.target.value;
        setSortBy(value);
        onSort(value);
    };

    return (
        <div className="w-full flex flex-col sm:flex-row gap-2 sm:gap-4">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full">
                <input
                    type="search"
                    placeholder="Search messages..."
                    value={localSearchTerm}
                    onChange={handleSearch}
                    className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent text-sm sm:text-base w-full"
                />
                <select
                    value={filter}
                    onChange={(e) => handleFilterChange(e.target.value)}
                    className="px-4 py-2 border rounded-lg bg-white focus:ring-2 focus:ring-gold focus:border-transparent text-sm sm:text-base w-full sm:w-auto"
                >
                    <option value="all">All Messages</option>
                    <option value="event">Event Messages</option>
                    <option value="service">Service Messages</option>
                    <option value="unread">Unread</option>
                    <option value="read">Read</option>
                    <option value="urgent">Urgent</option>
                    <option value="archived">Archived</option>
                </select>
            </div>
            <div className="flex gap-2 sm:gap-4 items-center w-full sm:w-auto">
                <select
                    value={sortBy}
                    onChange={handleSortChange}
                    className="px-4 py-2 border rounded-lg bg-white focus:ring-2 focus:ring-gold focus:border-transparent text-sm sm:text-base w-full"
                >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="unread">Unread First</option>
                </select>
            </div>
        </div>
    );
}

export default MessageFilters;
