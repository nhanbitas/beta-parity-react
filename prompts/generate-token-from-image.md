## Nhiệm vụ

Nhiệm vụ của bạn là tạo một token từ một hình ảnh đã cho. Hãy làm theo các bước sau:

1. **Nhận hình ảnh**: Bạn sẽ nhận được một hình ảnh từ người dùng. Hãy chắc chắn rằng hình ảnh này có định dạng phù hợp (ví dụ: PNG, JPEG).

2. **Xử lý hình ảnh**: Bạn cần phân tích hình ảnh để xác định các thành phần màu sắc và token. 
  
3. **Tạo token**: Sử dụng hình ảnh đã xử lý để tạo token theo template đã cho.

template:

```css
:root,
[data-scheme='light'] {
  /* TEXT */
  --par-color-text-accordion-item-enabled: var(--par-gray-550);
  --par-color-text-accordion-item-hovered: var(--par-gray-600);
  --par-color-text-accordion-item-pressed: var(--par-gray-700);
  --par-color-text-accordion-item-expanded: var(--par-gray-950);
  --par-color-text-accordion-item-disabled: rgb(from var(--par-gray-550) r g b / 0.5);

  /* BG */
  --par-color-bg-accordion-menu: var(--par-white);
  --par-color-bg-accordion-item-enabled: var(--par-transparent);
  --par-color-bg-accordion-item-hovered: rgb(from var(--par-gray-100) r g b / 0.5);
  --par-color-bg-accordion-item-pressed: rgb(from var(--par-gray-200) r g b / 0.5);
  --par-color-bg-accordion-item-expanded: var(--par-transparent);
  --par-color-bg-accordion-item-disabled: var(--par-transparent);
  --par-color-bg: var(--par-white);

  /* BORDER */
  --par-color-border-surface: var(--par-gray-200);
}

[data-scheme='dark'] {
  /* TEXT */
  --par-color-text-accordion-item-enabled: var(--par-gray-200);
  --par-color-text-accordion-item-hovered: var(--par-gray-100);
  --par-color-text-accordion-item-pressed: var(--par-gray-100);
  --par-color-text-accordion-item-expanded: var(--par-white);
  --par-color-text-accordion-item-disabled: rgb(from var(--par-gray-200) r g b / 0.5);

  /* BG */
  --par-color-bg-accordion-menu: var(--par-gray-900);
  --par-color-bg-accordion-item-enabled: var(--par-transparent);
  --par-color-bg-accordion-item-hovered: rgb(from var(--par-gray-800) r g b / 0.5);
  --par-color-bg-accordion-item-pressed: rgb(from var(--par-gray-700) r g b / 0.5);
  --par-color-bg-accordion-item-expanded: var(--par-transparent);
  --par-color-bg-accordion-item-disabled: var(--par-transparent);
  --par-color-bg: var(--par-gray-950);

  /* BORDER */
  --par-color-border-surface: var(--par-gray-600);
}

note: @50% => rgb(from var(--par-gray-550) r g b / 0.5) for example