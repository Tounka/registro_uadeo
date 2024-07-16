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
export const DisplayPrincipalConsultaStyled = styled(DisplayPrincipalStyled)`
    height:auto;
    min-height:100%;
    
    
`


export const ContenedorPrincipal = styled.div`
    display:flex;
    justify-content:space-between;
    height: 70%;
    @media (max-width: 760px) {
        height: auto;
        min-height: 70%;
        justify-content: space-evenly;
    }
    width:80%;
    background-color: var(--blanco);
    border-radius: 20px;
    flex-direction:column;
    
    padding: ${props => (props.padding ? '20px' : null)};
    overflow:hidden;
    flex-wrap: wrap;
`

export const ContenedorConsultas = styled(ContenedorPrincipal) `
    margin: 60px 0;
    height: inherit;
    padding: 10px;
    overflow: visible;
`
const ContenedorFooter = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 10px 20px ;
    width: 100%;

    text-align: center;
    background-color: black;
    color: white;
    font-weight: bold;
    bottom: 0;
`
export const Footer = ({textoPrincipalFooter, textoSecundarioFooter}) =>{

    return(
        <ContenedorFooter>
            <p className="textoPrincipalF">{textoPrincipalFooter}</p>
            <p className="textoSecundarioF">{textoSecundarioFooter}</p>
        </ContenedorFooter>
    );
}

