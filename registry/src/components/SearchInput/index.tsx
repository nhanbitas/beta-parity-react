import * as React from 'react';
import './index.css';
import './variables.css';
import { Input } from '../BaseInput';
import { Search, Settings2 } from 'lucide-react';
import { Spinner } from '../Spinner';
import { Button } from '../Button';

export interface SearchInputProps extends React.ComponentPropsWithoutRef<typeof Input> {
  isPending?: boolean;
  searchButton?: boolean;
  searchButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  auxiliaryIcon?: React.ReactNode;
  auxiliaryActive?: boolean;
  auxiliaryActionProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
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
      <button type='button' className='input-icon' onClick={handleSearch} {...searchButtonProps}>
        {searchIcon}
      </button>
    );
    const rightElement = (
      <>
        {inputDevider}
        {searchButton && rightSearchIcon}
        {auxiliaryIcon !== undefined && <AuxiliaryActionElement />}
      </>
    );

    const leftSearchIcon = searchButton ? undefined : searchIcon;
    const leftElement = leftSearchIcon;

    return <Input ref={ref} type={type} {...props} leftIcon={leftElement} ActionBtn={rightElement} />;
  }
);

SearchInput.displayName = 'SearchInput';
