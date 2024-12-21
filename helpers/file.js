const fs = require("fs").promises;

const readJsonFile = async (filePath) => {
  try {
    const data = await fs.readFile(filePath, "utf8"); // Read file
    const jsonData = JSON.parse(data); // Parse JSON string
    return jsonData;
  } catch (err) {
    console.error("Error reading or parsing the file:", err);
  }
};

const writeJsonFile = async (filePath, content) => {
  try {
    const jsonData = JSON.stringify(content, null, 2); // Convert object to JSON string
    await fs.writeFile(filePath, jsonData, "utf8"); // Write to file
  } catch (err) {
    console.error("Error writing to the file:", err);
  }
};

module.exports = { readJsonFile, writeJsonFile };