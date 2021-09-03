// // // d3.csv("crossfit.csv", function (madison) {

// // //     cols = ['Name', 'Score']

// // //     var t = document.createElement('table');
// // //     t.classList.add('crossfit', 'events');

// // //     t.appendChild(document.createElement('thead'));
// // //     t.querySelector('thead').appendChild(document.createElement('tr'));

// // //     for (var i = 0; i < cols.length; i++) {
// // //         var heading = document.createElement('td');
// // //         heading.textContent = cols[i];
// // //         t.querySelector('thead tr').appendChild(heading);
// // //     }

// // //     document.getElementById('eventTable').appendChild(t);

// // //     for (var i = 0; i < madison.length; i++) {
// // //         console.log(madison[i].event_1)
// // //         if (madison[i].event_1 == "") {
// // //             madison[i].event_1 = "N/A"
// // //         }
// // //     }



// // //     madison.sort(function (a, b) {
// // //         if (a.event_1 < b.event_1) { return -1; }
// // //         if (a.event_1 > b.event_1) { return 1; }
// // //         return 0;
// // //     })

// // //     console.log(madison)

// // //     for (var i = 0; i < madison.length; i++) {
// // //         var s = madison[i]
// // //         var r = document.createElement('tr');

// // //         var nameCell = document.createElement('td');
// // //         nameCell.textContent = s.full_name;

// // //         var scoreCell = document.createElement('td');
// // //         scoreCell.textContent = s.event_1;
// // //         // if (scoreCell.textContent == "") {
// // //         //     scoreCell.textContent = "N/A"
// // //         // }

// // //         // var affiliateCell = document.createElement('td');
// // //         // affiliateCell.textContent = s.affiliate;

// // //         // var countryCell = document.createElement('td');
// // //         // countryCell.textContent = s.country;

// // //         r.appendChild(nameCell);
// // //         r.appendChild(scoreCell);
// // //         // r.appendChild(affiliateCell);
// // //         // r.appendChild(countryCell);

// // //         t.appendChild(r)
// // //     }

// // // });

// d3.csv("crossfit0neDivision.csv", function (madison) {
//     madison74 = madison.slice(0, 74)
//     // // selecting where to go and clearing output
//     // var tableBody = d3.select("tbody");
//     // tableBody.html("")


//     // for (var i = 0; i < 74; i++) {
//     //     // console.log(madison[i].event_1)
//     //     if (madison[i].event_12_curve == "") {
//     //         madison[i].event_12_curve = 0
//     //     }
//     // }

//     // madison.sort(function (a, b) {
//     //     if (a.event_12_curve < b.event_12_curve) { return 1; }
//     //     if (a.event_12_curve > b.event_12_curve) { return -1; }
//     //     return 0;
//     // })

//     // for (var i = 0; i < 74; i++) {
//     //     var s = madison[i]
//     //     var row = tableBody.append("tr");
//     //     var nameCell = row.append("td");
//     //     nameCell.text(s.full_name);
//     //     var scoreCell = row.append("td");
//     //     scoreCell.text(s.event_12_curve);
//     // }
//     console.log(madison74.length)
// })