#!/usr/bin/env node

/**
 * Test file generator script
 *
 * This script generates a basic test file template for a React component.
 * Usage: node generate-test.js ComponentName
 */

const fs = require('fs');
const path = require('path');

function generateTestFile(componentName) {
  // Check if component name was provided
  if (!componentName) {
    console.error('Please provide a component name: node generate-test.js ComponentName');
    process.exit(1);
  }

  const componentDir = path.join(__dirname, '../../src/components', componentName);

  // Check if component directory exists
  if (!fs.existsSync(componentDir)) {
    console.error(`Component directory not found: ${componentDir}`);
    process.exit(1);
  }

  // Create tests directory if it doesn't exist
  const testsDir = path.join(componentDir, '__tests__');
  if (!fs.existsSync(testsDir)) {
    fs.mkdirSync(testsDir);
    console.log(`Created tests directory: ${testsDir}`);
  }

  // Template for the test file
  const testFileContent = `import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ${componentName} } from '../index';

describe('${componentName} Component', () => {
  test('renders correctly with default props', () => {
    render(<${componentName} />);
    
    // TODO: Add assertions based on component's behavior
    // Example: expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('applies custom class name', () => {
    render(<${componentName} className="custom-class" />);
    
    // TODO: Add assertions based on component's behavior
    // Example: expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  test('handles prop changes correctly', () => {
    const { rerender } = render(<${componentName} />);
    
    // TODO: Add assertions based on component's behavior
    
    rerender(<${componentName} /* updated props */ />);
    
    // TODO: Add assertions for updated component state
  });

  test('handles user interactions correctly', () => {
    const handleAction = jest.fn();
    render(<${componentName} /* interaction handler props */ />);
    
    // TODO: Add interaction code
    // Example: fireEvent.click(screen.getByRole('button'));
    
    // TODO: Add assertions based on interaction
    // Example: expect(handleAction).toHaveBeenCalledTimes(1);
  });
});
`;

  const testFilePath = path.join(testsDir, `${componentName}.test.tsx`);

  // Don't overwrite existing test files
  if (fs.existsSync(testFilePath)) {
    console.error(`Test file already exists: ${testFilePath}`);
    process.exit(1);
  }

  // Write test file
  fs.writeFileSync(testFilePath, testFileContent);
  console.log(`Created test file: ${testFilePath}`);
}

// Get component name from command line arguments
const componentName = process.argv[2];
generateTestFile(componentName);
