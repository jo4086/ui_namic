export const pseudoClassesMap = [
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

export const pseudoElementsMap = [
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

export const allPseudoMap = [...pseudoClassesMap, ...pseudoElementsMap]
