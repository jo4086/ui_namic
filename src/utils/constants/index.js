import { flexCssList, gridCssList, tableCssList, commonCssList } from './lists'
export * from './lists'
export * from './maps'

const commonCssSet = new Set(commonCssList)
const flexCssSet = new Set([...commonCssList, ...flexCssList])
const gridCssSet = new Set([...commonCssList, ...gridCssList])
const tableCssSet = new Set([...commonCssList, ...tableCssList])

export const displaySetMap = {
    flex: new Set([...commonCssList, ...flexCssList]),
    grid: new Set([...commonCssList, ...gridCssList]),
    table: new Set([...commonCssList, ...tableCssList]),
    common: new Set(commonCssList),
}

export const displayListMap = {
    flex: flexCssList,
    grid: gridCssList,
    table: tableCssList,
    common: commonCssList,
}
