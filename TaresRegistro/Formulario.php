<div id="summary"></div>
<form class="form-horizontal" id="registro" name="registro">
    <fieldset>
        <legend><h2><img id="finc" src="img/incrip.png"> Inscripción de Estudiante </h2></legend>
        <div class="form-group">
            <label for="CC" class="col-lg-2 control-label">Cedula</label>
            <div class="col-lg-10">
                <input type="text" class="form-control" id="CC" name="CC" placeholder="Ingrese su Cédula">
            </div>
        </div>
        <div class="form-group">
            <label for="nom" class="col-lg-2 control-label">Nombre</label>
            <div class="col-lg-10">
                <input type="text" class="form-control" id="nom" name="nom" placeholder="Ingrese su nombre">
            </div>
        </div>
        <div class="form-group">
            <label for="nom" class="col-lg-2 control-label">Genero</label>
            <div class="col-lg-10">
                <select class="form-control" id="genero" name="genero">
                    <option value="">Seleccione</option>
                    <option value="F">Femenino</option>
                    <option value="M">Masculino</option>
                    <option value="LGTB">LGTB</option>
                </select>
            </div>
        </div>
        
        <div class="form-group">
            <label for="Correo" class="col-lg-2 control-label">Correo</label>
            <div class="col-lg-10">
                <input type="text" class="form-control" id="correo" name="correo" placeholder="Ingrese su correo">
            </div>
        </div>
        <div class="form-group">
            <label for="inputEmail" class="col-lg-2 control-label">Conf. Correo</label>
            <div class="col-lg-10">
                <input type="text" class="form-control" id="ccorreo" name="ccorreo" placeholder="Confirme su correo">
            </div>
        </div>
        <div class="form-group">
            <label for="inputEmail" class="col-lg-2 control-label">Seleccione Curso</label>
            <div class="col-lg-10">
                <select class="form-control" id="fkcurso" name="fkcurso">
                    <option value="">Seleccione</option>
                </select>
            </div>
        </div>
        <div class="form-group">
            <div class="col-lg-10 col-lg-offset-2">
                <button type="submit" id="regis" class="btn btn-info">Registar</button>
                <button type="submit" id="modifi" class="btn btn-success" style="display: none;">Modificar</button>
                <button id="limpiar" type="reset" class="btn btn-danger">Cancel</button>
            </div>
        </div>
    </fieldset>
</form>