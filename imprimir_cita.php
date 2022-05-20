<?php 

ini_set('display_errors', 'Off'); 



foreach ($_GET as $nombre => $valor ){
		$$nombre=$valor;
		}
foreach ($_POST as $nombre => $valor ){
		//echo "$nombre => $valor   ";
		$$nombre=$valor;
		}


?>
<html>
<head>
<script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>

      <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"></script>

      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>


    <!-- Nucleo Icons -->
    <link href="assets/css/nucleo-icons.css" rel="stylesheet" />
    <link href="assets/css/nucleo-svg.css" rel="stylesheet" />
    <!-- CSS Files -->
    <link id="pagestyle" href="assets/css/soft-ui-dashboard.css?v=1.0.3" rel="stylesheet" />
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/smoothness/jquery-ui.css">
    <!--     Fonts and icons     -->
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet" />
    <!-- Nucleo Icons -->
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="apple-touch-icon" sizes="76x76" href="assets/img/apple-icon.png">
    <link rel="icon" type="image/png" href="assets/img/favicon.png">

      <!--<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>-->

      <script src="https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/6.11.5/sweetalert2.all.js"></script>

      <!---<script src="https://cdn.jsdelivr.net/npm/promise-polyfill"></script>-->

      <!--<script language="JavaScript" src="js/citasmedicas.js" type="text/javascript"></script>

      <script language="JavaScript" src="js/admhormed.js" type="text/javascript"></script>

      <script language="JavaScript" src="js/menu.js" type="text/javascript"></script>-->

      <script src="assets/js/functions.js?v=<?php echo rand()?>"></script>
	  
<title>Imprimir Cita</title>

</head>
<body>

<div align="center">
<h1>Informacion de la Cita</h1>

<div id="logo"></div>
<table style="border:1px #0033ff solid" width="300" cellspacing="5">
    <tr style="border:1px #0033ff solid">
      <td style="border:1px #0033ff solid"><b>Nombres y Apellidos</b></td>
      <td style="border:1px #0033ff solid"><div id="nombre_paciente_sios"></div> </td>
    </tr>
    <tr style="border:1px #0033ff solid">
      <td style="border:1px #0033ff solid"><b>Tipo de Identificacion</b></td>
      <td style="border:1px #0033ff solid"><div id="tipo_id_sios"></div>  </td>
    </tr>
    <tr style="border:1px #0033ff solid">
      <td style="border:1px #0033ff solid"><b>Identificacion</b></td>
      <td style="border:1px #0033ff solid"><div id="idenificacion_paciente_sios"></div> </td>
    </tr>
    <tr style="border:1px #0033ff solid">
      <td style="border:1px #0033ff solid"><b>Fecha y Hora</b></td>
      <td style="border:1px #0033ff solid"><div id="fecha_cita_sios"></div>  </td>
    </tr>
    <tr style="border:1px #0033ff solid">
      <td style="border:1px #0033ff solid"><b>Prestador</b></td>
      <td style="border:1px #0033ff solid"><div id="prestador_sios"></div>  </td>
    </tr>
    <tr style="border:1px #0033ff solid">
      <td style="border:1px #0033ff solid"><b>Tipo de Cita</b></td>
      <td style="border:1px #0033ff solid"><div id="especilidad_sios"></div>  </td>
    </tr>
    <tr style="border:1px #0033ff solid">
      <td style="border:1px #0033ff solid"><b>Sede</b></td>
      <td style="border:1px #0033ff solid"><div id="sede_sios"></div></td>
    </tr>
    <tr style="border:1px #0033ff solid">
      <td style="border:1px #0033ff solid"><b>Solicitado el dia</b></td>
      <td style="border:1px #0033ff solid">
        <b><?php echo date("d/m/Y H:i:s"); ?></b>
      </td>
  </tr>
  <tr>
<!--     <tr>
      <td>Entidad</td>
      <td>Comeba</td>
    </tr> -->
  </table>
  
    Fecha de elaboracion : 
<?php 
	$dia=date("l");

if ($dia=="Monday") $dia="Lunes";
if ($dia=="Tuesday") $dia="Martes";
if ($dia=="Wednesday") $dia="Miércoles";
if ($dia=="Thursday") $dia="Jueves";
if ($dia=="Friday") $dia="Viernes";
if ($dia=="Saturday") $dia="Sabado";
if ($dia=="Sunday") $dia="Domingo";

$mes=date("F");

if ($mes=="January") $mes="Enero";
if ($mes=="February") $mes="Febrero";
if ($mes=="March") $mes="Marzo";
if ($mes=="April") $mes="Abril";
if ($mes=="May") $mes="Mayo";
if ($mes=="June") $mes="Junio";
if ($mes=="July") $mes="Julio";
if ($mes=="August") $mes="Agosto";
if ($mes=="September") $mes="Septiembre";
if ($mes=="October") $mes="Octubre";
if ($mes=="November") $mes="Noviembre";
if ($mes=="December") $mes="Diciembre";

$ano=date("Y");

$dia2=date("d");

	echo "$dia, $dia2 de $mes de $ano";
	
	//echo date('l jS \of F Y h:i:s A'); ?>
    </h1>
    <br/>
    <a href="javascript:print();"><b>Imprimir</b></a> el comprobante de cita<br/>
    <a href="javascript:window.close();"><b>Cerrar</b></a></div>
    </div>


<?php
echo '<script> BuscarCitasPorId('.$idCitaAsignada.',"'.$IdEmpresa.'");';
echo 'BuscarPacientePorId('.$iIdPacienteImprimir.',"'.$IdEmpresa.'");</script>';
?>
</body>
</html>
