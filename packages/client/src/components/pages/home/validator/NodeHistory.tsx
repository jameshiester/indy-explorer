import React, { useRef, useEffect, useState } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import {
  XYChart,
  DateAxis,
  ValueAxis,
  LineSeries,
  XYCursor,
  CircleBullet,
  XYChartScrollbar,
  CategoryAxis,
} from '@amcharts/amcharts4/charts';
import { getHistory } from '@query/nodeHistory';

export type NodeHistoryProps = {
  name: string;
};

const NodeHistory: React.FC<NodeHistoryProps> = ({ name }) => {
  const chart = useRef<XYChart>();
  const [seriesReady, setSeriesReady] = useState(false);
  const series = useRef<LineSeries>();
  const [value, setValue] = useState<Array<any>>();

  useEffect(() => {
    chart.current = am4core.create(`node-history-${name}`, XYChart);
    chart.current.dateFormatter.inputDateFormat = 'yyyy-MM-dd HH:mm';
    let dateAxis = chart.current.xAxes.push(new DateAxis());
    let valueAxis = chart.current.yAxes.push(new ValueAxis());
    valueAxis.max = 1;
    valueAxis.min = 0;
    valueAxis.title.text = 'Online';
    // Create series
    series.current = chart.current.series.push(new LineSeries());
    series.current.dataFields.valueY = 'value';
    series.current.dataFields.dateX = 'date';
    series.current.tooltipText = '{date}';
    series.current.strokeWidth = 2;
    series.current.minBulletDistance = 15;

    // Make bullets grow on hover
    let bullet = series.current.bullets.push(new CircleBullet());
    bullet.circle.strokeWidth = 2;
    bullet.circle.radius = 4;
    bullet.circle.fill = am4core.color('#fff');

    let bullethover = bullet.states.create('hover');
    bullethover.properties.scale = 1.3;

    // Make a panning cursor
    chart.current.cursor = new XYCursor();
    chart.current.cursor.behavior = 'panXY';
    chart.current.cursor.xAxis = dateAxis;
    chart.current.cursor.snapToSeries = series.current;

    // Create vertical scrollbar and place it before the value axis
    // chart.current.scrollbarY = new am4core.Scrollbar();
    // chart.current.scrollbarY.parent = chart.current.leftAxesContainer;
    // chart.current.scrollbarY.toBack();

    // Create a horizontal scrollbar with previe and place it underneath the date axis
    chart.current.scrollbarX = new XYChartScrollbar();
    (chart.current.scrollbarX as XYChartScrollbar).series.push(series.current);
    chart.current.scrollbarX.parent = chart.current.bottomAxesContainer;

    // dateAxis.start = 0.79;
    dateAxis.keepSelection = true;
    setSeriesReady(true);
    getHistory(name).then((response) => setValue(response));
    return () => chart.current && chart.current.dispose();
  }, []);

  useEffect(() => {
    if (seriesReady && value && series.current) {
      series.current.data = value;
    }
  }, [seriesReady, value]);
  return (
    <div
      id={`node-history-${name}`}
      style={{ width: '100%', height: 500 }}
    ></div>
  );
};

export default NodeHistory;
