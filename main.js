playNow = document.querySelector('#playNow');

playNow.onclick = function () {
	document
		.querySelector('#welcome')
		.classList.add('animate__animated', 'animate__fadeOutUp');

	setTimeout(function () {
		document.querySelector('.welcome').style.display = 'none';
		document.querySelector('#game').style.display = 'block';
	}, 1000);
};
