class Store {
	constructor(store, storeAttributes) {
		this.id = store.id
		this.name = storeAttributes.name
		this.description = storeAttributes.description
		this.owner = storeAttributes.owner
		this.store_link = storeAttributes.store_link
		this.logo = storeAttributes.logo
		Store.all.push(this)
	}

	renderStoreList() {
		return `
		<div class="store-lists">
			<img src=${this.logo} class="logo-small" alt="...">
			<div>${this.name}</div>
		</div>
		`
	}
}

Store.all = [];
