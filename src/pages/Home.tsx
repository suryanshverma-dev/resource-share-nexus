
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Share2, TrendingUp, ArrowRight, Lock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import SearchBar from '../components/SearchBar';
import ResourceCard from '../components/ResourceCard';
import LoadingSpinner from '../components/LoadingSpinner';
import LoginDialog from '../components/LoginDialog';
import SignupDialog from '../components/SignupDialog';
import { mockApi } from '../services/mockApi';

const Home = () => {
  const [trendingResources, setTrendingResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchTrendingResources = async () => {
      try {
        if (isAuthenticated) {
          const resources = await mockApi.getResources({ limit: 6 });
          setTrendingResources(resources);
        } else {
          // Show only 2 resources as preview for non-authenticated users
          const resources = await mockApi.getResources({ limit: 2 });
          setTrendingResources(resources);
        }
      } catch (error) {
        console.error('Failed to fetch trending resources:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingResources();
  }, [isAuthenticated]);

  const handleSearch = (query: string, filters?: { subject?: string }) => {
    if (!isAuthenticated) {
      return; // Don't navigate if not authenticated
    }
    
    const searchParams = new URLSearchParams();
    if (query) searchParams.set('q', query);
    if (filters?.subject) searchParams.set('subject', filters.subject);
    
    window.location.href = `/browse?${searchParams.toString()}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 via-green-700 to-green-800 text-white">
        <div className="container mx-auto px-4 py-16 lg:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Share Knowledge,
              <span className="text-green-200"> Excel Together</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-green-100 leading-relaxed">
              Access thousands of study resources shared by college students worldwide. 
              Find notes, cheat sheets, and guides for your courses.
            </p>
            
            <div className="mb-12">
              {isAuthenticated ? (
                <SearchBar 
                  onSearch={handleSearch}
                  placeholder="Search for computer science notes, math formulas, study guides..."
                />
              ) : (
                <div className="max-w-2xl mx-auto">
                  <div className="relative">
                    <SearchBar 
                      onSearch={() => {}}
                      placeholder="Login to search resources..."
                      disabled={true}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-20 rounded-lg flex items-center justify-center">
                      <Lock className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/browse"
                    className="inline-flex items-center px-8 py-3 bg-white text-green-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
                  >
                    Browse Resources
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                  <Link
                    to="/contribute"
                    className="inline-flex items-center px-8 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-400 transition-colors shadow-lg"
                  >
                    Share Your Notes
                    <Share2 className="ml-2 h-5 w-5" />
                  </Link>
                </>
              ) : (
                <>
                  <LoginDialog>
                    <button className="inline-flex items-center px-8 py-3 bg-white text-green-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-lg">
                      Login to Browse
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </button>
                  </LoginDialog>
                  <SignupDialog>
                    <button className="inline-flex items-center px-8 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-400 transition-colors shadow-lg">
                      Sign Up Free
                      <Share2 className="ml-2 h-5 w-5" />
                    </button>
                  </SignupDialog>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why ResourceHub?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built by students, for students. Our platform makes it easy to share and discover 
              quality study materials across all subjects.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Comprehensive Resources</h3>
              <p className="text-gray-600">
                Access notes, cheat sheets, and study guides across Computer Science, Mathematics, 
                Physics, and more subjects.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Student Community</h3>
              <p className="text-gray-600">
                Join thousands of students sharing their knowledge and helping each other succeed 
                in their academic journey.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Share2 className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Easy Sharing</h3>
              <p className="text-gray-600">
                Share your Google Drive links effortlessly and contribute to the growing 
                repository of student resources.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Resources Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                <TrendingUp className="inline h-8 w-8 mr-2 text-green-600" />
                {isAuthenticated ? 'Trending Resources' : 'Preview Resources'}
              </h2>
              <p className="text-gray-600">
                {isAuthenticated 
                  ? 'Popular study materials shared by the community'
                  : 'Get a taste of what our community has to offer'
                }
              </p>
            </div>
            {isAuthenticated ? (
              <Link
                to="/browse"
                className="text-green-600 hover:text-green-700 font-medium flex items-center"
              >
                View All
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            ) : (
              <LoginDialog>
                <button className="text-green-600 hover:text-green-700 font-medium flex items-center">
                  Login to See More
                  <ArrowRight className="ml-1 h-4 w-4" />
                </button>
              </LoginDialog>
            )}
          </div>
          
          {loading ? (
            <LoadingSpinner size="lg" className="py-12" />
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trendingResources.map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>
              
              {!isAuthenticated && (
                <div className="mt-8 text-center">
                  <div className="bg-white rounded-lg border-2 border-dashed border-green-300 p-8">
                    <Lock className="h-12 w-12 text-green-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Want to see more?
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Join thousands of students sharing knowledge and access our full library of resources.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <LoginDialog>
                        <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                          Login
                        </button>
                      </LoginDialog>
                      <SignupDialog>
                        <button className="px-6 py-3 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors">
                          Sign Up Free
                        </button>
                      </SignupDialog>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-green-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to Start Sharing?
          </h2>
          <p className="text-xl mb-8 text-green-100 max-w-2xl mx-auto">
            Join our community of students helping each other succeed. Share your study materials 
            and discover resources that will boost your academic performance.
          </p>
          <Link
            to="/contribute"
            className="inline-flex items-center px-8 py-4 bg-white text-green-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-lg text-lg"
          >
            Contribute Resources
            <Share2 className="ml-2 h-6 w-6" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
