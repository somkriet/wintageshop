// codebee company limited
// http://www.codebee.co.th

var POLO = {};
POLO.application_flip = "front";
POLO.currentIndex = 0;
POLO.currentId = "#pattern";
POLO.defaultImage = new Object(); // เสื้อเปล่าสำหรับเปลี่ยนสี
POLO.defaultColor = Canvas.getRandomColor();
POLO.loaderURL = baseURL + "Apps/getPoloBySubCateID";
POLO.texturealpha = 0.18;
POLO.key = "polo";
POLO.data = {};
POLO.currentSlideIDArray = [];

POLO.default_pattern = baseURL + "assets/default/" + POLO.key + "/" + POLO.key + ".png";
POLO.item_tab_id = ["#pattern", "#collar", "#menshirt", "#sleeve", "#pocket"]; // หมวดหมู่ย่อยของเสื้อโปโล
POLO.item_list = {} // เก็บไอเทมทั้งหมดของเสื้อโปโล
POLO.item_color_list = new Array(); // เก็บสีของไอเทมนั้น ๆ 
POLO.grade_color = "";

POLO.sliderArr = [];

var patternNav = "Pattern Default";
var collarNav = "Collar Default";
var menshirtNav = "Placket Default";
var sleeveNav = "Sleeve Default";
var pocketNav = "Pocket Default";
var isInit = false;
var maxLoadItem = 0;
var currentMaxLoadItem = 0;
POLO.initialize = function () {
    POLO.currentId = null;
    POLO.currentIndex = null;
    maxLoadItem = 0;
    currentMaxLoadItem = 0;
    Canvas.calculateInch();
    if (Canvas.design_name != "") { //Canvas.design_name = patternNav+" / "+collarNav+" / "+menshirtNav+" / "+sleeveNav+" / "+pocketNav;
        Canvas.textStyle.html("<span class='blacktxt'>Your Design</span> : " + Canvas.design_name);
    } else {
        Canvas.textStyle.html("<span class='blacktxt'>Your Design</span> : " + patternNav + " / " + collarNav + " / " + menshirtNav + " / " + sleeveNav + " / " + pocketNav);
    }
    POLO.clear();
    POLO.application_flip = Canvas.application_flip
    for (var i = 0; i < POLO.item_tab_id.length; i++) {
        var id = POLO.item_tab_id[i];
        var index = (i + 1);
        $(id + ' .default_content').show();
        POLO.initSlider(id);
        Canvas.clearDefaultItems(id);
        if (!POLO.item_list[id]) POLO.item_list[id] = new Array();
        POLO.loadItemInTab(id, index);
    }
    if (Canvas.polodata && !isInit) {
        isInit = true;
        POLO.sortLoadData();
    }
    POLO.defaultTemplate();
    POLO.loadCurrent();

}
POLO.sortLoadData = function () {
    var json = JSON.parse(Canvas.polodata);
    if (Object.keys(json.item_list).length > 0) {
        POLO.item_list = json.item_list;

    }
    POLO.defaultColor = json.defaultColor;

    POLO.currentPatternId = json.currentPatternId;
    POLO.currentCollarId = json.currentCollarId;
    POLO.currentMenshirtId = json.currentMenshirtId;
    POLO.currentSleeveId = json.currentSleeveId;
    POLO.currentPocketId = json.currentPocketId;

    POLO.curtentPatternIndex = json.curtentPatternIndex;
    POLO.curtentCollarIndex = json.curtentCollarIndex;
    POLO.curtentMenshirtIndex = json.curtentMenshirtIndex;
    POLO.curtentSleeveIndex = json.curtentSleeveIndex;
    POLO.curtentPocketIndex = json.curtentPocketIndex;
}
POLO.flip = function (action) {
    Canvas.application_flip = POLO.application_flip = action;

    POLO.defaultTemplate();

    if (POLO.currentPatternId && POLO.curtentPatternIndex) {
        POLO.loadImageToCanvasWhenClick(POLO.currentPatternId, POLO.curtentPatternIndex);
    }
    if (POLO.currentCollarId && POLO.curtentCollarIndex) {
        POLO.loadImageToCanvasWhenClick(POLO.currentCollarId, POLO.curtentCollarIndex);
    }
    if (POLO.currentMenshirtId && POLO.curtentMenshirtIndex) {
        POLO.loadImageToCanvasWhenClick(POLO.currentMenshirtId, POLO.curtentMenshirtIndex);
    }
    if (POLO.currentSleeveId && POLO.curtentSleeveIndex) {
        POLO.loadImageToCanvasWhenClick(POLO.currentSleeveId, POLO.curtentSleeveIndex);
    }
    if (POLO.currentPocketId && POLO.curtentPocketIndex) {
        POLO.loadImageToCanvasWhenClick(POLO.currentPocketId, POLO.curtentPocketIndex);
    }

}


POLO.defaultTemplate = function () {

    Canvas.resetDefaultImage();
    var loadURL = "assets/default/" + POLO.key + "/" + POLO.key + "_" + POLO.application_flip + "_1.png";
    //console.log(loadURL.indexOf(loadURL));
    Canvas.loadBringToBack(loadURL, function (img) {
        POLO.defaultImage = img; // เสื้อโปโลเปล่า
        if (POLO.defaultColor && POLO.defaultImage) {
            Canvas.setColor(POLO.defaultImage, POLO.defaultColor);
        }
        ImageTool.bringAllToFront();

        //$.unblockUI();
    }, 1);
    Canvas.loadBringToFront("assets/default/" + POLO.key + "/" + POLO.key + "_" + POLO.application_flip + "_2.png", function (img) {

        if (Canvas.design_name != "") {
            Canvas.textStyle.html("<span class='blacktxt'>Your Design</span> : " + Canvas.design_name);
        }

        if (!Canvas.isSaving) {
            $.unblockUI();
        }

    }, POLO.texturealpha);
    if (POLO.application_flip == "front") Canvas.loadBringToFront("assets/default/" + POLO.key + "/" + POLO.key + "_" + POLO.application_flip + "_3.png", function (img) {
    }, 1); // โหลดกระดุม


}

POLO.loadItemInTab = function (id, index) {
    var url = POLO.loaderURL;
    var data = {subcate_id: index}
    $.ajax({
        url: url,
        type: 'POST',
        data: data,
        dataType: 'json',
        success: function (items) {
            //console.log(JSON.stringify(obj));
            POLO.arrange(items, id);
        }
    });
}

POLO.arrange = function (items, id) {

    var index = 0;
    if (!POLO.currentIndex) {
        active = "active";
    } else {
        active = "";
    }
    POLO.item_list[id].items = items;
    $(id + " .default_content").empty();
    $(id + " .default_content").append('<div class="col-md-3 imagethumb">' +
        '<a onClick="POLO.expandItem(\'' + id + '\');"><img data-original="' + POLO.default_pattern + '" class="lazy img-thumbnail pillsthumb ' + active + '" /></a><div class="labeltxt description">Default</div></div>');

    for (var key in items) {
        var obj = items[key];
        for (var prop in obj) {
            //console.log(prop + " = " + obj[prop]);
            var item_thumbnail = obj['item_thumbnail'];
            var item_color = obj['item_color'];
            var item_name = obj['item_name'];
        }
        item_thumbnail = item_thumbnail.replace(localURL, baseURL);
        $(id + " .default_content").append('<div class="col-md-3 imagethumb">' +
            '<a onClick="POLO.expandItem(\'' + id + '\',\'' + index + '\');"><img data-original="' + item_thumbnail + '" class="lazy img-thumbnail pillsthumb" /></a><div class="labeltxt description">' + item_name + '</div></div>');

        if (!POLO.item_list[id][index]) POLO.item_list[id][index] = obj;
        index++;
    }

    if (POLO.currentIndex) {
        $(POLO.currentId + " .default_content .pillsthumb").eq(parseInt(POLO.currentIndex) + 1).addClass("active");
    }

    var slide_id = POLO.currentSlideIDArray[id];

    if (slide_id) {
        //POLO.sliderArr[POLO.currentId].goToSlide(POLO.currentSlideIDArray[POLO.currentId]);
        POLO.sliderArr[id].reloadSlider({
            startSlide: slide_id,
            pager: false,
            auto: false,
            minSlides: 2,
            maxSlides: 2,
            slideWidth: 100,
            slideMargin: 10,
            pager: false,
            infiniteLoop: false,
            hideControlOnEnd: true,
            onSliderLoad: function () {
                var index = 0;
                $(POLO.getCurrentID() + " .imagethumb img.lazy").each(function (index, element) {
                    if (index <= POLO.sliderArr[id].getCurrentSlide() * 10) {
                        var dataoriginal = $(this).attr("data-original");
                        $(this).attr("src", dataoriginal);
                    }
                    index++;
                });
            },
            onSlideAfter: function ($slideElement, oldIndex, newIndex) {
                $(POLO.getCurrentID() + " .imagethumb img.lazy").each(function (index, element) {
                    if (index <= (newIndex * 10)) {
                        var dataoriginal = $(this).attr("data-original");
                        $(this).attr("src", dataoriginal);
                    }
                });
            }
        });
        $("img.lazy").lazyload();
    } else {
        POLO.sliderArr[id].reloadSlider(POLO.sliderConfig);

        /*var index = 0;
        $(POLO.getCurrentID()+" .imagethumb img.lazy").each(function(index, element) {
            if(index <= 10){
                var dataoriginal = $(this).attr("data-original");
                $(this).attr("src",dataoriginal);
            }
            index++;
        });*/

        $("img.lazy").lazyload();
    }
}

POLO.expandItem = function (id, index) {

    $(id + ' .colorcontent').remove();

    if (!index) {


        Canvas.clearDefaultItems(id);
        POLO.currentId = null;
        POLO.currentIndex = null;

        if (id == "#pattern") {
            POLO.currentSlideIDArray.length = 0;
            Canvas.item_price = 0;
            Canvas.cate_price = $(".chooseproduct").find('option:selected').attr("cate_price");
            POLO.currentPatternId = null;
            POLO.curtentPatternIndex = null;
            patternNav = "Pattern Default";
        } else if (id == "#collar") {
            POLO.currentCollarId = null;
            POLO.curtentCollarIndex = null;
            collarNav = "Collar Default";
        } else if (id == "#menshirt") {
            POLO.currentMenshirtId = null;
            POLO.curtentMenshirtIndex = null;
            menshirtNav = "Placket Default";
        } else if (id == "#sleeve") {
            POLO.currentSleeveId = null;
            POLO.curtentSleeveIndex = null;
            sleeveNav = "Sleeve Default";
        } else if (id == "#pocket") {
            Canvas.polo_additional_price = 0;
            POLO.currentPocketId = null;
            POLO.curtentPocketIndex = null;
            pocketNav = "Pocket Default";
        }
        Canvas.calculateInch();
        Canvas.design_name = patternNav + " / " + collarNav + " / " + menshirtNav + " / " + sleeveNav + " / " + pocketNav;
        Canvas.textStyle.html("<span class='blacktxt'>Your Design</span> : " + patternNav + " / " + collarNav + " / " + menshirtNav + " / " + sleeveNav + " / " + pocketNav);

        $(id).append('<div class="colorcontent">' +
            '<ul class="col-md-12">' + POLO.getColorUI() + '</ul>' +
            '</div>');
        return;
    } else {

        if (id == "#pattern") {
            POLO.currentPatternId = id;
            POLO.curtentPatternIndex = index;
            var num = parseInt(index) + parseInt(2);
            patternNav = POLO.getNameUpper(POLO.currentPatternId) + " " + num;
        } else if (id == "#collar") {
            POLO.currentCollarId = id;
            POLO.curtentCollarIndex = index;
            var num = parseInt(index) + parseInt(2);
            collarNav = POLO.getNameUpper(POLO.currentCollarId) + " " + num;
        } else if (id == "#menshirt") {
            POLO.currentMenshirtId = id;
            POLO.curtentMenshirtIndex = index;
            var num = parseInt(index) + parseInt(2);
            menshirtNav = POLO.getNameUpper(POLO.currentMenshirtId) + " " + num;
        } else if (id == "#sleeve") {
            POLO.currentSleeveId = id;
            POLO.curtentSleeveIndex = index;
            var num = parseInt(index) + parseInt(2);
            sleeveNav = POLO.getNameUpper(POLO.currentSleeveId) + " " + num;
        } else if (id == "#pocket") {
            POLO.currentPocketId = id;
            POLO.curtentPocketIndex = index;
            var num = parseInt(index) + parseInt(2);
            pocketNav = POLO.getNameUpper(POLO.currentPocketId) + " " + num;
        }
    }


    POLO.currentItemIndex = 0;
    POLO.currentId = id;
    POLO.currentIndex = index;

    name = POLO.getNameUpper(POLO.currentId);
    Canvas.design_name = patternNav + " / " + collarNav + " / " + menshirtNav + " / " + sleeveNav + " / " + pocketNav;
    Canvas.textStyle.html("<span class='blacktxt'>Your Design</span> : " + patternNav + " / " + collarNav + " / " + menshirtNav + " / " + sleeveNav + " / " + pocketNav);


    var obj = POLO.item_list[id][index];

    for (var prop in obj) {
        var item_color = obj['item_color'];
        var item_front = obj['item_front'];
        var item_name = obj['item_name'];
        if (id == "#pattern") {
            Canvas.item_price = obj['item_price'];
        } else if (id == "#pocket") {
            Canvas.polo_additional_price = obj['item_price'];
        }

    }
    item_front_list = item_front.split(",");
    item_front_list.sort();
    //POLO.item_color_list = item_color.split(",");


    $(id + " .default_content").empty();
    var n = 0;
    if (!POLO.item_list[id][index][n]) POLO.item_list[id][index][n] = new Object(); // ประกาศไว้เก็บสี
    $(id).prepend('<a onClick="POLO.backItem();" class="btn pinkbtn backapplication default_backbtn" style="display:none;"><i class="glyphicon glyphicon-arrow-left"></i> Back To All ' + name + '</a>');
    $(id + " .default_content").append('<div class="col-md-3 imagethumb">' +
        '<a><img data-original="' + POLO.default_pattern + '" class="lazy img-thumbnail pillsthumb">' +
        '<img index="' + (n) + '" src="' + POLO.default_pattern + '" class="pillsthumboverlay" /></a><div class="labeltxt description">Base Color</div></div>');
    n++;

    for (var i = 0; i < item_front_list.length; i++) {

        var item_thumbnail = item_front_list[i];
        if (item_thumbnail != "") {
            item_thumbnail = item_thumbnail.replace(localURL, baseURL);
            if (!POLO.item_list[id][index][n]) POLO.item_list[id][index][n] = new Object(); // ประกาศไว้เก็บสี
            $(id + " .default_content").append('<div class="col-md-3 imagethumb">' +
                '<a><img data-original="' + POLO.default_pattern + '" class="lazy img-thumbnail pillsthumb" />' +
                '<img index="' + (n) + '" src="' + item_thumbnail + '" class="pillsthumboverlay" /></a><div class="labeltxt description">' + item_name + ' ' + (n) + '</div></div>');
            n++;
        }
    }


    /*$(id).append('<div class="col-md-3 col-xs-12 paddingnone default_backbtn">'+
                                        '<a onClick="POLO.backItem();" class="btn btn-lg btn-block pinkbtn">BACK</a>'+
                                    '</div>');*/
    $(id).append('<div class="colorcontent">' +
        '<ul class="col-md-12">' + POLO.getColorUI() + '</ul>' +
        '</div>');


    Canvas.calculateSubTotal();
    POLO.loadImageToCanvasWhenClick(id, index);
    POLO.setActiveSubCateItem();

    POLO.currentSlideIDArray[id] = (POLO.sliderArr[id].getCurrentSlide());
    if (POLO.sliderArr[id]) {
        POLO.sliderArr[id].reloadSlider(POLO.sliderConfig);
        $("img.lazy").lazyload();
    }
    /*console.log(POLO.currentId);
    if(POLO.currentId == "#pocket"){
        Canvas.loadBringToFront("assets/default/polo/pocket_front_2.png",function(img){},1); // โหลดกระเป๋า
    }*/
}
POLO.initColor = function () {
    //console.log("initColor");
    //console.log(POLO.grade_color);
    if (POLO.grade_color) {
        POLO.item_color_list = POLO.grade_color.split(",");
        for (var i = 0; i < POLO.item_color_list.length; i++) {
            POLO.item_color_list[i] = POLO.item_color_list[i].trim();
        }
        /*$('.color_container').empty();
        $('.color_container').append('<div class="colorcontent">'+
                                                '<ul class="col-md-12">'+POLO.getColorUI()+'</ul>'+
                                            '</div>');*/
        if (!isInit) {
            POLO.defaultColor = POLO.item_color_list[0];
            //Canvas.setColor(POLO.defaultImage,POLO.defaultColor);
        }
        //var firstRandomElement = POLO.item_color_list[Math.floor(Math.random()*POLO.item_color_list.length)];

    }

}

POLO.getColorUI = function () {
    var color = "";
    var active = "";
    for (var i = 0; i < POLO.item_color_list.length; i++) {
        active = "";
        if (i == 0) {
            active = "active";
        }
        color += '<li><a id="color' + i + '" class="' + active + '" onClick="POLO.setColor(\'' + POLO.item_color_list[i] + '\',\'' + i + '\');" style="background:' + POLO.item_color_list[i] + '"></a></li>';
        // console.log(color);
    }
    return color;
}
POLO.setColor = function (color, i) {

    $(".colorcontent").find('a').each(function () {
        $(this).removeClass("active");
    });
    $("#color" + i).addClass("active");
    if (POLO.currentId == null && POLO.currentIndex == null) {
        POLO.defaultColor = color;
        Canvas.setColor(POLO.defaultImage, color);
        return;
    }
    POLO.currentId = POLO.getCurrentID();
    POLO.currentIndex = POLO.getCurrentIndex(POLO.currentId);
    console.log("curtentPocketIndex : " + POLO.curtentPocketIndex);
    $(POLO.currentId + " .pillsthumboverlay").each(function (index, element) {
        if ($(this).hasClass("active")) {
            console.log(POLO.currentId + " : " + POLO.currentIndex + " : " + index);
            if (!POLO.item_list[POLO.currentId][POLO.currentIndex][index]) POLO.item_list[POLO.currentId][POLO.currentIndex][index] = new Object();
            POLO.item_list[POLO.currentId][POLO.currentIndex][index].color = color; // save สีไปที่รูปนั้น ๆ
            var img = POLO.item_list[POLO.currentId][POLO.currentIndex][index].img; // รูปที่เลือก
            if (index == 0) {
                //POLO.item_list[POLO.currentId][POLO.currentIndex][index].color = color;
                POLO.defaultColor = color;
                img = POLO.defaultImage;
            }
            Canvas.setColor(img, color);
        }
    });

}
POLO.setActiveSubCateItem = function () {
    POLO.resetActiveSubCateItem();

    for (var i = 0; i < POLO.item_tab_id.length; i++) {
        var id = POLO.item_tab_id[i];
        var isActive = false;
        $(id + " .pillsthumboverlay").each(function (index, element) {
            if ($(this).hasClass("active")) {
                isActive = true;
            }
        });
        $(id + " .pillsthumboverlay").each(function (index, element) {
            if (index == 1 && !isActive) {
                $(this).addClass("active");
            }
            $(this).click(function (e) {

                POLO.resetActiveSubCateItem();
                POLO.currentItemIndex = index;
                $(this).addClass("active");

            });
        });
    }
}
POLO.loadImageToCanvasWhenClick = function (id, index) {
    POLO.currentId = id;
    Canvas.clearDefaultItems(id);
    var obj = POLO.item_list[id][index];
    var item_image;

    for (var prop in obj) {
        item_image = obj['item_' + POLO.application_flip];
        //["#pattern","#collar","#menshirt","#sleeve","#pocket"]
        //console.log('item_price : '+obj['item_price']);
        //console.log('Canvas.cate_price : '+Canvas.cate_price);
        /*if(POLO.currentId == "#pattern"){
            //console.log(obj['item_price']);
            Canvas.item_price = obj['item_price'];
            //Canvas.design_name = obj['item_name'];
        }else if(POLO.currentId == "#collar"){
            Canvas.item_price += obj['item_price'];
        }else if(POLO.currentId == "#menshirt"){
            Canvas.item_price += obj['item_price'];
        }else if(POLO.currentId == "#sleeve"){
            Canvas.item_price += obj['item_price'];
        }else if(POLO.currentId == "#pocket"){
            Canvas.polo_additional_price = obj['item_price'];
        }*/

        if (POLO.currentId == "#pattern") {
            //console.log(obj['item_price']);
            Canvas.item_price = obj['item_price'];
            //Canvas.design_name = obj['item_name'];
        } else if (POLO.currentId == "#collar") {
            Canvas.collar = obj['item_price'];
        } else if (POLO.currentId == "#sleeve") {
            Canvas.sleeve = obj['item_price'];
        } else if (POLO.currentId == "#menshirt") {
            Canvas.menshirt = obj['item_price'];
        } else if (POLO.currentId == "#pocket") {
            Canvas.polo_additional_price = obj['item_price'];
        }

    }
    //Canvas.calculateInch();
    item_image_list = item_image.split(",");
    item_image_list.sort();
    //console.log(POLO.item_list[POLO.currentPatternId][POLO.curtentPatternIndex][1].color);
    //if(!POLO.item_list[POLO.currentPatternId][POLO.curtentPatternIndex][n])POLO.item_list[id][index][n] = new Object();
    //console.log(POLO.currentPatternId+" : "+POLO.curtentPatternIndex);
    POLO.loadImageAndArrangInContainer(item_image_list, index, id, 0);


}
POLO.loadImageAndArrangInContainer = function (item_image_list, index, id, num) {
    var i = num;
    var url = item_image_list[i];

    var n = (i + 1);
    if (url) {
        url = url.replace(localURL, baseURL);
        Canvas.loadTypeImage(url, function (img, id, index, n) {
            var color;
            if (!POLO.item_list[id][index][n]) POLO.item_list[id][index][n] = new Object();
            POLO.item_list[id][index][n].img = img; // โหลดรูปเสร็จ แปะติดไปกับ thumbnail
            if (!POLO.item_list[id][index][n].color) {
                //POLO.item_list[id][index][n].color = Canvas.getRandomColor();
                POLO.item_list[id][index][n].color = POLO.item_color_list[Math.floor(Math.random() * POLO.item_color_list.length)];

            }
            color = POLO.item_list[id][index][n].color; // คื่นค่าสี หน้า หลัง ซ้าย ขวา ตามที่เลยเลือกไว้
            Canvas.setColor(img, color);

            if (i < item_image_list.length) {
                i++;
                POLO.loadImageAndArrangInContainer(item_image_list, index, id, i);
                ImageTool.bringAllToFront();
                $(".default_backbtn").css("display", "block");

            }
            Canvas.calculateInch();


        }, id, index, n);
    }
}
POLO.resetActiveSubCateItem = function () {
    //for(var i=0;i<POLO.item_tab_id.length;i++){
    //var id = POLO.item_tab_id[i];
    var id = POLO.getCurrentID();
    $(id + " .pillsthumboverlay").each(function (index, element) {
        //console.log("pillsthumboverlay active : "+$(this).hasClass("active"));
        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
        }
    });
    //}
}

POLO.getCurrentID = function () {
    //var id = $(".toolpill").attr("href");
    var currentID = "";
    $(".toolpill1").each(function (index, element) {
        if ($(this).hasClass("active")) {
            currentID = ($(this).find("a").attr("href"));
        }
    });

    return currentID;
}
POLO.getCurrentIndex = function (id) {
    var index;
    if (id == "#pattern") {
        index = POLO.curtentPatternIndex;
    } else if (id == "#collar") {
        index = POLO.curtentCollarIndex;
    } else if (id == "#menshirt") {
        index = POLO.curtentMenshirtIndex;
    } else if (id == "#sleeve") {
        index = POLO.curtentSleeveIndex;
    } else if (id == "#pocket") {
        index = POLO.curtentPocketIndex;
    }

    return index;
}
POLO.backItem = function () {
    POLO.currentId = POLO.getCurrentID();

    var items = POLO.item_list[POLO.currentId].items;
    POLO.arrange(items, POLO.currentId);


    $(POLO.currentId + ' .colorcontent').remove();
    $(POLO.currentId + ' .default_backbtn').remove();
}
POLO.loadCurrent = function () {

    if (POLO.currentPatternId && POLO.curtentPatternIndex) {

        POLO.loadImageToCanvasWhenClick(POLO.currentPatternId, POLO.curtentPatternIndex);
    }
    if (POLO.currentCollarId && POLO.curtentCollarIndex) {

        POLO.loadImageToCanvasWhenClick(POLO.currentCollarId, POLO.curtentCollarIndex);
    }
    if (POLO.currentMenshirtId && POLO.curtentMenshirtIndex) {

        POLO.loadImageToCanvasWhenClick(POLO.currentMenshirtId, POLO.curtentMenshirtIndex);
    }
    if (POLO.currentSleeveId && POLO.curtentSleeveIndex) {

        POLO.loadImageToCanvasWhenClick(POLO.currentSleeveId, POLO.curtentSleeveIndex);
    }
    if (POLO.currentPocketId && POLO.curtentPocketIndex) {

        POLO.loadImageToCanvasWhenClick(POLO.currentPocketId, POLO.curtentPocketIndex);
    }

}

POLO.getData = function () {
    POLO.data.currentPatternId = POLO.currentPatternId;
    POLO.data.currentCollarId = POLO.currentCollarId;
    POLO.data.currentMenshirtId = POLO.currentMenshirtId;
    POLO.data.currentSleeveId = POLO.currentSleeveId;
    POLO.data.currentPocketId = POLO.currentPocketId;

    POLO.data.curtentPatternIndex = POLO.curtentPatternIndex;
    POLO.data.curtentCollarIndex = POLO.curtentCollarIndex;
    POLO.data.curtentMenshirtIndex = POLO.curtentMenshirtIndex;
    POLO.data.curtentSleeveIndex = POLO.curtentSleeveIndex;
    POLO.data.curtentPocketIndex = POLO.curtentPocketIndex;

    POLO.data.item_list = POLO.item_list;
    POLO.data.defaultColor = POLO.defaultColor;

    return POLO.data;
}


POLO.sliderConfig = {
    minSlides: 2,
    maxSlides: 2,
    slideWidth: 100,
    slideMargin: 10,
    pager: false,
    infiniteLoop: false,
    hideControlOnEnd: true,
    onSliderLoad: function () {
        var index = 0;
        $(POLO.getCurrentID() + " .imagethumb img.lazy").each(function (index, element) {
            if (index <= 10) {
                var dataoriginal = $(this).attr("data-original");
                $(this).attr("src", dataoriginal);
            }
            index++;
        });
    },
    onSlideAfter: function ($slideElement, oldIndex, newIndex) {


        $(POLO.getCurrentID() + " .imagethumb img.lazy").each(function (index, element) {
            if (index <= (newIndex * 10)) {
                var dataoriginal = $(this).attr("data-original");
                $(this).attr("src", dataoriginal);
            }
        });

        /*var $load = $lazy.attr("data-original");
        console.log($load);
        $lazy.attr("src",$load).load(function(){
            $lazy.removeClass("lazy");
        });*/
    }
};
POLO.initSlider = function (id) {
    POLO.sliderArr[id] = $(id + ' .default_content').bxSlider(POLO.sliderConfig);

}

POLO.clear = function () {
    //POLO.defaultColor = "#FFFFFF";

    for (var i = 0; i < POLO.item_tab_id.length; i++) {
        var id = POLO.item_tab_id[i];
        if (POLO.sliderArr[id]) {
            POLO.sliderArr[id].destroySlider();
        }
        $(id + ' .default_content').empty();
        $(id + ' .default_content').hide();
    }
    $('.colorcontent').remove();
    $('.default_backbtn').remove();
}
$('#tool a[data-toggle="pill"]').on('shown.bs.tab', function (e) {
    var target = $(e.target).attr("href") // activated tab

    if (POLO.sliderArr[target]) {
        var slide_id = POLO.currentSlideIDArray[target];
        if (slide_id) {
            //POLO.sliderArr[POLO.currentId].goToSlide(POLO.currentSlideIDArray[POLO.currentId]);
            POLO.sliderArr[target].reloadSlider({
                startSlide: slide_id,
                pager: false,
                auto: false,
                minSlides: 2,
                maxSlides: 2,
                slideWidth: 100,
                slideMargin: 10,
                pager: false,
                infiniteLoop: false,
                hideControlOnEnd: true,
                onSliderLoad: function () {
                    var index = 0;
                    $(POLO.getCurrentID() + " .imagethumb img.lazy").each(function (index, element) {
                        if (index <= 10) {
                            var dataoriginal = $(this).attr("data-original");
                            $(this).attr("src", dataoriginal);
                        }
                        index++;
                    });
                },
                onSlideAfter: function ($slideElement, oldIndex, newIndex) {
                    $(POLO.getCurrentID() + " .imagethumb img.lazy").each(function (index, element) {
                        if (index <= (newIndex * 10)) {
                            var dataoriginal = $(this).attr("data-original");
                            $(this).attr("src", dataoriginal);
                        }
                    });
                }
            });
            $("img.lazy").lazyload();
        } else {
            POLO.sliderArr[target].reloadSlider(POLO.sliderConfig);
            $("img.lazy").lazyload();
        }
    }
});

POLO.getNameUpper = function (id) {
    var item_name = id.split("#")[1];
    if (item_name == "menshirt") {
        item_name = "Placket";
    }
    return item_name.charAt(0).toUpperCase() + item_name.slice(1);
}