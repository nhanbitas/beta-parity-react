import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Form, FormBlock, FormCol, FormControl, FormControlLabel } from '../index';

describe('Form Components', () => {
  // Test basic Form component
  test('renders Form with correct class', () => {
    render(<Form>Form Content</Form>);

    const form = screen.getByText('Form Content').closest('form');
    expect(form).toBeInTheDocument();
    expect(form).toHaveClass('form');
  });

  test('handles form events', () => {
    const handleSubmit = jest.fn((e) => e.preventDefault());
    render(
      <Form onSubmit={handleSubmit}>
        <button type='submit'>Submit</button>
      </Form>
    );

    fireEvent.submit(screen.getByRole('button'));
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  test('applies custom className to Form', () => {
    render(<Form className='custom-form'>Form Content</Form>);

    const form = screen.getByText('Form Content').closest('form');
    expect(form).toHaveClass('form', 'custom-form');
  });

  // Test FormBlock component
  test('renders FormBlock with correct class', () => {
    render(<FormBlock>Block Content</FormBlock>);

    const block = screen.getByText('Block Content');
    expect(block.closest('div')).toHaveClass('form-block');
  });

  test('applies custom className to FormBlock', () => {
    render(<FormBlock className='custom-block'>Block Content</FormBlock>);

    const block = screen.getByText('Block Content').closest('div');
    expect(block).toHaveClass('form-block', 'custom-block');
  });

  // Test FormCol component
  test('renders FormCol with correct class', () => {
    render(<FormCol>Column Content</FormCol>);

    const col = screen.getByText('Column Content');
    expect(col.closest('div')).toHaveClass('form-col');
  });

  test('applies custom className to FormCol', () => {
    render(<FormCol className='custom-col'>Column Content</FormCol>);

    const col = screen.getByText('Column Content').closest('div');
    expect(col).toHaveClass('form-col', 'custom-col');
  });

  // Test FormControlLabel component
  test('renders FormControlLabel with correct class', () => {
    render(<FormControlLabel>Label Content</FormControlLabel>);

    const label = screen.getByText('Label Content');
    expect(label).toHaveClass('form-control-label');
    expect(label.tagName).toBe('LABEL');
  });

  test('applies custom className to FormControlLabel', () => {
    render(<FormControlLabel className='custom-label'>Label Content</FormControlLabel>);

    const label = screen.getByText('Label Content');
    expect(label).toHaveClass('form-control-label', 'custom-label');
  });

  // Test FormControl component
  test('renders FormControl with correct class', () => {
    render(<FormControl>Control Content</FormControl>);

    const control = screen.getByText('Control Content');
    expect(control.closest('div')).toHaveClass('form-control');
  });

  test('applies custom className to FormControl', () => {
    render(<FormControl className='custom-control'>Control Content</FormControl>);

    const control = screen.getByText('Control Content').closest('div');
    expect(control).toHaveClass('form-control', 'custom-control');
  });

  test('passes additional attributes to all form components', () => {
    render(
      <>
        <Form data-testid='test-form'>Form</Form>
        <FormBlock data-testid='test-block'>Block</FormBlock>
        <FormCol data-testid='test-col'>Column</FormCol>
        <FormControlLabel data-testid='test-label'>Label</FormControlLabel>
        <FormControl data-testid='test-control'>Control</FormControl>
      </>
    );

    expect(screen.getByTestId('test-form')).toBeInTheDocument();
    expect(screen.getByTestId('test-block')).toBeInTheDocument();
    expect(screen.getByTestId('test-col')).toBeInTheDocument();
    expect(screen.getByTestId('test-label')).toBeInTheDocument();
    expect(screen.getByTestId('test-control')).toBeInTheDocument();
  });
});

// Test complete form structure
describe('Complete Form Structure', () => {
  test('renders nested form structure correctly', () => {
    render(
      <Form>
        <FormBlock>
          <FormControl>
            <FormControlLabel htmlFor='name'>Name</FormControlLabel>
            <FormCol>
              <input id='name' data-testid='name-input' />
            </FormCol>
          </FormControl>

          <FormControl>
            <FormControlLabel htmlFor='email'>Email</FormControlLabel>
            <FormCol>
              <input id='email' data-testid='email-input' />
            </FormCol>
          </FormControl>
        </FormBlock>

        <button type='submit'>Submit</button>
      </Form>
    );

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByTestId('name-input')).toBeInTheDocument();
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
