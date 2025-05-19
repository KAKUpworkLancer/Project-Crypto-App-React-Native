import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useGetAllCryptoQuery = () => {
  return useQuery({
    queryKey: ['crypto'],
    queryFn: () => {
      /*
      const data = axios.get(`https://api.binance.com/api/v3/exchangeInfo`, {
        params: {
        },
      })
      */
      const data = {
        data: [
          { symbol: 'MSFT', name: 'Microsoft Corporation' },
          { symbol: 'NVDA', name: 'NVIDIA Corporation' },
          { symbol: 'AAPL', name: 'Apple Inc,' },
          { symbol: 'AMZN', name: 'Amazon.com, Inc' },
          { symbol: 'WMT', name: 'Walmart Inc' },
          { symbol: 'JPM', name: 'JPMorgan Chase & Co' },
          { symbol: 'PG', name: 'The Procter & Gamble Company' },
          { symbol: 'HD', name: 'The Home Depot, Inc' },
          { symbol: 'JNJ', name: 'Johnson & Johnson' },
          { symbol: 'KO', name: 'The Coca-Cola Company' },
          { symbol: 'CRM', name: 'Salesforce, Inc' },
          { symbol: 'UNH', name: 'UnitedHealth Group Incorporated' },
          { symbol: 'CSCO', name: 'Cisco Systems, Inc' },
          { symbol: 'IBM', name: 'International Business Machine' },
          { symbol: 'MCD', name: ' McDonald\'s Corporation' },
        ],
      };
      return data;
    },
  });
};

export const useGetBySymbolCryptoQuery = (symbol: string) => {
  return useQuery({
    queryKey: ['crypto', symbol],
    refetchInterval: 10000,
    refetchOnWindowFocus: true,
    queryFn: async () => {
      /*
      const data = axios.get(`https://api.binance.com/api/v3/klines/${symbol}`, {
        params: {
          symbol: 'BTCUSDT',
          interval: '1h',
        },
      })
      */
      const data = await axios.get(`https://www.alphavantage.co/query`, {
        params: {
          function: 'TIME_SERIES_INTRADAY',
          symbol: symbol,
          interval: '60min',
          outputsize: 'compact',
          apikey: process.env.EXPO_PUBLIC_ALPHA_VANTAGE_API_KEY,
        },
      })
      return data;
    },
  });
};
