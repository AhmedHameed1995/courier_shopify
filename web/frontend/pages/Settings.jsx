import React, {useEffect, useState} from 'react';

import { useSearchParams } from 'react-router-dom';
import SimpleIndexTable from '../components/SimpleIndexTable';
import { useAuthenticatedFetch } from '../hooks';

function Settings() {
  const [params] = useSearchParams();
  const ids = params.getAll('ids[]');

  const [listOrders, setOrders] = useState([]);

  let fetch = useAuthenticatedFetch();

  // Use direct API calls to fetch data from Shopify.
  // See https://shopify.dev/docs/api/admin-graphql for more information about Shopify's GraphQL API
  useEffect(() => {
    (async function getOrderInfo() {
      const idsQuery = ids.map((id) => `${id}`)
      .join(","); 

      console.log(idsQuery);

      try {
        let request = await fetch(`/api/orders/all?ids=${idsQuery}`, {
          method: "GET",
          Headers: {"Content-Type": "application/json"}
        });
        
        let response = await request.json();
        // console.log(response);
        setOrders(response.orders)
      } catch (error) {
        console.log(error);
      }
      // const orders = await res.json();
    })();
  }, []);

  console.log(listOrders);      

  return (
    <div>
      <SimpleIndexTable orders={listOrders} />
      {/* <p>Parameters from URL: {ids.join(', ')}</p> */}
    </div>
  );
}

export default Settings;