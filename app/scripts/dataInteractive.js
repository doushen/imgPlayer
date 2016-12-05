// // var thumbnailsData = [{
// // 	page: 1,
// // 	thumb: "images/open/1-thumb.jpg",
// // 	small: "images/open/1.jpg",
// // 	large: "images/open/1-large.jpg"
// // }]

// //模拟数据
var booksOutline = {
	"catalog": [{
		"title": "第一章",
		"secondLevelList": [{
			"smallTitle": "",
			"content": [{
				"thumb": "images/open/1-thumb.jpg",
				"small": "images/open/1.jpg",
				"large": "images/open/1-large.jpg",
				"page": "1"
			}]
		}]
	},
	{
		"title": "第二章",
		"secondLevelList": [{
			"smallTitle": "第一节",
			"content": [{
				"thumb": "images/open/2-thumb.jpg",
				"small": "images/open/2.jpg",
				"large": "images/open/2-large.jpg",
				"page": "2"
			},
			{
				"thumb": "images/open/3-thumb.jpg",
				"small": "images/open/3.jpg",
				"large": "images/open/3-large.jpg",
				"page": "3"
			}]
		},
		{
			"smallTitle": "第二节",
			"content": [{
				"thumb": "images/open/4-thumb.jpg",
				"small": "images/open/4.jpg",
				"large": "images/open/4-large.jpg",
				"page": "4"
			},
			{
				"thumb": "images/open/5-thumb.jpg",
				"small": "images/open/5.jpg",
				"large": "images/open/5-large.jpg",
				"page": "5"
			},
			{
				"thumb": "images/open/6-thumb.jpg",
				"small": "images/open/6.jpg",
				"large": "images/open/6-large.jpg",
				"page": "6"
			},
			{
				"thumb": "images/open/7-thumb.jpg",
				"small": "images/open/7.jpg",
				"large": "images/open/7-large.jpg",
				"page": "7"
			}]
		}]
	}]
}

// console.log(booksOutline);

// Handlebars.registerHelper("list", function (str) {
// 	var html = "";
// 	var len = str.length;
// 	var page = "";
// 	var content;
// 	// console.log(len);
// 	if( len <= 2 ){
// 		for( var i = 0; i < len; i ++ ){
// 			html += '<img src="'+ str[i].small +'" width="54" height="70" class="page-'+ str[i].page +'" />';
// 			page += str[i].page + ' - ';
// 		}
// 		content = '<div class="books-catalog"><div class="cover-pic">'+ html +'<span>'+ page.substr(0, page.length-2) +'</span></div></div';
// 	}else{
// 		var text = '';
// 		var text1 = '';
// 		var html1 = '';
// 		var page1 = '';
// 		for( var i = 0; i < len; i ++ ){

// 			if( i % 2 != 0 ){
// 				console.log(1)
// 				html += '<img src="'+ str[i].small +'" width="54" height="70" class="page-'+ str[i].page +'" />';
// 				page += str[i].page + ' - ';

// 			}else{
// 				console.log(2)
// 				html1 += '<img src="'+ str[i].small +'" width="54" height="70" class="page-'+ str[i].page +'" />';
// 				page1 += str[i].page + ' - ';
				
// 			}

// 			text = '<div class="books-catalog"><div class="cover-pic">'+ html +'<span>'+ page.substr(0, page.length-2) +'</span></div></div>';
// 			text1 = '<div class="books-catalog"><div class="cover-pic">'+ html1 +'<span>'+ page1.substr(0, page1.length-2) +'</span></div></div>';


// 		}

// 		console.log(text)

// 		content = text + text1;
// 	}

// 	return content;

// 	// switch( str.length ){
// 	// 	case 'link':

// 	// 	window.open(data.url);

// 	// 	break;
// 	// }

// })


// /**
//  * 大纲列表
// **/
// var simplifiedTemplate  = Handlebars.compile($("#simplified").html());
// $("#thumbnails").html(simplifiedTemplate(booksOutline)); //缩略图

// // var outlineHTML = Handlebars.compile($("#outlineList").html());
// // $("#outlines").html(outlineHTML(booksList)); //详情大纲
