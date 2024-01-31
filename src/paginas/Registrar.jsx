
import {DisplayPrincipalStyled, ContenedorPrincipal} from '../componentes/Displays'
import { TitularPrincipal } from '../componentes/Textos';
import { BtnSwitchPaginaFlotante, BtnSubmit } from '../componentes/BotonesPrincipales';
import {InputFormulario} from '../componentes/InputFormulario'
import {Formik, Form, Field, ErrorMessage} from 'formik';
import { SelectComponent } from '../componentes/InputFormulario';
const AdminCarreras = () =>{
    return(
        <DisplayPrincipalStyled>
            <TitularPrincipal texto='Registrar'/>
            <BtnSwitchPaginaFlotante texto= 'Regresar' path='/'/>
            <Formik
                initialValues={
                    {Matricula:'', Nombre:'', Carrera:'', Semestre: 1}
                }
                validate={(values) => {
                    const errors = {};
                
                    // Aquí puedes agregar lógica de validación personalizada
                    if (!values.Matricula) {
                      errors.Matricula = 'La matrícula es obligatoria';
                    }
                
                    if (!values.Nombre) {
                      errors.Nombre = 'El nombre es obligatorio';
                    }
                    if(!values.Carrera){
                        errors.Carrera = 'La carrera es obligatorio';
                    }
                    if (!values.Semestre) {
                        errors.Semestre = 'El Semestre es obligatorio';
                    } else {
                        const semestreNumber = parseInt(values.Semestre, 10);
                
                        if (isNaN(semestreNumber) || semestreNumber < 1 || semestreNumber > 12) {
                            errors.Semestre = 'El semestre debe ser un número entre 1 y 12';
                        }
                    }
                
                    
                
                    return errors;
                  }}
                  onSubmit={(values) => {
                    // La función onSubmit solo se ejecutará si no hay errores de validación
                    console.log("Formulario enviado con éxito:", values);
                  }}
            >

                <ContenedorPrincipal padding>
                    <Form>
                        <InputFormulario id='Matricula' name='Matricula' type='number'  textoLbl='Matricula'/>
                        <InputFormulario id='Nombre' name='Nombre' type='text' textoLbl='Nombre'/>

                        <SelectComponent  label= 'Carrera' name='Carrera' />

                        <InputFormulario id='Semestre' name='Semestre' type='number' textoLbl='Semestre'/>
                        <BtnSubmit texto='Registrar' />
                    </Form>
                </ContenedorPrincipal>
            </Formik>


        </DisplayPrincipalStyled>
    );
}

export default AdminCarreras;