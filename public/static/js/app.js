d3.json("./static/data/allData.json", function (allData) {
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

        chart.data = JSON.parse(JSON.stringify(allData[event]));
        categoryAxis.zoom({ start: 0, end: 15 / chart.data.length });

        series.events.on("inited", function () {
            setTimeout(function () {
                playButton.isActive = false; // this starts interval
            }, 2000)
        })

    }); // end am4core.ready()
});