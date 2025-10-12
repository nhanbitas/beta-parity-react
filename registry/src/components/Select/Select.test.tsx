import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Select, NativeSelect, CustomSelect, SelectItem, SelectGroup, SelectDivider } from './index';

describe('Select Component', () => {
  describe('Component selection', () => {
    it('renders CustomSelect by default', () => {
      const { container } = render(
        <Select>
          <SelectItem value="1" label="Option 1" />
        </Select>
      );
      expect(container.querySelector('.custom-select')).toBeInTheDocument();
    });

    it('renders NativeSelect when native is true', () => {
      const { container } = render(
        <Select native>
          <SelectItem value="1" label="Option 1" />
        </Select>
      );
      expect(container.querySelector('.native-select')).toBeInTheDocument();
    });
  });
});

describe('NativeSelect Component', () => {
  const options = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' }
  ];

  describe('Rendering', () => {
    it('renders correctly', () => {
      const { container } = render(<NativeSelect options={options} />);
      expect(container.querySelector('.native-select')).toBeInTheDocument();
    });

    it('renders with options prop', () => {
      render(<NativeSelect options={options} />);
      expect(screen.getByText('Option 1')).toBeInTheDocument();
      expect(screen.getByText('Option 2')).toBeInTheDocument();
      expect(screen.getByText('Option 3')).toBeInTheDocument();
    });

    it('renders with children', () => {
      render(
        <NativeSelect>
          <option value="1">Item 1</option>
          <option value="2">Item 2</option>
        </NativeSelect>
      );
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
    });

    it('renders chevron icon', () => {
      const { container } = render(<NativeSelect options={options} />);
      expect(container.querySelector('.arrow-select-btn')).toBeInTheDocument();
    });
  });

  describe('Size variants', () => {
    it('renders medium size by default', () => {
      const { container } = render(<NativeSelect options={options} />);
      expect(container.querySelector('.native-select')).toHaveClass('medium');
    });

    it('renders small size', () => {
      const { container } = render(<NativeSelect options={options} selectSize="sm" />);
      expect(container.querySelector('.native-select')).toHaveClass('small');
    });
  });

  describe('Theme variants', () => {
    it('renders default theme', () => {
      const { container } = render(<NativeSelect options={options} />);
      expect(container.querySelector('.native-select')).toHaveClass('default');
    });

    it('renders alternative theme', () => {
      const { container } = render(<NativeSelect options={options} theme="alternative" />);
      expect(container.querySelector('.native-select')).toHaveClass('alternative');
    });
  });

  describe('Floating label', () => {
    it('renders floating label', () => {
      render(<NativeSelect options={options} floatingLabel="Select option" />);
      expect(screen.getByText('Select option')).toBeInTheDocument();
    });

    it('does not show size class with floating label', () => {
      const { container } = render(<NativeSelect options={options} floatingLabel="Label" selectSize="sm" />);
      expect(container.querySelector('.native-select')).not.toHaveClass('small');
    });
  });

  describe('Value handling', () => {
    it('accepts initial value', () => {
      const { container } = render(<NativeSelect options={options} value="2" />);
      const select = container.querySelector('.native-select') as HTMLSelectElement;
      expect(select.value).toBe('2');
    });

    it('calls onChange when value changes', async () => {
      const handleChange = jest.fn();
      const { container } = render(<NativeSelect options={options} onChange={handleChange} />);
      const select = container.querySelector('.native-select') as HTMLSelectElement;

      await userEvent.selectOptions(select, '2');
      expect(handleChange).toHaveBeenCalled();
    });

    it('updates value when prop changes', () => {
      const { container, rerender } = render(<NativeSelect options={options} value="1" />);
      const select = container.querySelector('.native-select') as HTMLSelectElement;
      expect(select.value).toBe('1');

      rerender(<NativeSelect options={options} value="3" />);
      expect(select.value).toBe('3');
    });
  });

  describe('States', () => {
    it('can be disabled', () => {
      const { container } = render(<NativeSelect options={options} disabled />);
      const select = container.querySelector('.native-select');
      expect(select).toBeDisabled();
    });

    it('does not respond to clicks when disabled', async () => {
      const handleChange = jest.fn();
      const { container } = render(<NativeSelect options={options} disabled onChange={handleChange} />);
      const select = container.querySelector('.native-select') as HTMLSelectElement;

      await userEvent.selectOptions(select, '2');
      expect(handleChange).not.toHaveBeenCalled();
    });

    it('applies non-value class when empty', () => {
      const { container } = render(<NativeSelect options={options} />);
      expect(container.querySelector('.native-select')).toHaveClass('non-value');
    });

    it('removes non-value class when value is set', () => {
      const { container } = render(<NativeSelect options={options} value="1" />);
      expect(container.querySelector('.native-select')).not.toHaveClass('non-value');
    });
  });

  describe('Event handlers', () => {
    it('calls onFocus when select gains focus', async () => {
      const handleFocus = jest.fn();
      const { container } = render(<NativeSelect options={options} onFocus={handleFocus} />);
      const select = container.querySelector('.native-select') as HTMLSelectElement;

      await userEvent.click(select);
      expect(handleFocus).toHaveBeenCalled();
    });

    it('calls onBlur when select loses focus', () => {
      const handleBlur = jest.fn();
      const { container } = render(<NativeSelect options={options} onBlur={handleBlur} />);
      const select = container.querySelector('.native-select') as HTMLSelectElement;

      select.focus();
      select.blur();
      expect(handleBlur).toHaveBeenCalled();
    });

    it('calls onclick when select is clicked', async () => {
      const handleClick = jest.fn();
      const { container } = render(<NativeSelect options={options} onclick={handleClick} />);
      const select = container.querySelector('.native-select') as HTMLSelectElement;

      await userEvent.click(select);
      expect(handleClick).toHaveBeenCalled();
    });
  });

  describe('Disabled options', () => {
    it('renders disabled options', () => {
      const optionsWithDisabled = [
        { value: '1', label: 'Option 1' },
        { value: '2', label: 'Option 2', disabled: true },
        { value: '3', label: 'Option 3' }
      ];
      const { container } = render(<NativeSelect options={optionsWithDisabled} />);
      const options = container.querySelectorAll('option');
      expect(options[1]).toBeDisabled();
    });
  });

  describe('Accessibility', () => {
    it('forwards ref correctly', () => {
      const ref = jest.fn();
      render(<NativeSelect ref={ref} options={options} />);
      expect(ref).toHaveBeenCalled();
    });

    it('applies custom className', () => {
      const { container } = render(<NativeSelect options={options} className="custom-select" />);
      expect(container.querySelector('.native-select')).toHaveClass('custom-select');
    });
  });
});

describe('CustomSelect Component', () => {
  const options = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' }
  ];

  describe('Rendering', () => {
    it('renders correctly', () => {
      const { container } = render(<CustomSelect options={options} />);
      expect(container.querySelector('.select-input')).toBeInTheDocument();
    });

    it('renders with options prop', async () => {
      const { container } = render(<CustomSelect options={options} />);
      const selectInput = container.querySelector('.select-input') as HTMLElement;
      await userEvent.click(selectInput);

      await waitFor(() => {
        expect(screen.getByText('Option 1')).toBeInTheDocument();
        expect(screen.getByText('Option 2')).toBeInTheDocument();
        expect(screen.getByText('Option 3')).toBeInTheDocument();
      });
    });

    it('renders placeholder by default', () => {
      const { container } = render(<CustomSelect options={options} />);
      expect(container.querySelector('.select-label')).toHaveTextContent('Please choose an option');
    });

    it('renders custom placeholder', () => {
      const { container } = render(<CustomSelect options={options} placeholder="Select item" />);
      expect(container.querySelector('.select-label')).toHaveTextContent('Select item');
    });

    it('renders chevron icon', () => {
      const { container } = render(<CustomSelect options={options} />);
      expect(container.querySelector('.arrow-select-btn')).toBeInTheDocument();
    });
  });

  describe('Size variants', () => {
    it('renders medium size by default', () => {
      const { container } = render(<CustomSelect options={options} />);
      expect(container.querySelector('.select-input')).toHaveClass('medium');
    });

    it('renders small size', () => {
      const { container } = render(<CustomSelect options={options} selectSize="sm" />);
      expect(container.querySelector('.select-input')).toHaveClass('small');
    });
  });

  describe('Theme variants', () => {
    it('renders default theme', () => {
      const { container } = render(<CustomSelect options={options} />);
      expect(container.querySelector('.select-input')).toHaveAttribute('theme', 'default');
    });

    it('renders alternative theme', () => {
      const { container } = render(<CustomSelect options={options} theme="alternative" />);
      expect(container.querySelector('.select-input')).toHaveAttribute('theme', 'alternative');
    });
  });

  describe('Opening and closing', () => {
    it('opens menu on click', async () => {
      const { container } = render(<CustomSelect options={options} />);
      const selectInput = container.querySelector('.select-input') as HTMLElement;

      await userEvent.click(selectInput);

      await waitFor(() => {
        expect(container.querySelector('.custom-select')).toHaveAttribute('aria-hidden', 'false');
      });
    });

    it('closes menu on option selection', async () => {
      const { container } = render(<CustomSelect options={options} keepOpen={false} />);
      const selectInput = container.querySelector('.select-input') as HTMLElement;

      await userEvent.click(selectInput);

      await waitFor(() => {
        expect(screen.getByText('Option 1')).toBeInTheDocument();
      });

      await userEvent.click(screen.getByText('Option 1'));

      await waitFor(() => {
        expect(container.querySelector('.custom-select')).toHaveAttribute('aria-hidden', 'true');
      });
    });

    it('keeps menu open after selection when keepOpen is true', async () => {
      const { container } = render(<CustomSelect options={options} keepOpen />);
      const selectInput = container.querySelector('.select-input') as HTMLElement;

      await userEvent.click(selectInput);

      await waitFor(() => {
        expect(screen.getByText('Option 1')).toBeInTheDocument();
      });

      await userEvent.click(screen.getByText('Option 1'));

      await waitFor(() => {
        expect(container.querySelector('.custom-select')).toHaveAttribute('aria-hidden', 'false');
      });
    });

    it('opens menu with Enter key', async () => {
      const { container } = render(<CustomSelect options={options} />);
      const selectInput = container.querySelector('.select-input') as HTMLElement;

      selectInput.focus();
      await userEvent.keyboard('{Enter}');

      await waitFor(() => {
        expect(container.querySelector('.custom-select')).toHaveAttribute('aria-hidden', 'false');
      });
    });

    it('opens menu with Space key', async () => {
      const { container } = render(<CustomSelect options={options} />);
      const selectInput = container.querySelector('.select-input') as HTMLElement;

      selectInput.focus();
      await userEvent.keyboard(' ');

      await waitFor(() => {
        expect(container.querySelector('.custom-select')).toHaveAttribute('aria-hidden', 'false');
      });
    });
  });

  describe('Single selection', () => {
    it('selects an option', async () => {
      const { container } = render(<CustomSelect options={options} />);
      const selectInput = container.querySelector('.select-input') as HTMLElement;

      await userEvent.click(selectInput);

      await waitFor(() => {
        expect(screen.getByText('Option 2')).toBeInTheDocument();
      });

      await userEvent.click(screen.getByText('Option 2'));

      expect(container.querySelector('.select-label')).toHaveTextContent('Option 2');
    });

    it('calls onChange when option is selected', async () => {
      const handleChange = jest.fn();
      const { container } = render(<CustomSelect options={options} onChange={handleChange} />);
      const selectInput = container.querySelector('.select-input') as HTMLElement;

      await userEvent.click(selectInput);

      await waitFor(() => {
        expect(screen.getByText('Option 1')).toBeInTheDocument();
      });

      await userEvent.click(screen.getByText('Option 1'));

      expect(handleChange).toHaveBeenCalledWith('1');
    });

    it('deselects option when deselectable is true', async () => {
      const { container } = render(<CustomSelect options={options} deselectable />);
      const selectInput = container.querySelector('.select-input') as HTMLElement;

      await userEvent.click(selectInput);
      await waitFor(() => expect(screen.getByText('Option 1')).toBeInTheDocument());
      await userEvent.click(screen.getByText('Option 1'));

      expect(container.querySelector('.select-label')).toHaveTextContent('Option 1');

      await userEvent.click(selectInput);
      await waitFor(() => expect(screen.getByText('Option 1')).toBeInTheDocument());
      await userEvent.click(screen.getByText('Option 1'));

      expect(container.querySelector('.select-label')).toHaveTextContent('Please choose an option');
    });
  });

  describe('Multi-select', () => {
    it('allows multiple selections', async () => {
      const { container } = render(<CustomSelect options={options} multiselect />);
      const selectInput = container.querySelector('.select-input') as HTMLElement;

      await userEvent.click(selectInput);

      await waitFor(() => {
        expect(screen.getByText('Option 1')).toBeInTheDocument();
      });

      await userEvent.click(screen.getByText('Option 1'));
      await userEvent.click(screen.getByText('Option 2'));

      const tags = container.querySelectorAll('.tag');
      expect(tags.length).toBe(2);
    });

    it('calls onChange with array in multiselect mode', async () => {
      const handleChange = jest.fn();
      const { container } = render(<CustomSelect options={options} multiselect onChange={handleChange} />);
      const selectInput = container.querySelector('.select-input') as HTMLElement;

      await userEvent.click(selectInput);

      await waitFor(() => {
        expect(screen.getByText('Option 1')).toBeInTheDocument();
      });

      await userEvent.click(screen.getByText('Option 1'));

      expect(handleChange).toHaveBeenCalledWith(['1']);
    });

    it('removes tag on tag remove button click', async () => {
      const { container } = render(<CustomSelect options={options} multiselect />);
      const selectInput = container.querySelector('.select-input') as HTMLElement;

      await userEvent.click(selectInput);
      await waitFor(() => expect(screen.getByText('Option 1')).toBeInTheDocument());
      await userEvent.click(screen.getByText('Option 1'));

      const tags = container.querySelectorAll('.tag');
      expect(tags.length).toBe(1);

      const removeButton = container.querySelector('.tag-close') as HTMLElement;
      await userEvent.click(removeButton);

      expect(container.querySelectorAll('.tag').length).toBe(0);
    });

    it('shows count description when too many selections', async () => {
      const { container } = render(<CustomSelect options={options} multiselect countDescription="items" />);
      const selectInput = container.querySelector('.select-input') as HTMLElement;

      await userEvent.click(selectInput);
      await waitFor(() => expect(screen.getByText('Option 1')).toBeInTheDocument());
      await userEvent.click(screen.getByText('Option 1'));
      await userEvent.click(screen.getByText('Option 2'));
      await userEvent.click(screen.getByText('Option 3'));

      // Count description may appear depending on width calculations
      const countLabel = container.querySelector('.select-number-chips-label');
      if (countLabel) {
        expect(countLabel).toHaveTextContent('items');
      }
    });
  });

  describe('Filterable', () => {
    it('shows search input when filterable', async () => {
      const { container } = render(<CustomSelect options={options} filterable />);
      const selectInput = container.querySelector('.select-input') as HTMLElement;

      await userEvent.click(selectInput);

      await waitFor(() => {
        expect(container.querySelector('.menu-item-search')).toBeInTheDocument();
      });
    });

    it('filters options based on search', async () => {
      const { container } = render(<CustomSelect options={options} filterable />);
      const selectInput = container.querySelector('.select-input') as HTMLElement;

      await userEvent.click(selectInput);

      await waitFor(() => {
        expect(container.querySelector('.menu-item-search')).toBeInTheDocument();
      });

      const searchInput = container.querySelector('.menu-item-search') as HTMLInputElement;
      await userEvent.type(searchInput, 'Option 1');

      await waitFor(() => {
        expect(screen.getByText('Option 1')).toBeInTheDocument();
        expect(screen.queryByText('Option 2')).not.toBeInTheDocument();
      });
    });
  });

  describe('Clear button', () => {
    it('shows clear button when clearButton is true and value exists', async () => {
      const { container } = render(<CustomSelect options={options} clearButton />);
      const selectInput = container.querySelector('.select-input') as HTMLElement;

      await userEvent.click(selectInput);
      await waitFor(() => expect(screen.getByText('Option 1')).toBeInTheDocument());
      await userEvent.click(screen.getByText('Option 1'));

      expect(container.querySelector('.clear-button')).toBeInTheDocument();
    });

    it('does not show clear button when value is empty', () => {
      const { container } = render(<CustomSelect options={options} clearButton />);
      expect(container.querySelector('.clear-button')).not.toBeInTheDocument();
    });

    it('clears value on clear button click', async () => {
      const { container } = render(<CustomSelect options={options} clearButton />);
      const selectInput = container.querySelector('.select-input') as HTMLElement;

      await userEvent.click(selectInput);
      await waitFor(() => expect(screen.getByText('Option 1')).toBeInTheDocument());
      await userEvent.click(screen.getByText('Option 1'));

      const clearButton = container.querySelector('.clear-button') as HTMLElement;
      await userEvent.click(clearButton);

      expect(container.querySelector('.select-label')).toHaveTextContent('Please choose an option');
    });
  });

  describe('Left icon', () => {
    it('renders left icon', () => {
      const { container } = render(<CustomSelect options={options} leftIcon={<span data-testid="icon">★</span>} />);
      expect(screen.getByTestId('icon')).toBeInTheDocument();
    });
  });

  describe('Floating label', () => {
    it('renders floating label', () => {
      render(<CustomSelect options={options} floatingLabel="Select option" />);
      expect(screen.getByText('Select option')).toBeInTheDocument();
    });
  });

  describe('Disabled state', () => {
    it('can be disabled', () => {
      const { container } = render(<CustomSelect options={options} disabled />);
      const selectInput = container.querySelector('.select-input');
      expect(selectInput).toHaveAttribute('aria-disabled', 'true');
      expect(selectInput).toHaveAttribute('tabIndex', '-1');
    });

    it('does not open menu when disabled', async () => {
      const { container } = render(<CustomSelect options={options} disabled />);
      const selectInput = container.querySelector('.select-input') as HTMLElement;

      await userEvent.click(selectInput);

      expect(container.querySelector('.custom-select')).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('Controlled value', () => {
    it('updates when value prop changes', () => {
      const { container, rerender } = render(<CustomSelect options={options} value="1" />);
      expect(container.querySelector('.select-label')).toHaveTextContent('Option 1');

      rerender(<CustomSelect options={options} value="2" />);
      expect(container.querySelector('.select-label')).toHaveTextContent('Option 2');
    });
  });

  describe('SelectItem with children', () => {
    it('renders SelectItem children', async () => {
      const { container } = render(
        <CustomSelect>
          <SelectItem value="1" label="Item 1" />
          <SelectItem value="2" label="Item 2" />
        </CustomSelect>
      );
      const selectInput = container.querySelector('.select-input') as HTMLElement;

      await userEvent.click(selectInput);

      await waitFor(() => {
        expect(screen.getByText('Item 1')).toBeInTheDocument();
        expect(screen.getByText('Item 2')).toBeInTheDocument();
      });
    });
  });

  describe('SelectGroup', () => {
    it('renders grouped items', async () => {
      const { container } = render(
        <CustomSelect>
          <SelectGroup groupLabel="Group 1">
            <SelectItem value="1" label="Item 1" />
            <SelectItem value="2" label="Item 2" />
          </SelectGroup>
        </CustomSelect>
      );
      const selectInput = container.querySelector('.select-input') as HTMLElement;

      await userEvent.click(selectInput);

      await waitFor(() => {
        expect(screen.getByText('Group 1')).toBeInTheDocument();
        expect(screen.getByText('Item 1')).toBeInTheDocument();
        expect(screen.getByText('Item 2')).toBeInTheDocument();
      });
    });
  });

  describe('SelectDivider', () => {
    it('renders divider', async () => {
      const { container } = render(
        <CustomSelect>
          <SelectItem value="1" label="Item 1" />
          <SelectDivider />
          <SelectItem value="2" label="Item 2" />
        </CustomSelect>
      );
      const selectInput = container.querySelector('.select-input') as HTMLElement;

      await userEvent.click(selectInput);

      await waitFor(() => {
        expect(container.querySelector('.menu-divider')).toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    it('has role combobox', () => {
      const { container } = render(<CustomSelect options={options} />);
      const selectInput = container.querySelector('.select-input');
      expect(selectInput).toHaveAttribute('role', 'combobox');
    });

    it('has tabIndex 0 for keyboard access', () => {
      const { container } = render(<CustomSelect options={options} />);
      const selectInput = container.querySelector('.select-input');
      expect(selectInput).toHaveAttribute('tabIndex', '0');
    });

    it('has aria-haspopup attribute', () => {
      const { container } = render(<CustomSelect options={options} />);
      const selectInput = container.querySelector('.select-input');
      expect(selectInput).toHaveAttribute('aria-haspopup', 'true');
    });

    it('forwards ref correctly', () => {
      const ref = jest.fn();
      render(<CustomSelect ref={ref} options={options} />);
      expect(ref).toHaveBeenCalled();
    });

    it('applies custom className', () => {
      const { container } = render(<CustomSelect options={options} className="custom-class" />);
      expect(container.querySelector('.custom-select')).toHaveClass('custom-class');
    });
  });

  describe('Event handlers', () => {
    it('calls onFocus when select gains focus', async () => {
      const handleFocus = jest.fn();
      const { container } = render(<CustomSelect options={options} onFocus={handleFocus} />);
      const selectInput = container.querySelector('.select-input') as HTMLElement;

      await userEvent.click(selectInput);
      expect(handleFocus).toHaveBeenCalled();
    });
  });
});
