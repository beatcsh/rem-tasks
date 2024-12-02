import { useState, useEffect } from "react";
import { User } from "../views/User";
import { Notes } from "../views/Notes";
import { Dates } from "../views/Dates";
import { CreateNote } from "../views/CreateNote"; 
import { EditNote } from "../views/EditNotes";
import Swal from "sweetalert2";
import axios from "axios";
import "react-calendar/dist/Calendar.css";

const Home: React.FC = () => {
  const [data, setData] = useState([]); 
  const [currentView, setCurrentView] = useState<"Dates" | "Notes" | "User" | "CreateNote" | "EditNote">("Notes"); 
  const [selectedNote, setSelectedNote] = useState<any>(null);

  // objeto de vistas dinámicas
  const views: Record<"Dates" | "Notes" | "User" | "CreateNote" | "EditNote", JSX.Element> = {
    Dates: <Dates data={data} />,
    Notes: <Notes data={data} setCurrentView={setCurrentView} setSelectedNote={setSelectedNote} />,
    User: <User />,
    CreateNote: <CreateNote />,
    EditNote: <EditNote note={selectedNote} />
  };

  // Fetch de datos al cargar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/notes/alln");
        setData(response.data);
      } catch (err: any) {
        Swal.fire("Error", "No pude traer las notas", "error");
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {/* Navbar */}
      <div className="navbar bg-white p-4 fixed top-0 left-0 w-full z-10 shadow-md h-[10vh]">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl text-morado font-bold">RemTask</a>
        </div>
        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img alt="Avatar" src="/assets/avatars/pochi.jpg" />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-white text-gray-700 rounded-box z-[1] mt-3 w-60 p-2 shadow"
            >
              <li>
                <a onClick={() => setCurrentView('User')}>
                  Tu informacion
                </a>
              </li>
              <li>
                <a onClick={() => setCurrentView('Dates')}>Tu calendario</a>
              </li>
              <li>
                <a className="font-semibold" href="/">Cerrar Sesion</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="flex flex-col items-center justify-start space-y-4 bg-white w-full overflow-auto py-[90px]">
        
        {views[currentView]}

        {/* Botón flotante para cambiar a CreateNote */}
        {currentView !== "CreateNote" && currentView !== "EditNote" && (
          <button
            onClick={() => setCurrentView("CreateNote")}
            className="animate-pulse fixed bottom-[100px] right-8 z-50 bg-morado rounded-full p-2 w-[50px] h-[50px] hover:bg-moradobajo transition-all duration-150"
          >
            <i className="bx bx-plus text-3xl font-bold text-white"></i>
          </button>
        )}
      </div>

      {/* Botones de navegación */}
      <div className="fixed bottom-0 left-0 w-full h-[70px] grid grid-cols-3 place-items-center z-10 bg-white shadow-md">
        <button
          className={`w-full h-full flex items-center justify-center text-sm font-medium transition-all duration-150 hover:bg-gray-100 ${currentView === "Dates" ? "bg-gray-100" : ""
            }`}
          aria-label="Calendario"
          onClick={() => setCurrentView("Dates")}
        >
          <i className="text-2xl text-morado bx bxs-calendar"></i>
        </button>
        <button
          className={`w-full h-full flex items-center justify-center text-sm font-medium transition-all duration-150 hover:bg-gray-100 ${currentView === "Notes" ? "bg-gray-100" : ""
            }`}
          aria-label="Notas"
          onClick={() => setCurrentView("Notes")}
        >
          <i className="text-2xl text-morado bx bx-note"></i>
        </button>
        {/* <button
          className={`w-full bg-morado h-full flex items-center justify-center text-sm font-medium transition-all duration-150 hover:bg-moradobajo ${currentView === "User" ? "bg-gray-100" : ""
            }`}
          aria-label="Usuario"
          onClick={() => setCurrentView("User")}
        >
          <i className="text-2xl font-bold text-white bx bx-plus"></i>
        </button> */}
        <button
          className={`w-full h-full flex items-center justify-center text-sm font-medium transition-all duration-150 hover:bg-gray-100 ${currentView === "User" ? "bg-gray-100" : ""
            }`}
          aria-label="Usuario"
          onClick={() => setCurrentView("User")}
        >
          <i className="text-2xl text-morado bx bxs-user"></i>
        </button>
      </div>
    </>
  );
};

export default Home;
