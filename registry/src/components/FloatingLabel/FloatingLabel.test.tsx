import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FloatingLabel, ContainedLabel } from './index';

describe('FloatingLabel Components', () => {
  describe('ContainedLabel Component', () => {
    it('renders correctly', () => {
      render(<ContainedLabel>Label text</ContainedLabel>);
      expect(screen.getByText('Label text')).toBeInTheDocument();
    });

    it('applies active class when isActive is true', () => {
      const { container } = render(<ContainedLabel isActive>Label</ContainedLabel>);
      expect(container.querySelector('.floating-label')).toHaveClass('active');
    });

    it('does not apply active class when isActive is false', () => {
      const { container } = render(<ContainedLabel isActive={false}>Label</ContainedLabel>);
      expect(container.querySelector('.floating-label')).not.toHaveClass('active');
    });

    it('applies custom className', () => {
      const { container } = render(<ContainedLabel className='custom-label'>Label</ContainedLabel>);
      expect(container.querySelector('.floating-label')).toHaveClass('custom-label');
    });

    it('forwards ref correctly', () => {
      const ref = jest.fn();
      render(<ContainedLabel ref={ref}>Label</ContainedLabel>);
      expect(ref).toHaveBeenCalled();
    });
  });

  describe('FloatingLabel Component', () => {
    describe('Rendering', () => {
      it('renders correctly with label and input', () => {
        render(
          <FloatingLabel label='Email'>
            <input type='text' />
          </FloatingLabel>
        );
        expect(screen.getByText('Email')).toBeInTheDocument();
        expect(screen.getByRole('textbox')).toBeInTheDocument();
      });

      it('renders with custom className', () => {
        const { container } = render(
          <FloatingLabel label='Name' className='custom-floating'>
            <input type='text' />
          </FloatingLabel>
        );
        expect(container.querySelector('.floating-label')).toHaveClass('custom-floating');
      });

      it('renders with wrapper className', () => {
        const { container } = render(
          <FloatingLabel label='Name' wrapperClassname='custom-wrapper'>
            <input type='text' />
          </FloatingLabel>
        );
        expect(container.querySelector('.floating-label-wrapper')).toHaveClass('custom-wrapper');
      });

      it('renders label as React node', () => {
        render(
          <FloatingLabel label={<span data-testid='custom-label'>Custom Label</span>}>
            <input type='text' />
          </FloatingLabel>
        );
        expect(screen.getByTestId('custom-label')).toBeInTheDocument();
      });
    });

    describe('Label activation', () => {
      it('activates label on input focus', async () => {
        const { container } = render(
          <FloatingLabel label='Email'>
            <input type='text' />
          </FloatingLabel>
        );

        const input = screen.getByRole('textbox');
        await userEvent.click(input);

        expect(container.querySelector('.floating-label')).toHaveClass('active');
      });

      it('deactivates label on blur when input is empty', async () => {
        const { container } = render(
          <FloatingLabel label='Email'>
            <input type='text' />
          </FloatingLabel>
        );

        const input = screen.getByRole('textbox');
        await userEvent.click(input);
        expect(container.querySelector('.floating-label')).toHaveClass('active');

        input.blur();
        expect(container.querySelector('.floating-label')).not.toHaveClass('active');
      });

      it('keeps label active on blur when input has value', async () => {
        const { container } = render(
          <FloatingLabel label='Email'>
            <input type='text' />
          </FloatingLabel>
        );

        const input = screen.getByRole('textbox');
        await userEvent.type(input, 'test@example.com');
        input.blur();

        expect(container.querySelector('.floating-label')).toHaveClass('active');
      });

      it('activates label when input has initial value', async () => {
        const { container } = render(
          <FloatingLabel label='Email'>
            <input type='text' defaultValue='test@example.com' />
          </FloatingLabel>
        );

        const input = screen.getByRole('textbox');
        await userEvent.click(input);
        input.blur();

        expect(container.querySelector('.floating-label')).toHaveClass('active');
      });
    });

    describe('Input value handling', () => {
      it('updates internal value state on input change', async () => {
        render(
          <FloatingLabel label='Email'>
            <input type='text' />
          </FloatingLabel>
        );

        const input = screen.getByRole('textbox');
        await userEvent.type(input, 'test');

        expect(input).toHaveValue('test');
      });

      it('preserves original onChange handler', async () => {
        const handleChange = jest.fn();
        render(
          <FloatingLabel label='Email'>
            <input type='text' onChange={handleChange} />
          </FloatingLabel>
        );

        await userEvent.type(screen.getByRole('textbox'), 'a');
        expect(handleChange).toHaveBeenCalled();
      });

      it('preserves original onFocus handler', async () => {
        const handleFocus = jest.fn();
        render(
          <FloatingLabel label='Email'>
            <input type='text' onFocus={handleFocus} />
          </FloatingLabel>
        );

        await userEvent.click(screen.getByRole('textbox'));
        expect(handleFocus).toHaveBeenCalled();
      });

      it('preserves original onBlur handler', async () => {
        const handleBlur = jest.fn();
        render(
          <FloatingLabel label='Email'>
            <input type='text' onBlur={handleBlur} />
          </FloatingLabel>
        );

        const input = screen.getByRole('textbox');
        await userEvent.click(input);
        input.blur();
        expect(handleBlur).toHaveBeenCalled();
      });
    });

    describe('Multiple children', () => {
      it('handles multiple input children', () => {
        render(
          <FloatingLabel label='Full Name'>
            <input type='text' placeholder='First' />
            <input type='text' placeholder='Last' />
          </FloatingLabel>
        );

        expect(screen.getByPlaceholderText('First')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Last')).toBeInTheDocument();
      });

      it('handles non-input children', () => {
        render(
          <FloatingLabel label='Content'>
            <div>Some content</div>
          </FloatingLabel>
        );

        expect(screen.getByText('Some content')).toBeInTheDocument();
      });
    });

    describe('Accessibility', () => {
      it('forwards ref correctly', () => {
        const ref = jest.fn();
        render(
          <FloatingLabel ref={ref} label='Email'>
            <input type='text' />
          </FloatingLabel>
        );
        expect(ref).toHaveBeenCalled();
      });

      it('spreads additional props', () => {
        const { container } = render(
          <FloatingLabel label='Email' data-testid='floating-wrapper'>
            <input type='text' />
          </FloatingLabel>
        );
        expect(container.querySelector('.floating-label-wrapper')).toHaveAttribute('data-testid', 'floating-wrapper');
      });
    });
  });
});
