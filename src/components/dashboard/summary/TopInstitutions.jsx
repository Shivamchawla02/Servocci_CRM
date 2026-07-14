import {

ArrowUp,
ArrowDown

} from "lucide-react";

const institutions=[

{

name:"Lambton College",

country:"Canada",

applications:24,

growth:18

},

{

name:"Conestoga College",

country:"Canada",

applications:18,

growth:12

},

{

name:"Sheridan College",

country:"Canada",

applications:15,

growth:9

},

{

name:"Humber College",

country:"Canada",

applications:12,

growth:6

},

{

name:"Seneca College",

country:"Canada",

growth:-3,

applications:10

}

];

export default function TopInstitutions(){

return(

<div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 h-full">

<div className="flex justify-between items-center">

<h2 className="font-semibold text-lg">

Top Institutions

</h2>

<button className="text-sm text-[#D4A64A]">

View All

</button>

</div>

<div className="mt-6 space-y-5">

{institutions.map((college)=>(

<div

key={college.name}

className="flex justify-between"

>

<div>

<h3 className="font-medium">

{college.name}

</h3>

<p className="text-sm text-gray-500">

{college.applications} Applications

</p>

</div>

<div
className={`flex items-center gap-1 ${
college.growth>0
? "text-green-600"
:"text-red-500"
}`}

>

{college.growth>0
?<ArrowUp size={15}/>
:<ArrowDown size={15}/>
}

{Math.abs(college.growth)}%

</div>

</div>

))}

</div>

</div>

);

}