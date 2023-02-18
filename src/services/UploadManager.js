import Globals from "./Global";

export default class UploadManager {
    static async getBlobFromURI(imageURI) {
        return await fetch(imageURI).then(data => data.blob());
    }

    static async uploadFile(URI, additionalData, apiURL) {
        let blob = await UploadManager.getBlobFromURI(URI)

        let formData = new FormData()

        formData.append("file", blob)

        let url = await fetch(Globals.SERVER_URL + apiURL, {
            method: 'POST',
            body: formData,
            headers: {

                ...additionalData
            }
        }).then(res => res.json())
        return url

    }
}