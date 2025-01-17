export default function remarkDisableIndentedCode() {
  const data = this.data();
  add('micromarkExtensions', {
    disable: { null: ['codeIndented'] }
  });

  /**
   * @param {string} field
   * @param {unknown} value
   */
  function add(field, value) {
    const list = /** @type {Array<unknown>} */ (
      // Other extensions
      /* c8 ignore next 2 */
      data[field] ? data[field] : (data[field] = [])
    );

    list.push(value);
  }
}
