
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
import React, { useCallback, useEffect, useState } from 'react';

import Swal from "sweetalert2";


const PendingBSCTest = () => {

    const fetchData = useCallback(async () => {
        axios({
            method: 'get',
            url: "https://presale-backend.vercel.app/presale/launchpad/pendings?chainId=97",
        })
            .then((res) => {
                console.log('res: ', res);
                if (res.status == 200) {
                    setTokens(res.data);
                    console.log('tokens: ', tokens);
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

    const [tokens, setTokens] = useState([]);

    // const handleClick = () => {
    //     Swal.fire({
    //         title: "Add Game",
    //         input: "What is your name?"
    //     })
    //         .then((value) => {
    //             //Swal.fire(`You typed: ${value}`);
    //         })
    // }

    const handleClick = useCallback(
        async (network, token_addr) => {
            const url =
                network == 97 ? 'https://testnet.bscscan.com/address/' + token_addr :
                    network == 56 ? 'https://bscscan.com/address/' + token_addr :
                        network == 25 ? 'https://cronoscan.com/address/' + token_addr :
                            network == 338 ? 'https://testnet.cronoscan.com/address/' + token_addr : '';

            window.open(url);
        }
    )

    const handleAllow = useCallback(async (id) => {
        Swal.fire({
            title: "Confirm",
            type: "warning",
            text: 'Are you sure publish this launch pad?',
            showConfirmButton: true,
            showCancelButton: true
        })
            .then((result) => {
                console.log('result: ', result);
                if (result['isConfirmed']) {
                    axios.put("https://presale-backend.vercel.app/presale/launchpad/" + id + "?chainId=97", 'verified=true')
                        .then((res) => {
                            console.log('res: ', res);
                            if (res.status == 200) {
                                Swal.fire({
                                    title: "Success",
                                    text: "LaunchPad is published",
                                });

                                axios({
                                    method: 'get',
                                    url: "https://presale-backend.vercel.app/presale/launchpad/pendings?chainId=97",
                                })
                                    .then((res) => {
                                        console.log('res: ', res);
                                        if (res.status == 200) {
                                            setTokens(res.data);
                                            console.log('tokens: ', tokens);
                                        } else {
                                            Swal.fire({
                                                title: "Network Error",
                                                text: JSON.stringify(res.data),
                                            });
                                        }
                                    })
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
                }
            })

    });

    const handleDelete = useCallback(async (id) => {
        Swal.fire({
            title: "Warning",
            type: "warning",
            text: 'Are you sure delete this launch pad?',
            showConfirmButton: true,
            showCancelButton: true
        })
            .then((result) => {
                console.log('result: ', result);
                if (result['isConfirmed']) {
                    axios.delete("https://presale-backend.vercel.app/presale/launchpad/" + id + "?chainId=97")
                        .then((res) => {
                            console.log('res: ', res);
                            if (res.status == 200) {
                                Swal.fire({
                                    title: "Success",
                                    text: "LaunchPad is deleted",
                                });

                                axios({
                                    method: 'get',
                                    url: "https://presale-backend.vercel.app/presale/launchpad/pendings?chainId=97",
                                })
                                    .then((res) => {
                                        console.log('res: ', res);
                                        if (res.status == 200) {
                                            setTokens(res.data);
                                            console.log('tokens: ', tokens);
                                        } else {
                                            Swal.fire({
                                                title: "Network Error",
                                                text: JSON.stringify(res.data),
                                            });
                                        }
                                    })
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
                }
            })
    });

    useEffect(async () => {
        await fetchData();
    }, [])

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardBody className="t_height_80vh">
                        <CTable align="middle" className="mb-0 border" hover responsive>
                            <CTableHead color="light">
                                <CTableRow>
                                    <CTableHeaderCell>Pending LaunchPads</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                        </CTable>
                        {
                            tokens.length == 0 ? (
                                <p>There is no pending launch pads</p>
                            ) : (
                                <div className="overflow-scrollable">
                                    <CTable align="middle" className="mb-0 border" hover responsive>
                                        <CTableBody>
                                            {tokens.map((item, index) => (
                                                <CTableRow v-for="item in tableItems" key={index}>
                                                    <CTableDataCell>
                                                        <div>
                                                            <img width={50} height={50} src={item.logoURL} />
                                                            <h3>{item.token_name}</h3>
                                                            {item.token_symbol}
                                                        </div>
                                                    </CTableDataCell>
                                                    <CTableDataCell>
                                                        <h3>Token Address: </h3>
                                                        {
                                                            <CButton color="link" onClick={() => { handleClick(item.network, item.token_addr) }}>{item.token_addr}</CButton>
                                                        }
                                                    </CTableDataCell>
                                                    <CTableDataCell width="300">
                                                        <div className="d-grid gap-1 d-md-flex justify-content-md-start">
                                                            <CButton color="success" variant="ghost" onClick={() => { handleAllow(item._id) }}>Publish</CButton>
                                                            <CButton color="danger" variant="ghost" onClick={() => { handleDelete(item._id) }}>Delete</CButton>
                                                        </div>
                                                    </CTableDataCell>

                                                </CTableRow>
                                            ))}
                                        </CTableBody>
                                    </CTable>
                                </div>
                            )
                        }
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
}

export default PendingBSCTest
