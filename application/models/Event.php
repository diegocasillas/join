<?php

class Event extends CI_Model
{
  public function __construct()
  {
    $this->load->database();
  }

  public function getEvents()
  {
    $query = $this->db->get('events');
    return $query->result_array();
  }

  public function getEvent($id)
  {
    $query = $this->db->get_where('events', array('id' => $id));
    return $query->result_array();
  }
}
