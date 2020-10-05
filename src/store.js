class Store {
	constructor(store, storeAttributes) {
		this.id = store.id
		this.name = storeAttributes.name
		this.description = storeAttributes.description
		this.owner = storeAttributes.owner
		this.delivery_location = storeAttributes.delivery_location
		this.store_link = storeAttributes.store_link
		this.logo = storeAttributes.logo
		this.container = document.querySelector('.store-container')
		this.card = document.querySelector('.main')
		this.items = []
		// debugger
		Store.all.push(this)
		// console.log(this.items)
	}

	renderStoreLi() {
		const li = document.createElement('li')
		li.appendChild(document.createTextNode(`${this.name}`))
		li.classList.add('store-names', 'names')
		li.dataset.id = this.id
		this.container.appendChild(li)
	}

	renderStoreCard() {
		const storeCard = document.createElement('div'),
		infoCard = document.createElement('div'),
		infos = document.createElement('div'),
		btns = document.createElement('div'),
		img = document.createElement('img'),
		name = document.createElement('h1'),
		desc = document.createElement('div'),
		owner = document.createElement('div'),
		loc = document.createElement('div'),
		link = document.createElement('a')

		img.src = this.logo
		img.classList.add('logo')

		name.innerHTML = this.name
		name.classList.add('info-names', 'names')

		owner.innerHTML = `<strong>Owner: </strong> ${this.owner}`

		loc.innerHTML = `<strong>Delivers around: </strong> ${this.delivery_location}`

		desc.innerHTML = this.description

		link.href = this.store_link
		link.classList.add('link')
		link.target = "_blank"
		link.innerHTML = "Order here"

		infos.classList.add('infos')
		infos.append(name, owner, loc, desc)

		btns.classList.add('btns-list')
		btns.append(link)

		infoCard.classList.add('info-card')
		infoCard.append(img, infos, btns)

		storeCard.append(infoCard)
		this.card.replaceChild(storeCard, this.card.firstChild)
	}
}

Store.all = [];
