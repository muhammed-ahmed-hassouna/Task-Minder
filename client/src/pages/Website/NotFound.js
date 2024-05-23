import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className='bg-white dark:bg-gray-900 '>
      <div className='container mx-auto flex min-h-screen items-center px-6 py-12'>
        <div className='mx-auto flex max-w-sm flex-col items-center text-center'>
          <p className='text-primary rounded-full bg-blue-50 p-3 text-sm font-medium dark:bg-gray-800'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke-width='2'
              stroke='currentColor'
              className='h-6 w-6'
            >
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                d='M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z'
              />
            </svg>
          </p>
          <h1 className='mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl'>
            This page does not exist
          </h1>
          <p className='mt-4 text-gray-500 dark:text-gray-400'>
            The page you are looking for does not exist. Please check the
            address
          </p>

          <div className='mt-6 flex w-full shrink-0 items-center gap-x-3 sm:w-auto'>
            <Link
              to={"/"}
              className='bg-primary hover:bg-buttonFocus dark:hover:bg-primary dark:bg-buttonFocus w-1/2 shrink-0 rounded-lg px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 sm:w-auto'
            >
              Go to the home page
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
