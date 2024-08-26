const plugin = require('tailwindcss/plugin');

module.exports = plugin(function ({ addBase, theme }) {
  const colors = theme('colors');

  // Hàm đệ quy để tạo biến CSS
  function generateCssVariables(prefix, obj) {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      if (typeof value === 'string') {
        acc[`--${prefix}-${key}`] = value;
      } else if (typeof value === 'object' && value !== null) {
        Object.assign(acc, generateCssVariables(`${prefix}-${key}`, value));
      }
      return acc;
    }, {});
  }

  /*
- Bắt đầu đệ quy với màu sắc từ theme, có thể extend thêm btn: btntheme trong color rồi sao đó generate ra màu
- pros: khi sử dụng có thể sử dụng token như 1 màu vd: hover:btn-primary-hover-color
- cons: gôm tất cả token vào 1 file css chung => càng nhiều component càng nặng (tokens tổ hợp nhiều mảng lại với nhau (4-5 []))
- solutions:
  - gôm vào 1 file global (tất cả component như vanila) => minify => import vào themeProvider
  - ...
  */

  const cssVariables = generateCssVariables('color', colors);

  addBase({
    ':root': cssVariables
  });
});
