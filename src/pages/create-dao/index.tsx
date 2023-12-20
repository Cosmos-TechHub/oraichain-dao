import React, { useState } from 'react'

import PickDaoType from '@/components/PickDaoType';

const CreateDao = () => {
  const [pagination, setPagiantion] = useState<number>(1);

  return (
    <div id='create-dao'>
      <PickDaoType />
    </div>
  )
}

export default CreateDao