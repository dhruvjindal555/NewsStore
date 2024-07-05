import React from 'react'

function Results({totalResults,page}) {
  return (
    <div className='flex justify-between my-5'>
        <div>
            <span>
                Total Results : {totalResults}
            </span>
        </div>
        <div>
            <span>
                Showing 1-20 Results
            </span>
        </div>
    </div>
  )
}

export default Results