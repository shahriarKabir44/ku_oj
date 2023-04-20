import Global from './Global'
import UploadManager from './UploadManager'
export default class ContestService {
    static async createProblem({
        statementFileURL,
        testcaseFileURL,
        outputFileURL,
        title,
        point,
        contestId,
        authorId
    }) {

        let { problemId } = await Global._fetch('/contests/createProblem', {
            title,
            point,
            contestId,
            authorId
        })
        await Promise.all([
            UploadManager.uploadFile(
                testcaseFileURL,
                {
                    filetype: 'testcaseinput',
                    problemid: problemId,
                    ext: 'txt',
                },
                '/uploadFile/upload'
            ).then(({ fileURL }) => {
                testcaseFileURL = fileURL
            }),
            UploadManager.uploadFile(
                outputFileURL,
                {
                    filetype: 'testcaseoutput',
                    problemid: problemId,
                    ext: 'txt',
                },
                '/uploadFile/upload'
            ).then(({ fileURL }) => {
                outputFileURL = fileURL
            }),
            UploadManager.uploadFile(
                statementFileURL,
                {
                    filetype: 'statementfile',
                    problemid: problemId,
                    ext: 'pdf',
                },
                '/uploadFile/upload'
            ).then(({ fileURL }) => {
                statementFileURL = fileURL
            })
        ])
        this.setFileURLs(problemId, statementFileURL,
            testcaseFileURL,
            outputFileURL)
        return problemId

    }

    static async setFileURLs(problemId, statementFileURL,
        testcaseFileURL,
        outputFileURL) {
        Global._fetch('/contests/setProblemFilesURL', {
            problemId,
            statementFileURL,
            testcaseFileURL,
            outputFileURL
        })
    }
    static async createContest(contestInfo) {
        let { contestId } = await Global._fetch('/contests/createContest', contestInfo)
        return contestId
    }
    static async getContests() {
        return Global._fetch('/contests/getContests')
    }
    static async getUpcomingContests() {
        return Global._fetch('/contests/getUpcomingContests')

    }
    static async getContestInfo(id) {
        return Global._fetch('/contests/getContestInfo/' + id)
    }
    static async getContestProblems(id) {
        return Global._fetch('/contests/getContestProblems/' + id)
    }
    static async getProblemInfo(id) {
        return Global._fetch('/contests/getProblemInfo/' + id)

    }

    static async judgeSubmission(submissionInfo) {
        return Global._fetch('/judge/judgeSubmission', submissionInfo)
    }
}