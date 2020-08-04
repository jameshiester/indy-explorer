import axios from 'axios';
import { dateToString } from '@util/helper';

export const getHistory = async (name: string) => {
  try {
    const response = await axios.get(`/api/nodes/${name}/history`, {
      params: { since: Date.now() - 60 * 1000 * 60 * 24 * 30 },
    });
    return response.data.map(({ timestamp, active }: any) => ({
      date: dateToString(timestamp, 'yyyy-MM-dd HH:mm'),
      value: active,
    }));
  } catch (e) {}
};
