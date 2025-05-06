# Testing UI Components in Beta Parity React

This document provides guidelines for testing UI components in the Beta Parity React library.

## Testing Setup

The project uses the following testing tools:

- **Jest**: JavaScript testing framework
- **React Testing Library**: Utilities for testing React components
- **@testing-library/jest-dom**: Custom Jest matchers for DOM testing
- **@testing-library/user-event**: Utilities for simulating user events

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode (development)
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

## Test File Structure

Tests should be placed in a `__tests__` directory adjacent to the component being tested. The test file should be named after the component with a `.test.tsx` extension:

```
ComponentName/
├── index.tsx
├── index.css
├── __tests__/
│   └── ComponentName.test.tsx
└── ...
```

## Generating Test Files

To quickly create a test file template for a component:

```bash
# Generate a test file for ComponentName
npm run generate:test ComponentName
```

This will create a `__tests__` directory (if it doesn't exist) and a test file with a basic structure.

## Writing Tests

### Basic Component Test

```tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { YourComponent } from '../index';

describe('YourComponent', () => {
  test('renders correctly with default props', () => {
    render(<YourComponent />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
});
```

### Testing User Interactions

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('handles button click', () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click Me</Button>);
  
  const button = screen.getByText('Click Me');
  userEvent.click(button);
  
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

### Testing Async Behavior

```tsx
import { render, screen, waitFor } from '@testing-library/react';

test('shows content after loading', async () => {
  render(<AsyncComponent />);
  
  // Initially loading state
  expect(screen.getByText('Loading...')).toBeInTheDocument();
  
  // Wait for content to appear
  await waitFor(() => {
    expect(screen.getByText('Content Loaded')).toBeInTheDocument();
  });
});
```

## Mocking Dependencies

### Mocking Components

For components that use other components like Portal or Context providers, you may need to mock them:

```tsx
// Mock the Portal component
jest.mock('../Portal', () => ({
  Portal: ({ children }) => <div data-testid="portal-mock">{children}</div>
}));
```

### Mocking Modules

For external libraries or utilities:

```tsx
// Mock a utility function
jest.mock('../../utils', () => ({
  formatDate: jest.fn(() => 'Mocked Date'),
  // other exports...
}));
```

## Best Practices

1. **Test behavior, not implementation**: Focus on what the user would see and do, not on the component's internal implementation.

2. **Use semantic queries**: Prefer queries like `getByRole`, `getByLabelText`, and `getByText` over `getByTestId`.

3. **Test accessibility features**: Ensure components are accessible by testing keyboard navigation and ARIA attributes.

4. **Keep tests independent**: Each test should be isolated and not depend on the state of other tests.

5. **Test edge cases**: Include tests for error states, loading states, empty states, etc.

6. **Use proper assertions**: Be specific about what you're testing (e.g., `toBeInTheDocument()`, `toHaveClass()`, etc.).

7. **Avoid snapshot testing**: Prefer explicit assertions over snapshot testing for UI components.

## Example Components with Tests

See example tests for:
- [Button](./src/components/Button/__tests__/Button.test.tsx)
- [Modal](./src/components/Modal/__tests__/Modal.test.tsx)