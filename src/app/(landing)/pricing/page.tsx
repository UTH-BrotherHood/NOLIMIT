export default function Pricing() {
  return (
    <div className='flex justify-center items-center min-h-screen py-12'>
      <div className='max-w-5xl px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          <div className='divide-y divide-gray-200 rounded-lg border border-gray-200 shadow-sm'>
            <div className='p-6'>
              <h2 className='text-lg font-medium text-gray-900'>
                Starter Plan
                <span className='sr-only'>Plan</span>
              </h2>

              <p className='mt-2 text-sm text-gray-700'>Get started with our basic features</p>

              <p className='mt-4'>
                <strong className='text-2xl font-bold text-gray-900'> Free </strong>
              </p>

              <a
                className='mt-4 block w-full rounded border border-black bg-black px-3 py-2 text-center text-sm font-medium text-white hover:bg-transparent hover:text-black focus:outline-none focus:ring active:text-black'
                href='#'
              >
                Get Started
              </a>
            </div>

            <div className='p-6'>
              <p className='text-sm font-medium text-gray-900'>What's included:</p>

              <ul className='mt-2 space-y-2 text-sm'>
                <li className='flex items-center gap-1'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    className='w-4 h-4 text-black'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 12.75l6 6 9-13.5' />
                  </svg>

                  <span className='text-gray-700'>Unlimited projects</span>
                </li>

                <li className='flex items-center gap-1'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    className='w-4 h-4 text-black'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 12.75l6 6 9-13.5' />
                  </svg>

                  <span className='text-gray-700'>1x Placeholder</span>
                </li>

                <li className='flex items-center gap-1'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    className='w-4 h-4 text-black'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 12.75l6 6 9-13.5' />
                  </svg>

                  <span className='text-gray-700'>Capacity management</span>
                </li>

                <li className='flex items-center gap-1'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    className='w-4 h-4 text-black'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 12.75l6 6 9-13.5' />
                  </svg>

                  <span className='text-gray-700'>Project planning</span>
                </li>

                <li className='flex items-center gap-1'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    className='w-4 h-4 text-black'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 12.75l6 6 9-13.5' />
                  </svg>

                  <span className='text-gray-700'>24/5 support</span>
                </li>
              </ul>
            </div>
          </div>

          <div className='divide-y divide-gray-200 rounded-lg border border-gray-200 shadow-sm'>
            <div className='p-6'>
              <h2 className='text-lg font-medium text-gray-900'>
                Pro
                <span className='sr-only'>Plan</span>
              </h2>

              <p className='mt-2 text-sm text-gray-700'>Coming Soon</p>

              <p className='mt-4'>
                <strong className='text-2xl font-bold text-gray-900'> - </strong>
              </p>

              <button
                className='mt-4 block w-full rounded border border-gray-300 bg-gray-300 px-3 py-2 text-center text-sm font-medium text-white cursor-not-allowed'
                disabled
              >
                Coming Soon
              </button>
            </div>

            <div className='p-6'>
              <p className='text-sm font-medium text-gray-900'>Stay tuned for more details</p>
            </div>
          </div>

          <div className='divide-y divide-gray-200 rounded-lg border border-gray-200 shadow-sm'>
            <div className='p-6'>
              <h2 className='text-lg font-medium text-gray-900'>
                Enterprise
                <span className='sr-only'>Plan</span>
              </h2>

              <p className='mt-2 text-sm text-gray-700'>Coming Soon</p>

              <p className='mt-4'>
                <strong className='text-2xl font-bold text-gray-900'> - </strong>
              </p>

              <button
                className='mt-4 block w-full rounded border border-gray-300 bg-gray-300 px-3 py-2 text-center text-sm font-medium text-white cursor-not-allowed'
                disabled
              >
                Coming Soon
              </button>
            </div>

            <div className='p-6'>
              <p className='text-sm font-medium text-gray-900'>Stay tuned for more details</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
