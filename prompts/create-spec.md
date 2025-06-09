## Component Spec Generation

Dựa trên **component và hình ảnh của Component**, hãy **generate ra tài liệu Spec** với cấu trúc **giống y hệt cấu trúc Spec của Accordion** (lấy Accordion làm mẫu).

Yêu cầu:

- Sử dụng các mục heading 2 (`##`) tương tự như Accordion.
- Với mỗi mục:
  - Nếu Component **có thông tin**, hãy điền đầy đủ vào.
  - Nếu chưa có thông tin, hãy **giữ lại mục đó nhưng để trống**, **không được xóa**.
- Viết nội dung dưới dạng **Markdown** Preview hình ảnh.
- Hình ảnh mô tả Component sẽ được cung cấp trong thư mục `images/...`.Tạo file index.ts để I-O các hình ảnh:
ví dụ như sau cho Button Component:
```ts
import alignment from './alignment.png';
import anatomy from './anatomy.png';
import button from './button.png';
import color from './color.png';
import color2 from './color-2.png';
import color3 from './color-3.png';


export default {
  alignment,
  anatomy,
  button,
  color,
  color2,
  color3,
};
```
- Ngắn gọn, chính xác, có thể dùng để làm tài liệu nội bộ hoặc hướng dẫn developer.

Đầu ra: Một file index.ts để IO hình ảnh, Một file tài liệu mô tả chi tiết Spec của **Component**, dùng cấu trúc như của **Accordion Spec** có sử dụng hình ảnh để mô tả từ index.ts.
