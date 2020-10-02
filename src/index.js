const endPoint = "http://localhost:3000/api/v1/stores"

document.addEventListener('DOMContentLoaded', () => {
	console.log('Loaded')
	getStores()
})

function getStores() {
	fetch(endPoint)
	.then(res => res.json())
	.then(stores => {
		console.log(stores)
		stores.data.forEach(store => {
			let newStore = new Store(store, store.attributes)

			document.querySelector('#store-list-container').innerHTML += newStore.renderStoreList()
		})
	})
}
