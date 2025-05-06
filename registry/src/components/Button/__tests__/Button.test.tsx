import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button } from '../index';

// Mock the Spinner component
jest.mock('../../Spinner', () => ({
  Spinner: () => <div data-testid='spinner-mock' />
}));

describe('Button Component', () => {
  test('renders with default props', () => {
    render(<Button>Click Me</Button>);

    const button = screen.getByText('Click Me');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('btn', 'neutral', 'solid', 'medium');
    expect(button).not.toHaveClass('icon-only', 'loading');
    expect(button).not.toBeDisabled();
  });

  test('applies custom class name', () => {
    render(<Button className='custom-class'>Click Me</Button>);

    const button = screen.getByText('Click Me');
    expect(button).toHaveClass('custom-class');
  });

  test('renders with different sizes', () => {
    const { rerender } = render(<Button size='sm'>Small</Button>);
    expect(screen.getByText('Small')).toHaveClass('small');

    rerender(<Button size='md'>Medium</Button>);
    expect(screen.getByText('Medium')).toHaveClass('medium');

    rerender(<Button size='lg'>Large</Button>);
    expect(screen.getByText('Large')).toHaveClass('large');
  });

  test('renders with different colors', () => {
    const { rerender } = render(<Button color='accent'>Accent</Button>);
    expect(screen.getByText('Accent')).toHaveClass('accent');

    rerender(<Button color='neutral'>Neutral</Button>);
    expect(screen.getByText('Neutral')).toHaveClass('neutral');

    rerender(<Button color='adverse'>Adverse</Button>);
    expect(screen.getByText('Adverse')).toHaveClass('adverse');
  });

  test('renders with different kinds', () => {
    const { rerender } = render(<Button kind='solid'>Solid</Button>);
    expect(screen.getByText('Solid')).toHaveClass('solid');

    rerender(<Button kind='outlined'>Outlined</Button>);
    expect(screen.getByText('Outlined')).toHaveClass('outlined');

    rerender(<Button kind='ghost'>Ghost</Button>);
    expect(screen.getByText('Ghost')).toHaveClass('ghost');

    rerender(<Button kind='glass'>Glass</Button>);
    expect(screen.getByText('Glass')).toHaveClass('glass');
  });

  test('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);

    const button = screen.getByText('Click Me');
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('renders disabled button', () => {
    const handleClick = jest.fn();
    render(
      <Button disabled onClick={handleClick}>
        Disabled
      </Button>
    );

    const button = screen.getByText('Disabled');
    expect(button).toBeDisabled();

    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  test('renders icon-only button', () => {
    render(
      <Button iconOnly>
        <svg data-testid='icon' />
      </Button>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveClass('icon-only');
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  test('renders pending state with spinner', () => {
    const handleClick = jest.fn();
    render(
      <Button isPending onClick={handleClick}>
        Loading
      </Button>
    );

    const button = screen.getByText('Loading');
    expect(button).toHaveClass('loading');
    expect(button).toBeDisabled();
    expect(screen.getByTestId('spinner-mock')).toBeInTheDocument();

    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  test('wraps text children in span with btn-text class', () => {
    render(<Button>Text Child</Button>);

    const textSpan = screen.getByText('Text Child');
    expect(textSpan.tagName).toBe('SPAN');
    expect(textSpan).toHaveClass('btn-text');
  });

  test('passes non-text children without wrapping', () => {
    render(
      <Button>
        <div data-testid='custom-element'>Custom Element</div>
      </Button>
    );

    const customElement = screen.getByTestId('custom-element');
    expect(customElement.tagName).toBe('DIV');
    expect(customElement.parentElement).toHaveClass('btn');
    expect(customElement).not.toHaveClass('btn-text');
  });

  test('forwards ref to button element', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Ref Button</Button>);

    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('BUTTON');
    expect(ref.current?.textContent).toBe('Ref Button');
  });
});
