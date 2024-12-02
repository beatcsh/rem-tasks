import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import Swal from "sweetalert2";
import axios from "axios";

interface Note {
    _id:string
    title: string,
    content: string,
    status: string,
    date_pro: Date,
    deadline: Date,
    id_category: string,
    id_user: string
}

interface EditNoteProps {
    note: Note;
}

interface IStatus {
    label: string,
    value: string
}

export const EditNote: React.FC<EditNoteProps> = ({ note }) => {
    const [noteState, setNoteState] = useState<Note>(note)
    const [clickedStatus, setClickStatus] = useState(null)
    const [categories, setCategories] = useState<any>([]);
    const history = useHistory()

    const itemsStatus = [
        {label:'Pendiente',value:'pending'},
        {label:'En proceso',value:'in-progress'},
        {label:'Terminado',value:'done'}
    ]

    const handleClickStatus = (index:any, status: IStatus) => {
        setClickStatus(index)
        setNoteState((prevData) => ({
            ...prevData, status: status.value
        }))
        console.log(noteState)
    }

    // // peticion de notas
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get("http://localhost:5000/categs/all");
    //             setCategories(response.data);
    //             console.log(categories)
    //         } catch (err: any) {
    //             Swal.fire("Error", "No pude traer las notas", "error");
    //         }
    //     };
    //     fetchData();
    // }, []);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const data_temp: any = note;
        data_temp[e.target.name] = e.target.value;
        setNoteState(data_temp)
        console.log(note)
    }

    const onSubmit = async () => {
        const id_note = noteState._id;
        try {
            console.log(note)
            Swal.fire("Enviando Datos");
            Swal.showLoading();
            const response = await axios.put(`http://localhost:5000/notes/upd?_id=${id_note}`,noteState)
            history.push('/home')
            Swal.fire("Si funciona el register", response.data.msg, "success")
        } catch (err: any) {
            Swal.fire("Error al guardar la nota, intentalo mas tarde", err.response.data.msg, "error")
        }
    }

    return (
        <>
            <div className="w-full max-w-lg bg-white flex flex-col justify-center items-center p-6 space-y-6 rounded-xl">
                {/* Botón de cierre */}
                <button
                    className="absolute top-4 right-4 font-bold text-3xl text-black"
                // onClick={closeModal}
                >
                    &times;
                </button>

                {/* Contenido del formulario */}
                <h1 className="text-xl font-bold text-morado">Hay novedades?</h1>
                <p>Edita la información de tu nota:</p>
                <label className="w-[60%] h-[40px] input input-bordered flex bg-gray-200 items-center gap-3">
                    <i className='bx bxs-edit text-morado'></i>
                    <input
                        onChange={onChange}
                        name="title"
                        type="text"
                        className="grow text-gray-700"
                        placeholder={noteState.title}
                    />
                </label>
                <label className="w-[60%] h-[40px] input input-bordered flex bg-gray-200 items-center gap-3">
                    <i className='bx bxs-file text-morado'></i>
                    <input
                        type="text"
                        onChange={onChange}
                        name="content"
                        className="grow text-gray-700 resize-none w-[50%]"
                        placeholder={noteState.content}
                    />
                </label>
                <div className="grid grid-cols-3 gap-2">
                    {itemsStatus.map((item, index) => (
                        <button onClick={() => handleClickStatus(index, item)} className={`bg-moradobajo text-sm p-2 rounded-xl text-white ${clickedStatus === index ? "opacity-50" : ""}`}>{item.label}</button>
                    ))}
                </div>
                {/* <label className="w-[60%] input input-bordered flex bg-gray-200 items-center gap-3">
                    <i className='bx bx-category text-morado'></i>
                    <select
                        onChange={(e) => setNoteState({
                            ...note,
                            id_category: e.target.value,
                        })}
                        name="id_category"
                        className="grow bg-transparent text-gray-700 w-[50%]"
                    >
                        <option value="" disabled>
                            Selecciona una categoría
                        </option>
                        {categories.map((category: any) => (
                            <option key={category._id} value={category._id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </label> */}
                <p>Cambiaste la fecha?</p>
                <label className="w-[90%] h-[40px] input input-bordered flex bg-gray-200 items-center gap-3">
                    <i className='bx bxs-calendar text-morado'></i>
                    <input
                        onChange={onChange}
                        name="deadline"
                        type="datetime-local"
                        className="grow text-gray-700"
                        placeholder="Fecha límite"
                    />
                </label>
                <div className="w-full grid grid-cols-2 gap-2 place-items-center">
                    <a
                        href="/home"
                        className="btn border-0 bg-morado text-white font-bold w-[80%] mt-8 hover:bg-moradobajo"
                    >
                        Cancelar
                    </a>
                    <button
                        onClick={onSubmit}
                        className="btn border-0 bg-morado text-white font-bold w-[80%] mt-8 hover:bg-moradobajo"
                    >
                        Guardar Cambios
                    </button>
                </div>
            </div>
        </>
    )
}