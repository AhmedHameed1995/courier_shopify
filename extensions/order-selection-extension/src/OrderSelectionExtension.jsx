// extensions/order-selection-extension/src/OrderSelectionExtension.jsx
import React, { useEffect } from 'react';
import { AppProvider, Page, AlphaCard, Button } from '@shopify/polaris'; // Updated import
import { createAction } from '@shopify/app-bridge/actions';
import { reactExtension, useApi } from '@shopify/ui-extensions-react/admin';
import { AdminAction } from '@shopify/ui-extensions/admin';

const TARGET = 'admin.order-index.selection-action.render';

function OrderSelectionExtension() {
  const { extension: { target }, data } = useApi(TARGET);

  useEffect(() => {
    // Handle selection data changes
    console.log('Selected orders:', data.selected);
  }, [data.selected]);

  const handleButtonClick = () => {
    // Perform your custom action when the button is clicked
    console.log('Button clicked!');
    // You can use app bridge actions to perform custom actions here if needed

    // For example, triggering a toast message
    const toastAction = createAction('Polaris.Toast', {
      content: 'Custom button clicked!',
      duration: 5000,
    });
    toastAction.dispatch();
  };

  return (
    <AppProvider>
      <AdminAction>
          <Button onClick={handleButtonClick}>
            Custom Button
          </Button>
      </AdminAction>
    </AppProvider>
  );
}

export default reactExtension(TARGET, () => <OrderSelectionExtension />);
