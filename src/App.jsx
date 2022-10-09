import { useState, useEffect } from "react";
import Header from "./components/Header";
import Formulario from "./components/Formulario";
import ListadoPacientes from "./components/ListadoPacientes";


function App() {

  const [pacientes, setPacientes] = useState([]); //vamos a escribir en localStorage cuando haya cambios en pacientees
  //con useEffect
  const [paciente, setPaciente] = useState({});

  //obtenemos lo que haya en el localStorage
  useEffect(() => {
    const obtenerLocalStorage = () => {
      const pacientesLocalStorage = JSON.parse(localStorage.getItem('pacientes')) ?? [] ;
      //con el json.parse lo trasnformamos en un objeto(arreglo)
      setPacientes(pacientesLocalStorage);
    };
    obtenerLocalStorage();
  }, []);

  useEffect(()=>{
    localStorage.setItem('pacientes', JSON.stringify(pacientes)); //transformamos el arreglo en string
  },[pacientes]);

  

  const eliminarPaciente = id =>{
    const pacientesActualizados = pacientes.filter((paciente) => paciente.id !== id)
    setPacientes(pacientesActualizados);
  };
  
  
  return (
    <div className="container mx-auto mt-20 ">
      <Header 
      />
      <div className="mt-12 md:flex">
      <Formulario 
        pacientes = {pacientes}
        setPacientes={setPacientes}
        paciente={paciente}
        setPaciente={setPaciente}
      />
      <ListadoPacientes 
      pacientes={pacientes}
      setPaciente={setPaciente}
      eliminarPaciente={eliminarPaciente}
      />
      </div>
    </div>
  );
}

export default App;
