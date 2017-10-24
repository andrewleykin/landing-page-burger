// Начальная функция

(function(){
	$('.burger__list').slick({
		 infinite: true,
		speed: 300,
		slidesToShow: 1,
		arrows: true
	});
})();
$(document).ready(function () {
    svg4everybody({});
});
// Библиотека wow.js для анимации

(function () {
	new WOW().init();
})();