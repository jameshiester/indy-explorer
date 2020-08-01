import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import Button from '@material-ui/core/Button';
import DataIcon from '@material-ui/icons/FindInPageOutlined';
import Dialog from './Dialog';
import IconButton from '@material-ui/core/IconButton';
import { ICellRendererParams } from 'ag-grid-community';

const DialogRenderer = forwardRef(({ data }: ICellRendererParams, ref) => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  useImperativeHandle(ref, () => {
    return {};
  });

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <IconButton onClick={handleClickOpen}>
        <DataIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose} data={data} />
    </div>
  );
});

DialogRenderer.displayName = 'DataDialog';

export default DialogRenderer;
