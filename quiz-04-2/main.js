const tableHead = document.querySelector("thead");
const tableBody = document.querySelector("tbody");

const renderTable = (sortKey = null, order) => {
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

  if (!!sortKey) {
    if (order === "dec") {
      tours.sort((a, b) => {
        return b[sortKey]
          .toString()
          .localeCompare(a[sortKey].toString(), undefined, {
            numeric: true,
            sensivity: false,
          });
      });
    } else {
      tours.sort((a, b) => {
        return a[sortKey]
          .toString()
          .localeCompare(b[sortKey].toString(), undefined, {
            numeric: true,
            sensivity: false,
          });
      });
    }
  }

  let rowCount = 1;
  for (const tour of tours) {
    tableBody.innerHTML += `
			<tr>
				<th scope="row">${rowCount}</th>
				<td>${tour.id}</td>
				<td>${tour.name}</td>
				<td>${tour.location}</td>
				<td>${tour.price}</td>
				<td>${tour.maxGroupSize}</td>
				<td>${tour.difficulty}</td>
				<td>${tour.duration}</td>
				<td>${tour.ratingsAverage}</td>
				<td>${tour.ratingsQuantity}</td>
			</tr>`;

    rowCount += 1;
  }
};

const query = window.location.search;
if (!query) {
  renderTable();
} else if (query.includes("sort")) {
  let sortKey = query
    .substring(1)
    .split("&")
    .find((item) => item.includes("sort"))
    .split("=")[1];
  let order = "acc";
  if (sortKey[0] === "-") {
    sortKey = sortKey.substring(1);
    order = "dec";
  }
  console.log(sortKey);
  if (Object.keys(tours[0]).includes(sortKey)) {
    renderTable(sortKey, order);
  }
} else {
  renderTable();
}
