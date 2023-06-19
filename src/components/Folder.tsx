import React from 'react';
import {FolderResponse} from "../models/models";

interface FolderProps {
    folder: FolderResponse
    onDelete: () => void
}

export const Folder: React.FC<FolderProps> = ({ folder, onDelete }) => {
    return (
        <div className="rounded-md bg-gray-600 p-4 w-40 max-w-xs overflow-hidden">
            <div className="flex flex-col items-center">
    <span className="text-lg font-bold truncate">
      {folder?.name}
    </span>
                <button className="bg-red-500 mt-2 px-4 py-2 rounded-md text-white text-xs" onClick={onDelete}>
                    Delete
                </button>
            </div>
        </div>
    )
}



