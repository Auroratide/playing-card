import { CardValue, valueFromString } from './value'
import { CardSuit, suitFromString } from './suit'

const Attr = {
    value: 'value',
    suit: 'suit',
    facedown: 'facedown',
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
            <div class="flip-container">
                <div class="front">
                    <div class="top-left">
                        <div class="${Attr.suit}"></div>
                    </div>
                    <div class="bottom-right">
                        <div class="${Attr.suit}"></div>
                    </div>
                    <div class="center">
                        <span class="${Attr.value}"></span>
                    </div>
                </div>
                <div class="back">
                    <div class="back-pattern"></div>
                </div>
            </div>
        </div>
    `

    static css = `
        :host {
            --w: var(--playing-card-width, 5em);
            box-sizing: border-box;
            display: inline-block;
            position: relative;

            width: var(--w);
            height: calc(7 / 5 * var(--w));
        }

        *, *::before, *::after {
            box-sizing: border-box;
        }
        
        #paths {
            width: 0;
            height: 0;
            position: absolute;
        }

        #suit-container {
            width: 100%;
            height: 100%;
        }

        .value {
            font-size: calc(0.2 * var(--w));
            text-transform: uppercase;
        }

        .top-left {
            position: absolute;
            top: calc(0.05 * var(--w));
            left: calc(0.025 * var(--w));
        }

        .bottom-right {
            position: absolute;
            bottom: calc(0.05 * var(--w));
            right: calc(0.025 * var(--w));
            transform: rotate(180deg);
        }

        .center {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: calc(0.5 * var(--w));
            font-weight: bold;
        }

        .suit {
            width: calc(0.25 * var(--w));
            height: calc(0.25 * var(--w));
            background-color: currentColor;
        }

        .diamonds {
            color: var(--playing-card-diamonds-color, hsl(0, 100%, 50%));
        }

        .hearts {
            color: var(--playing-card-hearts-color, hsl(0, 100%, 50%));
        }

        .clubs {
            color: var(--playing-card-clubs-color, hsl(0, 0%, 0%));
        }

        .spades {
            color: var(--playing-card-spades-color, hsl(0, 0%, 0%));
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

        .front, .back {
            width: 100%;
            height: 100%;
            transition: transform 1s;
            backface-visibility: hidden;
            transform-style: preserve-3d;
            border: calc(0.025 * var(--w)) solid black;
            border-radius: calc(0.0625 * var(--w));
            background-color: var(--playing-card-bg, hsl(0, 0%, 100%));
        }

        .front {
            transform: rotateY(0deg);
        }

        .back {
            position: absolute;
            top: 0;
            left: 0;
            transform: rotateY(180deg);
        }

        .flip-container {
            width: 100%;
            height: 100%;
            perspective: calc(20 * var(--w));
        }

        :host([facedown]) .front {
            transform: rotateY(180deg);
        }

        :host([facedown]) .back {
            transform: rotateY(360deg);
        }

        .back {
            padding: calc(0.04 * var(--w));
        }

        .back-pattern {
            --bg: var(--playing-card-back-bg, hsl(350, 100%, 50%));
            width: 100%;
            height: 100%;
            background-image:
                linear-gradient(54.46deg, var(--bg) 25%, transparent 25%, transparent 75%, var(--bg) 75%, var(--bg)),
                linear-gradient(125.54deg, var(--bg) 25%, transparent 25%, transparent 75%, var(--bg) 75%, var(--bg));
            background-size: calc(0.1245 * var(--w)) calc(0.182 * var(--w));
            border-radius: calc(0.02 * var(--w));
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

    get facedown(): boolean {
        return this.hasAttribute(Attr.facedown)
    }
    set facedown(v: boolean) {
        this.toggleAttribute(Attr.facedown, v)
    }

    flip = () => this.facedown = !this.facedown

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

    private accessibleName = (): string => {
        if (this.facedown)
            return 'card faced down'
        else if (this.value && this.suit)
            return `${CardValue[this.value]} of ${CardSuit[this.suit]}`
        else
            return 'unknown card'
    }

    private setAccessibility = () => {
        if (!this.getAttribute('role')) {
            this.setAttribute('role', 'img')
        }

        this.setAttribute('aria-label', this.accessibleName())
    }
}
