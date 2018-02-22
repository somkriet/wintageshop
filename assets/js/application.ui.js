// codebee company limited
// http://www.codebee.co.th

var isTesting = false;
var slider;

var isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
    },
    any: function () {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

var subcategorySlider;
var categorySlider;

$(document).ready(function (e) {

    if (isMobile.any() || isTesting) {

        $(".navbar-fixed-top").hide();
        if (window.innerWidth < 768) {
            categorySlider = $('.category').bxSlider({
                minSlides: 2,
                maxSlides: 2,
                slideWidth: 141,
                slideMargin: 2,
                pager: false,
                infiniteLoop: false,
                hideControlOnEnd: true
            });
            subcategorySlider = $('.subcategory').bxSlider({
                minSlides: 2,
                maxSlides: 2,
                slideWidth: 141,
                slideMargin: 2,
                pager: false,
                infiniteLoop: false,
                hideControlOnEnd: true
            });
        } else {
            categorySlider = $('.category').bxSlider({
                minSlides: 5,
                maxSlides: 5,
                slideWidth: 240,
                slideMargin: 2,
                pager: false,
                infiniteLoop: false,
                hideControlOnEnd: true
            });
            subcategorySlider = $('.subcategory').bxSlider({
                minSlides: 5,
                maxSlides: 5,
                slideWidth: 145,
                slideMargin: 2,
                pager: false,
                infiniteLoop: false,
                hideControlOnEnd: true
            });
        }
        /*slider = $('.default_content').bxSlider({
          pager:false,
          infiniteLoop: false,
          hideControlOnEnd: true
        });*/
        //slider.reloadSlider();
    } else {
        $(".navbar-fixed-top").css("display", "block");
    }//else{

    //$(".default_content").css("overflow","scroll");
    //$(".default_content").css("overflow-x","hidden");
    //}
});

$(".firstnav_2").each(function (index, element) {
    $(this).click(function (e) {
        resetFirstNavActive();
        $(this).addClass("active");
    });
});

function resetFirstNavActive() {
    $(".firstnav_1").each(function (index, element) {
        $(this).removeClass("active");
    });
    $(".firstnav_2").each(function (index, element) {
        $(this).removeClass("active");
    });
}

// polo tab pattern,collar, etc.
$(".toolpill").each(function (index, element) {
    $(this).click(function (e) {
        resetSecondNavActive();
        $(this).addClass("active");
    });
});

function resetSecondNavActive() {
    $(".toolpill").each(function (index, element) {
        $(this).removeClass("active");
    });
    $(".toolpill2").each(function (index, element) {
        $(this).removeClass("active");
    });
}

$(".btndisplay").each(function (index, element) {
    $(this).click(function (e) {
        resetBtnDisplayActive();
        $(this).addClass("active");
    });
});

function resetBtnDisplayActive() {
    $(".btndisplay").each(function (index, element) {
        $(this).removeClass("active");
    });
}


$(document).ready(function () {


    $('#init').on('click', function () {

        $('select[name="colorpicker-notheme"]').simplecolorpicker();
        $('select[name="colorpicker-regularfont"]').simplecolorpicker({theme: 'regularfont'});
        $('select[name="colorpicker-glyphicons"]').simplecolorpicker({theme: 'glyphicons'});
        $('select[name="colorpicker-fontawesome"]').simplecolorpicker({theme: 'fontawesome'});
        $('select[name="colorpicker-bootstrap3-form"]').simplecolorpicker({theme: 'glyphicons'});
        $('select[name="colorpicker-modal-inline"]').simplecolorpicker();
        $('select[name="colorpicker-modal-picker"]').simplecolorpicker({picker: true});
        $('select[name="colorpicker-option-selected"]').simplecolorpicker({theme: 'glyphicons'});
        $('select[name="colorpicker-options-disabled"]').simplecolorpicker({theme: 'glyphicons'});
        $('select[name="colorpicker-option-selected-disabled"]').simplecolorpicker({theme: 'glyphicons'});
        $('select[name="colorpicker-optgroups"]').simplecolorpicker();
        $('select[name="colorpicker-change-background-color"]').simplecolorpicker();
        $('select[name="colorpicker-selectColor-#fbd75b"]').simplecolorpicker({theme: 'glyphicons'});
        $('select[name="colorpicker-selectColor-#FBD75B"]').simplecolorpicker({theme: 'glyphicons'});
        $('select[name="colorpicker-selectColor-#fbd75b-multiple"]').simplecolorpicker({theme: 'glyphicons'});
        $('select[name="colorpicker-selectColor-unknown"]').simplecolorpicker({theme: 'glyphicons'});

        $('select[name="colorpicker-picker-clipart"]').simplecolorpicker({picker: true, theme: 'glyphicons'});
        $('select[name="colorpicker-picker-outline"]').simplecolorpicker({picker: true, theme: 'glyphicons'});
        $('select[name="colorpicker-picker-text"]').simplecolorpicker({picker: true, theme: 'glyphicons'});
        $('select[name="colorpicker-picker-textoutline"]').simplecolorpicker({picker: true, theme: 'glyphicons'});

        $('select[name="colorpicker-picker-delay"]').simplecolorpicker({picker: true, theme: 'glyphicons', pickerDelay: 1000});
        $('select[name="colorpicker-picker-option-selected"]').simplecolorpicker({picker: true, theme: 'glyphicons'});
        $('select[name="colorpicker-picker-options-disabled"]').simplecolorpicker({picker: true, theme: 'glyphicons'});
        $('select[name="colorpicker-picker-option-selected-disabled"]').simplecolorpicker({picker: true, theme: 'glyphicons'});
        $('select[name="colorpicker-picker-optgroups"]').simplecolorpicker({picker: true, theme: 'glyphicons'});
        $('select[name="colorpicker-picker-selectColor-#fbd75b"]').simplecolorpicker({picker: true, theme: 'glyphicons'});
        $('select[name="colorpicker-picker-selectColor-unknown"]').simplecolorpicker({picker: true, theme: 'glyphicons'});
    });

    $('#destroy').on('click', function () {
        $('select').simplecolorpicker('destroy');
    });

    // By default, activate simplecolorpicker plugin on HTML selects
    $('#init').trigger('click');
});
	


