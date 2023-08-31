import React from 'react'

const  Loading = ()  => {
  return (
    <div className="d-flex mt-5 justify-content-center">
            <div className="spinner-border text-info" role="status">
                <span className="visually-hidden">Loading...</span>
            </div> <span>Loading ... Please wait.</span>
    </div>
  )
}

export default Loading
