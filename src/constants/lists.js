/** INDEX
 * -- naming rule: `${name}List` --
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
 * -- export default lists --
 * lists = { All List }
 */

export const tableTagList = ['table', 'caption', 'thead', 'tfoot', 'tbody', 'colgroup', 'tr', 'td', 'th', 'col']

export const displayList = [
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
]

export const onEventList = [
    // 마우스 이벤트
    'onClick',
    'onDoubleClick',
    'onMouseDown',
    'onMouseEnter',
    'onMouseLeave',
    'onMouseMove',
    'onMouseOut',
    'onMouseOver',
    'onMouseUp',
    'onContextMenu',

    // 키보드 이벤트
    'onKeyDown',
    'onKeyPress',
    'onKeyUp',

    // 포커스 이벤트
    'onFocus',
    'onBlur',
    'onFocusIn',
    'onFocusOut',

    // 폼 이벤트
    'onChange',
    'onInput',
    'onInvalid',
    'onSubmit',
    'onReset',

    // 터치 이벤트
    'onTouchCancel',
    'onTouchEnd',
    'onTouchMove',
    'onTouchStart',

    // 드래그 이벤트
    'onDrag',
    'onDragEnd',
    'onDragEnter',
    'onDragExit',
    'onDragLeave',
    'onDragOver',
    'onDragStart',
    'onDrop',

    // 휠 이벤트
    'onWheel',

    // 폼 전용 추가 이벤트
    'onSelect',

    // 복사/붙여넣기 이벤트
    'onCopy',
    'onCut',
    'onPaste',

    // 미디어 이벤트
    'onAbort',
    'onCanPlay',
    'onCanPlayThrough',
    'onDurationChange',
    'onEmptied',
    'onEncrypted',
    'onEnded',
    'onLoadedData',
    'onLoadedMetadata',
    'onLoadStart',
    'onPause',
    'onPlay',
    'onPlaying',
    'onProgress',
    'onRateChange',
    'onSeeked',
    'onSeeking',
    'onStalled',
    'onSuspend',
    'onTimeUpdate',
    'onVolumeChange',
    'onWaiting',

    // 이미지/미디어 로딩
    'onLoad',
    'onError',

    // 애니메이션/트랜지션 이벤트
    'onAnimationStart',
    'onAnimationEnd',
    'onAnimationIteration',
    'onTransitionEnd',

    // 기타
    'onPointerDown',
    'onPointerMove',
    'onPointerUp',
    'onPointerCancel',
    'onPointerEnter',
    'onPointerLeave',
    'onPointerOver',
    'onPointerOut',
    'onGotPointerCapture',
    'onLostPointerCapture',

    // UI 이벤트
    'onScroll',
    'onResize',
    'onToggle',

    // Composition 이벤트
    'onCompositionStart',
    'onCompositionUpdate',
    'onCompositionEnd',
]

export const pseudoClassList = [
    // Dynamic pseudo-classes
    'active',
    'focus',
    'hover',
    'focus-visible',
    'focus-within',
    'target',

    // Link-related
    'link',
    'visited',
    'any-link',

    // Form/UI state
    'checked',
    'indeterminate',
    'disabled',
    'enabled',
    'default',
    'in-range',
    'out-of-range',
    'invalid',
    'valid',
    'optional',
    'required',
    'read-only',
    'read-write',
    'placeholder-shown',

    // Structural
    'empty',
    'first-child',
    'last-child',
    'only-child',
    'first-of-type',
    'last-of-type',
    'only-of-type',
    'nth-child',
    'nth-last-child',
    'nth-of-type',
    'nth-last-of-type',
    'root',
    'scope',

    // Logical/selector
    'not',
    'is',
    'where',

    // Language/direction
    'lang',
]

export const pseudoElementList = [
    // Text styling pseudo-elements
    'first-letter',
    'first-line',
    'selection',

    // Generated content pseudo-elements
    'before',
    'after',

    // Commonly supported experimental (조건부)
    'placeholder', // 사용 빈도 높음 → 유지
]

export const allPseudoList = [...pseudoClassList, ...pseudoElementList]

export const flexCssList = [
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

export const gridCssList = [
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

export const tableCssList = [
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

const gridItems = [
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

export const commonCssList = [
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

const lists = {
    tableTagList,
    displayList,
    onEventList,
    pseudoClassList,
    pseudoElementList,
    allPseudoList,
    flexCssList,
    gridCssList,
    tableCssList,
    commonCssList,
}

export default lists
