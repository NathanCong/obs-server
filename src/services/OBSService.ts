import fs from 'fs';
import { join } from 'path';
import { v4 as createUuid } from 'uuid';
import Database from '@/utils/Database';
import dayjs from 'dayjs';

export interface UploadFile {
  filepath: string;
  originalFilename: string;
  size: number;
  hash: string;
}

export default class OBSService {
  /**
   * 内部方法：保存文件
   */
  private static async saveFile(tempPath: string, savePath: string, fileFullName: string) {
    try {
      // 递归创建目录（如果不存在）
      await fs.promises.mkdir(savePath, { recursive: true });
      // 写入文件
      await fs.promises.copyFile(tempPath, `${savePath}/${fileFullName}`);
    } catch (error) {
      throw error;
    }
  }
  /**
   * 公共方法：上传文件
   */
  static async upload(savePath: string, file: UploadFile) {
    const { filepath: tempPath, originalFilename, size, hash } = file;
    const { VOLUME_OBS_PATH = '', OBS_PROTOCOL, OBS_HOST, OBS_PORT } = process.env;
    // 获取文件名称和类型
    const [fileName, fileType] = originalFilename.split('.');
    // 生成新的文件名
    const newFileName = createUuid();
    // 生成文件存储路径
    const newSavePath = join(process.cwd(), VOLUME_OBS_PATH, savePath);
    try {
      // 保存文件
      await this.saveFile(tempPath, newSavePath, `${newFileName}.${fileType}`);
      // 插入记录
      const baseUrl = `${OBS_PROTOCOL}://${OBS_HOST}:${OBS_PORT}`;
      const accessUrl = new URL(join(savePath, `${newFileName}.${fileType}`), baseUrl).href;
      const creator = 'System';
      const createTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
      const { rowCount } = await Database.query({
        sql: `INSERT INTO resource_storage (resource_id, resource_name, resource_type, resource_size, resource_hash, resource_path, resource_url, creator, created_at)
              VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        values: [
          newFileName,
          fileName,
          fileType,
          size,
          hash,
          savePath,
          accessUrl,
          creator,
          createTime,
        ],
      });
      // 插入失败，退出
      if (Number(rowCount) < 1) {
        throw new Error('上传失败');
      }
      // 插入成功，返回结果
      return {
        resourceId: newFileName,
        resourceName: fileName,
        resourceType: fileType,
        resourceSize: size,
        resourceHash: hash,
        resourceUrl: accessUrl,
        creator,
        createTime,
      };
    } catch (error) {
      throw error;
    }
  }
}
