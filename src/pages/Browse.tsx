import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Grid, List, Filter, Lock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import SearchBar from '../components/SearchBar';
import ResourceCard from '../components/ResourceCard';
import LoadingSpinner from '../components/LoadingSpinner';
import LoginDialog from '../components/LoginDialog';
import SignupDialog from '../components/SignupDialog';
import { mockApi } from '../services/mockApi';

const Browse = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedSubject, setSelectedSubject] = useState('');
  const { isAuthenticated } = useAuth();

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

  useEffect(() => {
    const fetchResources = async () => {
      setLoading(true);
      try {
        if (isAuthenticated) {
          const query = searchParams.get('q') || '';
          const subject = searchParams.get('subject') || '';
          
          const params = {
            search: query,
            subject: subject,
          };
          
          const data = await mockApi.getResources(params);
          setResources(data);
        } else {
          setResources([]);
        }
        setSelectedSubject(searchParams.get('subject') || '');
      } catch (error) {
        console.error('Failed to fetch resources:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, [searchParams, isAuthenticated]);

  const handleSearch = (query: string, filters?: { subject?: string }) => {
    const newSearchParams = new URLSearchParams();
    if (query) newSearchParams.set('q', query);
    if (filters?.subject) newSearchParams.set('subject', filters.subject);
    setSearchParams(newSearchParams);
  };

  const handleSubjectFilter = (subject: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (subject) {
      newSearchParams.set('subject', subject);
    } else {
      newSearchParams.delete('subject');
    }
    setSearchParams(newSearchParams);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lock className="h-12 w-12 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Login Required
              </h2>
              <p className="text-gray-600 mb-8">
                Please login or create an account to browse and access study resources.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <LoginDialog>
                  <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    Login
                  </button>
                </LoginDialog>
                <SignupDialog>
                  <button className="px-6 py-3 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors">
                    Sign Up
                  </button>
                </SignupDialog>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Browse Resources</h1>
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Filters and View Toggle */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 gap-4">
          <div className="flex items-center space-x-4">
            <Filter className="h-5 w-5 text-gray-500" />
            <select
              value={selectedSubject}
              onChange={(e) => handleSubjectFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Subjects</option>
              {subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">View:</span>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md ${
                viewMode === 'grid'
                  ? 'bg-blue-100 text-blue-600'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
              aria-label="Grid view"
            >
              <Grid className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md ${
                viewMode === 'list'
                  ? 'bg-blue-100 text-blue-600'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
              aria-label="List view"
            >
              <List className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <LoadingSpinner size="lg" className="py-12" />
        ) : resources.length === 0 ? (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Filter className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Resources Found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
              <button
                onClick={() => {
                  setSearchParams(new URLSearchParams());
                  setSelectedSubject('');
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <p className="text-gray-600">
                Found {resources.length} resource{resources.length !== 1 ? 's' : ''}
                {searchParams.get('q') && (
                  <span> for "{searchParams.get('q')}"</span>
                )}
                {selectedSubject && (
                  <span> in {selectedSubject}</span>
                )}
              </p>
            </div>

            <div
              className={
                viewMode === 'grid'
                  ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6'
                  : 'space-y-4'
              }
            >
              {resources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Browse;
