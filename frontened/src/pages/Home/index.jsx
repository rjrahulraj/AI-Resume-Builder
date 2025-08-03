import React from 'react'
import Content from './Content'
import Features from './Features'


function index() {
     return (
          <div className=''>
               <div>
                    <Content></Content>
                    <br />
                    {/* features  */}
                    <Features></Features>
               </div>
          </div>
     )
}

export default index