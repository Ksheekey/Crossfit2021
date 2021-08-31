d3.csv("crossfit.csv", function (data) {

    cols = ['Name', 'Score']

    var t = document.createElement('table');
    t.classList.add('crossfit', 'events');

    t.appendChild(document.createElement('thead'));
    t.querySelector('thead').appendChild(document.createElement('tr'));

    for (var i = 0; i < cols.length; i++) {
        var heading = document.createElement('td');
        heading.textContent = cols[i];
        t.querySelector('thead tr').appendChild(heading);
    }

    document.getElementById('eventTable').appendChild(t);

    for (var i = 0; i < data.length; i++) {
        console.log(data[i].event_1)
        if (data[i].event_1 == "") {
            data[i].event_1 = "N/A"
        }
    }

    

    data.sort(function (a, b) {
        if (a.event_1 < b.event_1) { return -1; }
        if (a.event_1 > b.event_1) { return 1; }
        return 0;
    })

    console.log(data)

    for (var i = 0; i < data.length; i++) {
        var s = data[i]
        var r = document.createElement('tr');

        var nameCell = document.createElement('td');
        nameCell.textContent = s.full_name;

        var scoreCell = document.createElement('td');
        scoreCell.textContent = s.event_1;
        // if (scoreCell.textContent == "") {
        //     scoreCell.textContent = "N/A"
        // }

        // var affiliateCell = document.createElement('td');
        // affiliateCell.textContent = s.affiliate;

        // var countryCell = document.createElement('td');
        // countryCell.textContent = s.country;

        r.appendChild(nameCell);
        r.appendChild(scoreCell);
        // r.appendChild(affiliateCell);
        // r.appendChild(countryCell);

        t.appendChild(r)
    }

});