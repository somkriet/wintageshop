<?php
if(!defined('BASEPATH')) exit('No direct script access allowed');
Class all_model extends CI_Model
{
    function __construct()
    {
        parent::__construct();
        // $this->leave = $this->load->database('test', TRUE);
    }

    public function call_all($query)
    {
        $q = $this->db->query($query);

        return $q->result();
    }

    public function call_not($query)
    {
        $q = $this->db->query($query);
    }

    function fetch_all()
     {
      $query = $this->db->get("product");
      return $query->result();
     }
 
    // public function leave_call_all($query)
    // {
    //     $this->db->reconnect();
    //     $q = $this->leave->query($query);

    //     return $q->result();
    // }

}
?>