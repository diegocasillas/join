<?php

class User extends CI_Model
{
  public function __construct()
  {
    $this->load->database();
  }

  public function getUsers()
  {
    $query = $this->db->get('users');
    return $query->result_array();
  }
}
