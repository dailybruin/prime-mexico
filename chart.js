google.load("visualization","1", {packages:["corechart"]});
google.setOnLoadCallback(drawChart);

function drawChart(){
    var data = google.visualization.arrayToDataTable([
        ['Name','After','Before',],
        ['Ada Beatriz',4.25,{v:5.25, f:'9.5'}],
        ['Cristo',9,{v:18.75, f:'27.75'}],
        ['Didier Amaury',15.25,{v:21.75, f:'37'}],
        ['Julissa',5,{v:14, f:'19'}],
        ['Vivianita',2,{v:2, f:'4'}],
        ['Yvonne',3.5,{v:10, f:'13.5'}],
        ['7 Mares',10.25,{v:57.75, f:'68'}],
    ]);

var options ={
    title: 'Carbon Monoxide levels on each boat before and after the intervention',
    titleTextStyle: {color: 'white', fontSize: 16, bold: true},
    hAxis: {title: 'CO Parts per million (PPM)', viewWindow: {max:70}, textStyle: {color:'white'}, titleTextStyle: {color: 'white'} },
    vAxis: {gridlines: {color:'white'}, textStyle: {color:'white'}},
    isStacked: true,
    animation: {duration: 1000, easing: 'out'},
    backgroundColor: {fill:'transparent', stroke: '#000000', strokeWidth: 5},
    height: 400,
    width: '90%'
};

    var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
    chart.draw(data, options);

    var main = document.getElementById('main'),
        main_width = main.offsetWidth;

    // Resize if main's width has changed:
    var checkForResize = function() {
        if (main_width !== main.offsetWidth) {
            main_width = main.offsetWidth;
            chart.draw(data, options);
        }
    }
    setInterval(checkForResize, 1000);
}
