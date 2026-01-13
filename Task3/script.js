document.addEventListener('DOMContentLoaded', function() {
    const temperatureInput = document.getElementById('temperature');
    const inputUnitSelect = document.getElementById('input-unit');
    const outputUnitSelect = document.getElementById('output-unit');
    const convertBtn = document.getElementById('convert-btn');
    const resetBtn = document.getElementById('reset-btn');
    const resultDiv = document.getElementById('result');
    const errorDiv = document.getElementById('error');

    // Conversion functions
    function celsiusToFahrenheit(celsius) {
        return (celsius * 9/5) + 32;
    }

    function celsiusToKelvin(celsius) {
        return celsius + 273.15;
    }

    function fahrenheitToCelsius(fahrenheit) {
        return (fahrenheit - 32) * 5/9;
    }

    function fahrenheitToKelvin(fahrenheit) {
        return (fahrenheit - 32) * 5/9 + 273.15;
    }

    function kelvinToCelsius(kelvin) {
        return kelvin - 273.15;
    }

    function kelvinToFahrenheit(kelvin) {
        return (kelvin - 273.15) * 9/5 + 32;
    }

    function convertTemperature(value, fromUnit, toUnit) {
        let celsiusValue;

        // Convert to Celsius first
        switch (fromUnit) {
            case 'celsius':
                celsiusValue = value;
                break;
            case 'fahrenheit':
                celsiusValue = fahrenheitToCelsius(value);
                break;
            case 'kelvin':
                celsiusValue = kelvinToCelsius(value);
                break;
        }

        // Convert from Celsius to target unit
        switch (toUnit) {
            case 'celsius':
                return celsiusValue;
            case 'fahrenheit':
                return celsiusToFahrenheit(celsiusValue);
            case 'kelvin':
                return celsiusToKelvin(celsiusValue);
        }
    }

    convertBtn.addEventListener('click', function() {
        const temperature = parseFloat(temperatureInput.value);
        const inputUnit = inputUnitSelect.value;
        const outputUnit = outputUnitSelect.value;

        errorDiv.textContent = '';
        resultDiv.textContent = '';

        if (isNaN(temperature)) {
            errorDiv.textContent = 'Please enter a valid number for temperature.';
            return;
        }

        const converted = convertTemperature(temperature, inputUnit, outputUnit);
        const unitSymbols = {
            celsius: '°C',
            fahrenheit: '°F',
            kelvin: 'K'
        };

        resultDiv.textContent = `Converted Temperature: ${converted.toFixed(2)} ${unitSymbols[outputUnit]}`;
    });

    resetBtn.addEventListener('click', function() {
        temperatureInput.value = '';
        inputUnitSelect.selectedIndex = 0;
        outputUnitSelect.selectedIndex = 0;
        resultDiv.textContent = '';
        errorDiv.textContent = '';
    });

    // Optional: Real-time conversion
    temperatureInput.addEventListener('input', function() {
        if (temperatureInput.value.trim() !== '') {
            convertBtn.click();
        } else {
            resultDiv.textContent = '';
            errorDiv.textContent = '';
        }
    });

    inputUnitSelect.addEventListener('change', function() {
        if (temperatureInput.value.trim() !== '') {
            convertBtn.click();
        }
    });

    outputUnitSelect.addEventListener('change', function() {
        if (temperatureInput.value.trim() !== '') {
            convertBtn.click();
        }
    });
});
