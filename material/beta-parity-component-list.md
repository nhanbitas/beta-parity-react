# Beta Parity React Component Library - AI Agent Development Guide

This document provides a comprehensive guide for AI agents to create and implement React components based on the Beta Parity design system. Each component includes its API reference, design tokens, and functionality requirements.

## Design System Overview

### Token Structure
All design tokens follow this pattern:
`--{system}/{property}/{target}/{variant}/{state}/{inversion}`

- **system**: Design system namespace (e.g., `par`)
- **property**: CSS property/semantic role (e.g., `color`, `bg`, `border`, `text`, `icon`)
- **target**: UI element/context (e.g., `surface`, `field`, `button`, `item`)
- **variant**: Emphasis/variant (e.g., `primary`, `secondary`, `accent`, `neutral`)
- **state**: UI state (e.g., `enabled`, `hovered`, `pressed`, `disabled`)
- **inversion**: Alternative mode (e.g., `inverse`)

### Default Colors
- **Neutral**: `--par-___-neutral-___` → gray
- **Accent**: `--par-___-accent-___` → blue

---

## Components Documentation

### 1. Base Component
**Purpose**: Foundation component providing layout and styling props.

**Props**:
- `component`: React.ElementType (default: 'div') - HTML tag or component to render
- Style props: `m`, `mt`, `mr`, `mb`, `ml`, `mx`, `my` (margin), `p`, `pt`, `pr`, `pb`, `pl`, `px`, `py` (padding)
- Layout props: `w`, `h`, `minW`, `minH`, `maxW`, `maxH`, `bg`, `cl`, `op`
- Border props: `bd`, `bdColor`, `bdWidth`, `bdStyle`, `radius`
- Position props: `position`, `t`, `r`, `b`, `l`, `z`, `in`
- Flex props: `display`, `flex`, `flexGrow`, `flexShrink`, `flexBasis`, `flexDir`, `flexWrap`, `justifyContent`, `alignItems`
- Grid props: `grid`, `gridColumn`, `gridRow`, `gridTemplateColumns`, `gridTemplateRows`, etc.

**Note**: All components inherit Base layout props.

---

### 2. Accordion Component
**Purpose**: Collapsible content sections with expand/collapse functionality.

**Main Props**:
- `type`: 'single' | 'multiple' (default: 'single') - Selection mode
- `kind`: 'contained' | 'flush' (default: 'contained') - Visual style
- `icon`: 'chevron' | 'cross' (default: 'chevron') - Indicator icon
- `iconSide`: 'left' | 'right' (default: 'right') - Icon position
- `defaultValue`: string | string[] - Default open items (uncontrolled)
- `value`: string | string[] - Open items (controlled)
- `onChange`: (value) => void - Change callback
- `items`: Array{title, content, value, itemProps} - Items array alternative

**Sub-components**:
- `AccordionItem`: `value` (required), `disabled`
- `AccordionItemTrigger`: `isExpanded`, `disabled`, `handleChange`, `icon`, `iconSide`
- `AccordionItemContent`: `isExpanded`

**Design Tokens**:
- Text: `--par-color-text-accordion-item-{enabled|hovered|pressed|expanded|disabled}`
- Background: `--par-color-bg-accordion-{menu|item-{enabled|hovered|pressed|expanded|disabled}}`
- Border: `--par-color-border-surface`

---

### 3. Avatar Component
**Purpose**: User profile image/initials display with status indicators.

**Main Props**:
- `src`: string - Image URL
- `alt`: string - Alt text
- `initials`: string - Fallback initials
- `size`: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' (default: 'md')
- `framePadding`: number (default: 1) - Border padding
- `disabled`: boolean
- `status`: {type, color, pulse, borderStyle} - Status indicator
- `wrapperProps`: object - Wrapper element props
- `children`: ReactNode - Custom content

**Status Object**:
- `type`: 'dot' | 'border' (default: 'border')
- `color`: 'gray' | 'green' | 'red' | 'yellow' (default: 'gray')
- `pulse`: boolean (default: false)
- `borderStyle`: 'default' | 'alternative' | 'none' | 'inherit' (default: 'default')

**Sub-components**:
- `AvatarGroup`: `max`, `direction`, `spacing`, `size`, `borderStyle`, `framePadding`, `renderOverflow`, `onOverflowClick`
- `AvatarTrigger`: `active` + all Avatar props

**Design Tokens**:
- Background: `--par-color-bg-avatar{-disabled|-trigger}`
- Border: `--par-color-border-avatar{-alternative|-gray|-red|-green|-yellow}`
- Text: `--par-color-text-avatar{-disabled|-trigger}`
- Spacing: `--avatar-group-spacing`

---

### 4. Badge Component
**Purpose**: Status/category indicators with text and icons.

**Props**:
- `label`: string - Badge text
- `icon`: ReactNode - Icon element
- `color`: 'gray' | 'orange' | 'violet' | 'green' | 'red' | 'yellow' | 'blue' | 'lime' | 'cyan' (default: 'gray')
- `size`: 'md' | 'sm' | 'xs' (default: 'md')
- `dot`: boolean (default: false) - Show dot instead of icon
- `variant`: 'outlined' | 'solid' | 'glass' (default: 'outlined')

**Design Tokens**:
- Text: `--par-color-text-badge-{solid|outlined|glass}-{color}`
- Background: `--par-color-bg-badge-{solid|outlined|glass}-{color}`
- Border: `--par-color-border-badge-{solid|outlined|glass}-{color}`

---

### 5. Breadcrumb Component
**Purpose**: Navigation path indicator.

**Main Props**:
- `separator`: 'chevron' | 'dash' | 'slash' (default: 'chevron')
- `breadcrumbList`: BreadcrumbItemProps[] - Items array
- `limit`: number - Max visible items before truncation
- `menuProps`: MenuProps - Overflow menu configuration

**Sub-components**:
- `BreadcrumbItem`: Inherits all InlineLink props + `isMenuItem`
- `BreadcrumbMenu`: `items`, `menuProps`

**Design Tokens**:
- Text: `--par-color-text-breadcrumb-item-active`
- Separator: `--par-color-separator-breadcrumb`

---

### 6. Button Component
**Purpose**: Interactive action trigger.

**Props**:
- `size`: 'sm' | 'md' | 'lg' (default: 'md')
- `color`: 'neutral' | 'accent' | 'adverse' (default: 'neutral')
- `kind`: 'solid' | 'outlined' | 'ghost' | 'glass' (default: 'solid')
- `isPending`: boolean (default: false) - Loading state
- `iconOnly`: boolean (default: false) - Icon-only button
- `disabled`: boolean (default: false)

**Design Tokens**:
- Text: `--par-color-text-button-{kind}-{color}-{state}`
- Background: `--par-color-bg-button-{kind}-{color}-{state}`
- Border: `--par-color-border-button-{kind}-{color}-{state}`

States: enabled, hovered, pressed, disabled, pending

---

### 7. Checkbox Component
**Purpose**: Boolean input selection.

**Props**:
- `color`: 'neutral' | 'accent' (default: 'neutral')
- `label`: string | ReactNode - Main label
- `sublabel`: string | ReactNode - Secondary label
- `indeterminate`: boolean (default: false)
- `checkboxWrapperProps`: object - Wrapper props

**Design Tokens**:
- Icon: `--par-color-icon-checkbox-{enabled|disabled|indeterminate|neutral-selected|accent-selected}`
- Background: `--par-color-bg-checkbox-{neutral|accent}-{selected|disabled}`

---

### 8. Chip Component
**Purpose**: Interactive filter/selection tags.

**Props**:
- `label`: string - Chip text
- `icon`: ReactNode - Chip icon
- `type`: 'toggle' | 'dropdown' (default: 'toggle')
- `size`: 'sm' | 'md' | 'lg' (default: 'md')
- `kind`: 'outlined' | 'glass' (default: 'outlined')
- `color`: 'neutral' | 'accent' (default: 'neutral')
- `value`: string | number - Chip value
- `checked`: boolean - Toggle state
- `defaultChecked`: boolean - Default toggle state
- `isActive`: boolean - Dropdown active state
- `disabled`: boolean (default: false)
- `onChange`: function(value, checked?, active?) - State change callback
- `onRemove`: function(value) - Remove callback

**Design Tokens**:
- Text: `--par-color-text-chip-{kind}-{selected|unselected}-color-{status}`
- Background: `--par-color-bg-chip-{kind}-{selected|unselected}-color-{status}`
- Border: `--par-color-border-chip-{selected|unselected}-color-{status}`

---

### 9. ContentNavigation Component
**Purpose**: Auto-generated table of contents from headings.

**Props**:
- `target`: string | HTMLElement | null (default: 'main') - Container for headings
- `spaceToTop`: number (default: 0) - Scroll offset
- `skeleton`: ReactNode - Loading skeleton
- `color`: 'neutral' | 'accent' (default: 'neutral')
- `exclude`: string | string[] - Selector to exclude headings

**Design Tokens**:
- Text: `--par-color-text-content-navigation-{enabled|hovered|pressed|neutral-selected|accent-selected}`
- Border: `--par-color-border-content-navigation-{enabled|active-neutral|active-accent}`
- Background: `--par-color-bg-content-navigation`

---

### 10. CornerIndicator Component
**Purpose**: Badge/dot positioned at container corners.

**Props**:
- `label`: string - Badge text
- `icon`: ReactNode - Badge icon
- `outline`: boolean (default: false)
- `pulse`: boolean (default: false) - Pulse animation
- `offset`: number (default: 0) - General offset
- `xOffset`: number (default: 0) - X-axis offset
- `yOffset`: number (default: 0) - Y-axis offset
- `disable`: boolean (default: false)
- `position`: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' (default: 'top-right')
- `color`: 'gray' | 'orange' | 'violet' | 'green' | 'red' | 'yellow' | 'blue' | 'lime' | 'cyan' (default: 'gray')
- `size`: 'md' | 'sm' | 'xs' | 'lg' (default: 'md')
- `variant`: 'solid' | 'outlined' | 'glass' (default: 'solid')
- `growDirection`: 'symmetric' | 'inward' | 'outward' (default: 'symmetric')
- `indicatorProps`: object - Extra Badge/Dot props

**Design Tokens**:
- Outline: `--par-color-outline-corner-indicator`

---

### 11. BaseInput Component
**Purpose**: Foundation input component with common functionality.

**Props**:
- `type`: string (default: 'text') - Input type
- `value`: string - Input value
- `placeholder`: string (default: '') - Placeholder text
- `disabled`: boolean (default: false)
- `readOnly`: boolean (default: false)
- `inputSize`: 'sm' | 'md' (default: 'sm')
- `theme`: 'default' | 'alternative' (default: 'default')
- `isClearable`: boolean (default: false) - Show clear button
- `ActionBtn`: JSX.Element - Custom action button
- `leftIcon`: ReactNode - Left side icon
- `isError`: boolean (default: false) - Error state
- `errorMessage`: string - Error message
- `floatingLabel`: ReactNode - Floating label
- `onChange`: function(event) - Change callback
- `onClear`: function() - Clear callback
- `wrapperProps`: object - Wrapper props
- `clearBtnProps`: object - Clear button props

**Design Tokens**:
- Text: `--par-color-text-field-{filled|placeholder|disabled|readonly|invalid}`
- Border: `--par-color-border-field-{enabled|disabled|readonly|invalid|hovered|focused}`
- Background: `--par-color-bg-field-{enabled|disabled|readonly|invalid}`
- Button: `--par-color-bg-field-button-{enabled|hovered|pressed|disabled}`
- Icon: `--par-color-icon-field-button-{enabled|hovered|pressed|disabled}`

---

### 12. DatePicker Component
**Purpose**: Date selection with calendar interface.

**Props**:
- `floatingLabel`: ReactNode - Floating label
- `wrapperProps`: object - Container props
- `color`: 'neutral' | 'accent' (default: 'neutral')
- `icon`: ReactNode - Input icon
- `sideIcon`: 'left' | 'right' (default: 'right') - Icon position
- `locale`: string (default: 'default') - Locale setting
- `calenderHeader`: ReactNode - Custom calendar header
- `options`: object - Flatpickr options
- `onFocus`: function(event) - Focus callback
- `onBlur`: function(event) - Blur callback
- `onInputChange`: function(event, flatPickrInstance) - Input change callback
- `isError`: boolean (default: false) - Error state
- `errorMessage`: string - Error message
- `theme`: string (default: 'default') - Theme
- `inputSize`: 'sm' | 'md' (default: 'md') - Input size
- Inherits all Input and Flatpickr props

**Design Tokens**:
- Text: `--par-color-text-datepicker-{days-today|days-normal|time|caret}-{color}-{state}`
- Background: `--par-color-bg-datepicker-{days|month-select-dropdown}`
- Border: `--par-color-border-datepicker{-month-select-list}`

---

### 13. Dot Component
**Purpose**: Small status indicator dots.

**Props**:
- `size`: 'xs' | 'sm' | 'md' | 'lg' | 'xl' (default: 'md')
- `pulse`: boolean (default: false) - Pulse animation
- `color`: 'gray' | 'orange' | 'violet' | 'green' | 'red' | 'yellow' | 'blue' | 'lime' | 'cyan' (default: 'gray')

**Design Tokens**:
- Background: `--par-color-bg-dot-solid-{color}`

---

### 14. InlineLink Component
**Purpose**: Text links within content.

**Props**:
- `href`: string - Link URL
- `target`: string - Link target
- `size`: 'sm' | 'md' | 'lg' (default: 'md')
- `color`: 'neutral' | 'standard' (default: 'standard')
- `disabled`: boolean (default: false)
- `underline`: 'always' | 'hover' | 'none' (default: 'hover')
- `iconOnly`: boolean (default: false)
- `asChild`: boolean (default: false)

**Design Tokens**:
- Text: `--color-text-link-{standard|neutral}-{enabled|hovered|focused|disabled}`

---

### 15. Menu Component
**Purpose**: Dropdown menu with items and groups.

**Props**:
- `position`: string (default: 'bottom-start') - Floating UI placement
- `size`: 'sm' | 'md' (default: 'sm')
- `menuColor`: 'neutral' | 'accent' (default: 'neutral')
- `prominence`: 'subtle' | 'pronounced' (default: 'subtle')
- `theme`: 'default' | 'alternative' (default: 'default')
- `anchor`: HTMLElement | string - Anchor element
- `menuItemsLimit`: number - Max items before scroll
- `scrollIndicator`: boolean (default: false) - Show scroll indicators
- `searchable`: boolean (default: false) - Enable search
- `defaultSearch`: string (default: '') - Default search value
- `searchPlaceholder`: string - Search placeholder
- `noResultsText`: string (default: 'No results found')
- `usePortal`: boolean (default: true)
- `isOpen`: boolean (default: false)
- `isLoading`: boolean - Loading state
- `disabled`: boolean (default: false)

**Design Tokens**:
- Background: `--par-color-bg-surface-item-{enabled|hovered|disabled|neutral-subtle-selected|neutral-pronounced-selected|accent-subtle-selected|accent-pronounced-selected}`
- Text: `--par-color-text-surface-item-{enabled|disabled|neutral-subtle-selected|neutral-pronounced-selected|accent-subtle-selected|accent-pronounced-selected}`
- Border: `--par-color-border-surface`
- Divider: `--par-color-divider-menu`

---

### 16. EmailInput Component
**Purpose**: Email input with domain suggestions.

**Props**:
- `domain`: string | string[] - Domain suggestions
- `onDomainChange`: function(domain) - Domain change callback
- `domainValue`: string - Selected domain (controlled)
- Inherits all BaseInput props

**Design Tokens**: Uses same tokens as BaseInput component.

---

### 17. FileInput Component
**Purpose**: File selection input.

**Props**:
- `multiple`: boolean (default: false) - Allow multiple files
- `accept`: string - Accepted file types
- `onChange`: function(event) - File selection callback
- Inherits all BaseInput props

**Design Tokens**: Uses same tokens as BaseInput component.

---

### 18. FileItem Component
**Purpose**: File display item with progress and actions.

**Props**:
- `fileName`: string (default: "Choose file") - File name
- `fileSize`: number (default: 0) - File size in bytes
- `status`: 'error' | 'success' | 'completed' (default: 'completed') - File status
- `loading`: number (default: 0) - Progress percentage (0-100)
- `disabled`: boolean (default: false) - Disable state
- `onRetry`: function() - Retry callback (on error)
- `onRemove`: function() - Remove callback

**Design Tokens**:
- Background: `--par-color-bg-fileitem-{enabled|failed}`

---

### 19. NumberInput Component
**Purpose**: Numeric input with steppers and units.

**Props**:
- `type`: string (default: 'number') - Input type
- `min`: number - Minimum value
- `max`: number - Maximum value
- `stepControl`: number (default: 1) - Step increment
- `stepper`: 'auto' | 'chevron' | 'separate' (default: 'auto') - Stepper type
- `unit`: string | string[] - Unit options
- `selectedUnit`: string - Selected unit
- `onUnitChange`: function(unit) - Unit change callback
- `allowInput`: boolean (default: true) - Allow manual input
- `onValueChange`: function(values, event?) - Value change callback
- `isClearable`: boolean (default: false) - Show clear button
- `floatingLabel`: ReactNode - Floating label
- `theme`: 'default' | 'alternative' (default: 'default')
- `inputSize`: 'sm' | 'md' (default: 'sm')
- `leftIcon`: ReactNode - Left icon
- `onClear`: function() - Clear callback
- Inherits all BaseInput and NumericFormat props

**Design Tokens**: Uses same tokens as BaseInput component.

---

### 20. Pagination Component
**Purpose**: Page navigation controls.

**Props**:
- `totalPage`: number (default: 0) - Total pages
- `page`: number (default: 1) - Current page
- `bordered`: boolean (default: false) - Show borders
- `onlyControl`: boolean (default: false) - Show only navigation controls
- `controlConfig`: object - Control button configuration
- `color`: 'neutral' | 'accent' (default: 'neutral') - Color theme
- `siblings`: 0 | 1 | 2 | 3 (default: 0) - Sibling page numbers
- `onPageChange`: function(page) - Page change callback
- `component`: 'button' | 'a' | React.ComponentType (default: 'button') - Page component
- `componentProps`: object - Extra component props
- `to`: function(page) - URL generator

**Design Tokens**:
- Background: `--par-color-bg-pagination-item-{enabled|hovered|selected-neutral|selected-accent|disabled}`
- Text: `--par-color-text-pagination-item-{page|control}-{enabled|hovered|selected-neutral|selected-accent|disabled}`
- Border: `--par-color-border-pagination-item{-disabled}`

---

### 21. PasswordInput Component
**Purpose**: Password input with visibility toggle.

**Props**:
- `color`: 'accent' | 'neutral' (default: 'neutral') - Eye icon color
- `defaultHidden`: boolean (default: true) - Hide password by default
- Inherits all BaseInput props

**Design Tokens**: Uses same tokens as BaseInput component.

---

### 22. PinField Component
**Purpose**: PIN code input fields.

**Props**:
- `groups`: number[] (default: [4]) - Field grouping
- `value`: string - PIN value (controlled)
- `onChange`: function(value) - Value change callback
- `onComplete`: function(value) - Completion callback
- `masked`: boolean (default: false) - Mask characters
- `separator`: string (default: '-') - Group separator
- `reset`: boolean (default: false) - Reset fields
- `readOnly`: boolean (default: false) - Read-only state
- `disabled`: boolean (default: false) - Disable fields
- `invalid`: boolean (default: false) - Invalid/error state
- `size`: 'sm' | 'md' (default: 'md') - Field size
- `theme`: 'default' | 'alternative' (default: 'default')
- `placeholder`: string (default: '•') - Empty field placeholder

**Design Tokens**: Uses same tokens as BaseInput component.

---

### 23. Progress Component
**Purpose**: Progress indicators (bar or circle).

**Props**:
- `kind`: 'bar' | 'circle' (default: 'bar') - Progress type
- `value`: number (default: 0) - Progress value
- `title`: string - Title text
- `helperText`: string - Helper text
- `color`: 'neutral' | 'accent' (default: 'neutral') - Color theme
- `state`: 'active' | 'success' | 'error' (default: 'active') - Progress state
- `size`: 'sm' | 'md' (default: 'md') - Size (circle only)
- `numeral`: boolean (default: false) - Show numeric value

**Design Tokens**:
- Track: `--par-color-progress-track`
- Fill: `--par-color-progress-thumb-{active-neutral|active-accent|success|error}`

---

### 24. Radio Component
**Purpose**: Radio button selection.

**Props**:
- `checked`: boolean - Checked state (controlled)
- `onChange`: function(event) - Change callback
- `value`: string | number - Radio value
- `label`: string | ReactNode - Main label
- `sublabel`: string | ReactNode - Secondary label
- `disabled`: boolean (default: false) - Disable state
- `color`: 'neutral' | 'accent' (default: 'neutral') - Color theme
- `radioWrapperProps`: object - Wrapper props

**Sub-components**:
- `RadioGroup`: `name`, `label`, `defaultValue`, `value`, `disabled`, `color`, `items`, `onChange`, `children`

**Design Tokens**:
- Icon: `--par-color-icon-radio-{enabled|disabled|neutral-selected|neutral-disabled|accent-selected|accent-disabled}`

---

### 25. SearchInput Component
**Purpose**: Search input with auxiliary actions.

**Props**:
- `isPending`: boolean (default: false) - Show loading spinner
- `searchButton`: boolean (default: false) - Show search button
- `searchButtonProps`: object - Search button props
- `auxiliaryIcon`: ReactNode - Right side icon/button
- `auxiliaryActive`: boolean (default: false) - Style auxiliary as button
- `auxiliaryActionProps`: object - Auxiliary action props
- `shortCut`: string - Keyboard shortcut indicator
- `shortCutButtonProps`: object - Shortcut button props
- `onSearch`: function() - Search callback
- `onAuxiliaryAction`: function() - Auxiliary action callback
- Inherits all BaseInput props

**Design Tokens**: Uses same tokens as BaseInput component.

---

### 26. Select Component
**Purpose**: Dropdown selection (native or custom).

**Props**:
- `native`: boolean (default: false) - Use native select
- `options`: array - Option objects {value, label, disabled?}
- `value`: string | string[] - Selected value(s)
- `onChange`: function(value|event) - Change callback
- `multiselect`: boolean (default: false) - Multiple selection
- `filterable`: boolean (default: false) - Filter options
- `clearButton`: boolean (default: false) - Show clear button
- `deselectable`: boolean (default: false) - Allow deselection
- `keepOpen`: boolean (default: true) - Keep open after selection
- `placeholder`: string (default: 'Please choose an option') - Placeholder
- `floatingLabel`: string | ReactNode - Floating label
- `leftIcon`: ReactNode - Left icon
- `selectedIcon`: ReactNode - Selected option icon
- `countDescription`: string (default: 'item(s) selected') - Count description
- `theme`: 'default' | 'alternative' (default: 'default')
- `selectSize`: 'sm' | 'md' (default: 'md')
- `tagProps`: object - Multi-select tag props
- `disabled`: boolean (default: false)
- `onFocus`: function(event) - Focus callback
- `onBlur`: function(event) - Blur callback

**Design Tokens**: Uses same tokens as BaseInput component.

---

### 27. Slider Component
**Purpose**: Range slider control.

**Props**:
- `mode`: 'single' | 'range' (default: 'single') - Slider mode
- `min`: number (default: 0) - Minimum value
- `max`: number (default: 100) - Maximum value
- `step`: number (default: 1) - Step increment
- `defaultValue`: number | [number, number] - Initial value
- `marks`: array - Mark points
- `color`: 'neutral' | 'accent' (default: 'neutral') - Color theme
- `orientation`: 'horizontal' | 'vertical' (default: 'horizontal')
- `indicator`: 'normal' | 'tooltip' (default: 'normal') - Indicator type
- `indicatorSide`: 'normal' | 'reverse' (default: 'normal') - Indicator position
- `disabled`: boolean (default: false)
- `onValueChange`: function(value) - Value change callback

**Design Tokens**:
- Track: `--par-color-border-slider-track-enabled`
- Progress: `--par-color-border-slider-progress-{neutral|accent}-enabled`
- Thumb: `--par-color-{border|bg}-slider-thumb-enabled`
- Hover: `--par-color-bg-slider-state-layer-hovered`
- Mark: `--par-color-border-slider-discrete-neutral-{active|enabled}`

---

### 28. Spinner Component
**Purpose**: Loading indicator.

**Props**:
- `variant`: 'circular' | 'dotted' | 'sunburst' (default: 'circular') - Spinner style
- `color`: 'neutral' | 'accent' (default: 'neutral') - Color theme
- `size`: 'sm' | 'md' | 'lg' | 'xl' (default: 'md') - Spinner size

**Design Tokens**:
- Active: `--par-color-stroke-spinner-interactive-{neutral|accent}`
- Inactive: `--par-color-stroke-spinner-inactive`

---

### 29. Switch Component
**Purpose**: Toggle switch control.

**Props**:
- `active`: boolean - Controlled state
- `defaultActive`: boolean (default: false) - Initial state
- `switchSize`: 'sm' | 'md' | 'lg' (default: 'md') - Switch size
- `disabled`: boolean (default: false) - Disable state
- `icon`: boolean (default: false) - Show thumb icon
- `onToggle`: function(active) - Toggle callback

**Design Tokens**:
- Thumb: `--par-color-bg-switch-target-handle{-disabled}`
- Track: `--par-color-bg-switch-target-track-{uncheck|check}{-disabled}`
- Border: `--par-color-border-switch-{checked|unchecked}{-disabled}`
- Icon: `--par-color-text-switch-target-{checked|unchecked}-{enabled|disabled}`

---

### 30. Table Component
**Purpose**: Data table with sorting and selection.

**Props**:
- `data`: object[] - Table data
- `columns`: TableColumn[] - Column definitions
- `color`: 'neutral' | 'accent' (default: 'neutral') - Color theme
- `selectable`: boolean (default: false) - Enable row selection
- `selectedRows`: object[] (default: []) - Selected rows
- `onSelect`: function(selectedRows) - Selection callback
- `onRowClick`: function(record, index) - Row click callback
- `onSort`: function(key, direction) - Sort callback
- `sortKey`: string - Current sort column
- `sortDirection`: 'asc' | 'desc' (default: 'asc') - Sort direction
- `maxHeight`: number | string - Max table height
- `emptyState`: ReactNode - Empty state component
- `footer`: ReactNode - Footer component
- `showRowCount`: boolean (default: true) - Show row count
- `freezeColumns`: number (default: -1) - Freeze left columns
- `actions`: ReactNode - Header actions
- `batchActions`: ReactNode - Selected row actions
- `description`: ReactNode - Table description

**TableColumn Props**:
- `key`: string - Unique column key
- `title`: ReactNode - Column header
- `width`: number - Column width
- `sortable`: boolean - Enable sorting
- `resizable`: boolean - Enable resizing
- `render`: function(value, record, index) - Custom renderer

**Design Tokens**:
- Background: `--par-color-bg-table{-header-cell-item|-body-row-item|-batch-action-selected-item}-{enabled|hovered|active}`
- Text: `--par-color-text-table-{header-cell-item|content-item}-{enabled|hovered|active}`
- Border: `--par-color-border-table`

---

### 31. Tabs Component
**Purpose**: Tab navigation interface.

**Props**:
- `data`: TabItemProps[] - Tab items
- `size`: 'sm' | 'md' (default: 'md') - Tab size
- `color`: 'neutral' | 'accent' (default: 'neutral') - Color theme
- `theme`: 'default' | 'alternative' (default: 'default')
- `side`: 'left' | 'right' | 'top' | 'bottom' (default: 'left') - Tab position
- `flipped`: boolean (default: false) - Flip border position
- `indicatorSide`: 'same' | 'opposite' (default: 'same') - Indicator side
- `navProps`: object - Navigation container props
- `bodyProps`: object - Body container props
- `scrollValue`: object - Scroll configuration

**Design Tokens**:
- Background: `--par-color-bg-tab-item-{enabled|hovered|neutral-active|accent-active|disabled}`
- Text: `--par-color-text-tab-item-{enabled|hovered|neutral-active|accent-active|disabled}`
- Border: `--par-color-border-tab-container`

---

### 32. Tag Component
**Purpose**: Removable labels/tags.

**Props**:
- `label`: string (required) - Tag text
- `icon`: ReactNode - Left icon
- `size`: 'sm' | 'md' | 'lg' (default: 'md') - Tag size
- `kind`: 'glass' | 'outlined' (default: 'outlined') - Visual style
- `color`: 'neutral' | 'accent' (default: 'neutral') - Color theme
- `value`: string | number - Tag value
- `disabled`: boolean (default: false) - Disable state
- `onRemove`: function(value) - Remove callback

**Design Tokens**:
- Background: `--par-color-bg-tag{-hovered|-selected|-disabled}`
- Text: `--par-color-text-tag{-disabled}`
- Border: `--par-color-border-tag`
- Icon: `--par-color-icon-tag`
- Remove: `--par-color-{bg|text}-tag-remove-{hovered|pressed|disabled}`

---

### 33. TextInput Component
**Purpose**: Basic text input field.

**Props**:
- `type`: string (default: 'text') - Input type
- Inherits all BaseInput props

**Design Tokens**: Uses same tokens as BaseInput component.

---

### 34. Textarea Component
**Purpose**: Multi-line text input.

**Props**:
- `value`: string - Controlled value
- `defaultValue`: string - Initial value
- `onChange`: function(event) - Change callback
- `placeholder`: string - Placeholder text
- `rows`: number (default: 2) - Visible lines
- `maxLength`: number - Character limit
- `isClearable`: boolean (default: false) - Show clear button
- `clearBtnText`: string (default: "Clear") - Clear button text
- `isError`: boolean - Error state
- `errorMessage`: string - Error message
- `disabled`: boolean (default: false) - Disable state
- `readOnly`: boolean (default: false) - Read-only state
- `theme`: string (default: "default") - Visual theme
- `wrapperProps`: object - Wrapper props

**Design Tokens**: Uses same tokens as BaseInput component.

---

### 35. Toast Component
**Purpose**: Notification messages.

**Props**:
- `title`: string | ReactNode - Toast title
- `message`: string | ReactNode - Main message
- `action`: ReactNode - Action element
- `kind`: 'generic' | 'information' | 'affirmative' | 'cautionary' | 'adverse' (default: 'generic') - Toast type
- `emphasis`: 'normal' | 'high' (default: 'high') - Visual prominence
- `height`: 'flexible' | 'compact' (default: 'flexible') - Height variant
- `position`: 'top-right' | 'top-center' | 'bottom-right' | 'bottom-center' (default: 'top-right')
- `autoDismiss`: boolean (default: false) - Auto-dismiss
- `duration`: number (default: 5000) - Auto-dismiss duration
- `pauseOnHover`: boolean (default: true) - Pause on hover
- `icon`: ReactNode - Custom icon
- `progressBar`: boolean (default: false) - Show progress bar
- `dismissButton`: boolean (default: true) - Show close button
- `importance`: number (default: 0) - Stacking priority
- `pending`: boolean (default: false) - Loading state
- `onDismissed`: function() - Dismiss callback

**toast() API**:
- `toast(options)` - Create toast, returns controller
- Controller methods: `start()`, `stop()`, `update(options)`, `getDetail()`

**Design Tokens**:
- Background: `--par-color-bg-toast-emphasis-{high|normal}-{generic|information|affirmative|cautionary|adverse}`
- Border: `--par-color-border-toast-emphasis-{high|normal}-{generic|info|affirmative|cautionary|adverse}`
- Progress: `--par-color-border-progress-bar-{generic|info|affirmative|cautionary|adverse}`

---

### 36. Tooltip Component
**Purpose**: Contextual help tooltips.

**Props**:
- `content`: string | ReactNode - Tooltip content
- `position`: string (default: 'top') - Tooltip placement
- `isToggle`: boolean (default: false) - Toggle on click
- `delay`: number (default: 0) - Hover delay (ms)
- `touchDelay`: number - Touch delay (ms)
- `isSafePolygon`: boolean (default: false) - Safe polygon interaction
- `controlledOpen`: boolean - Controlled visibility

**Design Tokens**:
- Background: `--par-color-bg-surface-inverse`
- Text: `--par-color-text-primary-inverse`

---

### 37. TreeNavigation Component
**Purpose**: Hierarchical navigation tree.

**Props**:
- `items`: array - Tree data structure

**TreeNavigationItem Structure**:
- `id`: string - Unique identifier
- `title`: string - Display text
- `href`: string (optional) - Link URL
- `children`: TreeNavigationItem[] (optional) - Nested items
- `defaultExpanded`: boolean (optional) - Expand by default
- `defaultActive`: true (optional) - Active by default

**Design Tokens**:
- Background: `--par-color-bg-tree-navigation-{item|button-neutral-hovered|button-accent-hovered|item-neutral-selected|item-accent-selected}`
- Text: `--par-color-text-tree-navigation-content-item-{enabled|neutral-selected|accent-selected|disabled|hovered|pressed}`
- Border: `--par-color-border-tree-navigation`

---

## Implementation Guidelines for AI Agents

### 1. Component Structure
- Create functional React components with TypeScript
- Use `forwardRef` for components that need ref forwarding
- Implement proper prop destructuring and defaults
- Include comprehensive prop validation

### 2. Styling Implementation
- Use CSS-in-JS or CSS modules for component styles
- Implement design tokens as CSS custom properties
- Support both light and dark themes
- Include responsive design considerations

### 3. Accessibility Requirements
- Include proper ARIA attributes
- Support keyboard navigation
- Implement focus management
- Provide screen reader support

### 4. State Management
- Use React hooks for internal state
- Support both controlled and uncontrolled patterns
- Implement proper event handling
- Include loading and error states

### 5. Testing Requirements
- Write unit tests for all components
- Include integration tests for complex interactions
- Test accessibility compliance
- Validate design token usage

### 6. Documentation
- Include comprehensive JSDoc comments
- Provide usage examples
- Document all props and their types
- Include design token references

This guide provides the foundation for creating a complete, accessible, and consistent React component library following the Beta Parity design system specifications.
