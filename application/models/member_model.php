<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class member_model extends CI_Model
{


    public function getMember()
    {
        $query = $this->db->query('SELECT * FROM member');
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return array();
        }
    }

   
}