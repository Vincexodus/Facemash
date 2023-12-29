const imgDir = "images/farm%20animals/";

document.addEventListener('DOMContentLoaded', function () {
  const sessionStorageArray = [];
  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i);
    const value = sessionStorage.getItem(key);
    const floatValue = parseFloat(value);

    if (!isNaN(floatValue)) {
      const roundedValue = floatValue.toFixed(3);
      sessionStorageArray.push({ key, value: roundedValue });
    }
  }

  sessionStorageArray.sort((a, b) => parseFloat(b.value) - parseFloat(a.value));

  const tableBody = document.getElementById('eloTableBody');
  tableBody.innerHTML = '';

  sessionStorageArray.forEach((item, index) => {
    const row = tableBody.insertRow();
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);

    const imgElement = document.createElement('img');
    imgElement.src = imgDir + item.key;

    imgElement.style.width = '7.5rem';
    imgElement.style.height = '10rem';

    cell1.textContent = index + 1;
    cell2.appendChild(imgElement);
    cell3.textContent = item.value;
  });
});