//模拟数据
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
	},
	{
		"title": "第三章",
		"secondLevelList": [{
			"smallTitle": "",
			"content": [{
				"thumb": "images/open/8-thumb.jpg",
				"small": "images/open/8.jpg",
				"large": "images/open/8-large.jpg",
				"page": "8"
			},
			{
				"thumb": "images/open/9-thumb.jpg",
				"small": "images/open/9.jpg",
				"large": "images/open/9-large.jpg",
				"page": "9"
			},
			{
				"thumb": "images/10-thumb.jpg",
				"small": "images/10.jpg",
				"large": "images/10-large.jpg",
				"page": "10"
			},
			{
				"thumb": "images/11-thumb.jpg",
				"small": "images/11.jpg",
				"large": "images/11-large.jpg",
				"page": "11"
			}]
		}]
	},
	{
		"title": "结束",
		"secondLevelList": [{
			"smallTitle": "",
			"content": [{
				"thumb": "images/12-thumb.jpg",
				"small": "images/12.jpg",
				"large": "images/12-large.jpg",
				"page": "12"
			}]
		}]
	}]
}

//创建新的图片展示数据结构
var thumbnailsData = new Array();
function exhibitionData(){
	for( var i = 0; i < booksOutline.catalog.length; i++ ){
		for( var j = 0; j < booksOutline.catalog[i].secondLevelList.length; j++ ){
			for( var k = 0; k < booksOutline.catalog[i].secondLevelList[j].content.length; k++ ){
				thumbnailsData.push(booksOutline.catalog[i].secondLevelList[j].content[k]);
			}
		}
	}
}
exhibitionData();

//缩略图片展示模板
Handlebars.registerHelper("list", function (str) {

	var templateHTML = '';
	var k = 0;
	if( str.length < 2 ){
		var html = "";
		var page = "";
		for( var i = 0; i < str.length; i ++ ){
			html += '<img src="'+ str[k].small +'" width="54" height="70" class="page-'+ str[k].page +'" />';
			page += str[k].page + ' - ';

		}
		templateHTML = '<div class="cover-pic">' + html + '<span>'+ page.substr(0, page.length-2) +'</span></div>';
	}else{
		for( var i = 0; i < Math.ceil(str.length / 2); i++ ){
			var html = "";
			var page = "";
			for( var j = 0; j < 2; j ++ ){
				if( k < str.length ){
					html += '<img src="'+ str[k].small +'" width="54" height="70" class="page-'+ str[k].page +'" />';
					page += str[k].page + ' - ';
				}
				k ++;
			}
			templateHTML += '<div class="cover-pic">' + html + '<span>'+ page.substr(0, page.length-2) +'</span></div>';
		}
	}
	return templateHTML;
})


/**
 * 大纲列表
**/
var simplifiedTemplate  = Handlebars.compile($("#simplified").html());
$("#thumbnails").html(simplifiedTemplate(booksOutline)); //缩略图

var detailedTemplate = Handlebars.compile($("#detailed").html());
$("#outlines").html(detailedTemplate(booksOutline)); //详情大纲