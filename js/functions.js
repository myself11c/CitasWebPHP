//Variables generales 
var iIdPacienteSios;
var puertoWeb="";
var tipo_consulta;
var cod_medSIOS;
var NombrePrestadorSIOS;
var idPaciente;
var nombrePaciente;
var bCitaEspecialista='0';
var sCodigoEspecialidad;
var selectSedes;
var tipo_usuario;//Cambiar por metodo de consulta de BD 
var tipo_text;
var administradraContributivo='016';
var TipoAtencion='MG';
var administradraSubsidiado= '001';
var tipo_temp;
var sRegimen;
var botonSedes = '<button id="singlebutton" name="singlebutton" onclick="MostrarListaSede(\'."\'no\'".\')" class="btn btn-primary"> Siguiente   -&gt;</button>';
var fromularioPacienteNuevo= '<div id="datos_citas">'+
'<form class="form-horizontal">'+
'<fieldset>'+
'<!-- Form Name -->'+
'<legend>Nuevo Usuario</legend>'+
'<!-- Text input-->'+
'<div class="form-group row" id="div_cod_pac">'+
  
'</div>'+
'<!-- Select Basic -->'+
'<div class="form-group row">'+
  '<label class="col-md-4 control-label" for="type_id">Tipo</label>'+
  '<div class="col-md-4">'+
    '<select id="type_id" name="type_id" class="form-control">'+
      '<option value="CC">Cedula de Ciudadania</option>'+
      '<option value="TI">Tarjeta de Identidad</option>'+
      '<option value="RC">Registro Civil</option>'+
      '<option value="CE">Cedula de Extrangeria</option>'+
    '</select>'+
  '</div>'+
'</div>'+
'<!-- Text input-->'+
'<div class="form-group row">'+
  '<label class="col-md-4 control-label" for="nombre">Primer Nombre</label>'+  
  '<div class="col-md-4">'+
  '<input id="primer_nombre" name="primer_nombre" placeholder="Primer Nombre" class="form-control input-md" required="" type="text">'+
  '</div>'+
'</div>'+
'<!-- Text input-->'+
'<div class="form-group row">'+
  '<label class="col-md-4 control-label" for="nombre">Segundo Nombre</label>'+  
  '<div class="col-md-4">'+
  '<input id="segundo_nombre" name="segundo_nombre" placeholder="Segundo Nombre" class="form-control input-md" required="" type="text">'+
  '</div>'+
'</div>'+
'<!-- Text input-->'+
'<div class="form-group row">'+
  '<label class="col-md-4 control-label" for="nombre">Primer Apellido</label>'+  
  '<div class="col-md-4">'+
  '<input id="primer_apellido" name="primer_apellido" placeholder="Primer Apellido" class="form-control input-md" required="" type="text">'+
  '</div>'+
'</div>'+
'<!-- Text input-->'+
'<div class="form-group row">'+
  '<label class="col-md-4 control-label" for="nombre">Segundo apellido</label>'+  
  '<div class="col-md-4">'+
  '<input id="segundo_apellido" name="segundo_apellido" placeholder="Segundo Apellido" class="form-control input-md" required="" type="text">'+
  '</div>'+
'</div>'+
'<!-- Text input-->'+
'<div class="form-group row">'+
  '<label class="col-md-4 control-label" for="direccion">Direccion</label>'+ 
  '<div class="col-md-4">'+
    '<input id="direccion" name="direccion" placeholder="Direccion" class="form-control input-md" required="" type="text">'+
  '</div>'+
'</div>'+

'<!-- Text input-->'+
'<div class="form-group row">'+
  '<label class="col-md-4 control-label" for="telefono">Telefono Residencia</label>'+
  '<div class="col-md-4">'+
    '<input id="telefono_residencia" name="telefono_residencia" placeholder="Telefono Residencia" class="form-control input-md" required="" type="text">'+
  '</div>'+
'</div>'+

'<!-- Text input-->'+
'<div class="form-group row">'+
  '<label class="col-md-4 control-label" for="telefono">Telefono Celular</label>'+
  '<div class="col-md-4">'+
    '<input id="telefono_celular" name="telefono_celular" placeholder="Telefono Celular" class="form-control input-md" required="" type="text">'+
  '</div>'+
'</div>'+

'<!-- Text input-->'+
'<div class="form-group row">'+
'  <label class="col-md-4 control-label" for="fecha_nac">Fecha de Nacimiento</label>'+
  '<div class="col-md-4">'+
  '<input id="fecha_nac" name="fecha_nac" placeholder="aaaa-mm-dd" class="form-control input-md" required="" type="text">'+   
  '</div>'+
'</div>'+

'<!-- Text input-->'+
'<div class="form-group row">'+
  '<label class="col-md-4 control-label" for="email">Correo Electronico</label>'+ 
  '<div class="col-md-4">'+
  '<input id="email" name="email" placeholder="correo@sudominio.com" class="form-control input-md" required="" type="text">'+
  '</div>'+
'</div>'+

'<!-- Text input-->'+
'<div class="form-group row">'+
  '<label class="col-md-4 control-label" for="remail">Confirmar Correo</label>'+
  '<div class="col-md-4">'+
  '<input id="remail" name="remail" placeholder="correo@sudominio.com" class="form-control input-md" required="" type="text">'+
    
  '</div>'+
'</div>'+

'<!-- Select Basic -->'+
'<div class="form-group row">'+
  '<label class="col-md-4 control-label" for="sexo">Sexo</label>'+
  '<div class="col-md-4">'+
    '<select id="sexo" name="sexo" class="form-control">'+
      '<option value="Masculino">Masculino</option>'+
      '<option value="Femenino">Femenino</option>'+
    '</select>'+
  '</div>'+
'</div>'+

'</fieldset>'+
'<input name="cod_pac_nuevo" type="hidden" value="" id="cod_pac">'+
'<input name="nuevo" type="hidden" value="nuevo" id="nuevo">'+
'</form>'+

'<button id="singlebutton" name="singlebutton" onclick="MostrarListaSede(\'new\')" class="btn btn-primary"> Siguiente   -&gt;</button>'+


'</br>'+
'</br>'+
'</div>';
var ajax_headers={ 'Authorization' :'Basic ' + btoa('caminosips' + ':' + 'caminos1_xxxx') };

var formulario_Sedes='<!-- Select Basic -->'+
'<div class="form-group row"><form id="sedes">'+
  '<label class="col-md-4 control-label" for="check_sedes">Si desea ver todas las sedes seleccione esta opcion</label>'+
  '<div class="col-md-4">'+
    '<label class="checkbox-inline" for="checkboxes">'+
    '<input type="checkbox" onchange="cheked_sedes()"  name="all_sedes" value="false" id="all_sedes">'+
    'Todas las sedes'+
  '</label>'+
  '</div>'+
'</div>'+

'<!-- Select Basic -->'+
'<div class="form-group row">'+
  '<label class="col-md-4 control-label" for="sede">Sede</label>'+
  '<div class="col-md-4">'+
   '<select id="sede_sios" name="sede_sios" onchange="validarSedeRegimen()" class="form-control">'+
    '</select>'+
  '</div>'+
'</div>'+

'<!-- Select Basic -->'+
'<div class="form-group row">'+
  '<label class="col-md-4 control-label" for="tipo">Prestador</label>'+
  '<div class="col-md-4">'+
    '<select id="prestadores_fecha" name="prestadores_fecha" onchange="Calendario(\'\')" class="form-control">'+
      '<option value=""></option>'+
    '</select>'+
  '</div>'+
'</div>'+
'<input name="cod_pac" type="hidden" value="$cod_pac" id="cod_pac">'+
'</form>'+

'<button id="singlebutton" name="singlebutton" onclick="ListDoctors(\'new\')" class="btn btn-primary"> Siguiente   -&gt;</button>';

var loader_div='<div class="loader">'+
          '<div class="dot"></div>'+
          '<div class="dot"></div>'+
          '<div class="dot"></div>'+
          '<div class="dot"></div>'+
          '<div class="dot"></div>'+
          '</div>';

$.datepicker.regional['es'] = {
     closeText: 'Cerrar',
     prevText: '<Ant',
     nextText: 'Sig>',
     currentText: 'Hoy',
     monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
     monthNamesShort: ['Ene','Feb','Mar','Abr', 'May','Jun','Jul','Ago','Sep', 'Oct','Nov','Dic'],
     dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
     dayNamesShort: ['Dom','Lun','Mar','Mié','Juv','Vie','Sáb'],
     dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','Sá'],
     weekHeader: 'Sm',
     dateFormat: 'yy-mm-dd',
     firstDay: 1,
     isRTL: false,
     showMonthAfterYear: false,
     yearSuffix: ''
  };
$.datepicker.setDefaults($.datepicker.regional['es']);
  
  /*function teclado(id){
    $('#'+id).keyboard();
    console.log('#'+id);
  }*/


  /*$(function(){
    
    $('#email').keyboard();
    $('#remail').keyboard();
    $('#direccion').keyboard();
    $('#telefono').keyboard();
    $('#custom').keyboard({
      layout:[
        [['a','A'],['b','B'],['c','C'],['del','del']],
        [['shift','shift'],['space','space']]
      ]
    });
    $('#id_pac').keyboard({
      layout:[
        [['7'],['8'],['9']],
        [['4'],['5'],['6']],
        [['1'],['2'],['3']],
        [['del'],['0'],['']]
      ]
    });
    $('#password').keyboard();
    $('#initcaps').keyboard({initCaps:true});
    $('#addInputBtn').click(function(){
      $(this).parent().append($('<input>').attr('type','text').addClass('form-control').addClass('keyboard'));
      $(this).siblings('.keyboard').keyboard();
    });
    $('#removeInputBtn').click(function(){
      $(this).siblings('.keyboard').last().remove();
    });
  });*/


function asignaCita(id_obj,id_hora,id_medico,val_hora,val_medico,obj_nombre,id_nomb_med,id_email,id_telefono,id_direccion){
  var obj = document.getElementById(id_obj);
  var hora = document.getElementById(id_hora);
  var medico = document.getElementById(id_medico);  
  var nomb_med = document.getElementById(id_nomb_med);
  var telefono = document.getElementById(id_telefono);
  var email = document.getElementById(id_email);  
  var direccion = document.getElementById(id_direccion);

  
  if (obj.title == 'Disp'){
    //buscar otros elementos que esten seleccionados
    // y resetear su valor
    if (obj.innerHTML != "X") {
      vaciarEstados();
      obj.innerHTML = "X";
      hora.value =val_hora;
      medico.value = val_medico;
      $('#hora_cita_d').html(val_hora);
      
      //Aqui va Correo, Email, Telefono
      nomb_med.innerHTML = obj_nombre[val_medico];
      }
    else {
      obj.innerHTML = "&nbsp;";
      hora.value ='';
      medico.value = '';
      nomb_med.innerHTML = '';
      }
    }
  }

function wait(ms){
  var start = new Date().getTime();
  var end = start;
  while(end < start + ms) {
    end = new Date().getTime();
 }
}

//Ventana de confirmacion de citas -- SWALERT(\''+data.ListaTurnos[i].sHora+','+sede_label+','+fecha_labelSWAL+'\')
function validarCita(hora_cita, sede, fecha_cita,idTurno,fecha_sios){
  
  console.log('VALIDAR CITA IN');
  //console.log("Nombre paciente: "+nombrePaciente);

 var textoConfirmarSWAL=
      '<b>Medico:</b>'+
      NombrePrestadorSIOS+'<br>'+
    '<b>Tipo de cita:</b>'+
      ''+tipo_text+'</br>'+
    '<b>Identificacion</b>'+
      ''+idPaciente+'</br>'+
    '<b>Usuario:</b>'+
      ''+nombrePaciente+'</br>'+
    '<b>Fecha:</b>'+
      ''+fecha_cita+'</br>'+
    '<b>Hora:</b>'+
      ''+hora_cita+'</br>'+
    '<!--<b>Sede:</b>'+
      ''+sede+'</br>-->';
//aqui
//var textoConfirmarSWAL='<b>Medico:</b>'+
     // ' '+NombrePrestadorSIOS;

var textoImprimirSWAL='<b>Desea imprimir recordatorio?</b>';

var textoCopagoSWAL='';

swal.fire({
  title: 'Confirmar datos de la cita',
  html: textoConfirmarSWAL,
  type: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Confirmar',
  cancelButtonText: 'Cancelar',
}).then((Confirmar) => {
  //var listaAdministradoras= listarAdministradoras();
  //console.log(listaAdministradoras);
  if (tipo_usuario=='S' || tipo_usuario=='EV'){
    //1 SUBISIADO
    //2 CONTRIBUTIVO
    //3 EVENTO
    //EV evento #tipoAtencion MG medicina General ES Especialista 
    //
    IdAdministradora='8';
  }else{
    //
    IdAdministradora='9';
  }
  if (Confirmar.value) {
    //AJAX insertar cita -->
    var objJson = new Object();
      objJson.sIdPaciente = ''+iIdPacienteSios+'';
      objJson.sIdAdministradora = IdAdministradora;
      objJson.iIdTurnos = idTurno;
      objJson.sFechaCita = fecha_sios+' '+hora_cita;
      if(tipo_usuario=='EV'){
        TipoAtencion='EV';
        tipo_usuario='S';
        
      }
      objJson.sRegimen = tipo_usuario;
      console.log("REGIMEN ANTES DE INSERTAR"+ objJson.sRegimen);
      objJson.bCitaEspecializada = bCitaEspecialista;
      objJson.sTipoAtencion = TipoAtencion;

    //DATA={"sIdPaciente": "10002", "sIdAdministradora": "3831","iIdTurnos": 12917,"sFechaCita": "2014430 08:30","sRegimen": "C","bCitaEspecializada": 1, "sTipoAtencion": "MG"} 
    //{"sIdPaciente":68910,"sIdAdministradora":"001","iIdTurnos":"96371","sFechaCita":"20180830 14:15","sRegimen":"S","bCitaEspecializada":"0","sTipoAtencion":"MG"}
    
    console.log(JSON.stringify(objJson));

    console.log('custom/full_oper.php?idPacientesSios='+iIdPacienteSios+'&IdAdministradora='+IdAdministradora+'&idTurno='+idTurno+ '&sFechaCita='+objJson.sFechaCita+'&sRegimen='+tipo_usuario+'&TipoAtencion='+TipoAtencion+'&bCitaEspecialista=0&opcion=InsertarCita');

    $.ajax(
      {
          type: "GET",
          url: 'custom/full_oper.php?idPacientesSios='+iIdPacienteSios+'&IdAdministradora='+IdAdministradora+'&idTurno='+idTurno+ '&sFechaCita='+objJson.sFechaCita+'&sRegimen='+tipo_usuario+'&TipoAtencion=MG'+'&bCitaEspecialista=false&opcion=InsertarCita',
          //data: (objJson),
          //headers: ajax_headers,
          contentType: "application/json; charset=utf-8",
          //dataType: "json",
          crossDomain: true,
          cache: false,
         success: function (data) {
             var data=JSON.parse(data);
           var estado= data.Estado;
           var mensaje = data.Mensaje;
           if (estado =='200'){
            idCitaAsignada = data.Cita.IdCita;
             if(TipoAtencion=='EV'){
               console.log('Id CIta SIOS: '+idCitaAsignada+' Id Paciente SIOS'+IdPacienteSios);
               //guardarMySql(idCitaAsignada, iIdPacienteSios);
               //cod_pac //telefono //tipo_cita //cod_med //fecha_cita //fecha_solicitud
               //Llamar a recordatorio obligatoriamente 
               recordatorio_cita();
             }
             if(TipoAtencion=='C'){
              //textoCopagoSWAL='Cita asociada a cobro de cuota moderadora, recuerde cancelar el monto de acuerdo a su categoria.<br>';
             }
             
             
            swal.fire({

              title: 'Cita confirmada exitosamente!',
              html: 'Consecutivo cita: '+data.Cita.ConsecutivoCita+'<br> '+textoCopagoSWAL+" <br> Consultorio:"+data.Cita.Consultorio+"<br>"+textoImprimirSWAL,
              type: 'success',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Imprimir',
              cancelButtonText: 'Cancelar',
            }).then((Imprimir) => {
              if (Imprimir.value) {      
                
                //DATOS PARA IMPRIMIR 
                /*
                NOMBRE PACIENTE -- 
                FECHA CITA 
                ESPECIALIDAD
                MEDICO
                SEDE
                FECHA SOLICITUD
                Referencia a objeto no establecida como instancia de un objeto.[crearTabla]
                Al hacer clic en "Enviar",  acepta enviar su informacion al Centro Oftalmologico Ebenezer, que se compromete a usarla de conformidad con su politica de privacidad.                                     
En cumplimiento al Artículos 10 del Decreto 1377 de 2013, solicitamos su autorización para continuar con el tratamiento de sus datos personales con el fin de recolectar, recaudar, almacenar, usar, circular, suprimir, procesar, compilar, intercambiar, dar tratamiento, actualizar, disponer de los datos personales que usted nos ha suministrado y que han sido incorporados en las bases de datos con las que cuenta el Centro Oftalmologico Ebenezer. Así mismo usted podrá ejercer los derechos de conocer, actualizar,  rectificar, suprimir, solicitar prueba de la autorización, ser informado del uso de sus datos personales, presentar ante la Superintendencia de Industria y Comercio quejas por infracciones a los dispuesto en la presente ley y las demás normas que la modifiquen, adicionen o complementen, para cualquier inquietud al respecto ponemos a su disposición el correo electrónico oficialdeprivacidad@ebenezeroftalmologia.com
                */
               
               //console.log('SUBMIT-1');

               $('#idCitaAsignada').val(idCitaAsignada);
               $('#iIdPacienteImprimir').val(iIdPacienteSios);
               console.log('idCitaAsignada '+idCitaAsignada);
               console.log('iIdPacienteSios '+iIdPacienteSios);
               if(puertoWeb==':443'){
                $('#puertoWeb').val(puertoWeb);
              }else{
                $('#puertoWeb').val(puertoWeb);
                
              }
              console.log('PuertoWeb '+puertoWeb);
                 var forma = document.getElementById('forma1');
                 
                 window.open('','imprimir_cita');
                 forma.target='imprimir_cita';
               
                 forma.action='imprimir_cita.php';
                 
                 forma.submit();
                // console.log('SUBMIT-2');
                location.reload();
              }else{
                 // function when cancel button is clicked
                console.log('NO PRINT : --GOOD BYE--');
                location.reload();
              }
            },function(dismiss){
              if(dismiss == 'cancel'){
                  // function when cancel button is clicked
                console.log('NO PRINT : --GOOD BYE--');
                location.reload();
              }
              });
           }
           if (estado =='500'){
             var cadena='Referencia a objeto no establecida como instancia de un objeto.[crearTabla]';
             var mensajeLimpio=mensaje.replace(cadena, '');
             console.log(mensaje);
            swal.fire({
              type: 'warning',
              title: 'Atención',
              text: mensajeLimpio,
             // footer: '<a href="caminosips.com/faq"></a>'
            });
           }
 
 
           //console.log('Estado '+ estado+ ' Mensaje '+ mensaje);
           //var ret = JSON.stringify(data);
           //console.log('Respuesta insertar cita: '+ret);
           //var obj = JSON.parse(ret);
           $('#messages').html('');   
           
 
         },
 
         error: function (xmlHttpRequest, textStatus, errorThrown) {
           alert("error: " + xmlHttpRequest.responseText);
         }
      });
   
  }
});
}
function BuscarCitasPorId(idCita, puertoWeb){
  var arr_cita = {};
    $.ajax(
      {
         type: "GET",
         url: 'custom/full_oper.php?idcita'+idCita+'&opcion=BuscarCitaID',
         //data: JSON.stringify(objJson),
         headers: ajax_headers,
         contentType: "application/json; charset=utf-8",
         dataType: "json",
         crossDomain: true,
         cache: false,
         success: function (data) {
           var estado= data.Estado;
           var mensaje = data.Mensaje;
           if (estado =='200'){
             $('#fecha_cita_sios').html('<b>'+data.Cita.sFechaCita+'</b>');
             $('#sede_sios').html('<b>'+data.Cita.sSede+'</b>');
             $('#prestador_sios').html('<b>'+data.Cita.sPrestador+'</b>');
             $('#especilidad_sios').html('<b>'+data.Cita.sEspecialidad+'</b>');
            //arr_cita={"sFechaCita":data.Cita.sFechaCita,"sSede":data.Cita.sSede,"sPrestador":data.Cita.sPrestador,"sEspecialidad":data.Cita.sEspecialidad};
          
 
           }
           if (estado =='500'){
            //arr_cita={};
            console.log('500');
           }

          

 
         },
 
         error: function (xmlHttpRequest, textStatus, errorThrown) {
           alert("error: " + xmlHttpRequest.responseText);
         }
      });
}
function BuscarPacientePorId(idPaciente, puertoWeb){
  //var arr_paciente= {};
  
$.ajax(
  {
     type: "GET",
     url: 'http://190.61.55.218:8023/apicitas/apicitas/pacientes/buscarporid/'+idPaciente,
     //data: JSON.stringify(objJson),
     headers: ajax_headers,
     contentType: "application/json; charset=utf-8",
     dataType: "json",
     crossDomain: true,
     cache: false,
     success: function (data) {
       var estado= data.Estado;
       var mensaje = data.Mensaje;
       if (estado =='200'){
        $('#tipo_id_sios').html('<b>'+data.Paciente.sTipoIdentificacion+'</b>');
        $('#idenificacion_paciente_sios').html('<b>'+data.Paciente.sNumeroIdentificacion+'</b>');
        $('#nombre_paciente_sios').html('<b>'+data.Paciente.sPrimerNombre+' '+data.Paciente.sSegundoNombre+
        ' '+data.Paciente.sPrimerApellido+' '+data.Paciente.sSegundoApellido+'</b>');
      
       }
       if (estado =='500'){
       // arr_paciente= {};
       console.log('500');
       }     
       

     },

     error: function (xmlHttpRequest, textStatus, errorThrown) {
       alert("error: " + xmlHttpRequest.responseText);
     }
  });
  
}


function  listarAdministradoras(){
  //sCodigo:001, sNombre : MUTUAL SER ESS
  //sCodigo:016, sNombre : MUTUAL SER_CONTRIBUTIVO
  
  //var arr_Admin={'sCodigo':'001', 'sNombre':'MUTUAL SER ESS', 'sCodigo':'016', 'sNombre':'MUTUAL SER_CONTRIBUTIVO'};

  $.ajax(
    {
       type: "GET",
       url: 'http://190.61.55.218:8023/apicitas/apicitas/administradoras/listar',
       //data: JSON.stringify(objJson),
       headers: ajax_headers,
       contentType: "application/json; charset=utf-8",
       dataType: "json",
       crossDomain: true,
       cache: false,
       success: function (data) {
         var estado= data.Estado;
         var mensaje = data.Mensaje;
         if (estado =='200'){
         
         }
         if (estado =='404'){
           
         }
        // console.log('Estado '+ estado+ ' Mensaje '+ mensaje);
         var ret = JSON.stringify(data);
        // console.log('Respuesta administradoras: '+ret);

       },
       error: function (xmlHttpRequest, textStatus, errorThrown) {
         alert("error: " + xmlHttpRequest.responseText);
       }
    });
  
}


/* Inicio de Modificacion software, CONEXION SIOS  */
//Busqueda de paciente en BD 
function showUser(cod_pac, type_id)
{
  //console.log('Consultando usuario en afiliados');
  //setTimeout(tipo_usuario=getEstadoAfiliado(idPaciente),10000);
  
  jQuery.support.cors = true;
  var headerHTML = "<table border='1' cellpadding='2' cellspacing='2' class='table-hover table-bordered'><tr>"+
  "<th class='font-weight-bold'>Tipo de Documento</th>"+
  "<th class='font-weight-bold'>Documento</th>" +
  "<th class='font-weight-bold'>Primer Nombre</th>" +
  "<th class='font-weight-bold'>Segundo Nombre</th>"+
  "<th class='font-weight-bold'>Primer Apellido</th>" +
  "<th class='font-weight-bold'>Segundo Apellido</th>" +
  "</tr>";
  var footerHTML= "</table><br>"+
  '<button id="singlebutton" name="singlebutton" onclick="MostrarListaSede(\'no\')" class="font-weight-bold btn btn-primary"> Siguiente   -&gt;</button>';
  var objJson = new Object();
    objJson.sTipoIdentificacion = type_id;
    objJson.sNumeroIdentificacion = cod_pac;

  //var strJSON=JSON.stringify('{"sTipoIdentificacion":"CC","sNumeroIdentificacion":'+str+'}');
  //console.log(objJson);
  
   
  
  
    $.ajax(
     {
         type: "GET",
         url: 'custom/full_oper.php?id='+cod_pac+'&tipo_id='+type_id+'&opcion=BuscarPacientesSIOS',
         //data: (objJson),
         //headers: ajax_headers,
         contentType: "application/json; charset=utf-8",
         //dataType: "json",
         crossDomain: true,
         cache: false,
        success: function (data) {

          var data=JSON.parse(data);
          console.log(data);
          var mensaje = data.Mensaje;
          var estado= data.Estado;
          if (estado =='200'){
            var tipo_id='<td>'+data.Paciente.TipoIdentificacion+'</td>';
            var identificacion='<td>'+data.Paciente.NumeroIdentificacion+'</td>';
            var nombre1='<td>'+data.Paciente.PrimerNombre+'</td>';
            var nombre2='<td>'+data.Paciente.SegundoNombre+'</td>';
            var apellido1='<td>'+data.Paciente.PrimerApellido+'</td>';
            var apellido2='<td>'+data.Paciente.SegundoApellido+'</td>';
            var sios_id_pac='<input type="hidden" id="siosId" name="siosId" value="'+data.Paciente.IdPaciente+'">';
            var trHTML=tipo_id+identificacion+nombre1+nombre2+apellido1+apellido2;
            //console.log("$('#inf_pac').html(headerHTML+\"<tr border='1' bgcolor='#58ACFA' style='color:white;'>\"+trHTML+'</tr>'+footerHTML+sios_id_pac);");
            $('#inf_pac').html(headerHTML+"<tr border='1' bgcolor='#58ACFA' style='color:white;'>"+trHTML+'</tr>'+footerHTML+sios_id_pac);
            iIdPacienteSios=data.Paciente.IdPaciente;
            idPaciente=cod_pac;
            nombrePaciente=data.Paciente.PrimerNombre+' '+data.Paciente.SegundoNombre+' '+data.Paciente.PrimerApellido+' '+data.Paciente.SegundoApellido;
            //console.log("Nombre paciente: "+nombrePaciente);

          }
          if (estado =='404'){
            var div_cod_pac='<label class="col-md-4 control-label" for="textinput">Identificacion</label>'+
            '<div class="col-md-4">'+
              '<p class="form-control-static">'+cod_pac+'</p>'+
            '</div>';
            $('#inf_pac').html(fromularioPacienteNuevo);
            $('#div_cod_pac').html(div_cod_pac);
            $('#cod_pac').val(cod_pac);
            $('#type_id').val(type_id);
          }


          console.log('Estado '+ estado+ ' Mensaje '+ mensaje);
          var ret = JSON.stringify(data);
          console.log('Respuesta paciente: '+ret);
          //var obj = JSON.parse(ret);
          $('#messages').html('');   
          

        },

        error: function (xmlHttpRequest, textStatus, errorThrown) {
          alert("error: " + xmlHttpRequest.responseText);
        }
     });
}//FIN CONSULTA SIOS PACIENTE


//funcion Verificar las citas perdidas MULTADO
function Multado(){  
  var Respuesta_Multa;
  //console.log(iIdPacienteSios);
    $.ajax(
      {
       type: "GET",
         url: 'http://190.61.55.218:8023/apicitas/apicitas/citas/ValidarUltimaCitaIncumplida/'+iIdPacienteSios,
         headers: ajax_headers,
         contentType: "application/json; charset=utf-8",
         dataType: "json",
         crossDomain: true,
         cache: false,
         success: function (data) {
           console.log(JSON.stringify(data));
           console.log("Verificando inasistencia: IN");
           var estado= data.Estado;
           var mensaje = data.Mensaje;

           var fecha_Cita = data.Cita.sFechaCita;//revisar  TODO
           var sede_Cita = data.Cita.sSede;
           var prestador_Cita = data.Cita.sPrestador;
           var especialidad_Cita = data.Cita.sEspecialidad;
           var lab_enf='NO';

           console.log('ESPECIALIDAD :'+especialidad_Cita)

           if(especialidad_Cita == 'LABORATORIO CLINICO' || especialidad_Cita == 'ENFERMERIA'){
            lab_enf='SI';
           }
            
           if (mensaje =='Tiene citas incumplidas.' && lab_enf== 'NO'){
             
              //sEspecialidad --- LABORATORIO CLINICO --- ENFERMERIA 
              // && (especialidad_Cita == 'LABORATORIO CLINICO' || especialidad_Cita == 'ENFERMERIA') 1143387343
              //console.log("Verificando inasistencia: IN");

              Respuesta_Multa=true;

                swal.fire({
                  
                  allowOutsideClick: false,
                  allowEscapeKey: false, 
                  title: '¡Atención, lea detenidamente!',
                  html: 'Señor usuario, no se puede continuar con el proceso de asignación de citas, debido a que usted presenta una multa pedagógica pendiente por incumplimiento en la asistencia a cita. <b><br>Fecha: '+fecha_Cita+'<br> Prestador: '+prestador_Cita+'<br> Sede: '+sede_Cita+'<br> Especialidad: '+especialidad_Cita+'</b><br><br><h3>Por favor acérquese a la sede más cercana y dirigirse a trabajo social en los siguientes horarios: <br><br> <b>Lunes, Miércoles y Viernes de 10:00 am a 12:00 m – 2:00 pm. a 4:00 pm</b> ',
                  type: 'warning',
                  showCancelButton: false,
                  confirmButtonColor: '#3085d6',
                  confirmButtonText: 'Aceptar',
                
                }).then((Aceptar) => {
                  if(Aceptar) {      
                    location.reload();
                  }
                });
             
           }else{
            //Respuesta_Multa=false;
            console.log('No Hay MULTA');
           }
           
 
 
           console.log('Estado '+ estado+ ' Mensaje '+ mensaje);
           var ret = JSON.stringify(data);
           //console.log(ret);
           //var obj = JSON.parse(ret);   
           //return;
 
         },
          
          
         error: function (xmlHttpRequest, textStatus, errorThrown) {
           alert("error: " + xmlHttpRequest.responseText);
         }
      });
      console.log("Verificando inasistencia: OUT");
      return Respuesta_Multa;

}

function ActualizarDatosPacientes() {


  var objJson = new Object();

  //Buscar Paciente
  $.ajax({
    type: "GET",
    url: 'http://190.61.55.218:8023/apicitas/apicitas/pacientes/buscarporid/' + iIdPacienteSios,
    //data: JSON.stringify(objJson),
    headers: ajax_headers,
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    crossDomain: true,
    cache: false,
    success: function (data) {
      var estado = data.Estado;
      var mensaje = data.Mensaje;
      if (estado == '200') {
        var ret = JSON.stringify(data);
        console.log(ret);
        objJson.sTipoIdentificacion = data.Paciente.sTipoIdentificacion;
        objJson.sNumeroIdentificacion = data.Paciente.sNumeroIdentificacion;
        objJson.sPrimerNombre = data.Paciente.sPrimerNombre;
        objJson.sSegundoNombre = data.Paciente.sSegundoNombre;
        objJson.sPrimerApellido = data.Paciente.sPrimerApellido;
        objJson.sSegundoApellido = data.Paciente.sSegundoApellido;
        objJson.sFechaNacimiento = data.Paciente.sFechaNacimiento;
        objJson.sDireccion = data.Paciente.sDireccion;
        //objJson.sTelefonoResidencia = data.Paciente.sTelefonoResidencia;
        //objJson.sCorreo = data.Paciente.sCorreo;
        //objJson.sTelefonoCelular = data.Paciente.sTelefonoCelular;
        objJson.iIdPaciente = data.Paciente.iIdPaciente;
        objJson.sSexo = data.Paciente.sSexo;


        //SwAlert Info para actualizar
        //Telefono y Correo
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
          },
          buttonsStyling: false,
          allowOutsideClick: false, 
        });
        

        Swal.mixin({
          input: 'text',
          confirmButtonText: 'Siguiente &rarr;',
         // showCancelButton: true,
          //cancelButtonText: 'Cancelar',
          allowOutsideClick: false, 
          progressSteps: ['1', '2', '3']
        }).queue([{
            title: 'Por favor actualiza tus datos!',
            text: 'Correo Electronico'
          },
          {
            title: 'Por favor actualiza tus datos!',
            text: 'Telefono Celular'
          },
          {
            title: 'Por favor actualiza tus datos!',
            text: 'Telefono Fijo'
          },
        ]).then((result) => {
          if (result.value) {
            console.log(result.value);
            var answers = result.value;
            Swal.fire({
              showCancelButton: true,
              allowOutsideClick: false, 
              title: 'Todo Listo!',
              html: `
                Los datos ingresadoos son los siguientes:
                <b>Correo:</b>${answers[0]}<br>
                <b>Tel Celular:</b>${answers[1]}<br>
                <b>Tel Fijo:</b>${answers[2]}<br>
              `,
              confirmButtonText: 'Aceptar',
              cancelButtonText: 'Cancelar'
            }).then((result) => {

              if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
              ) {
                ActualizarDatosPacientes();
                // swalWithBootstrapButtons.fire(
                //   'Cancelled',
                //   'Your imaginary file is safe :)',
                //   'error'
                // )
              }


              if(answers[0]==''|| answers[1]==''|| answers[2]==''){
                Swal.fire({
                  
                  allowOutsideClick: false, 
                  title: 'Error!',
                  html: `
                    Los datos ingresadoos no pueden ser vacios.
                  `,
                  icon: 'error',
                  confirmButtonText: 'Aceptar',
                  
                }).then((result) => {
                  ActualizarDatosPacientes();
                });
              } else if (result.value) {
                objJson.sTelefonoResidencia = answers[2]+' '+answers[1];
                objJson.sCorreo = answers[0];
                objJson.sTelefonoCelular = answers[1]+'-'+answers[2];
                console.log(tipo_text);
                ejecutarUpdate(objJson, swalWithBootstrapButtons);

                
              } 
            });
          } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
              ) {
                ActualizarDatosPacientes();
                // swalWithBootstrapButtons.fire(
                //   'Cancelled',
                //   'Your imaginary file is safe :)',
                //   'error'
                // )
              }
        });

      }

      if (estado == '500') {
        // arr_paciente= {};
        console.log('500');
      }


    },

    error: function (xmlHttpRequest, textStatus, errorThrown) {
      alert("error: " + xmlHttpRequest.responseText);
    }
  });

}


function ejecutarUpdate(objJson, swalWithBootstrapButtons){

  console.log(JSON.stringify(objJson));
  console.log(tipo_text);
  $.ajax(
     {
        type: "POST",
        url: 'http://190.61.55.218:8023/apicitas/apicitas/pacientes/actualizar',
        data: JSON.stringify(objJson),
        headers: ajax_headers,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        crossDomain: true,
        cache: false,
        success: function (data) {
          console.log(JSON.stringify(data));
          //alert("data: " + JSON.stringify(data));
          
         // $('#inf_pac').html(loader_div);
          //$('#inf_pac').html('<img  style="margin: 0 auto" class="img-responsive text-center" src="https://sios1.caminosips.com/cime/imagenes/cargando.gif" />');
          var estado= data.Estado;
          var mensaje = data.Mensaje;
          //iIdPacienteSios=data.Paciente.iIdPaciente;
          var cadena='Referencia a objeto no establecida como instancia de un objeto.[crearTabla]';
           mensaje=mensaje.replace(cadena, '');
          if (estado =='200'){
            swalWithBootstrapButtons.fire(
                  'Exito!',
                  'Tus datos han sido actualizados exitosamente.',
                  'success'
                );
            
            //$('#inf_pac').html(formulario_Sedes);
            //$('#sede_sios').html(selectSedes);
            $('#prestadores_fecha').attr("disabled","disabled"); 
            $('#singlebutton').hide();
           // $('#sede_sios').attr("disabled","disabled");  
            validarSedeRegimen();
          }else{
            swal.fire({
              type: 'error',
              title: 'Se ha producido un error',
              text: 'No se pudo actualizar el usuario!',
              
            });
            //$('#inf_pac').html(mensaje);
            //$('#sede_sios').html(selectSedes);
            ///$('#inf_pac').html(formulario_Sedes);

            //$('#iIdPacienteSios').val(iIdPacienteSios);
            //ActualizarDatosPacientes();
          }
          


          console.log('Estado '+ estado+ ' Mensaje '+ mensaje);
          var ret = JSON.stringify(data);
          //console.log(ret);
          //var obj = JSON.parse(ret);   
          //return;

        },

         
        error: function (xmlHttpRequest, textStatus, errorThrown) {
          alert("error: " + xmlHttpRequest.responseText);
        }
    });

}

//Funcion para Consultar sedes SIOS
function MostrarListaSede(caso){
  
  //var Multa =Multado();
  if(caso == 'new'){
    //Validando usuario nuevo
    var telefono_residencia = $('#telefono_residencia').val();
    var telefono_celular = $('#telefono_celular').val();
    var type_id = $('#type_id').val();
    var primer_nombre = $('#primer_nombre').val();
    var segundo_nombre = $('#segundo_nombre').val();
    var primer_apellido = $('#primer_apellido').val();
    var segundo_apellido = $('#segundo_apellido').val();
    var direccion = $('#direccion').val();
    var fecha_nac = $('#fecha_nac').val();
    var sexo = $('#sexo').val();
    var email = $('#email').val();
    var remail = $('#remail').val();
    var cod_pac = $('#cod_pac').val();

    if (isEmpty(primer_nombre)) {
        
      
      console.log('VALIDANDO VACIO');
      alert("Favor rellene todos los campos, primer nombre  esta vacio!");
      
      return;
    }
    if (isEmpty(primer_apellido)) {
        
      
      console.log('VALIDANDO VACIO');
      alert("Favor rellene todos los campos, primer apellido esta vacio!");
      
      return;
    }
    if (isEmpty(segundo_apellido)) {
        
      
      console.log('VALIDANDO VACIO');
      alert("Favor rellene todos los campos, Segundo apellido esta vacio!");
      
      return;
    }

    if (isEmpty(telefono_residencia)) {
        
      
      console.log('VALIDANDO VACIO');
      alert("Favor rellene todos los campos, telefono residencia esta vacio!");
      
      return;
    }
    if (isEmpty(telefono_celular)) {
        
      
      console.log('VALIDANDO VACIO');
      alert("Favor rellene todos los campos, telefono celular esta vacio!");
      
      return;
    }
    if (isEmpty(direccion)) {
        
      
      console.log('VALIDANDO VACIO');
      alert("Favor rellene todos los campos, direccion esta vacio! ");
      
      return;
    }

    if (isEmpty(email)) {
        
      
      console.log('VALIDANDO VACIO');
      alert("Favor rellene todos los campos, E-mail esta vacio!!");
      
      return;
    }
    if (isEmpty(remail)) {
        
      
      console.log('VALIDANDO VACIO');
      alert("Favor rellene todos los campos, debe confirmar el correo!");
      
      return;
    }
    if (isEmpty(fecha_nac)) {
        
      
      console.log('VALIDANDO VACIO');
      alert("Favor rellene todos los campos, fecha de nacimiento se encuentra vacio!");
      
      return;
    }
    /*if( !validarEmail() ){
      console.log('Mail incorrecto');
      return false;
    }*/

    //moment().format();
    var fecha_nac_full= fecha_nac+'T00:00:00';
    if (!moment(fecha_nac_full).isValid()) {
      alert("La fecha de nacimiento se encuentra en un formato invalido, Por favor usar el siguiente aaaa-mm-dd");
      return;
    } else {
      console.log('Valid Date');
    }
    //insertar paciente a la base de datos de SIOS
    ///apicitas/pacientes/insertar
    var objJson = new Object();
    objJson.sTipoIdentificacion = type_id;
    objJson.sNumeroIdentificacion = cod_pac;
    objJson.sPrimerNombre= primer_nombre;
    objJson.sSegundoNombre= segundo_nombre;
    objJson.sPrimerApellido=primer_apellido;
    objJson.sSegundoApellido=segundo_apellido;
    objJson.sFechaNacimiento=fecha_nac_full;
    objJson.sDireccion=direccion;
    objJson.sTelefonoResidencia=telefono_residencia;
    objJson.sCorreo=email;
    objJson.sTelefonoCelular=telefono_celular;
    objJson.sSexo=sexo;
    objJson.iIdPaciente=0;
    nombrePaciente=primer_nombre+' '+segundo_nombre+' '+primer_apellido+' '+segundo_apellido;
    //console.log("Nombre paciente: "+nombrePaciente);
            
  //var strJSON=JSON.stringify('{"sTipoIdentificacion":"CC","sNumeroIdentificacion":'+str+'}');
  console.log(objJson);
    $.ajax(
     {
         type: "GET",
         url: 'custom/full_oper.php?cod_pac='+cod_pac+'&type_id='+type_id+'&primer_nombre='+primer_nombre+'&segundo_nombre='+segundo_nombre+'&primer_apellido='+primer_apellido+'&segundo_apellido='+segundo_apellido+'&fecha_nac_full='+fecha_nac_full+'&direccion='+direccion+'&telefono_residencia='+telefono_residencia+'&email='+email+'&telefono_celular='+telefono_celular+'&sexo='+sexo+'&opcion=CreatePaciente',
         //data: (objJson),
         //headers: ajax_headers,
         contentType: "application/json; charset=utf-8",
         //dataType: "json",
         crossDomain: true,
         cache: false,
        success: function (data) {
          console.log((data));
          var data=JSON.parse(data);
          
          //alert("data: " + JSON.stringify(data));
          
          $('#inf_pac').html(loader_div);
          //$('#inf_pac').html('<img  style="margin: 0 auto" class="img-responsive text-center" src="https://sios1.caminosips.com/cime/imagenes/cargando.gif" />');
          var estado= data.Estado;
          var mensaje = data.Mensaje;
    
          var cadena='Referencia a objeto no establecida como instancia de un objeto.[crearTabla]';
           mensaje=mensaje.replace(cadena, '');
          if (estado =='200'){
            $('#inf_pac').html('<h1>Usuario Registrado con exito</h>');
            swal.fire(
              '¡Usuario registrado con exito!',
              'Presione OK para continuar con el siguiente paso',
              'success'
            );
            
            $('#inf_pac').html(formulario_Sedes);
            $('#sede_sios').html(selectSedes);
            $('#prestadores_fecha').attr("disabled","disabled"); 
            $('#singlebutton').hide();
            iIdPacienteSios=data.Paciente.IdPaciente;
          }else{
            swal.fire({
              type: 'error',
              title: 'Se ha producido un error',
              text: 'No se pudo registrar el usuario, '+mensaje+'!',
              //footer: '<a href="caminosips.com/faq">Por que tengo este problema?</a>'
            });
            $('#inf_pac').html(mensaje);
            //$('#sede_sios').html(selectSedes);
            ///$('#inf_pac').html(formulario_Sedes);

            $('#iIdPacienteSios').val(IdPacienteSios);
          }
          


          console.log('Estado '+ estado+ ' Mensaje '+ mensaje);
          var ret = JSON.stringify(data);
          //console.log(ret);
          //var obj = JSON.parse(ret);   
          return;

        },

         
        error: function (xmlHttpRequest, textStatus, errorThrown) {
          alert("error: " + xmlHttpRequest.responseText);
        }
     });
     

  }else{
    
    //ActualizarDatosPacientes();

  /* (async () => {
  const res = await ActualizarDatosPacientes();
  const json = await res.json();
  console.log(json.public_repos);
  console.log("Hello!");
  })();
*/
    $('#inf_pac').html(formulario_Sedes);
    $('#prestadores_fecha').attr("disabled","disabled");
    $('#singlebutton').hide();
    //$('#sede_sios').attr("disabled","disabled");  

    //validarSedeRegimen();
   
  }
  //var Multa =Multado();

  //console.log(Multa);

  console.log('Listar Sedes');
  //selectSedes='';//MODIFICADO EL 14/05/2019
  selectSedes='<option value="null"></option>';
  $('#messages').html(loader_div);
  $.ajax(
    {
        type: "GET",
        url: 'custom/full_oper.php?opcion=ListarSedes',
        //data: (objJson),
        //headers: ajax_headers,
        contentType: "application/json; charset=utf-8",
        //dataType: "json",
        crossDomain: true,
        cache: false,
       success: function (data) {
           var data=JSON.parse(data);
           console.log(JSON.stringify(data));
           var estado= data.Estado;
            var mensaje = data.Mensaje;
         if (estado =='200'){
           //LISTADO DE SEDES -- MODIFICACDO 23 DE FEB 2019 - 
           //MARIO FERNANDEZ -- DEVELOPER

          for (var i = 0, len = data.ListaSedes.length; i < len; i++) {
              selectSedes+='<option value=\"'+(data.ListaSedes[i].Codigo)+'\">'+data.ListaSedes[i].Nombre+'</option>';
          } 
          console.log(selectSedes);
          $('#messages').html('');
          $('#sede_sios').html(selectSedes);
         }
         if (estado =='404'){
           
         }


         console.log('Estado '+ estado+ ' Mensaje '+ mensaje);
         var ret = JSON.stringify(data);
         console.log(ret);
         //var obj = JSON.parse(ret);   
         

       },

        error: function (xmlHttpRequest, textStatus, errorThrown) {
          alert("error: " + xmlHttpRequest.responseText);
        }
    });
    
    //$('#sede_sios').attr("disabled","disabled");  
  //validarSedeRegimen();
}

function BuscarPacienteSIOS(cod_pac, type_id){
  $('#messages').html(loader_div);
  var objJson = new Object();
    objJson.sTipoIdentificacion = type_id;
    objJson.sNumeroIdentificacion = cod_pac;
  jQuery.support.cors = true;
    $.ajax(
     {
        type: "POST",
        url: 'http://190.61.55.218:8023/apicitas/apicitas/pacientes/Buscar',
        data: JSON.stringify(objJson),
        headers: ajax_headers,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        crossDomain: true,
        cache: false,
        success: function (data) {
          JSON.stringify(data);
    
          //console.log('Estado '+ estado+ ' Mensaje '+ mensaje);
          var ret = JSON.stringify(data);
          console.log('RESULTADO BUSQUEDA PACIENTE     '+ret);
          //var obj = JSON.parse(ret);   
          $('#messages').html('');

          var id_paciente=data.Paciente.iIdPaciente;
          return id_paciente;
        },

        error: function (xmlHttpRequest, textStatus, errorThrown) {
          alert("error: " + xmlHttpRequest.responseText);
        }
     });
}
function validarSedeRegimen(){
  //AQUI
  //$('#prestadores_fecha').attr("disabled","disabled");
  //$('#prestadores_fecha').html(''); 

  //$('#tipo').attr("disabled","disabled");
  //$('#tipo').val($('#elemento').find('option:first').val());
  //$('#tipo').removeAttr("disabled","enabled");
  //Eliminado por modificacion 2018-09-03
  ListarPrestadoresSIOS();

  console.log('Validar Regimen para mostrar sedes y prestadores.');
}
function validar(e) {
  tecla = (document.all) ? e.keyCode : e.which;
  if (tecla==13){
     //alert ('Has pulsado enter');
     var m = document.getElementById("id_pac").value;
      var expreg = /^(?:\+|-)?\d+$/;
  if(expreg.test(m))
   
  showUser(document.getElementById('id_pac').value);
  else 
    alert("Solo valores Numericos");
    
  }
  //console.log('Tecla');
  
  
}

function cheked_sedes(){
  console.log('INICIANDO CHEKBOX');
 if ( $('#all_sedes').is(':checked') ){
          $('#sede_sios').attr("disabled","disabled");
          $('#check_sedes').val('true');
          console.log('checked');
      }else{
        $('#sede_sios').removeAttr("disabled","enabled");
        $('#check_sedes').val('false');
        console.log('unchecked');
      }      
}

function valUser(){
  var bol = false;
  $('#messages').html(loader_div);
    var m = document.getElementById("id_pac").value;
  var expreg = /^(?:\+|-)?\d+$/;
  if($('#tipo').val()!=''){
    bol=true;
  }else{
    alert("Seleccione una opcion en tipo de citas");
  }
  if(expreg.test(m) && bol)
  
  //showUser(document.getElementById('id_pac').value, document.getElementById('type_id').value);
  getEstadoAfiliado(document.getElementById('id_pac').value, $('#type_id').val());
  else 
    alert("Recuerde, Solo valores Numericos ");
}

function validarEmail( ) {
  var email1= $('#email').val();
  var email2= $('#remail').val();
  
    expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    
  if ( !expr.test(email1) )
        alert("Error: La dirección de correo " + email1 + " es incorrecta.");
    exit();
    return ;
}


//Funcion nueva salvar tipo de cita 
function saveTipo(){
   tipo_temp = $('#select_tipo').val();
  $('#tipo').val(tipo_temp);
  tipo_text=$("#select_tipo option:selected").text();
  console.log('SAVED! '+ tipo_temp);

  //MODIFICADO EL 15 DE ABR 2020 SE AGREGAN SWEET-ALERT CON INFORMACION DE CAMINO AL INTERNISTA- MFDEV
  /*if (tipo_temp == '') {
    swal.fire({
      icon: 'info',
      title: 'Informacion!',
      text: 'La teleconsulta es una atención medica por vía telefónica, con el fin de evitar que usted se desplace hacia la IPS. El médico a partir de esta atención realizará¡ un diagnóstico y un plan de tratamiento. Si usted necesita una atención presencial, el médico le dará las indicaciones.',

    });
  }*/

  //MODIFICADO EL 23 DE FEB 2019 SE AGREGAN SWEET-ALERT CON INFORMACION DE CAMINO AL INTERNISTA- MFDEV
  if(tipo_temp== '39'){
    swal.fire({
      type: 'warning',
      title: 'Informacion!',
      text: 'Señor usuario, con el fin de mejorar la oportunidad y accesibilidad a las citas de medicina interna se diseña la estrategia Camino al Internista, donde será valorado por médico general experto en medicina interna quien garantizará que al momento de la consulta con el especialista usted tenga disponible los resultados de laboratorios e imágenes diagnosticas para definir un manejo oportuno.',
      
    });
  }
  //MODIFICADO EL 2 DE ABRIL 2019 SE AGREGAN SWEET-ALERT CON INFORMACION DE SALUD VISUAL- MFDEV
  if(tipo_temp== '40'){
    swal.fire({
      type: 'warning',
      title: 'Informacion!',
      text: 'Señor usuario, informamos que las consultas del programa de Salud Visual solo atenderán casos asociados a problemas visuales, donde será valorado por un médico general quien realizará un diagnosticó y remisión oportuna.',
      
    });
  }
  //MODIFICADO EL 15 DE MAYO 2019 SE AGREGAN SWEET-ALERT CON INFORMACION DE SALUD VISUAL- MFDEV
  if(tipo_temp== '92'){
    swal.fire({
      type: 'warning',
      title: 'Informacion!',
      text: 'Señor usuario, con el fin de mejorar la oportunidad y accesibilidad a las citas de Pediatría se diseña la estrategia Camino al Pediatra, donde será valorado por médico general experto en Pediatría quien garantizará que al momento de la consulta con el especialista usted tenga disponible los resultados de laboratorios e imágenes diagnosticas para definir un manejo oportuno.',
      
    });
  }
}

function ListarPrestadoresSIOS()
{
  //sTipoAtencion
  //EV evento #tipoAtencion MG medicina General ES Especialista 
  var mujer_sana='false';
  $('#messages').html(loader_div);
  TipoAtencion='MG';
jQuery.support.cors = true;
tipo_consulta=$('#tipo').val()
  if(tipo_consulta !='1'){
    bCitaEspecialista='0';
    console.log(tipo_consulta );
    TipoAtencion='ES';
  }
    bCitaEspecialista='0';
    TipoAtencion='ES';
  
  //IF_CHECK_SEDES{}
  //Fecha actual formato SIOS
  var month = new Array();
  month[0] = "01";
  month[1] = "02";
  month[2] = "03";
  month[3] = "04";
  month[4] = "05";
  month[5] = "06";
  month[6] = "07";
  month[7] = "08";
  month[8] = "09";
  month[9] = "10";
  month[10] = "11";
  month[11] = "12";
  var df = new Date();
  var d = df.getDate();
  var y = df.getFullYear();
  var m = month[df.getMonth()];
  var fecha_hoy=''+y+''+m+''+d;
  console.log('Sede Seleccionada');
	console.log($('#sede_sios').val());
	
  //CONSULTA SI VIENE SEDE SELECCIONADA 
  var objJson = new Object();
    objJson.sCodigoEspecialidad = tipo_consulta;
    
  objJson.sIdSede = $('#sede_sios').val();
    var IdSede = $('#sede_sios').val();
   
	
    if( $('#check_sedes').val()=="true"){
      objJson.sIdSede = 'null';
    }
    if(objJson.sIdSede=="null"){
      objJson.sIdSede=null;
        IdSede=null;
    }
    objJson.sIdPaciente = iIdPacienteSios;
    objJson.iTope='20';
    objJson.bCitaEspecialista=bCitaEspecialista;



  //var strJSON=JSON.stringify('{"sCodigoEspecialidad":"389","sIdSede":"01","sIdPaciente":"9986","iTope":1,"bCitaEspecialista":0}');
  console.log('Aqui viene la sede');
  console.log(JSON.stringify(objJson));
  console.log('custom/full_oper.php?especialidad='+tipo_consulta+'&IdSede='+IdSede+'&iIdPacienteSios='+iIdPacienteSios+'&bCitaEspecialista='+bCitaEspecialista+'&opcion=ListarPrestadores');
    var selectPrestador='<option disabled="disabled" value="">    Nombre  - Fecha - Nro de Cupos </option>';
    $.ajax(
     {
         type: "GET",
         url: 'custom/full_oper.php?especialidad='+tipo_consulta+'&IdSede='+IdSede+'&iIdPacienteSios='+iIdPacienteSios+'&bCitaEspecialista='+bCitaEspecialista+'&opcion=ListarPrestadores',
         //data: (objJson),
         //headers: ajax_headers,
         contentType: "application/json; charset=utf-8",
         //dataType: "json",
         crossDomain: true,
         cache: false,
        success: function (data) {
          //console.log(data);
            
          var data=JSON.parse(data);
          var estado= data.Estado;
          var mensaje = data.Mensaje;
          if (estado =='200'){
            console.log('Turnos Prestador OK');
            
            console.log('Fecha hoy '+ fecha_hoy);
            //ListarCuposDisponiblesFecha
            //{"sCodigoEspecialidad":"389","sIdSede":"01","sFecha":"20180727","sIdPrestador":"73200534"}

            
            for (var i = 0, len = data.ListaTurnos.length; i < len; i++) {
                if(fecha_hoy!=data.ListaTurnos[i].sFecha){
                    //if (arr_prestadores.includes(data.ListaTurnos[i].sIdPrestador )){
                    selectPrestador+='<option value=\"'+(data.ListaTurnos[i].IdPrestador)+'*'+data.ListaTurnos[i].Fecha+'*'+data.ListaTurnos[i].Prestador+'*'+data.ListaTurnos[i].IdSede+'\">'+data.ListaTurnos[i].Prestador+'    -    '+data.ListaTurnos[i].Fecha+' - '+data.ListaTurnos[i].CantidadCupos+'</option>';
                    //}
                }
              console.log(data.ListaTurnos[i].IdPrestador+' : '+data.ListaTurnos[i].Prestador+' : '+data.ListaTurnos[i].Fecha)+' : '+data.ListaTurnos[i].CantidadCupos;
              
              
            } 
            $('#messages').html('');
            $('#prestadores_fecha').removeAttr("disabled","enabled");
            $( "#datepicker" ).removeClass('hidden');
            $('#prestadores_fecha').html(selectPrestador);
           // $("#tabla_cupos").addClass('hidden');
            Calendario();
          }
          if (estado =='404'){
            console.log('Turnos Prestador ERROR');
            $('#messages').html('');
            swal.fire({
              type: 'warning',
              title: 'Advertencia',
              text: 'No se encontraron cupos con las opciones selecionadas, intente nuevamente seleccionando otra sede!',
              //footer: '<a href="caminosips.com/faq">x</a>'
            });
            $('#prestadores_fecha').attr("disabled","disabled");
            $('#prestadores_fecha').html(''); 
            
            //Ocultar calendario 
            $("#tabla_cupos").addClass('hidden');
            $( "#datepicker" ).addClass('hidden');
          }


          console.log('Estado '+ estado+ ' Mensaje '+ mensaje);
          var ret = JSON.stringify(data);
          console.log('Respuesta Trunos: '+ret);
          //var obj = JSON.parse(ret);   
          
          
        },

        error: function (xmlHttpRequest, textStatus, errorThrown) {
          alert("error: " + xmlHttpRequest.responseText);
        }
     });
}//FIN CONSULTA SIOS TURNOS PRESTADORES

//Nombre de las sedes 
function labelSedes(id_sede){
  /*switch(id_sede){
    case '001':
    return 'Olaya';
    case '002':
    return 'Consolata';
    case '003':
    return 'Santa Lucia';
    case '008':
    return 'Ronda Real Local 235D';
    case '11':
    return 'Ronda Real Piso 3';
    case '13':
    return 'TELEMEDICINA';
  }*/
}
function compararHoras(hora, jornada){
  var horaAMini = moment('11:59', 'h:mm');
  
  var horaAMfin = moment('13:29', 'h:mm');

  var horaPMini = moment('18:01', 'h:mm');

  var horaPMfin = moment('19:46', 'h:mm');

  var result;
   //hora=hora;
  var horaComparar=moment(hora, 'h:mm');
  console.log('Validar AM ' +horaComparar.isBetween(horaAMini, horaAMfin));

  console.log('Validar PM ' +horaComparar.isBetween(horaPMini, horaPMfin));
  if(horaComparar.isBetween(horaAMini, horaAMfin) || horaComparar.isBetween(horaPMini, horaPMfin)){
    //console.log('Validar 1 ' +horaComparar.isBetween(horaAMini, horaAMfin));
    result =false;
    //console.log('Validar 2 ' +horaComparar.isBetween(horaPMini, horaPMfin));
  }else{
    result = false;
    console.log('TRUE--------->');
  }
return result;
//console.log(beginningTime.isBefore(endTime)); // deberá aparecer true 

}
//FUNCION CALENDARIO (CUPOS EN SIOS POR PRESTADOR)// 7560554  
function Calendario(picked){
          //{"sCodigoEspecialidad":"389","sIdSede":"01","sFecha":"20180822","sIdPrestador":"73200534-iIdPacienteSios"
          var fecha_labelSWAL;
          var cod_pac = $('#cod_pac_f').val();
          var tipo = $('#tipo_f').val();
          var sede = $('#sede_f').val();
          //var sede;
          var objJson = new Object();
          var fecha_cita;
          var cod_med_fecha =  $('#prestadores_fecha').val();
          var arr_fecha_med= cod_med_fecha.split("*");
          console.log(arr_fecha_med);
          sede = arr_fecha_med[3]; 
          fecha_cita=arr_fecha_med[1];  
          //console.log(arr_fecha_med);
          var arr_fecha_temp=arr_fecha_med[1].split("/");

          var fecha_cita_SIOS=arr_fecha_temp[2]+''+arr_fecha_temp[1]+''+arr_fecha_temp[0];
          var fecha_cita_min=arr_fecha_temp[2]+'-'+arr_fecha_temp[1]+'-'+arr_fecha_temp[0];
          console.log(fecha_cita_SIOS);
          NombrePrestadorSIOS=arr_fecha_med[2];

          //En la poscicion 1 Fecha: 20170101
          //En la poscicion 0 idPrestador: cod_med
          //EN la poscicion 2 NombrePrestador
          //En la poscicion 3 IdSede : 001
          
          if (picked){
            var fecha_picked=picked.replace('-','');
            fecha_picked=fecha_picked.replace('-','');
            console.log(fecha_picked);
            objJson.sFecha=fecha_picked;
            $('#fecha_label').html(picked);
            fecha_labelSWAL=picked;
            var sFecha=fecha_picked;
          }else{
            $("#datepicker").removeClass('hasDatepicker');
            $('#datepicker').html('');
            //$("#tabla_cupos").addClass('hidden');
            //$('#tabla_cupos').html('');
            //$( "#datepicker" ).addClass('hidden');
            objJson.sFecha=fecha_cita_SIOS;
              var sFecha=fecha_cita_SIOS;
            $('#fecha_label').html(fecha_cita);
            fecha_labelSWAL=fecha_cita;
          }
          
          objJson.sCodigoEspecialidad = tipo_consulta;
          objJson.sIdSede = $('#sede_sios').val();
          objJson.sIdPrestador = arr_fecha_med[0] ;
          //TODAS LAS SEDES MODIFICACION
          if( $('#check_sedes').val()=="true"){
            objJson.sIdSede = arr_fecha_med[3]; ;
			console.log(objJson.sIdSede);
          }
          

          //Consulta de cupos por prestador//
          //console.log('Consulta Prestador fecha: '+JSON.stringify(objJson));
          console.log('custom/full_oper.php?sFecha='+sFecha+'&sCodigoEspecialidad='+tipo_consulta+'&sIdSede='+$('#sede_sios').val()+'&sIdPrestador='+arr_fecha_med[0]+'&opcion=BuscarTurnosPorFecha');

          $.ajax(
            {
                type: "GET",
                url: 'custom/full_oper.php?sFecha='+sFecha+'&sCodigoEspecialidad='+tipo_consulta+'&sIdSede='+$('#sede_sios').val()+'&sIdPrestador='+arr_fecha_med[0]+'&opcion=BuscarTurnosPorFecha',
                //data: (objJson),
                //headers: ajax_headers,
                contentType: "application/json; charset=utf-8",
                //dataType: "json",
                crossDomain: true,
                cache: false,
               success: function (data) {
                   var data=JSON.parse(data);
                 var estado= data.Estado;
                 var mensaje = data.Mensaje;
                 var htmlResponse='';
                 if (estado =='200'){
                   
                  console.log('Cupos Prestador OK');

                  var ret = JSON.stringify(data);
                  console.log(ret);
                  var sede_label= $( "#sede_sios option:selected" ).text();
                   var num=1;
                   for (var i = 0, len = data.ListaTurnos.length; i < len; i++) {
                     console.log(data.ListaTurnos[i].IdPrestador+' : '+data.ListaTurnos[i].Prestador+' : '+data.ListaTurnos[i].FechaCita+' : '+data.ListaTurnos[i].HoraCita+' : '+data.ListaTurnos[i].Jornada+' : '+data.ListaTurnos[i].IdTurno);
                    //sede_label=labelSedes(data.ListaTurnos[i].IdSede);
                    var horarioEspecial=true;//compararHoras(data.ListaTurnos[i].sHora, data.ListaTurnos[0].sJornada);
                    if(horarioEspecial==true){
                      htmlResponse+='<tr>';//
                      htmlResponse+='<td>'+num+'</td><td>'+data.ListaTurnos[i].HoraCita+' - '+data.ListaTurnos[i].Jornada+'</td><td>'+sede_label+'</td>';
                      htmlResponse+='<td>'+'<button id="singlebutton" name="singlebutton" onclick="validarCita(\''+data.ListaTurnos[i].HoraCita+'\',\''+sede_label+'\',\''+fecha_labelSWAL+'\',\''+data.ListaTurnos[i].IdTurno+'\',\''+data.ListaTurnos[i].FechaCita+'\')" class="btn btn-primary">Asignar</button></td>';
                      htmlResponse+='</tr>';
                      num++;
                    }
                   }
                   
                   $('#tbody').html(htmlResponse);
                   htmlResponse='';
                   //$("#tabla_cupos").removeClass('hidden');
                   $('#tabla_cupos').show();

                    $( "#datepicker" ).datepicker({
                      beforeShowDay:function (day) { 
                        var day = day.getDay(); 
                        if (day == 0) { 
                          return [false, "RED"] 
                        } else { 
                          return [true, ""] 
                        } 
                      },
                      onSelect: function(dateText){
                      Calendario(dateText);
                      //alert(dateText+'  '+cod_med_fecha);
                      },
    
                    minDate: fecha_cita_min,
                    maxDate:"+15d",
    
                    });
                  
                 }
                 if (estado =='404'){
                  $("#tabla_cupos").addClass('hidden'); 
                   console.log('Cupos Prestador ERROR');
                  
                 }
       
       
                 console.log('Estado '+ estado+ ' Mensaje '+ mensaje);
                 //var obj = JSON.parse(ret);   
                 
       
               },
       
               error: function (xmlHttpRequest, textStatus, errorThrown) {
                alert("error: " + xmlHttpRequest.responseText);
              }
            });

         
}//Fin Calendario SIOS.

  /**
*   I don't recommend using this plugin on large tables, I just wrote it to make the demo useable. It will work fine for smaller tables 
*   but will likely encounter performance issues on larger tables.
*
*   <input type="text" class="form-control" id="dev-table-filter" data-action="filter" data-filters="#dev-table" placeholder="Filter Developers" />
*   $(input-element).filterTable()
*   
* The important attributes are 'data-action="filter"' and 'data-filters="#table-selector"'
*/
(function(){
    'use strict';
  var $ = jQuery;
  $.fn.extend({
    filterTable: function(){
      return this.each(function(){
        $(this).on('keyup', function(e){
          $('.filterTable_no_results').remove();
          var $this = $(this), 
                        search = $this.val().toLowerCase(), 
                        target = $this.attr('data-filters'), 
                        $target = $(target), 
                        $rows = $target.find('tbody tr');
                        
          if(search == '') {
            $rows.show(); 
          } else {
            $rows.each(function(){
              var $this = $(this);
              $this.text().toLowerCase().indexOf(search) === -1 ? $this.hide() : $this.show();
            })
            if($target.find('tbody tr:visible').size() === 0) {
              var col_count = $target.find('tr').first().find('td').size();
              var no_results = $('<tr class="filterTable_no_results"><td colspan="'+col_count+'">No se encontraron resultados</td></tr>')
              $target.find('tbody').append(no_results);
            }
          }
        });
      });
    }
  });
  $('[data-action="filter"]').filterTable();
})(jQuery);

$(function(){
    // attach table filter plugin to inputs 
  $('[data-action="filter"]').filterTable();
  
  $('.container').on('click', '.panel-heading span.filter', function(e){
    var $this = $(this), 
      $panel = $this.parents('.panel');
    
    $panel.find('.panel-body').slideToggle();
    if($this.css('display') != 'none') {
      $panel.find('.panel-body input').focus();
    }
  });
  $('[data-toggle="tooltip"]').tooltip();
});

function isEmpty(str) {
  return (!str || 0 === str.length);
}
//PROCEDIMIENTOS PARA CONSULTA EN TABLA DE AFILIADOS
//MARIO - BUSCAR AFILIADO
function getEstadoAfiliado(id, tipo_id)
{
  console.log('CONSULTA AFLIACION ------->');
  //console.log('custom/full_oper.php?opcion=?id='+id+'&tipo_id='+tipo_id+'&opcion=right-validation');
  $.ajax(
    {
        type: "GET",
        url: 'custom/full_oper.php?id='+id+'&tipo_id='+tipo_id+'&opcion=right-validation',
        //data: (objJson),
        //headers: ajax_headers,
        contentType: "application/json; charset=utf-8",
        //dataType: "json",
        crossDomain: true,
        cache: false,
       success: function (data) {
          var data=JSON.parse(data);
          //console.log(data);
          var estado= data.estado;
          var mensaje = data.mensaje;
          var sRegimen = data.regimen;

          console.log('Estado '+ estado+ ' Mensaje '+ mensaje + 'Regimen ' + sRegimen);
          var ret = JSON.stringify(data);
          console.log(ret);
           if(estado=="400-04"){

               swal.fire({
                   allowOutsideClick: false,
                   type: 'warning',
                   title: 'Informacion',
                   html: 'Sr. Usuario. Usted no se encuentra registrado en la Base de informacion, porfavor comuníquese a su EPS para que verifique su información',

               }).then((result) => {
                   if (result) {
                       location.reload();
                   }
               });
           }else if(estado=="500-01" || estado=="400-03"){

               swal.fire({
                   allowOutsideClick: false,
                   type: 'warning',
                   title: 'Señor usuario, ofrecemos disculpas.',
                   html: '<b> ¡Página en mantenimiento!</b><br> Actualmente nos encontramos realizando actualizaciíon y mejoras en el proceso de autoasignación de citas, lo invitamos a ingresar más tarde.',

               }).then((result) => {
                   if (result) {
                       location.reload();
                   }
               });

          }else{
            //var obj = JSON.parse(ret);   
            tipo_usuario=sRegimen;
            showUser(document.getElementById('id_pac').value, document.getElementById('type_id').value);   
          }
                

       },

        error: function (xmlHttpRequest, textStatus, errorThrown) {
          alert("error: " + xmlHttpRequest.responseText);
        }
    });

    
}
function guardarMySql(id_cita, idPaciente){
//cod_pac //telefono //tipo_cita //cod_med //fecha_cita //fecha_solicitud
  var cod_pac, telefono, tipo_cita, cod_med, fecha_cita, fecha_solicitud, nombre_paciente_sios, sede;
  var month = new Array();
  month[0] = "01";
  month[1] = "02";
  month[2] = "03";
  month[3] = "04";
  month[4] = "05";
  month[5] = "06";
  month[6] = "07";
  month[7] = "08";
  month[8] = "09";
  month[9] = "10";
  month[10] = "11";
  month[11] = "12";
  var df = new Date();
  var d = df.getDate();
  var y = df.getFullYear();
  var m = month[df.getMonth()];
   fecha_solicitud=''+d+'/'+m+'/'+y;
$.ajax(
  {
     type: "GET",
     url: 'http://190.61.55.218:8023/apicitas/apicitas/citas/BuscarPorId/'+id_cita,
     //data: JSON.stringify(objJson),
     headers: ajax_headers,
     contentType: "application/json; charset=utf-8",
     dataType: "json",
     crossDomain: true,
     cache: false,
     success: function (data) {
       var estado= data.Estado;
       var mensaje = data.Mensaje;
       if (estado =='200'){
        var ret = JSON.stringify(data);
        console.log(ret);
         fecha_cita= data.Cita.sFechaCita;
         cod_med=data.Cita.sPrestador;
         tipo_cita=data.Cita.sEspecialidad;
         sede=data.Cita.sSede;
         //Buscar Paciente
         $.ajax(
          {
             type: "GET",
             url: 'http://190.61.55.218:8023/apicitas/apicitas/pacientes/buscarporid/'+idPaciente,
             //data: JSON.stringify(objJson),
             headers: ajax_headers,
             contentType: "application/json; charset=utf-8",
             dataType: "json",
             crossDomain: true,
             cache: false,
             success: function (data) {
               var estado= data.Estado;
               var mensaje = data.Mensaje;
               if (estado =='200'){
                var ret = JSON.stringify(data);
                console.log(ret);
                //$('#tipo_id_sios').html('<b>'+data.Paciente.sTipoIdentificacion+'</b>');
                cod_pac=data.Paciente.sNumeroIdentificacion;
                telefono=data.Paciente.sTelefonoResidencia;
                nombre_paciente_sios  = data.Paciente.sPrimerNombre+' '+data.Paciente.sSegundoNombre+
                ' '+data.Paciente.sPrimerApellido+' '+data.Paciente.sSegundoApellido;

                //MySql='//cod_pac //telefono //tipo_cita //cod_med //fecha_cita //fecha_solicitud'
                $.ajax(
                  {
                    type: "GET",
                    url: 'custom/salvar_mysql.php?cod_pac='+cod_pac+'&tipo_cita='+tipo_cita+'&telefono='+telefono+'&cod_med='+cod_med+'&fecha_cita='+fecha_cita+'&fecha_solicitud='+fecha_solicitud+'&nombre_pac='+nombre_paciente_sios+'&sede='+sede+'&id_cita='+id_cita,
                    //data: JSON.stringify(objJson),
                    //headers: ajax_headers,
                    contentType: "application/json; charset=utf-8",
                    //dataType: "json",
                    crossDomain: true,
                    cache: false,
                    success: function (data) {
                      console.log('Succes: ' +data);
                      

                    },

                    error: function (xmlHttpRequest, textStatus, errorThrown) {
                      alert("error: " + xmlHttpRequest.responseText);
                      location.reload();
                    }
                  });
              
               }
               if (estado =='500'){
               // arr_paciente= {};
               console.log('500');
               }     
               
        
             },
        
             error: function (xmlHttpRequest, textStatus, errorThrown) {
               alert("error: " + xmlHttpRequest.responseText);
             }
          });

       }
       if (estado =='500'){
        //arr_cita={};
        console.log('500');
       }

      


     },

     error: function (xmlHttpRequest, textStatus, errorThrown) {
       alert("error: " + xmlHttpRequest.responseText);
     }
  });
  

}

function recordatorio_cita(){
  $('#idCitaAsignada').val(idCitaAsignada);
  console.log('idCitaAsignada '+idCitaAsignada);
  $('#iIdPacienteImprimir').val(iIdPacienteSios);
  console.log('iIdPacienteSios '+iIdPacienteSios);
  if(puertoWeb==':443'){
    $('#puertoWeb').val(puertoWeb);
  }else{
    $('#puertoWeb').val('');
  }

  var forma = document.getElementById('forma1');
    window.open('','imprimir_cita');
    forma.target='imprimir_cita';
    forma.action='imprimir_cita.php';               
    //forma.submit();
    // console.log('SUBMIT-2');
    //location.reload();
}

function historialCitas(){
  console.log("Iniciando DEBUG HISTORIAL CITAS: ");//21-02-2020
  var bol = false;
  //$('#messages').html(loader_div);
    var m = document.getElementById("id_pac").value;
  var expreg = /^(?:\+|-)?\d+$/;
  /*if($('#tipo').val()!=''){
    bol=true;
  }else{
    alert("Seleccione una opcion en tipo de citas");
  }*/
  if(expreg.test(m)){
    console.log('Numero de Identificacion:'+m);
  BuscarPacientes(document.getElementById('id_pac').value, document.getElementById('type_id').value);
  //getEstadoAfiliado(document.getElementById('id_pac').value, $('#tipo').val());
  //alert('DONE');//funcion
  } else {
    alert("Recuerde, Solo valores Numericos ");
  }

}


function verHistorialCitas(idPaciente){

  console.log('ID RECIBIDO PARA HISTORIAL '+ idPaciente);

  var tableHeader="<h3>Historial de Citas</h3><table border='1' cellpadding='2' cellspacing='2' class='table table-condensed table-hover table-bordered'>"+
    "<tr>"+
      "<th>Fecha Cita</th>"+
      "<th>Sede</th>"+
      "<th>Prestador</th>"+
      "<th>Especialidad</th>"+
      "<th>Cancelada</th>"+
      "<th>Atendido</th>"+
      "<th></th>"+
    "</tr>"+
    "<!--FIN CABECERAS-->";
  var tableBody="";
  var tableFooter="</table>";

  var objJson = new Object();
    objJson.sIdPaciente = idPaciente;
    objJson.bVigente = '0';
    jQuery.support.cors = true;
    puertoWeb=':443';
    console.log(puertoWeb);

    console.log('Object enviado'+ JSON.stringify(objJson) );

  $.ajax(
    {
       type: "GET",
       url: 'http://190.61.55.218:8023/apicitas/apicitas/citas/Historial',
       data: JSON.stringify(objJson),
       headers: ajax_headers,
       contentType: "application/json; charset=utf-8",
       dataType: "json",
       crossDomain: true,
       cache: false,
       success: function (data) {
         var estado= data.Estado;
         var mensaje = data.Mensaje;
         var htmlResponse='';
         
         if (estado =='200'){
          for (var i = 0, len = data.ListaCitas.length; i < len; i++) {
            //aqui
            var mostrar=validar_fecha_cancelar(data.ListaCitas[i].sFechaCita);
            mostrar=true;
            if(mostrar==true){
              var cancelar;
              cancelar=validar_fecha(data.ListaCitas[i].sFechaCita);
              var id_cita=data.ListaCitas[i].iIdCita;
              var dcancelada=data.ListaCitas[i].sCancelada;
              if(cancelar==true && dcancelada== 'NO'){
                tableBody+=
                "<td>"+data.ListaCitas[i].sFechaCita+"</td>"+
                "<td>"+data.ListaCitas[i].sSede+"</td>"+
                "<td>"+data.ListaCitas[i].sPrestador+"</td>"+
                "<td>"+data.ListaCitas[i].sEspecialidad+"</td>"+
                "<td>"+data.ListaCitas[i].sCancelada+"</td>"+
                "<td>"+data.ListaCitas[i].sAtendido+"</td>"+
                '<td><button class="btn btn-info btn-danger" onclick="cancelarCita('+id_cita+')">CANCELAR</button></td>'+
                "</tr>";
              }else{
                tableBody+=
                "<td>"+data.ListaCitas[i].sFechaCita+"</td>"+
                "<td>"+data.ListaCitas[i].sSede+"</td>"+
                "<td>"+data.ListaCitas[i].sPrestador+"</td>"+
                "<td>"+data.ListaCitas[i].sEspecialidad+"</td>"+
                "<td>"+data.ListaCitas[i].sCancelada+"</td>"+
                "<td>"+data.ListaCitas[i].sAtendido+"</td>"+
                '<td> - </td>'+
                "</tr>";
              }
            }
            
            //var fecha_cita = new Date(data.ListaCitas[i].sFechaCita);
            //console.log(fecha_cita);
            
          } 

          var htmlResult=tableHeader+tableBody+tableFooter;
          console.log(' Historial OK');

     
          var ret = JSON.stringify(data);
          console.log(ret);

          
          $('#resultado').html(htmlResult);
          
         }
         if (estado =='404'){   
           console.log('Historial ERROR');
           $('#resultado').html(mensaje);
         }
         console.log('Estado '+ estado+ ' Mensaje '+ mensaje);
         //var obj = JSON.parse(ret);   
       },

       error: function (xmlHttpRequest, textStatus, errorThrown) {
        alert("error: " + xmlHttpRequest.responseText);
      }
    });
}

function BuscarPacientes(identificacion, tipo_id){
  var objJson = new Object();
    objJson.sTipoIdentificacion = tipo_id;
    objJson.sNumeroIdentificacion = identificacion;
  jQuery.support.cors = true;
  console.log('Entrando a Buscar pacientes: identificacion- '+identificacion+ 'Tipo de id -'+ tipo_id);
  $.ajax(
    {
       type: "POST",
       url: 'http://190.61.55.218:8023/apicitas/apicitas/pacientes/Buscar',
       data: JSON.stringify(objJson),
       headers: ajax_headers,
       contentType: "application/json; charset=utf-8",
       dataType: "json",
       crossDomain: true,
       cache: false,
       
       success: function (data) {
         
        console.log('Object JSON'+JSON.stringify(objJson) );

         var estado= data.Estado;
         var mensaje = data.Mensaje;

         console.log('Resppuesta AJAX'+JSON.stringify(data) );
         
         if (estado =='200'){
          cod_pac=data.Paciente.sNumeroIdentificacion;
          nombre_paciente_sios  = data.Paciente.sPrimerNombre+' '+data.Paciente.sSegundoNombre+
          ' '+data.Paciente.sPrimerApellido+' '+data.Paciente.sSegundoApellido;
           iIdPacienteSios=data.Paciente.iIdPaciente;
           console.log('ID Paciente SIOS:'+data.Paciente.iIdPaciente);

           var hmtlPaciente = '<h3><b>Nombres:  </b></h3><h4>'+nombre_paciente_sios+' </h4><h3><b>Identificacion:   </b></h3><h4>'+cod_pac+'</h4>';
           $('#inf_pac').html(hmtlPaciente);
           verHistorialCitas(iIdPacienteSios);
           console.log('ID Paciente SIOS:'+iIdPacienteSios);
         }
         if (estado =='404'){
           //Error -- 

            swal({
              title: 'Atencion!',
              html: 'Los datos ingresados no corresponden a ningun usuario existente en Caminos IPS.',
              type: 'error',
              showCancelButton: false,
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Aceptar',  
            });
           
         }

         console.log('Estado '+ estado+ ' Mensaje '+ mensaje);
         var ret = JSON.stringify(data);
         console.log('Respuesta paciente: '+ret);
         //var obj = JSON.parse(ret);
         $('#messages').html('');   
         

       },

       error: function (xmlHttpRequest, textStatus, errorThrown) {
         alert("error: " + xmlHttpRequest.responseText);
       }
    });
}
function validar_fecha(fecha){
  //var fecha1=data.ListaCitas[i].sFechaCita;
  res=fecha.split(" "); 
  fecha=res[0];
  var horas = res[1];
  res=horas.split(":");
  var hora, minutos;
  hora=res[0];
  minutos= res[1];
  res=fecha.split("/");
  var dia, mes, year;
  year =res[2];
  dia = res[0];
  mes= res[1];
  console.log('Año '+year);
  console.log('mes '+ mes);
  console.log('dia '+dia);
  console.log('hora '+hora);
  console.log('minutos '+minutos);
  var fecha_= new Date(year,mes-1, dia);
  fecha_.setHours(hora, minutos,0,0);
  var hoy_= new Date();
  hoy_.setHours(hoy_.getHours()+4);
  console.log('Fecha Cita '+ fecha_);
  console.log('Hoy '+hoy_ );

  ///Llamar a validar fecha


  if(hoy_.getTime() >= fecha_.getTime()){
    return false;
  }else{
    return true;
  }

}

function cancelarCita(id_cita){
  var sTipoIdFamiliar='';
  var	sIdentificacionFamiliar='';
  var	sNombre1Familiar='';
  var	sNombre2Familiar;
  var	sApellido1Familiar='';
  var	sApellido2Familiar='';
  var	sCanceladoPor='';
  var	sMotivoCancelacion='';


  swal({
    title: 'Confirmar',
    html: 'Esta seguro de que desea cancelar la cita ?',
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Confirmar',
    cancelButtonText: 'Cancelar',
  }).then((Confirmar) => {
    var objJson = new Object();
    objJson.iIdCita= id_cita;
    objJson.sTipoIdFamiliar=sTipoIdFamiliar;
    objJson.sIdentificacionFamiliar= sIdentificacionFamiliar;
    objJson.sNombre1Familiar= sNombre1Familiar;
    objJson.sNombre2Familiar= sNombre2Familiar;
    objJson.sApellido1Familiar= sApellido1Familiar;
    objJson.sApellido2Familiar= sApellido2Familiar;
    objJson.sCanceladoPor= sCanceladoPor;
    objJson.sMotivoCancelacion= sMotivoCancelacion;

    //puertoWeb=':443';
    console.log(JSON.stringify(objJson));

    $.ajax(
      {
          type: "POST",
          url: 'http://190.61.55.218:8023/apicitas/apicitas/citas/cancelar',
          data: JSON.stringify(objJson),
          headers: ajax_headers,
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          crossDomain: true,
          cache: false,
          success: function (data) {
          console.log(JSON.stringify(data));
          var estado= data.Estado;
          var mensaje = data.Mensaje;
          console.log('OBJ'+JSON.stringify(objJson));
          if (estado =='200'){
            swal(
              'Cancelada',
              'Su cita ha sido cancelada exitosamente!',
              'success'
            );
            setTimeout(location.reload(true), 4000);
            
          }else{
            swal(
              'No se pudo cancelar',
              'Se ha producido un error'+mensaje,
              'warning'
            );
              
          }
          console.log('Estado '+ estado+ ' Mensaje '+ mensaje);
          var ret = JSON.stringify(data);
          },
          error: function (xmlHttpRequest, textStatus, errorThrown) {
          alert("error: " + xmlHttpRequest.responseText);
          }
      }); 
  });
}

function validar_fecha_cancelar(fecha){
  //var fecha1=data.ListaCitas[i].sFechaCita;
  res=fecha.split(" "); 
  fecha=res[0];
  var horas = res[1];
  res=horas.split(":");
  var hora, minutos;
  hora=res[0];
  minutos= res[1];
  res=fecha.split("/");
  var dia, mes, year;
  year =res[2];
  dia = res[0];
  mes= res[1];

  ///Llamar a validar fecha

  var horaAMini = moment('11:59', 'h:mm');
  
  var horaAMfin = moment('13:29', 'h:mm');

  var horaPMini = moment('18:01', 'h:mm');

  var horaPMfin = moment('19:46', 'h:mm');

  var result;
  
  var horaComparar=moment(hora+':'+minutos, 'h:mm');

  console.log('Validar AM ' +horaComparar.isBetween(horaAMini, horaAMfin));

  console.log('Validar PM ' +horaComparar.isBetween(horaPMini, horaPMfin));
  if(horaComparar.isBetween(horaAMini, horaAMfin) || horaComparar.isBetween(horaPMini, horaPMfin)){
    //console.log('Validar 1 ' +horaComparar.isBetween(horaAMini, horaAMfin));
    result =true;
    //console.log('Validar 2 ' +horaComparar.isBetween(horaPMini, horaPMfin));
  }else{
    result = true;
    console.log('TRUE--------->');
  }
return result;
}
function ListarMotivoCancelacion(){
  //Select 


  
}
function ListarCanceladoPor(){
  //SELECT 
}

function OcultarEspecialidad(){//document.getElementById("select").value = "defaultValue";
	var tipo_identificacion=$('#type_id').val();
	if(tipo_identificacion != "RC" || tipo_identificacion !="TI"){
		$('#select_tipo option[value="12"]').remove();
		console.log('Quitar ' + tipo_identificacion);
	}
	 if(tipo_identificacion == "RC" || tipo_identificacion == "TI"){
		$('#select_tipo').append($('<option />', {
			text: 'PEDIATRIA',
			value: '12',
		  }));
		
		console.log('Agregar ' +tipo_identificacion);
	}
	
	//document.getElementById("select_tipo").value
  //SELECT 
}
function getToken(){
    //Obtener token
    let headers={ "Allow-Header":'*', "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers":"*"};
    let objJson = new Object();
    objJson.grant_type= 'password';
    objJson.client_secret= '6447603b-4a47-4b9a-925c-96c6025f1a9f';
    objJson.client_id= 'right-validation';
    objJson.Username= 'usertest';
    objJson.password= '12345';

        console.log('OBJ'+JSON.stringify(objJson));
    $.ajax(
        {
            type: "POST",
            url: 'https://gcp-mutualser-keycloak-dev.appspot.com/auth/realms/right-validation/protocol/openid-connect/token',
            data: JSON.stringify(objJson),
            headers: headers,
            contentType: "application/x-www-form-urlencoded",
            //dataType: "json",
            crossDomain: true,
            cache: false,
            success: function (data) {
                console.log(JSON.stringify(data));

                let ret = JSON.stringify(data);
            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                console.log("error: " + xmlHttpRequest.responseText);
            }
        });

}
function ListarEspecialidad(){//document.getElementById("select").value = "defaultValue";
	selectEspecialidades='<option value="null"></option>';
  $('#messages').html(loader_div);
  $.ajax(
    {
        type: "GET",
        url: 'custom/full_oper.php?opcion=ListarEspecialidades',
        //data: (objJson),
        //headers: ajax_headers,
        contentType: "application/json; charset=utf-8",
        //dataType: "json",
        crossDomain: true,
        cache: false,
       success: function (data) {
           var data=JSON.parse(data);
           console.log(JSON.stringify(data));
           var estado= data.Estado;
            var mensaje = data.Mensaje;
         if (estado =='200'){
           //LISTADO DE SEDES -- MODIFICACDO 23 DE FEB 2019 - 
           //MARIO FERNANDEZ -- DEVELOPER

          for (var i = 0, len = data.ListaEspecialidades.length; i < len; i++) {
            selectEspecialidades+='<option value=\"'+(data.ListaEspecialidades[i].Codigo)+'\">'+data.ListaEspecialidades[i].Nombre+'</option>';
          } 
          console.log(selectEspecialidades);
          $('#messages').html('');
          $('#select_tipo').html(selectEspecialidades);
         }
         if (estado =='404'){
          $('#select_tipo').html(selectEspecialidades);
         }


         console.log('Estado '+ estado+ ' Mensaje '+ mensaje);
         var ret = JSON.stringify(data);
         console.log(ret);
         //var obj = JSON.parse(ret);   
         

       },

        error: function (xmlHttpRequest, textStatus, errorThrown) {
          alert("error: " + xmlHttpRequest.responseText);
        }
    });
}