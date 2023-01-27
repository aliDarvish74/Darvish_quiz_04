const tableHead = document.querySelector("thead");
const tableBody = document.querySelector("tbody");

const renderTable = (filterKey = null) => {
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

  if (!!filterKey) {
    const [key, value] = filterKey;
    tours = tours.filter((tour) => {
      return tour[key] === value;
    });
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
} else {
  filterKey = query
    .substring(1)
    .split("&")
    .find((item) => {
      return Object.keys(tours[0]).includes(item.split("=")[0]);
    })
    .split("=");
  renderTable(filterKey);
}
