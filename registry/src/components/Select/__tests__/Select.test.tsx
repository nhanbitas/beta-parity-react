import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Select, NativeSelect, CustomSelect, SelectItem, SelectGroup, SelectDivider } from '../index';

// Mock the dependencies
jest.mock('lucide-react', () => ({
  ChevronDown: () => <div data-testid='chevron-down-icon' />,
  X: () => <div data-testid='x-icon' />
}));

jest.mock('../../Menu', () => ({
  Menu: ({ children, isOpen, ...props }: any) => (
    <div data-testid='menu' data-open={isOpen} {...props}>
      {isOpen && children}
    </div>
  ),
  MenuItem: ({ value, label, checked, onChange, children, ...props }: any) => (
    <div
      data-testid={`menu-item-${value || 'empty'}`}
      data-checked={checked}
      onClick={(e: any) => onChange?.({ target: { value } })}
      {...props}
    >
      {label || children}
    </div>
  ),
  MenuGroup: ({ children, label, ...props }: any) => (
    <div data-testid='menu-group' {...props}>
      {label && <div data-testid='menu-group-label'>{label}</div>}
      {children}
    </div>
  ),
  MenuDivider: (props: any) => <hr data-testid='menu-divider' {...props} />
}));

jest.mock('../../Tag', () => ({
  Tag: ({ label, value, onRemove, ...props }: any) => (
    <span data-testid={`tag-${value}`} onClick={() => onRemove?.()} {...props}>
      {label}
    </span>
  )
}));

// Test data
const mockOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' }
];

describe('Select Component', () => {
  test('renders Native Select when native prop is true', () => {
    render(<Select native options={mockOptions} data-testid='select' />);

    const select = screen.getByTestId('select');
    expect(select.tagName).toBe('SELECT');
  });

  test('renders Custom Select when native prop is false or undefined', () => {
    render(<Select options={mockOptions} />);

    // Check for the value input wrapper which is specific to CustomSelect
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  test('passes props correctly to the selected implementation', () => {
    const { rerender } = render(<Select native options={mockOptions} placeholder='Select an option' />);

    // Native Select: placeholder is not directly supported in the same way
    expect(screen.queryByText('Select an option')).not.toBeInTheDocument();

    // Rerender with Custom Select
    rerender(<Select options={mockOptions} placeholder='Select an option' />);

    // Custom Select: placeholder should be visible
    expect(screen.getByText('Select an option')).toBeInTheDocument();
  });
});

describe('NativeSelect Component', () => {
  test('renders with default props', () => {
    render(<NativeSelect options={mockOptions} />);

    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    expect(select).toHaveClass('native-select', 'par-input', 'default');
    expect(select).not.toBeDisabled();

    // Check options
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(mockOptions.length);
    expect(options[0]).toHaveTextContent('Option 1');
  });

  test('renders with floating label', () => {
    render(<NativeSelect options={mockOptions} floatingLabel='Select Label' />);

    expect(screen.getByText('Select Label')).toBeInTheDocument();
  });

  test('supports controlled value', () => {
    const { rerender } = render(<NativeSelect options={mockOptions} value='option2' />);

    const select = screen.getByRole('combobox');
    expect(select).toHaveValue('option2');

    rerender(<NativeSelect options={mockOptions} value='option3' />);
    expect(select).toHaveValue('option3');
  });

  test('calls onChange when selection changes', () => {
    const handleChange = jest.fn();
    render(<NativeSelect options={mockOptions} onChange={handleChange} />);

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'option2' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test('renders with different sizes', () => {
    const { rerender } = render(<NativeSelect options={mockOptions} selectSize='sm' />);

    const select = screen.getByRole('combobox');
    expect(select).toHaveClass('small');

    rerender(<NativeSelect options={mockOptions} selectSize='md' />);
    expect(select).toHaveClass('medium');
  });

  test('renders with different themes', () => {
    const { rerender } = render(<NativeSelect options={mockOptions} theme='default' />);

    const select = screen.getByRole('combobox');
    expect(select).toHaveClass('default');

    rerender(<NativeSelect options={mockOptions} theme='alternative' />);
    expect(select).toHaveClass('alternative');
  });

  test('renders children instead of options when provided', () => {
    render(
      <NativeSelect>
        <option value='child1'>Child 1</option>
        <option value='child2'>Child 2</option>
      </NativeSelect>
    );

    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(2);
    expect(options[0]).toHaveTextContent('Child 1');
    expect(options[1]).toHaveTextContent('Child 2');
  });

  test('handles disabled state', () => {
    render(<NativeSelect options={mockOptions} disabled />);

    expect(screen.getByRole('combobox')).toBeDisabled();
  });

  test('handles focus and blur events', () => {
    const handleFocus = jest.fn();
    const handleBlur = jest.fn();

    render(<NativeSelect options={mockOptions} onFocus={handleFocus} onBlur={handleBlur} />);

    const select = screen.getByRole('combobox');

    fireEvent.focus(select);
    expect(handleFocus).toHaveBeenCalledTimes(1);

    fireEvent.blur(select);
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });
});

describe('CustomSelect Component', () => {
  test('renders with default props', () => {
    render(<CustomSelect options={mockOptions} />);

    const combobox = screen.getByRole('combobox');
    expect(combobox).toBeInTheDocument();
    expect(screen.getByTestId('chevron-down-icon')).toBeInTheDocument();
    expect(screen.getByText('Please choose an option')).toBeInTheDocument();
  });

  test('opens dropdown when clicked', () => {
    render(<CustomSelect options={mockOptions} />);

    const combobox = screen.getByRole('combobox');
    fireEvent.click(combobox);

    const menu = screen.getByTestId('menu');
    expect(menu).toHaveAttribute('data-open', 'true');

    // Check menu items
    expect(screen.getByTestId('menu-item-empty')).toBeInTheDocument();
    mockOptions.forEach((option) => {
      expect(screen.getByTestId(`menu-item-${option.value}`)).toBeInTheDocument();
    });
  });

  test('updates value when option is selected', () => {
    const handleChange = jest.fn();
    render(<CustomSelect options={mockOptions} onChange={handleChange} />);

    // Open the dropdown
    fireEvent.click(screen.getByRole('combobox'));

    // Click on an option
    fireEvent.click(screen.getByTestId('menu-item-option2'));

    expect(handleChange).toHaveBeenCalledWith('option2');

    // Dropdown should close after selection if keepOpen is false
    render(<CustomSelect options={mockOptions} onChange={handleChange} keepOpen={false} />);
    fireEvent.click(screen.getByRole('combobox'));
    fireEvent.click(screen.getByTestId('menu-item-option2'));

    const menu = screen.queryByTestId('menu');
    expect(menu).not.toHaveAttribute('data-open', 'true');
  });

  test('supports multiselect mode', () => {
    const handleChange = jest.fn();
    render(<CustomSelect options={mockOptions} multiselect onChange={handleChange} />);

    // Open the dropdown
    fireEvent.click(screen.getByRole('combobox'));

    // Select multiple options
    fireEvent.click(screen.getByTestId('menu-item-option1'));
    expect(handleChange).toHaveBeenCalledWith(['option1']);

    fireEvent.click(screen.getByTestId('menu-item-option2'));
    expect(handleChange).toHaveBeenCalledWith(['option1', 'option2']);
  });

  test('displays selected tags in multiselect mode', async () => {
    render(<CustomSelect options={mockOptions} multiselect value={['option1', 'option2']} />);

    // Tags should be rendered for selected options
    expect(screen.getByTestId('tag-option1')).toBeInTheDocument();
    expect(screen.getByTestId('tag-option2')).toBeInTheDocument();
  });

  test('removes tag when tag remove button is clicked', () => {
    const handleChange = jest.fn();
    render(<CustomSelect options={mockOptions} multiselect value={['option1', 'option2']} onChange={handleChange} />);

    // Click the remove button on a tag
    fireEvent.click(screen.getByTestId('tag-option1'));

    expect(handleChange).toHaveBeenCalledWith(['option2']);
  });

  test('renders clear button when clearButton is true', () => {
    const handleChange = jest.fn();
    render(<CustomSelect options={mockOptions} clearButton value='option1' onChange={handleChange} />);

    // Clear button should be rendered
    expect(screen.getByTestId('x-icon')).toBeInTheDocument();

    // Click clear button
    fireEvent.click(screen.getByTestId('x-icon').closest('button')!);

    expect(handleChange).toHaveBeenCalledWith('');
  });

  test('renders floating label', () => {
    render(<CustomSelect options={mockOptions} floatingLabel='Select Label' />);

    expect(screen.getByText('Select Label')).toBeInTheDocument();
  });

  test('handles deselectable prop', () => {
    const handleChange = jest.fn();
    render(<CustomSelect options={mockOptions} deselectable value='option1' onChange={handleChange} />);

    // Open the dropdown
    fireEvent.click(screen.getByRole('combobox'));

    // Click on the selected option
    fireEvent.click(screen.getByTestId('menu-item-option1'));

    // Value should be deselected
    expect(handleChange).toHaveBeenCalledWith('');
  });

  test('shows count description for multiple selections', () => {
    render(
      <CustomSelect
        options={mockOptions}
        multiselect
        value={['option1', 'option2']}
        countDescription='options selected'
      />
    );

    expect(screen.getByText('2 options selected')).toBeInTheDocument();
  });
});

describe('SelectItem Component', () => {
  test('renders as menu item by default', () => {
    render(
      <CustomSelect isOpen>
        <SelectItem value='test' label='Test Item' />
      </CustomSelect>
    );

    expect(screen.getByTestId('menu-item-test')).toBeInTheDocument();
  });
});

describe('SelectGroup Component', () => {
  test('renders group with label', () => {
    render(
      <CustomSelect isOpen>
        <SelectGroup label='Group 1'>
          <SelectItem value='item1' label='Item 1' />
          <SelectItem value='item2' label='Item 2' />
        </SelectGroup>
      </CustomSelect>
    );

    expect(screen.getByTestId('menu-group')).toBeInTheDocument();
    expect(screen.getByTestId('menu-group-label')).toHaveTextContent('Group 1');
  });
});

describe('SelectDivider Component', () => {
  test('renders divider', () => {
    render(
      <CustomSelect isOpen>
        <SelectItem value='item1' label='Item 1' />
        <SelectDivider />
        <SelectItem value='item2' label='Item 2' />
      </CustomSelect>
    );

    expect(screen.getByTestId('menu-divider')).toBeInTheDocument();
  });
});
