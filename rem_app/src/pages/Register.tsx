import { useState } from "react";
import { useHistory } from "react-router";
import Swal from "sweetalert2";
import axios from "axios";

interface IUser {
    email: string,
    username: string,
    pass: string,
    avatar: string
}

interface IAvatar {
    src: string,
    alt: string
}

export const Register = () => {
    const [data, setData] = useState<IUser>({
        email: "",
        username: "",
        pass: "",
        avatar: ""
    });

    const [clickedImage, setClickImage] = useState(null);
    const [confirmPass, setConfirmPass] = useState<string>("");
    const history = useHistory();

    const avatars: IAvatar[] = [
        { src: "../assets/avatars/cinna.png", alt: "cinna" },
        { src: "../assets/avatars/pchan.jpg", alt: "pulga" },
        { src: "../assets/avatars/pochi.jpg", alt: "pchan" }
    ]

    const handleClickImage = (index: any, image: IAvatar) => {
        setClickImage(index)
        setData((prevData) => ({
            ...prevData, avatar: image.src
        }))
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const data_temp: any = data;
        data_temp[e.target.name] = e.target.value;
        setData(data_temp)
    }

    const onSubmit = async () => {
        if (data.pass !== confirmPass) {
            Swal.fire("Error", "Las contraseñas no coinciden", "error");
            return;
        }

        try {
            console.log(data)
            Swal.fire("Enviando Datos");
            Swal.showLoading();
            await axios.post("http://localhost:5000/users/add", data)
            Swal.fire("Si funciona el register", "funciono", "success")
            history.push("/")
        } catch (err: any) {
            Swal.fire("Error al iniciar sesion", err.response.data.msg, "error")
        }
    }

    return (
        <>
            <div className='h-[100vh] bg-white flex flex-col justify-center place-items-center w-full space-y-6'>
                <h1 className="text-xl font-bold text-morado">Bienvenido</h1>
                <p>Ingresa tu información:</p>
                <label className="input input-bordered flex bg-gray-200 items-center gap-3">
                    <i className='bx bxs-envelope text-morado'></i>
                    <input onChange={onChange} name="email" type="text" className="grow text-gray-700" placeholder="Email" />
                </label>
                <label className="input input-bordered flex bg-gray-200 items-center gap-3">
                    <i className='bx bxs-user text-morado'></i>
                    <input onChange={onChange} name="username" type="text" className="grow text-gray-700" placeholder="Username" />
                </label>
                <label className="input input-bordered flex bg-gray-200 items-center gap-3">
                    <i className='bx bxs-key text-morado' ></i>
                    <input onChange={onChange} name="pass" type="password" placeholder="Password" className="grow text-gray-700" />
                </label>
                <label className="input input-bordered flex bg-gray-200 items-center gap-3">
                    <i className="bx bxs-key text-morado"></i>
                    <input onChange={(e) => setConfirmPass(e.target.value)} type="password" placeholder="Confirm Password" className="grow text-gray-700" />
                </label>
                <p>Elige un avatar:</p>
                <div className="grid grid-cols-3 place-items-center w-[70%]">
                    {avatars.map((image, index) => (
                        <img
                            key={index}
                            className={`w-[50%] rounded-full transition-all duration-300 ${clickedImage === index ? "opacity-50" : ""}`}
                            src={image.src}
                            alt={image.alt}
                            onClick={() => handleClickImage(index, image)}
                        />
                    ))}
                </div>
                <button
                    onClick={onSubmit}
                    className="btn border-0  bg-morado text-white font-bold w-[50%] mt-8 hover:bg-moradobajo"
                >
                    Registrarse
                </button>
            </div>
        </>
    )
}