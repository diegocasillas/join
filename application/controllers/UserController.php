<?php
class UserController extends CI_Controller
{
  public function __construct()
  {
    parent::__construct();
    $this->load->model('user');
    $this->load->helper('url_helper');
  }

  public function index()
  {
    $data['users'] = $this->user->getUsers();
    $this->output
      ->set_status_header(200)
      ->set_content_type('application/json')
      ->set_output(json_encode($data['users']));
  }

  public function show($id)
  {
    $data['users'] = $this->user->getUser($id);
    $this->output
      ->set_status_header(200)
      ->set_content_type('application/json')
      ->set_output(json_encode($data['users']));
  }
}
