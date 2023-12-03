import React, {ReactNode} from 'react'

type Props = {
    children: ReactNode;
  };

const WrapperContent = ({children}: Props) => {
  return (
    <div id="content">{children}</div>
  )
}

export default WrapperContent