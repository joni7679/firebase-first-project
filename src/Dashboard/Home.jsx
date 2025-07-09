function Home() {
    const cards = [
        { title: "Users", value: "1,200+" },
        { title: "Sales", value: "$34,000" },
        { title: "Visitors", value: "10,400" },
        { title: "Orders", value: "500+" },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 p-5">
            {cards.map((val, index) => (
                <div
                    key={index}
                    className="bg-gray-800 text-white rounded-2xl h-40 flex flex-col justify-center items-center shadow-md hover:shadow-xl transition-shadow duration-300"
                >
                    <p className="text-lg font-semibold mb-2">{val.title}</p>
                    <p className="text-2xl font-bold">{val.value}</p>
                </div>
            ))}
        </div>
    );
}

export default Home;
