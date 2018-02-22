// codebee company limited
// http://www.codebee.co.th

var APRON = {};
APRON.application_flip = "front";
APRON.currentIndex = 0;
APRON.currentId = "#apron";
APRON.defaultImage = new Object(); // เสื้อเปล่าสำหรับเปลี่ยนสี
APRON.defaultColor = Canvas.getRandomColor();
APRON.loaderURL = baseURL + "Apps/getApron";
APRON.texturealpha = 0.18;
APRON.key = "apron";
APRON.type = ["FullNoPocket", "Full", "HalfNoPocket", "Half"];
APRON.data = {};

APRON.sliderArr = [];

APRON.default_pattern = baseURL + "assets/default/" + APRON.key + "/" + APRON.key + ".png";
APRON.item_tab_id = ["#apron"]; // หมวดหมู่ย่อยของเสื้อยืด
APRON.item_list = {} // เก็บไอเทมทั้งหมดของเสื้อยืด
APRON.item_color_list = new Array(); // เก็บสีของไอเทมนั้น ๆ 
APRON.grade_color = "";
var isInit = false;

APRON.initialize = function () {
    APRON.clear();
    //APRON.application_flip = Canvas.application_flip;
    Canvas.design_name = APRON.type[0];
    Canvas.textStyle.html("<span class='blacktxt'>Your Design</span> : " + APRON.type[0]);
    for (var i = 0; i < APRON.item_tab_id.length; i++) {
        var id = APRON.item_tab_id[i];
        var index = (i + 1);
        APRON.initSlider(id);
        Canvas.clearDefaultItems(id);
        if (!APRON.item_list[id]) APRON.item_list[id] = new Array();
        APRON.loadItemInTab(id, index);
    }

    if (Canvas.aprondata && !isInit) {
        isInit = true;
        APRON.sortLoadData();
    }

    APRON.defaultTemplate();
    APRON.loadCurrent();
}

APRON.sortLoadData = function () {
    var json = JSON.parse(Canvas.aprondata);
    if (Object.keys(json.item_list).length > 0) {
        APRON.item_list = json.item_list;
    }
    APRON.currentIndex = json.currentIndex;
    APRON.defaultColor = json.defaultColor;


}

APRON.flip = function (application_flip) {
    Canvas.application_flip = APRON.application_flip = application_flip;
    APRON.defaultTemplate();

}


APRON.defaultTemplate = function () {
    Canvas.resetDefaultImage();
    //console.log("assets/default/"+APRON.key+"/"+APRON.type[APRON.currentIndex]+"/"+APRON.key+"_"+APRON.application_flip+"_1.png");
    Canvas.loadBringToBack("assets/default/" + APRON.key + "/" + APRON.type[APRON.currentIndex] + "/" + APRON.key + "_" + APRON.application_flip + "_1.png", function (img) {
        APRON.defaultImage = img; // เสื้อยืดเปล่า
        //console.log(APRON.defaultColor);
        if (!Canvas.isSaving) {
            $.unblockUI();
        }
        if (Canvas.design_name != "") {
            Canvas.textStyle.html("<span class='blacktxt'>Your Design</span> : " + Canvas.design_name);
        }
        //if(APRON.defaultColor){
        Canvas.setColor(APRON.defaultImage, APRON.defaultColor);
        //}
    }, 1);
    Canvas.loadBringToFront("assets/default/" + APRON.key + "/" + APRON.type[APRON.currentIndex] + "/" + APRON.key + "_" + APRON.application_flip + "_2.png", function (img) {
    }, APRON.texturealpha);

}

APRON.loadItemInTab = function (id, index) {
    var url = APRON.loaderURL;
    var data = {subcate_id: index}
    $.ajax({
        url: url,
        type: 'POST',
        data: data,
        dataType: 'json',
        success: function (items) {
            //console.log(JSON.stringify(items));
            APRON.arrange(items, id);
        }
    });
}

APRON.arrange = function (items, id) {
    var index = 0;


    APRON.item_list[id].items = items;
    $(id + " .default_content").empty();

    for (var key in items) {
        var obj = items[key];
        for (var prop in obj) {
            // console.log(prop + " = " + obj[prop]);
            var item_thumbnail = obj['item_thumbnail'];
            var item_color = obj['item_color'];
            var item_name = obj['item_name'];
            // var item_front  = obj['item_front'];
        }
        item_thumbnail = item_thumbnail.replace(localURL, baseURL);
        if (!APRON.currentIndex && index == 0) {
            active = "active";
        } else {
            active = "";
        }
        $(id + " .default_content").append('<div class="col-md-3 imagethumb">' +
            '<a onClick="APRON.expandItem(\'' + id + '\',\'' + index + '\');"><img src="' + item_thumbnail + '" class="img-thumbnail pillsthumb ' + active + '" /></a><div class="labeltxt description">' + item_name + '</div></div>');

        if (!APRON.item_list[id][index]) APRON.item_list[id][index] = obj;
        if (index == 0) {
            var obj = APRON.item_list[id][index];
            /*Canvas.design_name = obj['item_name'];;
            Canvas.item_price = obj['item_price'];
            if(Canvas.item_price<=0){
                Canvas.item_price = $(".chooseproduct").find('option:selected').attr("cate_price");
            }
            Canvas.calculateInch();*/
        }
        index++;
    }
    if (APRON.currentIndex) {
        $(APRON.currentId + " .default_content .pillsthumb").eq(parseInt(APRON.currentIndex)).addClass("active");
    }
    APRON.sliderArr[0].reloadSlider(APRON.sliderConfig);
}
APRON.expandItem = function (id, index) {
    //console.log(id+" : "+index);
    if (!index) {
        Canvas.clearDefaultItems(id);
        APRON.currentId = null;
        APRON.currentIndex = null;
        return;
    }

    APRON.currentItemIndex = 0;
    APRON.currentId = id;
    APRON.currentIndex = index;
    var obj = APRON.item_list[id][index];

    for (var prop in obj) {
        var item_color = obj['item_color'];
        var item_front = obj['item_front'];
        var item_name = obj['item_name'];
        //Canvas.design_name = obj['item_name'];;
        Canvas.item_price = obj['item_price'];
    }

    item_front_list = item_front.split(",");
    //APRON.item_color_list = item_color.split(",");
    APRON.item_color_list = APRON.grade_color.split(",");


    if (Canvas.item_price <= 0) {
        Canvas.item_price = $(".chooseproduct").find('option:selected').attr("cate_price");
    }
    Canvas.calculateInch();

    $(id + " .default_content").empty();
    var n = 0;
    Canvas.design_name = APRON.key + "/" + APRON.type[APRON.currentIndex] + "/" + APRON.key;
    Canvas.textStyle.html("<span class='blacktxt'>Your Design</span> : " + item_name);
    //alert(APRON.currentIndex);
    APRON.default_pattern = baseURL + "assets/default/" + APRON.key + "/" + APRON.type[APRON.currentIndex] + "/" + APRON.key + ".png";
    //console.log(APRON.item_list[id][0][0]);
    //console.log(id+" : "+index+" : "+n);
    if (!APRON.item_list[id][index][n]) APRON.item_list[id][index][n] = new Object(); // ประกาศไว้เก็บสี
    $(id).prepend('<a onClick="APRON.backItem();" class="btn pinkbtn backapplication default_backbtn"><i class="glyphicon glyphicon-arrow-left"></i> Back To Aporn</a>');
    $(id + " .default_content").append('<div class="col-md-3 imagethumb">' +
        '<a><img src="' + APRON.default_pattern + '" class="img-thumbnail pillsthumb">' +
        '<img id="' + (id) + '" index="' + (n) + '" src="' + APRON.default_pattern + '" class="pillsthumboverlay" /></a><div class="labeltxt description">Base Color</div></div>');
    n++;

    for (var i = 0; i < item_front_list.length; i++) {
        var item_thumbnail = item_front_list[i];
        if (item_thumbnail != "") {
            item_thumbnail = item_thumbnail.replace(localURL, baseURL);
            if (!APRON.item_list[id][index][n]) APRON.item_list[id][index][n] = new Object(); // ประกาศไว้เก็บสี
            $(id + " .default_content").append('<div class="col-md-3 imagethumb">' +
                '<a><img src="' + APRON.default_pattern + '" class="img-thumbnail pillsthumb" />' +
                '<img id="' + (id) + '" index="' + (n) + '" src="' + item_thumbnail + '" class="pillsthumboverlay" /></a><div class="labeltxt description">Apron ' + (n) + '</div></div>');
            n++;
        }
    }

    $(id).append('<div class="colorcontent">' +
        '<ul class="col-md-12">' +
        '<p>Select Color : </p>' + APRON.getColorUI() + '</ul>' +
        '</div>');
    /*$(id).append('<div class="col-md-3 col-xs-12 paddingnone default_backbtn">'+
                                        '<a onClick="APRON.backItem();" class="btn btn-lg btn-block pinkbtn">BACK</a>'+
                                    '</div>');*/
    APRON.loadImageToCanvasWhenClick(id, index);
    APRON.setActiveSubCateItem();
    APRON.defaultTemplate();
    if (APRON.sliderArr[0]) APRON.sliderArr[0].reloadSlider(APRON.sliderConfig);
    /*console.log(APRON.currentId);
    if(APRON.currentId == "#pocket"){
        Canvas.loadBringToFront("assets/default/apron/pocket_front_2.png",function(img){},1); // โหลดกระเป๋า
    }*/
}


APRON.initColor = function () {
    if (APRON.grade_color) {
        APRON.item_color_list = APRON.grade_color.split(",");
        for (var i = 0; i < APRON.item_color_list.length; i++) {
            APRON.item_color_list[i] = APRON.item_color_list[i].trim();
        }
        if (!isInit) {
            APRON.defaultColor = APRON.item_color_list[0];
            //Canvas.setColor(APRON.defaultImage,APRON.defaultColor);
        }
        /*$('.color_container').empty();
         $('.color_container').append('<div class="colorcontent">'+
                                             '<ul class="col-md-12">'+APRON.getColorUI()+'</ul>'+
                                         '</div>');*/
    }
}

APRON.getColorUI = function () {
    var color = "";
    var active = "";
    for (var i = 0; i < APRON.item_color_list.length; i++) {
        active = "";
        if (i == 0) {
            active = "active";
        }
        color += '<li><a id="color' + i + '" class="' + active + '" onClick="APRON.setColor(\'' + APRON.item_color_list[i] + '\',\'' + i + '\');" style="background:' + APRON.item_color_list[i] + '"></a></li>';
    }
    return color;
}
APRON.setColor = function (color, i) {
    $(".colorcontent").find('a').each(function () {
        $(this).removeClass("active");
    });
    $("#color" + i).addClass("active");
    $("#apron .pillsthumboverlay").each(function (index, element) {
        if ($(this).hasClass("active")) {
            //console.log(APRON.currentId+" : "+APRON.currentIndex+" : "+APRON.currentId);
            APRON.item_list[APRON.currentId][APRON.currentIndex][index].color = color; // save สีไปที่รูปนั้น ๆ
            var img = APRON.item_list[APRON.currentId][APRON.currentIndex][index].img; // รูปที่เลือก
            if (index == 0) {
                //APRON.item_list[APRON.currentId][APRON.currentIndex][index].color = color;
                APRON.defaultColor = color;
                img = APRON.defaultImage;
            }
            Canvas.setColor(img, color);
        }
    });


}

APRON.loadImageToCanvasWhenClick = function (id, index) {
    Canvas.clearDefaultItems(id);
    var obj = APRON.item_list[id][index];
    var item_image;
    for (var prop in obj) {
        item_image = obj['item_' + APRON.application_flip];
        //Canvas.design_name = obj['item_name'];
        //Canvas.item_price = obj['item_price'];
    }
    /*if(Canvas.item_price<=0){
        Canvas.item_price = $(".chooseproduct").find('option:selected').attr("cate_price");
    }

    Canvas.calculateInch();*/
    item_image_list = item_image.split(",");

    for (var i = 0; i < item_image_list.length; i++) {
        var url = item_image_list[i];
        url = url.replace(localURL, baseURL);
        var n = (i + 1);
        //console.log("URL : "+url);
        if (url) {
            Canvas.loadTypeImage(url, function (img, id, index, n) {
                //console.log(id+" : "+index+" : "+n);
                if (!APRON.item_list[id][index][n]) APRON.item_list[id][index][n] = new Object(); // ประกาศไว้เก็บสี
                APRON.item_list[id][index][n].img = img; // โหลดรูปเสร็จ แปะติดไปกับ thumbnail
                var color;
                if (APRON.item_list[id][index][n].color) {
                    color = APRON.item_list[id][index][n].color; // คื่นค่าสี หน้า หลัง ซ้าย ขวา ตามที่เลยเลือกไว้
                } else {
                    //color = Canvas.getRandomColor();
                    color = APRON.item_color_list[Math.floor(Math.random() * APRON.item_color_list.length)];
                }

                Canvas.setColor(img, color);
                ImageTool.bringAllToFront();
            }, id, index, n);
        }
    }
}
APRON.loadCurrent = function () {
    if (APRON.currentId && APRON.currentIndex) APRON.loadImageToCanvasWhenClick(APRON.currentId, APRON.currentIndex);
}
APRON.setActiveSubCateItem = function () {
    APRON.resetActiveSubCateItem();
    var id;
    var obj;


    $("#apron .pillsthumboverlay").each(function (index, element) {

        //console.log(index+" : "+APRON.currentIndex);
        //if(index == APRON.currentIndex){
        if (index == 0) {
            $(this).addClass("active");
            id = $(this).attr("id");

            obj = APRON.item_list[id][index];

            /*Canvas.design_name = obj['item_name'];;
            Canvas.item_price = obj['item_price'];
            if(Canvas.item_price<=0){
                Canvas.item_price = $(".chooseproduct").find('option:selected').attr("cate_price");
            }
            Canvas.calculateInch();*/

        }

        $(this).click(function (e) {
            APRON.resetActiveSubCateItem();
            APRON.currentItemIndex = index;

            $(this).addClass("active");
            id = $(this).attr("id");
            obj = APRON.item_list[id][index];
            Canvas.design_name = obj['item_name'];
            ;
            /*Canvas.item_price = obj['item_price'];
            if(Canvas.item_price<=0){
                Canvas.item_price = $(".chooseproduct").find('option:selected').attr("cate_price");
            }
            Canvas.calculateInch();*/
        });
    });
}

APRON.resetActiveSubCateItem = function () {
    $("#apron .pillsthumboverlay").each(function (index, element) {
        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
        }
    });
}

APRON.backItem = function () {
    var items = APRON.item_list[APRON.currentId].items;
    APRON.arrange(items, APRON.currentId);
    $(APRON.currentId + ' .colorcontent').remove();
    $(APRON.currentId + ' .default_backbtn').remove();
}
APRON.getData = function () {
    APRON.data.currentIndex = APRON.currentIndex;

    APRON.data.item_list = APRON.item_list;
    APRON.data.defaultColor = APRON.defaultColor;

    return APRON.data;
}

APRON.sliderConfig = {
    minSlides: 3,
    maxSlides: 4,
    slideWidth: 100,
    slideMargin: 10,
    pager: false,
    infiniteLoop: false,
    hideControlOnEnd: true
};
APRON.initSlider = function (id) {
    APRON.sliderArr[0] = $(id + ' .default_content').bxSlider(APRON.sliderConfig);
}

APRON.clear = function () {
    //APRON.defaultColor = "#FFFFFF";

    if (APRON.sliderArr[0]) {
        APRON.sliderArr[0].destroySlider();
    }
    $('#apron .default_content').empty();
    $('.colorcontent').remove();
    $('.default_backbtn').remove();
}