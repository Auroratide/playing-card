export const CardValue = {
    '2': '2',
    '3': '3',
    '4': '4',
    '5': '5',
    '6': '6',
    '7': '7',
    '8': '8',
    '9': '9',
    '10': '10',
    'j': 'j',
    'q': 'q',
    'k': 'k',
    'a': 'a',
}

export const fromString = (s: string | null): keyof typeof CardValue | null => {
    const ls = s?.toLowerCase()
    if (Object.keys(CardValue).includes(ls ?? ''))
        return ls as keyof typeof CardValue
    else
        return null
}
