import type { Context } from 'koa';
import OBSService from '@/services/OBSService';
import Response from '@/utils/Response';

export default class OBSController {
  /**
   * 资源上传
   */
  static async upload(ctx: Context) {
    try {
      await OBSService.upload();
      ctx.body = Response.formatSuccessResponse(null);
    } catch (error) {
      ctx.body = Response.formatFailureResponse(
        error instanceof Error ? error.message : '未知错误'
      );
    }
  }
}
