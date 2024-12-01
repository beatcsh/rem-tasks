import { useState } from "react";
import Calendar from 'react-calendar';

interface Data {
    data: any[]
}

export const Dates: React.FC<Data> = ({ data }) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

    // funcion que cambia la fecha elegida
    const handleDateChange = (date: Date) => setSelectedDate(date);

    // filtro de notas para el dia seleccionado
    const tasksForSelectedDate = data.filter((note: any) =>
        new Date(note.deadline).toDateString() === selectedDate?.toDateString()
    );

    // esta funcion me permite ponerle un pin a los dias que si tienen notas
    const pinDates = ({ date, view }: { date: Date; view: string }) => {
        if (view === 'month') {
            const formattedDate = date.toISOString().split('T')[0];
            const hasTask = data.some(
                (note: any) => new Date(note.deadline).toISOString().split('T')[0] === formattedDate
            );
            return hasTask ? (
                <div className="w-full h-full flex items-center justify-center">
                    <i className='bx bxs-pin text-morado text-xl' ></i>
                </div>
            ) : null;
        }
        return null;
    };

    return (
        <>
            <h2 className="text-xl font-semibold text-morado">Actividades programadas</h2>
            <Calendar
                onClickDay={handleDateChange}
                value={selectedDate}
                tileContent={pinDates}
                className="mx-6 text-gray-700 rounded-lg shadow-lg p-8"
            />
            <div className="mt-6 text-center">
                <h3 className="text-lg font-medium text-gray-700">
                    Tareas para {selectedDate?.toDateString()}
                </h3>
                {tasksForSelectedDate.length > 0 ? (
                    tasksForSelectedDate.map((note: any) => (
                        <div
                            key={note._id.$oid}
                            className="p-5 bg-white rounded-lg shadow-md w-full max-w-md my-6 space-y-3 transition-all duration-150 hover:bg-gray-100"
                        >
                            {/* {note._id} */}
                            {(() => {
                                switch (note.status) {
                                    case 'done':
                                        return <div className="w-[10%] p-1 rounded-full text-white font-semibold bg-green-500"></div>;
                                    case 'pending':
                                        return <div className="w-[10%] p-1 rounded-full text-white font-semibold bg-yellow-500"></div>;
                                    case 'in-progress':
                                        return <div className="w-[10%] p-1 rounded-full text-white font-semibold bg-blue-500"></div>;
                                    default:
                                        return <div className="w-[10%] p-1 rounded-full text-white font-semibold bg-gray-500">No Status</div>;
                                }
                            })()}
                            <h4 className="font-semibold text-moradobajo">{note.title}</h4>
                            <p className="text-sm text-gray-600">{note.content}</p>
                            <p className="text-sm text-gray-400">
                                Programada: {new Date(note.date_pro).toLocaleDateString()}
                            </p>
                            <p className="text-sm text-gray-400">
                                Fecha límite: {new Date(note.deadline).toLocaleDateString()}
                            </p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-700 mt-2 animate-pulse">No hay tareas para esta fecha.</p>
                )}
            </div>
        </>
    )
};