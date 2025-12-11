# Blog Platform Contributing Guidelines

Thank you for your interest in contributing to the Blog Platform! This document provides guidelines for contributing to the project.

## Code of Conduct

Be respectful and professional in all interactions.

## Getting Started

1. Fork the repository
2. Clone your fork locally
3. Create a feature branch
4. Make your changes
5. Commit and push to your fork
6. Create a pull request

## Development Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/blog-platform.git
cd blog-platform

# Set up backend
cd backend
npm install
npm run dev

# Set up frontend (in another terminal)
cd frontend
npm install
npm start

# Set up MongoDB locally or use Docker Compose
```

## Commit Messages

Use conventional commits format:

```
type(scope): subject

body

footer
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`

Example:
```
feat(backend): add user authentication

- Implement JWT-based authentication
- Add login and signup endpoints
- Create authentication middleware

Closes #42
```

## Code Style

- Use 2-space indentation
- Use `const` by default, `let` when needed, avoid `var`
- Use camelCase for variables and functions
- Use PascalCase for classes and components
- Add comments for complex logic

## Testing

- Write tests for new features
- Ensure all tests pass: `npm test`
- Aim for >80% code coverage

## Documentation

- Update README.md for new features
- Add JSDoc comments to functions
- Include examples for complex features

## Pull Request Process

1. Update README.md with any new features
2. Ensure tests pass
3. Add description of changes
4. Reference any related issues
5. Wait for review and feedback
6. Address review comments
7. Request re-review after making changes

## Reporting Issues

When reporting issues:
- Use the bug report template
- Provide clear reproduction steps
- Include error messages and logs
- Specify your environment (OS, Docker version, etc.)

## Suggesting Enhancements

When suggesting features:
- Use the feature request template
- Explain the use case
- Describe expected behavior
- Suggest possible implementation

## Questions or Need Help?

- Open a GitHub Discussion
- Check existing Issues and Pull Requests
- Review the documentation

Thank you for contributing! 🚀
