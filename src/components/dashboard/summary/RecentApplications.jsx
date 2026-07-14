
import {
    MoreHorizontal,
    Eye
} from "lucide-react";

const applications = [

{
name:"Rahul Sharma",
institution:"Conestoga College",
course:"Computer Science",
status:"Applied",
date:"20 Jun"
},

{
name:"Ananya Gupta",
institution:"Sheridan College",
course:"Business",
status:"Documentation",
date:"21 Jun"
},

{
name:"Arjun Mehta",
institution:"Lambton College",
course:"AI & Data",
status:"Approved",
date:"22 Jun"
},

{
name:"Priya Kapoor",
institution:"Seneca College",
course:"Nursing",
status:"Follow-up",
date:"22 Jun"
},

{
name:"Rohan Singh",
institution:"Humber College",
course:"Engineering",
status:"Rejected",
date:"23 Jun"
}

];

const badge = {

Applied:"bg-yellow-100 text-yellow-700",

Documentation:"bg-blue-100 text-blue-700",

Approved:"bg-green-100 text-green-700",

"Follow-up":"bg-purple-100 text-purple-700",

Rejected:"bg-red-100 text-red-700"

};

export default function RecentApplications(){

return(

<div className="bg-white border border-gray-200 rounded-2xl shadow-sm">

<div className="flex justify-between items-center px-6 py-5 border-b">

<div>

<h2 className="text-xl font-semibold">

Recent Applications

</h2>

<p className="text-gray-500 text-sm mt-1">

Latest student applications

</p>

</div>

<button className="text-[#D4A64A]">

View All

</button>

</div>

<div className="overflow-x-auto">

<table className="w-full">

<thead>

<tr className="text-left text-gray-500 text-sm border-b">

<th className="px-6 py-4">Student</th>

<th>Institution</th>

<th>Course</th>

<th>Status</th>

<th>Date</th>

<th></th>

</tr>

</thead>

<tbody>

{applications.map((item,index)=>(

<tr
key={index}
className="border-b last:border-none hover:bg-gray-50 transition"
>

<td className="px-6 py-5">

<div className="flex items-center gap-3">

<div className="w-10 h-10 rounded-full bg-[#D4A64A] flex items-center justify-center text-white font-semibold">

{item.name.charAt(0)}

</div>

<div>

<p className="font-medium">

{item.name}

</p>

</div>

</div>

</td>

<td>{item.institution}</td>

<td>{item.course}</td>

<td>

<span className={`px-3 py-1 rounded-full text-xs font-medium ${badge[item.status]}`}>

{item.status}

</span>

</td>

<td>{item.date}</td>

<td>

<button>

<Eye size={18}/>

</button>

</td>

</tr>

))}

</tbody>

</table>

</div>

</div>

);

}