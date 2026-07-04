import { useState } from 'react'
import './App.css'
import Library from './Library';

function Home()
{
    return (
        <>
            <div className='home'>
                <Library></Library>

                <div className='setup-panel'>
                    <div className='setup-header'>
                        <p>Session Setup</p>
                    </div>

                    <div className='setup-content'>
                        <div className='setup-item'>
                            <label>Mode</label>
                            
                            <div>
                                <label>
                                    <input type="radio" name="mode" value="manual" defaultChecked />
                                    <span>Manual</span>
                                </label>
                            </div>

                            <div>
                                <label>
                                    <input type="radio" name="mode" value="timed" />
                                    <span>Timed</span>
                                </label>
                            </div>
                        </div>

                        <div className='setup-item'>
                            <label>Timer</label>
                            <div className='timer'>
                                <input type="number" min={1} defaultValue={30} />
                                <span>seconds</span>
                            </div>
                        </div>

                        <div className='setup-item'>
                            <label>Selected Folders</label>
                            <div className='selected-folders'>

                            </div>
                        </div>


                        <button>Start</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;