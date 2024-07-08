export const COMPRESS_TYPE = 'sharp:compress'
export enum COMPRESS_STATUS {
  WAITING = 'waiting',
  PROCESSING = 'processing',
  SUCCESS = 'success',
  FAIL = 'fail',
}
export interface CompressOptions {
  type: SharpSpace.DefaultImgType | 'self'
  quality: number
}
