try {
    const response = await client.applePayApi.registerDomain({
      domainName: 'www.maydayz.com'
    });
  
    console.log(response.result);
  } catch(error) {
    console.log(error);
  }