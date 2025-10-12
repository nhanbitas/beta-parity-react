import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Slider } from './index';

describe('Slider Component', () => {
  describe('Rendering', () => {
    it('renders correctly', () => {
      const { container } = render(<Slider />);
      expect(container.querySelector('.slider')).toBeInTheDocument();
    });

    it('renders with track', () => {
      const { container } = render(<Slider />);
      expect(container.querySelector('.slider-track')).toBeInTheDocument();
    });

    it('renders with progress bar', () => {
      const { container } = render(<Slider />);
      expect(container.querySelector('.slider-progress')).toBeInTheDocument();
    });

    it('renders input range', () => {
      const { container } = render(<Slider />);
      expect(container.querySelector('.par-input-slider')).toBeInTheDocument();
    });
  });

  describe('Mode variants', () => {
    it('renders single mode by default', () => {
      const { container } = render(<Slider />);
      const inputs = container.querySelectorAll('.par-input-slider');
      expect(inputs.length).toBe(1);
    });

    it('renders range mode', () => {
      const { container } = render(<Slider mode="range" />);
      const inputs = container.querySelectorAll('.par-input-slider');
      expect(inputs.length).toBe(2);
    });

    it('applies range class in range mode', () => {
      const { container } = render(<Slider mode="range" />);
      expect(container.querySelector('.slider')).toHaveClass('slider-range');
    });
  });

  describe('Orientation variants', () => {
    it('renders horizontal orientation by default', () => {
      const { container } = render(<Slider />);
      expect(container.querySelector('.slider')).not.toHaveClass('slider-vertical');
    });

    it('renders vertical orientation', () => {
      const { container } = render(<Slider orientation="vertical" />);
      expect(container.querySelector('.slider')).toHaveClass('slider-vertical');
    });
  });

  describe('Color variants', () => {
    it('renders neutral color by default', () => {
      const { container } = render(<Slider />);
      expect(container.querySelector('.slider-progress')).toHaveClass('neutral');
    });

    it('renders accent color', () => {
      const { container } = render(<Slider color="accent" />);
      expect(container.querySelector('.slider-progress')).toHaveClass('accent');
    });
  });

  describe('Value props', () => {
    it('renders with default value in single mode', () => {
      const { container } = render(<Slider defaultValue={50} />);
      const input = container.querySelector('.par-input-slider') as HTMLInputElement;
      expect(input.value).toBe('50');
    });

    it('renders with default value in range mode', () => {
      const { container } = render(<Slider mode="range" defaultValue={[20, 80]} />);
      const inputs = container.querySelectorAll('.par-input-slider') as NodeListOf<HTMLInputElement>;
      expect(inputs[0].value).toBe('20');
      expect(inputs[1].value).toBe('80');
    });

    it('respects min and max props', () => {
      const { container } = render(<Slider min={10} max={90} />);
      const input = container.querySelector('.par-input-slider') as HTMLInputElement;
      expect(input).toHaveAttribute('min', '10');
      expect(input).toHaveAttribute('max', '90');
    });

    it('respects step prop', () => {
      const { container } = render(<Slider step={5} />);
      const input = container.querySelector('.par-input-slider') as HTMLInputElement;
      expect(input).toHaveAttribute('step', '5');
    });
  });

  describe('Indicator variants', () => {
    it('renders normal indicator by default', () => {
      const { container } = render(<Slider />);
      expect(container.querySelector('.slider-thumb-indicator-text')).toBeInTheDocument();
    });

    it('shows value in normal indicator', () => {
      render(<Slider defaultValue={50} />);
      expect(screen.getByText('50')).toBeInTheDocument();
    });

    it('renders tooltip indicator', () => {
      const { container } = render(<Slider indicator="tooltip" />);
      expect(container.querySelector('.indicator-wrapper')).toBeInTheDocument();
    });
  });

  describe('Indicator side', () => {
    it('renders normal indicator side by default', () => {
      const { container } = render(<Slider />);
      expect(container.querySelector('.indicator-wrapper')).toHaveClass('normal');
    });

    it('renders reverse indicator side', () => {
      const { container } = render(<Slider indicatorSide="reverse" />);
      expect(container.querySelector('.indicator-wrapper')).toHaveClass('reverse');
    });
  });

  describe('Marks', () => {
    const marks = [
      { value: 0, label: 'Start' },
      { value: 50, label: 'Middle' },
      { value: 100, label: 'End' }
    ];

    it('renders marks', () => {
      render(<Slider marks={marks} />);
      expect(screen.getByText('Start')).toBeInTheDocument();
      expect(screen.getByText('Middle')).toBeInTheDocument();
      expect(screen.getByText('End')).toBeInTheDocument();
    });

    it('renders mark dots', () => {
      const { container } = render(<Slider marks={marks} />);
      expect(container.querySelector('.slider-dot')).toBeInTheDocument();
    });

    it('does not render dots for min/max marks', () => {
      const { container } = render(<Slider marks={marks} min={0} max={100} />);
      const dots = container.querySelectorAll('.slider-dot');
      expect(dots.length).toBe(1);
    });
  });

  describe('Interactions', () => {
    it('updates value on change in single mode', async () => {
      const handleChange = jest.fn();
      const { container } = render(<Slider onValueChange={handleChange} />);
      const input = container.querySelector('.par-input-slider') as HTMLInputElement;

      await userEvent.clear(input);
      await userEvent.type(input, '75');

      expect(handleChange).toHaveBeenCalled();
    });

    it('updates value on change in range mode', async () => {
      const handleChange = jest.fn();
      const { container } = render(<Slider mode="range" onValueChange={handleChange} />);
      const inputs = container.querySelectorAll('.par-input-slider') as NodeListOf<HTMLInputElement>;

      await userEvent.clear(inputs[0]);
      await userEvent.type(inputs[0], '25');

      expect(handleChange).toHaveBeenCalled();
    });

    it('prevents min value from exceeding max value in range mode', async () => {
      const { container } = render(<Slider mode="range" defaultValue={[30, 70]} />);
      const inputs = container.querySelectorAll('.par-input-slider') as NodeListOf<HTMLInputElement>;

      expect(Number(inputs[0].value)).toBeLessThan(Number(inputs[1].value));
    });
  });

  describe('Disabled state', () => {
    it('disables slider', () => {
      const { container } = render(<Slider disabled />);
      expect(container.querySelector('.slider')).toHaveClass('slider-disabled');
    });

    it('disables input when disabled', () => {
      const { container } = render(<Slider disabled />);
      const input = container.querySelector('.par-input-slider') as HTMLInputElement;
      expect(input).toBeDisabled();
    });

    it('disables all inputs in range mode', () => {
      const { container } = render(<Slider mode="range" disabled />);
      const inputs = container.querySelectorAll('.par-input-slider') as NodeListOf<HTMLInputElement>;
      inputs.forEach((input) => {
        expect(input).toBeDisabled();
      });
    });

    it('has tabIndex -1 when disabled', () => {
      const { container } = render(<Slider disabled />);
      const input = container.querySelector('.par-input-slider') as HTMLInputElement;
      expect(input).toHaveAttribute('tabIndex', '-1');
    });
  });

  describe('Accessibility', () => {
    it('input has type range', () => {
      const { container } = render(<Slider />);
      const input = container.querySelector('.par-input-slider') as HTMLInputElement;
      expect(input).toHaveAttribute('type', 'range');
    });

    it('forwards ref correctly', () => {
      const ref = jest.fn();
      render(<Slider ref={ref} />);
      expect(ref).toHaveBeenCalled();
    });

    it('applies custom className', () => {
      const { container } = render(<Slider className="custom-slider" />);
      expect(container.querySelector('.slider')).toHaveClass('custom-slider');
    });
  });
});
