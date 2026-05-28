import express from "express";
import path from "path";
import fs from "fs";
import crypto from "crypto";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

const REGISTRATIONS_FILE = path.join(process.cwd(), "registrations.json");
const CONFIG_FILE = path.join(process.cwd(), "sms-config.json");

function getSMSConfig() {
  let config = {
    SMS_RECIPIENT_NUMBER: process.env.SMS_RECIPIENT_NUMBER || "010-8875-3274",
    SOLAPI_API_KEY: process.env.SOLAPI_API_KEY || "",
    SOLAPI_API_SECRET: process.env.SOLAPI_API_SECRET || "",
    SOLAPI_SENDER: process.env.SOLAPI_SENDER || "",
  };

  if (fs.existsSync(CONFIG_FILE)) {
    try {
      const data = JSON.parse(fs.readFileSync(CONFIG_FILE, "utf-8"));
      if (data.SMS_RECIPIENT_NUMBER) config.SMS_RECIPIENT_NUMBER = data.SMS_RECIPIENT_NUMBER;
      if (data.SOLAPI_API_KEY) config.SOLAPI_API_KEY = data.SOLAPI_API_KEY;
      if (data.SOLAPI_API_SECRET) config.SOLAPI_API_SECRET = data.SOLAPI_API_SECRET;
      if (data.SOLAPI_SENDER) config.SOLAPI_SENDER = data.SOLAPI_SENDER;
    } catch (e) {
      console.error("Error reading sms-config.json:", e);
    }
  }
  return config;
}

// E.164 conversion helper for Twilio (e.g. 010-8875-3274 -> +821088753274)
function formatToE164(phone: string): string {
  const digits = phone.replace(/[^0-9]/g, "");
  if (digits.startsWith("0")) {
    return "+82" + digits.slice(1);
  }
  if (digits.startsWith("82")) {
    return "+" + digits;
  }
  return "+" + digits;
}

// SMS Delivery Helper
async function sendSMSNotification({
  name,
  phone,
  size,
  notes,
}: {
  name: string;
  phone: string;
  size?: string;
  notes?: string;
}) {
  const config = getSMSConfig();
  const recipient = config.SMS_RECIPIENT_NUMBER || "010-8875-3274";
  const messageBody = `[한화포레나 인천학익]\n새로운 관심고객이 등록되었습니다.\n성함: ${name}\n연락처: ${phone}\n희망평형: ${size || "미선택"}\n문의사항: ${notes || "없음"}`;

  console.log(`[SMS Queue] Attempting to send notification to ${recipient}...`);

  // 1. Try Solapi (Coolsms) if configured
  if (
    config.SOLAPI_API_KEY &&
    config.SOLAPI_API_SECRET &&
    config.SOLAPI_SENDER
  ) {
    try {
      const apiKey = config.SOLAPI_API_KEY;
      const apiSecret = config.SOLAPI_API_SECRET;
      const sender = config.SOLAPI_SENDER;

      const date = new Date().toISOString();
      const salt = crypto.randomBytes(16).toString("hex");
      const hmac = crypto.createHmac("sha256", apiSecret);
      hmac.update(date + salt);
      const signature = hmac.digest("hex");
      const authorization = `HMAC-SHA256 apiKey=${apiKey}, date=${date}, salt=${salt}, signature=${signature}`;

      const cleanRecipient = recipient.replace(/[^0-9]/g, "");

      const response = await fetch("https://api.solapi.com/messages/v4/send", {
        method: "POST",
        headers: {
          Authorization: authorization,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: {
            to: cleanRecipient,
            from: sender.replace(/[^0-9]/g, ""),
            text: messageBody,
          },
        }),
      });

      if (response.ok) {
        console.log("[SMS Success] Sent successfully via Solapi!");
        return { success: true, provider: "solapi" };
      } else {
        const errorText = await response.text();
        console.error(`[SMS Error] Solapi failed: ${errorText}`);
      }
    } catch (err: any) {
      console.error("[SMS Error] Exception in Solapi sending:", err.message);
    }
  }

  // 2. Try Twilio if configured
  if (
    process.env.TWILIO_ACCOUNT_SID &&
    process.env.TWILIO_AUTH_TOKEN &&
    process.env.TWILIO_FROM_NUMBER
  ) {
    try {
      const accountSid = process.env.TWILIO_ACCOUNT_SID;
      const authToken = process.env.TWILIO_AUTH_TOKEN;
      const fromNumber = process.env.TWILIO_FROM_NUMBER;

      const twilioTo = formatToE164(recipient);
      const auth = Buffer.from(`${accountSid}:${authToken}`).toString("base64");

      const response = await fetch(
        `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
        {
          method: "POST",
          headers: {
            Authorization: `Basic ${auth}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            To: twilioTo,
            From: fromNumber,
            Body: messageBody,
          }),
        }
      );

      if (response.ok) {
        console.log("[SMS Success] Sent successfully via Twilio!");
        return { success: true, provider: "twilio" };
      } else {
        const errorText = await response.text();
        console.error(`[SMS Error] Twilio failed: ${errorText}`);
      }
    } catch (err: any) {
      console.error("[SMS Error] Exception in Twilio sending:", err.message);
    }
  }

  console.log(
    `[SMS Sandbox] No SMS keys configured. Logging registration content:\n---\n${messageBody}\n---`
  );
  return { success: false, provider: "none" };
}

// API Routes
app.post("/api/reservations", async (req, res) => {
  try {
    const { name, phone, size, notes, source } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ error: "Name and phone are required fields." });
    }

    const newRecord = {
      id: crypto.randomUUID(),
      name,
      phone,
      size: size || "",
      notes: notes || "",
      source: source || "UI Form",
      createdAt: new Date().toISOString(),
    };

    // Save locally
    let records: any[] = [];
    if (fs.existsSync(REGISTRATIONS_FILE)) {
      try {
        const fileContent = fs.readFileSync(REGISTRATIONS_FILE, "utf-8");
        records = JSON.parse(fileContent);
        if (!Array.isArray(records)) {
          records = [];
        }
      } catch (err) {
        console.error("Error reading registrations.json, resetting file:", err);
      }
    }

    records.push(newRecord);
    fs.writeFileSync(REGISTRATIONS_FILE, JSON.stringify(records, null, 2), "utf-8");

    // Send SMS
    const smsResult = await sendSMSNotification({
      name,
      phone,
      size,
      notes,
    });

    res.status(201).json({
      success: true,
      message: "관심고객 등록이 정상적으로 처리되었습니다.",
      record: newRecord,
      smsSent: smsResult.success,
      smsProvider: smsResult.provider,
    });
  } catch (err: any) {
    console.error("Server API error code:", err);
    res.status(500).json({ error: "서버 처리 중 오류가 발생했습니다." });
  }
});

// Helper to write base64 image data directly to BOTH source assets and compiled dist/assets (warm patch)
function writeToStaticAndBuild(fileNamePrefix: string, fileExtension: string, base64: string) {
  try {
    const base64Data = base64.replace(/^data:image\/\w+;base64,/, "");
    const binaryData = Buffer.from(base64Data, "base64");

    // 1) Write to source assets (permanent survival)
    const sourceDir = path.join(process.cwd(), "src/assets/images");
    if (fs.existsSync(sourceDir)) {
      const files = fs.readdirSync(sourceDir);
      const matchedSource = files.filter(f => f.startsWith(fileNamePrefix) && f.endsWith(fileExtension));
      matchedSource.forEach(file => {
        const targetPath = path.join(sourceDir, file);
        try {
          fs.writeFileSync(targetPath, binaryData);
          console.log(`[Warm-Patch] Wrote source asset: ${targetPath}`);
        } catch (e) {
          console.error(`[Warm-Patch] Failed to write source asset:`, e);
        }
      });
    }

    // 2) Write to compiled assets in dist (instant client update)
    const distAssetsDir = path.join(process.cwd(), "dist/assets");
    if (fs.existsSync(distAssetsDir)) {
      const files = fs.readdirSync(distAssetsDir);
      // Vite bundles name assets with a hash like filename-hash.extension
      const matchedFiles = files.filter(f => f.startsWith(fileNamePrefix) && f.endsWith(fileExtension));
      matchedFiles.forEach(file => {
        const targetPath = path.join(distAssetsDir, file);
        try {
          fs.writeFileSync(targetPath, binaryData);
          console.log(`[Warm-Patch] Overwrote bundled production asset: ${targetPath}`);
        } catch (e) {
          console.error(`[Warm-Patch] Failed to overwrite bundled production asset:`, e);
        }
      });
    }
  } catch (error) {
    console.error("[Warm-Patch] Unexpected error:", error);
  }
}

const MAP_DATA_FILE = path.join(process.cwd(), "map-image.json");
const COMMUNITY_DATA_FILE = path.join(process.cwd(), "community-image.json");
const GALLERY_DATA_FILE = path.join(process.cwd(), "gallery-images.json");

// GET current map image
app.get("/api/current-map", (req, res) => {
  try {
    if (fs.existsSync(MAP_DATA_FILE)) {
      const content = fs.readFileSync(MAP_DATA_FILE, "utf-8");
      return res.json({ success: true, base64: content });
    }
    return res.json({ success: true, base64: null });
  } catch (err) {
    res.status(500).json({ error: "Failed to get current map" });
  }
});

// GET current community image
app.get("/api/current-community", (req, res) => {
  try {
    if (fs.existsSync(COMMUNITY_DATA_FILE)) {
      const content = fs.readFileSync(COMMUNITY_DATA_FILE, "utf-8");
      return res.json({ success: true, base64: content });
    }
    return res.json({ success: true, base64: null });
  } catch (err) {
    res.status(500).json({ error: "Failed to get current community image" });
  }
});

// POST to update map image
app.post("/api/upload-map", (req, res) => {
  try {
    const { base64 } = req.body;
    if (!base64) {
      return res.status(400).json({ error: "Missing image data" });
    }
    // Save to server data file
    fs.writeFileSync(MAP_DATA_FILE, base64, "utf-8");

    // Warm-patch both src images and dist bundled output
    writeToStaticAndBuild("forena_actual_map_png_1779778690378", ".png", base64);
    writeToStaticAndBuild("forena_map_png_1779778008859", ".png", base64);

    res.json({ success: true, message: "Map image uploaded and updated successfully." });
  } catch (err) {
    console.error("Map upload error:", err);
    res.status(500).json({ error: "Failed to upload image" });
  }
});

// POST to update community image
app.post("/api/upload-community", (req, res) => {
  try {
    const { base64 } = req.body;
    if (!base64) {
      return res.status(400).json({ error: "Missing image data" });
    }
    // Save to server data file
    fs.writeFileSync(COMMUNITY_DATA_FILE, base64, "utf-8");

    // Warm-patch community images
    writeToStaticAndBuild("forena_community_1779788903164", ".png", base64);
    writeToStaticAndBuild("regenerated_image_1779789174361", ".jpg", base64);

    res.json({ success: true, message: "Community image uploaded and updated successfully." });
  } catch (err) {
    console.error("Community image upload error:", err);
    res.status(500).json({ error: "Failed to upload community image" });
  }
});

// GET current gallery images (custom uploaded images mapped by index)
app.get("/api/current-gallery", (req, res) => {
  try {
    if (fs.existsSync(GALLERY_DATA_FILE)) {
      const content = fs.readFileSync(GALLERY_DATA_FILE, "utf-8");
      return res.json({ success: true, data: JSON.parse(content) });
    }
    return res.json({ success: true, data: {} });
  } catch (err) {
    res.status(500).json({ error: "Failed to get gallery images" });
  }
});

// POST to update a gallery image by index
app.post("/api/upload-gallery", (req, res) => {
  try {
    const { index, base64 } = req.body;
    if (index === undefined || !base64) {
      return res.status(400).json({ error: "Missing index or image data" });
    }

    let galleryData: Record<number, string> = {};
    if (fs.existsSync(GALLERY_DATA_FILE)) {
      try {
        galleryData = JSON.parse(fs.readFileSync(GALLERY_DATA_FILE, "utf-8"));
      } catch (e) {
        galleryData = {};
      }
    }

    galleryData[index] = base64;
    fs.writeFileSync(GALLERY_DATA_FILE, JSON.stringify(galleryData, null, 2), "utf-8");

    res.json({ success: true, message: `Gallery image ${index} uploaded and updated successfully.` });
  } catch (err) {
    console.error("Gallery upload error:", err);
    res.status(500).json({ error: "Failed to upload gallery image" });
  }
});

// Admin dashboard route to fetch registrations
app.get("/api/reservations", (req, res) => {
  try {
    if (fs.existsSync(REGISTRATIONS_FILE)) {
      const fileContent = fs.readFileSync(REGISTRATIONS_FILE, "utf-8");
      const records = JSON.parse(fileContent);
      return res.json({ success: true, data: records });
    }
    return res.json({ success: true, data: [] });
  } catch (err) {
    res.status(500).json({ error: "Failed to load records." });
  }
});

// GET SMS Configuration (Masked)
app.get("/api/sms-config", (req, res) => {
  try {
    const config = getSMSConfig();
    res.json({
      success: true,
      data: {
        SMS_RECIPIENT_NUMBER: config.SMS_RECIPIENT_NUMBER,
        SOLAPI_API_KEY: config.SOLAPI_API_KEY ? `${config.SOLAPI_API_KEY.slice(0, 4)}***${config.SOLAPI_API_KEY.slice(-4)}` : "",
        SOLAPI_API_SECRET: config.SOLAPI_API_SECRET ? "********" : "",
        SOLAPI_SENDER: config.SOLAPI_SENDER
      }
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to get SMS config." });
  }
});

// POST SMS Configuration (Persist)
app.post("/api/sms-config", (req, res) => {
  try {
    const { SMS_RECIPIENT_NUMBER, SOLAPI_API_KEY, SOLAPI_API_SECRET, SOLAPI_SENDER } = req.body;
    
    let currentConfig = {
      SMS_RECIPIENT_NUMBER: "010-8875-3274",
      SOLAPI_API_KEY: "",
      SOLAPI_API_SECRET: "",
      SOLAPI_SENDER: ""
    };

    if (fs.existsSync(CONFIG_FILE)) {
      try {
        currentConfig = JSON.parse(fs.readFileSync(CONFIG_FILE, "utf-8"));
      } catch (e) {}
    }

    const updatedConfig = {
      ...currentConfig,
      SMS_RECIPIENT_NUMBER: SMS_RECIPIENT_NUMBER !== undefined ? SMS_RECIPIENT_NUMBER : currentConfig.SMS_RECIPIENT_NUMBER,
      SOLAPI_SENDER: SOLAPI_SENDER !== undefined ? SOLAPI_SENDER : currentConfig.SOLAPI_SENDER,
    };

    if (SOLAPI_API_KEY && !SOLAPI_API_KEY.includes("***")) {
      updatedConfig.SOLAPI_API_KEY = SOLAPI_API_KEY;
    }
    if (SOLAPI_API_SECRET && !SOLAPI_API_SECRET.includes("*") && SOLAPI_API_SECRET !== "********") {
      updatedConfig.SOLAPI_API_SECRET = SOLAPI_API_SECRET;
    }

    fs.writeFileSync(CONFIG_FILE, JSON.stringify(updatedConfig, null, 2), "utf-8");
    res.json({ success: true, message: "SMS 설정 저장 완료!" });
  } catch (err) {
    res.status(500).json({ error: "Failed to save SMS config." });
  }
});

// Vite middleware configuration for development, regular static files for production
async function setupVite() {
  const distPath = path.join(process.cwd(), "dist");

  if (process.env.NODE_ENV === "production") {
    console.log("[Server] Running in PRODUCTION mode. Serving compiled static files from dist...");
    app.use(express.static(distPath));
    app.get("*", (req, res, next) => {
      // Do not serve index.html fallback for missing static assets/files
      if (req.path.includes(".") || req.path.startsWith("/assets/")) {
        return next();
      }
      res.sendFile(path.join(distPath, "index.html"));
    });
  } else {
    console.log("[Vite] Running in DEVELOPMENT mode. Starting live Vite server middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
}

setupVite();
