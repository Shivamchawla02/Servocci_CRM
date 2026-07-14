import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer
} from "recharts";

const data = [

    { name: "Canada", value: 62 },
    { name: "Australia", value: 18 },
    { name: "UK", value: 10 },
    { name: "USA", value: 5 },
    { name: "Others", value: 5 }

];

const COLORS = [

    "#111111",
    "#D4A64A",
    "#6B7280",
    "#CFCFCF",
    "#ECECEC"

];

export default function CountryChart() {

    return (

        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm h-full">

            <h2 className="font-semibold text-lg">

                Applications by Country

            </h2>

            <div className="h-60 mt-4">

                <ResponsiveContainer>

                    <PieChart>

                        <Pie

                            data={data}

                            innerRadius={50}

                            outerRadius={80}

                            dataKey="value"

                        >

                            {data.map((entry, index)=>(

                                <Cell
                                    key={index}
                                    fill={COLORS[index]}
                                />

                            ))}

                        </Pie>

                    </PieChart>

                </ResponsiveContainer>

            </div>

            <div className="space-y-3">

                {data.map((item,index)=>(

                    <div
                        key={item.name}
                        className="flex justify-between text-sm"
                    >

                        <div className="flex gap-2 items-center">

                            <div
                                className="w-3 h-3 rounded-full"
                                style={{
                                    background:COLORS[index]
                                }}
                            />

                            {item.name}

                        </div>

                        <span>{item.value}%</span>

                    </div>

                ))}

            </div>

        </div>

    );

}