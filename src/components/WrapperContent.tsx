import React, {ReactNode} from 'react'

type Props = {
    children: ReactNode;
  };

const WrapperContent = ({children}: Props) => {
  return (
    <div className='w-full min-h-screen p-10 bg-white'>{children}</div>
  )
}

export default WrapperContent