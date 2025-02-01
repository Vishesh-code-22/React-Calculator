import React from 'react'
import Button from './Button'
import { ACTIONS } from '../App'
const OperationButton = ({operation, className, dispatch}) => {
  return (
    <Button className={className} onClick={() => dispatch({type: ACTIONS.OPERATION, payload: {operation}})} value={operation}/>
  )
}

export default OperationButton