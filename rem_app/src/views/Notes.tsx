import axios from "axios";
import Swal from "sweetalert2";

interface Data {
    data: any[],
    setCurrentView: React.Dispatch<React.SetStateAction<'Dates' | 'Notes' | 'User' | 'CreateNote' | 'EditNote'>>,
    setSelectedNote: React.Dispatch<React.SetStateAction<any>>
}

export const Notes: React.FC<Data> = ({ data, setCurrentView, setSelectedNote }) => {

    const deleteNote = async (_id: string) => {
        console.log({ _id });

        // Mostrar el mensaje de confirmación
        const result = await Swal.fire({
            title: "¿Estás seguro de eliminar la nota?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        });

        if (result.isConfirmed) {
            try {
                // Enviar la solicitud DELETE con el _id como query parameter
                const response = await axios.delete(`http://localhost:5000/notes/del?_id=${_id}`);

                Swal.fire("Nota eliminada", response.data.msg, "success");
            } catch (err: any) {
                console.error(err);
                Swal.fire("Error", "No se pudo eliminar la nota", "error");
            }
        } else {
            console.log("Cancelado");
        }
    };


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
            <p className="w-[60%] space-x-6">
                <button onClick={() => {
                    setCurrentView('EditNote');
                    setSelectedNote(note)
                }}><i className='bx bxs-edit text-xl text-morado hover:text-moradobajo' ></i></button>
                <button onClick={() => deleteNote(note._id)}><i className='bx bx-trash-alt text-xl text-morado hover:text-moradobajo' ></i></button>
            </p>
        </div>
    ));

    return (
        <>
            <div className="w-full grid place-items-center px-10">
                {cards}
            </div>
        </>
    )
};