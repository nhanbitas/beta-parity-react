import { render, screen } from '@testing-library/react';
import { Form, FormBlock, FormCol, FormControlLabel, FormControl } from './index';

describe('Form Components', () => {
  describe('Form Component', () => {
    it('renders correctly', () => {
      const { container } = render(<Form>Form content</Form>);
      expect(container.querySelector('.form')).toBeInTheDocument();
    });

    it('renders with children', () => {
      render(<Form>Form children</Form>);
      expect(screen.getByText('Form children')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(<Form className='custom-form'>Content</Form>);
      expect(container.querySelector('.form')).toHaveClass('custom-form');
    });

    it('forwards ref correctly', () => {
      const ref = jest.fn();
      render(<Form ref={ref}>Content</Form>);
      expect(ref).toHaveBeenCalled();
    });

    it('spreads additional props', () => {
      render(<Form data-testid='test-form'>Content</Form>);
      expect(screen.getByTestId('test-form')).toBeInTheDocument();
    });

    it('handles form submission', () => {
      const handleSubmit = jest.fn((e) => e.preventDefault());
      render(<Form onSubmit={handleSubmit}>Content</Form>);

      const form = screen.getByText('Content').closest('form');
      form?.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));

      expect(handleSubmit).toHaveBeenCalled();
    });
  });

  describe('FormBlock Component', () => {
    it('renders correctly', () => {
      const { container } = render(<FormBlock>Block content</FormBlock>);
      expect(container.querySelector('.form-block')).toBeInTheDocument();
    });

    it('renders with children', () => {
      render(<FormBlock>Block children</FormBlock>);
      expect(screen.getByText('Block children')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(<FormBlock className='custom-block'>Content</FormBlock>);
      expect(container.querySelector('.form-block')).toHaveClass('custom-block');
    });

    it('forwards ref correctly', () => {
      const ref = jest.fn();
      render(<FormBlock ref={ref}>Content</FormBlock>);
      expect(ref).toHaveBeenCalled();
    });

    it('spreads additional props', () => {
      render(<FormBlock data-testid='test-block'>Content</FormBlock>);
      expect(screen.getByTestId('test-block')).toBeInTheDocument();
    });
  });

  describe('FormCol Component', () => {
    it('renders correctly', () => {
      const { container } = render(<FormCol>Col content</FormCol>);
      expect(container.querySelector('.form-col')).toBeInTheDocument();
    });

    it('renders with children', () => {
      render(<FormCol>Col children</FormCol>);
      expect(screen.getByText('Col children')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(<FormCol className='custom-col'>Content</FormCol>);
      expect(container.querySelector('.form-col')).toHaveClass('custom-col');
    });

    it('forwards ref correctly', () => {
      const ref = jest.fn();
      render(<FormCol ref={ref}>Content</FormCol>);
      expect(ref).toHaveBeenCalled();
    });

    it('spreads additional props', () => {
      render(<FormCol data-testid='test-col'>Content</FormCol>);
      expect(screen.getByTestId('test-col')).toBeInTheDocument();
    });
  });

  describe('FormControlLabel Component', () => {
    it('renders correctly', () => {
      const { container } = render(<FormControlLabel>Label content</FormControlLabel>);
      expect(container.querySelector('.form-control-label')).toBeInTheDocument();
    });

    it('renders with children', () => {
      render(<FormControlLabel>Label children</FormControlLabel>);
      expect(screen.getByText('Label children')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(<FormControlLabel className='custom-label'>Content</FormControlLabel>);
      expect(container.querySelector('.form-control-label')).toHaveClass('custom-label');
    });

    it('forwards ref correctly', () => {
      const ref = jest.fn();
      render(<FormControlLabel ref={ref}>Content</FormControlLabel>);
      expect(ref).toHaveBeenCalled();
    });

    it('spreads additional props', () => {
      render(<FormControlLabel htmlFor='input-id'>Label</FormControlLabel>);
      expect(screen.getByText('Label')).toHaveAttribute('for', 'input-id');
    });
  });

  describe('FormControl Component', () => {
    it('renders correctly', () => {
      const { container } = render(<FormControl>Control content</FormControl>);
      expect(container.querySelector('.form-control')).toBeInTheDocument();
    });

    it('renders with children', () => {
      render(<FormControl>Control children</FormControl>);
      expect(screen.getByText('Control children')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(<FormControl className='custom-control'>Content</FormControl>);
      expect(container.querySelector('.form-control')).toHaveClass('custom-control');
    });

    it('forwards ref correctly', () => {
      const ref = jest.fn();
      render(<FormControl ref={ref}>Content</FormControl>);
      expect(ref).toHaveBeenCalled();
    });

    it('accepts ratio prop', () => {
      render(<FormControl ratio='1:1'>Content</FormControl>);
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('accepts control prop', () => {
      render(<FormControl control={2}>Content</FormControl>);
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('spreads additional props', () => {
      render(<FormControl data-testid='test-control'>Content</FormControl>);
      expect(screen.getByTestId('test-control')).toBeInTheDocument();
    });
  });

  describe('Composition', () => {
    it('renders nested form structure', () => {
      render(
        <Form>
          <FormBlock>
            <FormCol>
              <FormControlLabel>Username</FormControlLabel>
              <FormControl>
                <input type='text' />
              </FormControl>
            </FormCol>
          </FormBlock>
        </Form>
      );

      expect(screen.getByText('Username')).toBeInTheDocument();
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('renders multiple form blocks', () => {
      render(
        <Form>
          <FormBlock>Block 1</FormBlock>
          <FormBlock>Block 2</FormBlock>
        </Form>
      );

      expect(screen.getByText('Block 1')).toBeInTheDocument();
      expect(screen.getByText('Block 2')).toBeInTheDocument();
    });

    it('renders multiple form columns', () => {
      render(
        <FormBlock>
          <FormCol>Column 1</FormCol>
          <FormCol>Column 2</FormCol>
        </FormBlock>
      );

      expect(screen.getByText('Column 1')).toBeInTheDocument();
      expect(screen.getByText('Column 2')).toBeInTheDocument();
    });
  });
});
