function getCurrentPlatform() {
  if (process.platform === "darwin") {
    console.log("这是mac系统");
  }
  if (process.platform === "win32") {
    console.log("这是windows系统");
  }
  if (process.platform === "linux") {
    console.log("这是linux系统");
  }
}
