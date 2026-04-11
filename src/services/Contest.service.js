import ModalManager from "../EventsManager/ModalManager";
import Global from "./Global";
import UploadManager from "./UploadManager";
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
    createdOn,
  }) {
    let { problemId } = await Global._fetch("/contests/createProblem", {
      title,
      points,
      contestId,
      authorId,
      code,
      createdOn,
    });
    await Promise.all([
      UploadManager.uploadFile(
        testcaseFileURL,
        {
          filetype: "testcaseinput",
          problemid: problemId,
          ext: "txt",
        },
        "/uploadFile/upload",
      ).then(({ fileURL }) => {
        testcaseFileURL = fileURL;
      }),
      UploadManager.uploadFile(
        outputFileURL,
        {
          filetype: "testcaseoutput",
          problemid: problemId,
          ext: "txt",
        },
        "/uploadFile/upload",
      ).then(({ fileURL }) => {
        outputFileURL = fileURL;
      }),
      UploadManager.uploadFile(
        statementFileURL,
        {
          filetype: "statementfile",
          problemid: problemId,
          ext: "pdf",
        },
        "/uploadFile/upload",
      ).then(({ fileURL }) => {
        statementFileURL = fileURL;
      }),
    ]);

    return problemId;
  }

  static async addNewProblem({
    statementFile,
    testcaseFiles,
    title,
    statementText,
    points,
    contestId,
    authorId,
    code,
    createdOn,
  }) {
    let { data: problemId } = await Global._fetch("/contests/createProblem", {
      title,
      points,
      contestId,
      authorId,
      code,
      statementText,
      createdOn,
    });
    let promises = [];
    testcaseFiles.forEach((tc, index) => {
      promises.push(
        UploadManager.uploadFile(
          tc.input,
          {
            filetype: "testcaseinput",
            problemid: problemId,
            testcaseindex: String(index),
            ext: "txt",
          },
          "/uploadFile/upload",
        ),
      );
      promises.push(
        UploadManager.uploadFile(
          tc.output,
          {
            filetype: "testcaseoutput",
            problemid: problemId,
            testcaseindex: String(index),
            ext: "txt",
          },
          "/uploadFile/upload",
        ),
      );
    });
    if (statementFile) {
      promises.push(
        UploadManager.uploadFile(
          statementFile,
          {
            filetype: "statementfile",
            problemid: problemId,
            ext: "txt",
          },
          "/uploadFile/upload",
        ),
      );
    }

    await Promise.all(promises);

    return problemId;
  }

  static async updateProblem({
    statementFile,
    testcaseFiles,
    title,
    points, statementText,
    id,
    code,
  }) {
    await Global._fetch("/contests/updateProblemInfo", {
      title,
      points,
      id, statementText,
      code,
    });
    // Clear old testcase files before uploading new ones
    await Global._fetch(`/contests/clearTestcaseFiles/${id}`, {});
    let promises = [];
    testcaseFiles.forEach((tc, index) => {
      promises.push(
        UploadManager.uploadFile(
          tc.input,
          {
            filetype: "testcaseinput",
            problemid: id,
            testcaseindex: String(index),
            ext: "txt",
          },
          "/uploadFile/upload",
        ),
      );
      promises.push(
        UploadManager.uploadFile(
          tc.output,
          {
            filetype: "testcaseoutput",
            problemid: id,
            testcaseindex: String(index),
            ext: "txt",
          },
          "/uploadFile/upload",
        ),
      );
    });
    if (statementFile) {
      promises.push(
        UploadManager.uploadFile(
          statementFile,
          {
            filetype: "statementfile",
            problemid: id,
            ext: "txt",
          },
          "/uploadFile/upload",
        ),
      );
    }

    return await Promise.all(promises).catch((err) => {
      ModalManager.showAlert(
        "Error Occurred",
        "Failed to upload files. Please try again.",
      );
    });
  }
  static async saveMessageToContestThread(body) {
    return Global._fetch("/contests/saveMessageToContestThread", body);
  }
  static async getContestMessages(contestId) {
    return Global._fetch(`/contests/getContestMessages/${contestId}`);
  }

  static async getContestResult({ userId, contestId }) {
    return Global._fetch(`/contests/getContestResult/${userId}/${contestId}`);
  }
  static async createContest(contestInfo) {
    return await Global._fetch("/contests/createContest", contestInfo);
  }
  static async getContests() {
    return Global._fetch("/contests/getContests");
  }
  static async getUpcomingContests() {
    return Global._fetch("/contests/getUpcomingContests");
  }
  static async findContestById(id) {
    return Global._fetch("/contests/findContestById/" + id);
  }
  static async getContestProblems(id) {
    return Global._fetch("/contests/getContestProblems/" + id);
  }
  static async getProblemInfo(id) {
    return Global._fetch("/contests/getProblemInfo/" + id);
  }

  static async judgeSubmission(submissionInfo) {
    return Global._fetch("/judge/judgeSubmission", submissionInfo);
  }
  static async searchContestByProblem(problemId) {
    return Global._fetch("/contests/searchContestByProblem/" + problemId);
  }

  static async getContestStandings(contestId, isOfficial) {
    return Global._fetch("/contests/getContestStandings", {
      contestId,
      isOfficial,
    });
  }

  static async trashUntrashProblemId(problemId, isAvailable) {
    return Global._fetch(
      `/contests/trashUntrashProblemId/?problemId=${problemId}&isAvailable=${isAvailable * 1}`,
    );
  }

  static async getFullContestDetailsForEdit(contestId) {
    return Global._fetch("/contests/getFullContestDetailsForEdit/" + contestId);
  }
  static async getProblemFiles(problemId) {
    return Global._fetch(`/contests/getProblemFiles/${problemId}`);
  }

  static async updateContestInfo(contestInfo, forceUpdate = false) {
    console.log(contestInfo);
    return Global._fetch(
      `/contests/updateContestInfo?isForceUpdate=${forceUpdate}`,
      contestInfo,
    );
  }

  static async hasSolvedProblem_(userId, problemId) {
    return Global._fetch(`/contests/hasSolvedProblem_/${userId}/${problemId}`);
  }
  static async getParticipatedContestList(userId, pageNumber) {
    return Global._fetch(
      `/contests/getParticipatedContestList/${userId}/${pageNumber}`,
    );
  }

  static async getProblems(pageNumber) {
    return Global._fetch("/contests/getProblems/" + pageNumber);
  }
}
