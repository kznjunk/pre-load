const load = {
	img: loadImage,
	snd: loadSound
}

module.exports = { preload }

async function preload (items, cb) {
	return new Promise(resolve => {
        const actions = items && items.length && getActions(items)

        Promise.all(actions)
          .then(res => {
			if (cb) cb()

            resolve(res)
          })
          .catch(err => console.log(err))
	})
}

function getActions (items) {
	const actions = [ ]

    for (let i = 0; i < items.length; i++) {
		const item = items[i]
		const url = item.url || item
		const type = item.type || getType(url)

		if (url && load[type]) {
			actions.push(load[type]([ url, item.cb ]))
		}
    }

    return actions
}

function getType (url) {
	if (/\.(jpg|jpeg|png|gif|webp|tiff|raw|bmp|heif|svg|pdf)/i.test(url)) return 'img'
	if (/\.(m4a|flac|mp3|mp4|wav|wma|aac)/i.test(url)) return 'snd'

	return false
}

async function loadImage (url, cb) {
	return new Promise(resolve => {
        const img = new Image()

        img.onload = (res) => {
			if (cb) cb()
			resolve(url)
        }
        img.src = url
	})
}

async function loadSound (url, cb) {
	return new Promise(resolve => {
        const audio = new Audio()

        audio.addEventListener('canplaythrough', () => {
			if (cb) cb()
			resolve(url)
        }, false)
        audio.src = url
	})
}
