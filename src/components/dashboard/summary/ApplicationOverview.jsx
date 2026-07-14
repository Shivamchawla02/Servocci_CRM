import {

LineChart,
Line,
XAxis,
YAxis,
ResponsiveContainer,
Tooltip

} from "recharts";

const data=[

{month:"Jan",applications:70},
{month:"Feb",applications:120},
{month:"Mar",applications:115},
{month:"Apr",applications:152},
{month:"May",applications:124},
{month:"Jun",applications:168}

];

export default function ApplicationOverview(){

return(

<div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm h-full">

<div className="flex justify-between">

<h2 className="font-semibold text-lg">

Application Overview

</h2>

<select className="border rounded-lg px-3 py-2 text-sm">

<option>This Year</option>

</select>

</div>

<div className="h-72 mt-6">

<ResponsiveContainer>

<LineChart data={data}>

<XAxis dataKey="month"/>

<YAxis/>

<Tooltip/>

<Line

type="monotone"

dataKey="applications"

stroke="#D4A64A"

strokeWidth={3}

dot={{

r:5

}}

/>

</LineChart>

</ResponsiveContainer>

</div>

</div>

);

}