import React from 'react'
import Button from './Button'
import { ACTIONS } from '../App'
const DigitButton = ({digit, dispatch}) => {
  return (  
    <Button onClick={() => dispatch({type: ACTIONS.USER_INPUT, payload: {digit}})} value={digit}/>
  )
}

export default DigitButton