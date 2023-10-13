import React, { useRef } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import './SubmitCode.css'
import { Link } from 'react-router-dom'
import SubmissionService from '../../../../services/Submission.service';
import UploadManager from '../../../../services/UploadManager';
import Global from '../../../../services/Global';
function SubmitCode({ open, handleClose, setPreviousSubmissionList, setSubmissionList, problem, isOfficial, currentUser }) {
    const codeText = useRef(null)
    const [newSubmissionId, setNewSubmissionId] = React.useState(-1)
    const NOT_SUBMITTED = 0
    const NOT_JUDGED = 1
    const JUDGED = 2
    const [submissionStatus, setSubmissionStatus] = React.useState(NOT_SUBMITTED)
    const [languageName, setLanguageName] = React.useState('')
    const [submissionInfo, setSubmissionInfo] = React.useState({
        time: (new Date()) * 1,
        execTime: '--',
        verdict: '--'
    })
    function getExtName() {
        if (languageName === 'python') return 'py'
        else if (languageName === 'c++') return 'cpp'
        else if (languageName === 'java') return 'java'
        else return -1
    }
    async function submitSolution() {
        if (!currentUser) {
            alert('Please log in or signup!')
            return
        }
        if (getExtName() === -1) {
            alert('Please choose a language')
            return
        }
        if (codeText.current.value.length === 0) {
            alert('Paste your code please!')
            return
        }
        setSubmissionStatus(NOT_JUDGED)

        const data = {
            time: (new Date()) * 1,
            problemId: problem.id,
            submittedBy: currentUser.id,
            contestId: problem.contestId,
            fileExtension: getExtName(),
            points: problem.points,
            isOfficial,
            languageName,
        }
        setSubmissionInfo({
            time: data.time,
            execTime: '--',
            verdict: '--'
        })

        let newSubmission = {
            ...data,
            execTime: '--',
            verdict: '--',
            id: 0
        }



        setPreviousSubmissionList(newSubmission)
        const newCodeFileBlob = UploadManager.convertTextToBlob(codeText.current.value)

        SubmissionService.submit(data, newCodeFileBlob)

            .then((resp) => {
                let { verdict, execTime, id } = resp
                setNewSubmissionId(id)
                setSubmissionInfo({
                    ...submissionInfo,
                    verdict,
                    execTime
                })

                SubmissionService.getPreviousSubmissionsOfProblem(problem?.id, currentUser?.id)
                    .then(({ previousSubmissions }) => {

                        setSubmissionList(previousSubmissions)
                        setSubmissionStatus(JUDGED)
                        //handleClose()
                    })
            })

    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80vw',
        maxHeight: '70vh',
        height: '70vh',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        overflowY: 'auto'
    };
    return <Modal aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={() => {
            if (submissionStatus === NOT_JUDGED) return
            codeText.current.value = null
            setLanguageName("")
            setSubmissionStatus(NOT_SUBMITTED)
            handleClose()
        }}
        closeAfterTransition
        slotProps={{
            backdrop: {
                timeout: 500,
            },
        }}>
        <Box sx={style}>
            <div className="codePreviewModalContainer">
                <h4 style={{
                    fontFamily: "serif",
                    fontWeight: 100
                }}>Submit code:</h4>
                <button disabled={submissionStatus === NOT_JUDGED} className="btn btn-primary  " onClick={() => {
                    submitSolution()
                }} >Submit</button>
            </div>

            {submissionStatus !== NOT_SUBMITTED && <table>
                <thead>
                    <tr><th>Time</th> <th>Vertict</th> <th>Exec. time</th> </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            {submissionStatus === JUDGED && <Link to={`${Global.CLIENT_URL}/viewSubmission/${problem.contestId}/${newSubmissionId}`}>{new Date(submissionInfo.time).toLocaleString()}</Link>}
                            {submissionStatus !== JUDGED && (new Date(submissionInfo.time)).toLocaleString()}
                        </td>
                        <td>
                            {submissionInfo.verdict}
                        </td>
                        <td>
                            {submissionInfo.execTime}
                        </td>
                    </tr>
                </tbody>
            </table>}
            <table>
                <thead>
                    <tr>
                        <th>Problem title</th>
                        <th colSpan={2} >Language</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{problem.title}</td>
                        <td colSpan={2} style={{

                        }}>
                            <select className='languageSelector' name="" value={languageName}
                                onChange={e => {
                                    setLanguageName(e.target.value)
                                }} id="">
                                <option value="">Please Select</option>
                                <option value="python">python</option>
                                <option value="c++">c++</option>
                                <option value="java">Java (The name of the main class must be 'Solution')</option>
                            </select>
                        </td>

                    </tr>

                    <tr>
                        <td colSpan={2}>Code:</td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <textarea ref={codeText} name="" style={{
                                width: '100%'
                            }} id="" rows="10"></textarea>
                        </td>
                    </tr>

                </tbody>
            </table>

        </Box>
    </Modal>
}

export default SubmitCode;