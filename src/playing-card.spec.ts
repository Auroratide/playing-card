import { expect, fixture } from '@open-wc/testing'
import { PlayingCard } from './playing-card'
import './define'

describe('my-component', () => {
    it('renders', async () => {
        const elem = await fixture<PlayingCard>(`
            <playing-card></playing-card>
        `)

        expect(elem.shadowRoot?.textContent).to.contain('Hello!')
    })
})
