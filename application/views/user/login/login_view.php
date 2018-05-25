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
        <div class="col-sm-3" >email:</div>
        <div class="col-sm-3" >
          <input id="email" type="text" class="form-control" name="email"  value="">
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
      // alert("aaa");
      // var username = $('#username').val();
      // var lastname = $('#lastname').val();
      var email = $('#email').val();
      var password = $('#password').val();

      // if (username == "") {
      //   alert("Please input User Name!!");
      // }

      // if (lastname == "") {
      //   alert("Please input Last Name!!");
      // }

      if (email == "") {
        alert("Please input email!!");
      }

      if (password == "") {
        alert("Please input password!!");
      }

    $.ajax({
      type: "POST",
      dataType: "JSON",
      url: "<?php echo base_url('index.php/User/user_login');?>",
      data: { 'username': username,
               'lastname': lastname,
               'email': email,
               'password': password
             },
      success: function(res){

        if (res == "success") {
          alert("success!!");

      $('#username').val('');
      $('#lastname').val('');
      $('#email').val('');
      $('#password').val('');
          location.reload();
        }else{
          alert("Not Register!!");
        }
      }
      
    });
  });




</script>