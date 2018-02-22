<style>
    #clipart_container img {
        cursor: pointer;
    }

    .transform img {
        cursor: pointer;
    }
</style>
<div class="col-md-6 paddingnone">
    <div class="">
        <div class="col-md-12 toolbox">
            <div class="">
                <div class="col-md-6 paddingnone" style="padding-right:2px !important;">
                    <div class="labeltxt"><?= $this->lang->line("app_chooseproduct"); ?> :</div>
                    <div class="form-group formapp">
                        <select class="form-control chooseproduct" id="sel1">
                            <?php
                            $cate_num = 1;
                            foreach ($category as $row) {
                                $cate_id = $row->cate_id;
                                $cate_name = $row->cate_name;
                                $cate_price = $row->cate_price;
                                echo '<option cate_price="' . $cate_price . '" value="' . $cate_num . '" class="chooseproductoption">' . $cate_name . '</option>';
                                $cate_num++;
                            }
                            ?>
                        </select>
                    </div>
                </div>
                <div class="col-md-6 paddingnone" style="padding-left:2px !important;">
                    <div class="labeltxt fabricheader"><?= $this->lang->line("app_choosefabric"); ?> : <a href="<?php echo site_url("polo"); ?>" target="_blank"><i class="fa fa-info-circle"></i></a></div>
                    <div class="form-group formapp">
                        <select class="form-control choosefabaic" id="sel1">
                            <?php /*?><?php
								$n = 0;
								foreach($grade as $row){
									$grade_id = $row->grade_id;
									$grade_name = $row->grade_name;
									$grade_color = $row->grade_color;
									$grade_price = $row->grade_polo_price;
									
									echo '<option grade_price="'.$grade_price.'" grade_color="'.$grade_color.'" class="chooseproductoption" value="'.$grade_id.'">'.$grade_name.'</option>';
								}
							?><?php */ ?>
                        </select>
                    </div>
                </div>
            </div>
            <div class="">
                <div class="col-md-12 paddingnone">
                    <ul class="nav nav-pills category">
                        <li class="firstnav_1 col-md-4 col-xs-12 paddingnone pills-left-li"><a class="firstnav_2 pills-left active" data-toggle="pill" href="#tool"><?= $this->lang->line("app_productoption"); ?></a></li>
                        <li class="firstnav_1 col-md-4 col-xs-12 paddingnone pills-center-li"><a class="firstnav_2 pills-center" data-toggle="pill" href="#image"><?= $this->lang->line("app_addclipartoryourlogo"); ?></a></li>
                        <li class="firstnav_1 col-md-4 col-xs-12 paddingnone pills-right-li"><a class="firstnav_2 pills-right" data-toggle="pill" href="#text"><?= $this->lang->line("app_addtext"); ?></a></li>
                    </ul>

                    <!-- start tool-->
                    <div class="tab-content">
                        <div id="tool" class="tab-pane fade in active toolcontent">
                            <ul class="nav nav-pills pillssub subcategory">
                                <li class="toolpill1 active pills-pattern-li"><a class="toolpill pills-pattern active" data-toggle="pill" href="#pattern"><?= $this->lang->line("app_pattern"); ?></a></li>
                                <li class="toolpill1 pills-collar-li "><a class="toolpill pills-collar" data-toggle="pill" href="#collar"><?= $this->lang->line("app_collar"); ?></a></li>
                                <li class="toolpill1 pills-menshirt-li"><a class="toolpill pills-menshirt" data-toggle="pill" href="#menshirt"><?= $this->lang->line("app_placket"); ?></a></li>
                                <li class="toolpill1 pills-sleeve-li"><a class="toolpill pills-sleeve" data-toggle="pill" href="#sleeve"><?= $this->lang->line("app_sleeve"); ?></a></li>
                                <li class="toolpill1 pills-pocket-li"><a class="toolpill pills-pocket" data-toggle="pill" href="#pocket"><?= $this->lang->line("app_pocket"); ?></a></li>
                            </ul>

                            <div class="tab-content">
                                <!--<span class="blacktxt">Your Design</span> : -->

                                <!-- start bag -->
                                <div id="bag" class="tab-pane fade itemslider">
                                    <div class="default_content">

                                        <!--สำหรับเพิ่ม thumbnail bag-->
                                    </div>
                                </div>
                                <!-- end bag -->

                                <!-- start apron -->
                                <div id="apron" class="tab-pane fade itemslider">
                                    <div class="default_content">

                                        <!--สำหรับเพิ่ม thumbnail apron-->
                                    </div>
                                </div>
                                <!-- end apron -->

                                <!-- start tshirt -->
                                <div id="tshirt" class="tab-pane fade itemslider">
                                    <div class="default_content">

                                        <!--สำหรับเพิ่ม thumbnail tshirt-->
                                    </div>
                                </div>
                                <!-- end tshirt -->

                                <!-- start polo -->
                                <div id="pattern" class="tab-pane fade in active itemslider">
                                    <div class="default_content">

                                        <!--สำหรับเพิ่ม thumbnail pattern-->
                                    </div>
                                </div>

                                <div id="collar" class="tab-pane fade itemslider">
                                    <div class="default_content">

                                        <!--สำหรับเพิ่ม thumbnail collar-->
                                    </div>
                                </div>
                                <div id="menshirt" class="tab-pane fade itemslider">
                                    <div class="default_content">

                                        <!--สำหรับเพิ่ม thumbnail menshirt-->
                                    </div>
                                </div>
                                <div id="sleeve" class="tab-pane fade itemslider">
                                    <div class="default_content">

                                        <!--สำหรับเพิ่ม thumbnail sleeve-->
                                    </div>
                                </div>
                                <div id="pocket" class="tab-pane fade itemslider">
                                    <div class="default_content">

                                        <!--สำหรับเพิ่ม thumbnail pocket-->
                                    </div>
                                </div>
                                <div class="col-md-12 color_container">

                                </div>
                                <!-- end polo -->


                            </div>
                        </div>
                        <!--end tool-->
                        <!--start image-->
                        <div id="image" class="tab-pane fade">
                            <ul class="nav nav-pills">

                                <li class="col-md-6 col-xs-12 paddingnone pills-image active"><a href="#uploadimg" data-toggle="pill"><?= $this->lang->line("app_uploadimage"); ?></a></li>
                                <li class="col-md-6 col-xs-12 paddingnone pills-image "><a href="#clipart" data-toggle="pill"><?= $this->lang->line("app_clipart"); ?></a></li>
                            </ul>

                            <!-- Tab panes -->
                            <div class="tab-content">
                                <div id="clipart" class="tab-pane fade in">
                                    <div class="col-md-12 paddingnone cliparttypecon">
                                        <select class="form-control cliparttype" id="clipartcategory" name="clipartcategory">
                                            <?php
                                            $n = 0;
                                            foreach ($clipart_category as $row) {
                                                if ($n == 0) {
                                                    $default_clipart_cateid = $row->clipart_cateid;
                                                    $n++;
                                                }
                                                $clipart_cateid = $row->clipart_cateid;
                                                $clipart_catename = $row->clipart_catename;
                                                echo '<option value="' . $clipart_cateid . '">' . $clipart_catename . '</option>';
                                            }
                                            ?>
                                        </select>
                                    </div>
                                    <!-- start clip art thumbnail-->
                                    <div id="clipart_container" class="col-md-12 paddingnone clipart_slider">
                                        <div class="col-md-3 imagethumb">
                                            <a><img src="<?php echo base_url("assets/img/clipart.png"); ?>" class="img-thumbnail pillsthumb active"/>
                                            </a>
                                        </div>
                                    </div>
                                    <!-- end clip art thumbnail-->
                                    <div class="col-md-12 colorpickercontent">
                                        <div class="col-md-3">
                                            <label class="lace">
                                                <p class="grean"><?= $this->lang->line("app_type"); ?> : </p>
                                                <input type="radio" name="typeOfImage1" class="typeOfImage1" value="0" checked>
                                                <span class="grean"><?= $this->lang->line("app_embroidery"); ?></span>
                                            </label>
                                            <label>
                                                <input type="radio" name="typeOfImage1" class="typeOfImage1" value="1">
                                                <span class="grean silks"><?= $this->lang->line("app_printing"); ?></span>
                                            </label>
                                        </div>
                                        <div class="col-md-3">
                                            <p class="grean"><?= $this->lang->line("app_artcolor"); ?> : </p>
                                            <select class="colorpicker" id="init" name="colorpicker-picker-clipart">
                                                <option value="#ac725e">#ac725e</option>
                                                <option value="#d06b64">#d06b64</option>
                                                <option value="#f83a22">#f83a22</option>
                                                <option value="#fa573c">#fa573c</option>
                                                <option value="#ff7537">#ff7537</option>
                                                <option value="#ffad46">#ffad46</option>
                                                <option value="#42d692">#42d692</option>
                                                <option value="#16a765">#16a765</option>
                                                <option value="#7bd148">#7bd148</option>
                                                <option value="#b3dc6c">#b3dc6c</option>
                                                <option value="#fbe983">#fbe983</option>
                                                <option value="#fad165">#fad165</option>
                                                <option value="#92e1c0">#92e1c0</option>
                                                <option value="#9fe1e7">#9fe1e7</option>
                                                <option value="#9fc6e7">#9fc6e7</option>
                                                <option value="#4986e7">#4986e7</option>
                                                <option value="#9a9cff">#9a9cff</option>
                                                <option value="#b99aff">#b99aff</option>
                                                <option value="#c2c2c2">#c2c2c2</option>
                                                <option value="#cabdbf">#cabdbf</option>
                                                <option value="#cca6ac">#cca6ac</option>
                                                <option value="#f691b2">#f691b2</option>
                                                <option value="#cd74e6">#cd74e6</option>
                                                <option value="#a47ae2">#a47ae2</option>
                                            </select>
                                            <br/>
                                        </div>
                                        <div class="col-md-6">
                                            <p class="grean"><?= $this->lang->line("app_color_and_outline"); ?> : </p>
                                            <div class="col-md-2 paddingnone colorpickerbox">
                                                <select class="colorpicker" id="init" name="colorpicker-picker-outline">
                                                    <option value="#ac725e">#ac725e</option>
                                                    <option value="#d06b64">#d06b64</option>
                                                    <option value="#f83a22">#f83a22</option>
                                                    <option value="#fa573c">#fa573c</option>
                                                    <option value="#ff7537">#ff7537</option>
                                                    <option value="#ffad46">#ffad46</option>
                                                    <option value="#42d692">#42d692</option>
                                                    <option value="#16a765">#16a765</option>
                                                    <option value="#7bd148">#7bd148</option>
                                                    <option value="#b3dc6c">#b3dc6c</option>
                                                    <option value="#fbe983">#fbe983</option>
                                                    <option value="#fad165">#fad165</option>
                                                    <option value="#92e1c0">#92e1c0</option>
                                                    <option value="#9fe1e7">#9fe1e7</option>
                                                    <option value="#9fc6e7">#9fc6e7</option>
                                                    <option value="#4986e7">#4986e7</option>
                                                    <option value="#9a9cff">#9a9cff</option>
                                                    <option value="#b99aff">#b99aff</option>
                                                    <option value="#c2c2c2">#c2c2c2</option>
                                                    <option value="#cabdbf">#cabdbf</option>
                                                    <option value="#cca6ac">#cca6ac</option>
                                                    <option value="#f691b2">#f691b2</option>
                                                    <option value="#cd74e6">#cd74e6</option>
                                                    <option value="#a47ae2">#a47ae2</option>
                                                </select>
                                            </div>
                                            <div class="col-md-10 paddingnone">

                                                <select class="form-control outlinetype" id="clipart_outline">
                                                    <option value="0">No Outline</option>
                                                    <option value="1">Thin Outline</option>
                                                    <option value="2">Medium Outline</option>
                                                    <option value="3">Thick Outline</option>
                                                </select>
                                            </div>

                                        </div>


                                    </div>
                                </div>
                                <div id="uploadimg" class="tab-pane fade in active">
                                    <div class="col-md-12 paddingnone uploadfile">
                                        <input type="file" id="imageLoader" name="clipart_image">


                                    </div>

                                    <div class="col-md-12 paddingnone">

                                    </div>
                                    <div class="co-md-12 alignment">
                                        <label class="lace">
                                            <p class="grean"><?= $this->lang->line("app_type"); ?> : </p>
                                            <input type="radio" name="typeOfImage3" class="typeOfImage3" value="0" checked>
                                            <span class="grean"><?= $this->lang->line("app_embroidery"); ?></span>
                                        </label>&nbsp;&nbsp;&nbsp;
                                        <label>
                                            <input type="radio" name="typeOfImage3" class="typeOfImage3" value="1">
                                            <span class="grean silks"><?= $this->lang->line("app_printing"); ?></span>
                                        </label>
                                    </div>
                                </div>
                                <div class="radio_content">

                                    <div class="col-md-12 paddingnone">

                                        <div class="transform">
                                            <div class="co-md-12 grean alignment">
                                                <?= $this->lang->line("app_alignment"); ?> :
                                            </div>
                                            <label class="col-md-4">
                                                <input id="snaptogrid_image" type="checkbox">
                                                <span class="grean"><?= $this->lang->line("app_snapcenter"); ?></span>
                                            </label>
                                            <ul class="col-md-8">
                                                <a onClick="ImageTool.duplicate();" title="Duplicate">
                                                    <li>
                                                        <img src="<?php echo base_url("assets/img/transform1.png"); ?>"/>
                                                    </li>
                                                </a>
                                                <a onClick="ImageTool.center();" title="Center">
                                                    <li>
                                                        <img src="<?php echo base_url("assets/img/transform2.png"); ?>"/>
                                                    </li>
                                                </a>
                                                <a onClick="ImageTool.pushBehind();" title="Push Behind">
                                                    <li>
                                                        <img src="<?php echo base_url("assets/img/transform3.png"); ?>"/>
                                                    </li>
                                                </a>
                                                <a onClick="ImageTool.flipHerizontal();" title="Flip Herizontally">
                                                    <li>
                                                        <img src="<?php echo base_url("assets/img/transform4.png"); ?>"/>
                                                    </li>
                                                </a>
                                                <a onClick="ImageTool.flipVertical();" title="Flip Vertically">
                                                    <li>
                                                        <img src="<?php echo base_url("assets/img/transform5.png"); ?>"/>
                                                    </li>
                                                </a>
                                            </ul>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                        <!--end image-->
                        <!--start text-->
                        <div id="text" class="tab-pane fade">
                            <div class="col-md-12 paddingnone addtext">
                                <p class="grean"><?= $this->lang->line("app_enter_text_below"); ?> : </p>
                                <input name="txt" type="text" class="form-control" id="txt" placeholder="Add your text">
                                <div class="col-md-6">
                                    <p class="grean"><?= $this->lang->line("app_choosefont"); ?> : </p>

                                    <div class="col-md-2 paddingnone colorpickerbox">
                                        <select class="colorpicker" id="init" name="colorpicker-picker-text">
                                            <option value="#ac725e">#ac725e</option>
                                            <option value="#d06b64">#d06b64</option>
                                            <option value="#f83a22">#f83a22</option>
                                            <option value="#fa573c">#fa573c</option>
                                            <option value="#ff7537">#ff7537</option>
                                            <option value="#ffad46">#ffad46</option>
                                            <option value="#42d692">#42d692</option>
                                            <option value="#16a765">#16a765</option>
                                            <option value="#7bd148">#7bd148</option>
                                            <option value="#b3dc6c">#b3dc6c</option>
                                            <option value="#fbe983">#fbe983</option>
                                            <option value="#fad165">#fad165</option>
                                            <option value="#92e1c0">#92e1c0</option>
                                            <option value="#9fe1e7">#9fe1e7</option>
                                            <option value="#9fc6e7">#9fc6e7</option>
                                            <option value="#4986e7">#4986e7</option>
                                            <option value="#9a9cff">#9a9cff</option>
                                            <option value="#b99aff">#b99aff</option>
                                            <option value="#c2c2c2">#c2c2c2</option>
                                            <option value="#cabdbf">#cabdbf</option>
                                            <option value="#cca6ac">#cca6ac</option>
                                            <option value="#f691b2">#f691b2</option>
                                            <option value="#cd74e6">#cd74e6</option>
                                            <option value="#a47ae2">#a47ae2</option>
                                        </select>
                                    </div>
                                    <div class="col-md-10 paddingnone">
                                        <select style="display:none" id="fontstyle"> </select>
                                        <div id="fontSelect" class="fontSelect">
                                            <div class="arrow-down"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <p class="grean"><?= $this->lang->line("app_color_and_outline"); ?> : </p>

                                    <div class="col-md-2 paddingnone colorpickerbox">
                                        <select class="colorpicker" id="init" name="colorpicker-picker-textoutline">
                                            <option value="#ac725e">#ac725e</option>
                                            <option value="#d06b64">#d06b64</option>
                                            <option value="#f83a22">#f83a22</option>
                                            <option value="#fa573c">#fa573c</option>
                                            <option value="#ff7537">#ff7537</option>
                                            <option value="#ffad46">#ffad46</option>
                                            <option value="#42d692">#42d692</option>
                                            <option value="#16a765">#16a765</option>
                                            <option value="#7bd148">#7bd148</option>
                                            <option value="#b3dc6c">#b3dc6c</option>
                                            <option value="#fbe983">#fbe983</option>
                                            <option value="#fad165">#fad165</option>
                                            <option value="#92e1c0">#92e1c0</option>
                                            <option value="#9fe1e7">#9fe1e7</option>
                                            <option value="#9fc6e7">#9fc6e7</option>
                                            <option value="#4986e7">#4986e7</option>
                                            <option value="#9a9cff">#9a9cff</option>
                                            <option value="#b99aff">#b99aff</option>
                                            <option value="#c2c2c2">#c2c2c2</option>
                                            <option value="#cabdbf">#cabdbf</option>
                                            <option value="#cca6ac">#cca6ac</option>
                                            <option value="#f691b2">#f691b2</option>
                                            <option value="#cd74e6">#cd74e6</option>
                                            <option value="#a47ae2">#a47ae2</option>
                                        </select>
                                    </div>
                                    <div class="col-md-10 paddingnone">
                                        <select class="form-control outlinetype" id="text_outline">
                                            <option value="0">No Outline</option>
                                            <option value="1">Thin Outline</option>
                                            <option value="2">Medium Outline</option>
                                            <option value="3">Thick Outline</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="radio_content col-md-12">
                                    <label class="lace">
                                        <p class="grean"><?= $this->lang->line("app_type"); ?> : </p>
                                        <input type="radio" name="typeOfImage2" class="typeOfImage2" value="0" checked>
                                        <span class="grean"><?= $this->lang->line("app_embroidery"); ?></span>
                                    </label>&nbsp;&nbsp;&nbsp;
                                    <label>
                                        <input type="radio" name="typeOfImage2" class="typeOfImage2" value="1">
                                        <span class="grean"><?= $this->lang->line("app_printing"); ?></span>
                                    </label>
                                    <div class="col-md-12 paddingnone">
                                        <div class="transform">
                                            <label class="col-md-4 paddingnone">
                                                <input id="snaptogrid_text" type="checkbox">
                                                <span class="grean"><?= $this->lang->line("app_snapcenter"); ?></span>
                                            </label>
                                            <ul class="col-md-8 paddingnone">
                                                <a onClick="ImageTool.duplicate();" title="Duplicate">
                                                    <li>
                                                        <img src="<?php echo base_url("assets/img/transform1.png"); ?>"/>
                                                    </li>
                                                </a>
                                                <a onClick="ImageTool.center();" title="Center">
                                                    <li>
                                                        <img src="<?php echo base_url("assets/img/transform2.png"); ?>"/>
                                                    </li>
                                                </a>
                                                <a onClick="ImageTool.pushBehind();" title="Push Behind">
                                                    <li>
                                                        <img src="<?php echo base_url("assets/img/transform3.png"); ?>"/>
                                                    </li>
                                                </a>
                                                <a onClick="ImageTool.flipHerizontal();" title="Flip Herizontally">
                                                    <li>
                                                        <img src="<?php echo base_url("assets/img/transform4.png"); ?>"/>
                                                    </li>
                                                </a>
                                                <a onClick="ImageTool.flipVertical();" title="Flip Vertically">
                                                    <li>
                                                        <img src="<?php echo base_url("assets/img/transform5.png"); ?>"/>
                                                    </li>
                                                </a>
                                            </ul>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                        <!--end text-->
                    </div>
                </div>
            </div>

        </div>

    </div>

    <div class="col-md-12">
        <div class="labeltxt show_nav text-right">style 30 / basic collar / basic placket / basic sleep / no packet</div>
    </div>
    <div class="col-md-12 paddingnone">
        <div class="col-md-12 col-xs-12 text-right">
            <div class="currentprice"><?= $this->lang->line("app_currentprice"); ?> : <span id="subtotal_price">0 THB</span></div>
            <div class="labeltxt"><a onClick="showPrizetable();"><?= $this->lang->line("app_description1"); ?></a></div>
        </div>
    </div>
    <div class="col-md-12 paddingnone appbtncon">
        <?php if ($this->session->userdata('logged_in_admin') == FALSE) { ?>
            <div class="col-md-3 col-xs-12 pull-right appbtn">
                <a onClick="addToCart();" class="btn btn-lg btn-block pinkbtn"><i class="fa fa-shopping-basket"></i>&nbsp;&nbsp; ADD TO CART</a>
            </div>
            <div class="col-md-3 col-xs-12 pull-right appbtn">
                <a onClick="requestQuotation();" class="btn btn-lg btn-block darkbtn"><i class="fa fa-file-text-o"></i>&nbsp;&nbsp; QUOTATION</a>
            </div>
        <?php } ?>
        <div class="col-md-3 col-xs-12 pull-right appbtn">
            <a onClick="saveImage();" class="btn btn-lg btn-block bluebtn"><i class="fa fa-envelope-o"></i>&nbsp;&nbsp; SAVE / SEND</a>
        </div>
    </div>
</div>

<?php $this->load->view("templates/modal_send"); ?>
<?php $this->load->view("templates/modal_register"); ?>
<?php $this->load->view("templates/modal_choosesize"); ?>
<?php $this->load->view("templates/modal_quotation"); ?>
<?php $this->load->view("templates/modal_pricetable"); ?>

<script>
    var isAdminMode = "<?php echo $this->session->userdata('logged_in_admin'); ?>";
    var error = "";
    error = "<?php  if (isset($message)) {
        echo $message;
    } ?>";

    if (error && error != "") {
        bootbox.alert(error, function () {

        });
    }

    var Config = {
        minSlides: 1,
        maxSlides: 4,
        slideWidth: 120,
        slideMargin: 10,
        pager: false,
        infiniteLoop: false,
        hideControlOnEnd: true
    };

    var clipart_slider;
    $('.category a[data-toggle="pill"]').on('shown.bs.tab', function (e) {
        var target = $(e.target).attr("href") // activated tab
        if (target == "#image") {
            //$("#clipart_container").empty();
            if (!clipart_slider) {
                clipart_slider = $("#clipart_container").bxSlider(Config);
            }
        }
        //if(POLO.sliderArr[target])POLO.sliderArr[target].reloadSlider(POLO.sliderConfig);
    });

    $(document).ready(function (e) {


        $('#clipartcategory').change(function (e) {
            var clipart_cateid = $(this).val();
            loadClipArtByCateID(clipart_cateid);
        });
        loadClipArtByCateID("<?php echo $default_clipart_cateid; ?>");

        function loadClipArtByCateID(clipart_cateid) {
            var data = {
                'clipart_cateid': clipart_cateid
            };
            $.ajax({
                url: "<?php echo site_url('Apps/loadClipArtByCateID'); ?>",
                type: 'POST',
                data: data,
                dataType: 'json',
                success: function (obj) {
                    // console.log(JSON.stringify(obj));
                    addToView(obj);
                }
            });
        }

        function addToView(menuItem) {
            $("#clipart_container").empty();
            for (var key in menuItem) {
                var obj = menuItem[key];
                for (var prop in obj) {
                    //console.log(prop + " = " + obj[prop]);
                    var clipart_image = obj['clipart_image'];
                    clipart_image = clipart_image.replace(localURL, baseURL);
                    var htmlClipArtDIV = '<div class="col-md-3 imagethumb clipartthumb">' +
                        '<a onclick="loadClipArt(\'' + clipart_image + '\')"><img src="' + clipart_image + '" class="img-thumbnail pillsthumb active" />' +
                        '</a>' +
                        '</div>';
                }
                $("#clipart_container").append(htmlClipArtDIV);

            }
            if (clipart_slider) clipart_slider.reloadSlider(Config);
            //var clipart_slider = $("#clipart_container").bxSlider(Config);
        }

    });


    var outlineColor = "#d06b64";
    var outlineStroke = null;

    $('select[name="colorpicker-picker-clipart"]').on('change', function () {
        var color = $(this).val();
        ImageTool.setClipArtColor(color);
    });
    $('select[name="colorpicker-picker-outline"]').on('change', function () {
        outlineColor = $(this).val();
        ImageTool.addOutline(outlineColor, outlineStroke);
    });
    $('select[name="colorpicker-picker-text"]').on('change', function () {
        var color = $(this).val();
        ImageTool.setClipArtColor(color);
    });
    $('select[name="colorpicker-picker-textoutline"]').on('change', function () {
        outlineColor = $(this).val();
        ImageTool.addOutline(outlineColor, outlineStroke);
    });


    $("#clipart_outline, #text_outline").change(function (e) {
        outlineStroke = $(this).val();
        ImageTool.addOutline(outlineColor, outlineStroke);
    });
    $("#snaptogrid_image").change(function (e) {
        var isSnapToGrid = $(this).prop('checked');
        $("#snaptogrid_text").prop("checked", isSnapToGrid);
        Canvas.snapToGrid = isSnapToGrid;
    });
    $("#snaptogrid_text").change(function (e) {
        var isSnapToGrid = $(this).prop('checked');
        $("#snaptogrid_image").prop("checked", isSnapToGrid);
        Canvas.snapToGrid = isSnapToGrid;
    });
    $("#imageLoader").change(function (e) {

    });

    $("#imageLoader").change(function (e) {
        //var filename = $(this).val();
        //ImageTool.uploadImage(e,filename);
        //console.log($(this)[0].files[0]);
        //return;
        Canvas.block("Uploading...");
        var formData = new FormData();
        formData.append('clipart_image', $(this)[0].files[0]);

        $.ajax({
            url: baseURL + 'Apps/uploadClipArt',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (data) {
                console.log(data);
                var obj = JSON.parse(data);
                console.log(obj);
                loadClipArt(obj.clipart_image);
                $.unblockUI();
                $("#imageLoader").val(null);
            }
        });
    });

    var txt;
    var fontFamily = "Tahoma";

    $("#txt").keyup(function (e) {
        txt = $(this).val();
        ImageTool.typing_num++;
        if (ImageTool.typing_num <= 1) {
            ImageTool.addFont(txt, fontFamily);
        } else {
            ImageTool.changeFontStyle(txt, fontFamily);
        }
        //console.log("up "+typing_num);
    });
    $("#txt").focusout(function (e) {

    });
    $("body").click(function (e) {
        // ImageTool.focusOut();
    });
    $("#txt").change(function (e) {
        ImageTool.changeFontStyle(txt, fontFamily);
    });
    $("#fontstyle").change(function (e) {
        txt = $("#txt").val();
        //fontFamily = $(this).val();
        ImageTool.changeFontStyle(txt, fontFamily);
    });


    var isInit = true;
    $('#fontSelect').fontSelector({
        "hide_fallbacks": true,
        "initial": "Courier New,Courier New,Courier,monospace",
        "selected": function (style) {
            fontFamily = style;
            if (!isInit) {
                $("#fontstyle").trigger("change");
            }
            isInit = false;
        },
        "fonts": [
            "Arial,Arial,Helvetica,sans-serif",
            "Arial Black,Arial Black,Gadget,sans-serif",
            "Comic Sans MS,Comic Sans MS,cursive",
            "Courier New,Courier New,Courier,monospace",
            "Georgia,Georgia,serif",
            "Impact,Charcoal,sans-serif",
            "Lucida Console,Monaco,monospace",
            "Lucida Sans Unicode,Lucida Grande,sans-serif",
            "Palatino Linotype,Book Antiqua,Palatino,serif",
            "Tahoma,Geneva,sans-serif",
            "Times New Roman,Times,serif",
            "Trebuchet MS,Helvetica,sans-serif",
            "Verdana,Geneva,sans-serif",
            "Gill Sans,Geneva,sans-serif"
        ]
    });

    $(".typeOfImage1").change(function (e) {

        if ($(this).val() == 0) {
            $("[name=typeOfImage2]").val(["0"]);
            $("[name=typeOfImage3]").val(["0"]);
            Canvas.silkScreen = false;
            var obj = Canvas.getActiveObject();
            if (obj) obj.silkScreen = false;
        } else {
            $("[name=typeOfImage2]").val(["1"]);
            $("[name=typeOfImage3]").val(["1"]);
            Canvas.silkScreen = true;
            var obj = Canvas.getActiveObject();
            if (obj) obj.silkScreen = true;
        }
        Canvas.calculateSubTotal();
    });

    $(".typeOfImage2").change(function (e) {

        if ($(this).val() == 0) {
            $("[name=typeOfImage1]").val(["0"]);
            $("[name=typeOfImage3]").val(["0"]);
            //$(".typeOfImage1").prop("checked",false);
            Canvas.silkScreen = false;
            var obj = Canvas.getActiveObject();
            if (obj) obj.silkScreen = false;
        } else {
            $("[name=typeOfImage1]").val(["1"]);
            $("[name=typeOfImage3]").val(["1"]);
            //$(".typeOfImage1").prop("checked",true);
            Canvas.silkScreen = true;
            var obj = Canvas.getActiveObject();
            if (obj) obj.silkScreen = true;
        }
        Canvas.calculateSubTotal();
    });

    $(".typeOfImage3").change(function (e) {

        if ($(this).val() == 0) {
            $("[name=typeOfImage1]").val(["0"]);
            $("[name=typeOfImage2]").val(["0"]);
            //$(".typeOfImage1").prop("checked",false);
            Canvas.silkScreen = false;
            var obj = Canvas.getActiveObject();
            if (obj) obj.silkScreen = false;
        } else {
            $("[name=typeOfImage1]").val(["1"]);
            $("[name=typeOfImage2]").val(["1"]);
            //$(".typeOfImage1").prop("checked",true);
            Canvas.silkScreen = true;
            var obj = Canvas.getActiveObject();
            if (obj) obj.silkScreen = true;
        }

        Canvas.calculateSubTotal();
    });

    //$(".choosefabaic").trigger("change");


    function saveImage() {
        Canvas.save(saveCallback);
    }

    function showRegister() {
        if (isAdminMode) {
            bootbox.alert("Save Template Successfully.<br>Click 'Add New Template' to create new design", function () {

            })
        } else {
            $('.registeralert').modal('show');
        }
    }

    function showSend() {
        if (isAdminMode) {
            bootbox.alert("Save Template Successfully.<br>Click 'Add New Template' to create new design", function () {

            })
        } else {
            //$('.registeralert').modal('show');
            $("#design_price").val(Canvas.design_price);
            $("#design_id").val("<?php echo $this->session->userdata('design_id'); ?>");
            $("#front_image_send").attr("src", "<?php echo base_url('uploads/front_' . $this->session->userdata('design_code') . '.png'); ?>");
            $("#back_image_send").attr("src", "<?php echo base_url('uploads/back_' . $this->session->userdata('design_code') . '.png'); ?>");
            $('.sendalert').modal('show');
        }
    }

    function requestQuotation() {
        Canvas.save(showQuotation);
    }

    function showQuotation() {
        onEnabledQuatationSizeTable();
        initQuotationalert();
        $("#design_id").val("<?php echo $this->session->userdata('design_id'); ?>");
        $("#front_image_qua").attr("src", "<?php echo base_url('uploads/front_' . $this->session->userdata('design_code') . '.png'); ?>");
        $("#back_image_qua").attr("src", "<?php echo base_url('uploads/back_' . $this->session->userdata('design_code') . '.png'); ?>");
        $('.quotationalert').modal('show');
    }

    function addToCart() {
        Canvas.save(showChoosesize);
    }

    function showChoosesize() {
        //alert("<?php echo $this->session->userdata('design_id'); ?>");
        onEnabledChooseSizeTable();
        initChoosesize();
        $("#design_price").val(Canvas.design_price);
        $("#design_id").val("<?php echo $this->session->userdata('design_id'); ?>");
        $("#front_image").attr("src", "<?php echo base_url('uploads/front_' . $this->session->userdata('design_code') . '.png'); ?>");
        $("#back_image").attr("src", "<?php echo base_url('uploads/back_' . $this->session->userdata('design_code') . '.png'); ?>");
        $('.choosesize').modal('show');

    }

    function showPrizetable() {
        $('.pricetable').modal('show');
    }

    var detectid;

    function saveCallback() {
        $.blockUI({css: {border: '1px solid #04bd94', backgroundColor: '#04bd94', color: '#fff', paddingBottom: '10px'}, message: '<h1>Save Complete</h1>'});
        detectid = setTimeout(detectRegister, 2000);

    }

    function detectRegister() {
        clearTimeout(detectid);
        $.unblockUI();

        if (!Canvas.member_id) {
            showRegister();
        } else {
            showSend();
        }

    }

    function loadClipArt(clipart_image) {
        ImageTool.addClipArt(clipart_image);
    }


    var polo_quotationalert_content = $(".quotationalert .polo_content").html();
    var tshirt_quotationalert_content = $(".quotationalert .tshirt_content").html();
    var apron_quotationalert_content = $(".quotationalert .apron_content").html();
    var polo_choosesize_content = $(".choosesize .polo_content").html();
    var tshirt_choosesize_content = $(".choosesize .tshirt_content").html();
    var apron_choosesize_content = $(".choosesize .apron_content").html();

    function onEnabledQuatationSizeTable() {
        clearAllTable();
        if (Canvas.product_id == 1) {
            $(".quotationalert .polo_content").html(polo_quotationalert_content);
        } else if (Canvas.product_id == 2) {
            $(".quotationalert .tshirt_content").html(tshirt_quotationalert_content);
        } else {
            $(".quotationalert .apron_content").html(apron_quotationalert_content);
        }
    }


    function onEnabledChooseSizeTable() {
        clearAllTable();
        if (Canvas.product_id == 1) {
            $(".choosesize .polo_content").html(polo_choosesize_content);
        } else if (Canvas.product_id == 2) {
            $(".choosesize .tshirt_content").html(tshirt_choosesize_content);
        } else {
            $(".choosesize .apron_content").html(apron_choosesize_content);
        }
    }

    function clearAllTable() {
        $(".choosesize .polo_content").empty();
        $(".choosesize .tshirt_content").empty();
        $(".choosesize .apron_content").empty();
        $(".quotationalert .polo_content").empty();
        $(".quotationalert .tshirt_content").empty();
        $(".quotationalert .apron_content").empty();
    }
</script>