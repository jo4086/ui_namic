# 📌 ui_namic

<예시 동작 GIF 첨부 및 간단한 코드 예제>

## 🚀 소개

저는 6개월간 아카데미에서 HTTP, CSS부터 시작해 Node.js, React까지 배운 신입 개발자입니다.

이 프로젝트의 시작은 MUI를 사용하면서 겪은 어려움과 재사용 가능한 스타일 시스템을 직접 만들어 보고 싶다는 욕심에서 비롯되었습니다.
아카데미에서 개인 프로젝트를 진행하며, MUI에 의존하지 않고 Styled-components를 활용하여 재사용 가능한 컴포넌트와 props에 대한 이해도를 높이기 위해 직접 스타일 시스템을 정의해 보기로 했습니다.

처음에는 단순히 props로 CSS를 넘겨주는 방식이었지만, 점점 더 편리한 스타일링 라이브러리를 만들고 싶다는 욕심이 생겼습니다.
초기에는 미흡한 코드였지만, CSS를 자동화하는 유틸리티 함수의 필요성을 깨닫고 점점 발전하게 되었습니다.

<details>
<summary> 예제 코드 </summary>

```javascript
/**
 * @param {object} base - 기본 css
 * @param {object} keyframes - keyframes css
 * @param {object} media - media css
 * @param {obejct} pseudo - 가상요소 또는 가상선택자 css
 * @param {object} dynamic - onEvent와 상호작용하여 변하는 css
 */

const commonStyle = { one: '0.5s ease 1' }

const BoxStyle4 = {
    userSelect: 'none',
    color: 'black',
    fontSize: '20px',
    border: '1px solid black',
    outline: '0px',
    width: '500px',
    margin: '30px auto 0 30px',
    backgroundColor: 'white',
    justifyContent: 'end',
    padding: '0 20px',
    boxSizing: 'border-box',
    textAlign: 'right',
    transition: [`color ${commonStyle.one}`, `background-color ${commonStyle.one}`],
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    position: 'relative',

    keyframes: {
        move: {
            duration: '3s',
            iteration: 1,
            timingFunction: 'ease',
            percent: {
                0: { transform: 'translateX(0%)', opacity: 1, easing: 'ease-in' },
                15: { transform: 'translateX(50%)', opacity: 0, easing: 'ease-in-out' },
                70: { transform: 'translateX(75%)', opacity: 0.5, easing: 'linear' },
                100: { transform: 'translateX(50%)', opacity: 0, cursor: 'default', easing: 'ease-out' },
            },
        },
        scale: {
            animation: '3s 5 ease-in',
            percent: {
                0: { transform: 'scale(1)' },
                100: { transform: 'scale(1.5)' },
            },
        },
    },

    media: {
        self: [
            { min: 768, max: 1023, width: '200px', height: '50px' },
            { min: 1024, max: 1279, width: '300px', height: '100px' },
        ],
        down: [
            { max: 1023, width: '200px', height: '50px' },
            { max: 1279, width: '300px', height: '100px' },
        ],
        up: [
            { min: 768, width: '200px', height: '50px' },
            { min: 1280, width: '300px', height: '100px' },
        ],
    },

    pseudo: {
        hover: {
            color: 'green',
            backgroundColor: 'black',
        },
        after: {
            position: 'absolute',
            content: '"hello"',
            left: '30px',
            top: '3px',
            fontSize: '16px',
            transition: [`left ${commonStyle.one}`, `top ${commonStyle.one}`, `fontSize ${commonStyle.one}`],
        },
        before: {
            color: 'red',
            position: 'absolute',
            content: '"Click to Change Opacity"',
            right: '-220px',
            top: '0px',
        },
    },

    dynamic: {
        color: 'blue',
        backgroundColor: 'pink',
        padding: '0 200px',

        pseudo: {
            hover: {
                backgroundColor: 'red',
                color: 'white',
            },
            after: {
                position: 'absolute',
                content: '"hello"',
                left: '30px',
                top: '3px',
                fontSize: '16px',
                transition: [`left ${commonStyle.one}`, `top ${commonStyle.one}`, `fontSize ${commonStyle.one}`],
            },
            before: {
                opacity: '0',
            },
        },
    },
}
```

</details>

<!-- <초기 코드 예제> -->
<details>
<summary>초기 코드</summary>

```javascript
// styled.js
import styled from 'styled-components'

export const Box = styled.div`
    box-sizing: border-box;
    display: ${(props) => props.$model || 'block'};
    gap: ${(props) => props.$gap || '0'};
    justify-content: ${(props) => props.$justify || 'flex-start'};
    align-items: ${(props) => props.$align || 'stretch'};
    flex-direction: ${(props) => (props.$model === 'flex' ? props.$direction || 'row' : 'unset')};

    background-color: ${(props) => props.$backgroundColor || 'transparent'};
    grid-template-columns: ${(props) => (props.$model === 'grid' ? props.$columns || 'repeat(3, 1fr)' : 'none')};
    grid-template-rows: ${(props) => (props.$model === 'grid' ? props.$rows || 'auto' : 'none')};
    width: 100%;
    max-width: ${(props) => props.$maxWidth || 'none'};
    padding: ${(props) => props.$padding || '0'};
    margin: ${(props) => props.$margin || '0 auto'};
    aspect-ratio: ${(props) => props.$aspectRatio || 'initial'};
    border-radius: ${(props) => props.$borderRadius || 'initial'};
    border: ${(props) => props.$border || '1px solid rgba(0,0,0,0.3)'};
`
```

```javascript
// Box.jsx
import * as a from '../styled.js'

const Box = ({ model, gap, justify, align, direction, columns, rows, children, style, ...props }) => {
    const styledPropsKeys = ['padding', 'margin', 'gap', 'columns', 'rows', 'backgroundColor', 'aspectRatio', 'borderRadius', 'border', 'maxWidth']

    const styledProps = Object.keys(props).reduce((acc, key) => {
        if (styledPropsKeys.includes(key)) {
            acc[`$${key}`] = props[key]
        }
        return acc
    }, {})

    return (
        <a.Box $model={model} $gap={gap} $justify={justify} $align={align} $direction={direction} $columns={columns} $rows={rows} {...styledProps} style={style}>
            {children}
        </a.Box>
    )
}
export default Box
```

</details>

## 🔄 개발 과정 & 시행착오

처음에는 props를 활용해 직접 CSS를 적용하는 단순한 방식이었습니다. 하지만,

props의 개수가 많아질수록 유지보수가 어려워지고,
외부 라이브러리와의 결합이 복잡해지는 문제를 겪었습니다.
이에 따라 내부적으로 props를 분리하고, 불필요한 속성은 필터링하면서 필요한 값만 유지하는 유틸리티 함수가 필요하다는 것을 깨닫게 되었고, 이를 기반으로 자동화된 스타일 시스템을 만들기 시작했습니다.

📌 시행착오 과정 및 코드 변화 기록: [링크 추가 예정]

그 과정에서 단순한 props 전달이 아닌, 가상 선택자(pseudo-selectors)와 다양한 on이벤트를 결합하여 동적인 스타일을 자동으로 적용할 수 있는 방식을 구상하게 되었습니다.

결과적으로, 이 프로젝트는 개인 프로젝트 기간 동안 발전하여 하나의 스타일링 라이브러리로 탄생하게 되었습니다. 🎉

## 🎯 프로젝트 목표

이 라이브러리는 다양한 가상(pseudo) 선택자와 이벤트 기반 스타일링을 동적으로 적용할 수 있도록 하는 것이 목표입니다.

이를 위해,\
✔ dynamic이라는 키를 중심으로\
✔ dynamicType과 dynamicCss props를 활용하여\
✔ 특정 이벤트에 맞춰 자동으로 스타일이 적용되는 시스템을 구축했습니다.

### 🏗 아키텍처

이 라이브러리는 두 개의 핵심 폴더로 구성됩니다.

**🔹 1. cores/ (중앙 스타일 관리 시스템)**

-   CSS를 생성하고 조합하는 핵심 로직이 포함된 폴더입니다.
-   전달받은 props를 적절히 분리하고, 필요한 유틸리티 함수로 전달한 뒤 최종적으로 스타일을 생성합니다.
    **🔹 2. utils/ (스타일 생성 유틸리티 함수)**
-   cores/에서 호출하는 비즈니스 로직이 포함된 파일들이 모여 있습니다.
-   주요 기능별로 4가지로 나뉩니다.
-   📌 utils/ 주요 모듈
    -   1️⃣ filters/ → props의 타입 분리, 특정 키(dynamic, pseudo, media, keyframes) 추출
    -   2️⃣ generates/ → 분리된 props를 CSS 코드로 변환 (dynamic, media, keyframes, pseudo 등)
    -   3️⃣ keys/ → 유효성 검사 (올바른 CSS 속성 및 display 값 확인)
    -   4️⃣ triggers/ → 입력된 이벤트에 따라 상태를 변경하는 커스텀 use 훅

## 🔸 추가적인 시스템

-   errors/ → keys/를 통해 잘못된 스타일을 검출하여 에러를 표시
-   styled-components 기반의 JS 파일 → 전체 스타일 시스템을 작동시키는 핵심 파일들
-   재사용 가능한 컴포넌트 → 최종적으로 이 파일을 통해 실제 UI에서 스타일을 적용

📌 디렉토리 구조 및 아키텍처 흐름도 (이미지 첨부 예정)

## 📢 함께 만들어 나가고 싶습니다!

저는 아직 미숙한 개발자지만, 이 프로젝트에 대한 애착이 큽니다.\
하지만 혼자서 발전시키기에는 한계가 있기 때문에, 많은 분들의 피드백과 기여가 필요합니다.

## 🛠 이 프로젝트가 흥미롭게 느껴진다면 기여해주세요!

언제든지 환영합니다. 🙌

### 💡 기여 방법

이슈 등록 → 개선할 점이나 버그를 Issues에 남겨주세요!\
PR (Pull Request) 제출 → 기능을 개선하고 싶다면 자유롭게 PR을 열어주세요.\
토론 참여 → Discussions에서 의견을 나누고, 방향성을 함께 정해가면 좋겠습니다.\
📌 기여 가이드 문서 (추후 추가 예정)

## 📄 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.

## 🔥 결론

이 프로젝트는 단순한 스타일링 툴이 아니라, 재사용 가능한 UI 시스템을 고민하고 발전시키는 과정에서 탄생한 라이브러리입니다.

React에서 더욱 유연하고 동적인 스타일링을 하고 싶다면, 함께 발전시켜 나가요! 🚀
