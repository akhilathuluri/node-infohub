const axios = require('axios');

async function getIPInfo(ipAddress, options = {}) {
    // Function implementation
    const baseUrl = `https://ipinfo.io/${ipAddress}/json`;

    try {
        const response = await axios.get(baseUrl, {
            params: { ...options }
        });
        
        const data = response.data;

        const result = {
            "Country": `${data.country} (${data.countryCode})`,
            "Continent": `${data.continent} (${data.continentCode})`,
            "Coordinates": `${data.loc} (lat) / ${data.loc.split(',')[1]} (long)`,
            "Time": data.timezone ? new Date().toLocaleString("en-US", {timeZone: data.timezone}) : "",
            "ipAddress": data.ip,
            "region":data.region,
            "provider": data.org,
            "ASN": data.asn,
            "lat": data.loc.split(',')[0],
            "lon": data.loc.split(',')[1],
            "CountryInfo": {
                "name": data.country,
                "dial_code": data.countryCallingCode,
                "emoji": data.countryEmoji,
                "code": data.countryCode,
                "population": data.countryPopulation
            }
        };

        return result;
    } catch (error) {
        throw new Error('Error fetching IP info');
    }
}

async function getWeatherInfo(ipAddress) {
    // Function implementation
    const baseUrl = `https://ipinfo.io/${ipAddress}/json`;
    
    try {
        const response = await axios.get(baseUrl);
        const data = response.data;
        
        // Extract latitude and longitude from IP data
        const [lat, lon] = data.loc.split(',');

        // Fetch live weather data using latitude, longitude, and API key
        const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=f48bc04e88b7554ba15df81fe45c3ec5&units=metric`);
        const weatherData = weatherResponse.data;

        // Extract relevant weather information
        const weatherInfo = {
            "Country": `${data.country} (${data.countryCode})`,
            "Continent": `${data.continent} (${data.continentCode})`,
            "Coordinates": `${data.loc} (lat) / ${data.loc.split(',')[1]} (long)`,
            "Time": data.timezone ? new Date().toLocaleString("en-US", {timeZone: data.timezone}) : "",
            "ipAddress": data.ip,
            "hostname": data.hostname,
            "provider": data.org,
            "ASN": data.asn,
            "lat": data.loc.split(',')[0],
            "lon": data.loc.split(',')[1],
            "weather": {
                "location": weatherData.name,
                "temperature": `${weatherData.main.temp}°C`,
                "description": weatherData.weather[0].description,
                "humidity": `${weatherData.main.humidity}%`,
                "wind": `${weatherData.wind.speed} m/s`,
                "visibility": `${weatherData.visibility / 1000} km`,
                "time": new Date(weatherData.dt * 1000).toLocaleString("en-US", {timeZone: data.timezone})
            }
        };

        return weatherInfo;
    } catch (error) {
        throw new Error('Error fetching weather info');
    }
}

async function getCurrencyConversion(baseCurrency, targetCurrency) {
    // Function implementation
    const apiKey = '92ef22448b50d5f6398aa844'; // Replace 'YOUR_API_KEY' with your ExchangeRate-API key
    const baseUrl = `https://api.exchangerate-api.com/v4/latest/${baseCurrency}?api_key=${apiKey}`;

    try {
        // Fetch currency rates using the base currency and API key
        const response = await axios.get(baseUrl);
        const currencyData = response.data;

        // If currency API returns an error
        if (currencyData.result === 'error') {
            throw new Error(`Error fetching currency info: ${currencyData.error_type}`);
        }

        // Get the conversion rate for the target currency
        const conversionRate = currencyData.rates[targetCurrency];

        if (!conversionRate) {
            throw new Error(`Conversion rate for ${targetCurrency} not found.`);
        }

        return conversionRate;
    } catch (error) {
        throw new Error('Error fetching currency conversion: ' + error.message);
    }
}

module.exports = {
    getIPInfo,
    getWeatherInfo,
    getCurrencyConversion
};
