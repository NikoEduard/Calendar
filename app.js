const now = new Date();

let currentMonth = now.getMonth();
let currentYear = now.getFullYear();
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

const backClock = (hours, minutes, seconds) => {
  let hoursTillTheEnd = 23 - hours;
  let minutesTillTheEnd = 59 - minutes;
  if (minutesTillTheEnd < 10) {
    minutesTillTheEnd = `0${minutesTillTheEnd}`;
  }
  let secondsTillTheEnd = 59 - seconds;
  if (secondsTillTheEnd < 10) {
    secondsTillTheEnd = `0${secondsTillTheEnd}`;
  }
  return `${hoursTillTheEnd}:${minutesTillTheEnd}:${secondsTillTheEnd}`;
};
// console.log(backClock(now.getHours(), now.getMinutes(), now.getSeconds()));

const createAndAddCard = function (el, monthIndex, year) {
  let card = 0;
  el.addEventListener("click", () => {
    if (card === 0) {
      card = document.createElement("div");
      card.classList.add("drop-card");
      let currData = new Date();
      let currDataHours = currData.getHours();
      let currDataMinutes = currData.getMinutes();
      let currDataSeconds = currData.getSeconds();
      let clickedDate = new Date(year, monthIndex, Number(el.textContent));
      let daysAmount = Number(currData) - Number(clickedDate);
      let msToDays = Math.floor(daysAmount / 1000 / 60 / 60 / 24);

      if (daysAmount > 0) {
        card.innerHTML = `<p>${el.textContent} ${
          monthIndexToName[monthIndex]
        }</p><p>${msToDays} ${msToDays === 1 ? "day" : "days"} ago</p>`;
      } else if (daysAmount < 0) {
        card.innerHTML = `<p>${el.textContent} ${
          monthIndexToName[monthIndex]
        }</p><p>in ${Math.abs(msToDays)} ${
          Math.abs(msToDays) === 1 ? "day" : "days"
        }</p>`;
      }
      if (msToDays >= 0 && msToDays < 1) {
        card.innerHTML = `<p>${el.textContent} ${
          monthIndexToName[monthIndex]
        }</p><p>Day will end in ${backClock(
          currDataHours,
          currDataMinutes,
          currDataSeconds
        )}`;
      }

      el.append(card);
      setTimeout(() => {
        card.remove();
        card = 0;
      }, 2000);
    }
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
      createAndAddCard(dateNumberElements[i], monthIndex, year);
    }

    //========================================================================
    if (monthIndex === 1 && dateNumberElements[i].textContent == birthDay) {
      dateNumberElements[i].classList.add("birth-day");
      createAndAddCard(dateNumberElements[i], monthIndex, year);
    } else {
      dateNumberElements[i].classList.remove("birth-day");
    }
    //=========================================================================
    if (
      monthIndex === 11 &&
      dateNumberElements[i].textContent == lastDayOfYear
    ) {
      dateNumberElements[i].classList.add("last-day");
      createAndAddCard(dateNumberElements[i], monthIndex, year);
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
