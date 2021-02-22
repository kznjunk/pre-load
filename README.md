# Pre-load

## Simple Mode

```js
const { preload } = require('@kznjunk/preload')
const itemsToPreload = [
  'img/hello.png',
  'snd/there.mp3',
  'snd/404.mp3'
]

const preloadedItems = await preload(itemsToPreload) // result: [ 'img/hello.png', 'snd/there.mp3', false ]
const preloadedItemsWithCb = preload(itemsToPreload, () => { console.log('General Kenobi') })
```

## Advanced Mode

```js
const { preload } = require('@kznjunk/preload')
const itemsToPreload = [
  {
  	type: 'img' // extensions might not be detectable
  	url: 'img/hello?size=42x42', // so you can specify the type
  	cb
  },
  {
  	type: 'snd'
  	url: 'snd/there.mp3',
  	cb
  }
]

const preloadedItems = await preload(itemsToPreload)
```

You can define one generic cb when all files are ready, or one cb per file. 
An example of usage could be to update a progress bar like:

```js
const { preload } = require('@kznjunk/preload')

const imgsToPreload = [
  'img/1.png',
  'img/2.png',
  'img/3.png'
]

const sndsToPreload = [
  'snd/1.png',
  'snd/2.png',
  'snd/3.png'
]

await Promise.all([
  this.preload(imgsToPreload, () => { console.log('All images are preloaded') }),
  this.preload(sndsToPreload, () => { console.log('All sounds are preloaded') })
])

```
