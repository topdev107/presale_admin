import { cilDelete, cilPlus } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import {
    CButton,
    CCard,
    CCardBody, CCol, CFormCheck, CFormInput, CFormLabel, CInputGroup, CRow
} from '@coreui/react';
import axios from "axios";
import React, { useCallback, useEffect, useState } from 'react';
import { Tab, Tabs } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import SurveyAnswerItem from './components/SurveyAnswerItem';


const AddSurvey = () => {
    const history = useHistory();

    const [question, setQuestion] = useState("")

    const [key, setKey] = useState('text');
    const [answerRowsOpt, setAnswerRowsOpt] = useState([]);
    const [answerOpt, setAnswerOpt] = useState("");

    const [answerRowsCheckbox, setAnswerRowsCheckbox] = useState([]);
    const [answerCheckbox, setAnswerCheckbox] = useState("");    

    const onChange = (event) => {
        setQuestion(event.currentTarget.value);
    }

    const OnAddSurvey = () => {
        if (question == "") {
            Swal.fire({
                title: "Add Servey",
                text: "Please input a question."
            })
            return;
        }

        var type = "";
        var answers = [];
        if (key == "text") {
            type = "text";
        } else if (key == "option") {
            type = "option";
            if (answerRowsOpt.length == 0) {
                Swal.fire({
                    title: "Add Servey",
                    text: "Please input at least one question."
                })
                return;
            } else {
                answers = answerRowsOpt;
            }
        } else if (key == "checkbox") {
            type = "checkbox";
            if (answerRowsCheckbox.length == 0) {
                Swal.fire({
                    title: "Add Servey",
                    text: "Please input at least one question."
                })
                return;
            } else {
                answers = answerRowsCheckbox;
            }
        }

        addSurvey(type, question, answers);
    }

    const onAddAnswerOpt = () => {
        if (answerOpt != "") {
            const rows = answerRowsOpt;
            rows.push(answerOpt);
            setAnswerRowsOpt(rows);
        }
        setAnswerOpt("")
    }

    const onChangeOpt = (event) => {
        setAnswerOpt(event.currentTarget.value);
    }

    const onDeleteRowOpt = (index) => {
        const rows = [...answerRowsOpt];
        rows.splice(index, 1);
        setAnswerRowsOpt(rows);
    }

    ////////////////// for checkbox answer /////////////////
    const onAddAnswerCheckbox = () => {
        if (answerCheckbox != "") {
            const rows = answerRowsCheckbox;
            rows.push(answerCheckbox);
            setAnswerRowsCheckbox(rows);
        }
        setAnswerCheckbox("")
    }

    const onChangeCheckbox = (event) => {
        setAnswerCheckbox(event.currentTarget.value);
    }

    const onDeleteRowCheckbox = (index) => {
        const rows = [...answerRowsCheckbox];
        rows.splice(index, 1);
        setAnswerRowsCheckbox(rows);
    }

    const addSurvey = (type, question, answers) => {
        axios.post(window.BASE_URL + '/surveys/add', {
            "type": type,
            "question": question,
            "answers": answers
        })
            .then((response) => {
                Swal.fire({
                    title: "Success",
                    text: "Successfully Added"
                })
                    .then(() => {
                        setQuestion("");
                        setAnswerRowsOpt([]);
                        setAnswerRowsCheckbox([]);
                    })
            })
            .catch((err) => {
                Swal.fire({
                    title: "Error",
                    text: err
                });
            })
    }

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardBody className="t_height_80vh mt-5">
                        <CRow className="mb-3">
                            <CFormLabel htmlFor="inputQuestion" className="col-sm-1 col-form-label">
                                Question:
                            </CFormLabel>
                            <div className="col-sm-11">
                                <CFormInput type="text" id="inputQuestion" value={question} onChange={onChange} />
                            </div>
                        </CRow>

                        <CRow className="mb-3">
                            <CFormLabel htmlFor="inputQuestion" className="col-sm-1 col-form-label">
                                Answer:
                            </CFormLabel>
                            <div className="col-sm-11">
                                <Tabs
                                    id="controlled-tab-example"
                                    activeKey={key}
                                    onSelect={(k) => setKey(k)}
                                >
                                    <Tab eventKey="text" title="Text Answer">
                                        <div className="survey_answer_tab_pane">Users will answer with text</div>
                                    </Tab>
                                    <Tab eventKey="option" title="Option Answer">
                                        <div className="survey_answer_tab_pane">
                                            {answerRowsOpt.map((row, index) => {
                                                return (
                                                    <div key={index}>
                                                        <SurveyAnswerItem row={row} type="radio" index={index} onDeleteRow={onDeleteRowOpt} />
                                                    </div>
                                                )
                                            })}

                                            <div className="mt-2 mb-2">
                                                <CInputGroup className="mb-3">
                                                    <CFormInput
                                                        placeholder="Answer"
                                                        aria-label="Answer"
                                                        aria-describedby="add_answer_btn"
                                                        onChange={onChangeOpt}
                                                        value={answerOpt}
                                                    />
                                                    <CButton type="button" color="secondary" variant="outline" id="add_answer_btn" onClick={onAddAnswerOpt}>
                                                        Add
                                                    </CButton>
                                                </CInputGroup>
                                            </div>
                                        </div>
                                    </Tab>
                                    <Tab eventKey="checkbox" title="Checkbox Answer">
                                        <div className="survey_answer_tab_pane">
                                            {answerRowsCheckbox.map((row, index) => {
                                                return (
                                                    <div key={index}>
                                                        <SurveyAnswerItem row={row} type="checkbox" index={index} onDeleteRow={onDeleteRowCheckbox} />
                                                    </div>
                                                )
                                            })}

                                            <div className="mt-2 mb-2">
                                                <CInputGroup className="mb-3">
                                                    <CFormInput
                                                        placeholder="Answer"
                                                        aria-label="Answer"
                                                        aria-describedby="add_answer_btn"
                                                        onChange={onChangeCheckbox}
                                                        value={answerCheckbox}
                                                    />
                                                    <CButton type="button" color="secondary" variant="outline" id="add_answer_btn" onClick={onAddAnswerCheckbox}>
                                                        Add
                                                    </CButton>
                                                </CInputGroup>
                                            </div>
                                        </div>
                                    </Tab>
                                </Tabs>
                            </div>
                        </CRow>

                        <div className="d-grid gap-3 d-md-flex justify-content-md-end mb-5 mt-3">
                            <CButton color="success" className="me-md-2 width-200" onClick={() => { history.goBack() }}>
                                Cancel
                            </CButton>
                            <CButton color="success" className="me-md-2 width-200" onClick={OnAddSurvey}>
                                Add
                            </CButton>
                        </div>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
}

export default AddSurvey
