# VideoCraft Pro API Documentation

This document outlines the API requirements and integrations for VideoCraft Pro.

## Overview

VideoCraft Pro integrates with several external APIs to provide its core functionality:

1. **Authentication API** - User management and authentication
2. **OpenAI API** - AI-powered script generation
3. **Cloud Storage API** - File upload and management
4. **Stripe API** - Payment processing and subscriptions
5. **Video Generation API** - Video creation (future integration)

## Authentication API

### Endpoints

#### POST /api/auth/register
Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_123",
      "name": "John Doe",
      "email": "john@example.com",
      "subscriptionTier": "free",
      "createdAt": "2024-01-01T00:00:00Z"
    },
    "token": "jwt_token_here"
  }
}
```

#### POST /api/auth/login
Authenticate an existing user.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_123",
      "name": "John Doe",
      "email": "john@example.com",
      "subscriptionTier": "pro",
      "exportsRemaining": 8
    },
    "token": "jwt_token_here"
  }
}
```

#### POST /api/auth/logout
Logout the current user.

**Headers:**
```
Authorization: Bearer jwt_token_here
```

**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

## OpenAI API Integration

### Script Generation

The app uses OpenAI's GPT models to generate video scripts from text content.

**Implementation:**
```javascript
const response = await openai.chat.completions.create({
  model: 'gpt-3.5-turbo',
  messages: [
    {
      role: 'system',
      content: 'You are a professional video script writer...'
    },
    {
      role: 'user',
      content: `Create a 60-second video script based on: "${content}"`
    }
  ],
  max_tokens: 1000,
  temperature: 0.7
})
```

**Expected Response Format:**
```json
{
  "script": "Scene 1: Hook (0-3s)\n\"Did you know...\"",
  "scenes": [
    {
      "timestamp": 0,
      "duration": 3,
      "type": "hook",
      "content": "Did you know..."
    }
  ]
}
```

## Cloud Storage API

### File Upload

#### POST /api/storage/upload
Upload brand assets and media files.

**Request:**
- Content-Type: multipart/form-data
- File size limit: 5MB
- Supported formats: PNG, JPG, SVG, MP4, MOV

**Response:**
```json
{
  "success": true,
  "data": {
    "url": "https://storage.provider.com/file-id",
    "filename": "logo.png",
    "size": 1024000,
    "type": "image/png",
    "id": "file_123"
  }
}
```

#### DELETE /api/storage/delete/:fileId
Delete an uploaded file.

**Response:**
```json
{
  "success": true,
  "message": "File deleted successfully"
}
```

## Stripe API Integration

### Subscription Plans

The app supports three subscription tiers:

1. **Free** - $0/month
   - 1 video export per month
   - Basic templates
   - Watermark included

2. **Pro** - $29/month
   - 10 video exports per month
   - Premium templates
   - Brand kit
   - No watermark

3. **Agency** - $99/month
   - 50 video exports per month
   - All templates
   - Team features
   - Priority support

### Checkout Session

#### POST /api/subscriptions/create-checkout-session
Create a Stripe checkout session for subscription upgrade.

**Request Body:**
```json
{
  "planId": "pro",
  "userId": "user_123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "url": "https://checkout.stripe.com/pay/session_id",
    "sessionId": "cs_session_123"
  }
}
```

### Webhook Handling

#### POST /api/webhooks/stripe
Handle Stripe webhook events for subscription updates.

**Events to handle:**
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`
- `invoice.payment_succeeded`
- `invoice.payment_failed`

## Projects API

### CRUD Operations

#### GET /api/projects
Get all projects for the authenticated user.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "project_123",
      "title": "My Video Project",
      "scriptContent": "Original text content...",
      "generatedScript": "Scene 1: Hook...",
      "brandAssets": {
        "logo": "https://storage.com/logo.png",
        "primaryColor": "#9c73ff",
        "fontFamily": "Inter"
      },
      "videoSettings": {
        "format": "16:9",
        "platform": "youtube",
        "duration": 60
      },
      "status": "draft",
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

#### POST /api/projects
Create a new project.

**Request Body:**
```json
{
  "title": "My New Video",
  "scriptContent": "Text content to convert...",
  "brandAssets": {
    "primaryColor": "#9c73ff",
    "fontFamily": "Inter"
  }
}
```

#### PUT /api/projects/:id
Update an existing project.

#### DELETE /api/projects/:id
Delete a project.

## Video Generation API (Future)

### Generate Video

#### POST /api/videos/generate
Generate a video from project data.

**Request Body:**
```json
{
  "projectId": "project_123",
  "settings": {
    "format": "16:9",
    "quality": "1080p",
    "platform": "youtube"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "videoId": "video_123",
    "status": "processing",
    "estimatedTime": 120
  }
}
```

#### GET /api/videos/:id/status
Check video generation status.

**Response:**
```json
{
  "success": true,
  "data": {
    "status": "completed",
    "videoUrl": "https://storage.com/video.mp4",
    "thumbnailUrl": "https://storage.com/thumb.jpg",
    "duration": 45,
    "fileSize": 12400000
  }
}
```

## Error Handling

All API endpoints return consistent error responses:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": {
      "field": "email",
      "issue": "Invalid email format"
    }
  }
}
```

### Common Error Codes

- `VALIDATION_ERROR` - Invalid input data
- `AUTHENTICATION_ERROR` - Invalid or missing authentication
- `AUTHORIZATION_ERROR` - Insufficient permissions
- `RATE_LIMIT_ERROR` - Too many requests
- `SUBSCRIPTION_ERROR` - Subscription-related issues
- `STORAGE_ERROR` - File upload/storage issues
- `EXTERNAL_API_ERROR` - Third-party API failures

## Rate Limiting

API endpoints are rate-limited based on subscription tier:

- **Free**: 10 requests/minute
- **Pro**: 100 requests/minute  
- **Agency**: 1000 requests/minute

## Security

### Authentication
- JWT tokens with 24-hour expiration
- Refresh tokens for seamless re-authentication
- Secure HTTP-only cookies for token storage

### Data Protection
- All API communications over HTTPS
- Input validation and sanitization
- SQL injection prevention
- XSS protection headers

### File Upload Security
- File type validation
- Size limits enforcement
- Virus scanning (production)
- Secure file storage with access controls

## Testing

### Mock Implementations

For development and testing, the app includes mock implementations of all APIs:

- **Authentication**: Local storage simulation
- **OpenAI**: Predefined script templates
- **Storage**: Browser File API
- **Stripe**: Mock checkout flows

### API Testing

Use the provided test suite to validate API integrations:

```bash
npm run test:api
```

## Deployment Considerations

### Environment Variables

Required environment variables for production:

```env
# Database
DATABASE_URL=postgresql://...

# Authentication
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=24h

# OpenAI
OPENAI_API_KEY=sk-...

# Stripe
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Storage
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_S3_BUCKET=...

# Email (optional)
SENDGRID_API_KEY=...
```

### Monitoring

Implement monitoring for:
- API response times
- Error rates
- Third-party API usage
- Subscription metrics
- File storage usage

### Scaling

Consider these scaling strategies:
- Database read replicas
- CDN for static assets
- Queue system for video processing
- Microservices architecture
- Caching layer (Redis)
