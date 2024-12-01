interface Data {
    data: any[]
}

export const Notes: React.FC<Data> = ({ data }) => {

    const cards = data.map((note) => (
        <div
            key={note._id.$oid}
            className="p-5 bg-white rounded-lg shadow-md w-full max-w-md my-6 space-y-3 transition-all duration-150 hover:bg-gray-100"
        >
            {note._id}
            <h4 className="font-semibold text-moradobajo">{note.title}</h4>
            <p className="text-sm text-gray-600">{note.content}</p>
            <p className="text-sm text-gray-400">
                Programada: {new Date(note.date_pro).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-400">
                Fecha límite: {new Date(note.deadline).toLocaleDateString()}
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