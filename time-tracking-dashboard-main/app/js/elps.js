const cardOptions = document.querySelectorAll('.ellipsis')
const dashSegments = document.querySelectorAll('.dash-seg')

let optionEl

const resetOptionElements = () => {
	dashSegments.forEach(dashSegment => {
		if (dashSegment.contains(optionEl)) {
			optionEl.classList.add('close-anim')
			optionEl.addEventListener('animationend', (e) => {
				e.target.parentNode.removeChild(e.target)
			})
		}
	})
}

const addOptionElement = (e) => {
	optionEl = document.createElement('div')
	optionEl.className = 'card-option'
	optionEl.innerHTML =
		`
			<svg class="close-icon"
				width="24" height="24" viewBox="0 0 24 24">
				<path d="M0 0h24v24H0z" fill="none"/>
				<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="#FFFADE" />
			</svg>
			<ul class="option-list">
				<li>Change format</li>
				<li>Copy report</li>
				<li>Copy full report</li>
				<li>Sort reports</li>
				<li>Change banner color</li>
			</ul>
			`
	e.target.parentNode.appendChild(optionEl)

	let closeIcon = optionEl.firstElementChild
	closeIcon.addEventListener('click', resetOptionElements, { once: true })
	/*
		* { once: true } EventListener option that limits listening to just once
		Read more: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#parameters
		* this prevents error caused by spam-clicking close icon
	*/
}

cardOptions.forEach(cardOption => {
	cardOption.addEventListener('click', (e) => {
		resetOptionElements()
		addOptionElement(e)
	})
})
