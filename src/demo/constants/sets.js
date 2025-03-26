// ../constants/sets.js

/** INDEX
 * -- naming rule `${name}Set` --
 * tableTag
 * display
 * onEvent
 * pseudoClass
 * pseudoElement
 * allPseudo
 *
 * -- display group match css property --
 * flexCss
 * gridCss
 * tableCss
 * commonCss
 *
 * -- display mapping sets --
 * displayCommonSet
 * displayFlexSet
 * displayGridSet
 * displayTableSet
 *
 * -- export default sets --
 * sets = { All Set }
 */

import lists from './lists'

export const tableTagSet = new Set(lists.tableTagList)
export const displaySet = new Set(lists.displayList)
export const onEventSet = new Set(lists.onEventList)
export const pseudoClassSet = new Set(lists.pseudoClassList)
export const pseudoElementSet = new Set(lists.pseudoElementList)
export const allPseudoSet = new Set(lists.allPseudoList)

export const flexCssSet = new Set(lists.flexCssList)
export const gridCssSet = new Set(lists.gridCssList)
export const tableCssSet = new Set(lists.tableCssList)
export const commonCssSet = new Set(lists.commonCssList)

export const displayFlexSet = new Set([...lists.commonCssList, ...lists.flexCssList])
export const displayGridSet = new Set([...lists.commonCssList, ...lists.gridCssList])
export const displayTableSet = new Set([...lists.commonCssList, ...lists.tableCssList])
export const displayCommonSet = new Set(lists.commonCssList)

const sets = {
    tableTagSet,
    displaySet,
    onEventSet,
    pseudoClassSet,
    pseudoElementSet,
    allPseudoSet,

    // display group match css property
    flexCssSet,
    gridCssSet,
    tableCssSet,
    commonCssSet,

    // display mapping
    displayCommonSet,
    displayFlexSet,
    displayGridSet,
    displayTableSet,
}

export default sets
