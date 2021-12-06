# &lt;playing-card&gt; Element

Represents a standard playing card.

## Installation

You can import through CDN:

```html
<script type="module" src="https://unpkg.com/@auroratide/playing-card/lib/define.js"></script>
```

Or, you may install through [NPM](https://www.npmjs.com/package/@auroratide/playing-card) and include it as part of your build process:

```
$ npm i @auroratide/playing-card
```

```js
import '@auroratide/playing-card/lib/define.js'
```

## Usage

`<playing-card>` is a **markup element** that you can use in your HTML document.

```html
<playing-card value="7" suit="s"></playing-card>
```

The card can be made face down as well:

```html
<playing-card facedown value="q" suit="h"></playing-card>
```

### All Attributes

**value**
* Represents the value of the card
* Can be numerical values "2" through "10"
* Or a face card value:
  * "j" for Jack
  * "q" for Queen
  * "k" for King
  * "a" for Ace

**suit**
* Represents the suit of the card
* "s" for Spades
* "h" for Hearts
* "d" for Diamonds
* "c" for Clubs

**facedown**
* Whether the card is faced downward, hiding its value
* When toggled, the card has a flipping animation

## Style API

Since `toggle-switch` is Just HTML<sup>TM</sup>, you can style it the same way you style any HTML tag.

```css
playing-card {
    --playing-card-width: 10rem;
}
```

### Variables

| Variable | Default | Description |
| ------------- | --------- | ------------- |
| `--playing-card-width` | `5em` | Width of the card; use this to keep all elements of the card proportional |
| `--playing-card-diamonds-color` | `hsl(0, 100%, 50%)` | Color of the diamonds suit |
| `--playing-card-hearts-color` | `hsl(0, 100%, 50%)` | Color of the hearts suit |
| `--playing-card-spades-color` | `hsl(0, 0%, 0%)` | Color of the spades suit |
| `--playing-card-clubs-color` | `hsl(0, 0%, 0%)` | Color of the clubs suit |
| `--playing-card-bg` | `hsl(0, 0%, 100%)` | Color of the card background |
| `--playing-card-back-bg` | `hsl(350, 100%, 50%)` | Color of the pattern on the card's back |

## Javascript API

The element exposes a function to programmatically toggle its state:

| Method | Description |
| ------------- | ------------- |
| `flip()` | Flips the card over |

### Properties

Each attribute can be accessed as a Javascript property.

* `elem.value`
* `elem.suit`
* `elem.facedown`

## Accessibility

This custom element is built with accessibility in mind!

* The element uses the `img` role with a label indicating its value and suit
* When the card is face down, the value and suit are not included in the label
