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
				const newItem = new Item(item)
				newStore.items.push(newItem)
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
