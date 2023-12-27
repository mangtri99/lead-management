import Image from 'next/image'
import React from 'react'

function Loader() {
  return (
    <div className='w-full flex items-center justify-center h-[80vh]'>
      <Image src='/loader.svg' alt='loading' width={100} height={100} />
    </div>
  )
}

export default Loader