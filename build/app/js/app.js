// Функция для показа svg

jQuery(document).ready(function($) {
	svg4everybody();
});




// Движение колесика мыши

(function(){

	var screen = 0,
		inscroll = false;
		container = $('.maincontent'),
		section = $('.section'),
		activeSection = 'section--active',
		link = $('.nav__link'),
		btn = $('.btn--order'),
		pagin = $('.pagin__item'),
		activePagin = 'pagin__item--active';

	$('.section:first-child').addClass(activeSection);	// первой секции активный класс
	pagin.first().addClass(activePagin);				// первой пагинации активный класс

	// функция смена экрана
	var screenSwitcher = function (index) {

		screen = index;
		if(!inscroll) {
			inscroll = true;
		} else {
			return
		}

		var position = (-screen * 100) + '%',
			direction = section.eq(screen).data('section');

		section.eq(screen).addClass(activeSection).siblings().removeClass(activeSection);
		pagin.eq(screen).addClass(activePagin).siblings().removeClass(activePagin);
		container.css('top', position);
		window.location.hash = '#' + direction;

		setTimeout(function(){
			inscroll = false;
		},1300);
	}

	// при движения колесика мыши
	$('body').on('mousewheel', function(event) {

		var activePage = section.filter('.' + activeSection);

		if(!inscroll) {
			if(event.deltaY > 0) {
				if(screen > 0) {
					screen--;
				}
			} else {
				if(screen < section.length-1) {
					screen++;
				}
			}
		}

		screenSwitcher(screen);
	});

	// нажатие на стрелку
	$('.header__arrow').click(function() {
		screenSwitcher(1);
	});

	// при нажатии на меню
	link.click(function(e) {
		e.preventDefault();

		var index = $(this).closest('.nav__item').index() + 1;

		if(index==6) {
			index = 7;
		}
		screenSwitcher(index);
	});

	// при нажатии на кнопку
	btn.click(function(e) {
		e.preventDefault();

		screenSwitcher(6);
	});

	// при нажатии на пагинацию
	pagin.click(function(e) {
		e.preventDefault();

		var index = $(this).index();

		screenSwitcher(index);
	});

	// при заходе с хэшом
	if(window.location.hash) {
		var direction = window.location.hash.replace(/#/, ''),
			index = section.filter('[data-section="' + direction + '"]').index();

			screenSwitcher(index);
	}

	// при нажатии на клавиатуру
	$(document).on('keydown', (e) => {
		if(!inscroll) {
			if(e.keyCode == 38) {
				if(screen > 0) {
					screen--;
				}
			} else if (e.keyCode == 40){
				if(screen < section.length-1) {
					screen++;
				}
			}
		}
		screenSwitcher(screen);
	});

	// при свайпе
	$('body').swipe({
		swipeUp:function(event) {
			if(!inscroll && screen < section.length-1) {
				screen++;
				screenSwitcher(screen);
			}
		},
		swipeDown:function(event) {
			if(!inscroll && screen > 0) {
				screen--;
				screenSwitcher(screen);
			}
		}
	});

})();

// Слик Слайдер

(function(){
	$('.burger__list').slick({
		 infinite: true,
		speed: 300,
		slidesToShow: 1,
		arrows: true
	});
})();

// аккордеон

(function(){
	var item = $('.team__item'),
		link = $('.team__name'),
		block = $('.team__info'),
		activeItem = 'team__item--active',
		duration = 400;

	link.click(function() {
		var reqParent = $(this).closest('.team__item'),
			reqBlock = reqParent.find('.team__info');

			if(reqParent.hasClass(activeItem)) {
				reqParent.removeClass(activeItem);
				reqBlock.slideUp(duration);
			} else {
				item.removeClass(activeItem);
				block.slideUp(duration);
				reqParent.addClass(activeItem);
				reqBlock.slideDown(duration);
			}
	});

})();

// горизонтальный аккордеон

(function(){
	var item = $('.menu__item'),
		link = $('.menu__name'),
		width = link.outerWidth();
		block = $('.menu__info'),
		activeItem = 'menu__item--active',
		duration = 400;

	link.click(function() {
		var reqParent = $(this).closest('.menu__item'),
			reqBlock = reqParent.find('.menu__info'),
			reqWidth = width + reqBlock.outerWidth() + 'px';

			if(reqParent.hasClass(activeItem)) {
				reqParent.removeClass(activeItem).stop().animate({width : width}, duration);
			} else {
				item.removeClass(activeItem).stop().animate({width : width}, duration);
				reqParent.addClass(activeItem).stop().animate({width : reqWidth}, duration);
			}
	});

	block.click(function() {
		var reqBlock = $(this),
			reqParent = reqBlock.closest('.menu__item'),
			reqWidth = width + reqBlock.outerWidth() + 'px';

			if(reqParent.hasClass(activeItem)) {
				reqParent.removeClass(activeItem).stop().animate({width : width}, duration);
			} else {
				item.removeClass(activeItem).stop().animate({width : width}, duration);
				reqParent.addClass(activeItem).stop().animate({width : reqWidth}, duration);
			}
	});

})();

// Карта Yandex

(function(){
	ymaps.ready(init);
	var myMap,
		myPlacemark,
		myPlacemark2;

	function init(){
		myMap = new ymaps.Map("map", {
			center: [55.72666836, 52.38522601],
			zoom: 16
		});

		myMap.controls.remove('zoomControl').remove('trafficControl').remove('typeSelector').remove('rulerControl');

		myMap.behaviors.disable([
			'drag',
			'scrollZoom'
			]);

		myCollection = new ymaps.GeoObjectCollection({}, {
			iconLayout: 'default#image',
			iconImageHref: 'app/img/general/map.png',
			iconImageSize: [46, 57],
			iconImageOffset: [-23, -42]
		});


		myPlacemark = new ymaps.Placemark([55.72505776, 52.38136363], { 
			balloonContentHeader: 'Однажды',
			balloonContentBody: 'В студёную зимнюю пору',
			balloonContentFooter: 'Мы пошли в гору',
			hintContent: 'Зимние происшествия'
		});

		myPlacemark2 = new ymaps.Placemark([55.73066031, 52.39298249], { 
			balloonContentHeader: 'Однажды',
			balloonContentBody: 'В студёную зимнюю пору',
			balloonContentFooter: 'Мы пошли в гору',
			hintContent: 'Зимние происшествия'
		});

		myCollection.add(myPlacemark).add(myPlacemark2);
		myMap.geoObjects.add(myCollection);
	}
})();