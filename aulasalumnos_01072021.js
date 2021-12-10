window.addEventListener('load', function () {
  var protocolo = document.location.protocol;
  var ruta_raiz = document.location.hostname;
  var url_raiz = protocolo + "//" + ruta_raiz + "/";
  //Obtenemos la URL para el logueo a plataforma en el modalLogin y recuperar contraseña
  $("#faccesoav").attr("action", "https://aulas-virtuales.cuaed.unam.mx/moodle/login/index.php");
  $("#recuperar_contra").attr("href", "https://aulas-virtuales.cuaed.unam.mx/moodle/login/forgot_password.php");
  //$("#faccesoav").attr("action", url_raiz + "moodle/login/index.php");
  //$("#recuperar_contra").attr("href", url_raiz + "moodle/login/forgot_password.php");

  aulas_zoom_vivo_paginacion();
  aulas_webex_vivo_paginacion();
}, false);

template_zoom = function(data) {
  var html = '<input type="text" class="col-md-4 form-control search" style="margin-bottom: 1%;" placeholder="Buscar nombre del docente en plataforma ZOOM" />';
  html += '<ul class="list">';
  $.each(data, function(index, item) {
      //html += '<li><p class="zoom"><a href="#" class="btn btn-success" role="button" onClick="enviar_aula(1,\'' + item.email + '\',' + item.id + '); return false;">Acceder<\/a>&nbsp&nbsp&nbsp&nbsp&nbsp<span>' + item.host + '&nbsp&nbsp&nbsp&nbsp&nbsp(' + item.topic +')<\/span></p><\/li><br />';

      html += '<li><p class="zoom"><a href="https://cuaieed-unam.zoom.us/j/' + item.id + '" class="btn btn-success" role="button">Acceder<\/a>&nbsp&nbsp&nbsp&nbsp&nbsp<span>' + item.host + '&nbsp&nbsp&nbsp&nbsp&nbsp(' + item.topic +')<\/span></p><\/li><br />';
  });
  html += '</ul>';
  html += '<ul class="pagination justify-content-center"></ul>';

  return html;
}

template_webex = function(data) {
  var html = '<input type="text" class="col-md-4 form-control search" style="margin-bottom: 1%;" placeholder="Buscar nombre del docente en plataforma Webex Meetings" />';
  html += '<ul class="list">';
  $.each(data, function(index, item) {
    html += '<li><p class="webex"><a href="#" class="btn btn-success" role="button" onClick="enviar_aula(0,' + item.id + ',0); return false;">Acceder<\/a>&nbsp&nbsp&nbsp&nbsp&nbsp<span>' + item.host + '&nbsp&nbsp&nbsp&nbsp&nbsp(' + item.topic +')<\/span></p><\/li><br />';
  });
  html += '</ul>';
  html += '<ul class="pagination justify-content-center"></ul>';

  return html;
}

function aulas_zoom_vivo_paginacion(){
  var protocolo = document.location.protocol;
  var ruta_raiz = document.location.hostname;
  var url = protocolo + "//" + ruta_raiz + ":3000" +"/api/zoom_live_meetings";
  var dataContainer = $('#meetings_envivo');

  $('#meetings_envivo').pagination({
    dataSource: url,
    locator: '',
    pageSize: 5,
    showPageNumbers: false,
    showNavigator: true,
    className: 'paginationjs-theme-green',
    ajax: {
        beforeSend: function() {
            dataContainer.html('Obteniendo aulas ...');
        }
    },
    callback: function(data, pagination) {
        // template method of yourself
        var html = template_zoom(data);
        dataContainer.html(html);
        var zoomList = new List('meetings_envivo', {
          valueNames: ['zoom'],
          page: 25,
          pagination: true
        });
    }
  })
}

function aulas_zoom_vivo(){
  var protocolo = document.location.protocol;
  var ruta_raiz = document.location.hostname;
  var url = protocolo + "//" + ruta_raiz + ":3000" + "/api/zoom_live_meetings";
  $.get({
    url: url,
    dataType: 'json',
    success: function(result) {
      $('#meetings_envivo').empty();
      for(meeting in result){
        $('#meetings_envivo').append('<p><a href="https://cuaieed-unam.zoom.us/j/' + result[meeting].id + '" class="btn btn-success" role="button">Acceder</a>&nbsp&nbsp&nbsp&nbsp&nbsp' + result[meeting].host + '&nbsp&nbsp&nbsp&nbsp&nbsp(' + result[meeting].topic +')</p><br>');
      }
    }, // end of success:
    error: function (xhr, ajaxOptions, thrownError) {
      Swal.fire({
        html: "<p><i class='fa fa-times-circle fa-3x' style='color:red'></i></p><p>" + thrownError + "</p>",
        imageUrl: protocolo + "//" + ruta_raiz + '/img/logos/logo_RC_ac.svg',
        imageWidth: 190,
        imageHeight: 76,
        imageAlt: 'Aulas virtuales y ambientes educativos',
        confirmButtonText: "Ok"
      });
    } // end of error:
  }); // end of $.ajax
}

function aulas_zoom_vivo_old(){
  var protocolo = document.location.protocol;
  var ruta_raiz = document.location.hostname;
  var url = protocolo + "//" + ruta_raiz + ":3000" + "/api/zoom/live_meetings";
  $.get({
    url: url,
    dataType: 'json',
    success: function(result) {
      for(meeting in result.meetings){
        $('#meetings_envivo').append('<p><a href="https://cuaieed-unam.zoom.us/j/' + result.meetings[meeting].id + '" class="btn btn-success" role="button">Acceder</a>&nbsp&nbsp&nbsp&nbsp&nbsp' + result.meetings[meeting].host + '&nbsp&nbsp&nbsp&nbsp&nbsp(' + result.meetings[meeting].topic +')</p><br>');
      }
    }, // end of success:
    error: function (xhr, ajaxOptions, thrownError) {
      Swal.fire({
        html: "<p><i class='fa fa-times-circle fa-3x' style='color:red'></i></p><p>" + thrownError + "</p>",
        imageUrl: protocolo + "//" + ruta_raiz + '/img/logos/logo_RC_ac.svg',
        imageWidth: 190,
        imageHeight: 76,
        imageAlt: 'Aulas virtuales y ambientes educativos',
        confirmButtonText: "Ok"
      });
    } // end of error:
  }); // end of $.ajax
}

function aulas_zoom_agendadas(){
  var protocolo = document.location.protocol;
  var ruta_raiz = document.location.hostname;
  var url = protocolo + "//" + ruta_raiz + ":3000" + "/api/zoom/upcoming_meetings";
  $.get({
    url: url,
    dataType: 'json',
    success: function(result) {
      for(datos in result){
        for(reunion in datos.meetings){
          $('#meetings_agendadas').append('<p><a href="https://cuaieed-unam.zoom.us/j/' + reunion.id + '" class="btn btn-success" role="button">Acceder</a>&nbsp&nbsp&nbsp&nbsp&nbsp' + datos.user.first_name + ' ' + datos.user.last_name + '&nbsp&nbsp&nbsp&nbsp&nbsp(' + reunion.topic +')</p><br>');
        }
      }
    }, // end of success:
    error: function (xhr, ajaxOptions, thrownError) {
      Swal.fire({
        html: "<p><i class='fa fa-times-circle fa-3x' style='color:red'></i></p><p>" + thrownError + "</p>",
        imageUrl: protocolo + "//" + ruta_raiz + '/img/logos/logo_RC_ac.svg',
        imageWidth: 190,
        imageHeight: 76,
        imageAlt: 'Aulas virtuales y ambientes educativos',
        confirmButtonText: "Ok"
      });
    } // end of error:
  }); // end of $.ajax
}


function aulas_webex_vivo_paginacion(){
  var protocolo = document.location.protocol;
  var ruta_raiz = document.location.hostname;
  var url = protocolo + "//" + ruta_raiz + ":3000" +"/api/webex_live_meetings";
  var dataContainer = $('#meetings_webex_envivo');

  $('#meetings_webex_envivo').pagination({
    dataSource: url,
    locator: '',
    pageSize: 5,
    showPageNumbers: false,
    showNavigator: true,
    className: 'paginationjs-theme-green',
    ajax: {
        beforeSend: function() {
            dataContainer.html('Obteniendo aulas ...');
        }
    },
    callback: function(data, pagination) {
        // template method of yourself
        var html = template_webex(data);
        dataContainer.html(html);
        var zoomList = new List('meetings_webex_envivo', {
          valueNames: ['webex'],
          page: 25,
          pagination: true
        });
    }
  })
}

function enviar_aula_zoom(key,id){
  var protocolo = document.location.protocol;
  var ruta_raiz = document.location.hostname;
  key = key.replace(/'/g, "");
  var url = protocolo + "//" + ruta_raiz + ":3000" + "/api/zoom/docente/" + key + "/live_meetings";
  $.get({
    url: url,
    dataType: 'json',
    success: function(result) {
      if(result.meetings.length > 0){
        window.location.replace(result.meetings[0].join_url);
      } else {
        url_reunion = "https://cuaieed-unam.zoom.us/j/" + id;
        window.location.replace(url_reunion);
      }
    }, // end of success:
    error: function (xhr, ajaxOptions, thrownError) {
      Swal.fire({
        html: "<p><i class='fa fa-times-circle fa-3x' style='color:red'></i></p><p>Estimado usuario, favor de esperar 30 segundos para volver intentar el ingreso a la sesión.<br>Gracias.</p>",
        imageUrl: protocolo + "//" + ruta_raiz + '/img/logos/logo_RC_ac.svg',
        imageWidth: 190,
        imageHeight: 76,
        imageAlt: 'Aulas virtuales y ambientes educativos',
        confirmButtonText: "Ok"
      });
    } // end of error:
  }); // end of $.ajax
}

function enviar_aula_webex(key){
  var protocolo = document.location.protocol;
  var ruta_raiz = document.location.hostname;
  var url = protocolo + "//" + ruta_raiz + ":3000" +"/api/webex/meeting/" + key;
  $.get({
    url: url,
    dataType: 'json',
    success: function(result) {
      window.location.replace(result.url_unirse);
    }, // end of success:
    error: function (xhr, ajaxOptions, thrownError) {
      Swal.fire({
        html: "<p><i class='fa fa-times-circle fa-3x' style='color:red'></i></p><p>Estimado usuario, favor de esperar 30 segundos para volver intentar el ingreso a la sesión.<br>Gracias.</p>",
        imageUrl: protocolo + "//" + ruta_raiz + '/img/logos/logo_RC_ac.svg',
        imageWidth: 190,
        imageHeight: 76,
        imageAlt: 'Aulas virtuales y ambientes educativos',
      });
    } // end of error:
  }); // end of $.ajax
}

function enviar_aula(es_zoom, key, id){
  milisegundos = ((Math.floor(Math.random() * 10) + 2) / 2)*1000; //1 a 5.5 segundos atrasamos
  if( es_zoom ){
    setTimeout(enviar_aula_zoom(key,id), milisegundos);
  } else {
    setTimeout(enviar_aula_webex(key), milisegundos);
  }
}

