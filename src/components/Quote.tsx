// import { useQuote } from "../hooks/useQuote";

// export default function Quote() {
//   const { quote, loading, fetchQuote } = useQuote();

//   return (
//     <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-center">
//       {loading ? (
//         <p>Loading quote...</p>
//       ) : (
//         <>
//           <p className="text-lg italic">"{quote?.content}"</p>
//           <p className="mt-2 text-sm text-gray-500">— {quote?.author}</p>
//           <button
//             onClick={fetchQuote}
//             className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
//           >
//             New Quote
//           </button>
//         </>
//       )}
//     </div>
//   );
// }
