// codebee company limited
// http://www.codebee.co.th


//var baseURL = "http://www.12tees.com/";
//var baseURL = "http://localhost/tees/";
//var baseURL = "http://10.1.17.162/tees/";
//var localURL = "http://10.1.17.162/";
var baseURL = "http://www.12tees.com/";
var localURL = "http://www.12tees.com/";

var currency = "THB";

//toy edit
// var baseURL = "http://12tees.local:8888/";
// var localURL = "http://12tees.local:8888/";

var slider;
var windowWidth = 1024;

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

var id;
var isOverOnDataExpand = false;
var isLeave = false;


if (window.innerWidth > windowWidth) {
    $(this).attr("data-toggle", "");
} else {
    $(this).attr("data-toggle", "collapse");
}

function expand(index) {
    //console.log($this);
    clearTimeout(id);
    if (window.innerWidth > windowWidth && !isLeave) {
        resetExpandMenu();
        //$header = $this;
        $content = $("#dataExpand" + index);
        $content.slideDown(100, function () {
            /*$header.text(function () {

            });*/
        });
    }
}

function resetExpandMenu() {
    //$header = $this;
    if (!isOverOnDataExpand) {
        $('.mainmenu').each(function (index, v) {
            $content = $("#dataExpand" + index);
            $content.slideUp(0, function () {
                /*$header.text(function () {

                });*/
            });
        });
    }
}

$(document).ready(function () {

    $('.mainmenu').each(function (index, v) {

        $(this).mouseover(function (e) {
            isLeave = false;
            clearTimeout(id);
            var $this = $(this);
            id = setTimeout(expand, 300, index);
        });
        $(this).mouseleave(function (e) {
            isLeave = true;
            //resetExpandMenu();
        });
        $(this).click(function (e) {
            if (index == 1 && !isMobile.any()) {
                //window.location = "polo";
            }
            /*if(window.innerWidth>windowWidth){
                $header = $(this);
                    $content = $("#dataExpand"+index);
                    $content.slideUp(0, function () {
                        $header.text(function () {

                        });
                    });
                }*/
        });

    });


    $('.dataExpand').mouseover(function (e) {
        isOverOnDataExpand = true;
    });
    $('.dataExpand').mouseleave(function (e) {

        isOverOnDataExpand = false;
        clearTimeout(id);
        if (window.innerWidth > windowWidth) {
            $('.mainmenu').each(function (index, v) {
                //$header = $(this);
                $content = $("#dataExpand" + index);
                $content.slideUp(100, function () {
                    /*$header.text(function () {

                    });*/
                });
            });
        }
    });

});


numberWithCommas = function (x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}


var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
];

Date.prototype.addDays = function (days) {
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
}

// Array.prototype.arMax = function() {
//   return Math.max.apply(null, this);
// };

// Array.prototype.arMin = function() {
//   return Math.min.apply(null, this);
// };


$(window).load(function () {
    if ($(window).width() < 768) {
        $(".toolboxcon").addClass("ui-toolbox");

        var txtgethd = $(".toolbox .bx-wrapper .nav-pills.category > li").first().find('a').text();
        $("#tool > .bx-wrapper").before("<div class='ui-tgle-btmpanli'><h4>" + txtgethd + "</h4><a href='javascript:;' title='' class='ui-hidpanl'>_</a></div>");

        var txtgethd2 = $(".toolbox .bx-wrapper .nav-pills.category > li").eq(1).find('a').text();
        $("#image > .nav-pills").before("<div class='ui-tgle-btmpanli'><h4>" + txtgethd2 + "</h4><a href='javascript:;' title='' class='ui-hidpanl'>_</a></div>");

        var txtgethd3 = $(".toolbox .bx-wrapper .nav-pills.category > li").eq(2).find('a').text();
        $("#text > .addtext").before("<div class='ui-tgle-btmpanli'><h4>" + txtgethd3 + "</h4><a href='javascript:;' title='' class='ui-hidpanl'>_</a></div>");

        $("#tool.tab-pane, #image.tab-pane, #text.tab-pane").removeClass("active in");
        $(".toolboxcon").find(".nav.nav-pills.category a.active, .nav.nav-pills.category li.active").removeClass("active");

        $('body').on("click", ".ui-hidpanl", function () {
            $("#tool.tab-pane, #image.tab-pane, #text.tab-pane").removeClass("active in");
            $(".toolboxcon").find(".nav.nav-pills.category a.active, .nav.nav-pills.category li.active").removeClass("active");
        });

    }
});
