// codebee company limited
// http://www.codebee.co.th

var ImageTool = {};
ImageTool.imageList = new Array();
//ImageTool.textList = new Array();
ImageTool.typetool = "added_item";
ImageTool.imageJSON = '';
ImageTool.typing_num = 0;

var isFlipY = false;
var isFlipX = false;

// Object for load font google font
var logoImgObj = new Array();

ImageTool.initialize = function () {

    // จัดเรียงรูปภาพที่เคยเพิ่มไว้
    //ImageTool.loadImageList();

    // โหลดรูปจากฐานข้อมูล
    //ImageTool.imageJSON = "";

    //console.log(ImageTool.imageJSON);
    ImageTool.loadAllImage(ImageTool.imageJSON);
    Canvas.imageList = ImageTool.imageList;
}

ImageTool.loadSvg = function (url, callback) {
    fabric.loadSVGFromURL(url, function (objects, options) {

        var img = fabric.util.groupSVGElements(objects, options);
        img.src = url;
        ImageTool.calculcateSize(img);
        if (callback != null) callback(img);
        //Canvas.hideBox();
    });
}
ImageTool.load = function (url, callback) {
    Canvas.deactivateAll();
    var request = $.ajax({
        url: url,
        crossDomain: true,
        type: "HEAD",
        cache: true,
    });
    request.done(function () {
        var loader = fabric.Image.fromURL(url, function (img) {

            // slice 2 hack
            /*
            img.filters.push(new fabric.Image.filters.Resize({
              resizeType: 'sliceHack',
              scaleX: 0.5,
              scaleY: 0.5
            }));
            img.applyFilters();
            */
            img.resizeFilters.push(new fabric.Image.filters.Resize({
                resizeType: 'sliceHack'
            }));
            // img.applyFilters();
            // img.scaleX = 1 / 12;
            // img.scaleY = 1 / 12;

            // lanczos (โหลดนาน ไม่สวย)
            /*
            img.resizeFilters.push(new fabric.Image.filters.Resize({
              resizeType: 'lanczos', // typo fixed
              lanczosLobes: 2 // typo fixed
            }));
            */

            // hermite (ใช้ได้แต่สู้ hack ไม่ได้)
            // img.resizeFilters.push(new fabric.Image.filters.Resize({
            //   resizeType: 'hermite'
            // }));

            ImageTool.calculcateSize(img);
            if (callback != null) callback(img);
        });

    });

}
ImageTool.calculcateSizePosition = function (img) {

    if (img.getWidth() > Canvas.boundingBox.width) {
        img.scaleY = img.scaleX = (Canvas.boundingBox.width / img.getWidth());
    }

    if (img.getHeight() > Canvas.boundingBox.height) {
        img.scaleY = (Canvas.boundingBox.height / img.getHeight());
    }

    Canvas.centerObject(img);
    img.top = Canvas.boundingBox.top + (img.getHeight() / 2);
    Canvas.renderAll();
    Canvas.calcOffset();
    //Canvas.calculateInch();
}

ImageTool.calculcateSize = function (img) {
    if (img.width > Canvas.boundingBox.width) {
        img.scaleY = img.scaleX = (Canvas.boundingBox.width / img.width) - 0.1;
    }

    if (img.getHeight() > Canvas.boundingBox.height) {
        img.scaleY = (Canvas.boundingBox.height / img.height) - 0.1;
    }

    img.selectable = true;
    img.opacity = 1;
    img.typetool = ImageTool.typetool;
    img.product_id = Canvas.product_id;
    img.application_flip = Canvas.application_flip;
    img.originX = "center";
    img.originY = "center";
    //console.log("before push ImageTool.imageList : "+ImageTool.imageList.length);
    //ImageTool.imageList.push(img);
    //console.log("after push ImageTool.imageList : "+ImageTool.imageList.length);
    Canvas.centerObject(img);
    img.top = Canvas.boundingBox.top + (Canvas.boundingBox.height / 2);


    Canvas.setActiveObject(img);
    Canvas.add(img);


    ImageTool.calNewAdd();

    Canvas.calculateInch();
    Canvas.renderAll();
}
ImageTool.calNewAdd = function () {
    ImageTool.imageList = new Array();
    Canvas.imageList = new Array();
    Canvas.forEachObject(function (obj) {
        if (obj.typetool == ImageTool.typetool) {
            Canvas.imageList.push(obj);
            ImageTool.imageList.push(obj);
        }

    });

}
ImageTool.clear = function () {
    //console.log("ImageTool.clear");
    var length = ImageTool.imageList.length;
    for (var i = 0; i < length; i++) {
        var img = ImageTool.imageList[i];
        Canvas.remove(img);
    }
    Canvas.renderAll();
}


ImageTool.saveAllImage = function () {
    /*for(var i=0;i<ImageTool.textList.length;i++){
        ImageTool.imageList.push(ImageTool.textList[i]);
    }*/
    ImageTool.imageJSON = (JSON.stringify(ImageTool.imageList));
    //var oj = JSON.stringify(ImageTool.imageList[0]);
    //console.log(JSON.parse(oj));
    //console.log(ImageTool.imageJSON);
    Canvas.clearAll();
}

ImageTool.loadAllImage = function (json) {
    //ImageTool.imageJSON = json;

    //ImageTool.textList = [];
    ImageTool.imageList = [];

    var image_load_list = [];
    if (ImageTool.imageJSON) {
        image_load_list = JSON.parse(ImageTool.imageJSON);
    }
    fabric.util.enlivenObjects(image_load_list, function (objects) {
        objects.forEach(function (o) {

            /*if(o.type == "text"){
                ImageTool.textList.push(o);
            }else{
                ImageTool.imageList.push(o);
            }*/

            ImageTool.imageList.push(o);

            if (o.type == 'image') {
                // slice 2 hack
                o.resizeFilters.push(new fabric.Image.filters.Resize({
                    resizeType: 'sliceHack'
                }));
            }

            // console.log(o);
            Canvas.add(o);

        });
        //ImageTool.bringAllToFront();
        logoImgObj = objects;
        // Canvas.renderAll();

        Canvas.calculateInch();
    });

    // Load Fonts Google Fonts
    if (typeof document.fonts != "undefined" &&
        typeof document.fonts.onloadingdone == "object"
    ) {
        document.fonts.onloadingdone = function (fontFaceSetEvent) {
            if (logoImgObj.length !== 0) {
                logoImgObj.forEach(function (o) {
                    if (o.type == 'text' || o.type == 'curvedText') {
                        Canvas.setActiveObject(o);
                        var obj = Canvas.getActiveObject();
                        if (obj) {
                            fontFamily = obj.fontFamily;
                            ImageTool.changeFontStyle(obj.text, fontFamily);
                        }
                    }
                });
                Canvas.hideBox();
                // Canvas.deactivateAll();
            }
        };
    }

    setTimeout(function () {
        loadCSS('https://fonts.googleapis.com/css?family=Athiti|Chewy|Chonburi|Dancing+Script|Great+Vibes|Itim|Kanit|Kaushan+Script|Lobster|Love+Ya+Like+A+Sister|Maitree|Merriweather|Mitr|Monoton|Pattaya|Permanent+Marker|Playball|Pridi|Prompt|Roboto|Special+Elite|Sriracha|Taviraj|Trirong&amp;subset=thai', function () {
            logoImgObj.forEach(function (o) {
                if (o.type == 'text' || o.type == 'curvedText') {
                    Canvas.setActiveObject(o);
                    var obj = Canvas.getActiveObject();
                    if (obj) {
                        fontFamily = obj.fontFamily;
                        ImageTool.changeFontStyle(obj.text, fontFamily);
                    }
                }
            });
            Canvas.hideBox();
            // Canvas.deactivateAll();
        });
    }, 3000);


    /*for(var i=0;i<image_load_list.length;i++){
        var obj = image_load_list[i];
        var url = obj.src;
        if(obj.type == "image"){
            url = obj.src;
        }else{
            console.log(fabric.util.enlivenObjects(obj));
        }

        //console.log(url);
        //ImageTool.addClipArt(url);
        fabric.Image.fromURL(url, function(img) {
           for (var prop in obj) {
                img.typetool = ImageTool.typetool;
                img.product_id = ImageTool.product_id;
                 img[prop] = obj[prop];
                console.log(prop+" : "+img[prop]);
            }
            ImageTool.imageList.push(img);
            Canvas.add(img);
            Canvas.renderAll();
            Canvas.calcOffset();
        });
    }*/
}

ImageTool.addFont = function (txt, fontFamily) {
    //fontFamily = fontFamily.split("'").join("");
    //console.log("add font : "+fontFamily);
    if (txt) {
        if (!fontFamily) fontFamily = "Tahoma";
        //var txt = ImageTool.wrapCanvasText(txt,Canvas,50,500);
        //console.log(txt);
        // var mytext = new fabric.CurvedText(txt, {
        var mytext = new fabric.Text(txt, {
            fontFamily: fontFamily,
            textAlign: "left",
            fill: "#000000",
            effect: "STRAIGHT",
            radius: 50,
            spacing: 20,
            strokeWidth: 0,
            selectable: true
        })
        //console.log(mytext);
        ImageTool.initClipArtAndText(mytext);
        ImageTool.calculcateSize(mytext);


        //

        /*Canvas.imageList = ImageTool.imageList;
        Canvas.calculateInch();
        Canvas.renderAll();
        Canvas.calcOffset();*/
        /*Canvas.centerObject(mytext);
        Canvas.setActiveObject(mytext);
        ImageTool.textList.push(mytext);
        Canvas.add(mytext);
        Canvas.renderAll();
        Canvas.calcOffset();*/
    }
}
ImageTool.changeFontStyle = function (txt, fontFamily) {
    //fontFamily = fontFamily.split("'").join("");
    //console.log(fontFamily);
    //console.log("change font : "+fontFamily);
    var obj = Canvas.getActiveObject();
    //console.log(obj.effect);
    if (obj && (obj.type == "text" || obj.type == "curvedText")) {
        obj.setText(txt);
        obj.set("textAlign", "center");
        obj.set("fontFamily", fontFamily);
        /*obj.set("textAlign","center");
        obj.set("text",txt);
        obj.set("fontFamily",fontFamily);*/
    }
    Canvas.imageList = ImageTool.imageList;
    generateLogoType(Canvas.product_id, Canvas.grade_id);
    Canvas.calculateInch();
    Canvas.renderAll();
    Canvas.calcOffset();
}
ImageTool.curveText = function (effect) {
    var obj = Canvas.getActiveObject();
    if (obj) {
        obj.set("effect", effect);
        Canvas.renderAll();
        Canvas.calcOffset();
        Canvas.calculateInch();
    }
}
ImageTool.radiusText = function (num) {
    var obj = Canvas.getActiveObject();
    if (obj) {
        obj.set("radius", num);
        Canvas.renderAll();
        Canvas.calcOffset();
        Canvas.calculateInch();
    }
}
ImageTool.spaceText = function (num) {
    var obj = Canvas.getActiveObject();
    if (obj) {
        obj.set("spacing", num);
        Canvas.renderAll();
        Canvas.calcOffset();
        Canvas.calculateInch();
    }
}
ImageTool.focusOut = function () {

    ImageTool.typing_num = 0;
    Canvas.deactivateAll();
    $("#txt").text("");
    Canvas.renderAll();
}
Canvas.on('object:removed', function (e) {
    //console.log("remove"+e.target.typetool);
    //console.log(e.target.__corner);
    //if(e.target.__corner == "bl"){
    ImageTool.calNewAdd();
    //Canvas.imageList = ImageTool.imageList;
    //console.log(ImageTool.imageList.length);
    //ImageTool.removeFormList(e.target);

    //Canvas.imageList = ImageTool.imageList;
    //}

    //console.log("ImageTool : "+ImageTool.imageList);
    //console.log("Canvas : "+Canvas.imageList);
    ImageTool.bringAllToFront();
    Canvas.calculateInch();
});

Canvas.on('mouse:down', function (e) {
    //console.log(e.target);

    var obj = Canvas.getActiveObject();
    if (obj && (obj.type == "text" || obj.type == "curvedText")) {
        setTimeout(function () {
            $('textarea[name="txt"]').focus()
        }, 500);
        $("#txt").val(obj.text);
        ImageTool.typing_num = 1;

        //$(".typeOfImage3").change(function(e) {
        //alert(obj.silkScreen);
        /*if($(".typeOfImage3").val() == 0){
            $("[name=typeOfImage1]").val(["0"]);
            $("[name=typeOfImage2]").val(["0"]);
        }*/


    }
    if (obj) Canvas.bringToFront(obj);
});
Canvas.on('before:selection:cleared', function () {

    Canvas.hideBox();
});
Canvas.on('object:selected', function (options) {
    var obj = Canvas.getActiveObject();

    if (obj) {
        //obj = klass(obj);
        if (obj.silkScreen) {
            $("[name=typeOfImage1]").val(["1"]);
            $("[name=typeOfImage2]").val(["1"]);
            $("[name=typeOfImage3]").val(["1"]);
        } else if (obj.digitalScreen) {
            $("[name=typeOfImage1]").val(["2"]);
            $("[name=typeOfImage2]").val(["2"]);
            $("[name=typeOfImage3]").val(["2"]);
        } else {
            $("[name=typeOfImage1]").val(["0"]);
            $("[name=typeOfImage2]").val(["0"]);
            $("[name=typeOfImage3]").val(["0"]);
        }

    }
    Canvas.calculateInch();
    Canvas.showBox();

});

Canvas.on('object:moving', function (options) {
    Canvas.calculateInch();
    // Canvas.calculateSubTotal();
    Canvas.showBox();
});

/*ImageTool.uploadImage = function(event,filename)
{
    var reader = new FileReader();
    reader.onload = function(event){
        var oImg = new Image();
        oImg.onload = function(){
              var img = new fabric.Image(oImg);
			  console.log(filename);
			  if(img.width>Canvas.BOX_WIDTH){
					img.scaleY = img.scaleX = Canvas.BOX_WIDTH / img.width;
				}
				if(img.getHeight()>Canvas.BOX_HEIGHT){
					img.scaleY = Canvas.BOX_HEIGHT / img.height;
				}
				img.selectable = true;
				img.opacity = 1;
				img.typetool = ImageTool.typetool;
				img.application_flip = Canvas.application_flip;
				img.originX = "center";
				img.originY = "center";
				
				ImageTool.imageList.push(img);
				Canvas.centerObject(img);
				Canvas.setActiveObject(img);
				Canvas.add(img);
				Canvas.renderAll();
        }
        oImg.src = event.target.result;
    }
	reader.readAsDataURL(event.target.files[0]);   
	
}*/
ImageTool.addClipArt = function (url, silkColor, countSilkColor) {
    var silkColor = typeof silkColor !== 'undefined' ? silkColor : [];
    var countSilkColor = typeof countSilkColor !== 'undefined' ? countSilkColor : 0;

    var type = ImageTool.getImageType(url);
    if (type == "svg" || type == "path-group") {
        ImageTool.loadSvg(url, function (img) {
            img.logoType = 'svg';

            Canvas.setActiveObject(img);
            ImageTool.setClipArtColor("#000000");

            ImageTool.initClipArtAndText(img);

            // Canvas.calculateInch();
        });
    } else {
        ImageTool.load(url, function (img) {
            img.logoType = 'image';
            img.silkColor = silkColor;
            img.countSilkColor = countSilkColor;

            Canvas.setActiveObject(img);
            //ImageTool.setClipArtColor("#000000");
            // Canvas.calculateInch();
        });
    }

    // toy add here
    generateLogoType(Canvas.product_id, Canvas.grade_id);
    //Canvas.calculateInch();
}
ImageTool.setClipArtColor = function (color) {
    var img = Canvas.getActiveObject();

    if (img) {
        if (img.type != "image") {
            img.setFill(color);
        } else {
            Canvas.setColor(img, color);
        }
        Canvas.calculateInch(img);
        Canvas.renderAll();

    }
}
ImageTool.addOutline = function (color, stroke) {
    var img = Canvas.getActiveObject();
    if (img) {

        if (img.type == "svg" || img.type == "path-group") {

            for (var i = 0; i < img.paths.length; i++) {
                if (!stroke || stroke == 0) {
                    color = null;
                    img.affectStroke = false;
                    img.paths[i].set("affectStroke", false);
                }

                img.strokeWidth = stroke;
                img.paths[i].set("strokeWidth", img.strokeWidth);
                img.paths[i].set("stroke", color);
            }
        } else {
            if (!stroke || stroke == 0) {
                color = null;
                img.affectStroke = false;
                img.set("affectStroke", false);
            }
            img.stroke = color;
            img.strokeWidth = stroke;
            img.set('stroke', img.stroke);
            img.set('strokeWidth', img.strokeWidth);
        }
    }
    Canvas.calculateInch();
    Canvas.renderAll();
    Canvas.calcOffset();
    Canvas.renderAll();
}

ImageTool.initClipArtAndText = function (img) {
    if (img.type == "svg" || img.type == "path-group") {
        for (var i = 0; i < img.paths.length; i++) {
            img.strokeWidth = 0;
            img.paths[i].set("strokeWidth", 0);
            img.paths[i].set("stroke", "#000000");
        }
    } else {
        img.logoTypt = 'text';
        img.strokeWidth = 0;
        img.set('stroke', "#000000");
        img.set('strokeWidth', 0);
    }
}
ImageTool.duplicate = function (color, stroke) {

    //console.log("Canvas.getActiveObject() : "+Canvas.getActiveObject());
    if (Canvas.getActiveObject()) {
        var cloneObj = Canvas.getActiveObject();
        if (cloneObj.type == "text" || cloneObj.type == "curvedText") {

            var img = cloneObj.clone();

            img.set("top", cloneObj.top + 10);
            img.set("left", cloneObj.left + 10);

            Canvas.calcOffset();
            Canvas.renderAll();
            Canvas.add(img);

            Canvas.deactivateAll();
            Canvas.setActiveObject(img);
            ImageTool.calNewAdd();
            Canvas.calculateInch(img);


        } else {
            cloneObj.clone(function (o) {
                // fabric.util.object.clone(cloneObj);
                var img = o;
                //var obj = o;

                img.set("top", cloneObj.top + 10);
                img.set("left", cloneObj.left + 10);
                //obj.silkScreen = cloneObj.silkScreen;
                //obj.set("inch1", cloneObj.inch1);
                //obj.set("inch2", cloneObj.inch2);


                Canvas.calcOffset();
                Canvas.renderAll();
                Canvas.add(img);

                Canvas.deactivateAll();
                Canvas.setActiveObject(img);
                ImageTool.calNewAdd();
                Canvas.calculateInch(img);

            });
        }
    }

}
ImageTool.removeFormList = function (img) {

    var index;
    index = ImageTool.imageList.indexOf(img);

    if (index > -1) {
        //ImageTool.imageList.splice(index,1);
        Canvas.imageList = ImageTool.imageList;
    }
}
ImageTool.center = function () {
    var img = Canvas.getActiveObject();
    if (img) {
        Canvas.centerObject(img);
    }
    Canvas.renderAll();
    Canvas.calcOffset();
}
ImageTool.pushBehind = function () {
    var img = Canvas.getActiveObject();
    if (img) {
        Canvas.sendBackwards(img);
    }
    Canvas.renderAll();
}
ImageTool.flipHerizontal = function () {
    var img = Canvas.getActiveObject();
    isFlipX = (isFlipX == false) ? true : false;
    if (img) {
        img.set('flipX', isFlipX);
    }
    Canvas.renderAll();
}

ImageTool.flipVertical = function () {
    var img = Canvas.getActiveObject();
    isFlipY = (isFlipY == false) ? true : false;
    if (img) {
        img.set('flipY', isFlipY);
    }
    Canvas.renderAll();
}
ImageTool.getImageType = function (url) {
    var type_arr = url.split(".");
    return (type_arr[type_arr.length - 1]);
}

ImageTool.testload = function () {
    ImageTool.loadAllImage(ImageTool.imageJSON);
}

//test
ImageTool.loadImageList = function () {
    for (var i = 0; i < 1; i++) {
        ImageTool.load(baseURL + 'assets/img/home-product2.png', ImageTool.bringAllToFront);
    }
}
ImageTool.bringAllToFront = function () {
    var leng = ImageTool.imageList.length;
    for (var i = 0; i < leng; i++) {
        var img = ImageTool.imageList[i];
        img.bringToFront();
        Canvas.calculateInch(img);
        Canvas.moveTo(img, img.getZIndex());
        //console.log("getZIndex : "+img.getZIndex());
        //ImageTool.calculcateSizePosition(img);
    }
    //console.log("bring");
    /*leng = ImageTool.textList.length;
    for(var i=0;i<leng;i++){
        var txt = ImageTool.textList[i];
        txt.bringToFront();

        //ImageTool.calculcateSizePosition(txt);
    }*/
}
fabric.Object.prototype.getZIndex = function () {
    return this.canvas.getObjects().indexOf(this);
}


ImageTool.wrapCanvasText = function (t, canvas, maxW, maxH) {

    if (typeof maxH === "undefined") {
        maxH = 0;
    }

    // var words = t.text.split(" ");
    var words = t.split(" ");
    var formatted = '';

    // clear newlines
    // var sansBreaks = t.text.replace(/(\r\n|\n|\r)/gm, "");  
    var sansBreaks = t.replace(/(\r\n|\n|\r)/gm, "");
    // calc line height
    var lineHeight = new fabric.Text(sansBreaks, {
        fontFamily: t.fontFamily,
        fontSize: 25 //t.fontSize
    }).height;

    // adjust for vertical offset
    var maxHAdjusted = maxH > 0 ? maxH - lineHeight : 0;
    var context = canvas.getContext("2d");


    context.font = t.fontSize + "px " + t.fontFamily;
    var currentLine = "";
    var breakLineCount = 0;

    for (var n = 0; n < words.length; n++) {

        var isNewLine = currentLine == "";
        var testOverlap = currentLine + ' ' + words[n];

        // are we over width?
        var w = context.measureText(testOverlap).width;

        if (w < maxW) { // if not, keep adding words
            currentLine += words[n] + ' ';
            formatted += words[n] += ' ';
        } else {

            // if this hits, we got a word that need to be hypenated
            if (isNewLine) {
                var wordOverlap = "";

                // test word length until its over maxW
                for (var i = 0; i < words[n].length; ++i) {

                    wordOverlap += words[n].charAt(i);
                    var withHypeh = wordOverlap + "-";

                    if (context.measureText(withHypeh).width >= maxW) {
                        // add hyphen when splitting a word
                        withHypeh = wordOverlap.substr(0, wordOverlap.length - 2) + "-";
                        // update current word with remainder
                        words[n] = words[n].substr(wordOverlap.length - 1, words[n].length);
                        formatted += withHypeh; // add hypenated word
                        break;
                    }
                }
            }
            n--; // restart cycle
            formatted += '\n';
            breakLineCount++;
            currentLine = "";
        }
        if (maxHAdjusted > 0 && (breakLineCount * lineHeight) > maxHAdjusted) {
            // add ... at the end indicating text was cutoff
            formatted = formatted.substr(0, formatted.length - 3) + "...\n";
            break;
        }
    }
    // get rid of empy newline at the end
    formatted = formatted.substr(0, formatted.length - 1);

    return formatted;
}

/*var cutOff = 210,
    DEBUG = true;

ImageTool.multiFillText = function(text, x, y, lineHeight, fitWidth) {
    var draw = x !== null && y !== null;

    text = text.replace(/(\r\n|\n\r|\r|\n)/g, "\n");
    sections = text.split("\n");

    var i, str, wordWidth, words, currentLine = 0,
        maxHeight = 0,
        maxWidth = 0;

    var printNextLine = function(str) {
        if (draw) {
            ctx.fillText(str, x, y + (lineHeight * currentLine));
        }

        currentLine++;
        wordWidth = ctx.measureText(str).width;
        if (wordWidth > maxWidth) {
            maxWidth = wordWidth;
        }
    };

    for (i = 0; i < sections.length; i++) {
        words = sections[i].split(' ');
        index = 1;

        while (words.length > 0 && index <= words.length) {

            str = words.slice(0, index).join(' ');
            wordWidth = ctx.measureText(str).width;

            if (wordWidth > fitWidth) {
                if (index === 1) {
                    // Falls to this case if the first word in words[] is bigger than fitWidth
                    // so we print this word on its own line; index = 2 because slice is
                    str = words.slice(0, 1).join(' ');
                    words = words.splice(1);
                } else {
                    str = words.slice(0, index - 1).join(' ');
                    words = words.splice(index - 1);
                }

                printNextLine(str);

                index = 1;
            } else {
                index++;
            }
        }

        // The left over words on the last line
        if (index > 0) {
            printNextLine(words.join(' '));
        }


    }

    maxHeight = lineHeight * (currentLine);

    if (DEBUG) {
        ctx.strokeRect(x, y, maxWidth, maxHeight);
    }

    if (!draw) {
        return {
            height: maxHeight,
            width: maxWidth
        };
    }
};*/