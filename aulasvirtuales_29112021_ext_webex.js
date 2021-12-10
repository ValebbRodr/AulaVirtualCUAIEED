window.addEventListener('load', function () {
  insertar_registro();
  insertar_validacion_dgp();
  insertar_acceso_moodle();
  insertar_acceso_zoom();
  insertar_accesos_aulas();

  //Deshabilitamos el cut, copy, paste de los campos de confirmar contraseña y correo
  $('#correo2').bind('cut copy paste', function (e) {
    e.preventDefault();
  });

  $('#contra2').bind('cut copy paste', function (e) {
    e.preventDefault();
  });

}, false);

function insertar_registro(){
  var moodle_registro = document.getElementById("modalRegistro");
  moodle_registro.innerHTML = '<div class="modal-dialog modal-lg" role="document">'+
  '<div class="modal-content alpha-modal">'+
    '<div class="modal-header">'+
      '<h4 class="modal-title">Registro</h4>'+
    '</div>'+
    '<div class="modal-body account-wall">'+
      '<div class="row">'+
        '<div class="col-md-6">'+
          '<form id="registro_form" name="registro_form">'+
            '<div class="col-md-12" id="plataforma" style="display:none;"></div>'+
            '<label>RFC (con homoclave) *</label>'+
            '<div class="row">'+
              '<div class="col-md-12">'+
                '<div class="form-group">'+
                  '<input type="password" class="form-control" id="rfc_validado" oninvalid="setCustomValidity(\RFC requerido.\)" oninput="setCustomValidity(\\)" required disabled/>'+
                '</div>'+
              '</div>'+
            '</div>'+
            '<label>Correo electrónico *</label>'+
            '<div class="row">'+
              '<div class="col-md-12">'+
                '<div class="form-group">'+
                  '<input type="email" class="form-control" aria-describedby="correoHelpBlock" id="correo" oninvalid="setCustomValidity(\Correo requerido.\)" oninput="setCustomValidity(\\)" required />'+
                  '<small id="correoHelpBlock" class="text-muted">Es muy importante registar un correo electrónico <b>VÁLIDO</b> y <b>VERIFICADO</b><br />' +
                  '* Si ya has creado una cuenta de <b>Zoom</b> anteriormente, <b>utiliza una cuenta de correo diferente para registrarte en este sitio</b></small>'+
                '</div>'+
              '</div>'+
            '</div>'+
            '<div id="confirmar_correo" style="display:block;">'+
              '<label>Confirmar correo electrónico *</label>'+
              '<div class="row">'+
                '<div class="col-md-12">'+
                  '<div class="form-group">'+
                    '<input type="email" class="form-control" id="correo2" oninvalid="setCustomValidity(\Confirmar Correo requerido.\)" oninput="setCustomValidity(\\)" required />'+
                  '</div>'+
                '</div>'+
              '</div>'+
            '</div>'+
            '<label>Contraseña *</label>'+
            '<div class="row">'+
              '<div class="col-md-12">'+
                '<div class="form-group">'+
                  '<input type="password" class="form-control" aria-describedby="contraHelpBlock" id="contra" oninvalid="setCustomValidity(\Contraseña requerida.\)" oninput="setCustomValidity(\\)" required />'+
                  '<small id="contraHelpBlock" class="text-muted">Longitud mínima de 8 caracteres.<br />Debe tener como mínimo una mayúscula, una minúscula, un dígito y un carácter especial del siguiente listado: $ # @ ( ) = ? ¿ ¡ !<br />No deberá tener caracteres o números consecutivos (abcde o 12345) y no repetir caracteres o números contiguos (aabb, 1122).</small>'+
                '</div>'+
              '</div>'+
            '</div>'+
            '<div id="confirmar_contra" style="display:block;">'+
              '<label>Confirmar Contraseña *</label>'+
              '<div class="row">'+
                '<div class="col-md-12">'+
                  '<div class="form-group">'+
                    '<input type="password" class="form-control" id="contra2" oninvalid="setCustomValidity(\Confirmar Contraseña requerida.\)" oninput="setCustomValidity(\\)" required />'+
                  '</div>'+
                '</div>'+
              '</div>'+
            '</div>'+
            '<div id="selecciona_nivel" style="display:block;">'+
              '<label>Nivel *</label>'+
              '<div class="row">'+
                '<div class="col-md-12">'+
                  '<div class="form-group">'+
                    '<select class="form-control" id="nivel" oninvalid="setCustomValidity(\Seleccionar un nivel.\)" oninput="setCustomValidity(\\)" required>'+
                      '<option value="">Seleccione...</option>'+
                      '<option value="bachillerato">Bachillerato</option>'+
                      '<option value="licenciatura">Licenciatura</option>'+
                      '<option value="posgrado">Posgrado</option>'+
                    '</select>'+
                  '</div>'+
                '</div>'+
              '</div>'+
	      '<small id="webex_mensaje" class="text-muted pull-right" style="display:none;"><strong>El registro a Webex tomará unos segundos en realizarse.<strong></small>'+
            '</div>'+
            '<div class="row">'+
              '<div class="col-md-12">'+
                '<div class="form-group">'+
                  '<div class="g-recaptcha pull-right" data-sitekey="6LegaN4UAAAAAN_-F6KtuCijS1L1-5WIs1Qh2-BS" data-callback="validarCaptcha"></div>'+
                '</div>'+
              '</div>'+
            '</div>'+
            '<div class="row">'+
              '<div class="col-md-6"></div>'+
              '<div class="col-md-3">'+
                '<div class="form-group">'+
                  '<button type="button" id="btn_cancelar" href="#" class="btn btn-sm btn-danger" onClick="cancelar();" style="display:block;cursor:pointer;">Cancelar</button>'+
                '</div>'+
              '</div>'+
              '<div class="col-md-3">'+
                '<div class="form-group">'+
                  '<button type="button" id="btn_registro" class="btn btn-sm btn-success pull-right" onClick="registrar();" style="display:block;cursor:pointer;">Registrar</button>'+
                '</div>'+
              '</div>'+
            '</div>'+
          '</form>'+
        '</div>'+
        '<br />'+
        '<div class="col-md-6">'+
          '<div class="row">'+
            '<div class="col-md-11 alert alert-info">'+
              '<h5>INDICACIONES</h5>'+
              'El registro es para el personal <strong>ACTIVO</strong> de la UNAM.<br/>La contraseña que ingrese es <strong>ÚNICA</strong> para el registro/acceso a las plataformas.<br /><strong>Guarde su contraseña en un lugar seguro y no la comparta con nadie.</strong><br />Si el reCAPTCHA expiró, favor de actualizar la página.<h5>MOODLE</h5>El usuario para la plataforma MOODLE será siempre su RFC.<h5>ZOOM</h5>El usuario para la plataforma ZOOM será siempre el correo electrónico que registró.<h5>Webex</h5>El usuario para la plataforma Webex será siempre el correo electrónico que registró.'+
            '</div>'+
          '</div>'+
        '</div>'+
      '</div>'+
    '</div>'+
  '</div>'+
'</div>';
}

function insertar_registro_old(){
  var moodle_registro = document.getElementById("modalRegistro");
  moodle_registro.innerHTML = '<div class="modal-dialog modal-lg" role="document">' +
    '<div class="modal-content alpha-modal">' +
      '<div class="modal-header">' +
        '<h4 class="modal-title">Registro</h4>' +
      '</div>' +
      '<div class="modal-body account-wall">' +
        '<form id="registro_form" name="registro_form">' +
          '<div class="form-group">' +
            '<div class="row">' +
              '<div class="col-md-12 alert alert-info" role="alert" style="font-size: .8em;">' +
                '<h4>INDICACIONES GENERALES</h4>' +
                '<p>El registro es exclusivo para el personal ACTIVO de la UNAM.</p>' +
                '<p>Es muy importante registar un correo VÁLIDO y VERIFICADO.</p>' +
                '<p>Si el reCAPTCHA expiró, favor de actualizar la página.</p>' +
                '<hr>' +
                '<h4>CONTRASEÑA</H4>' + 
                '<p>Guarde su contraseña en un lugar seguro y no la comparta con nadie.</p>' +
                '<p>La contraseña que ingrese es ÚNICA para el registro/acceso a las plataformas MOODLE, ZOOM y BLACKBOARD.</p>' +
                '<p>Longitud mínima de 8 caracteres.</p>' +
                '<p>Debe tener como mínimo una mayúscula, una minúscula, un dígito y un carácter especial del siguiente listado: $ # @ ( ) = ? ¿ ¡ !</p>' +
                '<p>No deberá tener caracteres o números consecutivos (abcde o 12345).</p>' +
                '<p>No repetir caracteres o números contiguos (aabb, 1122).</p>' +
                '<hr>' +
                '<h4>MOODLE</h4>' +
                '<p>El usuario de ingreso para la plataforma MOODLE será siempre su RFC.</p>' +
                '<hr>' +
                '<h4>ZOOM</h4>' +
                '<p>El usuario de ingreso para la plataforma ZOOM será siempre el correo electrónico que registró.</p>' +
                '<hr>' +
                '<h4>BLACKBOARD COLLABORATE ULTRA</h4>' +
                '<p>Se ingresará directamente a la reunión.</p>' +
              '</div>' +
            '</div>' +
          '</div>' + 
          '<div class="form-group">' +
            '<div class="row">' +
              '<div class="col-md-12" id="plataforma" style="display:none;"></div>' +
            '</div>' +
          '</div>' +
          '<div class="form-group">' +
            '<div class="row">' +
              '<div class="col-md-4"><label for="usr">RFC (con homoclave) *</label></div>' +
              '<div class="col-md-8"><span id="rfc_validado"></span></div>' +
            '</div>' +
          '</div>' +
          '<div class="form-group">' +
            '<div class="row">' +
              '<div class="col-md-4"><label for="email">Correo electrónico *</label> <i class="fa fa-question fa-xs" rel="tooltip" title="Correo válido que se registrará en la plataforma."></i> </div>' +
              '<div class="col-md-8"><input type="email" class="form-control" id="correo" oninvalid="setCustomValidity(\'Correo requerido.\')" oninput="setCustomValidity(\'\')" required /></div>' +
            '</div>' +
          '</div>' +
          '<div class="form-group" id="confirmar_correo" style="display:block;">' +
            '<div class="row">' +
              '<div class="col-md-4"><label for="email">Confirmar correo electrónico *</label></div>' +
              '<div class="col-md-8"><input type="email" class="form-control" id="correo2" oninvalid="setCustomValidity(\'Confirmar Correo requerido.\')" oninput="setCustomValidity(\'\')" required /></div>' +
            '</div>' +
          '</div>' +
          '<div class="form-group">' +
            '<div class="row">' +
              '<div class="col-md-4"><label for="Pass">Contraseña *</label> <i class="fa fa-question fa-xs" rel="tooltip" title="Contraseña para el ingreso a la plataforma."></i> </div>' +
              '<div class="col-md-8"><input type="password" class="form-control" id="contra" oninvalid="setCustomValidity(\'Contraseña requerida.\')" oninput="setCustomValidity(\'\')" required /></div>' +
            '</div>' +
          '</div>' +
          '<div class="form-group" id="confirmar_contra" style="display:block;">' +
            '<div class="row">' +
              '<div class="col-md-4"><label for="Pass">Confirmar Contraseña *</label></div>' +
              '<div class="col-md-8"><input type="password" class="form-control" id="contra2" oninvalid="setCustomValidity(\'Confirmar Contraseña requerida.\')" oninput="setCustomValidity(\'\')" required /></div>' +
            '</div>' +
          '</div>' +
          '<div class="form-group" id="selecciona_nivel" style="display:block;">' +
            '<div class="row">' +
              '<div class="col-md-4"><label for="lbl_nivel">Nivel</label></div>' +
              '<div class="col-md-8"><select class="form-control" id="nivel" oninvalid="setCustomValidity(\'Seleccionar un nivel.\')" oninput="setCustomValidity(\'\')" required ><option value="">Seleccione...</option><option value="bachillerato">Bachillerato</option><option value="Licenciatura">Licenciatura</option><option value="posgrado">Posgrado</option></select></div>' +
            '</div>' +
          '</div>' +
          '<div class="form-group">' +
            '<div class="row">' +
              '<div class="col-md-12 col-xs-12">' +
                '<div class="g-recaptcha pull-right" data-sitekey="6LegaN4UAAAAAN_-F6KtuCijS1L1-5WIs1Qh2-BS" data-callback="validarCaptcha"></div>' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<div class="form-group">' +
            '<div class="row justify-content-end">' +
              '<div class="col-md-3">' +
                '<a id="btn_cancelar" href="#" class="btn btn-sm btn-secondary" onClick="cancelar();" style="display:block;">Cancelar</a>' +
              '</div>' +
              '<div class="col-md-3">' +
                '<button type="button" id="btn_registro" class="btn btn-sm btn-primary pull-right" onClick="registrar();" style="display:block;cursor:pointer;"">Registrar</button>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</form>' +
      '</div>' +
    '</div>' +
  '</div>';
}

function insertar_validacion_dgp(){
  var validacion_dgp = document.getElementById("modalValidacion");
  validacion_dgp.innerHTML = '<div class="modal-dialog modal-lg" role="document">' +
    '<div class="modal-content alpha-modal">' +
      '<div class="modal-header">' +
        '<h4 class="modal-title">Validación de datos DGP</h4>' +
      '</div>' +
      '<div class="modal-body account-wall drop-shadow login">' +
        '<div class="alert alert-warning" role="alert">' +
          'La validación del RFC es correcta.' +
          '<br/>' +
          'Dar clic en el botón <strong>Continuar</strong>.' +
          '<br />' +
        '</div>' +
        '<form id="validacion_dgp_form" name="validacion_dgp_form">' +
          '<div class="form-group">' +
            '<div class="row">' +
              '<div class="col-md-4"><label for="lb_dgp_nombre_completo">Nombre completo</label></div>' +
              '<div class="col-md-8"><span id="dgp_nombre_completo"></span></div>' +
            '</div>' +
          '</div>' +
          '<div class="form-group" style="display:none;">' +
            '<div class="row">' +
              '<div class="col-md-4"><label for="lb_dgp_nombre">Nombre</label></div>' +
              '<div class="col-md-8"><span id="dgp_nombre"></span></div>' +
            '</div>' +
          '</div>' +
          '<div class="form-group" style="display:none;">' +
            '<div class="row">' +
              '<div class="col-md-4"><label for="lb_dgp_app_paterno">Apellido paterno</label></div>' +
              '<div class="col-md-8"><span id="dgp_app_paterno"></span></div>' +
            '</div>' +
          '</div>' +
          '<div class="form-group" style="display:none;">' +
            '<div class="row">' +
              '<div class="col-md-4"><label for="lb_dgp_app_materno">Apellido materno</label></div>' +
              '<div class="col-md-8"><span id="dgp_app_materno"></span></div>' +
            '</div>' +
          '</div>' +
          '<div class="form-group" style="display:none;">' +
            '<div class="row">' +
              '<div class="col-md-4"><label for="lb_dgp_numerotrabajador">Número de trabajador</label></div>' +
              '<div class="col-md-8"><span id="dgp_numerotrabajador"></span></div>' +
            '</div>' +
          '</div>' +
          '<div class="form-group">' +
            '<div class="row">' +
              '<div class="col-md-4"><label for="lb_dgp_tipo">Tipo de trabajador</label></div>' +
              '<div class="col-md-8"><span id="dgp_tipo"></span></div>' +
            '</div>' +
          '</div>' +
          '<div class="form-group" style="display:none;">' +
            '<div class="row">' +
              '<div class="col-md-4"><label for="lb_dgp_rfc">RFC</label></div>' +
              '<div class="col-md-8"><span id="dgp_rfc"></span></div>' +
            '</div>' +
          '</div>' +
          '<div class="form-group" style="display:none;">' +
            '<div class="row">' +
              '<div class="col-md-4"><label for="lb_dgp_curp">CURP</label></div>' +
              '<div class="col-md-8"><span id="dgp_curp"></span></div>' +
            '</div>' +
          '</div>' +
          '<div class="form-group">' +
            '<div class="row">' +
              '<div class="col-md-4"><label for="lb_dgp_dependencia">Dependencia</label></div>' +
              '<div class="col-md-8"><span id="dgp_dependencia"></span></div>' +
            '</div>' +
            '<div class="row" style="display:none;">' +
              '<div class="col-md-4"><label for="lb_dgp_cvedependencia">Clave dependencia</label></div>' +
              '<div class="col-md-8"><span id="dgp_cvedependencia"></span></div>' +
            '</div>' +
          '</div>' +
          '<div class="form-group">' +
            '<div class="row justify-content-end">' +
              '<div class="offset-md-9 col-md-1">' +
                '<a id="btn_cancelar" href="#" class="btn btn-sm btn-secondary pull-right" onClick="cancelar();" style="display:block;">Cancelar</a>' +
              '</div>' +
              '<div class="col-md-2">' +
                '<a id="btn_mostrar_aulas" href="#" class="btn btn-sm btn-secondNaranja pull-right" onClick="ingreso_plataformas(false);" style="display:block;">Continuar</a>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</form>' +
      '</div>' +
      '<div class="modal-footer" style="display:block;text-align:left;padding:40px;background:antiquewhite;">' +
        '<h3 style="font-weight:bold;">Aviso:</h3>' +
        '<p style="font-size:20px!important;">Al personal académico y administrativo de la universidad se les invita a hacer uso de las aulas virtuales para funciones académicas o de índole universitario</p>' +
      '</div>' +
    '</div>' +
  '</div>';
}

function insertar_accesos_aulas(){
  var aulas_disponibles = document.getElementById('docentes_aulas_disponibles');
  aulas_disponibles.innerHTML = '<div style="margin-top: 20px; margin-bottom: 20px;">' +
      '<h4 id="H4nombredocente" style="text-align: center;"></h4>' +
    '</div>' +
    '<div style="width: 80%; margin: auto;">' +
      '<form class="form-signin" id="faulas" autocomplete="off">' +
        '<div class="form-group">' +
          '<div class="row">' +
            '<div class="col-md-2">' +
              '<label id="lbl-moodle">Moodle</label>' +
            '</div>' +
            '<div class="col-md-10" id="btn_moodle_ingreso" style="display:none;">' +
              '<button type="button" class="btn btn-sm pull-right" style="cursor:pointer;" onClick="ingresar_moodle();">Ingresar a MOODLE</button>' +
            '</div>' +
            '<div class="col-md-10" id="btn_moodle_registro" style="display:block;">' +
              '<button type="button" class="btn btn-sm pull-right" style="cursor:pointer;" onClick="mostrar_registro(\'moodle\');">Registrarme</button>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '<div class="form-group">' +
        '<div class="row">' +
          '<div class="col-md-2">' +
            '<label id="lbl-zoom">Zoom</label>' +
          '</div>' +
          '<div class="col-md-10" id="btn_zoom_ingreso" style="display:none;">' +
            '<button type="button" class="btn btn-sm pull-right" style="cursor:pointer;" onClick="ingresar_zoom();">Ingresar a ZOOM</button>' +
            '<small id="vigenciaHelpBlock" class="text-muted" style="display:none;font-weight: bold"></small>'+
          '</div>' +
          '<div class="col-md-10" id="zoom_no_verificado" style="display:none;">' +
            '<label class="alert alert-warning">Tiene 30 días para confirmar su cuenta Zoom. Favor de revisar su correo eléctrónico que registró para concluir el registro.<br /><b>El correo puede tardar hasta 8 horas en llegar</b>.</label>' +
            '<button type="button" class="btn btn-sm pull-right" style="cursor:pointer;" onClick="ingreso_plataformas(true);">Ya confirme la cuenta zoom</button>' +
          '</div>' +
          '<div class="col-md-10" id="btn_zoom_registro" style="display:block;">' +
            '<button type="button" class="btn btn-sm pull-right" style="cursor:pointer;" onClick="mostrar_registro(\'zoom\');">Registrarme</button>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="form-group" id="webex" style="display:block;">' +
        '<div class="row">' +
          '<div class="col-md-2">' +
            '<label id="lbl-zoom">Webex</label>' +
          '</div>' +
          '<div class="col-md-10" id="webex_no_verificado" style="display:none;">' +
            '<label class="alert alert-warning">Favor de revisar su correo eléctrónico que registró para confirmar el registro a Webex.</label>' +
            '<button type="button" class="btn btn-sm pull-right" style="cursor:pointer;" onClick="ingreso_plataformas(true);">Ya confirme la cuenta Webex</button>' +
          '</div>' +
          '<div class="col-md-10" id="btn_webex_registro" style="display:block;">' +
            '<label class="alert alert-info">Servicio no disponible por el momento.</label>' +
	//'<button type="button" class="btn btn-sm pull-right" style="cursor:pointer;" onClick="mostrar_registro(\'webex\');">Registrarme</button>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="form-group" id="webex_meeting" style="display:none;">' +
        '<div class="row">' +
          '<div class="col-md-2">' +
            '<label id="lbl-zoom">Webex Meetings</label>' +
          '</div>' +
          '<div class="col-md-10" id="btn_meetings_ingreso" style="display:none;">' +
            '<button type="button" class="btn btn-sm pull-right" style="cursor:pointer;" onClick="ingresar_webex_meeting();">Ingresar a Meetings</button>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="form-group" id="webex_team" style="display:none;">' +
        '<div class="row">' +
          '<div class="col-md-2">' +
            '<label id="lbl-zoom">Webex Teams</label>' +
          '</div>' +
          '<div class="col-md-10" id="btn_teams_ingreso" style="display:none;">' +
            '<button type="button" class="btn btn-sm pull-right" style="cursor:pointer;" onClick="ingresar_webex_teams();">Ingresar a Teams</button>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</form>' +
    '<br>' +
  '</div>';
}

function insertar_acceso_moodle(){
  //var protocolo = document.location.protocol;
  //var ruta_raiz = document.location.hostname;
  //var url_raiz = protocolo + "//" + ruta_raiz + "/";
  $("#acceso_moodle").append('<form id="fmoodle_acceso" name="moodle_acceso" method="post" action="">' +
      '<input type="text" id="username" name="username" />' +
    '  <input type="password" id="passwordM" name="password" />' +
    '</form>');
  $("#fmoodle_acceso").attr("action", "https://aulas-virtuales.cuaed.unam.mx/moodle/login/index.php");
  //$("#fmoodle_acceso").attr("action", url_raiz + "moodle/login/index.php");
}

function insertar_acceso_zoom(){
  $("#acceso_zoom").append('<form id="fzoom_acceso" name="zoom_acceso" method="post" action="">' +
      '<input type="text" id="email" name="email" />' +
    '  <input type="password" id="passwordZ" name="password" />' +
    '</form>');
  $("#fzoom_acceso").attr("action", "https://cuaieed-unam.zoom.us/start/videomeeting");
}

function GetURLParameter(sParam){
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam)
        {
            return sParameterName[1];
        }
    }
}

function validarCaptcha(){
  var protocolo = document.location.protocol;
  var ruta_raiz = document.location.hostname;
  var url_captcha = protocolo + "//" + ruta_raiz + ":3000" + "/api/recaptcha/verificar";
  var r = grecaptcha.getResponse();
  $.get({
    url: url_captcha,
    dataType: 'json',
    data: {'response': r},
    success: function(result) {
      if (result.success) {
        document.getElementById("btn_registro").disabled = false;
      }
      else {
        Swal.fire({
          html: "<p><i class='fa fa-times-circle fa-3x' style='color:red'></i></p><p>Recaptcha: " + res + "</p>",
          imageUrl: protocolo + "//" + ruta_raiz + '/img/logos/logo_AV.svg',
          imageWidth: 190,
          imageHeight: 76,
          imageAlt: 'Aulas virtuales y ambientes educativos',
          confirmButtonText: "Ok"
        });
      }
    }, // end of success:
    error: function (xhr, ajaxOptions, thrownError) {
        Swal.fire({
          html: "<p><i class='fa fa-times-circle fa-3x' style='color:red'></i></p><p>Recaptcha: " + thrownError + "</p>",
          imageUrl: protocolo + "//" + ruta_raiz + '/img/logos/logo_AV.svg',
          imageWidth: 190,
          imageHeight: 76,
          imageAlt: 'Aulas virtuales y ambientes educativos',
          confirmButtonText: "Ok"
        });
    } // end of error:
  }); // end of $.ajax
  //grecaptcha.reset();
}

function validarCaptcha_old(){
  var protocolo = document.location.protocol;
  var ruta_raiz = document.location.hostname;
  var url_captcha = protocolo + "//" + ruta_raiz + "/proxy_recaptcha.php";
  var r = grecaptcha.getResponse();
  $.get({
    url: url_captcha,
    dataType: 'json',
    data: { 'url': 'https://www.google.com/recaptcha/api/siteverify', 'response': r},
    success: function(result) {
      var res = result.success.toString();
      if (res == 'true' || res == true) {
        document.getElementById("btn_registro").disabled = false;
      }
      else {
        Swal.fire({
          html: "<p><i class='fa fa-times-circle fa-3x' style='color:red'></i></p><p>Recaptcha: " + res + "</p>",
          imageUrl: protocolo + "//" + ruta_raiz + '/img/logos/logo_AV.svg',
          imageWidth: 190,
          imageHeight: 76,
          imageAlt: 'Aulas virtuales y ambientes educativos',
          confirmButtonText: "Ok"
        });
      }
    }, // end of success:
    error: function (xhr, ajaxOptions, thrownError) {
        Swal.fire({
          html: "<p><i class='fa fa-times-circle fa-3x' style='color:red'></i></p><p>Recaptcha: " + thrownError + "</p>",
          imageUrl: protocolo + "//" + ruta_raiz + '/img/logos/logo_AV.svg',
          imageWidth: 190,
          imageHeight: 76,
          imageAlt: 'Aulas virtuales y ambientes educativos',
          confirmButtonText: "Ok"
        });
    } // end of error:
  }); // end of $.ajax
  //grecaptcha.reset();
}

//Registro
function validarCorreo(correo) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(correo);
}

//Validar confirmaciones del correo y la contraseña
function validarConfirmaciones(valor1, valor2){
  if(valor1 != valor2) {
    return false;
  } else {
    return true;
  }
}

function validarRFC(academico) {
  var re = /^[ñÑa-zA-Z]{4}\d{6}[ñÑa-zA-Z\d]{3}/;
  return re.test(academico);
}

function validarContra(contra) {
  var carac = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$#@()?¿!¡=])([A-Za-z\d$#@()?¿!¡=]|[^ ]){8,}$/;
  return carac.test(contra);
}

function validar_campos(protocolo, ruta_raiz) {
  var valido = true;
  var texto = "";
  var contra = $('#contra').val();
  var contra2 = $('#contra2').val();
  var correo = $('#correo').val();
  var correo2 = $('#correo2').val();
  var nivel = $('#nivel').val();
  if (correo == "") {
    texto = "Correo requerido.";
    valido = false;
  } else if (!validarCorreo(correo)) {
    texto = "Correo inválido.";
    valido = false;
  } else if (correo2 == "") {
    texto = "Confirmar Correo requerido.";
    valido = false;
  } else if (!validarCorreo(correo2)) {
    texto = "Confirmar Correo inválido.";
    valido = false;
  } else if (!validarConfirmaciones(correo, correo2)){
    texto = "Confirmar Correo. Los correos no concuerdan.";
    valido = false;
  } else if (contra == "") {
    texto = "Contraseña requerida.";
    valido = false;
  } else if (!validarContra(contra)) {
    texto = "Contraseña inválida. Debe tener como mínimo una mayúscula, una minúscula, un dígito y un carácter especial del siguiente listado: $ # @ ( ) = ? ¿ ¡ !";
    valido = false;
  } else if (contra2 == "") {
    texto = "Confirmar Contraseña requerida.";
    valido = false;
  } else if (!validarConfirmaciones(contra, contra2)){
    texto = "Confirmar Contraseña. Las contraseñas no concuerdan.";
    valido = false;
  } else if (nivel == ""){
    texto = "Seleccione un nivel.";
    valido = false;
  }
  if (!(valido)) {
    Swal.fire({
      html: "<p><i class='fa fa-times-circle fa-3x' style='color:red'></i></p><p>" + texto + "</p>",
      imageUrl: protocolo + "//" + ruta_raiz + '/img/logos/logo_AV.svg',
      imageWidth: 190,
      imageHeight: 76,
      imageAlt: 'Aulas virtuales y ambientes educativos',
      confirmButtonText: "Ok"
    });
  }
  return valido;
}


//Si ya existe  en nuestra base lo dejamos pasar, sino validamos la tabla externa de docentes,
//sino validamos a  DGP y  mandammos mensaje de que  se stá validadndo  (35 segundos aprox)
function validar_acceso_aulas_virtuales(){
  var protocolo = document.location.protocol;
  var ruta_raiz = document.location.hostname;
  var trabajador_rfc = $("#rfc").val().trim();
  var url = protocolo + "//" + ruta_raiz + ":3000" + "/api/docente/rfc/" + trabajador_rfc;
  $.get({
    url: url,
    dataType: 'json',
    async: false,
    success: function(result) {
      if(result && result.length > 0){
        var docente = result;
        //llenamos los datos  de la validadcióon, como si fuera DGP
        $("#dgp_nombre_completo").text(docente[0].nombre + ' ' +  docente[0].paterno + ' ' + docente[0].materno);
        $("#dgp_nombre").text(docente[0].nombre);
        $("#dgp_app_paterno").text(docente[0].paterno);
        $("#dgp_app_materno").text(docente[0].materno);
        $("#dgp_numerotrabajador").text(docente[0].trabajador);
        $("#dgp_dependencia").text(docente[0].dependencia);
        $("#dgp_rfc").text(docente[0].rfc);
  
        if(docente && docente.length > 0){
          ingreso_plataformas(false, true);
        } else {
          docente_validar_vigencia();
        }
      } else {
        //Buscamos en la tabla de docentes externos
        var url = protocolo + "//" + ruta_raiz + ":3000" + "/api/externo/" + trabajador_rfc;
        $.get({
          url: url,
          dataType: 'json',
          async: false,
          success: function(res){
            if(res && res.length > 0){
              //llenamos los datos de la validadcióon, como si fuera DGP
              $("#dgp_nombre_completo").text(res[0].nombre + ' ' +  res[0].paterno + ' ' + res[0].materno);
              $("#dgp_nombre").text(res[0].nombre);
              $("#dgp_app_paterno").text(res[0].paterno);
              $("#dgp_app_materno").text(res[0].materno);
              $("#dgp_numerotrabajador").text(res[0].trabajador);
              $("#dgp_dependencia").text(res[0].dependencia);
              $("#dgp_rfc").text(res[0].rfc);
              $("#modalValidacion").modal('toggle');
            } else {
              //Mandamos a DGP
              docente_validar_vigencia();
            }
          }, // end of success:
          error: function(xhr, ajaxOptions, thrownError){
            var errorMessage = '[' + xhr.status + '] - ' + xhr.statusText;
            Swal.fire({
              html: "<p><i class='fa fa-times-circle fa-3x' style='color:red'></i></p><p>¡Ups!, un error ha ocurrido.</p><p>Favor de intentar más tarde.</p>",
              imageUrl: protocolo + "//" + ruta_raiz + '/img/logos/logo_AV.svg',
              imageWidth: 190,
              imageHeight: 76,
              imageAlt: 'Aulas virtuales y ambientes educativos',
              confirmButtonText: "Ok"
            });
            $("#modalValidacion").modal('toggle');
          } // end of error:
        });

      } // end of $.ajax get
    }, // end of success:
    error: function (xhr, ajaxOptions, thrownError) {
        var errorMessage = '[' + xhr.status + '] - ' + xhr.statusText;
        Swal.fire({
          html: "<p><i class='fa fa-times-circle fa-3x' style='color:red'></i></p><p>¡Ups!, un error ha ocurrido.</p><p>Favor de intentar más tarde.</p>",
          imageUrl: protocolo + "//" + ruta_raiz + '/img/logos/logo_AV.svg',
          imageWidth: 190,
          imageHeight: 76,
          imageAlt: 'Aulas virtuales y ambientes educativos',
          confirmButtonText: "Ok"
        });
        $("#modalValidacion").modal('toggle');
    } // end of error:
  }); // end of $.ajax get
}

//======================
function docente_validar_vigencia(){
  var protocolo = document.location.protocol;
  var ruta_raiz = document.location.hostname;
  var url = protocolo + "//" + ruta_raiz + "/proxy_dgp.php";
  var no_trabajador_rfc = $("#rfc").val();
  if( no_trabajador_rfc == 'ZEDA580918QR5' ||  no_trabajador_rfc == 'CIAM551018RI6' ){
    Swal.fire({
      html: "<h4>Validación DGP</h4><p><i class='fa fa-times-circle fa-3x' style='color:red'></i></p><p>Estatus: 0::No vigente</p>",
      imageUrl: protocolo + "//" + ruta_raiz + '/img/logos/logo_AV.svg',
      imageWidth: 190,
      imageHeight: 76,
      imageAlt: 'Aulas virtuales y ambientes educativos',
      confirmButtonText: "Ok"
    });
  } else {
  $.ajax({
    url: url,
    dataType: 'json',
    async: false,
    data: {'academico': no_trabajador_rfc },
    success: function(res) {
      var datos_academico = res['return'];
        //console.log(datos_academico);
      if (datos_academico.status == 1) {
        //Mostramos los datos obtenidos
        $("#dgp_nombre_completo").text(datos_academico.nomCom);
        $("#dgp_nombre").text(datos_academico.nomTrab);
        $("#dgp_app_paterno").text(datos_academico.apPat);
        $("#dgp_app_materno").text(datos_academico.apMat);
        $("#dgp_numerotrabajador").text(datos_academico.numTrab);
        $("#dgp_tipo").text(datos_academico.tipoTrab);
        $("#dgp_dependencia").text(datos_academico.nomDep);
        $("#dgp_cvedependencia").text(datos_academico.dependencias);
        $("#dgp_curp").text(datos_academico.curp);
        $("#dgp_rfc").text(no_trabajador_rfc.trim());

        $("#modalValidacion").modal('toggle');
      } else {
        if(datos_academico.status == 13){
          Swal.fire({
            html: "<h4>Validación DGP</h4><p><i class='fa fa-times-circle fa-3x' style='color:red'></i></p><p>Error al validar los datos. Favor de intentar mañana.</p>",
            imageUrl: protocolo + "//" + ruta_raiz + '/img/logos/logo_AV.svg',
            imageWidth: 190,
            imageHeight: 76,
            imageAlt: 'Aulas virtuales y ambientes educativos',
            confirmButtonText: "Ok"
          });
        } else {
          Swal.fire({
            html: "<h4>Validación DGP</h4><p><i class='fa fa-times-circle fa-3x' style='color:red'></i></p><p>Estatus: " + datos_academico.status + "::" + datos_academico.msgStatus + "</p>",
            imageUrl: protocolo + "//" + ruta_raiz + '/img/logos/logo_AV.svg',
            imageWidth: 190,
            imageHeight: 76,
            imageAlt: 'Aulas virtuales y ambientes educativos',
            confirmButtonText: "Ok"
          });
        }
      }
    },
    error : function(jqXHR, exception) {
      if (jqXHR.status === 0) {
        Swal.fire({
          html: "<p><i class='fa fa-times-circle fa-3x' style='color:red'></i></p><p>Sin conexión. Favor de intentar más tarde.</p>",
          imageUrl: protocolo + "//" + ruta_raiz + '/img/logos/logo_AV.svg',
          imageWidth: 190,
          imageHeight: 76,
          imageAlt: 'Aulas virtuales y ambientes educativos',
          confirmButtonText: "Ok"
        });
      } else if (jqXHR.status == 404) {
        Swal.fire({
          html: "<p><i class='fa fa-times-circle fa-3x' style='color:red'></i></p><p>[404] No se ha encontrado la página solicitada.</p>",
          imageUrl: protocolo + "//" + ruta_raiz + '/img/logos/logo_AV.svg',
          imageWidth: 190,
          imageHeight: 76,
          imageAlt: 'Aulas virtuales y ambientes educativos',
          confirmButtonText: "Ok"
        });
      } else if (jqXHR.status == 500) {
        Swal.fire({
          html: "<p><i class='fa fa-times-circle fa-3x' style='color:red'></i></p><p>[500] Error en el servidor.</p>",
          imageUrl: protocolo + "//" + ruta_raiz + '/img/logos/logo_AV.svg',
          imageWidth: 190,
          imageHeight: 76,
          imageAlt: 'Aulas virtuales y ambientes educativos',
          confirmButtonText: "Ok"
        });
      } else if (exception === 'parsererror') {
        Swal.fire({
          html: "<p><i class='fa fa-times-circle fa-3x' style='color:red'></i></p><p>Error al analizar los datos enviados.</p>",
          imageUrl: protocolo + "//" + ruta_raiz + '/img/logos/logo_AV.svg',
          imageWidth: 190,
          imageHeight: 76,
          imageAlt: 'Aulas virtuales y ambientes educativos',
          confirmButtonText: "Ok"
        });
      } else if (exception === 'timeout') {
        Swal.fire({
          html: "<p><i class='fa fa-times-circle fa-3x' style='color:red'></i></p></p>Se acabó el /tiempo de espera.</p>",
          imageUrl: protocolo + "//" + ruta_raiz + '/img/logos/logo_AV.svg',
          imageWidth: 190,
          imageHeight: 76,
          imageAlt: 'Aulas virtuales y ambientes educativos',
          confirmButtonText: "Ok"
        });
      } else if (exception === 'abort') {
        Swal.fire({
          html: "<p><i class='fa fa-times-circle fa-3x' style='color:red'></i></p><p>Petición cancelada.</p>",
          imageUrl: protocolo + "//" + ruta_raiz + '/img/logos/logo_AV.svg',
          imageWidth: 190,
          imageHeight: 76,
          imageAlt: 'Aulas virtuales y ambientes educativos',
          confirmButtonText: "Ok"
        });
      } else {
        Swal.fire({
          html: "<p><i class='fa fa-times-circle fa-3x' style='color:red'></i></p><p>Error encontrado.</p>",
          imageUrl: protocolo + "//" + ruta_raiz + '/img/logos/logo_AV.svg',
          imageWidth: 190,
          imageHeight: 76,
          imageAlt: 'Aulas virtuales y ambientes educativos',
          confirmButtonText: "Ok"
        });
      }
    }
  });
  } //else
}

function moodle_alta(){
  var protocolo = document.location.protocol;
  var ruta_raiz = document.location.hostname;
  var url = protocolo + "//" + ruta_raiz + ":3000" + "/api/moodle/docentes";
  $.post({
    url: url,
    dataType: "json",
    data: {
          'trabajador': $('#dgp_numerotrabajador').text(),
          'rfc': $('#rfc_validado').val(),
          'pass': $('#contra').val(),
          'nombre': $('#dgp_nombre').text(),
          'paterno': $('#dgp_app_paterno').text(),
          'materno': $('#dgp_app_materno').text(),
          'correo': $('#correo').val(),
          'dependencia': $("#dgp_dependencia").text(),
          'nivel': $("#nivel").val(),
          'moodle': true
    },
    success: function(res) {
      //Estatus:
      //   0 - Exito
      //   1 - Exito, pero ya existe en la DB
      //   2 - RFC duplicado
      //   3 - Correo duplicado
      //   4 - Usuario no encontrado.
      respuesta = res;
      if(respuesta.status == 0 || respuesta.status == 1){
        Swal.fire({
          html: "<h4>Felicidades</h4><p><i class='fa fa-check-circle fa-3x' style='color:#007A7F'></i></p><p>El registro concluyó satisfactoriamente.<br>Ingrese desde la página de aulas virtuales en el apartado de Docente.</p>",
          imageUrl: protocolo + "//" + ruta_raiz + '/img/logos/logo_AV.svg',
          imageWidth: 190,
          imageHeight: 76,
          imageAlt: 'Aulas virtuales y ambientes educativos',
          confirmButtonText: "Ok"
        });
      }else if(respuesta.status == 2){
        Swal.fire({
          html: "<p><i class='fa fa-info-circle fa-3x' style='color:#EF8449'></i></p><p>El RFC " + $('#academico').val() + " está duplicado en plataforma.</p>",
          imageUrl: protocolo + "//" + ruta_raiz + '/img/logos/logo_AV.svg',
          imageWidth: 190,
          imageHeight: 76,
          imageAlt: 'Aulas virtuales y ambientes educativos',
          confirmButtonText: "Ok"
        });
      }else if(respuesta.status == 3){
        Swal.fire({
          html: "<p><i class='fa fa-info-circle fa-3x' style='color:#EF8449'></i></p><p>El correo electrónico " + $('#correo').val() + " está duplicado en plataforma.</p>",
          imageUrl: protocolo + "//" + ruta_raiz + '/img/logos/logo_AV.svg',
          imageWidth: 190,
          imageHeight: 76,
          imageAlt: 'Aulas virtuales y ambientes educativos',
          confirmButtonText: "Ok"
        });
      }else{
        Swal.fire({
          html: "<p><i class='fa fa-times-circle fa-3x' style='color:red'></i></p><p>No se logró concluir el registro del usuario. Favor de verificar que los datos sean correctos.</p>",
          imageUrl: protocolo + "//" + ruta_raiz + '/img/logos/logo_AV.svg',
          imageWidth: 190,
          imageHeight: 76,
          imageAlt: 'Aulas virtuales y ambientes educativos',
          confirmButtonText: "Ok"
        });
      }

      $("#modalRegistro").modal('toggle');
      //$("#modalValidacion").modal('toggle');
      document.getElementById("registro_form").reset();
      document.getElementById("validacion_dgp_form").reset();
      ingreso_plataformas(true);
    },
    error : function(jqXHR, exception) {
      if (jqXHR.status === 0) {
        Swal.fire({
          html: "<p><i class='fa fa-times-circle fa-3x' style='color:red'></i></p><p>Sin conexión. Favor de intentar más tarde.</p>",
          imageUrl: protocolo + "//" + ruta_raiz + '/img/logos/logo_AV.svg',
          imageWidth: 190,
          imageHeight: 76,
          imageAlt: 'Aulas virtuales y ambientes educativos',
          confirmButtonText: "Ok"
        });
      } else if (jqXHR.status == 404) {
        Swal.fire({
          html: "<p><i class='fa fa-times-circle fa-3x' style='color:red'></i></p><p>[404] No se ha encontrado la página solicitada.</p>",
          imageUrl: protocolo + "//" + ruta_raiz + '/img/logos/logo_AV.svg',
          imageWidth: 190,
          imageHeight: 76,
          imageAlt: 'Aulas virtuales y ambientes educativos',
          confirmButtonText: "Ok"
        });
      } else if (jqXHR.status == 500) {
        Swal.fire({
          html: "<p><i class='fa fa-times-circle fa-3x' style='color:red'></i></p><p>[500] Error en el servidor.</p>",
          imageUrl: protocolo + "//" + ruta_raiz + '/img/logos/logo_AV.svg',
          imageWidth: 190,
          imageHeight: 76,
          imageAlt: 'Aulas virtuales y ambientes educativos',
          confirmButtonText: "Ok"
        });
      } else if (exception === 'parsererror') {
        Swal.fire({
          html: "<p><i class='fa fa-times-circle fa-3x' style='color:red'></i></p><p>Error al analizar los datos enviados.</p>",
          imageUrl: protocolo + "//" + ruta_raiz + '/img/logos/logo_AV.svg',
          imageWidth: 190,
          imageHeight: 76,
          imageAlt: 'Aulas virtuales y ambientes educativos',
          confirmButtonText: "Ok"
        });
      } else if (exception === 'timeout') {
        Swal.fire({
          html: "<p><i class='fa fa-times-circle fa-3x' style='color:red'></i></p></p>Se acabó el tiempo de espera.</p>",
          imageUrl: protocolo + "//" + ruta_raiz + '/img/logos/logo_AV.svg',
          imageWidth: 190,
          imageHeight: 76,
          imageAlt: 'Aulas virtuales y ambientes educativos',
          confirmButtonText: "Ok"
        });
      } else if (exception === 'abort') {
        Swal.fire({
          html: "<p><i class='fa fa-times-circle fa-3x' style='color:red'></i></p><p>Petición cancelada.</p>",
          imageUrl: protocolo + "//" + ruta_raiz + '/img/logos/logo_AV.svg',
          imageWidth: 190,
          imageHeight: 76,
          imageAlt: 'Aulas virtuales y ambientes educativos',
          confirmButtonText: "Ok"
        });
      } else {
        Swal.fire({
          html: "<p><i class='fa fa-times-circle fa-3x' style='color:red'></i></p><p>Error encontrado.</p>",
          imageUrl: protocolo + "//" + ruta_raiz + '/img/logos/logo_AV.svg',
          imageWidth: 190,
          imageHeight: 76,
          imageAlt: 'Aulas virtuales y ambientes educativos',
          confirmButtonText: "Ok"
        });
      }
    }
  });
}

function zoom_alta(){
  var protocolo = document.location.protocol;
  var ruta_raiz = document.location.hostname;
  var url = protocolo + "//" + ruta_raiz + ":3000" + "/api/zoom/docentes";
  $.post({
    url: url,
    dataType: 'json',
    async: false,
    data: {
          'nombre': $('#dgp_nombre').text(),
          'paterno': $('#dgp_app_paterno').text(),
          'materno': $('#dgp_app_materno').text(),
          'correo': $('#correo').val(),
          'trabajador': $('#dgp_numerotrabajador').text(),
          'rfc': $('#rfc_validado').val(),
          'pass': $('#contra').val(),
          'nivel': $('#nivel').val(),
          'dependencia': $('#dgp_dependencia').text(),
          'zoom': true,
          'zoom_fecha_termino': new Date(0) //Asignamos la fecha de Wed Dec 31 1969 18:00:00 por default, ya que no asignamos licencia 
    },
    success: function(res) {
      //Estatus:
      //   0 - Creado
      //   1 - Update
      //  -1 - No creado.
      if(res.status == 0){
        Swal.fire({
          html: "<h4>Felicidades</h4><p><i class='fa fa-check-circle fa-3x' style='color:#007A7F'></i></p><p>El registro concluyó satisfactoriamente.<br>Favor de verificar su cuenta en la liga del correo que se envió.</p>",
          imageUrl: protocolo + "//" + ruta_raiz + '/img/logos/logo_AV.svg',
          imageWidth: 190,
          imageHeight: 76,
          imageAlt: 'Aulas virtuales y ambientes educativos',
          confirmButtonText: "Ok"
        });
      } else if(res.status == 1){
        Swal.fire({
          html: "<h4>Felicidades</h4><p><i class='fa fa-check-circle fa-3x' style='color:#007A7F'></i></p><p>El registro concluyó satisfactoriamente.<br>Favor de verificar su cuenta en la liga del correo que se envió.</p>",
          imageUrl: protocolo + "//" + ruta_raiz + '/img/logos/logo_AV.svg',
          imageWidth: 190,
          imageHeight: 76,
          imageAlt: 'Aulas virtuales y ambientes educativos',
          confirmButtonText: "Ok"
        });
      } else if(res.status == -1){
        Swal.fire({
          html: "<p><i class='fa fa-check-circle fa-3x' style='color:#007A7F'></i></p><p>¡Ups!, algo salió mal. Favor de ingresar otro correo o contactanos a: soporte_aulas_virtuales@cuaieed.unam.mx.</p>",
          imageUrl: protocolo + "//" + ruta_raiz + '/img/logos/logo_AV.svg',
          imageWidth: 190,
          imageHeight: 76,
          imageAlt: 'Aulas virtuales y ambientes educativos',
          confirmButtonText: "Ok"
        });
      }

      $("#modalRegistro").modal('toggle');
      //$("#modalValidacion").modal('toggle');
      document.getElementById("registro_form").reset();
      document.getElementById("validacion_dgp_form").reset();
      ingreso_plataformas(true);

    }, // end of success:
    error: function (xhr, ajaxOptions, thrownError) {
        Swal.fire({
          html: "<p><i class='fa fa-times-circle fa-3x' style='color:red'></i></p><p>" + thrownError + "</p>",
          imageUrl: protocolo + "//" + ruta_raiz + '/img/logos/logo_AV.svg',
          imageWidth: 190,
          imageHeight: 76,
          imageAlt: 'Aulas virtuales y ambientes educativos',
          confirmButtonText: "Ok"
        });
    } // end of error:
  }); // end of $.ajax
}

function zoom_solicitar_licencia(correo, duracion){
  var protocolo = document.location.protocol;
  var ruta_raiz = document.location.hostname;
  var url = protocolo + "//" + ruta_raiz + ":3000" + "/api/zoom/docente/" + correo + "/licencia";
  $.post({
    url: url,
    dataType: 'json',
    data: {
      horas: duracion[0],
      minutos: duracion[1]
    },
    success: function(result) {
      if(result.status == 1){
        document.getElementById("registro_form").reset();
        document.getElementById("validacion_dgp_form").reset();
        window.location.replace('https://cuaieed-unam.zoom.us/start/videomeeting');
      } else {
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
          },
          buttonsStyling: false
        })
        
        swalWithBootstrapButtons.fire({
          title: 'ZOOM',
          html: "<p>Por el momento no se puede asignar una licencia.</p>",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Ingresar con 45 minutos',
          cancelButtonText: 'Cancelar',
          reverseButtons: true
        }).then(async (result) => {
          if (result.value) {
            document.getElementById("registro_form").reset();
            document.getElementById("validacion_dgp_form").reset();
            window.location.replace('https://cuaieed-unam.zoom.us/start/videomeeting');
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            cancelar();
          }
        })
      }
    }, // end of success:
    error: function (xhr, ajaxOptions, thrownError) {
        Swal.fire({
          html: "<p><i class='fa fa-times-circle fa-3x' style='color:red'></i></p><p>¡Ups!<br>Por el momento no se puede asignar una licencia.</p>",
          imageUrl: protocolo + "//" + ruta_raiz + '/img/logos/logo_AV.svg',
          imageWidth: 190,
          imageHeight: 76,
          imageAlt: 'Aulas virtuales y ambientes educativos',
          confirmButtonText: "Ok"
        });
    } // end of error:
  }); // end of $.ajax
}

//WEBEX
function webex_alta(){
  // disable button
  document.getElementById("btn_registro").disabled = true;
  // add spinner to button
  document.getElementById("btn_registro").innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Realizando registro...';
  var protocolo = document.location.protocol;
  var ruta_raiz = document.location.hostname;
  var url = protocolo + "//" + ruta_raiz + ":3000" + "/api/webex/docentes";
  $.post({
    url: url,
    dataType: 'json',
    data: {
          'nombre': $('#dgp_nombre').text(),
          'paterno': $('#dgp_app_paterno').text(),
          'materno': $('#dgp_app_materno').text(),
          'correo': $('#correo').val(),
          'trabajador': $('#dgp_numerotrabajador').text(),
          'rfc': $('#rfc_validado').val(),
          'pass': $('#contra').val(),
          'nivel': $('#nivel').val(),
          'dependencia': $('#dgp_dependencia').text(),
          'webex': true
    },
    success: function(res) {
      //Estatus:
      //   0 - Creado/Update
      //  -1 - No creado.
      if(res.status == 0 || res.status == 1){
        $("#modalRegistro").modal('toggle');
        Swal.fire({
          html: "<h4>Felicidades</h4><p><i class='fa fa-check-circle fa-3x' style='color:#007A7F'></i></p><p>El registro concluyó satisfactoriamente.<br>Favor de verificar su cuenta en el correo que se envió.</p>",
          imageUrl: protocolo + "//" + ruta_raiz + '/img/logos/logo_AV.svg',
          imageWidth: 190,
          imageHeight: 76,
          imageAlt: 'Aulas virtuales y ambientes educativos',
          confirmButtonText: "Ok"
        });
        //$("#modalValidacion").modal('toggle');
        document.getElementById("registro_form").reset();
        document.getElementById("validacion_dgp_form").reset();
        ingreso_plataformas(true);
      } else if(res.status == -1){
        Swal.fire({
          html: "<p><i class='fa fa-check-circle fa-3x' style='color:#007A7F'></i></p><p>¡Ups!, algo salió mal. Si tiene una cuenta de webex gratuita favor de ingresar a settings.webex.com para eliminar su cuenta, en caso contrario, solicite cambiar su correo o contactanos a: soporte_aulas_virtuales@cuaieed.unam.mx.</p>",
          imageUrl: protocolo + "//" + ruta_raiz + '/img/logos/logo_AV.svg',
          imageWidth: 190,
          imageHeight: 76,
          imageAlt: 'Aulas virtuales y ambientes educativos',
          confirmButtonText: "Ok"
        });
      }
    }, // end of success:
    error: function (xhr, ajaxOptions, thrownError) {
        Swal.fire({
          html: "<p><i class='fa fa-times-circle fa-3x' style='color:red'></i></p><p>" + thrownError + "</p>",
          imageUrl: protocolo + "//" + ruta_raiz + '/img/logos/logo_AV.svg',
          imageWidth: 190,
          imageHeight: 76,
          imageAlt: 'Aulas virtuales y ambientes educativos',
          confirmButtonText: "Ok"
        });
    } // end of error:
  }); // end of $.ajax
}


function recuperar_docente_correo(correo){
  var protocolo = document.location.protocol;
  var ruta_raiz = document.location.hostname;
  var url = protocolo + "//" + ruta_raiz + ":3000" + "/api/docente/correo/" + correo;
  $.get({
    url: url,
    dataType: 'json',
    async: false,
    success: function(result) {
      var docente = result;
    }, // end of success:
    error: function (xhr, ajaxOptions, thrownError) {
        Swal.fire({
          html: "<p><i class='fa fa-times-circle fa-3x' style='color:red'></i></p><p>" + thrownError + "</p>",
          imageUrl: protocolo + "//" + ruta_raiz + '/img/logos/logo_AV.svg',
          imageWidth: 190,
          imageHeight: 76,
          imageAlt: 'Aulas virtuales y ambientes educativos',
          confirmButtonText: "Ok"
        });
    } // end of error:
  }); // end of $.ajax
}

function recuperar_docente_rfc(rfc){
  var protocolo = document.location.protocol;
  var ruta_raiz = document.location.hostname;
  var url = protocolo + "//" + ruta_raiz + ":3000" + "/api/docente/rfc/" + rfc;
  $.get({
    url: url,
    dataType: 'json',
    async: false,
    success: function(result) {
      var docente = result;
    }, // end of success:
    error: function (xhr, ajaxOptions, thrownError) {
        Swal.fire({
          html: "<p><i class='fa fa-times-circle fa-3x' style='color:red'></i></p><p>" + thrownError + "</p>",
          imageUrl: protocolo + "//" + ruta_raiz + '/img/logos/logo_AV.svg',
          imageWidth: 190,
          imageHeight: 76,
          imageAlt: 'Aulas virtuales y ambientes educativos',
          confirmButtonText: "Ok"
        });
    } // end of error:
  }); // end of $.ajax
}
//======================

function validar_campo_rfc(){
  var protocolo = document.location.protocol;
  var ruta_raiz = document.location.hostname;
  var rfc = document.getElementById('rfc').value;
  if(rfc == ""){
    Swal.fire({
      html: "<p><i class='fa fa-times-circle fa-3x' style='color:red'></i></p><p>Ingrese un RFC</p>",
      imageUrl: protocolo + "//" + ruta_raiz + '/img/logos/logo_AV.svg',
      imageWidth: 190,
      imageHeight: 76,
      imageAlt: 'Aulas virtuales y ambientes educativos',
      confirmButtonText: "Ok"
    });
  } else if(!validarRFC(rfc)){
    Swal.fire({
      html: "<p><i class='fa fa-times-circle fa-3x' style='color:red'></i></p><p>Formato incorrecto del RFC</p>",
      imageUrl: protocolo + "//" + ruta_raiz + '/img/logos/logo_AV.svg',
      imageWidth: 190,
      imageHeight: 76,
      imageAlt: 'Aulas virtuales y ambientes educativos',
      confirmButtonText: "Ok"
    });
  } else {
    validar_acceso_aulas_virtuales();
    //docente_validar_vigencia();
  }
}

function ingreso_plataformas(reimpresion, validado = false){
  var protocolo = document.location.protocol;
  var ruta_raiz = document.location.hostname;
  if(validado){
    var url = protocolo + "//" + ruta_raiz + ":3000" + "/api/docente/rfc/" + $('#rfc').val();
  } else {
    var url = protocolo + "//" + ruta_raiz + ":3000" + "/api/docente/rfc/" + $('#dgp_rfc').text();
  }
  //var url = protocolo + "//" + ruta_raiz + ":3000" + "/api/docente/rfc/" + $('#dgp_rfc').text();
  $.get({
    url: url,
    dataType: 'json',
    async: false,
    success: function(result) {
      var docente = result;
      
      if(!reimpresion){
        if(!validado){
          $("#modalValidacion").modal('toggle');
        }
        $("#docentes_validacion").toggle(); //validación de la página de docentes
      }

      if(docente && docente.length > 0){
        if(docente[0].moodle){
          $('#btn_moodle_ingreso').show();
          $('#btn_moodle_registro').hide();
        }
        if(docente[0].zoom){
          var url = protocolo + "//" + ruta_raiz + ":3000" + "/api/zoom/docente/" + docente[0].correo + "/verificado";
          $.get({
            url: url,
            dataType: 'json',
            success: function(result) {
              var verificado = result;
              if(verificado.status == 1){
                $('#zoom_no_verificado').hide();
                $('#btn_zoom_registro').hide();
                //Los que no tiene fecha de termino no los mostramos
                var fecha_termino = new Date(docente[0].zoom_fecha_termino);
		if(fecha_termino.getTime() > 0){
                  var options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
                  $("#vigenciaHelpBlock").text("Estimado docente, deberá renovar su licencia Zoom a partir del " + fecha_termino.toLocaleDateString("es-ES", options));
                  $('#vigenciaHelpBlock').show();
  		} 
                $('#btn_zoom_ingreso').show();
              } else if(verificado.status == 0) {
                $('#btn_zoom_registro').hide();
                $('#zoom_no_verificado').show();
              }
            },
            error: function (xhr, ajaxOptions, thrownError) {
              Swal.fire({
                html: "<p><i class='fa fa-times-circle fa-3x' style='color:red'></i></p><p>" + thrownError + "</p>",
                imageUrl: protocolo + "//" + ruta_raiz + '/img/logos/logo_AV.svg',
                imageWidth: 190,
                imageHeight: 76,
                imageAlt: 'Aulas virtuales y ambientes educativos',
                confirmButtonText: "Ok"
              });
            } // end of error:
          });
        }

         if(docente[0].webex){
	   var url = protocolo + "//" + ruta_raiz + ":3000" + "/api/webex/docentes/" + docente[0].correo;
            $.get({
              url: url,
              dataType: 'json',
              success: function(result) {
                var verificado = result;
                if(!verificado.items[0].invitePending){
		  $('#webex_no_verificado').hide();
                  $('#btn_webex_registro').hide();
                  $('#webex').hide();
                  $('#webex_meeting').show();
                  $('#btn_meetings_ingreso').show();
                  $('#webex_team').show();
                  $('#btn_teams_ingreso').show();
                } else if(verificado.items[0].invitePending) {
                  $('#webex').show();
                  $('#btn_webex_registro').hide();
                  $('#webex_no_verificado').show();
                  $('#webex_meeting').hide();
                  $('#btn_meetings_ingreso').hide();
                  $('#webex_team').hide();
                  $('#btn_teams_ingreso').hide();
                }
              },
              error: function (xhr, ajaxOptions, thrownError) {
		Swal.fire({
                  html: "<p><i class='fa fa-times-circle fa-3x' style='color:red'></i></p><p>" + thrownError + "</p>",
                  imageUrl: protocolo + "//" + ruta_raiz + '/img/logos/logo_AV.svg',
                  imageWidth: 190,
                  imageHeight: 76,
                  imageAlt: 'Aulas virtuales y ambientes educativos',
                  confirmButtonText: "Ok"
                });
              } // end of error:
            });
          } else {
            $('#webex').show();
	    $('#webex_mensaje').show();      
            $('#btn_webex_registro').show();
            $('#webex_no_verificado').hide();
            $('#webex_meeting').hide();
            $('#btn_meetings_ingreso').hide();
            $('#webex_team').hide();
            $('#btn_teams_ingreso').hide();
          }

      }

      if(!reimpresion){
        //Agregamos el nombre del docente
        if(validado){
          $("#H4nombredocente").text(docente[0].nombre +  " " + docente[0].paterno + " " + docente[0].materno);
        } else {
          $("#H4nombredocente").text($("#dgp_nombre_completo").text());
        }
        $("#docentes_aulas_disponibles").toggle();
      }

    }, // end of success:
    error: function (xhr, ajaxOptions, thrownError) {
        Swal.fire({
          html: "<p><i class='fa fa-times-circle fa-3x' style='color:red'></i></p><p>" + thrownError + "</p>",
          imageUrl: protocolo + "//" + ruta_raiz + '/img/logos/logo_AV.svg',
          imageWidth: 190,
          imageHeight: 76,
          imageAlt: 'Aulas virtuales y ambientes educativos',
          confirmButtonText: "Ok"
        });
        $("#modalValidacion").modal('toggle');
    } // end of error:
  }); // end of $.ajax
}

function cancelar(){
  document.getElementById("registro_form").reset();
  document.getElementById("validacion_dgp_form").reset();
  setTimeout(window.location.reload(true), 200);
}

function ingresar_moodle(){
  //Aqui debemos traer los datos de acceso del usuario en la mongoDB
  var protocolo = document.location.protocol;
  var ruta_raiz = document.location.hostname;
  if($('#dgp_rfc').text() == ""){
    var url = protocolo + "//" + ruta_raiz + ":3000" + "/api/docente/rfc/" + $('#rfc').val();
  } else {
    var url = protocolo + "//" + ruta_raiz + ":3000" + "/api/docente/rfc/" + $('#dgp_rfc').text();
  }
  //var url = protocolo + "//" + ruta_raiz + ":3000" + "/api/docente/rfc/" + $('#dgp_rfc').text();
  $.get({
    url: url,
    dataType: 'json',
    async: false,
    success: async function(result) {
      var docente = result;
      const { value: pwd } = await Swal.fire({
        title: 'Ingrese su contraseña',
        html:
          '<input type="password" id="moodle_pwd" class="swal2-input" aria-describedby="pwdHelpBlock">' +
          '<small id="pwdHelpBlock" class="text-muted">La contraseña es la que ingresó al momento llenar el formulario de registro.</small>',
        focusConfirm: false,
        preConfirm: () => {
          return document.getElementById('moodle_pwd').value;
        }
      })
      if(pwd){
        if(pwd == docente[0].pass){
              $('#username').val(docente[0].rfc);
              $('#passwordM').val(docente[0].pass);
              document.getElementById('fmoodle_acceso').submit();
        } else {
              Swal.fire({
                html: "<p><i class='fa fa-times-circle fa-3x' style='color:red'></i></p><p>La contraseña es incorrecta. Intente de nuevo.</p>",
                imageUrl: protocolo + "//" + ruta_raiz + '/img/logos/logo_AV.svg',
                imageWidth: 190,
                imageHeight: 76,
                imageAlt: 'Aulas virtuales y ambientes educativos',
                confirmButtonText: "Ok"
              });
        }
      }
    }, // end of success:
    error: function (xhr, ajaxOptions, thrownError) {
        Swal.fire({
          html: "<p><i class='fa fa-times-circle fa-3x' style='color:red'></i></p><p>" + thrownError + "</p>",
          imageUrl: protocolo + "//" + ruta_raiz + '/img/logos/logo_AV.svg',
          imageWidth: 190,
          imageHeight: 76,
          imageAlt: 'Aulas virtuales y ambientes educativos',
          confirmButtonText: "Ok"
        });
    } // end of error:
  }); // end of $.ajax
}


//Solo redireccionamos a la página de cuaieed-unam.zoom.us/signin
function ingresar_zoom(){ 
  var protocolo = document.location.protocol;
  var ruta_raiz = document.location.hostname;
  if($('#dgp_rfc').text() == ""){
    var url = protocolo + "//" + ruta_raiz + ":3000" + "/api/docente/rfc/" + $('#rfc').val();
  } else {
    var url = protocolo + "//" + ruta_raiz + ":3000" + "/api/docente/rfc/" + $('#dgp_rfc').text();
  }
  //var url = protocolo + "//" + ruta_raiz + ":3000" + "/api/docente/rfc/" + $('#dgp_rfc').text();
  $.get({
    url: url,
    dataType: 'json',
    success: function(result_docente) {
      if(result_docente.length > 0){
        var url = protocolo + "//" + ruta_raiz + ":3000" + "/api/zoom/docente/" + result_docente[0].correo + "/verificado";
        $.get({
          url: url,
          dataType: 'json',
          success: function(result) {
            if(result.type == 1){
              const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                  confirmButton: 'btn btn-success',
                  cancelButton: 'btn btn-warning'
                },
                buttonsStyling: false
              })
                
              swalWithBootstrapButtons.fire({
                title: 'ZOOM',
                text: "¿Qué tipo de licencia necesita?",
                icon: 'info',
                showCancelButton: true,
                confirmButtonText: '45 minutos por sesión',
                cancelButtonText: 'Más de 45 minutos por sesión',
                reverseButtons: true
              }).then(async (result) => {
                if (result.value) {
                  document.getElementById("registro_form").reset();
                  document.getElementById("validacion_dgp_form").reset();
                  window.location.replace('https://cuaieed-unam.zoom.us/start/videomeeting');
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                  //Preguntamos cuanto durará la sesión
                  const { value: duracion } = await Swal.fire({
                    title: 'Vigencia de la licencia',
                    html:
                      '<label><b>La licencia asignada tendrá duración de 5040 horas (210 días). Al término de este periodo se podrá renovar según disponibilidad.</b></label>',
                    focusConfirm: false,
                    preConfirm: () => {
                      horas = 5040;
                      minutos = 0;
                      return [horas, minutos];
                    }
                  })
                  if(duracion){
                    zoom_solicitar_licencia(result_docente[0].correo, duracion);
                  }
                }
              })
            } else {
              document.getElementById("registro_form").reset();
              document.getElementById("validacion_dgp_form").reset();
              window.location.replace('https://cuaieed-unam.zoom.us/start/videomeeting');
            }
          },
          error: function (xhr, ajaxOptions, thrownError) {
            Swal.fire({
              html: "<p><i class='fa fa-times-circle fa-3x' style='color:red'></i></p><p>" + thrownError + "</p>",
              imageUrl: protocolo + "//" + ruta_raiz + '/img/logos/logo_AV.svg',
              imageWidth: 190,
              imageHeight: 76,
              imageAlt: 'Aulas virtuales y ambientes educativos',
              confirmButtonText: "Ok"
            });
          } // end of error:
        });
      }
    },
    error: function (xhr, ajaxOptions, thrownError) {
      Swal.fire({
        html: "<p><i class='fa fa-times-circle fa-3x' style='color:red'></i></p><p>" + thrownError + "</p>",
        imageUrl: protocolo + "//" + ruta_raiz + '/img/logos/logo_AV.svg',
        imageWidth: 190,
        imageHeight: 76,
        imageAlt: 'Aulas virtuales y ambientes educativos',
        confirmButtonText: "Ok"
      });
    } // end of error:
  });
}

function ingresar_zoom_v2(){
  //Aqui debemos traer los datos de acceso del usuario en la mongoDB
  var protocolo = document.location.protocol;
  var ruta_raiz = document.location.hostname;
  var url = protocolo + "//" + ruta_raiz + ":3000" + "/api/docente/rfc/" + $('#dgp_rfc').text();
  $.get({
    url: url,
    dataType: 'json',
    async: false,
    success: async function(result) {
      var docente = result;

      const { value: datos_ingreso } = await Swal.fire({
        title: 'Ingresar a Zoom',
        html:
          '<label>Contraseña:</label>'+
          '<input id="zoom_pass" class="swal2-input" type="password" />' +
          '<label>¿Usar contraseña de aulas virtuales?:</label>'+
          '<input id="change_pass" class="swal2-input" type="checkbox" />',
        focusConfirm: false,
        preConfirm: () => {
          return [
            document.getElementById('zoom_pass').value,
            document.getElementById('change_pass').checked
          ]
        }
      })
      
      if (datos_ingreso) {

        if(datos_ingreso[1]){
          //Actualizamos la contraseña del usuario en zoom por la contraseña que registró en el sistema
          url = protocolo + "//" + ruta_raiz + ":3000" + "/api/zoom/docente/" + docente[0].correo + "/password";
          $.get({
            url: url,
            dataType: 'json',
            data: { pass: docente[0].pass },
            success: function(res){
              if(res.status == 1){
                $('#email').val(docente[0].correo);
                $('#passwordZ').val(docente[0].pass);
                document.getElementById('fzoom_acceso').submit();
              } else {
                Swal.fire({
                  html: "<p><i class='fa fa-times-circle fa-3x' style='color:red'></i></p><p>No se logró acceder a la plataforma ZOOM. Intente más tarde.</p>",
                  imageUrl: protocolo + "//" + ruta_raiz + '/img/logos/logo_AV.svg',
                  imageWidth: 190,
                  imageHeight: 76,
                  imageAlt: 'Aulas virtuales y ambientes educativos',
                  confirmButtonText: "Ok"
                });
              }
            },
            error: function (xhr, ajaxOptions, thrownError) {
              Swal.fire({
                html: "<p><i class='fa fa-times-circle fa-3x' style='color:red'></i></p><p>" + thrownError + "</p>",
                imageUrl: protocolo + "//" + ruta_raiz + '/img/logos/logo_AV.svg',
                imageWidth: 190,
                imageHeight: 76,
                imageAlt: 'Aulas virtuales y ambientes educativos',
                confirmButtonText: "Ok"
              });
            }
          });
        } else {
          //$('#email').val(docente[0].correo);
          //$('#passwordZ').val(datos_ingreso[0]);
          // Mandamos los datos de acceso a https://cuaieed-unam.zoom.us/signin y obtenemos dos respuestas:
          // Exito - {"status":true,"errorCode":0,"errorMessage":null,"result":"https://cuaieed-unam.zoom.us/start/videomeeting"}
          // Sin Exito - {"status":false,"errorCode":1002,"errorMessage":"xxxx@mail.com","result":null}
          $.post({
            url: protocolo + "//" + ruta_raiz + ":3000" + "/api/zoom/signin",
            dataType: 'json',
            data: { username: docente[0].correo, password: datos_ingreso[0] },
            success: function(res){
              if(res.status){
                window.location.href.replace('https://zoom.us/profile');
                setTimeout(window.location.reload.bind(location), 300);
              } else {
                Swal.fire({
                  html: "<p><i class='fa fa-times-circle fa-3x' style='color:red'></i></p><p>No se logró acceder a la plataforma ZOOM. Intente más tarde.</p>",
                  imageUrl: protocolo + "//" + ruta_raiz + '/img/logos/logo_AV.svg',
                  imageWidth: 190,
                  imageHeight: 76,
                  imageAlt: 'Aulas virtuales y ambientes educativos',
                  confirmButtonText: "Ok"
                });
              }
            },
            error: function (xhr, ajaxOptions, thrownError) {
              Swal.fire({
                html: "<p><i class='fa fa-times-circle fa-3x' style='color:red'></i></p><p>" + thrownError + "</p>",
                imageUrl: protocolo + "//" + ruta_raiz + '/img/logos/logo_AV.svg',
                imageWidth: 190,
                imageHeight: 76,
                imageAlt: 'Aulas virtuales y ambientes educativos',
                confirmButtonText: "Ok"
              });
            }
          });

        }
      }
    }, // end of success:
    error: function (xhr, ajaxOptions, thrownError) {
        Swal.fire({
          html: "<p><i class='fa fa-times-circle fa-3x' style='color:red'></i></p><p>" + thrownError + "</p>",
          imageUrl: protocolo + "//" + ruta_raiz + '/img/logos/logo_AV.svg',
          imageWidth: 190,
          imageHeight: 76,
          imageAlt: 'Aulas virtuales y ambientes educativos',
          confirmButtonText: "Ok"
        });
    } // end of error:
  }); // end of $.ajax
}

function ingresar_webex_meeting(){
  document.getElementById("registro_form").reset();
  document.getElementById("validacion_dgp_form").reset();
  window.location.replace('https://unam.webex.com/webappng/sites/unam/meeting/scheduler');
}

function ingresar_webex_teams(){
  document.getElementById("registro_form").reset();
  document.getElementById("validacion_dgp_form").reset();
  window.location.replace('https://teams.webex.com');
}

function mostrar_registro(plataforma){
  //Aqui debemos traer los datos de acceso del usuario en la mongoDB
  var protocolo = document.location.protocol;
  var ruta_raiz = document.location.hostname;
  if($('#dgp_rfc').text() == ""){
    var url = protocolo + "//" + ruta_raiz + ":3000" + "/api/docente/rfc/" + $('#rfc').val();
  } else {
    var url = protocolo + "//" + ruta_raiz + ":3000" + "/api/docente/rfc/" + $('#dgp_rfc').text();
  }
  //var url = protocolo + "//" + ruta_raiz + ":3000" + "/api/docente/rfc/" + $('#dgp_rfc').text();
  $.get({
    url: url,
    dataType: 'json',
    async: false,
    success: function(result) {
      var docente = result;

      $("#plataforma").text(plataforma);
  if($('#dgp_rfc').text() == ""){
$('#rfc_validado').val($('#rfc').val());
  } else {
$('#rfc_validado').val($('#dgp_rfc').text());
  }
      //$('#rfc_validado').val($('#dgp_rfc').text());

      if(docente && docente.length > 0){
        $('#correo').val(docente[0].correo);
        $( '#correo' ).prop( "disabled", true );
        $('#correo2').val(docente[0].correo);
        $( '#correo2' ).prop( "disabled", true );
        $( '#confirmar_correo' ).toggle();
        $('#contra').val(docente[0].pass);
        $( '#contra' ).prop( "disabled", true );
        $('#contra2').val(docente[0].pass);
        $( '#contra2' ).prop( "disabled", true );
        $( '#confirmar_contra' ).toggle();
      }
      $("#modalRegistro").modal('toggle');
    },
    error: function (xhr, ajaxOptions, thrownError) {
        Swal.fire({
          html: "<p><i class='fa fa-times-circle fa-3x' style='color:red'></i></p><p>" + thrownError + "</p>",
          imageUrl: protocolo + "//" + ruta_raiz + '/img/logos/logo_AV.svg',
          imageWidth: 190,
          imageHeight: 76,
          imageAlt: 'Aulas virtuales y ambientes educativos',
          confirmButtonText: "Ok"
        });
    } // end of error:
  }); // end of $.ajax
}

function registrar(){
  var plataforma = $("#plataforma").text();
  var protocolo = document.location.protocol;
  var ruta_raiz = document.location.hostname;

  if (validar_campos(protocolo, ruta_raiz)) {
    if(plataforma == 'moodle'){
      moodle_alta();
    } else if(plataforma == 'zoom'){
      zoom_alta();
    } else if(plataforma == 'webex'){
      webex_alta();
    } else {
    }
  }
}
