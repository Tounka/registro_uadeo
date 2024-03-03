import React, { useEffect } from "react";
import styled from "styled-components";
import { SelectComponent } from './InputFormulario.jsx'
import { BtnSubmit } from './BotonesPrincipales.jsx';
import { InputFormulario } from './InputFormulario.jsx';
import { Formik, Form } from "formik";

const ContenedorBarra = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-bottom:20px;
  
  > * {
    font-size: 18px;
  }
`;

export const BarraSuperiorConsulta = ({ setYear, setMonth, setCarrer, carrer ,month,year }) => {
  const handleSubmit = (values) => {
    setYear(values.Year);
    setMonth(values.Month);
    setCarrer(values.Carrera);
  };

  useEffect(() => {
    
  }, [carrer, month, year]);

  return (
    <Formik
      initialValues={{ Year: 2022, Month: 1, Carrera: '' }}
      onSubmit={handleSubmit}
      validate={(values) => {
        const errors = {};
        // Puedes realizar validaciones aquí si es necesario
        return errors;
      }}
    >
      <Form>
        <ContenedorBarra>
          <InputFormulario id='Year' name='Year' type='number' textoLbl='Año' />
          <InputFormulario id='Month' name='Month' type='number' textoLbl='Mes' />
          <SelectComponent label='Carrera' name='Carrera' />
          <BtnSubmit texto='Generar Reporte' />
        </ContenedorBarra>
      </Form>
    </Formik>
  );
};

export const ContenedorGrid = styled.div`
  height: 84%;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  
  gap: 10px;
`;

export const CapsulaEstudiantesStyled = styled.div`
  background-color: var(--rojo);
  
  width: 100%;
  height: 100%;
  border-radius: 20px;
  min-height:200px;
  color: var(--blanco);
  font-weight: 16px;
  display:flex;
  flex-direction:column;
  justify-content:space-around;
`;
export const CapsulaEstudiantes = ({nombre, matricula, carrera, numIngresos}) =>{
  return(
    <CapsulaEstudiantesStyled>
        <h2>{nombre}</h2>
        <p>Matricula: {matricula}</p>
        <p>Carrera: {carrera}</p>
        <p>Ingresos: {numIngresos}</p>
    </CapsulaEstudiantesStyled>
  );
} 

export const CapsulaEstudiantesPrincipalStyled = styled(CapsulaEstudiantesStyled)`
   grid-column: 1 / 2;
   grid-row: 1 / 3 ;
`
export const CapsulaEstudiantesPrincipal = ({titulo, numIngresos}) =>{
  return(
    <CapsulaEstudiantesPrincipalStyled>
        <h2>{titulo}</h2>
        
        <h3>Ingresos: {numIngresos}</h3>
    </CapsulaEstudiantesPrincipalStyled>
  );
} 
