import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Box } from '../index';

describe('Box Component', () => {
  test('renders correctly with default props', () => {
    render(<Box data-testid='box'>Test Content</Box>);

    const box = screen.getByTestId('box');
    expect(box).toBeInTheDocument();
    expect(box).toHaveClass('box');
    expect(box.tagName).toBe('DIV'); // Default element is div
    expect(box.textContent).toBe('Test Content');
  });

  test('applies custom class name', () => {
    render(
      <Box className='custom-class' data-testid='box'>
        Test Content
      </Box>
    );

    const box = screen.getByTestId('box');
    expect(box).toHaveClass('box', 'custom-class');
  });

  test('renders as different HTML elements', () => {
    const { rerender } = render(
      <Box component='section' data-testid='box'>
        Section Content
      </Box>
    );

    let box = screen.getByTestId('box');
    expect(box.tagName).toBe('SECTION');

    rerender(
      <Box component='article' data-testid='box'>
        Article Content
      </Box>
    );
    box = screen.getByTestId('box');
    expect(box.tagName).toBe('ARTICLE');
  });

  test('forwards ref to the element', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <Box ref={ref} data-testid='box'>
        Ref Test
      </Box>
    );

    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('DIV');
    expect(ref.current?.textContent).toBe('Ref Test');
  });

  test('passes through extra props', () => {
    const handleClick = jest.fn();
    render(
      <Box onClick={handleClick} aria-label='test box' data-testid='box'>
        Click Me
      </Box>
    );

    const box = screen.getByTestId('box');
    expect(box).toHaveAttribute('aria-label', 'test box');

    box.click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('renders children correctly', () => {
    render(
      <Box data-testid='box'>
        <span data-testid='child'>Child Element</span>
      </Box>
    );

    const box = screen.getByTestId('box');
    const child = screen.getByTestId('child');

    expect(box).toContainElement(child);
    expect(child.textContent).toBe('Child Element');
  });
});
