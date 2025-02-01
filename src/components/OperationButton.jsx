import React from 'react'
import Button from './Button'

const OperationButton = ({operation, className}) => {
  return (
    <Button className={className} value={operation}/>
  )
}

export default OperationButton