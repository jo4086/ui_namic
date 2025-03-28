// utils/displayValidator.js

/**
 * @constant {Object} tableDisplayMap
 * - Key-value map of HTML table elements to their default CSS display properties.
 * - e.g., 'thead' → 'table-header-group'
 *
 * @constant {Object} displayGroupMap
 * - Categorized mapping of CSS display values.
 * - e.g., 'flex' → ['flex', 'inline-flex']
 */

import { tableTagSet, displayValueSet } from '../constants'
import { tableDisplayMap, displayGroupMap } from '../constants' // import: Map

/**
 * @function displayValidator
 * - Validates the given display value for the specified tag type and determines its display group.
 * - If the type is a table-related tag, uses a predefined display mapping instead of the provided value.
 *
 * @param {string} type
 * - The HTML tag or element type.
 *
 * @param {string} display
 * - The CSS display value to validate and categorize.
 *
 * @returns {{ displayGroup: string, patchDisplay: string }}
 * - An object containing the display group and the validated display value.
 */

function displayValidator(type, display) {
    const getDisplay = tableTagSet.has(type) ? tableDisplayMap[type] : display

    // console.log('getDisplay:', getDisplay)

    validDisplay(getDisplay, type)

    const displayGroup = patchDisplayGroup(getDisplay)

    // console.log('get-display:', getDisplay)
    // console.log('patchDisplayGroup:', displayGroup)

    return { displayGroup, patchDisplay: getDisplay }
}

export default displayValidator

/**
 * @function validDisplay
 * - Validates whether a given display value is valid for the specified type.
 *
 * @param {string} display
 * - The CSS display value to validate.
 *
 * @param {string} type
 * - The HTML tag or element type.
 *
 * @throws {Error}
 * - If the display value is invalid.
 */

const validDisplay = (display, type) => {
    if (!displayValueSet.has(display)) {
        throw new Error(`Invalid display value "${display}" for type "${type}". Allowed values: ${[...displayValueSet].join(', ')}`)
    }
}

/**
 * @function patchDisplayGroup
 * - Determines the group of a given CSS display value.
 *
 * @param {string} display
 * - The CSS display value to categorize.
 *
 * @returns {string}
 * - The group name that includes the display value, or 'common' if none match.
 */

const patchDisplayGroup = (display) => {
    for (const group in displayGroupMap) {
        if (displayGroupMap[group].includes(display)) return group
    }
    return 'base' // 기본값
}
