import { useState, useEffect, useRef } from 'react';
import { get } from 'lodash';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { nodesSelector } from '@store/node/selector';

export const useNodeStatus = () => {
  const nodes = useSelector(nodesSelector);
  const nodesCache = useRef<Record<string, { active: boolean }>>();
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    if (nodes) {
      nodes.forEach((node) => {
        const cache = get(nodesCache.current, node.name);
        if (cache && cache.active !== node.active) {
          enqueueSnackbar(
            `Node Status: ${node.name} ${
              node.active ? 'back online' : 'is offline'
            }`,
            { variant: node.active ? 'success' : 'error' }
          );
        }
      });

      nodesCache.current = nodes.reduce((acc, node) => {
        return { ...acc, [node.name]: { active: node.active } };
      }, {} as any);
    }
  }, [nodes]);
};
