import styled from "styled-components";

const TitularPrincipalStyled = styled.h1`
    color:var(--blanco);
    font-size: 60px;
    margin: 0 20px 40px 20px;
`
export const TitularPrincipal = ({texto}) =>{
    return(
        <TitularPrincipalStyled>
            {texto}
        </TitularPrincipalStyled>
    )
}