const header = document.querySelector('header');
const headerHtml = `
      <label for="search" class="student-search">
         <input id="search" placeholder="Search by name...">
         <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
      </label>
    `
// Inserts html into header to allow users to search for students.
header.insertAdjacentHTML('beforeend', headerHtml);

const input = document.querySelector('input');
const label = document.querySelector('label');


// Function that displays 9 students on page load.
// Displays results of student search from input field.
// Displays message if search result is empty.

function showPage(list, page) {
   let h1 = document.querySelector('h1');
   if (list.length < 1 && !h1) {
      let noResults = 'No Results Found';
      let noMatches = `<h1>${noResults}</h1>`
      header.insertAdjacentHTML('afterend', noMatches);
   }  
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

// Function that creates number of buttons needed based on list length.
// Appends buttons to page.
// No buttons displayed if search result is empty.

function  pageButtons(list) {
   const totalButtons = Math.ceil(list.length / 9);
   const linkList = document.querySelector('.link-list');
   linkList.innerHTML = '';

   if (list.length < 1) {
      return;
   }

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

   // Event changes button className to active when button clicked.
   // Displays new page when page button clicked.

   linkList.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON') {
         let active = linkList.querySelector('.active');
         active.className = '';
         e.target.className = 'active';
         let page = e.target.textContent;

         if (data === list){
            showPage (data, page);
         } else {
            showPage (list, page);
         }
      }
   });
}

// Function that creates a new filtered list that matches search input. 
// Calls showPage function with new list to display matching students to input value.
// Calls pageButtons function with new list to update the number of buttons needed on page.

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
   if (filterList.length > 0 && document.querySelector('h1')) {
      document.querySelector('h1').remove();
   }
   showPage(filterList, 1);
   pageButtons(filterList);
}

// Event listeners call filterNames function as someone searches for a student name.
// Events pass inputValue and student data field as arguments.

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

// Call function to load page 1 with the first 9 students from data array.
showPage(data, 1);
// Call function to load page buttons based on number of students in data array.
pageButtons(data);