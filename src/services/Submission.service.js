import Global from "./Global"
import UploadManager from "./UploadManager"
export default class SubmissionService {
    static async submit(submissionInfo, submissionFileURL) {
        const { fileExtension, problemId, submittedBy, contestId } = submissionInfo

        let { submissionId } = await Global._fetch('/submission/submit', submissionInfo)
        let { fileURL } = await UploadManager.uploadFile(submissionFileURL, {
            filetype: 'submission',
            problemid: problemId,
            postedby: submittedBy,
            contestid: contestId,
            ext: fileExtension,
            submissionid: submissionId
        })
        Global._fetch('/submission/setSubmissionFileURL', {
            submissionFileURL: fileURL,
            id: submissionId
        })
        return { fileURL, submissionId }
    }
    static async getPreviousSubmissions(problemId, userId) {
        return Global._fetch('/submission/getPreviousSubmissions', { problemId, userId })
    }
    static async getSubmissionInfo(id) {
        return Global._fetch('/submission/getSubmissionInfo/' + id)
    }
}