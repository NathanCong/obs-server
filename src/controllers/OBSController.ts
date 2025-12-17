import type { Context } from 'koa';
import type { UploadFile } from '@/services/OBSService';
import OBSService from '@/services/OBSService';
import Response from '@/utils/Response';

export default class OBSController {
  /**
   * 资源上传（multipart/form-data）
   */
  static async upload(ctx: Context) {
    const { body, files } = ctx.request;
    const { savePath = '' } = body as { savePath?: string };
    const file = files?.file as UploadFile | undefined;
    // 参数校验
    if (!file) {
      ctx.body = Response.formatFailureResponse('file 参数不能为空');
      return;
    }
    // 执行上传
    try {
      const result = await OBSService.upload(savePath, file);
      ctx.body = Response.formatSuccessResponse(result);
    } catch (error) {
      ctx.body = Response.formatFailureResponse(
        error instanceof Error ? error.message : '未知错误'
      );
    }
  }
}
