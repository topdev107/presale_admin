
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
    CDropdown,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle,
    CFormSelect,
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
import { useHistory } from 'react-router-dom';

import Swal from "sweetalert2";


const PendingCronos = () => {
    const CHAIN_ID = 25;

    //const history = useHistory();
    const history = useHistory();

    const fetchPendingData = useCallback(async () => {
        axios({
            method: 'get',
            url: "https://presale-backend.vercel.app/presale/launchpad/pendings?chainId="+CHAIN_ID,
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

    const fetchVerifiedData = useCallback(async () => {
        axios({
            method: 'get',
            url: "https://presale-backend.vercel.app/presale/launchpad/all?chainId="+CHAIN_ID,
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
    const [verifyStatus, setVerifyStatus] = useState('false');

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
                    axios.put("https://presale-backend.vercel.app/presale/launchpad/" + id + "?chainId="+CHAIN_ID, 'verified=true')
                        .then((res) => {
                            console.log('res: ', res);
                            if (res.status == 200) {
                                Swal.fire({
                                    title: "Success",
                                    text: "LaunchPad is published",
                                });

                                axios({
                                    method: 'get',
                                    url: "https://presale-backend.vercel.app/presale/launchpad/pendings?chainId="+CHAIN_ID,
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
                    axios.delete("https://presale-backend.vercel.app/presale/launchpad/" + id + "?chainId="+CHAIN_ID)
                        .then((res) => {
                            console.log('res: ', res);
                            if (res.status == 200) {
                                Swal.fire({
                                    title: "Success",
                                    text: "LaunchPad is deleted",
                                });

                                axios({
                                    method: 'get',
                                    url: verifyStatus === 'false'? "https://presale-backend.vercel.app/presale/launchpad/pendings?chainId="+CHAIN_ID : "https://presale-backend.vercel.app/presale/launchpad/all?chainId="+CHAIN_ID,
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

    const handleDisable = useCallback(async (id) => {
        Swal.fire({
            title: "Confirm",
            type: "warning",
            text: 'Are you sure disable this launch pad?',
            showConfirmButton: true,
            showCancelButton: true
        })
            .then((result) => {
                console.log('result: ', result);
                if (result['isConfirmed']) {
                    axios.put("https://presale-backend.vercel.app/presale/launchpad/" + id + "?chainId="+CHAIN_ID, 'verified=false')
                        .then((res) => {
                            console.log('res: ', res);
                            if (res.status == 200) {
                                Swal.fire({
                                    title: "Success",
                                    text: "LaunchPad is disabled",
                                });

                                axios({
                                    method: 'get',
                                    url: "https://presale-backend.vercel.app/presale/launchpad/all?chainId="+CHAIN_ID,
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

    const handleDetail = useCallback(async (id, network) => {
        history.push('/admin/detail?id=' + id + '&network=' + network);
    });

    useEffect(async () => {
        if (verifyStatus === 'false') {
            await fetchPendingData();
        } else {
            await fetchVerifiedData();
        }
    }, [verifyStatus])

    const handleChange = (value) => {
        console.log('value: ', value.target.value);
        setVerifyStatus(value.target.value);
    }

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardBody className="t_height_95vh">
                        <CFormSelect aria-label="Verified" onChange={handleChange}>
                            <option value="false">Pending</option>
                            <option value="true">Verified</option>
                        </CFormSelect>
                        <CTable align="middle" className="mt-3 mb-0 border" hover responsive>
                            <CTableHead color="light">
                                <CTableRow>
                                    <CTableHeaderCell>Pending LaunchPads</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                        </CTable>
                        {
                            tokens.length == 0 ? (
                                <p>There is no pendings</p>
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
                                                        {
                                                            verifyStatus === 'false' ? (
                                                                <div className="d-grid gap-1 d-md-flex justify-content-md-start">
                                                                    <CButton color="success" variant="ghost" onClick={() => { handleAllow(item._id) }}>Publish</CButton>
                                                                    <CButton color="danger" variant="ghost" onClick={() => { handleDelete(item._id) }}>Delete</CButton>
                                                                </div>
                                                            ) : (
                                                                <div className="d-grid gap-1 d-md-flex justify-content-md-start">
                                                                    <CButton color="success" variant="ghost" onClick={() => { handleDisable(item._id) }}>Disable</CButton>
                                                                    <CButton color="danger" variant="ghost" onClick={() => { handleDelete(item._id) }}>Delete</CButton>
                                                                </div>
                                                            )
                                                        }
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

export default PendingCronos
