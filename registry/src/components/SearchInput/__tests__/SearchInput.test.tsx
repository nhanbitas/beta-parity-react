import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SearchInput } from '../index';

// Mock the dependencies
jest.mock('lucide-react', () => ({
  Search: () => <span data-testid='search-icon'>🔍</span>
}));

jest.mock('../../Spinner', () => ({
  Spinner: ({ size }) => (
    <span data-testid='spinner-icon' data-size={size}>
      ⌛
    </span>
  )
}));

jest.mock('../../Button', () => {
  const Button = React.forwardRef(({ children, color, kind, size, className, onClick, disabled, ...props }, ref) => (
    <button
      ref={ref}
      data-testid='mock-button'
      data-color={color}
      data-kind={kind}
      data-size={size}
      className={className}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  ));
  Button.displayName = 'Button';
  return { Button };
});

jest.mock('../../BaseInput', () => {
  const Input = React.forwardRef(({ type, leftIcon, ActionBtn, ...props }, ref) => (
    <div data-testid='mock-input' data-type={type}>
      {leftIcon && <div data-testid='left-icon'>{leftIcon}</div>}
      <input type={type} data-testid='input-element' ref={ref} {...props} />
      {ActionBtn && <div data-testid='action-btn'>{ActionBtn}</div>}
    </div>
  ));
  Input.displayName = 'Input';
  return { Input };
});

describe('SearchInput Component', () => {
  test('renders with default props', () => {
    render(<SearchInput />);

    const input = screen.getByTestId('mock-input');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('data-type', 'search');

    // By default, search icon should appear on the left
    const leftIcon = screen.getByTestId('left-icon');
    expect(leftIcon).toBeInTheDocument();
    expect(leftIcon).toContainElement(screen.getByTestId('search-icon'));
  });

  test('renders with a pending state', () => {
    render(<SearchInput isPending />);

    // When pending, a spinner should be rendered instead of a search icon
    const leftIcon = screen.getByTestId('left-icon');
    expect(leftIcon).toContainElement(screen.getByTestId('spinner-icon'));
    expect(screen.queryByTestId('search-icon')).not.toBeInTheDocument();
  });

  test('renders with a search button', () => {
    render(<SearchInput searchButton />);

    // When searchButton=true, the search icon should move to the right
    expect(screen.queryByTestId('left-icon')).not.toBeInTheDocument();

    // Search button should be on the right
    const actionBtn = screen.getByTestId('action-btn');
    expect(actionBtn).toBeInTheDocument();
    expect(actionBtn).toContainElement(screen.getByTestId('search-icon'));
  });

  test('handles search button click', () => {
    const handleSearch = jest.fn();
    render(<SearchInput searchButton onSearch={handleSearch} />);

    // Find search button and click it
    const searchButton = screen.getByTestId('search-icon').closest('button');
    fireEvent.click(searchButton!);

    expect(handleSearch).toHaveBeenCalledTimes(1);
  });

  test('disables search button when input is disabled', () => {
    render(<SearchInput searchButton disabled />);

    const searchButton = screen.getByTestId('search-icon').closest('button');
    expect(searchButton).toBeDisabled();
  });

  test('disables search button when input is readOnly', () => {
    render(<SearchInput searchButton readOnly />);

    const searchButton = screen.getByTestId('search-icon').closest('button');
    expect(searchButton).toBeDisabled();
  });

  test('renders with an auxiliary icon', () => {
    const auxiliaryIcon = <span data-testid='aux-icon'>📁</span>;
    render(<SearchInput auxiliaryIcon={auxiliaryIcon} />);

    const actionBtn = screen.getByTestId('action-btn');
    expect(actionBtn).toBeInTheDocument();
    expect(actionBtn).toContainElement(screen.getByTestId('aux-icon'));
  });

  test('handles auxiliary action click', () => {
    const auxiliaryIcon = <span data-testid='aux-icon'>📁</span>;
    const handleAuxiliaryAction = jest.fn();

    render(<SearchInput auxiliaryIcon={auxiliaryIcon} onAuxiliaryAction={handleAuxiliaryAction} />);

    // Find auxiliary button and click it
    const auxButton = screen.getByTestId('aux-icon').closest('button');
    fireEvent.click(auxButton!);

    expect(handleAuxiliaryAction).toHaveBeenCalledTimes(1);
  });

  test('renders active auxiliary button as Button component', () => {
    const auxiliaryIcon = <span data-testid='aux-icon'>📁</span>;

    render(<SearchInput auxiliaryIcon={auxiliaryIcon} auxiliaryActive />);

    // When auxiliaryActive is true, the auxiliary icon should be rendered in a Button component
    const auxButtonWrap = screen.getByTestId('aux-icon').closest('[data-testid="mock-button"]');
    expect(auxButtonWrap).toBeInTheDocument();
    expect(auxButtonWrap).toHaveAttribute('data-color', 'neutral');
    expect(auxButtonWrap).toHaveAttribute('data-kind', 'solid');
    expect(auxButtonWrap).toHaveAttribute('data-size', 'sm');
  });

  test('renders with a keyboard shortcut button', () => {
    render(<SearchInput shortCut='Cmd+K' />);

    // When shortCut is provided, a button with the shortcut should be rendered
    const shortcutBtn = screen.getByTestId('mock-button');
    expect(shortcutBtn).toBeInTheDocument();
    expect(shortcutBtn).toHaveTextContent('Cmd+K');
    expect(shortcutBtn).toHaveAttribute('data-kind', 'glass');
    expect(shortcutBtn).toHaveAttribute('data-size', 'sm');
    expect(shortcutBtn).toHaveClass('search-shortcut');
  });

  test('applies custom props to the search button', () => {
    const searchButtonProps = { 'aria-label': 'Search catalog' };
    render(<SearchInput searchButton searchButtonProps={searchButtonProps} />);

    const searchButton = screen.getByTestId('search-icon').closest('button');
    expect(searchButton).toHaveAttribute('aria-label', 'Search catalog');
  });

  test('applies custom props to the auxiliary button', () => {
    const auxiliaryIcon = <span data-testid='aux-icon'>📁</span>;
    const auxiliaryActionProps = { 'aria-label': 'Open folder' };

    render(<SearchInput auxiliaryIcon={auxiliaryIcon} auxiliaryActionProps={auxiliaryActionProps} />);

    const auxButton = screen.getByTestId('aux-icon').closest('button');
    expect(auxButton).toHaveAttribute('aria-label', 'Open folder');
  });

  test('applies custom props to the shortcut button', () => {
    const shortCutButtonProps = { 'aria-label': 'Keyboard shortcut' };

    render(<SearchInput shortCut='Ctrl+K' shortCutButtonProps={shortCutButtonProps} />);

    const shortcutBtn = screen.getByTestId('mock-button');
    expect(shortcutBtn).toHaveAttribute('aria-label', 'Keyboard shortcut');
  });

  test('shows input divider when both search button and auxiliary icon are present', () => {
    const auxiliaryIcon = <span data-testid='aux-icon'>📁</span>;

    render(<SearchInput searchButton auxiliaryIcon={auxiliaryIcon} />);

    // There should be an input divider between components
    const actionBtn = screen.getByTestId('action-btn');
    expect(actionBtn.innerHTML).toContain('input-divider');
  });

  test('forwards ref to the input element', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<SearchInput ref={ref} />);

    // The ref should be passed to the Input component
    expect(ref.current).not.toBeNull();
  });
});
