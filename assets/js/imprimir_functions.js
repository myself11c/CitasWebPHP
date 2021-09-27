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
var botonSedes = '<button id="singlebutton" name="singlebutton" onclick="MostrarListaSede(\'."\'no\'".\')" class="btn btn-primary"> Siguiente   -&gt;</button>';
var fromularioPacienteNuevo= '';

var ajax_headers={ 'Authorization' :'Basic ' + btoa('caminosips' + ':' + 'caminos1_xxxx') };

var formulario_Sedes='<!-- Select Basic -->'+
'<div class="form-group"><form id="sedes">'+
  '<label class="col-md-4 control-label" for="check_sedes">Si desea ver todas las sedes seleccione esta opcion</label>'+
  '<div class="col-md-4">'+
    '<label class="checkbox-inline" for="checkboxes">'+
    '<input type="checkbox" onchange="cheked_sedes()"  name="all_sedes" value="true" id="all_sedes">'+
    'Todas las sedes'+
  '</label>'+
  '</div>'+
'</div>'+

'<!-- Select Basic -->'+
'<div class="form-group">'+
  '<label class="col-md-4 control-label" for="sede">Sede</label>'+
  '<div class="col-md-4">'+
   '<select id="sede_sios" name="sede_sios" onchange="validarSedeRegimen()" class="form-control">'+
    '</select>'+
  '</div>'+
'</div>'+

'<!-- Select Basic -->'+
'<div class="form-group">'+
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

function getAbsolutePath() {
    var loc = window.location;
    var pathName = loc.pathname.substring(0, loc.pathname.lastIndexOf('/') + 1);
    return loc.href.substring(0, loc.href.length - ((loc.pathname + loc.search + loc.hash).length - pathName.length));
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
'<table>'+
  '<tbody>'+
    '<tr>'+
      '<td><b>Medico:</b> </td>'+
      '<td>'+NombrePrestadorSIOS+'</td>'+
    '</tr>'+
    '<tr>'+
      '<td><b>Tipo de cita:</b> </td>'+
      '<td>'+tipo_text+'</td>'+
    '</tr>'+
    '<tr>'+
      '<td><b>Identificacion</b></td>'+
      '<td>'+idPaciente+'</td>'+
    '</tr>'+
    '<tr>'+
      '<td><b>Usuario:</b> </td>'+
      '<td>'+nombrePaciente+'</td>'+
    '</tr>'+
    '<tr>'+
      '<td><b>Fecha:</b></td>'+
      '<td>'+fecha_cita+'</td>'+
    '</tr>'+
    '<tr>'+
      '<td><b>Hora:</b></td>'+
      '<td>'+hora_cita+'</td>'+
    '</tr>'+
    '<tr>'+
      '<td><b>Sede:</b></td>'+
      '<td>'+sede+'</td>'+
    '</tr>'+
    '<tr>'+
      '<td><b></b></td>'+
      '<td>Señor usuario le recordamos que esta cita <b>NO ES PRESENCIAL</b>, espere el llamado del médico el día y hora asignada.</td>'+
    '</tr>'+
  '</tbody>'+
'</table>';


var textoImprimirSWAL='<b>Desea imprimir recordatorio?</b>';

var textoCopagoSWAL='';

swal({
  title: 'Confirmar datos de la cita',
  html: textoConfirmarSWAL,
  type: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Confirmar',
  cancelButtonText: 'Cancelar',
}).then((Confirmar) => {
  var listaAdministradoras= listarAdministradoras();
  if (tipo_usuario=='S' || tipo_usuario=='EV'){
    //1 SUBISIADO
    //2 CONTRIBUTIVO
    //3 EVENTO
    //EV evento #tipoAtencion MG medicina General ES Especialista 
    //
    IdAdministradora=administradraSubsidiado;
  }else{
    //
    IdAdministradora=administradraContributivo;
  }
  if (Confirmar) {
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
      objJson.bCitaEspecializada = bCitaEspecialista;
      objJson.sTipoAtencion = TipoAtencion;

    //DATA={"sIdPaciente": "10002", "sIdAdministradora": "3831","iIdTurnos": 12917,"sFechaCita": "2014430 08:30","sRegimen": "C","bCitaEspecializada": 1, "sTipoAtencion": "MG"} 
    //{"sIdPaciente":68910,"sIdAdministradora":"001","iIdTurnos":"96371","sFechaCita":"20180830 14:15","sRegimen":"S","bCitaEspecializada":"0","sTipoAtencion":"MG"}
    
    console.log(JSON.stringify(objJson));

    $.ajax(
      {
         type: "POST",
         url: 'https://backup.caminosips.com:443/apicitas/apicitas/citas/insertar',
         data: JSON.stringify(objJson),
         headers: ajax_headers,
         contentType: "application/json; charset=utf-8",
         dataType: "json",
         crossDomain: true,
         cache: false,
         success: function (data) {
           var estado= data.Estado;
           var mensaje = data.Mensaje;
           if (estado =='200'){
            idCitaAsignada = data.Cita.iIdCita;
             if(TipoAtencion=='EV'){
               console.log('Id CIta SIOS: '+idCitaAsignada+' Id Paciente SIOS'+iIdPacienteSios);
               guardarMySql(idCitaAsignada, iIdPacienteSios);
               //cod_pac //telefono //tipo_cita //cod_med //fecha_cita //fecha_solicitud
               //Llamar a recordatorio obligatoriamente 
               recordatorio_cita();
             }
             if(TipoAtencion=='C'){
              textoCopagoSWAL='Cita asociada a cobro de cuota moderadora, recuerde cancelar el monto de acuerdo a su categoria.<br>';
             }
             
             
            swal({

              title: 'Cita confirmada exitosamente!',
              html: 'Consecutivo cita: '+data.Cita.sConsecutivoCita+'<br> '+textoCopagoSWAL+textoImprimirSWAL,
              type: 'success',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Imprimir',
              cancelButtonText: 'Cancelar',
            }).then((Imprimir) => {
              if (Imprimir) {      
                
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
            swal({
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
         url: 'https://backup.caminosips.com:443/apicitas/apicitas/citas/BuscarPorId/'+idCita,
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
     url: 'https://backup.caminosips.com:443/apicitas/apicitas/pacientes/buscarporid/'+idPaciente,
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
       url: 'https://backup.caminosips.com:443/apicitas/apicitas/administradoras/listar',
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
  var headerHTML = "<table border='1' cellpadding='2' cellspacing='2' class='table-condensed table-hover table-bordered'><tr>"+
  "<th>Tipo de Documento</th>"+
  "<th>Documento</th>"+
  "<th>Primer Nombre</th>"+
  "<th>Segundo Nombre</th>"+
  "<th>Primer Apellido</th>"+
  "<th>Segundo Apellido</th>"+
  "</tr>";
  var footerHTML= "</table>"+
  '<button id="singlebutton" name="singlebutton" onclick="MostrarListaSede(\'no\')" class="btn btn-primary"> Siguiente   -&gt;</button>';
  var objJson = new Object();
    objJson.sTipoIdentificacion = type_id;
    objJson.sNumeroIdentificacion = cod_pac;

  //var strJSON=JSON.stringify('{"sTipoIdentificacion":"CC","sNumeroIdentificacion":'+str+'}');
  //console.log(objJson);
  
   
  
  
    $.ajax(
     {
        type: "POST",
        url: 'https://backup.caminosips.com:443/apicitas/apicitas/pacientes/Buscar',
        data: JSON.stringify(objJson),
        headers: ajax_headers,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        crossDomain: true,
        cache: false,
        success: function (data) {
          var estado= data.Estado;
          var mensaje = data.Mensaje;
          if (estado =='200'){
            var tipo_id='<td>'+data.Paciente.sTipoIdentificacion+'</td>';
            var identificacion='<td>'+data.Paciente.sNumeroIdentificacion+'</td>';
            var nombre1='<td>'+data.Paciente.sPrimerNombre+'</td>';
            var nombre2='<td>'+data.Paciente.sSegundoNombre+'</td>';
            var apellido1='<td>'+data.Paciente.sPrimerApellido+'</td>';
            var apellido2='<td>'+data.Paciente.sSegundoApellido+'</td>';
            var sios_id_pac='<input type="hidden" id="siosId" name="siosId" value="'+data.Paciente.iIdPaciente+'">';
            var trHTML=tipo_id+identificacion+nombre1+nombre2+apellido1+apellido2;
            $('#inf_pac').html(headerHTML+"<tr border='1' bgcolor='#58ACFA' style='color:white;'>"+trHTML+'</tr>'+footerHTML+sios_id_pac);
            iIdPacienteSios=data.Paciente.iIdPaciente;
            idPaciente=cod_pac;
            nombrePaciente=data.Paciente.sPrimerNombre+' '+data.Paciente.sSegundoNombre+' '+data.Paciente.sPrimerApellido+' '+data.Paciente.sSegundoApellido;
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
         url: 'https://backup.caminosips.com:443/apicitas/apicitas/citas/ValidarUltimaCitaIncumplida/'+iIdPacienteSios,
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

                swal({
                  
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
        type: "POST",
        url: 'https://backup.caminosips.com:443/apicitas/apicitas/pacientes/insertar',
        data: JSON.stringify(objJson),
        headers: ajax_headers,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        crossDomain: true,
        cache: false,
        success: function (data) {
          console.log(JSON.stringify(data));
          //alert("data: " + JSON.stringify(data));
          
          $('#inf_pac').html(loader_div);
          //$('#inf_pac').html('<img  style="margin: 0 auto" class="img-responsive text-center" src="https://backup.caminosips.com/cime/imagenes/cargando.gif" />');
          var estado= data.Estado;
          var mensaje = data.Mensaje;
          iIdPacienteSios=data.Paciente.iIdPaciente;
          var cadena='Referencia a objeto no establecida como instancia de un objeto.[crearTabla]';
           mensaje=mensaje.replace(cadena, '');
          if (estado =='200'){
            $('#inf_pac').html('<h1>Usuario Registrado con exito</h>');
            swal(
              '¡Usuario registrado con exito!',
              'Presione OK para continuar con el siguiente paso',
              'success'
            );
            
            $('#inf_pac').html(formulario_Sedes);
            $('#sede_sios').html(selectSedes);
            $('#prestadores_fecha').attr("disabled","disabled"); 
            $('#singlebutton').hide();
          }else{
            swal({
              type: 'error',
              title: 'Se ha producido un error',
              text: 'No se pudo registrar el usuario!',
              footer: '<a href="caminosips.com/faq">Por que tengo este problema?</a>'
            });
            $('#inf_pac').html(mensaje);
            //$('#sede_sios').html(selectSedes);
            ///$('#inf_pac').html(formulario_Sedes);

            $('#iIdPacienteSios').val(iIdPacienteSios);
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
    
    $('#inf_pac').html(formulario_Sedes);
    $('#prestadores_fecha').attr("disabled","disabled");
    $('#singlebutton').hide();

    //validarSedeRegimen();
   
  }
  //var Multa =Multado();

  //console.log(Multa);

  console.log('Listar Sedes');
  //selectSedes='';//MODIFICADO EL 14/05/2019
  selectSedes='<option value="0"></option>';
  $('#messages').html(loader_div);
  $.ajax(
    {
       type: "GET",
       url: 'https://backup.caminosips.com:443/apicitas/apicitas/sedes/listar',
       //data: JSON.stringify(objJson),
       headers: ajax_headers,
       contentType: "application/json; charset=utf-8",
       dataType: "json",
       crossDomain: true,
       cache: false,
       success: function (data) {
        console.log(JSON.stringify(data));
         var estado= data.Estado;
         var mensaje = data.Mensaje;
         if (estado =='200'){
           //LISTADO DE SEDES -- MODIFICACDO 23 DE FEB 2019 - 
           //MARIO FERNANDEZ -- DEVELOPER

          for (var i = 0, len = data.ListaSedes.length; i < len; i++) {
            console.log(data.ListaSedes[i].sCodigo+' : '+data.ListaSedes[i].sNombre);
            //console.log('Tipo de cita ='+tipo_temp);
            if(tipo_usuario=="S" && data.ListaSedes[i].sCodigo=='008'){
              console.log('Tipo de usuario S y Sede 008');
              if(tipo_temp=='43' || tipo_temp=='39'){//here hoy
                console.log(data.ListaSedes[i].sCodigo+' = SEDE '+tipo_temp+' TIPO CITA');
                console.log('TIPO DE CITA 43 y Sede 008');
                selectSedes+='<option value=\"'+(data.ListaSedes[i].sCodigo)+'\">'+data.ListaSedes[i].sNombre+'</option>';
              }

            }else if(tipo_usuario=="EV" && data.ListaSedes[i].sCodigo=='008'){
              console.log('Tipo de usuario EV y Sede 008');
              if(tipo_temp=='43' || tipo_temp=='39'){//here hoy
                console.log(data.ListaSedes[i].sCodigo+' = SEDE '+tipo_temp+' TIPO CITA');
                console.log('TIPO DE CITA 43 y Sede 008');
                selectSedes+='<option value=\"'+(data.ListaSedes[i].sCodigo)+'\">'+data.ListaSedes[i].sNombre+'</option>';
              }
            }else{
              if(data.ListaSedes[i].sCodigo=='008' && (tipo_temp=='43' || tipo_temp=='39') ){//here hoy
                console.log(data.ListaSedes[i].sCodigo+' = SEDE '+tipo_temp+' TIPO CITA');
                console.log('TIPO DE CITA 43 o 39 y Sede 008');
                selectSedes+='<option value=\"'+(data.ListaSedes[i].sCodigo)+'\">'+data.ListaSedes[i].sNombre+'</option>';
              }else{
                console.log(data.ListaSedes[i].sCodigo+' = SEDE '+tipo_temp+' TIPO CITA')
                selectSedes+='<option value=\"'+(data.ListaSedes[i].sCodigo)+'\">'+data.ListaSedes[i].sNombre+'</option>';
              }
              
                
              
              
            }
            
          } 
            console.log(selectSedes);
          $('#messages').html('');
         //$('#sede_sios').html(selectSedes);
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
    $('#sede_sios').attr("disabled","disabled");  
  validarSedeRegimen();
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
        url: 'https://backup.caminosips.com:443/apicitas/apicitas/pacientes/Buscar',
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
  $('#prestadores_fecha').attr("disabled","disabled");
  $('#prestadores_fecha').html(''); 

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
  getEstadoAfiliado(document.getElementById('id_pac').value, $('#tipo').val());
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
  if(tipo_temp!=''){
    swal({
      type: 'warning',
      title: 'Informacion!',
      text: 'La teleconsulta es una atención medica por vía telefónica, con el fin de evitar que usted se desplace hacia la IPS. El médico a partir de esta atención realizará un diagnóstico y un plan de tratamiento. Si usted necesita una atención presencial, el médico le dará las indicaciones.',
      
    });
    
  //MODIFICADO EL 23 DE FEB 2019 SE AGREGAN SWEET-ALERT CON INFORMACION DE CAMINO AL INTERNISTA- MFDEV
  if(tipo_temp== '39'){
    swal({
      type: 'warning',
      title: 'Informacion!',
      text: 'Señor usuario, con el fin de mejorar la oportunidad y accesibilidad a las citas de medicina interna se diseña la estrategia Camino al Internista, donde será valorado por médico general experto en medicina interna quien garantizará que al momento de la consulta con el especialista usted tenga disponible los resultados de laboratorios e imágenes diagnosticas para definir un manejo oportuno.',
      
    });
  }
  
  }
  //MODIFICADO EL 2 DE ABRIL 2019 SE AGREGAN SWEET-ALERT CON INFORMACION DE SALUD VISUAL- MFDEV
  if(tipo_temp== '40'){
    swal({
      type: 'warning',
      title: 'Informacion!',
      text: 'Señor usuario, informamos que las consultas del programa de Salud Visual solo atenderán casos asociados a problemas visuales, donde será valorado por un médico general quien realizará un diagnosticó y remisión oportuna.',
      
    });
  }
  //MODIFICADO EL 15 DE MAYO 2019 SE AGREGAN SWEET-ALERT CON INFORMACION DE SALUD VISUAL- MFDEV
  if(tipo_temp== '42'){
    swal({
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
  if($('#tipo').val()==''){
    alert('Porfavor seleccione un tipo de consulta!');

  }else if($('#tipo').val()=='01-MS'){//DEPRECATED
    tipo_consulta='1';
    var cod_med_mujer_sana='45715079';
     mujer_sana='true';

  }else if(tipo_consulta !='57'){
    bCitaEspecialista='1';
    console.log(tipo_consulta );
    TipoAtencion='ES';
  }
  
  var arr_prestadores=[];
  if (tipo_usuario=='C' && TipoAtencion=='MG'){
     arr_prestadores=["45559224","73157154","32.936.962","45550224","32790263"];
  }else{
     arr_prestadores=["1234567","73107539","45522335","45559803","45.480.202","73152243", "33102647","1047403263","45436824","9091861"];
  }
  
  
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

  //CONSULTA SI VIENE SEDE SELECCIONADA 
  var objJson = new Object();
    objJson.sCodigoEspecialidad = tipo_consulta;
    objJson.sIdSede = null;//$('#sede_sios').val();
    if( $('#check_sedes').val()=="true"){
      objJson.sIdSede = null;
    }
    objJson.sIdPaciente = iIdPacienteSios;
    objJson.iTope='20';
    objJson.bCitaEspecialista=bCitaEspecialista;

    if(objJson.sCodigoEspecialidad == '5' &&  objJson.sIdSede=='001'){
     // objJson.sCodigoEspecialidad='32';
    }

  //var strJSON=JSON.stringify('{"sCodigoEspecialidad":"389","sIdSede":"01","sIdPaciente":"9986","iTope":1,"bCitaEspecialista":0}');
  console.log(JSON.stringify(objJson));
    var selectPrestador='<option disabled="disabled" value="">    Nombre  - Fecha - Sede </option>';
    $.ajax(
     {
        type: "POST",
        url: 'https://backup.caminosips.com:443/apicitas/apicitas/TurnosPrestadores/BuscarPorEspecialidad',
        data: JSON.stringify(objJson),
        headers: ajax_headers,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        crossDomain: true,
        cache: false,
        success: function (data) {
          var estado= data.Estado;
          var mensaje = data.Mensaje;
          if (estado =='200'){
            console.log('Turnos Prestador OK');
            
            console.log('Fecha hoy '+ fecha_hoy);
            //ListarCuposDisponiblesFecha
            //{"sCodigoEspecialidad":"389","sIdSede":"01","sFecha":"20180727","sIdPrestador":"73200534"}

            
            for (var i = 0, len = data.ListaTurnos.length; i < len; i++) {
              
              if(mujer_sana=='true'){
                if(data.ListaTurnos[i].sIdPrestador==cod_med_mujer_sana){
                  if(fecha_hoy!=data.ListaTurnos[i].sFecha){
                    //if (arr_prestadores.includes(data.ListaTurnos[i].sIdPrestador )){
                      selectPrestador+='<option value=\"'+(data.ListaTurnos[i].sIdPrestador)+'*'+data.ListaTurnos[i].sFecha+'*'+data.ListaTurnos[i].sNombrePrestador+'*'+data.ListaTurnos[i].sIdSede+'\">'+data.ListaTurnos[i].sNombrePrestador+'    -    '+data.ListaTurnos[i].sFecha+' - '+data.ListaTurnos[i].sNombreSede+'</option>';
                    //}
                  }
                }
              }else{
                if(tipo_consulta==1 && mujer_sana=='false' && data.ListaTurnos[i].sIdPrestador==cod_med_mujer_sana){
                  console.log('MUJER SANA FALSO');
                }else{
                  if(fecha_hoy!=data.ListaTurnos[i].sFecha){
                    //if (arr_prestadores.includes(data.ListaTurnos[i].sIdPrestador )){
                      selectPrestador+='<option value=\"'+(data.ListaTurnos[i].sIdPrestador)+'*'+data.ListaTurnos[i].sFecha+'*'+data.ListaTurnos[i].sNombrePrestador+'*'+data.ListaTurnos[i].sIdSede+'\">'+data.ListaTurnos[i].sNombrePrestador+'    -    '+data.ListaTurnos[i].sFecha+' - '+data.ListaTurnos[i].sNombreSede+'</option>';
                    //}
                  }
                }
                
              }
              console.log(data.ListaTurnos[i].sIdPrestador+' : '+data.ListaTurnos[i].sNombrePrestador+' : '+data.ListaTurnos[i].sFecha);
              
              
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
            swal({
              type: 'warning',
              title: 'Advertencia',
              text: 'No se encontraron cupos con las opciones selecionadas, intente nuevamente seleccionando otra sede!',
              footer: '<a href="caminosips.com/faq">x</a>'
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
  switch(id_sede){
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
  }
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
//FUNCION CALENDARIO (CUPOS EN SIOS POR PRESTADOR)// 7560554  bogota ana la verde system cobro agencia jamar
function Calendario(picked){
          //{"sCodigoEspecialidad":"389","sIdSede":"01","sFecha":"20180822","sIdPrestador":"73200534"
          var fecha_labelSWAL;
          var cod_pac = $('#cod_pac_f').val();
          var tipo = $('#tipo_f').val();
         // var sede = $('#sede_f').val();
          var sede;
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
          }else{
            $("#datepicker").removeClass('hasDatepicker');
            $('#datepicker').html('');
            //$("#tabla_cupos").addClass('hidden');
            //$('#tabla_cupos').html('');
            //$( "#datepicker" ).addClass('hidden');
            objJson.sFecha=fecha_cita_SIOS;
            $('#fecha_label').html(fecha_cita);
            fecha_labelSWAL=fecha_cita;
          }
          
          objJson.sCodigoEspecialidad = tipo_consulta;
          objJson.sIdSede = sede//$('#sede_sios').val();
          objJson.sIdPrestador = arr_fecha_med[0];
          //TODAS LAS SEDES MODIFICACION
          if( $('#check_sedes').val()=="true"){
            objJson.sIdSede = arr_fecha_med[3]; ;
          }
          
          if(objJson.sCodigoEspecialidad == '5' &&  objJson.sIdSede=='001'){
            //objJson.sCodigoEspecialidad='32';
          }

          //Consulta de cupos por prestador//
          console.log('Consulta Prestador fecha: '+JSON.stringify(objJson));

          $.ajax(
            {
               type: "POST",
               url: 'https://backup.caminosips.com:443/apicitas/apicitas/TurnosPrestadores/BuscarPorFecha',
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
                   
                  console.log('Cupos Prestador OK');

                  var ret = JSON.stringify(data);
                  //console.log(ret);
                  var sede_label;
                   var num=1;
                   for (var i = 0, len = data.ListaTurnos.length; i < len; i++) {
                     console.log(data.ListaTurnos[i].sIdPrestador+' : '+data.ListaTurnos[i].sNombrePrestador+' : '+data.ListaTurnos[i].sFecha+' : '+data.ListaTurnos[i].sHora+' : '+data.ListaTurnos[i].sJornada+' : '+data.ListaTurnos[i].iIdTurno);
                    sede_label=labelSedes(data.ListaTurnos[i].sIdSede);
                    var horarioEspecial=true;//compararHoras(data.ListaTurnos[i].sHora, data.ListaTurnos[0].sJornada);
                    if(horarioEspecial==true){
                      htmlResponse+='<tr>';//
                      htmlResponse+='<td>'+num+'</td><td>'+data.ListaTurnos[i].sHora+' - '+data.ListaTurnos[i].sJornada+'</td><td>'+sede_label+'</td>';
                      htmlResponse+='<td>'+'<button id="singlebutton" name="singlebutton" onclick="validarCita(\''+data.ListaTurnos[i].sHora+'\',\''+sede_label+'\',\''+fecha_labelSWAL+'\',\''+data.ListaTurnos[i].iIdTurno+'\',\''+data.ListaTurnos[i].sFecha+'\')" class="btn btn-primary">Asignar</button></td>';
                      htmlResponse+='</tr>';
                      num++;
                    }
                   }
                   
                   $('#tbody').html(htmlResponse);
                   htmlResponse='';
                   $("#tabla_cupos").removeClass('hidden');     

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
function getEstadoAfiliado(id, tipo_cita)
{
  console.log('CONSULTA AFLIACION ------->');
  puertoWeb=':443';
  var url ='custom/operaciones.php?q='+id+'&tipo_cita='+tipo_cita;
  console.log(url);
//MySql=''
$.ajax(
  {
     type: "GET",
     url: 'custom/operaciones.php?q='+id+'&tipo_cita='+tipo_cita,
     //data: JSON.stringify(objJson),
     //headers: ajax_headers,
     contentType: "application/json; charset=utf-8",
     //dataType: "json",
     crossDomain: true,
     cache: false,
     success: function (data) {

      console.log('Succes: ' +data);
      if (data == 'ERROR' ){
        console.log('No se encuenta afiliado ' +data);
        swal({
          allowOutsideClick: false, 
          type: 'warning',
          title: 'Informacion',
          text: 'Señor usuario: lo invitamos a realizar la solicitud de cita a través del correo citas@caminosips.com, en 3 días recibirá la confirmación de cita a su correo personal.',
         // footer: '<a href="caminosips.com/faq"></a>'
        }).then((result) => {
          if (result) {
            location.reload();
          }
        });
        //
  
      }else{
      	/* Modificado 27 Marzo 2020 
      	 * Se agrega mensaje de citas del programa de Todo Corazon 
      	 * Desarrollador: MARIO FERNANDEZ 
      	 * myself11c@hotmail.com
      	 */
      	if(data=='TC'){

      	 	swal({
      	 	 	html:'Señor Usuario, usted pertenece al programa <b>De Todo Corazón</b>.<br>Compartimos los números de contactos donde a partir de la fecha, usted podrá solicitar todas sus consultas de acuerdo a la sede de atención.'+
          		'<br><b>Consolata:</b> 3005779117<br><b>Olaya:</b> 3005781862<br><b>Ronda Real:</b> 3043915885<br><b>Canapote:</b> 3122944823<br><b>Pozón – Pasacaballos:</b> 3005785364<br><b>Mahates:</b> 3005781732<br><b>Horario de atención: 1:00 pm a 4:00 pm</b><br>',
          		allowOutsideClick: false, 
          		type: 'warning',
          		title: 'Atencion',
          		

		         // footer: '<a href="caminosips.com/faq"></a>'
		        }).then((result) => {
		          if (result) {
		            location.reload();
		          }
		        });

      	}else{
      	 	tipo_usuario=data;
        	showUser(document.getElementById('id_pac').value, document.getElementById('type_id').value);
        	//return data;
      	 }
        
      }

     },

     error: function (xmlHttpRequest, textStatus, errorThrown) {
      alert("error: " + xmlHttpRequest.responseText);
      location.reload();
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
     url: 'https://backup.caminosips.com:443/apicitas/apicitas/citas/BuscarPorId/'+id_cita,
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
             url: 'https://backup.caminosips.com:443/apicitas/apicitas/pacientes/buscarporid/'+idPaciente,
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
       type: "POST",
       url: 'https://backup.caminosips.com:443/apicitas/apicitas/citas/Historial',
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
       url: 'https://backup.caminosips.com:443/apicitas/apicitas/pacientes/Buscar',
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
           //Error
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
    puertoWeb=':443';
    $.ajax(
      {
          type: "POST",
          url: 'https://backup.caminosips.com:443/apicitas/apicitas/citas/cancelar',
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