import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Radio, RadioGroup } from './index';

describe('Radio Component', () => {
  describe('Rendering', () => {
    it('renders correctly', () => {
      render(<Radio value="option1" />);
      expect(screen.getByRole('radio')).toBeInTheDocument();
    });

    it('renders with label', () => {
      render(<Radio value="option1" label="Option 1" />);
      expect(screen.getByText('Option 1')).toBeInTheDocument();
    });

    it('renders with sublabel', () => {
      render(<Radio value="option1" label="Main" sublabel="Additional info" />);
      expect(screen.getByText('Additional info')).toBeInTheDocument();
    });

    it('renders label as React node', () => {
      render(<Radio value="option1" label={<span data-testid="custom-label">Custom</span>} />);
      expect(screen.getByTestId('custom-label')).toBeInTheDocument();
    });

    it('does not render label wrapper when no label or sublabel', () => {
      const { container } = render(<Radio value="option1" />);
      expect(container.querySelector('.input-label-wrapper')).not.toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('can be checked', async () => {
      render(<Radio value="option1" name="test" />);
      const radio = screen.getByRole('radio') as HTMLInputElement;

      await userEvent.click(radio);
      expect(radio.checked).toBe(true);
    });

    it('calls onChange when clicked', async () => {
      const handleChange = jest.fn();
      render(<Radio value="option1" name="test" onChange={handleChange} />);

      await userEvent.click(screen.getByRole('radio'));
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('does not toggle when disabled', async () => {
      const handleChange = jest.fn();
      render(<Radio value="option1" name="test" disabled onChange={handleChange} />);

      await userEvent.click(screen.getByRole('radio'));
      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('States', () => {
    it('can be disabled', () => {
      render(<Radio value="option1" disabled />);
      expect(screen.getByRole('radio')).toBeDisabled();
    });

    it('wrapper has aria-disabled when disabled', () => {
      const { container } = render(<Radio value="option1" disabled />);
      expect(container.querySelector('.radio-wrapper')).toHaveAttribute('aria-disabled', 'true');
    });
  });

  describe('Color variants', () => {
    it('renders neutral color by default', () => {
      const { container } = render(<Radio value="option1" />);
      expect(container.querySelector('.par-radio.neutral')).toBeInTheDocument();
    });

    it('renders accent color', () => {
      const { container } = render(<Radio value="option1" color="accent" />);
      expect(container.querySelector('.par-radio.accent')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has type="radio"', () => {
      render(<Radio value="option1" />);
      expect(screen.getByRole('radio')).toHaveAttribute('type', 'radio');
    });

    it('forwards ref correctly', () => {
      const ref = jest.fn();
      render(<Radio value="option1" ref={ref} />);
      expect(ref).toHaveBeenCalled();
    });

    it('spreads additional props to input', () => {
      render(<Radio value="option1" data-testid="custom-radio" aria-label="Custom" />);
      const radio = screen.getByTestId('custom-radio');
      expect(radio).toHaveAttribute('aria-label', 'Custom');
    });
  });
});

describe('RadioGroup Component', () => {
  describe('Rendering', () => {
    it('renders with children', () => {
      render(
        <RadioGroup name="test">
          <Radio value="1" label="Option 1" />
          <Radio value="2" label="Option 2" />
        </RadioGroup>
      );
      expect(screen.getByLabelText('Option 1')).toBeInTheDocument();
      expect(screen.getByLabelText('Option 2')).toBeInTheDocument();
    });

    it('renders with items prop', () => {
      const items = [
        { value: '1', label: 'Option 1' },
        { value: '2', label: 'Option 2' },
      ];
      render(<RadioGroup name="test" items={items} />);
      expect(screen.getByLabelText('Option 1')).toBeInTheDocument();
      expect(screen.getByLabelText('Option 2')).toBeInTheDocument();
    });

    it('renders with group label', () => {
      render(
        <RadioGroup name="test" label="Choose one">
          <Radio value="1" label="Option 1" />
        </RadioGroup>
      );
      expect(screen.getByText('Choose one')).toBeInTheDocument();
    });

    it('assigns name to all radios', () => {
      render(
        <RadioGroup name="group1">
          <Radio value="1" label="Option 1" />
          <Radio value="2" label="Option 2" />
        </RadioGroup>
      );
      const radios = screen.getAllByRole('radio');
      radios.forEach(radio => {
        expect(radio).toHaveAttribute('name', 'group1');
      });
    });
  });

  describe('Selection behavior', () => {
    it('only one radio can be selected at a time', async () => {
      render(
        <RadioGroup name="test">
          <Radio value="1" label="Option 1" />
          <Radio value="2" label="Option 2" />
        </RadioGroup>
      );

      const radio1 = screen.getByLabelText('Option 1') as HTMLInputElement;
      const radio2 = screen.getByLabelText('Option 2') as HTMLInputElement;

      await userEvent.click(radio1);
      expect(radio1.checked).toBe(true);
      expect(radio2.checked).toBe(false);

      await userEvent.click(radio2);
      expect(radio1.checked).toBe(false);
      expect(radio2.checked).toBe(true);
    });

    it('respects defaultValue', () => {
      render(
        <RadioGroup name="test" defaultValue="2">
          <Radio value="1" label="Option 1" />
          <Radio value="2" label="Option 2" />
        </RadioGroup>
      );

      expect((screen.getByLabelText('Option 2') as HTMLInputElement).checked).toBe(true);
    });

    it('works as controlled component with value prop', () => {
      const { rerender } = render(
        <RadioGroup name="test" value="1">
          <Radio value="1" label="Option 1" />
          <Radio value="2" label="Option 2" />
        </RadioGroup>
      );

      expect((screen.getByLabelText('Option 1') as HTMLInputElement).checked).toBe(true);

      rerender(
        <RadioGroup name="test" value="2">
          <Radio value="1" label="Option 1" />
          <Radio value="2" label="Option 2" />
        </RadioGroup>
      );

      expect((screen.getByLabelText('Option 2') as HTMLInputElement).checked).toBe(true);
    });
  });

  describe('onChange callback', () => {
    it('calls onChange with selected value', async () => {
      const handleChange = jest.fn();
      render(
        <RadioGroup name="test" onChange={handleChange}>
          <Radio value="1" label="Option 1" />
          <Radio value="2" label="Option 2" />
        </RadioGroup>
      );

      await userEvent.click(screen.getByLabelText('Option 1'));
      expect(handleChange).toHaveBeenCalledWith('1');

      await userEvent.click(screen.getByLabelText('Option 2'));
      expect(handleChange).toHaveBeenCalledWith('2');
    });

    it('returns numeric values correctly', async () => {
      const handleChange = jest.fn();
      const items = [
        { value: 1, label: 'Option 1' },
        { value: 2, label: 'Option 2' },
      ];
      render(<RadioGroup name="test" items={items} onChange={handleChange} />);

      await userEvent.click(screen.getByLabelText('Option 1'));
      expect(handleChange).toHaveBeenCalledWith('1');
    });
  });

  describe('Disabled state', () => {
    it('disables all radios when disabled prop is true', () => {
      render(
        <RadioGroup name="test" disabled>
          <Radio value="1" label="Option 1" />
          <Radio value="2" label="Option 2" />
        </RadioGroup>
      );

      const radios = screen.getAllByRole('radio');
      radios.forEach(radio => {
        expect(radio).toBeDisabled();
      });
    });

    it('does not call onChange when disabled', async () => {
      const handleChange = jest.fn();
      render(
        <RadioGroup name="test" disabled onChange={handleChange}>
          <Radio value="1" label="Option 1" />
        </RadioGroup>
      );

      await userEvent.click(screen.getByLabelText('Option 1'));
      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('Color variants', () => {
    it('passes color to child radios', () => {
      const { container } = render(
        <RadioGroup name="test" color="accent">
          <Radio value="1" label="Option 1" />
          <Radio value="2" label="Option 2" />
        </RadioGroup>
      );

      const radios = container.querySelectorAll('.par-radio.accent');
      expect(radios.length).toBe(2);
    });
  });

  describe('Accessibility', () => {
    it('forwards ref correctly', () => {
      const ref = jest.fn();
      render(
        <RadioGroup name="test" ref={ref}>
          <Radio value="1" label="Option 1" />
        </RadioGroup>
      );
      expect(ref).toHaveBeenCalled();
    });

    it('applies custom className', () => {
      const { container } = render(
        <RadioGroup name="test" className="custom-class">
          <Radio value="1" label="Option 1" />
        </RadioGroup>
      );
      expect(container.querySelector('.radio-group.custom-class')).toBeInTheDocument();
    });
  });
});
