import {
  IndexTable,
  LegacyCard,
  useIndexResourceState,
  Text,
  TextField,
} from '@shopify/polaris';
import React from 'react';

function SimpleIndexTable(props) {
  const { orders } = props;

  const resourceName = {
    singular: 'order',
    plural: 'orders',
  };

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(orders);

  // Helper function to get a value based on priority
  const getValueByPriority = (key, order) => {
    const keys = [
      `shipping_address.${key}`,
      `billing_address.${key}`,
      `customer.default_address.${key}`,
      `customer.${key}`,
    ];

    for (const fullKey of keys) {
      const value = fullKey.split('.').reduce((obj, k) => obj?.[k], order);
      if (value) return value;
    }
    return '';
  };

  const rowMarkup = orders.map(
    (
      { id, order_number, date, total, paymentStatus, fulfillmentStatus, ...order },
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
            {index + 1}
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
              label="Name"
              labelHidden
              value={getValueByPriority('first_name', order)}
              readOnly
              autoComplete="off"
            />
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text variant="bodyMd" fontWeight="bold" as="span">
            <TextField
              label="Last Name"
              labelHidden
              value={getValueByPriority('last_name', order)}
              readOnly
              autoComplete="off"
            />
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text variant="bodyMd" fontWeight="bold" as="span">
            <TextField
              label="Phone"
              labelHidden
              value={getValueByPriority('phone', order)}
              readOnly
              autoComplete="off"
            />
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text variant="bodyMd" fontWeight="bold" as="span">
            <TextField
              label="Address1"
              labelHidden
              value={getValueByPriority('address1', order)}
              autoComplete="off"
            />
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text variant="bodyMd" fontWeight="bold" as="span">
            <TextField
              label="Address2"
              labelHidden
              value={getValueByPriority('address2', order)}
              autoComplete="off"
            />
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text variant="bodyMd" fontWeight="bold" as="span">
            <TextField
              label="Country"
              labelHidden
              value={getValueByPriority('country', order)}
              autoComplete="off"
            />
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text variant="bodyMd" fontWeight="bold" as="span">
            <TextField
              label="City"
              labelHidden
              value={getValueByPriority('city', order)}
              autoComplete="off"
            />
          </Text>
        </IndexTable.Cell>
        {/* Add other cells as needed */}
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
          { title: '#' },
          { title: 'Order' },
          { title: 'Name' },
          { title: 'Last Name' },
          { title: 'Phone' },
          { title: 'Address1' },
          { title: 'Address2' },
          { title: 'Country' },
          { title: 'City' },
          { title: 'Total', alignment: 'end' },
          { title: 'Payment status' },
          { title: 'Fulfillment status' },
        ]}
      >
        {rowMarkup}
      </IndexTable>
    </LegacyCard>
  );
}
export default SimpleIndexTable;
