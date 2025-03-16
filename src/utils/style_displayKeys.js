// 테이블 태그 배열 셋
const tableTags = new Set(['table', 'caption', 'thead', 'tfoot', 'tbody', 'colgroup', 'tr', 'td', 'th', 'col'])

// 테이블 태그별 디스플레이 맵핑
const tableDisplayMap = {
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

// display의 그룹
const displayCategories = {
    flex: ['flex', 'inline-flex'],
    grid: ['grid', 'inline-grid'],
    table: ['table', 'inline-table', 'table-row-group', 'table-header-group', 'table-footer-group', 'table-row', 'table-cell', 'table-column', 'table-column-group', 'table-caption'],
    common: ['block', 'inline', 'inline-block', 'flow-root', 'list-item'],
}

// 전체 디스플레이로 유효한 디스플레이인지 검사 (set - has 명령어로 속도 최적화)
const displaySet = new Set([
    'flex',
    'inline-flex',
    'grid',
    'inline-grid',
    'block',
    'inline',
    'inline-block',
    'flow-root',
    'list-item',
    'table',
    'inline-table',
    'table-row-group',
    'table-header-group',
    'table-footer-group',
    'table-row',
    'table-cell',
    'table-column',
    'table-column-group',
    'table-caption',
])

// 디스플레이 유효성 검사
const validDisplay = (display, type) => {
    if (!displaySet.has(display)) {
        throw new Error(`Invalid display value "${display}" for type "${type}".\n` + `Allowed values: ${[...displaySet].join(', ')}`)
    }
}

// 디스플레이가 속한 그룹 판별
const patchDisplayCategory = (display) => {
    for (const category in displayCategories) {
        if (displayCategories[category].includes(display)) return category
    }
    return 'common' // 기본값
}

function displayMiddleware(type, display) {
    const getDisplay = tableTags.has(type) ? tableDisplayMap[type] : display

    console.log('get-display:', getDisplay)

    // display 유효성 검사 미들웨어 호출
    validDisplay(getDisplay, type)

    const displayCategory = patchDisplayCategory(getDisplay)
    console.log('patchDisplayCategory:', displayCategory)

    return { displayCategory, patchDisplay: getDisplay }
}

export default displayMiddleware
