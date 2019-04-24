<?php

class Attendance extends CI_Model
{
  public function __construct()
  {
    $this->load->database();
  }

  public function getAttendances()
  {
    if (isset($_GET['user'])) {
      $user = $_GET['user'];
      $query = $this->db->order_by('id', 'DESC')->get_where('attendance', array('userId' => $user));
    } else {
      $query = $this->db->order_by('id', 'DESC')->get('attendance');
    }

    return $query->result_array();
  }

  public function getAttendance($id)
  {
    $query = $this->db->get_where('attendance', array('id' => $id));
    return $query->result_array();
  }

  public function insertAttendance($data)
  {
    $query = $this->db->insert('attendance', $data);

    $insertedId = $this->db->insert_id();
    $query = $this->db->get_where('attendance', array('id' => $insertedId));

    return $query->result_array();
  }

  public function deleteAttendance($id)
  {
    return $this->db->delete('attendance', array('id' => $id));
  }
}
