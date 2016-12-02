var booksList = { 
    "booksCatalog": [ 
        {
            "title": "拉斯维加斯",
            "chapter": 
            [{
            	"samllTitle": "",
            	"img": 
            	[{
					"pic": "1-thumb.jpg",
					"page": 1
				}]
	        }]
        },
        {
            "title": "第一章", 
            "chapter": 
            [{
                "samllTitle": "第一节",
                "img": 
                [{
					"pic": "2-thumb.jpg",
					"page": 2
				},
				{
					"pic": "3-thumb.jpg",
					"page": 3
				}]
            }]
        },
        {
            "title": "第二章", 
            "chapter": 
            [{
                "samllTitle": "第一节",
                "img": 
                [{
					"pic": "4-thumb.jpg",
					"page": 4
				},
				{
					"pic": "5-thumb.jpg",
					"page": 5
				}]
            },
            {
                "samllTitle": "第二节",
                "img": 
                [{
					"pic": "6-thumb.jpg",
					"page": 6
				},
				{
					"pic": "7-thumb.jpg",
					"page": 7
				}]
            }]
        },
    ]
}

/**
 * 图书目录
**/
// var thumbnailHTML = Handlebars.compile($("#thumbnailList").html());
// $("#thumbnails").html(thumbnailHTML(thumbnailsData)); //缩略图

var outlineHTML = Handlebars.compile($("#outlineList").html());
$("#outlines").html(outlineHTML(booksList)); //目录大纲
