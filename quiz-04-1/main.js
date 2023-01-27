const tableHead = document.querySelector("thead");
const tableBody = document.querySelector("tbody");

const renderTable = (limit = 5, page = 1) => {
  tableHead.innerHTML = `
		<tr>
			<th scope="col">No.</th>
			<th scope="col">Tour ID</th>
			<th scope="col">Name</th>
			<th scope="col">Location</th>
			<th scope="col">Price</th>
			<th scope="col">Group Size</th>
			<th scope="col">difficulty</th>
			<th scope="col">duration</th>
			<th scope="col">Ratings Average</th>
			<th scope="col">Ratings Quantity</th>
		</tr>`;

  let targetPage = pagination(limit).find((item) => item.page === page);

  let startIndex = targetPage.startIndex;
  let rowCount = 1;
  for (let i = startIndex; i < startIndex + limit; i++) {
    if (!tours[i]) {
      break;
    }
    tableBody.innerHTML += `
			<tr>
				<th scope="row">${rowCount}</th>
				<td>${tours[i].id}</td>
				<td>${tours[i].name}</td>
				<td>${tours[i].location}</td>
				<td>${tours[i].price}</td>
				<td>${tours[i].maxGroupSize}</td>
				<td>${tours[i].difficulty}</td>
				<td>${tours[i].duration}</td>
				<td>${tours[i].ratingsAverage}</td>
				<td>${tours[i].ratingsQuantity}</td>
			</tr>`;

    rowCount += 1;
  }
};

function pagination(limit) {
  const pageCount = Math.ceil(tours.length / limit);
  let startIndex = 0;
  let pages = [];

  for (let i = 0; i < pageCount; i++) {
    pages.push({ page: i + 1, startIndex });
    startIndex += limit;
  }
  return pages;
}

let query = window.location.search;

if (!!query) {
  query = query.substring(1).split("&");
  renderTable(
    Number(query[0]).replace("page=", ""),
    Number(query[1].replace("limit=", ""))
  );
} else {
  renderTable();
}
