import Global from "./Global"
import UploadManager from "./UploadManager"
export default class SubmissionService {
    static async submit(submissionInfo, textContent) {
        const { fileExtension, problemId, submittedBy, contestId } = submissionInfo

        // return await UploadManager.uploadBlobData(submissionFileBlob, , '/submission/submit');

        return Global._fetch('/submission/submit', { textContent }, {
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
                ...submissionInfo
            })
        })

    }
    static async getPreviousSubmissionsOfProblem(problemId, userId) {
        return Global._fetch('/submission/getPreviousSubmissionsOfProblem', { problemId, userId })
    }
    static async getSubmissionInfo(data) {
        return Global._fetch('/submission/getSubmissionInfo', data)
    }
    static async rejudgeContestSubmissions(contestId, problemId = 0) {
        return Global._fetch(`/submission/rejudgeContestSubmissions?contestId=${contestId}&problemId=${problemId}`);
    }
    static async getContestSubmissions(contestId, pageNumber = 0) {
        return Global._fetch(`/submission/getContestSubmissions/${contestId}/${pageNumber}`)

    }
    static async getUserSubmissions(userId, pageNumber) {
        return Global._fetch(`/submission/getUserSubmissions/${userId}/${pageNumber}`)
    }
}