import installer, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';

export default () => {
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = [REACT_DEVELOPER_TOOLS];

  installer(extensions, { forceDownload }).catch((err) => {
    console.log(`扩展安装错误: ${err}`);
  });
};
