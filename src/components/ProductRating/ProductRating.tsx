export const ProductRating = () => {
  return (
    <div className='inline-flex items-center gap-[1px] text-sm'>
      {Array.from({ length: 5 }).map((_, index) => {
        return (
          <div key={index}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              enableBackground='new 0 0 15 15'
              view-box='0 0 15 15'
              x={0}
              y={0}
              height={15}
              width={15}
              stroke='currentColor'
              className='text-orange fill-current'
            >
              <polygon
                points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeMiterlimit={10}
              />
            </svg>
          </div>
        )
      })}
    </div>
  )
}
