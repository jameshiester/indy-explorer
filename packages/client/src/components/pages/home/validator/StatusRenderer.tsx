import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import Button from '@material-ui/core/Button';
import DataIcon from '@material-ui/icons/FindInPageOutlined';
import Dialog from './Dialog';
import IconButton from '@material-ui/core/IconButton';
import { ICellRendererParams } from 'ag-grid-community';
import { Badge, useTheme } from '@material-ui/core';

const StatusRenderer = forwardRef(({ value }: ICellRendererParams, ref) => {
  const theme = useTheme();
  useImperativeHandle(ref, () => {
    return {};
  });

  return (
    <div
      style={{ display: 'flex', alignContent: 'center', alignItems: 'center' }}
    >
      <div
        style={{
          width: 10,
          display: 'inline',
          borderRadius: '50%',
          backgroundColor: value
            ? theme.palette.success.main
            : theme.palette.error.main,
          height: 10,
          marginRight: 8,
          marginBottom: 1,
        }}
      />
      <span>{value ? 'Online' : 'Offline'}</span>
    </div>
  );
});

StatusRenderer.displayName = 'StatusRenderer';

export default StatusRenderer;
