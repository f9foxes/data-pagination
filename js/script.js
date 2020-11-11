/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/


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
//showPage(data, 1);

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