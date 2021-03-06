<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Home extends CI_Controller {

	
	public function __construct() {
		
		parent::__construct();
		$this->load->library(array('session'));
		$this->load->helper(array('url'));
		$this->load->model('all_model');
		
	}

	public function index()
	{
		if($this->session->userdata('lang')==NULL){
			$lang = "english";
			$this->session->set_userdata('lang',$lang);
		}else{
			$lang = $this->session->userdata('lang');
		}


		// $this->session->set_userdata('login',$session_arr);
		$data['user'] = $this->session->userdata('login');

		// print_r($data['user']); exit();
		
		$this->lang->load($lang,$lang);
		$this->load->view('home_view',$data);
		
	}

	public function change($lang)
	{
		$this->session->set_userdata('lang',$lang);
		redirect($this->router->class,'refresh');
	}
	
}