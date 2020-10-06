class Item {
	constructor(item) {
		this.id = item.id
		this.name = item.name
		this.price = item.price
		this.image = item.image
		this.description = item.description
		Item.all.push(this)
	}

	renderItemCard(menuContainer) {
		const itemCard = document.createElement('div'),
		imgContainer = document.createElement('div'),
		img = document.createElement('img'),
		info = document.createElement('div'),
		name = document.createElement('div'),
		price = document.createElement('div'),
		desc = document.createElement('div')

		img.src = this.image
		img.classList.add('item-img')
		img.dataset.itemId = this.id

		imgContainer.classList.add('img-containers')
		imgContainer.append(img)
		imgContainer.dataset.itemId = this.id

		name.innerHTML = this.name
		name.classList.add('item-names')
		name.dataset.itemId = this.id

		price.innerHTML = `${this.price}php`
		price.dataset.itemId = this.id

		desc.innerHTML = this.description
		desc.classList.add('item-desc')
		desc.style.display = "none";
		desc.dataset.itemId = this.id


		info.classList.add('item-info')
		info.append(name, price, desc)
		info.dataset.itemId = this.id

		itemCard.classList.add('item-cards')
		itemCard.dataset.itemId = this.id
		itemCard.append(imgContainer, info)

		menuContainer.append(itemCard)
		this.descCard = desc
	}

	toggleDescOn() {
		// console.log(this.descCard)
		if (this.descCard.style.display == "none") {
			this.descCard.style.display = "block"
		}
	}

	toggleDescOff() {
		if (this.descCard.style.display == "block") {
			this.descCard.style.display = "none"
		}
	}
}

Item.all = [];
