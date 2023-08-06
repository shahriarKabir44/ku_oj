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
        code,
        createdOn
    }) {

        let { problemId } = await Global._fetch('/contests/createProblem', {
            title,
            points,
            contestId,
            authorId,
            code,
            createdOn
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

        return problemId

    }


    static async addNewProblem({
        statementFile,
        outputFileContent,
        testcaseFileContent,
        title,
        points,
        contestId,
        authorId,
        code,
        createdOn
    }) {
        let { problemId } = await Global._fetch('/contests/createProblem', {
            title,
            points,
            contestId,
            authorId,
            code,
            createdOn
        })
        let promises = []
        const tasks = [
            ['testcaseinput', testcaseFileContent, 'txt'],
            ['testcaseoutput', outputFileContent, 'txt']
        ]
        if (statementFile) {
            tasks.push(['statementfile', statementFile, 'pdf'])
        }
        tasks.forEach(task => {
            promises.push(UploadManager.uploadFile(
                task[1],
                {
                    filetype: task[0],
                    problemid: problemId,
                    ext: task[2],
                },
                '/uploadFile/upload'
            ))
        })

        await Promise.all(promises)

        return problemId
    }

    static async updateProblem({
        statementFile,
        outputFileContent,
        testcaseFileContent,
        title,
        points,
        id,
        code
    }) {
        Global._fetch('/contests/updateProblemInfo', {
            title,
            points,
            id,
            code
        })
        let promises = []
        const tasks = [
            ['testcaseinput', testcaseFileContent, 'txt'],
            ['testcaseoutput', outputFileContent, 'txt']
        ]
        if (statementFile) {
            tasks.push(['statementfile', statementFile, 'pdf'])
        }
        tasks.forEach(task => {
            promises.push(UploadManager.uploadFile(
                task[1],
                {
                    filetype: task[0],
                    problemid: id,
                    ext: task[2],
                },
                '/uploadFile/upload'
            ))
        })

        return await Promise.all(promises)


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