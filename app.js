const now = new Date();

let currentMonth = now.getMonth();
// console.log(currentMonth);
let currentYear = now.getFullYear();
// console.log(currentYear);
const monthElement = document.querySelector(".month");
const prevBtn = document.querySelector(".previous");
const nextBtn = document.querySelector(".next");
const monthIndexToName = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December",
};

const dateNumberElements = [...document.querySelectorAll(".date-number")];
const getDataAndAddToCard = function (day, month, year) {
  let daysInYear =
    (year % 4 === 0 && year % 100 > 0) || year % 400 == 0 ? 366 : 365;
  // const startDate = new Date(`${year}-01-01T00:00:00`);
  // const endDate = new Date(`${year}-02-22T00:00:00`);
  // console.log((endDate - startDate) / 1000 / 60 / 60 / 24);
};

const createAndAddCard = function (el, monthIndex, year) {
  el.addEventListener("click", () => {
    let card = document.createElement("div");
    card.classList.add("drop-card");
    // card.innerHTML = `<p>${el.textContent} ${monthIndexToName[monthIndex]}</p>
    // <p></p>`;

    el.append(card);
    setTimeout(() => {
      card.remove();
    }, 2000);
  });
};

const renderMonth = (monthIndex, year) => {
  monthElement.innerHTML = `${year} / ${monthIndexToName[monthIndex]}`;
  const firstDate = new Date(year, monthIndex, 1);
  const numDaysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const firstDay = firstDate.getDay();
  const birthDay = new Date(year, 1, 22).getDate();
  const lastDayOfYear = new Date(year, 0, 0).getDate();
  const knowledgeDay = new Date(year, 8, 1).getDate();

  dateNumberElements.forEach((item, i) => {
    const dateNumber = i + 1 - firstDay;
    item.innerHTML =
      dateNumber > 0 && dateNumber <= numDaysInMonth ? dateNumber : "";
    const today = new Date();

    if (
      today.getMonth() === monthIndex &&
      today.getFullYear() === year &&
      today.getDate() === dateNumber
    ) {
      item.classList.add("today");
    } else {
      item.classList.remove("today");
    }

    //========================================================================

    if (dateNumberElements[i].classList.contains("today")) {
      createAndAddCard(dateNumberElements[i], monthIndex);
    }

    //========================================================================
    if (monthIndex === 1 && dateNumberElements[i].textContent == birthDay) {
      dateNumberElements[i].classList.add("birth-day");
      createAndAddCard(dateNumberElements[i], monthIndex);
    } else {
      dateNumberElements[i].classList.remove("birth-day");
    }
    //=========================================================================
    if (
      monthIndex === 11 &&
      dateNumberElements[i].textContent == lastDayOfYear
    ) {
      dateNumberElements[i].classList.add("last-day");
      createAndAddCard(dateNumberElements[i], monthIndex);
    } else {
      dateNumberElements[i].classList.remove("last-day");
    }
    //========================================================================
    if (monthIndex === 8 && dateNumberElements[i].textContent == knowledgeDay) {
      dateNumberElements[i].classList.add("knowledge-day");
      createAndAddCard(dateNumberElements[i], monthIndex, year);
    } else {
      dateNumberElements[i].classList.remove("knowledge-day");
    }
    //========================================================================
  });
};

prevBtn.addEventListener("click", () => {
  if (currentMonth === 0) {
    currentMonth = 11;
    currentYear--;
  } else {
    currentMonth--;
  }
  renderMonth(currentMonth, currentYear);
});
nextBtn.addEventListener("click", () => {
  if (currentMonth === 11) {
    currentMonth = 0;
    currentYear++;
  } else {
    currentMonth++;
  }
  renderMonth(currentMonth, currentYear);
});

renderMonth(currentMonth, currentYear);
