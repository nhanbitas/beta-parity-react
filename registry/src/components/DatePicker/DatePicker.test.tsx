import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DatePicker } from './index';

describe('DatePicker Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders correctly', () => {
      const { container } = render(<DatePicker />);
      expect(container.querySelector('.datepicker')).toBeInTheDocument();
    });

    it('renders with floating label', () => {
      render(<DatePicker floatingLabel='Select Date' />);
      expect(screen.getByText('Select Date')).toBeInTheDocument();
    });

    it('renders with placeholder', () => {
      render(<DatePicker placeholder='Choose a date' />);
      expect(screen.getByPlaceholderText('Choose a date')).toBeInTheDocument();
    });

    it('renders with default placeholder when not provided', () => {
      render(<DatePicker />);
      expect(screen.getByPlaceholderText('Select date...')).toBeInTheDocument();
    });

    it('renders calendar icon by default', () => {
      const { container } = render(<DatePicker />);
      expect(container.querySelector('.datepicker-calendar-icon')).toBeInTheDocument();
    });

    it('renders custom icon', () => {
      const { container } = render(<DatePicker icon={<span data-testid='custom-icon'>🗓️</span>} />);
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });
  });

  describe('Theme variants', () => {
    it('applies default theme', () => {
      const { container } = render(<DatePicker />);
      expect(container.querySelector('.datepicker')).toHaveClass('default');
    });

    it('applies alternative theme', () => {
      const { container } = render(<DatePicker theme='alternative' />);
      expect(container.querySelector('.datepicker')).toHaveClass('alternative');
    });
  });

  describe('Icon positioning', () => {
    it('applies left icon position by default', () => {
      const { container } = render(<DatePicker />);
      expect(container.querySelector('.datepicker-calendar-icon')).toHaveClass('icon-position-left');
    });

    it('applies right icon position', () => {
      const { container } = render(<DatePicker sideIcon='right' />);
      expect(container.querySelector('.datepicker-calendar-icon')).toHaveClass('icon-position-right');
    });
  });

  describe('States', () => {
    it('renders disabled state', () => {
      const { container } = render(<DatePicker disabled />);
      const input = container.querySelector('input');
      expect(input).toBeDisabled();
    });

    it('renders error state', () => {
      const { container } = render(<DatePicker isError />);
      expect(container.querySelector('.datepicker')).toHaveClass('error');
    });

    it('renders with error message', () => {
      render(<DatePicker isError errorMessage='Invalid date' />);
      expect(screen.getByText('Invalid date')).toBeInTheDocument();
    });

    it('renders required state', () => {
      const { container } = render(<DatePicker required />);
      const input = container.querySelector('input');
      expect(input).toBeRequired();
    });
  });

  describe('Locale support', () => {
    it('uses default locale', () => {
      render(<DatePicker />);
      const { container } = render(<DatePicker />);
      expect(container.querySelector('.datepicker')).toBeInTheDocument();
    });

    it('applies vn locale', () => {
      render(<DatePicker locale='vn' />);
      const { container } = render(<DatePicker locale='vn' />);
      expect(container.querySelector('.datepicker')).toBeInTheDocument();
    });

    it('applies zh-cn locale', () => {
      render(<DatePicker locale='zh-cn' />);
      const { container } = render(<DatePicker locale='zh-cn' />);
      expect(container.querySelector('.datepicker')).toBeInTheDocument();
    });
  });

  describe('Flatpickr options', () => {
    it('applies options via options prop', () => {
      render(<DatePicker options={{ enableTime: true }} />);
      const { container } = render(<DatePicker options={{ enableTime: true }} />);
      expect(container.querySelector('.datepicker')).toBeInTheDocument();
    });

    it('disables specific dates', () => {
      const disabledDates = [new Date('2024-06-15')];
      render(<DatePicker options={{ disable: disabledDates }} />);
      const { container } = render(<DatePicker options={{ disable: disabledDates }} />);
      expect(container.querySelector('.datepicker')).toBeInTheDocument();
    });

    it('sets min/max dates', () => {
      const minDate = new Date('2024-01-01');
      const maxDate = new Date('2024-12-31');
      render(<DatePicker options={{ minDate, maxDate }} />);
      const { container } = render(<DatePicker options={{ minDate, maxDate }} />);
      expect(container.querySelector('.datepicker')).toBeInTheDocument();
    });

    it('enables range mode', () => {
      render(<DatePicker options={{ mode: 'range' }} />);
      const { container } = render(<DatePicker options={{ mode: 'range' }} />);
      expect(container.querySelector('.datepicker')).toBeInTheDocument();
    });

    it('enables week numbers', () => {
      render(<DatePicker options={{ weekNumbers: true }} />);
      const { container } = render(<DatePicker options={{ weekNumbers: true }} />);
      expect(container.querySelector('.datepicker')).toBeInTheDocument();
    });
  });

  describe('Callbacks', () => {
    it('calls onChange when date is selected', async () => {
      const handleChange = jest.fn();
      const { container } = render(<DatePicker onChange={handleChange} />);

      const input = container.querySelector('input') as HTMLInputElement;
      await userEvent.click(input);
    });

    it('calls onOpen when calendar opens', async () => {
      const handleOpen = jest.fn();
      const { container } = render(<DatePicker onOpen={handleOpen} />);

      const input = container.querySelector('input') as HTMLInputElement;
      await userEvent.click(input);
    });

    it('calls onClose when calendar closes', () => {
      const handleClose = jest.fn();
      render(<DatePicker onClose={handleClose} />);
    });

    it('calls onFocus when input gains focus', async () => {
      const handleFocus = jest.fn();
      const { container } = render(<DatePicker onFocus={handleFocus} />);

      const input = container.querySelector('input') as HTMLInputElement;
      await userEvent.click(input);

      expect(handleFocus).toHaveBeenCalled();
    });

    it('calls onBlur when input loses focus', async () => {
      const handleBlur = jest.fn();
      const { container } = render(<DatePicker onBlur={handleBlur} />);

      const input = container.querySelector('input') as HTMLInputElement;
      await userEvent.click(input);
      await userEvent.tab();

      expect(handleBlur).toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('has proper aria-label with floating label', () => {
      const { container } = render(<DatePicker floatingLabel='Birth Date' />);
      const input = container.querySelector('input');
      expect(input).toBeInTheDocument();
    });

    it('has proper aria-required', () => {
      const { container } = render(<DatePicker required />);
      const input = container.querySelector('input');
      expect(input).toBeRequired();
    });

    it('has proper aria-invalid when error', () => {
      const { container } = render(<DatePicker isError />);
      const input = container.querySelector('input');
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    it('associates error message with input', () => {
      const { container } = render(<DatePicker isError errorMessage='Invalid date' />);
      const input = container.querySelector('input');
      const errorId = input?.getAttribute('aria-describedby');

      if (errorId) {
        const errorElement = container.querySelector(`#${errorId}`);
        expect(errorElement).toHaveTextContent('Invalid date');
      }
    });
  });

  describe('Calendar header', () => {
    it('renders calendar header wrapper', () => {
      const { container } = render(<DatePicker />);
      expect(container.querySelector('.datepicker-calendar-header')).toBeInTheDocument();
    });

    it('renders custom calendar header', () => {
      render(<DatePicker calenderHeader={<div data-testid='custom-header'>Header</div>} />);
      expect(screen.getByTestId('custom-header')).toBeInTheDocument();
    });

    it('renders with custom className', () => {
      const { container } = render(<DatePicker className='custom-picker' />);
      expect(container.querySelector('.datepicker')).toHaveClass('custom-picker');
    });
  });

  describe('Input integration', () => {
    it('forwards ref to input element', () => {
      const ref = { current: null };
      render(<DatePicker ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });

    it('applies custom input props', () => {
      const { container } = render(<DatePicker data-testid='date-input' />);
      const input = container.querySelector('input');
      expect(input).toHaveAttribute('data-testid', 'date-input');
    });

    it('handles clear button', () => {
      const { container } = render(<DatePicker />);
      const clearButton = container.querySelector('[data-clear]');
      expect(clearButton).toBeInTheDocument();
    });
  });

  describe('Size variants', () => {
    it('applies default medium size', () => {
      const { container } = render(<DatePicker />);
      expect(container.querySelector('.datepicker')).toHaveClass('size-md');
    });

    it('applies small size', () => {
      const { container } = render(<DatePicker inputSize='sm' />);
      expect(container.querySelector('.datepicker')).toHaveClass('size-sm');
    });
  });

  describe('Color variants', () => {
    it('renders with default neutral color', () => {
      const { container } = render(<DatePicker />);
      expect(container.querySelector('.datepicker')).toHaveClass('neutral');
    });

    it('renders with accent color', () => {
      const { container } = render(<DatePicker color='accent' />);
      expect(container.querySelector('.datepicker')).toHaveClass('accent');
    });
  });

  describe('Wrapper props', () => {
    it('applies custom wrapper className', () => {
      const { container } = render(<DatePicker wrapperProps={{ className: 'custom-wrapper' }} />);
      expect(container.querySelector('.custom-wrapper')).toBeInTheDocument();
    });

    it('applies custom wrapper props', () => {
      const { container } = render(<DatePicker wrapperProps={{ 'data-testid': 'wrapper' } as any} />);
      expect(container.querySelector('[data-testid="wrapper"]')).toBeInTheDocument();
    });
  });
});
