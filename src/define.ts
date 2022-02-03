import { PlayingCard } from './playing-card'

if (!window.customElements.get(PlayingCard.elementName)) {
    window.customElements.define(PlayingCard.elementName, PlayingCard)
}
