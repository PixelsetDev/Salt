import React from 'react';
import { View, Text } from 'react-native';
import { OText } from './Overrides.tsx';

type TableProps = {
  headers: string[];
  children: React.ReactNode;
};

type RowProps = {
  cells: string[];
};

export const Table = ({ headers, children }: TableProps) => (
  <View className="border border-neutral-800 dark:border-neutral-200 rounded-md overflow-hidden my-2">
    <View className="flex-row bg-muted">
      {headers.map((h, i) => (
        <View
          key={i}
          className={`flex-1 ${i < headers.length - 1 ? 'border-r border-neutral-500' : ''}`}
        >
          <Text className="txt-xl font-semibold text-white dark:text-black bg-neutral-800 p-2 dark:bg-neutral-200">{h}</Text>
        </View>
      ))}
    </View>
    {children}
  </View>
);

export const Row = ({ cells }: RowProps) => (
  <View className="flex-row border-t border-neutral-800 dark:border-neutral-200">
    {cells.map((cell, i) => (
      <View
        key={i}
        className={`flex-1 p-2 ${i < cells.length - 1 ? 'border-r border-neutral-800 dark:border-neutral-200' : ''}`}
      >
        <OText>{cell}</OText>
      </View>
    ))}
  </View>
);