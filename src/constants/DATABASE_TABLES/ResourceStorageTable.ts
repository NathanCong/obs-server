import type { DatabaseTableColumn } from '@/utils/Database';

/**
 * 资源存储表
 */
export default class ResourceStorageTable {
  /**
   * 表名
   */
  static readonly name = 'resource_storage';

  /**
   * 表结构
   */
  static readonly columns: DatabaseTableColumn[] = [
    {
      columnName: 'id',
      columnType: 'SERIAL',
      isPrimaryKey: true,
    },
    {
      columnName: 'resource_id',
      columnType: 'VARCHAR(40)',
      isUnique: true,
      isNotNull: true,
    },
    {
      columnName: 'resource_name',
      columnType: 'VARCHAR(100)',
      isNotNull: true,
    },
    {
      columnName: 'resource_type',
      columnType: 'VARCHAR(40)',
      isNotNull: true,
    },
    {
      columnName: 'resource_size',
      columnType: 'BIGINT',
      isNotNull: true,
    },
    {
      columnName: 'resource_hash',
      columnType: 'VARCHAR(40)',
      isNotNull: true,
    },
    {
      columnName: 'resource_path',
      columnType: 'VARCHAR(255)',
      isNotNull: true,
    },
    {
      columnName: 'resource_url',
      columnType: 'VARCHAR(512)',
      isNotNull: true,
    },
    {
      columnName: 'is_delete',
      columnType: 'BOOLEAN',
      isNotNull: true,
      defaultValue: 'false',
    },
    {
      columnName: 'is_access',
      columnType: 'BOOLEAN',
      isNotNull: true,
      defaultValue: 'true',
    },
    {
      columnName: 'creator',
      columnType: 'VARCHAR(100)',
      isNotNull: true,
    },
    {
      columnName: 'created_at',
      columnType: 'TIMESTAMP',
      isNotNull: true,
      defaultValue: 'CURRENT_TIMESTAMP',
    },
    {
      columnName: 'modifier',
      columnType: 'VARCHAR(100)',
    },
    {
      columnName: 'modified_at',
      columnType: 'TIMESTAMP',
    },
  ];

  /**
   * 表数据
   */
  static readonly values = [];
}
