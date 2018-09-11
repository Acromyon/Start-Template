// Выравнивание бллоков по высоте

let alignItems = document.getElementsByClassName('height-align');

getAlignItems(alignItems);

function clearStyle() {
	for (let i = 0; i < alignItems.length; i++) {
		alignItems[i].removeAttribute('style');
	}
	getAlignItems(alignItems);
}

function getAlignItems(items) {
	let maxItemlHeight = 0;

	for (let i = 0; i < items.length; i++) {
		if (maxItemlHeight < items[i].clientHeight) {
			maxItemlHeight = items[i].clientHeight;
		}
	}
	maxItemlHeight += 'px';

	for (let i = 0; i < items.length; i++) {
		items[i].style.height = maxItemlHeight;
	}
	window.addEventListener('resize', clearStyle);
}
