import React, { useRef, useEffect, useState, useContext } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import {
  XYChart,
  DateAxis,
  ValueAxis,
  LineSeries,
  XYCursor,
  CircleBullet,
  XYChartScrollbar,
} from '@amcharts/amcharts4/charts';
import axios from 'axios';
import SocketContext from '@context/socket';
import { INodesStatusSummary, NODES_HISTORY_SUMMARY_UPDATE } from 'model';
import { dateToString } from '@util/helper';

const mapData = ({ timestamp, active }: INodesStatusSummary) => ({
  date: dateToString(timestamp || 0, 'yyyy-MM-dd HH:mm'),
  value: active,
});

const getHistory = async () => {
  try {
    const response = await axios.get(`/api/nodes/history/summary`, {
      params: { since: Date.now() - 60 * 1000 * 60 * 24 * 30 },
    });
    return response.data.map(mapData);
  } catch (e) {}
};

const CHART_ID = 'nodes-history-active';

const Active: React.FC = () => {
  const chart = useRef<XYChart>();
  const [seriesReady, setSeriesReady] = useState(false);
  const series = useRef<LineSeries>();
  const socket = useContext(SocketContext);
  useEffect(() => {
    chart.current = am4core.create(CHART_ID, XYChart);
    chart.current.dateFormatter.inputDateFormat = 'yyyy-MM-dd HH:mm';
    let dateAxis = chart.current.xAxes.push(new DateAxis());
    let valueAxis = chart.current.yAxes.push(new ValueAxis());
    valueAxis.renderer.minGridDistance = 40;
    valueAxis.adjustLabelPrecision = false;
    valueAxis.renderer.labels.template.adapter.add('text', function (
      text,
      target
    ) {
      return !text || text.match(/\./) ? '' : text;
    });
    valueAxis.title.text = '# of Nodes';
    series.current = chart.current.series.push(new LineSeries());
    series.current.dataFields.valueY = 'value';
    series.current.dataFields.dateX = 'date';
    series.current.tooltipText = '{date}';
    series.current.strokeWidth = 2;
    series.current.minBulletDistance = 15;
    let bullet = series.current.bullets.push(new CircleBullet());
    bullet.circle.strokeWidth = 2;
    bullet.circle.radius = 4;
    bullet.circle.fill = am4core.color('#fff');
    let bullethover = bullet.states.create('hover');
    bullethover.properties.scale = 1.3;
    chart.current.cursor = new XYCursor();
    chart.current.cursor.behavior = 'panXY';
    chart.current.cursor.xAxis = dateAxis;
    chart.current.cursor.snapToSeries = series.current;
    dateAxis.keepSelection = true;
    setSeriesReady(true);
    getHistory().then((response) => {
      if (series.current) series.current.data = response;
    });
    socket.on(NODES_HISTORY_SUMMARY_UPDATE, (data: INodesStatusSummary) => {
      if (series.current) {
        series.current.addData(mapData(data), 0);
      }
    });
    return () => chart.current && chart.current.dispose();
  }, []);

  return <div id={CHART_ID} style={{ width: '100%', height: 250 }}></div>;
};

export default Active;
