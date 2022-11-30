
import {
    cibCcAmex,
    cibCcApplePay,
    cibCcMastercard,
    cibCcPaypal,
    cibCcStripe,
    cibCcVisa, cifBr,
    cifEs,
    cifFr,
    cifIn,
    cifPl,
    cifUs, cilGamepad, cilPeople
} from '@coreui/icons';

import CIcon from '@coreui/icons-react'

import {
    CAvatar,
    CButton, CCard,
    CCardBody, CCol,
    CImage,
    CLink,
    CProgress,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow
} from '@coreui/react';
import axios from "axios";
import React, { useCallback } from 'react';
import avatar1 from 'src/assets/images/avatars/g1.jpg';
import avatar2 from 'src/assets/images/avatars/g2.jpg';
import avatar3 from 'src/assets/images/avatars/g3.jpg';
import avatar4 from 'src/assets/images/avatars/g4.jpg';
import avatar5 from 'src/assets/images/avatars/g5.jpg';

import Swal from "sweetalert2";


const tableExample = [
    {
        logoUrl: avatar1,
        token_name: "Memory Management Token",
        token_symbol: "MMK"
    }
]


const Pending = () => {

    const fetchData = useCallback(async () => {
        axios({
            method: 'get',
            url: "http://localhost:5000/api/v1/admin/games",
        })
            .then((res) => {
                if (res.data.status == "success") {
                    var rs = [];
                    var games = res.data.data;
                    games.forEach(element => {
                        rs.push(
                            {
                                id: element._id,
                                title: element.title,
                                url: element.url,
                                created_at: element.published_date
                            }
                        )
                    });
                } else {
                    Swal.fire({
                        title: "Play",
                        text: JSON.stringify(res.data),
                    });
                }
            })
            .catch((err) => {
                Swal.fire({
                    title: "Warning",
                    type: "warning",
                    text: err
                });
            })
    });

    const handleClick = () => {
        Swal.fire({
            title: "Add Game",
            input: "What is your name?"
        })
            .then((value) => {
                //Swal.fire(`You typed: ${value}`);
            })
    }

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardBody className="t_height_80vh">
                        {/* <div className="d-grid gap-3 d-md-flex justify-content-md-end mb-3">
                            <CButton color="success" className="me-md-2" onClick={handleClick}>
                                Add Game
                            </CButton>
                        </div> */}
                        <CTable align="middle" className="mb-0 border" hover responsive>
                            <CTableHead color="light">
                                <CTableRow>
                                    <CTableHeaderCell>
                                        <CIcon icon={cilGamepad} />
                                    </CTableHeaderCell>
                                    <CTableHeaderCell>Title</CTableHeaderCell>
                                    <CTableHeaderCell width="300">Activity</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                        </CTable>
                        <div className="overflow-scrollable">
                            <CTable align="middle" className="mb-0 border" hover responsive>
                                <CTableBody>
                                    {tableExample.map((item, index) => (
                                        <CTableRow v-for="item in tableItems" key={index}>
                                            <CTableDataCell>
                                                {/* <CAvatar size="md" src={item.avatar.src} status={item.avatar.status} /> */}
                                                <CImage rounded thumbnail width={100} height={100} src={item.avatar} />
                                            </CTableDataCell>
                                            <CTableDataCell>
                                                <div><h3>{item.title}</h3></div>
                                                <div>{item.desc}</div>
                                            </CTableDataCell>

                                            <CTableDataCell width="300">
                                                <div className="d-grid gap-1 d-md-flex justify-content-md-start">
                                                    <CButton color="success" variant="ghost">Detail</CButton>
                                                    <CButton color="success" variant="ghost">Edit</CButton>
                                                    <CButton color="success" variant="ghost">On</CButton>
                                                    <CButton color="danger" variant="ghost">Delete</CButton>
                                                </div>
                                            </CTableDataCell>

                                        </CTableRow>
                                    ))}
                                </CTableBody>
                            </CTable>
                        </div>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
}

export default Pending
