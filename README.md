# Pre-load

## Quick Mode

```js
const { preload } = require('@kznjunk/pre-load')

const itemsToPreload = [
  'img/hello.png',
  'snd/there.mp3',
  'snd/i-dont-exist.mp3'
]

const preloadedItems = await preload(itemsToPreload) // result: [ 'img/hello.png', 'snd/there.mp3', false ]
```

## No extension case

```js
const { preload } = require('@kznjunk/pre-load')

const itemsToPreload = [
  'img/hello?size=42x42',
  'img/there?size=108x108'
]

const options = {
  type: 'img'
}

const preloadedItems = await preload(itemsToPreload, options) // result: [ 'img/hello?size=42x42', 'img/there?size=108x108' ]
```

## Callbacks & progress bar

```js
const { preload } = require('@kznjunk/pre-load')

const itemsToPreload = [
  'img/hello.png',
  'snd/there.mp3'
]

const options = {
  cb_foreach: () => { console.log('Another one') },
  cb_then: () => { console.log('Annnnd it\'s done.') },
}

const preloadedItems = await preload(itemsToPreload, options) // result: [ 'img/hello.png', 'snd/there.mp3' ]
```

## Real use case (todo..)

```js
console.log('nothing to see here')
```
