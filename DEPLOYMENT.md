# 🚀 DEPLOYMENT GUIDE - Production Ready

Complete guide for deploying Yansi.IO to production.

---

## 📋 Pre-Deployment Checklist

- [ ] Environment variables configured (.env.local)
- [ ] `npm run build` succeeds without errors
- [ ] `npm run lint` passes
- [ ] `npm run typecheck` passes
- [ ] All tests pass
- [ ] Git repo clean (no uncommitted changes)
- [ ] Domain registered and DNS configured
- [ ] SSL certificate ready (auto with Vercel)
- [ ] Telegram bot created and token saved
- [ ] Analytics IDs configured (optional)

---

## 🟦 Vercel Deployment (RECOMMENDED)

### Option 1: Git Integration (Easiest)

**Steps:**

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to https://vercel.com
   - Click "Add New..." → "Project"
   - Select your GitHub repository
   - Click "Import"

3. **Configure Environment Variables**
   - In Vercel dashboard: Settings → Environment Variables
   - Add variables:
     ```
     TELEGRAM_BOT_TOKEN = your_token
     TELEGRAM_CHAT_ID = your_chat_id
     NEXT_PUBLIC_SITE_URL = https://your-domain.com
     RATE_LIMIT_REQUESTS = 3
     RATE_LIMIT_WINDOW_MS = 3600000
     LOG_LEVEL = info
     ```

4. **Configure Domain**
   - Settings → Domains
   - Add your domain
   - Update DNS at registrar

5. **Deploy**
   - Push to main → Auto-deploys
   - Or click "Deploy" manually

### Option 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod

# Set environment variables
vercel env add TELEGRAM_BOT_TOKEN
vercel env add TELEGRAM_CHAT_ID
vercel env add NEXT_PUBLIC_SITE_URL
```

### Vercel Features
- ✅ Auto SSL certificates
- ✅ Global CDN (50+ regions)
- ✅ Automatic scaling
- ✅ Git integration
- ✅ Preview deployments
- ✅ Analytics included
- ✅ Edge functions support
- ✅ Serverless functions

---

## 🐳 Docker Deployment

### Build Docker Image

```bash
# Create Dockerfile
cat > Dockerfile << 'EOF'
FROM node:20-alpine

WORKDIR /app

# Copy files
COPY package*.json ./
COPY . .

# Install dependencies
RUN npm ci

# Build
RUN npm run build

# Expose port
EXPOSE 3000

# Start
CMD ["npm", "start"]
EOF

# Build image
docker build -t yansi-io:latest .

# Run container
docker run -p 3000:3000 \
  -e TELEGRAM_BOT_TOKEN=your_token \
  -e TELEGRAM_CHAT_ID=your_chat_id \
  -e NEXT_PUBLIC_SITE_URL=https://your-domain.com \
  yansi-io:latest
```

### Docker Compose

```yaml
# docker-compose.yml
version: '3.9'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - TELEGRAM_BOT_TOKEN=${TELEGRAM_BOT_TOKEN}
      - TELEGRAM_CHAT_ID=${TELEGRAM_CHAT_ID}
      - NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL}
      - NODE_ENV=production
    restart: always

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - app
```

---

## 🔗 Self-Hosted Deployment

### Prerequisites
- Server with Node.js 18+ (Ubuntu 20.04+ recommended)
- Nginx or Apache
- PM2 or systemd
- SSL certificate (Let's Encrypt recommended)

### Step 1: Prepare Server

```bash
# SSH into server
ssh user@your-server.com

# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2 (process manager)
sudo npm install -g pm2
```

### Step 2: Clone & Setup

```bash
# Clone repository
git clone https://github.com/yansi-io/yansi-nextjs.git
cd yansi-nextjs

# Install dependencies
npm ci

# Setup environment
cp .env.example .env.local
# Edit .env.local with actual values
nano .env.local

# Build
npm run build
```

### Step 3: Configure PM2

```bash
# Create PM2 config
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'yansi-io',
    script: './node_modules/.bin/next',
    args: 'start',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    restart_delay: 4000,
    watch: false,
    ignore_watch: ['node_modules', '.next', 'logs']
  }]
};
EOF

# Create logs directory
mkdir -p logs

# Start with PM2
pm2 start ecosystem.config.js

# Save PM2 to startup
pm2 startup
pm2 save
```

### Step 4: Configure Nginx

```nginx
# /etc/nginx/sites-available/yansi-io
upstream yansi_app {
    server 127.0.0.1:3000;
}

server {
    listen 80;
    server_name your-domain.com;
    
    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;

    # SSL Certificate (from Let's Encrypt)
    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
    
    # SSL Settings
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "DENY" always;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript;

    # Proxy to Node.js
    location / {
        proxy_pass http://yansi_app;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Cache static files
    location /_next/static {
        alias /home/user/yansi-nextjs/.next/static;
        expires 365d;
        add_header Cache-Control "public, immutable";
    }

    # Cache public files
    location /public {
        alias /home/user/yansi-nextjs/public;
        expires 30d;
        add_header Cache-Control "public, max-age=2592000";
    }
}
```

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/yansi-io /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Step 5: Setup SSL with Let's Encrypt

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Get certificate
sudo certbot certonly --nginx -d your-domain.com

# Auto-renewal (runs daily)
sudo certbot renew --dry-run
```

### Step 6: Monitoring & Logs

```bash
# PM2 monitoring
pm2 monit

# Check logs
pm2 logs yansi-io

# View file logs
tail -f logs/out.log
tail -f logs/err.log

# Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

---

## 📊 Post-Deployment Verification

### Health Checks

```bash
# 1. Check website loads
curl -I https://your-domain.com

# 2. Check API works
curl https://your-domain.com/api/contact -X GET

# 3. Check all languages
curl https://your-domain.com/en/services
curl https://your-domain.com/uk/services
curl https://your-domain.com/ru/services

# 4. Check sitemap
curl https://your-domain.com/sitemap.xml

# 5. Check robots.txt
curl https://your-domain.com/robots.txt
```

### Monitoring Setup

1. **Error Tracking:** Add Sentry
   ```bash
   npm install @sentry/nextjs
   ```

2. **Uptime Monitoring:** Use Uptime Robot
   - Create account at uptimerobot.com
   - Add monitor for https://your-domain.com
   - Set alert email

3. **Analytics:** Google Analytics
   - Add GA tracking ID to `.env.local`
   - Verify data in GA dashboard

4. **Performance:** Web Vitals
   - Vercel Analytics (auto with Vercel)
   - Google PageSpeed Insights

---

## 🔄 CI/CD Setup (GitHub Actions)

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - uses: actions/setup-node@v3
        with:
          node-version: 20
          cache: npm
      
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck
      - run: npm run build
      
      - uses: vercel/action@v4
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          prod: true
```

---

## 📱 Update & Maintenance

### Regular Tasks

**Weekly:**
- [ ] Check error logs
- [ ] Monitor uptime

**Monthly:**
- [ ] Review analytics
- [ ] Update dependencies: `npm update`
- [ ] Check security: `npm audit`

**Quarterly:**
- [ ] Full backup
- [ ] Performance review
- [ ] Security audit

### Update Next.js

```bash
# Check updates
npm outdated

# Update Next.js
npm update next

# Update all dependencies
npm update

# Install latest major version
npm install next@latest

# Test
npm run build
npm run lint
npm run typecheck

# Deploy
git add .
git commit -m "Update dependencies"
git push origin main
```

---

## 🔐 Security Checklist

- [ ] HTTPS enabled
- [ ] Security headers configured
- [ ] Rate limiting enabled
- [ ] CSRF protection active
- [ ] Honeypot filter on forms
- [ ] Input validation strict
- [ ] Environment variables encrypted
- [ ] Regular dependency audits
- [ ] Firewall configured
- [ ] Backups scheduled
- [ ] Monitoring enabled
- [ ] Logging active

---

## 📞 Support & Troubleshooting

### Common Issues

**Build fails:**
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Try building again
npm run build
```

**Telegram messages not sending:**
1. Check token in `.env.local`
2. Verify bot is member of chat/group
3. Check rate limiting isn't blocking
4. Review logs: `pm2 logs`

**High memory usage:**
```bash
# Check PM2 memory
pm2 monit

# Increase Node memory
NODE_OPTIONS="--max-old-space-size=2048" npm start
```

---

**Deployment Complete! 🎉**

Your site is now live in production. Monitor regularly and maintain security.

