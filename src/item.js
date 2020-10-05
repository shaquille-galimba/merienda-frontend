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
		name = document.createElement('div'),
		price = document.createElement('div')

		img.src = this.image
		img.classList.add('menu-img')

		name.innerHTML = `<strong>${this.name}</strong>`

		price.innerHTML = this.price

		menuCard.classList.add('menu-cards')
		menuCard.append(img, name, price)

		menuContainer.append(menuCard)
	}
}
