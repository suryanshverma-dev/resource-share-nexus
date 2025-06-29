
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Share2, CheckCircle, AlertCircle, Lock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { mockApi } from '../services/mockApi';
import LoginDialog from '../components/LoginDialog';
import SignupDialog from '../components/SignupDialog';

const Contribute = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subject: '',
    tags: '',
    driveLink: '',
    author: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

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

  // If user is not authenticated, show login prompt
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center p-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Login Required</h1>
          <p className="text-gray-600 mb-8">
            You need to be logged in to share resources with the community. 
            Join thousands of students helping each other succeed!
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
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const validateDriveLink = (url: string) => {
    const drivePattern = /^https:\/\/(drive|docs)\.google\.com\//;
    return drivePattern.test(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validation
    if (!formData.title.trim()) {
      setError('Title is required');
      return;
    }
    if (!formData.description.trim()) {
      setError('Description is required');
      return;
    }
    if (!formData.subject) {
      setError('Subject is required');
      return;
    }
    if (!formData.driveLink.trim()) {
      setError('Google Drive link is required');
      return;
    }
    if (!validateDriveLink(formData.driveLink)) {
      setError('Please provide a valid Google Drive link');
      return;
    }
    if (!formData.author.trim()) {
      setError('Author name is required');
      return;
    }

    setSubmitting(true);
    try {
      const resourceData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
      };
      
      const newResource = await mockApi.submitResource(resourceData);
      setSuccess(true);
      
      // Redirect to the new resource after a short delay
      setTimeout(() => {
        navigate(`/resource/${newResource.id}`);
      }, 2000);
    } catch (err) {
      setError('Failed to submit resource. Please try again.');
      console.error('Submission error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Resource Submitted!</h1>
          <p className="text-gray-600 mb-4">Thank you for contributing to the community.</p>
          <p className="text-sm text-gray-500">Redirecting you to your resource...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-8">
          <Share2 className="h-12 w-12 text-green-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Contribute a Resource</h1>
          <p className="text-gray-600">
            Share your study materials with fellow students and help build our learning community.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="flex items-center p-4 text-red-700 bg-red-50 border border-red-200 rounded-md">
                <AlertCircle className="h-5 w-5 mr-2" />
                {error}
              </div>
            )}

            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g., Data Structures Cheat Sheet, Calculus Study Notes"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                placeholder="Describe what this resource covers, what topics it includes, and how it might help other students..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                required
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                Subject *
              </label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select a subject</option>
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                placeholder="exam prep, algorithms, study guide (separate with commas)"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                Add relevant tags separated by commas to help others find your resource
              </p>
            </div>

            <div>
              <label htmlFor="driveLink" className="block text-sm font-medium text-gray-700 mb-2">
                Google Drive Link *
              </label>
              <input
                type="url"
                id="driveLink"
                name="driveLink"
                value={formData.driveLink}
                onChange={handleInputChange}
                placeholder="https://drive.google.com/file/d/..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Make sure your Google Drive file is set to "Anyone with the link can view"
              </p>
            </div>

            <div>
              <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
                Your Name *
              </label>
              <input
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                placeholder="Your name or username"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {submitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Share2 className="h-5 w-5 mr-2" />
                    Share Resource
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Guidelines */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">Contribution Guidelines</h3>
          <ul className="text-sm text-blue-800 space-y-2">
            <li>• Ensure your Google Drive file has proper sharing permissions</li>
            <li>• Only share educational content that you have the right to distribute</li>
            <li>• Use clear, descriptive titles and detailed descriptions</li>
            <li>• Add relevant tags to help others discover your resource</li>
            <li>• Make sure your content is high-quality and helpful for students</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Contribute;
