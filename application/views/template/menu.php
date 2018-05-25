  
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
              <a class="nav-link" href="#">สั่งซื้อสินค้า</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">เกี่ยวกับเรา</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">ติดต่อเรา</a>
            </li>
           <!--   <li class="nav-item">
              <a class="nav-link" href="<?= base_url('index.php/login') ?>">เข้าสู่ระบบ</a>
            </li>
             <li class="nav-item">
              <a class="nav-link" href="<?= base_url('index.php/register') ?>">สมัครสมาชิก</a>

            </li> -->
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
                    <a class="dropdown-item" href="<?php echo base_url('index.php/logout');?>">ออกจากระบบ</a>
                 <?php } ?>
                <a class="dropdown-item" href="<?= base_url('index.php/register') ?>">สมัครสมาชิก</a>
               
              </div>
          </li>
          </ul>
        </div>
      </div>
    </nav>


  