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
		// debugger
		Store.all.push(this)
	}

	renderStoreLi() {
		const li = document.createElement('li')
		li.appendChild(document.createTextNode(`${this.name}`))
		li.classList.add('store-names')
		this.container.appendChild(li)
	}

	renderStoreCard() {
		const img = document.createElement('img')
		img.src = this.logo
		this.card.appendChild(img)
	}
}

Store.all = [];
