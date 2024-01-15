import React, { useState, useEffect } from 'react';
import { IndexTable, LegacyCard, useIndexResourceState, Text, TextField, Select } from '@shopify/polaris';

// Sample list of countries for the "Country" field
const countryOptions = [
  { label: 'United States', value: 'US' },
  { label: 'Canada', value: 'CA' },
  // Add more countries as needed
];

const columnConfig = [
  { column: 'order_number', type: 'index', readOnly: true },
  { column: 'name', type: 'text', label: 'Name', readOnly: false, required: true },
  { column: 'phone', type: 'text', label: 'Phone', readOnly: false, required: true },
  { column: 'address1', type: 'text', label: 'Address1', readOnly: true },
  { column: 'address2', type: 'text', label: 'Address2', readOnly: true },
  { column: 'country', type: 'select', label: 'Country', readOnly: false, options: countryOptions, required: true },
  { column: 'city', type: 'text', label: 'City', readOnly: true },
  // Add more fields as needed
];

function SimpleIndexTable(props) {
  const { orders } = props;
  const { selectedResources, allResourcesSelected, handleSelectionChange } = useIndexResourceState(orders);

  const [fieldValues, setFieldValues] = useState({});

  useEffect(() => {
    // Set default values when orders change
    const defaultValues = {};
    orders.forEach(order => {
      const orderValues = {};
      columnConfig.forEach(({ column, type }) => {
        orderValues[column] =
          type === 'text' && column === 'name'
            ? `${getValueByPriority('first_name', order)} ${getValueByPriority('last_name', order)}`
            : getValueByPriority(column, order);
      });
      defaultValues[order.id] = orderValues;
    });
    setFieldValues(defaultValues);
  }, [orders]);

  const handleChange = (orderId, column, value) => {
    setFieldValues((prevValues) => ({
      ...prevValues,
      [orderId]: {
        ...prevValues[orderId],
        [column]: value,
      },
    }));
  };

  const handleCountryChange = (selectedCountry, orderId) => {
    handleChange(orderId, 'country', selectedCountry);
  };
  
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

  const rowMarkup = orders.map((order, index) => (
    <IndexTable.Row
      id={order.id}
      key={order.id}
      selected={selectedResources.includes(order.id)}
      position={index}
    >
      {columnConfig.map(({ column, type, label, readOnly, options, required }) => (
        <IndexTable.Cell key={column}>
          <Text variant="bodyMd" fontWeight="bold" as="span">
            {type === 'index' ? index + 1 : null}
            {type === 'text' ? (
              <TextField
                label={label}
                labelHidden
                value={(fieldValues[order.id] && fieldValues[order.id][column]) || ''}
                readOnly={readOnly}
                autoComplete="off"
                onChange={(value) => handleChange(order.id, column, value)}
                required={required}
              />
            ) : type === 'select' ? (
              <Select
                  label={label}
                  labelHidden
                  options={options}
                  onChange={(value) => handleChange(order.id, column, value)}
                  value={(fieldValues[order.id] && fieldValues[order.id][column]) || ''}
                  required={required}
                />
            ) : null}
            {/* Add other cell types as needed */}
          </Text>
        </IndexTable.Cell>
      ))}
    </IndexTable.Row>
  ));

  return (
    <LegacyCard>
      <IndexTable
        resourceName={{ singular: 'order', plural: 'orders' }}
        itemCount={orders.length}
        selectedItemsCount={allResourcesSelected ? 'All' : selectedResources.length}
        onSelectionChange={handleSelectionChange}
        headings={[
          { title: '#' },
          ...columnConfig
            .filter(({ type }) => type === 'text' || type === 'select')
            .map(({ label }) => ({ title: label })),
        ]}
      >
        {rowMarkup}
      </IndexTable>
    </LegacyCard>
  );
}

export default SimpleIndexTable;
