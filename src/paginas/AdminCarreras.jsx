import React from "react";
import { DisplayPrincipalStyled, ContenedorPrincipal } from '../componentes/Displays';
import { TitularPrincipal } from '../componentes/Textos';
import { BtnSwitchPaginaFlotante, BtnSubmit } from '../componentes/BotonesPrincipales';
import { InputFormulario } from '../componentes/InputFormulario';
import { Formik, Form } from 'formik';

const AdminCarreras = () => {
  const initialValues = {
    carrera: '', // Agrega otras propiedades según sea necesario
  };

  const handleSubmit = (values, { setSubmitting }) => {
    // Aquí puedes manejar la lógica de envío del formulario
    console.log(values);
    setSubmitting(false);
  };

  return (
    <DisplayPrincipalStyled>
      <TitularPrincipal texto='Agregar Carrera' />
      <BtnSwitchPaginaFlotante texto='Regresar' path='/' />

      <ContenedorPrincipal padding>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form>
            <InputFormulario textoLbl='Carrera' type='text' id='carrera' name='carrera' />
          </Form>
        </Formik>

        <BtnSubmit texto='Generar Reporte' />
      </ContenedorPrincipal>
    </DisplayPrincipalStyled>
  );
}

export default AdminCarreras;
