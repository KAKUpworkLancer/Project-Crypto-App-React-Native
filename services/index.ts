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
          { symbol: 'MSFT', name: 'Microsoft Corporation', value: 312.45, color: 'green' },
          { symbol: 'NVDA', name: 'NVIDIA Corporation', value: 957.30, color: 'red' },
          { symbol: 'AAPL', name: 'Apple Inc', value: 189.12, color: 'green' },
          { symbol: 'AMZN', name: 'Amazon.com, Inc', value: 128.56, color: 'red' },
          { symbol: 'WMT', name: 'Walmart Inc', value: 62.74, color: 'green' },
          { symbol: 'JPM', name: 'JPMorgan Chase & Co', value: 148.03, color: 'green' },
          { symbol: 'PG', name: 'The Procter & Gamble Company', value: 152.90, color: 'red' },
          { symbol: 'HD', name: 'The Home Depot, Inc', value: 296.22, color: 'red' },
          { symbol: 'JNJ', name: 'Johnson & Johnson', value: 161.39, color: 'green' },
          { symbol: 'KO', name: 'The Coca-Cola Company', value: 58.27, color: 'red' },
          { symbol: 'CRM', name: 'Salesforce, Inc', value: 265.84, color: 'green' },
          { symbol: 'UNH', name: 'UnitedHealth Group Incorporated', value: 514.76, color: 'green' },
          { symbol: 'CSCO', name: 'Cisco Systems, Inc', value: 48.93, color: 'red' },
          { symbol: 'IBM', name: 'International Business Machine', value: 168.50, color: 'green' },
          { symbol: 'MCD', name: 'McDonald\'s Corporation', value: 282.10, color: 'red' },
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
