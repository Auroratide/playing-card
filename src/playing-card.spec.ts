import { expect, fixture } from '@open-wc/testing'
import { PlayingCard } from './playing-card'
import './define'

describe('my-component', () => {
    const display = (elem: PlayingCard) => elem.shadowRoot?.getElementById('value')?.textContent

    describe('value', () => {
        it('numerical value', async () => {
            const elem = await fixture<PlayingCard>(`
                <playing-card value="6"></playing-card>
            `)

            expect(display(elem)).to.contain('6')
        })

        it('face value', async () => {
            const elem = await fixture<PlayingCard>(`
                <playing-card value="q"></playing-card>
            `)

            expect(display(elem)).to.contain('q')
        })

        it('update via property', async () => {
            const elem = await fixture<PlayingCard>(`
                <playing-card value="2"></playing-card>
            `)

            expect(display(elem)).to.contain('2')

            elem.value = 'k'
            expect(display(elem)).to.contain('k')
        })

        it('update via attribute', async () => {
            const elem = await fixture<PlayingCard>(`
                <playing-card value="a"></playing-card>
            `)

            expect(display(elem)).to.contain('a')

            elem.setAttribute('value', '10')
            expect(display(elem)).to.contain('10')
        })

        it('unknown value', async () => {
            const elem = await fixture<PlayingCard>(`
                <playing-card value="1"></playing-card>
            `)

            expect(elem.value).to.be.null
        })
    })
})
