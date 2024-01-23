document.addEventListener('DOMContentLoaded', () => {
  // Get the container element
  const wrapper = document.createElement('div');
  wrapper.classList.add('wrapper');

  // Create app details section
  const appDetails = document.createElement('div');
  appDetails.classList.add('app-details');

  const appIcon = document.createElement('img');
  appIcon.src = 'assets/app-icon.jpg';
  appIcon.classList.add('app-icon');

  const appTitle = document.createElement('h1');
  appTitle.classList.add('app-title');
  appTitle.textContent = 'Currency Converter';

  appDetails.appendChild(appIcon);
  appDetails.appendChild(appTitle);

  // Create amount label and input
  const amountLabel = document.createElement('label');
  amountLabel.setAttribute('for', 'amount');
  amountLabel.textContent = 'Amount:';

  const amountInput = document.createElement('input');
  amountInput.setAttribute('type', 'number');
  amountInput.setAttribute('id', 'amount');
  amountInput.setAttribute('value', '100');

  // Create dropdowns container
  const dropdownsContainer = document.createElement('div');
  dropdownsContainer.classList.add('dropdowns');

  // Create from-currency-select dropdown
  const fromCurrencySelect = document.createElement('select');
  fromCurrencySelect.setAttribute('id', 'from-currency-select');

  // Create to-currency-select dropdown
  const toCurrencySelect = document.createElement('select');
  toCurrencySelect.setAttribute('id', 'to-currency-select');

  // Create convert button
  const convertButton = document.createElement('button');
  convertButton.setAttribute('id', 'convert-button');
  convertButton.textContent = 'Convert';

  // Create result paragraph
  const resultParagraph = document.createElement('p');
  resultParagraph.setAttribute('id', 'result');

  // Append created elements to the wrapper
  wrapper.appendChild(appDetails);
  wrapper.appendChild(amountLabel);
  wrapper.appendChild(amountInput);
  wrapper.appendChild(dropdownsContainer);
  dropdownsContainer.appendChild(fromCurrencySelect);
  dropdownsContainer.appendChild(toCurrencySelect);
  wrapper.appendChild(convertButton);
  wrapper.appendChild(resultParagraph);

  // Append wrapper to the body
  document.body.appendChild(wrapper);

  let api = 'https://v6.exchangerate-api.com/v6/6cee5fa804f8c59c9d0b49d2/latest/USD';
  const fromDropDown = document.getElementById('from-currency-select');
  const toDropDown = document.getElementById('to-currency-select');

  // Create dropdown from the currencies array
  currencies.forEach((currency) => {
    const option = document.createElement('option');
    option.value = currency;
    option.text = currency;
    fromDropDown.add(option);
  });

  // Repeat the same thing for the other dropdown
  currencies.forEach((currency) => {
    const option = document.createElement('option');
    option.value = currency;
    option.text = currency;
    toDropDown.add(option);
  });

  // Setting default values
  fromDropDown.value = 'EUR';
  toDropDown.value = 'PKR';

  let convertCurrency = () => {
    // Create References
    const amount = document.querySelector('#amount').value;
    const fromCurrency = fromDropDown.value;
    const toCurrency = toDropDown.value;

    // If amount input field is not empty
    if (amount.length !== 0) {
      fetch(api)
        .then((resp) => resp.json())
        .then((data) => {
          let fromExchangeRate = data.conversion_rates[fromCurrency];
          let toExchangeRate = data.conversion_rates[toCurrency];
          const convertedAmount = (amount / fromExchangeRate) * toExchangeRate;
          resultParagraph.innerHTML = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
        });
    } else {
      alert('Please fill in the amount');
    }
  };

  document.querySelector('#convert-button').addEventListener('click', convertCurrency);
  window.addEventListener('load', convertCurrency);
});
