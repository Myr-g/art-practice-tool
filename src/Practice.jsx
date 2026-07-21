import { convertFileSrc } from "@tauri-apps/api/core";
import './App.css';

function Practice({ session, setIsPracticing })
{
    return(
        <>
            <div className="practice">
                <div className="preview-image">
                    <img src={convertFileSrc(session.currentReference.path)} alt={session.currentReference.name}/>
                </div>

                <button onClick={() => setIsPracticing(false)}>End Practice</button>
            </div>
        </>
    )
}

export default Practice;