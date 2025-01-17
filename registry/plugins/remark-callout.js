import { visit } from 'unist-util-visit';

// This plugin is an example to turn `:::callout` into divs, passing arbitrary
// attributes.
export default function remarkCalloutDirective() {
  /**
   * @param {import('mdast').Root} tree
   *   Tree.
   * @returns {undefined}
   *   Nothing.
   */
  return (tree) => {
    visit(tree, (node) => {
      if (node.type === 'containerDirective') {
        if (node.name !== 'callout') return;
        const data = node.data || (node.data = {});
        const attributes = node.attributes || (node.attributes = {});
        const type = check(attributes.class ? attributes.class : node.children[0].children[0].value.toLowerCase());
        node.children[0].children[0].value =
          node.children[0].children[0].value.charAt(0).toUpperCase() +
          node.children[0].children[0].value.slice(1).toLowerCase();

        data.hName = 'div';
        data.hProperties = {
          class: 'callout' + ' ' + type.toLowerCase()
        };
      }
    });
  };

  function check(string) {
    return ['note', 'danger', 'tip', 'caution', 'experimental'].includes(string) ? string : 'note';
  }
}
