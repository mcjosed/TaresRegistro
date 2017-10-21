/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Ingresar una funcion a la libreria Jquery
 * @returns {undefined}
 */
jQuery.fn.LimpiarFor = function () {
    $(this).each(function () {
        this.reset();
    });
};
// do something on document ready
$(document).ready(function () {
    function MIAjax(request, parametros, ejecucion) {
        $.ajax({
// la URL para la petición
            url: request,
            // la información a enviar
            // (también es posible utilizar una cadena de datos)
            data: parametros,
            // especifica si será una petición POST o GET
            type: 'POST',
            // el tipo de información que se espera de respuesta
            dataType: 'html',
            // código a ejecutar si la petición es satisfactoria;
            // la respuesta es pasada como argumento a la función
            success: function (datos) {
                ejecucion(datos);
            },
            // código a ejecutar si la petición falla;
            // son pasados como argumentos a la función
            // el objeto de la petición en crudo y código de estatus de la petición
            error: function (xhr, status) {
                alert('Disculpe, existió un problema');
            },
            // código a ejecutar sin importar si la petición falló o no
            complete: function (xhr, status) {
                //  alert('Petición realizada');
            }
        });
    }
7//Ventanas de dialogo emergentes
    function alerta(pVMsn) {
        $("#LosMensajes").html(pVMsn + "<br><br><button id='cerrarDialog' class='btn btn-info'>Cerrar Ventana</button>");
        $("#cerrarDialog").unbind("click").click(function () {
            $(".ui-dialog-titlebar-close").trigger("click");
        });
        $("#dialog").dialog();
    }
//Validacion de formulario con JQuery Validate
    function validarFor(formulario, reglas, mensajes, metodo, toptip) {
        $("#" + formulario).validate({
            rules: reglas,
            messages: mensajes,
            //    errorLabelContainer: "#summary",
            //   wrapper: "li",
            tooltip_options: toptip,
            submitHandler: function () {
                metodo();
            }
        });
    }


//Contenido Index
    function traerindex() {
        var request = "cIndex.php";
        var parametros = "A=1";
        var ejecucion = function (datos) {
            document.getElementById("contenido").innerHTML = datos;
        };
        MIAjax(request, parametros, ejecucion);
    }

    $("#aIndex").click(function () {
        traerindex();
    });
    
    //Primera opcion del menu
    $("#aPresentacion").click(function () {
        var request = "Presentacion.php";
        var parametros = "A=1";
        var ejecucion = function (datos) {
            document.getElementById("contenido").innerHTML = datos;
        };
        MIAjax(request, parametros, ejecucion);
    });
    //Segunda Opcion del menu
    $("#aEstudios").click(function () {
        var request = "Estudios.php";
        var parametros = "A=1";
        var ejecucion = function (datos) {
            document.getElementById("contenido").innerHTML = datos;
        };
        MIAjax(request, parametros, ejecucion);
    });
    
    // Llenado del Select de Cursos en Formulario Estudiantes
    function llenarSelec() {
        var limite = localStorage.length;
        for (var i = 0; i < limite; i++) {
            var cod = localStorage.key(i);
            console.log(localStorage.getItem(cod));
            var curso = JSON.parse(localStorage.getItem(cod));
            if (curso.type === "curso") {
                $("#fkcurso").append("<option value='" + curso.Cod + "'>" + curso.curso + "</option>");
            }
        }
    }
//Llamado al formulario estudiantes
    $("#aForm").click(function () {
        var request = "Formulario.php";
        var parametros = "A=1";
        var ejecucion = function (datos) {
            document.getElementById("contenido").innerHTML = datos;
            llenarSelec();
            var reglas = {CC: {required: true, number: true, digits: true}, nom: {required: true, maxlength: 70}, genero: {required: true}, correo: {required: true, email: true}, ccorreo: {equalTo: "#correo"}, fkcurso: {required: true, number: true}};
            var mensajes = {CC: {required: "La Cedula es Obligatoria", number: "La cedula es un numero", digits: "La CC no puede tener ni puntos ni comas"}, ccorreo: {equalTo: "Debe ingresar el mismo valor del campo superior a este campo"}};
            var metodo = function () {
                // alert("Los datos fueron ingresados segun lo solicitado");
                var cc = $("#CC").val();
                var nom = $("#nom").val();
                var genero = $("#genero").val();
                var correo = $("#correo").val();
                var curso = $("#fkcurso").val();
                var Persona = {
                    cc: cc,
                    nom: nom,
                    genero: genero,
                    correo: correo,
                    curso: curso,
                    type: "per"
                };
                if (gbCurso === null) {
                    localStorage.setItem(localStorage.length, JSON.stringify(Persona));
                    $("#limpiar").trigger("click");
                    alerta("El usuario <b>" + Persona.nom + "</b> fue almacenado");
                } else {
                    localStorage.setItem(gbCode, JSON.stringify(Persona));
                    alerta("El usuario <b>" + Persona.nom + "</b> fue Modificado");
                    $("#alista").trigger("click");
                }
                gbCode = null;
                gbCurso = null;
            };
            var toptip = {
                cc: {html: false, placement: 'left'},
                nom: {placement: 'left', html: true},
                genero: {placement: 'left', html: true},
                correo: {placement: 'right', html: true}
            };
            validarFor("registro", reglas, mensajes, metodo, toptip);
        };
        MIAjax(request, parametros, ejecucion);
    });
    //Llamado al formulario Cursos
    $("#aFormCurso").click(function () {
        var request = "FormularioCurso.php";
        var parametros = "A=1";
        var ejecucion = function (datos) {
            document.getElementById("contenido").innerHTML = datos;
            var reglas = {Cod: {required: true, number: true, digits: true}, curso: {required: true, maxlength: 70}};
            var mensajes = {Cod: {required: "El codigo es obligatorio", number: "Es Codigo es un numero", digits: "El Codigo no puede tener ni puntos ni comas"}};
            var metodo = function () {
                // alert("Los datos fueron ingresados segun lo solicitado");
                var Cod = $("#Cod").val();
                var curso = $("#curso").val();
                var Cursos = {
                    Cod: Cod,
                    curso: curso,
                    type: "curso"
                };
                localStorage.setItem(localStorage.length, JSON.stringify(Cursos));
                //   $("#registro").LimpiarFor();
                $("#limpiar").trigger("click");
                alerta("El curso <b>" + Cursos.curso + "</b> fue almacenado");
            };
            var toptip = {
                Cod: {html: false, placement: 'left'},
                curso: {placement: 'left', html: true},
            };
            validarFor("registro", reglas, mensajes, metodo, toptip);
        };
        MIAjax(request, parametros, ejecucion);
    });
    
    //Listado completo de Estudiantes
    $("#alista").click(function () {
        var request = "listado.php";
        var parametros = "a=1";
        var ejecutar = function (datos) {
            $("#contenido").html(datos);
            var limite = localStorage.length;
            var contador = 1;
            for (var i = 0; i < limite; i++) {
                var code = localStorage.key(i);
                var persona = JSON.parse(localStorage.getItem(code));
                if (persona.type === "per") {
                    var tr = $("<tr></tr>");
                    tr.append("<td>" + contador + "</td>");
                    tr.append("<td>" + persona.cc + "</td>");
                    tr.append("<td>" + persona.nom + "</td>");
                    tr.append("<td>" + persona.genero + "</td>");
                    tr.append("<td>" + persona.correo + "</td>");
                    tr.append("<td>" + getCurso(persona.curso).curso + "</td>");
                    /*tr.append("<td>" + persona.curso + "</td>");*/
                    tr.append("<td class='mimouse mod' code='" + code + "'>Modificar</td>");
                    tr.append("<td class='mimouse1 eli' code='" + code + "'>Eliminar</td>");
                    $("#conTabla").append(tr);
                    contador = contador + 1;
                }
            }
            eliminar(".eli");
            modifocar(".mod");
        };
        MIAjax(request, parametros, ejecutar);
    });
    traerindex();
    
    //Listado de los cursos ingresados
    $("#alistaCursos").click(function () {
        var request = "listadoCursos.php";
        var parametros = "a=1";
        var ejecutar = function (datos) {
            $("#contenido").html(datos);
            var limite = localStorage.length;
            var contador = 1;
            for (var i = 0; i < limite; i++) {
                var code = localStorage.key(i);
                var Cursos = JSON.parse(localStorage.getItem(code));
                if (Cursos.type === "curso") {
                    var tr = $("<tr></tr>");
                    tr.append("<td>" + contador + "</td>");
                    tr.append("<td>" + Cursos.Cod + "</td>");
                    tr.append("<td>" + Cursos.curso + "</td>");
                    tr.append("<td class='mimouse mod' code='" + code + "'>Modificar</td>");
                    tr.append("<td class='mimouse1 eli' code='" + code + "'>Eliminar</td>");
                    $("#conTablacurso").append(tr);
                    contador = contador + 1;
                }
            }
            eliminar(".eli");
            modifocacurso(".mod");
        };
        MIAjax(request, parametros, ejecutar);
    });
    
    //Eliminar
    function eliminar(pvEleme) {
        $(pvEleme).click(function () {
            var code = $(this).attr("code");
            localStorage.removeItem(code);
            $(this).parent().remove();
        });
    }
    var gbCurso = null;
    var gbCode = null;
    
    //Modificar Estudiante
    function modifocar(pvEleme) {
        $(pvEleme).click(function () {
            gbCode = $(this).attr("code");
            gbCurso = JSON.parse(localStorage.getItem(gbCode));
            $("#aForm").trigger("click");
            setTimeout(function () {
                $("#regis").fadeOut(0);
                $("#modifi").fadeIn(0);
                $("#CC").val(gbCurso.cc);
                $("#nom").val(gbCurso.nom);
                $("#genero").val(gbCurso.genero);
                $("#correo").val(gbCurso.correo);
                $("#ccorreo").val(gbCurso.correo);
                $("#fkcurso").val(gbCurso.curso);
            }, 500);
        });
    }

//Modificar curso
    function modifocacurso(pvEleme) {
        $(pvEleme).click(function () {
            gbCode = $(this).attr("code");
            gbCurso = JSON.parse(localStorage.getItem(gbCode));
            $("#aFormCurso").trigger("click");
            setTimeout(function () {
                $("#regis").fadeOut(0);
                $("#modifi").fadeIn(0);
                $("#Cod").val(gbCurso.Cod);
                $("#curso").val(gbCurso.curso);
            }, 500);
        });
    }

    function getCurso(pvID) {
        var limite = localStorage.length;
        for (var i = 0; i < limite; i++) {
            var code = localStorage.key(i);
            console.log(localStorage.getItem(code));
            var curso = JSON.parse(localStorage.getItem(code));
            if (curso.type === "curso" && curso.Cod === pvID) {
                return curso;
            }
        }
        return null;
    }
    
    //Creditos
    $("#aCreditos").click(function () {
        var request = "Creditos.php";
        var parametros = "A=1";
        var ejecucion = function (datos) {
            document.getElementById("contenido").innerHTML = datos;
        };
        MIAjax(request, parametros, ejecucion);
    });

   

   
});
