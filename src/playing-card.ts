import { CardValue, valueFromString } from './value'
import { CardSuit, suitFromString } from './suit'

export class PlayingCard extends HTMLElement {
    static elementName = 'playing-card'

    static html = `
        <span id="value"></span>
        <span id="suit"></span>
    `

    static css = ``

    private elements = {
        value: () => this.shadowRoot!.getElementById('value')!,
        suit: () => this.shadowRoot!.getElementById('suit')!,
    }

    constructor() {
        super()
        this.createRoot()
    }

    static get observedAttributes(): string[] {
        return ['value', 'suit']
    }

    attributeChangedCallback(attr: string, oldValue: string, newValue: string) {
        this.setDisplay()
    }

    get value(): keyof typeof CardValue | null {
        return valueFromString(this.getAttribute('value'))
    }
    set value(v: keyof typeof CardValue | null) {
        this.setAttribute('value', v ?? '')
    }

    get suit(): keyof typeof CardSuit | null {
        return suitFromString(this.getAttribute('suit'))
    }
    set suit(v: keyof typeof CardSuit | null) {
        this.setAttribute('suit', v ?? '')
    }

    private createRoot(): ShadowRoot {
        const root = this.shadowRoot ?? this.attachShadow({ mode: 'open' })

        const style = document.createElement('style')
        style.innerHTML = (this.constructor as typeof PlayingCard).css

        const template = document.createElement('template')
        template.innerHTML = (this.constructor as typeof PlayingCard).html

        root.appendChild(style)
        root.appendChild(template.content)

        return root
    }

    private setDisplay = () => {
        this.elements.value().textContent = this.value
        this.elements.suit().textContent = this.suit
    }
}
