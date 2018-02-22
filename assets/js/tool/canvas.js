// codebee company limited
// http://www.codebee.co.th
var Canvas = {};
if (isMobile.any()) {
    $("#zoomIn").hide();
    $("#zoomOut").hide();
    $("#reset").hide();
    //$(".btndisplay").css("font-size","10px");
    Canvas = new fabric.Canvas('canvas');
} else {
    Canvas = new fabric.CanvasWithViewport("canvas");
    //$("#zoomIn").show();
    //$("#zoomOut").show();
    $("#reset").show();
}

/*var Canvas = new fabric.Canvas('canvas');
Canvas.allowTouchScrolling = true;
Canvas.selection = false;
Canvas.controlsAboveOverlay = true
Canvas.centeredScaling = true*/

var saveCallback;


Canvas.current_design_id = 0;
Canvas.min_quantity = 30;
Canvas.production_day = 30;
Canvas.design_code = '';
Canvas.isSave = 0;
Canvas.isSaving = false;
Canvas.production = true;
Canvas.lineWidth = 10;
Canvas.preview = []; // ไว้เซฟรูป ด้านหน้า หลัง ซ้าย ขวา
Canvas.selection = false;
Canvas.backgroundColor = 'transparent'; //#f4f4f4
Canvas.application_flip = "front";
Canvas.isFullscreen = true;
;
Canvas.snapToGrid = false;
Canvas.product_id = 1;
Canvas.grade_id = 1;
Canvas.current_grade_id = false;
Canvas.design_id = "";
Canvas.member_id = "";
Canvas.design_name = "";
Canvas.admin_mode = 0;

Canvas.silkScreen = false;
Canvas.digitalScreen = false;
Canvas.colorInImage = [];
Canvas.imageList = [];
Canvas.item_price = 0;
Canvas.collar = 0;
Canvas.menshirt = 0;
Canvas.sleeve = 0;
Canvas.cate_price = 0;
Canvas.polo_additional_price = 0;
Canvas.apron_additional_price = 0;
Canvas.design_price = 0;
Canvas.grade_price = 0;

Canvas.inch1 = 0;
Canvas.inch2 = 0;
// Canvas.totalAllAreaInch     = 0;
// Canvas.totalAllEmbroideryAreaInch    = 0;
// Canvas.totalAllDigitalScreenAreaInch = 0;
Canvas.polodata = "";
Canvas.tshirtdata = "";
Canvas.bagdata = "";
Canvas.aprondata = "";
Canvas.toolColor = "#8398a9";
Canvas.imageSmoothingEnabled = false;
//Canvas.renderOnAddRemove = true;
Canvas.textStyle = $(".show_nav");


if (!Canvas.production) {
    baseURL = localURL;
}
//Canvas.setBackgroundImage(baseURL+"assets/img/origami.jpg");

var fullWidth = 1650;
var fullHeight = 1650;

var SCALE_FACTOR = 1;
var scaleImg = 0.6;
var alphaTexture = 0.2;

var bagContainer;
var apronContainer;
var patternContainer;
var collarContainer;
var menshirtContainer;
var sleeveContainer;
var pocketContainer;

Canvas.MAX_ZOOM = 2.5;
Canvas.MIN_ZOOM = 0.8;
Canvas.GRID = 50;
Canvas.BOX_WIDTH = 200;
Canvas.BOX_HEIGHT = 330;
Canvas.BOX_TOP = 120;

Canvas.boundingBox = new fabric.Rect({
    fill: "transparent",
    width: Canvas.BOX_WIDTH,
    height: Canvas.BOX_HEIGHT,
    hasBorders: false,
    borderColor: Canvas.toolColor,
    lockMovementX: true,
    lockMovementY: true,
    evented: true,
    stroke: Canvas.toolColor,
    strokeLineCap: "round",
    strokeWidth: 2,
    selectable: false,
    opacity: 1
});
Canvas.inchBox = new fabric.Rect({
    fill: "transparent",
    width: 100,
    height: 20,
    hasBorders: false,
    borderColor: Canvas.toolColor,
    lockMovementX: true,
    lockMovementY: true,
    evented: true,
    stroke: Canvas.toolColor,
    strokeLineCap: "round",
    strokeWidth: 2,
    selectable: false,
    opacity: 0
});


// Canvas.GRID
for (var i = 0; i < (600 / Canvas.GRID); i++) {
    Canvas.add(new fabric.Line([i * Canvas.GRID, 0, i * Canvas.GRID, 600], {stroke: '#ccc', selectable: false, opacity: 0}));
    Canvas.add(new fabric.Line([0, i * Canvas.GRID, 600, i * Canvas.GRID], {stroke: '#ccc', selectable: false, opacity: 0}))
}
// end Canvas.GRID


var canvas = window._canvas = new fabric.Canvas('c');
canvas.selection = false;

// Do some initializing stuff
/*fabric.Object.prototype.set({
    transparentCorners: false,
    cornerColor: 'red',
    cornerSize: 12,
    padding: 0
});


Canvas.observe('object:scaling', function (e) {
	var obj = e.target;
  if(obj.getHeight() > obj.canvas.height || obj.getWidth() > obj.canvas.width){
	 // console.log("scale Xxxx");
   	//obj.setScaleY(obj.originalState.scaleY);
   	//obj.setScaleX(obj.originalState.scaleX);		
  }
  obj.setCoords();
  if(obj.getBoundingRect().top - (obj.cornerSize / 2) < 0 || 
  	obj.getBoundingRect().left -  (obj.cornerSize / 2) < 0) {
	  //console.log("scale X");
	  Canvas.boundingBox.set('stroke', 'red');
	  Canvas.renderAll();
    //obj.top = Math.max(obj.top, obj.top-obj.getBoundingRect().top + (obj.cornerSize / 2));
    //obj.left = Math.max(obj.left, obj.left-obj.getBoundingRect().left + (obj.cornerSize / 2));    
  }else{
		Canvas.boundingBox.set('stroke', Canvas.toolColor);  
		Canvas.renderAll();
  }
  if(obj.getBoundingRect().top+obj.getBoundingRect().height + obj.cornerSize  > obj.canvas.height || obj.getBoundingRect().left+obj.getBoundingRect().width + obj.cornerSize  > obj.canvas.width) {
 // console.log("scale Y");
 // Canvas.boundingBox.borderColor = 'red';
  Canvas.boundingBox.set('stroke', 'red');
  Canvas.renderAll();
    //obj.top = Math.min(obj.top, obj.canvas.height-obj.getBoundingRect().height+obj.top-obj.getBoundingRect().top - obj.cornerSize / 2);
   // obj.left = Math.min(obj.left, obj.canvas.width-obj.getBoundingRect().width+obj.left-obj.getBoundingRect().left - obj.cornerSize /2);    
  }else{
	Canvas.boundingBox.set('stroke', Canvas.toolColor);  
	Canvas.renderAll();
  }
});*/


Canvas.on("object:moving", function (e) {
    // snap to Canvas.GRID
    if (Canvas.snapToGrid) {
        e.target.set({
            left: Math.round(e.target.left / Canvas.GRID) * Canvas.GRID,
            top: Math.round(e.target.top / Canvas.GRID) * Canvas.GRID
        });
    }
    // end snap to Canvas.GRID
    var obj = e.target;
    var canvas = obj.canvas;
    var top = obj.top;
    var left = obj.left;
    var zoom = canvas.getZoom();
    var pan_x = canvas.viewportTransform[4];
    var pan_y = canvas.viewportTransform[5];

    // width & height we are constraining to must be calculated by applying the inverse of the current viewportTransform
    var c_width = canvas.width / zoom;
    var c_height = canvas.height / zoom;


    var w = obj.width * obj.scaleX;
    var left_adjust, right_adjust
    if (obj.originX == "center") {
        left_adjust = right_adjust = w / 2;
    } else {
        left_adjust = 0;
        right_adjust = w;
    }

    var h = obj.height * obj.scaleY;
    var top_adjust, bottom_adjust;
    if (obj.originY == "center") {
        top_adjust = bottom_adjust = h / 2;
    } else {
        top_adjust = 0;
        bottom_adjust = h;
    }

    // if you need margins set them here
    var top_margin = Canvas.boundingBox.top;
    var bottom_margin = canvas.height - (Canvas.boundingBox.height + Canvas.boundingBox.top);
    var left_margin = Canvas.boundingBox.left;
    var right_margin = canvas.width - (Canvas.boundingBox.width + Canvas.boundingBox.left);


    var top_bound = top_margin + top_adjust - pan_y;
    var bottom_bound = c_height - bottom_adjust - bottom_margin - pan_y;
    var left_bound = left_margin + left_adjust - pan_x;
    var right_bound = c_width - right_adjust - right_margin - pan_x;

    if (w > c_width) {
        obj.setLeft(left_bound);

    } else {
        obj.setLeft(Math.min(Math.max(left, left_bound), right_bound));

    }

    if (h > c_height) {
        obj.setTop(top_bound);

    } else {
        obj.setTop(Math.min(Math.max(top, top_bound), bottom_bound));

    }
    //Canvas.calculateInch();
});
//Canvas.on("after:render", function(e) {
Canvas.on("object:scaling", function (e) {
    // Canvas.calculateInch();
});

Canvas.box = new fabric.Rect({
    fill: Canvas.toolColor,
    width: Canvas.BOX_WIDTH,
    height: 30,
    left: Canvas.boundingBox.left,
    hasBorders: false,
    borderColor: Canvas.toolColor,
    lockMovementX: true,
    lockMovementY: true,
    evented: true,
    stroke: Canvas.toolColor,
    strokeLineCap: "round",
    strokeWidth: 1,
    selectable: false,
    opacity: 1
});
Canvas.printable_area = new fabric.Text("PRINTABLE AREA", {
    fontFamily: "Verdana",
    left: 0,
    top: 0,
    fontSize: 10,
    textAlign: "left",
    fill: "#fff",
    selectable: false
});
Canvas.inchText = new fabric.Text("10.9x17.9", {
    fontFamily: "Verdana",
    left: 0,
    top: 0,
    fontSize: 10,
    textAlign: "left",
    fill: "#fff",
    selectable: false
});

fabric.Canvas.prototype.customiseControls({
    tl: {
        action: 'drag',
        cursor: 'pointer'
    },
    tr: {
        action: 'rotate',
        cursor: 'pointer'
    },
    bl: {
        action: 'remove',
        cursor: 'pointer'
    },
    br: {
        action: 'scale',
        cursor: 'pointer'
    },
    ml: {
        action: 'scaleX',
        cursor: 'pointer'
    },
    mt: {
        action: 'scaleY',
        cursor: 'pointer'
    },
    mr: {
        action: 'scaleX',
        cursor: 'pointer'
    },
    mb: {
        action: 'scaleY',
        cursor: 'pointer'
    }/*,
    mt: {
        action: {
            'rotateByDegrees': 45
        }
    }*/
});


fabric.Object.prototype.customiseCornerIcons({
    settings: {
        borderColor: '#8398a9',
        cornerSize: 30,
        cornerShape: 'rect',
        cornerBackgroundColor: 'transparent',
        cornerPadding: 0

    },
    tl: {
        icon: baseURL + 'assets/tool/rotate_tl.png'
    },
    tr: {
        icon: baseURL + 'assets/tool/rotate_tr.png'
    },
    bl: {
        icon: baseURL + 'assets/tool/rotate_bl.png'
    },
    br: {
        icon: baseURL + 'assets/tool/rotate_br.png'
    },
    ml: {
        icon: baseURL + 'assets/tool/scale.png'
    },
    mt: {
        icon: baseURL + 'assets/tool/scale.png'
    },
    mr: {
        icon: baseURL + 'assets/tool/scale.png'
    },
    mb: {
        icon: baseURL + 'assets/tool/scale.png'
    }
});

Canvas.on('mouse:move', function () {
    //console.log('mouse:move');

    // Canvas.renderAll();
    // Canvas.calcOffset();
});
Canvas.on('mouse:down', function () {
    //Canvas.hideBox();
    //var currentObj = Canvas.getActiveObject();
    //Canvas.deactivateAll();
    //var ctx = Canvas.getContext("2d");
    //var data = ctx.getImageData(Canvas.boundingBox.left+1, Canvas.boundingBox.top+1, Canvas.boundingBox.width-1, Canvas.boundingBox.height-1).data;
    //Canvas.getNumOfColor(data);
    //if(currentObj)Canvas.setActiveObject(currentObj);
    //Canvas.showBox();
});


Canvas.on('after:render', function () {

    this.calcOffset();
    Canvas.calculateInch();

});

window.onkeydown = onKeyDownHandler;

function onKeyDownHandler(e) {

    switch (e.keyCode) {
        case 8 || 46: // delete
            var activeObject = Canvas.getActiveObject();
            if (activeObject && activeObject.type != "text" && activeObject.type != "curvedText") Canvas.remove(activeObject);
            return;
    }
};


Canvas.init = function () {


    bagContainer = new fabric.Group();
    apronContainer = new fabric.Group();
    patternContainer = new fabric.Group();
    collarContainer = new fabric.Group();
    menshirtContainer = new fabric.Group();
    sleeveContainer = new fabric.Group();
    pocketContainer = new fabric.Group();


    Canvas.add(patternContainer);
    Canvas.add(collarContainer);
    Canvas.add(menshirtContainer);
    Canvas.add(sleeveContainer);
    Canvas.add(pocketContainer);
    Canvas.add(apronContainer);
    Canvas.add(bagContainer);

    Canvas.addDefaultBox();
    //Canvas.controlsAboveOverlay = true;
    Canvas.isGrabMode = false;


    /*var site_url =  'http://fabricjs.com/assets/2.svg';

    fabric.loadSVGFromURL(site_url, function(objects) {
              var group = new fabric.PathGroup(objects, {
              selectable:false,
              left: 165,
              top: 100,
              width: 500,
              height: 520
            });

        Canvas.remove(group);
        Canvas.clipTo = function(ctx) {
            group.render(ctx);

        };
        Canvas.renderAll();
    }); */


    Canvas.renderAll();
    Canvas.calcOffset();
}
Canvas.zoomForCollar = function () {
    if (isMobile.any()) return;
    Canvas.resetZoom();
    Canvas.viewport.position.x = 0;
    Canvas.viewport.position.y = 170;
    //Canvas.zoomToPoint(new fabric.Point((Canvas.width / 2)-200, (Canvas.height / 2)), 2);
    Canvas.setZoom(2);
    Canvas.renderAll();
    Canvas.calcOffset();
}
Canvas.zoomForMenshirt = function () {
    if (isMobile.any()) return;
    Canvas.resetZoom();
    Canvas.viewport.position.x = 0;
    Canvas.viewport.position.y = 170;
    //Canvas.zoomToPoint(new fabric.Point(Canvas.width / 2, 200), Canvas.getZoom()*2.2);
    Canvas.setZoom(2);
    Canvas.renderAll();
    Canvas.calcOffset();
}
Canvas.zoomForSleeve = function () {
    if (isMobile.any()) return;
    Canvas.resetZoom();
    Canvas.viewport.position.x = 120;
    Canvas.viewport.position.y = 50;
    Canvas.setZoom(2);
    Canvas.renderAll();
    Canvas.calcOffset();
}
Canvas.zoomIn = function () {
    if (isMobile.any()) return;
    //zoomIn
    /*var x = Canvas.width / 2;
    var y = Canvas.height / 2;
    Canvas.zoomToPoint(new fabric.Point(x, y), Canvas.getZoom() * 1.1);*/
    if (Canvas.viewport.zoom > Canvas.MAX_ZOOM) {
        //alert("Maximum Zoom In");
        return;
    }
    Canvas.setZoom(Canvas.viewport.zoom * 1.1);
    //Canvas.zoomToPoint(new fabric.Point(Canvas.width / 2, Canvas.height / 2), Canvas.getZoom()*1.1);
    Canvas.renderAll();
    Canvas.calcOffset();


}
Canvas.zoomOut = function () {
    if (isMobile.any()) return;
    //zoomOut
    /*var x = Canvas.width / 2;
    var y = Canvas.height / 2;
    Canvas.zoomToPoint(new fabric.Point(x, y), Canvas.getZoom() / 1.1);*/

    if (Canvas.viewport.zoom < Canvas.MIN_ZOOM) {
        //alert("Minimum Zoom Out");
        return;
    }
    //Canvas.zoomToPoint(new fabric.Point(Canvas.width / 2, Canvas.height / 2), Canvas.getZoom()/1.1);
    Canvas.setZoom(Canvas.viewport.zoom / 1.1);
    Canvas.renderAll();
    Canvas.calcOffset();


}
Canvas.resetZoom = function () {
    if (isMobile.any()) return;
    //Canvas.zoomToPoint(new fabric.Point(0, 0), 1);
    //Canvas.zoomToPoint(new fabric.Point(500 / 2, 520 / 2), 1);
    Canvas.viewport.position.x = 0;
    Canvas.viewport.position.y = 0;
    //Canvas.setZoom(1);
    //Canvas.setHeight(Canvas.getHeight() /canvas.getZoom() );
    //Canvas.setWidth(Canvas.getWidth() / canvas.getZoom() );
    Canvas.setZoom(1);
    Canvas.renderAll();
    Canvas.calcOffset();

    Canvas.viewport.position.x = 0;
    Canvas.viewport.position.y = 0;
    Canvas.setZoom(1);
}

Canvas.fullScreen = function () {

    Canvas.isFullscreen = (Canvas.isFullscreen) ? false : true;
    var canvasFullScreen = Canvas.getSelectionElement().parentNode.parentNode.parentNode;
    console.log(Canvas.isFullscreen);
    if (!Canvas.isFullscreen) {
        if (canvasFullScreen.requestFullScreen) {
            canvasFullScreen.requestFullScreen();
        }
        else if (canvasFullScreen.webkitRequestFullScreen) {
            canvasFullScreen.webkitRequestFullScreen();
        }
        else if (canvasFullScreen.mozRequestFullScreen) {
            canvasFullScreen.mozRequestFullScreen();
        }
    } else {
        if (canvasFullScreen.cancelFullScreen) {
            canvasFullScreen.cancelFullScreen();
        }
        else if (canvasFullScreen.webkitCancelFullScreen) {
            canvasFullScreen.webkitCancelFullScreen();
        }
        else if (canvasFullScreen.mozCancelFullScreen) {
            canvasFullScreen.mozCancelFullScreen();
        }
    }
}

Canvas.loadTypeImage = function (url, callback, id, index, i) {
    var request = $.ajax({
        url: url,
        crossDomain: true,
        type: "HEAD",
        cache: true,
    });
    request.done(function () {
        var loader = fabric.Image.fromURL(url, function (img) {
            img.scale(scaleImg).setFlipX(false);
            img.selectable = false;
            img.opacity = 1;
            /*img.lockMovementX = true;
              img.lockMovementY = true;
            img.evented = false;*/
            Canvas.centerObject(img);
            if (id == "#pattern") {
                patternContainer.add(img);
            } else if (id == "#collar") {
                collarContainer.add(img);
            } else if (id == "#menshirt") {
                menshirtContainer.add(img);
            } else if (id == "#sleeve") {
                sleeveContainer.add(img);
            } else if (id == "#pocket") {
                pocketContainer.add(img);
            } else if (id == "#apron") {
                apronContainer.add(img);
            } else if (id == "#bag") {
                bagContainer.add(img);
            }

            Canvas.renderAll();
            if (callback != null) callback(img, id, index, i);
        });

    });
}


Canvas.loadBringToFront = function (url, callback, opacity) {
    url = baseURL + url;
    var request = $.ajax({
        url: url,
        crossDomain: true,
        type: "HEAD",
        cache: true,
    });
    request.done(function () {
        var loader = fabric.Image.fromURL(url, function (img) {
            img.scale(scaleImg).setFlipX(false);
            img.selectable = false;
            img.opacity = opacity;
            Canvas.centerObject(img);
            Canvas.add(img);
            img.bringToFront();
            Canvas.renderAll();
            if (callback != null) callback(img);
            // โหลดรูปใหม่ทุกครั้งให้ ย้าย Canvas ไปไว้บนสุด
            Canvas.bringAllToFront();
            ImageTool.bringAllToFront();
        });

    });

}
Canvas.loadBringToBack = function (url, callback, opacity) {
    url = baseURL + url;
    var request = $.ajax({
        url: url,
        crossDomain: true,
        type: "HEAD",
        cache: true,
    });
    request.done(function () {
        var loader = fabric.Image.fromURL(url, function (img) {
            img.scale(scaleImg).setFlipX(false);
            img.selectable = false;
            img.opacity = opacity;
            Canvas.centerObject(img);
            Canvas.add(img);
            img.sendToBack();
            Canvas.renderAll();
            if (callback != null) callback(img);
        });

    });
}

Canvas.setColor = function (obj, color) {
    //Tool.currentColor = "#"+((1<<24)*Math.random()|0).toString(16);
    //Tool.setCurrentObjectActive();
    //console.log("color : "+color);
    if (obj) {
        filter = new fabric.Image.filters.Multiply({
            color: color
        });
        obj.filters = [];
        obj.filters.push(filter);
        obj.applyFilters(Canvas.renderAll.bind(Canvas));
    }
}
Canvas.clearDefaultItems = function (type) {
    if (type == "#pattern") {
        patternContainer.forEachObject(function (obj) {
            patternContainer.remove(patternContainer.item(0));
        });
    } else if (type == "#collar") {
        collarContainer.forEachObject(function (obj) {
            collarContainer.remove(collarContainer.item(0));
        });
    } else if (type == "#menshirt") {
        menshirtContainer.forEachObject(function (obj) {
            menshirtContainer.remove(menshirtContainer.item(0));
        });
    } else if (type == "#sleeve") {
        sleeveContainer.forEachObject(function (obj) {
            sleeveContainer.remove(sleeveContainer.item(0));
        });
    } else if (type == "#pocket") {
        pocketContainer.forEachObject(function (obj) {
            pocketContainer.remove(pocketContainer.item(0));
        });
    } else if (type == "#apron") {
        apronContainer.forEachObject(function (obj) {
            apronContainer.remove(apronContainer.item(0));
        });
    } else if (type == "#bag") {
        bagContainer.forEachObject(function (obj) {
            bagContainer.remove(bagContainer.item(0));
        });
    }

    Canvas.renderAll();
}
Canvas.clearAllContainer = function (type) {
    // ลบทุกอย่างออกก่อนเปลี่ยนโปรดัค
    POLO.clear();
    TSHIRT.clear();

    patternContainer.forEachObject(function (obj) {
        patternContainer.remove(patternContainer.item(0));
    });

    collarContainer.forEachObject(function (obj) {
        collarContainer.remove(collarContainer.item(0));
    });

    menshirtContainer.forEachObject(function (obj) {
        menshirtContainer.remove(menshirtContainer.item(0));
    });

    sleeveContainer.forEachObject(function (obj) {
        sleeveContainer.remove(sleeveContainer.item(0));
    });

    pocketContainer.forEachObject(function (obj) {
        pocketContainer.remove(pocketContainer.item(0));
    });

    apronContainer.forEachObject(function (obj) {
        apronContainer.remove(apronContainer.item(0));
    });

    bagContainer.forEachObject(function (obj) {
        bagContainer.remove(bagContainer.item(0));
    });
    Canvas.renderAll();
}


Canvas.hideBox = function () {


    $("#txt").val("");
    ImageTool.typing_num = 0;
    Canvas.inchText.opacity = 0;
    Canvas.box.opacity = 0;
    Canvas.boundingBox.opacity = 0;
    Canvas.printable_area.opacity = 0;
    Canvas.deactivateAll();
    Canvas.renderAll();
}
Canvas.showBox = function () {

    Canvas.inchText.opacity = 1;
    Canvas.box.opacity = 1;
    Canvas.boundingBox.opacity = 1;
    Canvas.printable_area.opacity = 1;
    Canvas.renderAll();
}

Canvas.bringAllToFront = function () {
    Canvas.boundingBox.bringToFront();
    Canvas.box.bringToFront();
    Canvas.printable_area.bringToFront();
    Canvas.inchBox.bringToFront();
    Canvas.inchText.bringToFront();

    if (Canvas.product_id == 1 || Canvas.product_id == 2) {
        if (Canvas.application_flip == "front") {
            Canvas.setBoundingBox(Canvas.BOX_WIDTH, Canvas.BOX_HEIGHT, Canvas.BOX_TOP);
        } else if (Canvas.application_flip == "back") {
            Canvas.setBoundingBox(Canvas.BOX_WIDTH, Canvas.BOX_HEIGHT + 60, Canvas.BOX_TOP - 50);
        } else {
            Canvas.setBoundingBox(100, 200, 50);
        }
    } else if (Canvas.product_id == 3) {
        Canvas.setBoundingBox(150, 220, 210);
    } else if (Canvas.product_id == 4) {
        Canvas.setBoundingBox(150, 200, 230);
    }

    Canvas.renderAll();
}
Canvas.setBoundingBox = function (w, h, t) {
    Canvas.box.width = Canvas.boundingBox.width = w;
    Canvas.boundingBox.height = h;
    Canvas.centerObject(Canvas.boundingBox);
    Canvas.centerObject(Canvas.box);
    Canvas.boundingBox.top = t;
    Canvas.box.top = (Canvas.boundingBox.top + Canvas.boundingBox.height);

    Canvas.printable_area.top = (Canvas.boundingBox.top + Canvas.boundingBox.height) + 10;
    Canvas.printable_area.left = Canvas.boundingBox.left + 5


    Canvas.inchText.setTop(Canvas.box.top - Canvas.inchText.height);
    Canvas.inchText.setLeft(Canvas.printable_area.left);
    /*Canvas.boundingBox.animate('width', w, {
      duration: 1000,
      onChange: Canvas.renderAll.bind(Canvas),
      onComplete: function() {
       
      },
      easing: fabric.util.ease.easeInQuad
    });*/
}
Canvas.calculateInch = function (obj) {
    // Inch Box
    if (!obj) {
        obj = Canvas.getActiveObject();
    }
    if (obj) {
        //console.log(obj);
        // console.log(Canvas._currentTransform);
        //var top = (obj.top+(obj.getHeight()/2));
        // var left = obj.left-(Canvas.inchBox.width/2);
        // Canvas.inchBox.setTop(top);
        // Canvas.inchBox.setLeft(left);

        // var left = obj.left-(Canvas.inchText.width/2);

        //Canvas.inchText.setTop(top);
        //Canvas.inchText.setLeft(left);

        var maxInchWidth = 11.9;
        var maxInchHeight = 17.9;

        var percentWidth = (obj.getWidth() * 100) / fullWidth;
        var percentHeight = (obj.getHeight() * 100) / fullHeight;

        Canvas.inch1 = (percentWidth);
        Canvas.inch2 = (percentHeight);
        //console.log(obj);
        obj.inch1 = Canvas.inch1;
        obj.inch2 = Canvas.inch2;

        var endInh = 27;
        var widthInh = 5,
            heightInh = 5;

        if (Canvas.product_id == 1 || Canvas.product_id == 2) {
            if (Canvas.application_flip == "front") {
                widthInh = 12.13;
                heightInh = 20;
            } else if (Canvas.application_flip == "back") {
                widthInh = 12.13;
                heightInh = 23.57;
            } else if (Canvas.application_flip == "left") {
                widthInh = 6.07;
                heightInh = 12;
            } else if (Canvas.application_flip == "right") {
                widthInh = 6.07;
                heightInh = 12;
            }
        } else if (Canvas.product_id == 3) {
            widthInh = 9.1;
            heightInh = 13.34;
        } else {
            widthInh = 9.1;
            heightInh = 12.13;
        }

        if (obj.inch1 > widthInh || obj.inch2 > heightInh) {
            Canvas.boundingBox.set('stroke', 'red');
        } else {
            Canvas.boundingBox.set('stroke', Canvas.toolColor);
        }

        Canvas.inchText.setText(Canvas.inch1.toFixed(1) + "'x" + Canvas.inch2.toFixed(1) + "'");

    }

    Canvas.totalAllEmbroideryAreaInch = 0;
    Canvas.totalAllDigitalScreenAreaInch = 0;

    /**
     * คำนวนพื้นที่รวมของงานปัก, digital screen
     **/
    var num_image = Canvas.imageList.length;

    var allDigitalScreenAreaTop = [];
    var allDigitalScreenAreaBotoom = [];
    var allDigitalScreenAreaLeft = [];
    var allDigitalScreenAreaRight = [];

    var allEmbroideryAreaTop = [];
    var allEmbroideryAreaBotoom = [];
    var allEmbroideryAreaLeft = [];
    var allEmbroideryAreaRight = [];

    for (var i = 0; i < num_image; i++) {
        var boundingRect = Canvas.imageList[i].getBoundingRect();

        var rectTop = Math.round(boundingRect.top),
            rectBottom = Math.round(boundingRect.top) + Math.round(boundingRect.height),
            rectLeft = Math.round(boundingRect.left),
            rectRight = Math.round(boundingRect.left) + Math.round(boundingRect.width);

        // var rectTop   = Canvas.imageList[i].oCoords.tl.y,
        //   rectBottom  = Canvas.imageList[i].oCoords.tl.y + Canvas.imageList[i].getHeight(),
        //   rectLeft    = Canvas.imageList[i].oCoords.bl.x,
        //   rectRight   = Canvas.imageList[i].oCoords.bl.x + Canvas.imageList[i].getWidth();

        if (Canvas.imageList[i].digitalScreen == true) {
            // งานปัก
            allDigitalScreenAreaTop.push(rectTop);
            allDigitalScreenAreaBotoom.push(rectBottom);
            allDigitalScreenAreaLeft.push(rectLeft);
            allDigitalScreenAreaRight.push(rectRight);

        } else if (Canvas.imageList[i].digitalScreen == false && Canvas.imageList[i].silkScreen == false) {
            // งาน digital screen
            allEmbroideryAreaTop.push(rectTop);
            allEmbroideryAreaBotoom.push(rectBottom);
            allEmbroideryAreaLeft.push(rectLeft);
            allEmbroideryAreaRight.push(rectRight);
        }
    }

    /** Start Embroidery **/
    var minEmbroideryTop = Math.min.apply(Math, allEmbroideryAreaTop),
        maxEmbroideryBottom = Math.max.apply(Math, allEmbroideryAreaBotoom),
        minEmbroideryLeft = Math.min.apply(Math, allEmbroideryAreaLeft),
        maxEmbroideryRight = Math.max.apply(Math, allEmbroideryAreaRight),
        allEmbroideryAreaWidth = maxEmbroideryRight - minEmbroideryLeft,
        allEmbroideryAreaHeight = maxEmbroideryBottom - minEmbroideryTop;

    if (allEmbroideryAreaWidth != 0 && allEmbroideryAreaHeight != 0) {
        var percentEmbroideryWidth = (allEmbroideryAreaWidth * 100) / fullWidth;
        var percentEmbroideryHeight = (allEmbroideryAreaHeight * 100) / fullHeight;

        // 1.2121 are padding of boundingarea
        Canvas.allEmbroideryAreaInch1 = (percentEmbroideryWidth) - 1.212121;
        Canvas.allEmbroideryAreaInch2 = (percentEmbroideryHeight) - 1.212121;

        var ETotalInch = Canvas.allEmbroideryAreaInch1 * Canvas.allEmbroideryAreaInch2;
        var totalAllEmbroideryAreaInch = Math.round(ETotalInch);

        Canvas.totalAllEmbroideryAreaInch = totalAllEmbroideryAreaInch;
    }
    /** End Embroidery **/

    /** Start Digital Screen **/
    var minDigitalScreenTop = Math.min.apply(Math, allDigitalScreenAreaTop),
        maxDigitalScreenBottom = Math.max.apply(Math, allDigitalScreenAreaBotoom),
        minDigitalScreenLeft = Math.min.apply(Math, allDigitalScreenAreaLeft),
        maxDigitalScreenRight = Math.max.apply(Math, allDigitalScreenAreaRight),
        allDigitalScreenAreaWidth = maxDigitalScreenRight - minDigitalScreenLeft,
        allDigitalScreenAreaHeight = maxDigitalScreenBottom - minDigitalScreenTop;

    if (allDigitalScreenAreaWidth != 0 && allDigitalScreenAreaHeight != 0) {
        var percentDigitalScreenWidth = (allDigitalScreenAreaWidth * 100) / fullWidth;
        var percentDigitalScreenHeight = (allDigitalScreenAreaHeight * 100) / fullHeight;

        // 1.2121 is padding of boundingarea
        Canvas.allDigitalScreenAreaInch1 = percentDigitalScreenWidth - 1.212121;
        Canvas.allDigitalScreenAreaInch2 = percentDigitalScreenHeight - 1.212121;

        var DSTotalInch = Canvas.allDigitalScreenAreaInch1 * Canvas.allDigitalScreenAreaInch2;
        var totalAllDigitalScreenAreaInch = Math.round(DSTotalInch);

        Canvas.totalAllDigitalScreenAreaInch = totalAllDigitalScreenAreaInch;
    }
    /** End Digital Screen **/

    // var minTop  = allAreaTop.min(),
    //   maxBottom = allAreaBotoom.max(),
    //   minLeft   = allAreaLeft.min(),
    //   maxRight  = allAreaRight.max(),
    //   allAreaWidth  = maxRight - minLeft,
    //   allAreaHeight = maxBottom - minTop;

    //  var fullWidth = 1650;
    //  var fullHeight = 1650;
    //  var percentWidth = (allAreaWidth*100)/fullWidth;
    //  var percentHeight = (allAreaHeight*100)/fullHeight;

    //  Canvas.allAreaInch1 = (percentWidth);
    //  Canvas.allAreaInch2 = (percentHeight);

    // var totalAllAreaInch = Math.round(Canvas.allAreaInch1*Canvas.allAreaInch2);
    // // console.log(totalAllAreaInch);

    // Canvas.totalAllAreaInch = totalAllAreaInch;


    Canvas.calculateSubTotal();
}
Canvas.addDefaultBox = function () {
    Canvas.centerObject(Canvas.boundingBox);
    Canvas.add(Canvas.boundingBox);
    Canvas.centerObject(Canvas.box);
    Canvas.add(Canvas.box);
    Canvas.box.top = (Canvas.boundingBox.top + Canvas.boundingBox.height);

    Canvas.centerObject(Canvas.printable_area);
    Canvas.printable_area.top = (Canvas.boundingBox.top + Canvas.boundingBox.height) + 10;
    Canvas.printable_area.left = Canvas.boundingBox.left + 5;
    Canvas.add(Canvas.printable_area);
    Canvas.add(Canvas.inchBox);
    Canvas.add(Canvas.inchText);
    Canvas.hideBox();
}

Canvas.resetDefaultImage = function () {

    Canvas.forEachObject(function (obj) {

        if (obj.type == "image" && obj.typetool != ImageTool.typetool) {
            Canvas.remove(obj);
        }

        if (obj.typetool == ImageTool.typetool) {
            if (obj.application_flip != Canvas.application_flip || obj.product_id != Canvas.product_id) {
                obj.visible = false;
            } else {
                obj.visible = true;
                obj.bringToFront();
            }
        }
        Canvas.renderAll();
        //ImageTool.bringAllToFront();
    });
}

Canvas.loadPattern = function (json) {
    var pattern = [];
    if (json) {
        patternContainer.forEachObject(function (obj) {
            patternContainer.remove(patternContainer.item(0));
        });
        pattern = JSON.parse(json);
    }
    fabric.util.enlivenObjects(pattern, function (objects) {
        objects.forEach(function (o) {
            patternContainer.add(o);
        });
        Canvas.renderAll();
    });
}

Canvas.calculateSubTotal = function () {
    if (Canvas.isSaving) {
        return;
    }
    var price_per_color = 10; // ราคาต่อสีสำหรับสกรีนโลโก้
    var price_per_inch = 2.5; // ราคาต่อนิ้วกรณีเกิน 10 นิ้ว

    // ปัก
    var standad_inch = 10; // จำนวนนิ้วต่ำสุด
    var start_price_for_image = 25; // ราคาปัก กรณีต่ำกว่า 10 นิ้ว

    // digital
    var standad_digital_inch = 10; // จำนวนนิ้วต่ำสุด
    var start_digital_price_for_image = 30; // ราคา digital screen กรณีต่ำกว่า 10 นิ้ว
    var max_digital_price_for_image = 150; //ราคาเต็ม digital screen
    var digital_price_per_inch = 1; //ราคา digital screen ต่นิ้ว

    var total_inch = 0;
    var total_image_price = 0;
    var item_price = parseInt(Canvas.collar) + parseInt(Canvas.menshirt) + parseInt(Canvas.sleeve) + parseInt(Canvas.item_price) + parseInt(Canvas.cate_price);
    var grade_price = Canvas.grade_price;

    var hasNumColor = false;
    var num_image = 0;
    var image_price = [];
    var color_price = [];
    var subtotal = 0;
    var num_color = 0;
    var max_num_color = 8;
    var isDuplicate = false;
    var isDuplicateStroke = false;
    //console.log(Canvas.imageList);
    num_image = Canvas.imageList.length;

    var frontImageList = new Array();
    var backImageList = new Array();
    var leftImageList = new Array();
    var rightImageList = new Array();

    // สำหรับคำนวนกบัพื้นที่โดยรวมว่าอะไรถูกกว่ากัน
    var EPrice = 0;
    var DSPrice = 0;
    var EAllAreaPrice = 0;
    var DSAllAreaPrice = 0;

    // toy do here
    // console.log('startfor');
    for (var i = 0; i < num_image; i++) {

        //if(Canvas.imageList[i].product_id == Canvas.product_id){
        //console.log(Canvas.imageList[i].silkScreen);
        // console.log(Canvas.imageList[i]);
        if (Canvas.imageList[i].silkScreen == true) {
            // console.log('silk');
            // เข้าเงื่อนไข กรณีสกรีน
            var w = Canvas.imageList[i].width;
            var h = Canvas.imageList[i].height;
            //console.log(Canvas.imageList[i]);
            var top = Canvas.imageList[i].top - (w / 2);
            var left = Canvas.imageList[i].left - (h / 2);
            //patternContainer.set({opacity:0});
            //Canvas.renderAll();
            var ctx = Canvas.getContext("2d");
            var data = ctx.getImageData(top, left, w, h).data;

            //console.log(Canvas.imageList[i].application_flip);

            if (Canvas.imageList[i].application_flip == "front") {
                if (Canvas.imageList[i].type == "text" || Canvas.imageList[i].type == "curvedText") {
                    frontImageList.push(Canvas.imageList[i].fill);
                    if (Canvas.imageList[i].stroke && Canvas.imageList[i].strokeWidth > 0) {
                        frontImageList.push(Canvas.imageList[i].stroke);
                    }
                } else if (Canvas.imageList[i].type == "path-group") {
                    for (var p = 0; p < Canvas.imageList[i].paths.length; p++) {
                        frontImageList.push(Canvas.imageList[i].paths[p].fill);
                        if (Canvas.imageList[i].paths[p].stroke && Canvas.imageList[i].paths[p].strokeWidth > 0) {
                            frontImageList.push(Canvas.imageList[i].paths[p].stroke);
                        }
                    }
                } else {
                    //console.log("Canvas.imageList[i].num_color : "+Canvas.imageList[i].num_color);
                    if (Canvas.imageList[i].num_color.length) {
                        //frontImageList.push(Canvas.imageList[i].num_color);
                        var arr = Canvas.imageList[i].num_color;
                        for (var p = 0; p < arr.length; p++) {
                            frontImageList.push(arr[p]);
                        }
                    } else {
                        var arr = new Array();
                        arr = Canvas.getNumOfColor(data, Canvas.imageList[i]);
                        if (typeof arr != 'undefined' || arr != null) {
                            for (var p = 0; p < arr.length; p++) {
                                frontImageList.push(arr[p]);
                            }
                        }
                    }
                }
            }

            if (Canvas.imageList[i].application_flip == "back") {
                if (Canvas.imageList[i].type == "text" || Canvas.imageList[i].type == "curvedText") {
                    backImageList.push(Canvas.imageList[i].fill);
                    if (Canvas.imageList[i].stroke && Canvas.imageList[i].strokeWidth > 0) {
                        backImageList.push(Canvas.imageList[i].stroke);
                    }
                } else if (Canvas.imageList[i].type == "path-group") {
                    for (var p = 0; p < Canvas.imageList[i].paths.length; p++) {
                        backImageList.push(Canvas.imageList[i].paths[p].fill);
                        if (Canvas.imageList[i].paths[p].stroke && Canvas.imageList[i].paths[p].strokeWidth > 0) {
                            backImageList.push(Canvas.imageList[i].paths[p].stroke);
                        }
                    }
                } else {
                    //console.log("Canvas.imageList[i].num_color : "+Canvas.imageList[i].num_color);
                    if (Canvas.imageList[i].num_color.length) {
                        //frontImageList.push(Canvas.imageList[i].num_color);
                        var arr = Canvas.imageList[i].num_color;
                        for (var p = 0; p < arr.length; p++) {
                            backImageList.push(arr[p]);
                        }
                    } else {
                        var arr = new Array();
                        arr = Canvas.getNumOfColor(data, Canvas.imageList[i]);
                        for (var p = 0; p < arr.length; p++) {
                            backImageList.push(arr[p]);
                        }
                    }
                }
            }


            if (Canvas.imageList[i].application_flip == "left") {
                if (Canvas.imageList[i].type == "text" || Canvas.imageList[i].type == "curvedText") {
                    leftImageList.push(Canvas.imageList[i].fill);
                    if (Canvas.imageList[i].stroke && Canvas.imageList[i].strokeWidth > 0) {
                        leftImageList.push(Canvas.imageList[i].stroke);
                    }
                } else if (Canvas.imageList[i].type == "path-group") {
                    for (var p = 0; p < Canvas.imageList[i].paths.length; p++) {
                        leftImageList.push(Canvas.imageList[i].paths[p].fill);
                        if (Canvas.imageList[i].paths[p].stroke && Canvas.imageList[i].paths[p].strokeWidth > 0) {
                            leftImageList.push(Canvas.imageList[i].paths[p].stroke);
                        }
                    }
                } else {
                    //console.log("Canvas.imageList[i].num_color : "+Canvas.imageList[i].num_color);
                    if (Canvas.imageList[i].num_color.length) {
                        //frontImageList.push(Canvas.imageList[i].num_color);
                        var arr = Canvas.imageList[i].num_color;
                        for (var p = 0; p < arr.length; p++) {
                            leftImageList.push(arr[p]);
                        }
                    } else {
                        var arr = new Array();
                        arr = Canvas.getNumOfColor(data, Canvas.imageList[i]);
                        for (var p = 0; p < arr.length; p++) {
                            leftImageList.push(arr[p]);
                        }
                    }
                }
            }


            if (Canvas.imageList[i].application_flip == "right") {
                if (Canvas.imageList[i].type == "text" || Canvas.imageList[i].type == "curvedText") {
                    rightImageList.push(Canvas.imageList[i].fill);
                    if (Canvas.imageList[i].stroke && Canvas.imageList[i].strokeWidth > 0) {
                        rightImageList.push(Canvas.imageList[i].stroke);
                    }
                } else if (Canvas.imageList[i].type == "path-group") {
                    for (var p = 0; p < Canvas.imageList[i].paths.length; p++) {
                        rightImageList.push(Canvas.imageList[i].paths[p].fill);
                        if (Canvas.imageList[i].paths[p].stroke && Canvas.imageList[i].paths[p].strokeWidth > 0) {
                            rightImageList.push(Canvas.imageList[i].paths[p].stroke);
                        }
                    }
                } else {
                    //console.log("Canvas.imageList[i].num_color : "+Canvas.imageList[i].num_color);
                    if (Canvas.imageList[i].num_color.length) {
                        //frontImageList.push(Canvas.imageList[i].num_color);
                        var arr = Canvas.imageList[i].num_color;
                        for (var p = 0; p < arr.length; p++) {
                            rightImageList.push(arr[p]);
                        }
                    } else {
                        var arr = new Array();
                        arr = Canvas.getNumOfColor(data, Canvas.imageList[i]);
                        for (var p = 0; p < arr.length; p++) {
                            rightImageList.push(arr[p]);
                        }
                    }
                }
            }

            //console.log(Canvas.imageList[i]);
            //console.log("stroke : "+Canvas.imageList[i].stroke);


            /*if(Canvas.imageList[i].num_color>0){
                //console.log(" Canvas.imageList[i].num_color : "+Canvas.imageList[i].num_color);

                color_price.push(Canvas.imageList[i].num_color);

            }else{

                if(Canvas.imageList[i].type == "text" || Canvas.imageList[i].type == "curvedText"){
                    // ตรวจสอบสีพื้น
                    for(var a = 0;a<newImageList.length;a++){
                        if(Canvas.imageList[i].fill == newImageList[a]){
                            isDuplicate = true;
                        }
                    }
                    if(!isDuplicate){
                        newImageList.push(Canvas.imageList[i].fill);
                        color_price.push(1);
                    }
                    isDuplicate = false;
                    // ตรวจสอบสีเส้นขอบ
                    if(Canvas.imageList[i].stroke && Canvas.imageList[i].strokeWidth > 0){
                        for(var a = 0;a<newImageList.length;a++){
                            if(Canvas.imageList[i].stroke == newImageList[a]){
                                isDuplicateStroke = true;
                            }
                        }
                        if(!isDuplicateStroke){
                            newImageList.push(Canvas.imageList[i].stroke);
                            color_price.push(1);
                        }
                        console.log("isDuplicateStroke : "+isDuplicateStroke);
                    }
                    isDuplicateStroke = false;
                }else{
                    console.log("clip : "+Canvas.getNumOfColor(data,Canvas.imageList[i]));
                    if(Canvas.getNumOfColor(data,Canvas.imageList[i])<=0){
                        // ตรวจสอบสีเส้นพื้น
                        for(var a = 0;a<newImageList.length;a++){
                            if(Canvas.imageList[i].fill == newImageList[a]){
                                isDuplicate = true;
                            }
                        }
                        if(!isDuplicate){
                            newImageList.push(Canvas.imageList[i].fill);
                            color_price.push(1);
                        }
                        isDuplicate = false;
                        // ตรวจสอบสีเส้นขอบ
                        if(Canvas.imageList[i].stroke && Canvas.imageList[i].strokeWidth > 0){
                            for(var a = 0;a<newImageList.length;a++){
                                if(Canvas.imageList[i].stroke == newImageList[a]){
                                    isDuplicateStroke = true;
                                }
                            }
                            if(!isDuplicateStroke){
                                newImageList.push(Canvas.imageList[i].stroke);
                                color_price.push(1);
                            }
                            console.log("isDuplicateStroke : "+isDuplicateStroke);
                        }
                        isDuplicateStroke = false;
                    }else{
                        //var colorThief = new ColorThief();
                        //var colorlist = colorThief.getColor(Canvas.imageList[i]._originalElement,0);
                        //console.log(colorlist);
                        //color_price.push(colorlist);
                        newImageList.push(Canvas.getNumOfColor(data,Canvas.imageList[i]));
                        color_price.push(Canvas.getNumOfColor(data,Canvas.imageList[i]));
                    }
                }

            }
            hasNumColor = true;*/
            //console.log(num_color);
            //console.log(Canvas.imageList);
        } else if (Canvas.imageList[i].digitalScreen == true) {
            // console.log('digital');
            // เข้าเงื่อนไข กรณี Digital สกรีน
            var inch1 = Canvas.imageList[i].inch1;
            var inch2 = Canvas.imageList[i].inch2;

            total_inch = inch1 * inch2;
            total_inch = Math.round(total_inch);

            if (total_inch <= standad_digital_inch) {
                image_price[i] = start_digital_price_for_image;
            } else {
                image_price[i] = ((total_inch - standad_digital_inch) * digital_price_per_inch) + start_digital_price_for_image;
            }

            if (image_price[i] >= max_digital_price_for_image) {
                image_price[i] = max_digital_price_for_image;
            }

            DSPrice += image_price[i];

        } else {
            // console.log('embroidery');
            var inch1 = Canvas.imageList[i].inch1;
            var inch2 = Canvas.imageList[i].inch2;
            //console.log("inch1 : "+inch1);
            //console.log("inch2 : "+inch2);
            total_inch = inch1 * inch2;
            total_inch = Math.round(total_inch);
            //total_inch = Math.round(inch1)*Math.round(inch2);
            // console.log("total_inch : "+total_inch);
            if (total_inch <= standad_inch) {
                image_price[i] = start_price_for_image;
            } else {
                image_price[i] = ((total_inch - standad_inch) * price_per_inch) + start_price_for_image;
            }
            //console.log("total_inch : "+total_inch);
            //console.log("image_price : "+image_price.length+" : "+image_price);

            EPrice += image_price[i];

        }
        //}
        Canvas.imageList[i].imagePrice = image_price[i];
        // toy do here console.log(image_price[i]);
    }
    // toy do here
    // console.log('endfor');

    //console.log("newImageList : "+newImageList);
    var front_arr = new Array();
    var back_arr = new Array();
    var left_arr = new Array();
    var right_arr = new Array();

    for (var jj = 0; jj < frontImageList.length; jj++) {
        front_arr.push(frontImageList[jj].toLowerCase());
    }
    for (var jj = 0; jj < backImageList.length; jj++) {
        back_arr.push(backImageList[jj].toLowerCase());
    }
    for (var jj = 0; jj < leftImageList.length; jj++) {
        left_arr.push(leftImageList[jj].toLowerCase());
    }
    for (var jj = 0; jj < rightImageList.length; jj++) {
        right_arr.push(rightImageList[jj].toLowerCase());
    }

    front_arr = front_arr.filter(function (item, index, inputArray) {
        return inputArray.indexOf(item) == index;
    });
    back_arr = back_arr.filter(function (item, index, inputArray) {
        return inputArray.indexOf(item) == index;
    });
    left_arr = left_arr.filter(function (item, index, inputArray) {
        return inputArray.indexOf(item) == index;
    });
    right_arr = right_arr.filter(function (item, index, inputArray) {
        return inputArray.indexOf(item) == index;
    });
    //var arr = new Array();
    //front_arr.concat(front_arr);
    var f_and_b = front_arr.concat(back_arr);
    var l_and_r = left_arr.concat(right_arr);
    var arr = f_and_b.concat(l_and_r);

    // num_color = arr.length;

    //console.log(arr);
    //console.log("price_per_color :  * "+price_per_color);

    //if(Canvas.imageList[i].silkScreen){
    //console.log(color_price);

    //}else{
    // for(var jj=0;jj<image_price.length;jj++){
    // 	if(image_price[jj]){
    // 		total_image_price += image_price[jj];
    // 	}
    // }
    //}
    /*for(var j=0;j<color_price.length;j++){
        if(color_price[j]){
            num_color += color_price[j];

        }
    }*/


    /**
     * Calculate price all area
     **/
    var embroideryInch = Canvas.totalAllEmbroideryAreaInch;
    if (embroideryInch != 0) {
        if (embroideryInch <= standad_inch) {
            EAllAreaPrice = start_price_for_image;
        } else {
            EAllAreaPrice = ((embroideryInch - standad_inch) * price_per_inch) + start_price_for_image;
        }
        // if(embroideryInch > standad_inch) {
        //   EAllAreaPrice = ((embroideryInch-standad_inch)*price_per_inch)+start_price_for_image;
        // }
    }

    var digitalScreenInch = Canvas.totalAllDigitalScreenAreaInch;
    if (digitalScreenInch != 0) {
        if (digitalScreenInch <= standad_digital_inch) {
            DSAllAreaPrice = start_digital_price_for_image;
        } else {
            DSAllAreaPrice = ((digitalScreenInch - standad_digital_inch) * digital_price_per_inch) + start_digital_price_for_image;
        }

        // if(digitalScreenInch > standad_digital_inch) {
        //   DSAllAreaPrice = ((digitalScreenInch-standad_digital_inch)*digital_price_per_inch)+start_digital_price_for_image;
        // }

        if (DSAllAreaPrice >= max_digital_price_for_image) {
            DSAllAreaPrice = max_digital_price_for_image;
        }
    }

    /**
     * calculate total price
     **/
        // console.log(EPrice, EAllAreaPrice, DSPrice, DSAllAreaPrice);
        // console.log(EPrice, EAllAreaPrice);
    var calEAll = false;
    var calDSAll = false;

    if (EPrice != 0 && EPrice > EAllAreaPrice) {
        total_image_price += EAllAreaPrice;
        calEAll = true;
    } else {
        total_image_price += EPrice;
    }

    if (DSPrice != 0 && DSPrice > DSAllAreaPrice) {
        total_image_price += DSAllAreaPrice;
        calDSAll = true;
    } else {
        total_image_price += DSPrice;
    }
    // console.log(calEAll, calDSAll);
    // if(!calEAll && !calDSAll) {
    //   total_image_price += calTotalPrice(total_image_price, image_price);
    // }

// EPrice;
// EAllAreaPrice;
// DSPrice;
// DSAllAreaPrice;

    var front_color = front_arr.length > max_num_color ? max_num_color : front_arr.length;
    var back_color = back_arr.length > max_num_color ? max_num_color : back_arr.length;
    var left_color = left_arr.length > max_num_color ? max_num_color : left_arr.length;
    var right_color = right_arr.length > max_num_color ? max_num_color : right_arr.length;
    num_color = front_color + back_color + left_color + right_color;
    //console.log("num_color : "+num_color);

    //num_color = num_color > max_num_color ? max_num_color : num_color ;
    total_image_price += price_per_color * num_color;

    total_image_price = Math.round(total_image_price);

    //console.log("item_price : "+Canvas.item_price);
    //console.log("cate_price : "+Canvas.cate_price);
    //Canvas.polo_additional_price = 0;

    //Canvas.design_price = 0;

    Canvas.design_price = subtotal = parseInt(total_image_price) + parseInt(item_price) + parseInt(grade_price);
    if (Canvas.product_id == 1) {
        Canvas.design_price = parseInt(subtotal) + parseInt(Canvas.polo_additional_price);
    }

    /*if(Canvas.product_id == 4){
        Canvas.design_price = parseInt(subtotal)+parseInt(Canvas.apron_additional_price);
    }*/
    //console.log("cate_price : "+Canvas.cate_price);
    //console.log("item_price : "+Canvas.item_price);
    /*console.log("num_of_image : "+image_price.length);
    console.log("item_price : "+item_price);
    console.log("grade_price : "+grade_price);
    console.log("polo_additional_price : "+Canvas.polo_additional_price);
    console.log("apron_additional_price : "+Canvas.apron_additional_price);
    console.log("total_image_price : "+total_image_price);
    console.log("design_price : "+Canvas.design_price);*/
    Canvas.convertAmount("#subtotal_price");
}

function calTotalPrice(total_price, image_price) {
    for (var jj = 0; jj < image_price.length; jj++) {
        if (image_price[jj]) {
            total_price += image_price[jj];
        }
    }
    return total_price;
}

Canvas.per_bath = "";
Canvas.currency = "THB";
Canvas.decimal = 0;
Canvas.convertAmount = function (div) {
    if (!parseInt(Canvas.design_price)) {
        return;
    }
    if (Canvas.per_bath && Canvas.per_bath != "") {
        amount = parseInt(Canvas.design_price);
        if (Canvas.currency == "THB") {
            $(div).text(Canvas.numberWithCommas(Math.ceil(amount)) + " " + Canvas.currency);
        } else {
            var usd = (amount * Canvas.per_bath);
            $(div).text(Canvas.numberWithCommas(usd.toFixed(Canvas.decimal)) + " " + Canvas.currency);
        }
    } else {
        $.ajax({
            type: 'GET',
            url: baseURL + 'Currency/getCurrencyAmount',
            success: function (json) {
                var obj = JSON.parse(json);
                if (obj.per_bath > 0) {
                    Canvas.per_bath = obj.per_bath;
                    Canvas.currency = obj.currency;
                    Canvas.decimal = obj.decimal;
                    amount = parseInt(Canvas.design_price);
                    if (obj.currency == "THB") {
                        $(div).text(Canvas.numberWithCommas(Math.ceil(amount)) + " " + obj.currency);
                    } else {
                        var usd = (amount * obj.per_bath);
                        $(div).text(Canvas.numberWithCommas(usd.toFixed(Canvas.decimal)) + " " + obj.currency);
                    }

                } else {
                    Canvas.convertAmount(div);
                }
                /*
          var obj = JSON.parse(json);
                if(obj.per_bath > 0){
                    Canvas.per_bath = obj.per_bath;
                    Canvas.currency = obj.currency;
                    amount = parseInt(Canvas.design_price);
                    if(obj.currency == "THB"){
                        $(div).text(Canvas.numberWithCommas(Math.ceil(amount))+" "+obj.currency);
                    }else{
                        var usd = (amount/obj.per_bath);
                        $(div).text(Canvas.numberWithCommas(usd.toFixed(2))+" "+obj.currency);
                    }

                }else{
                    Canvas.convertAmount(div);
                }
          */
            }
        });
    }
}

Canvas.calculatePercentag = function (per) {
    var amount = Canvas.design_price;
    var percent = per;
    var discount = (percent * amount) / 100;
    var price = (amount - discount);
    return price;
}

Canvas.numberWithCommas = function (x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}
Canvas.getNumOfColor = function (data, image_add_tool) {
    if (typeof image_add_tool.silkColor != 'undefined') {
        image_add_tool.num_color = image_add_tool.silkColor;
    }

    return image_add_tool.silkColor;

    /*
  var colours = {};
    var sortedcolours = [];
    var num_color = Canvas.getOkColor(data,image_add_tool,500);

    return num_color;
  */

}
Canvas.getOkColor = function (data, image_add_tool, max_cal) {
    Canvas.colorInImage = [];
    var colours = {};
    var sortedcolours = [];
    var all = data.length;
    var num_color = 0;
    var color_list = [];

    for (var i = 0; i < all; i += max_cal) {
        //if(data[i+3] >= 255){
        var key = data[i] + '-' + data[i + 1] + '-' + data[i + 2] + '-' + data[i + 3];
        if (colours[key]) {
            colours[key]++;
        } else {
            colours[key] = 1;
        }
        // }
    }

    sortedcolours = Object.keys(colours).sort(
        function (a, b) {
            return -(colours[a] - colours[b]);
        }
    );

    sortedcolours.forEach(function (key) {
        var rgba = key.split('-');
        var hexColor = Canvas.RGBtoHEX(parseInt(rgba[0]), parseInt(rgba[1]), parseInt(rgba[2]));

        //if(hexColor != Canvas.toolColor && hexColor != Canvas.backgroundColor && rgba[3] > 0){
        //console.log(colours[key]);
        if (image_add_tool.paths) {
            maximum_pixel_count = 100;
        } else if (image_add_tool.text) {
            maximum_pixel_count = 1;
        } else {
            maximum_pixel_count = 50;
        }
        if (colours[key] >= maximum_pixel_count) {
            color_list.push(Canvas.RGBtoHEX(parseInt(rgba[0]), parseInt(rgba[1]), parseInt(rgba[2])));
            Canvas.colorInImage.push(Canvas.RGBtoHEX(parseInt(rgba[0]), parseInt(rgba[1]), parseInt(rgba[2])));
            //console.log(colours[key]);
            //console.log(Canvas.RGBtoHEX(parseInt(rgba[0]),parseInt(rgba[1]),parseInt(rgba[2])));
            num_color++;
        }
        //}
    });

    if (image_add_tool.paths && image_add_tool.paths.length > 0) {
        var arr = new Array();
        for (var p = 0; p < image_add_tool.paths.length; p++) {
            arr.push(image_add_tool.paths[p].fill);
        }
        arr = arr.filter(function (item, index, inputArray) {
            return inputArray.indexOf(item) == index;
        });
        num_color = arr.length;
    }
    image_add_tool.num_color = color_list;
    //console.log(image_add_tool);
    return color_list;
}
Canvas.RGBtoHEX = function (r, g, b) {
    return "#" + Canvas.componentToHex(r) + Canvas.componentToHex(g) + Canvas.componentToHex(b);

}
Canvas.componentToHex = function (c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}


var dataF;
var dataB;
var saveID;
var timeToSave = 2500;
Canvas.save = function (callback) {
    $(".loading_front").each(function (e) {
        $(this).show();
    })
    $(".loading_back").each(function (e) {
        $(this).show();
    })
    $(".loading_submit").each(function (e) {
        $(this).show();
    })
    $(".loading_button").each(function (e) {
        $(this).show();
        $(this).button('loading');
    })
    //console.log(JSON.stringify(ImageTool.imageList));
    //return;
    Canvas.deactivateAll();
    if (Canvas.isSave == 0) {
        Canvas.design_code = Canvas.getRandomCode();
    }
    Canvas.preview = [];
    Canvas.isSaving = true;
    Canvas.resetZoom();
    Canvas.hideBox();
    saveCallback = callback;


    Canvas.application_flip = "front";
    Canvas.flip();
    saveID = setTimeout(saveFront, timeToSave);
    Canvas.block("Please wait until the end of process.");

    function saveFront() {

        dataF = Canvas.toDataURL('png');
        $("#front_image_send").attr("src", dataF);
        $("#front_image").attr("src", dataF);
        $("#front_image_qua").attr("src", dataF);

        $(".loading_front").each(function (e) {
            $(this).hide();
        })


        clearTimeout(saveID);
        Canvas.saveCanvas();
        Canvas.application_flip = "back";
        Canvas.flip();
        saveID = setTimeout(Canvas.saveBack, timeToSave);

    }

}
Canvas.saveBack = function () {
    clearTimeout(saveID);
    dataB = Canvas.toDataURL('png');

    $("#back_image_send").attr("src", dataB);
    $("#back_image").attr("src", dataB);
    $("#back_image_qua").attr("src", dataB);
    $(".loading_back").each(function (e) {
        $(this).hide();
    })

    Canvas.saveCanvas();
    Canvas.application_flip = "left";
    Canvas.flip();

    saveID = setTimeout(Canvas.saveLeft, timeToSave);

}
Canvas.saveLeft = function () {
    clearTimeout(saveID);
    Canvas.saveCanvas();
    Canvas.application_flip = "right";
    Canvas.flip();
    saveID = setTimeout(Canvas.saveRight, timeToSave);

}
Canvas.saveRight = function () {
    clearTimeout(saveID);
    Canvas.saveCanvas();
}

Canvas.saveCanvas = function () {

    $.ajax({
        type: 'POST',
        url: baseURL + 'Apps/saveCanvas',
        data: {
            design_code: Canvas.design_code,
            flip: Canvas.application_flip,
            isSave: Canvas.isSave,
            base64Image: Canvas.toDataURL('png')
        },
        success: function (json) {

            var obj = JSON.parse(json);
            Canvas.design_code = obj.design_code;
            Canvas.preview.push(obj.url);

            /*if(obj.flip == "front"){
                Canvas.saveBack();
            }
            if(obj.flip == "back"){
               Canvas.saveLeft();
              //if(saveCallback != null)saveCallback(Canvas.design_id,Canvas.design_code);
            }
            if(obj.flip == "left"){
               Canvas.saveRight();
            }*/

            if (obj.flip == "right") {
                $(".loading_submit").each(function (e) {
                    $(this).hide();
                })
                $(".loading_button").each(function (e) {
                    $(this).button('reset');
                })
                Canvas.application_flip = "front";
                Canvas.flip();
                $.unblockUI();
                Canvas.updateDesign();
                if (saveCallback != null) saveCallback(obj.design_id, obj.design_code);
            }
        }
    });
    /*if(Canvas.application_flip == "back"){
        if(saveCallback != null)saveCallback(Canvas.design_id,Canvas.design_code);
    }*/
}
Canvas.updateDesign = function () {


    var saveURL = baseURL + 'Apps/updateDesign';
    if (Canvas.admin_mode == 1) {
        saveURL = baseURL + 'Apps/updateTemplate'
    }
    /*if(Canvas.isSave == 1 && Canvas.admin_mode != 1){
        Canvas.design_id = Canvas.current_design_id;
    }*/


    if (Canvas.design_name == "") {
        if (Canvas.product_id == 1) {
            Canvas.design_name = "POLO";
        } else if (Canvas.product_id == 2) {
            Canvas.design_name = "T-SHIRT";
        } else if (Canvas.product_id == 3) {
            Canvas.design_name = "BAG";
        } else if (Canvas.product_id == 4) {
            Canvas.design_name = "APORN";
        }

    }
    $.ajax({
        type: 'POST',
        url: saveURL,
        data: {
            member_id: Canvas.member_id,
            design_id: Canvas.design_id,
            product_id: Canvas.product_id,
            grade_id: Canvas.grade_id,
            isSave: Canvas.isSave,
            design_code: Canvas.design_code,
            min_quantity: Canvas.min_quantity,
            production_day: Canvas.production_day,
            design_name: Canvas.design_name,
            imageList: JSON.stringify(ImageTool.imageList),
            polodata: JSON.stringify(POLO.getData()),
            tshirtdata: JSON.stringify(TSHIRT.getData()),
            aprondata: JSON.stringify(APRON.getData()),
            bagdata: JSON.stringify(BAG.getData()),
            design_price: Canvas.design_price,
            item_price: Canvas.item_price,
            silkScreen: Canvas.silkScreen,
            digitalScreen: Canvas.digitalScreen,
            preview: JSON.stringify(Canvas.preview)
        },
        success: function (json) {
            var obj = JSON.parse(json);

            if (saveCallback != null) saveCallback(obj.design_id, obj.design_code);
            Canvas.isSaving = false;

            //console.log(JSON.stringify(json));
        }
    });
}

Canvas.block = function (message) {
    $.blockUI({
        css: {border: '1px solid #04bd94', backgroundColor: '#04bd94', color: '#fff', paddingBottom: '10px'}, message: '<h1><img src="' + baseURL + 'assets/img/preload.gif" /> ' + message + '</h1>',
        bindEvents: false
    });
}
Canvas.clearAll = function () {
    Canvas.forEachObject(function (obj) {
        Canvas.remove(Canvas.item(0));
        Canvas.renderAll();
    });
}

Canvas.getRandomColor = function () {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
Canvas.getRandomCode = function () {
    var code = "";
    var possible = "abcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 20; i++)
        code += possible.charAt(Math.floor(Math.random() * possible.length));

    return code;
}
