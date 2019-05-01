<?php
class AttendanceController extends CI_Controller
{
  public function __construct()
  {
    header('Access-Control-Allow-Origin:*');
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    parent::__construct();
    $this->load->model('attendance');
    $this->load->helper('url_helper');
  }

  public function index()
  {

    $data['attendances'] = $this->attendance->getAttendances();
    $this->output
      ->set_status_header(200)
      ->set_content_type('application/json')
      ->set_output(json_encode($data['attendances']));
  }

  public function show($id)
  {
    $data['attendance'] = $this->attendance->getAttendance($id);
    $this->output
      ->set_status_header(200)
      ->set_content_type('application/json')
      ->set_output(json_encode($data['attendance']));
  }

  public function create()
  {
    $this->load->helper(array('form', 'url'));

    $this->load->library('form_validation');

    $data = array(
      'userId' => $this->input->post('userId'),
      'eventId' => $this->input->post('eventId'),
    );

    $attendance = $this->attendance->insertAttendance($data);

    return $this->output
      ->set_status_header(200)
      ->set_content_type('application/json')
      ->set_output(json_encode($attendance));
  }

  public function delete($id)
  {
    header('Access-Control-Allow-Origin:*');
    $this->attendance->deleteAttendance($id);

    $this->output
      ->set_status_header(200)
      ->set_content_type('application/json')
      ->set_output(json_encode(array()));
  }
}
