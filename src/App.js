import Demo from './demo/pages/Demo'
import './App.css'

function normalizeTransitionArray(input) {
    if (typeof input === 'string') return input
    if (!Array.isArray(input)) return ''

    const results = []

    for (const item of input) {
        if (typeof item === 'string') {
            results.push(item)
        } else if (typeof item === 'object' && item.name && item.value) {
            const props = item.name.split(',').map((p) => p.trim())
            for (const prop of props) {
                results.push(`${prop} ${item.value}`)
            }
        }
    }

    return results.join(', ')
}

function transformTransitionRecursive(obj) {
    if (typeof obj !== 'object' || obj === null) return obj

    const result = Array.isArray(obj) ? [...obj] : { ...obj }

    for (const key in result) {
        const value = result[key]

        if (key === 'transition' && Array.isArray(value)) {
            result[key] = normalizeTransitionArray(value)
        } else if (typeof value === 'object') {
            result[key] = transformTransitionRecursive(value)
        }
    }

    return result
}

const input = {
    transition: [{ name: 'color, background-color', value: '0.5s ease 1' }, 'font-size 1s ease-in-out 1'],
    media: {
        down: [{ transition: [{ name: 'left, top', value: '0.3s ease' }, 'font-weight 3s ease-in'] }],
    },
    dynamic: {
        transition: [{ name: 'left, top', value: '0.3s ease' }, 'opacity 0.2s linear'],

        pseudo: {
            after: {
                transition: [{ name: 'left, top', value: '0.3s ease' }, 'opacity 0.2s linear'],
            },
        },
    },
    pseudo: {
        hover: {
            transition: [{ name: 'left, top', value: '0.3s ease' }, 'opacity 0.2s linear'],
        },
    },
}

function App() {
    // console.log('App.js', transformTransitionRecursive(input))
    return (
        <>
            <Demo></Demo>
        </>
    )
}

export default App
