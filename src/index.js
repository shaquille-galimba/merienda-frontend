const endPoint = "http://localhost:3000/api/v1/stores"

document.addEventListener('DOMContentLoaded', () => {
	console.log('Loaded')
	getStores()
	window.onscroll = function() {myFunction()};

	// Get the navbar
	var header = document.querySelector("header");

	// Get the offset position of the navbar
	var sticky = header.offsetTop;

	// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
	function myFunction() {
	  if (window.pageYOffset >= sticky) {
	    header.classList.add("sticky")
	  } else {
	    header.classList.remove("sticky");
	  }
	}
})

function getStores() {
	fetch(endPoint)
	.then(res => res.json())
	.then(stores => {
		console.log(stores)
		stores.data.forEach(store => {
			let newStore = new Store(store, store.attributes)

			document.querySelector('.stores-container').innerHTML += newStore.renderStoreList()
		})
	})
}

function stickyNavbar() {

}
