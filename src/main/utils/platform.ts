function usePlatform() {
  const { platform } = process;

  if (platform === 'darwin') {
    console.log('这是mac系统');
  }
  if (platform === 'win32') {
    console.log('这是windows系统');
  }
  if (platform === 'linux') {
    console.log('这是linux系统');
  }
}
