import axios from "axios"

export const accessToken = 'sl.BgoIO6HRpzD0jxEpC2FerBqW5nuKSZsaT8Int6iLp4FvJiUXR7GZk8rqssGA8KQHYYnMh4AjZoeZhv39ELUWfOwYStP1iEMStl6fs3exQowSAbKQliKQPNTiHt1Uoo--L-e9ta8'

export async function getFoldersInApp() {
    try {
        const response = await axios.post(
            'https://api.dropboxapi.com/2/files/list_folder',
            {
                path: '',
                recursive: false,
                include_media_info: false,
                include_deleted: false,
                include_has_explicit_shared_members: false,
                include_mounted_folders: true,
                include_non_downloadable_files: false
            },
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            }
        )
        return response.data.entries
    } catch (error) {
        console.error('Error retrieving folder list:', error)
        throw error
    }
}

export async function createFolder(folderName: string) {
    try {
        const response = await axios.post(
            'https://api.dropboxapi.com/2/files/create_folder_v2',
            {
                path: `/${folderName}`,
                autorename: false
            },
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            }
        )
        return response.data
    } catch (error) {
        console.error('Error creating folder:', error)
        throw error
    }
}

export async function deleteFolder(folderPath: string) {
    try {
        const response = await axios.post(
            'https://api.dropboxapi.com/2/files/delete_v2',
            {
                path: folderPath
            },
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            }
        )
        return response.data
    } catch (error) {
        console.error('Error deleting folder:', error)
        throw error
    }
}

