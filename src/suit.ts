export const CardSuit = {
    's': 's',
    'h': 'h',
    'c': 'c',
    'd': 'd',
}

export const suitFromString = (s: string | null): keyof typeof CardSuit | null => {
    const ls = s?.toLowerCase()
    if (Object.keys(CardSuit).includes(ls ?? ''))
        return ls as keyof typeof CardSuit
    else
        return null
}
