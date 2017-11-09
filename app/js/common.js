"use strict";

let textCols = document.getElementsByClassName("text-cols__inner-content");

let textColHeight = 0;

for (let i = 0; i < textCols.length; i++){
	if (textColHeight < textCols[i].clientHeight){
		textColHeight = textCols[i].clientHeight;
	}
}

for (let i = 0; i < textCols.length; i++){
	textCols[i].style.height = textColHeight + 'px';
}

console.log(textCols);