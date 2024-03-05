import React, { useState, useEffect } from "react";
import { DisplayPrincipalConsultaStyled, ContenedorConsultas } from "../componentes/Displays";
import { TitularPrincipal } from '../componentes/Textos';
import { BtnSwitchPaginaFlotante } from '../componentes/BotonesPrincipales';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase';
import { ContenedorGrid, CapsulaEstudiantes, CapsulaEstudiantesPrincipal } from '../componentes/ComponentesConsulta';
import { BarraSuperiorConsulta } from "../componentes/ComponentesConsulta";

const Consultas = () => {
    const [carrer, setCarrer] = useState("");
    const [year, setYear] = useState(0);
    const [month, setMonth] = useState(0);
    const [allData, setAllData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [totalIngresos, setTotalIngresos] = useState(0);

    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const consulta = collection(firestore, 'estudiantes');
                const matriculaDocs = await getDocs(consulta);

                if (matriculaDocs.docs.length > 0) {
                    const data = matriculaDocs.docs.map(documento => documento.data());
                    setAllData(data);
                    filtrarDatos(data);
                } else {
                    console.log('No se encontraron documentos');
                }
            } catch (error) {
                console.error('Error al obtener documentos:', error.message);
            }
        };

        obtenerDatos();
    }, []);

    useEffect(() => {
        filtrarDatos(allData);
    }, [carrer, year, month, allData]);

    useEffect(() => {
        const total = filteredData.reduce((acc, documento) => {
            
            const ingresos = obtenerNumeroDeIngresos(documento.fechaActualizacion);
            if (!isNaN(ingresos)) {
                return acc + ingresos;
            } else {
                return acc;
            }
        }, 0);

        setTotalIngresos(total);
    }, [filteredData]);

    const filtrarDatos = (data) => {
        let filtered = data;

        if (carrer !== "") {
            filtered = filtered.filter(item => item.carrera === carrer);
        }

        if (year !== 0 || month !== 0) {
            filtered = filtered.filter(item => {
                const fechasActualizacion = Array.isArray(item.fechaActualizacion) ? item.fechaActualizacion : [item.fechaActualizacion];

                return fechasActualizacion.some(timestamp => {
                    if (!timestamp) {
                        return false;
                    }

                    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp.seconds * 1000);
                    const yearCondition = year === 0 || date.getFullYear() === year;
                    const monthCondition = month === 0 || date.getMonth() === month - 1;

                    return yearCondition && monthCondition;
                });
            });
        }

        setFilteredData(filtered);
    };

    const obtenerNumeroDeIngresos = (data) => {
        let ingresosConFiltro = 0;
        if (data != null) {
            if (year !== 0 || month !== 0) {
                data.forEach(timestamp => {
                    const seconds = timestamp.seconds || 0;
                    const nanoseconds = timestamp.nanoseconds || 0;
                    const fecha = new Date(seconds * 1000 + nanoseconds / 1000000);
                    ingresosConFiltro += fecha.getFullYear() === year ? 1 : 0;
                });
                return ingresosConFiltro;
            }
        } else {
            return 'No tiene ingresos registrados';
        }
        return (data.length);
    }

    const capsulaPrincipalTitulo = () => {
        if (carrer !== '') {
            return (carrer);
        } else {
            return ('Todas las Carreras')
        }
    }

    return (
        <DisplayPrincipalConsultaStyled>
            <BtnSwitchPaginaFlotante texto='Regresar' path='/' />
            <ContenedorConsultas>
                <BarraSuperiorConsulta setYear={setYear} setMonth={setMonth} setCarrer={setCarrer} year={year} month={month} carrer={carrer} />

                <ContenedorGrid>
                    <CapsulaEstudiantesPrincipal titulo={capsulaPrincipalTitulo()} numIngresos={totalIngresos}>
                        asdasd
                    </CapsulaEstudiantesPrincipal>

                    {filteredData.map((documento, index) => (
                        <CapsulaEstudiantes key={index} nombre={documento.nombre} matricula={documento.matricula} carrera={documento.carrera} numIngresos={obtenerNumeroDeIngresos(documento.fechaActualizacion)}>
                        </CapsulaEstudiantes>
                    ))}
                </ContenedorGrid>
            </ContenedorConsultas>
        </DisplayPrincipalConsultaStyled>
    );
};

export default Consultas;
