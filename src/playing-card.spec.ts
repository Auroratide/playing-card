import { expect, fixture } from '@open-wc/testing'
import { PlayingCard } from './playing-card'
import './define'

describe('my-component', () => {
    const displayValue = (elem: PlayingCard) => elem.shadowRoot?.querySelector('.value')?.textContent
    const displaySuit = (elem: PlayingCard) => elem.shadowRoot?.querySelector('#suit-container')?.className

    const label = (elem: PlayingCard) => elem.getAttribute('aria-label')

    describe('value', () => {
        it('numerical value', async () => {
            const elem = await fixture<PlayingCard>(`
                <playing-card value="6"></playing-card>
            `)

            expect(displayValue(elem)).to.equal('6')
        })

        it('face value', async () => {
            const elem = await fixture<PlayingCard>(`
                <playing-card value="q"></playing-card>
            `)

            expect(displayValue(elem)).to.equal('q')
        })

        it('update via property', async () => {
            const elem = await fixture<PlayingCard>(`
                <playing-card value="2"></playing-card>
            `)

            expect(displayValue(elem)).to.equal('2')

            elem.value = 'k'
            expect(displayValue(elem)).to.equal('k')
        })

        it('update via attribute', async () => {
            const elem = await fixture<PlayingCard>(`
                <playing-card value="a"></playing-card>
            `)

            expect(displayValue(elem)).to.equal('a')

            elem.setAttribute('value', '10')
            expect(displayValue(elem)).to.equal('10')
        })

        it('unknown value', async () => {
            const elem = await fixture<PlayingCard>(`
                <playing-card value="1"></playing-card>
            `)

            expect(elem.value).to.be.null
        })
    })

    describe('suit', () => {
        it('some value', async () => {
            const elem = await fixture<PlayingCard>(`
                <playing-card suit="s"></playing-card>
            `)

            expect(displaySuit(elem)).to.equal('spades')
        })

        it('update via property', async () => {
            const elem = await fixture<PlayingCard>(`
                <playing-card suit="h"></playing-card>
            `)

            expect(displaySuit(elem)).to.contain('hearts')

            elem.suit = 'd'
            expect(displaySuit(elem)).to.contain('diamonds')
        })

        it('update via attribute', async () => {
            const elem = await fixture<PlayingCard>(`
                <playing-card suit="c"></playing-card>
            `)

            expect(displaySuit(elem)).to.contain('clubs')

            elem.setAttribute('suit', 's')
            expect(displaySuit(elem)).to.contain('spades')
        })

        it('unknown value', async () => {
            const elem = await fixture<PlayingCard>(`
                <playing-card suit="1"></playing-card>
            `)

            expect(elem.suit).to.be.null
        })
    })

    describe('accessibility', () => {
        it('default role', async () => {
            const elem = await fixture<PlayingCard>(`
                <playing-card></playing-card>
            `)

            expect(elem.getAttribute('role')).to.equal('figure')
        })

        it('user-provided role', async () => {
            const elem = await fixture<PlayingCard>(`
                <playing-card role="presentation"></playing-card>
            `)

            expect(elem.getAttribute('role')).to.equal('presentation')
        })

        describe('label', () => {
            it('value and suit', async () => {
                const elem = await fixture<PlayingCard>(`
                    <div>
                        <playing-card id="ace-spades" value="a" suit="s"></playing-card>
                        <playing-card id="seven-hearts" value="7" suit="h"></playing-card>
                        <playing-card id="jack-diamonds" value="j" suit="d"></playing-card>
                    </div>
                `)

                expect(label(elem.querySelector('#ace-spades')!)).to.equal('ace of spades')
                expect(label(elem.querySelector('#seven-hearts')!)).to.equal('7 of hearts')
                expect(label(elem.querySelector('#jack-diamonds')!)).to.equal('jack of diamonds')
            })

            it('only value', async () => {
                const elem = await fixture<PlayingCard>(`
                    <playing-card value="a"></playing-card>
                `)

                expect(label(elem)).to.equal('unknown card')
            })

            it('only suit', async () => {
                const elem = await fixture<PlayingCard>(`
                    <playing-card suit="h"></playing-card>
                `)

                expect(label(elem)).to.equal('unknown card')
            })

            it('neither value nor suit', async () => {
                const elem = await fixture<PlayingCard>(`
                    <playing-card></playing-card>
                `)

                expect(label(elem)).to.equal('unknown card')
            })
        })
    })
})
