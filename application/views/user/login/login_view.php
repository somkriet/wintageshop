<!DOCTYPE html>
<html lang="en">

  <head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Shop Homepage - Start Bootstrap Template</title>

    <!-- Bootstrap core CSS -->
   <?php $this->load->view('template/header');?>

  </head>

  <body>

   <?php $this->load->view('template/menu'); ?>

    <!-- Page Content -->
    <div class="container">
      <br><br>

      <div class="row">
        <div class="col-sm-3" ></div>
        <div class="col-sm-3" ></div>
        <div class="col-sm-3" >
          <h1>Login</h1>
        </div>
        <div class="col-sm-3" ></div>
      </div>
      <br>

    <!--   <div class="row">
        <div class="col-sm-3" ></div>
        <div class="col-sm-3" >User name:</div>
        <div class="col-sm-3" >
          <input id="username" type="text" class="form-control" name="username"  value="">
        </div>
        <div class="col-sm-3" ></div>
      </div>
      <br>

      <div class="row">
        <div class="col-sm-3" ></div>
        <div class="col-sm-3" >Last name:</div>
        <div class="col-sm-3" >
          <input id="lastname" type="text" class="form-control" name="lastname" value="">
        </div>
        <div class="col-sm-3" ></div>
      </div>
      <br> -->

       <div class="row">
        <div class="col-sm-3" ></div>
        <div class="col-sm-3" >username:</div>
        <div class="col-sm-3" >
          <input id="username" type="text" class="form-control" name="username"  value="">
        </div>
        <div class="col-sm-3" ></div>
      </div>
      <br>

      <div class="row">
        <div class="col-sm-3" ></div>
        <div class="col-sm-3" >Password:</div>
        <div class="col-sm-3" >
          <input id="password" type="password" class="form-control" name="password"  value="">
        </div>
        <div class="col-sm-3" ></div>
      </div>
     <br>


       <div class="row">
        <div class="col-sm-3" ></div>
        <div class="col-sm-3" ></div>
        <div class="col-sm-3" >
         <button id="login" name="login" class="btn btn-primary">Login</button>
         <div class="pwstrength_viewport_progress" id="msg_login"></div>
        </div>
        <div class="col-sm-3" ></div>
      </div>

      </div>
      <!-- /.row -->

    </div><br><br><br><br><br><br><br><br><br>
    <!-- /.container -->

   <?php $this->load->view('template/footer'); ?>

    <!-- Bootstrap core JavaScript -->
 

  </body>

</html>


<script type="text/javascript">
  

    $('#login').on('click', function(){
     
      var username = $('#username').val();
      var password = $('#password').val();

      if (username == "") {
        alert("Please input User Name!!");
      }

      if (password == "") {
        alert("Please input password!!");
      }
      $('#msg_login').empty();
    $.ajax({
      type: "POST",
      dataType: "JSON",
      url: "<?php echo base_url('index.php/User/user_login');?>",
      data: { 'username': username,
               'password': password
             },
      beforeSend: function(xls){
      $('#msg_login').html('<img style="margin-bottom: 0px;" src="<?php echo base_url('assets/images/loading.gif')?>">');
    },
      success: function(res){

        console.log(res);
      if(res['return']=='error'){
        $('#msg_login').html('<font color="red"><b>Invalid</b> Username or Password</font>');
        // alert("Invalid!!  Username or Password");
        // $('#txt_username').val("");
        $('#password').val("");
        $('#password').focus();
      }else{
        window.location.href="<?php echo base_url('index.php/home');?>";
      }

      }
      
    });

    return false;
  });




</script>