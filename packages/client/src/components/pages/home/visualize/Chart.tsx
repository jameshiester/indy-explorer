import React, { useEffect, useRef, useState } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import * as forceDirected from '@amcharts/amcharts4/plugins/forceDirected';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { useVisualizer } from '@query/visualizer';

const mapTransactions = (txn: any, data: any[] = []): any => {
  const children = data.filter((item) => item.source === txn.destination);
  return {
    name: txn.source || 'Trustee',

    type: txn.transactionTypeName,
    sequence: txn.sequence,
    children: children
      ? children.map((child: any) => mapTransactions(child, data))
      : undefined,
    value: children ? children.length : 1,
  };
};

am4core.useTheme(am4themes_animated);

const Visualize = () => {
  const chart = useRef<forceDirected.ForceDirectedTree>();
  const series = useRef<forceDirected.ForceDirectedSeries>();
  const [seriesReady, setSeriesReady] = useState(false);
  const value = useVisualizer();
  useEffect(() => {
    chart.current = am4core.create(
      'vis-chart',
      forceDirected.ForceDirectedTree
    );
    series.current = chart.current.series.push(
      new forceDirected.ForceDirectedSeries()
    );
    series.current.dataFields.linkWith = 'linkWith';
    series.current.dataFields.name = 'name';
    series.current.dataFields.id = 'sequence';
    series.current.dataFields.value = 'value';
    series.current.dataFields.color = 'color';
    series.current.dataFields.children = 'children';
    series.current.nodes.template.tooltipText = '{type} \n {name}';
    series.current.nodes.template.fillOpacity = 1;

    series.current.nodes.template.label.text = '{type}';
    series.current.fontSize = 5;
    //series.current.maxLevels = 2;
    series.current.maxRadius = am4core.percent(6);
    series.current.manyBodyStrength = -10;
    series.current.nodes.template.label.hideOversized = true;
    series.current.nodes.template.label.truncate = true;
    setSeriesReady(true);
    return () => chart.current && chart.current.dispose();
  }, []);
  useEffect(() => {
    if (seriesReady && value && series.current) {
      series.current.data = value;
    }
  }, [seriesReady, value]);

  return <div id={'vis-chart'} style={{ width: '100%', height: 500 }}></div>;
};

export default Visualize;
