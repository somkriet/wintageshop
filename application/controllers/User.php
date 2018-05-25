<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * User class.
 * 
 * @extends CI_Controller
 */
class User extends CI_Controller {

	/**
	 * __construct function.
	 * 
	 * @access public
	 * @return void
	 */
	public function __construct() {
		
		parent::__construct();
		$this->load->library(array('session'));
		$this->load->helper(array('url'));
		$this->load->model('all_model');
		
	}
	
	
	public function index() {
		
	}

	public function login() {

		$this->load->view('user/login/login_view');
	}

	public function user_login(){
	
		$username=$this->input->post('username');
		$password=$this->input->post('password');
		// $password=md5($password);

		// $result=$this->all_model->get_userdata($username,$password);

		$sql="SELECT * FROM users WHERE username = '".$username."' AND password = '".$password."'";
		$result=$this->all_model->call_all($sql);

		// print_r($sql);

		if(!empty($result)){
			$session_arr=array();
			foreach($result as $rs){
				foreach($rs as $idx => $vals){
					if($idx!="password"){
						$session_arr[$idx]=$vals;
					}
				}
			}
			$this->session->set_userdata('login',$session_arr);
			$res=array('return'=>'success');
		}else{
			$res=array('return'=>'error');
		}

		echo json_encode($res);

	}

	public function logout()
	{
		$this->session->unset_userdata('login');

		redirect('index.php/home');
	}


	public function register() {
		
		$this->load->view('user/register/register_view');
	}


	public function user_register(){

		
		$user = $this->input->post("username");
		$last = $this->input->post("lastname");
		$mail = $this->input->post("email");
		$pass = $this->input->post("password");
		$date = date('Y-m-d H:m:s');
		// print_r($mail); exit();

		$sql = "INSERT INTO users (username,lastname,email,password,created_at) 
				VALUES ('".$user."','".$last."','".$mail."','".$pass."','".$date."')";

		$this->all_model->call_not($sql);
		
		if($mail != ""){
			$res = "success";

		}else{
			$res = "error";
		}
		echo json_encode($res);

	}
	
}


// <?php 
// if(!defined('BASEPATH')) exit('No direct script access allowed');
// Class login extends CI_Controller
// {
// 	function __construct()
// 	{
// 		parent::__construct();
// 		$this->load->model('all_model');
// 	}

// 	public function index()
// 	{
// 		$this->load->view('v_login');
// 	}

// 	public function authen()
// 	{
// 		$username=$this->input->post('username');
// 		$password=$this->input->post('password');
// 		$password=md5($password);

// 		$result=$this->all_model->get_userdata($username,$password);

// 		if(!empty($result)){
// 			$session_arr=array();
// 			foreach($result as $rs){
// 				foreach($rs as $idx => $vals){
// 					if($idx!="password"){
// 						$session_arr[$idx]=$vals;
// 					}
// 				}
// 			}
// 			$this->session->set_userdata('login',$session_arr);
// 			$res=array('return'=>'success');
// 		}else{
// 			$res=array('return'=>'error');
// 		}

// 		echo json_encode($res);
// 	}

// 	public function logout()
// 	{
// 		$this->session->unset_userdata('login');

// 		redirect('login');
// 	}
// }
// ?>