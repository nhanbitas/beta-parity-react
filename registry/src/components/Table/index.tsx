import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './index.css';
import { ChevronDown } from 'lucide-react';

// Types for the table component
export type TableColumn<T = any> = {
  key: string;
  title: React.ReactNode;
  width?: number | string;
  frozen?: boolean;
  sortable?: boolean;
  resizable?: boolean;
  render?: (value: any, record: T, index: number) => React.ReactNode;
};

export type TableProps<T = any> = {
  /**
   * Data to be displayed in the table
   */
  data: T[];

  /**
   * Column definitions
   */
  columns: TableColumn<T>[];

  /**
   * Table title
   */
  title?: React.ReactNode;

  /**
   * Table description
   */
  description?: React.ReactNode;

  /**
   * Additional actions to display in the header
   */
  actions?: React.ReactNode;

  /**
   * Actions to perform on selected rows
   */
  batchActions?: React.ReactNode;

  /**
   * Whether rows are selectable
   */
  selectable?: boolean;

  /**
   * Whether rows are selectable by clicking anywhere on the row
   */
  selectOnRowClick?: boolean;

  /**
   * Maximum height of the table
   */
  maxHeight?: number | string;

  /**
   * Custom empty state component
   */
  emptyState?: React.ReactNode;

  /**
   * Function called when rows are selected
   */
  onSelect?: (selectedRows: T[], selectedIndexes: number[]) => void;

  /**
   * Function called when a column is sorted
   */
  onSort?: (key: string, direction: 'asc' | 'desc') => void;

  /**
   * Current sort key
   */
  sortKey?: string;

  /**
   * Current sort direction
   */
  sortDirection?: 'asc' | 'desc';

  /**
   * Footer component
   */
  footer?: React.ReactNode;

  /**
   * Show row count in footer
   */
  showRowCount?: boolean;

  /**
   * Called when a row is clicked
   */
  onRowClick?: (record: T, index: number) => void;

  /**
   * CSS class name
   */
  className?: string;
};

/**
 * Search input component for filtering table data
 */
export const TableSearchInput = ({
  value,
  onChange,
  placeholder = 'Search...',
  className = ''
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}) => {
  return (
    <div className={`table-search ${className}`}>
      <span className='table-search-icon'>
        <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M10.5 7C10.5 8.93 8.93 10.5 7 10.5C5.07 10.5 3.5 8.93 3.5 7C3.5 5.07 5.07 3.5 7 3.5C8.93 3.5 10.5 5.07 10.5 7ZM11.5 7C11.5 9.485 9.485 11.5 7 11.5C4.515 11.5 2.5 9.485 2.5 7C2.5 4.515 4.515 2.5 7 2.5C9.485 2.5 11.5 4.515 11.5 7ZM10.3536 10.3536C10.5488 10.1583 10.8653 10.1583 11.0606 10.3536L13.3536 12.6464C13.5488 12.8417 13.5488 13.1583 13.3536 13.3535C13.1583 13.5488 12.8417 13.5488 12.6465 13.3535L10.3536 11.0607C10.1583 10.8654 10.1583 10.5488 10.3536 10.3536Z'
            fill='currentColor'
          />
        </svg>
      </span>
      <input
        type='text'
        className='table-search-input'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
};

/**
 * Pagination component for the table footer
 */
export const TablePagination = ({
  currentPage = 1,
  pageSize = 10,
  total,
  onChange,
  pageSizeOptions = [10, 20, 50, 100],
  onPageSizeChange
}: {
  currentPage: number;
  pageSize: number;
  total: number;
  onChange: (page: number) => void;
  pageSizeOptions?: number[];
  onPageSizeChange?: (pageSize: number) => void;
}) => {
  const totalPages = Math.ceil(total / pageSize);
  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, total);

  const handlePrev = () => {
    if (currentPage > 1) {
      onChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onChange(currentPage + 1);
    }
  };

  return (
    <div className='table-pagination'>
      <span className='table-pagination-info'>
        {start}-{end} of {total}
      </span>
      <button
        disabled={currentPage === 1}
        onClick={handlePrev}
        className='button button-icon button-ghost'
        aria-label='Previous page'
      >
        <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M9.3 3.3C9.5 3.5 9.5 3.8 9.3 4L5.4 8L9.3 12C9.5 12.2 9.5 12.5 9.3 12.7C9.1 12.9 8.8 12.9 8.6 12.7L4.3 8.4C4.1 8.2 4.1 7.9 4.3 7.7L8.6 3.4C8.8 3.2 9.1 3.2 9.3 3.3Z'
            fill='currentColor'
          />
        </svg>
      </button>
      <button
        disabled={currentPage === totalPages}
        onClick={handleNext}
        className='button button-icon button-ghost'
        aria-label='Next page'
      >
        <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M6.7 12.7C6.5 12.5 6.5 12.2 6.7 12L10.6 8L6.7 4C6.5 3.8 6.5 3.5 6.7 3.3C6.9 3.1 7.2 3.1 7.4 3.3L11.7 7.6C11.9 7.8 11.9 8.1 11.7 8.3L7.4 12.6C7.2 12.8 6.9 12.8 6.7 12.7Z'
            fill='currentColor'
          />
        </svg>
      </button>
      {onPageSizeChange && (
        <div className='table-row-per-page'>
          <span>Rows per page:</span>
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className='select select-sm'
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

/**
 * Main Table component
 */
export function Table<T extends Record<string, any> = any>({
  data,
  columns,
  title,
  description,
  actions,
  batchActions,
  selectable = false,
  selectOnRowClick = false,
  maxHeight,
  emptyState,
  onSelect,
  onSort,
  sortKey,
  sortDirection,
  footer,
  showRowCount = true,
  onRowClick,
  className = ''
}: TableProps<T>) {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>({});
  const tableRef = useRef<HTMLTableElement>(null);
  const startXRef = useRef<number>(0);
  const startWidthRef = useRef<number>(0);

  // Handle column resize
  const handleResizeStart = (e: React.MouseEvent, key: string) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent triggering sort when resize handle is clicked

    const column = tableRef.current?.querySelector(`th[data-key="${key}"]`);
    let resizingColumn = key;
    if (column) {
      startXRef.current = e.clientX;
      startWidthRef.current = column.getBoundingClientRect().width;

      const handleMouseMove = (e: MouseEvent) => {
        if (resizingColumn) {
          const width = Math.max(50, startWidthRef.current + (e.clientX - startXRef.current));
          setColumnWidths((prev) => ({
            ...prev,
            [key]: width
          }));
        }
      };

      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
  };

  // Handle row selection
  const handleSelectRow = (index: number, checked: boolean) => {
    setSelectedRows((prev) => {
      let newSelectedRows = [...prev];
      if (checked) {
        if (!newSelectedRows.includes(index)) {
          newSelectedRows.push(index);
        }
      } else {
        newSelectedRows = newSelectedRows.filter((i) => i !== index);
      }

      // Call onSelect callback with selected data and indices
      if (onSelect) {
        const selectedData = newSelectedRows.map((i) => data[i]);
        onSelect(selectedData, newSelectedRows);
      }

      return newSelectedRows;
    });
  };

  // Handle select all rows
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIndices = data.map((_, index) => index);
      setSelectedRows(allIndices);
      if (onSelect) {
        onSelect([...data], allIndices);
      }
    } else {
      setSelectedRows([]);
      if (onSelect) {
        onSelect([], []);
      }
    }
  };

  // Handle row click for selection or custom handler
  const handleRowClick = (record: T, index: number) => {
    if (selectable && selectOnRowClick) {
      handleSelectRow(index, !selectedRows.includes(index));
    }
    if (onRowClick) {
      onRowClick(record, index);
    }
  };

  // Handle sort click
  const handleSortClick = (key: string) => {
    if (onSort) {
      const newDirection = sortKey === key && sortDirection === 'asc' ? 'desc' : 'asc';
      onSort(key, newDirection);
    }
  };

  // Compute styles with max height
  const tableWrapperStyle = () => {
    if (maxHeight) {
      return {
        '--table-max-height': typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight
      } as React.CSSProperties;
    }
    return {};
  };

  return (
    <div className={`table-container ${className}`}>
      {/* Header section with title and description */}
      {(title || description) && (
        <div className='table-header-section'>
          {title && <h3 className='table-title'>{title}</h3>}
          {description && <div className='table-description'>{description}</div>}
        </div>
      )}

      {/* Actions section */}
      {actions && <div className='table-actions-section'>{actions}</div>}

      {/* Batch actions section - shows when rows are selected */}
      {selectable && batchActions && (
        <div className={`table-batch-actions ${selectedRows.length ? '' : 'hidden'}`}>
          <span className='table-batch-actions-count'>{selectedRows.length} selected</span>
          {batchActions}
        </div>
      )}

      {/* Table wrapper with overflow */}
      <div className='table-wrapper' style={tableWrapperStyle()}>
        <table className='table' ref={tableRef}>
          <thead className='table-head'>
            <tr className='table-head-row'>
              {/* Checkbox column for selectable tables */}
              {selectable && (
                <th className='table-head-cell table-checkbox'>
                  <input
                    type='checkbox'
                    checked={data.length > 0 && selectedRows.length === data.length}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                  />
                </th>
              )}

              {/* Column headers */}
              {columns.map((column, index) => (
                <th
                  key={column.key}
                  className={`table-head-cell ${column.frozen ? 'frozen' : ''} ${column.sortable ? 'sortable' : ''}`}
                  style={{
                    width: columnWidths[column.key] !== undefined ? `${columnWidths[column.key]}px` : column.width,
                    minWidth: columnWidths[column.key] !== undefined ? `${columnWidths[column.key]}px` : column.width
                  }}
                  data-key={column.key}
                  onClick={() => column.sortable && handleSortClick(column.key)}
                >
                  <div className='table-head-cell-content'>
                    {column.title}
                    {column.sortable && sortKey === column.key && (
                      <span className={`table-sort-icon ${sortDirection}`}>
                        <ChevronDown />
                      </span>
                    )}
                  </div>
                  {column.resizable && (
                    <div className='table-resize-handle' onMouseDown={(e) => handleResizeStart(e, column.key)} />
                  )}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className='table-body'>
            {/* Empty state */}
            {data.length === 0 && (
              <tr>
                <td colSpan={selectable ? columns.length + 1 : columns.length} className='table-empty-state'>
                  {emptyState || 'No data to display'}
                </td>
              </tr>
            )}

            {/* Table rows */}
            {data.map((record, rowIndex) => (
              <tr
                key={rowIndex}
                className={`table-body-row ${selectable ? 'selectable' : ''} ${
                  selectedRows.includes(rowIndex) ? 'selected' : ''
                }`}
                onClick={() => handleRowClick(record, rowIndex)}
              >
                {/* Checkbox cell for selectable tables */}
                {selectable && (
                  <td
                    className='table-body-cell table-checkbox'
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <input
                      type='checkbox'
                      checked={selectedRows.includes(rowIndex)}
                      onChange={(e) => handleSelectRow(rowIndex, e.target.checked)}
                    />
                  </td>
                )}

                {/* Data cells */}
                {columns.map((column) => (
                  <td
                    key={`${rowIndex}-${column.key}`}
                    className={`table-body-cell ${column.frozen ? 'frozen' : ''}`}
                    style={{
                      width: columnWidths[column.key] !== undefined ? `${columnWidths[column.key]}px` : column.width,
                      minWidth: columnWidths[column.key] !== undefined ? `${columnWidths[column.key]}px` : column.width
                    }}
                  >
                    {column.render ? column.render(record[column.key], record, rowIndex) : record[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer section with row count and pagination */}
      {(footer || showRowCount) && (
        <div className='table-footer'>
          {showRowCount && <div className='table-row-count'>{data.length} items</div>}
          {footer}
        </div>
      )}
    </div>
  );
}

export default Table;
