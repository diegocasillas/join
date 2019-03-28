<?php
class EventController extends CI_Controller
{
  public function __construct()
  {
    parent::__construct();
    $this->load->model('event');
    $this->load->helper('url_helper');
  }

  public function index()
  {
    $data['events'] = $this->event->getEvents();
    $this->output
      ->set_status_header(200)
      ->set_content_type('application/json')
      ->set_output(json_encode($data['events']));
  }

  public function show($id)
  {
    $data['events'] = $this->event->getEvent($id);
    $this->output
      ->set_status_header(200)
      ->set_content_type('application/json')
      ->set_output(json_encode($data['events']));
  }

  public function create()
  {
    $data = array(
      'name' => $this->input->post('name'),
      'description' => $this->input->post('description'),
      'thumbnail' => $this->input->post('thumbnail'),
      'location' => $this->input->post('location'),
      'date' => $this->input->post('date'),
      'manager' => $this->input->post('manager')
    );

    $event = $this->event->insertEvent($data);

    $this->output
      ->set_status_header(200)
      ->set_content_type('application/json')
      ->set_output(json_encode($event));
  }
}
