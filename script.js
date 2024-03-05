let removedItems = []

// open modal by id
function openModal( id ) {
	document.getElementById( id ).classList.add('open')
	document.body.classList.add('prompt-open')
}

// close currently open modal
function closeModal() {
	document.querySelector('.prompt.open').classList.remove('open')
	document.body.classList.remove('prompt-open')
}

// gen random id
function genRandomId() {
	return Math.floor( Math.random() * 1000000 )
}

// add element to the dom list
function addElementToDomList( list ) {
	const inputEl = document.getElementById('add-input')

	// validate input
	if ( inputEl.value.trim() === '' ) return
	
	const liEl = document.createElement('li')
	const liId = genRandomId()

	liEl.id = liId
	liEl.innerHTML = inputEl.value

	// add click event to li element
	liEl.onclick = function() {
		liEl.classList.toggle('focus')
	}

	// add double click event to li element
	liEl.ondblclick = function( event ) {
		removeElementFromDomList( event )
	}

	document.getElementById( list ).appendChild( liEl )

	inputEl.value = ''
	closeModal()
}

// remove li element from the dom list on double click
function removeElementFromDomList( event ) {
	const el = event.target
	const listEl = el.parentElement

	// store the selected element for restore if needed
	removedItems = []
	removedItems.push( el )
	listEl.removeChild( el )
}


// remove all elements from the dom list
function removeAllElementsFromDomList( list ) {
	const listEl = document.getElementById( list )
	const selectedElments = listEl.querySelectorAll('.focus')

	if ( selectedElments.length > 0 ) {
		// store the selected element for restore if its needed
		// firts needs to be cleared
		removedItems = []

		selectedElments.forEach( el => {
			// store the selected element
			removedItems.push( el )
			listEl.removeChild( el )
		})
	}
}

// restore all elements from removedItems
function restoreAllElements( list ) {
	const listEl = document.getElementById( list )

	removedItems.forEach( el => {
		listEl.appendChild( el )
	})

	// clear removedItems
	removedItems = []
}

window.addEventListener('load', function() {
	console.log('script.js loaded')
	// close modals on background click
	document.addEventListener('click', event => {
		if (event.target.classList.contains('prompt')) {
			closeModal()
		}
	})
})