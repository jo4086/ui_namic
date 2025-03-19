/** INDEX
 * 1. displayGroupMap
 * 2. tableDisplayMap
 */

export const displayGroupMap = {
    flex: ['flex', 'inline-flex'],
    grid: ['grid', 'inline-grid'],
    table: ['table', 'inline-table', 'table-row-group', 'table-header-group', 'table-footer-group', 'table-row', 'table-cell', 'table-column', 'table-column-group', 'table-caption'],
    common: ['block', 'inline', 'inline-block', 'flow-root', 'list-item'],
}

export const tableDisplayMap = {
    table: 'table',
    caption: 'table-caption',
    thead: 'table-header-group',
    tfoot: 'table-footer-group',
    tbody: 'table-row-group',
    colgroup: 'table-column-group',
    tr: 'table-row',
    td: 'table-cell',
    th: 'table-cell',
    col: 'table-column',
}
