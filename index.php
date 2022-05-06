
<?php ini_set('display_errors', 'Off');

foreach($_POST as $nombre_campo => $valor){
    $asignacion = "\$" . $nombre_campo . "='" . $valor . "';";
    eval($asignacion);
}
/*BORRAR EN PROD*/
foreach($_GET as $nombre_campo => $valor){
    $asignacion = "\$" . $nombre_campo . "='" . $valor . "';";
    eval($asignacion);
}

?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="apple-touch-icon" sizes="76x76" href="assets/img/apple-icon.png">
    <link rel="icon" type="image/png" href="assets/img/favicon.png">
    <title>
        Autogestion - HeedSalud del Caribe S.A.S.
    </title>
    <!--     Fonts and icons     -->
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet" />
    <!-- Nucleo Icons -->
    <link href="assets/css/nucleo-icons.css" rel="stylesheet" />
    <link href="assets/css/nucleo-svg.css" rel="stylesheet" />
    <!-- Font Awesome Icons -->
    <script src="https://kit.fontawesome.com/42d5adcbca.js" crossorigin="anonymous"></script>
    <link href="assets/css/nucleo-svg.css" rel="stylesheet" />
    <!-- CSS Files -->
    <link id="pagestyle" href="assets/css/soft-ui-dashboard.css?v=1.0.3" rel="stylesheet" />
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/smoothness/jquery-ui.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js" type="text/javascript"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"></script>
</head>

<body class="">
<!--
Navbar
-->
<main class="main-content  mt-0">
    <section>
        <div class="page-header min-vh-75">
            <div class="container">
                <div class="row">
                    <div class="text-center w-100 mt-4 mb-0">
                        <button type="button" onclick="asignar(<?php echo '\''.$tipoId.'\',\''.$nombretipoId.'\',\''.$identificacion.'\',\''.$IdEmpresa.'\''; ?>)" class="btn bg-gradient-info btn-lg">Asignar citas</button>

                        <button type="button" onclick="cancelar(<?php echo '\''.$tipoId.'\',\''.$nombretipoId.'\',\''.$identificacion.'\',\''.$IdEmpresa.'\''; ?>)" class="btn bg-gradient-success btn-lg ">Verificar y cancelar citas</button>
                    </div>

                    <!--<div class="col-md-6">
                        <div class="oblique position-absolute top-0 h-100 d-md-block d-none me-n8">
                            <div class="oblique-image bg-cover position-absolute fixed-top ms-auto h-100 z-index-0 ms-n6" style="background-image:url('assets/img/curved-images/curved6.jpg')"></div>
                        </div>
                    </div>-->
                </div>
            </div>
        </div>
    </section>
</main>
<!-- -------- START FOOTER 3 w/ COMPANY DESCRIPTION WITH LINKS & SOCIAL ICONS & COPYRIGHT ------- -->
<footer class="footer py-5">
    <div class="container">
        <div class="row">
            <div class="col-lg-8 mb-4 mx-auto text-center">
                <!--
                <a href="javascript:;" target="_blank" class="text-secondary me-xl-5 me-3 mb-sm-0 mb-2">
                  Company
                </a>
                <a href="javascript:;" target="_blank" class="text-secondary me-xl-5 me-3 mb-sm-0 mb-2">
                  About Us
                </a>
                <a href="javascript:;" target="_blank" class="text-secondary me-xl-5 me-3 mb-sm-0 mb-2">
                  Team
                </a>
                <a href="javascript:;" target="_blank" class="text-secondary me-xl-5 me-3 mb-sm-0 mb-2">
                  Products
                </a>
                <a href="javascript:;" target="_blank" class="text-secondary me-xl-5 me-3 mb-sm-0 mb-2">
                  Blog
                </a>
                <a href="javascript:;" target="_blank" class="text-secondary me-xl-5 me-3 mb-sm-0 mb-2">
                  Pricing
                </a>
              </div>-->
               <!-- <div class="col-lg-8 mx-auto text-center mb-4 mt-2">
                    <a href="javascript:;" target="_blank" class="text-secondary me-xl-4 me-4">
                        <span class="text-lg fab fa-dribbble"></span>
                    </a>
                    <a href="javascript:;" target="_blank" class="text-secondary me-xl-4 me-4">
                        <span class="text-lg fab fa-twitter"></span>
                    </a>
                    <a href="javascript:;" target="_blank" class="text-secondary me-xl-4 me-4">
                        <span class="text-lg fab fa-instagram"></span>
                    </a>
                    <a href="javascript:;" target="_blank" class="text-secondary me-xl-4 me-4">
                        <span class="text-lg fab fa-pinterest"></span>
                    </a>
                    <a href="javascript:;" target="_blank" class="text-secondary me-xl-4 me-4">
                        <span class="text-lg fab fa-github"></span>
                    </a>
                </div>
            </div>-->
            <div class="row">
                <div class="col-8 mx-auto text-center mt-1">
                    <p class="mb-0 text-secondary">
                        Copyright © <script>
                            document.write(new Date().getFullYear())
                        </script>
                    </p>
                </div>
            </div>
        </div>
        <div id="datos_paciente">
            <!-- DDATOS DEL PACIENTE -->
            <form id="paciente_inicio">
                <input name="cod_pac_f" type="hidden" value="" id="cod_pac_f">
                <input name="type_id_f" type="hidden" value="" id="type_id_f">
                <input name="nombre_f" type="hidden" value="" id="nombre_f">
                <input name="direccion_f" type="hidden" value="" id="direccion_f">
                <input name="telefono_f" type="hidden" value="" id="telefono_f">
                <input name="fecha_nac_f" type="hidden" value="" id="fecha_nac_f">
                <input name="email_f" type="hidden" value="" id="email_f">
                <input name="sexo_f" type="hidden" value="" id="sexo_f">
                <input name="sede_f" type="hidden" value="" id="sede_f">
                <input name="tipo_f" type="hidden" value="" id="tipo_f">
                <input name="nuevo_f" type="hidden" value="" id="nuevo_f">
                <input name="check_sedes" type="hidden" value="false" id="check_sedes">
                <input name="iIdPacienteSios" type="hidden" value="" id="iIdPacienteSios">
                <input name="regimen" type="hidden" value="" id="regimen">
                <input name="tipo" type="hidden" value="" id="tipo">
            </form>

        </div>
        <form name="forma" action="" method="POST" id="forma1">
            <input name="iIdPacienteImprimir" id="iIdPacienteImprimir" type="hidden" value="">
            <input name="idCitaAsignada" id="idCitaAsignada" type="hidden" value="">
            <input name="puertoWeb" id="puertoWeb" type="hidden" value="">

        </form>
</footer>
<!-- -------- END FOOTER 3 w/ COMPANY DESCRIPTION WITH LINKS & SOCIAL ICONS & COPYRIGHT ------- -->
<!--   Core JS Files   -->
<script src="assets/js/core/popper.min.js"></script>
<script src="assets/js/core/bootstrap.min.js"></script>
<script src="assets/js/plugins/perfect-scrollbar.min.js"></script>
<script src="assets/js/plugins/smooth-scrollbar.min.js"></script>
<script>
    var win = navigator.platform.indexOf('Win') > -1;
    if (win && document.querySelector('#sidenav-scrollbar')) {
        var options = {
            damping: '0.5'
        }
        Scrollbar.init(document.querySelector('#sidenav-scrollbar'), options);
    }
</script>
<script>
    if (typeof module === 'object') {
        window.module = module;
        module = undefined;
    }
</script>
<script>
    if (window.module) module = window.module;
</script>
<script type="text/javascript" language="javascript">
    $(document).ready(function() {

        $("input:submit").click(function() {
            return false;
        });
        $('form').on('submit', function(e) {
            // validation code here
            //validar(e);
            e.preventDefault();
        });
    });
    function asignar(tipoId,nombretipoId,identificacion,IdEmpresa){

        let form = document.createElement('form');
        form.action = 'asignar_cita.php';
        form.method = 'POST';

        form.innerHTML = '<input name="tipoId" value="'+tipoId+'">'+'<input name="nombretipoId" value="'+nombretipoId+'">'+'<input name="identificacion" value="'+identificacion+'">'+'<input name="IdEmpresa" value="'+IdEmpresa+'">';

        // el formulario debe estar en el document para poder enviarlo
        document.body.append(form);

        form.submit();
    }
    function cancelar(tipoId,nombretipoId,identificacion, IdEmpresa){

        let form = document.createElement('form');
        form.action = 'cancelar_verificar.php';
        form.method = 'POST';

        form.innerHTML = '<input name="tipoId" value="'+tipoId+'">'+'<input name="nombretipoId" value="'+nombretipoId+'">'+'<input name="identificacion" value="'+identificacion+'">'+'<input name="IdEmpresa" value="'+IdEmpresa+'">';

        // el formulario debe estar en el document para poder enviarlo
        document.body.append(form);

        form.submit();
    }

</script>
<script>
    $('#id_pac').on('blur', function() {
        var m = document.getElementById("id_pac").value;
        var expreg = /^(?:\+|-)?\d+$/;

        if (!expreg.test(m)) {
            $('#errorIdPac').html('Recuerde, Solo valores Numericos')
            $('#btn1').attr('disabled', true)
            $('#id_pac').addClass('is-invalid')
        } else {
            $('#errorIdPac').html('')
            $('#btn1').attr('disabled', false)
            $('#id_pac').removeClass('is-invalid')
        }
    })

    $('#cerrarModal').on('click', function() {
        location.reload();
    })

    $('#subirRemision').on('click', function(e) {
        e.preventDefault()

        let regExp = /\$/i
        let html = $('#tableDatos')[0].outerHTML
        let data = new FormData()
        html.replace(regExp, '')

        data.append('pdfRemision', $('#remision')[0].files[0])
        data.append('tablaDatosHTML', html)

        $.ajax({
            url: 'subirRemision.php',
            method: 'POST',
            data: data,
            contentType: false,
            processData: false,
            success: function(response) {
                console.log(response);
                if(response.indexOf('ERROR: ') == 0)
                {
                    swal.fire(
                        'Mensaje de error',
                        response,
                        'error'
                    )
                }

                $('#singlebutton').attr('disabled', false)
                $('#exampleModal').modal('hide')
            }
        })
    })
</script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>
<script src="assets/js/functions.js?v=<?php echo rand() ?>"></script>
<!-- Github buttons -->
<script async defer src="https://buttons.github.io/buttons.js"></script>
<!-- Control Center for Soft Dashboard: parallax effects, scripts for the example pages etc -->
<script src="assets/js/soft-ui-dashboard.min.js?v=1.0.3"></script>

</body>

</html>