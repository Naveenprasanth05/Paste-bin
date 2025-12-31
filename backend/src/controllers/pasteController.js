import Paste from "../models/paste.js";
import {now} from "../utils/time.js"

// CREATE PASTE
export const CreatePaste = async (req, res) => {
  try {
    const { content, ttl_seconds, maxviews } = req.body;

    if (!content) {
      return res.status(400).json({ error: "Invalid content" });
    }

    if (ttl_seconds && ttl_seconds < 1) {
      return res.status(400).json({ error: "Invalid expiry time" });
    }

    if (maxviews && maxviews < 1) {
      return res.status(400).json({ error: "Max views cannot be zero or negative" });
    }

    const expiresAt = ttl_seconds
      ? new Date(Date.now() + ttl_seconds * 1000)
      : null;

    const paste = await Paste.create({
      content,
      expiresAt,
      maxViews: maxviews ?? null
    });

    return res.status(201).json({
      id: paste._id,
      message: "Paste created successfully"
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// VIEW PASTE
export const ViewPaste = async (req, res) => {
  try {
    const { id } = req.params;

    const paste = await Paste.findById(id);
    if (!paste) {
      return res.status(404).json({ message: "Paste not found" });
    }

    const currentTime = now(req);;

    if (
      (paste.expiresAt && currentTime > paste.expiresAt) ||
      (paste.maxViews !== null && paste.maxViews <= 0)
    ) {
      return res.status(404).json({ message: "Paste expired" });
    }

    // decrease view count
    if (paste.maxViews !== null) {
      paste.maxViews -= 1;
      await paste.save();
    }

    return res.json({
      content: paste.content,
      message: "Paste fetched successfully"
    });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};
