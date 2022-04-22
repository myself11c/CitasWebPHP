<?php

$data=callAPI('GET','http://apioficinavirtualreactjsdev-env.eba-e52atg8q.us-west-2.elasticbeanstalk.com/empresas/IdEmpresa/6106cf13d71dc264a783923d', '','application/json; charset=utf-8;text','');

//$get_data = callAPI('POST', $_SESSION['rights_api_url'], json_encode($data_array),'application/json', $token);

$data = json_decode($data, true);
    //Notify the browser about the type of the file using header function
header('Content-type: text/javascript');

//echo $data['objConexiones'];
//var_dump($data['empresas'][0]['objConexiones']);
echo json_encode($data['empresas'][0]['objConexiones'], JSON_PRETTY_PRINT);

/*$data =  array(
    "Usuario"        => "CAMINOS",
    "Clave"         => "901111348",
);*/
/*   "Usuario": "CAMINOS",
    "Clave": "901111348"
*/
//$data=callAPI('POST','http://apioficinavirtualreactjsdev-env.eba-e52atg8q.us-west-2.elasticbeanstalk.com/usuariosApis/validarIngreso', $data,'application/json; charset=utf-8;text','');

//$data = json_decode($data, true);
//Notify the browser about the type of the file using header function
//header('Content-type: text/javascript');

//print_r($data);

/*
 * if($sNumeroIdentificacion=="1047384926"){
                $res=  array("estado"=>'200', "mensaje" => "Usuario de prueba", "estado_afiliado"=>"Activo", "ips_id"=> "prueba","ips_name"=> "prueba", 'regimen'=> "C", 'tipo'=> 'EV', 'programa' => "", 'paciente'=> $data_array2);
            }*/

/* Seteo de Variables de la parametrizacion */

$_SESSION['api_citas_url'] =$data['empresas'][0]['objConexiones']['api_citas_url'];

$_SESSION['nit']=$data['empresas'][0]['objConexiones']['_SESSION_nit'];

$_SESSION['usuario_mutual']=$data['empresas'][0]['objConexiones']['_SESSION_usuario_mutual'];

$_SESSION['contraseña_mutual']=$data['empresas'][0]['objConexiones']['_SESSION_contraseña_mutual'];

$_SESSION['autorization_api_sios'] =$data['empresas'][0]['objConexiones']['_SESSION_autorization_api_sios'];

$_SESSION['rights_api_url'] =$data['empresas'][0]['objConexiones']['_SESSION_rights_api_url'];

$_SESSION['token_rights_api_url'] =$data['empresas'][0]['objConexiones']['_SESSION_token_rights_api_url'];

echo $_SESSION['token_rights_api_url'];

function callAPI($method, $url, $data, $content_type, $token)
{
    $curl = curl_init();
    switch ($method) {
        case "POST":
            curl_setopt($curl, CURLOPT_POST, 1);
            if ($data)
                curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
            break;

        case "PUT":
            curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "PUT");
            if ($data)
                curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
            break;

        default:
            if ($data)
                $url = sprintf("%s?%s", $url, http_build_query($data));
    }

    // OPTIONS:

    curl_setopt($curl, CURLOPT_URL, $url);
    if($content_type=='application/json; charset=utf-8;text'){
        curl_setopt($curl, CURLOPT_HTTPHEADER, array(
            'Content-Type:'. 'application/json; charset=utf-8;',
        ));
    }else if($content_type=='application/json; charset=utf-8'){
        curl_setopt($curl, CURLOPT_HTTPHEADER, array(
            'Authorization: Basic "aGVlZHNhbHVkOkJodThOamk5TWtvMA=="',
            'Content-Type:'. $content_type,
        ));
    }else{

        curl_setopt($curl, CURLOPT_HTTPHEADER, array(
            'Authorization: Bearer '.$token.'',
            'Content-Type:'. $content_type,
        ));

    }

    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
    // EXECUTE:
    $result = curl_exec($curl);
    // Comprueba el código de estado HTTP
    if(curl_errno($curl))
    {
        echo 'Curl error: ' . curl_error($curl). "\n";
    }
    // Close handle
    

    if (!curl_errno($curl)) {
        switch ($http_code = curl_getinfo($curl, CURLINFO_HTTP_CODE)) {
            case 200:  # OK
                break;
            case 400:# No encontrado
                break; 
            case 404:# No hay datos
                break;
            case 500:# Ya hay datos
                break;     
            default:
                echo 'Unexpected HTTP code: ', $http_code, "\n";
        }
    }

    if (!$result) {
        die("Connection Failure");
    }
    curl_close($curl);
    return $result;
}

?>