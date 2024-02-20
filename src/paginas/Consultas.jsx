import React, { useState, useEffect } from "react";
import { DisplayPrincipalConsultaStyled, ContenedorConsultas } from "../componentes/Displays";
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { firestore } from '../firebase';
import { BtnSubmit } from "../componentes/BotonesPrincipales";
import { ContenedorGrid, CapsulaEstudiantes, CapsulaEstudiantesPrincipal } from '../componentes/ComponentesConsulta';
import { BarraSuperiorConsulta } from "../componentes/ComponentesConsulta";

const Consultas = () => {
    const [carrer, setCarrer] = useState("");
    const [year, setYear] = useState(0);
    const [month, setMonth] = useState(0);
    const [datosAlumnos, setDatosAlumnos] = useState([]);

    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const matriculaQuery = query(collection(firestore, 'estudiantes'), orderBy("matricula", "asc"));
                const matriculaDocs = await getDocs(matriculaQuery);

                if (matriculaDocs.docs.length > 0) {
                    console.log(matriculaDocs.docs);
                    setDatosAlumnos(matriculaDocs.docs.map(documento => documento.data()));
                } else {
                    console.log('No se encontraron documentos');
                }
            } catch (error) {
                console.error('Error al obtener documentos:', error.message);
            }
        };

        obtenerDatos();
    }, []); 

    return (
        <DisplayPrincipalConsultaStyled>
            <ContenedorConsultas>
                <BarraSuperiorConsulta setYear={setYear} setMonth={setMonth} setCarrer={setCarrer} year={year} month={month} carrer={carrer} />
                <ContenedorGrid>
                    <CapsulaEstudiantesPrincipal>asdasd</CapsulaEstudiantesPrincipal>
                    {datosAlumnos.map((documento, index) => (
                        <CapsulaEstudiantes key={index}>
                        <p>Matrícula: {documento.matricula}</p>
                        <p>Nombre: {documento.nombre}</p>
                        <p>Carrera: {documento.carrera}</p>
                        {/* Agrega más propiedades según sea necesario */}
                      </CapsulaEstudiantes>
                      
                    ))}
                </ContenedorGrid>
            </ContenedorConsultas>
        </DisplayPrincipalConsultaStyled>
    );
};

export default Consultas;
