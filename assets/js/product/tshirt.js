// codebee company limited
// http://www.codebee.co.th

var TSHIRT = {};
TSHIRT.application_flip = "front";
TSHIRT.currentIndex = 0;
TSHIRT.currentId = "#tshirt";
TSHIRT.defaultImage = new Object(); // เสื้อเปล่าสำหรับเปลี่ยนสี
TSHIRT.defaultColor = Canvas.getRandomColor();
TSHIRT.loaderURL = baseURL + "Apps/getTshirt";
TSHIRT.texturealpha = 0.20;
TSHIRT.key = "tshirt";
TSHIRT.type = ["Round-Neck", "V-Neck"];
TSHIRT.data = {};

TSHIRT.sliderArr = [];

TSHIRT.default_pattern = baseURL + "assets/default/" + TSHIRT.key + "/" + TSHIRT.key + ".png";
TSHIRT.item_tab_id = ["#tshirt"]; // หมวดหมู่ย่อยของเสื้อยืด
TSHIRT.item_list = {} // เก็บไอเทมทั้งหมดของเสื้อยืด
TSHIRT.item_color_list = new Array(); // เก็บสีของไอเทมนั้น ๆ 
TSHIRT.grade_color = "";
var isInit = false;

TSHIRT.initialize = function () {


    TSHIRT.clear();
    TSHIRT.application_flip = Canvas.application_flip;
    Canvas.design_name = TSHIRT.type[0];
    //Canvas.design_name = TSHIRT.type[index];
    Canvas.textStyle.html("<span class='blacktxt'>Your Design</span> : " + TSHIRT.type[0]);
    for (var i = 0; i < TSHIRT.item_tab_id.length; i++) {
        var id = TSHIRT.item_tab_id[i];
        var index = (i + 1);
        TSHIRT.initSlider(id);
        Canvas.clearDefaultItems(id);
        TSHIRT.item_list[id] = new Array();
        TSHIRT.loadItemInTab(id, index);
    }

    if (Canvas.tshirtdata && !isInit) {
        isInit = true;
        TSHIRT.sortLoadData();
    }
    TSHIRT.defaultTemplate();
}

TSHIRT.sortLoadData = function () {
    var json = JSON.parse(Canvas.tshirtdata);
    if (Object.keys(json.item_list).length > 0) {
        TSHIRT.item_list = json.item_list;
    }
    TSHIRT.currentIndex = json.currentIndex;
    TSHIRT.defaultColor = json.defaultColor;
}

TSHIRT.flip = function (application_flip) {
    Canvas.application_flip = TSHIRT.application_flip = application_flip;
    TSHIRT.defaultTemplate();

}


TSHIRT.defaultTemplate = function () {
    Canvas.resetDefaultImage();
    Canvas.loadBringToBack("assets/default/" + TSHIRT.key + "/" + TSHIRT.type[TSHIRT.currentIndex] + "/" + TSHIRT.key + "_" + TSHIRT.application_flip + "_1.png", function (img) {
        TSHIRT.defaultImage = img; // เสื้อยืดเปล่า
        //console.log(TSHIRT.defaultColor);
        //if(TSHIRT.defaultColor){
        //$.unblockUI();
        if (!Canvas.isSaving) {
            $.unblockUI();
        }
        if (Canvas.design_name != "") {
            Canvas.textStyle.html("<span class='blacktxt'>Your Design</span> : " + Canvas.design_name);
        }
        Canvas.setColor(TSHIRT.defaultImage, TSHIRT.defaultColor);


        //}
    }, 1);
    Canvas.loadBringToFront("assets/default/" + TSHIRT.key + "/" + TSHIRT.type[TSHIRT.currentIndex] + "/" + TSHIRT.key + "_" + TSHIRT.application_flip + "_2.png", function (img) {
    }, TSHIRT.texturealpha);
    if (TSHIRT.application_flip == "front") Canvas.loadBringToFront("assets/default/" + TSHIRT.key + "/" + TSHIRT.type[TSHIRT.currentIndex] + "/" + TSHIRT.key + "_" + TSHIRT.application_flip + "_3.png", function (img) {
    }, 1); // โหลดป้ายคอ

}

TSHIRT.loadItemInTab = function (id, index) {
    var url = TSHIRT.loaderURL;
    var data = {subcate_id: index}
    $.ajax({
        url: url,
        type: 'POST',
        data: data,
        dataType: 'json',
        success: function (items) {
            //console.log(JSON.stringify(obj));
            TSHIRT.arrange(items, id);
        }
    });
}

TSHIRT.arrange = function (items, id) {
    var index = 0;
    TSHIRT.item_list[id].items = items;
    $(id + " .default_content").empty();

    for (var key in items) {
        var obj = items[key];
        for (var prop in obj) {
            var item_thumbnail = obj['item_thumbnail'];
            var item_color = obj['item_color'];
        }
        //TSHIRT.item_color_list = item_color.split(",");
        //TSHIRT.item_color_list = TSHIRT.grade_color.split(",");
        TSHIRT.item_list[id][index] = obj;

        item_thumbnail = item_thumbnail.replace(localURL, baseURL);

        $(id + " .default_content").append('<div class="col-md-3 imagethumb">' +
            '<a><img src="' + item_thumbnail + '" class="img-thumbnail pillsthumb" />' +
            '<img id="' + id + '" index="' + (index) + '" src="' + item_thumbnail + '" class="pillsthumboverlay" /></a><div class="labeltxt description">' + TSHIRT.type[index] + '</div></div>');
        index++;
    }

    /*$(id).append('<div class="colorcontent">'+
                                        '<ul class="col-md-12">'+
                                            '<p>Select Color : </p>'+TSHIRT.getColorUI()+'</ul>'+
                                    '</div>');*/
    TSHIRT.sliderArr[0].reloadSlider(TSHIRT.sliderConfig);
    TSHIRT.setActiveSubCateItem();
}


TSHIRT.initColor = function () {
    if (TSHIRT.grade_color) {
        TSHIRT.item_color_list = TSHIRT.grade_color.split(",");
        $('.color_container').empty();
        $('.color_container').append('<div class="colorcontent">' +
            '<ul class="col-md-12">' + TSHIRT.getColorUI() + '</ul>' +
            '</div>');
        if (!isInit) {
            TSHIRT.defaultColor = TSHIRT.item_color_list[0];
            //Canvas.setColor(TSHIRT.defaultImage,TSHIRT.defaultColor);
        }
    }
}


TSHIRT.getColorUI = function () {
    var color = "";
    var active = "";
    for (var i = 0; i < TSHIRT.item_color_list.length; i++) {
        active = "";
        if (i == 0) {
            active = "active";
        }
        color += '<li><a id="color' + i + '" class="' + active + '" onClick="TSHIRT.setColor(\'' + TSHIRT.item_color_list[i] + '\',\'' + i + '\');" style="background:' + TSHIRT.item_color_list[i] + '"></a></li>';
    }
    return color;
}
TSHIRT.setColor = function (color, i) {
    $(".colorcontent").find('a').each(function () {
        $(this).removeClass("active");
    });
    $("#color" + i).addClass("active");
    $("#tshirt .pillsthumboverlay").each(function (index, element) {
        if ($(this).hasClass("active")) {
            TSHIRT.defaultColor = color;
            img = TSHIRT.defaultImage;
            console.log(img + " : " + color);
            Canvas.setColor(img, color);
        }
    });


}
TSHIRT.setActiveSubCateItem = function () {
    TSHIRT.resetActiveSubCateItem();
    var id;
    var obj;
    $("#tshirt .pillsthumboverlay").each(function (index, element) {
        if (index == TSHIRT.currentIndex) {
            $(this).addClass("active");
            id = $(this).attr("id");

            obj = TSHIRT.item_list[id][index];
            //Canvas.design_name = obj['item_name'];
            Canvas.item_price = obj['item_price'];

            if (Canvas.item_price <= 0) {
                Canvas.item_price = $(".chooseproduct").find('option:selected').attr("cate_price");
            }
            Canvas.calculateInch();
        }

        $(this).click(function (e) {
            id = $(this).attr("id");
            Canvas.design_name = TSHIRT.type[index];
            Canvas.textStyle.html("<span class='blacktxt'>Your Design</span> : " + TSHIRT.type[index]);
            TSHIRT.resetActiveSubCateItem();
            $(this).addClass("active");
            TSHIRT.currentIndex = index;
            TSHIRT.defaultTemplate();

            obj = TSHIRT.item_list[id][index];
            //Canvas.design_name = obj['item_name'];
            Canvas.item_price = obj['item_price'];

            if (Canvas.item_price <= 0) {
                Canvas.item_price = $(".chooseproduct").find('option:selected').attr("cate_price");
            }
            Canvas.calculateInch();
        });
    });
}

TSHIRT.resetActiveSubCateItem = function () {
    $("#tshirt .pillsthumboverlay").each(function (index, element) {
        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
        }
    });
}

TSHIRT.getData = function () {
    TSHIRT.data.currentIndex = TSHIRT.currentIndex;

    TSHIRT.data.item_list = TSHIRT.item_list;
    TSHIRT.data.defaultColor = TSHIRT.defaultColor;

    return TSHIRT.data;
}
TSHIRT.sliderConfig = {
    minSlides: 3,
    maxSlides: 4,
    slideWidth: 100,
    slideMargin: 10,
    pager: false,
    infiniteLoop: false,
    hideControlOnEnd: true
};
TSHIRT.initSlider = function (id) {
    TSHIRT.sliderArr[0] = $(id + ' .default_content').bxSlider(TSHIRT.sliderConfig);
}
TSHIRT.clear = function () {
    //TSHIRT.defaultColor = "#FFFFFF";

    $('#tshirt .default_content').empty();
    $('.colorcontent').remove();
    $('.default_backbtn').remove();
    if (TSHIRT.sliderArr[0]) {
        TSHIRT.sliderArr[0].destroySlider();
    }
}

TSHIRT.getNameUpper = function (id) {
    var item_name = id.split("#")[1];
    if (item_name == "menshirt") {
        item_name = "Placket";
    }
    return item_name.charAt(0).toUpperCase() + item_name.slice(1);
}