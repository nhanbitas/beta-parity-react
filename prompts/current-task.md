# Đọc các file và thực hiện các nhiệm vụ sau:

- check xem @dev/page.mdx có các component nào được truyền props không, nếu có hãy tách thành một file mới nằm bên trong public/demo/{component}/{componentName}, componentName bạn có thể tự đặt tên theo cách truyền props sao cho phân biệt với các component còm lại.

- sau khi đã tạo, hãy chỉnh lại file index.ts nằm bên trong public/demo/{component}/ để export ra bên ngoài để sử dụng.

- sau khi đã chỉnh index.ts, sửa các component truyền props bằng các component mới được tạo trong @dev/page.mdx

====
example:

from:
```tsx
<CodePreview paths={['breadcrumb', 'BreadcrumbBasic']}>
  <Demo.BreadcrumbBasic separator='slash' />
</CodePreview>

```
to:
```tsx
<CodePreview paths={['breadcrumb', 'BreadcrumbBasicSlash']}>
  <Demo.BreadcrumbBasicSlash />
</CodePreview>
```
 > BreadcrumbBasicSlash là tên file mới được tạo trong public/demo/breadcrumb/BreadcrumbBasicSlash.tsx
====

# Ghi chú
- Các ví dụ chỉ là ví dụ, hãy generate phù hợp với cái đang làm
- check type của component / props, nếu là client side thì thêm 'use client' vào đầu file, nếu không thì không cần thêm.
-  không truyền bất kì props nào ở page.mdx