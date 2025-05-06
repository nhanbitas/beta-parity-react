import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Base, convertPropsToStyle } from '../index';

describe('Base Component', () => {
  test('renders correctly with default props', () => {
    render(<Base data-testid='base'>Default Content</Base>);

    const baseElement = screen.getByTestId('base');
    expect(baseElement).toBeInTheDocument();
    expect(baseElement.tagName).toBe('DIV'); // Default element is div
    expect(baseElement.textContent).toBe('Default Content');
  });

  test('applies custom class name', () => {
    render(
      <Base className='custom-class' data-testid='base'>
        Content
      </Base>
    );

    const baseElement = screen.getByTestId('base');
    expect(baseElement).toHaveClass('custom-class');
  });

  test('renders as different HTML elements', () => {
    const { rerender } = render(
      <Base component='section' data-testid='base'>
        Section Content
      </Base>
    );

    let baseElement = screen.getByTestId('base');
    expect(baseElement.tagName).toBe('SECTION');

    rerender(
      <Base component='article' data-testid='base'>
        Article Content
      </Base>
    );
    baseElement = screen.getByTestId('base');
    expect(baseElement.tagName).toBe('ARTICLE');
  });

  test('forwards ref to the element', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <Base ref={ref} data-testid='base'>
        Ref Test
      </Base>
    );

    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('DIV');
    expect(ref.current?.textContent).toBe('Ref Test');
  });

  test('passes through standard attributes', () => {
    const handleClick = jest.fn();
    render(
      <Base onClick={handleClick} aria-label='test base' data-testid='base'>
        Click Me
      </Base>
    );

    const baseElement = screen.getByTestId('base');
    expect(baseElement).toHaveAttribute('aria-label', 'test base');

    baseElement.click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('converts style shorthand props to CSS styles', () => {
    render(
      <Base data-testid='base' m='10px' p='20px' bg='red' cl='blue'>
        Styled Content
      </Base>
    );

    const baseElement = screen.getByTestId('base');

    expect(baseElement).toHaveStyle({
      margin: '10px',
      padding: '20px',
      backgroundColor: 'red',
      color: 'blue'
    });
  });

  test('handles x/y shorthand props correctly', () => {
    render(
      <Base data-testid='base' mx='15px' my='25px' px='5px' py='10px'>
        Styled Content
      </Base>
    );

    const baseElement = screen.getByTestId('base');

    expect(baseElement).toHaveStyle({
      marginLeft: '15px',
      marginRight: '15px',
      marginTop: '25px',
      marginBottom: '25px',
      paddingLeft: '5px',
      paddingRight: '5px',
      paddingTop: '10px',
      paddingBottom: '10px'
    });
  });

  test('combines custom style prop with converted style props', () => {
    render(
      <Base data-testid='base' bg='red' style={{ fontSize: '18px', fontWeight: 'bold' }}>
        Combined Styles
      </Base>
    );

    const baseElement = screen.getByTestId('base');

    expect(baseElement).toHaveStyle({
      backgroundColor: 'red',
      fontSize: '18px',
      fontWeight: 'bold'
    });
  });
});

describe('convertPropsToStyle utility', () => {
  test('converts basic style props', () => {
    const props = {
      w: '100px',
      h: '50px',
      bg: 'blue',
      cl: 'white'
    };

    const styles = convertPropsToStyle(props);

    expect(styles).toEqual({
      width: '100px',
      height: '50px',
      backgroundColor: 'blue',
      color: 'white'
    });
  });

  test('handles x/y shorthand props', () => {
    const props = {
      mx: '10px',
      my: '20px',
      px: '5px',
      py: '15px'
    };

    const styles = convertPropsToStyle(props);

    expect(styles).toEqual({
      marginLeft: '10px',
      marginRight: '10px',
      marginTop: '20px',
      marginBottom: '20px',
      paddingLeft: '5px',
      paddingRight: '5px',
      paddingTop: '15px',
      paddingBottom: '15px'
    });
  });

  test('ignores non-style props', () => {
    const props = {
      w: '100px',
      className: 'test-class',
      'data-testid': 'test',
      onClick: () => {}
    };

    const styles = convertPropsToStyle(props);

    expect(styles).toEqual({
      width: '100px'
    });
    expect(styles).not.toHaveProperty('className');
    expect(styles).not.toHaveProperty('data-testid');
    expect(styles).not.toHaveProperty('onClick');
  });
});
