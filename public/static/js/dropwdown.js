// d3.json("../allData.json").then((data, err) => {
//     if (err) throw err;
//     console.log(data)
// })

d3.json("allData.json", function (data) {
    // console.log(data);
});

eventList = ['Event 1', 'Event 2', 'Event 3', 'Event 4', 'Event 5', 'Event 6', 'Event 7', 'Event 8', 'Event9', 'Event 10', 'Event 11', 'Event 12', 'Event 13', 'Event 14', 'Event 15']

// creating the dropdown with the sector names
d3.select("#selDataset")
    .selectAll("#events")
    .data(eventList)
    .enter()
    .append("option")
    .text(function (d) { return d })
    .attr("value", function (d) { return d })

