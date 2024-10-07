const Shopify = require('shopify-api-node');

exports.handler = async (event) => {
  const { email, orderNumber } = JSON.parse(event.body);

  const shopify = new Shopify({
    shopName: 'your-store.myshopify.com',
    apiKey: process.env.SHOPIFY_API_KEY,
    password: process.env.SHOPIFY_API_PASSWORD
  });

  try {
    const orders = await shopify.order.list({ email: email });
    const matchingOrder = orders.find(order => order.order_number === orderNumber);

    if (matchingOrder) {
      return {
        statusCode: 200,
        body: JSON.stringify({ authenticated: true })
      };
    } else {
      return {
        statusCode: 401,
        body: JSON.stringify({ authenticated: false })
      };
    }
  } catch (error) {
    console.error('Authentication error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Authentication failed' })
    };
  }
};