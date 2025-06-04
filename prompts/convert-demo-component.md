# Nhiệm vụ: Tách các demo components từ demo-components.tsx thành từng file riêng biệt:

## Input
File: demo-components.tsx
Bên trong có nhiều component được export theo dạng export const DemoXYZ = () => {...}.

## Output
Với mỗi component trong file demo-components.tsx, hãy thực hiện:

Tạo một file riêng trong thư mục public/demo/{componentName}/{TênDemoComponent}.tsx

File đó cần:

- Bắt đầu bằng 'use client' nếu đó là client side component;

- Import đầy đủ các package liên quan (React, next/image, các components từ beta-parity-react)

- Export component với tên không có tiền tố "Demo", ví dụ: SizesAvatar

## Cách xác định {componentName} và {TênDemoComponent}
{componentName} là phần sau của tên component, ví dụ:

DemoSizesAvatar → componentName: avatar, tên file: SizesAvatar.tsx
Dùng regex để tách: Demo([A-Z][a-zA-Z0-9]+)([A-Z][a-zA-Z0-9]+)?

## Generate index.ts cho từng component group
Sau khi tách xong các component theo từng folder, hãy tạo file index.ts trong từng thư mục public/demo/{componentName} để export tất cả các components trong đó.

Ví dụ trong public/demo/avatar/index.ts:

```ts
export { SizesAvatar } from './SizesAvatar';
export { InitialsAvatar } from './InitialsAvatar';
export { ImageAvatar } from './ImageAvatar';
```

## Chỉnh file @dev/page.mdx với PreviewComponent:
- Sau khi đã tạo index.ts trong public/.../... thì hãy sửa file page.mdx sao cho phù hợp với demo và thứ tự đang có sẵn trong file. đây là ví dụ preview đối với Accordion có thể tham khảo (chỉ lấy làm ví dụ, generate phù hợp theo cái đang làm):

```mdx
import * as Demo from '@public/demo/accordion';
import CodePreview from '@components/showcase/CodePreview';


<CodePreview paths={['accordion', 'BasicAccordion']}>
  <Demo.BasicAccordion />
</CodePreview>

## Single Accordion

<CodePreview paths={['accordion', 'SingleAccordion']}>
  <Demo.SingleAccordion />
</CodePreview>
.....
```

## Ghi chú
- Nếu component sử dụng <Image /> thì phải import next/image.
- Các ví dụ chỉ là ví dụ, hãy generate phù hợp với cái đang làm
- check type của component / props, nếu là client side thì thêm 'use client' vào đầu file, nếu không thì không cần thêm.