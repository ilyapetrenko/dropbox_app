import { useEffect, useState } from 'react'
import { getFoldersInApp, createFolder, deleteFolder } from './server'
import { Folder } from './components/Folder'
import {FolderResponse} from "./models/models";

function App() {
    const [folders, setFolders] = useState<FolderResponse[]>([])
    const [newFolderName, setNewFolderName] = useState('')

    useEffect(() => {
        getFoldersInApp()
            .then(folders => {
                setFolders(folders)
            })
            .catch(error => {
                console.error('Error:', error)
            })
    }, [])

    const handleFolderCreate = () => {
        if (newFolderName) {
            createFolder(newFolderName)
                .then(() => {
                    getFoldersInApp()
                        .then(folders => {
                            setFolders(folders)
                            setNewFolderName('')
                        })
                        .catch(error => {
                            console.error('Error:', error)
                        })
                })
                .catch(error => {
                    console.error('Error creating folder:', error)
                })
        }
    }

    const handleFolderDelete = (folderPath: string) => {
        deleteFolder(folderPath)
            .then(() => {
                getFoldersInApp()
                    .then(folders => {
                        setFolders(folders)
                    })
                    .catch(error => {
                        console.error('Error:', error)
                    })
            })
            .catch(error => {
                console.error('Error deleting folder:', error)
            })
    }

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-center text-2xl font-bold mt-8">Folders in App:</h1>
            <div className="flex justify-center items-center mt-4">
                <input
                    type="text"
                    value={newFolderName}
                    onChange={e => setNewFolderName(e.target.value)}
                    placeholder="Enter folder name"
                    className="mr-2 px-4 py-2 rounded-md border border-gray-300"
                />
                <button
                    onClick={handleFolderCreate}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                    Create Folder
                </button>
            </div>
            <div className="flex justify-center flex-wrap max-w-5xl mt-40 gap-4">
                {folders.map(folder => (
                    <Folder
                        folder={folder}
                        key={folder.path_display}
                        onDelete={() => handleFolderDelete(folder.path_display)}
                    />
                ))}
            </div>
        </div>
    )
}

export default App



