export const flexPropsKeys = [
    'display', // flex
    'flexFlow',
    'flexDirection',
    'flexWrap',
    'justifyContent',
    'alignContent',
    'alignItems',
    'alignSelf',
    'justifySelf', // ✔ 일부 지원
    'placeItems', // ✔ 축약형
    'placeContent', // ✔ 축약형
    'placeSelf', // ✔ 축약형
    'gap',
]

// 그리드 박스 관련 속성
export const gridPropsKeys = [
    'display', // 반드시 'grid'여야 유효
    'gridTemplateColumns',
    'gridTemplateRows',
    'gridGap',
    'alignItems',
    'justifyContent',
    'justifyItems',
    'placeItems',
    'placeContent',

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

export const tablePropsKeys = [
    'colspan', // 테이블 속성
    'rowspan',
    'cellSpacing',
    'cellPadding',
    'borderCollapse',
    'captionSide',
    'emptyCells',
    'tableLayout',
]

export const flexItems = [
    'order', // flex 자식 속성들
    'flex',
    'flexGrow',
    'flexShrink',
    'flexBasis',
    'alignSelf',
]

export const gridItems = [
    'gridRowStart', // grid 자식 속성들
    'gridRowEnd',
    'gridRow',
    'gridColumnStart',
    'gridColumnEnd',
    'gridColumn',
    'gridArea',
    'alignSelf',
    'justifySelf',
    'placeSelf',
    'order',
    'zIndex',
]

// 공통 속성
export const commonPropsKeys = [
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
    'tabIndex',
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
    ...gridItems,
]
