import {
    ChevronDown,
    MoreVertical
} from "lucide-react";

const stages = [

    {
        title: "New Leads",
        value: 217,
        color: "#FFF7E6"
    },

    {
        title: "Contacted",
        value: 156,
        color: "#EEF5FF"
    },

    {
        title: "In Progress",
        value: 189,
        color: "#F7F0FF"
    },

    {
        title: "Applied",
        value: 134,
        color: "#F3F6F9"
    },

    {
        title: "Admitted",
        value: 192,
        color: "#F1FFF6"
    },

    {
        title: "Closed",
        value: 98,
        color: "#FAFAFA"
    },

    {
        title: "Rejected",
        value: 47,
        color: "#FFF2F2"
    }

];

export default function PipelineSection() {

    return (

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">

            <div className="flex justify-between items-center px-6 py-5 border-b">

                <div>

                    <h2 className="font-semibold text-xl">

                        Application Pipeline

                    </h2>

                    <p className="text-gray-500 text-sm mt-1">

                        Track every lead from enquiry to admission

                    </p>

                </div>

                <div className="flex gap-3">

                    <button className="border rounded-lg px-4 py-2 text-sm flex items-center gap-2">

                        All Institutions

                        <ChevronDown size={16}/>

                    </button>

                    <button className="border rounded-lg px-4 py-2 text-sm flex items-center gap-2">

                        This Month

                        <ChevronDown size={16}/>

                    </button>

                    <button className="w-10 h-10 rounded-lg border flex items-center justify-center">

                        <MoreVertical size={18}/>

                    </button>

                </div>

            </div>

            <div className="p-6">

                <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">

                    {stages.map(stage => (

                        <div
                            key={stage.title}
                            className="rounded-xl p-4"
                            style={{
                                background: stage.color
                            }}
                        >

                            <p className="text-xs text-gray-500">

                                {stage.title}

                            </p>

                            <h2 className="text-3xl font-bold mt-2">

                                {stage.value}

                            </h2>

                            <p className="text-sm text-gray-500 mt-2">

                                12%

                            </p>

                        </div>

                    ))}

                </div>

                {/* Decorative pipeline */}

                <div className="relative mt-8 h-32 overflow-hidden">

                    <svg
                        viewBox="0 0 1000 180"
                        className="w-full h-full"
                        preserveAspectRatio="none"
                    >

                        <path
                            d="M0 70 C150 20 250 120 400 70 S700 120 1000 60"
                            fill="none"
                            stroke="#E7C36B"
                            strokeWidth="22"
                            strokeOpacity=".35"
                            strokeLinecap="round"
                        />

                        <path
                            d="M0 120 C180 160 300 60 500 110 S760 80 1000 130"
                            fill="none"
                            stroke="#E7C36B"
                            strokeWidth="16"
                            strokeOpacity=".22"
                            strokeLinecap="round"
                        />

                    </svg>

                </div>

            </div>

        </div>

    );

}