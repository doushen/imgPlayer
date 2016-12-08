'use strict';

/**
 * 判断是否是chrome
 * return {Boolean} [description]
 */
function isChrome() {
	return navigator.userAgent.indexOf('Chrome') !== -1;
}

/**
 * 识别浏览器
 */
function browser(){
	var userAgent = navigator.userAgent;
	var isOpera = userAgent.indexOf("Opera") > -1;
	if(isOpera){
        return "Opera"
    }; //判断是否Opera浏览器
    if(userAgent.indexOf("Firefox") > -1){
        return "FF";
    } //判断是否Firefox浏览器
    if(userAgent.indexOf("Chrome") > -1){
		return "Chrome";
	}
    if(userAgent.indexOf("Safari") > -1){
        return "Safari";
    } //判断是否Safari浏览器
    if(userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera){
        return "IE";
    }; //判断是否IE浏览器
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

/*
 * 阅读标识
*/
function currentReading(page, currentPage){
	var removeEle = $('.thumbnails .page-' + currentPage);
	var addEle = $('.thumbnails .page-' + page);

    if( addEle.parents('.books-catalog').hasClass('activate') == false ){
	    removeEle.parents('.books-catalog').find('ul').css({'display':'none'});
	}

    removeEle.parent().removeClass('current');
    removeEle.parents('.cover-pic').removeClass('current');
    removeEle.parents('li').find('h3').removeClass('title-hover');
    removeEle.parents('.books-catalog').removeClass('activate');
    removeEle.parents('.books-catalog').find('h2 i').css({
        'background-image':'url(../images/arrows-down.png)',
        'background-size':'100%'
    })
    

    if( addEle.parents('.thumbnails').hasClass('single_page') ){
    	addEle.parent().addClass('current');
    }else{
    	addEle.parents('.cover-pic').addClass('current');
    }

    addEle.parents('li').find('h3').addClass('title-hover');
    addEle.parents('.books-catalog').addClass('activate');
    addEle.parents('.books-catalog').find('h2 i').css({
        'background-image':'url(../images/arrows-up.png)',
        'background-size':'100%'
    })
    addEle.parents('.books-catalog').find('ul').slideDown('slow');
    if( addEle.parents('.pic_list').is(':hidden') ){
    	addEle.parents('.pic_list').slideDown('slow');
    }

    $('#pageNumber').val(page);
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

	// var reg = $('<div />', {
	// 		'class': 'region  ' + region.class
	// 	}),
	// 	options = $('.magazine').turn('options'),
	// 	pageWidth = options.width / 2,
	// 	pageHeight = options.height;

	// reg.css({
	// 	top: Math.round(region.y / pageHeight * 100) + '%',
	// 	left: Math.round(region.x / pageWidth * 100) + '%',
	// 	width: Math.round(region.width / pageWidth * 100) + '%',
	// 	height: Math.round(region.height / pageHeight * 100) + '%'
	// }).attr('region-data', $.param(region.data || ''));


	// reg.appendTo(pageElement);
}

/**
 * 加载区域
 * @param {[type]} page    [description]
 * @param {[type]} element [description]
 * return {[type]}  [description]
 */
function loadRegions(page, element) {
	// $.getJSON('images/' + page + '-regions.json').
	// done(function(data) {

	// 	$.each(data, function(key, region) {
	// 		addRegion(region, element);
	// 	});
	// });
}

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
		// $(this).css({
		// 	width: '100%',
		// 	height: '100%'
		// });

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
	// console.log
	// (thumbnailsData[page-1].large);
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
	// console.log(thumbnailsData[page-1].small);
	img.css({
		width: '100%',
		height: 'auto'
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
	var w = ($('.thumbnails').width() === 0) ? 220 : 0;
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
 * 单双页阅读
 * @param {[type]} index [description]
 */
function readingMode( index ){
	var page = $('.magazine').turn('page');
	switch (index) {
		case 1:
			$('.magazine').turn("display", 'single');
			$('#doubleReadingMode').removeClass('toggled');
			$('.thumbnails').removeClass('double_page').addClass('single_page');
			$('.thumbnails .cover-pic').removeClass('current');
			$('#singleReadingMode').addClass('toggled');
			$('.thumbnails .page-' + page).parent().addClass('current');
			break;
		case 2:
			$('.magazine').turn("display", 'double');
			$('#singleReadingMode').removeClass('toggled');
			$('.thumbnails').removeClass('single_page').addClass('double_page');
			$('#doubleReadingMode').addClass('toggled');
			$('.thumbnails .pic-list').removeClass('current');
			$('.thumbnails .page-' + page).parents('.cover-pic').addClass('current');
			break;
	}
}

/**
 * 打印pdf文件
 */
function printPageFun( _this ){
	var printUrl = _this.attr("href");
	var iframe = '<iframe id="printPage" name="printPage" src="'+ printUrl +'"style="\
				 	position: absolute;\
				 	top: 0px;\
				 	left: 0px;\
				 	width: 0;\
				 	height: 0;\
				 	overflow: hidden;\
				 	display: none\
				 	"></iframe>';
	$("body").append(iframe);

	console.log(browser());
	if( browser() == 'Chrome' || browser() == 'Safari' ){
		$('#printPage').bind("load",function(){
			frames["printPage"].focus();
			frames["printPage"].print();
		})
	}else{ //FF、IE
		window.open(printUrl).print();
		// window.open(printUrl);
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
	if(bool) {
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

$('#singleReadingMode').click(function(){
	readingMode(1)
})

$('#doubleReadingMode').click(function(){
	readingMode(2)
})

$('#print').click(function(){
	// alert("功能还未开发!");
	printPageFun( $(this) );
})

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

// 文档大纲显示
$('.books-catalog h2').click(function(){

    if( $(this).siblings('ul').is(':hidden') ){
        $(this).parent().siblings().find('ul').slideUp('slow');
        $(this).parent().siblings().find('.arrow').css({
            'background-image':'url(../images/arrows-down.png)',
            'background-size':'100%'
        });
        $(this).siblings('ul').slideDown('slow');
        $(this).find('.arrow').css({
            'background-image':'url(../images/arrows-up.png)',
            'background-size':'100%'
        });
    }else{
        $(this).siblings('ul').slideUp('slow');
        $(this).find('.arrow').css({
            'background-image':'url(../images/arrows-down.png)',
            'background-size':'100%'
        });
    }

})

$('.books-catalog ul h3').click(function(){
    if( $(this).siblings().is(':hidden') ){
        $(this).siblings().slideDown('slow');
    }else{
        $(this).siblings().slideUp('slow');
    }
    
})

