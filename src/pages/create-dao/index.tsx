import React, { useState } from 'react'

import PickDaoType from '@/components/PickDaoType';
import GovernanceConfig from '@/components/GovernanceConfig';
import VotingConfig from '@/components/VotingConfig';
import CreateDaoReview from '@/components/CreateDaoReview';

const CreateDao = () => {
  const [pagination, setPagination] = useState<number>(1);

  console.log(pagination);

  const CreateDaoPage = ({pagination}: {pagination: number}) => {
    switch (pagination) {
      case 1:
        return <PickDaoType setPagination={setPagination} />
      case 2: 
        return <GovernanceConfig setPagination={setPagination}/>
      case 3:
        return <VotingConfig setPagination={setPagination} />
      case 4:
          return <CreateDaoReview setPagination={setPagination} /> 
      default:
        return <PickDaoType setPagination={setPagination} />
    }
  }

  return (
    <div id='create-dao' className='flex justify-center items-center'>
      <CreateDaoPage pagination={pagination} />
      {/* <h1 className='text-xl text-third-grey'>Upcoming feature ...</h1> */}
    </div>
  )
}

export default CreateDao