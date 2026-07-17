import { useState, useEffect } from 'react';
import { appDataDir, join } from '@tauri-apps/api/path';
import { exists, mkdir, readDir } from '@tauri-apps/plugin-fs';
import './App.css';

function Library()
{
    const [libraryPath, setLibraryPath] = useState(null);
    const [directory, setDirectory] = useState([]);
    const [currentDirectory, setCurrentDirectory] = useState(null);

    const SUPPORTED_IMAGE_EXTENSIONS = [".png", ".jpg", ".jpeg"];

    const loadLibrary = async() => {
        try {
            const appDir = await appDataDir();
            const referencesDir = await join(appDir, "References");
            const archiveDir = await join(appDir, "Archive");

            await mkdir(referencesDir, { recursive: true });
            await mkdir(archiveDir, { recursive: true });

            setLibraryPath(appDir);
        }

        catch(error) {
            console.error("Library data loading failed: ", error);
        }
    };

    const countReferences = async(folderPath) => {
        const entries = await readDir(folderPath);
        const references = entries.filter(entry => entry.isFile && SUPPORTED_IMAGE_EXTENSIONS.some(extension =>
            entry.name.toLowerCase().endsWith(extension)
        ));

        return references.length;
    };

    const loadDirectory = async(folderPath) => {
        const entries = await readDir(folderPath);

        const folders = [];
        const images = [];

        for(const entry of entries)
        {
            if(entry.isDirectory)
            {
                const subfolderPath = await join(folderPath, entry.name);
                const refCount = await countReferences(subfolderPath);

                folders.push({name: entry.name, path: subfolderPath, referenceCount: refCount});
            }

            else if(entry.isFile && SUPPORTED_IMAGE_EXTENSIONS.some(extension => entry.name.toLowerCase().endsWith(extension)))
            {
                const imagePath = await join(folderPath, entry.name);
                images.push({name: entry.name, path: imagePath});
            }
        }

        return {folders, images};
    };

    const openDirectory = async(breadcrumbTrail) => {
        if(breadcrumbTrail.length === 0) 
        {
            setCurrentDirectory(null);
            setDirectory([]);
            return;
        }

        const path = await join(libraryPath, ...breadcrumbTrail);
        const dir = await loadDirectory(path);
        setCurrentDirectory(dir);
        setDirectory(breadcrumbTrail);
    };

    useEffect(() => {
        loadLibrary();
    }, []);

    return (
        <>
            <div className='library'>
                <div className='library-header'>
                    <div className='breadcrumb-trail'>
                        <p className='breadcrumb' onClick={async() => await openDirectory([])}>Library</p>

                        {directory.map((segment, index) => (
                            <span key={index}>
                                <span className='separator'>/ </span>
                                <span className='breadcrumb' onClick={async() => await openDirectory(directory.slice(0, index + 1))}>{segment}</span>
                            </span>
                        ))}
                    </div>
                </div>

                <div className={`library-content ${currentDirectory === null ? "" : "subdirectory"}`}>
                    {!currentDirectory && (
                        <>
                            <div className='library-root'>
                                <div className='folder' onClick={async() => await openDirectory(["References"])}>
                                    <h2>References</h2>
                                </div>

                                <div className='folder' onClick={async() => await openDirectory(["Archive"])}>
                                    <h2>Archive</h2>
                                </div>
                            </div>
                        </>
                    )}

                    {currentDirectory && (
                        <>
                            <div className='actions'>
                                <button className='back-button' onClick={() => openDirectory(directory.slice(0, -1))}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                                        <path d="M0 0h24v24H0z" fill="none" />
	                                    <path fill="currentColor" d="M16.62 2.99a1.25 1.25 0 0 0-1.77 0L6.54 11.3a.996.996 0 0 0 0 1.41l8.31 8.31c.49.49 1.28.49 1.77 0s.49-1.28 0-1.77L9.38 12l7.25-7.25c.48-.48.48-1.28-.01-1.76" />
                                    </svg>
                                </button>

                                {directory.includes("References") && (
                                    <button className='import-button' >Import Folder</button>
                                )}
                            </div>

                            <div className='folders'>
                                {currentDirectory.folders.map((folder) => (
                                    <div key={folder.path} className='folder' onClick={async() => openDirectory([...directory, folder.name])}>
                                        <h2>{folder.name}</h2>
                                        <p>{folder.referenceCount} references</p>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default Library;