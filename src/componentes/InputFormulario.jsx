import styled from "styled-components";
import { Field, ErrorMessage } from 'formik';

const InputFormularioStyled = styled.div`
  display: flex;
  width: 100%;
  margin: 10px 0;
  height: fit-content;
  border-radius: 10px;
  overflow: hidden;
  font-weight: bold;
  font-size: 24px;

  label {
    background-color: var(--rojo);
    padding: 20px;
    color: var(--blanco);
    width: 35%;
  }
`;

const FieldStyled = styled(Field)`
  padding: 0;
  background-color: var(--gris);
  border: none;
  width: 100%;
  padding: 5px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
`;

export const InputFormulario = ({ textoLbl, type, id, name }) => {
  return (
    <InputFormularioStyled>
      <label htmlFor={id}>{textoLbl}</label>
      <FieldStyled type={type} id={id} name={name} />
      <ErrorMessage name={name} component="div" />
    </InputFormularioStyled>
  );
};
