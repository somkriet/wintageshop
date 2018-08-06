  
 <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div class="container">
        <a class="navbar-brand" href="#"><img src="<?php echo base_url("assets/images/wintagejeans_logo.png") ?>" class="img-responsive"/></a>

        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item active">
              <a class="nav-link" href="<?= base_url('index.php/Home') ?>">หน้าแรก
                <span class="sr-only">(current)</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="<?= base_url('index.php/Shopping_cart') ?>">สั่งซื้อสินค้า</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="<?= base_url('index.php/About_us') ?>">เกี่ยวกับเรา</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="<?= base_url('index.php/Contact') ?>">ติดต่อเรา</a>
            </li>
            <li class="nav-item dropdown">
                <?php $data['user'] = $this->session->userdata('login'); ?>
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                
                <?php if ($data['user'] != "") {
                       // echo $data['user'];
                  echo "user";
                }else{?>
                        เข้าสู่ระบบ
                <?php } ?>
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" href="<?= base_url('index.php/login') ?>">เข้าสู่ระบบ</a>
                <?php
                  if ($data['user'] != "") {?>
                    <a class="dropdown-item" href="<?php echo base_url('index.php/manage_stock');?>">จัดการสต็อคสินค้า</a>
                    <a class="dropdown-item" href="<?php echo base_url('index.php/logout');?>">จัดการข้อมูลผู้ใช้</a>
                    <a class="dropdown-item" href="<?php echo base_url('index.php/logout');?>">ออกจากระบบ</a>
                 <?php } ?>
                <a class="dropdown-item" href="<?= base_url('index.php/register') ?>">สมัครสมาชิก</a>
               
              </div>
          </li>
            <li class="nav-item dropdown">
                          <a class="nav-link dropdown-toggle" id="dropdownLang" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <?=$this->session->userdata('lang'); ?>
                            <span class="caret"></span>
                          </a>
                          <ul class="dropdown-menu" aria-labelledby="dropdownLang">
                            <li><a href="<?php echo base_url("index.php/Home/change/english"); ?>">ENGLISH</a></li>
                            <li><a href="<?php echo base_url("index.php/Home/change/thailand"); ?>">THAILAND</a></li>
                         <!--    <li><a href="<?php echo site_url("home/change/japanese"); ?>">JAPANESE</a></li>
                            <li><a href="<?php echo site_url("home/change/chinese"); ?>">CHINESE</a></li> -->
                          </ul>
                           
                    </li>

          </ul>
        </div>
      </div>
    </nav>


  