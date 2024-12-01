import { useState, useEffect } from 'react';
import { User } from '../views/User';
import { Notes } from '../views/Notes';
import { Dates } from '../views/Dates';
import Swal from 'sweetalert2';
import axios from 'axios';
import 'react-calendar/dist/Calendar.css';

const Home: React.FC = () => {

  const [data, setData] = useState([]);
  
  const views = {
    Dates: <Dates data={data}/>,
    Notes: <Notes data={data}/>,
    User: <User/>
  }

  const [currentView, setCurrentView] = useState<'Dates' | 'Notes' | 'User'>('Notes')

  // peticion de notas
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
                <img alt="Avatar" src="../assets/avatars/pochi.jpg" />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="flex flex-col items-center justify-start space-y-4 bg-white w-full overflow-auto py-[90px]">
        {views[currentView]}
      </div>

      {/* Buttons */}
      <div className="fixed bottom-0 left-0 w-full h-[70px] grid grid-cols-3 place-items-center z-10">
        <button
          className="bg-white w-full h-full flex items-center justify-center text-sm font-medium transition-all duration-150 hover:bg-gray-100"
          aria-label="Opción 1"
          onClick={() => setCurrentView('Dates')}
        >
          <i className='text-2xl text-morado bx bxs-calendar' ></i>
        </button>
        <button
          className="bg-white w-full h-full flex items-center justify-center text-sm font-medium transition-all duration-150 hover:bg-gray-100"
          aria-label="Opción 2"
          onClick={() => setCurrentView('Notes')}
        >
          <i className='text-2xl text-morado bx bx-note' ></i>
        </button>
        <button
          className="bg-white w-full h-full flex items-center justify-center text-sm font-medium transition-all duration-150 hover:bg-gray-100"
          aria-label="Opción 3"
          onClick={() => setCurrentView('User')}
        >
          <i className='text-2xl text-morado bx bxs-user' ></i>
        </button>
      </div>
    </>
  );
};

export default Home;