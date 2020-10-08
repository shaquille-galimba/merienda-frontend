class Item {
	constructor(itemId, itemAttributes) {
		this.id = itemId
		this.name = itemAttributes.name
		this.price = itemAttributes.price
		this.image = itemAttributes.image
		this.description = itemAttributes.description
		this.store_id = itemAttributes.store_id
		this.store = Store.all.find(store => store.id == this.store_id)
		this.store.items.push(this)
		Item.all.push(this)
	}

	renderItemCard(menuContainer) {
		const itemCard = document.createElement('div'),
		imgContainer = document.createElement('div'),
		img = document.createElement('img'),
		info = document.createElement('div'),
		name = document.createElement('div'),
		price = document.createElement('div'),
		desc = document.createElement('div'),
		removeLink = document.createElement('a')

		img.src = this.image
		img.classList.add('item-img')

		removeLink.innerHTML = "X"
		removeLink.href = "#"
		removeLink.dataset.itemId = this.id
		removeLink.classList.add('remove-link')

		imgContainer.classList.add('img-containers')
		imgContainer.append(img, removeLink)

		name.innerHTML = this.name
		name.classList.add('item-names')

		price.innerHTML = `${this.price}php`
		price.classList.add('item-price')

		desc.innerHTML = this.description
		desc.classList.add("item-desc")

		info.classList.add('item-info')
		info.append(name, price, desc)

		itemCard.classList.add('item-cards')
		itemCard.dataset.itemId = this.id
		itemCard.append(imgContainer, info)

		menuContainer.append(itemCard)

		removeLink.addEventListener('click', (e) => {
			removeItem(e)
			// this.store.items.forEach((item, i) => {
			// 	if (item.id === this.id) {
			// 		this.store.splice(i, 1)
			// 	}
			// });
			const index = this.store.items.indexOf(this)
			this.store.items.splice(index, 1);

			this.store.renderStoreCard()
		})
	}
}

Item.all = [];
