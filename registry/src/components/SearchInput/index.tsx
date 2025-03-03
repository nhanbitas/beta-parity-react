import * as React from 'react';
import './index.css';
import './variables.css';
import { Input } from '@ui/BaseInput';
import { Search } from 'lucide-react';
import { Spinner } from '@ui/Spinner';
import { Button, ButtonProps } from '@ui/Button';

// =========================
// SearchInput
// =========================
// Declare and export SearchInput type and SearchInput component

/**
 * Props for the SearchInput component.
 *
 * Extends properties from the `Input` component.
 */
export interface SearchInputProps extends React.ComponentPropsWithoutRef<typeof Input> {
  /**
   * Indicates whether the search input is in a pending state.
   *
   * @default false
   * @memberof SearchInputProps
   */
  isPending?: boolean;

  /**
   * Determines if a search button should be displayed.
   *
   * @default false
   * @memberof SearchInputProps
   */
  searchButton?: boolean;

  /**
   * Props for the search button, if displayed.
   *
   * @memberof SearchInputProps
   */
  searchButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;

  /**
   * An auxiliary icon displayed alongside the input field.
   *
   * @memberof SearchInputProps
   */
  auxiliaryIcon?: React.ReactNode;

  /**
   * Indicates whether the auxiliary icon/action is active.
   *
   * @default false
   * @memberof SearchInputProps
   */
  auxiliaryActive?: boolean;

  /**
   * Props for the auxiliary action button, if applicable.
   *
   * @memberof SearchInputProps
   */
  auxiliaryActionProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;

  /**
   * A keyboard shortcut string to trigger the search action.
   *
   * Example: `"Ctrl+K"` or `"Cmd+K"`
   *
   * @memberof SearchInputProps
   */
  shortCut?: string;

  /**
   * Props for the button displaying the shortcut.
   *
   * @memberof SearchInputProps
   */
  shortCutButtonProps?: React.PropsWithoutRef<ButtonProps>;

  /**
   * Callback triggered when the search action is performed.
   *
   * @memberof SearchInputProps
   */
  onSearch?: () => void | any;

  /**
   * Callback triggered when the auxiliary action is performed.
   *
   * @memberof SearchInputProps
   */
  onAuxiliaryAction?: () => void | any;
}

/**
 * **Parity SearchInput**.
 *
 *  @see {@link http://localhost:3005/search-input Parity SearchInput}
 */
export const SearchInput = React.forwardRef<React.ElementRef<typeof Input>, SearchInputProps>(
  (
    {
      type = 'search',
      isPending,
      searchButton = false,
      searchButtonProps,
      auxiliaryIcon,
      auxiliaryActive = false,
      auxiliaryActionProps,
      shortCut,
      shortCutButtonProps,
      onSearch,
      onAuxiliaryAction,
      ...props
    },
    ref
  ) => {
    // Generate search icon state
    const searchIcon = isPending ? <Spinner size='sm' /> : <Search width={16} height={16} />;

    // Handle actions
    const handleSearch = () => {
      onSearch?.();
    };

    const handleAuxiliaryAction = () => {
      onAuxiliaryAction?.();
    };

    // Generate right element
    const AuxiliaryActionElement = () => {
      const TagName = (auxiliaryActive ? Button : 'button') as React.ElementType;
      return (
        <TagName
          className='input-icon square-icon'
          onClick={handleAuxiliaryAction}
          disabled={props.disabled || props.readOnly}
          {...(auxiliaryActive ? { color: 'neutral', kind: 'solid', size: 'sm' } : { type: 'button' })}
          {...auxiliaryActionProps}
        >
          {auxiliaryIcon}
        </TagName>
      );
    };

    const inputDevider = searchButton || auxiliaryIcon !== undefined ? <span className='input-divider'></span> : null;
    const rightSearchIcon = isPending ? (
      <span className='input-icon'>{searchIcon}</span>
    ) : (
      <button
        type='button'
        className='input-icon square-icon'
        onClick={handleSearch}
        disabled={props.disabled || props.readOnly}
        {...searchButtonProps}
      >
        {searchIcon}
      </button>
    );
    const rightElement = shortCut ? (
      <Button
        size='sm'
        kind='glass'
        className='search-shortcut'
        disabled={props.disabled || props.readOnly}
        {...shortCutButtonProps}
      >
        {shortCut}
      </Button>
    ) : (
      <>
        {inputDevider}
        {searchButton && rightSearchIcon}
        {auxiliaryIcon !== undefined && <AuxiliaryActionElement />}
      </>
    );

    // Generate left element
    const leftSearchIcon = searchButton ? undefined : searchIcon;
    const leftElement = leftSearchIcon;

    return <Input ref={ref} type={type} {...props} leftIcon={leftElement} ActionBtn={rightElement} />;
  }
);

SearchInput.displayName = 'SearchInput';
