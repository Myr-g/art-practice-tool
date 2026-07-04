import { useState } from 'react'
import './App.css'

function Home()
{
    return (
        <>
            <div className='home'>
                <div className='library'>
                    <div className='library-header'>
                        <p>Library </p>
                        <p className='breadcrumb-trail'></p>
                    </div>

                    <div className='library-content'>
                        
                    </div>
                </div>

                <div className='practice-setup'>
                    <div className='setup-header'>
                        <p>Session Setup</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;