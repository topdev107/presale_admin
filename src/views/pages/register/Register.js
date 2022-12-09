import React, { useState } from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CContainer,
    CForm,
    CFormFeedback,
    CFormInput,
    CInputGroup,
    CInputGroupText,
    CLink,
    CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import Swal from 'sweetalert2'
import axios from 'axios'

const Register = () => {

    const [validated, setValidated] = useState(false)

    const handleSubmit = (event) => {
        const form = event.currentTarget    
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        } else {            
            let username = form.username.value;
            let email = form.email.value;
            let password = form.password.value;
            let repeat_password = form.repeat_password.value;

            if (password != repeat_password) {            
                event.preventDefault()
                event.stopPropagation()                     
                Swal.fire({
                    title: "Invalid",
                    text: "Please input same password"
                });       
            } else {
                axios.post(window.BASE_URL + "/auth/register", {
                    username: username,
                    email: email,
                    password: password
                })
                    .then((response) => {
                        console.log(response);
                        if (response.status == 200) {
                            let token = response.data.user.token;      
                            localStorage.setItem("bingo_user", JSON.stringify(response.data.user));
                            window.location='#/admin/bsc'                      
                        } else {
                            let message = response.data.message;
                            Swal.fire({
                                title: "Register",
                                text: message
                            });
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                        Swal.fire({
                            title: "Register",
                            text: err,
                        });
                    })
            }
        }
        setValidated(true)
    }

    return (
        <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={6} lg={5} xl={4}>
                        <CCard className="mx-4">
                            <CCardBody className="p-4">
                                <CForm
                                    noValidate
                                    validated={validated}
                                    onSubmit={handleSubmit}
                                >
                                    <h1 className="text_align_center">Register</h1>
                                    <p className="text-medium-emphasis">Create your account</p>
                                    <CInputGroup className="mb-3">
                                        <CInputGroupText>
                                            <CIcon icon={cilUser} />
                                        </CInputGroupText>
                                        <CFormInput placeholder="Username" autoComplete="username" id="username" required />
                                        <CFormFeedback invalid>Please input your username</CFormFeedback>
                                    </CInputGroup>
                                    <CInputGroup className="mb-3">
                                        <CInputGroupText>@</CInputGroupText>
                                        <CFormInput placeholder="Email" autoComplete="email" id="email" type="email" required />
                                        <CFormFeedback invalid>Please input your correct email</CFormFeedback>
                                    </CInputGroup>
                                    <CInputGroup className="mb-3">
                                        <CInputGroupText>
                                            <CIcon icon={cilLockLocked} />
                                        </CInputGroupText>
                                        <CFormInput
                                            type="password"
                                            placeholder="Password"
                                            autoComplete="new-password"
                                            id="password"                                   
                                            required
                                        />
                                        <CFormFeedback id="passwordFeedback" invalid>Please input your password</CFormFeedback>
                                    </CInputGroup>
                                    <CInputGroup className="mb-4">
                                        <CInputGroupText>
                                            <CIcon icon={cilLockLocked} />
                                        </CInputGroupText>
                                        <CFormInput
                                            type="password"
                                            placeholder="Repeat password"
                                            autoComplete="new-password"
                                            id="repeat_password"
                                            required
                                        />
                                        <CFormFeedback invalid>Please input your repeat password</CFormFeedback>
                                    </CInputGroup>
                                    <div className="d-grid">
                                        <CButton color="success" type="submit">Create Account</CButton>
                                    </div>

                                    <CRow className="mt-3">
                                        <CCol>
                                            <p>Have an account?
                                                <CLink className="no_underline_link" href="#/admin/login"> Login here</CLink>
                                            </p>
                                        </CCol>
                                    </CRow>
                                </CForm>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    )
}

export default Register
