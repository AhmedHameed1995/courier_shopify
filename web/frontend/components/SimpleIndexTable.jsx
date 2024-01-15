import {
    IndexTable,
    LegacyCard,
    useIndexResourceState,
    Text,
    TextField,
    Badge,
  } from '@shopify/polaris';
  import React from 'react';
  
  function SimpleIndexTable(props) {
    const { orders } = props;
    // const orders = [
    //   {
    //     id: '1020',
    //     order: '#1020',
    //     date: 'Jul 20 at 4:34pm',
    //     customer: 'Jaydon Stanton',
    //     total: '$969.44',
    //     paymentStatus: <Badge progress="complete">Paid</Badge>,
    //     fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
    //   },
    //   {
    //     id: '1019',
    //     order: '#1019',
    //     date: 'Jul 20 at 3:46pm',
    //     customer: 'Ruben Westerfelt',
    //     total: '$701.19',
    //     paymentStatus: <Badge progress="partiallyComplete">Partially paid</Badge>,
    //     fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
    //   },
    //   {
    //     id: '1018',
    //     order: '#1018',
    //     date: 'Jul 20 at 3.44pm',
    //     customer: 'Leo Carder',
    //     total: '$798.24',
    //     paymentStatus: <Badge progress="complete">Paid</Badge>,
    //     fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
    //   },
    // ];
    const resourceName = {
      singular: 'order',
      plural: 'orders',
    };
  
    const {selectedResources, allResourcesSelected, handleSelectionChange} =
      useIndexResourceState(orders);
  
    const rowMarkup = orders.map(
      (
        {id, order_number, date, customer, total, paymentStatus, fulfillmentStatus},
        index,
      ) => (
        <IndexTable.Row
          id={id}
          key={id}
          selected={selectedResources.includes(id)}
          position={index}
        >
          <IndexTable.Cell>
            <Text variant="bodyMd" fontWeight="bold" as="span">
              {index+1}
            </Text>
          </IndexTable.Cell>
          <IndexTable.Cell>
            <Text variant="bodyMd" fontWeight="bold" as="span">
              <TextField
                label="Order #"
                labelHidden
                value={order_number}
                readOnly
                autoComplete="off"
              />
            </Text>
          </IndexTable.Cell>
          <IndexTable.Cell>
            <Text variant="bodyMd" fontWeight="bold" as="span">
              <TextField
                label="Order #"
                labelHidden
                value={order_number}
                readOnly
                autoComplete="off"
              />
            </Text>
          </IndexTable.Cell>
          {/* <IndexTable.Cell>{date}</IndexTable.Cell>
          <IndexTable.Cell>{customer}</IndexTable.Cell>
          <IndexTable.Cell>
            <Text as="span" alignment="end" numeric>
              {total}
            </Text>
          </IndexTable.Cell>
          <IndexTable.Cell>{paymentStatus}</IndexTable.Cell>
          <IndexTable.Cell>{fulfillmentStatus}</IndexTable.Cell> */}
        </IndexTable.Row>
      ),
    );
  
    return (
      <LegacyCard>
        <IndexTable
          resourceName={resourceName}
          itemCount={orders.length}
          selectedItemsCount={
            allResourcesSelected ? 'All' : selectedResources.length
          }
          onSelectionChange={handleSelectionChange}
          headings={[
            {title: '#'},
            {title: 'Order'},
            {title: 'Name'},
            {title: 'Phone'},
            {title: 'Total', alignment: 'end'},
            {title: 'Payment status'},
            {title: 'Fulfillment status'},
          ]}
        >
          {rowMarkup}
        </IndexTable>
      </LegacyCard>
    );
  }
  export default SimpleIndexTable;