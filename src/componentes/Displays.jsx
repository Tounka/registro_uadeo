import styled from "styled-components";

export const DisplayPrincipalStyled = styled.div`
    background-color: var(--rojo);
    width:100%;
    height:100%;
    display:flex;
    flex-direction: column;
    justify-content:center;
    align-items:center;
    margin: 0;

    
`


export const ContenedorPrincipal = styled.div`
    display:flex;
    justify-content:space-between;
    height: 70%;
    width:80%;
    background-color: var(--blanco);
    border-radius: 20px;
    flex-direction:column;
    
    padding: ${props => (props.padding ? '20px' : null)};
    overflow:hidden;
    flex-wrap: wrap;
`