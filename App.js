import Inicio from "./paginas/Inicio/Inicio";
import { ProveedorAutenticacion } from "./contexto/ContextoAutenticacion";

const App = () => {
  return (
    <ProveedorAutenticacion>
      <Inicio />
    </ProveedorAutenticacion>
  );
};

export default App;
