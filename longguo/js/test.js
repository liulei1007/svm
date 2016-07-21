$(function(){
	plumeLog("进入test模板自定义js-"+plumeTime());
	$(function () {
		$('#container').highcharts({
			title: {
				text: 'Monthly Average Temperature',
				x: -20 //center
			},
			subtitle: {
				text: 'Source: WorldClimate.com',
				x: -20
			},
			xAxis: {
				categories: ['2011', '2012', '2013', '2014', '2015', '2016']
			},
			yAxis: {
				title: {
					text: 'mytest'
				},
				plotLines: [{
					value: 0,
					width: 1,
					color: '#808080'
				}]
			},
			tooltip: {
				valueSuffix: '次'
			},
			legend: {
				layout: 'vertical',
				align: 'right',
				verticalAlign: 'middle',
				borderWidth: 0
			},
			series: [{
				name: 'test',
				data: [4000,7000,3244,2342,1213,1233]
			},{
				name: 'Z',
				data: [5000,5000,5000,5000,5000,5000]
			}
			],
			credits: {
				text: '',
				href: ''
			}
		});
	});
})