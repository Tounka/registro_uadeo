
import {DisplayPrincipalStyled, ContenedorPrincipal} from '../componentes/Displays'
import { TitularPrincipal } from '../componentes/Textos';
import { BtnSwitchPaginaFlotante, BtnSubmit } from '../componentes/BotonesPrincipales';
import {InputFormulario} from '../componentes/InputFormulario'
import {Formik, Form} from 'formik';
import { SelectComponent } from '../componentes/InputFormulario';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../firebase'; // Asegúrate de ajustar la ruta correcta
const AdminCarreras = () =>{

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
          // Validar si la matrícula ya existe en la base de datos
          const matriculaQuery = query(collection(firestore, 'estudiantes'), where('matricula', '==', values.Matricula));
          const matriculaDocs = await getDocs(matriculaQuery);
      
          if (matriculaDocs.size > 0) {
            // La matrícula ya existe
            alert("El usuario ya esta registrado");
            return;
          }
      
          // La matrícula no existe, agregar el nuevo documento a la colección 'estudiantes' en Firestore
          const docRef = await addDoc(collection(firestore, 'estudiantes'), {
            matricula: values.Matricula,
            nombre: values.Nombre,
            carrera: values.Carrera,
            semestre: values.Semestre,
            


          });
      
          
          //console.log('Documento agregado con ID:', docRef.id);
        } catch (error) {
          console.error('Error al agregar el documento:', error.message);
        } finally {
          setSubmitting(false);
          resetForm();
        }
      };
      
    return(
        <DisplayPrincipalStyled>
            <TitularPrincipal texto='Registrar'/>
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
                        <BtnSubmit texto='Registrar' />
                    </Form>
                </ContenedorPrincipal>
            </Formik>


        </DisplayPrincipalStyled>
    );
}

export default AdminCarreras;