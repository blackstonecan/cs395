const { WebSocketServer } = require("ws");

const { getDynamicSysInfo, getStaticSysInfo } = require("../helpers");

const getWss = (server) => {
  const wss = new WebSocketServer({ server });
  return wss;
};

const wssOn = (ws) => {
  console.log("Client connected");
  (async () => {
    const staticSysInfo = await getStaticSysInfo();
    ws.send(JSON.stringify(["static", staticSysInfo]));

    const stats = await getDynamicSysInfo();
    ws.send(JSON.stringify(["stats", stats]));
  })();

  setInterval(async () => {
    const stats = await getDynamicSysInfo();
    ws.send(JSON.stringify(["stats", stats]));
  }, 10000);

  ws.on("close", () => {
    console.log("Client disconnected");
  });
};

module.exports = {
  getWss,
  wssOn,
};
