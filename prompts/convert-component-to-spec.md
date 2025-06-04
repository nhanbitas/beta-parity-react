Đọc toàn bộ các files của component  hiện tại và thực hiện các nhiệm vụ sau:

1. **Kiểm tra lại props**: Đảm bảo các props được khai báo và sử dụng trong component trùng khớp với thông tin trong `@spec/page.mdx`.  
   - Nếu props được import từ file khác. ví dụ: AccordionProps, chỉ cần ghi rõ là props được import từ file đó và link tới @spec của Accordion, không cần liệt kê chi tiết.

2. **Kiểm tra class CSS**: So sánh các class được dùng trong JSX với định nghĩa trong design hoặc Css. Sau đó chỉnh sửa Design Tokens - CSS selectors

3. **Kiểm tra tokens**:  
   - Đảm bảo các tokens (màu sắc, spacing, font, v.v.) được sử dụng đúng theo thiết kế.  
   - Nếu các tokens được import từ file chung, chỉ cần ghi rõ nguồn reference thay vì ghi đầy đủ từng token.

4. **So sánh với `@spec/page.mdx`**:  
   - Kiểm tra toàn bộ thông tin kỹ thuật và mô tả trong file spec có đồng bộ với component thực tế hay chưa.  
   - Nếu chưa đúng, hãy cập nhật lại để khớp, bao gồm:
     - Props
     - Token reference

5. **Kiểm tra nội dung trong file `@spec/page.mdx`**, bao gồm các mục sau nếu có:
   - Design checklist
   - Anatomy
   - States (default, hover, focus, disabled, etc.)
   - Options (variant, size, v.v.)
   - Colors
   - Behaviors (tương tác, animation, v.v.)
   - Keyboard behaviors (đảm bảo hỗ trợ accessibility nếu cần)

**Yêu cầu bắt buộc:**
- Không thay đổi cấu trúc bảng trong file `@spec/page.mdx` (không thêm/xoá/sửa cột).
- Có thể tham khảo `app/accordion/@spec` để làm ví dụ chuẩn về format và nội dung.

Note: Nếu đã thấy đầy đủ, không cần chỉnh sửa gì thêm, nội dung ghi bằng tiếng anh.