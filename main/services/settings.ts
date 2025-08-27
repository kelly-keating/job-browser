import { app, nativeTheme } from "electron";
import fs from "fs";
import path from "path";

const settingsPath = path.join(app.getPath("userData"), "settings.json");
const defaultSettings: Settings = {
  darkMode: nativeTheme.shouldUseDarkColors, // Default to system theme
};

export function getSettings(): Settings {
  try {
    const fileStr = fs.readFileSync(settingsPath, "utf-8");
    return JSON.parse(fileStr);
  } catch {
    writeSettings(defaultSettings); // Write default settings if file doesn't exist
    return defaultSettings;
  }
}

export function saveSettings(newSettings: Partial<Settings>) {
  const oldSettings = getSettings();
  const mergedSettings = { ...oldSettings, ...newSettings };
  writeSettings(mergedSettings);
}

function writeSettings(settings: Settings) {
  fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
}
