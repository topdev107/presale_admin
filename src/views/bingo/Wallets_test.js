import faker from 'faker';
import React, { useState } from 'react';
import DataGrid from 'react-data-grid';

const rowKeyGetter = (row) => {
  return row.id;
}

const columns = [
  {
    key: 'id',
    name: 'ID'
  },
  {
    key: 'title',
    name: 'Title'
  },
  {
    key: 'firstName',
    name: 'First Name'
  },
  {
    key: 'lastName',
    name: 'Last Name'
  },
  {
    key: 'email',
    name: 'Email'
  }
];

const createFakeRowObjectData = (index) => {
  return {
    id: `id_${index}`,
    email: faker.internet.email(),
    title: faker.name.prefix(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),    
  };
}

const createRows = (numberOfRows) => {
  const rows = [];

  for (let i = 0; i < numberOfRows; i++) {
    rows[i] = createFakeRowObjectData(i);
  }

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

const Wallets1 = () => {
    const [rows, setRows] = useState(() => createRows(50));
    const [isLoading, setIsLoading] = useState(false);
  
    async function handleScroll(event) {
      if (isLoading || !isAtBottom(event)) return;
  
      setIsLoading(true);
  
      const newRows = await loadMoreRows(50, rows.length);
  
      setRows([...rows, ...newRows]);
      setIsLoading(false);
    }
  
    return (
      <>
        <DataGrid
          className="t_height_78vh"
          columns={columns}
          rows={rows}
          rowKeyGetter={rowKeyGetter}
          onRowsChange={setRows}
          rowHeight={30}
          onScroll={handleScroll}
        />
        {isLoading && <div className={'loadMoreRowsClassname'}>Loading more rows...</div>}
      </>
    );
}

export default Wallets1

