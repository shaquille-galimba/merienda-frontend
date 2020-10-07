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

		imgContainer.classList.add('img-containers')
		imgContainer.append(img)

		name.innerHTML = this.name
		name.classList.add('item-names')

		price.innerHTML = `${this.price}php`

		desc.innerHTML = this.description

		info.classList.add('item-info')
		info.append(name, price, desc)

		itemCard.classList.add('item-cards')
		itemCard.dataset.itemId = this.id
		itemCard.append(imgContainer, info)

		menuContainer.append(itemCard)
	}
}

Item.all = [];
