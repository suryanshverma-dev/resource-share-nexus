
import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string, filters?: { subject?: string; tag?: string }) => void;
  placeholder?: string;
  showFilters?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  placeholder = "Search for resources, subjects, or topics...",
  showFilters = true 
}) => {
  const [query, setQuery] = useState('');
  const [subject, setSubject] = useState('');

  const subjects = [
    'Computer Science',
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'Engineering',
    'Business',
    'Economics',
    'Psychology',
    'Literature'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query, { subject: subject || undefined });
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="w-full pl-12 pr-4 py-4 text-lg text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 shadow-sm placeholder:text-gray-500"
            aria-label="Search resources"
          />
        </div>
        
        {showFilters && (
          <div className="flex flex-wrap gap-4">
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
              aria-label="Filter by subject"
            >
              <option value="">All Subjects</option>
              {subjects.map((subj) => (
                <option key={subj} value={subj}>
                  {subj}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Search
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchBar;
