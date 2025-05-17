import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useGetAllCryptoQuery = () => {
  return useQuery({
    queryKey: ['crypto'],
    queryFn: () => {
      const data = axios.get(`https://api.binance.com/api/v3/klines`, {
        params: {
          symbol: 'BTCUSDT',
          interval: '1h',
        },
      })
      return data;
    },
  });
};

export const useGetByNameCryptoQuery = (name: string) => {
  return useQuery({
    queryKey: ['crypto', name],
    queryFn: () => {
      const data = axios.get(`https://api.binance.com/api/v3/klines/${name}`, {
        params: {
          symbol: 'BTCUSDT',
          interval: '1h',
        },
      })
      return data;
    },
  });
};
