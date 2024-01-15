// ExampleTable.js
import React, { useState } from 'react';
import { Form, DataTable, Checkbox } from '@shopify/polaris';

const ExampleTable = ({ ids }) => {
  const [selectedRows, setSelectedRows] = useState([]);

  const handleSelectionChange = (rows) => {
    const selectedIds = rows.map(rowId => rows.find(row => row.id === rowId).id);
    setSelectedRows(selectedIds);
  };

  const rows = ids.map((id) => ({ id, test: `Item ${id}` }));

  const rowMarkup = rows.map(({ id, test }) => (
    <DataTable.Row key={id} id={id}>
      <DataTable.Cell>{id}</DataTable.Cell>
      <DataTable.Cell>{test}</DataTable.Cell>
      <DataTable.Cell>
        <Checkbox
          checked={selectedRows.includes(id)}
          onChange={() => handleSelectionChange([...selectedRows, id])}
        />
      </DataTable.Cell>
    </DataTable.Row>
  ));

  return (
    <Form>
      <DataTable
        columnContentTypes={['text', 'text', 'text']}
        headings={['ID', 'Test', 'Select']}
        rows={rows}
        selectedRows={selectedRows}
        onSelectionChange={handleSelectionChange}
      >
        {rowMarkup}
      </DataTable>
    </Form>
  );
};

export default ExampleTable;
