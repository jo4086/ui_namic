// ../constants/maps.js

/** INDEX
 * -- naming role `${name}Map` --
 * displayGroup
 * tableDisplay
 * displayList
 * displaySet
 */

import lists from './lists'
import sets from './sets'

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

export const displayListMap = {
    common: lists.commonCssList,
    table: lists.tableCssList,
    flex: lists.flexCssList,
    grid: lists.gridCssList,
}

export const displaySetMap = {
    common: sets.displayCommonSet,
    table: sets.displayTableSet,
    flex: sets.displayFlexSet,
    grid: sets.displayGridSet,
}

const maps = {
    displayGroupMap,
    tableDisplayMap,
    displayListMap,
    displaySetMap,
}

export default maps
