import React from 'react';
import './index.css';
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from 'lucide-react';
import { Button } from '../Button';
import { Checkbox } from '../Checkbox';

// Types for the table component
export type TableColumn<T = any> = {
  key: string;
  title: React.ReactNode;
  width?: number;
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
   * Default selected rows
   */
  defaultSelectedRows?: number[];

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
  onSelect?: (selectedRows: T[]) => void;

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
      <Button iconOnly kind='ghost' disabled={currentPage === 1} onClick={handlePrev} aria-label='Previous page'>
        <ChevronLeft />
      </Button>
      <Button disabled={currentPage === totalPages} onClick={handleNext} iconOnly kind='ghost' aria-label='Next page'>
        <ChevronRight />
      </Button>
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
  className = ''
}: TableProps<T>) {
  const [selectedRows, setSelectedRows] = React.useState<number[]>(defaultSelectedRows);
  const [columnWidths, setColumnWidths] = React.useState<Record<string, number>>({});
  const [frozenPositions, setfrozenPositions] = React.useState<Record<string, number | undefined>>({});
  const wrapperTableRef = React.useRef<HTMLDivElement>(null);
  const tableRef = React.useRef<HTMLTableElement>(null);
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

    let frozenColumnWidths: number[] = [];
    const frozenColumns = columns.filter((column) => column.frozen);

    if (selectable) frozenColumns.unshift({ key: 'checkbox', title: '' });

    if (frozenColumns.length < 0) return;

    for (const column of frozenColumns) {
      const target = tableRef.current?.querySelector(`th[data-key="${column.key}"]`) as HTMLElement;
      const targetWidth = target.getBoundingClientRect().width || column.width || 50;
      frozenColumnWidths.push(Math.round(targetWidth));
    }

    setfrozenPositions((prev) => {
      const newFrozenPositions = { ...prev };

      for (let index = 0; index < frozenColumns.length; index++) {
        const column = frozenColumns[index];
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

    const watchFrozenWidth = (e: Event) => getFrozenColumnWidths();

    window.addEventListener('resize', watchFrozenWidth);
    const tableElement = tableRef.current;
    tableElement?.addEventListener('scroll', watchFrozenWidth);

    return () => {
      window.removeEventListener('resize', watchFrozenWidth);
      tableElement?.removeEventListener('scroll', watchFrozenWidth);
    };
  }, []);

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
        <table className='par-table' ref={tableRef}>
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
              {columns.map((column, index) => (
                <th
                  key={column.key}
                  className={`table-head-cell ${column.frozen ? 'frozen' : ''} ${column.sortable ? 'sortable' : ''}`}
                  style={{
                    width: columnWidths[column.key] !== undefined ? `${columnWidths[column.key]}px` : column.width,
                    minWidth: columnWidths[column.key] !== undefined ? `${columnWidths[column.key]}px` : column.width,
                    left: frozenPositions[column.key] !== undefined ? `${frozenPositions[column.key]}px` : undefined
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
              ))}
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
                {columns.map((column) => (
                  <td
                    key={`${rowIndex}-${column.key}`}
                    className={`table-body-cell ${column.frozen ? 'frozen' : ''}`}
                    style={{
                      width: columnWidths[column.key] !== undefined ? `${columnWidths[column.key]}` : column.width,
                      minWidth: columnWidths[column.key] !== undefined ? `${columnWidths[column.key]}` : column.width,
                      left: frozenPositions[column.key] !== undefined ? `${frozenPositions[column.key]}px` : undefined
                    }}
                  >
                    <div className='table-body-cell-wrapper'>
                      <div className='table-body-cell-content'>
                        {column.render ? column.render(record[column.key], record, rowIndex) : record[column.key]}
                      </div>
                    </div>
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
