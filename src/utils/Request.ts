/**
 * 处理 Request 工具类
 */
export default class Request {
  /**
   * 检查请求参数
   */
  static checkRequestParams(requestParams: Record<string, unknown>, requiredParams: string[]) {
    for (const key of requiredParams) {
      if (!requestParams[key]) {
        return { success: false, message: `缺少 ${key} 请求参数` };
      }
    }
    return { success: true, message: '不缺少请求参数' };
  }
}
