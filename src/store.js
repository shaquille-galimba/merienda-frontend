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
		Store.all.push(this)
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
		menuContainer = document.createElement('div'),
		infos = document.createElement('div'),
		btns = document.createElement('div'),
		img = document.createElement('img'),
		name = document.createElement('h1'),
		desc = document.createElement('div'),
		owner = document.createElement('div'),
		loc = document.createElement('div'),
		addItemBtn = document.createElement('button'),
		link = document.createElement('a'),
		menu = document.createElement('div'),
		menuHeader = document.createElement('h1')

		img.src = this.logo
		img.classList.add('logos')

		name.innerHTML = this.name
		name.classList.add('info-names', 'names')

		owner.innerHTML = `<strong>Owner: </strong> ${this.owner}`

		loc.innerHTML = `<strong>Delivers around: </strong> ${this.delivery_location}`

		desc.innerHTML = this.description

		addItemBtn.innerHTML = "Add Item"
		addItemBtn.addEventListener("click", () => {
			this.renderAddItemForm()
		})

		link.href = this.store_link
		link.classList.add('link')
		link.target = "_blank"
		link.innerHTML = "Order here"

		infos.classList.add('infos')
		infos.append(name, owner, loc, desc)

		btns.classList.add('btns-list')
		btns.append(addItemBtn, link)

		infoCard.classList.add('info-card')
		infoCard.append(img, infos, btns)

		menuContainer.classList.add('menu-container')

		menuHeader.classList.add('menu-header')
		menuHeader.innerHTML = "Menu"

		this.items.forEach(item => item.renderItemCard(menuContainer))

		menu.append(menuHeader, menuContainer)

		storeCard.append(infoCard, menu)
		this.card.replaceChild(storeCard, this.card.firstChild)
	}

	renderAddItemForm() {
		const formWindow = document.querySelector('#form-window'),
		formBox = document.createElement('div'),
		formContainer = document.createElement('div'),
		h2 = document.createElement('h2'),
		form = document.createElement('form'),
		nameDiv = document.createElement('div'),
		priceDiv = document.createElement('div'),
		imgUrlDiv = document.createElement('div'),
		descDiv = document.createElement('div'),
		submitDiv = document.createElement('div'),
		name = document.createElement('input'),
		price = document.createElement('input'),
		imgUrl = document.createElement('input'),
		desc = document.createElement('textarea'),
		submit = document.createElement('input')

		h2.innerHTML = "Add item"

		name.setAttribute('type', 'text')
		name.setAttribute('placeholder', 'Item Name')
		nameDiv.classList.add('inputBx')
		nameDiv.append(name)

		price.setAttribute('type', 'number')
		price.setAttribute('placeholder', 'Price')
		priceDiv.classList.add('inputBx')
		priceDiv.append(price)

		imgUrl.setAttribute('type', 'text')
		imgUrl.setAttribute('placeholder', 'Image URL')
		imgUrlDiv.classList.add('inputBx')
		imgUrlDiv.append(imgUrl)

		desc.setAttribute('placeholder', 'Description')
		descDiv.classList.add('inputBx')
		descDiv.append(desc)

		submit.setAttribute('type', 'submit')
		submit.setAttribute('value', 'Add item')
		submitDiv.classList.add('inputBx')
		submitDiv.append(submit)

		form.append(nameDiv, priceDiv, imgUrlDiv, descDiv, submitDiv)

		formContainer.classList.add('form')
		formContainer.append(h2, form)

		formBox.classList.add('box')
		formBox.append(formContainer)

		formWindow.replaceChild(formBox, formWindow.firstChild)
	}
}

Store.all = [];
