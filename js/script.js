const header = document.querySelector('header');
const headerHtml = `
      <label for="search" class="student-search">
         <input id="search" placeholder="Search by name...">
         <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
      </label>
   `
header.insertAdjacentHTML('beforeend', headerHtml);
const input = document.querySelector('input');
const label = document.querySelector('label');

function filterNames(searchInput, list) {   
   let filterList = [];
   for (let i = 0; i < list.length; i++) {
      let firstName = list[i].name.first;
      let lastName = list[i].name.last;
      let fullName = `${firstName} ${lastName}`;
      let filterName = fullName.toLocaleLowerCase();
      if (filterName.includes(searchInput.toLowerCase())) {
         filterList.push(list[i]);
      }   
   }
   // handle empty search results
   showPage(filterList, 1);
   pageButtons(filterList);
}

 label.addEventListener('click', (e) => {
   e.preventDefault();
   if (e.target.value === '') {
      return;
   }
   else if (e.target.tagName === 'IMG' || 'BUTTON') {
   const inputValue = document.querySelector('input').value;
   filterNames(inputValue, data);
   }
 });

input.addEventListener('keyup', (e) => {
   const inputValue = document.querySelector('input').value;
   filterNames(inputValue, data);
 });
/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
function showPage(list, page) {
   let startIndex = (page * 9) - 9;
   let endIndex =  page * 9;
   const studentList = document.querySelector('.student-list');
   studentList.innerHTML = '';

   for (let i = 0; i < list.length; i++) {
      if (i >= startIndex && i < endIndex) {
         let student = list[i];
         let html = `
                     <li class="student-item cf">
                        <div class="student-details">
                           <img class="avatar" src=${student.picture.large} alt="Profile Picture">
                           <h3>${student.name.first} ${student.name.last}</h3>
                           <span class="email">${student.email}</span>
                        </div>
                        <div class="joined-details">
                           <span class="date">Joined ${student.registered.date}</span>
                        </div>
                     </li>
                  `
         studentList.insertAdjacentHTML('beforeend', html);
      }
   }
}


/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

function  pageButtons(list) {
   const totalButtons = Math.ceil(list.length / 9);
   const linkList = document.querySelector('.link-list');
   linkList.innerHTML = '';

   for (let i = 0; i <  totalButtons;  i++) {
      let html = `
      <li>
         <button type="button">${i + 1}</button>
      </li>
      `
      linkList.insertAdjacentHTML('beforeend', html);
   }

   let firstButton = document.querySelector('.link-list').firstElementChild.firstElementChild;
   firstButton.className = 'active';

   linkList.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON') {
         let active = linkList.querySelector('.active');

         active.className = '';

         e.target.className = 'active';

         let page = e.target.textContent;

         showPage(data, page);
      }
   });

}

// Call functions

showPage(data, 1);
pageButtons(data);