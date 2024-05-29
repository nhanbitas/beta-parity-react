import { StoryObj, Meta } from '@storybook/react';
import { Badge } from '../../../ui/Badge';

const meta: Meta<typeof Badge> = {
  title: 'Example/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    color: {
      options: ['gray', 'orange', 'sky', 'violet', 'green', 'red', 'yellow', 'blue'],
      control: { type: 'select' }
    },
    children: { control: { type: 'text' } },
    className: { control: { type: 'text' } },
    size: {
      options: ['small', 'medium', 'large'],
      control: { type: 'select' }
    },
    variant: {
      options: ['strong', ''],
      control: { type: 'select' }
    }
  }
};

type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: 'This is a badge',
    color: 'gray',
    className: '',
    size: 'medium',
    variant: ''
  }
};

export default meta;
