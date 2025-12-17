import ResourceStorageTable from './ResourceStorageTable';
import type { DatabaseTable } from '@/utils/Database';

const DATABASE_TABLES: Array<DatabaseTable> = [
  {
    tableName: ResourceStorageTable.name,
    tableColumns: ResourceStorageTable.columns,
    tableValues: ResourceStorageTable.values,
  },
];

export default DATABASE_TABLES;
