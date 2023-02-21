import Global from './Global'
import UploadManager from './UploadManager'
export default class ProblemService {
    static async createProblem({ statementFileURL,
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
        UploadManager.uploadFile(
            testcaseFileURL,
            {
                filetype: 'testcaseinput',
                problemid: problemId,
                ext: 'txt',
            },
            '/uploadFile/upload'
        );
        UploadManager.uploadFile(
            outputFileURL,
            {
                filetype: 'testcaseoutput',
                problemid: problemId,
                ext: 'txt',
            },
            '/uploadFile/upload'
        );
        UploadManager.uploadFile(
            statementFileURL,
            {
                filetype: 'statementfile',
                problemid: problemId,
                ext: 'pdf',
            },
            '/uploadFile/upload'
        )
        return problemId

    }
}