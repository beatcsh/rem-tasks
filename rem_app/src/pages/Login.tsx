import { useState } from "react";
import { useHistory } from "react-router";
import Swal from "sweetalert2";
import axios from "axios";

const Login: React.FC = () => {
    const [data, setData] = useState({}); // Estado para los datos del formulario
    const history = useHistory();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setData({ ...data, [e.target.name]: e.target.value }); // Actualiza los datos del formulario
    };

    const onSubmit = async () => {
        try {
            Swal.fire("Enviando Datos");
            Swal.showLoading();

            // Enviar los datos de inicio de sesión al servidor
            const response = await axios.post("http://localhost:5000/users/login", data);

            // Mostrar éxito al usuario
            Swal.fire("Inicio de Sesión Exitoso", "Bienvenido de nuevo", "success");

            const authToken = response.data.token;

            // Guardar el token en el localStorage
            localStorage.setItem("authToken", authToken);

            // Redirigir al componente `Home` con el token
            history.push("/home", { token: authToken });
        } catch (err: any) {
            // Manejo de errores
            Swal.fire("Error al iniciar sesión", err.response?.data?.msg || "Algo salió mal", "error");
        }
    };

    return (
        <>
            <div className="h-[100vh] bg-white flex flex-col justify-center place-items-center w-full space-y-6">
                {/* Logo */}
                <img src="../assets/logo_no_bg.png" className="w-[50%]" alt="Logo" />

                {/* Email Input */}
                <label className="input input-bordered flex bg-gray-200 items-center gap-3">
                    <i className="bx bxs-envelope text-morado"></i>
                    <input
                        onChange={onChange}
                        name="email"
                        type="text"
                        className="grow text-gray-700"
                        placeholder="Email"
                    />
                </label>

                {/* Password Input */}
                <label className="input input-bordered flex bg-gray-200 items-center gap-3">
                    <i className="bx bxs-key text-morado"></i>
                    <input
                        onChange={onChange}
                        name="pass"
                        type="password"
                        placeholder="Password"
                        className="grow text-gray-700"
                    />
                </label>

                {/* Submit Button */}
                <button
                    onClick={onSubmit}
                    className="btn border-0 bg-morado text-white font-bold w-[50%] mt-8 hover:bg-moradobajo"
                >
                    Entrar
                </button>

                {/* Register Link */}
                <div className="grid place-items-center">
                    <p className="font-semibold text-sm">
                        ¿No tienes una cuenta?{" "}
                        <a href="/register" className="text-morado hover:text-moradobajo">
                            Regístrate
                        </a>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Login;
