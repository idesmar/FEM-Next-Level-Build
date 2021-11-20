/*
	since not defined as type="module",
	const cards declared in app.js is accessible here
	* note how scripts are declared in HTML
		<script src="js/app.js"></script>
 		<script src="js/drag.js"></script>
*/

let dragged
let sourceContainer

const dragstartHandler = (e) => {
	dragged = e.target
	sourceContainer = e.target.parentNode
	e.dataTransfer.effectAllowed = 'move';
	// e.dataTransfer.setData('text/html', e.target.outerHTML);
}

const dragoverHandler = (e) => {
	e.preventDefault()
	e.dataTransfer.dropEffect = 'move';
}

const toggleDropZone = (e) => {
	let el = e.target
	el.classList.toggle('drop-zone')
	el.previousElementSibling.classList.toggle('drop-zone-set')
}

const dropHandler = (e) => {
	if (e.stopPropagation) {
		e.stopPropagation() // stops bubbling/capturing on drop
	}
	e.preventDefault() // prevent default action (open as link for some elements)
	toggleDropZone(e)
	let el = e.target

	if (el !== dragged) {
		el.parentNode.appendChild(dragged)
		el.parentNode.removeChild(el)
		sourceContainer.appendChild(el)
	}
}

const setCardsToDraggableAndSetDNDEvents = cards.forEach(card => {
	card.setAttribute('draggable', true)
	card.addEventListener('dragstart', dragstartHandler)
	card.addEventListener('dragover', dragoverHandler)
	card.addEventListener('dragenter', toggleDropZone)
	card.addEventListener('dragleave', toggleDropZone)
	card.addEventListener('drop', dropHandler)
	// card.addEventListener('dragend', dragendHandler)
})


/*
	Additional reading for Drag and Drop w/ DataTransfer
	https://web.dev/drag-and-drop/
*/