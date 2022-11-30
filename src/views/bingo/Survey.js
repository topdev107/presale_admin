import { cilEthernet } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import {
    CCard,
    CCardBody, CCol,
    CRow,
    CButton,
    CLink,
    CNavLink,
    CFormInput,
    CInputGroup
} from '@coreui/react';
import axios from "axios";
import React, { useCallback, useMemo, useState } from 'react';
import DataGrid from 'react-data-grid';
import Swal from "sweetalert2";


const Survey = () => {

    const [freecoinvalue, setFreeCoinValue] = useState("")    

    const fetchData = useCallback(async () => {
        axios({
            method: 'get',
            url: window.BASE_URL + "/surveys",
        })
            .then((res) => {
                if (res.data.status == "success") {
                    var rs = [];
                    var surveys = res.data.data;
                    surveys.forEach(element => {
                        rs.push(
                            {
                                id: element._id,
                                question: element.question,
                                timestamp: element.createdAt
                            }
                        )
                    });

                    setRows(rs);
                } else {
                    Swal.fire({
                        title: "Surveys",
                        text: JSON.stringify(res.data),
                    });
                }
            })
            .catch((err) => {
                Swal.fire({
                    title: "Error",
                    type: "warning",
                    text: err
                });
            })
    });

    const EmptyRowsRenderer = () => {
        return (
            <div style={{ textAlign: 'center' }}>
                Nothing to show{' '}
                <span lang="ja" title="ショボーン">
                    (´・ω・`)
                </span>
            </div>
        );
    }

    const rowKeyGetter = (row) => {
        return row.id;
    }

    const columns = [
        {
            key: 'id',
            name: 'No',
            width: 200,
            resizable: true,
        },
        {
            key: 'question',
            name: 'Questions',
            resizable: true,
        },
        {
            key: 'timestamp',
            name: 'Timestamp',
            width: 250,
            sortable: true
        },
        {
            key: 'detail',
            name: '',
            width: 50,
            formatter({ row }) {
                return (
                    <CLink href={`#/admin/edit_survey/${row.id}`}>
                        <CIcon icon={cilEthernet} size={'sm'} />
                    </CLink>
                )
            }
        }
    ];

    const createFakeRowObjectData = (index) => {
        return {
            id: `${index + 1}`,
            question: 'VQGNB5ASZEBGFWY7L3DIMUQTOAV3KDTJ4QO7DBP2NHV3IKWPVSHQOFB5RQ',
            Timestamp: "2021-11-22"
        };
    }

    const createRows = (numberOfRows) => {
        const rows = [];

        // for (let i = 0; i < numberOfRows; i++) {
        //     rows[i] = createFakeRowObjectData(i);
        // }

        fetchData();
        return rows;
    }

    const isAtBottom = ({ currentTarget }) => {
        return currentTarget.scrollTop + 10 >= currentTarget.scrollHeight - currentTarget.clientHeight;
    }

    const loadMoreRows = (newRowsCount, length) => {
        return new Promise((resolve) => {
            const newRows = [];

            for (let i = 0; i < newRowsCount; i++) {
                newRows[i] = createFakeRowObjectData(i + length);
            }

            setTimeout(() => resolve(newRows), 1000);
        });
    }


    const [rows, setRows] = useState(() => createRows(50));
    //const [rows, setRows] = useState(() => fetchData());
    const [isLoading, setIsLoading] = useState(false);

    async function handleScroll(event) {
        if (isLoading || !isAtBottom(event)) return;

        setIsLoading(true);

        const newRows = await loadMoreRows(50, rows.length);

        setRows([...rows, ...newRows]);
        setIsLoading(false);
    }

    const [sortColumns, setSortColumns] = useState([]);
    const onSortColumnsChange = useCallback((sortColumns) => {
        setSortColumns(sortColumns.slice(-1));
    }, []);

    const sortedRows = useMemo(() => {
        if (sortColumns.length === 0) return rows;
        const { columnKey, direction } = sortColumns[0];

        let sortedRows = [...rows];

        switch (columnKey) {
            case 'id':
            case 'question':
            case 'timestamp':
                sortedRows = sortedRows.sort((a, b) => a[columnKey].localeCompare(b[columnKey]));
                break;
            default:
        }
        return direction === 'DESC' ? sortedRows.reverse() : sortedRows;
    }, [rows, sortColumns]);

    const [selectedRows, onSelectedRowsChange] = useState(() => new Set());

    const handleClick = () => {
        window.location = "#/admin/add_survey"
    }

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardBody>
                        <div className="col-sm-9 inline-block">
                            <div className="row align-items-center">
                                <p className="col-sm-3 align-right">Survey Free Coin Amount : </p>
                                <div className="col-sm-6">
                                    <div className="row ">
                                        <div className="col-sm-4">
                                            <CFormInput
                                                className="align-right"
                                                placeholder="1000"
                                                aria-label="1000"
                                                aria-describedby="edit_freecoin_value_btn" 
                                                disabled/>
                                        </div>
                                        <p className="col-sm-3 inline-block">Micro Algos</p>
                                        <div className="col-sm-4">
                                            <CButton className="inline-block" type="button" color="success" variant="outline" id="edit_freecoin_value_btn" >
                                                Edit
                                            </CButton>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3 align-right inline-block">                        
                            <CButton color="success" className="me-md-2" onClick={handleClick}>
                                Add
                            </CButton>
                        </div>
                        <DataGrid
                            className="t_height_78vh"
                            columns={columns}
                            rows={sortedRows}
                            rowKeyGetter={rowKeyGetter}
                            onRowsChange={setRows}
                            noRowsFallback={<EmptyRowsRenderer />}
                            rowHeight={40}
                            selectedRows={selectedRows}
                            sortColumns={sortColumns}
                            onSortColumnsChange={onSortColumnsChange}
                            onSelectedRowsChange={onSelectedRowsChange}
                            headerRowHeight={50}
                            onScroll={handleScroll}
                        />
                        {isLoading && <div className={'loadMoreRowsClassname'}>Loading more rows...</div>}
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
}

export default Survey
