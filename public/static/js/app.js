am4core.ready(function (init) {

    // Themes begin
    am4core.useTheme(am4themes_dark);
    am4core.useTheme(am4themes_animated);
    // Themes end
    am4core.globalAdapter.addAll(2)
    var chart = am4core.create("chartdiv", am4charts.XYChart);
    chart.padding(40, 40, 40, 40);
    chart.numberFormatter.numberFormat = "#,###.";

    var label = chart.plotContainer.createChild(am4core.Label);
    label.x = am4core.percent(97);
    label.y = am4core.percent(95);
    label.horizontalCenter = "right";
    label.verticalCenter = "middle";
    label.dx = -15;
    label.fontSize = 50;

    var playButton = chart.plotContainer.createChild(am4core.PlayButton);
    playButton.x = am4core.percent(97);
    playButton.y = am4core.percent(95);
    playButton.dy = -2;
    playButton.verticalCenter = "middle";
    playButton.events.on("toggled", function (event) {
        if (event.target.isActive) {
            play();
        }
        else {
            stop();
        }
    })

    var stepDuration = 7500;

    var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.dataFields.category = "athlete";
    categoryAxis.renderer.minGridDistance = 1;
    categoryAxis.renderer.inversed = true;
    categoryAxis.renderer.grid.template.disabled = true;

    var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.rangeChangeEasing = am4core.ease.linear;
    valueAxis.rangeChangeDuration = stepDuration * 100;

    var series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.categoryY = "athlete";
    series.dataFields.valueX = "score";
    series.tooltipText = "{valueX.value}"
    series.columns.template.strokeOpacity = 0;
    series.columns.template.column.cornerRadiusBottomRight = 5;
    series.columns.maxColumns = 1
    series.columns.template.column.cornerRadiusTopRight = 5;
    series.interpolationDuration = stepDuration;
    series.interpolationEasing = am4core.ease.linear;

    var labelBullet = series.bullets.push(new am4charts.LabelBullet())
    labelBullet.label.horizontalCenter = "right";
    labelBullet.label.text = "{values.valueX.workingValue.formatNumber('#,###.')}";
    labelBullet.label.textAlign = "end";
    labelBullet.label.dx = -10;
    chart.zoomOutButton.disabled = true;

    series.columns.template.adapter.add("fill", function (fill, target) {
        return chart.colors.getIndex(target.dataItem.index);
    });

    var event = 1;
    label.text = event.toString();

    var interval;

    function play() {
        interval = setInterval(function () {
            nextevent();
        }, stepDuration)
        nextevent();
    }

    function stop() {
        if (interval) {
            clearInterval(interval);
        }
    }

    d3.csv("crossfit0neDivision.csv", function (madison) {
        madison74 = madison.slice(0, 74)
        // selecting where to go and clearing output
        var tableBody = d3.select("tbody");
        tableBody.html("")

        for (var i = 0; i < madison74.length; i++) {
            if (madison74[i].event_1 == "") {
                madison74[i].event_1 = "N/A"
            }
        }

        madison74.sort(function (a, b) {
            if (a.event_1 < b.event_1) { return -1; }
            if (a.event_1 > b.event_1) { return 1; }
            return 0;
        })

        for (var i = 0; i < madison74.length; i++) {
            var s = madison74[i]
            var row = tableBody.append("tr");
            var nameCell = row.append("td");
            nameCell.text(s.full_name);
            var scoreCell = row.append("td");
            scoreCell.text(s.event_1);
        }
    })

    function nextevent() {
        event++

        if (event > 15) {
            stop();
        }

        var _list = []
        var newData = allData[event];
        var itemsWithNonZero = 15;
        for (var i = 0; i < chart.data.length; i++) {
            chart.data[i].score = newData[i].score;
            _list.push(chart.data[i].score)
        }

        if (event == 1) {
            series.interpolationDuration = stepDuration / 4;
            valueAxis.rangeChangeDuration = stepDuration / 4;
        }
        else {
            series.interpolationDuration = stepDuration;
            valueAxis.rangeChangeDuration = stepDuration;
        }

        chart.invalidateRawData();
        label.text = event.toString();

        categoryAxis.zoom({ start: 0, end: itemsWithNonZero / categoryAxis.dataItems.length });

        d3.csv("crossfit0neDivision.csv", function (madison) {
            madison74 = madison.slice(0, 74)

            if (event == 1) {
                var tableBody = d3.select("tbody");
                tableBody.html("")

                for (var i = 0; i < madison74.length; i++) {
                    if (madison74[i].event_1 == "") {
                        madison74[i].event_1 = "N/A"
                    }
                }

                madison74.sort(function (a, b) {
                    if (a.event_1 < b.event_1) { return -1; }
                    if (a.event_1 > b.event_1) { return 1; }
                    return 0;
                })

                for (var i = 0; i < madison74.length; i++) {
                    var s = madison74[i]
                    var row = tableBody.append("tr");
                    var nameCell = row.append("td");
                    nameCell.text(s.full_name);
                    var scoreCell = row.append("td");
                    scoreCell.text(s.event_1);
                }
            }
            if (event == 2) {
                var tableBody = d3.select("tbody");
                tableBody.html("")

                for (var i = 0; i < madison74.length; i++) {
                    if (madison74[i].event_2 == "") {
                        madison74[i].event_2 = "N/A"
                    }
                }

                madison74.sort(function (a, b) {
                    if (a.event_2 < b.event_2) { return -1; }
                    if (a.event_2 > b.event_2) { return 1; }
                    return 0;
                })

                for (var i = 0; i < madison74.length; i++) {
                    var s = madison74[i]
                    var row = tableBody.append("tr");
                    var nameCell = row.append("td");
                    nameCell.text(s.full_name);
                    var scoreCell = row.append("td");
                    scoreCell.text(s.event_2);
                }
            }
            if (event == 3) {
                var tableBody = d3.select("tbody");
                tableBody.html("")

                for (var i = 0; i < madison74.length; i++) {
                    if (madison74[i].event_3 == "") {
                        madison74[i].event_3 = "N/A"
                    }
                }

                madison74.sort(function (a, b) {
                    if (a.event_3 < b.event_3) { return -1; }
                    if (a.event_3 > b.event_3) { return 1; }
                    return 0;
                })

                for (var i = 0; i < madison74.length; i++) {
                    var s = madison74[i]
                    var row = tableBody.append("tr");
                    var nameCell = row.append("td");
                    nameCell.text(s.full_name);
                    var scoreCell = row.append("td");
                    scoreCell.text(s.event_3);
                }
            }
            if (event == 4) {
                var tableBody = d3.select("tbody");
                tableBody.html("")

                for (var i = 0; i < madison74.length; i++) {
                    if (madison74[i].event_4 == "") {
                        madison74[i].event_4 = "N/A"
                    }
                }

                madison74.sort(function (a, b) {
                    if (a.event_4 < b.event_4) { return -1; }
                    if (a.event_4 > b.event_4) { return 1; }
                    return 0;
                })

                for (var i = 0; i < madison74.length; i++) {
                    var s = madison74[i]
                    var row = tableBody.append("tr");
                    var nameCell = row.append("td");
                    nameCell.text(s.full_name);
                    var scoreCell = row.append("td");
                    scoreCell.text(s.event_4);
                }
            }
            if (event == 5) {
                var tableBody = d3.select("tbody");
                tableBody.html("")

                for (var i = 0; i < madison74.length; i++) {
                    if (madison74[i].event_5 == "") {
                        madison74[i].event_5 = "N/A"
                    }
                }

                madison74.sort(function (a, b) {
                    if (a.event_5 < b.event_5) { return -1; }
                    if (a.event_5 > b.event_5) { return 1; }
                    return 0;
                })

                for (var i = 0; i < madison74.length; i++) {
                    var s = madison74[i]
                    var row = tableBody.append("tr");
                    var nameCell = row.append("td");
                    nameCell.text(s.full_name);
                    var scoreCell = row.append("td");
                    scoreCell.text(s.event_5);
                }
            }
            if (event == 6) {
                var tableBody = d3.select("tbody");
                tableBody.html("")

                for (var i = 0; i < madison74.length; i++) {
                    if (madison74[i].event_6 == "") {
                        madison74[i].event_6 = "N/A"
                    }
                }

                madison74.sort(function (a, b) {
                    if (a.event_6 < b.event_6) { return -1; }
                    if (a.event_6 > b.event_6) { return 1; }
                    return 0;
                })

                for (var i = 0; i < madison74.length; i++) {
                    var s = madison74[i]
                    var row = tableBody.append("tr");
                    var nameCell = row.append("td");
                    nameCell.text(s.full_name);
                    var scoreCell = row.append("td");
                    scoreCell.text(s.event_6);
                }
            }
            if (event == 7) {
                var tableBody = d3.select("tbody");
                tableBody.html("")

                for (var i = 0; i < madison74.length; i++) {
                    if (madison74[i].event_7 == "") {
                        madison74[i].event_7 = "N/A"
                    }
                }

                madison74.sort(function (a, b) {
                    if (a.event_7 < b.event_7) { return -1; }
                    if (a.event_7 > b.event_7) { return 1; }
                    return 0;
                })

                for (var i = 0; i < madison74.length; i++) {
                    var s = madison74[i]
                    var row = tableBody.append("tr");
                    var nameCell = row.append("td");
                    nameCell.text(s.full_name);
                    var scoreCell = row.append("td");
                    scoreCell.text(s.event_7);
                }
            }
            if (event == 8) {
                var tableBody = d3.select("tbody");
                tableBody.html("")

                for (var i = 0; i < madison74.length; i++) {
                    if (madison74[i].event_8 == "") {
                        madison74[i].event_8 = "N/A"
                    }
                }

                madison74.sort(function (a, b) {
                    if (a.event_8 < b.event_8) { return -1; }
                    if (a.event_8 > b.event_8) { return 1; }
                    return 0;
                })

                for (var i = 0; i < madison74.length; i++) {
                    var s = madison74[i]
                    var row = tableBody.append("tr");
                    var nameCell = row.append("td");
                    nameCell.text(s.full_name);
                    var scoreCell = row.append("td");
                    scoreCell.text(s.event_8);
                }
            }
            if (event == 9) {
                var tableBody = d3.select("tbody");
                tableBody.html("")

                for (var i = 0; i < madison74.length; i++) {
                    if (madison74[i].event_9 == "") {
                        madison74[i].event_9 = "N/A"
                    }
                }

                madison74.sort(function (a, b) {
                    if (a.event_9 < b.event_9) { return -1; }
                    if (a.event_9 > b.event_9) { return 1; }
                    return 0;
                })

                for (var i = 0; i < madison74.length; i++) {
                    var s = madison74[i]
                    var row = tableBody.append("tr");
                    var nameCell = row.append("td");
                    nameCell.text(s.full_name);
                    var scoreCell = row.append("td");
                    scoreCell.text(s.event_9);
                }
            }
            if (event == 10) {
                var tableBody = d3.select("tbody");
                tableBody.html("")

                for (var i = 0; i < madison74.length; i++) {
                    if (madison74[i].event_10 == "") {
                        madison74[i].event_10 = "N/A"
                    }
                }

                madison74.sort(function (a, b) {
                    if (a.event_10 < b.event_10) { return -1; }
                    if (a.event_10 > b.event_10) { return 1; }
                    return 0;
                })

                for (var i = 0; i < madison74.length; i++) {
                    var s = madison74[i]
                    var row = tableBody.append("tr");
                    var nameCell = row.append("td");
                    nameCell.text(s.full_name);
                    var scoreCell = row.append("td");
                    scoreCell.text(s.event_10);
                }
            }
            if (event == 11) {
                var tableBody = d3.select("tbody");
                tableBody.html("")

                for (var i = 0; i < madison74.length; i++) {
                    if (madison74[i].event_11 == "") {
                        madison74[i].event_11 = 0
                    }
                }

                madison74.sort(function (a, b) {
                    if (a.event_11 < b.event_11) { return 1; }
                    if (a.event_11 > b.event_11) { return -1; }
                    return 0;
                })

                for (var i = 0; i < madison74.length; i++) {
                    var s = madison74[i]
                    var row = tableBody.append("tr");
                    var nameCell = row.append("td");
                    nameCell.text(s.full_name);
                    var scoreCell = row.append("td");
                    scoreCell.text(s.event_11);
                }
            }
            if (event == 12) {
                var tableBody = d3.select("tbody");
                tableBody.html("")

                for (var i = 0; i < madison74.length; i++) {
                    if (madison74[i].event_12_curve == "") {
                        madison74[i].event_12_curve = 0
                    }
                }

                madison74.sort(function (a, b) {
                    if (a.event_12_curve < b.event_12_curve) { return 1; }
                    if (a.event_12_curve > b.event_12_curve) { return -1; }
                    return 0;
                })

                for (var i = 0; i < madison74.length; i++) {
                    var s = madison74[i]
                    var row = tableBody.append("tr");
                    var nameCell = row.append("td");
                    nameCell.text(s.full_name);
                    var scoreCell = row.append("td");
                    scoreCell.text(s.event_12_curve);
                }
            }
            if (event == 13) {
                var tableBody = d3.select("tbody");
                tableBody.html("")

                for (var i = 0; i < madison74.length; i++) {
                    if (madison74[i].event_13 == "") {
                        madison74[i].event_13 = "N/A"
                    }
                }

                madison74.sort(function (a, b) {
                    if (a.event_13 < b.event_13) { return -1; }
                    if (a.event_13 > b.event_13) { return 1; }
                    return 0;
                })

                for (var i = 0; i < madison74.length; i++) {
                    var s = madison74[i]
                    var row = tableBody.append("tr");
                    var nameCell = row.append("td");
                    nameCell.text(s.full_name);
                    var scoreCell = row.append("td");
                    scoreCell.text(s.event_13);
                }
            }
            if (event == 14) {
                var tableBody = d3.select("tbody");
                tableBody.html("")

                for (var i = 0; i < madison74.length; i++) {
                    if (madison74[i].event_14 == "") {
                        madison74[i].event_14 = "N/A"
                    }
                }

                madison74.sort(function (a, b) {
                    if (a.event_14 < b.event_14) { return -1; }
                    if (a.event_14 > b.event_14) { return 1; }
                    return 0;
                })

                for (var i = 0; i < madison74.length; i++) {
                    var s = madison74[i]
                    var row = tableBody.append("tr");
                    var nameCell = row.append("td");
                    nameCell.text(s.full_name);
                    var scoreCell = row.append("td");
                    scoreCell.text(s.event_14);
                }
            }
            if (event == 15) {
                var tableBody = d3.select("tbody");
                tableBody.html("")

                for (var i = 0; i < madison74.length; i++) {
                    if (madison74[i].event_15 == "") {
                        madison74[i].event_15 = "N/A"
                    }
                }

                madison74.sort(function (a, b) {
                    if (a.event_15 < b.event_15) { return -1; }
                    if (a.event_15 > b.event_15) { return 1; }
                    return 0;
                })

                for (var i = 0; i < madison74.length; i++) {
                    var s = madison74[i]
                    var row = tableBody.append("tr");
                    var nameCell = row.append("td");
                    nameCell.text(s.full_name);
                    var scoreCell = row.append("td");
                    scoreCell.text(s.event_15);
                }
            }
        });
    }

    categoryAxis.sortBySeries = series;

    var allData = {
        "1": [
            {
                "athlete": "Justin Medeiros",
                "score": 185.0
            },
            {
                "athlete": "Tia-Clair Toomey",
                "score": 188.0
            },
            {
                "athlete": "Patrick Vellner",
                "score": 33.0
            },
            {
                "athlete": "Saxon Panchik",
                "score": 107.0
            },
            {
                "athlete": "Bjorgvin Karl Gudmundsson",
                "score": 176.0
            },
            {
                "athlete": "Brent Fikowski",
                "score": 161.0
            },
            {
                "athlete": "Jonne Koski",
                "score": 200.0
            },
            {
                "athlete": "Laura Horvath",
                "score": 155.0
            },
            {
                "athlete": "Guilherme Malheiros",
                "score": 95.0
            },
            {
                "athlete": "Alex Vigneault",
                "score": 194.0
            },
            {
                "athlete": "Noah Ohlsen",
                "score": 119.0
            },
            {
                "athlete": "Lazar Dukic",
                "score": 197.0
            },
            {
                "athlete": "Annie Thorisdottir",
                "score": 73.0
            },
            {
                "athlete": "Jeffrey Adler",
                "score": 98.0
            },
            {
                "athlete": "Kristin Holte",
                "score": 131.0
            },
            {
                "athlete": "Scott Panchik",
                "score": 86.0
            },
            {
                "athlete": "Travis Mayer",
                "score": 143.0
            },
            {
                "athlete": "Cole Sager",
                "score": 122.0
            },
            {
                "athlete": "Andre Houdet",
                "score": 125.0
            },
            {
                "athlete": "Kristi Eramo O'Connell",
                "score": 182.0
            },
            {
                "athlete": "Bayden Brown",
                "score": 170.0
            },
            {
                "athlete": "Royce Dunne",
                "score": 31.0
            },
            {
                "athlete": "Haley Adams",
                "score": 167.0
            },
            {
                "athlete": "Mallory O'Brien",
                "score": 149.0
            },
            {
                "athlete": "Gabriela Migala",
                "score": 63.0
            },
            {
                "athlete": "Amanda Barnhart",
                "score": 146.0
            },
            {
                "athlete": "Henrik Haapalainen",
                "score": 152.0
            },
            {
                "athlete": "Katrin Tanja Davidsdottir",
                "score": 104.0
            },
            {
                "athlete": "Danielle Brandon",
                "score": 92.0
            },
            {
                "athlete": "Jayson Hopper",
                "score": 137.0
            },
            {
                "athlete": "Will Moorad",
                "score": 55.0
            },
            {
                "athlete": "Emma McQuaid",
                "score": 27.0
            },
            {
                "athlete": "Emily Rolfe",
                "score": 173.0
            },
            {
                "athlete": "Thuridur Erla Helgadottir",
                "score": 49.0
            },
            {
                "athlete": "Emma Cary",
                "score": 164.0
            },
            {
                "athlete": "Arielle Loewen",
                "score": 29.0
            },
            {
                "athlete": "Jacqueline Dahlstrom",
                "score": 71.0
            },
            {
                "athlete": "Emma Tall",
                "score": 179.0
            },
            {
                "athlete": "Baylee Rayl",
                "score": 57.0
            },
            {
                "athlete": "Brooke Wells",
                "score": 45.0
            },
            {
                "athlete": "Chandler Smith",
                "score": 61.0
            },
            {
                "athlete": "Jay Crouch",
                "score": 116.0
            },
            {
                "athlete": "Samuel Cournoyer",
                "score": 128.0
            },
            {
                "athlete": "Uldis Upenieks",
                "score": 65.0
            },
            {
                "athlete": "Jason Smith",
                "score": 113.0
            },
            {
                "athlete": "Brandon Luckett",
                "score": 191.0
            },
            {
                "athlete": "Alexandre Caron",
                "score": 75.0
            },
            {
                "athlete": "Timothy Paulson",
                "score": 59.0
            },
            {
                "athlete": "Luka Dukic",
                "score": 41.0
            },
            {
                "athlete": "Mekenzie Riley",
                "score": 158.0
            },
            {
                "athlete": "Samantha Briggs",
                "score": 67.0
            },
            {
                "athlete": "Zach Watts",
                "score": 23.0
            },
            {
                "athlete": "Laura Clifton",
                "score": 83.0
            },
            {
                "athlete": "Alessandra Pichelli",
                "score": 19.0
            },
            {
                "athlete": "Carolyne Prevost",
                "score": 47.0
            },
            {
                "athlete": "Ellie Turner",
                "score": 80.0
            },
            {
                "athlete": "Sydney Michalyshen",
                "score": 43.0
            },
            {
                "athlete": "Jessica Griffith",
                "score": 25.0
            },
            {
                "athlete": "Emilia Leppanen",
                "score": 110.0
            },
            {
                "athlete": "Regan Huckaby",
                "score": 35.0
            },
            {
                "athlete": "Agustin Richelme",
                "score": 53.0
            },
            {
                "athlete": "Colten Mertens",
                "score": 37.0
            },
            {
                "athlete": "Rogelio Gamboa",
                "score": 134.0
            },
            {
                "athlete": "Giorgos Karavis",
                "score": 17.0
            },
            {
                "athlete": "Sasha Nievas",
                "score": 21.0
            },
            {
                "athlete": "Michelle Basnett",
                "score": 101.0
            },
            {
                "athlete": "Caroline Conners",
                "score": 15.0
            },
            {
                "athlete": "Seungyeon Choi",
                "score": 13.0
            },
            {
                "athlete": "Adrian Mundwiler",
                "score": 77.0
            },
            {
                "athlete": "Sean Sweeney",
                "score": 140.0
            },
            {
                "athlete": "Dani Speegle",
                "score": 51.0
            },
            {
                "athlete": "Sam Stewart",
                "score": 39.0
            },
            {
                "athlete": "Kara Saunders",
                "score": 69.0
            },
            {
                "athlete": "Aleksandar Ilin",
                "score": 89.0
            }
        ],
        "2": [
            {
                "athlete": "Justin Medeiros",
                "score": 340.0
            },
            {
                "athlete": "Tia-Clair Toomey",
                "score": 373.0
            },
            {
                "athlete": "Patrick Vellner",
                "score": 233.0
            },
            {
                "athlete": "Saxon Panchik",
                "score": 265.0
            },
            {
                "athlete": "Bjorgvin Karl Gudmundsson",
                "score": 349.0
            },
            {
                "athlete": "Brent Fikowski",
                "score": 340.0
            },
            {
                "athlete": "Jonne Koski",
                "score": 367.0
            },
            {
                "athlete": "Laura Horvath",
                "score": 271.0
            },
            {
                "athlete": "Guilherme Malheiros",
                "score": 277.0
            },
            {
                "athlete": "Alex Vigneault",
                "score": 343.0
            },
            {
                "athlete": "Noah Ohlsen",
                "score": 253.0
            },
            {
                "athlete": "Lazar Dukic",
                "score": 358.0
            },
            {
                "athlete": "Annie Thorisdottir",
                "score": 171.0
            },
            {
                "athlete": "Jeffrey Adler",
                "score": 220.0
            },
            {
                "athlete": "Kristin Holte",
                "score": 241.0
            },
            {
                "athlete": "Scott Panchik",
                "score": 280.0
            },
            {
                "athlete": "Travis Mayer",
                "score": 208.0
            },
            {
                "athlete": "Cole Sager",
                "score": 274.0
            },
            {
                "athlete": "Andre Houdet",
                "score": 271.0
            },
            {
                "athlete": "Kristi Eramo O'Connell",
                "score": 257.0
            },
            {
                "athlete": "Bayden Brown",
                "score": 301.0
            },
            {
                "athlete": "Royce Dunne",
                "score": 219.0
            },
            {
                "athlete": "Haley Adams",
                "score": 271.0
            },
            {
                "athlete": "Mallory O'Brien",
                "score": 226.0
            },
            {
                "athlete": "Gabriela Migala",
                "score": 104.0
            },
            {
                "athlete": "Amanda Barnhart",
                "score": 238.0
            },
            {
                "athlete": "Henrik Haapalainen",
                "score": 316.0
            },
            {
                "athlete": "Katrin Tanja Davidsdottir",
                "score": 161.0
            },
            {
                "athlete": "Danielle Brandon",
                "score": 193.0
            },
            {
                "athlete": "Jayson Hopper",
                "score": 204.0
            },
            {
                "athlete": "Will Moorad",
                "score": 231.0
            },
            {
                "athlete": "Emma McQuaid",
                "score": 167.0
            },
            {
                "athlete": "Emily Rolfe",
                "score": 204.0
            },
            {
                "athlete": "Thuridur Erla Helgadottir",
                "score": 104.0
            },
            {
                "athlete": "Emma Cary",
                "score": 195.0
            },
            {
                "athlete": "Arielle Loewen",
                "score": 74.0
            },
            {
                "athlete": "Jacqueline Dahlstrom",
                "score": 124.0
            },
            {
                "athlete": "Emma Tall",
                "score": 262.0
            },
            {
                "athlete": "Baylee Rayl",
                "score": 146.0
            },
            {
                "athlete": "Brooke Wells",
                "score": 108.0
            },
            {
                "athlete": "Chandler Smith",
                "score": 186.0
            },
            {
                "athlete": "Jay Crouch",
                "score": 244.0
            },
            {
                "athlete": "Samuel Cournoyer",
                "score": 325.0
            },
            {
                "athlete": "Uldis Upenieks",
                "score": 160.0
            },
            {
                "athlete": "Jason Smith",
                "score": 304.0
            },
            {
                "athlete": "Brandon Luckett",
                "score": 304.0
            },
            {
                "athlete": "Alexandre Caron",
                "score": 245.0
            },
            {
                "athlete": "Timothy Paulson",
                "score": 108.0
            },
            {
                "athlete": "Luka Dukic",
                "score": 184.0
            },
            {
                "athlete": "Mekenzie Riley",
                "score": 199.0
            },
            {
                "athlete": "Samantha Briggs",
                "score": 108.0
            },
            {
                "athlete": "Zach Watts",
                "score": 46.0
            },
            {
                "athlete": "Laura Clifton",
                "score": 102.0
            },
            {
                "athlete": "Alessandra Pichelli",
                "score": 66.0
            },
            {
                "athlete": "Carolyne Prevost",
                "score": 98.0
            },
            {
                "athlete": "Ellie Turner",
                "score": 97.0
            },
            {
                "athlete": "Sydney Michalyshen",
                "score": 116.0
            },
            {
                "athlete": "Jessica Griffith",
                "score": 66.0
            },
            {
                "athlete": "Emilia Leppanen",
                "score": 151.0
            },
            {
                "athlete": "Regan Huckaby",
                "score": 80.0
            },
            {
                "athlete": "Agustin Richelme",
                "score": 139.0
            },
            {
                "athlete": "Colten Mertens",
                "score": 156.0
            },
            {
                "athlete": "Rogelio Gamboa",
                "score": 214.0
            },
            {
                "athlete": "Giorgos Karavis",
                "score": 124.0
            },
            {
                "athlete": "Sasha Nievas",
                "score": 34.0
            },
            {
                "athlete": "Michelle Basnett",
                "score": 160.0
            },
            {
                "athlete": "Caroline Conners",
                "score": 36.0
            },
            {
                "athlete": "Seungyeon Choi",
                "score": 28.0
            },
            {
                "athlete": "Adrian Mundwiler",
                "score": 214.0
            },
            {
                "athlete": "Sean Sweeney",
                "score": 201.0
            },
            {
                "athlete": "Dani Speegle",
                "score": 122.0
            },
            {
                "athlete": "Sam Stewart",
                "score": 70.0
            },
            {
                "athlete": "Kara Saunders",
                "score": 100.0
            },
            {
                "athlete": "Aleksandar Ilin",
                "score": 158.0
            }
        ],
        "3": [
            {
                "athlete": "Justin Medeiros",
                "score": 510.0
            },
            {
                "athlete": "Tia-Clair Toomey",
                "score": 474.0
            },
            {
                "athlete": "Patrick Vellner",
                "score": 427.0
            },
            {
                "athlete": "Saxon Panchik",
                "score": 456.0
            },
            {
                "athlete": "Bjorgvin Karl Gudmundsson",
                "score": 528.0
            },
            {
                "athlete": "Brent Fikowski",
                "score": 507.0
            },
            {
                "athlete": "Jonne Koski",
                "score": 531.0
            },
            {
                "athlete": "Laura Horvath",
                "score": 334.0
            },
            {
                "athlete": "Guilherme Malheiros",
                "score": 477.0
            },
            {
                "athlete": "Alex Vigneault",
                "score": 501.0
            },
            {
                "athlete": "Noah Ohlsen",
                "score": 426.0
            },
            {
                "athlete": "Lazar Dukic",
                "score": 471.0
            },
            {
                "athlete": "Annie Thorisdottir",
                "score": 216.0
            },
            {
                "athlete": "Jeffrey Adler",
                "score": 366.0
            },
            {
                "athlete": "Kristin Holte",
                "score": 330.0
            },
            {
                "athlete": "Scott Panchik",
                "score": 315.0
            },
            {
                "athlete": "Travis Mayer",
                "score": 360.0
            },
            {
                "athlete": "Cole Sager",
                "score": 393.0
            },
            {
                "athlete": "Andre Houdet",
                "score": 459.0
            },
            {
                "athlete": "Kristi Eramo O'Connell",
                "score": 337.0
            },
            {
                "athlete": "Bayden Brown",
                "score": 435.0
            },
            {
                "athlete": "Royce Dunne",
                "score": 356.0
            },
            {
                "athlete": "Haley Adams",
                "score": 363.0
            },
            {
                "athlete": "Mallory O'Brien",
                "score": 259.0
            },
            {
                "athlete": "Gabriela Migala",
                "score": 181.0
            },
            {
                "athlete": "Amanda Barnhart",
                "score": 287.0
            },
            {
                "athlete": "Henrik Haapalainen",
                "score": 471.0
            },
            {
                "athlete": "Katrin Tanja Davidsdottir",
                "score": 244.0
            },
            {
                "athlete": "Danielle Brandon",
                "score": 279.0
            },
            {
                "athlete": "Jayson Hopper",
                "score": 386.0
            },
            {
                "athlete": "Will Moorad",
                "score": 428.0
            },
            {
                "athlete": "Emma McQuaid",
                "score": 234.0
            },
            {
                "athlete": "Emily Rolfe",
                "score": 277.0
            },
            {
                "athlete": "Thuridur Erla Helgadottir",
                "score": 169.0
            },
            {
                "athlete": "Emma Cary",
                "score": 232.0
            },
            {
                "athlete": "Arielle Loewen",
                "score": 131.0
            },
            {
                "athlete": "Jacqueline Dahlstrom",
                "score": 193.0
            },
            {
                "athlete": "Emma Tall",
                "score": 289.0
            },
            {
                "athlete": "Baylee Rayl",
                "score": 221.0
            },
            {
                "athlete": "Brooke Wells",
                "score": 206.0
            },
            {
                "athlete": "Chandler Smith",
                "score": 314.0
            },
            {
                "athlete": "Jay Crouch",
                "score": 354.0
            },
            {
                "athlete": "Samuel Cournoyer",
                "score": 465.0
            },
            {
                "athlete": "Uldis Upenieks",
                "score": 303.0
            },
            {
                "athlete": "Jason Smith",
                "score": 429.0
            },
            {
                "athlete": "Brandon Luckett",
                "score": 435.0
            },
            {
                "athlete": "Alexandre Caron",
                "score": 394.0
            },
            {
                "athlete": "Timothy Paulson",
                "score": 169.0
            },
            {
                "athlete": "Luka Dukic",
                "score": 369.0
            },
            {
                "athlete": "Mekenzie Riley",
                "score": 222.0
            },
            {
                "athlete": "Samantha Briggs",
                "score": 151.0
            },
            {
                "athlete": "Zach Watts",
                "score": 153.0
            },
            {
                "athlete": "Laura Clifton",
                "score": 123.0
            },
            {
                "athlete": "Alessandra Pichelli",
                "score": 119.0
            },
            {
                "athlete": "Carolyne Prevost",
                "score": 139.0
            },
            {
                "athlete": "Ellie Turner",
                "score": 136.0
            },
            {
                "athlete": "Sydney Michalyshen",
                "score": 171.0
            },
            {
                "athlete": "Jessica Griffith",
                "score": 125.0
            },
            {
                "athlete": "Emilia Leppanen",
                "score": 200.0
            },
            {
                "athlete": "Regan Huckaby",
                "score": 111.0
            },
            {
                "athlete": "Agustin Richelme",
                "score": 234.0
            },
            {
                "athlete": "Colten Mertens",
                "score": 185.0
            },
            {
                "athlete": "Rogelio Gamboa",
                "score": 330.0
            },
            {
                "athlete": "Giorgos Karavis",
                "score": 285.0
            },
            {
                "athlete": "Sasha Nievas",
                "score": 85.0
            },
            {
                "athlete": "Michelle Basnett",
                "score": 177.0
            },
            {
                "athlete": "Caroline Conners",
                "score": 61.0
            },
            {
                "athlete": "Seungyeon Choi",
                "score": 47.0
            },
            {
                "athlete": "Adrian Mundwiler",
                "score": 318.0
            },
            {
                "athlete": "Sean Sweeney",
                "score": 323.0
            },
            {
                "athlete": "Dani Speegle",
                "score": 193.0
            },
            {
                "athlete": "Sam Stewart",
                "score": 246.0
            },
            {
                "athlete": "Kara Saunders",
                "score": 115.0
            },
            {
                "athlete": "Aleksandar Ilin",
                "score": 158.0
            }
        ],
        "4": [
            {
                "athlete": "Justin Medeiros",
                "score": 692.0
            },
            {
                "athlete": "Tia-Clair Toomey",
                "score": 668.0
            },
            {
                "athlete": "Patrick Vellner",
                "score": 585.0
            },
            {
                "athlete": "Saxon Panchik",
                "score": 623.0
            },
            {
                "athlete": "Bjorgvin Karl Gudmundsson",
                "score": 665.0
            },
            {
                "athlete": "Brent Fikowski",
                "score": 677.0
            },
            {
                "athlete": "Jonne Koski",
                "score": 677.0
            },
            {
                "athlete": "Laura Horvath",
                "score": 432.0
            },
            {
                "athlete": "Guilherme Malheiros",
                "score": 520.0
            },
            {
                "athlete": "Alex Vigneault",
                "score": 526.0
            },
            {
                "athlete": "Noah Ohlsen",
                "score": 587.0
            },
            {
                "athlete": "Lazar Dukic",
                "score": 614.0
            },
            {
                "athlete": "Annie Thorisdottir",
                "score": 368.0
            },
            {
                "athlete": "Jeffrey Adler",
                "score": 485.0
            },
            {
                "athlete": "Kristin Holte",
                "score": 503.0
            },
            {
                "athlete": "Scott Panchik",
                "score": 515.0
            },
            {
                "athlete": "Travis Mayer",
                "score": 421.0
            },
            {
                "athlete": "Cole Sager",
                "score": 506.0
            },
            {
                "athlete": "Andre Houdet",
                "score": 599.0
            },
            {
                "athlete": "Kristi Eramo O'Connell",
                "score": 438.0
            },
            {
                "athlete": "Bayden Brown",
                "score": 506.0
            },
            {
                "athlete": "Royce Dunne",
                "score": 411.0
            },
            {
                "athlete": "Haley Adams",
                "score": 497.0
            },
            {
                "athlete": "Mallory O'Brien",
                "score": 456.0
            },
            {
                "athlete": "Gabriela Migala",
                "score": 330.0
            },
            {
                "athlete": "Amanda Barnhart",
                "score": 472.0
            },
            {
                "athlete": "Henrik Haapalainen",
                "score": 500.0
            },
            {
                "athlete": "Katrin Tanja Davidsdottir",
                "score": 420.0
            },
            {
                "athlete": "Danielle Brandon",
                "score": 386.0
            },
            {
                "athlete": "Jayson Hopper",
                "score": 439.0
            },
            {
                "athlete": "Will Moorad",
                "score": 491.0
            },
            {
                "athlete": "Emma McQuaid",
                "score": 338.0
            },
            {
                "athlete": "Emily Rolfe",
                "score": 399.0
            },
            {
                "athlete": "Thuridur Erla Helgadottir",
                "score": 294.0
            },
            {
                "athlete": "Emma Cary",
                "score": 423.0
            },
            {
                "athlete": "Arielle Loewen",
                "score": 310.0
            },
            {
                "athlete": "Jacqueline Dahlstrom",
                "score": 268.0
            },
            {
                "athlete": "Emma Tall",
                "score": 348.0
            },
            {
                "athlete": "Baylee Rayl",
                "score": 288.0
            },
            {
                "athlete": "Brooke Wells",
                "score": 394.0
            },
            {
                "athlete": "Chandler Smith",
                "score": 445.0
            },
            {
                "athlete": "Jay Crouch",
                "score": 518.0
            },
            {
                "athlete": "Samuel Cournoyer",
                "score": 551.0
            },
            {
                "athlete": "Uldis Upenieks",
                "score": 458.0
            },
            {
                "athlete": "Jason Smith",
                "score": 474.0
            },
            {
                "athlete": "Brandon Luckett",
                "score": 460.0
            },
            {
                "athlete": "Alexandre Caron",
                "score": 427.0
            },
            {
                "athlete": "Timothy Paulson",
                "score": 246.0
            },
            {
                "athlete": "Luka Dukic",
                "score": 396.0
            },
            {
                "athlete": "Mekenzie Riley",
                "score": 314.0
            },
            {
                "athlete": "Samantha Briggs",
                "score": 182.0
            },
            {
                "athlete": "Zach Watts",
                "score": 170.0
            },
            {
                "athlete": "Laura Clifton",
                "score": 251.0
            },
            {
                "athlete": "Alessandra Pichelli",
                "score": 168.0
            },
            {
                "athlete": "Carolyne Prevost",
                "score": 208.0
            },
            {
                "athlete": "Ellie Turner",
                "score": 209.0
            },
            {
                "athlete": "Sydney Michalyshen",
                "score": 192.0
            },
            {
                "athlete": "Jessica Griffith",
                "score": 160.0
            },
            {
                "athlete": "Emilia Leppanen",
                "score": 286.0
            },
            {
                "athlete": "Regan Huckaby",
                "score": 168.0
            },
            {
                "athlete": "Agustin Richelme",
                "score": 314.0
            },
            {
                "athlete": "Colten Mertens",
                "score": 301.0
            },
            {
                "athlete": "Rogelio Gamboa",
                "score": 367.0
            },
            {
                "athlete": "Giorgos Karavis",
                "score": 306.0
            },
            {
                "athlete": "Sasha Nievas",
                "score": 180.0
            },
            {
                "athlete": "Michelle Basnett",
                "score": 228.0
            },
            {
                "athlete": "Caroline Conners",
                "score": 126.0
            },
            {
                "athlete": "Seungyeon Choi",
                "score": 136.0
            },
            {
                "athlete": "Adrian Mundwiler",
                "score": 365.0
            },
            {
                "athlete": "Sean Sweeney",
                "score": 364.0
            },
            {
                "athlete": "Dani Speegle",
                "score": 303.0
            },
            {
                "athlete": "Sam Stewart",
                "score": 261.0
            },
            {
                "athlete": "Kara Saunders",
                "score": 156.0
            },
            {
                "athlete": "Aleksandar Ilin",
                "score": 158.0
            }
        ],
        "5": [
            {
                "athlete": "Justin Medeiros",
                "score": 874.0
            },
            {
                "athlete": "Tia-Clair Toomey",
                "score": 829.0
            },
            {
                "athlete": "Patrick Vellner",
                "score": 782.0
            },
            {
                "athlete": "Saxon Panchik",
                "score": 778.0
            },
            {
                "athlete": "Bjorgvin Karl Gudmundsson",
                "score": 814.0
            },
            {
                "athlete": "Brent Fikowski",
                "score": 868.0
            },
            {
                "athlete": "Jonne Koski",
                "score": 853.0
            },
            {
                "athlete": "Laura Horvath",
                "score": 632.0
            },
            {
                "athlete": "Guilherme Malheiros",
                "score": 587.0
            },
            {
                "athlete": "Alex Vigneault",
                "score": 657.0
            },
            {
                "athlete": "Noah Ohlsen",
                "score": 682.0
            },
            {
                "athlete": "Lazar Dukic",
                "score": 760.0
            },
            {
                "athlete": "Annie Thorisdottir",
                "score": 526.0
            },
            {
                "athlete": "Jeffrey Adler",
                "score": 530.0
            },
            {
                "athlete": "Kristin Holte",
                "score": 673.0
            },
            {
                "athlete": "Scott Panchik",
                "score": 688.0
            },
            {
                "athlete": "Travis Mayer",
                "score": 573.0
            },
            {
                "athlete": "Cole Sager",
                "score": 670.0
            },
            {
                "athlete": "Andre Houdet",
                "score": 703.0
            },
            {
                "athlete": "Kristi Eramo O'Connell",
                "score": 605.0
            },
            {
                "athlete": "Bayden Brown",
                "score": 607.0
            },
            {
                "athlete": "Royce Dunne",
                "score": 599.0
            },
            {
                "athlete": "Haley Adams",
                "score": 682.0
            },
            {
                "athlete": "Mallory O'Brien",
                "score": 566.0
            },
            {
                "athlete": "Gabriela Migala",
                "score": 524.0
            },
            {
                "athlete": "Amanda Barnhart",
                "score": 600.0
            },
            {
                "athlete": "Henrik Haapalainen",
                "score": 679.0
            },
            {
                "athlete": "Katrin Tanja Davidsdottir",
                "score": 563.0
            },
            {
                "athlete": "Danielle Brandon",
                "score": 466.0
            },
            {
                "athlete": "Jayson Hopper",
                "score": 480.0
            },
            {
                "athlete": "Will Moorad",
                "score": 613.0
            },
            {
                "athlete": "Emma McQuaid",
                "score": 415.0
            },
            {
                "athlete": "Emily Rolfe",
                "score": 472.0
            },
            {
                "athlete": "Thuridur Erla Helgadottir",
                "score": 431.0
            },
            {
                "athlete": "Emma Cary",
                "score": 486.0
            },
            {
                "athlete": "Arielle Loewen",
                "score": 367.0
            },
            {
                "athlete": "Jacqueline Dahlstrom",
                "score": 360.0
            },
            {
                "athlete": "Emma Tall",
                "score": 464.0
            },
            {
                "athlete": "Baylee Rayl",
                "score": 371.0
            },
            {
                "athlete": "Brooke Wells",
                "score": 483.0
            },
            {
                "athlete": "Chandler Smith",
                "score": 570.0
            },
            {
                "athlete": "Jay Crouch",
                "score": 583.0
            },
            {
                "athlete": "Samuel Cournoyer",
                "score": 612.0
            },
            {
                "athlete": "Uldis Upenieks",
                "score": 592.0
            },
            {
                "athlete": "Jason Smith",
                "score": 587.0
            },
            {
                "athlete": "Brandon Luckett",
                "score": 579.0
            },
            {
                "athlete": "Alexandre Caron",
                "score": 476.0
            },
            {
                "athlete": "Timothy Paulson",
                "score": 332.0
            },
            {
                "athlete": "Luka Dukic",
                "score": 494.0
            },
            {
                "athlete": "Mekenzie Riley",
                "score": 369.0
            },
            {
                "athlete": "Samantha Briggs",
                "score": 322.0
            },
            {
                "athlete": "Zach Watts",
                "score": 277.0
            },
            {
                "athlete": "Laura Clifton",
                "score": 322.0
            },
            {
                "athlete": "Alessandra Pichelli",
                "score": 215.0
            },
            {
                "athlete": "Carolyne Prevost",
                "score": 241.0
            },
            {
                "athlete": "Ellie Turner",
                "score": 284.0
            },
            {
                "athlete": "Sydney Michalyshen",
                "score": 243.0
            },
            {
                "athlete": "Jessica Griffith",
                "score": 195.0
            },
            {
                "athlete": "Emilia Leppanen",
                "score": 317.0
            },
            {
                "athlete": "Regan Huckaby",
                "score": 187.0
            },
            {
                "athlete": "Agustin Richelme",
                "score": 369.0
            },
            {
                "athlete": "Colten Mertens",
                "score": 360.0
            },
            {
                "athlete": "Rogelio Gamboa",
                "score": 436.0
            },
            {
                "athlete": "Giorgos Karavis",
                "score": 345.0
            },
            {
                "athlete": "Sasha Nievas",
                "score": 211.0
            },
            {
                "athlete": "Michelle Basnett",
                "score": 259.0
            },
            {
                "athlete": "Caroline Conners",
                "score": 169.0
            },
            {
                "athlete": "Seungyeon Choi",
                "score": 157.0
            },
            {
                "athlete": "Adrian Mundwiler",
                "score": 402.0
            },
            {
                "athlete": "Sean Sweeney",
                "score": 387.0
            },
            {
                "athlete": "Dani Speegle",
                "score": 328.0
            },
            {
                "athlete": "Sam Stewart",
                "score": 261.0
            },
            {
                "athlete": "Kara Saunders",
                "score": 156.0
            },
            {
                "athlete": "Aleksandar Ilin",
                "score": 158.0
            }
        ],
        "6": [
            {
                "athlete": "Justin Medeiros",
                "score": 1053.0
            },
            {
                "athlete": "Tia-Clair Toomey",
                "score": 1029.0
            },
            {
                "athlete": "Patrick Vellner",
                "score": 877.0
            },
            {
                "athlete": "Saxon Panchik",
                "score": 960.0
            },
            {
                "athlete": "Bjorgvin Karl Gudmundsson",
                "score": 909.0
            },
            {
                "athlete": "Brent Fikowski",
                "score": 963.0
            },
            {
                "athlete": "Jonne Koski",
                "score": 900.0
            },
            {
                "athlete": "Laura Horvath",
                "score": 802.0
            },
            {
                "athlete": "Guilherme Malheiros",
                "score": 694.0
            },
            {
                "athlete": "Alex Vigneault",
                "score": 842.0
            },
            {
                "athlete": "Noah Ohlsen",
                "score": 777.0
            },
            {
                "athlete": "Lazar Dukic",
                "score": 855.0
            },
            {
                "athlete": "Annie Thorisdottir",
                "score": 678.0
            },
            {
                "athlete": "Jeffrey Adler",
                "score": 727.0
            },
            {
                "athlete": "Kristin Holte",
                "score": 849.0
            },
            {
                "athlete": "Scott Panchik",
                "score": 735.0
            },
            {
                "athlete": "Travis Mayer",
                "score": 761.0
            },
            {
                "athlete": "Cole Sager",
                "score": 765.0
            },
            {
                "athlete": "Andre Houdet",
                "score": 798.0
            },
            {
                "athlete": "Kristi Eramo O'Connell",
                "score": 799.0
            },
            {
                "athlete": "Bayden Brown",
                "score": 798.0
            },
            {
                "athlete": "Royce Dunne",
                "score": 694.0
            },
            {
                "athlete": "Haley Adams",
                "score": 792.0
            },
            {
                "athlete": "Mallory O'Brien",
                "score": 715.0
            },
            {
                "athlete": "Gabriela Migala",
                "score": 691.0
            },
            {
                "athlete": "Amanda Barnhart",
                "score": 773.0
            },
            {
                "athlete": "Henrik Haapalainen",
                "score": 726.0
            },
            {
                "athlete": "Katrin Tanja Davidsdottir",
                "score": 670.0
            },
            {
                "athlete": "Danielle Brandon",
                "score": 588.0
            },
            {
                "athlete": "Jayson Hopper",
                "score": 575.0
            },
            {
                "athlete": "Will Moorad",
                "score": 708.0
            },
            {
                "athlete": "Emma McQuaid",
                "score": 576.0
            },
            {
                "athlete": "Emily Rolfe",
                "score": 567.0
            },
            {
                "athlete": "Thuridur Erla Helgadottir",
                "score": 568.0
            },
            {
                "athlete": "Emma Cary",
                "score": 581.0
            },
            {
                "athlete": "Arielle Loewen",
                "score": 510.0
            },
            {
                "athlete": "Jacqueline Dahlstrom",
                "score": 479.0
            },
            {
                "athlete": "Emma Tall",
                "score": 598.0
            },
            {
                "athlete": "Baylee Rayl",
                "score": 466.0
            },
            {
                "athlete": "Brooke Wells",
                "score": 647.0
            },
            {
                "athlete": "Chandler Smith",
                "score": 665.0
            },
            {
                "athlete": "Jay Crouch",
                "score": 690.0
            },
            {
                "athlete": "Samuel Cournoyer",
                "score": 659.0
            },
            {
                "athlete": "Uldis Upenieks",
                "score": 639.0
            },
            {
                "athlete": "Jason Smith",
                "score": 682.0
            },
            {
                "athlete": "Brandon Luckett",
                "score": 626.0
            },
            {
                "athlete": "Alexandre Caron",
                "score": 571.0
            },
            {
                "athlete": "Timothy Paulson",
                "score": 427.0
            },
            {
                "athlete": "Luka Dukic",
                "score": 541.0
            },
            {
                "athlete": "Mekenzie Riley",
                "score": 500.0
            },
            {
                "athlete": "Samantha Briggs",
                "score": 435.0
            },
            {
                "athlete": "Zach Watts",
                "score": 372.0
            },
            {
                "athlete": "Laura Clifton",
                "score": 438.0
            },
            {
                "athlete": "Alessandra Pichelli",
                "score": 361.0
            },
            {
                "athlete": "Carolyne Prevost",
                "score": 366.0
            },
            {
                "athlete": "Ellie Turner",
                "score": 442.0
            },
            {
                "athlete": "Sydney Michalyshen",
                "score": 383.0
            },
            {
                "athlete": "Jessica Griffith",
                "score": 350.0
            },
            {
                "athlete": "Emilia Leppanen",
                "score": 412.0
            },
            {
                "athlete": "Regan Huckaby",
                "score": 315.0
            },
            {
                "athlete": "Agustin Richelme",
                "score": 416.0
            },
            {
                "athlete": "Colten Mertens",
                "score": 407.0
            },
            {
                "athlete": "Rogelio Gamboa",
                "score": 483.0
            },
            {
                "athlete": "Giorgos Karavis",
                "score": 392.0
            },
            {
                "athlete": "Sasha Nievas",
                "score": 258.0
            },
            {
                "athlete": "Michelle Basnett",
                "score": 354.0
            },
            {
                "athlete": "Caroline Conners",
                "score": 276.0
            },
            {
                "athlete": "Seungyeon Choi",
                "score": 252.0
            },
            {
                "athlete": "Adrian Mundwiler",
                "score": 449.0
            },
            {
                "athlete": "Sean Sweeney",
                "score": 387.0
            },
            {
                "athlete": "Dani Speegle",
                "score": 328.0
            },
            {
                "athlete": "Sam Stewart",
                "score": 261.0
            },
            {
                "athlete": "Kara Saunders",
                "score": 156.0
            },
            {
                "athlete": "Aleksandar Ilin",
                "score": 158.0
            }
        ],
        "7": [
            {
                "athlete": "Justin Medeiros",
                "score": 1214.0
            },
            {
                "athlete": "Tia-Clair Toomey",
                "score": 1229.0
            },
            {
                "athlete": "Patrick Vellner",
                "score": 1014.0
            },
            {
                "athlete": "Saxon Panchik",
                "score": 1133.0
            },
            {
                "athlete": "Bjorgvin Karl Gudmundsson",
                "score": 974.0
            },
            {
                "athlete": "Brent Fikowski",
                "score": 1079.0
            },
            {
                "athlete": "Jonne Koski",
                "score": 963.0
            },
            {
                "athlete": "Laura Horvath",
                "score": 996.0
            },
            {
                "athlete": "Guilherme Malheiros",
                "score": 891.0
            },
            {
                "athlete": "Alex Vigneault",
                "score": 1024.0
            },
            {
                "athlete": "Noah Ohlsen",
                "score": 896.0
            },
            {
                "athlete": "Lazar Dukic",
                "score": 912.0
            },
            {
                "athlete": "Annie Thorisdottir",
                "score": 806.0
            },
            {
                "athlete": "Jeffrey Adler",
                "score": 918.0
            },
            {
                "athlete": "Kristin Holte",
                "score": 974.0
            },
            {
                "athlete": "Scott Panchik",
                "score": 845.0
            },
            {
                "athlete": "Travis Mayer",
                "score": 832.0
            },
            {
                "athlete": "Cole Sager",
                "score": 820.0
            },
            {
                "athlete": "Andre Houdet",
                "score": 944.0
            },
            {
                "athlete": "Kristi Eramo O'Connell",
                "score": 978.0
            },
            {
                "athlete": "Bayden Brown",
                "score": 941.0
            },
            {
                "athlete": "Royce Dunne",
                "score": 870.0
            },
            {
                "athlete": "Haley Adams",
                "score": 821.0
            },
            {
                "athlete": "Mallory O'Brien",
                "score": 822.0
            },
            {
                "athlete": "Gabriela Migala",
                "score": 879.0
            },
            {
                "athlete": "Amanda Barnhart",
                "score": 958.0
            },
            {
                "athlete": "Henrik Haapalainen",
                "score": 827.0
            },
            {
                "athlete": "Katrin Tanja Davidsdottir",
                "score": 713.0
            },
            {
                "athlete": "Danielle Brandon",
                "score": 661.0
            },
            {
                "athlete": "Jayson Hopper",
                "score": 730.0
            },
            {
                "athlete": "Will Moorad",
                "score": 751.0
            },
            {
                "athlete": "Emma McQuaid",
                "score": 707.0
            },
            {
                "athlete": "Emily Rolfe",
                "score": 600.0
            },
            {
                "athlete": "Thuridur Erla Helgadottir",
                "score": 623.0
            },
            {
                "athlete": "Emma Cary",
                "score": 650.0
            },
            {
                "athlete": "Arielle Loewen",
                "score": 602.0
            },
            {
                "athlete": "Jacqueline Dahlstrom",
                "score": 554.0
            },
            {
                "athlete": "Emma Tall",
                "score": 732.0
            },
            {
                "athlete": "Baylee Rayl",
                "score": 503.0
            },
            {
                "athlete": "Brooke Wells",
                "score": 799.0
            },
            {
                "athlete": "Chandler Smith",
                "score": 763.0
            },
            {
                "athlete": "Jay Crouch",
                "score": 770.0
            },
            {
                "athlete": "Samuel Cournoyer",
                "score": 726.0
            },
            {
                "athlete": "Uldis Upenieks",
                "score": 676.0
            },
            {
                "athlete": "Jason Smith",
                "score": 727.0
            },
            {
                "athlete": "Brandon Luckett",
                "score": 712.0
            },
            {
                "athlete": "Alexandre Caron",
                "score": 654.0
            },
            {
                "athlete": "Timothy Paulson",
                "score": 488.0
            },
            {
                "athlete": "Luka Dukic",
                "score": 570.0
            },
            {
                "athlete": "Mekenzie Riley",
                "score": 555.0
            },
            {
                "athlete": "Samantha Briggs",
                "score": 464.0
            },
            {
                "athlete": "Zach Watts",
                "score": 542.0
            },
            {
                "athlete": "Laura Clifton",
                "score": 587.0
            },
            {
                "athlete": "Alessandra Pichelli",
                "score": 528.0
            },
            {
                "athlete": "Carolyne Prevost",
                "score": 524.0
            },
            {
                "athlete": "Ellie Turner",
                "score": 546.0
            },
            {
                "athlete": "Sydney Michalyshen",
                "score": 523.0
            },
            {
                "athlete": "Jessica Griffith",
                "score": 439.0
            },
            {
                "athlete": "Emilia Leppanen",
                "score": 467.0
            },
            {
                "athlete": "Regan Huckaby",
                "score": 479.0
            },
            {
                "athlete": "Agustin Richelme",
                "score": 471.0
            },
            {
                "athlete": "Colten Mertens",
                "score": 502.0
            },
            {
                "athlete": "Rogelio Gamboa",
                "score": 516.0
            },
            {
                "athlete": "Giorgos Karavis",
                "score": 435.0
            },
            {
                "athlete": "Sasha Nievas",
                "score": 380.0
            },
            {
                "athlete": "Michelle Basnett",
                "score": 431.0
            },
            {
                "athlete": "Caroline Conners",
                "score": 389.0
            },
            {
                "athlete": "Seungyeon Choi",
                "score": 311.0
            },
            {
                "athlete": "Adrian Mundwiler",
                "score": 449.0
            },
            {
                "athlete": "Sean Sweeney",
                "score": 387.0
            },
            {
                "athlete": "Dani Speegle",
                "score": 328.0
            },
            {
                "athlete": "Sam Stewart",
                "score": 261.0
            },
            {
                "athlete": "Kara Saunders",
                "score": 156.0
            },
            {
                "athlete": "Aleksandar Ilin",
                "score": 158.0
            }
        ],
        "8": [
            {
                "athlete": "Justin Medeiros",
                "score": 1402.0
            },
            {
                "athlete": "Tia-Clair Toomey",
                "score": 1402.0
            },
            {
                "athlete": "Patrick Vellner",
                "score": 1127.0
            },
            {
                "athlete": "Saxon Panchik",
                "score": 1303.0
            },
            {
                "athlete": "Bjorgvin Karl Gudmundsson",
                "score": 1150.0
            },
            {
                "athlete": "Brent Fikowski",
                "score": 1213.0
            },
            {
                "athlete": "Jonne Koski",
                "score": 1124.0
            },
            {
                "athlete": "Laura Horvath",
                "score": 1121.0
            },
            {
                "athlete": "Guilherme Malheiros",
                "score": 1070.0
            },
            {
                "athlete": "Alex Vigneault",
                "score": 1152.0
            },
            {
                "athlete": "Noah Ohlsen",
                "score": 1054.0
            },
            {
                "athlete": "Lazar Dukic",
                "score": 1052.0
            },
            {
                "athlete": "Annie Thorisdottir",
                "score": 943.0
            },
            {
                "athlete": "Jeffrey Adler",
                "score": 977.0
            },
            {
                "athlete": "Kristin Holte",
                "score": 1138.0
            },
            {
                "athlete": "Scott Panchik",
                "score": 1039.0
            },
            {
                "athlete": "Travis Mayer",
                "score": 978.0
            },
            {
                "athlete": "Cole Sager",
                "score": 915.0
            },
            {
                "athlete": "Andre Houdet",
                "score": 1015.0
            },
            {
                "athlete": "Kristi Eramo O'Connell",
                "score": 1067.0
            },
            {
                "athlete": "Bayden Brown",
                "score": 1016.0
            },
            {
                "athlete": "Royce Dunne",
                "score": 1052.0
            },
            {
                "athlete": "Haley Adams",
                "score": 1018.0
            },
            {
                "athlete": "Mallory O'Brien",
                "score": 971.0
            },
            {
                "athlete": "Gabriela Migala",
                "score": 946.0
            },
            {
                "athlete": "Amanda Barnhart",
                "score": 1041.0
            },
            {
                "athlete": "Henrik Haapalainen",
                "score": 928.0
            },
            {
                "athlete": "Katrin Tanja Davidsdottir",
                "score": 832.0
            },
            {
                "athlete": "Danielle Brandon",
                "score": 861.0
            },
            {
                "athlete": "Jayson Hopper",
                "score": 781.0
            },
            {
                "athlete": "Will Moorad",
                "score": 837.0
            },
            {
                "athlete": "Emma McQuaid",
                "score": 776.0
            },
            {
                "athlete": "Emily Rolfe",
                "score": 704.0
            },
            {
                "athlete": "Thuridur Erla Helgadottir",
                "score": 766.0
            },
            {
                "athlete": "Emma Cary",
                "score": 757.0
            },
            {
                "athlete": "Arielle Loewen",
                "score": 757.0
            },
            {
                "athlete": "Jacqueline Dahlstrom",
                "score": 607.0
            },
            {
                "athlete": "Emma Tall",
                "score": 783.0
            },
            {
                "athlete": "Baylee Rayl",
                "score": 655.0
            },
            {
                "athlete": "Brooke Wells",
                "score": 990.0
            },
            {
                "athlete": "Chandler Smith",
                "score": 861.0
            },
            {
                "athlete": "Jay Crouch",
                "score": 886.0
            },
            {
                "athlete": "Samuel Cournoyer",
                "score": 911.0
            },
            {
                "athlete": "Uldis Upenieks",
                "score": 739.0
            },
            {
                "athlete": "Jason Smith",
                "score": 778.0
            },
            {
                "athlete": "Brandon Luckett",
                "score": 769.0
            },
            {
                "athlete": "Alexandre Caron",
                "score": 693.0
            },
            {
                "athlete": "Timothy Paulson",
                "score": 598.0
            },
            {
                "athlete": "Luka Dukic",
                "score": 601.0
            },
            {
                "athlete": "Mekenzie Riley",
                "score": 677.0
            },
            {
                "athlete": "Samantha Briggs",
                "score": 501.0
            },
            {
                "athlete": "Zach Watts",
                "score": 585.0
            },
            {
                "athlete": "Laura Clifton",
                "score": 630.0
            },
            {
                "athlete": "Alessandra Pichelli",
                "score": 608.0
            },
            {
                "athlete": "Carolyne Prevost",
                "score": 616.0
            },
            {
                "athlete": "Ellie Turner",
                "score": 575.0
            },
            {
                "athlete": "Sydney Michalyshen",
                "score": 588.0
            },
            {
                "athlete": "Jessica Griffith",
                "score": 500.0
            },
            {
                "athlete": "Emilia Leppanen",
                "score": 504.0
            },
            {
                "athlete": "Regan Huckaby",
                "score": 512.0
            },
            {
                "athlete": "Agustin Richelme",
                "score": 638.0
            },
            {
                "athlete": "Colten Mertens",
                "score": 575.0
            },
            {
                "athlete": "Rogelio Gamboa",
                "score": 567.0
            },
            {
                "athlete": "Giorgos Karavis",
                "score": 464.0
            },
            {
                "athlete": "Sasha Nievas",
                "score": 511.0
            },
            {
                "athlete": "Michelle Basnett",
                "score": 508.0
            },
            {
                "athlete": "Caroline Conners",
                "score": 444.0
            },
            {
                "athlete": "Seungyeon Choi",
                "score": 340.0
            },
            {
                "athlete": "Adrian Mundwiler",
                "score": 449.0
            },
            {
                "athlete": "Sean Sweeney",
                "score": 387.0
            },
            {
                "athlete": "Dani Speegle",
                "score": 328.0
            },
            {
                "athlete": "Sam Stewart",
                "score": 261.0
            },
            {
                "athlete": "Kara Saunders",
                "score": 156.0
            },
            {
                "athlete": "Aleksandar Ilin",
                "score": 158.0
            }
        ],
        "9": [
            {
                "athlete": "Justin Medeiros",
                "score": 1578.0
            },
            {
                "athlete": "Tia-Clair Toomey",
                "score": 1497.0
            },
            {
                "athlete": "Patrick Vellner",
                "score": 1315.0
            },
            {
                "athlete": "Saxon Panchik",
                "score": 1410.0
            },
            {
                "athlete": "Bjorgvin Karl Gudmundsson",
                "score": 1308.0
            },
            {
                "athlete": "Brent Fikowski",
                "score": 1413.0
            },
            {
                "athlete": "Jonne Koski",
                "score": 1306.0
            },
            {
                "athlete": "Laura Horvath",
                "score": 1231.0
            },
            {
                "athlete": "Guilherme Malheiros",
                "score": 1225.0
            },
            {
                "athlete": "Alex Vigneault",
                "score": 1349.0
            },
            {
                "athlete": "Noah Ohlsen",
                "score": 1224.0
            },
            {
                "athlete": "Lazar Dukic",
                "score": 1216.0
            },
            {
                "athlete": "Annie Thorisdottir",
                "score": 1074.0
            },
            {
                "athlete": "Jeffrey Adler",
                "score": 1102.0
            },
            {
                "athlete": "Kristin Holte",
                "score": 1171.0
            },
            {
                "athlete": "Scott Panchik",
                "score": 1155.0
            },
            {
                "athlete": "Travis Mayer",
                "score": 1169.0
            },
            {
                "athlete": "Cole Sager",
                "score": 1055.0
            },
            {
                "athlete": "Andre Houdet",
                "score": 1188.0
            },
            {
                "athlete": "Kristi Eramo O'Connell",
                "score": 1094.0
            },
            {
                "athlete": "Bayden Brown",
                "score": 1177.0
            },
            {
                "athlete": "Royce Dunne",
                "score": 1186.0
            },
            {
                "athlete": "Haley Adams",
                "score": 1104.0
            },
            {
                "athlete": "Mallory O'Brien",
                "score": 1014.0
            },
            {
                "athlete": "Gabriela Migala",
                "score": 1019.0
            },
            {
                "athlete": "Amanda Barnhart",
                "score": 1187.0
            },
            {
                "athlete": "Henrik Haapalainen",
                "score": 1065.0
            },
            {
                "athlete": "Katrin Tanja Davidsdottir",
                "score": 891.0
            },
            {
                "athlete": "Danielle Brandon",
                "score": 898.0
            },
            {
                "athlete": "Jayson Hopper",
                "score": 960.0
            },
            {
                "athlete": "Will Moorad",
                "score": 986.0
            },
            {
                "athlete": "Emma McQuaid",
                "score": 829.0
            },
            {
                "athlete": "Emily Rolfe",
                "score": 775.0
            },
            {
                "athlete": "Thuridur Erla Helgadottir",
                "score": 795.0
            },
            {
                "athlete": "Emma Cary",
                "score": 826.0
            },
            {
                "athlete": "Arielle Loewen",
                "score": 782.0
            },
            {
                "athlete": "Jacqueline Dahlstrom",
                "score": 658.0
            },
            {
                "athlete": "Emma Tall",
                "score": 828.0
            },
            {
                "athlete": "Baylee Rayl",
                "score": 696.0
            },
            {
                "athlete": "Brooke Wells",
                "score": 1070.0
            },
            {
                "athlete": "Chandler Smith",
                "score": 1055.0
            },
            {
                "athlete": "Jay Crouch",
                "score": 999.0
            },
            {
                "athlete": "Samuel Cournoyer",
                "score": 986.0
            },
            {
                "athlete": "Uldis Upenieks",
                "score": 822.0
            },
            {
                "athlete": "Jason Smith",
                "score": 879.0
            },
            {
                "athlete": "Brandon Luckett",
                "score": 897.0
            },
            {
                "athlete": "Alexandre Caron",
                "score": 878.0
            },
            {
                "athlete": "Timothy Paulson",
                "score": 750.0
            },
            {
                "athlete": "Luka Dukic",
                "score": 723.0
            },
            {
                "athlete": "Mekenzie Riley",
                "score": 732.0
            },
            {
                "athlete": "Samantha Briggs",
                "score": 590.0
            },
            {
                "athlete": "Zach Watts",
                "score": 728.0
            },
            {
                "athlete": "Laura Clifton",
                "score": 722.0
            },
            {
                "athlete": "Alessandra Pichelli",
                "score": 685.0
            },
            {
                "athlete": "Carolyne Prevost",
                "score": 665.0
            },
            {
                "athlete": "Ellie Turner",
                "score": 679.0
            },
            {
                "athlete": "Sydney Michalyshen",
                "score": 645.0
            },
            {
                "athlete": "Jessica Griffith",
                "score": 563.0
            },
            {
                "athlete": "Emilia Leppanen",
                "score": 569.0
            },
            {
                "athlete": "Regan Huckaby",
                "score": 559.0
            },
            {
                "athlete": "Agustin Richelme",
                "score": 699.0
            },
            {
                "athlete": "Colten Mertens",
                "score": 694.0
            },
            {
                "athlete": "Rogelio Gamboa",
                "score": 665.0
            },
            {
                "athlete": "Giorgos Karavis",
                "score": 631.0
            },
            {
                "athlete": "Sasha Nievas",
                "score": 546.0
            },
            {
                "athlete": "Michelle Basnett",
                "score": 547.0
            },
            {
                "athlete": "Caroline Conners",
                "score": 475.0
            },
            {
                "athlete": "Seungyeon Choi",
                "score": 407.0
            },
            {
                "athlete": "Adrian Mundwiler",
                "score": 449.0
            },
            {
                "athlete": "Sean Sweeney",
                "score": 387.0
            },
            {
                "athlete": "Dani Speegle",
                "score": 328.0
            },
            {
                "athlete": "Sam Stewart",
                "score": 261.0
            },
            {
                "athlete": "Kara Saunders",
                "score": 156.0
            },
            {
                "athlete": "Aleksandar Ilin",
                "score": 158.0
            }
        ],
        "10": [
            {
                "athlete": "Justin Medeiros",
                "score": 1750.0
            },
            {
                "athlete": "Tia-Clair Toomey",
                "score": 1641.0
            },
            {
                "athlete": "Patrick Vellner",
                "score": 1455.0
            },
            {
                "athlete": "Saxon Panchik",
                "score": 1518.0
            },
            {
                "athlete": "Bjorgvin Karl Gudmundsson",
                "score": 1432.0
            },
            {
                "athlete": "Brent Fikowski",
                "score": 1477.0
            },
            {
                "athlete": "Jonne Koski",
                "score": 1426.0
            },
            {
                "athlete": "Laura Horvath",
                "score": 1286.0
            },
            {
                "athlete": "Guilherme Malheiros",
                "score": 1268.0
            },
            {
                "athlete": "Alex Vigneault",
                "score": 1501.0
            },
            {
                "athlete": "Noah Ohlsen",
                "score": 1291.0
            },
            {
                "athlete": "Lazar Dukic",
                "score": 1416.0
            },
            {
                "athlete": "Annie Thorisdottir",
                "score": 1126.0
            },
            {
                "athlete": "Jeffrey Adler",
                "score": 1258.0
            },
            {
                "athlete": "Kristin Holte",
                "score": 1299.0
            },
            {
                "athlete": "Scott Panchik",
                "score": 1168.0
            },
            {
                "athlete": "Travis Mayer",
                "score": 1301.0
            },
            {
                "athlete": "Cole Sager",
                "score": 1235.0
            },
            {
                "athlete": "Andre Houdet",
                "score": 1267.0
            },
            {
                "athlete": "Kristi Eramo O'Connell",
                "score": 1286.0
            },
            {
                "athlete": "Bayden Brown",
                "score": 1365.0
            },
            {
                "athlete": "Royce Dunne",
                "score": 1220.0
            },
            {
                "athlete": "Haley Adams",
                "score": 1272.0
            },
            {
                "athlete": "Mallory O'Brien",
                "score": 1096.0
            },
            {
                "athlete": "Gabriela Migala",
                "score": 1116.0
            },
            {
                "athlete": "Amanda Barnhart",
                "score": 1218.0
            },
            {
                "athlete": "Henrik Haapalainen",
                "score": 1201.0
            },
            {
                "athlete": "Katrin Tanja Davidsdottir",
                "score": 979.0
            },
            {
                "athlete": "Danielle Brandon",
                "score": 956.0
            },
            {
                "athlete": "Jayson Hopper",
                "score": 1120.0
            },
            {
                "athlete": "Will Moorad",
                "score": 1162.0
            },
            {
                "athlete": "Emma McQuaid",
                "score": 875.0
            },
            {
                "athlete": "Emily Rolfe",
                "score": 971.0
            },
            {
                "athlete": "Thuridur Erla Helgadottir",
                "score": 856.0
            },
            {
                "athlete": "Emma Cary",
                "score": 875.0
            },
            {
                "athlete": "Arielle Loewen",
                "score": 852.0
            },
            {
                "athlete": "Jacqueline Dahlstrom",
                "score": 749.0
            },
            {
                "athlete": "Emma Tall",
                "score": 835.0
            },
            {
                "athlete": "Baylee Rayl",
                "score": 724.0
            },
            {
                "athlete": "Brooke Wells",
                "score": 1164.0
            },
            {
                "athlete": "Chandler Smith",
                "score": 1159.0
            },
            {
                "athlete": "Jay Crouch",
                "score": 1147.0
            },
            {
                "athlete": "Samuel Cournoyer",
                "score": 1102.0
            },
            {
                "athlete": "Uldis Upenieks",
                "score": 1006.0
            },
            {
                "athlete": "Jason Smith",
                "score": 991.0
            },
            {
                "athlete": "Brandon Luckett",
                "score": 970.0
            },
            {
                "athlete": "Alexandre Caron",
                "score": 954.0
            },
            {
                "athlete": "Timothy Paulson",
                "score": 835.0
            },
            {
                "athlete": "Luka Dukic",
                "score": 823.0
            },
            {
                "athlete": "Mekenzie Riley",
                "score": 769.0
            },
            {
                "athlete": "Samantha Briggs",
                "score": 754.0
            },
            {
                "athlete": "Zach Watts",
                "score": 732.0
            },
            {
                "athlete": "Laura Clifton",
                "score": 723.0
            },
            {
                "athlete": "Alessandra Pichelli",
                "score": 701.0
            },
            {
                "athlete": "Carolyne Prevost",
                "score": 684.0
            },
            {
                "athlete": "Ellie Turner",
                "score": 677.0
            },
            {
                "athlete": "Sydney Michalyshen",
                "score": 670.0
            },
            {
                "athlete": "Jessica Griffith",
                "score": 603.0
            },
            {
                "athlete": "Emilia Leppanen",
                "score": 591.0
            },
            {
                "athlete": "Regan Huckaby",
                "score": 569.0
            },
            {
                "athlete": "Agustin Richelme",
                "score": 699.0
            },
            {
                "athlete": "Colten Mertens",
                "score": 694.0
            },
            {
                "athlete": "Rogelio Gamboa",
                "score": 665.0
            },
            {
                "athlete": "Giorgos Karavis",
                "score": 631.0
            },
            {
                "athlete": "Sasha Nievas",
                "score": 546.0
            },
            {
                "athlete": "Michelle Basnett",
                "score": 547.0
            },
            {
                "athlete": "Caroline Conners",
                "score": 475.0
            },
            {
                "athlete": "Seungyeon Choi",
                "score": 407.0
            },
            {
                "athlete": "Adrian Mundwiler",
                "score": 449.0
            },
            {
                "athlete": "Sean Sweeney",
                "score": 387.0
            },
            {
                "athlete": "Dani Speegle",
                "score": 328.0
            },
            {
                "athlete": "Sam Stewart",
                "score": 261.0
            },
            {
                "athlete": "Kara Saunders",
                "score": 156.0
            },
            {
                "athlete": "Aleksandar Ilin",
                "score": 158.0
            }
        ],
        "11": [
            {
                "athlete": "Justin Medeiros",
                "score": 1900.0
            },
            {
                "athlete": "Tia-Clair Toomey",
                "score": 1796.0
            },
            {
                "athlete": "Patrick Vellner",
                "score": 1635.0
            },
            {
                "athlete": "Saxon Panchik",
                "score": 1643.0
            },
            {
                "athlete": "Bjorgvin Karl Gudmundsson",
                "score": 1622.0
            },
            {
                "athlete": "Brent Fikowski",
                "score": 1647.0
            },
            {
                "athlete": "Jonne Koski",
                "score": 1611.0
            },
            {
                "athlete": "Laura Horvath",
                "score": 1401.0
            },
            {
                "athlete": "Guilherme Malheiros",
                "score": 1443.0
            },
            {
                "athlete": "Alex Vigneault",
                "score": 1616.0
            },
            {
                "athlete": "Noah Ohlsen",
                "score": 1441.0
            },
            {
                "athlete": "Lazar Dukic",
                "score": 1611.0
            },
            {
                "athlete": "Annie Thorisdottir",
                "score": 1201.0
            },
            {
                "athlete": "Jeffrey Adler",
                "score": 1418.0
            },
            {
                "athlete": "Kristin Holte",
                "score": 1364.0
            },
            {
                "athlete": "Scott Panchik",
                "score": 1338.0
            },
            {
                "athlete": "Travis Mayer",
                "score": 1361.0
            },
            {
                "athlete": "Cole Sager",
                "score": 1435.0
            },
            {
                "athlete": "Andre Houdet",
                "score": 1347.0
            },
            {
                "athlete": "Kristi Eramo O'Connell",
                "score": 1386.0
            },
            {
                "athlete": "Bayden Brown",
                "score": 1405.0
            },
            {
                "athlete": "Royce Dunne",
                "score": 1355.0
            },
            {
                "athlete": "Haley Adams",
                "score": 1312.0
            },
            {
                "athlete": "Mallory O'Brien",
                "score": 1216.0
            },
            {
                "athlete": "Gabriela Migala",
                "score": 1156.0
            },
            {
                "athlete": "Amanda Barnhart",
                "score": 1238.0
            },
            {
                "athlete": "Henrik Haapalainen",
                "score": 1246.0
            },
            {
                "athlete": "Katrin Tanja Davidsdottir",
                "score": 1039.0
            },
            {
                "athlete": "Danielle Brandon",
                "score": 1096.0
            },
            {
                "athlete": "Jayson Hopper",
                "score": 1220.0
            },
            {
                "athlete": "Will Moorad",
                "score": 1262.0
            },
            {
                "athlete": "Emma McQuaid",
                "score": 990.0
            },
            {
                "athlete": "Emily Rolfe",
                "score": 1011.0
            },
            {
                "athlete": "Thuridur Erla Helgadottir",
                "score": 916.0
            },
            {
                "athlete": "Emma Cary",
                "score": 885.0
            },
            {
                "athlete": "Arielle Loewen",
                "score": 952.0
            },
            {
                "athlete": "Jacqueline Dahlstrom",
                "score": 819.0
            },
            {
                "athlete": "Emma Tall",
                "score": 850.0
            },
            {
                "athlete": "Baylee Rayl",
                "score": 859.0
            },
            {
                "athlete": "Brooke Wells",
                "score": 1169.0
            },
            {
                "athlete": "Chandler Smith",
                "score": 1159.0
            },
            {
                "athlete": "Jay Crouch",
                "score": 1147.0
            },
            {
                "athlete": "Samuel Cournoyer",
                "score": 1102.0
            },
            {
                "athlete": "Uldis Upenieks",
                "score": 1006.0
            },
            {
                "athlete": "Jason Smith",
                "score": 991.0
            },
            {
                "athlete": "Brandon Luckett",
                "score": 970.0
            },
            {
                "athlete": "Alexandre Caron",
                "score": 954.0
            },
            {
                "athlete": "Timothy Paulson",
                "score": 835.0
            },
            {
                "athlete": "Luka Dukic",
                "score": 823.0
            },
            {
                "athlete": "Mekenzie Riley",
                "score": 769.0
            },
            {
                "athlete": "Samantha Briggs",
                "score": 754.0
            },
            {
                "athlete": "Zach Watts",
                "score": 732.0
            },
            {
                "athlete": "Laura Clifton",
                "score": 723.0
            },
            {
                "athlete": "Alessandra Pichelli",
                "score": 701.0
            },
            {
                "athlete": "Carolyne Prevost",
                "score": 684.0
            },
            {
                "athlete": "Ellie Turner",
                "score": 677.0
            },
            {
                "athlete": "Sydney Michalyshen",
                "score": 670.0
            },
            {
                "athlete": "Jessica Griffith",
                "score": 603.0
            },
            {
                "athlete": "Emilia Leppanen",
                "score": 591.0
            },
            {
                "athlete": "Regan Huckaby",
                "score": 569.0
            },
            {
                "athlete": "Agustin Richelme",
                "score": 699.0
            },
            {
                "athlete": "Colten Mertens",
                "score": 694.0
            },
            {
                "athlete": "Rogelio Gamboa",
                "score": 665.0
            },
            {
                "athlete": "Giorgos Karavis",
                "score": 631.0
            },
            {
                "athlete": "Sasha Nievas",
                "score": 546.0
            },
            {
                "athlete": "Michelle Basnett",
                "score": 547.0
            },
            {
                "athlete": "Caroline Conners",
                "score": 475.0
            },
            {
                "athlete": "Seungyeon Choi",
                "score": 407.0
            },
            {
                "athlete": "Adrian Mundwiler",
                "score": 449.0
            },
            {
                "athlete": "Sean Sweeney",
                "score": 387.0
            },
            {
                "athlete": "Dani Speegle",
                "score": 328.0
            },
            {
                "athlete": "Sam Stewart",
                "score": 261.0
            },
            {
                "athlete": "Kara Saunders",
                "score": 156.0
            },
            {
                "athlete": "Aleksandar Ilin",
                "score": 158.0
            }
        ],
        "12": [
            {
                "athlete": "Justin Medeiros",
                "score": 2045.0
            },
            {
                "athlete": "Tia-Clair Toomey",
                "score": 1991.0
            },
            {
                "athlete": "Patrick Vellner",
                "score": 1815.0
            },
            {
                "athlete": "Saxon Panchik",
                "score": 1798.0
            },
            {
                "athlete": "Bjorgvin Karl Gudmundsson",
                "score": 1712.0
            },
            {
                "athlete": "Brent Fikowski",
                "score": 1807.0
            },
            {
                "athlete": "Jonne Koski",
                "score": 1646.0
            },
            {
                "athlete": "Laura Horvath",
                "score": 1576.0
            },
            {
                "athlete": "Guilherme Malheiros",
                "score": 1643.0
            },
            {
                "athlete": "Alex Vigneault",
                "score": 1721.0
            },
            {
                "athlete": "Noah Ohlsen",
                "score": 1481.0
            },
            {
                "athlete": "Lazar Dukic",
                "score": 1671.0
            },
            {
                "athlete": "Annie Thorisdottir",
                "score": 1391.0
            },
            {
                "athlete": "Jeffrey Adler",
                "score": 1513.0
            },
            {
                "athlete": "Kristin Holte",
                "score": 1409.0
            },
            {
                "athlete": "Scott Panchik",
                "score": 1448.0
            },
            {
                "athlete": "Travis Mayer",
                "score": 1461.0
            },
            {
                "athlete": "Cole Sager",
                "score": 1450.0
            },
            {
                "athlete": "Andre Houdet",
                "score": 1497.0
            },
            {
                "athlete": "Kristi Eramo O'Connell",
                "score": 1406.0
            },
            {
                "athlete": "Bayden Brown",
                "score": 1410.0
            },
            {
                "athlete": "Royce Dunne",
                "score": 1540.0
            },
            {
                "athlete": "Haley Adams",
                "score": 1362.0
            },
            {
                "athlete": "Mallory O'Brien",
                "score": 1291.0
            },
            {
                "athlete": "Gabriela Migala",
                "score": 1326.0
            },
            {
                "athlete": "Amanda Barnhart",
                "score": 1323.0
            },
            {
                "athlete": "Henrik Haapalainen",
                "score": 1256.0
            },
            {
                "athlete": "Katrin Tanja Davidsdottir",
                "score": 1179.0
            },
            {
                "athlete": "Danielle Brandon",
                "score": 1261.0
            },
            {
                "athlete": "Jayson Hopper",
                "score": 1285.0
            },
            {
                "athlete": "Will Moorad",
                "score": 1377.0
            },
            {
                "athlete": "Emma McQuaid",
                "score": 1120.0
            },
            {
                "athlete": "Emily Rolfe",
                "score": 1036.0
            },
            {
                "athlete": "Thuridur Erla Helgadottir",
                "score": 1041.0
            },
            {
                "athlete": "Emma Cary",
                "score": 1020.0
            },
            {
                "athlete": "Arielle Loewen",
                "score": 1032.0
            },
            {
                "athlete": "Jacqueline Dahlstrom",
                "score": 874.0
            },
            {
                "athlete": "Emma Tall",
                "score": 920.0
            },
            {
                "athlete": "Baylee Rayl",
                "score": 889.0
            },
            {
                "athlete": "Brooke Wells",
                "score": 1289.0
            },
            {
                "athlete": "Chandler Smith",
                "score": 1159.0
            },
            {
                "athlete": "Jay Crouch",
                "score": 1147.0
            },
            {
                "athlete": "Samuel Cournoyer",
                "score": 1102.0
            },
            {
                "athlete": "Uldis Upenieks",
                "score": 1006.0
            },
            {
                "athlete": "Jason Smith",
                "score": 991.0
            },
            {
                "athlete": "Brandon Luckett",
                "score": 970.0
            },
            {
                "athlete": "Alexandre Caron",
                "score": 954.0
            },
            {
                "athlete": "Timothy Paulson",
                "score": 835.0
            },
            {
                "athlete": "Luka Dukic",
                "score": 823.0
            },
            {
                "athlete": "Mekenzie Riley",
                "score": 769.0
            },
            {
                "athlete": "Samantha Briggs",
                "score": 754.0
            },
            {
                "athlete": "Zach Watts",
                "score": 732.0
            },
            {
                "athlete": "Laura Clifton",
                "score": 723.0
            },
            {
                "athlete": "Alessandra Pichelli",
                "score": 701.0
            },
            {
                "athlete": "Carolyne Prevost",
                "score": 684.0
            },
            {
                "athlete": "Ellie Turner",
                "score": 677.0
            },
            {
                "athlete": "Sydney Michalyshen",
                "score": 670.0
            },
            {
                "athlete": "Jessica Griffith",
                "score": 603.0
            },
            {
                "athlete": "Emilia Leppanen",
                "score": 591.0
            },
            {
                "athlete": "Regan Huckaby",
                "score": 569.0
            },
            {
                "athlete": "Agustin Richelme",
                "score": 699.0
            },
            {
                "athlete": "Colten Mertens",
                "score": 694.0
            },
            {
                "athlete": "Rogelio Gamboa",
                "score": 665.0
            },
            {
                "athlete": "Giorgos Karavis",
                "score": 631.0
            },
            {
                "athlete": "Sasha Nievas",
                "score": 546.0
            },
            {
                "athlete": "Michelle Basnett",
                "score": 547.0
            },
            {
                "athlete": "Caroline Conners",
                "score": 475.0
            },
            {
                "athlete": "Seungyeon Choi",
                "score": 407.0
            },
            {
                "athlete": "Adrian Mundwiler",
                "score": 449.0
            },
            {
                "athlete": "Sean Sweeney",
                "score": 387.0
            },
            {
                "athlete": "Dani Speegle",
                "score": 328.0
            },
            {
                "athlete": "Sam Stewart",
                "score": 261.0
            },
            {
                "athlete": "Kara Saunders",
                "score": 156.0
            },
            {
                "athlete": "Aleksandar Ilin",
                "score": 158.0
            }
        ],
        "13": [
            {
                "athlete": "Justin Medeiros",
                "score": 2225.0
            },
            {
                "athlete": "Tia-Clair Toomey",
                "score": 2191.0
            },
            {
                "athlete": "Patrick Vellner",
                "score": 2005.0
            },
            {
                "athlete": "Saxon Panchik",
                "score": 1813.0
            },
            {
                "athlete": "Bjorgvin Karl Gudmundsson",
                "score": 1907.0
            },
            {
                "athlete": "Brent Fikowski",
                "score": 1912.0
            },
            {
                "athlete": "Jonne Koski",
                "score": 1736.0
            },
            {
                "athlete": "Laura Horvath",
                "score": 1741.0
            },
            {
                "athlete": "Guilherme Malheiros",
                "score": 1713.0
            },
            {
                "athlete": "Alex Vigneault",
                "score": 1836.0
            },
            {
                "athlete": "Noah Ohlsen",
                "score": 1651.0
            },
            {
                "athlete": "Lazar Dukic",
                "score": 1696.0
            },
            {
                "athlete": "Annie Thorisdottir",
                "score": 1546.0
            },
            {
                "athlete": "Jeffrey Adler",
                "score": 1688.0
            },
            {
                "athlete": "Kristin Holte",
                "score": 1559.0
            },
            {
                "athlete": "Scott Panchik",
                "score": 1513.0
            },
            {
                "athlete": "Travis Mayer",
                "score": 1601.0
            },
            {
                "athlete": "Cole Sager",
                "score": 1595.0
            },
            {
                "athlete": "Andre Houdet",
                "score": 1592.0
            },
            {
                "athlete": "Kristi Eramo O'Connell",
                "score": 1426.0
            },
            {
                "athlete": "Bayden Brown",
                "score": 1495.0
            },
            {
                "athlete": "Royce Dunne",
                "score": 1640.0
            },
            {
                "athlete": "Haley Adams",
                "score": 1422.0
            },
            {
                "athlete": "Mallory O'Brien",
                "score": 1371.0
            },
            {
                "athlete": "Gabriela Migala",
                "score": 1511.0
            },
            {
                "athlete": "Amanda Barnhart",
                "score": 1458.0
            },
            {
                "athlete": "Henrik Haapalainen",
                "score": 1416.0
            },
            {
                "athlete": "Katrin Tanja Davidsdottir",
                "score": 1304.0
            },
            {
                "athlete": "Danielle Brandon",
                "score": 1311.0
            },
            {
                "athlete": "Jayson Hopper",
                "score": 1395.0
            },
            {
                "athlete": "Will Moorad",
                "score": 1387.0
            },
            {
                "athlete": "Emma McQuaid",
                "score": 1250.0
            },
            {
                "athlete": "Emily Rolfe",
                "score": 1111.0
            },
            {
                "athlete": "Thuridur Erla Helgadottir",
                "score": 1086.0
            },
            {
                "athlete": "Emma Cary",
                "score": 1055.0
            },
            {
                "athlete": "Arielle Loewen",
                "score": 1087.0
            },
            {
                "athlete": "Jacqueline Dahlstrom",
                "score": 994.0
            },
            {
                "athlete": "Emma Tall",
                "score": 960.0
            },
            {
                "athlete": "Baylee Rayl",
                "score": 919.0
            },
            {
                "athlete": "Brooke Wells",
                "score": 1289.0
            },
            {
                "athlete": "Chandler Smith",
                "score": 1159.0
            },
            {
                "athlete": "Jay Crouch",
                "score": 1147.0
            },
            {
                "athlete": "Samuel Cournoyer",
                "score": 1102.0
            },
            {
                "athlete": "Uldis Upenieks",
                "score": 1006.0
            },
            {
                "athlete": "Jason Smith",
                "score": 991.0
            },
            {
                "athlete": "Brandon Luckett",
                "score": 970.0
            },
            {
                "athlete": "Alexandre Caron",
                "score": 954.0
            },
            {
                "athlete": "Timothy Paulson",
                "score": 835.0
            },
            {
                "athlete": "Luka Dukic",
                "score": 823.0
            },
            {
                "athlete": "Mekenzie Riley",
                "score": 769.0
            },
            {
                "athlete": "Samantha Briggs",
                "score": 754.0
            },
            {
                "athlete": "Zach Watts",
                "score": 732.0
            },
            {
                "athlete": "Laura Clifton",
                "score": 723.0
            },
            {
                "athlete": "Alessandra Pichelli",
                "score": 701.0
            },
            {
                "athlete": "Carolyne Prevost",
                "score": 684.0
            },
            {
                "athlete": "Ellie Turner",
                "score": 677.0
            },
            {
                "athlete": "Sydney Michalyshen",
                "score": 670.0
            },
            {
                "athlete": "Jessica Griffith",
                "score": 603.0
            },
            {
                "athlete": "Emilia Leppanen",
                "score": 591.0
            },
            {
                "athlete": "Regan Huckaby",
                "score": 569.0
            },
            {
                "athlete": "Agustin Richelme",
                "score": 699.0
            },
            {
                "athlete": "Colten Mertens",
                "score": 694.0
            },
            {
                "athlete": "Rogelio Gamboa",
                "score": 665.0
            },
            {
                "athlete": "Giorgos Karavis",
                "score": 631.0
            },
            {
                "athlete": "Sasha Nievas",
                "score": 546.0
            },
            {
                "athlete": "Michelle Basnett",
                "score": 547.0
            },
            {
                "athlete": "Caroline Conners",
                "score": 475.0
            },
            {
                "athlete": "Seungyeon Choi",
                "score": 407.0
            },
            {
                "athlete": "Adrian Mundwiler",
                "score": 449.0
            },
            {
                "athlete": "Sean Sweeney",
                "score": 387.0
            },
            {
                "athlete": "Dani Speegle",
                "score": 328.0
            },
            {
                "athlete": "Sam Stewart",
                "score": 261.0
            },
            {
                "athlete": "Kara Saunders",
                "score": 156.0
            },
            {
                "athlete": "Aleksandar Ilin",
                "score": 158.0
            }
        ],
        "14": [
            {
                "athlete": "Justin Medeiros",
                "score": 2405.0
            },
            {
                "athlete": "Tia-Clair Toomey",
                "score": 2381.0
            },
            {
                "athlete": "Patrick Vellner",
                "score": 2190.0
            },
            {
                "athlete": "Saxon Panchik",
                "score": 1983.0
            },
            {
                "athlete": "Bjorgvin Karl Gudmundsson",
                "score": 2057.0
            },
            {
                "athlete": "Brent Fikowski",
                "score": 2027.0
            },
            {
                "athlete": "Jonne Koski",
                "score": 1871.0
            },
            {
                "athlete": "Laura Horvath",
                "score": 1846.0
            },
            {
                "athlete": "Guilherme Malheiros",
                "score": 1828.0
            },
            {
                "athlete": "Alex Vigneault",
                "score": 1851.0
            },
            {
                "athlete": "Noah Ohlsen",
                "score": 1816.0
            },
            {
                "athlete": "Lazar Dukic",
                "score": 1816.0
            },
            {
                "athlete": "Annie Thorisdottir",
                "score": 1746.0
            },
            {
                "athlete": "Jeffrey Adler",
                "score": 1768.0
            },
            {
                "athlete": "Kristin Holte",
                "score": 1754.0
            },
            {
                "athlete": "Scott Panchik",
                "score": 1663.0
            },
            {
                "athlete": "Travis Mayer",
                "score": 1631.0
            },
            {
                "athlete": "Cole Sager",
                "score": 1660.0
            },
            {
                "athlete": "Andre Houdet",
                "score": 1682.0
            },
            {
                "athlete": "Kristi Eramo O'Connell",
                "score": 1576.0
            },
            {
                "athlete": "Bayden Brown",
                "score": 1580.0
            },
            {
                "athlete": "Royce Dunne",
                "score": 1660.0
            },
            {
                "athlete": "Haley Adams",
                "score": 1527.0
            },
            {
                "athlete": "Mallory O'Brien",
                "score": 1536.0
            },
            {
                "athlete": "Gabriela Migala",
                "score": 1541.0
            },
            {
                "athlete": "Amanda Barnhart",
                "score": 1583.0
            },
            {
                "athlete": "Henrik Haapalainen",
                "score": 1471.0
            },
            {
                "athlete": "Katrin Tanja Davidsdottir",
                "score": 1469.0
            },
            {
                "athlete": "Danielle Brandon",
                "score": 1486.0
            },
            {
                "athlete": "Jayson Hopper",
                "score": 1435.0
            },
            {
                "athlete": "Will Moorad",
                "score": 1447.0
            },
            {
                "athlete": "Emma McQuaid",
                "score": 1385.0
            },
            {
                "athlete": "Emily Rolfe",
                "score": 1206.0
            },
            {
                "athlete": "Thuridur Erla Helgadottir",
                "score": 1161.0
            },
            {
                "athlete": "Emma Cary",
                "score": 1110.0
            },
            {
                "athlete": "Arielle Loewen",
                "score": 1162.0
            },
            {
                "athlete": "Jacqueline Dahlstrom",
                "score": 1049.0
            },
            {
                "athlete": "Emma Tall",
                "score": 970.0
            },
            {
                "athlete": "Baylee Rayl",
                "score": 959.0
            },
            {
                "athlete": "Brooke Wells",
                "score": 1289.0
            },
            {
                "athlete": "Chandler Smith",
                "score": 1159.0
            },
            {
                "athlete": "Jay Crouch",
                "score": 1147.0
            },
            {
                "athlete": "Samuel Cournoyer",
                "score": 1102.0
            },
            {
                "athlete": "Uldis Upenieks",
                "score": 1006.0
            },
            {
                "athlete": "Jason Smith",
                "score": 991.0
            },
            {
                "athlete": "Brandon Luckett",
                "score": 970.0
            },
            {
                "athlete": "Alexandre Caron",
                "score": 954.0
            },
            {
                "athlete": "Timothy Paulson",
                "score": 835.0
            },
            {
                "athlete": "Luka Dukic",
                "score": 823.0
            },
            {
                "athlete": "Mekenzie Riley",
                "score": 769.0
            },
            {
                "athlete": "Samantha Briggs",
                "score": 754.0
            },
            {
                "athlete": "Zach Watts",
                "score": 732.0
            },
            {
                "athlete": "Laura Clifton",
                "score": 723.0
            },
            {
                "athlete": "Alessandra Pichelli",
                "score": 701.0
            },
            {
                "athlete": "Carolyne Prevost",
                "score": 684.0
            },
            {
                "athlete": "Ellie Turner",
                "score": 677.0
            },
            {
                "athlete": "Sydney Michalyshen",
                "score": 670.0
            },
            {
                "athlete": "Jessica Griffith",
                "score": 603.0
            },
            {
                "athlete": "Emilia Leppanen",
                "score": 591.0
            },
            {
                "athlete": "Regan Huckaby",
                "score": 569.0
            },
            {
                "athlete": "Agustin Richelme",
                "score": 699.0
            },
            {
                "athlete": "Colten Mertens",
                "score": 694.0
            },
            {
                "athlete": "Rogelio Gamboa",
                "score": 665.0
            },
            {
                "athlete": "Giorgos Karavis",
                "score": 631.0
            },
            {
                "athlete": "Sasha Nievas",
                "score": 546.0
            },
            {
                "athlete": "Michelle Basnett",
                "score": 547.0
            },
            {
                "athlete": "Caroline Conners",
                "score": 475.0
            },
            {
                "athlete": "Seungyeon Choi",
                "score": 407.0
            },
            {
                "athlete": "Adrian Mundwiler",
                "score": 449.0
            },
            {
                "athlete": "Sean Sweeney",
                "score": 387.0
            },
            {
                "athlete": "Dani Speegle",
                "score": 328.0
            },
            {
                "athlete": "Sam Stewart",
                "score": 261.0
            },
            {
                "athlete": "Kara Saunders",
                "score": 156.0
            },
            {
                "athlete": "Aleksandar Ilin",
                "score": 158.0
            }
        ],
        "15": [
            {
                "athlete": "Justin Medeiros",
                "score": 2600.0
            },
            {
                "athlete": "Tia-Clair Toomey",
                "score": 2581.0
            },
            {
                "athlete": "Patrick Vellner",
                "score": 2320.0
            },
            {
                "athlete": "Saxon Panchik",
                "score": 2173.0
            },
            {
                "athlete": "Bjorgvin Karl Gudmundsson",
                "score": 2132.0
            },
            {
                "athlete": "Brent Fikowski",
                "score": 2122.0
            },
            {
                "athlete": "Jonne Koski",
                "score": 2051.0
            },
            {
                "athlete": "Laura Horvath",
                "score": 2031.0
            },
            {
                "athlete": "Guilherme Malheiros",
                "score": 2003.0
            },
            {
                "athlete": "Alex Vigneault",
                "score": 2001.0
            },
            {
                "athlete": "Noah Ohlsen",
                "score": 1971.0
            },
            {
                "athlete": "Lazar Dukic",
                "score": 1961.0
            },
            {
                "athlete": "Annie Thorisdottir",
                "score": 1916.0
            },
            {
                "athlete": "Jeffrey Adler",
                "score": 1903.0
            },
            {
                "athlete": "Kristin Holte",
                "score": 1834.0
            },
            {
                "athlete": "Scott Panchik",
                "score": 1823.0
            },
            {
                "athlete": "Travis Mayer",
                "score": 1796.0
            },
            {
                "athlete": "Cole Sager",
                "score": 1765.0
            },
            {
                "athlete": "Andre Houdet",
                "score": 1737.0
            },
            {
                "athlete": "Kristi Eramo O'Connell",
                "score": 1696.0
            },
            {
                "athlete": "Bayden Brown",
                "score": 1690.0
            },
            {
                "athlete": "Royce Dunne",
                "score": 1685.0
            },
            {
                "athlete": "Haley Adams",
                "score": 1667.0
            },
            {
                "athlete": "Mallory O'Brien",
                "score": 1661.0
            },
            {
                "athlete": "Gabriela Migala",
                "score": 1626.0
            },
            {
                "athlete": "Amanda Barnhart",
                "score": 1613.0
            },
            {
                "athlete": "Henrik Haapalainen",
                "score": 1586.0
            },
            {
                "athlete": "Katrin Tanja Davidsdottir",
                "score": 1559.0
            },
            {
                "athlete": "Danielle Brandon",
                "score": 1531.0
            },
            {
                "athlete": "Jayson Hopper",
                "score": 1495.0
            },
            {
                "athlete": "Will Moorad",
                "score": 1482.0
            },
            {
                "athlete": "Emma McQuaid",
                "score": 1450.0
            },
            {
                "athlete": "Emily Rolfe",
                "score": 1216.0
            },
            {
                "athlete": "Thuridur Erla Helgadottir",
                "score": 1211.0
            },
            {
                "athlete": "Emma Cary",
                "score": 1210.0
            },
            {
                "athlete": "Arielle Loewen",
                "score": 1202.0
            },
            {
                "athlete": "Jacqueline Dahlstrom",
                "score": 1119.0
            },
            {
                "athlete": "Emma Tall",
                "score": 985.0
            },
            {
                "athlete": "Baylee Rayl",
                "score": 979.0
            },
            {
                "athlete": "Brooke Wells",
                "score": 1289.0
            },
            {
                "athlete": "Chandler Smith",
                "score": 1159.0
            },
            {
                "athlete": "Jay Crouch",
                "score": 1147.0
            },
            {
                "athlete": "Samuel Cournoyer",
                "score": 1102.0
            },
            {
                "athlete": "Uldis Upenieks",
                "score": 1006.0
            },
            {
                "athlete": "Jason Smith",
                "score": 991.0
            },
            {
                "athlete": "Brandon Luckett",
                "score": 970.0
            },
            {
                "athlete": "Alexandre Caron",
                "score": 954.0
            },
            {
                "athlete": "Timothy Paulson",
                "score": 835.0
            },
            {
                "athlete": "Luka Dukic",
                "score": 823.0
            },
            {
                "athlete": "Mekenzie Riley",
                "score": 769.0
            },
            {
                "athlete": "Samantha Briggs",
                "score": 754.0
            },
            {
                "athlete": "Zach Watts",
                "score": 732.0
            },
            {
                "athlete": "Laura Clifton",
                "score": 723.0
            },
            {
                "athlete": "Alessandra Pichelli",
                "score": 701.0
            },
            {
                "athlete": "Carolyne Prevost",
                "score": 684.0
            },
            {
                "athlete": "Ellie Turner",
                "score": 677.0
            },
            {
                "athlete": "Sydney Michalyshen",
                "score": 670.0
            },
            {
                "athlete": "Jessica Griffith",
                "score": 603.0
            },
            {
                "athlete": "Emilia Leppanen",
                "score": 591.0
            },
            {
                "athlete": "Regan Huckaby",
                "score": 569.0
            },
            {
                "athlete": "Agustin Richelme",
                "score": 699.0
            },
            {
                "athlete": "Colten Mertens",
                "score": 694.0
            },
            {
                "athlete": "Rogelio Gamboa",
                "score": 665.0
            },
            {
                "athlete": "Giorgos Karavis",
                "score": 631.0
            },
            {
                "athlete": "Sasha Nievas",
                "score": 546.0
            },
            {
                "athlete": "Michelle Basnett",
                "score": 547.0
            },
            {
                "athlete": "Caroline Conners",
                "score": 475.0
            },
            {
                "athlete": "Seungyeon Choi",
                "score": 407.0
            },
            {
                "athlete": "Adrian Mundwiler",
                "score": 449.0
            },
            {
                "athlete": "Sean Sweeney",
                "score": 387.0
            },
            {
                "athlete": "Dani Speegle",
                "score": 328.0
            },
            {
                "athlete": "Sam Stewart",
                "score": 261.0
            },
            {
                "athlete": "Kara Saunders",
                "score": 156.0
            },
            {
                "athlete": "Aleksandar Ilin",
                "score": 158.0
            }
        ]
    }

    justinMedeiros = 0
    listofAthletes = []
    placing = []
    aD1 = allData[1]
    for (var k = 0; k < aD1.length; k++) {
        placing.push(aD1[k].score)
        listofAthletes.push(aD1[k].athlete)
    }

    let athleteDict = listofAthletes.map(x => ({ athlete: x, win: 0 }));

    for (var g = 1; g < 16; g++) {
        if (allData[g][0].score == 874) {
            if (allData[g][0].athlete == athleteDict['athlete']) {
                athleteDict['win']++
            }
        }
    }

    chart.data = JSON.parse(JSON.stringify(allData[event]));
    categoryAxis.zoom({ start: 0, end: 15 / chart.data.length });

    series.events.on("inited", function () {
        setTimeout(function () {
            playButton.isActive = false; // this starts interval
        }, 2000)
    })

}); // end am4core.ready()