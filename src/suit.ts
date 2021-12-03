export const CardSuit = {
    's': 'spades',
    'h': 'hearts',
    'c': 'clubs',
    'd': 'diamonds',
}

export const suitFromString = (s: string | null): keyof typeof CardSuit | null => {
    const ls = s?.toLowerCase()
    if (Object.keys(CardSuit).includes(ls ?? ''))
        return ls as keyof typeof CardSuit
    else
        return null
}
