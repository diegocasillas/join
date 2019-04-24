<?php
class CategoryController extends CI_Controller
{
  public function __construct()
  {
    header('Access-Control-Allow-Origin:*');
    parent::__construct();
    $this->load->model('category');
    $this->load->helper('url_helper');
  }

  public function index()
  {
    $data['categories'] = $this->category->getCategories();
    $this->output
      ->set_status_header(200)
      ->set_content_type('application/json')
      ->set_output(json_encode($data['categories']));
  }

  public function show($id)
  {
    $data['category'] = $this->category->getCategory($id);
    $this->output
      ->set_status_header(200)
      ->set_content_type('application/json')
      ->set_output(json_encode($data['category']));
  }
}
