// compress-electron.js
import { mkdir } from '@/main/utils/path';
import { nativeImage } from 'electron';
import fs from 'fs';
import path from 'path';

const imageCompress = (imagePath: string, quality: number) => {
  // eslint-disable-next-line no-param-reassign
  if (quality === undefined) quality = 50;
  // eslint-disable-next-line no-param-reassign
  quality = quality || 50;
  const image = nativeImage.createFromPath(imagePath);
  const res = image.resize({
    // 图片压缩质量，可选值：better || good || best
    quality: 'best',
  });
  console.log(res);
  // const imageData = res.toPNG()
  // jpg 压缩 图片质量设置
  return res.toJPEG(quality);
};

export default async (options: any) => {
  // 创建保存图片目录，失败的话退出
  const createDir = await mkdir(options.targetDir);
  if (!createDir)
    return {
      success: false,
      msg: '创建图片保存目录失败！',
    };

  try {
    options.fileList.forEath((item: any) => {
      const dirParse = path.parse(item);
      const data = imageCompress(item, options.quality);
      const targetDir = `${options.targetDir}${path.sep}${dirParse.name}${dirParse.ext}`;
      fs.writeFileSync(targetDir, data);
    });

    return {
      success: true,
      msg: `图片压缩成功，保存在 ${options.targetDir} 目录中`,
    };
  } catch (err) {
    console.log(err, 'err');
    return {
      success: false,
      msg: `图片压缩失败!`,
      reason: err,
    };
  }
};
