import { CardValue, valueFromString } from './value'
import { CardSuit, suitFromString } from './suit'

const Attr = {
    value: 'value',
    suit: 'suit',
}

export class PlayingCard extends HTMLElement {
    static elementName = 'playing-card'

    static html = `
        <span id="${Attr.value}"></span>
        <span id="${Attr.suit}"></span>
    `

    static css = ``

    private elements = {
        value: () => this.shadowRoot!.getElementById(Attr.value)!,
        suit: () => this.shadowRoot!.getElementById(Attr.suit)!,
    }

    constructor() {
        super()
        this.createRoot()
    }

    connectedCallback() {
        this.setDisplay()
        this.setAccessibility()
    }

    static get observedAttributes(): string[] {
        return Object.values(Attr)
    }

    attributeChangedCallback(attr: string, oldValue: string, newValue: string) {
        this.setDisplay()
        this.setAccessibility()
    }

    get value(): keyof typeof CardValue | null {
        return valueFromString(this.getAttribute(Attr.value))
    }
    set value(v: keyof typeof CardValue | null) {
        this.setAttribute(Attr.value, v ?? '')
    }

    get suit(): keyof typeof CardSuit | null {
        return suitFromString(this.getAttribute(Attr.suit))
    }
    set suit(v: keyof typeof CardSuit | null) {
        this.setAttribute(Attr.suit, v ?? '')
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

    private setAccessibility = () => {
        if (!this.getAttribute('role')) {
            this.setAttribute('role', 'figure')
        }

        if (!this.value || !this.suit)
            this.setAttribute('aria-label', 'unknown card')
        else
            this.setAttribute('aria-label', `${CardValue[this.value]} of ${CardSuit[this.suit]}`)
    }
}
