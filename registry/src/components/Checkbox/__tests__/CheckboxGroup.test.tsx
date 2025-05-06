import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Checkbox, CheckboxGroup } from '../index';

describe('CheckboxGroup Component', () => {
  // Basic rendering tests
  test('renders checkbox group with children', () => {
    render(
      <CheckboxGroup>
        <Checkbox label='Option 1' value='option1' />
        <Checkbox label='Option 2' value='option2' />
      </CheckboxGroup>
    );

    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getAllByRole('checkbox')).toHaveLength(2);
  });

  test('renders checkbox group with tree data', () => {
    const treeData = [
      {
        value: 'option1',
        label: 'Option 1'
      },
      {
        value: 'option2',
        label: 'Option 2'
      }
    ];

    render(<CheckboxGroup tree={treeData} />);

    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getAllByRole('checkbox')).toHaveLength(2);
  });

  test('renders checkbox group with nested tree data', () => {
    const treeData = [
      {
        value: 'parent',
        label: 'Parent',
        children: [
          {
            value: 'child1',
            label: 'Child 1'
          },
          {
            value: 'child2',
            label: 'Child 2'
          }
        ]
      }
    ];

    render(<CheckboxGroup tree={treeData} />);

    expect(screen.getByText('Parent')).toBeInTheDocument();
    expect(screen.getByText('Child 1')).toBeInTheDocument();
    expect(screen.getByText('Child 2')).toBeInTheDocument();
    expect(screen.getAllByRole('checkbox')).toHaveLength(3);
  });

  // Parent-child relationship tests
  test('checking parent checkbox checks all children', () => {
    const handleChange = jest.fn();
    const treeData = [
      {
        value: 'parent',
        label: 'Parent',
        children: [
          {
            value: 'child1',
            label: 'Child 1'
          },
          {
            value: 'child2',
            label: 'Child 2'
          }
        ]
      }
    ];

    render(<CheckboxGroup tree={treeData} onChange={handleChange} />);

    // Click parent checkbox
    const parentCheckbox = screen.getAllByRole('checkbox')[0];
    fireEvent.click(parentCheckbox);

    // Verify onChange is called with correct values
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({
        value: ['child1', 'child2'] // Only leaf nodes should be in the value
      })
    );
  });

  test('unchecking parent unchecks all children', () => {
    // Start with all checked
    const handleChange = jest.fn();
    const treeData = [
      {
        value: 'parent',
        label: 'Parent',
        checked: true,
        children: [
          {
            value: 'child1',
            label: 'Child 1',
            checked: true
          },
          {
            value: 'child2',
            label: 'Child 2',
            checked: true
          }
        ]
      }
    ];

    render(<CheckboxGroup tree={treeData} onChange={handleChange} />);

    // Verify all checkboxes are checked
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes[0]).toBeChecked(); // parent
    expect(checkboxes[1]).toBeChecked(); // child1
    expect(checkboxes[2]).toBeChecked(); // child2

    // Uncheck parent
    fireEvent.click(checkboxes[0]);

    // Verify onChange with empty value (all unchecked)
    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({
        value: []
      })
    );
  });

  // Children-parent relationship tests
  test('checking all children checks parent', () => {
    const handleChange = jest.fn();
    const treeData = [
      {
        value: 'parent',
        label: 'Parent',
        children: [
          {
            value: 'child1',
            label: 'Child 1'
          },
          {
            value: 'child2',
            label: 'Child 2'
          }
        ]
      }
    ];

    render(<CheckboxGroup tree={treeData} onChange={handleChange} />);

    // Click both child checkboxes
    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[1]); // child1
    fireEvent.click(checkboxes[2]); // child2

    // After second click, parent should also be checked
    expect(handleChange).toHaveBeenCalledTimes(2);

    // Get the updated tree from the last onChange call
    const updatedTree = handleChange.mock.calls[1][0].tree;
    expect(updatedTree[0].checked).toBe(true); // parent should be checked
  });

  test('checking one child makes parent indeterminate', () => {
    const spy = jest.spyOn(HTMLInputElement.prototype, 'indeterminate', 'set');
    const handleChange = jest.fn(({ tree }) => {
      // Check if the parent is in indeterminate state after child click
      expect(tree[0].indeterminate).toBe(true);
    });

    const treeData = [
      {
        value: 'parent',
        label: 'Parent',
        children: [
          {
            value: 'child1',
            label: 'Child 1'
          },
          {
            value: 'child2',
            label: 'Child 2'
          }
        ]
      }
    ];

    render(<CheckboxGroup tree={treeData} onChange={handleChange} />);

    // Click one child checkbox
    const childCheckbox = screen.getAllByRole('checkbox')[1]; // child1
    fireEvent.click(childCheckbox);

    // Verify the onChange handler was called and our expectation in handleChange was met
    expect(handleChange).toHaveBeenCalledTimes(1);

    spy.mockRestore();
  });

  // Additional tests
  test('passes color prop to all checkboxes', () => {
    const treeData = [
      {
        value: 'option1',
        label: 'Option 1'
      },
      {
        value: 'option2',
        label: 'Option 2'
      }
    ];

    render(<CheckboxGroup tree={treeData} color='accent' />);

    // All checkboxes should have the accent class
    const checkboxes = screen.getAllByRole('checkbox');
    checkboxes.forEach((checkbox) => {
      expect(checkbox).toHaveClass('accent');
    });
  });

  test('onParse is called when component mounts', () => {
    const handleParse = jest.fn();
    const treeData = [
      {
        value: 'option1',
        label: 'Option 1'
      }
    ];

    render(<CheckboxGroup tree={treeData} onParse={handleParse} />);

    // onParse should be called once on mount
    expect(handleParse).toHaveBeenCalledTimes(1);
    expect(handleParse).toHaveBeenCalledWith(expect.arrayContaining(treeData));
  });

  test('getGroup function returns correct values', () => {
    let getGroupFn: (groupValue: string) => any;

    const handleChange = jest.fn(({ getGroup }) => {
      getGroupFn = getGroup;
    });

    const treeData = [
      {
        value: 'group1',
        label: 'Group 1',
        children: [
          {
            value: 'item1',
            label: 'Item 1',
            checked: true
          },
          {
            value: 'item2',
            label: 'Item 2'
          }
        ]
      }
    ];

    render(<CheckboxGroup tree={treeData} onChange={handleChange} />);

    // Click on item2 to trigger onChange and get the getGroup function
    const secondCheckbox = screen.getAllByRole('checkbox')[2]; // item2
    fireEvent.click(secondCheckbox);

    // Use getGroup function to check the values for group1
    const groupValues = getGroupFn('group1');
    expect(groupValues).toContain('item1');
    expect(groupValues).toContain('item2');
    expect(groupValues.length).toBe(2);
  });
});
