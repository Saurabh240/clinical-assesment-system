import express from "express";
import puppeteer from "puppeteer";

const app = express();
app.use(express.json({ limit: "10mb" }));

app.post("/generate-pdf", async (req, res) => {
  const { html } = req.body;

  try {
    const browser = await puppeteer.launch({
      executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
      headless: "new",
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu"
      ]
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true
    });

    await browser.close();

    res.type("application/pdf").send(pdf);

  } catch (err) {
    console.error("PDF ERROR:", err);
    res.status(500).json({ error: "PDF generation failed" });
  }
});

app.listen(3001, "0.0.0.0", () => {
  console.log("PDF service running on port 3001");
});
