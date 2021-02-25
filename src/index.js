const load = {
	img: loadImage,
	snd: loadSound
}

module.exports = { preload }

async function preload (items, options) {
	return new Promise(resolve => {
        const actions = items && items.length && getActions(items, options)

        Promise.all(actions)
          .then(res => {
          	const cb = options && options.cb_then

			if (cb) cb()
            resolve(res)
          })
          .catch(err => console.log(err))
	})
}

function getActions (items, options) {
	const actions = [ ]
	const cb = options && options.cb_foreach

    for (let i = 0; i < items.length; i++) {
		const url = items[i]
		const type = (options && options.type) || getType(url)

		if (url && load[type]) {
			actions.push(load[type](url, cb))
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

        img.onload = res => { next(resolve, url, cb) }
        img.onerror = err => { next(resolve, false, cb) }
        img.src = url
	})
}

async function loadSound (url, cb) {
	return new Promise(resolve => {
        const audio = new Audio()

        audio.addEventListener('canplaythrough', () => { next(resolve, url, cb) }, false)
        audio.addEventListener('error', () => { next(resolve, false, cb) }, false)
        audio.src = url
	})
}

function next (resolve, param, cb) {
	if (cb) cb()
	resolve(param)
}
