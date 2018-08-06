<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Manage_stock extends CI_Controller {

	
	public function __construct() {
		
		parent::__construct();
		$this->load->library(array('session'));
		$this->load->helper(array('url'));
		$this->load->model('all_model');
		
	}

	public function index()
	{


		// $this->session->set_userdata('login',$session_arr);
		$data['user'] = $this->session->userdata('login');

		// print_r($data['user']); exit();
		$this->load->view('template/header');
		$this->load->view('template/menu',$data);
		$this->load->view('stock/manage_stock_view',$data);
		$this->load->view('template/footer');
		
	}
}