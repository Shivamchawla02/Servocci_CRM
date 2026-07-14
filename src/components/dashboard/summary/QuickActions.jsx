import {
    UserPlus,
    FilePlus2,
    CalendarPlus,
    GraduationCap,
    ChevronRight
} from "lucide-react";

const actions = [

    {
        icon: UserPlus,
        title: "Add New Lead",
        subtitle: "Capture a potential student",
        bg: "#FFF4E7"
    },

    {
        icon: FilePlus2,
        title: "New Application",
        subtitle: "Start an application",
        bg: "#F5EEFF"
    },

    {
        icon: CalendarPlus,
        title: "Add Follow-up",
        subtitle: "Schedule a follow-up",
        bg: "#EEF5FF"
    },

    {
        icon: GraduationCap,
        title: "Add Student",
        subtitle: "Create student profile",
        bg: "#F1FFF6"
    }

];

export default function QuickActions() {

    return (

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

            <h2 className="text-xl font-semibold">

                Quick Actions

            </h2>

            <div className="mt-6 space-y-4">

                {actions.map(action => {

                    const Icon = action.icon;

                    return (

                        <button
                            key={action.title}
                            className="w-full flex items-center justify-between group"
                        >

                            <div className="flex gap-4 items-center">

                                <div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                                    style={{
                                        background: action.bg
                                    }}
                                >

                                    <Icon
                                        size={20}
                                        color="#D4A64A"
                                    />

                                </div>

                                <div className="text-left">

                                    <h3 className="font-medium">

                                        {action.title}

                                    </h3>

                                    <p className="text-sm text-gray-500">

                                        {action.subtitle}

                                    </p>

                                </div>

                            </div>

                            <ChevronRight
                                size={18}
                                className="text-gray-400 group-hover:translate-x-1 transition"
                            />

                        </button>

                    );

                })}

            </div>

        </div>

    );

}