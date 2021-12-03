export class PlayingCard extends HTMLElement {
    static elementName = 'playing-card'

    static html = `<p>Hello!</p>`

    static css = `p { color: red; }`

    constructor() {
        super()
        this.createRoot()
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
}
