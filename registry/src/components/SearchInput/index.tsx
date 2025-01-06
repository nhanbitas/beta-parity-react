import * as React from 'react';
import './index.css';
import './variables.css';
import { Input } from '../BaseInput';
import { Search } from 'lucide-react';
import { Spinner } from '../Spinner';

export interface SearchInputProps extends React.ComponentPropsWithoutRef<typeof Input> {
  isPending?: boolean;
  searchIconSide?: 'left' | 'right';
  customAction?: React.ReactNode;
}

export const SearchInput = React.forwardRef<React.ElementRef<typeof Input>, SearchInputProps>(
  ({ type = 'search', isPending, searchIconSide = 'left', customAction, ...props }, ref) => {
    const searchIcon = isPending ? (
      <span className='input-icon'>
        <Spinner size='sm' />
      </span>
    ) : (
      <button type='button' className='input-icon'>
        <Search />
      </button>
    );

    const customActionElement = customAction ? <span className='input-action'>{customAction}</span> : undefined;

    const rightElement =
      searchIconSide === 'right' ? (
        <>
          {searchIcon}
          {customActionElement}
        </>
      ) : (
        customActionElement
      );

    const leftElement = searchIconSide === 'left' ? searchIcon : undefined;

    return <Input ref={ref} type={type} {...props} leftIcon={leftElement} ActionBtn={rightElement} />;
  }
);

SearchInput.displayName = 'SearchInput';
