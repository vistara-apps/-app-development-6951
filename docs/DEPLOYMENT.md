# VideoCraft Pro Deployment Guide

This guide covers deploying VideoCraft Pro to production environments.

## 🚀 Quick Deploy Options

### Vercel (Recommended)

Vercel provides the easiest deployment experience for React applications.

1. **Connect Repository**
   ```bash
   # Push your code to GitHub
   git push origin main
   ```

2. **Deploy to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Configure environment variables
   - Deploy automatically

3. **Environment Variables**
   Add these in Vercel dashboard:
   ```env
   VITE_OPENAI_API_KEY=sk-your-openai-key
   VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your-stripe-key
   VITE_PINATA_API_KEY=your-pinata-key
   VITE_PINATA_SECRET_KEY=your-pinata-secret
   VITE_API_BASE_URL=https://your-api.vercel.app/api
   ```

### Netlify

1. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `dist`

2. **Environment Variables**
   Configure in Netlify dashboard under Site Settings > Environment Variables

3. **Deploy**
   ```bash
   npm run build
   netlify deploy --prod --dir=dist
   ```

## 🐳 Docker Deployment

### Dockerfile

The project includes a production-ready Dockerfile:

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Build and Run

```bash
# Build the image
docker build -t videocraft-pro .

# Run the container
docker run -p 3000:80 videocraft-pro
```

### Docker Compose

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:80"
    environment:
      - VITE_OPENAI_API_KEY=${OPENAI_API_KEY}
      - VITE_STRIPE_PUBLISHABLE_KEY=${STRIPE_PUBLISHABLE_KEY}
    restart: unless-stopped
```

## ☁️ AWS Deployment

### S3 + CloudFront

1. **Build the Application**
   ```bash
   npm run build
   ```

2. **Upload to S3**
   ```bash
   aws s3 sync dist/ s3://your-bucket-name --delete
   ```

3. **Configure CloudFront**
   - Create distribution pointing to S3 bucket
   - Set default root object to `index.html`
   - Configure error pages for SPA routing

4. **Environment Variables**
   Set environment variables in your CI/CD pipeline before building.

### Elastic Beanstalk

1. **Prepare Application**
   ```bash
   npm run build
   zip -r videocraft-pro.zip dist/
   ```

2. **Deploy**
   - Upload zip file to Elastic Beanstalk
   - Configure environment variables
   - Deploy to production

## 🔧 Environment Configuration

### Production Environment Variables

```env
# API Configuration
VITE_API_BASE_URL=https://api.videocraft.pro
VITE_APP_URL=https://videocraft.pro

# OpenAI Configuration
VITE_OPENAI_API_KEY=sk-your-production-key

# Stripe Configuration
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your-stripe-key

# Storage Configuration
VITE_PINATA_API_KEY=your-pinata-key
VITE_PINATA_SECRET_KEY=your-pinata-secret

# Analytics (optional)
VITE_GA_TRACKING_ID=GA-XXXXXXXXX
VITE_HOTJAR_ID=your-hotjar-id

# Feature Flags
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_ERROR_REPORTING=true
```

### Security Configuration

```env
# Security Headers
VITE_CSP_ENABLED=true
VITE_HSTS_ENABLED=true

# CORS Configuration
VITE_ALLOWED_ORIGINS=https://videocraft.pro,https://www.videocraft.pro
```

## 🔒 SSL/TLS Configuration

### Let's Encrypt (Free SSL)

```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Obtain certificate
sudo certbot --nginx -d videocraft.pro -d www.videocraft.pro

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

### Nginx Configuration

```nginx
server {
    listen 80;
    server_name videocraft.pro www.videocraft.pro;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name videocraft.pro www.videocraft.pro;
    
    ssl_certificate /etc/letsencrypt/live/videocraft.pro/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/videocraft.pro/privkey.pem;
    
    root /var/www/videocraft-pro;
    index index.html;
    
    # Security headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains";
    
    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    
    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## 📊 Monitoring & Analytics

### Application Monitoring

1. **Error Tracking**
   ```bash
   npm install @sentry/react @sentry/tracing
   ```

2. **Performance Monitoring**
   ```javascript
   // src/utils/monitoring.js
   import * as Sentry from '@sentry/react'
   
   Sentry.init({
     dsn: process.env.VITE_SENTRY_DSN,
     environment: process.env.NODE_ENV,
     tracesSampleRate: 1.0,
   })
   ```

3. **Analytics**
   ```javascript
   // Google Analytics 4
   import { gtag } from 'ga-gtag'
   
   gtag('config', process.env.VITE_GA_TRACKING_ID)
   ```

### Health Checks

Create a health check endpoint:

```javascript
// public/health.json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00Z",
  "version": "1.0.0"
}
```

## 🔄 CI/CD Pipeline

### GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test
    
    - name: Build application
      run: npm run build
      env:
        VITE_OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
        VITE_STRIPE_PUBLISHABLE_KEY: ${{ secrets.STRIPE_PUBLISHABLE_KEY }}
    
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
        vercel-args: '--prod'
```

### GitLab CI

```yaml
# .gitlab-ci.yml
stages:
  - test
  - build
  - deploy

test:
  stage: test
  script:
    - npm ci
    - npm test

build:
  stage: build
  script:
    - npm ci
    - npm run build
  artifacts:
    paths:
      - dist/

deploy:
  stage: deploy
  script:
    - aws s3 sync dist/ s3://$S3_BUCKET --delete
    - aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_ID --paths "/*"
  only:
    - main
```

## 🚨 Backup & Recovery

### Database Backups

```bash
# Automated backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
pg_dump $DATABASE_URL > backup_$DATE.sql
aws s3 cp backup_$DATE.sql s3://backups/database/
```

### File Storage Backups

```bash
# Backup uploaded files
aws s3 sync s3://videocraft-uploads s3://videocraft-backups/uploads/$(date +%Y%m%d)/
```

## 🔧 Performance Optimization

### Build Optimization

```javascript
// vite.config.js
export default {
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['lucide-react', 'framer-motion'],
          auth: ['@stripe/stripe-js', 'openai']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
}
```

### CDN Configuration

```javascript
// Configure CDN for static assets
const CDN_URL = 'https://cdn.videocraft.pro'

// Update asset URLs in production
if (process.env.NODE_ENV === 'production') {
  // Configure asset prefix
}
```

## 🐛 Troubleshooting

### Common Issues

1. **Build Failures**
   ```bash
   # Clear cache and reinstall
   rm -rf node_modules package-lock.json
   npm install
   npm run build
   ```

2. **Environment Variables Not Loading**
   - Ensure variables start with `VITE_`
   - Check deployment platform configuration
   - Verify build-time vs runtime variables

3. **API Connection Issues**
   - Check CORS configuration
   - Verify API endpoint URLs
   - Test API keys and authentication

4. **Performance Issues**
   - Enable gzip compression
   - Optimize images and assets
   - Implement code splitting
   - Use CDN for static assets

### Debugging

```javascript
// Enable debug mode
localStorage.setItem('debug', 'videocraft:*')

// Check build info
console.log('Build info:', {
  version: process.env.VITE_APP_VERSION,
  environment: process.env.NODE_ENV,
  apiUrl: process.env.VITE_API_BASE_URL
})
```

## 📋 Pre-deployment Checklist

- [ ] All environment variables configured
- [ ] SSL certificate installed and configured
- [ ] Database migrations completed
- [ ] API endpoints tested
- [ ] Error tracking configured
- [ ] Analytics implemented
- [ ] Performance monitoring enabled
- [ ] Backup systems in place
- [ ] CI/CD pipeline tested
- [ ] Security headers configured
- [ ] CORS policies set
- [ ] Rate limiting implemented
- [ ] Health checks working
- [ ] Documentation updated

## 🔄 Post-deployment Tasks

1. **Verify Deployment**
   - Test all major user flows
   - Check API integrations
   - Verify payment processing
   - Test file uploads

2. **Monitor Performance**
   - Check response times
   - Monitor error rates
   - Verify analytics data
   - Review server logs

3. **Update Documentation**
   - Update API documentation
   - Record deployment notes
   - Update team on changes

## 📞 Support

For deployment issues:
- Check the troubleshooting section
- Review server logs
- Contact the development team
- Create a support ticket with deployment details
