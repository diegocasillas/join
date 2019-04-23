<?php

class Category extends CI_Model
{
  public function __construct()
  {
    $this->load->database();
  }

  public function getCategories()
  {
    $query = $this->db->order_by('name', 'ASC')->get('categories');
    return $query->result_array();
  }

  public function getCategory($id)
  {
    $query = $this->db->get_where('categories', array('id' => $id));
    return $query->result_array();
  }
}
