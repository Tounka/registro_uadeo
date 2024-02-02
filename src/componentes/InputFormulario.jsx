import styled from "styled-components";
import { Field, ErrorMessage, useFormikContext } from 'formik';
import { useState, useEffect  } from "react";
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase';
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
  select, .contenedorDato{
    width: 100%;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    background-color: var(--gris);
    color: black;
  }
  .contenedorDato{
    display:flex;
    justify-content:center;
    align-items:center;
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


export const SelectComponent = ({ label, name }) => {
  const { values, handleChange } = useFormikContext();
  const [carreras, setCarreras] = useState([]);

  const fetchCarreras = async () => {
    try {
      const carrerasSnapshot = await getDocs(collection(firestore, 'carrera'));
      const carrerasData = carrerasSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCarreras(carrerasData);
    } catch (error) {
      console.error('Error al obtener las carreras:', error.message);
      // Puedes manejar el error según tus necesidades
    }
  };

  useEffect(() => {
    fetchCarreras();
  }, []); // Se ejecuta solo una vez al montar el componente

  return (
    <InputFormularioStyled>
      <label htmlFor={name}>{label}</label>
      <Field as="select" id={name} name={name} value={values[name]} onChange={handleChange}>
        <option value="">Selecciona...</option>
        {carreras.map(({ id, carrera }) => (
          <option key={id} value={id}>
            {carrera}
          </option>
        ))}
      </Field>
      <ErrorMessage name={name} component="div" />
    </InputFormularioStyled>
  );
};

export const LabelForm = ({Campo, Nombre})=>{
  return(
    <InputFormularioStyled>
    <label >{Campo}</label>
    <div className="contenedorDato">
      {Nombre}
    </div>
  </InputFormularioStyled>
  );
}


