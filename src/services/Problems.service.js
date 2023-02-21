import Global from './Global'
import UploadManager from './UploadManager'
export default class ProblemService {
    static async createProblem({ statementFileURL,
        testcaseFileURL,
        outputFileURL,
        title,
        point,
        contestId,
        authorId }) {

        let promises = []
        let { problemId } = await Global._fetch('/')
        promises.push(UploadManager.uploadFile(
            testcaseFileURL,
            {
                filetype: 'testcaseinput',
                problemid: '11',
                ext: 'txt',
            }
        ))

    }
}