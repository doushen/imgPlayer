'use strict';

/**
 * 判断是否是chrome
 * return {Boolean} [description]
 */
function isChrome() {
	return navigator.userAgent.indexOf('Chrome') !== -1;
}

/**
 * 禁用控件
 * @param {[type]} page [description]
 * return {[type]}  [description]
 */
function disableControls(page) {
	if (page === 1) {
		$('.previous-button').hide();
	} else {
		$('.previous-button').show();
	}

	if (page === $('.magazine').turn('pages')) {
		$('.next-button').hide();
	} else {
		$('.next-button').show();
	}
}

/**
 * 最大宽度
 * return {[type]} [description]
 */
function largeMagazineWidth() {
	return 2214;
}

/**
 * 视窗大小重置
 * return {[type]} [description]
 */
function resizeViewport() {
	var width = $(window).width() - $('.thumbnails').width(),
		height = $(window).height(),
		options = $('.magazine').turn('options');

	$('.magazine').removeClass('animated');

	$('.magazine-viewport').css({
		width: width,
		height: height
	}).

	zoom('resize');
	$('.thumbnails').css({
		height: height
	});
	$('.toolbarButtonSiderContainer').css({
		width: $('.thumbnails').width()
	});

	if ($('.magazine').turn('zoom') === 1) {
		var bound = calculateBound({
			width: options.width,
			height: options.height,
			boundWidth: width - 44,
			boundHeight: Math.min(options.height, height)
		});

		if (bound.width % 2 !== 0) {
			bound.width -= 1;
		}


		if (bound.width !== $('.magazine').width() || bound.height !== $('.magazine').height()) {

			$('.magazine').turn('size', bound.width, bound.height);

			if ($('.magazine').turn('page') === 1) {
				$('.magazine').turn('peel', 'br');
			}

			$('.next-button').css({
				height: bound.height,
				backgroundPosition: '-38px ' + (bound.height / 2 - 32 / 2) + 'px'
			});
			$('.previous-button').css({
				height: bound.height,
				backgroundPosition: '-4px ' + (bound.height / 2 - 32 / 2) + 'px'
			});
		}

		$('.magazine').css({
			top: -bound.height / 2,
			left: -bound.width / 2
		});
	}

	var magazineOffset = $('.magazine').offset(); //,
	//boundH = height - magazineOffset.top - $('.magazine').height(),
	//marginTop = (boundH - $('.thumbnails > div').height()) / 2;

	// if (marginTop<0) {
	// 	//$('.thumbnails').css({height:1});
	// 	// $('.thumbnails').css({height: boundH});
	// } else {
	// 	$('.thumbnails').css({height: boundH});
	// 	$('.thumbnails > div').css({marginTop: marginTop});
	// }

	if (magazineOffset.top < $('.made').height()) {
		$('.made').hide();
	} else {
		$('.made').show();
	}

	$('.magazine').addClass('animated');
}

/**
 * 添加区域
 * @param {[type]} region      [description]
 * @param {[type]} pageElement [description]
 */
function addRegion(region, pageElement) {

	var reg = $('<div />', {
			'class': 'region  ' + region.class
		}),
		options = $('.magazine').turn('options'),
		pageWidth = options.width / 2,
		pageHeight = options.height;

	reg.css({
		top: Math.round(region.y / pageHeight * 100) + '%',
		left: Math.round(region.x / pageWidth * 100) + '%',
		width: Math.round(region.width / pageWidth * 100) + '%',
		height: Math.round(region.height / pageHeight * 100) + '%'
	}).attr('region-data', $.param(region.data || ''));


	reg.appendTo(pageElement);
}

/**
 * 加载区域
 * @param {[type]} page    [description]
 * @param {[type]} element [description]
 * return {[type]}  [description]
 */
function loadRegions(page, element) {
	$.getJSON('images/' + page + '-regions.json').
	done(function(data) {

		$.each(data, function(key, region) {
			addRegion(region, element);
		});
	});
}

/**
 *	加载
 */
function loadApp() {
	$('#canvas').fadeIn(1000);

	var flipbook = $('.magazine');

	// Check if the CSS was already loaded

	if (flipbook.width() === 0 || flipbook.height() === 0) {
		setTimeout(loadApp, 10);
		return;
	}

	// Create the flipbook

	flipbook.turn({

		// Magazine width

		width: 1000,

		// display: 'single',

		// direction: 'rtl',

		// Magazine height

		height: 650,

		// Duration in millisecond

		duration: 1000,

		// Hardware acceleration

		acceleration: !isChrome(),

		// Enables gradients

		gradients: true,

		// Auto center this flipbook

		autoCenter: true,

		// Elevation from the edge of the flipbook when turning a page

		elevation: 50,

		// The number of pages

		pages: thumbnailsData.length,

		// Events

		when: {
			turning: function(event, page) {

				var book = $(this),
					currentPage = book.turn('page');



				// Show and hide navigation buttons

				disableControls(page);


				$('.thumbnails .page-' + currentPage).
				parent().
				removeClass('current');

				$('.thumbnails .page-' + page).
				parent().
				addClass('current');
				$('#pageNumber').val(page);
				// Update the current URI

				window.Hash.go('page/' + page).update();

			},

			turned: function(event, page) {

				disableControls(page);

				$(this).turn('center');

				if (page === 1) {
					$(this).turn('peel', 'br');
				}

			},

			missing: function(event, pages) {
				// Add pages that aren't in the magazine
				for (var i = 0; i < pages.length; i++) {
					addPage(pages[i], $(this));
				}

			}
		}

	});

	// Zoom.js

	$('.magazine-viewport').zoom({
		flipbook: $('.magazine'),

		max: function() {

			return largeMagazineWidth() / $('.magazine').width();

		},

		when: {

			swipeLeft: function() {

				$(this).zoom('flipbook').turn('next');

			},

			swipeRight: function() {

				$(this).zoom('flipbook').turn('previous');

			},

			resize: function(event, scale, page, pageElement) {

				if (scale === 1) {
					loadSmallPage(page, pageElement);
				} else {
					loadLargePage(page, pageElement);
				}

			},

			zoomIn: function() {

				//$('.thumbnails').hide();
				$('.made').hide();
				$('.magazine').removeClass('animated').addClass('zoom-in');
				$('.zoom-icon').removeClass('zoom-icon-in').addClass('zoom-icon-out');

				// if (!window.escTip && !$.isTouch) {
				// 	escTip = true;

				// 	$('<div />', {'class': 'exit-message'}).
				// 		html('<div>Press ESC to exit</div>').
				// 			appendTo($('body')).
				// 			delay(2000).
				// 			animate({opacity:0}, 500, function() {
				// 				$(this).remove();
				// 			});
				// }
			},

			zoomOut: function() {

				$('.exit-message').hide();
				//$('.thumbnails').fadeIn();
				$('.made').fadeIn();
				$('.zoom-icon').removeClass('zoom-icon-out').addClass('zoom-icon-in');

				setTimeout(function() {
					$('.magazine').addClass('animated').removeClass('zoom-in');
					resizeViewport();
				}, 0);

			}
		}
	});

	// Zoom event

	if ($.isTouch) {
		$('.magazine-viewport').bind('zoom.doubleTap', zoomTo);
	} else {
		$('.magazine-viewport').bind('zoom.tap', zoomTo);
	}


	// Using arrow keys to turn the page

	$(document).keydown(function(e) {

		var previous = 37,
			next = 39,
			esc = 27;

		switch (e.keyCode) {
			case previous:

				// left arrow
				$('.magazine').turn('previous');
				e.preventDefault();

				break;
			case next:

				//right arrow
				$('.magazine').turn('next');
				e.preventDefault();

				break;
			case esc:

				$('.magazine-viewport').zoom('zoomOut');
				e.preventDefault();

				break;
		}
	});


	window.Hash.on('^page\/([0-9]*)$', {
		yep: function(path, parts) {
			var page = parts[1];

			if (page !== undefined) {
				if ($('.magazine').turn('is')) {
					$('.magazine').turn('page', page);
				}
			}

		},
		nop: function() {

			if ($('.magazine').turn('is')) {
				$('.magazine').turn('page', 1);
			}
		}
	});


	$(window).resize(function() {
		resizeViewport();
	}).bind('orientationchange', function() {
		resizeViewport();
	});

	// Events for thumbnails

	$('.thumbnails').click(function(event) {

		var page;

		if (event.target && (page = /page-([0-9]+)/.exec($(event.target).attr('class')))) {

			$('.magazine').turn('page', page[1]);
		}
	});

	$('.thumbnails li').
	bind($.mouseEvents.over, function() {
		$(this).addClass('thumb-hover');
	}).bind($.mouseEvents.out, function() {
		$(this).removeClass('thumb-hover');
	});

	if ($.isTouch) {
		$('.thumbnails').
		addClass('thumbanils-touch').
		bind($.mouseEvents.move, function(event) {
			event.preventDefault();
		});
	} else {
		$('.thumbnails ul').mouseover(function() {
			$('.thumbnails').addClass('thumbnails-hover');
		}).mousedown(function() {
			return false;
		}).mouseout(function() {
			$('.thumbnails').removeClass('thumbnails-hover');
		});
	}

	// Regions

	if ($.isTouch) {
		$('.magazine').bind('touchstart', regionClick);
	} else {
		$('.magazine').click(regionClick);
	}

	// Events for the next button

	$('.next-button').bind($.mouseEvents.over, function() {
		$(this).addClass('next-button-hover');
	}).bind($.mouseEvents.out, function() {
		$(this).removeClass('next-button-hover');
	}).bind($.mouseEvents.down, function() {
		$(this).addClass('next-button-down');
	}).bind($.mouseEvents.up, function() {
		$(this).removeClass('next-button-down');
	}).click(function() {
		$('.magazine').turn('next');
	});

	// Events for the next button

	$('.previous-button').bind($.mouseEvents.over, function() {
		$(this).addClass('previous-button-hover');
	}).bind($.mouseEvents.out, function() {
		$(this).removeClass('previous-button-hover');
	}).bind($.mouseEvents.down, function() {
		$(this).addClass('previous-button-down');
	}).bind($.mouseEvents.up, function() {
		$(this).removeClass('previous-button-down');
	}).click(function() {
		$('.magazine').turn('previous');
	});

	resizeViewport();

	$('.magazine').addClass('animated');
}
/**
 * 缩略图数据
 * @type {Array}
 */
var thumbnailsData = [{
	page: 1,
	thumb: "images/open/1-thumb.jpg",
	small: "images/open/1.jpg",
	large: "images/open/1-large.jpg"
},{
	page: 2,
	thumb: "images/open/2-thumb.jpg",
	small: "images/open/2.jpg",
	large: "images/open/2-large.jpg"
},{
	page: 3,
	thumb: "images/open/3-thumb.jpg",
	small: "images/open/3.jpg",
	large: "images/open/3-large.jpg"
},{
	page: 4,
	thumb: "images/open/4-thumb.jpg",
	small: "images/open/4.jpg",
	large: "images/open/4-large.jpg"
},{
	page: 5,
	thumb: "images/open/5-thumb.jpg",
	small: "images/open/5.jpg",
	large: "images/open/5-large.jpg"
},{
	page: 6,
	thumb: "images/open/6-thumb.jpg",
	small: "images/open/6.jpg",
	large: "images/open/6-large.jpg"
},{
	page: 7,
	thumb: "images/open/7-thumb.jpg",
	small: "images/open/7.jpg",
	large: "images/open/7-large.jpg"
},{
	page: 8,
	thumb: "images/open/8-thumb.jpg",
	small: "images/open/8.jpg",
	large: "images/open/8-large.jpg"
},{
	page: 9,
	thumb: "images/open/9-thumb.jpg",
	small: "images/open/9.jpg",
	large: "images/open/9-large.jpg"
},{
	page: 10,
	thumb: "http://turnjs.com/samples/magazine1/pages/10-thumb.jpg",
	small: "http://turnjs.com/samples/magazine1/pages/10.jpg",
	large: "http://turnjs.com/samples/magazine1/pages/10-large.jpg"
},{
	page: 11,
	thumb: "http://turnjs.com/samples/magazine1/pages/11-thumb.jpg",
	small: "http://turnjs.com/samples/magazine1/pages/11.jpg",
	large: "http://turnjs.com/samples/magazine1/pages/11-large.jpg"
},{
	page: 12,
	thumb: "http://turnjs.com/samples/magazine1/pages/12-thumb.jpg",
	small: "http://turnjs.com/samples/magazine1/pages/12.jpg",
	large: "http://turnjs.com/samples/magazine1/pages/12-large.jpg"
}];

/**
 * 添加页
 */
function addPage(page, book) {
	// console.log(page, book);
	//var id, pages = book.turn('pages');

	// Create a new element for this page
	var element = $('<div />', {});

	// Add the page to the flipbook
	if (book.turn('addPage', element, page)) {

		// Add the initial HTML
		// It will contain a loader indicator and a gradient
		element.html('<div class="gradient"></div><div class="loader"></div>');

		// Load the page
		loadPage(page, element);
	}
}

/**
 * 加载页
 * @param {[type]} page        [description]
 * @param {[type]} pageElement [description]
 * return {[type]}  [description]
 */
function loadPage(page, pageElement) {
	// Create an image element

	var img = $('<img />');

	img.mousedown(function(e) {
		e.preventDefault();
	});

	img.load(function() {

		// Set the size
		$(this).css({
			width: '100%',
			height: '100%'
		});

		// Add the image to the page after loaded

		$(this).appendTo(pageElement);

		// Remove the loader indicator

		pageElement.find('.loader').remove();
	});

	// Load the page
	img.attr('src', thumbnailsData[page-1].small);

	//loadRegions(page, pageElement);
}

/**
 * 放大缩小
 * @param {[type]} event [description]
 * return {[type]}  [description]
 */
function zoomTo(event) {
	setTimeout(function() {
		if ($('.magazine-viewport').data().regionClicked) {
			$('.magazine-viewport').data().regionClicked = false;
		} else {
			if ($('.magazine-viewport').zoom('value') === 1) {
				$('.magazine-viewport').zoom('zoomIn', event);
			} else {
				$('.magazine-viewport').zoom('zoomOut');
			}
		}
	}, 1);
}

/**
 * 点击区域
 * @param {[type]} event [description]
 * return {[type]}  [description]
 */
function regionClick(event) {
	// var region = $(event.target);

	// if (region.hasClass('region')) {

	// 	$('.magazine-viewport').data().regionClicked = true;

	// 	setTimeout(function() {
	// 		$('.magazine-viewport').data().regionClicked = false;
	// 	}, 100);

	// 	var regionType = $.trim(region.attr('class').replace('region', ''));

	// 	return processRegion(region, regionType);

	// }
}

// Process the data of every region
function processRegion(region, regionType) {
	data = decodeParams(region.attr('region-data'));

	switch (regionType) {
		case 'link':

			window.open(data.url);

			break;
		case 'zoom':

			var regionOffset = region.offset(),
				viewportOffset = $('.magazine-viewport').offset(),
				pos = {
					x: regionOffset.left - viewportOffset.left,
					y: regionOffset.top - viewportOffset.top
				};

			$('.magazine-viewport').zoom('zoomIn', pos);

			break;
		case 'to-page':

			$('.magazine').turn('page', data.page);

			break;
	}
}

/**
 * 加载大页
 * @param {[type]} page        [description]
 * @param {[type]} pageElement [description]
 * return {[type]}  [description]
 */
function loadLargePage(page, pageElement) {
	var img = $('<img />');
	// console.log(thumbnailsData[page-1].large);
	img.load(function() {

		var prevImg = pageElement.find('img');
		$(this).css({
			width: '100%',
			height: '100%'
		});
		$(this).appendTo(pageElement);
		prevImg.remove();

	});

	// Loadnew page

	img.attr('src', thumbnailsData[page-1].large);
}

/**
 * 加载页
 * @param {[type]} page        [description]
 * @param {[type]} pageElement [description]
 * return {[type]}  [description]
 */
function loadSmallPage(page, pageElement) {
	var img = pageElement.find('img');
	console.log(thumbnailsData[page-1].small);
	img.css({
		width: '100%',
		height: '100%'
	});

	img.unbind('load');
	// Loadnew page

	img.attr('src', thumbnailsData[page-1].small);
}

/**
 * 收缩侧边栏
 * return {[type]} [description]
 */
function siderToggle() {
	$('#sidebarToggle').toggleClass('toggled');
	var w = ($('.thumbnails').width() === 0) ? 167 : 0;
	$('.thumbnails').animate({
		width: w
	}, {
		step: function() {
			resizeViewport();
		}
	});
}

/**
 * 切换侧边栏
 * @param {[type]} index [description]
 * return {[type]}  [description]
 */
function switchSider(index) {
	switch (index) {
		case 1:
			$('#viewOutline').removeClass('toggled');
			$('#viewThumbnail').addClass('toggled');
			$('#thumbnails').show();
			$('#outlines').hide();
			break;
		case 2:
			$('#viewThumbnail').removeClass('toggled');
			$('#viewOutline').addClass('toggled');
			$('#thumbnails').hide();
			$('#outlines').show();
			break;
	}
}

/**
 * 翻下一页
 * return {[type]} [description]
 */
function turnNext() {
	$('.magazine').turn('next');
}

/**
 * 翻上一页
 * return {[type]} [description]
 */
function turnPrevious() {
	$('.magazine').turn('previous');
}

/**
 * 全屏切换
 * return {[type]} [description]
 */
function fullScreenToggle() {
	var bool = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;

	if (bool) {
		exitFullscreen();
	} else {

		fullScreen(document.getElementById('canvas'));
	}
}

/**
 * 全屏
 * @param {[type]} element [description]
 * return {[type]}  [description]
 */
function launchFullscreen(element) {
	if (element.requestFullscreen) {
		element.requestFullscreen();
	} else if (element.mozRequestFullScreen) {
		element.mozRequestFullScreen();
	} else if (element.webkitRequestFullscreen) {
		element.webkitRequestFullscreen();
	} else if (element.msRequestFullscreen) {
		element.msRequestFullscreen();
	}
}

/**
 * 全屏
 * @param {[type]} element [description]
 * return {[type]}  [description]
 */
function fullScreen(el) {
	var rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullScreen;
	if (typeof rfs !== 'undefined' && rfs) {
		rfs.call(el);
	} else if (typeof window.ActiveXObject !== 'undefined') {

		var wscript = new ActiveXObject('WScript.Shell');
		if (wscript !== null) {
			wscript.SendKeys('{F11}');
		}
	}
}

/**
 * 退出全屏
 * return {[type]} [description]
 */
function exitFullscreen() {
	if (document.exitFullscreen) {
		document.exitFullscreen();
	} else if (document.mozCancelFullScreen) {
		document.mozCancelFullScreen();
	} else if (document.webkitExitFullscreen) {
		document.webkitExitFullscreen();
	}
}

/**
 * 翻页
 * @param {[type]} index [description]
 * return {[type]}  [description]
 */
function turnPage(index) {
	if (event.keyCode === 13) {
		if ($('.magazine').turn('hasPage', index)) {
			$('.magazine').turn('page', index);
		}
		return false;
	}
}

/**
 * 获取页数
 * @param {[type]} book [description]
 * return {[type]}  [description]
 */
function numberOfViews(book) {
	return book.turn('pages') / 2 + 1;
}

/**
 * 获取当前页数
 * @param {[type]} book [description]
 * @param {[type]} page [description]
 * return {[type]}  [description]
 */
function getViewNumber(book, page) {
	return parseInt((page || book.turn('page')) / 2 + 1, 10);
}

function moveBar(yes) {
	if (Modernizr && Modernizr.csstransforms) {
		$('#slider .ui-slider-handle').css({
			zIndex: yes ? -1 : 10000
		});
	}
}

function setPreview(view) {

	var previewWidth = 112,
		previewHeight = 73,
		previewSrc = 'images/preview.jpg',
		preview = $(_thumbPreview.children(':first')),
		numPages = (view === 1 || view === $('#slider').slider('option', 'max')) ? 1 : 2,
		width = (numPages === 1) ? previewWidth / 2 : previewWidth;

	_thumbPreview.
	addClass('no-transition').
	css({
		width: width + 15,
		height: previewHeight + 15,
		top: -previewHeight - 30,
		left: ($($('#slider').children(':first')).width() - width - 15) / 2
	});

	preview.css({
		width: width,
		height: previewHeight
	});

	if (preview.css('background-image') === '' ||
		preview.css('background-image') === 'none') {

		preview.css({
			backgroundImage: 'url(' + previewSrc + ')'
		});

		setTimeout(function() {
			_thumbPreview.removeClass('no-transition');
		}, 0);

	}

	preview.css({
		backgroundPosition: '0px -' + ((view - 1) * previewHeight) + 'px'
	});
}

// decode URL Parameters
function decodeParams(data) {
	var parts = data.split('&'),
		d, obj = {};

	for (var i = 0; i < parts.length; i++) {
		d = parts[i].split('=');
		obj[decodeURIComponent(d[0])] = decodeURIComponent(d[1]);
	}
	return obj;
}

// Calculate the width and height of a square within another square
function calculateBound(d) {
	var bound = {
		width: d.width,
		height: d.height
	};

	if (bound.width > d.boundWidth || bound.height > d.boundHeight) {

		var rel = bound.width / bound.height;

		if (d.boundWidth / rel > d.boundHeight && d.boundHeight * rel <= d.boundWidth) {

			bound.width = Math.round(d.boundHeight * rel);
			bound.height = d.boundHeight;

		} else {

			bound.width = d.boundWidth;
			bound.height = Math.round(d.boundWidth / rel);

		}
	}

	return bound;
}

document.addEventListener('fullscreenchange', function(e) {
	var bool = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;
	if (bool) {
		$('#presentationMode').addClass('toggled');
	} else {
		$('#presentationMode').removeClass('toggled');
	}
});

document.addEventListener('mozfullscreenchange', function(e) {
	var bool = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;
	if (bool) {
		$('#presentationMode').addClass('toggled');
	} else {
		$('#presentationMode').removeClass('toggled');
	}
});

document.addEventListener('webkitfullscreenchange', function(e) {
	var bool = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;
	if (bool) {
		$('#presentationMode').addClass('toggled');
	} else {
		$('#presentationMode').removeClass('toggled');
	}
});

document.addEventListener('msfullscreenchange', function(e) {
	var bool = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;
	if (bool) {
		$('#presentationMode').addClass('toggled');
	} else {
		$('#presentationMode').removeClass('toggled');
	}
});

$('#viewOutline').click(function() {
	switchSider(2);
});

$('#viewThumbnail').click(function() {
	switchSider(1);
});

$('#sidebarToggle').click(function() {
	siderToggle();
});

$('#presentationMode').click(function() {
	fullScreenToggle();
});

$('#next').click(function() {
	turnNext();
});

$('#previous').click(function() {
	turnPrevious();
});

$('#pageNumber').keypress(function() {
	turnPage(this.value);
});

// Zoom icon
$('.zoom-icon').bind('mouseover', function() {
	if ($(this).hasClass('zoom-icon-in')) {
		$(this).addClass('zoom-icon-in-hover');
	}
	if ($(this).hasClass('zoom-icon-out')) {
		$(this).addClass('zoom-icon-out-hover');
	}
}).bind('mouseout', function() {
	if ($(this).hasClass('zoom-icon-in')) {
		$(this).removeClass('zoom-icon-in-hover');
	}

	if ($(this).hasClass('zoom-icon-out')) {
		$(this).removeClass('zoom-icon-out-hover');
	}
}).bind('click', function() {
	if ($(this).hasClass('zoom-icon-in')) {
		$('.magazine-viewport').zoom('zoomIn');
	} else if ($(this).hasClass('zoom-icon-out')) {
		$('.magazine-viewport').zoom('zoomOut');
	}
});

$('.tree').click(function() {
	$(this).nextAll("img, span, div").slideToggle();
});

$('#canvas').hide();

loadApp();