/**
 * REUSABLE COMPONENT: DeleteConfirmationModal
 * Copy this function into your Next.js project.
 * * Props:
 * - isOpen (boolean): Controls visibility
 * - onClose (function): Handler to close modal
 * - onConfirm (function): Handler for the delete action
 *
 *
 */
import { createPortal } from "react-dom";

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
}: ConfirmationModalProps) => {
  return isOpen
    ? createPortal(
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 transition-opacity duration-300 ease-out ${
            isOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop with Blur */}
          <div
            className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal Panel */}
          <div
            className={`relative w-full max-w-sm sm:max-w-md md:max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 cubic-bezier(0.34, 1.56, 0.64, 1) ${
              isOpen
                ? "scale-100 translate-y-0 opacity-100"
                : "scale-95 translate-y-4 opacity-0"
            }`}
          >
            {/* Decorative Top Strip (Red Gradient) */}
            <div className="h-2 w-full bg-linear-to-r from-red-500 to-red-600" />

            <div className="p-6 sm:p-8">
              {/* Icon Wrapper */}
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 mb-6">
                <svg
                  className="h-8 w-8 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                  />
                </svg>
              </div>

              {/* Text Content */}
              <div className="text-center">
                <h3
                  className="text-xl font-bold text-gray-900 mb-2"
                  id="modal-title"
                >
                  Delete entire conversation?
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Are you sure you want to delete this chat? This action
                    cannot be undone and all message history will be permanently
                    lost.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto sm:flex-1 inline-flex justify-center items-center rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2 transition-colors duration-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={onConfirm}
                  className="w-full sm:w-auto sm:flex-1 inline-flex justify-center items-center rounded-xl border border-transparent bg-red-600 px-4 py-3 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200 cursor-pointer"
                >
                  Yes, Delete Chat
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body,
      )
    : null;
};

export default ConfirmationModal;

type ConfirmationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

// --- DEMO APPLICATION ---
// This part simulates a Next.js Page using the component above

// export default function App() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [status, setStatus] = useState("");

//   const handleDelete = () => {
//     setStatus("Deleting...");

//     // Simulate API call
//     setTimeout(() => {
//       setIsModalOpen(false);
//       setStatus("Chat deleted successfully!");

//       // Clear status message after a few seconds
//       setTimeout(() => setStatus(""), 3000);
//     }, 1000);
//   };

//   return (
//     <div
//       className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4"
//       style={{ fontFamily: '"Ubuntu", sans-serif' }}
//     >
//       {/* Load Font Helper (In Next.js use next/font instead) */}
//       <link
//         href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap"
//         rel="stylesheet"
//       />

//       {/* Main UI Card */}
//       <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-100 text-center">
//         <div className="mb-6">
//           <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-8 w-8"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
//               />
//             </svg>
//           </div>
//           <h1 className="text-2xl font-bold text-gray-800 mb-2">
//             Chat Settings
//           </h1>
//           <p className="text-gray-500">
//             Manage your conversation history and settings here.
//           </p>
//         </div>

//         <button
//           onClick={() => setIsModalOpen(true)}
//           className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 shadow-md hover:shadow-lg"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-5 w-5 mr-2 group-hover:animate-pulse"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
//             />
//           </svg>
//           Delete Chat History
//         </button>

//         {/* Status Toast */}
//         {status && (
//           <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-lg text-sm font-medium animate-pulse">
//             {status}
//           </div>
//         )}
//       </div>

//       {/* The Reusable Component */}
//       <DeleteConfirmationModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onConfirm={handleDelete}
//       />
//     </div>
//   );
// }
