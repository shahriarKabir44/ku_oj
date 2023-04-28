import Global from "./Global"
import UploadManager from "./UploadManager"
export default class SubmissionService {
    static async submit(submissionInfo, submissionFileURL) {
        const { fileExtension, problemId, submittedBy, contestId } = submissionInfo

        // let { submissionId } = await Global._fetch('/submission/submit', submissionInfo)
        return await UploadManager.uploadFile(submissionFileURL, {
            filetype: 'submission',
            problemid: problemId,
            postedby: submittedBy,
            contestid: contestId,
            ext: fileExtension,
            points: 500,
            isOfficial: true,
            additionals: JSON.stringify({
                time: (new Date()) * 1,
                contestId,
                userId: submittedBy,
                problemId,
                points: 500,
                isOfficial: true,
                ...submissionInfo
            })
        }, '/submission/submit')
        // return Global._fetch('/submission/setSubmissionFileURL', {
        //     submissionFileURL: fileURL,
        //     id: submissionId,
        //     contestId,
        //     userId: submittedBy,
        //     problemId,
        //     points: 500,
        //     isOfficial: true
        // })
    }
    static async getPreviousSubmissionsOfProblem(problemId, userId) {
        return Global._fetch('/submission/getPreviousSubmissionsOfProblem', { problemId, userId })
    }
    static async getSubmissionInfo(id) {
        return Global._fetch('/submission/getSubmissionInfo/' + id)
    }
}