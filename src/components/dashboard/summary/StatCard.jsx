import {
  Users
} from "lucide-react";

export default function StatCard({

  title,
  value,
  growth

}) {

  return (

    <div
      className="
      rounded-2xl
      bg-white
      border
      border-gray-200
      p-5
      shadow-sm
      hover:shadow-md
      transition
    "
    >

      <div className="flex justify-between">

        <div>

          <p className="text-sm text-gray-500">

            {title}

          </p>

          <h2 className="text-2xl font-bold mt-2">

            {value}

          </h2>

          <p className="mt-3 text-sm text-green-600">

            ↑ {growth}

          </p>

        </div>

        <div
          className="
            w-10
            h-10
            rounded-2xl
            bg-black
            flex
            items-center
            justify-center
            text-white
          "
        >

          <Users/>

        </div>

      </div>

      <div className="
        mt-4
        h-10
        rounded-xl
        bg-gradient-to-r
        from-transparent
        via-[#f8ecd2]
        to-transparent
      "/>

    </div>

  );

}