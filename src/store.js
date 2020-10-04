class Store {
	constructor(store, storeAttributes) {
		this.id = store.id
		this.name = storeAttributes.name
		this.description = storeAttributes.description
		this.owner = storeAttributes.owner
		this.store_link = storeAttributes.store_link
		this.logo = storeAttributes.logo
		this.container = document.querySelector('.store-container')
		this.card = document.querySelector('.store-card')
		this.items = []
		// debugger
		Store.all.push(this)
		// console.log(this.items)
	}

	renderStoreLi() {
		const li = document.createElement('li')
		li.appendChild(document.createTextNode(`${this.name}`))
		li.classList.add('store-names')
		li.dataset.id = this.id
		this.container.appendChild(li)
	}

	renderStoreCard() {
		const card = document.createElement('div'),
		img = document.createElement('img'),
		name = document.createElement('div'),
		desc = document.createElement('div'),
		owner = document.createElement('div'),
		link = document.createElement('a')

		img.src = this.logo
		img.classList.add('logo')

		name.innerHTML = this.name

		owner.innerHTML = `<strong>Owner: </strong> ${this.owner}`

		desc.innerHTML = this.description

		link.href = this.store_link
		link.target = "_blank"
		link.innerHTML = "Order here"

		card.append(img, name, owner, desc, link)
		this.card.replaceChild(card, this.card.firstChild)
	}
}

Store.all = [];
