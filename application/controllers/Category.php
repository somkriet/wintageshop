<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Category extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->helper(array('form', 'url'));
    }

    public function index()
    {
        // $this->PAGE['product_category'] = $this->model_product_category->get_all();
        // $this->PAGE['product_category'] = 1;

        // $this->load->view('category/index', $this->PAGE);
         $this->load->view('category/index');
    }

    public function create()
    {
        // if ($this->input->post()) {
        //     $this->postCreate($this->input->post());
        //     exit;
        // }

        $this->load->view('category/create');
    }

    public function edit($id)
    {
        if ($this->input->post()) {
            $this->postEdit($id, $this->input->post());
            exit;
        }

        $category = $this->model_product_category->where_id($id);

        if ($category->count_rows() > 0) {
            $this->PAGE['product_category'] = $this->model_product_category->where_id($id)->get();

            $this->load->view('cms/product/category/edit', $this->PAGE);
        } else {
            redirect('/cms/product/category');
        }
    }

    public function postCreate($post)
    {
        $category = $post;
        $category['created_at'] = $category['updated_at'] = date('Y-m-d H:i:s');

        $this->db->insert('application_product_category', $category);

        redirect('/cms/product/category');
    }

    public function postEdit($id, $post)
    {
        $post['updated_at'] = date('Y-m-d H:i:s');

        $this->model_product_category->where_id($id)->update($post);

        redirect("/cms/product/category");
    }
}