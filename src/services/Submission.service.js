import Global from "./Global"
import UploadManager from "./UploadManager"
export default class SubmissionService {
    static async submit(submissionInfo, submissionFileURL) {
        const { fileExtension, problemId, submittedBy, contestId } = submissionInfo

        return await UploadManager.uploadFile(submissionFileURL, {
            filetype: 'submission',
            problemid: problemId,
            postedby: submittedBy,
            contestid: contestId,
            ext: fileExtension,

            additionals: JSON.stringify({
                time: (new Date()) * 1,
                contestId,
                userId: submittedBy,
                problemId,
                //points: 500,
                isOfficial: true,
                ...submissionInfo
            })
        }, '/submission/submit')
    }
    static async getPreviousSubmissionsOfProblem(problemId, userId) {
        return Global._fetch('/submission/getPreviousSubmissionsOfProblem', { problemId, userId })
    }
    static async getSubmissionInfo(id) {
        return Global._fetch('/submission/getSubmissionInfo/' + id)
    }
}