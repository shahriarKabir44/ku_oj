import React, { useRef } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import './SubmitCode.css'
import SubmissionService from '../../../services/Submission.service';
import UploadManager from '../../../services/UploadManager';
function SubmitCode({ contestTitle, open, handleClose, setPreviousSubmissionList, setSubmissionList, problem, isOfficial, currentUser }) {
    const codeText = useRef(null)
    const [languageName, setLanguageName] = React.useState('')
    async function submitSolution() {
        function getExtName() {
            if (languageName === 'python') return 'py'
        }
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
        let newSubmission = {
            ...data,
            execTime: '--',
            verdict: '--',
            id: 0
        }
        if (!currentUser) {
            alert('Please log in or sign up!')
            return
        }


        setPreviousSubmissionList(newSubmission)
        const newCodeFileBlob = UploadManager.convertTextToBlob(codeText.current.value)
        console.log(codeText.current.value)

        SubmissionService.submit(data, newCodeFileBlob)

            .then((response) => {


                codeText.current.value = null
                setLanguageName("")
                SubmissionService.getPreviousSubmissionsOfProblem(problem?.id, currentUser?.id)
                    .then(({ previousSubmissions }) => {
                        setSubmissionList(previousSubmissions)
                        handleClose()
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
                <button className="btn btn-primary  " onClick={() => {
                    submitSolution()
                }} >Submit</button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Problem title</th>
                        <th>Language</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{contestTitle}</td>
                        <td>
                            <select className='languageSelector' name="" value={languageName}
                                onChange={e => {
                                    setLanguageName(e.target.value)
                                }} id="">
                                <option value="">Please Select</option>
                                <option value="python">python</option>
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