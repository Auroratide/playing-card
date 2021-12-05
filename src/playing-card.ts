import { CardValue, valueFromString } from './value'
import { CardSuit, suitFromString } from './suit'

const Attr = {
    value: 'value',
    suit: 'suit',
}

export class PlayingCard extends HTMLElement {
    static elementName = 'playing-card'

    static html = `
        <svg id="paths">
            <defs>
                <clipPath id="hearts" clipPathUnits="objectBoundingBox">
                    <path d="
                        M 0.5 1
                        C 0.5 1 0.075 0.7 0.1 0.25
                        A 0.2 0.25 1 1 1 0.5 0.3
                        A 0.2 0.25 1 1 1 0.9 0.25
                        C 0.925 0.7 0.5 1 0.5 1 Z
                    " />
                </clipPath>
                <clipPath id="clubs" clipPathUnits="objectBoundingBox">
                    <path d="
                        M 0.3 0.4
                        A 0.225 0.225 1 1 1 0.7 0.4
                        A 0.225 0.225 1 1 1 0.55 0.75
                        Q 0.55 0.85 0.6 1
                        L 0.4 1
                        Q 0.45 0.85 0.45 0.75
                        A 0.225 0.225 1 1 1 0.3 0.4 Z
                    " />
                </clipPath>
                <clipPath id="spades" clipPathUnits="objectBoundingBox">
                    <path d="
                        M 0.5 0
                        C 0.65 0.25 0.9 0.375 0.9 0.6
                        S 0.65 0.9 0.55 0.75
                        Q 0.55 0.85 0.6 1
                        L 0.4 1
                        Q 0.45 0.85 0.45 0.75
                        C 0.35 0.9 0.1 0.825 0.1 0.6
                        S 0.35 0.25 0.5 0 Z
                    " />
                </clipPath>
            </defs>
        </svg>
        <div id="${Attr.suit}-container">
            <div class="card-value">
                <span class="${Attr.value}"></span>
                <div class="${Attr.suit}"></div>
            </div>
            <div class="card-value upside-down">
                <span class="${Attr.value}"></span>
                <div class="${Attr.suit}"></div>
            </div>
        </div>
    `

    static css = `
        :host {
            --w: var(--card-width, 5em);
            box-sizing: border-box;
            display: inline-block;
            position: relative;

            width: var(--w);
            height: calc(7 / 5 * var(--w));
            border: calc(0.025 * var(--w)) solid black;
            border-radius: calc(0.0625 * var(--w));
        }
        
        #paths {
            width: 0;
            height: 0;
            position: absolute;
        }

        .value {
            font-size: calc(0.2 * var(--w));
            text-transform: uppercase;
        }

        .upside-down {
            transform: rotate(180deg);
        }

        .card-value {
            position: absolute;
            top: 0; left: calc(0.025 * var(--w));
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .card-value.upside-down {
            top: auto; left: auto;
            bottom: 0; right: calc(0.025 * var(--w));
        }

        .suit {
            width: calc(0.2 * var(--w));
            height: calc(0.2 * var(--w));
            background-color: currentColor;
        }

        .diamonds, .hearts {
            color: red;
        }

        .clubs, .spades {
            color: black;
        }

        .diamonds .suit {
            clip-path: polygon(50% 0, 90% 50%, 50% 100%, 10% 50%);
        }

        .hearts .suit {
            clip-path: url(#hearts);
        }

        .clubs .suit {
            clip-path: url(#clubs);
        }

        .spades .suit {
            clip-path: url(#spades);
        }
    `

    private elements = {
        value: () => this.shadowRoot!.querySelectorAll(`.${Attr.value}`),
        suitContainer: () => this.shadowRoot!.getElementById(`${Attr.suit}-container`),
        suit: () => this.shadowRoot!.querySelectorAll(`.${Attr.suit}`),
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
        this.elements.value().forEach(it => it.textContent = this.value)
        this.elements.suitContainer()!.className = CardSuit[this.suit!]
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
