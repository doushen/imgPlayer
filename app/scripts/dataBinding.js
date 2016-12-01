var booksList = { 
    "booksCatalog": [ 
        {
            "title": "拉斯维加斯",
            "chapter": 
            [{
            	"samllTitle": "",
            	"img": ["1-thumb.jpg"]
	        }]
        },
        {
            "title": "第一章", 
            "chapter": 
            [{
                "samllTitle": "第一节",
                "img": ["2-thumb.jpg", "3-thumb.jpg"]
            }]
        },
        {
            "title": "第二章", 
            "chapter": 
            [{
                "samllTitle": "第一节",
                "img": ["4-thumb.jpg", "5-thumb.jpg"]
            },
            {
                "samllTitle": "第二节",
                "img": ["6-thumb.jpg", "7-thumb.jpg"]
            }]
        },
    ],
}

/**
 * 图书目录
**/
var template = Handlebars.compile($("#booksList").html());
$(".thumbnails").html(template(booksList));
