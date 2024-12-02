import { useState, useEffect } from "react";
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

export const User = () => {
    const [user,setUser] = useState<any>({})

    useEffect(() => {
        const fetchData = async () => {
          const id_user = "6733f16935e1efce8437c8f2";
          try {
            const response = await axios.get(`http://localhost:5000/users/getUser?_id=${id_user}`);
            setUser(response.data);
          } catch (err: any) {
            Swal.fire("Error", "No pude traer tu informacion", "error");
          }
        };
        fetchData();
      }, []);

    const [data, setData] = useState<IUser>({
        email: "",
        username: "",
        pass: "",
        avatar: ""
    });

    const [clickedImage, setClickImage] = useState(null);
    const [confirmPass, setConfirmPass] = useState<string>("");

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
        console.log(data)
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const data_temp: any = data;
        data_temp[e.target.name] = e.target.value;
        setData(data_temp)
        console.log(data)
    }

    const onSubmit = async () => {
        const id_user = "6733f16935e1efce8437c8f2";

        if (data.pass !== confirmPass) {
            Swal.fire("Error", "Las contraseñas no coinciden", "error");
            return;
        }
    
        // Mostrar el mensaje de confirmación
        const result = await Swal.fire({
            title: "¿Estás seguro de editar tu información?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí",
            cancelButtonText: "No",
        });
    
        if (result.isConfirmed) {
            try {
                
                const response = await axios.put(`http://localhost:5000/users/upd?_id=${id_user}`,data);
    
                Swal.fire("Informacion guardada", response.data.msg, "success");
            } catch (err: any) {
                console.error(err);
                Swal.fire("Error", "No se pudo guardar la informacion", "error");
            }
        } else {
            console.log("Cancelado");
        }
    }

    return (
        <>
            <div className="w-full grid place-items-center px-10 space-y-4">
                <img src={user.avatar} alt="foto de perfil" className="rounded-full w-[210px] opacity-80" />
                <h1 className="text-xl font-bold text-morado">Tu información</h1>
                <p>Algo nuevo?</p>
                <label className="input input-bordered flex bg-gray-200 items-center gap-3">
                    <i className='bx bxs-envelope text-morado'></i>
                    <input onChange={onChange} name="email" type="text" className="grow text-gray-700" placeholder={user.email}/>
                </label>
                <label className="input input-bordered flex bg-gray-200 items-center gap-3">
                    <i className='bx bxs-user text-morado'></i>
                    <input onChange={onChange} name="username" type="text" className="grow text-gray-700" placeholder={user.username}/>
                </label>
                <p>Quieres cambiar tu contraseña?</p>
                <label className="input input-bordered flex bg-gray-200 items-center gap-3">
                    <i className='bx bxs-key text-morado' ></i>
                    <input onChange={onChange} name="pass" type="password" placeholder="Password" className="grow text-gray-700" />
                </label>
                <label className="input input-bordered flex bg-gray-200 items-center gap-3">
                    <i className="bx bxs-key text-morado"></i>
                    <input onChange={(e) => setConfirmPass(e.target.value)} type="password" placeholder="Confirm Password" className="grow text-gray-700" />
                </label>
                <p>Quieres cambiar tu avatar?</p>
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
                    Guardar cambios
                </button>
            </div>
        </>
    )
};