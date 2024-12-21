const si = require("systeminformation");

// Cache variables
let staticCache = null; // Holds getStaticSysInfo() result
let dynamicCache = null; // Holds getDynamicSysInfo() result
let dynamicLastFetch = 0; // Timestamp of last dynamic fetch
const DYNAMIC_CACHE_TTL = 3000; // 3 seconds

const getStaticSysInfo = async () => {
  if (staticCache) {
    return staticCache;
  }
  // Otherwise, fetch from systeminformation once
  const [
    osInfo,
    cpu,
    cpuCache,
    cpuCurrentSpeed,
    memLayout,
    diskLayout,
    blockDevices,
    networkInterfaces,
    graphics,
    bluetoothDevices,
    audio,
    chassis,
  ] = await Promise.all([
    si.osInfo(),
    si.cpu(),
    si.cpuCache(),
    si.cpuCurrentSpeed(),
    si.memLayout(),
    si.diskLayout(),
    si.blockDevices(),
    si.networkInterfaces(),
    si.graphics(),
    si.bluetoothDevices(),
    si.audio(),
    si.chassis(),
  ]);

  // Store result in staticCache (never expires)
  staticCache = {
    osInfo,
    cpu,
    cpuCache,
    cpuCurrentSpeed,
    memLayout,
    diskLayout,
    blockDevices,
    networkInterfaces,
    graphics,
    bluetoothDevices,
    audio,
    chassis,
  };
  return staticCache;
};

const getDynamicSysInfo = async () => {
  const now = Date.now();

  // Check if we have valid cache and if it's still fresh
  if (dynamicCache && now - dynamicLastFetch < DYNAMIC_CACHE_TTL) {
    // Return the cached data if within TTL

    return dynamicCache;
  }

  // Otherwise, fetch new data
  const [  
    currentLoad,
    fullLoad,
    mem,
    fsSize,
    networkStats,
    wifiNetworks,
    battery,
    users,
  ] = await Promise.all([
    si.currentLoad(),
    si.fullLoad(),
    si.mem(),
    si.fsSize(),
    si.networkStats(),
    si.wifiNetworks(),
    si.battery(),
    si.users(),
  ]);

  // Store in dynamicCache
  dynamicCache = {
    currentLoad,
    fullLoad,
    mem,
    fsSize,
    networkStats,
    wifiNetworks,
    battery,
    users,
  };

  // Record the last fetch time
  dynamicLastFetch = now;

  return dynamicCache;
};

module.exports = {
  getStaticSysInfo,
  getDynamicSysInfo,
};
