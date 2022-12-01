
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

//const tokens = [];



const Pending = () => {

    const fetchData = useCallback(async () => {
        axios({
            method: 'get',
            url: "https://presale-backend.vercel.app/presale/launchpad/pendings?chainId=97",
        })
            .then((res) => {
                console.log('res: ', res);
                if (res.status == 200) {
                    //var rs = [];
                    setTokens(res.data);
                    // var tks = res.data;                    
                    // tks.forEach(element => {
                    //     // rs.push(
                    //     //     {
                    //     //         id: element._id,
                    //     //         title: element.title,
                    //     //         url: element.url,
                    //     //         created_at: element.published_date
                    //     //     }
                    //     // )
                    //     tokens.push(element);
                    // });
                    console.log('tokens: ', tokens);
                    //console.log("tokens['x']: ", tokens[0].logoUrl);
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

    const [tokens, setTokens] = useState([]);

    const handleClick = () => {
        Swal.fire({
            title: "Add Game",
            input: "What is your name?"
        })
            .then((value) => {
                //Swal.fire(`You typed: ${value}`);
            })
    }

    useEffect(async () => {
        await fetchData();
        
        //console.log('logoUrl: ', tokens[0].logoUrl)
    }, [])

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
                                    {/* <CTableHeaderCell>
                                        <CIcon icon={cilStar} />
                                    </CTableHeaderCell>
                                    <CTableHeaderCell>Title</CTableHeaderCell>
                                    <CTableHeaderCell width="300">Activity</CTableHeaderCell> */}
                                    <CTableHeaderCell>Pending LaunchPads</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                        </CTable>
                        <div className="overflow-scrollable">
                            <CTable align="middle" className="mb-0 border" hover responsive>
                                <CTableBody>
                                    {tokens.map((item, index) => (
                                        <CTableRow v-for="item in tableItems" key={index}>
                                            <CTableDataCell>                                                
                                                {/* <CImage rounded thumbnail width={100} height={100} src={item.logoUrl} /> */}
                                                <img width={50} height={50} src={item.logoURL}/>                                                
                                            </CTableDataCell>
                                            <CTableDataCell>
                                                <div><h3>{item.token_name}</h3>{item.token_symbol}</div>
                                                <div>{item.token_symbol}</div>
                                            </CTableDataCell>

                                            <CTableDataCell width="300">
                                                <div className="d-grid gap-1 d-md-flex justify-content-md-start">
                                                    <CButton color="success" variant="ghost">Detail</CButton>
                                                    {/* <CButton color="success" variant="ghost">Edit</CButton> */}
                                                    <CButton color="success" variant="ghost">Allow</CButton>
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
