const jwt = require('jsonwebtoken')

const accessKey = {
  "developer_id": "bb0da9f9-16a4-49ad-91dc-14a431c68a35",
  "key_id": "e7a2d53b-f370-4f0b-91fa-9421a8b5fd34",
  "signing_secret": "LPhcDoCSmciGSjmqw-Ri3p5RqrsUOQSEp2ZpHeE7fKA"
}

// Set JWT Payload data
const data = {
  aud: 'doordash',
  iss: accessKey.developer_id,
  kid: accessKey.key_id,
  exp: Math.floor(Date.now() / 1000 + 300),
  iat: Math.floor(Date.now() / 1000),
}

// Set JWT header, including DoorDash header used to identify DoorDash JWT version
const headers = { algorithm: 'HS256', header: { 'dd-ver': 'DD-JWT-V1' } }

// Create signature, decoding signing secret when passing the parameter 
const token = jwt.sign(
  data,
  Buffer.from(accessKey.signing_secret, 'base64'),
  headers,
)

console.log(token)

// Generate Unique ID for Delivery
const deliveryId = crypto.randomUUID(); // TODO: Replace with generated system ID

const axios = require('axios')

// Create data needed to create a new delivery 
const body = JSON.stringify({
  external_delivery_id: 'D-12345',
  pickup_address: '901 Market Street 6th Floor San Francisco, CA 94103',
  pickup_business_name: 'Wells Fargo SF Downtown',
  pickup_phone_number: '+16505555555',
  pickup_instructions: 'Enter gate code 1234 on the callbox.',
  dropoff_address: '901 Market Street 6th Floor San Francisco, CA 94103',
  dropoff_business_name: 'Wells Fargo SF Downtown',
  dropoff_phone_number: '+16505555555',
  dropoff_instructions: 'Enter gate code 1234 on the callbox.',
  order_value: 1999,
})

// Make API call, write response data with successful result, otherwise write error
axios
  .get('https://openapi.doordash.com/drive/v2/deliveries/D-12345', {
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  })
  .then(function (response) {
    console.log(response.data)
  })
  .catch(function (error) {
    console.log(error)
  })