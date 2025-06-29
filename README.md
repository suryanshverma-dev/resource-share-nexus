
# ResourceHub 📚

An open-source platform for college students to share and discover study resources, notes, and cheat sheets.

## 🚀 Features

- **Browse Resources**: Search and filter study materials by subject and tags
- **Resource Sharing**: Contribute your own study materials via Google Drive links
- **Community Driven**: Comment and discuss resources with fellow students
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Accessibility**: Built with WCAG 2.1 guidelines in mind

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **State Management**: TanStack Query
- **Routing**: React Router
- **Build Tool**: Vite

## 🏃‍♂️ Quick Start

### Prerequisites

- Node.js 16+ and npm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/resource-hub.git
   cd resource-hub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:8080](http://localhost:8080)

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx
│   ├── SearchBar.tsx
│   ├── ResourceCard.tsx
│   └── LoadingSpinner.tsx
├── pages/              # Page components
│   ├── Home.tsx
│   ├── Browse.tsx
│   ├── ResourceDetail.tsx
│   └── Contribute.tsx
├── services/           # API services
│   └── mockApi.ts
└── lib/               # Utilities
    └── utils.ts
```

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Development Setup

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run tests: `npm test` (when available)
5. Commit changes: `git commit -m 'Add amazing feature'`
6. Push to branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

## 📝 API Integration

Currently using mock API for development. The structure is ready for easy integration with a real backend:

- `GET /api/resources` - Fetch resources with filters
- `GET /api/resources/:id` - Get resource details
- `POST /api/resources` - Submit new resource
- `GET /api/resources/:id/comments` - Get comments
- `POST /api/resources/:id/comments` - Add comment

## 🎨 Design Guidelines

- **Colors**: Professional blue (#3B82F6) and green (#10B981) accents
- **Typography**: Inter font family for excellent readability
- **Spacing**: Consistent spacing using Tailwind's scale
- **Components**: Modular, reusable components with proper props
- **Accessibility**: ARIA labels, keyboard navigation, proper contrast

## 📱 Mobile Responsiveness

The app is fully responsive with:
- Mobile-first design approach
- Collapsible navigation menu
- Touch-friendly buttons and inputs
- Optimized layouts for all screen sizes

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Acknowledgments

- Built with [Lovable](https://lovable.dev)
- Icons by [Lucide](https://lucide.dev)
- UI components by [shadcn/ui](https://ui.shadcn.com)

## 📞 Support

If you have questions or need help:

1. Check the [Issues](https://github.com/your-username/resource-hub/issues) page
2. Create a new issue if your question isn't already answered
3. Join our community discussions

---

Made with ❤️ by students, for students
