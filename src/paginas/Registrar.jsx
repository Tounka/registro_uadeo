
import {DisplayPrincipalStyled, ContenedorPrincipal} from '../componentes/Displays'
import { TitularPrincipal } from '../componentes/Textos';
import { BtnSwitchPaginaFlotante, BtnSubmit } from '../componentes/BotonesPrincipales';
import {InputFormulario} from '../componentes/InputFormulario'
import {Formik, Form, Field, ErrorMessage} from 'formik';
const AdminCarreras = () =>{
    return(
        <DisplayPrincipalStyled>
            <TitularPrincipal texto='Registrar'/>
            <BtnSwitchPaginaFlotante texto= 'Regresar' path='/'/>
            <Formik
                initialValues={
                    {Matricula:'', Nombre:'', Carrera:'', Semestre: 1}
                }
                onSubmit={console.log("hola")}
            >

                <ContenedorPrincipal padding={true}>
                    <Form>
                        <InputFormulario id='Matricula' name='Matricula' type='number'  textoLbl='Matricula'/>
                        <InputFormulario id='Nombre' name='Nombre' type='text' textoLbl='Nombre'/>
                        <InputFormulario id='Carrera' name='Carrera' type='text' textoLbl='Carrera'/>
                        <InputFormulario id='Semestre' name='Semestre' type='number' textoLbl='Semestre'/>
                        <BtnSubmit texto='Registrar' />
                    </Form>
                </ContenedorPrincipal>
            </Formik>


        </DisplayPrincipalStyled>
    );
}

export default AdminCarreras;