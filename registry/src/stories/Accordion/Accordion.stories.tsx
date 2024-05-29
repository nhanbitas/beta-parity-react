import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from '../../../ui/Accordion';

const accordionItems = [
  {
    value: 'item-1',
    title: 'Is it accessible?',
    content: 'Yes. It adheres to the WAI-ARIA design pattern.',
    key: 'item-1'
  },
  {
    value: 'item-2',
    title: 'Is it unstyled?',
    content: 'Yes. Its unstyled by default, giving you freedom over the look and feel.',
    key: 'item-2'
  },
  {
    value: 'item-3',
    title: 'Can it be animated?',
    content: 'Yes! You can animate the Accordion with CSS or JavaScript.',
    key: 'item-3'
  }
];

const meta = {
  title: 'Example/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  }
} satisfies Meta<typeof Accordion>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Single: Story = {
  args: {
    items: accordionItems,
    type: 'single',
    collapsible: true,
    onValueChange: (value) => console.log(value)
  }
};
