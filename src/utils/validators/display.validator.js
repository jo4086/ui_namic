/**
 * @constant {Array} tableTags
 * - List of HTML table-related tag names.
 * - e.g., ['table', 'caption', 'col', ...]
 *
 * @constant {Array} displays
 * - List of supported CSS display property values
 * - e.g., ['flex', 'grid', 'block', 'table-row', ...]
 *
 * @constant {Object} tableDisplayMap
 * - Key-value map of HTML table elements to their default CSS display properties.
 * - e.g., 'thead' → 'table-header-group'
 *
 * @constant {Object} displayCategories
 * - Categorized mapping of CSS display values.
 * - e.g., 'flex' → ['flex', 'inline-flex']
 */
import tableTags from '../constants/tableTags'
import tableDisplayMap from '../constants/tableDisplayMap'
import displays from '../constants/displays'
import displayCategories from '../constants/displayCategories'

const tableTagSet = new Set(tableTags)
const displaySet = new Set(displays)

/**
 * @function validDisplay
 * - Validates whether a given display value is valid for the specified type.
 *
 * @param {string} display
 * - The CSS display value to validate.
 * @param {string} type
 * - The HTML tag or element type.
 * @throws {Error}
 * - If the display value is invalid.
 */
const validDisplay = (display, type) => {
    if (!displaySet.has(display)) {
        throw new Error(`Invalid display value "${display}" for type "${type}". Allowed values: ${[...displaySet].join(', ')}`)
    }
}

/**
 * @function patchDisplayCategory
 * - Determines the category of a given CSS display value.
 *
 * @param {string} display
 * - The CSS display value to categorize.
 * @returns {string}
 * - The category name that includes the display value, or 'common' if none match.
 */
const patchDisplayCategory = (display) => {
    for (const category in displayCategories) {
        if (displayCategories[category].includes(display)) return category
    }
    return 'common' // 기본값
}

/**
 * @function displayValidator
 * - Validates the given display value for the specified tag type and determines its display category.
 * - If the type is a table-related tag, uses a predefined display mapping instead of the provided value.
 *
 * @param {string} type
 * - The HTML tag or element type.
 * @param {string} display
 * - The CSS display value to validate and categorize.
 * @returns {{ displayCategory: string, patchDisplay: string }}
 * - An object containing the display category and the validated display value.
 */
function displayValidator(type, display) {
    const getDisplay = tableTagSet.has(type) ? tableDisplayMap[type] : display

    validDisplay(getDisplay, type)

    const displayCategory = patchDisplayCategory(getDisplay)

    // console.log('get-display:', getDisplay)
    // console.log('patchDisplayCategory:', displayCategory)

    return { displayCategory, patchDisplay: getDisplay }
}

export default displayValidator
