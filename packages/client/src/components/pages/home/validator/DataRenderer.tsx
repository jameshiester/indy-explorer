import React, { forwardRef, useImperativeHandle, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { ICellRendererParams } from 'ag-grid-community';
import { SET_SELECTED_NODE } from '@store/node/types';
import DataButton from '@shared/button/DataButton';

const DialogRenderer = forwardRef<
  React.RefAttributes<HTMLDivElement>,
  ICellRendererParams
>(({ data }, ref) => {
  const dispatch = useDispatch();
  const handleClick = useCallback(() => {
    dispatch({ type: SET_SELECTED_NODE, value: data.name });
  }, [dispatch, data]);

  useImperativeHandle(ref, () => {
    return {};
  });

  return <DataButton handleClick={handleClick} />;
});

DialogRenderer.displayName = 'DataDialog';

export default DialogRenderer;
