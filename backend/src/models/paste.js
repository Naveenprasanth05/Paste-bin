const mongoose = require('mongoose');

const PasteSchema = new mongoose.Schema({
  content: { type: String, required: true },
  expiresAt: Date,
  maxViews: Number
});

const Paste = mongoose.model("Paste", PasteSchema);
module.exports = Paste;  // <-- CommonJS export
