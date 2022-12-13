
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
    cifUs, cilGamepad, cilPeople, cilStar
} from '@coreui/icons';

import CIcon from '@coreui/icons-react'

import {
    CAvatar,
    CButton, CCard,
    CCardBody, CCardText, CCol,
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
import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import Swal from "sweetalert2";


const PadDetail = () => {

    const search = useLocation().search;
    const id = new URLSearchParams(search).get('id');
    const network = new URLSearchParams(search).get('network');

    console.log('id: ', id);
    console.log('network: ', network);

    const fetchData = useCallback(async () => {
        axios({
            method: 'get',
            url: "https://presale-backend.vercel.app/presale/launchpad/" + id + "?chainId=" + network,
        })
            .then((res) => {
                console.log('res: ', res);
                if (res.status == 200) {
                    setToken(res.data[0]);
                    console.log('token: ', token);
                    console.log('res.data[0]: ', res.data[0]);
                } else {
                    Swal.fire({
                        title: "Network Error",
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

    const [token, setToken] = useState();

    // const handleClick = () => {
    //     Swal.fire({
    //         title: "Add Game",
    //         input: "What is your name?"
    //     })
    //         .then((value) => {
    //             //Swal.fire(`You typed: ${value}`);
    //         })
    // }

    useEffect(async () => {
        await fetchData();
    }, [])

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardBody className="t_height_95vh">
                        
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
}

export default PadDetail
