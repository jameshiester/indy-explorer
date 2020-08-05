import React, { useRef, useEffect, useState, useContext } from 'react';
import * as am4charts from '@amcharts/amcharts4/charts';
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

const mapData = ({
  timestamp,
  read_throughput,
  write_throughput,
}: INodesStatusSummary) => ({
  date: dateToString(timestamp || 0, 'yyyy-MM-dd HH:mm'),
  read_throughput,
  write_throughput,
});

const getHistory = async () => {
  try {
    const response = await axios.get(`/api/nodes/history/summary`, {
      params: { since: Date.now() - 60 * 1000 * 60 * 24 * 30 },
    });
    return response.data.map((data: any) => mapData(data));
  } catch (e) {}
};

const CHART_ID = 'nodes-history-throughput';

const Active: React.FC = () => {
  const chart = useRef<XYChart>();
  const readSeries = useRef<LineSeries>();
  const writeSeries = useRef<LineSeries>();
  const socket = useContext(SocketContext);
  useEffect(() => {
    chart.current = am4core.create(CHART_ID, XYChart);
    chart.current.dateFormatter.inputDateFormat = 'yyyy-MM-dd HH:mm';

    let dateAxis = chart.current.xAxes.push(new DateAxis());
    let valueAxis = chart.current.yAxes.push(new ValueAxis());
    valueAxis.renderer.minGridDistance = 40;
    valueAxis.adjustLabelPrecision = false;
    valueAxis.title.text = 'Txns per second';
    readSeries.current = chart.current.series.push(new LineSeries());
    readSeries.current.dataFields.valueY = 'read_throughput';
    readSeries.current.dataFields.dateX = 'date';
    readSeries.current.tooltipText = '{date}';
    readSeries.current.stroke = am4core.color('#1DE9B6');
    readSeries.current.strokeWidth = 2;
    readSeries.current.minBulletDistance = 15;
    readSeries.current.name = 'Read';
    writeSeries.current = chart.current.series.push(new LineSeries());
    writeSeries.current.stroke = am4core.color('#A389D4');
    writeSeries.current.dataFields.valueY = 'write_throughput';
    writeSeries.current.dataFields.dateX = 'date';
    writeSeries.current.tooltipText = '{date}';
    writeSeries.current.strokeWidth = 2;
    writeSeries.current.minBulletDistance = 15;
    writeSeries.current.name = 'Write';

    chart.current.legend = new am4charts.Legend();
    chart.current.legend.minWidth = 100;
    chart.current.legend.position = 'right';
    chart.current.cursor = new XYCursor();
    chart.current.cursor.behavior = 'panXY';
    chart.current.cursor.xAxis = dateAxis;
    dateAxis.keepSelection = true;
    getHistory().then((response) => {
      if (chart.current && response) chart.current.data = response;
    });
    socket.on(NODES_HISTORY_SUMMARY_UPDATE, (data: INodesStatusSummary) => {
      if (chart.current) {
        chart.current.addData(mapData(data), 0);
      }
    });
    return () => chart.current && chart.current.dispose();
  }, []);

  return <div id={CHART_ID} style={{ width: '100%', height: 250 }}></div>;
};

export default Active;
