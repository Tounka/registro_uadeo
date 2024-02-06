import { DisplayPrincipalStyled, ContenedorPrincipal } from '../componentes/Displays';
import { TitularPrincipal } from '../componentes/Textos';
import { BtnSwitchPaginaFlotante, BtnSubmit } from '../componentes/BotonesPrincipales';
import { InputFormulario, LabelForm } from '../componentes/InputFormulario';
import { Formik, Form } from 'formik';
import { collection, getDocs, query, where, updateDoc, doc } from 'firebase/firestore';
import { firestore } from '../firebase';
import { useState } from 'react';

const AdminCarreras = () => {
  const [estadoEstudiante, setEstadoEstudiante] = useState({ Nombre: '', Semestre: '', Carrera: '' });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const matriculaQuery = query(collection(firestore, 'estudiantes'), where('matricula', '==', values.Matricula));
      const matriculaDocs = await getDocs(matriculaQuery);

      if (matriculaDocs.size > 0) {
        const estudiante = matriculaDocs.docs[0].data();

        // Obtener la fecha actual como objeto de fecha
        const fechaActual = new Date();
        
        // Obtener el valor actual del campo fechaActualizacion
        const fechaActualizacionActual = estudiante.fechaActualizacion || [];

        // Actualizar el documento en Firestore
        await updateDoc(doc(firestore, 'estudiantes', matriculaDocs.docs[0].id), {
          nombre: estudiante.nombre,
          semestre: estudiante.semestre,
          carrera: estudiante.carrera,
          fechaActualizacion: [...fechaActualizacionActual, fechaActual], // Agregar la nueva fecha como objeto de fecha
        });

        setEstadoEstudiante({ Nombre: estudiante.nombre, Semestre: estudiante.semestre, Carrera: estudiante.carrera });
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

  return (
    <DisplayPrincipalStyled>
      <TitularPrincipal texto='Ingresar' />
      <BtnSwitchPaginaFlotante texto='Regresar' path='/' />
      <Formik
        initialValues={{
          Matricula: '',
        }}
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
            <InputFormulario id='Matricula' name='Matricula' type='number' textoLbl='Matricula' />

            <LabelForm Campo="Nombre" Nombre={estadoEstudiante.Nombre}> </LabelForm>
            <LabelForm Campo="Carrera" Nombre={estadoEstudiante.Carrera}> </LabelForm>
            <LabelForm Campo="Semestre" Nombre={estadoEstudiante.Semestre}> </LabelForm>

            <BtnSubmit texto='Buscar' />
          </Form>
        </ContenedorPrincipal>
      </Formik>
    </DisplayPrincipalStyled>
  );
};

export default AdminCarreras;
