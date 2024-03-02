import React, { useState, useEffect } from "react";
import { DisplayPrincipalConsultaStyled, ContenedorConsultas } from "../componentes/Displays";
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase';
import { ContenedorGrid, CapsulaEstudiantes, CapsulaEstudiantesPrincipal } from '../componentes/ComponentesConsulta';
import { BarraSuperiorConsulta } from "../componentes/ComponentesConsulta";

const Consultas = () => {
    const [carrer, setCarrer] = useState("");
    const [year, setYear] = useState(0);
    const [month, setMonth] = useState(0); // Agregada la variable month
    const [allData, setAllData] = useState([]); 
    const [filteredData, setFilteredData] = useState([]);

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
  
                  // Manejar casos en los que toDate() no está disponible
                  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp.seconds * 1000);
  
                  // Obtener el año y el mes de la fecha
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
                const arreglo = data.filter(timestamp => {
                    // Convertir el timestamp a un objeto Date
                    const seconds = timestamp.seconds || 0; // Si seconds no está presente, usar 0
                    const nanoseconds = timestamp.nanoseconds || 0; // Si nanoseconds no está presente, usar 0

                    const fecha = new Date(seconds * 1000 + nanoseconds / 1000000); // Convertir nanosegundos a milisegundos
    
        
                    // Verificar si la fecha pertenece al año 2024
                    ingresosConFiltro += fecha.getFullYear() === year ? 1 : 0;

          
          
                  });
                  return ingresosConFiltro;
            }
            
        
        }else{
            return 'No tiene ingresos registrados';
        }
            return(data.length)
            
        }
       
        
    const capsulaPrincipalTitulo = () =>{
        if(carrer != ''){
            return(carrer);
        }else{
            return('Todas las Carreras')
        }
    }
    return (
        <DisplayPrincipalConsultaStyled>
            <ContenedorConsultas>
                <BarraSuperiorConsulta setYear={setYear} setMonth={setMonth} setCarrer={setCarrer} year={year} month={month} carrer={carrer} />
                
                <ContenedorGrid>
                    <CapsulaEstudiantesPrincipal titulo={capsulaPrincipalTitulo()} numIngresos={3}  >asdasd</CapsulaEstudiantesPrincipal>

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
