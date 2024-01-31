import React from "react";
import { DisplayPrincipalStyled, ContenedorPrincipal } from '../componentes/Displays';
import { TitularPrincipal } from '../componentes/Textos';
import { BtnSwitchPaginaFlotante, BtnSubmit } from '../componentes/BotonesPrincipales';
import { InputFormulario } from '../componentes/InputFormulario';
import { Formik, Form } from 'formik';
import { collection, addDoc } from 'firebase/firestore';
import { firestore } from '../firebase'; // Asegúrate de ajustar la ruta correcta


const AdminCarreras = () => {
  const initialValues = {
    carrera: '',
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Agregar el nuevo documento a la colección 'carreras' en Firestore
      const docRef = await addDoc(collection(firestore, 'carrera'), {
        carrera: values.carrera,
        // Agrega otras propiedades según sea necesario
      });

      console.log('Documento agregado con ID:', docRef.id);
    } catch (error) {
      console.error('Error al agregar el documento:', error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <DisplayPrincipalStyled>
      <TitularPrincipal texto='Agregar Carrera' />
      <BtnSwitchPaginaFlotante texto='Regresar' path='/' />

      <ContenedorPrincipal padding>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}
          validate={(values) => {
            const errors = {};
            if (!values.carrera) {
              errors.carrera = 'La Carrera es obligatoria';
            }
            return errors;
          }}>
          <Form>
            <InputFormulario textoLbl='Carrera' type='text' id='Carrera' name='carrera' />
            
            <BtnSubmit texto='Agregar' />
          </Form>
          
        </Formik>
        <BtnSubmit texto='Generar Reporte' />
      </ContenedorPrincipal>
    </DisplayPrincipalStyled>
  );
}

export default AdminCarreras;
