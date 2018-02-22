<?php

if (!function_exists('convert_currency_amount')) {
    function convert_currency_amount($amount, $to_Currency)
    {

        $ci =& get_instance();

        return $ci->ConvertCurrencyAmount($amount, $to_Currency);

        // $from_Currency = "THB";
        // $thb = 37;
        // $add_usd = ($thb*5)/100;
        // $thb = $thb-$add_usd;
        // if(strtolower($to_Currency) == "usd"){
        //   return number_format($amount/$thb,2);
        // }else{
        //   return $amount;
        // }
        // exit();
    }
}

function rgb2hex($rgb)
{
    $hex = "#";
    $hex .= str_pad(dechex($rgb[0]), 2, "0", STR_PAD_LEFT);
    $hex .= str_pad(dechex($rgb[1]), 2, "0", STR_PAD_LEFT);
    $hex .= str_pad(dechex($rgb[2]), 2, "0", STR_PAD_LEFT);

    return $hex;
}

function send_mail($src_params = array())
{
    $default_params = array(
        'from_email' => NULL,
        'from_name'  => NULL,
        'to_email'   => NULL,
        'subject'    => NULL,
        'message'    => NULL,
        'mailtype'   => 'text',
        'attach'     => NULL,
        'bcc'        => NULL
    );

    $params = array_merge($default_params, $src_params);

    $from_email = $params['from_email'];
    $from_name = $params['from_name'] !== NULL ? $params['from_name'] : $from_email;
    $to_email = $params['to_email'];
    $subject = $params['subject'];
    $message = $params['message'];
    $mailtype = $params['mailtype'];
    $attach = $params['attach'];
    $bcc = $params['bcc'];

    $ci =& get_instance();

    $ci->load->library('email');
    $ci->email->clear(TRUE);
    $ci->config->load('email');

    $c_email = $ci->config->item('email');
    $c_email['mailtype'] = $mailtype;

    $ci->email->initialize($c_email);
    $ci->email->from($from_email, $from_name);
    $ci->email->to($to_email);

    ($attach != NULL) ? $ci->email->attach($attach) : '';
    ($bcc != NULL) ? $ci->email->bcc($bcc) : '';

    $ci->email->subject($subject);
    $ci->email->message($message);
    $ci->email->send();

    return $ci->email->print_debugger();
}

function resize($data, $width = 1600, $height = 1600)
{
    $ci =& get_instance();
    $ci->load->library('image_lib');
    $config_resize['source_image'] = $data;
    $config_resize['create_thumb'] = FALSE;
    $config_resize['maintain_ratio'] = TRUE;
    $config_resize['quality'] = '80%';
    $config_resize['width'] = $width;
    $config_resize['height'] = $height;
    $ci->image_lib->initialize($config_resize);
    $ci->image_lib->resize();
}

function rotate($src)
{
    $ci =& get_instance();
    $ci->load->library('image_lib');

    $rotation_angle = 0;
    $exif = @exif_read_data($src); //ต้องใส่ @ เพราะรูป png หรือบางรูป มันจะ error
    if (isset($exif['Orientation'])) {
        $ort = $exif['Orientation'];
        switch ($ort) {
            case 3: // 180 rotate left
                $rotation_angle = 180;
                break;
            case 6: // 90 rotate right
                $rotation_angle = 270;
                break;
            case 8: // 90 rotate left
                $rotation_angle = 90;
                break;
        }
    }

    $config['source_image'] = $src;
    $config['rotation_angle'] = $rotation_angle;

    $ci->image_lib->initialize($config);
    $ci->image_lib->rotate();
}

if (!function_exists('get_thai_month')) {
    function get_thai_month()
    {
        return array(
            1  => 'มกราคม',
            2  => 'กุมภาพันธ์',
            3  => 'มีนาคม',
            4  => 'เมษายน',
            5  => 'พฤษภาคม',
            6  => 'มิถุนายน',
            7  => 'กรกฎาคม',
            8  => 'สิงหาคม',
            9  => 'กันยายน',
            10 => 'ตุลาคม',
            11 => 'พฤศจิกายน',
            12 => 'ธันวาคม',
        );
    }
}

if (!function_exists('get_one_thai_month')) {
    function get_one_thai_month($id)
    {
        $thai_month = get_thai_month();
        return $thai_month[$id];
    }
}

if (!function_exists('get_sm_thai_month')) {
    function get_sm_thai_month()
    {
        return array(
            1  => 'ม.ค.',
            2  => 'ก.พ.',
            3  => 'มี.ค.',
            4  => 'เม.ย',
            5  => 'พ.ค.',
            6  => 'มิ.ย.',
            7  => 'ก.ค.',
            8  => 'ส.ค.',
            9  => 'ก.ย.',
            10 => 'ต.ค.',
            11 => 'พ.ย.',
            12 => 'ธ.ค.',
        );
    }
}

if (!function_exists('get_one_sm_thai_month')) {
    function get_one_sm_thai_month($id)
    {
        $mini_thai_month = get_sm_thai_month();
        return $mini_thai_month[$id];
    }
}

if (!function_exists('month_year_present')) {
    function month_year_present($to_present, $to_month, $to_year)
    {
        return ($to_present === '1') ? 'ปัจจุบัน' : get_one_sm_thai_month($to_month) . ' ' . $to_year;
    }
}

if (!function_exists('thai_date')) {
    function thai_date($date)
    {
        if ($date === '0000-00-00 00:00:00' || $date === '0000-00-00') {
            return "N/A";
        }
        $time = strtotime($date);
        $day = date("j", $time);
        $month = get_one_sm_thai_month(date("n", $time));
        $year = date("Y", $time) + 543;
        return $day . ' ' . $month . ' ' . $year;
    }
}

if (!function_exists('thai_date_time')) {
    function thai_date_time($date)
    {
        $ar_time = explode(' ', $date);
        return thai_date($date) . ' | ' . $ar_time[1];
    }
}

function lang_site_url($uri = '', $protocol = NULL)
{
    $ci =& get_instance();

    $url_lang = 'th/';
    if ($ci->uri->segment(1) != '' && $ci->session->has_userdata('url_lang')) {
        $url_lang = $ci->session->userdata('url_lang') . '/';
    }

    return get_instance()->config->site_url($url_lang . $uri, $protocol);
}


/**
 * Google Analytic Ecommerce
 * https://developers.google.com/analytics/devguides/collection/analyticsjs/ecommerce
 */
function getTransactionJs(&$trans)
{
    return <<<HTML
ga('ecommerce:addTransaction', {
  'id': '{$trans['id']}',
  'revenue': '{$trans['revenue']}',
  'shipping': '{$trans['shipping']}',
  'tax': '{$trans['tax']}',
  'currency': '{$trans['currency']}'
});
HTML;
}

function getItemJs(&$transId, &$item)
{
    return <<<HTML
ga('ecommerce:addItem', {
  'id': '$transId',
  'name': '{$item['name']}',
  'category': '{$item['category']}',
  'price': '{$item['price']}',
  'quantity': '{$item['quantity']}',
  'currency': '{$item['currency']}'
});
HTML;
}