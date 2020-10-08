const endPoint = "http://localhost:3000/api/v1/stores"

document.addEventListener('DOMContentLoaded', () => {
	console.log('Loaded')
	getData()
	window.addEventListener('scroll', this.handleScroll, true);
})

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

handleScroll = (e) => {
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

	fetch('http://localhost:3000/api/v1/items', {
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
