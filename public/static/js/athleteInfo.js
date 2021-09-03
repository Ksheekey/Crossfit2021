// d3.csv("crossfit0neDivision.csv", function (madison) {
//     madison74 = madison.slice(0, 74)
//     // selecting where to go and clearing output
//     var tableBody = d3.select("tbody");
//     tableBody.html("")


//     for (var i = 0; i < 74; i++) {
//         // console.log(madison[i].event_1)
//         if (madison[i].event_12_curve == "") {
//             madison[i].event_12_curve = 0
//         }
//     }

//     madison.sort(function (a, b) {
//         if (a.event_12_curve < b.event_12_curve) { return 1; }
//         if (a.event_12_curve > b.event_12_curve) { return -1; }
//         return 0;
//     })

//     for (var i = 0; i < 74; i++) {
//         var s = madison[i]
//         var row = tableBody.append("tr");
//         var nameCell = row.append("td");
//         nameCell.text(s.full_name);
//         var scoreCell = row.append("td");
//         scoreCell.text(s.event_12_curve);
//     }
//     console.log(madison74)
// })