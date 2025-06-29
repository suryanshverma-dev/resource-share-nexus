
// Mock API service for testing and development
// This will be replaced with actual API calls when backend is ready

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

interface Comment {
  id: string;
  resourceId: string;
  author: string;
  content: string;
  createdAt: string;
}

// Mock data
const mockResources: Resource[] = [
  {
    id: '1',
    title: 'Data Structures and Algorithms Comprehensive Guide',
    description: 'A complete guide covering arrays, linked lists, trees, graphs, and common algorithms with examples and practice problems.',
    subject: 'Computer Science',
    tags: ['algorithms', 'data structures', 'programming', 'exam prep'],
    driveLink: 'https://drive.google.com/file/d/example1/view',
    createdAt: '2024-01-15T10:00:00Z',
    author: 'Alex Chen'
  },
  {
    id: '2',
    title: 'Calculus I Study Notes - Limits and Derivatives',
    description: 'Detailed notes covering limits, continuity, derivatives, and applications. Includes worked examples and key formulas.',
    subject: 'Mathematics',
    tags: ['calculus', 'derivatives', 'limits', 'study guide'],
    driveLink: 'https://drive.google.com/file/d/example2/view',
    createdAt: '2024-01-14T15:30:00Z',
    author: 'Sarah Johnson'
  },
  {
    id: '3',
    title: 'Physics Mechanics Cheat Sheet',
    description: 'Quick reference for mechanics concepts including kinematics, dynamics, energy, and momentum. Perfect for exam prep.',
    subject: 'Physics',
    tags: ['mechanics', 'physics', 'cheat sheet', 'exam prep'],
    driveLink: 'https://drive.google.com/file/d/example3/view',
    createdAt: '2024-01-13T09:15:00Z',
    author: 'Mike Rodriguez'
  },
  {
    id: '4',
    title: 'Organic Chemistry Reaction Mechanisms',
    description: 'Comprehensive collection of organic chemistry reaction mechanisms with explanations and examples.',
    subject: 'Chemistry',
    tags: ['organic chemistry', 'reactions', 'mechanisms', 'study guide'],
    driveLink: 'https://drive.google.com/file/d/example4/view',
    createdAt: '2024-01-12T14:20:00Z',
    author: 'Emma Wilson'
  },
  {
    id: '5',
    title: 'Database Design and SQL Reference',
    description: 'Complete guide to database design principles, normalization, and SQL queries with practical examples.',
    subject: 'Computer Science',
    tags: ['database', 'sql', 'design', 'reference'],
    driveLink: 'https://drive.google.com/file/d/example5/view',
    createdAt: '2024-01-11T11:45:00Z',
    author: 'David Kim'
  },
  {
    id: '6',
    title: 'Linear Algebra Matrix Operations Guide',
    description: 'Step-by-step guide to matrix operations, eigenvalues, eigenvectors, and applications in computer graphics.',
    subject: 'Mathematics',
    tags: ['linear algebra', 'matrices', 'eigenvalues', 'study guide'],
    driveLink: 'https://drive.google.com/file/d/example6/view',
    createdAt: '2024-01-10T16:00:00Z',
    author: 'Lisa Zhang'
  }
];

const mockComments: Comment[] = [
  {
    id: '1',
    resourceId: '1',
    author: 'Student123',
    content: 'This guide is amazing! Really helped me understand trees and graphs for my exam.',
    createdAt: '2024-01-16T10:30:00Z'
  },
  {
    id: '2',
    resourceId: '1',
    author: 'CodeLearner',
    content: 'The examples are very clear. Thanks for sharing!',
    createdAt: '2024-01-17T14:15:00Z'
  },
  {
    id: '3',
    resourceId: '2',
    author: 'MathStudent',
    content: 'Perfect timing! I have a calculus exam next week.',
    createdAt: '2024-01-15T09:20:00Z'
  }
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
  async getResources(params: { 
    search?: string; 
    subject?: string; 
    limit?: number;
  } = {}): Promise<Resource[]> {
    await delay(500); // Simulate network delay
    
    let filtered = [...mockResources];
    
    // Filter by search term
    if (params.search) {
      const searchTerm = params.search.toLowerCase();
      filtered = filtered.filter(resource => 
        resource.title.toLowerCase().includes(searchTerm) ||
        resource.description.toLowerCase().includes(searchTerm) ||
        resource.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }
    
    // Filter by subject
    if (params.subject) {
      filtered = filtered.filter(resource => resource.subject === params.subject);
    }
    
    // Apply limit
    if (params.limit) {
      filtered = filtered.slice(0, params.limit);
    }
    
    // Sort by most recent
    filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    return filtered;
  },

  async getResourceById(id: string): Promise<Resource | null> {
    await delay(300);
    return mockResources.find(resource => resource.id === id) || null;
  },

  async getComments(resourceId: string): Promise<Comment[]> {
    await delay(300);
    return mockComments.filter(comment => comment.resourceId === resourceId);
  },

  async submitResource(resourceData: Omit<Resource, 'id' | 'createdAt'>): Promise<Resource> {
    await delay(800);
    
    const newResource: Resource = {
      ...resourceData,
      id: (mockResources.length + 1).toString(),
      createdAt: new Date().toISOString()
    };
    
    mockResources.unshift(newResource); // Add to beginning for most recent first
    return newResource;
  },

  async submitComment(resourceId: string, content: string): Promise<Comment> {
    await delay(500);
    
    const newComment: Comment = {
      id: (mockComments.length + 1).toString(),
      resourceId,
      author: 'Anonymous User', // In real app, this would come from auth
      content,
      createdAt: new Date().toISOString()
    };
    
    mockComments.push(newComment);
    return newComment;
  }
};
