import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

interface Data {
    data: any[]
}

export const Notes: React.FC<Data> = ({ data }) => {
    const [note, setNote] = useState<any>({})
    const [isModalVisible, setIsModalVisible] = useState<Boolean>(false)

    const openModal = () => {
        setIsModalVisible(true)
    }

    const closeModal = () => {
        setIsModalVisible(false)
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const data_temp: any = data;
        data_temp[e.target.name] = e.target.value;
        setNote(data_temp)
    }

    const onSubmit = async () => {

        try {
            console.log(data)
            Swal.fire("Enviando Datos");
            Swal.showLoading();
            await axios.post("http://localhost:5000/users/add", data)
            Swal.fire("Si funciona el register", "funciono", "success")
        } catch (err: any) {
            Swal.fire("Error al iniciar sesion", err.response.data.msg, "error")
        }
    }

    const cards = data.map((note) => (
        <div
            key={note._id.$oid}
            className="p-5 bg-white rounded-lg shadow-md w-full max-w-md my-6 space-y-3 transition-all duration-150 hover:bg-gray-100"
        >
            {/* {note._id} */}
            <h4 className="font-semibold text-moradobajo">{note.title}</h4>
            <p className="text-sm text-gray-600">{note.content}</p>
            <p className="text-sm text-gray-400">
                Programada: {new Date(note.date_pro).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-400">
                Fecha límite: {new Date(note.deadline).toLocaleDateString()}
            </p>
            {(() => {
                switch (note.status) {
                    case 'done':
                        return <div className="w-[30%] text-xs p-1 text-center rounded-xl text-white font-semibold bg-green-500">Done</div>;
                    case 'pending':
                        return <div className="w-[30%] text-xs p-1 text-center rounded-xl text-white font-semibold bg-yellow-500">Pending</div>;
                    case 'in-progress':
                        return <div className="w-[30%] text-xs p-1 text-center rounded-xl text-white font-semibold bg-blue-500">In Progress</div>;
                    default:
                        return <div className="w-[30%] text-xs p-1 text-center rounded-xl text-white font-semibold bg-gray-500">No Status</div>;
                }
            })()}
        </div>
    ));

    return (
        <>
            <div className="w-full grid place-items-center px-10">
                {cards}
                <button onClick={() => openModal()} className="absolute bottom-5 right-5 z-10 mb-[100px] bg-morado rounded-full p-2 w-[50px] h-[50px] hover:bg-moradobajo transition-all duration-150"><i className='bx bx-plus text-3xl font-bold text-white' ></i></button>
            </div>
            {isModalVisible && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-10 z-50 min-h-screen">
                    <div className="h-[80vh] bg-white flex flex-col justify-center place-items-center w-full space-y-6 rounded-xl relative">
                        {/* Botón de cierre */}
                        <button
                            className="absolute top-4 right-4 font-bold text-3xl text-black"
                            onClick={closeModal}
                        >
                            &times;
                        </button>

                        {/* Contenido del formulario */}
                        <h1 className="text-xl font-bold text-morado">Crear Nota</h1>
                        <p>Ingresa la información de tu nota:</p>
                        <label className="w-[60%] h-[40px] input input-bordered flex bg-gray-200 items-center gap-3">
                            <i className='bx bxs-edit text-morado'></i>
                            <input
                                onChange={(e) => onChange}
                                name="title"
                                type="text"
                                className="grow text-gray-700"
                                placeholder="Título"
                            />
                        </label>
                        <label className="w-[60%] h-[40px] input input-bordered flex bg-gray-200 items-center gap-3">
                            <i className='bx bxs-file text-morado'></i>
                            <input
                                type="text"
                                onChange={(e) => onChange}
                                name="content"
                                className="grow text-gray-700 resize-none"
                                placeholder="Contenido"
                            />
                        </label>
                        <label className="w-[90%] h-[40px] input input-bordered flex bg-gray-200 items-center gap-3">
                            <i className='bx bxs-calendar text-morado'></i>
                            <input
                                onChange={(e) => onChange}
                                name="deadline"
                                type="datetime-local"
                                className="grow text-gray-700"
                                placeholder="Fecha límite"
                            />
                        </label>
                        <button
                            onClick={onSubmit}
                            className="btn border-0 bg-morado text-white font-bold w-[50%] mt-8 hover:bg-moradobajo"
                        >
                            Crear Nota
                        </button>
                    </div>
                </div>
            )}

        </>
    )
};