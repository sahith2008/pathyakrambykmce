import { Router } from 'express';
import { query, isConnected } from '../config/db.js';

export const notificationsRouter = Router();

let memoryNotifications: any[] = [
  {
    id: 'notif-1',
    title: 'JNTUH R25 Mid-1 Question Papers Released',
    message: 'Mid-1 question papers for CSE, CSM, and ECE branches have been uploaded to the Pathyakram portal with answer keys.',
    category: 'exam',
    priority: 'urgent',
    timestamp: '10 mins ago',
    read: false,
    targetBranch: 'ALL',
  },
  {
    id: 'notif-2',
    title: 'Attendance Warning - Condonation Threshold',
    message: 'Students whose cumulative attendance is below 75% must meet their respective departmental mentors before Friday.',
    category: 'attendance',
    priority: 'high',
    timestamp: '2 hours ago',
    read: false,
    targetBranch: 'ALL',
  },
];

// GET /api/notifications
notificationsRouter.get('/', async (req, res) => {
  try {
    if (isConnected()) {
      const result = await query('SELECT * FROM notifications ORDER BY created_at DESC');
      const formatted = result.rows.map((r) => ({
        id: r.id,
        title: r.title,
        message: r.message,
        category: r.category,
        priority: r.priority,
        timestamp: r.timestamp_text,
        read: r.read,
        targetBranch: r.target_branch,
      }));
      return res.json({ notifications: formatted, source: 'postgresql' });
    }
    res.json({ notifications: memoryNotifications, source: 'memory_fallback' });
  } catch (err) {
    res.json({ notifications: memoryNotifications, source: 'fallback_error' });
  }
});

// POST /api/notifications
notificationsRouter.post('/', async (req, res) => {
  const notif = req.body;
  if (!notif.title || !notif.message) {
    return res.status(400).json({ error: 'Missing title or message' });
  }

  const newNotif = {
    ...notif,
    id: `notif-${Date.now()}`,
    timestamp: 'Just now',
    read: false,
    priority: notif.priority || 'high',
    category: notif.category || 'general',
    targetBranch: notif.targetBranch || 'ALL',
  };

  try {
    if (isConnected()) {
      await query(
        `INSERT INTO notifications (id, title, message, category, priority, timestamp_text, read, target_branch)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [
          newNotif.id,
          newNotif.title,
          newNotif.message,
          newNotif.category,
          newNotif.priority,
          newNotif.timestamp,
          newNotif.read,
          newNotif.targetBranch,
        ]
      );
    }
  } catch (err) {
    console.warn('Database insert warning for notifications:', err);
  }

  memoryNotifications.unshift(newNotif);
  res.json({ success: true, notification: newNotif });
});
