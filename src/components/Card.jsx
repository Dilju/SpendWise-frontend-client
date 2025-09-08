export const Card = ({title, value}) => {
    return(
        <div className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center">
            <h3 className="text-lg font-semibold text-gray-600">{title}</h3>
            <p className="text-2xl font-bold text-indigo-600 mt-2">{value}</p>
        </div>
    )
}