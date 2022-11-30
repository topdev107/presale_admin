import {
    CCard,
    CCardBody, CCol,
    CRow,
    CButton
} from '@coreui/react';
import axios from "axios";
import React, { useCallback, useMemo, useState } from 'react';
import DataGrid from 'react-data-grid';
import Swal from "sweetalert2";


const TransactionDetail = () => {

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
                        Transaction Detail 
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
}

export default TransactionDetail
