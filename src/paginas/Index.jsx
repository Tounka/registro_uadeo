import {DisplayPrincipalStyled, ContenedorPrincipal} from '../componentes/Displays'
import {TitularPrincipal} from '../componentes/Textos'
import {BtnSwitchPaginaPrincipal, BtnSwitchPaginaFlotante} from '../componentes/BotonesPrincipales.jsx'
const Index = () =>{
    return(
        <DisplayPrincipalStyled>
            <TitularPrincipal texto='UAdeO'/>
            <BtnSwitchPaginaFlotante texto= 'Admin' path='/AgregarCarrera'/>
            <ContenedorPrincipal padding={false}>

                <BtnSwitchPaginaPrincipal bg= 'amarillo' color='negro' texto='Registrar' path='/Registrar'/>
                <BtnSwitchPaginaPrincipal bg= 'azul' color='blanco' texto='Ingresar' path='/AgregarCarrera'/>
                
            </ContenedorPrincipal>
        </DisplayPrincipalStyled>
    );
}

export default Index;