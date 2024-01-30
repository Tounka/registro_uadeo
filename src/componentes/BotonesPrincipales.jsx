import styled from "styled-components";
import { Link } from "react-router-dom";

const BtnSwitchPaginaPrincipalStyled = styled(Link)`
    display:flex;
    width: 50%;
    
    height:100%;
    background-color: ${props => (props.bg === "amarillo" ? "var(--amarilloPrincipal)" : "var(--azulPrincipal)")};
    color: ${props => (props.color === "negro" ? "var(--negro)" : "var(--blanco)" )};

    justify-content:center;
    align-items:center;

    text-decoration: none; 
    font-size: 26px;
    font-weight:bold;
    transition: scale .1s ease;
    &:hover{
        scale: 1.2;
        transition: scale .3s ease;
    }
    @media (max-width: 768px) {
        width: 100%;
        height:50%;
        flex-direction: column;
    }
`
export const BtnSwitchPaginaPrincipal = ({bg, color, texto, path}) =>{
    return(
        <BtnSwitchPaginaPrincipalStyled bg={bg} color={color} to={path}>
            {texto}
        </BtnSwitchPaginaPrincipalStyled>
    );
}

const BtnSwitchPaginaFlotanteStyled = styled(Link)`
    color:black;
    text-decoration:none;
    padding:20px;
    background-color:var(--gris);
    border-radius: 20px;
    display:flex;
    justify-content:center;
    align-items:center;


    position: fixed;
    right: 0;
    top: 0;
    margin-right: 40px;
    margin-top: 40px;
`
export const BtnSwitchPaginaFlotante = ({texto , path}) =>{
    return(
        <BtnSwitchPaginaFlotanteStyled to={path}>
            {texto}
        </BtnSwitchPaginaFlotanteStyled>
    );
}

const BtnSubmitStyled = styled.button`
    color:var(--blanco);
    text-decoration:none;
    padding:20px;
    background-color:var(--rojo);
    border-radius: 20px;
    display:flex;
    justify-content:center;
    align-items:center;
    border:none;
    font-size: 26px;
    font-weight:bold;
`
export const BtnSubmit = ({texto}) =>{
    return(
        <BtnSubmitStyled>
            {texto}
        </BtnSubmitStyled>
    );
}