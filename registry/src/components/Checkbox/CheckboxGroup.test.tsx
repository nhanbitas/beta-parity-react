import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CheckboxGroup, Checkbox, DataItems } from './index';

describe('CheckboxGroup Component', () => {
  const simpleTree: DataItems = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
  ];

  const nestedTree: DataItems = [
    {
      value: 'parent1',
      label: 'Parent 1',
      children: [
        { value: 'child1', label: 'Child 1' },
        { value: 'child2', label: 'Child 2' },
      ],
    },
    { value: 'parent2', label: 'Parent 2' },
  ];

  describe('Rendering', () => {
    it('renders flat list of checkboxes', () => {
      render(<CheckboxGroup tree={simpleTree} />);
      expect(screen.getByLabelText('Option 1')).toBeInTheDocument();
      expect(screen.getByLabelText('Option 2')).toBeInTheDocument();
      expect(screen.getByLabelText('Option 3')).toBeInTheDocument();
    });

    it('renders nested checkboxes', () => {
      render(<CheckboxGroup tree={nestedTree} />);
      expect(screen.getByLabelText('Parent 1')).toBeInTheDocument();
      expect(screen.getByLabelText('Child 1')).toBeInTheDocument();
      expect(screen.getByLabelText('Child 2')).toBeInTheDocument();
    });

    it('renders with children as JSX', () => {
      render(
        <CheckboxGroup>
          <Checkbox value="1" label="Option 1" />
          <Checkbox value="2" label="Option 2" />
        </CheckboxGroup>
      );
      expect(screen.getByLabelText('Option 1')).toBeInTheDocument();
      expect(screen.getByLabelText('Option 2')).toBeInTheDocument();
    });

    it('renders parent checkbox when label and value props provided', () => {
      render(<CheckboxGroup label="Select All" value="all" tree={simpleTree} />);
      expect(screen.getByLabelText('Select All')).toBeInTheDocument();
    });
  });

  describe('Parent-Child relationships', () => {
    it('checking parent checks all children', async () => {
      render(<CheckboxGroup tree={nestedTree} />);
      const parent = screen.getByLabelText('Parent 1') as HTMLInputElement;
      const child1 = screen.getByLabelText('Child 1') as HTMLInputElement;
      const child2 = screen.getByLabelText('Child 2') as HTMLInputElement;

      await userEvent.click(parent);

      expect(parent.checked).toBe(true);
      expect(child1.checked).toBe(true);
      expect(child2.checked).toBe(true);
    });

    it('unchecking parent unchecks all children', async () => {
      const treeWithChecked: DataItems = [
        {
          value: 'parent',
          label: 'Parent',
          checked: true,
          children: [
            { value: 'child1', label: 'Child 1', checked: true },
            { value: 'child2', label: 'Child 2', checked: true },
          ],
        },
      ];

      render(<CheckboxGroup tree={treeWithChecked} />);
      const parent = screen.getByLabelText('Parent') as HTMLInputElement;

      await userEvent.click(parent);

      expect(parent.checked).toBe(false);
      expect((screen.getByLabelText('Child 1') as HTMLInputElement).checked).toBe(false);
      expect((screen.getByLabelText('Child 2') as HTMLInputElement).checked).toBe(false);
    });

    it('checking all children checks parent', async () => {
      render(<CheckboxGroup tree={nestedTree} />);
      const parent = screen.getByLabelText('Parent 1') as HTMLInputElement;
      const child1 = screen.getByLabelText('Child 1') as HTMLInputElement;
      const child2 = screen.getByLabelText('Child 2') as HTMLInputElement;

      await userEvent.click(child1);
      expect(parent.indeterminate).toBe(true);
      expect(parent.checked).toBe(false);

      await userEvent.click(child2);
      expect(parent.checked).toBe(true);
      expect(parent.indeterminate).toBe(false);
    });

    it('checking some children makes parent indeterminate', async () => {
      render(<CheckboxGroup tree={nestedTree} />);
      const parent = screen.getByLabelText('Parent 1') as HTMLInputElement;
      const child1 = screen.getByLabelText('Child 1') as HTMLInputElement;

      await userEvent.click(child1);

      expect(parent.indeterminate).toBe(true);
      expect(parent.checked).toBe(false);
    });

    it('unchecking one child from all checked makes parent indeterminate', async () => {
      const treeWithChecked: DataItems = [
        {
          value: 'parent',
          label: 'Parent',
          checked: true,
          children: [
            { value: 'child1', label: 'Child 1', checked: true },
            { value: 'child2', label: 'Child 2', checked: true },
          ],
        },
      ];

      render(<CheckboxGroup tree={treeWithChecked} />);
      const parent = screen.getByLabelText('Parent') as HTMLInputElement;
      const child1 = screen.getByLabelText('Child 1') as HTMLInputElement;

      expect(parent.checked).toBe(true);

      await userEvent.click(child1);

      expect(parent.indeterminate).toBe(true);
      expect(parent.checked).toBe(false);
    });
  });

  describe('onChange callback', () => {
    it('calls onChange with correct values', async () => {
      const handleChange = jest.fn();
      render(<CheckboxGroup tree={simpleTree} onChange={handleChange} />);

      await userEvent.click(screen.getByLabelText('Option 1'));

      expect(handleChange).toHaveBeenCalledTimes(1);
      const call = handleChange.mock.calls[0][0];
      expect(call.value).toEqual(['1']);
      expect(call.tree).toBeDefined();
      expect(call.getGroup).toBeInstanceOf(Function);
    });

    it('returns only leaf node values', async () => {
      const handleChange = jest.fn();
      render(<CheckboxGroup tree={nestedTree} onChange={handleChange} />);

      await userEvent.click(screen.getByLabelText('Child 1'));

      const call = handleChange.mock.calls[0][0];
      expect(call.value).toEqual(['child1']);
      expect(call.value).not.toContain('parent1');
    });

    it('returns multiple selected values', async () => {
      const handleChange = jest.fn();
      render(<CheckboxGroup tree={simpleTree} onChange={handleChange} />);

      await userEvent.click(screen.getByLabelText('Option 1'));
      await userEvent.click(screen.getByLabelText('Option 2'));

      const lastCall = handleChange.mock.calls[1][0];
      expect(lastCall.value).toEqual(['1', '2']);
    });

    it('getGroup returns values for specific group', async () => {
      const handleChange = jest.fn();
      render(<CheckboxGroup tree={nestedTree} onChange={handleChange} />);

      await userEvent.click(screen.getByLabelText('Child 1'));

      const call = handleChange.mock.calls[0][0];
      const groupValues = call.getGroup('parent1');
      expect(groupValues).toEqual(['child1']);
    });
  });

  describe('onParse callback', () => {
    it('calls onParse on mount with parsed tree', () => {
      const handleParse = jest.fn();
      render(<CheckboxGroup tree={simpleTree} onParse={handleParse} />);

      expect(handleParse).toHaveBeenCalledTimes(1);
      expect(handleParse.mock.calls[0][0]).toEqual(expect.arrayContaining(simpleTree));
    });
  });

  describe('Deeply nested structures', () => {
    const deepTree: DataItems = [
      {
        value: 'level1',
        label: 'Level 1',
        children: [
          {
            value: 'level2',
            label: 'Level 2',
            children: [
              { value: 'level3', label: 'Level 3' },
            ],
          },
        ],
      },
    ];

    it('handles deeply nested checkboxes', () => {
      render(<CheckboxGroup tree={deepTree} />);
      expect(screen.getByLabelText('Level 1')).toBeInTheDocument();
      expect(screen.getByLabelText('Level 2')).toBeInTheDocument();
      expect(screen.getByLabelText('Level 3')).toBeInTheDocument();
    });

    it('checking deep parent checks all descendants', async () => {
      render(<CheckboxGroup tree={deepTree} />);
      const level1 = screen.getByLabelText('Level 1') as HTMLInputElement;

      await userEvent.click(level1);

      expect((screen.getByLabelText('Level 2') as HTMLInputElement).checked).toBe(true);
      expect((screen.getByLabelText('Level 3') as HTMLInputElement).checked).toBe(true);
    });
  });

  describe('Color variants', () => {
    it('passes color to child checkboxes', () => {
      const { container } = render(<CheckboxGroup tree={simpleTree} color="accent" />);
      const checkboxes = container.querySelectorAll('.par-checkbox.accent');
      expect(checkboxes.length).toBe(simpleTree.length);
    });
  });
});
