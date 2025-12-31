import prisma from '../db.js'
import { now } from '../utils/time.js'

export const CreatePaste = async (req, res) => {
    const { content, ttl_seconds, maxviews } = req.body;
    console.log(content, ttl_seconds, maxviews)
    if (!content) {
        return res.status(400).json({ error: "Invalid Content" })
    }

    if (ttl_seconds && ttl_seconds < 1) {
        return res.status(400).json({ error: "Invalid expiry time" })
    }
    if (maxviews && maxviews < 1) {
        return res.status(400).json({ error: "Max views cannot be zero and negative" })
    }
    const expiresAt =parseInt(ttl_seconds)
        ? new Date(Date.now() + ttl_seconds * 1000)
        : null;

    const paste = await prisma.paste.create({
        data: {
            content,
            expiresAt,
            maxViews: parseInt(maxviews) ?? null,
        },
    });

    return res.json({
        id:paste.id,
        message: "Paste created successfully"
    });

};

export const ViewPaste = async (req, res) => {
    const paste_id = req.params.id;
    const paste = await prisma.paste.findUnique({ where: { id: paste_id } });
    if (!paste) {
        return res.status(404).json({ message: "Paste not found" })
    }
    console.log("paste data",paste);
    const currentTime = now(req);

    if ((paste.expiresAt && currentTime > paste.expiresAt) || (paste.maxViews !== null && paste.maxViews < 1)) {
        
        return res.status(404).json({ message: "Paste expired" })
    }
    await prisma.paste.update({ where: { id: paste_id }, data: { maxViews: { decrement: 1 } } })
    return res.json({
        content: paste.content,
        message: "Paste fetched successfully"
    })
    
};
