// 弹窗form的类型
import type { FormTypeConfig } from './formType';
import type { ResponseType } from './tableType';

// 定义 API 函数的基本约束
export type ApiFunction<TParams extends Record<string, unknown> = Record<string, unknown>, TResponse = unknown> =
    (_params: TParams) => Promise<ResponseType<TResponse>> | ResponseType<TResponse>;

export type PupUpFormBoxConfig<TParams extends Record<string, unknown> = Record<string, unknown>, TResponse = unknown> = {
    title?: string;
    width?: string;
    api: ApiFunction<TParams, TResponse>;
    beforeRequest?: ((_data: TParams) => Promise<TParams | false>) | ((_data: TParams) => TParams | false)
    afterResponse?: (_data: ResponseType<TResponse>) => Promise<AfterResponseReturnType> | AfterResponseReturnType
    props?: Record<string, unknown>
} & FormTypeConfig;

export type msgType = 'success' | 'error' | 'warning';

type AfterResponseReturnType = {
    isMsg: false
} | {
    isMsg: true,
    msg: string,
    type: msgType
};
