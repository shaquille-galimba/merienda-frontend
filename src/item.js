class Item {
	constructor(item) {
		this.id = item.id
		this.name = item.name
		this.price = item.price
		this.image = item.image
	}

	renderItemCard(menuContainer) {
		const menuCard = document.createElement('div'),
		img = document.createElement('img'),
		info = document.createElement('div'),
		name = document.createElement('div'),
		price = document.createElement('div')

		img.src = this.image
		img.classList.add('item-img')

		name.innerHTML = `<strong>${this.name}</strong>`

		price.innerHTML = `${this.price}php`

		info.classList.add('item-info')
		info.append(name, price)

		menuCard.classList.add('menu-cards')
		menuCard.append(img, info)

		menuContainer.append(menuCard)
	}
}
