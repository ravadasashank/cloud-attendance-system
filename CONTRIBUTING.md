# Contributing to Cloud-Based Attendance Tracking System

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to this project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Coding Standards](#coding-standards)
- [Pull Request Process](#pull-request-process)
- [Reporting Issues](#reporting-issues)

## Code of Conduct

This project adheres to a code of conduct. By participating, you are expected to uphold this standard. Please be respectful, inclusive, and constructive in all interactions.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL (v13 or higher)
- Git
- Docker (optional, for containerized development)

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/cloud-attendance-system.git
   cd cloud-attendance-system
   ```
3. Add the upstream remote:
   ```bash
   git remote add upstream https://github.com/ravadasashank/cloud-attendance-system.git
   ```

## Development Setup

Follow the setup instructions in the main [README.md](README.md) to set up your development environment.

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your database credentials
npm start
```

### Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
# Edit .env with your backend URL
npm start
```

## How to Contribute

### Finding Issues

- Check the [Issues](../../issues) page for open tasks
- Look for issues labeled `good first issue` or `help wanted`
- Comment on an issue to express your interest before starting work

### Creating a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

Use meaningful branch names:
- `feature/` for new features
- `fix/` for bug fixes
- `docs/` for documentation changes
- `refactor/` for code refactoring

## Coding Standards

### General Guidelines

- Write clear, readable, and maintainable code
- Follow the existing code style and conventions
- Add comments for complex logic
- Keep functions small and focused on a single responsibility

### Backend (Node.js/Express)

- Use ES6+ syntax
- Follow RESTful API conventions
- Use async/await for asynchronous operations
- Handle errors properly with try-catch blocks
- Validate input data
- Write meaningful commit messages

### Frontend (React)

- Use functional components with hooks
- Follow React best practices
- Keep components small and reusable
- Use proper state management
- Ensure responsive design

### Code Formatting

- Use 2 spaces for indentation
- Use semicolons
- Use single quotes for strings
- Add trailing commas in objects and arrays

### Testing

- Write unit tests for new features
- Ensure all tests pass before submitting PR
- Maintain or improve code coverage

```bash
# Run backend tests
cd backend && npm test

# Run frontend tests
cd frontend && npm test
```

## Pull Request Process

### Before Submitting

1. **Update your branch** with the latest upstream changes:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Test your changes** thoroughly:
   - Run all tests
   - Test manually in development environment
   - Check for console errors

3. **Update documentation** if needed:
   - Update README.md if you've added features
   - Add JSDoc comments to functions
   - Update API documentation if applicable

### Submitting the PR

1. Push your branch to your fork:
   ```bash
   git push origin your-branch-name
   ```

2. Open a Pull Request on GitHub

3. Fill out the PR template completely:
   - Describe what changes you made
   - Reference related issues
   - Add screenshots for UI changes
   - List any breaking changes

4. Wait for code review and address feedback

### PR Requirements

- All tests must pass
- Code must follow project conventions
- No merge conflicts with main branch
- Changes must be properly documented
- At least one maintainer approval required

## Reporting Issues

### Bug Reports

When reporting bugs, please include:

- Clear, descriptive title
- Steps to reproduce the issue
- Expected vs actual behavior
- Environment details (OS, Node version, browser)
- Screenshots or error logs if applicable
- Possible solution (if you have one)

### Feature Requests

For feature requests, describe:

- The problem or use case
- Your proposed solution
- Any alternatives you've considered
- How it benefits the project

## Questions?

If you have questions:

- Check existing documentation
- Search closed issues
- Open a new issue with the `question` label
- Reach out to maintainers

## Thank You!

Your contributions help make this project better for everyone. We appreciate your time and effort!
