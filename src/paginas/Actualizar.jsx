
import {DisplayPrincipalStyled, ContenedorPrincipal} from '../componentes/Displays'
import { TitularPrincipal } from '../componentes/Textos';
import { BtnSwitchPaginaFlotante, BtnSubmit } from '../componentes/BotonesPrincipales';
import {InputFormulario, SelectComponent} from '../componentes/InputFormulario'
import {Formik, Form} from 'formik';
import { collection, getDocs, where, updateDoc,doc,query} from 'firebase/firestore';
import { firestore} from '../firebase'; 

const AdminCarreras = () =>{


    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
      try {
        const matriculaQuery = query(collection(firestore, 'estudiantes'), where('matricula', '==', values.Matricula));
        const matriculaDocs = await getDocs(matriculaQuery);
        
        if (matriculaDocs.size > 0) {
          
    
          // Actualizar el documento en Firestore
          await updateDoc(doc(firestore, 'estudiantes', matriculaDocs.docs[0].id), {
            nombre: values.Nombre,
            semestre: values.Semestre,
            carrera: values.Carrera,
            
          });
        
        
        } else {
          alert("El usuario no está registrado");
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
            <TitularPrincipal texto='Actualizar'/>
            <BtnSwitchPaginaFlotante texto= 'Regresar' path='/'/>
            <Formik
                initialValues={
                    {Matricula:'', Nombre:'', Carrera:'', Semestre: 1}
                }
                onSubmit={handleSubmit}
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
   
            >

                <ContenedorPrincipal padding>
                    <Form>
                        <InputFormulario id='Matricula' name='Matricula' type='number'  textoLbl='Matricula'/>

                        <InputFormulario id='Nombre' name='Nombre' type='text' textoLbl='Nombre'/>

                        <SelectComponent  label= 'Carrera' name='Carrera' />

                        <InputFormulario id='Semestre' name='Semestre' type='number' textoLbl='Semestre'/>

                        <BtnSubmit texto='Buscar' />
                    </Form>
                </ContenedorPrincipal>
            </Formik>


        </DisplayPrincipalStyled>
    );
}

export default AdminCarreras;