<?php
ini_set('display_errors', '0');

foreach ($_GET as $nombre => $valor ){
    $$nombre=$valor;
    }
foreach ($_POST as $nombre => $valor ){
    $$nombre=$valor;
    }
?>

<html>
  <head>
    <title>Historial de Citas</title>

      <meta http-equiv="Content-Type" content="text/html; charset=utf-8">

      <!--IMPORTANDO LAS HOJAS DE ESTILO -->

      <link rel="icon" type="image/png" href="/imagenes/favicon.ico" />

      <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/smoothness/jquery-ui.css">

      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">

      <link rel="stylesheet" href="css/jqbtk.min.css">

      <link rel="stylesheet" href="css/style.css">

      <!--<link rel="stylesheet" href="sweetalert2.min.css">-->

      <style type="text/css">
        .row{
        margin-top:40px;
        padding: 0 10px;
        }
        .clickable{
            cursor: pointer;   
        }

        .panel-heading div {
          margin-top: -18px;
          font-size: 15px;
        }
        .panel-heading div span{
          margin-left:5px;
        }
        .panel-body{
          display: none;
        }
      </style>

      <link rel="shortcut icon" type="image/x-icon" href="/imagenes/favicon.ico" />

      <!-- IMPORTANDO LIBRERIAS JS BOOTSTRRAP JQUERY Y JQUERY UI, DEMAS LIBRERIAS -->
	  <!-- Insert this line above script imports  -->
	  <script>if (typeof module === 'object') {window.module = module; module = undefined;}</script>
	  
      <script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>

      <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"></script>

      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>

      <script src="js/jqbtk.min.js"></script>

      <script src="js/moment.js"></script>

      <script src="https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/6.11.5/sweetalert2.all.js"></script>

      <script language="JavaScript" src="js/citasmedicas.js" type="text/javascript"></script>

      <script language="JavaScript" src="js/admhormed.js" type="text/javascript"></script>

      <script language="JavaScript" src="js/menu.js" type="text/javascript"></script>

      <script src="js/functions.js?version=?v=<?php echo rand()?>"></script>
	  
	  <!-- Insert this line after script imports -->
	  <script>if (window.module) module = window.module;</script>

	  

      <script type="text/javascript">
        $(document).ready(function() {
          $('form').on('submit', function(e){
            // validation code here
            //validar(e);
            e.preventDefault();
            
          });
        });
      </script>
	  <script type="text/javascript" language="javascript">
		$(document).ready(function() {
        $("input:submit").click(function() { return false; });
		});
</script>

  </head>
    <!--INICIO DE SOFTWARE -->
  <body>

  

  <div class="container">
    <div class="row">
      <div class="jumbotron">
        <div id="inf_pac" class="form-horizontal">
          <form class="form-horizontal" id='form' name="form" data-toggle="validator">
            <fieldset>

            <!-- Form Name -->
            <legend>Historial de  Citas</legend>
            <!-- Select Basic -->
            <div class="form-group">
              <label class="col-md-4 control-label" for="type_id">Tipo de identificacion</label>
              <div class="col-md-5">
                <select id="type_id" name="type_id" class="form-control">
                  <option value="CC">Cedula de Ciudadania</option>
                  <option value="TI">Tarjeta de Identidad</option>
                  <option value="RC">Registro Civil</option>
                  <option value="CE">Cedula de Extrangeria</option>
                </select>
              </div>
            </div>

            <!-- Search input-->
            <div class="form-group">
              <label class="col-md-4 control-label" for="idPaciente">Identificacion</label>
              <div class="col-md-5">
                <input id="id_pac" name="id_pac" placeholder="Ingrese numero de documento" class="form-control input-md"  required="" type="search">
              </div>
            </div>
                      
            <div class="form-group">
              <label class="col-md-4 control-label" for="tipo"></label>
              <div class="col-md-5">
                <p class="help-block">Por favor Señor usuario, Siga las instrucciones, ingrese su numero de identificacion!. </p>
              </div>
            </div>
            

            <!-- Button -->
            <div class="form-group">
              <label class="col-md-4 control-label" for="singlebutton">Buscar</label>
              <div class="col-md-4">
                <button id="singlebutton" name="singlebutton" onclick="historialCitas()" class="btn btn-primary">    ---&gt;</button>
              </div>
            </div>
            </fieldset>
          </form>

        </div>
        <!-- Resultado de la Operacion -->
        <div id="resultado"></div>
        <!-- #messages is where the messages are placed inside -->
        <div class='form-group'>
          <div class='col-md-9 col-md-offset-3'>
            <div id='messages'></div>
            <div id="datepicker" class="col-md-6"></div>
        <!--Calendario con citas y cupos --> 
        <div id="tabla_cupos" class="hidden">
          <div class="col-md-6">
            <div class="panel panel-primary">
              <div class="panel-heading">
                <h3 class="panel-title">Escoja su horario</h3>
                <div class="pull-right">
                  <span class="clickable filter" data-toggle="tooltip" title="Mostrar Filtro de Formulario" data-container="body">
                    <i class="glyphicon glyphicon-filter"></i>
                  </span>
                </div>
              </div>
              <div class="panel-body">
                <input type="text" class="form-control" id="dev-table-filter" data-action="filter" data-filters="#dev-table" placeholder="Filtrar Cupo" />
              </div>
              <table class="table table-hover" id="dev-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Hora</th>
                    <th>Sede</th>
                    <th id="fecha_label"></th>
                  </tr>
                </thead>
                <tbody id="tbody">
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <p>
        <b>
        Señor usuario, si no puede asistir a la cita programada, por favor cancelar con 6 horas de anticipación a la línea de Call Center 6549888 opción 2,  recuerde que la inasistencia a citas genera multa pedagógica.
        </b>
      </p>
      
      </div>
    </div>    
      
      
  </div>
  <form name="forma" action="" method="POST" id="forma1">
    <input  name="iIdPacienteImprimir" id="iIdPacienteImprimir" type="hidden" value="">
    <input name="idCitaAsignada" id="idCitaAsignada" type="hidden" value="">

  </form>
  
  </body>
</html>