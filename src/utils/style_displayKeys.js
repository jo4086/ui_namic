const styleDisplayKeys = (type, display) => {
    const typeToDisplayMap = {
        table: 'table',
        thead: 'table-header-group',
        tfoot: 'table-footer-group',
        tbody: 'table-row-group',
        tr: 'table-row',
        td: 'table-cell',
        th: 'table-cell',
        col: 'table-column',
        colgroup: 'table-column-group',
    }

    const displayGroups = {
        flex: ['flex', 'inline-flex'],
        grid: ['grid', 'inline-grid'],
        table: ['table', 'inline-table', 'table-row-group', 'table-header-group', 'table-footer-group', 'table-row', 'table-cell', 'table-column', 'table-column-group'],
        common: ['block', 'inline', 'inline-block', 'flow-root', 'list-item'],
    }

    const validDisplay = typeToDisplayMap[type] || display

    const allValidDisplays = Object.values(displayGroups).flat()
    if (!allValidDisplays.includes(validDisplay)) {
        throw new Error(`Invalid display value "${validDisplay}" for type "${type}". Please provide a valid display.`)
    }

    let attribute = 'common'
    for (const group in displayGroups) {
        if (displayGroups[group].includes(validDisplay)) {
            attribute = group
            break
        }
    }

    return { attribute, validDisplay }
}

export default styleDisplayKeys
