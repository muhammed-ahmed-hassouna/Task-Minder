import { ToastContainer } from "react-toastify";

export default function ToastifyProvider({ children }) {
  return (
    <>
      {children}
      <ToastContainer
        richColors
        position='top-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}