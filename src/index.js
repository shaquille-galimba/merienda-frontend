const endPoint = "https://merienda.herokuapp.com/api/v1/stores"

document.addEventListener('DOMContentLoaded', () => {
	console.log('Loaded')
	getData()
	eventListeners()
})

function eventListeners() {
	window.addEventListener('scroll', this.handleScroll, true);

	document.querySelector('#add-store').addEventListener("click", () => renderAddStoreForm())
}

function getData() {
	fetch(endPoint)
	.then(res => res.json())
	.then(stores => {
		stores.data.forEach(store => {
			let newStore = new Store(store, store.attributes)
			newStore.renderStoreLi()
			store.attributes.items.forEach(item => {
				const newItem = new Item(item.id, item)
			})
		})
		renderStoreEvent()
	})
}

function renderStoreEvent() {
	let storeNames = document.querySelectorAll('.store-names')
	storeNames.forEach(store => {
		store.addEventListener("click", (e) => {
			const id = e.target.dataset.id
			const store = Store.all.find(store => store.id === id)

			store.renderStoreCard()
		})
	})
}

function handleScroll(e) {
  if (e.target.classList.contains("on-scrollbar") === false) {
    e.target.classList.add("on-scrollbar");
		e.target.addEventListener("mouseout", () => e.target.classList.remove("on-scrollbar"))
  }
}

function addItemFormHandler(e) {
	e.preventDefault()
	const nameInput = e.target.querySelector('#add-item-name').value,
	priceInput = parseInt(e.target.querySelector('#add-item-price').value),
	imgInput = e.target.querySelector('#add-item-img').value,
	descInput = e.target.querySelector('#add-item-desc').value,
	storeId = parseInt(e.target.dataset.storeId)

	// console.log(nameInput, priceInput, imgInput, descInput, storeId)
	addItemFetch(nameInput, priceInput, imgInput, descInput, storeId)
	e.target.reset()
}

function addItemFetch(name, price, image, description, store_id) {
	const bodyData = {item: {name, price, image, description, store_id}}

	fetch('https://merienda.herokuapp.com/api/v1/items', {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Accept": "application/json"
		},
    body: JSON.stringify(bodyData)
	})
	.then(res => res.json())
	.then(item => {
		const itemData = item.data,
		menuContainer = document.querySelector('.menu-container')

		let newItem = new Item(itemData.id, itemData.attributes)
		// newItem.renderItemCard(menuContainer)
		newItem.store.renderStoreCard()
	})
}

function removeItem(e) {
	const id = parseInt(e.currentTarget.dataset.itemId)
	console.log(id)

	fetch(`https://merienda.herokuapp.com/api/v1/items/${id}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json'
		}
	})
	.then(res => res.json())
	.then(res => console.log(res))

}

function renderAddStoreForm() {
	const formWindow = document.querySelector('#form-window'),
	formBox = document.createElement('div'),
	formContainer = document.createElement('div'),
	h2 = document.createElement('h2'),
	form = document.createElement('form'),
	nameDiv = document.createElement('div'),
	ownerDiv = document.createElement('div'),
	locationDiv = document.createElement('div'),
	linkDiv = document.createElement('div'),
	logoDiv = document.createElement('div'),
	descDiv = document.createElement('div'),
	submitDiv = document.createElement('div'),
	name = document.createElement('input'),
	owner = document.createElement('input'),
	location = document.createElement('input'),
	link = document.createElement('input'),
	logo = document.createElement('input'),
	desc = document.createElement('textarea'),
	submit = document.createElement('input')

	h2.innerHTML = 'Add store'

	name.setAttribute('type', 'text')
	name.setAttribute('placeholder', 'Store Name')
	name.id = 'add-store-name'
	nameDiv.classList.add('inputBx')
	nameDiv.append(name)

	owner.setAttribute('type', 'text')
	owner.setAttribute('placeholder', 'Store owner')
	owner.id = 'add-store-owner'
	ownerDiv.classList.add('inputBx')
	ownerDiv.append(owner)

	location.setAttribute('type', 'text')
	location.setAttribute('placeholder', 'Delivery locations')
	location.id = 'add-store-location'
	locationDiv.classList.add('inputBx')
	locationDiv.append(location)

	link.setAttribute('type', 'text')
	link.setAttribute('placeholder', 'Store link')
	link.id = 'add-store-link'
	linkDiv.classList.add('inputBx')
	linkDiv.append(link)

	logo.setAttribute('type', 'text')
	logo.setAttribute('placeholder', 'logo url')
	logo.id = 'add-store-logo'
	logoDiv.classList.add('inputBx')
	logoDiv.append(logo)

	desc.setAttribute('placeholder', 'Description')
	desc.setAttribute('rows', '4')
	desc.id = 'add-store-desc'
	descDiv.classList.add('inputBx')
	descDiv.append(desc)

	submit.setAttribute('type', 'submit')
	submit.setAttribute('value', 'Add store')
	submitDiv.classList.add('inputBx')
	submitDiv.append(submit)

	form.id = "add-store-form"
	form.append(nameDiv, ownerDiv, locationDiv, linkDiv, logoDiv, descDiv, submitDiv)

	formContainer.classList.add('form')
	formContainer.append(h2, form)

	formBox.classList.add('box')
	formBox.append(formContainer)

	formWindow.replaceChild(formBox, formWindow.firstChild)

	form.addEventListener('submit', (e) => addStoreFormHandler(e))
}


function addStoreFormHandler(e) {
	e.preventDefault()
	const nameInput = e.target.querySelector('#add-store-name').value,
	ownerInput = e.target.querySelector('#add-store-owner').value,
	locationInput = e.target.querySelector('#add-store-location').value,
	linkInput = e.target.querySelector('#add-store-link').value,
	logoInput = e.target.querySelector('#add-store-logo').value,
	descInput = e.target.querySelector('#add-store-desc').value


	console.log(nameInput, ownerInput, locationInput, linkInput, logoInput, descInput)
	addStoreFetch(nameInput, ownerInput, locationInput, linkInput, logoInput, descInput)
	e.target.reset()
}


function addStoreFetch(name, owner, delivery_location, store_link, logo, description) {
	const bodyData = {store: {name, owner, delivery_location, store_link, logo, description}}

	fetch(endPoint, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Accept": "application/json"
		},
    body: JSON.stringify(bodyData)
	})
	.then(res => res.json())
	.then(store => {
		const storeData = store.data,
		newStore = new Store(storeData, storeData.attributes)
		newStore.renderStoreLi()
		storeData.attributes.items.forEach(item => {
			const newItem = new Item(item.id, item)
		})
		renderStoreEvent()
	})
}
