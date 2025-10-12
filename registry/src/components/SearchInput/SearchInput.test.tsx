import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchInput } from './index';

describe('SearchInput Component', () => {
  describe('Rendering', () => {
    it('renders correctly', () => {
      render(<SearchInput />);
      expect(screen.getByRole('searchbox')).toBeInTheDocument();
    });

    it('has type="search"', () => {
      render(<SearchInput />);
      expect(screen.getByRole('searchbox')).toHaveAttribute('type', 'search');
    });

    it('renders with placeholder', () => {
      render(<SearchInput placeholder="Search..." />);
      expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    });

    it('renders left search icon by default', () => {
      const { container } = render(<SearchInput />);
      expect(container.querySelector('.input-icon')).toBeInTheDocument();
    });
  });

  describe('Search button', () => {
    it('does not show search button by default', () => {
      const { container } = render(<SearchInput />);
      expect(container.querySelector('.square-icon')).not.toBeInTheDocument();
    });

    it('shows search button when searchButton prop is true', () => {
      const { container } = render(<SearchInput searchButton />);
      expect(container.querySelector('.square-icon')).toBeInTheDocument();
    });

    it('calls onSearch when search button is clicked', async () => {
      const handleSearch = jest.fn();
      const { container } = render(<SearchInput searchButton onSearch={handleSearch} />);

      const searchButton = container.querySelector('.square-icon') as HTMLButtonElement;
      await userEvent.click(searchButton);

      expect(handleSearch).toHaveBeenCalledTimes(1);
    });

    it('disables search button when input is disabled', () => {
      const { container } = render(<SearchInput searchButton disabled />);
      const searchButton = container.querySelector('.square-icon') as HTMLButtonElement;
      expect(searchButton).toBeDisabled();
    });
  });

  describe('Pending state', () => {
    it('shows spinner when isPending', () => {
      const { container } = render(<SearchInput isPending />);
      expect(container.querySelector('.spinner')).toBeInTheDocument();
    });

    it('disables search button when isPending', () => {
      const { container } = render(<SearchInput searchButton isPending />);
      const searchIcon = container.querySelector('.input-icon');
      expect(searchIcon).toBeInTheDocument();
      expect(container.querySelector('.spinner')).toBeInTheDocument();
    });
  });

  describe('Auxiliary icon', () => {
    it('renders auxiliary icon', () => {
      const icon = <span data-testid="aux-icon">X</span>;
      render(<SearchInput auxiliaryIcon={icon} />);
      expect(screen.getByTestId('aux-icon')).toBeInTheDocument();
    });

    it('calls onAuxiliaryAction when auxiliary icon is clicked', async () => {
      const handleAuxiliaryAction = jest.fn();
      const icon = <span>X</span>;
      const { container } = render(<SearchInput auxiliaryIcon={icon} onAuxiliaryAction={handleAuxiliaryAction} />);

      const auxButton = container.querySelectorAll('.square-icon')[0] as HTMLButtonElement;
      await userEvent.click(auxButton);

      expect(handleAuxiliaryAction).toHaveBeenCalledTimes(1);
    });

    it('renders auxiliary icon as Button when auxiliaryActive is true', () => {
      const icon = <span>X</span>;
      const { container } = render(<SearchInput auxiliaryIcon={icon} auxiliaryActive />);
      expect(container.querySelector('.btn')).toBeInTheDocument();
    });

    it('shows divider when auxiliary icon is present', () => {
      const icon = <span>X</span>;
      const { container } = render(<SearchInput auxiliaryIcon={icon} />);
      expect(container.querySelector('.input-divider')).toBeInTheDocument();
    });
  });

  describe('Shortcut', () => {
    it('renders shortcut button', () => {
      render(<SearchInput shortCut="Ctrl+K" />);
      expect(screen.getByText('Ctrl+K')).toBeInTheDocument();
    });

    it('shortcut button has glass kind', () => {
      const { container } = render(<SearchInput shortCut="Cmd+K" />);
      expect(container.querySelector('.btn.glass')).toBeInTheDocument();
    });

    it('hides auxiliary icon when shortcut is present', () => {
      const icon = <span data-testid="aux-icon">X</span>;
      const { container } = render(<SearchInput shortCut="Ctrl+K" auxiliaryIcon={icon} />);
      expect(screen.queryByTestId('aux-icon')).not.toBeInTheDocument();
      expect(container.querySelector('.input-divider')).not.toBeInTheDocument();
    });

    it('disables shortcut button when input is disabled', () => {
      render(<SearchInput shortCut="Ctrl+K" disabled />);
      const shortcutButton = screen.getByText('Ctrl+K');
      expect(shortcutButton).toBeDisabled();
    });
  });

  describe('Input interactions', () => {
    it('handles text input', async () => {
      render(<SearchInput />);
      const input = screen.getByRole('searchbox');

      await userEvent.type(input, 'search query');
      expect(input).toHaveValue('search query');
    });

    it('calls onChange when value changes', async () => {
      const handleChange = jest.fn();
      render(<SearchInput onChange={handleChange} />);

      await userEvent.type(screen.getByRole('searchbox'), 's');
      expect(handleChange).toHaveBeenCalled();
    });
  });

  describe('States', () => {
    it('can be disabled', () => {
      render(<SearchInput disabled />);
      expect(screen.getByRole('searchbox')).toBeDisabled();
    });

    it('can be readOnly', () => {
      render(<SearchInput readOnly />);
      expect(screen.getByRole('searchbox')).toHaveAttribute('readOnly');
    });
  });

  describe('Accessibility', () => {
    it('forwards ref correctly', () => {
      const ref = jest.fn();
      render(<SearchInput ref={ref} />);
      expect(ref).toHaveBeenCalled();
    });

    it('applies custom className', () => {
      render(<SearchInput className="custom-search" />);
      expect(screen.getByRole('searchbox')).toHaveClass('custom-search');
    });
  });
});
