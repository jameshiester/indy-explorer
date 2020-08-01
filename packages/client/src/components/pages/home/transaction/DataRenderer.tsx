import React, { forwardRef, useImperativeHandle, useRef, memo } from 'react';
import Button from '@material-ui/core/Button';
import DataIcon from '@material-ui/icons/FindInPageOutlined';
import Dialog from './Dialog';
import IconButton from '@material-ui/core/IconButton';
import { ICellRendererParams } from 'ag-grid-community';

const InternalButton = memo(({ setOpen }: any) => {
  return (
    <IconButton onClick={setOpen}>
      <DataIcon />
    </IconButton>
  );
});

const DialogRenderer = forwardRef(({ data }: ICellRendererParams, ref) => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  useImperativeHandle(ref, () => {
    return {
      refresh() {
        return true;
      },
    };
  });

  const handleClose = (value: string) => {
    setOpen(false);
  };

  return (
    data && (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <InternalButton setOpen={handleClickOpen} />
        {open && <Dialog open={open} onClose={handleClose} data={data} />}
      </div>
    )
  );
});

DialogRenderer.displayName = 'DataDialog';

export default memo(DialogRenderer);
