import {
  Search,
  Bell,
  Calendar,
  Plus,
  Menu
} from "lucide-react";

export default function DashboardHeader() {

  return (

    <>

      {/* Top Navbar */}

      <div className="flex items-center justify-between">

        <button className="p-2 rounded-xl hover:bg-white">
          <Menu size={22}/>
        </button>

        <div className="relative w-[430px] hidden lg:block">

          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />

          <input
            placeholder="Search anything..."
            className="
              w-full
              rounded-xl
              border
              border-gray-200
              bg-white
              py-3
              pl-11
              pr-4
              outline-none
              focus:ring-2
              focus:ring-[#D4A64A]
            "
          />

        </div>

        <div className="flex items-center gap-5">

          <button className="relative">

            <Bell size={20}/>

            <span className="
              absolute
              -top-1
              -right-1
              w-4
              h-4
              rounded-full
              bg-black
              text-white
              text-[9px]
              flex
              items-center
              justify-center
            ">
              2
            </span>

          </button>

          <div className="w-px h-8 bg-gray-300"/>

          <div className="flex items-center gap-2">

            <div className="
              w-9
              h-9
              rounded-full
              bg-[#D4A64A]
            "/>

            <div>

              <p className="font-semibold">
                Servocci
              </p>

              <p className="text-xs text-gray-500">
                CRM
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Welcome */}

      <div className="mt-9 flex justify-between items-start">

        <div>

          <h1 className="text-4xl font-bold text-[#111]">

            Welcome back, Shivam! 👋

          </h1>

          <p className="mt-2 text-gray-500">

            Here's what's happening with your applications today.

          </p>

        </div>

        <div className="flex items-center gap-4">

          <button
            className="
              bg-black
              text-white
              rounded-xl
              px-5
              py-3
              flex
              items-center
              gap-2
              hover:bg-[#111]
            "
          >
            <Plus size={18}/>
            Add New
          </button>

          <button
            className="
              rounded-xl
              border
              border-gray-200
              bg-white
              px-5
              py-3
              flex
              items-center
              gap-3
            "
          >

            May 20 - May 27

            <Calendar size={17}/>

          </button>

        </div>

      </div>

    </>

  );
}