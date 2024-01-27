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