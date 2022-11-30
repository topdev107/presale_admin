import { cilArrowCircleBottom, cilAt, cilCasino, cilEthernet, cilEyedropper, cilViewModule } from '@coreui/icons';
import CIcon from '@coreui/icons-react'
import {
    CCard,
    CCardBody, CCol,
    CRow,
    CButton,
    CLink
} from '@coreui/react';
import axios from "axios";
import React, { useCallback, useMemo, useState } from 'react';
import DataGrid from 'react-data-grid';
import Swal from "sweetalert2";


const Transactions = () => {

    const fetchData = useCallback(async () => {
        axios({
            method: 'get',
            url: "http://localhost:5000/api/v1/admin/lotterys",
        })
            .then((res) => {
                if (res.data.status == "success") {
                    var rs = [];
                    var lotterys = res.data.data;
                    lotterys.forEach(element => {
                        rs.push(
                            {
                                id: element._id,
                                lottery_id: element.lottery_id,
                                created_at: element.published_date
                            }
                        )
                    });

                    setRows(rs);
                } else {
                    Swal.fire({
                        title: "Lottery",
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
            name: 'Transaction ID',
            resizable: true,
        },
        {
            key: 'type',
            name: 'Type',
            resizable: true,
            width: 250
        },
        {
            key: 'timestamp',
            name: 'Timestamp',
            resizable: true,
            sortable: true,
            width: 200
        },
        {
            key: 'detail',
            name: '',
            width: 50,
            formatter({ row }) {
                return (
                    <CLink href={`#/admin/transaction_detail/${row.id}`}>
                        <CIcon icon={cilEthernet} size={'sm'} />
                    </CLink>
                )
            }
        }
    ];

    const createFakeRowObjectData = (index) => {
        return {
            id: ['R5A4ZTQFTJCMW3IN73F6CYFJEL54HD5RCRTZFXYQYUCILCPHSFVQ', 'QTKGUMG7FF7RIOSUSCC3XRPVFH2MSZZEZDWURSD6ZS4GBVVUIXCA', '6D2NZHDHHEWOJ57ZTIYOM4SJNIN5COB4DHIUG2WYTSNFK5RRLWSA', 'WPM5CD6N4GBZSEXQD4UHDOX5GWNN6UTZZRSQVUIKZNDZERDH3UUA', 'YJQ3MRQSFMEYWU5Z7OOTMSK4Q5VQDJLK37E6ZO2VFIFEJ4JB6RLA'][Math.round(Math.random() * 4)],
            type: ['ASA Transfer', 'Application Call', 'Transfer'][Math.round(Math.random() * 2)],
            timestamp: ['2021-11-21 15:35:55', '2021-11-23 16:50:21', '2021-11-22 04:21:10'][Math.round(Math.random() * 2)],
        };
    }

    const createRows = (numberOfRows) => {
        const rows = [];

        for (let i = 0; i < numberOfRows; i++) {
            rows[i] = createFakeRowObjectData(i);
        }

        //fetchData();
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
            case 'type':
            case 'timestamp':
                sortedRows = sortedRows.sort((a, b) => a[columnKey].localeCompare(b[columnKey]));
                break;
            default:
        }
        return direction === 'DESC' ? sortedRows.reverse() : sortedRows;
    }, [rows, sortColumns]);

    const [selectedRows, onSelectedRowsChange] = useState(() => new Set());

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardBody>
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

export default Transactions
