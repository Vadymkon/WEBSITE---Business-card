import './index.css';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
// import required modules

var itemsList = [];

function loadListFromFile() {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const data = xhr.responseText.split('\n');
      populateList(data);
    }
  };
  xhr.open('GET', 'list.txt', true);
  xhr.send();
}

function populateList(data) {
  data.forEach((item, index) => {
    const itemData = item.trim().split('~');
    const itemName = typeof itemData[0] === 'string' ? itemData[0].trim() : '';
    const itemPrice = typeof itemData[1] === 'string' ? itemData[1].trim() : '';
    const itemObj = { name: itemName, price: itemPrice, initialIndex: index + 1 };
    itemsList.push(itemObj);
  });

  // Создаем корневой элемент React и рендерим компонент SearchField
  ReactDOM.createRoot(document.getElementById('searchfield')).render(<SearchField />);
}

function SearchField() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState([...itemsList]);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredItems([...itemsList]);
    } else {
      const filteredItems = itemsList.filter(
        (item) => item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredItems(filteredItems);
    }
  }, [searchTerm]);

  return (
    <div className="searchfield">
      <div className="searcherf">
      <input
        type="text"
        className="searcher"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      </div>
      <div id="list">
        <ul>
          {filteredItems.map((value, index) => (
            <li key={`item-${index}`}>
              <div className="sortable-item">
                <div className="item-packet">
                  <div className="item-num">{value.initialIndex}</div>
                  <span className="item-name">{value.name}</span>
                </div>
                <span className="item-price">{value.price}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// Загрузка списка из файла при загрузке страницы
loadListFromFile();



// const widget1 = document.getElementById('widget1');
// const widget2 = document.getElementById('widget2');
// const toggleButton = document.getElementById('toggleButton');

// let isWidget1OnTop = true;

// toggleButton.addEventListener('click', () => {
//   if (isWidget1OnTop) {
//     widget1.style.transform = 'translateX(0)';
//     widget2.style.transform = 'translateX(-100px)';
//   } else {
//     widget1.style.transform = 'translateX(100px)';
//     widget2.style.transform = 'translateX(0)';
//   }

//   isWidget1OnTop = !isWidget1OnTop;
// });



    