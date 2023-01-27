const tableHead = document.querySelector("thead");
const tableBody = document.querySelector("tbody");

const renderTable = (filterKey = null) => {
  const headers = Object.keys(tours[0]);

  tableHead.innerHTML = `
		<tr>
		<th scope="col">No.</th>
			${headers
        .map((head) => {
          console.log(head);
          console.log(filterKey);
          if (!!filterKey && filterKey.includes(head)) {
            return;
          }
          return `<th scope="col">${head}</th>`;
        })
        .join("")}
			
		</tr>`;

  let rowCount = 1;
  for (const tour of tours) {
    tableBody.innerHTML += `
			<tr>
				<th scope="row">${rowCount}</th>
				${Object.entries(tour)
          .map(([key, value]) => {
            if (!!filterKey && filterKey.includes(key)) {
              return;
            }

            return `<th scope="row">${value}</th>`;
          })
          .join("")}
			</tr>`;

    rowCount += 1;
  }
};

const query = window.location.search;

if (!query) {
  renderTable();
} else if (query.includes("fields")) {
  let filterKey = query
    .substring(1)
    .split("&")
    .find((item) => item.includes("fields"))
    .split("=")[1]
    .split(",")
    .filter((item) => item[0] === "-")
    .map((el) => el.substring(1));

  renderTable(filterKey);
} else {
  renderTable();
}
