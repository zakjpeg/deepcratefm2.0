import fs from "fs";

export default function logToFile(content: string, fileName: string = "app.log") {
    fs.appendFile(fileName, `[${new Date().toLocaleTimeString()}] ${content}\n`, (err) => {
        if (err) console.error('Failed to write log:', err);
    });
}