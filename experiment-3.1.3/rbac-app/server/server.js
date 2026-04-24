const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const SECRET = 'rbacSecretKey456'; // use env variable in production

const ROLE_HIERARCHY = {
  user: 1,
  admin: 2,
};

const ROLE_PERMISSIONS = {
  user: ['view_profile'],
  admin: ['view_profile', 'manage_users', 'view_admin_dashboard'],
};

app.use(cors());
app.use(express.json());

// ── Simulated user database with roles ───────────────
const USERS = [
  { id: 1, username: 'admin', password: 'admin123', role: 'admin' },
  { id: 2, username: 'user',  password: 'user123',  role: 'user'  },
];

// ── JWT Middleware ─────────────────────────────────────
function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Missing token' });
  }

  try {
    req.user = jwt.verify(token, SECRET);
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

// ── Role-based authorization middleware ───────────────
function requireRole(...roles) {
  return (req, res, next) => {
    const userLevel = ROLE_HIERARCHY[req.user.role] || 0;
    const requiredLevel = Math.max(...roles.map((role) => ROLE_HIERARCHY[role] || 0));

    if (userLevel < requiredLevel) {
      return res.status(403).json({ error: 'Access denied: insufficient role' });
    }
    next();
  };
}

function requirePermission(permission) {
  return (req, res, next) => {
    const permissions = ROLE_PERMISSIONS[req.user.role] || [];
    if (!permissions.includes(permission)) {
      return res.status(403).json({ error: 'Access denied: insufficient permission' });
    }
    next();
  };
}

// ── POST /api/login ────────────────────────────────────
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = USERS.find(u => u.username === username && u.password === password);

  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    SECRET,
    { expiresIn: '1h' }
  );

  res.json({ token, role: user.role });
});

// ── GET /api/profile – accessible to all logged-in users ──
app.get('/api/profile', verifyToken, (req, res) => {
  res.json({
    message: `Hello ${req.user.username}`,
    role: req.user.role,
    permissions: ROLE_PERMISSIONS[req.user.role] || []
  });
});

// ── GET /api/admin – accessible to admin only ─────────
app.get('/api/admin', verifyToken, requireRole('admin'), requirePermission('manage_users'), (req, res) => {
  res.json({
    message: 'Admin Dashboard Data',
    users: USERS.map(u => ({ id: u.id, username: u.username, role: u.role }))
  });
});

app.listen(3001, () => console.log('RBAC Server on http://localhost:3001'));
