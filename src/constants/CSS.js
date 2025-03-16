const flexPropsKeys = [
    'display', // 반드시 'flex'여야 유효
    'flexFlow',
    'flexDirecwtion',
    'flexWrap',
    'justifyContent',
    'alignContent',
    'alignItems',
    'gap',
]
// 그리드 박스 관련 속성
const gridPropsKeys = [
    'display', // 반드시 'grid'여야 유효
    'gridTemplateColumns',
    'gridTemplateRows',
    'gridGap',
    'alignItems',
    'justifyContent',

    'gridTemplateRows',
    'gridTemplateColumns',
    'gridTemplateAreas',
    'gridTemplate',
    'rowGap',
    'columnGap',
    'gap',

    'gridAutoRows',
    'gridAutoColumns',
    'gridAutoFlow',
    
]

const tablePropsKeys = [
    'colspan', // 테이블 속성
    'rowspan',
    'cellSpacing',
    'cellPadding',
    'borderCollapse',
    'captionSide',
    'emptyCells',
    'tableLayout',
]

const flexItems = [
    'order', // flex 자식 속성들
    'flex',
    'flexGrow',
    'flexShrink',
    'flexBasis',
    'alignSelf',
]

const gridItems = []

// 공통 속성
const commonPropsKeys = [
    'padding', // 공통속성
    'paddingLeft',
    'paddingRight',
    'paddingTop',
    'paddingBottom',
    'margin',
    'marginTop',
    'marginRight',
    'marginBottom',
    'marginLeft',
    'backgroundColor',
    'border',
    'borderTop',
    'borderBottom',
    'borderRight',
    'borderLeft',
    'borderRadius',
    'boxShadow',
    'width',
    'height',
    'maxWidth',
    'minWidth',
    'maxHeight',
    'minHeight',
    'aspectRatio',
    'boxSizing',
    'outline',
    'tabindex',
    'caretColor',
    'pointerEvents',
    'left',
    'right',
    'top',
    'bottom',
    'userSelect',
    'cursor',
    'position',
    'zIndex',
    'objectFit',
    'resize',
    'textAlign',
    'lineHeight',
    'letterSpacing',
    'color',
    'fontSize',
    'fontWeight',
    'textDecoration',
    'fontFamily',
    'alignSelf',
    'justifySelf',
    'opacity',
    'transition',
    'transform',
    'whiteSpace',
    'animation',
    'willChange',
    'all',
    ...flexItems,
]
