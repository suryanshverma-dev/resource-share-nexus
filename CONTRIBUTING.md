
# Contributing to ResourceHub 🤝

Thank you for your interest in contributing to ResourceHub! This document provides guidelines and instructions for contributing to the project.

## 🎯 How to Contribute

### Reporting Bugs

1. **Check existing issues** first to avoid duplicates
2. **Use the bug report template** when creating a new issue
3. **Provide detailed information**:
   - Steps to reproduce
   - Expected vs actual behavior
   - Browser and OS information
   - Screenshots if applicable

### Suggesting Features

1. **Check if the feature has been suggested** before
2. **Use the feature request template**
3. **Explain the use case** and why it would be valuable
4. **Provide mockups or examples** if possible

### Code Contributions

#### Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/resource-hub.git
   cd resource-hub
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

#### Development Guidelines

##### Code Style

- **TypeScript**: Use TypeScript for type safety
- **ESLint**: Follow the configured ESLint rules
- **Prettier**: Code formatting is handled automatically
- **Naming**: Use descriptive names for variables and functions
- **Comments**: Add comments for complex logic

##### Component Guidelines

- **Functional Components**: Use functional components with hooks
- **Props Interface**: Define TypeScript interfaces for props
- **Reusability**: Make components reusable when possible
- **Single Responsibility**: Each component should have one clear purpose

Example component structure:
```typescript
interface ComponentProps {
  title: string;
  optional?: boolean;
}

const MyComponent: React.FC<ComponentProps> = ({ title, optional = false }) => {
  // Component logic here
  
  return (
    <div className="component-styles">
      {/* JSX here */}
    </div>
  );
};

export default MyComponent;
```

##### Styling Guidelines

- **Tailwind CSS**: Use Tailwind classes for styling
- **Responsive Design**: Ensure mobile responsiveness
- **Accessibility**: Include proper ARIA labels and keyboard navigation
- **Consistent Spacing**: Use Tailwind's spacing scale
- **Color Scheme**: Stick to the established color palette

##### File Organization

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
├── services/           # API calls and external services
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── types/              # TypeScript type definitions
```

#### Testing

- Write unit tests for utility functions
- Test components with React Testing Library
- Ensure all tests pass before submitting PR

#### Commit Guidelines

Use conventional commits format:

```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

Examples:
```
feat(search): add advanced filtering options
fix(header): resolve mobile menu overflow issue
docs(readme): update installation instructions
```

#### Pull Request Process

1. **Update your branch** with the latest main:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Run tests and linting**:
   ```bash
   npm run lint
   npm run build
   ```

3. **Push your changes**:
   ```bash
   git push origin feature/your-feature-name
   ```

4. **Create a Pull Request** with:
   - Clear title and description
   - Link to related issues
   - Screenshots for UI changes
   - List of changes made

5. **Respond to feedback** and make requested changes

6. **Squash commits** if requested before merge

## 🔍 Code Review Process

### What We Look For

- **Functionality**: Does the code work as intended?
- **Code Quality**: Is the code clean, readable, and maintainable?
- **Performance**: Are there any performance implications?
- **Security**: Are there any security vulnerabilities?
- **Accessibility**: Does it meet accessibility standards?
- **Testing**: Are there appropriate tests?

### Review Timeline

- Initial review within 48 hours
- Follow-up reviews within 24 hours
- Approval and merge within 1 week for non-critical changes

## 🚀 Areas Where We Need Help

### High Priority

- [ ] Unit and integration testing
- [ ] Performance optimization
- [ ] Accessibility improvements
- [ ] Mobile UX enhancements

### Medium Priority

- [ ] Advanced search features
- [ ] User authentication system
- [ ] Resource categorization
- [ ] Analytics dashboard

### Low Priority

- [ ] Dark mode support
- [ ] Internationalization (i18n)
- [ ] PWA features
- [ ] Advanced resource previews

## 📚 Resources

### Documentation

- [React Documentation](https://reactjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)

### Design Resources

- [Figma Design System](link-to-figma) (when available)
- [Color Palette Reference](link-to-colors)
- [Typography Guidelines](link-to-typography)

## 🎉 Recognition

Contributors will be recognized in:

- README.md contributors section
- Release notes for significant contributions
- Special mentions in community updates

## ❓ Questions?

- **General Questions**: Create a [Discussion](https://github.com/your-username/resource-hub/discussions)
- **Bug Reports**: Create an [Issue](https://github.com/your-username/resource-hub/issues)
- **Feature Requests**: Create an [Issue](https://github.com/your-username/resource-hub/issues) with the feature label

---

Thank you for helping make ResourceHub better for all students! 🎓
