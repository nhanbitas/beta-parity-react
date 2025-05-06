import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { InlineLink } from '../index';

describe('InlineLink Component', () => {
  test('renders correctly with default props', () => {
    render(<InlineLink href='https://example.com'>Test Link</InlineLink>);

    const link = screen.getByText('Test Link');
    expect(link).toBeInTheDocument();
    expect(link.tagName).toBe('A');
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveClass('inline-link', 'standard', 'medium', 'underline-hover');
    expect(link).not.toHaveClass('icon-only', 'disabled');
    expect(link).not.toHaveAttribute('aria-disabled');
  });

  test('applies different colors', () => {
    const { rerender } = render(
      <InlineLink href='#' color='standard'>
        Standard Link
      </InlineLink>
    );

    let link = screen.getByText('Standard Link');
    expect(link).toHaveClass('standard');

    rerender(
      <InlineLink href='#' color='neutral'>
        Neutral Link
      </InlineLink>
    );
    link = screen.getByText('Neutral Link');
    expect(link).toHaveClass('neutral');
  });

  test('applies different sizes', () => {
    const { rerender } = render(
      <InlineLink href='#' size='sm'>
        Small Link
      </InlineLink>
    );

    let link = screen.getByText('Small Link');
    expect(link).toHaveClass('small');

    rerender(
      <InlineLink href='#' size='md'>
        Medium Link
      </InlineLink>
    );
    link = screen.getByText('Medium Link');
    expect(link).toHaveClass('medium');

    rerender(
      <InlineLink href='#' size='lg'>
        Large Link
      </InlineLink>
    );
    link = screen.getByText('Large Link');
    expect(link).toHaveClass('large');
  });

  test('applies different underline behaviors', () => {
    const { rerender } = render(
      <InlineLink href='#' underline='always'>
        Always Underlined
      </InlineLink>
    );

    let link = screen.getByText('Always Underlined');
    expect(link).toHaveClass('underline-always');

    rerender(
      <InlineLink href='#' underline='hover'>
        Hover Underlined
      </InlineLink>
    );
    link = screen.getByText('Hover Underlined');
    expect(link).toHaveClass('underline-hover');

    rerender(
      <InlineLink href='#' underline='none'>
        No Underline
      </InlineLink>
    );
    link = screen.getByText('No Underline');
    expect(link).toHaveClass('underline-none');
  });

  test('applies icon-only styling when specified', () => {
    render(
      <InlineLink href='#' iconOnly>
        <span data-testid='icon'>Icon</span>
      </InlineLink>
    );

    const link = screen.getByTestId('icon').parentElement;
    expect(link).toHaveClass('icon-only');
  });

  test('applies disabled state', () => {
    render(
      <InlineLink href='https://example.com' disabled>
        Disabled Link
      </InlineLink>
    );

    const link = screen.getByText('Disabled Link');
    expect(link).toHaveClass('disabled');
    expect(link).toHaveAttribute('aria-disabled', 'true');
    expect(link).toHaveAttribute('tabIndex', '-1');
    expect(link).not.toHaveAttribute('href');
  });

  test('forwards ref to the anchor element', () => {
    const ref = React.createRef<HTMLAnchorElement>();
    render(
      <InlineLink href='#' ref={ref}>
        Ref Link
      </InlineLink>
    );

    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('A');
    expect(ref.current?.textContent).toBe('Ref Link');
  });

  test('applies custom className', () => {
    render(
      <InlineLink href='#' className='custom-class'>
        Custom Link
      </InlineLink>
    );

    const link = screen.getByText('Custom Link');
    expect(link).toHaveClass('custom-class');
  });

  test('forwards additional props to anchor element', () => {
    render(
      <InlineLink href='#' target='_blank' rel='noopener noreferrer' aria-label='External link'>
        External Link
      </InlineLink>
    );

    const link = screen.getByText('External Link');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    expect(link).toHaveAttribute('aria-label', 'External link');
  });

  test('supports asChild to render child element with link props', () => {
    render(
      <InlineLink href='#' asChild>
        <button>Button as Link</button>
      </InlineLink>
    );

    const button = screen.getByText('Button as Link');
    expect(button.tagName).toBe('BUTTON');
    expect(button).toHaveClass('inline-link', 'standard', 'medium', 'underline-hover');
  });

  test('maintains child props when using asChild', () => {
    render(
      <InlineLink href='#' asChild>
        <button className='original-class' type='button'>
          Button with Props
        </button>
      </InlineLink>
    );

    const button = screen.getByText('Button with Props');
    expect(button).toHaveClass('inline-link', 'original-class');
    expect(button).toHaveAttribute('type', 'button');
  });
});
