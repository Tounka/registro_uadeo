import React from "react";
import { DisplayPrincipalStyled, ContenedorPrincipal } from '../componentes/Displays';
import { TitularPrincipal } from '../componentes/Textos';
import { BtnSwitchPaginaFlotante, BtnSubmit } from '../componentes/BotonesPrincipales';
import { InputFormulario } from '../componentes/InputFormulario';
import { Formik, Form } from 'formik';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import { collection, addDoc,getDocs, query, orderBy} from 'firebase/firestore';
import { firestore} from '../firebase'; 
const LinkStyled = styled(Link)`
  text-decoration:none;
`


const AdminCarreras = () => {
  const initialValues = {
    carrera: '',
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      
      await addDoc(collection(firestore, 'carrera'), {
        carrera: values.carrera,

   
      });
        
    

      
    } catch (error) {
      console.error('Error al agregar el documento:', error.message);
    } finally {
      setSubmitting(false);
      resetForm();
    }
  };

  const obtenerdatos = async (values) => {
    try {
      const matriculaQuery = query(collection(firestore, 'estudiantes'), orderBy("matricula", "asc"));
      const matriculaDocs = await getDocs(matriculaQuery);
  
      if (matriculaDocs.docs.length > 0) {
        console.log(matriculaDocs.docs);
        matriculaDocs.docs.forEach((documento, index) => {
          console.log(`Documento ${index}:`, documento.data());
        });
      } else {
        console.log('No se encontraron documentos');
      }
    } catch (error) {
      console.error('Error al obtener documentos:', error.message);
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
            
            <BtnSubmit type="submit" texto='Agregar' />
          </Form>
          
        </Formik>
        <div >
          <BtnSubmit type="button" texto='Generar Reporte' funcionOnClick={obtenerdatos} />
          <LinkStyled to="/Actualizar">
            <BtnSubmit type='button' texto='Actualizar Datos' />
          </LinkStyled>
        </div>
  
      </ContenedorPrincipal>
    </DisplayPrincipalStyled>
  );
}

export default AdminCarreras;
