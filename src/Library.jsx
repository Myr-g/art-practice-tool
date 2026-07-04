import { useState, useEffect } from 'react';
import './App.css';

function Library()
{
    const [directory, setDirectory] = useState([]);

    return (
        <>
            <div className='library'>
                <div className='library-header'>
                    <p>Library</p>
                    <p className='breadcrumb-trail'>{directory.length > 0 ? "/ " + directory.join(" / ") : ""}</p>
                </div>

                <div className='library-content'>
                    {directory.length === 0 && (
                        <>
                            <div className='library-root'>
                                <div className='folder' onClick={() => setDirectory(["References"])}>
                                    <h2>References</h2>
                                </div>

                                <div className='folder' onClick={() => setDirectory(["Archive"])}>
                                    <h2>Archive</h2>
                                </div>
                            </div>
                        </>
                    )}

                    {directory.length === 1 && directory[0] === "References" && (
                        <>
                            <div className='actions'>
                                <button className='back-button' onClick={() => setDirectory(prev => prev.slice(0, -1))}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                                        <path d="M0 0h24v24H0z" fill="none" />
	                                    <path fill="currentColor" d="M16.62 2.99a1.25 1.25 0 0 0-1.77 0L6.54 11.3a.996.996 0 0 0 0 1.41l8.31 8.31c.49.49 1.28.49 1.77 0s.49-1.28 0-1.77L9.38 12l7.25-7.25c.48-.48.48-1.28-.01-1.76" />
                                    </svg>
                                </button>

                                <button>Import Folder</button>
                            </div>
                        </>
                    )}

                    {directory.length === 1 && directory[0] === "Archive" && (
                        <>
                            <div className='actions'>
                                <button className='back-button' onClick={() => setDirectory(prev => prev.slice(0, -1))}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                                        <path d="M0 0h24v24H0z" fill="none" />
	                                    <path fill="currentColor" d="M16.62 2.99a1.25 1.25 0 0 0-1.77 0L6.54 11.3a.996.996 0 0 0 0 1.41l8.31 8.31c.49.49 1.28.49 1.77 0s.49-1.28 0-1.77L9.38 12l7.25-7.25c.48-.48.48-1.28-.01-1.76" />
                                    </svg>
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default Library;