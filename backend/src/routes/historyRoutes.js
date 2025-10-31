import { Router } from "express";
import auth from "../middleware/auth.js";
import Conversation from "../models/Conversation.js";

const router = Router();

// Get all conversations for authenticated user
router.get("/conversations", auth, async (req, res) => {
  try {
    const conversations = await Conversation.find({ userId: req.userId }).sort({ updatedAt: -1 });
    res.json({ conversations });
  } catch (err) {
    console.error("historyRoutes get error:", err);
    res.status(500).json({ error: "Failed to fetch conversations" });
  }
});

// Create a new conversation
router.post("/conversations", auth, async (req, res) => {
  try {
    const { title, messages } = req.body;
    const conv = new Conversation({ userId: req.userId, title, messages });
    await conv.save();
    res.json({ conversation: conv });
  } catch (err) {
    console.error("historyRoutes create error:", err);
    res.status(500).json({ error: "Failed to create conversation" });
  }
});

// Update conversation by id
router.put("/conversations/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, messages } = req.body;
    const conv = await Conversation.findOneAndUpdate(
      { _id: id, userId: req.userId },
      { title, messages, updatedAt: new Date() },
      { new: true }
    );
    if (!conv) return res.status(404).json({ error: "Conversation not found" });
    res.json({ conversation: conv });
  } catch (err) {
    console.error("historyRoutes update error:", err);
    res.status(500).json({ error: "Failed to update conversation" });
  }
});

// Delete conversation
router.delete("/conversations/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Conversation.findOneAndDelete({ _id: id, userId: req.userId });
    if (!result) return res.status(404).json({ error: "Conversation not found" });
    res.json({ success: true });
  } catch (err) {
    console.error("historyRoutes delete error:", err);
    res.status(500).json({ error: "Failed to delete conversation" });
  }
});

export default router;
