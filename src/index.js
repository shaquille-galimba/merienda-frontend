const endPoint = "http://localhost:3000/api/v1/stores"

document.addEventListener('DOMContentLoaded', () => {
	console.log('Loaded')
	getStores()
	eventListeners()
})

function getStores() {
	fetch(endPoint)
	.then(res => res.json())
	.then(stores => {
		console.log(stores)
		stores.data.forEach(store => {
			let newStore = new Store(store, store.attributes)
			newStore.renderStoreLi()
		})
	})
}

function eventListeners() {
	let storeContainer = document.querySelector('.store-container')
	storeContainer.addEventListener("click", (e) => {
		// console.log(e.target.dataset.id)
		const id = e.target.dataset.id
		const store = Store.all.find(store => store.id === id)

		store.renderStoreCard()
	})
}
