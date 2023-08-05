import Globals from "./Global";

export default class UploadManager {
    static getFileURI(event) {
        const fileObj = event.target.files && event.target.files[0];
        if (!fileObj) {
            return;
        }

        return (URL.createObjectURL(fileObj))
    }
    static async getBlobFromURI(imageURI) {
        return await fetch(imageURI).then(data => data.blob());
    }

    static async uploadFile(URI, additionalData, apiURL = '/uploadFile/upload') {
        let blob = await UploadManager.getBlobFromURI(URI)
        return this.uploadBlobData(blob, additionalData, apiURL)

    }
    static async uploadBlobData(blob, additionalData, apiURL = '/uploadFile/upload') {
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
    static convertTextToBlob(content) {
        const file = new File([content], 'abcd.txt', { type: 'text/plain' });

        return new Blob([file], { type: 'text/plain' });
    }
    static async convertTextToBase64(content) {


        let blob = this.convertTextToBlob(content)
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        return new Promise(resolve => {
            reader.onloadend = () => {
                resolve(reader.result);
            };
        });
    }
    static async convertBlobToBase64(blob) {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        return new Promise(resolve => {
            reader.onloadend = () => {
                resolve(reader.result);
            };
        });
    }
}