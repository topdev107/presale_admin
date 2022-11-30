import {
    CCard,
    CCardBody, CCol,
    CRow
} from '@coreui/react';
import axios from "axios";
import React, { useCallback, useMemo, useState } from 'react';
import DataGrid from 'react-data-grid';
import Swal from "sweetalert2";


const Wallets = () => {

    const fetchData = useCallback(async () => {
        axios({
            method: 'get',
            url: window.BASE_URL + "/wallets",
        })
            .then((res) => {
                if (res.data.status == "success") {
                    var rs = [];
                    var wallets = res.data.data;
                    wallets.forEach(element => {
                        rs.push(
                            {
                                id: element._id,
                                address: element.address,
                                timestamp: element.published_date
                            }
                        )
                    });

                    setRows(rs);
                } else {
                    Swal.fire({
                        title: "Wallets",
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
            name: 'No',
            width: 250
        },
        { 
            key: 'address',
            name: 'Wallet Address',
            resizable: true,             
        },
        { 
            key: 'timestamp',
            name: 'Timestamp',
            width: 250,
            sortable: true 
        }
    ];

    const createFakeRowObjectData = (index) => {
        return {
            id: `${index + 1}`,
            address: 'VQGNB5ASZEBGFWY7L3DIMUQTOAV3KDTJ4QO7DBP2NHV3IKWPVSHQOFB5RQ',
            timestamp: "2021-11-22"
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
            case 'address':
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

export default Wallets
