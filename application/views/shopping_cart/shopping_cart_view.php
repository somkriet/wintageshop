<html>
<head>
    <title>Codeigniter Shopping Cart with Ajax JQuery</title>
 <!--    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script> -->
</head>
<body>


  <div class="container">
  <br>
  <h1>สั่งซื้อสินค้า</h1>
  <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">ตระกร้าสินค้า</button><br><br>
  <div class="row">
    <!-- style="background-color:yellow;" -->
    <!-- <div class="col-md-8" > -->
      <!-- <p>Lorem ipsum...</p> -->
       <?php
         foreach($product as $row)
         {
          echo '
          <div class="col-md-2" style="padding:16px; background-color:#f1f1f1; border:1px solid #ccc; margin-bottom:16px; height:300px" align="center">
           <img src="'.base_url().'/images/'.$row->product_image.'" class="img-thumbnail" /><br />
           <h4>'.$row->product_name.'</h4>
           <h3 class="text-danger">$'.$row->product_price.'</h3>
           <input type="text" name="quantity" class="form-control quantity" id="'.$row->product_id.'" /><br />
           <button type="button" name="add_cart" class="btn btn-success add_cart" data-productname="'.$row->product_name.'" data-price="'.$row->product_price.'" data-productid="'.$row->product_id.'" />Add to Cart</button>
          </div> &nbsp; &nbsp;
          ';


          // echo '<div class="col-lg-4 col-md-6">
          //     <div class="card h-100">
          //       <a href="#"> <img src="'.base_url().'images/'.$row->product_image.'" class="img-thumbnail" /><br /></a>
          //       <div class="card-body">
          //         <h4 class="card-title">
          //           <a href="#"> <h4>'.$row->product_name.'</h4></a>
          //         </h4>
          //         <h5>$'.$row->product_price.'</h5>
          //         <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur!</p>
          //       </div>
          //       <div class="card-footer">
          //         <small class="text-muted">&#9733; &#9733; &#9733; &#9733; &#9734;</small>
          //       </div>
          //     </div>
          //   </div>';
          
         }
         ?>
    <!-- </div> -->

            






    <!-- style="background-color:pink;" -->
    <!-- <div class="col-md-4" > -->
      <!-- <p>Sed ut perspiciatis...</p> -->
   <!--     <div id="cart_details">
   <h3 align="center">Cart is Empty</h3>
  </div>
    </div>
  </div>
 -->



</div>


<!-- <h2>Modal Example</h2> -->
  <!-- Trigger the modal with a button -->
  

  <!-- Modal -->
  <div class="modal fade" id="myModal" role="dialog">
    <div class="modal-dialog">
    
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          
          <h4 class="modal-title">Shopping Cart</h4>
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        <div class="modal-body">
          <!-- <p>Some text in the modal.</p> -->

            <!-- <div class="col-md-4" > -->
      <!-- <p>Sed ut perspiciatis...</p> -->
                 <div id="cart_details">
             <h3 align="center">Cart is Empty</h3>
            </div>
              <!-- </div> -->


        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>
      </div>
      
    </div>
  </div>
</div>





<!-- <div class="container"> -->

 
 <!-- <div class="col-md-6"> -->
  <!-- <div class="table-responsive">
   <h3 align="center">Codeigniter Shopping Cart with Ajax JQuery</h3><br />
  
      
  </div> -->
 <!-- </div> -->
 <!-- <div class="col-md-6"> -->
<!--   <div id="cart_details">
   <h3 align="center">Cart is Empty</h3>
  </div> -->
 <!-- </div> -->
 
<!-- </div> -->
</body>
</html>
<script>
$(document).ready(function(){
 
 $('.add_cart').click(function(){
  var product_id = $(this).data("productid");
  var product_name = $(this).data("productname");
  var product_price = $(this).data("price");
  var quantity = $('#' + product_id).val();
  if(quantity != '' && quantity > 0)
  {
   $.ajax({
    url:"<?php echo base_url(); ?>index.php/shopping_cart/add",
    method:"POST",
    data:{product_id:product_id, product_name:product_name, product_price:product_price, quantity:quantity},
    success:function(data)
    {
     alert("Product Added into Cart");
     $('#cart_details').html(data);
     $('#' + product_id).val('');
    }
   });
  }
  else
  {
   alert("Please Enter quantity");
  }
 });

 $('#cart_details').load("<?php echo base_url(); ?>index.php/shopping_cart/load");

 $(document).on('click', '.remove_inventory', function(){
  var row_id = $(this).attr("id");
  if(confirm("Are you sure you want to remove this?"))
  {
   $.ajax({
    url:"<?php echo base_url(); ?>index.php/shopping_cart/remove",
    method:"POST",
    data:{row_id:row_id},
    success:function(data)
    {
     alert("Product removed from Cart");
     $('#cart_details').html(data);
    }
   });
  }
  else
  {
   return false;
  }
 });

 $(document).on('click', '#clear_cart', function(){
  if(confirm("Are you sure you want to clear cart?"))
  {
   $.ajax({
    url:"<?php echo base_url(); ?>index.php/shopping_cart/clear",
    success:function(data)
    {
     alert("Your cart has been clear...");
     $('#cart_details').html(data);
    }
   });
  }
  else
  {
   return false;
  }
 });

});
</script>