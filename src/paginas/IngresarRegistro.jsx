
import {DisplayPrincipalStyled, ContenedorPrincipal} from '../componentes/Displays'
import { TitularPrincipal } from '../componentes/Textos';
import { BtnSwitchPaginaFlotante, BtnSubmit } from '../componentes/BotonesPrincipales';
import {InputFormulario, LabelForm} from '../componentes/InputFormulario'
import {Formik, Form} from 'formik';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../firebase'; // Asegúrate de ajustar la ruta correcta
import { useState } from 'react';
const AdminCarreras = () =>{
    const [estadoEstudiante, setEstadoEstudiante] = useState({ Nombre: '', Semestre: '', Carrera: '' });

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
          // Validar si la matrícula ya existe en la base de datos
          const matriculaQuery = query(collection(firestore, 'estudiantes'), where('matricula', '==', values.Matricula));
          const matriculaDocs = await getDocs(matriculaQuery);
      
          if (matriculaDocs.size > 0) {
            // La matrícula ya existe
            alert("El usuario ya esta registrado");
            const estudiante = matriculaDocs.docs[0].data();
            console.log(estudiante)
            setEstadoEstudiante({Nombre:estudiante.nombre, Semestre:estudiante.semestre, Carrera:estudiante.carrera})
      
            return;
          }else{
            alert("El usuario no esta registrado");
          }
      
      

        } catch (error) {
          console.error('Error al agregar el documento:', error.message);
        } finally {
          setSubmitting(false);
          resetForm();
        }
      };
      
    return(
        <DisplayPrincipalStyled>
            <TitularPrincipal texto='Ingresar'/>
            <BtnSwitchPaginaFlotante texto= 'Regresar' path='/'/>
            <Formik
                initialValues={
                    {Matricula:''}
                }
                onSubmit={handleSubmit}
                validate={(values) => {
                    const errors = {};
                
                    // Aquí puedes agregar lógica de validación personalizada
                    if (!values.Matricula) {
                      errors.Matricula = 'La matrícula es obligatoria';
                    }
                
                    
                
                    return errors;
                  }}
   
            >

                <ContenedorPrincipal padding>
                    <Form>
                        <InputFormulario id='Matricula' name='Matricula' type='number'  textoLbl='Matricula'/>

                        <LabelForm Campo="Nombre" Nombre={estadoEstudiante.Nombre}> </LabelForm>
                        <LabelForm Campo="Carrera" Nombre={estadoEstudiante.Carrera}> </LabelForm>
                        <LabelForm Campo="Semestre" Nombre={estadoEstudiante.Semestre}> </LabelForm>

                        <BtnSubmit texto='Buscar' />
                    </Form>
                </ContenedorPrincipal>
            </Formik>


        </DisplayPrincipalStyled>
    );
}

export default AdminCarreras;