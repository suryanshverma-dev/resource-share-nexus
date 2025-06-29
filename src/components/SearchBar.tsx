
import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string, filters?: { subject?: string; tag?: string }) => void;
  placeholder?: string;
  showFilters?: boolean;
  disabled?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  placeholder = "Search for resources, subjects, or topics...",
  showFilters = true,
  disabled = false
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
    if (!disabled) {
      onSearch(query, { subject: subject || undefined });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 ${disabled ? 'text-gray-400' : 'text-gray-500'}`} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            className={`w-full pl-12 pr-4 py-4 text-lg border rounded-lg shadow-sm placeholder:text-gray-500 ${
              disabled 
                ? 'text-gray-400 bg-gray-100 border-gray-200 cursor-not-allowed' 
                : 'text-gray-900 bg-white border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500'
            }`}
            aria-label="Search resources"
          />
        </div>
        
        {showFilters && (
          <div className="flex flex-wrap gap-4">
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              disabled={disabled}
              className={`px-4 py-2 border rounded-md ${
                disabled
                  ? 'text-gray-400 bg-gray-100 border-gray-200 cursor-not-allowed'
                  : 'text-gray-900 bg-white border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500'
              }`}
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
              disabled={disabled}
              className={`px-6 py-2 rounded-md transition-colors focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
                disabled
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
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
