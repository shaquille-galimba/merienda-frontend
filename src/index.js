const endPoint = "http://localhost:3000/api/v1/stores"

document.addEventListener('DOMContentLoaded', () => {
	console.log('Loaded')
	getData()
	// eventListeners()
})

function getData() {
	fetch(endPoint)
	.then(res => res.json())
	.then(stores => {
		// console.log(stores)
		stores.data.forEach(store => {
			let newStore = new Store(store, store.attributes)
			newStore.renderStoreLi()
			store.attributes.items.forEach(item => {
				const newItem = new Item(item)
				newStore.items.push(newItem)
			})
		})
		renderStoreEvent()
	})
}

function renderStoreEvent() {
	let storeNames = document.querySelectorAll('.store-names')
	// console.log(storeNames)
	storeNames.forEach(store => {
		store.addEventListener("click", (e) => {
			// console.log(e.target.dataset.id)
			const id = e.target.dataset.id
			const store = Store.all.find(store => store.id === id)

			store.renderStoreCard()
		})
	})
}

function renderItemDescEvent(store) {
	let itemCards = document.querySelectorAll('.item-cards')
	// console.log(store)
	// console.log(itemCards)
	itemCards.forEach(itemCard => {
		itemCard.addEventListener("click", (e) => {
			const id = e.target.dataset.itemId
			console.log(id)
			const item = store.items.find(item => item.id == id)
			// console.log(store.items[2].id == id)

			item.toggleDescOn()
		})

		itemCard.addEventListener("mouseout", (e) => {
			const id = e.target.dataset.itemId
			console.log(id)
			const item = store.items.find(item => item.id == id)
			// console.log(store.items[2].id == id)

			item.toggleDescOff()
		})
	})
}
