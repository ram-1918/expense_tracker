import React from 'react'

const Spinner = ({ text = '', size = '5em', data }) => {
  const header = text ? <h4>{text}</h4> : null
  return (
    !data && <div className="loader" style={{ height: size, width: size }}>Loading...</div>
  )
}

export default Spinner;