import Global from './Global'
import UploadManager from './UploadManager'
export default class ContestService {
    static async createProblem({
        statementFileURL,
        testcaseFileURL,
        outputFileURL,
        title,
        points,
        contestId,
        authorId,
        code
    }) {

        let { problemId } = await Global._fetch('/contests/createProblem', {
            title,
            points,
            contestId,
            authorId,
            code
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


    static async addNewProblem({
        statementFileURL,
        outputFileContent,
        testcaseFileContent,
        title,
        points,
        contestId,
        authorId,
        code
    }) {
        let { problemId } = await Global._fetch('/contests/createProblem', {
            title,
            points,
            contestId,
            authorId,
            code
        })
        await Promise.all([

            Global._fetch('/uploadFile/storeContent', {
                problemId,
                testcaseFileContent,
                outputFileContent
            })

        ])

        return problemId
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
    static async searchContestByProblem(problemId) {
        return Global._fetch('/contests/searchContestByProblem/' + problemId)
    }
    static async isRegistered(contestId, userId) {
        return Global._fetch('/contests/isRegistered', { contestId, userId })
    }
    static async registerForContest(contestId, userId) {
        return Global._fetch('/contests/registerForContest', { contestId, userId })
    }
    static async getContestStandings(contestId, pageNumber, isOfficial) {
        return Global._fetch('/contests/getContestStandings', { contestId, pageNumber, isOfficial })

    }

    static async getFullContestDetails(contestId) {
        return Global._fetch('/contests/getFullContestDetails/' + contestId)
    }
    static async getProblemFiles(problemId) {
        return Global._fetch(`/contests/getProblemFiles/${problemId}`)
    }


    static async updateContestInfo(contestInfo) {
        return Global._fetch('/contests/updateContestInfo', contestInfo)
    }
}