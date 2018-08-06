<!DOCTYPE html>
<html>
<head>
	<title>manage stock</title>
	<style type="text/css">
		table, th, td {
    border: 1px solid black;
    border-collapse: collapse;
}
	</style>
</head>
<body>

<div class="container">


<h1>manage stock</h1>
<br>


<div class="row">
	<div class="col-sm-6">
	<label>Name1 :</label>
	<input type="" name="">

	<label>Name2 :</label>
	<input type="" name="">
	</div>


	<div class="col-sm-6">
	<label>Name3 :</label>
	<input type="" name="">

	<label>Name4 :</label>
	<input type="" name="">
	</div>
</div>






<br><br><br>
<table id="myTable" style="width:100%">
  <tr>
    <th>Firstname</th>
    <th>Lastname</th> 
    <th>Age</th>
  </tr>
  <tr>
    <td>Jill</td>
    <td>Smith</td> 
    <td>50</td>
  </tr>
  <tr>
    <td>Eve</td>
    <td>Jackson</td> 
    <td>94</td>
  </tr>
</table><br>



















</div>
</body>
</html>


<script type="text/javascript">
	


$(document).ready( function () {
    $('#myTable').DataTable();
} );



</script>