import {useEffect, useState} from 'react';
import {
  reactExtension,
  useApi,
  AdminAction,
  BlockStack,
  Button,
  Text,
} from '@shopify/ui-extensions-react/admin';

// The target used here must match the target used in the extension's toml file (./shopify.extension.toml)
const TARGET = 'admin.order-index.selection-action.render';

export default reactExtension(TARGET, () => <App />);

function App() {
  // The useApi hook provides access to several useful APIs like i18n, close, and data.
  const {extension: {target}, i18n, close, data} = useApi(TARGET);

  const [listOrders, setOrders] = useState([]);
  const [listOrders2, setOrders2] = useState([]);

  // Use direct API calls to fetch data from Shopify.
  // See https://shopify.dev/docs/api/admin-graphql for more information about Shopify's GraphQL API
  useEffect(() => {
    (async function getOrderInfo() {
      const idsQuery = data.selected
      .map((id) => `id:${id.id.split("/").at(-1)}`)
      .join(" OR ");
     
      // const idsQuery = ;
      const getOrderQuery = {
        query: `query {
          orders(first: 10, query: "${idsQuery}") {
            edges {
                node {
                    id
                }
            }
          }
        }`,
        variables: {query: idsQuery},
      };
      console.log(getOrderQuery);
      const res = await fetch("shopify:admin/api/graphql.json", {
        method: "POST",
        body: JSON.stringify(getOrderQuery),
      });

      if (!res.ok) {
        console.error('Network error');
      }

      const orders = await res.json();
      setOrders2(orders.data)
      
      const orderData = orders.data.orders.edges.map((order) => [
        // {
        //   id: order.node.id
        // },
        // order.map(premise => {
        //   console.log(premise);
        // })
        setOrders(prevArray => [...prevArray, order.node])

        // console.log(order.node)
      ])
      
    })();
  }, []);
  
  console.log(listOrders2);
  const orders = listOrders2?.orders?.edges || [];

  return (

    // The AdminAction component provides an API for setting the title and actions of the Action extension wrapper.
    <AdminAction
      primaryAction={
        <Button
          onPress={() => {
            console.log('saving');
            close();
          }}
        >
          Done
        </Button>
      }
      secondaryAction={
        <Button
          onPress={() => {
            console.log('closing');
            close();
          }}
        >
          Close
        </Button>
      }
    >
      <BlockStack>
        {/* Set the translation values for each supported language in the locales directory */}
        <Text fontWeight="bold">{i18n.translate('welcome', {target})}</Text>
        {listOrders.map(order => <Text>{order.id}</Text>)}

        {orders.map(({ node }) => (
          // Render the order id
          <Text key={node.id}>{node.id}</Text>
        ))}

      </BlockStack>
    </AdminAction>
  );
}

