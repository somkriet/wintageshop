// codebee company limited
// http://www.codebee.co.th

var BAG = {};
BAG.application_flip = "front";
BAG.currentIndex = 0;
BAG.currentId = "#bag";
BAG.defaultImage = new Object(); // เสื้อเปล่าสำหรับเปลี่ยนสี
BAG.defaultColor = Canvas.getRandomColor();
BAG.loaderURL = baseURL + "Apps/getBag";
BAG.texturealpha = 0.18;
BAG.key = "bag";
BAG.type = ["Box", "Cut", "Hidden", "Flat"];
BAG.data = {};

BAG.sliderArr = [];

BAG.default_pattern = baseURL + "assets/default/" + BAG.key + "/" + BAG.key + ".png";
BAG.item_tab_id = ["#bag"]; // หมวดหมู่ย่อยของเสื้อยืด
BAG.item_list = {} // เก็บไอเทมทั้งหมดของเสื้อยืด
BAG.item_color_list = new Array(); // เก็บสีของไอเทมนั้น ๆ 
BAG.grade_color = "";
var isInit = false;

BAG.initialize = function () {
    BAG.clear();
    BAG.application_flip = Canvas.application_flip;

    Canvas.design_name = "Bag";
    Canvas.textStyle.html("<span class='blacktxt'>Your Design</span> : Bag");

    for (var i = 0; i < BAG.item_tab_id.length; i++) {
        var id = BAG.item_tab_id[i];
        var index = (i + 1);
        BAG.initSlider(id);
        Canvas.clearDefaultItems(id);
        if (!BAG.item_list[id]) BAG.item_list[id] = new Array();
        BAG.loadItemInTab(id, index);
    }

    if (Canvas.bagdata && !isInit) {
        isInit = true;
        BAG.sortLoadData();
    }
    BAG.defaultTemplate();
    BAG.loadCurrent();
}
BAG.sortLoadData = function () {
    var json = JSON.parse(Canvas.bagdata);
    if (Object.keys(json.item_list).length > 0) {
        BAG.item_list = json.item_list;
    }
    BAG.currentIndex = json.currentIndex;
    BAG.defaultColor = json.defaultColor;

}

BAG.flip = function (application_flip) {
    Canvas.application_flip = BAG.application_flip = application_flip;
    BAG.defaultTemplate();

}


BAG.defaultTemplate = function () {
    Canvas.resetDefaultImage();
    //console.log("assets/default/"+BAG.key+"/"+BAG.type[BAG.currentIndex]+"/"+BAG.key+"_"+BAG.application_flip+"_1.png");
    Canvas.loadBringToBack("assets/default/" + BAG.key + "/" + BAG.type[BAG.currentIndex] + "/" + BAG.key + "_" + BAG.application_flip + "_1.png", function (img) {
        BAG.defaultImage = img; // เสื้อยืดเปล่า
        //console.log(BAG.defaultColor);
        //if(BAG.defaultColor){
        Canvas.setColor(BAG.defaultImage, BAG.defaultColor);
        //}
        if (Canvas.design_name != "") {
            Canvas.textStyle.html("<span class='blacktxt'>Your Design</span> : " + Canvas.design_name);
        }
        if (!Canvas.isSaving) {
            $.unblockUI();
        }
    }, 1);
    Canvas.loadBringToFront("assets/default/" + BAG.key + "/" + BAG.type[BAG.currentIndex] + "/" + BAG.key + "_" + BAG.application_flip + "_2.png", function (img) {
    }, BAG.texturealpha);

}

BAG.loadItemInTab = function (id, index) {
    var url = BAG.loaderURL;
    var data = {subcate_id: index}
    $.ajax({
        url: url,
        type: 'POST',
        data: data,
        dataType: 'json',
        success: function (items) {
            //console.log(JSON.stringify(items));
            BAG.arrange(items, id);
        }
    });
}

BAG.arrange = function (items, id) {
    var index = 0;
    BAG.item_list[id].items = items;
    $(id + " .default_content").empty();

    for (var key in items) {
        var obj = items[key];
        for (var prop in obj) {
            // console.log(prop + " = " + obj[prop]);
            var item_thumbnail = obj['item_thumbnail'];
            var item_color = obj['item_color'];
            var item_name = obj['item_name'];
        }

        item_thumbnail = item_thumbnail.replace(localURL, baseURL);

        $(id + " .default_content").append('<div class="col-md-3 imagethumb">' +
            '<a onClick="BAG.expandItem(\'' + id + '\',\'' + index + '\');"><img src="' + item_thumbnail + '" class="img-thumbnail pillsthumb" /></a><div class="labeltxt description">' + item_name + '</div></div>');

        if (!BAG.item_list[id][index]) BAG.item_list[id][index] = obj;
        if (index == 0) {
            var obj = BAG.item_list[id][index];
            //Canvas.design_name = obj['item_name'];;
            Canvas.item_price = obj['item_price'];
            if (Canvas.item_price <= 0) {
                Canvas.item_price = $(".chooseproduct").find('option:selected').attr("cate_price");
            }
            Canvas.calculateInch();
        }
        index++;
    }
    BAG.sliderArr[0].reloadSlider(BAG.sliderConfig);
}
BAG.expandItem = function (id, index) {
    //console.log(id+" : "+index);
    if (!index) {
        Canvas.clearDefaultItems(id);
        BAG.currentId = null;
        BAG.currentIndex = null;
        return;
    }

    BAG.currentItemIndex = 0;
    BAG.currentId = id;
    BAG.currentIndex = index;
    var obj = BAG.item_list[id][index];

    for (var prop in obj) {
        var item_color = obj['item_color'];
        var item_front = obj['item_front'];
        var item_name = obj['item_name'];
    }

    item_front_list = item_front.split(",");
    //BAG.item_color_list = item_color.split(",");
    BAG.item_color_list = BAG.grade_color.split(",");

    $(id + " .default_content").empty();
    var n = 0;

    //alert(BAG.currentIndex);
    BAG.default_pattern = baseURL + "assets/default/" + BAG.key + "/" + BAG.type[BAG.currentIndex] + "/" + BAG.key + ".png";
    //console.log(BAG.item_list[id][0][0]);
    //console.log(id+" : "+index+" : "+n);
    if (!BAG.item_list[id][index][n]) BAG.item_list[id][index][n] = new Object(); // ประกาศไว้เก็บสี
    $(id).prepend('<a onClick="BAG.backItem();" class="btn pinkbtn backapplication default_backbtn"><i class="glyphicon glyphicon-arrow-left"></i> Back To Bag</a>');
    $(id + " .default_content").append('<div class="col-md-3 imagethumb">' +
        '<a><img src="' + BAG.default_pattern + '" class="img-thumbnail pillsthumb">' +
        '<img index="' + (n) + '" src="' + BAG.default_pattern + '" class="pillsthumboverlay" /></a><div class="labeltxt description">Base Color</div></div>');
    n++;

    for (var i = 0; i < item_front_list.length; i++) {
        var item_thumbnail = item_front_list[i];
        if (item_thumbnail != "") {
            item_thumbnail = item_thumbnail.replace(localURL, baseURL);
            if (!BAG.item_list[id][index][n]) BAG.item_list[id][index][n] = new Object(); // ประกาศไว้เก็บสี
            $(id + " .default_content").append('<div class="col-md-3 imagethumb">' +
                '<a><img src="' + BAG.default_pattern + '" class="img-thumbnail pillsthumb" />' +
                '<img index="' + (n) + '" src="' + item_thumbnail + '" class="pillsthumboverlay" /></a><div class="labeltxt description">Bag ' + (n) + '</div></div>');
            n++;
        }
    }

    $(id).append('<div class="colorcontent">' +
        '<ul class="col-md-12">' +
        '<p>Select Color : </p>' + BAG.getColorUI() + '</ul>' +
        '</div>');
    /*$(id).append('<div class="col-md-3 col-xs-12 paddingnone default_backbtn">'+
                                        '<a onClick="BAG.backItem();" class="btn btn-lg btn-block pinkbtn">BACK</a>'+
                                    '</div>');*/
    BAG.loadImageToCanvasWhenClick(id, index);
    BAG.setActiveSubCateItem();
    BAG.defaultTemplate();
    if (BAG.sliderArr[id]) BAG.sliderArr[id].reloadSlider(BAG.sliderConfig);
    /*console.log(BAG.currentId);
    if(BAG.currentId == "#pocket"){
        Canvas.loadBringToFront("assets/default/BAG/pocket_front_2.png",function(img){},1); // โหลดกระเป๋า
    }*/
}


BAG.initColor = function () {
    if (BAG.grade_color) {
        BAG.item_color_list = BAG.grade_color.split(",");
        /*$('.color_container').empty();
         $('.color_container').append('<div class="colorcontent">'+
                                             '<ul class="col-md-12">'+BAG.getColorUI()+'</ul>'+
                                         '</div>');*/
        if (!isInit) {
            BAG.defaultColor = BAG.item_color_list[0];
            //Canvas.setColor(BAG.defaultImage,BAG.defaultColor);
        }
    }
}

BAG.getColorUI = function () {
    var color = "";
    var active = "";
    for (var i = 0; i < BAG.item_color_list.length; i++) {
        active = "";
        if (i == 0) {
            active = "active";
        }
        color += '<li><a id="color' + i + '" class="' + active + '" onClick="BAG.setColor(\'' + BAG.item_color_list[i] + '\',\'' + i + '\');" style="background:' + BAG.item_color_list[i] + '"></a></li>';
    }
    return color;
}
BAG.setColor = function (color, i) {
    $(".colorcontent").find('a').each(function () {
        $(this).removeClass("active");
    });
    $("#color" + i).addClass("active");
    $("#bag .pillsthumboverlay").each(function (index, element) {
        if ($(this).hasClass("active")) {
            //console.log(BAG.currentId+" : "+BAG.currentIndex+" : "+BAG.currentId);
            BAG.item_list[BAG.currentId][BAG.currentIndex][index].color = color; // save สีไปที่รูปนั้น ๆ
            var img = BAG.item_list[BAG.currentId][BAG.currentIndex][index].img; // รูปที่เลือก
            if (index == 0) {
                //BAG.item_list[BAG.currentId][BAG.currentIndex][index].color = color;
                BAG.defaultColor = color;
                img = BAG.defaultImage;
            }
            Canvas.setColor(img, color);
        }
    });


}

BAG.loadImageToCanvasWhenClick = function (id, index) {
    Canvas.clearDefaultItems(id);
    var obj = BAG.item_list[id][index];
    var item_image;
    for (var prop in obj) {
        item_image = obj['item_' + BAG.application_flip];
        //Canvas.design_name = obj['item_name'];
        Canvas.item_price = obj['item_price'];
    }
    if (Canvas.item_price <= 0) {
        Canvas.item_price = $(".chooseproduct").find('option:selected').attr("cate_price");
    }

    Canvas.calculateInch();
    item_image_list = item_image.split(",");

    for (var i = 0; i < item_image_list.length; i++) {
        var url = item_image_list[i];
        url = url.replace(localURL, baseURL);
        var n = (i + 1);
        //console.log("URL : "+url);
        if (url) {
            Canvas.loadTypeImage(url, function (img, id, index, n) {
                //console.log(id+" : "+index+" : "+n);
                if (!BAG.item_list[id][index][n]) BAG.item_list[id][index][n] = new Object(); // ประกาศไว้เก็บสี
                BAG.item_list[id][index][n].img = img; // โหลดรูปเสร็จ แปะติดไปกับ thumbnail
                var color;
                if (BAG.item_list[id][index][n].color) {
                    color = BAG.item_list[id][index][n].color; // คื่นค่าสี หน้า หลัง ซ้าย ขวา ตามที่เลยเลือกไว้

                } else {
                    //color = Canvas.getRandomColor();
                    color = BAG.item_color_list[Math.floor(Math.random() * BAG.item_color_list.length)];
                }
                Canvas.setColor(img, color);
                ImageTool.bringAllToFront();
            }, id, index, n);
        }
    }
}
BAG.loadCurrent = function () {
    if (BAG.currentId && BAG.currentIndex) BAG.loadImageToCanvasWhenClick(BAG.currentId, BAG.currentIndex);
}
BAG.setActiveSubCateItem = function () {
    BAG.resetActiveSubCateItem();
    $("#bag .pillsthumboverlay").each(function (index, element) {
        if (index == 0) {
            $(this).addClass("active");
        }
        var id = $(this).attr("id");
        $(this).click(function (e) {
            BAG.resetActiveSubCateItem();
            BAG.currentItemIndex = index;
            $(this).addClass("active");
            //alert(BAG.currentIndex);
            //BAG.defaultTemplate();
        });
    });
}

BAG.resetActiveSubCateItem = function () {
    $("#bag .pillsthumboverlay").each(function (index, element) {
        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
        }
    });
}

BAG.backItem = function () {
    var items = BAG.item_list[BAG.currentId].items;
    BAG.arrange(items, BAG.currentId);
    $(BAG.currentId + ' .colorcontent').remove();
    $(BAG.currentId + ' .default_backbtn').remove();
}
BAG.getData = function () {
    BAG.data.currentIndex = BAG.currentIndex;

    BAG.data.item_list = BAG.item_list;
    BAG.data.defaultColor = BAG.defaultColor;

    return BAG.data;
}
BAG.sliderConfig = {
    minSlides: 3,
    maxSlides: 4,
    slideWidth: 100,
    slideMargin: 10,
    pager: false,
    infiniteLoop: false,
    hideControlOnEnd: true
};
BAG.initSlider = function (id) {
    BAG.sliderArr[0] = $(id + ' .default_content').bxSlider(BAG.sliderConfig);
}

BAG.clear = function () {
    //BAG.defaultColor = "#FFFFFF";
    if (BAG.sliderArr[0]) {
        BAG.sliderArr[0].destroySlider();
    }
    $('#bag .default_content').empty();
    $('.colorcontent').remove();
    $('.default_backbtn').remove();
}