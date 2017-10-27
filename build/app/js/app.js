// Функция для навигации по меню

(function () {

	var link = $('.nav__link'),
		item = $('.section'),
		btn = $('.btn--order'),
		href = window.location.href,
		section = $('.section'),
		pagin = $('.pagin__item'),
		activePagin = 'pagin__item--active';


		pagin.first().addClass(activePagin);
		if(window.location.hash) {
			showSection(window.location.hash, false);
		}

	$(window).scroll(function() {
		checkDistance()
	});

	link.click(function(e) {
		e.preventDefault();

		showSection($(this).attr('href'), true);
	});

	btn.click(function(e) {
		e.preventDefault();

		showSection('#order', true);
	});

	pagin.click(function(e) {
		e.preventDefault();

		showSection($(this).data('section'), true);
	});

	function showSection(article, isAnimate) {
		var direction = article.replace(/#/, ''),
			reqSection = item.filter('[data-section="' + direction + '"]'),
			reqSectionPos = reqSection.offset().top;

		if (isAnimate) {
			$('body, html').animate({scrollTop: reqSectionPos}, 1000);
		} else {
			$('body, html').scrollTop(reqSectionPos);
		}

		window.location.hash = href + '#' + direction;
	}

	var checkDistance = function() {
		for(i=0; i<=section.length-1;i++) {
			var $this = section.eq(i),
				topEdge = $this.offset().top - 200,
				bottomEdge = topEdge + $this.height(),
				wScroll = $(window).scrollTop();

				if(topEdge < wScroll && bottomEdge > wScroll) {
					var currentId = $this.data('section'),
						reqPagin = pagin.filter('[data-section="#' + currentId + '"]');

					reqPagin.addClass(activePagin).siblings().removeClass(activePagin);

					window.location.hash = currentId;
				}
		}
	}

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

// Скроллвниз

(function(){
	$('.header__arrow').click(function() {
		var height = $('.header').outerHeight();

		$('body, html').animate({scrollTop: height}, 1000);
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

// Карта Ynadex

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
// Функция для показа svg

(function(){
	svg4everybody();
})();
// Библиотека wow.js для анимации

(function () {
	new WOW().init();
})();