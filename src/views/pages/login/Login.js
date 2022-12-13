import { cilLockLocked, cilUser } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
    CButton,
    CCard,
    CCardBody,
    CCardGroup,
    CCol,
    CContainer,
    CForm,
    CFormCheck,
    CFormFeedback,
    CFormInput,
    CInputGroup,
    CInputGroupText,
    CLink,
    CRow
} from '@coreui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

const Login = () => {

    const [checked, setChecked] = useState(false);
    const [validated, setValidated] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleCheck = (event) => {
        setChecked(event.currentTarget.checked)
    }

    const handleEmailChange = (event) => {
        setEmail(event.currentTarget.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.currentTarget.value);
    }

    const handleSubmit = (event) => {
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        } else {
            event.preventDefault()
            event.stopPropagation()
            let email = form.email.value;
            let password = form.password.value;

            axios.post(window.BASE_URL + "/auth/login", {
                email: email,
                password: password
            })
                .then((response) => {
                    if (response.status == 200) {
                        let token = response.data.user.token;
                        if (checked) {
                            localStorage.setItem("bingo_password", password);
                            localStorage.setItem("bingo_remember", "true");
                        } else {
                            localStorage.setItem("bingo_password", "");
                            localStorage.setItem("bingo_remember", "false");
                        }
                        localStorage.setItem("bingo_user", JSON.stringify(response.data.user));                    
                        window.location = '#/admin/bsc'
                    } else {
                        let message = response.data.message;
                        Swal.fire({
                            title: "Login",
                            text: message
                        });
                    }
                })
                .catch((err) => {
                    console.log(err)
                    Swal.fire({
                        title: "Login",
                        text: err,
                    });
                })
        }
        setValidated(true)
    }

    var havenoaccount = "Don't you have an account? ";

    useEffect(() => {
        var isChecked = localStorage.getItem("bingo_remember");
        if (isChecked == "true") {
            try {
                let user = JSON.parse(localStorage.getItem("bingo_user"));
                if (user != undefined && user != "") {
                    let password = localStorage.getItem("bingo_password");
                    let email = user.email;
                    setEmail(email);
                    setPassword(password);
                    setChecked(true)
                } else {
                    setEmail("");
                    setPassword("");
                    setChecked(false);
                }
            } catch {
                setEmail("");
                setPassword("");
                setChecked(false);
            }
        } else {
            setEmail("");
            setPassword("");
            setChecked(false);
        }
    }, [])

    return (
        <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={4}>
                        <CCardGroup>
                            <CCard className="p-4">
                                <CCardBody>
                                    <CForm
                                        noValidate
                                        validated={validated}
                                        onSubmit={handleSubmit}
                                    >
                                        <h1 className="text_align_center">Login</h1>
                                        <p className="text-medium-emphasis">Sign In to your account</p>
                                        <CInputGroup className="mb-3">
                                            <CInputGroupText>
                                                <CIcon icon={cilUser} />
                                            </CInputGroupText>
                                            <CFormInput
                                                placeholder="Username or Email"
                                                id="email"
                                                required
                                                value={email}
                                                onChange={handleEmailChange} />
                                            <CFormFeedback invalid>Please input your username or email</CFormFeedback>
                                        </CInputGroup>
                                        <CInputGroup className="mb-4">
                                            <CInputGroupText>
                                                <CIcon icon={cilLockLocked} />
                                            </CInputGroupText>
                                            <CFormInput
                                                type="password"
                                                placeholder="Password"
                                                id="password"
                                                autoComplete="current-password"
                                                required
                                                value={password}
                                                onChange={handlePasswordChange} />
                                            <CFormFeedback invalid>Please input your password</CFormFeedback>
                                        </CInputGroup>
                                        <CRow>
                                            <CCol xs={12}>
                                                <CFormCheck
                                                    type="checkbox"
                                                    id="checkbox"
                                                    label="Remember"
                                                    onChange={handleCheck}
                                                    checked={checked}
                                                />
                                            </CCol>
                                        </CRow>
                                        <CRow className="mt-3">
                                            <CCol className="d-grid">
                                                <CButton color="primary" className="px-4" type="submit">
                                                    Login
                                                </CButton>
                                            </CCol>
                                        </CRow>                                        
                                        {/* <CRow className="mt-4">
                                            <CCol>
                                                <CLink className="no_underline_link" href="#/admin/forgot_password">Forgot password?</CLink>
                                            </CCol>
                                        </CRow> */}
                                        <CRow>
                                            <CCol>
                                                <p>{havenoaccount}
                                                    <CLink className="no_underline_link" href="#/admin/register">Register here</CLink>
                                                </p>
                                            </CCol>
                                        </CRow>
                                    </CForm>
                                </CCardBody>
                            </CCard>
                        </CCardGroup>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    )
}

export default Login
