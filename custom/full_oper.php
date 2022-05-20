<?php
ini_set('display_errors', 'Off');
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");


foreach($_POST as $nombre_campo => $valor){
     $asignacion = "\$" . $nombre_campo . "='" . $valor . "';";
    eval($asignacion);
}
/*BORRAR EN PROD*/
foreach($_GET as $nombre_campo => $valor){
      $asignacion = "\$" . $nombre_campo . "='" . $valor . "';";
    eval($asignacion);
}
require_once 'getDatosEmpresa.php';
switch ($opcion) {
    case "right-validation":
        getRight($id,$tipo_id);
        break;

    case "BuscarPacientesSIOS":
        BuscarPacientesSIOS($id, $tipo_id);
        break;

    case "ListarSedes":
         ListarSedes();
         break;

    case "ListarPrestadores":
        ListarTurnosPrestadores($especialidad,$iIdPacienteSios,$IdSede,  $bCitaEspecialista);
        break;

    case "BuscarTurnosPorFecha":
        BuscarTurnosPorFecha($sFecha,$sCodigoEspecialidad, $sIdSede, $sIdPrestador);
        break;

    case "InsertarCita":
        insertarCita($idPacientesSios, $IdAdministradora, $idTurno, $sFechaCita, $sRegimen, $TipoAtencion,0);
        break;

    case "ListarEspecialidades":
        ListarEspecialidades();
        break;

    case "CreatePaciente":
        CreatePaciente($cod_pac, $type_id, $primer_nombre, $segundo_nombre, $primer_apellido, $segundo_apellido, $fecha_nac_full, $direccion, $telefono_residencia, $email, $telefono_celular, $sexo);
        break;

    case "BuscarCitaID":
        recordarCita($idCita);
        break;

    case "CancelarCitaID":
        cancelarCita($idCita);
        break;

    case "BuscarPacientePorID":
        BuscarPacienteporID($idPaciente);
        break;

    case "Historial":
        verHistorial($idPaciente);
        break;

    case "test":
        test();
        break;
    
    default:
        '';
}



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
            'Authorization: Basic "'.$_SESSION['autorization_api_sios'].'"',
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

function BuscarPacientesSIOS($id,$tipo_id)//Busca paciente por cedula con tipo de id
{

    $data_array =  array(
        "sNumeroIdentificacion"        => $id,
        "sTipoIdentificacion"         => $tipo_id,
    );

    $find_paciente = callAPI('POST', $_SESSION['api_citas_url'].'pacientes/buscar', json_encode($data_array),'application/json; charset=utf-8','');
    $response = json_decode($find_paciente, true);
    //header('Content-type: text/javascript');
    

    if ($response['Estado'] == '200') {
        /*$data = $response['Paciente']['PrimerNombre'] .  ' ' . $response['Paciente']['SegundoNombre'] .  ' ' . $response['Paciente']['PrimerApellido'].  ' ' . $response['Paciente']['SegundoApellido'];
        $id_pacienteSios = $response['Paciente']['IdPaciente'];
        $array_pac_sios = array(
            "Estado" => $response['Estado'],
            "id_paciente" => $id_pacienteSios,
            "nombre"  => $data,
            "Mensaje" => $response['Mensaje'],
        );*/
        //var_dump($array_pac_sios);
        echo json_encode($response);


    } else {
        /*$array_pac_sios = array(
            "Estado" => $response['Estado'],
            "Mensaje" => $response['Mensaje'],
        );*/
        echo json_encode($response);
        //echo $response['Mensaje'];
    }
}
function BuscarPacientesBD($id_usuario,$tipo_cita,$tipo_atencion)//Busca paciente por cedula con tipo de id
{
    if($tipo_atencion=="1"){
        //Teleconsulta
        $url="http://sios1.caminosips.com/telemed/custom/operaciones.php?q=".$id_usuario."&tipo_cita=".$tipo_cita;

    }elseif($tipo_atencion=="2"){
        $url="http://sios1.caminosips.com/citasweb/custom/operaciones.php?q=".$id_usuario."&tipo_cita=".$tipo_cita;
    }

    $find_paciente = callAPI('GET', $url, '' );
    //saveLog("Buscar Regimen Pacientes: ".$find_paciente);
    //$response = json_decode($find_paciente, true);
    if ($find_paciente!='ERROR' ) {

        echo $find_paciente;
        // echo ($data.' - '.$id_pacienteSios);

    } else {
        echo 'ERROR';
    }
}
function ListarTurnosPrestadores( $sCodigoEspecialidad,  $id_pacienteSios, $sIdSede=null, $especialista=false){

    If ($especialista==0){
        $especialista=false;
    }else{
        $especialista=true;
    }

    $data_array =  array(
        "sCodigoEspecialidad"        => $sCodigoEspecialidad,
        "sIdSede"         => $sIdSede,
        "sIdPaciente" => $id_pacienteSios,
        "iTope" => "20",
        "bCitaEspecialista" => $especialista,
    );
    //var_dump($data_array);

    $get_data = callAPI('POST', $_SESSION['api_citas_url'].'turnosprestadores/buscarporespecialidad', json_encode($data_array),'application/json; charset=utf-8','');


      $response = json_decode($get_data, true);

    //iCantidadCupos = devuelve el numero de cupos disponible por medico


        echo json_encode($response);

}
function BuscarTurnosPorFecha($sFecha,$sCodigoEspecialidad, $sIdSede, $sIdPrestador){
    //function BuscarTurnosPorFecha($sCodigoEspecialidad, $sIdSede, $sFecha, $sIdPrestador, $jornada='PM'){
    //$sCodigoEspecialidad='57'; $sIdSede='13'; $sFecha='20210129'; $sIdPrestador='073571746';$jornada='PM';

    $data_array =  array(
        "sCodigoEspecialidad"   => $sCodigoEspecialidad,
        "sIdSede"         => $sIdSede,
        "sFecha" => $sFecha,
        "sIdPrestador" => $sIdPrestador,
    );
    $get_data = callAPI('POST', $_SESSION['api_citas_url'].'turnosprestadores/buscarporfecha', json_encode($data_array),'application/json; charset=utf-8','');


    $response = json_decode($get_data, true);

    if($response['Estado']=='200'){

        echo json_encode($response) ;
    }else{
        echo json_encode($response) ;
        /* $agi->exec("AGI", "googletts.agi,\" Sr Usuario se produjo un error \",es,#,1.28");
        $agi->exec("AGI", "googletts.agi,\" Lo estamos transfiriendo a un asesor  \",es,#,1.28");
        $agi->verbose("Error  $response['Estado'] - $response['Mensaje']"); */
    }


}
function BuscarPacientePorID($id_usuario)//Busca paciente por cedula con tipo de id
{

    $data_array =  array(
        "sIdPaciente"        => $id_usuario,
    );


    $find_paciente = callAPI('GET', $_SESSION['api_citas_url'].'pacientes/buscarporid/'.$id_usuario, false,'application/json; charset=utf-8','');
    $response = json_decode($find_paciente, true);

    if ($response['Estado'] == '200') {
        $response['Paciente']['Logo']=$_SESSION['Logo'];
        echo json_encode($response);


    } else {

        echo json_encode($response);

    }
}
function insertarCita($sIdPaciente, $sIdAdministradora, $iIdTurnos, $sFechaCita, $sRegimen, $sTipoAtencion, $bCitaEspecializada ){
    $sRegimen=str_replace('"', '', $sRegimen);



    $data_array =  array(
        "sIdPaciente"   => $sIdPaciente,
        "sIdAdministradora"         => $sIdAdministradora,
        "iIdTurnos" => $iIdTurnos,
        "sFechaCita" => $sFechaCita,
        "sRegimen"   => $sRegimen,
        "bCitaEspecializada" => false,
        "sTipoAtencion" => "MG",
    );


    $get_data = callAPI('POST', $_SESSION['api_citas_url'].'citas/insertar', json_encode($data_array),'application/json; charset=utf-8','');


    $response = json_decode($get_data, true);

    //echo  json_encode($response) ;


    if($response['Estado']=='200'){

        echo json_encode($response) ;

        //return ('SI');
    }else{
        echo json_encode($response) ;

    }


}

function recordarCita($idCita){
    ///BuscarPorId/19719
    /*{"ListaCitas":[],"Cita":{"iIdCita":2532081,"sFechaCita":"11\/11\/2020 16:30:00","sSede":"Consolata Caminos IPS SAS","sPrestador":"JAIME CARLOS ROCA BLANCO","sEspecialidad":"MEDICINA GENERAL TELEMEDICINA","sProgramaPyP":"","sCancelada":"NO","sAtendido":"-","sMultado":"-","sAutorizacion":"","sUsuarioRegistro":"Api","sUsuarioCancelacion":"","sConsulta":"TELEMEDICINA CONSULTA DE PRIMERA VEZ POR MEDICINA GENERAL","sHora":"","sCodigoEspecialidad":"","sMensajeConfirmacion":"","sFechaDeseada":"","sIdPaciente":"","bVigente":false,"sConsecutivoCita":"","sConsultorio":"","sIdAdministradora":"","sRegimen":"","iIdTurnos":0,"bCitaEspecializada":false,"sTipoAtencion":"","gsRutaReporte":"C:\\inetpub\\wwwroot\\ApiCitas\\Informes\\"},*/

    $get_data = callAPI('GET', $_SESSION['api_citas_url'].'citas/buscarporid/'.$idCita, false,'application/json; charset=utf-8','');

    $response = json_decode($get_data, true);

    if($response['Estado']=='200'){

        echo($get_data);
    }else{
       // saveLog("Recordando Citas: ".$response['Mensaje']);
        echo($get_data);

    }

}
function cancelarCita($idCita){

    $data_array =  array(
        "iIdCita"   => $idCita
    );
    //echo $idCita;
    $get_data = callAPI('POST', $_SESSION['api_citas_url'].'citas/cancelar', json_encode($data_array),'application/json; charset=utf-8','');

    $response = json_decode($get_data, true);

    if($response['Estado']=='200'){

        echo($get_data);
    }else{
        // saveLog("Recordando Citas: ".$response['Mensaje']);
        echo($get_data);

    }

}

function verHistorial($idPaciente){
    ///BuscarPorId/19719
    /*{"ListaCitas":[],"Cita":{"iIdCita":2532081,"sFechaCita":"11\/11\/2020 16:30:00","sSede":"Consolata Caminos IPS SAS","sPrestador":"JAIME CARLOS ROCA BLANCO","sEspecialidad":"MEDICINA GENERAL TELEMEDICINA","sProgramaPyP":"","sCancelada":"NO","sAtendido":"-","sMultado":"-","sAutorizacion":"","sUsuarioRegistro":"Api","sUsuarioCancelacion":"","sConsulta":"TELEMEDICINA CONSULTA DE PRIMERA VEZ POR MEDICINA GENERAL","sHora":"","sCodigoEspecialidad":"","sMensajeConfirmacion":"","sFechaDeseada":"","sIdPaciente":"","bVigente":false,"sConsecutivoCita":"","sConsultorio":"","sIdAdministradora":"","sRegimen":"","iIdTurnos":0,"bCitaEspecializada":false,"sTipoAtencion":"","gsRutaReporte":"C:\\inetpub\\wwwroot\\ApiCitas\\Informes\\"},*/

    $data_array =  array(
        "sIdPaciente"   => $idPaciente,
        "bVigente" => 0
    );
    //var_dump($data_array);
    $get_data = callAPI('POST', $_SESSION['api_citas_url'].'citas/historial', json_encode($data_array),'application/json; charset=utf-8','');

    $response = json_decode($get_data, true);

    if($response['Estado']=='200'){

        echo($get_data);
    }else{
        // saveLog("Recordando Citas: ".$response['Mensaje']);
        echo($get_data);

    }

}


function CreatePaciente($sNumeroIdentificacion, $sTipoIdentificacion, $sPrimerNombre, $sSegundoNombre, $sPrimerApellido, $sSegundoApellido, $sFechaNacimiento, $sDireccion, $sTelefonoResidencia, $sCorreo, $sTelefonoCelular, $sSexo){


    $data_array =  array(
        "sTipoIdentificacion" => $sTipoIdentificacion,
        "sNumeroIdentificacion" => $sNumeroIdentificacion,
        "sPrimerNombre"=> $sPrimerNombre,
        "sSegundoNombre"=> $sSegundoNombre,
        "sPrimerApellido"=>$sPrimerApellido,
        "sSegundoApellido"=>$sSegundoApellido,
        "sFechaNacimiento"=>$sFechaNacimiento,
        "sDireccion"=>$sDireccion,
        "sTelefonoResidencia"=>$sTelefonoResidencia,
        "sCorreo"=>$sCorreo,
        "sTelefonoCelular"=>$sTelefonoCelular,
        "sSexo"=>$sSexo,
    );
    //$method, $url, $data, $content_type, $token
    $get_data = callAPI('POST', $_SESSION['api_citas_url'].'pacientes/insertar', json_encode($data_array), 'application/json; charset=utf-8', '');


    $response = json_decode($get_data, true);

    if($response['Estado']=='200'){

        echo($get_data);
        
    }else{
       // saveLog("Recordando Citas: ".$response['Mensaje']);
        echo($get_data);    
    }

}
function getToken(){

    $data_array = http_build_query(
        array(
        "grant_type" => 'password',
        "client_secret" => '6447603b-4a47-4b9a-925c-96c6025f1a9f',
        "client_id" => 'right-validation',
        "username" => 'sios-hdsalud',
        "password" => 'Hju8Ghj7Yhn0'
        )
    );
    $get_data = callAPI('POST', 'https://gcp-mutualser-keycloak-prod.appspot.com/auth/realms/right-validation/protocol/openid-connect/token', $data_array,'application/x-www-form-urlencoded','');
    $response = json_decode($get_data, true);
    //var_dump($response) ;die();
    $token=$response["access_token"];

    return($token);

}
function getRight($sNumeroIdentificacion,$sTipoIdentificacion){
    // echo $sTipoIdentificacion;
    $data_array = (
    array(
        "resourceType" => 'Parameters',
        "id" => 'CorrelationId',
        "parameter" => array(
            array("name" => 'documentType',
                "valueString" => $sTipoIdentificacion),
            array(
                "name" => 'documentId',
                "valueString" => $sNumeroIdentificacion,
                //"valueString" => '1128060255',
                //"valueString" => '45544444',
                //"valueString" => '                                                                                                                                                ',
                //"valueString" => '1044627275',
            ),
            /*array(
                "name" => 'idIPS',
                "valueString" => '901111348',
            ),
            array(
                "name" => 'cupsCode',
                "valueString" => '890301',
            )*/
        )
    )
    );
    $token=getToken();


    $get_data = callAPI('POST', $_SESSION['rights_api_url'], json_encode($data_array),'application/json', $token);
    $get_data = json_decode($get_data, true);
    //Notify the browser about the type of the file using header function
    header('Content-type: text/javascript');
    //echo json_encode($get_data, JSON_PRETTY_PRINT);

    //Var_dump($get_data['entry'][0]['resource']['managingOrganizationResource']['id']) ;
    if(($get_data['entry'][0]['resource']['id']!='400-04')&&($get_data['entry'][0]['resource']['id']!='500-01')&&($get_data['entry'][0]['resource']['id']!='400-03')&&($get_data['entry'][0]['resource']['id']!='500')){
        //echo json_encode($get_data['entry'][0]['resource']['extension'], JSON_PRETTY_PRINT);//$get_data['entry'][0]['resource']['extension']['url']='mutualSER\/hl7\/patient\/healthModality'
        //die();
        $extensions=$get_data['entry'][0]['resource']['extension'];
        /* Datos de paciente que llegan de Mutual */
        $sFechaNacimiento=$get_data['entry'][0]['resource']['birthDate'];
        //$full_name=$get_data['entry'][0]['resource']['identifier']['name'][0]['text'];
        $apellidos=$get_data['entry'][0]['resource']['name'][0]['family'];
        $nombres=$get_data['entry'][0]['resource']['name'][0]['given'];
        $sPrimerNombre=$nombres[0];
        $sSegundoNombre=$nombres[1];
        $sPrimerApellido = explode("=", explode("|", $apellidos)[0])[1];
        $sSegundoApellido = explode("=", explode("|", $apellidos)[1])[1];
        $sSexo=$get_data['entry'][0]['resource']['gender'];
        $telecom=$get_data['entry'][0]['resource']['telecom'];
        $sDireccion=$get_data['entry'][0]['resource']['address'][0]['text'];
        $ciudad=$get_data['entry'][0]['resource']['address'][0]['city'];
        $sZipCode=explode("=", explode("|", $ciudad)[0])[1];
        $ciudad=explode("=", explode("|", $ciudad)[1])[1];
        $sDepartamento=$get_data['entry'][0]['resource']['address'][0]['state'];
        $sDepartamento=explode("=", explode("|", $sDepartamento)[1])[1];


        if($sSexo=='FEMALE'){
            $sSexo='F';
        }else{
            $sSexo='M';
        }

        foreach ($telecom as $valor){
            if($valor['system']=='phone'){
                $use = $valor['use'];

                if($use == 'home'){
                    $sTelefonoResidencia=  $valor['value'];
                }
                if($use == 'mobile'){
                    $sTelefonoCelular =  $valor['value'];
                }
            }
            else{
                if($valor['system']=='email'){
                    $sCorreo=$valor['value'];
                }
            }
        }
        //$tipo_id, $id
        $data_array2 =  array(
            "sTipoIdentificacion" => $sTipoIdentificacion,
            "sNumeroIdentificacion" => $sNumeroIdentificacion,
            "sPrimerNombre"=> $sPrimerNombre,
            "sSegundoNombre"=> $sSegundoNombre,
            "sPrimerApellido"=>$sPrimerApellido,
            "sSegundoApellido"=>$sSegundoApellido,
            "sFechaNacimiento"=>$sFechaNacimiento,
            "sDireccion"=>$sDireccion,
            "sTelefonoResidencia"=>$sTelefonoResidencia,
            "sCorreo"=>$sCorreo,
            "sTelefonoCelular"=>$sTelefonoCelular,
            "sSexo"=>$sSexo,
          //  "full_name" => $full_name,
            "sCiudad" => $ciudad,
            "sZipCode" => $sZipCode,
            "sDepartamento" => $sDepartamento,
        );
        //print_r($sTipoIdentificacion);

        foreach ($extensions as $valor){

            $url = $valor['url'];

            //mutualSER\/hl7\/patient\/afilliateStatus

            if($url == 'mutualSER/hl7/patient/healthModality'){
                $regimen=  $valor['valueCoding']['code'];

            }
            if($url == 'mutualSER/hl7/patient/afilliateStatus'){
                $estado_afiliado=  $valor['valueCoding']['display'];

            }
            if($url == 'mutualSER/hl7/patient/programs'){
                $programs_extensions=  $valor['extension'][0];
                if (!empty($programs_extensions)) {
                    $programa = $programs_extensions['valueCoding']['display'];
                }else{
                    $programa = 'False';
                }

            }


            if($valor['url'] == 'mutualSER/hl7/patient/managingOrganization')
            {
                $ips_ab=$valor['extension'][0]['valueCoding']['code'];
                $ips_ab_Name=$valor['extension'][0]['valueCoding']['display'];
            }
        }
        //echo $_SESSION['nit'];
        if($ips_ab==$_SESSION['nit'] && $estado_afiliado=='ACTIVO'){//Nit de empresa donde se atendera
            

            $res=  array( "estado"=>'200', "mensaje" => "Encontrado para la IPS", "estado_afiliado"=>$estado_afiliado, "ips_id"=> $ips_ab,  "ips_name"=> $ips_ab_Name, 'regimen'=> $regimen, 'tipo'=> 'Capita+PGP','programa' => $programa, 'paciente'=> $data_array2);


        }else {
            //echo $_SESSION['Municipio'];
            if($ciudad==$_SESSION['Municipio']){
                $res=  array("estado"=>'200', "mensaje" => "Encontrado en otra IPS", "estado_afiliado"=>$estado_afiliado, "ips_id"=> $ips_ab,"ips_name"=> $ips_ab_Name, 'regimen'=> $regimen, 'tipo'=> 'EV', 'programa' => $programa, 'paciente'=> $data_array2);
            }
            $res=  array("estado"=>'201', "mensaje" => "Encontrado en otra IPS", "estado_afiliado"=>$estado_afiliado, "ips_id"=> $ips_ab,"ips_name"=> $ips_ab_Name, 'regimen'=> $regimen, 'tipo'=> 'PGP', 'programa' => $programa, 'empresa'=> $_SESSION['nombre_empresa'], 'paciente'=> $data_array2);
        }
        echo json_encode($res);//CAMBIO

    }else{
        //var_dump($get_data);die();
        $data_array = (
        array(
            "estado" => $get_data['entry'][0]['resource']['id'],
            "mensaje" => $get_data['entry'][0]['resource']['issue']['details']['text'],
            'regimen'=> 'Error',
            'empresa'=> $_SESSION['nombre_empresa']
        )
        );
        echo json_encode($data_array);//CAMBIO
    }




}
function ListarSedes(){

    $ListarSedes = callAPI('GET', $_SESSION['api_citas_url'].'sedes/listar', '','application/json; charset=utf-8','');
    $response = json_decode($ListarSedes, true);

    if ($response['Estado'] == '200') {
        
        echo json_encode($response);


    } else {
       
        echo json_encode($response);
        //echo $response['Mensaje'];
    }
}
function ListarEspecialidades(){

    $ListarEsp = callAPI('GET', $_SESSION['api_citas_url'].'especialidades/listar', '','application/json; charset=utf-8','');
    $response = json_decode($ListarEsp, true);
    //var_dump($ListarEsp);die();
    if ($response['Estado'] == '200') {
        
        echo json_encode($response);


    } else {
        
        echo json_encode($response);
       
    }
}


?>