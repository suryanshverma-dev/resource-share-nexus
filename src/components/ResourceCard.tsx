
import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, FileText, Calendar, Tag } from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  description: string;
  subject: string;
  tags: string[];
  driveLink: string;
  createdAt: string;
  author: string;
}

interface ResourceCardProps {
  resource: Resource;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
            <Link 
              to={`/resource/${resource.id}`}
              className="hover:text-blue-600 transition-colors"
            >
              {resource.title}
            </Link>
          </h3>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 ml-2 flex-shrink-0">
            {resource.subject}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {resource.description}
        </p>
        
        <div className="flex items-center text-xs text-gray-500 mb-4 space-x-4">
          <div className="flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            {formatDate(resource.createdAt)}
          </div>
          <div className="flex items-center">
            <FileText className="h-3 w-3 mr-1" />
            {resource.author}
          </div>
        </div>
        
        {resource.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {resource.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700"
              >
                <Tag className="h-3 w-3 mr-1" />
                {tag}
              </span>
            ))}
            {resource.tags.length > 3 && (
              <span className="text-xs text-gray-500">
                +{resource.tags.length - 3} more
              </span>
            )}
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <Link
            to={`/resource/${resource.id}`}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
          >
            View Details
          </Link>
          <a
            href={resource.driveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-green-600 hover:text-green-700 text-sm font-medium transition-colors"
          >
            Open Drive
            <ExternalLink className="h-3 w-3 ml-1" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;
