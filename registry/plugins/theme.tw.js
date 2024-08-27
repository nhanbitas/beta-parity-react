const plugin = require('tailwindcss/plugin');

module.exports = plugin(function ({ addBase, theme }) {
  const colors = theme('colors');

  // Hàm đệ quy để tạo biến CSS
  function generateCssVariables(prefix, obj) {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      const newPrefix = prefix ? `${prefix}-${key}` : key;
      if (typeof value === 'string') {
        prefix ? (acc[`--${newPrefix}`] = value) : (acc[`--${newPrefix}`] = value);
      } else if (typeof value === 'object' && value !== null) {
        Object.assign(acc, generateCssVariables(`${newPrefix}`, value));
      }
      return acc;
    }, {});
  }

  /*
- Bắt đầu đệ quy với màu sắc từ theme, có thể extend thêm btn: btntheme trong color rồi sao đó generate ra màu

- pros: khi sử dụng có thể sử dụng token như 1 màu vd: hover:btn-primary-hover-color
- cons: gôm tất cả token vào 1 file css chung => càng nhiều component càng nặng (tokens tổ hợp nhiều mảng lại với nhau (4-5 []))

- solutions:
  - gôm vào 1 file global (tất cả component như vanila) => minify => import vào themeProvider => tương tự boostrap
  - vẫn tách ra nhưng khi sử dụng trên môi trường production thì phải sử dụng PurgeCSS để clear các class không cần thiết
  - @config từng file css riêng generate css varaiable riêng cho từng file và  dùng như ý 2.
*/

  const cssVariables = generateCssVariables('', colors);

  addBase({
    ':root': cssVariables
  });
});
