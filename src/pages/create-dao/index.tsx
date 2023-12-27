import React, { useState } from 'react'

import PickDaoType from '@/components/PickDaoType';

const CreateDao = () => {
  const [pagination, setPagiantion] = useState<number>(1);

  return (
    <div id='create-dao' className='flex justify-center items-center'>
      {/* <PickDaoType /> */}
      <h1 className='text-xl text-third-grey'>Upcoming feature ...</h1>
    </div>
  )
}

export default CreateDao