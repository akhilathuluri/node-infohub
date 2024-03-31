# Location Finder

Location Finder is a Node.js library for retrieving information about IP addresses, weather data, and currency conversion rates.

## Installation

You can install the package via npm:

```bash
npm i node-infohub
```

# **Usage**

### **Get IP Information**

```jsx
const { getIPInfo } = require('node-infohub');

// Fetch IP information for a valid IP address
const ipAddress = 'YOUR_IP_HERE';
getIPInfo(ipAddress)
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.error('Error:', error.message);
  });

```

### **Get Weather Information**

```jsx
const { getWeatherInfo } = require('node-infohub');

// Fetch weather information for a specific IP address
const ipAddress = 'YOUR_IP_HERE';
getWeatherInfo(ipAddress)
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.error('Error:', error.message);
  });

```

### **Get Currency Conversion Rate**

```jsx
const { getCurrencyConversion } = require('node-infohub');

// Fetch currency conversion rate
const baseCurrency = 'USD';
const targetCurrency = 'EUR';
getCurrencyConversion(baseCurrency, targetCurrency)
  .then(rate => {
    console.log(`1 ${baseCurrency} equals ${rate} ${targetCurrency}`);
  })
  .catch(error => {
    console.error('Error:', error.message);
  });

```

## **License**

This project is licensed under the MIT License - see the [LICENSE](https://chat.openai.com/c/LICENSE) file for details.

## **Acknowledgements**

- This library uses [axios](https://github.com/axios/axios) for making HTTP requests.

**You can copy and paste this content into your [README.md](http://readme.md/) file. Make sure to adjust any placeholders or customize the content further as needed.**