import { useState } from "react";
import { useHistory } from "react-router";
import Swal from "sweetalert2";
import axios from "axios";

const Login: React.FC = () => {
    const [data, setData] = useState({});
    const history = useHistory();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const data_temp: any = data;
        data_temp[e.target.name] = e.target.value;
        setData(data_temp)
        console.log(data)
    }

    const onSubmit = async () => {
        try {
            Swal.fire("Enviando Datos");
            Swal.showLoading();
            const response = await axios.post("http://localhost:5000/users/login", data)
            Swal.fire("Inicio de Sesion Exitoso",response.data.token,"success")
            history.push("/home")
        } catch(err: any) {
            Swal.fire("Error al iniciar sesion",err.response.data.msg,"error")
        }
    }

    return (
        <>
            <div className='h-[100vh] bg-white flex flex-col justify-center place-items-center w-full space-y-6'>
                {/* <h1 className="text-xl text-titulos mb-4">Bienvenido ¡Inicia Sesion!</h1> */}
                <img src="../assets/logo_no_bg.png" className="w-[50%]" />
                <label className="input input-bordered flex bg-gray-200 items-center gap-3">
                    <i className='bx bxs-envelope text-morado'></i>
                    <input onChange={onChange} name="email" type="text" className="grow text-gray-700" placeholder="Email" />
                </label>
                <label className="input input-bordered flex bg-gray-200 items-center gap-3">
                    <i className='bx bxs-key text-morado' ></i>
                    <input onChange={onChange} name="pass" type="password" placeholder="Password" className="grow text-gray-700" />
                </label>
                <button
                    onClick={onSubmit}
                    className="btn border-0  bg-morado text-white font-bold w-[50%] mt-8 hover:bg-moradobajo"
                >
                    Entrar
                </button>
                <div className="grid place-items-center">
                    <p className="font-semibold text-sm">No tienes una cuenta? <a href="/register" className="text-morado hover:text-moradobajo">Registrate</a></p>
                </div>
            </div>
        </>
    );
};

export default Login;
