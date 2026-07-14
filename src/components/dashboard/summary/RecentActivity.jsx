import {

UserPlus,

FileCheck,

Phone,

GraduationCap

} from "lucide-react";

const activities=[

{

icon:UserPlus,

title:"New Lead Assigned",

time:"5 mins ago"

},

{

icon:Phone,

title:"Follow-up Completed",

time:"18 mins ago"

},

{

icon:FileCheck,

title:"Documents Uploaded",

time:"42 mins ago"

},

{

icon:GraduationCap,

title:"Admission Confirmed",

time:"1 hour ago"

},

{

icon:UserPlus,

title:"New Counsellor Added",

time:"2 hours ago"

}

];

export default function RecentActivity(){

return(

<div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">

<h2 className="font-semibold text-xl">

Recent Activity

</h2>

<div className="mt-6 space-y-5">

{activities.map((item,index)=>{

const Icon=item.icon;

return(

<div

key={index}

className="flex gap-4"

>

<div className="w-10 h-10 rounded-xl bg-[#FFF7E8] flex items-center justify-center">

<Icon
size={18}
className="text-[#D4A64A]"
/>

</div>

<div>

<h3 className="font-medium">

{item.title}

</h3>

<p className="text-sm text-gray-500 mt-1">

{item.time}

</p>

</div>

</div>

);

})}

</div>

</div>

);

}