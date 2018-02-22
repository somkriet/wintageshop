// codebee company limited
// http://www.codebee.co.th
var application_action = "polo";


// เปลี่ยน product
$(".chooseproduct").change(function (e) {
    var cate_price = $(this).find('option:selected').attr("cate_price");
    Canvas.item_price = 0;
    Canvas.cate_price = cate_price;

    Canvas.forEachObject(function (obj) {
        if (obj.typetool == "added_item") {
            Canvas.remove(obj);
        }
    });

    var product_id = parseInt($(this).val());
    changeProduct(product_id);
    loadGradeByProductID(product_id);

});

$(".choosefabaic").change(function (e) {
    //POLO.grade_color = TSHIRT.grade_color = APRON.grade_color = BAG.grade_color = $(".choosefabaic").find('option:selected').attr("grade_color");

    Canvas.current_grade_id = false;
    Canvas.min_quantity = $(".choosefabaic").find('option:selected').attr("min_quantity");
    Canvas.grade_price = $(".choosefabaic").find('option:selected').attr("grade_price");
    if (!Canvas.grade_price) {
        Canvas.grade_price = 0;
    }
    POLO.grade_color = TSHIRT.grade_color = APRON.grade_color = BAG.grade_color = $(".choosefabaic").find('option:selected').attr("grade_color");


    /*switch(Canvas.product_id){
        case 1:
            Canvas.grade_price = $(".choosefabaic").find('option:selected').attr("grade_polo_price");
            break;
        case 2:
            Canvas.grade_price = $(".choosefabaic").find('option:selected').attr("grade_tshirt_price");
            break;
        case 3:
            Canvas.grade_price = $(".choosefabaic").find('option:selected').attr("grade_bag_price");
            break;
        case 4:
            Canvas.grade_price = $(".choosefabaic").find('option:selected').attr("grade_apron_price");
            break;
    }*/

    Canvas.grade_id = $(".choosefabaic").val();
    changeProduct(Canvas.product_id);
    loadGradeByProductID(Canvas.product_id);
    //generateLogoType(Canvas.product_id, Canvas.grade_id);
});


function changeProduct(product_id) {

    /*$(".sliftbtn .btndisplay").show();
    $(".srightbtn .btndisplay").show();*/
    if (!Canvas.isSaving) {
        Canvas.block("Loading.");
    }
    $(".positionbtn").show();


    Canvas.product_id = product_id;
    Canvas.deactivateAll();
    Canvas.clearAllContainer();
    // Canvas.clear();
    Canvas.hideBox();


    switch (Canvas.product_id) {
        case 1:
            $(".infobtnapp,.fabricheader").find("a").attr("href", baseURL + "/polo");
            break;
        case 2:
            $(".infobtnapp,.fabricheader").find("a").attr("href", baseURL + "/tshirt");
            break;
        case 3:
            $(".infobtnapp,.fabricheader").find("a").attr("href", baseURL + "/bag");
            break;
        case 4:
            $(".infobtnapp,.fabricheader").find("a").attr("href", baseURL + "/apron");
            break;
    }

    if (Canvas.product_id == 1) {
        $('.toolcontent .bx-wrapper:first').show();
    } else {
        $('.toolcontent .bx-wrapper:first').hide();
    }
    /*if(Canvas.product_id == 1){
                      POLO.initColor();
               }else if(Canvas.product_id == 2){
                   TSHIRT.initColor();
               }else if(Canvas.product_id == 3){
                   BAG.initColor();
               }else if(Canvas.product_id == 4){
                   APRON.initColor();
               }

               Canvas.calculateInch();*/

    $(".choosefabaic").val(Canvas.grade_id);
    $(".chooseproduct").val(product_id);

    switch (product_id) {
        case 1:
            $("#tshirt").hide();
            $("#apron").hide();
            $("#bag").hide();
            $(".subcategory").show();
            application_action = "polo";
            POLO.initialize();
            POLO.initColor();
            break;
        case 2:
            if (!$("#tshirt").hasClass("in active")) {
                $("#tshirt").addClass("in active");
            }
            $("#tshirt").show();
            $("#apron").hide();
            $("#bag").hide();
            $(".subcategory").hide();
            application_action = "tshirt";
            TSHIRT.initialize();
            TSHIRT.initColor();
            break;
        case 3:
            $(".positionbtn").hide();
            if (!$("#bag").hasClass("in active")) {
                $("#bag").addClass("in active");
            }
            $("#bag").show();
            $("#apron").hide();
            $("#tshirt").hide();
            $(".subcategory").hide();
            application_action = "bag";
            BAG.initialize();
            BAG.initColor();
            break;
        case 4:
            $(".positionbtn").hide();
            /*$(".sliftbtn .btndisplay").hide();
            $(".srightbtn .btndisplay").hide();
            $(".frontbtn .btndisplay").hide();
            $(".backbtn .btndisplay").hide();*/
            if (!$("#apron").hasClass("in active")) {
                $("#apron").addClass("in active");
            }
            $("#apron").show();
            $("#tshirt").hide();
            $("#bag").hide();
            $(".subcategory").hide();
            application_action = "apron";
            APRON.initialize();
            APRON.initColor();
            break;

    }
    if (categorySlider) categorySlider.reloadSlider();
    if (subcategorySlider && Canvas.product_id == 1) subcategorySlider.reloadSlider();
    //Canvas.design_name = application_action;
    Canvas.calculateInch();
}

// ปุ่มสลับ หน้า หลัง ซ้าย ขวา
$(".frontbtn").click(function (e) {
    Canvas.application_flip = "front";
    flipApplication();
});
$(".backbtn").click(function (e) {
    Canvas.application_flip = "back";
    flipApplication();
});
$(".sliftbtn").click(function (e) {
    Canvas.application_flip = "left";
    flipApplication();
});
$(".srightbtn").click(function (e) {
    Canvas.application_flip = "right";
    flipApplication();
});

$("#zoomIn").click(function (e) {
    Canvas.zoomIn();
});
$("#zoomOut").click(function (e) {
    Canvas.zoomOut();
});
$("#fullscreen").click(function (e) {
    Canvas.fullScreen();
});
$("#reset").click(function (e) {
    Canvas.resetZoom();
    //setActiveTabsZoom(0);
});

function flipApplication() {
    if (!Canvas.isSaving) {
        Canvas.block("Loading.");
    }
    Canvas.hideBox();
    Canvas.resetZoom();
    Canvas.deactivateAll();
    ImageTool.focusOut();
    if (application_action == "polo") {
        POLO.flip(Canvas.application_flip);
    } else if (application_action == "tshirt") {
        TSHIRT.flip(Canvas.application_flip);
    } else if (application_action == "apron") {
        APRON.flip(Canvas.application_flip);
    } else if (application_action == "bag") {
        BAG.flip(Canvas.application_flip);
    }
}

Canvas.flip = flipApplication;

// เปลี่ยนแทบเครื่องมือ

Canvas.on('mouse:down', function (e) {

    updateUI();

});
Canvas.on('selection:created', function (e) {
    Canvas.showBox();
});

function updateUI() {
    var img = Canvas.getActiveObject();
    //console.log("img.strokeWidth : "+img.strokeWidth);
    if (img && img.type && (img.type == "svg" || img.type == "image" || img.type == "path-group")) {
        activeMainTab(1);

        var strokeWidth = Math.round(img.strokeWidth);

        $("#clipart_outline").val(strokeWidth);

        var strokeColor = img.stroke;
        if (img.type == "path-group") {
            strokeColor = img.paths[0].stroke;
        }

        if (strokeColor) {
            $("#colorpicker_clipart_outline .color-fill-icon").css("background-color", strokeColor);
        } else {
            strokeColor = "#000000";
            $("#colorpicker_clipart_outline .color-fill-icon").css("background-color", strokeColor);
        }


        var fillColor = img.fill;
        if (fillColor) {
            $("#colorpicker_clipart .color-fill-icon").css("background-color", fillColor);
        } else {
            fillColor = "#000000";
            $("#colorpicker_clipart .color-fill-icon").css("background-color", fillColor);
        }

    } else if (img && img.type && (img.type == "text" || img.type == "curvedText")) {
        activeMainTab(2);
        var fontFamily = img.fontFamily;
        var fontArr = fontFamily.split(",");
        $('#fontSelect span').text(fontArr[0]);
        $('#fontSelect').css("font-family", fontFamily);

        var effect = img.effect;
        if (effect) $("#text_curve").val(effect);

        var strokeWidth = Math.round(img.strokeWidth);
        $("#text_outline").val(strokeWidth);

        var strokeColor = img.stroke;
        if (strokeColor) {
            $("#colorpicker_outline .color-fill-icon").css("background-color", strokeColor);
        } else {
            strokeColor = "#000000";
            $("#colorpicker_outline .color-fill-icon").css("background-color", strokeColor);
        }


        var fillColor = img.fill;
        if (fillColor) {
            $("#colorpicker_text .color-fill-icon").css("background-color", fillColor);
        } else {
            fillColor = "#000000";
            $("#colorpicker_text .color-fill-icon").css("background-color", fillColor);
        }

        var radius = img.radius;
        if (radius) $("#radius").val(parseInt(radius));

        var spacing = img.spacing;
        if (spacing) $("#spacing").val(parseInt(spacing));

    } else {
        //activeMainTab(0);
    }
}

$(".firstnav_1").each(function (index, element) {
    $(this).click(function (e) {

        activeMainTab(index);
    });
});

function activeMainTab(tabID) {
    if (tabID == 0) {
        $('.nav-pills a[href="#tool"]').tab('show');
        Canvas.hideBox();
        setActiveTabsZoom(0);
    } else if (tabID == 1) {
        $('.nav-pills a[href="#image"]').tab('show');
        //Canvas.resetZoom();
    } else if (tabID == 2) {
        $('.nav-pills a[href="#text"]').tab('show');
        //Canvas.resetZoom();
    }

    $(".firstnav_1").each(function (index, element) {
        if (index == tabID) {
            $(this).addClass("active");
        } else {
            if ($(this).hasClass("active")) {
                $(this).removeClass("active");
            }
        }
    });
    $(".firstnav_2").each(function (index, element) {
        if (index == tabID) {
            $(this).addClass("active");
        } else {
            if ($(this).hasClass("active")) {
                $(this).removeClass("active");
            }
        }
    });
}

$(".toolpill").each(function (index, element) {
    $(this).click(function (e) {

        /*var id = ($(".toolpill").attr("href"));
        $(id+" .pillsthumboverlay").each(function(index, element) {
            if($(this).hasClass("active")){
                $(this).removeClass("active");
            }
        });*/

        if (index == 0) {
            Canvas.resetZoom();
        } else if (index == 1 && Canvas.application_flip == "front") {
            Canvas.zoomForCollar();
        } else if (index == 2 && Canvas.application_flip == "front") {
            Canvas.zoomForMenshirt();
        } else if (index == 3 && Canvas.application_flip == "front") {
            Canvas.zoomForSleeve();
        } else if (index == 4) {
            Canvas.resetZoom();
        }
    });
});

function setActiveTabsZoom(tabID) {
    if (tabID == 0) {
        $('.nav-pills a[href="#pattern"]').tab('show');
    }
    $(".toolpill").each(function (index, element) {

        if (index == tabID) {
            $(this).addClass("active");
        } else {
            if ($(this).hasClass("active")) {
                $(this).removeClass("active");
            }
        }
        if ($(this).hasClass("active")) {
            if (index == 0) {
                Canvas.resetZoom();
            } else if (index == 1) {
                Canvas.zoomForCollar();
            } else if (index == 2) {
                Canvas.zoomForMenshirt();
            } else if (index == 3) {
                Canvas.zoomForSleeve();
            } else if (index == 4) {
                Canvas.resetZoom();
            }
        }
    });

}


function loadGradeByProductID(product_id) {
    $(".choosefabaic").empty();
    var data = {
        'product_id': product_id
    };
    $.ajax({
        url: baseURL + 'Apps/getGrade',
        type: 'POST',
        data: data,
        dataType: 'json',
        success: function (data) {
            //var obj = JSON.parse(data);
            // console.log(data);
            //
            var n = 0;
            for (var key in data) {
                var obj = data[key];

                for (var prop in obj) {
                    var grade_id = obj['grade_id'];
                    var grade_color = obj['grade_color'];
                    var grade_name = obj['grade_name'];
                    var grade_price = obj['grade_price'];
                    var min_quantity = obj['min_quantity'];
                    var production_day = obj['production_day'];

                    if (n == 0) {
                        Canvas.current_grade_id = grade_id;
                    }
                    if (grade_id == Canvas.grade_id) {
                        Canvas.current_grade_id = grade_id;
                    }
                    n++;
                }
                var html = '<option production_day="' + production_day + '" min_quantity="' + min_quantity + '" grade_price="' + grade_price + '" grade_color="' + grade_color + '" class="chooseproductoption" value="' + grade_id + '">' + grade_name + '</option>'
                $(".choosefabaic").append(html);
            }

            // $.ajax({
            //    url : baseURL+'Apps/getGradeByProductIDAndGradeID',
            //    type: 'POST',
            //    dataType: 'json',
            //    data: {
            //      'product_id':product_id,
            //      'grade_id': current_grade_id
            //    }
            // })
            // .done(function(row) {

            //    var logo_embroidery = row.logo_embroidery;
            //    var logo_screen = row.logo_screen;
            //    var logo_digital_screen = row.logo_digital_screen;

            //    if(logo_embroidery === 'Y') {
            //      $('.logo-type-embroidery').show();
            //    } else {
            //      $('.logo-type-embroidery').hide();
            //    }

            //    if(logo_screen === 'Y') {
            //      $('.logo-type-screen').show();
            //    } else {
            //      $('.logo-type-screen').hide();
            //    }

            //    if(logo_digital_screen === 'Y') {
            //      $('.logo-type-digital-screen').show();
            //    } else {
            //      $('.logo-type-digital-screen').hide();
            //    }

            // });

            // console.log(current_grade_id);

            $(".choosefabaic").val(Canvas.current_grade_id);
            Canvas.grade_price = $(".choosefabaic").find('option:selected').attr("grade_price");
            Canvas.min_quantity = $(".choosefabaic").find('option:selected').attr("min_quantity");
            Canvas.production_day = $(".choosefabaic").find('option:selected').attr("production_day");

            if (!Canvas.grade_price) {
                Canvas.grade_price = 0;
            }

            POLO.grade_color = TSHIRT.grade_color = APRON.grade_color = BAG.grade_color = $(".choosefabaic").find('option:selected').attr("grade_color");

            if (product_id == 1) {
                POLO.initColor();
            } else if (product_id == 2) {
                TSHIRT.initColor();
            } else if (product_id == 3) {
                BAG.initColor();
            } else if (product_id == 4) {
                APRON.initColor();
            }

            // Canvas.calculateInch();
            generateLogoType(product_id, Canvas.current_grade_id);
        }
    });
}


function generateLogoType(product_id, grade_id) {
    grade_id = (Canvas.current_grade_id) ? Canvas.current_grade_id : grade_id;
    $.ajax({
        url: baseURL + 'Apps/getGradeByProductIDAndGradeID',
        type: 'POST',
        dataType: 'json',
        data: {
            'product_id': product_id,
            'grade_id': grade_id
        }
    })
        .done(function (row) {

            var num_image = 0;
            num_image = Canvas.imageList.length;
            var logo_embroidery = row.logo_embroidery;
            var logo_screen = row.logo_screen;
            var logo_digital_screen = row.logo_digital_screen;

            // loop รูปที่มีอยู่เพื่อเปลี่ยน type ถ้า type นั้นไม่มี
            for (var i = 0; i < num_image; i++) {

                var isImgEmbroidery = !Canvas.imageList[i].silkScreen && !Canvas.imageList[i].digitalScreen;

                if (logo_embroidery === 'N') {
                    if (isImgEmbroidery) {
                        Canvas.imageList[i].silkScreen = true;
                        Canvas.imageList[i].digitalScreen = false;
                    }
                }

                if (logo_screen === 'N') {
                    if (Canvas.imageList[i].silkScreen) {
                        Canvas.imageList[i].silkScreen = false;
                        Canvas.imageList[i].digitalScreen = true;
                    }
                }

                if (logo_digital_screen === 'N') {
                    if (Canvas.imageList[i].digitalScreen) {
                        Canvas.imageList[i].silkScreen = false;
                        Canvas.imageList[i].digitalScreen = false;
                        if (logo_embroidery === 'N') {
                            Canvas.imageList[i].silkScreen = true;
                        }
                    }
                }

            }

            // เช็คใส่ค่า checked
            if (logo_embroidery === 'Y') {
                $.each($("[name=typeOfImage1]").val(["0"]), function (e) {
                    $(this).attr('checked', $(this).val() == '0');
                });
                $.each($("[name=typeOfImage2]").val(["0"]), function (e) {
                    $(this).attr('checked', $(this).val() == '0');
                });
                $.each($("[name=typeOfImage3]").val(["0"]), function (e) {
                    $(this).attr('checked', $(this).val() == '0');
                });
            } else {
                if (logo_screen === 'Y') {
                    $.each($("[name=typeOfImage1]").val(["1"]), function (e) {
                        $(this).attr('checked', $(this).val() == '1');
                    });
                    $.each($("[name=typeOfImage2]").val(["1"]), function (e) {
                        $(this).attr('checked', $(this).val() == '1');
                    });
                    $.each($("[name=typeOfImage3]").val(["1"]), function (e) {
                        $(this).attr('checked', $(this).val() == '1');
                    });
                } else {
                    if (logo_digital_screen === 'Y') {
                        $.each($("[name=typeOfImage1]").val(["2"]), function (e) {
                            $(this).attr('checked', $(this).val() == '2');
                        });
                        $.each($("[name=typeOfImage2]").val(["2"]), function (e) {
                            $(this).attr('checked', $(this).val() == '2');
                        });
                        $.each($("[name=typeOfImage3]").val(["2"]), function (e) {
                            $(this).attr('checked', $(this).val() == '2');
                        });
                    }
                }
            }

            // show หรือ hide radio button
            if (logo_embroidery === 'Y') {
                $('.logo-type-embroidery').show();
            } else {
                $('.logo-type-embroidery').hide();
            }

            if (logo_screen === 'Y') {
                $('.logo-type-screen').show();
            } else {
                $('.logo-type-screen').hide();
            }

            if (logo_digital_screen === 'Y') {
                $('.logo-type-digital-screen').show();
            } else {
                $('.logo-type-digital-screen').hide();
            }

            Canvas.calculateInch();

        });
}