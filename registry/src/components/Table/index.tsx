import React from 'react';
import './index.css';
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from 'lucide-react';
import { Button } from '../Button';
import { Checkbox } from '../Checkbox';
import { UnitSelector } from '../BaseInput';
import classNames from 'classnames';
import useCombinedRefs from '../hooks/useCombinedRefs';

// =========================
// Table component
// =========================
// Declare and export select type and Table component

/**
 * Table column definition
 *
 * Each column has a key, title, and optional properties like width, sortable, resizable, and render function
 */
export type TableColumn<T = any> = {
  /**
   * Unique identifier for the column
   *
   * This key is used to access the corresponding data in each row
   *
   * @example 'name'
   * @memberof TableColumn
   */
  key: string;

  /**
   * Column header content
   *
   * Can be text or a React component
   *
   * @memberof TableColumn
   */
  title: React.ReactNode;

  /**
   * Width of the column in pixels
   *
   * If not specified, the column will auto-size
   *
   * @memberof TableColumn
   */
  width?: number;

  /**
   * Whether the column is sortable
   *
   * If true, clicking the column header will trigger the onSort callback
   *
   * @default false
   * @memberof TableColumn
   */
  sortable?: boolean;

  /**
   * Whether the column is resizable
   *
   * If true, the column can be resized by dragging its right edge
   *
   * @default false
   * @memberof TableColumn
   */
  resizable?: boolean;

  /**
   * Custom render function for cell content
   *
   * @param value The value of the cell (record[column.key])
   * @param record The entire data record for the row
   * @param index The row index
   * @returns React node to render in the cell
   * @memberof TableColumn
   */
  render?: (value: any, record: T, index: number) => React.ReactNode;
};

/**
 * Table component props
 *
 * Extends HTML attributes for table elements
 */
export interface TableProps<T = any> extends Omit<React.HTMLAttributes<HTMLTableElement>, 'onSelect' | 'title'> {
  /**
   * Data to be displayed in the table
   *
   * @default []
   * @example [{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Doe' }]
   * @memberof TableProps
   */
  data: T[];

  /**
   * Column definitions
   *
   * Each column has a key, title, and optional properties like width, sortable, resizable, and render function
   *
   * @memberof TableProps
   */
  columns: TableColumn<T>[];

  /**
   * Table title
   *
   * This can be a string or a React component
   *
   * @memberof TableProps
   */
  title?: React.ReactNode;

  /**
   * Table description
   *
   * This can be a string or a React component
   *
   * @memberof TableProps
   */
  description?: React.ReactNode;

  /**
   * Additional actions to display in the header
   *
   * If `selectable` is true, this will be displayed in the header section
   *
   * @memberof TableProps
   */
  actions?: React.ReactNode;

  /**
   * Actions to perform on selected rows
   *
   * This will be displayed in the header section if `selectable` is true and there are selected rows
   *
   * @memberof TableProps
   */
  batchActions?: React.ReactNode;

  /**
   * Whether rows are selectable
   *
   * If `selectable` is true, this will be displayed in the header section and a checkbox will be added to each row
   *
   * @memberof TableProps
   */
  selectable?: boolean;

  /**
   * Whether rows are selectable by clicking anywhere on the row
   *
   * If `selectOnRowClick` is true, clicking anywhere on the row will select it
   *
   * @memberof TableProps
   */
  selectOnRowClick?: boolean;

  /**
   * Default selected rows
   *
   * This is an array of row indices that should be selected by default
   *
   * @memberof TableProps
   */
  defaultSelectedRows?: number[];

  /**
   * Maximum height of the table
   *
   * This can be a number (in pixels) or a string (e.g., '50vh', '100%')
   *
   * @memberof TableProps
   */
  maxHeight?: number | string;

  /**
   * Custom empty state component
   *
   * This will be displayed when there are no rows in the table
   *
   * @memberof TableProps
   */
  emptyState?: React.ReactNode;

  /**
   * Function called when rows are selected
   *
   * This function receives an array of selected rows
   *
   * @memberof TableProps
   */
  onSelect?: (selectedRows: T[]) => void;

  /**
   * Function called when a column is sorted
   *
   * This function receives the key of the column and the sort direction ('asc' or 'desc')
   *
   * @memberof TableProps
   */
  onSort?: (key: string, direction: 'asc' | 'desc') => void;

  /**
   * Current sort key
   *
   * This is the key of the column that is currently sorted
   *
   * @memberof TableProps
   */
  sortKey?: string;

  /**
   * Current sort direction
   *
   * This is the direction of the current sort ('asc' or 'desc')
   * @default 'asc'
   *
   * @memberof TableProps
   */
  sortDirection?: 'asc' | 'desc';

  /**
   * Footer component
   *
   * This can be used to display additional information or actions
   *
   * @memberof TableProps
   */
  footer?: React.ReactNode;

  /**
   * Show row count in footer
   *
   * This will be displayed in the footer section if `showRowCount` is true
   *
   * @memberof TableProps
   */
  showRowCount?: boolean;

  /**
   * Called when a row is clicked
   *
   * This function receives the record and index of the clicked row
   *
   * @param record The record of the clicked row
   * @memberof TableProps
   */
  onRowClick?: (record: T, index: number) => void;

  /**
   * Number of columns to freeze from the left (including checkbox column if selectable)
   *
   * Set to -1 to disable freezing
   *
   * @default -1
   * @memberof TableProps
   */
  freezeColumns?: number;
}

/**
 * Props for the TablePagination component
 */
interface TablePaginationProps {
  /**
   * Current page number
   *
   * @default 1
   * @memberof TablePaginationProps
   */
  currentPage: number;

  /**
   * Number of items to display per page
   *
   * @default 10
   * @memberof TablePaginationProps
   */
  pageSize: number;

  /**
   * Total number of items
   *
   * This is used to calculate the total number of pages
   *
   * @memberof TablePaginationProps
   */
  total: number;

  /**
   * Function called when the page is changed
   *
   * @param page The new page number
   * @memberof TablePaginationProps
   */
  onChange: (page: number) => void;

  /**
   * Available options for page size selection
   *
   * @default [10, 20, 50, 100]
   * @memberof TablePaginationProps
   */
  pageSizeOptions?: number[];

  /**
   * Function called when the page size is changed
   *
   * If not provided, the page size selector will not be displayed
   *
   * @param pageSize The new page size
   * @memberof TablePaginationProps
   */
  onPageSizeChange?: (pageSize: number) => void;
}

/**
 * Pagination component for the table footer
 *
 * This component handles pagination and page size selection
 */
export const TablePagination = ({
  currentPage = 1,
  pageSize = 10,
  total,
  onChange,
  pageSizeOptions = [10, 20, 50, 100],
  onPageSizeChange
}: TablePaginationProps) => {
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
      <Button iconOnly kind='ghost' disabled={currentPage === 1} onClick={handlePrev} aria-label='Previous page'>
        <ChevronLeft />
      </Button>
      <Button disabled={currentPage === totalPages} onClick={handleNext} iconOnly kind='ghost' aria-label='Next page'>
        <ChevronRight />
      </Button>
      {onPageSizeChange && (
        <div className='table-row-per-page'>
          <span>Rows per page:</span>
          <UnitSelector
            unit={pageSizeOptions.map((size) => size.toString())}
            unitValue={pageSize.toString()}
            onUnitChange={(e) => onPageSizeChange(Number(e.target.value))}
            theme='default'
          />
        </div>
      )}
    </div>
  );
};

/**
 * **Table**.
 *
 * @see {@link http://localhost:3005/table-item Parity Table}
 */
export const Table = React.forwardRef<HTMLTableElement, TableProps<any>>(
  (
    {
      data,
      columns,
      title,
      description,
      actions,
      batchActions,
      selectable = false,
      selectOnRowClick = false,
      defaultSelectedRows = [],
      maxHeight,
      emptyState,
      onSelect,
      onSort,
      sortKey,
      sortDirection,
      footer,
      showRowCount = true,
      onRowClick,
      className = '',
      freezeColumns = -1
    },
    ref
  ) => {
    const [selectedRows, setSelectedRows] = React.useState<number[]>(defaultSelectedRows);
    const [columnWidths, setColumnWidths] = React.useState<Record<string, number>>({});
    const [frozenPositions, setfrozenPositions] = React.useState<Record<string, number | undefined>>({});
    const wrapperTableRef = React.useRef<HTMLDivElement>(null);
    const tableRef = React.useRef<HTMLTableElement>(null);
    const combinedRef = useCombinedRefs<HTMLTableElement>(ref, tableRef);
    const startXRef = React.useRef<number>(0);
    const startWidthRef = React.useRef<number>(0);

    // Handle column resize
    const handleResizeStart = (e: React.MouseEvent, key: string) => {
      // Unset frozen positions before resizing
      e.preventDefault();
      e.stopPropagation(); // Prevent triggering sort when resize handle is clicked

      // Find the target column to resize
      const target = tableRef.current?.querySelector(`th[data-key="${key}"]`) as HTMLElement;
      const targetColumn = columns.find((column) => column.key === key);
      // Calculate the content width of the column (padding included)
      const contentWidth = (target.querySelector('.table-head-cell-content')?.getBoundingClientRect().width || 50) + 32;

      if (target && targetColumn) {
        startXRef.current = e.clientX;
        startWidthRef.current = target.getBoundingClientRect().width; // Add padding to the width
        target.style.cursor = 'col-resize';

        const handleMouseMove = (e: MouseEvent) => {
          const minWidth = targetColumn.width || contentWidth; // Set a minimum width for the column
          const gap = e.clientX - startXRef.current;
          const width = Math.max(minWidth, startWidthRef.current + gap);

          const newColumnWidths = { ...columnWidths, [key]: Math.floor(width) };
          setColumnWidths(newColumnWidths);
          getFrozenColumnWidths('freeze');
        };

        const handleMouseUp = (e: MouseEvent) => {
          getFrozenColumnWidths('freeze');
          target.style.cursor = 'pointer';

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

        return newSelectedRows;
      });
    };

    // Handle select all rows
    const handleSelectAll = (checked: boolean) => {
      if (checked) {
        const allIndices = data.map((_, index) => index);
        setSelectedRows(allIndices);
      } else {
        setSelectedRows([]);
      }
    };

    // Handle row click for selection or custom handler
    const handleRowClick = (record: TableProps['data'][number], index: number) => {
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

    // Function to get frozen column widths
    function getFrozenColumnWidths(action: 'freeze' | 'defrost' = 'freeze') {
      if (action === 'defrost') {
        setfrozenPositions((pre) => {
          const newFrozenPositions = { ...pre };
          Object.keys(newFrozenPositions).forEach((key) => {
            newFrozenPositions[key] = undefined; // Unset frozen positions
          });
          return newFrozenPositions;
        });
        return;
      }

      // If freezeColumns is -1 or 0, no columns should be frozen
      if (freezeColumns <= 0) return;

      let frozenColumnWidths: number[] = [];
      // Get all column keys that should be frozen
      const allColumns = selectable ? [{ key: 'checkbox', title: '' }, ...columns] : [...columns];

      // Limit freezeColumns to the number of available columns
      const actualFreezeCount = Math.min(freezeColumns, allColumns.length);

      // Get widths for all frozen columns
      for (let i = 0; i < actualFreezeCount; i++) {
        const column = allColumns[i];
        const target = tableRef.current?.querySelector(`th[data-key="${column.key}"]`) as HTMLElement;
        const targetWidth = target?.getBoundingClientRect().width || column.width || 50;
        frozenColumnWidths.push(Math.round(targetWidth));
      }

      setfrozenPositions((prev) => {
        const newFrozenPositions = { ...prev };

        for (let index = 0; index < actualFreezeCount; index++) {
          const column = allColumns[index];
          if (index === 0) {
            newFrozenPositions[column.key] = 0; // First frozen column starts at 0
            continue;
          }
          const cumulativeWidth = frozenColumnWidths.slice(0, index).reduce((acc, w) => Math.floor(acc + w), 0);
          newFrozenPositions[column.key] = cumulativeWidth;
        }
        return newFrozenPositions;
      });
    }

    React.useEffect(() => {
      getFrozenColumnWidths();

      const watchFrozenWidth = () => getFrozenColumnWidths();

      window.addEventListener('resize', watchFrozenWidth);
      const tableElement = tableRef.current;
      tableElement?.addEventListener('scroll', watchFrozenWidth);

      return () => {
        window.removeEventListener('resize', watchFrozenWidth);
        tableElement?.removeEventListener('scroll', watchFrozenWidth);
      };
    }, [freezeColumns]); // Add freezeColumns to dependencies

    React.useEffect(() => {
      if (onSelect) {
        const selectedData = selectedRows.map((index) => data[index]);
        onSelect(selectedData);
      }
    }, [selectedRows]);

    return (
      <div className={`table-container ${className}`}>
        {/* Header section with title and description */}
        {(title || description) && (
          <div className='table-header-section'>
            {title && <h3 className='table-title'>{title}</h3>}
            {description && <div className='table-description'>{description}</div>}
          </div>
        )}

        {/* Actión/Batch actions section */}
        {selectable && batchActions && selectedRows.length ? (
          <div className='table-batch-actions'>
            <span className='table-batch-actions-count'>{selectedRows.length} selected</span>
            {batchActions}
          </div>
        ) : (
          actions && <div className='table-actions-section'>{actions}</div>
        )}

        {/* Table wrapper with overflow */}
        <div ref={wrapperTableRef} className='table-wrapper' style={tableWrapperStyle()}>
          <table className='par-table' ref={combinedRef}>
            <thead className='table-head'>
              <tr className='table-head-row'>
                {/* Checkbox column for selectable tables */}
                {selectable && (
                  <th
                    className='table-head-cell table-checkbox frozen'
                    data-key='checkbox'
                    style={{
                      left: frozenPositions['checkbox'] !== undefined ? `${frozenPositions['checkbox']}px` : undefined
                    }}
                  >
                    <div className='table-head-cell-wrapper'>
                      <Checkbox
                        checked={data.length > 0 && selectedRows.length === data.length}
                        indeterminate={data.length > 0 && selectedRows.length > 0 && selectedRows.length < data.length}
                        onChange={(e) => handleSelectAll(e.target.checked)}
                      />
                    </div>
                  </th>
                )}

                {/* Column headers */}
                {columns.map((column, index) => {
                  // Calculate if this column should be frozen based on index
                  const shouldFreeze = selectable
                    ? index < freezeColumns - 1 // Subtract 1 to account for checkbox
                    : index < freezeColumns;

                  return (
                    <th
                      key={column.key}
                      className={classNames('table-head-cell', {
                        frozen: shouldFreeze,
                        sortable: column.sortable,
                        'last-column-frozen': selectable ? index === freezeColumns - 2 : index === freezeColumns - 1
                      })}
                      style={{
                        width: columnWidths[column.key] !== undefined ? `${columnWidths[column.key]}px` : column.width,
                        minWidth:
                          columnWidths[column.key] !== undefined ? `${columnWidths[column.key]}px` : column.width,
                        left:
                          frozenPositions[column.key] !== undefined ? `${frozenPositions[column.key]}px` : undefined,
                        ...({
                          '--par-table-height': `${tableRef.current?.getBoundingClientRect().height}px`
                        } as React.CSSProperties)
                      }}
                      data-key={column.key}
                      onMouseDown={() => column.sortable && handleSortClick(column.key)}
                    >
                      <div className='table-head-cell-wrapper'>
                        <div className='table-head-cell-content'>
                          {column.title}
                          {column.sortable && (
                            <span
                              className='table-sort-icon'
                              style={{ visibility: sortKey === column.key ? 'visible' : 'hidden' }}
                            >
                              <ChevronUp className={sortDirection == 'asc' ? 'active' : ''} />
                              <ChevronDown className={sortDirection == 'desc' ? 'active' : ''} />
                            </span>
                          )}
                        </div>

                        {column.resizable && (
                          <button
                            type='button'
                            className='table-resize-handle'
                            onMouseDown={(e) => handleResizeStart(e, column.key)}
                          />
                        )}
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>

            <tbody className='table-body'>
              {/* Empty state */}
              {data.length === 0 && (
                <tr>
                  <td colSpan={selectable ? columns.length + 1 : columns.length} className='table-empty-state '>
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
                      className='table-body-cell table-checkbox frozen'
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      style={{
                        left: frozenPositions['checkbox'] !== undefined ? `${frozenPositions['checkbox']}px` : undefined
                      }}
                    >
                      <div className='table-body-cell-wrapper'>
                        <Checkbox
                          checked={selectedRows.includes(rowIndex)}
                          onChange={(e) => handleSelectRow(rowIndex, e.target.checked)}
                        />
                      </div>
                    </td>
                  )}

                  {/* Data cells */}
                  {columns.map((column, index) => {
                    // Calculate if this column should be frozen based on index, same as in the header
                    const shouldFreeze = selectable
                      ? index < freezeColumns - 1 // Subtract 1 to account for checkbox
                      : index < freezeColumns;

                    return (
                      <td
                        key={`${rowIndex}-${column.key}`}
                        className={classNames('table-body-cell', {
                          frozen: shouldFreeze,
                          'last-column-frozen': selectable ? index === freezeColumns - 2 : index === freezeColumns - 1 // Last frozen column, accounting for checkbox
                        })}
                        style={{
                          width: columnWidths[column.key] !== undefined ? `${columnWidths[column.key]}` : column.width,
                          minWidth:
                            columnWidths[column.key] !== undefined ? `${columnWidths[column.key]}` : column.width,
                          left:
                            frozenPositions[column.key] !== undefined ? `${frozenPositions[column.key]}px` : undefined
                        }}
                      >
                        <div className='table-body-cell-wrapper'>
                          <div className='table-body-cell-content'>
                            {column.render ? column.render(record[column.key], record, rowIndex) : record[column.key]}
                          </div>
                        </div>
                      </td>
                    );
                  })}
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
);

Table.displayName = 'Table';
