export default function FallBack() {
  return (
    <div className='bg-[#f5f5f5] py-5'>
      <div className='container'>
        <div className='h-4 mt-5'></div>
        <section className='flex mt-5 bg-white rounded-md shadow-sm'>
          <figure className='flex-shrink-0 w-[480px] p-[0.9375rem] flex-col'>
            <div className='flex flex-col'>
              <div className='relative w-full pt-[100%] '>
                <div className='absolute top-0 left-0 w-full h-full bg-white flex items-center justify-center'>
                  <div className='size-[7.5rem] w-full max-h-full'>
                    <svg xmlns='http://www.w3.org/2000/svg' fill='#e5e4e4' viewBox='0 0 54 61' className='size-full'>
                      <path
                        stroke='none'
                        d='M51.2 16.9H38.7C38.7 11.6 36 .6 27 .5 17.4.4 15.2 12.4 15.2 16.9H2.8c-3.4 0-2.7 3.4-2.7 3.4l2.4 33s-.1 7.3 6.3 7.5h36.5c6.2-.4 6.3-7.5 6.3-7.5l2.4-33c0-.1.5-3.5-2.8-3.4M27.1 4.2c7.1.2 7.9 11.7 7.7 12.6H19.1c-.1-.9.4-12.4 8-12.6m9.1 44.6c-1 1.7-2.7 3-5 3.7-1.2.4-2.4.5-3.6.5-3.2 0-6.5-1.1-9.3-3.3-.8-.6-1-1.5-.5-2.3.2-.4.7-.7 1.2-.8.4-.1.9 0 1.2.3 3.2 2.4 8.3 4 11.9 1.6 1.4-.9 2.1-2.7 1.6-4.3s-2.2-2.7-3.5-3.4c-1-.6-2.1-1-3.3-1.4-.9-.3-1.9-.7-2.9-1.2q-3.6-1.8-4.8-4.2c-1.2-2.3-.6-5.4 1.4-7.5 3.6-3.8 10-3.2 14-.4.9.6.9 1.7.4 2.5s-1.4.9-2.2.4c-2-1.4-4.4-2-6.4-1.7s-4.7 2-4.4 4.6c.2 1.5 2 2.6 3.3 3.3.8.4 1.5.7 2.3.9 4.3 1.3 7.2 3.3 8.6 5.7 1.2 2.1 1.2 4.9 0 7'
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className='relative my-[0.3125rem] grid grid-cols-5 gap-[0.625rem]'>
                {Array.from({ length: 5 }).map((_, index) => {
                  return <div className='relative w-full pt-[100%] cursor-pointer' key={index}></div>
                })}
              </div>
            </div>
            <div className='flex items-center justify-center mt-[0.9375rem]'>
              <div className='flex items-center justify-between px-[1.875rem] border-r border-[#00000017] gap-[5px]'></div>
              <div className='flex-1 flex items-center justify-center'></div>
            </div>
          </figure>
          <section className='flex flex-1 flex-col pt-5 pl-5 pr-[1.5625rem] text-[#000000cc]'>
            <div className='w-full h-[0.625rem] bg-gray-100 rounded-sm'></div>
            <div className='w-2/3 h-[0.625rem] bg-gray-100 rounded-sm mt-[0.6875rem]'></div>
            <div className='w-full h-[12.5rem] my-[1.875rem] bg-gray-100 rounded-sm'></div>
          </section>
        </section>
      </div>
    </div>
  )
}
