const endPoint = "https://merienda.herokuapp.com/api/v1"
// const endPoint = "http://localhost:3000/api/v1"

document.addEventListener('DOMContentLoaded', () => {
	console.log('Loaded')
	getData()
	checkLoggedIn()
	renderAbout()
	eventListeners()
})

function eventListeners() {
	window.addEventListener('scroll', this.handleScroll, true);

	document.querySelector('#add-store').addEventListener("click", () => renderAddStoreForm())
	document.querySelector('#about').addEventListener("click", () => renderAbout())
}

function getData() {
	fetch(`${endPoint}/stores`)
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


function checkLoggedIn() {
	if (localStorage.getItem("current_store") === null) {
		document.querySelector('#login').addEventListener("click", () => renderLoginForm())
	} else {
		renderLogoutBtn()
	}
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
	addItemFetch(nameInput, priceInput, imgInput, descInput, storeId)
	e.target.reset()
}

function addItemFetch(name, price, image, description, store_id) {
	const bodyData = {item: {name, price, image, description, store_id}}

	fetch(`${endPoint}/items`, {
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
		newItem.store.renderStoreCard()
	})
}

function removeItem(e) {
	const id = parseInt(e.currentTarget.dataset.itemId)

	fetch(`${endPoint}/items/${id}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json'
		}
	})
	.then(res => res.json())
}

function renderAddStoreForm() {
	const formWindow = document.querySelector('#form-window'),
	formBox = document.createElement('div'),
	formContainer = document.createElement('div'),
	h2 = document.createElement('h2'),
	form = document.createElement('form'),
	nameDiv = document.createElement('div'),
	passwordDiv = document.createElement('div'),
	ownerDiv = document.createElement('div'),
	locationDiv = document.createElement('div'),
	linkDiv = document.createElement('div'),
	logoDiv = document.createElement('div'),
	descDiv = document.createElement('div'),
	submitDiv = document.createElement('div'),
	name = document.createElement('input'),
	password = document.createElement('input'),
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

	password.setAttribute('type', 'password')
	password.setAttribute('placeholder', 'Password')
	password.id = 'add-store-password'
	passwordDiv.classList.add('inputBx')
	passwordDiv.append(password)

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
	form.append(nameDiv, passwordDiv, ownerDiv, locationDiv, linkDiv, logoDiv, descDiv, submitDiv)

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
	passwordInput = e.target.querySelector('#add-store-password').value,
	ownerInput = e.target.querySelector('#add-store-owner').value,
	locationInput = e.target.querySelector('#add-store-location').value,
	linkInput = e.target.querySelector('#add-store-link').value,
	logoInput = e.target.querySelector('#add-store-logo').value,
	descInput = e.target.querySelector('#add-store-desc').value


	console.log(nameInput, passwordInput, ownerInput, locationInput, linkInput, logoInput, descInput)
	addStoreFetch(nameInput, passwordInput, ownerInput, locationInput, linkInput, logoInput, descInput)
	e.target.reset()
}


function addStoreFetch(name, password, owner, delivery_location, store_link, logo, description) {
	const bodyData = {store: {name, password, owner, delivery_location, store_link, logo, description}}

	fetch(`${endPoint}/stores`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Accept": "application/json"
		},
    body: JSON.stringify(bodyData)
	})
	.then(res => res.json())
	.then(store => {
		console.log(store)
		const storeData = store.store.data,
		newStore = new Store(storeData, storeData.attributes)
		newStore.renderStoreLi()
		storeData.attributes.items.forEach(item => {
			const newItem = new Item(item.id, item)
		})
		renderStoreEvent()
	})
}

function renderLoginForm() {
	console.log("login form")
	const formWindow = document.querySelector('#form-window'),
	formBox = document.createElement('div'),
	formContainer = document.createElement('div'),
	h2 = document.createElement('h2'),
	form = document.createElement('form'),
	nameDiv = document.createElement('div'),
	passwordDiv = document.createElement('div'),
	submitDiv = document.createElement('div'),
	name = document.createElement('input'),
	password = document.createElement('input'),
	submit = document.createElement('input')

	h2.innerHTML = 'Login'

	name.setAttribute('type', 'text')
	name.setAttribute('placeholder', 'Store Name')
	name.id = 'login-name'
	nameDiv.classList.add('inputBx')
	nameDiv.append(name)

	password.setAttribute('type', 'password')
	password.setAttribute('placeholder', 'Password')
	password.id = 'login-password'
	passwordDiv.classList.add('inputBx')
	passwordDiv.append(password)

	submit.setAttribute('type', 'submit')
	submit.setAttribute('value', 'Login')
	submitDiv.classList.add('inputBx')
	submitDiv.append(submit)

	form.id = "add-store-form"
	form.append(nameDiv, passwordDiv, submitDiv)

	formContainer.classList.add('form')
	formContainer.append(h2, form)

	formBox.classList.add('box')
	formBox.append(formContainer)

	formWindow.replaceChild(formBox, formWindow.firstChild)

	form.addEventListener('submit', (e) => loginFormHandler(e))
}

function loginFormHandler(e) {
	e.preventDefault()

	const nameInput = e.target.querySelector('#login-name').value,
	passwordInput = e.target.querySelector('#login-password').value

	console.log(nameInput, passwordInput)
	loginFetch(nameInput, passwordInput)
}

function loginFetch(name, password) {
	const bodyData = {
		store: {
			name: name,
			password: password
		}
	}

	fetch(`${endPoint}/login`, {
		method: "POST",
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify(bodyData)
	})
	.then(resp => resp.json())
	.then(store=> {
		console.log(store)
		localStorage.setItem('current_store', store.store.data.id)
		console.log(localStorage.getItem('current_store'))
		location.reload()
	})
	.catch(function(error) {
		document.querySelector('.box').innerHTML = "Invalid Name or password"
	})
}

function renderLogoutBtn() {
	const btn = document.querySelector('#login')
	btn.innerHTML = "Logout"
	btn.id = "logout"
	btn.addEventListener("click", () => {
		localStorage.removeItem('current_store')
		location.reload()
	})
}

function renderAbout() {
	const aboutContainer = document.createElement('div'),
	logo = document.createElement('img'),
	caption = document.createElement('div'),
	contact = document.createElement('div')
	link = document.createElement('a'),
	main = document.querySelector('.main')

	logo.id = "logo"
	logo.src = "logo.png"

	caption.innerHTML = "Collection of local food businesses around Cavite that does deliveries." + "<br>" + "Browse by clicking a store on the left side bar." + "<br>" + "Report any bugs and concerns here:"

	link.href = 'https://github.com/shaquille-galimba/merienda-frontend'
	link.classList.add('link')
	link.target = "_blank"
	link.innerHTML = "Github repository"

	contact.innerHTML = "For business inquiries contact: shaquillegalimba@gmail.com"

	aboutContainer.classList.add("about-container")
	aboutContainer.append(logo, caption, link, contact)

	main.replaceChild(aboutContainer, main.firstChild)
}
