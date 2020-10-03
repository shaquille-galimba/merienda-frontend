const endPoint = "http://localhost:3000/api/v1/stores"

document.addEventListener('DOMContentLoaded', () => {
	console.log('Loaded')
	let storeContainer = document.querySelector('.store-container')
	getStores()

	storeContainer.addEventListener("click", (e) => {
		console.log(e.target)
	})
})

function getStores() {
	fetch(endPoint)
	.then(res => res.json())
	.then(stores => {
		console.log(stores)
		stores.data.forEach(store => {
			let newStore = new Store(store, store.attributes)
			// let storeContainer = document.querySelector('.store-container')
			newStore.renderStoreLi()

			// storeContainer.appendChild(newStore.renderStoreLi())

			// document.querySelector('.store-container').innerHTML += newStore.renderStoreLi()
		})
	})
}
