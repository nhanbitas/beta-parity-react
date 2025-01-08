import * as React from 'react';
import './index.css';
import './variables.css';
import { Input } from '../BaseInput';
import { Search } from 'lucide-react';
import { Spinner } from '../Spinner';
import { Button, ButtonProps } from '../Button';

export interface SearchInputProps extends React.ComponentPropsWithoutRef<typeof Input> {
  isPending?: boolean;
  searchButton?: boolean;
  searchButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  auxiliaryIcon?: React.ReactNode;
  auxiliaryActive?: boolean;
  auxiliaryActionProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  shortCut?: string;
  shortCutButtonProps?: React.PropsWithoutRef<ButtonProps>;
  onSearch?: () => void | any;
  onAuxiliaryAction?: () => void | any;
}

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
    const searchIcon = isPending ? <Spinner size='sm' /> : <Search width={16} height={16} />;

    const handleSearch = () => {
      if (onSearch) {
        onSearch();
      }
    };

    const handleAuxiliaryAction = () => {
      if (onAuxiliaryAction) {
        onAuxiliaryAction();
      }
    };

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

    const leftSearchIcon = searchButton ? undefined : searchIcon;
    const leftElement = leftSearchIcon;

    return (
      <>
        <Input ref={ref} type={type} {...props} leftIcon={leftElement} ActionBtn={rightElement} />
      </>
    );
  }
);

SearchInput.displayName = 'SearchInput';
