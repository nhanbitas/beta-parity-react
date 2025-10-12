import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tooltip } from './index';

describe('Tooltip Component', () => {
  describe('Rendering', () => {
    it('renders trigger element', () => {
      render(
        <Tooltip content="Tooltip text">
          <button>Hover me</button>
        </Tooltip>
      );
      expect(screen.getByText('Hover me')).toBeInTheDocument();
    });

    it('does not show tooltip by default', () => {
      render(
        <Tooltip content="Tooltip text">
          <button>Hover me</button>
        </Tooltip>
      );
      expect(screen.queryByText('Tooltip text')).not.toBeInTheDocument();
    });

    it('wraps string children in span', () => {
      const { container } = render(<Tooltip content="Tooltip text">Text trigger</Tooltip>);
      expect(container.querySelector('span.tooltip')).toBeInTheDocument();
    });

    it('applies tooltip class to component children', () => {
      const { container } = render(
        <Tooltip content="Tooltip text">
          <button>Button</button>
        </Tooltip>
      );
      expect(container.querySelector('button.tooltip')).toBeInTheDocument();
    });
  });

  describe('Position variants', () => {
    it('renders with top position by default', async () => {
      const { container } = render(
        <Tooltip content="Tooltip text">
          <button>Hover me</button>
        </Tooltip>
      );

      await userEvent.hover(screen.getByText('Hover me'));

      await waitFor(() => {
        const tooltip = container.querySelector('.tooltip-content');
        expect(tooltip).toBeInTheDocument();
      });
    });

    it('renders with bottom position', async () => {
      const { container } = render(
        <Tooltip content="Tooltip text" position="bottom">
          <button>Hover me</button>
        </Tooltip>
      );

      await userEvent.hover(screen.getByText('Hover me'));

      await waitFor(() => {
        expect(container.querySelector('.tooltip-content')).toBeInTheDocument();
      });
    });

    it('renders with left position', async () => {
      const { container } = render(
        <Tooltip content="Tooltip text" position="left">
          <button>Hover me</button>
        </Tooltip>
      );

      await userEvent.hover(screen.getByText('Hover me'));

      await waitFor(() => {
        expect(container.querySelector('.tooltip-content')).toBeInTheDocument();
      });
    });

    it('renders with right position', async () => {
      const { container } = render(
        <Tooltip content="Tooltip text" position="right">
          <button>Hover me</button>
        </Tooltip>
      );

      await userEvent.hover(screen.getByText('Hover me'));

      await waitFor(() => {
        expect(container.querySelector('.tooltip-content')).toBeInTheDocument();
      });
    });
  });

  describe('Hover interactions', () => {
    it('shows tooltip on hover', async () => {
      render(
        <Tooltip content="Tooltip text">
          <button>Hover me</button>
        </Tooltip>
      );

      await userEvent.hover(screen.getByText('Hover me'));

      await waitFor(() => {
        expect(screen.getByText('Tooltip text')).toBeInTheDocument();
      });
    });

    it('hides tooltip on unhover', async () => {
      render(
        <Tooltip content="Tooltip text">
          <button>Hover me</button>
        </Tooltip>
      );

      await userEvent.hover(screen.getByText('Hover me'));
      await waitFor(() => {
        expect(screen.getByText('Tooltip text')).toBeInTheDocument();
      });

      await userEvent.unhover(screen.getByText('Hover me'));
      await waitFor(() => {
        expect(screen.queryByText('Tooltip text')).not.toBeInTheDocument();
      });
    });
  });

  describe('Focus interactions', () => {
    it('shows tooltip on focus', async () => {
      render(
        <Tooltip content="Tooltip text">
          <button>Focus me</button>
        </Tooltip>
      );

      const button = screen.getByText('Focus me');
      button.focus();

      await waitFor(() => {
        expect(screen.getByText('Tooltip text')).toBeInTheDocument();
      });
    });

    it('hides tooltip on blur', async () => {
      render(
        <Tooltip content="Tooltip text">
          <button>Focus me</button>
        </Tooltip>
      );

      const button = screen.getByText('Focus me');
      button.focus();

      await waitFor(() => {
        expect(screen.getByText('Tooltip text')).toBeInTheDocument();
      });

      button.blur();

      await waitFor(() => {
        expect(screen.queryByText('Tooltip text')).not.toBeInTheDocument();
      });
    });
  });

  describe('Toggle mode', () => {
    it('toggles tooltip on click when isToggle is true', async () => {
      render(
        <Tooltip content="Tooltip text" isToggle>
          <button>Click me</button>
        </Tooltip>
      );

      await userEvent.click(screen.getByText('Click me'));

      await waitFor(() => {
        expect(screen.getByText('Tooltip text')).toBeInTheDocument();
      });

      await userEvent.click(screen.getByText('Click me'));

      await waitFor(() => {
        expect(screen.queryByText('Tooltip text')).not.toBeInTheDocument();
      });
    });
  });

  describe('Delay prop', () => {
    it('shows tooltip after delay', async () => {
      render(
        <Tooltip content="Tooltip text" delay={100}>
          <button>Hover me</button>
        </Tooltip>
      );

      await userEvent.hover(screen.getByText('Hover me'));

      expect(screen.queryByText('Tooltip text')).not.toBeInTheDocument();

      await waitFor(
        () => {
          expect(screen.getByText('Tooltip text')).toBeInTheDocument();
        },
        { timeout: 200 }
      );
    });
  });

  describe('Controlled open', () => {
    it('shows tooltip when controlledOpen is true', () => {
      render(
        <Tooltip content="Tooltip text" controlledOpen={true}>
          <button>Button</button>
        </Tooltip>
      );

      expect(screen.getByText('Tooltip text')).toBeInTheDocument();
    });

    it('hides tooltip when controlledOpen is false', () => {
      render(
        <Tooltip content="Tooltip text" controlledOpen={false}>
          <button>Button</button>
        </Tooltip>
      );

      expect(screen.queryByText('Tooltip text')).not.toBeInTheDocument();
    });
  });

  describe('Tooltip content', () => {
    it('displays content text', async () => {
      render(
        <Tooltip content="This is tooltip content">
          <button>Hover me</button>
        </Tooltip>
      );

      await userEvent.hover(screen.getByText('Hover me'));

      await waitFor(() => {
        expect(screen.getByText('This is tooltip content')).toBeInTheDocument();
      });
    });

    it('renders arrow/caret', async () => {
      const { container } = render(
        <Tooltip content="Tooltip text">
          <button>Hover me</button>
        </Tooltip>
      );

      await userEvent.hover(screen.getByText('Hover me'));

      await waitFor(() => {
        expect(container.querySelector('.tooltip-caret')).toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    it('has role tooltip', async () => {
      const { container } = render(
        <Tooltip content="Tooltip text">
          <button>Hover me</button>
        </Tooltip>
      );

      await userEvent.hover(screen.getByText('Hover me'));

      await waitFor(() => {
        const tooltip = container.querySelector('.tooltip-content');
        expect(tooltip).toHaveAttribute('role', 'tooltip');
      });
    });

    it('trigger has tabIndex for keyboard access', () => {
      const { container } = render(<Tooltip content="Tooltip text">Text trigger</Tooltip>);

      expect(container.querySelector('span.tooltip')).toHaveAttribute('tabIndex', '0');
    });
  });
});
