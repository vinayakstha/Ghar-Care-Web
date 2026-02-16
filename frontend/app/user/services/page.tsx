// "use client";

import CategoryPage from "./_components/CategoryPage";

// import CategoryCard from "./_components/CategoryCard";

// export default function Page() {
//   return (
//     <div className="w-full p-4 md:p-6 min-h-screen">
//       {/* PAGE TITLE */}
//       <h1 className="text-lg font-semibold text-gray-700">Categories</h1>

//       {/* CATEGORY SECTION */}
//       <div className="bg-white p-4 md:p-6">
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
//           <CategoryCard
//             name="Plumbing"
//             image="/images/abt.jpg"
//             onClick={() => console.log("Plumbing clicked")}
//           />

//           <CategoryCard
//             name="Electrical"
//             image="/images/abt.jpg"
//             onClick={() => console.log("Electrical clicked")}
//           />

//           <CategoryCard
//             name="Cleaning"
//             image="/images/abt.jpg"
//             onClick={() => console.log("Cleaning clicked")}
//           />

//           <CategoryCard
//             name="Painting"
//             image="/images/abt.jpg"
//             onClick={() => console.log("Painting clicked")}
//           />

//           <CategoryCard
//             name="Carpentry"
//             image="/images/abt.jpg"
//             onClick={() => console.log("Carpentry clicked")}
//           />

//           <CategoryCard
//             name="AC Repair"
//             image="/images/abt.jpg"
//             onClick={() => console.log("AC Repair clicked")}
//           />
//           <CategoryCard
//             name="AC Repair"
//             image="/images/abt.jpg"
//             onClick={() => console.log("AC Repair clicked")}
//           />
//           <CategoryCard
//             name="AC Repair"
//             image="/images/abt.jpg"
//             onClick={() => console.log("AC Repair clicked")}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

export default function Page() {
  return (
    <div>
      <CategoryPage />
    </div>
  );
}
