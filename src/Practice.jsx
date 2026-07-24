import { useState, useEffect } from 'react';
import { convertFileSrc } from "@tauri-apps/api/core";
import './App.css';

function Practice({ session, setSession, setIsPracticing })
{
    const [timeRemaining, setTimeRemaining] = useState(session.timer);

    useEffect(() => {
        if(session.mode !== "Timed")
        {
            return;
        }

        const interval = setInterval(() => {
            setTimeRemaining(timeRemaining => Math.max(timeRemaining - 1, 0));
        }, 1000);

        return () => clearInterval(interval);
    }, [session.mode]);

    useEffect(() => {
        if(session.mode != "Timed") 
        {
            return;
        }

        if(timeRemaining <= 0)
        {
            nextReference();
        }
    }, [timeRemaining, session.mode]);

    const previousReference = () => {
        if(session.currentIndex === 0)
        {
            return;
        }

        const prevIndex = session.currentIndex - 1;
        const prevRef = session.references[prevIndex];

        setSession(session => ({...session, currentIndex: prevIndex, currentReference: prevRef}));

        if(session.mode === "Timed")
        {
            setTimeRemaining(session.timer);
        }
    };

    const nextReference = () => {
        const nextIndex = session.currentIndex + 1;
        const nextRef = session.references[nextIndex];
        const shownReferences = session.shownReferences.some(ref => ref.path === nextRef.path) ? session.shownReferences : [...session.shownReferences, nextRef];
        
        setSession(session => ({...session, currentIndex: nextIndex, currentReference: nextRef, shownReferences: shownReferences}));

        if(session.mode === "Timed")
        {
            setTimeRemaining(session.timer);
        }
    };

    return(
        <>
            <div className="practice">

                {session.mode === "Timed" && (
                    <span>{timeRemaining}</span>
                )}

                <div className="preview-image">
                    <img src={convertFileSrc(session.currentReference.path)} alt={session.currentReference.name}/>
                </div>

                <div className="reference-actions">
                    <button onClick={() => previousReference()}>Prev</button>
                    <button onClick={() => nextReference()}>Next</button>
                    <button onClick={() => setIsPracticing(false)}>End Practice</button>
                </div>
            </div>
        </>
    )
}

export default Practice;