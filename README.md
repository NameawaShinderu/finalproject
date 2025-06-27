# AUROVA ERP DASHBOARD - TECHNICAL DOCUMENTATION & DEPLOYMENT GUIDE
## Development Team Handover Documentation v1.0

---

## 📋 TABLE OF CONTENTS

1. [System Architecture Overview](#system-architecture-overview)
2. [Technology Stack](#technology-stack)
3. [Development Environment Setup](#development-environment-setup)
4. [Database Schema & Design](#database-schema--design)
5. [API Architecture & Endpoints](#api-architecture--endpoints)
6. [Authentication & Security](#authentication--security)
7. [Payment Integration](#payment-integration)
8. [Cron Jobs & Automation](#cron-jobs--automation)
9. [Testing Strategy](#testing-strategy)
10. [Deployment Guide](#deployment-guide)
11. [Production Configuration](#production-configuration)
12. [Monitoring & Logging](#monitoring--logging)
13. [Performance Optimization](#performance-optimization)
14. [Troubleshooting Guide](#troubleshooting-guide)
15. [Development Workflow](#development-workflow)
16. [Code Quality & Standards](#code-quality--standards)

---

## 🏗️ SYSTEM ARCHITECTURE OVERVIEW

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    CLIENT APPLICATIONS                      │
├─────────────────────┬───────────────────┬───────────────────┤
│   Web Dashboard     │   Qt Machines     │   Mobile Apps     │
│   (Next.js)         │   (C++/Qt)        │   (Future)        │
└─────────────────────┴───────────────────┴───────────────────┘
                              │
                    ┌─────────┴─────────┐
                    │    Load Balancer   │
                    │   (Nginx/CloudFlare) │
                    └─────────┬─────────┘
                              │
┌─────────────────────────────┴─────────────────────────────────┐
│                 AUROVA ERP BACKEND                            │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │ Next.js API │  │   Auth      │  │ Middleware  │          │
│  │ Routes      │  │   Service   │  │ Layer       │          │
│  └─────────────┘  └─────────────┘  └─────────────┘          │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │ Business    │  │ Payment     │  │ Cron Jobs   │          │
│  │ Logic       │  │ Processing  │  │ Service     │          │
│  └─────────────┘  └─────────────┘  └─────────────┘          │
└─────────────────────────────────────────────────────────────┘
                              │
            ┌─────────────────┼─────────────────┐
            │                 │                 │
    ┌───────▼──────┐  ┌───────▼──────┐  ┌───────▼──────┐
    │ PostgreSQL   │  │  Razorpay    │  │   File       │
    │ Database     │  │  Gateway     │  │   Storage    │
    └──────────────┘  └──────────────┘  └──────────────┘
```

### Component Architecture

#### **Frontend Layer**
- **Framework:** Next.js 14 with App Router
- **UI Components:** Custom React components with Material-UI integration
- **State Management:** React hooks and local state
- **Real-time Updates:** Auto-refresh every 30 seconds
- **Responsive Design:** Mobile-first approach with CSS Grid/Flexbox

#### **API Layer**
- **Framework:** Next.js API Routes
- **Authentication:** JWT-based with role-based access control
- **Validation:** Zod schema validation
- **Error Handling:** Centralized error handling with structured responses
- **Rate Limiting:** Built-in protection for API endpoints

#### **Business Logic Layer**
- **ORM:** Prisma with PostgreSQL
- **Payment Processing:** Razorpay integration with webhook handling
- **File Handling:** Local file storage with API serving
- **Data Validation:** Multi-layer validation (client, API, database)

#### **Data Layer**
- **Primary Database:** PostgreSQL with optimized indexes
- **Payment Gateway:** Razorpay for transaction processing
- **File Storage:** Local filesystem with future S3 compatibility
- **Caching:** In-memory caching for frequently accessed data

---

## 🛠️ TECHNOLOGY STACK

### Core Technologies

| Layer | Technology | Version | Purpose |
|-------|------------|---------|---------|
| **Frontend** | Next.js | 14.0.4 | React framework with SSR |
| **UI Library** | Material-UI | 5.15.3 | Component library |
| **Backend** | Next.js API | 14.0.4 | API routes and middleware |
| **Database** | PostgreSQL | 14+ | Primary data storage |
| **ORM** | Prisma | 5.7.1 | Database ORM and migrations |
| **Auth** | JWT | 9.0.2 | Authentication tokens |
| **Payments** | Razorpay | 2.9.2 | Payment gateway |
| **Validation** | Zod | 3.22.4 | Schema validation |
| **Styling** | CSS3 + Custom | - | Responsive design |

### Development Dependencies

| Tool | Version | Purpose |
|------|---------|---------|
| **TypeScript** | 5.x | Type safety |
| **ESLint** | 8.x | Code linting |
| **ts-node** | 10.9.1 | TypeScript execution |
| **bcryptjs** | 2.4.3 | Password hashing |
| **jsonwebtoken** | 9.0.2 | JWT handling |
| **date-fns** | 3.0.6 | Date manipulation |

### Production Dependencies

```json
{
  "dependencies": {
    "@emotion/react": "^11.11.1",
    "@emotion/styled": "^11.11.0",
    "@hookform/resolvers": "^3.3.2",
    "@mui/icons-material": "^5.15.3",
    "@mui/material": "^5.15.3",
    "@mui/x-charts": "^6.18.3",
    "@mui/x-data-grid": "^6.18.3",
    "@mui/x-date-pickers": "^6.18.3",
    "@next-auth/prisma-adapter": "^1.0.7",
    "@prisma/client": "^5.7.1",
    "bcryptjs": "^2.4.3",
    "date-fns": "^3.0.6",
    "html2canvas": "^1.4.1",
    "jsonwebtoken": "^9.0.2",
    "jspdf": "^3.0.1",
    "mime-types": "^2.1.35",
    "next": "14.0.4",
    "next-auth": "^4.24.5",
    "nodemailer": "^6.9.7",
    "razorpay": "^2.9.2",
    "react": "^18",
    "react-dom": "^18",
    "react-hook-form": "^7.48.2",
    "react-to-print": "^2.15.1",
    "recharts": "^2.8.0",
    "socket.io": "^4.7.4",
    "socket.io-client": "^4.7.4",
    "zod": "^3.22.4"
  }
}
```

---

## 💻 DEVELOPMENT ENVIRONMENT SETUP

### Prerequisites

```bash
# Required Software
Node.js >= 18.17.0
npm >= 9.0.0
PostgreSQL >= 14.0
Git >= 2.30.0

# Optional but Recommended
Docker >= 20.10.0
PM2 >= 5.0.0 (for production)
```

### Initial Setup

#### **1. Repository Clone & Installation**

```bash
# Clone the repository
git clone <repository-url>
cd aurova-erp-dashboard

# Install dependencies
npm install

# Install development dependencies
npm install --save-dev ts-node @types/node @types/react @types/react-dom
```

#### **2. Environment Configuration**

```bash
# Copy environment template
cp .env.example .env.local

# Edit environment variables
nano .env.local
```

**Required Environment Variables:**

```env
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/aurova"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-minimum-32-characters"

# JWT Configuration
JWT_SECRET="your-jwt-secret-minimum-32-characters"

# Razorpay Configuration
RAZORPAY_KEY_ID="rzp_live_or_test_key"
RAZORPAY_KEY_SECRET="your_razorpay_secret"
RAZORPAY_WEBHOOK_SECRET="your_webhook_secret"

# Email Configuration (Optional)
SMTP_HOST="smtpout.secureserver.net"
SMTP_PORT="587"
SMTP_USER="support@aurova.in"
SMTP_PASS="your_email_password"
EMAIL_DEFAULT_FROM="support@aurova.in"
EMAIL_DEFAULT_REPLY_TO="support@aurova.in"

# Application Configuration
HOST="0.0.0.0"
PORT="3000"
UPLOAD_DIR="./public/uploads"
MAX_FILE_SIZE="5242880"
MACHINE_TOKEN_EXPIRY="7d"
CRON_SECRET="your-cron-secret-for-api-protection"
```

#### **3. Database Setup**

```bash
# Start PostgreSQL service
sudo service postgresql start

# Create database
createdb aurova

# Generate Prisma client
npm run db:generate

# Run database migrations
npm run db:push

# Seed database with demo data
npm run db:seed
```

#### **4. Development Server**

```bash
# Start development server
npm run dev

# In separate terminal, start cron jobs
npm run cron:start

# Access application
open http://localhost:3000
```

### Development Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build", 
    "start": "next start",
    "lint": "next lint",
    "db:generate": "prisma generate",
    "db:push": "prisma db push",
    "db:migrate": "prisma migrate dev",
    "db:studio": "prisma studio",
    "db:seed": "tsx prisma/seed.ts",
    "db:reset": "prisma migrate reset --force",
    "setup": "npm install && npm run db:generate && npm run db:push && npm run db:seed",
    "fresh-start": "npm run db:reset && npm run db:seed",
    "cron:start": "node scripts/start-cron.js",
    "cron:production": "node scripts/start-cron-production.js",
    "cron:test": "tsx src/cron/paymentSync.ts"
  }
}
```

---

## 🗄️ DATABASE SCHEMA & DESIGN

### Entity Relationship Diagram

```
Users (Admin/Manager/Vendor/Accountant)
├── UserMachineAssignments ──┐
│                             │
Machines (Perfume Dispensers) │
├── Inventories               │
├── Sales                     │
├── SprayLogs                 │
├── RevenueSummary           │
├── MachineTokens            │
└── UserMachineAssignments ──┘
│
Products (Perfume Brands)
├── Inventories (N:1)
├── Sales (N:1)
└── SprayLogs (N:1)

Locations
└── Machines (1:N)

InventoryThresholds
└── Users (N:1 creator)
```

### Core Tables

#### **Users Table**
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR UNIQUE NOT NULL,
  password_hash VARCHAR NOT NULL,
  role user_role NOT NULL,
  name VARCHAR NOT NULL,
  phone VARCHAR,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_active ON users(is_active);
CREATE INDEX idx_users_role_active ON users(role, is_active);
```

#### **Machines Table**
```sql
CREATE TABLE machines (
  id SERIAL PRIMARY KEY,
  unique_machine_id VARCHAR UNIQUE NOT NULL,
  name VARCHAR NOT NULL,
  status machine_status DEFAULT 'active',
  last_sync_at TIMESTAMP,
  last_active_at TIMESTAMP,
  plus_code VARCHAR,
  gst_number VARCHAR,
  address VARCHAR,
  location_description VARCHAR,
  city VARCHAR,
  location_id INTEGER REFERENCES locations(id),
  assigned_manager_id INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Critical performance indexes
CREATE INDEX idx_machines_status ON machines(status);
CREATE INDEX idx_machines_manager ON machines(assigned_manager_id);
CREATE INDEX idx_machines_city ON machines(city);
CREATE INDEX idx_machines_last_active ON machines(last_active_at);
```

#### **Inventory Table**
```sql
CREATE TABLE inventories (
  id SERIAL PRIMARY KEY,
  machine_id INTEGER REFERENCES machines(id) NOT NULL,
  product_id INTEGER REFERENCES products(id) NOT NULL,
  nozzle INTEGER NOT NULL,
  total_ml DECIMAL(10,2) NOT NULL,
  total_sprays INTEGER NOT NULL,
  remaining_sprays INTEGER NOT NULL,
  cost_per_bottle DECIMAL(10,2) NOT NULL,
  sell_price DECIMAL(10,2) NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  
  UNIQUE(machine_id, nozzle)
);

-- Critical performance indexes for inventory operations
CREATE INDEX idx_inventories_machine ON inventories(machine_id);
CREATE INDEX idx_inventories_product ON inventories(product_id);
CREATE INDEX idx_inventories_active ON inventories(is_active);
CREATE INDEX idx_inventories_machine_active ON inventories(machine_id, is_active);
CREATE INDEX idx_inventories_remaining_sprays ON inventories(remaining_sprays);
CREATE INDEX idx_inventories_low_stock ON inventories(machine_id, remaining_sprays, total_sprays);
```

#### **Sales Table**
```sql
CREATE TABLE sales (
  id SERIAL PRIMARY KEY,
  machine_id INTEGER REFERENCES machines(id) NOT NULL,
  product_id INTEGER REFERENCES products(id) NOT NULL,
  sprays INTEGER NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  payment_status payment_status DEFAULT 'pending',
  payment_id VARCHAR,
  razorpay_order_id VARCHAR,
  timestamp TIMESTAMP DEFAULT NOW(),
  customer_upi_id VARCHAR,
  customer_phone VARCHAR
);

-- Critical performance indexes for sales analysis
CREATE INDEX idx_sales_machine ON sales(machine_id);
CREATE INDEX idx_sales_product ON sales(product_id);
CREATE INDEX idx_sales_payment_status ON sales(payment_status);
CREATE INDEX idx_sales_timestamp ON sales(timestamp);
CREATE INDEX idx_sales_machine_timestamp ON sales(machine_id, timestamp);
CREATE INDEX idx_sales_payment_timestamp ON sales(payment_status, timestamp);
CREATE INDEX idx_sales_revenue_calc ON sales(timestamp, payment_status, amount);
```

### Database Optimization Strategies

#### **Indexing Strategy**
```sql
-- Composite indexes for common query patterns
CREATE INDEX idx_sales_machine_status_time ON sales(machine_id, payment_status, timestamp);
CREATE INDEX idx_inventory_machine_active_sprays ON inventories(machine_id, is_active, remaining_sprays);
CREATE INDEX idx_user_assignments_user_role ON user_machine_assignments(user_id, role);

-- Partial indexes for active records
CREATE INDEX idx_machines_active_only ON machines(id) WHERE status = 'active';
CREATE INDEX idx_inventory_active_only ON inventories(machine_id, product_id) WHERE is_active = true;
```

#### **Query Optimization**
```sql
-- Analyze query performance
EXPLAIN ANALYZE SELECT * FROM sales 
WHERE machine_id = 1 
AND payment_status = 'completed' 
AND timestamp >= NOW() - INTERVAL '7 days';

-- Vacuum and analyze regularly
VACUUM ANALYZE sales;
VACUUM ANALYZE inventories;
```

---

## 🔌 API ARCHITECTURE & ENDPOINTS

### API Structure

```
/api/
├── auth/
│   └── login/               # User authentication
├── machines/
│   ├── [id]/               # Machine CRUD operations
│   │   ├── token/          # Machine token generation
│   │   └── users/          # Machine user assignments
│   └── route.ts            # Machine list operations
├── inventory/
│   ├── sprayUpdate/        # Qt machine spray reporting
│   ├── allocate/           # Inventory allocation
│   └── [id]/reorder/       # Reorder management
├── sales/                  # Sales order creation (Qt)
├── payments/
│   ├── verify/             # Payment verification
│   ├── complete/           # Manual payment completion
│   ├── status/             # Payment status check
│   └── config/             # Payment configuration
├── products/               # Product management
├── managers/               # User management
├── revenue/                # Revenue analytics
├── transactions/           # Transaction management
├── webhooks/
│   ├── razorpay/           # Payment webhooks
│   └── debug/              # Webhook debugging
├── dashboard/
│   └── stats/              # Dashboard statistics
└── health/                 # System health check
```

### API Response Format

#### **Success Response**
```json
{
  "success": true,
  "data": {
    // Response data
  },
  "pagination": {  // Optional for paginated responses
    "page": 1,
    "limit": 50,
    "total": 100,
    "totalPages": 2
  }
}
```

#### **Error Response**
```json
{
  "success": false,
  "error": "Detailed error message",
  "code": "ERROR_CODE",  // Optional error code
  "details": {           // Optional additional details
    "field": "validation error"
  }
}
```

### Core API Endpoints

#### **Authentication APIs**

```typescript
// POST /api/auth/login
interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  success: true;
  data: {
    user: AuthUser;
    token: string;
  };
}
```

#### **Machine APIs (Qt Integration)**

```typescript
// GET /api/machines/{uniqueMachineId}
interface QtMachineInfo {
  data: {
    inventories: Array<{
      nozzle: number;
      sprays: number;
      sellPrice: number;
      product: {
        id: number;
        name: string;
        fragranceNote: string;
        fragranceHalflife: number;
        colorCode: string;
        photo: { url: string };
      };
    }>;
    plusCode: string;
  };
}

// POST /api/inventory/sprayUpdate
interface SprayUpdateRequest {
  machineId: number;
  productId: number;
  sprayCount?: number;
}

// POST /api/sales
interface SalesOrderRequest {
  machine_id: number;
  product_id: number;
  timestamp: string;
  amount: number;
  sprays: number;
  customer_upi_id?: string;
  customer_phone?: string;
}
```

#### **Dashboard APIs**

```typescript
// GET /api/dashboard/stats
interface DashboardStats {
  totalRevenue: number;
  totalMachines: number;
  activeSprayCount: number;
  todayRevenue: number;
  revenueGrowth: number;
  machineGrowth: number;
  machineStats: {
    total: number;
    active: number;
    inactive: number;
    maintenance: number;
    error: number;
  };
  recentActivity: Activity[];
  topPerformingMachines: Machine[];
  revenueChart: RevenueData[];
  lowStockAlerts: StockAlert[];
}
```

### Middleware Architecture

#### **Authentication Middleware**
```typescript
// src/lib/middleware.ts
export async function withAuth(
  request: NextRequest,
  handler: (req: AuthenticatedRequest) => Promise<NextResponse>,
  options: { requireAdmin?: boolean; allowMachine?: boolean } = {}
)

export async function withMachineAuth(
  request: NextRequest,
  handler: (req: AuthenticatedRequest) => Promise<NextResponse>
): Promise<NextResponse>

export function withAdminAuth(
  request: NextRequest,
  handler: (req: AuthenticatedRequest) => Promise<NextResponse>
)
```

#### **Role-Based Access Control**
```typescript
// Role permissions matrix
const PERMISSIONS = {
  admin: ['*'], // Full access
  manager: [
    'machines:read:assigned',
    'inventory:read:assigned',
    'sales:read:assigned',
    'revenue:read:assigned'
  ],
  vendor: [
    'machines:read:assigned',
    'inventory:write:assigned',
    'maintenance:write:assigned'
  ],
  accountant: [
    'transactions:read:all',
    'revenue:read:all',
    'reports:read:all'
  ]
};
```

---

## 🔐 AUTHENTICATION & SECURITY

### Authentication Flow

```
1. User Login → Email/Password Validation
2. Password Hash Verification (bcrypt)
3. JWT Token Generation (7-day expiry)
4. Token Storage (localStorage client-side)
5. API Request Authentication (Bearer token)
6. Token Validation & User Permission Check
7. API Response with Role-Based Data
```

### JWT Token Structure

```javascript
// User Token
{
  "id": 123,
  "email": "user@aurova.in",
  "role": "manager",
  "iat": 1703123456,
  "exp": 1703728256
}

// Machine Token
{
  "machineId": 456,
  "type": "machine",
  "iat": 1703123456,
  "exp": 1705715456  // 30 days for machines
}
```

### Security Implementation

#### **Password Security**
```typescript
// Password hashing with bcrypt (12 rounds)
export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 12)
}

export async function verifyPassword(
  password: string, 
  hashedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword)
}
```

#### **Input Validation with Zod**
```typescript
// API request validation
const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

const machineUpdateSchema = z.object({
  name: z.string().optional(),
  status: z.enum(['active', 'inactive', 'maintenance', 'error']).optional(),
  gstNumber: z.string().optional().refine((gst) => {
    if (!gst) return true
    const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/
    return gstRegex.test(gst)
  }, {
    message: 'Invalid GST number format'
  }),
})
```

#### **Rate Limiting & Protection**
```typescript
// API rate limiting implementation
const rateLimitMap = new Map()

export function rateLimit(limit: number, windowMs: number) {
  return (req: NextRequest) => {
    const ip = req.ip || 'unknown'
    const now = Date.now()
    const windowStart = now - windowMs
    
    const requests = rateLimitMap.get(ip) || []
    const validRequests = requests.filter((time: number) => time > windowStart)
    
    if (validRequests.length >= limit) {
      return new Response('Rate limit exceeded', { status: 429 })
    }
    
    validRequests.push(now)
    rateLimitMap.set(ip, validRequests)
    return null
  }
}
```

#### **SQL Injection Prevention**
```typescript
// Using Prisma ORM with parameterized queries
const users = await prisma.user.findMany({
  where: {
    email: validatedEmail, // Automatically escaped
    role: {
      in: allowedRoles    // Type-safe enum values
    }
  }
})

// Raw queries when needed (rare)
const result = await prisma.$queryRaw`
  SELECT * FROM sales 
  WHERE machine_id = ${machineId} 
  AND timestamp >= ${startDate}
`
```

---

## 💳 PAYMENT INTEGRATION

### Razorpay Integration Architecture

```
Customer Payment Flow:
1. Qt Machine → Create Sale Order → ERP API
2. ERP API → Create Razorpay Order → Return to Qt
3. Qt Machine → Show Payment QR/Options → Customer
4. Customer → Complete Payment → Razorpay
5. Razorpay → Webhook → ERP API
6. ERP API → Update Sale Status → Update Inventory
7. Qt Machine → Dispense Product → Update Spray Count
```

### Payment Configuration

```typescript
// Razorpay initialization
export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

// Payment order creation
export async function createRazorpayOrder(options: RazorpayOrderOptions) {
  const order = await razorpay.orders.create({
    amount: options.amount, // Amount in paise
    currency: 'INR',
    receipt: `receipt_M${machineId}_S${saleId}_${Date.now()}`,
    notes: {
      sale_id: saleId.toString(),
      machine_id: machineId.toString(),
      product_id: productId.toString()
    }
  })
  return order
}
```

### Webhook Implementation

```typescript
// Enhanced webhook with signature verification
export async function POST(request: NextRequest) {
  const webhookId = `wh_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`
  console.log(`[${webhookId}] Webhook received at ${new Date().toISOString()}`)
  
  try {
    const body = await request.text()
    const signature = request.headers.get('x-razorpay-signature')
    
    // Verify webhook signature
    const isValidSignature = verifyWebhookSignature(body, signature)
    if (!isValidSignature) {
      console.log(`[${webhookId}] Invalid signature verification`)
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }
    
    const event: WebhookEvent = JSON.parse(body)
    
    // Process payment completion
    if (event.event === 'payment.captured') {
      await processPaymentCompletion(event.payload.payment.entity)
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(`[${webhookId}] Webhook processing failed:`, error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}
```

### Payment Reconciliation

```typescript
// Automated payment sync (runs every 2 minutes)
export async function syncPendingPayments() {
  const pendingSales = await prisma.sale.findMany({
    where: {
      paymentStatus: 'pending',
      timestamp: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }
    }
  })
  
  for (const sale of pendingSales) {
    try {
      const payment = await fetchRazorpayPayment(sale.paymentId)
      
      if (payment.status === 'captured') {
        await completePaymentTransaction(sale)
      }
    } catch (error) {
      console.error(`Failed to sync payment ${sale.id}:`, error)
    }
  }
}
```

---

## ⏰ CRON JOBS & AUTOMATION

### Cron Job Architecture

```
Cron Process (separate from Next.js)
├── Payment Sync (every 2 minutes)
├── Revenue Summary (daily at midnight)
├── Stock Alerts (every 30 minutes)
├── Machine Health Check (every 10 minutes)
└── Report Generation (weekly)
```

### Payment Sync Implementation

```typescript
// src/cron/paymentSync.ts
export async function syncPendingPayments() {
  const cronId = `sync_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  
  try {
    // Get pending payments from last 24 hours
    const pendingSales = await prisma.sale.findMany({
      where: {
        paymentStatus: 'pending',
        timestamp: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }
      },
      take: 100 // Process in batches
    })
    
    const results = { completed: 0, failed: 0, unchanged: 0 }
    
    for (const sale of pendingSales) {
      const status = await verifyPaymentWithRazorpay(sale)
      
      if (status === 'completed') {
        await completePaymentTransaction(sale)
        results.completed++
      } else if (status === 'failed') {
        await markPaymentFailed(sale)
        results.failed++
      } else {
        results.unchanged++
      }
    }
    
    console.log(`[${cronId}] Sync completed:`, results)
    return results
  } catch (error) {
    console.error(`[${cronId}] Sync failed:`, error)
    throw error
  }
}
```

### Cron Job Deployment

#### **Development**
```bash
# Start cron jobs locally
npm run cron:start
```

#### **Production with PM2**
```bash
# Install PM2
npm install -g pm2

# Start main application
pm2 start npm --name "aurova-app" -- start

# Start cron jobs
pm2 start "npm run cron:start" --name "aurova-cron"

# Configure auto-restart
pm2 startup
pm2 save
```

#### **Docker Deployment**
```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

# Start both processes
CMD ["sh", "-c", "npm start & npm run cron:start"]
```

#### **Systemd Service (Linux)**
```ini
# /etc/systemd/system/aurova-cron.service
[Unit]
Description=Aurova ERP Cron Jobs
After=network.target

[Service]
Type=simple
User=aurova
WorkingDirectory=/path/to/aurova-erp-dashboard
ExecStart=/usr/bin/npm run cron:start
Restart=always
RestartSec=10
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
```

```bash
# Enable and start service
sudo systemctl enable aurova-cron
sudo systemctl start aurova-cron
sudo systemctl status aurova-cron
```

---

## 🧪 TESTING STRATEGY

### Testing Framework Setup

```bash
# Install testing dependencies
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
npm install --save-dev supertest @types/supertest
npm install --save-dev playwright @playwright/test
```

### Unit Testing

#### **API Route Testing**
```typescript
// __tests__/api/auth/login.test.ts
import { createMocks } from 'node-mocks-http'
import { POST } from '@/app/api/auth/login/route'

describe('/api/auth/login', () => {
  it('should authenticate valid user', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        email: 'admin@aurova.in',
        password: 'admin123'
      }
    })

    const response = await POST(req)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.data.token).toBeDefined()
  })
})
```

#### **Component Testing**
```typescript
// __tests__/components/Dashboard.test.tsx
import { render, screen } from '@testing-library/react'
import Dashboard from '@/app/dashboard/page'

// Mock API calls
jest.mock('@/lib/api', () => ({
  fetchDashboardStats: jest.fn(() => Promise.resolve({
    totalRevenue: 50000,
    totalMachines: 10,
    activeSprayCount: 150
  }))
}))

describe('Dashboard', () => {
  it('renders dashboard statistics', async () => {
    render(<Dashboard />)
    
    expect(await screen.findByText('Total Revenue')).toBeInTheDocument()
    expect(await screen.findByText('₹50,000')).toBeInTheDocument()
  })
})
```

### Integration Testing

#### **Database Testing**
```typescript
// __tests__/integration/payment-flow.test.ts
import { prisma } from '@/lib/prisma'
import { createRazorpayOrder } from '@/lib/razorpay'

describe('Payment Integration Flow', () => {
  beforeEach(async () => {
    // Clean test database
    await prisma.sale.deleteMany()
    await prisma.inventory.deleteMany()
  })

  it('should complete full payment flow', async () => {
    // 1. Create machine and inventory
    const machine = await prisma.machine.create({
      data: { uniqueMachineId: 'TEST_001', name: 'Test Machine' }
    })

    // 2. Create sale order
    const sale = await prisma.sale.create({
      data: {
        machineId: machine.id,
        productId: 1,
        sprays: 3,
        amount: 45
      }
    })

    // 3. Create Razorpay order
    const order = await createRazorpayOrder({
      amount: 4500, // 45 INR in paise
      receipt: `test_${sale.id}`
    })

    expect(order.id).toBeDefined()
    expect(order.amount).toBe(4500)
  })
})
```

### End-to-End Testing

#### **Playwright E2E Tests**
```typescript
// e2e/dashboard.spec.ts
import { test, expect } from '@playwright/test'

test('Admin dashboard flow', async ({ page }) => {
  // Login
  await page.goto('/login')
  await page.fill('[name="email"]', 'admin@aurova.in')
  await page.fill('[name="password"]', 'admin123')
  await page.click('button[type="submit"]')

  // Verify dashboard loads
  await expect(page).toHaveURL('/dashboard')
  await expect(page.locator('h1')).toContainText('Dashboard Overview')

  // Check KPI cards
  await expect(page.locator('.stats-card')).toHaveCount(4)
  
  // Navigate to machines
  await page.click('text=Manage Machines')
  await expect(page).toHaveURL('/dashboard/machines')
  
  // Verify machine list loads
  await expect(page.locator('.data-table')).toBeVisible()
})
```

### API Testing

#### **Postman Collection**
```json
{
  "info": {
    "name": "Aurova ERP API Tests",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Authentication",
      "item": [
        {
          "name": "Login Admin",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"email\": \"admin@aurova.in\",\n  \"password\": \"admin123\"\n}"
            },
            "url": {
              "raw": "{{baseUrl}}/api/auth/login",
              "host": ["{{baseUrl}}"],
              "path": ["api", "auth", "login"]
            }
          },
          "event": [
            {
              "listen": "test",
              "script": {
                "exec": [
                  "const response = pm.response.json();",
                  "pm.test('Login successful', () => {",
                  "  pm.expect(response.success).to.be.true;",
                  "  pm.expect(response.data.token).to.exist;",
                  "});",
                  "pm.globals.set('authToken', response.data.token);"
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "name": "Machine API",
      "item": [
        {
          "name": "Get Machine Info (Qt)",
          "request": {
            "method": "GET",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{machineToken}}"
              },
              {
                "key": "User-Agent",
                "value": "Qt/6.0"
              }
            ],
            "url": {
              "raw": "{{baseUrl}}/api/machines/PDM_001122334455",
              "host": ["{{baseUrl}}"],
              "path": ["api", "machines", "PDM_001122334455"]
            }
          }
        }
      ]
    }
  ]
}
```

### Load Testing

#### **Artillery Load Test**
```yaml
# load-test.yml
config:
  target: 'http://localhost:3000'
  phases:
    - duration: 60
      arrivalRate: 10
    - duration: 120  
      arrivalRate: 50
    - duration: 60
      arrivalRate: 100

scenarios:
  - name: "Dashboard Load Test"
    weight: 70
    flow:
      - post:
          url: "/api/auth/login"
          json:
            email: "admin@aurova.in"
            password: "admin123"
          capture:
            - json: "$.data.token"
              as: "token"
      - get:
          url: "/api/dashboard/stats"
          headers:
            Authorization: "Bearer {{ token }}"
            
  - name: "Machine API Load Test"
    weight: 30
    flow:
      - get:
          url: "/api/machines/PDM_001122334455"
          headers:
            Authorization: "Bearer {{ machineToken }}"
```

```bash
# Run load test
npm install -g artillery
artillery run load-test.yml
```

### Test Data Management

#### **Test Database Setup**
```typescript
// jest.setup.js
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.TEST_DATABASE_URL
    }
  }
})

beforeAll(async () => {
  // Clean database
  await prisma.$executeRaw`TRUNCATE TABLE sales RESTART IDENTITY CASCADE`
  await prisma.$executeRaw`TRUNCATE TABLE inventories RESTART IDENTITY CASCADE`
  
  // Seed test data
  await seedTestData()
})

afterAll(async () => {
  await prisma.$disconnect()
})
```

### Continuous Integration

#### **GitHub Actions Workflow**
```yaml
# .github/workflows/test.yml
name: Test Suite

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    services:
      postgres:
        image: postgres:14
        env:
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: aurova_test
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Setup test database
      run: |
        npm run db:push
        npm run db:seed
      env:
        DATABASE_URL: postgresql://postgres:postgres@localhost:5432/aurova_test
        
    - name: Run unit tests
      run: npm run test
      
    - name: Run integration tests
      run: npm run test:integration
      
    - name: Run E2E tests
      run: npm run test:e2e
```

---

## 🚀 DEPLOYMENT GUIDE

### Production Environment Requirements

#### **Server Specifications**
```
Minimum Requirements:
- CPU: 2 vCPUs
- RAM: 4GB
- Storage: 50GB SSD
- Bandwidth: 100Mbps

Recommended for Production:
- CPU: 4 vCPUs
- RAM: 8GB
- Storage: 100GB SSD
- Bandwidth: 1Gbps
- Load Balancer: Nginx/CloudFlare
```

#### **Software Requirements**
```bash
# Operating System
Ubuntu 20.04 LTS or newer
CentOS 8 or newer

# Runtime
Node.js 18.17.0 or newer
npm 9.0.0 or newer

# Database
PostgreSQL 14.0 or newer

# Process Manager
PM2 5.0.0 or newer

# Reverse Proxy
Nginx 1.18 or newer

# SSL Certificate
Let's Encrypt or commercial certificate
```

### Deployment Methods

#### **Method 1: Traditional VPS Deployment**

**1. Server Setup**
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PostgreSQL
sudo apt install postgresql postgresql-contrib

# Install PM2
sudo npm install -g pm2

# Install Nginx
sudo apt install nginx
```

**2. Database Setup**
```bash
# Create database user
sudo -u postgres createuser --interactive
sudo -u postgres createdb aurova_production

# Set up database permissions
sudo -u postgres psql
ALTER USER aurova_user WITH ENCRYPTED PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE aurova_production TO aurova_user;
\q
```

**3. Application Deployment**
```bash
# Clone repository
git clone <repository-url> /var/www/aurova-erp
cd /var/www/aurova-erp

# Install dependencies
npm ci --only=production

# Set up environment
cp .env.example .env.production
nano .env.production

# Build application
npm run build

# Set up database
npm run db:push
npm run db:seed

# Start with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

**4. Nginx Configuration**
```nginx
# /etc/nginx/sites-available/aurova-erp
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;

    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    location /api/webhooks/ {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        # Ensure webhooks get raw body
        proxy_buffering off;
    }
}
```

#### **Method 2: Docker Deployment**

**1. Dockerfile**
```dockerfile
# Multi-stage build
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

COPY . .
RUN npm run build

# Production image
FROM node:18-alpine AS production

WORKDIR /app

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Copy built application
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/scripts ./scripts
COPY --from=builder /app/src ./src
COPY --from=builder /app/node_modules ./node_modules

# Set permissions
RUN chown -R nextjs:nodejs /app
USER nextjs

EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/api/health || exit 1

# Start application and cron jobs
CMD ["sh", "-c", "npm start & npm run cron:start"]
```

**2. Docker Compose**
```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://aurova:password@db:5432/aurova
    depends_on:
      - db
    restart: unless-stopped
    
  db:
    image: postgres:14-alpine
    environment:
      - POSTGRES_DB=aurova
      - POSTGRES_USER=aurova
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped
    
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
    restart: unless-stopped

volumes:
  postgres_data:
```

**3. Deploy with Docker**
```bash
# Build and start
docker-compose up -d

# Check logs
docker-compose logs -f app

# Update deployment
docker-compose pull
docker-compose up -d --force-recreate
```

#### **Method 3: Kubernetes Deployment**

**1. Deployment Configuration**
```yaml
# k8s/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: aurova-erp
spec:
  replicas: 3
  selector:
    matchLabels:
      app: aurova-erp
  template:
    metadata:
      labels:
        app: aurova-erp
    spec:
      containers:
      - name: aurova-erp
        image: aurova/erp:latest
        ports:
        - containerPort: 3000
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: aurova-secrets
              key: database-url
        - name: RAZORPAY_KEY_SECRET
          valueFrom:
            secretKeyRef:
              name: aurova-secrets
              key: razorpay-secret
        resources:
          requests:
            memory: "512Mi"
            cpu: "250m"
          limits:
            memory: "1Gi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /api/health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /api/health
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5
```

**2. Service Configuration**
```yaml
# k8s/service.yaml
apiVersion: v1
kind: Service
metadata:
  name: aurova-erp-service
spec:
  selector:
    app: aurova-erp
  ports:
    - protocol: TCP
      port: 80
      targetPort: 3000
  type: LoadBalancer
```

### PM2 Ecosystem Configuration

```javascript
// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: 'aurova-app',
      script: 'npm',
      args: 'start',
      cwd: '/var/www/aurova-erp',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      log_file: '/var/log/pm2/aurova-app.log',
      out_file: '/var/log/pm2/aurova-app-out.log',
      error_file: '/var/log/pm2/aurova-app-error.log',
      merge_logs: true,
      max_memory_restart: '1G',
      min_uptime: '10s',
      max_restarts: 5
    },
    {
      name: 'aurova-cron',
      script: 'npm',
      args: 'run cron:start',
      cwd: '/var/www/aurova-erp',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production'
      },
      log_file: '/var/log/pm2/aurova-cron.log',
      merge_logs: true,
      restart_delay: 5000,
      max_memory_restart: '512M'
    }
  ]
}
```

---

## ⚙️ PRODUCTION CONFIGURATION

### Environment Variables

#### **Core Configuration**
```env
# Application
NODE_ENV=production
HOST=0.0.0.0
PORT=3000
NEXTAUTH_URL=https://your-domain.com

# Security
NEXTAUTH_SECRET=secure-random-string-minimum-32-characters
JWT_SECRET=another-secure-random-string-minimum-32-characters

# Database
DATABASE_URL=postgresql://username:password@localhost:5432/aurova_production

# Razorpay (Production)
RAZORPAY_KEY_ID=rzp_live_your_live_key_id
RAZORPAY_KEY_SECRET=your_live_secret_key
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret_64_characters

# Email (Production SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
EMAIL_DEFAULT_FROM=noreply@your-domain.com
EMAIL_DEFAULT_REPLY_TO=support@your-domain.com

# File Storage
UPLOAD_DIR=/var/www/aurova-erp/public/uploads
MAX_FILE_SIZE=10485760

# Security Settings
MACHINE_TOKEN_EXPIRY=30d
CRON_SECRET=secure-cron-api-protection-key
```

### Database Optimization

#### **Production Database Settings**
```sql
-- postgresql.conf optimizations
shared_buffers = 256MB
effective_cache_size = 1GB
maintenance_work_mem = 64MB
checkpoint_completion_target = 0.9
wal_buffers = 16MB
default_statistics_target = 100
random_page_cost = 1.1
effective_io_concurrency = 200

-- Connection pooling
max_connections = 100
```

#### **Database Indexes**
```sql
-- Performance indexes for production
CREATE INDEX CONCURRENTLY idx_sales_machine_timestamp_status 
ON sales(machine_id, timestamp DESC, payment_status);

CREATE INDEX CONCURRENTLY idx_inventory_machine_active_sprays 
ON inventories(machine_id, is_active, remaining_sprays) 
WHERE is_active = true;

CREATE INDEX CONCURRENTLY idx_spray_logs_timestamp 
ON spray_logs(timestamp DESC);

-- Analyze tables for query planning
ANALYZE sales;
ANALYZE inventories;
ANALYZE machines;
```

### SSL/TLS Configuration

#### **Let's Encrypt Setup**
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Generate certificate
sudo certbot --nginx -d your-domain.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

#### **Nginx SSL Configuration**
```nginx
# SSL optimizations
ssl_protocols TLSv1.2 TLSv1.3;
ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384;
ssl_prefer_server_ciphers off;
ssl_session_cache shared:SSL:10m;
ssl_session_timeout 10m;
ssl_stapling on;
ssl_stapling_verify on;

# Security headers
add_header Strict-Transport-Security "max-age=63072000" always;
add_header X-Content-Type-Options nosniff;
add_header X-Frame-Options DENY;
add_header X-XSS-Protection "1; mode=block";
add_header Referrer-Policy "strict-origin-when-cross-origin";
```

### Backup Strategy

#### **Database Backup Script**
```bash
#!/bin/bash
# backup.sh

# Configuration
DB_NAME="aurova_production"
DB_USER="aurova_user"
BACKUP_DIR="/var/backups/aurova"
DATE=$(date +%Y%m%d_%H%M%S)

# Create backup directory
mkdir -p $BACKUP_DIR

# Database backup
pg_dump -U $DB_USER -h localhost $DB_NAME | gzip > $BACKUP_DIR/db_backup_$DATE.sql.gz

# File backup
tar -czf $BACKUP_DIR/files_backup_$DATE.tar.gz /var/www/aurova-erp/public/uploads

# Cleanup old backups (keep 30 days)
find $BACKUP_DIR -name "*.gz" -mtime +30 -delete

echo "Backup completed: $DATE"
```

#### **Automated Backup Cron**
```bash
# Setup daily backups
sudo crontab -e

# Add these lines:
# Daily database backup at 2 AM
0 2 * * * /var/scripts/backup.sh

# Weekly full system backup
0 3 * * 0 /var/scripts/full-backup.sh
```

### Monitoring Setup

#### **System Monitoring with PM2**
```bash
# Install PM2 monitoring
pm2 install pm2-server-monit

# Monitor with web interface
pm2 web

# Set up log rotation
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 30
```

#### **Application Health Monitoring**
```typescript
// src/app/api/health/route.ts
export async function GET() {
  try {
    // Database health check
    await prisma.$queryRaw`SELECT 1`
    
    // Memory usage check
    const memUsage = process.memoryUsage()
    const memoryHealthy = memUsage.heapUsed < 500 * 1024 * 1024 // 500MB limit
    
    // Disk space check
    const stats = await fs.promises.statfs('./public/uploads')
    const diskHealthy = (stats.bavail / stats.blocks) > 0.1 // 10% free space
    
    const health = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: 'connected',
      memory: {
        used: Math.round(memUsage.heapUsed / 1024 / 1024) + 'MB',
        healthy: memoryHealthy
      },
      disk: {
        healthy: diskHealthy
      },
      uptime: process.uptime()
    }
    
    return NextResponse.json(health)
  } catch (error) {
    return NextResponse.json(
      { status: 'unhealthy', error: error.message },
      { status: 500 }
    )
  }
}
```

---

## 📊 MONITORING & LOGGING

### Logging Strategy

#### **Application Logging**
```typescript
// src/lib/logger.ts
import fs from 'fs'
import path from 'path'

interface LogEntry {
  timestamp: string
  level: 'info' | 'warn' | 'error' | 'debug'
  message: string
  meta?: any
}

class Logger {
  private logDir = '/var/log/aurova'
  
  constructor() {
    // Ensure log directory exists
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true })
    }
  }
  
  private writeLog(entry: LogEntry) {
    const logFile = path.join(this.logDir, `${entry.level}.log`)
    const logLine = JSON.stringify(entry) + '\n'
    
    fs.appendFileSync(logFile, logLine)
    
    // Also log to console in development
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[${entry.level.toUpperCase()}] ${entry.message}`, entry.meta || '')
    }
  }
  
  info(message: string, meta?: any) {
    this.writeLog({
      timestamp: new Date().toISOString(),
      level: 'info',
      message,
      meta
    })
  }
  
  error(message: string, error?: Error | any) {
    this.writeLog({
      timestamp: new Date().toISOString(),
      level: 'error',
      message,
      meta: error instanceof Error ? {
        name: error.name,
        message: error.message,
        stack: error.stack
      } : error
    })
  }
  
  warn(message: string, meta?: any) {
    this.writeLog({
      timestamp: new Date().toISOString(),
      level: 'warn',
      message,
      meta
    })
  }
}

export const logger = new Logger()
```

#### **Request Logging Middleware**
```typescript
// src/lib/requestLogger.ts
export function requestLogger(req: NextRequest) {
  const start = Date.now()
  const requestId = Math.random().toString(36).substr(2, 9)
  
  logger.info('Request started', {
    requestId,
    method: req.method,
    url: req.url,
    userAgent: req.headers.get('user-agent'),
    ip: req.ip
  })
  
  return {
    requestId,
    end: (status: number, error?: Error) => {
      const duration = Date.now() - start
      
      if (error) {
        logger.error('Request failed', {
          requestId,
          status,
          duration,
          error: error.message
        })
      } else {
        logger.info('Request completed', {
          requestId,
          status,
          duration
        })
      }
    }
  }
}
```

### Performance Monitoring

#### **API Performance Tracking**
```typescript
// src/lib/performance.ts
export class PerformanceMonitor {
  private static metrics: Map<string, number[]> = new Map()
  
  static recordApiCall(endpoint: string, duration: number) {
    if (!this.metrics.has(endpoint)) {
      this.metrics.set(endpoint, [])
    }
    
    const durations = this.metrics.get(endpoint)!
    durations.push(duration)
    
    // Keep only last 100 measurements
    if (durations.length > 100) {
      durations.shift()
    }
  }
  
  static getStats(endpoint: string) {
    const durations = this.metrics.get(endpoint) || []
    if (durations.length === 0) return null
    
    const avg = durations.reduce((a, b) => a + b, 0) / durations.length
    const sorted = [...durations].sort((a, b) => a - b)
    const p95 = sorted[Math.floor(sorted.length * 0.95)]
    const p99 = sorted[Math.floor(sorted.length * 0.99)]
    
    return {
      count: durations.length,
      avg: Math.round(avg),
      p95: Math.round(p95),
      p99: Math.round(p99),
      min: Math.min(...durations),
      max: Math.max(...durations)
    }
  }
}
```

#### **Database Query Monitoring**
```typescript
// src/lib/queryMonitor.ts
export const queryMonitor = {
  logSlowQueries: (query: string, duration: number, params?: any) => {
    if (duration > 1000) { // Log queries taking more than 1 second
      logger.warn('Slow database query detected', {
        query,
        duration,
        params
      })
    }
  },
  
  async withTiming<T>(operation: () => Promise<T>, operationName: string): Promise<T> {
    const start = Date.now()
    try {
      const result = await operation()
      const duration = Date.now() - start
      
      PerformanceMonitor.recordApiCall(`db:${operationName}`, duration)
      this.logSlowQueries(operationName, duration)
      
      return result
    } catch (error) {
      const duration = Date.now() - start
      logger.error('Database operation failed', {
        operation: operationName,
        duration,
        error
      })
      throw error
    }
  }
}
```

### Error Tracking

#### **Error Handling & Reporting**
```typescript
// src/lib/errorHandler.ts
export class ErrorHandler {
  static async handle(error: Error, context: {
    userId?: number
    requestId?: string
    endpoint?: string
    additionalInfo?: any
  }) {
    // Log error
    logger.error('Application error', {
      ...context,
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack
      }
    })
    
    // Send to external error tracking service (if configured)
    if (process.env.ERROR_TRACKING_URL) {
      try {
        await fetch(process.env.ERROR_TRACKING_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            error: {
              name: error.name,
              message: error.message,
              stack: error.stack
            },
            context,
            timestamp: new Date().toISOString()
          })
        })
      } catch (reportingError) {
        logger.error('Failed to report error to tracking service', reportingError)
      }
    }
    
    // Critical errors - send immediate alerts
    if (this.isCriticalError(error)) {
      await this.sendAlert(error, context)
    }
  }
  
  private static isCriticalError(error: Error): boolean {
    const criticalPatterns = [
      'database connection',
      'payment gateway',
      'authentication failure',
      'ECONNREFUSED',
      'ENOTFOUND'
    ]
    
    return criticalPatterns.some(pattern => 
      error.message.toLowerCase().includes(pattern)
    )
  }
  
  private static async sendAlert(error: Error, context: any) {
    // Send email alert to admin team
    if (process.env.ALERT_EMAIL) {
      try {
        // Implementation would use nodemailer or similar
        await sendEmailAlert({
          to: process.env.ALERT_EMAIL,
          subject: `CRITICAL ERROR - Aurova ERP`,
          body: `
            Critical error detected:
            
            Error: ${error.message}
            Endpoint: ${context.endpoint}
            Time: ${new Date().toISOString()}
            
            Stack trace:
            ${error.stack}
          `
        })
      } catch (alertError) {
        logger.error('Failed to send alert email', alertError)
      }
    }
  }
}
```

### System Metrics Collection

#### **Metrics API Endpoint**
```typescript
// src/app/api/metrics/route.ts
export async function GET() {
  try {
    // System metrics
    const memUsage = process.memoryUsage()
    const cpuUsage = process.cpuUsage()
    
    // Database metrics
    const dbStats = await prisma.$queryRaw`
      SELECT 
        schemaname,
        tablename,
        n_tup_ins as inserts,
        n_tup_upd as updates,
        n_tup_del as deletes,
        n_live_tup as live_tuples,
        n_dead_tup as dead_tuples
      FROM pg_stat_user_tables
      ORDER BY n_live_tup DESC
    `
    
    // Application metrics
    const activeConnections = await prisma.$queryRaw`
      SELECT count(*) as connections 
      FROM pg_stat_activity 
      WHERE state = 'active'
    `
    
    // API performance metrics
    const apiStats = {}
    for (const [endpoint, stats] of Object.entries(PerformanceMonitor.getAllStats())) {
      apiStats[endpoint] = stats
    }
    
    const metrics = {
      timestamp: new Date().toISOString(),
      system: {
        memory: {
          used: Math.round(memUsage.heapUsed / 1024 / 1024),
          total: Math.round(memUsage.heapTotal / 1024 / 1024),
          external: Math.round(memUsage.external / 1024 / 1024)
        },
        cpu: {
          user: cpuUsage.user,
          system: cpuUsage.system
        },
        uptime: process.uptime()
      },
      database: {
        connections: activeConnections[0].connections,
        tables: dbStats
      },
      api: apiStats
    }
    
    return NextResponse.json(metrics)
  } catch (error) {
    logger.error('Failed to collect metrics', error)
    return NextResponse.json(
      { error: 'Failed to collect metrics' },
      { status: 500 }
    )
  }
}
```

---

## ⚡ PERFORMANCE OPTIMIZATION

### Frontend Optimization

#### **Next.js Optimizations**
```typescript
// next.config.js
const nextConfig = {
  // Enable experimental features
  experimental: {
    optimizeCss: true,
    optimizeServerReact: true
  },
  
  // Image optimization
  images: {
    domains: ['backava.salestestinglive.com'],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60 * 60 * 24 * 30 // 30 days
  },
  
  // Compression
  compress: true,
  
  // Bundle analyzer (development only)
  ...(process.env.ANALYZE === 'true' && {
    webpack: (config) => {
      config.plugins.push(new BundleAnalyzerPlugin())
      return config
    }
  }),
  
  // Headers for caching
  async headers() {
    return [
      {
        source: '/api/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      }
    ]
  }
}
```

#### **Component Optimization**
```typescript
// src/components/OptimizedTable.tsx
import { memo, useMemo, useCallback } from 'react'
import { FixedSizeList as List } from 'react-window'

interface TableProps {
  data: any[]
  columns: Column[]
  pageSize?: number
}

const OptimizedTable = memo<TableProps>(({ data, columns, pageSize = 50 }) => {
  // Memoize filtered and sorted data
  const processedData = useMemo(() => {
    return data.slice(0, pageSize)
  }, [data, pageSize])
  
  // Memoize row renderer
  const Row = useCallback(({ index, style }) => {
    const item = processedData[index]
    return (
      <div style={style} className="table-row">
        {columns.map(col => (
          <div key={col.key} className="table-cell">
            {col.render ? col.render(item[col.key], item) : item[col.key]}
          </div>
        ))}
      </div>
    )
  }, [processedData, columns])
  
  return (
    <div className="optimized-table">
      <List
        height={600}
        itemCount={processedData.length}
        itemSize={50}
        overscanCount={5}
      >
        {Row}
      </List>
    </div>
  )
})

export default OptimizedTable
```

### Backend Optimization

#### **Database Query Optimization**
```typescript
// src/lib/optimizedQueries.ts
export class OptimizedQueries {
  // Efficient dashboard stats query
  static async getDashboardStats(userId: number, userRole: string) {
    const whereClause = userRole === 'admin' 
      ? {} 
      : { userAssignments: { some: { userId } } }
    
    // Single query with aggregations
    const stats = await prisma.machine.aggregateRaw({
      pipeline: [
        { $match: whereClause },
        {
          $lookup: {
            from: 'sales',
            localField: '_id',
            foreignField: 'machineId',
            as: 'sales'
          }
        },
        {
          $project: {
            totalRevenue: {
              $sum: {
                $filter: {
                  input: '$sales',
                  cond: { $eq: ['$this.paymentStatus', 'completed'] }
                }
              }
            },
            todayRevenue: {
              $sum: {
                $filter: {
                  input: '$sales',
                  cond: {
                    $and: [
                      { $eq: ['$this.paymentStatus', 'completed'] },
                      { $gte: ['$this.timestamp', new Date().setHours(0,0,0,0)] }
                    ]
                  }
                }
              }
            }
          }
        }
      ]
    })
    
    return stats
  }
  
  // Efficient inventory with low stock detection
  static async getInventoryWithStockLevels(machineIds?: number[]) {
    return await prisma.inventory.findMany({
      where: {
        isActive: true,
        ...(machineIds && { machineId: { in: machineIds } })
      },
      select: {
        id: true,
        remainingSprays: true,
        totalSprays: true,
        machine: {
          select: { id: true, name: true }
        },
        product: {
          select: { id: true, name: true }
        }
      },
      orderBy: [
        // Low stock items first
        { remainingSprays: 'asc' },
        { totalSprays: 'desc' }
      ]
    })
  }
}
```

#### **Caching Strategy**
```typescript
// src/lib/cache.ts
class MemoryCache {
  private cache = new Map<string, { data: any; expires: number }>()
  
  set(key: string, data: any, ttlSeconds: number = 300) {
    const expires = Date.now() + (ttlSeconds * 1000)
    this.cache.set(key, { data, expires })
  }
  
  get(key: string) {
    const item = this.cache.get(key)
    if (!item) return null
    
    if (Date.now() > item.expires) {
      this.cache.delete(key)
      return null
    }
    
    return item.data
  }
  
  clear() {
    this.cache.clear()
  }
  
  // Cleanup expired entries
  cleanup() {
    const now = Date.now()
    for (const [key, item] of this.cache.entries()) {
      if (now > item.expires) {
        this.cache.delete(key)
      }
    }
  }
}

export const cache = new MemoryCache()

// Cleanup every 5 minutes
setInterval(() => cache.cleanup(), 5 * 60 * 1000)

// Cache wrapper for expensive operations
export async function withCache<T>(
  key: string,
  fn: () => Promise<T>,
  ttl: number = 300
): Promise<T> {
  const cached = cache.get(key)
  if (cached) return cached
  
  const result = await fn()
  cache.set(key, result, ttl)
  return result
}
```

### Database Optimization

#### **Connection Pooling**
```typescript
// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client'

// Configure connection pooling
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  },
  log: process.env.NODE_ENV === 'development' 
    ? ['query', 'error', 'warn'] 
    : ['error'],
})

// Connection pool configuration in DATABASE_URL
// postgresql://user:pass@host:port/db?connection_limit=20&pool_timeout=10

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}
```

#### **Query Optimization Techniques**
```sql
-- Add indexes for common query patterns
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_sales_machine_payment_time 
ON sales(machine_id, payment_status, timestamp DESC);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_inventory_machine_active 
ON inventories(machine_id, is_active) 
WHERE is_active = true;

-- Partial indexes for specific use cases
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_sales_pending_recent 
ON sales(timestamp DESC) 
WHERE payment_status = 'pending' 
AND timestamp > NOW() - INTERVAL '24 hours';

-- Optimize revenue calculations
CREATE MATERIALIZED VIEW daily_revenue_summary AS
SELECT 
  machine_id,
  DATE(timestamp) as date,
  SUM(amount) as total_revenue,
  COUNT(*) as transaction_count,
  SUM(sprays) as total_sprays
FROM sales 
WHERE payment_status = 'completed'
GROUP BY machine_id, DATE(timestamp);

-- Refresh materialized view daily
CREATE INDEX ON daily_revenue_summary(machine_id, date);
```

---

## 🔧 TROUBLESHOOTING GUIDE

### Common Issues & Solutions

#### **1. Database Connection Issues**

**Symptoms:**
- `ECONNREFUSED` errors
- "Database connection failed" messages
- Application startup failures

**Diagnosis:**
```bash
# Check PostgreSQL status
sudo systemctl status postgresql

# Test database connection
psql -h localhost -U aurova_user -d aurova_production

# Check connection count
psql -c "SELECT count(*) FROM pg_stat_activity;"
```

**Solutions:**
```bash
# Restart PostgreSQL
sudo systemctl restart postgresql

# Check connection limits
psql -c "SHOW max_connections;"

# Optimize connection pool
# Edit DATABASE_URL to include connection_limit parameter
DATABASE_URL="postgresql://user:pass@host:port/db?connection_limit=20"
```

#### **2. Payment Webhook Issues**

**Symptoms:**
- Payments stuck in "pending" status
- Webhook signature verification failures
- Missing payment completions

**Diagnosis:**
```bash
# Check webhook logs
tail -f /var/log/aurova/info.log | grep webhook

# Test webhook endpoint
curl -X POST https://your-domain.com/api/webhooks/debug

# Verify Razorpay configuration
curl -X GET https://your-domain.com/api/webhooks/debug
```

**Solutions:**
```typescript
// Debug webhook signature verification
export function debugWebhookSignature(body: string, signature: string) {
  console.log('Webhook Debug:', {
    bodyLength: body.length,
    signature,
    secretLength: process.env.RAZORPAY_WEBHOOK_SECRET?.length,
    expectedSignature: crypto
      .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET!)
      .update(body)
      .digest('hex')
  })
}
```

#### **3. Memory Leaks & Performance Issues**

**Symptoms:**
- Increasing memory usage over time
- Slow API response times
- Application crashes with out-of-memory errors

**Diagnosis:**
```bash
# Monitor memory usage
pm2 monit

# Check heap usage
node --inspect=0.0.0.0:9229 your-app.js
# Open chrome://inspect in browser

# Profile API performance
curl -w "@curl-format.txt" -o /dev/null -s "https://your-domain.com/api/dashboard/stats"
```

**Solutions:**
```typescript
// Implement memory monitoring
setInterval(() => {
  const memUsage = process.memoryUsage()
  if (memUsage.heapUsed > 500 * 1024 * 1024) { // 500MB threshold
    logger.warn('High memory usage detected', {
      heapUsed: Math.round(memUsage.heapUsed / 1024 / 1024) + 'MB',
      heapTotal: Math.round(memUsage.heapTotal / 1024 / 1024) + 'MB'
    })
    
    // Force garbage collection if available
    if (global.gc) {
      global.gc()
    }
  }
}, 60000) // Check every minute
```

#### **4. Cron Job Failures**

**Symptoms:**
- Payment sync not running
- Cron process crashes
- No cron logs generated

**Diagnosis:**
```bash
# Check PM2 cron process
pm2 list | grep cron

# Check cron logs
pm2 logs aurova-cron

# Manual cron test
npm run cron:test
```

**Solutions:**
```bash
# Restart cron jobs
pm2 restart aurova-cron

# Check for TypeScript compilation issues
npm run build

# Ensure ts-node is installed
npm install ts-node
```

#### **5. File Upload Issues**

**Symptoms:**
- Images not displaying
- File upload errors
- 404 errors for image URLs

**Diagnosis:**
```bash
# Check upload directory permissions
ls -la /var/www/aurova-erp/public/uploads

# Check disk space
df -h

# Test image serving
curl -I https://your-domain.com/api/images/test-image.jpg
```

**Solutions:**
```bash
# Fix permissions
sudo chown -R www-data:www-data /var/www/aurova-erp/public/uploads
sudo chmod -R 755 /var/www/aurova-erp/public/uploads

# Create upload directory if missing
mkdir -p /var/www/aurova-erp/public/uploads

# Configure Nginx for static files
# Add to nginx config:
location /api/images/ {
    alias /var/www/aurova-erp/public/uploads/;
    expires 30d;
    add_header Cache-Control "public, immutable";
}
```

### Emergency Procedures

#### **Database Recovery**
```bash
# Create emergency backup
pg_dump aurova_production > emergency_backup.sql

# Restore from backup
psql aurova_production < backup_file.sql

# Reset sequences after restore
psql aurova_production -c "
  SELECT setval(pg_get_serial_sequence('users', 'id'), 
                (SELECT MAX(id) FROM users));
  SELECT setval(pg_get_serial_sequence('machines', 'id'), 
                (SELECT MAX(id) FROM machines));
"
```

#### **Emergency Rollback**
```bash
# Quick rollback to previous version
git checkout HEAD~1
npm ci --only=production
npm run build
pm2 restart all

# Database rollback (if needed)
npx prisma migrate reset --force
npx prisma db seed
```

#### **Emergency Access**
```sql
-- Create emergency admin user
INSERT INTO users (email, password_hash, name, role, is_active)
VALUES (
  'emergency@aurova.in',
  '$2a$12$emergency_hash_here',
  'Emergency Admin',
  'admin',
  true
);
```

### Debugging Tools

#### **Debug Endpoints**
```typescript
// src/app/api/debug/system/route.ts
export async function GET() {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Debug endpoints disabled in production' }, { status: 404 })
  }
  
  const systemInfo = {
    nodejs: process.version,
    platform: process.platform,
    arch: process.arch,
    memory: process.memoryUsage(),
    uptime: process.uptime(),
    env: {
      NODE_ENV: process.env.NODE_ENV,
      DATABASE_URL: process.env.DATABASE_URL ? 'configured' : 'missing',
      RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID ? 'configured' : 'missing'
    }
  }
  
  return NextResponse.json(systemInfo)
}
```

#### **Performance Profiling**
```bash
# Enable Node.js profiling
node --prof your-app.js

# Generate profile report
node --prof-process isolate-0x*.log > profile.txt

# Memory profiling with heapdump
npm install heapdump
node -e "require('heapdump').writeSnapshot('./heap.heapsnapshot')"
```

---

## 🔄 DEVELOPMENT WORKFLOW

### Git Workflow

#### **Branch Strategy**
```
main (production)
├── develop (staging)
│   ├── feature/payment-optimization
│   ├── feature/new-dashboard-widgets
│   └── bugfix/inventory-calculation
└── hotfix/critical-payment-fix
```

#### **Commit Convention**
```bash
# Format: type(scope): description
feat(auth): add multi-factor authentication
fix(payments): resolve webhook signature verification
docs(api): update endpoint documentation
test(integration): add payment flow tests
refactor(database): optimize query performance
chore(deps): update dependencies
```

#### **Pull Request Template**
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] E2E tests pass
- [ ] Manual testing completed

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No console.log statements in production code
```

### Development Commands

#### **Database Management**
```bash
# Development workflow
npm run db:generate     # Generate Prisma client
npm run db:push        # Push schema changes
npm run db:migrate     # Create migration
npm run db:seed        # Seed with test data
npm run db:reset       # Reset database
npm run db:studio      # Open Prisma Studio

# Production workflow
npm run db:deploy      # Deploy migrations to production
npm run db:backup      # Create database backup
```

#### **Code Quality**
```bash
# Linting and formatting
npm run lint           # ESLint
npm run lint:fix       # Fix auto-fixable issues
npm run format         # Prettier formatting
npm run type-check     # TypeScript checking

# Testing
npm run test           # Unit tests
npm run test:watch     # Watch mode
npm run test:coverage  # Coverage report
npm run test:e2e       # End-to-end tests
```

### Environment Management

#### **Environment Switching**
```bash
# Development
cp .env.development .env.local

# Staging
cp .env.staging .env.local

# Production
cp .env.production .env.local
```

#### **Configuration Validation**
```typescript
// src/lib/config.ts
import { z } from 'zod'

const configSchema = z.object({
  NODE_ENV: z.enum(['development', 'staging', 'production']),
  DATABASE_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string().min(32),
  JWT_SECRET: z.string().min(32),
  RAZORPAY_KEY_ID: z.string().startsWith('rzp_'),
  RAZORPAY_KEY_SECRET: z.string(),
  RAZORPAY_WEBHOOK_SECRET: z.string().length(64)
})

export function validateConfig() {
  try {
    configSchema.parse(process.env)
    console.log('✅ Configuration validation passed')
  } catch (error) {
    console.error('❌ Configuration validation failed:', error.errors)
    process.exit(1)
  }
}
```

---

## 📏 CODE QUALITY & STANDARDS

### TypeScript Configuration

#### **tsconfig.json**
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },
    "forceConsistentCasingInFileNames": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### ESLint Configuration

#### **.eslintrc.json**
```json
{
  "extends": [
    "next/core-web-vitals",
    "@typescript-eslint/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/explicit-function-return-type": "warn",
    "@typescript-eslint/no-explicit-any": "warn",
    "prefer-const": "error",
    "no-var": "error",
    "no-console": "warn",
    "eqeqeq": "error",
    "curly": "error"
  },
  "overrides": [
    {
      "files": ["*.test.ts", "*.test.tsx"],
      "rules": {
        "@typescript-eslint/no-explicit-any": "off"
      }
    }
  ]
}
```

### Code Standards

#### **Naming Conventions**
```typescript
// Files: kebab-case
user-management.ts
payment-processor.ts

// Components: PascalCase
UserManagement.tsx
PaymentProcessor.tsx

// Variables/Functions: camelCase
const userName = 'john'
function processPayment() {}

// Constants: SCREAMING_SNAKE_CASE
const MAX_RETRY_ATTEMPTS = 3
const API_BASE_URL = 'https://api.example.com'

// Types/Interfaces: PascalCase
interface UserData {
  id: number
  email: string
}

type PaymentStatus = 'pending' | 'completed' | 'failed'
```

#### **Function Documentation**
```typescript
/**
 * Processes a payment for a vending machine transaction
 * 
 * @param saleId - The unique identifier for the sale
 * @param paymentData - Payment information from Razorpay
 * @returns Promise resolving to payment completion status
 * 
 * @throws {PaymentError} When payment verification fails
 * @throws {DatabaseError} When database update fails
 * 
 * @example
 * ```typescript
 * const result = await processPayment(123, {
 *   razorpayOrderId: 'order_123',
 *   razorpayPaymentId: 'pay_456'
 * })
 * ```
 */
export async function processPayment(
  saleId: number,
  paymentData: PaymentData
): Promise<PaymentResult> {
  // Implementation
}
```

#### **Error Handling Standards**
```typescript
// Custom error classes
export class PaymentError extends Error {
  constructor(
    message: string,
    public code: string,
    public details?: any
  ) {
    super(message)
    this.name = 'PaymentError'
  }
}

// Error handling pattern
export async function apiHandler(req: NextRequest) {
  try {
    const result = await businessLogic()
    return NextResponse.json({ success: true, data: result })
  } catch (error) {
    if (error instanceof PaymentError) {
      return NextResponse.json(
        { success: false, error: error.message, code: error.code },
        { status: 400 }
      )
    }
    
    logger.error('Unexpected error in API handler', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
```

---

## 📚 FINAL NOTES & BEST PRACTICES

### Security Best Practices

1. **Environment Variables**: Never commit secrets to version control
2. **Input Validation**: Validate all API inputs with Zod schemas
3. **Authentication**: Use JWT with proper expiration times
4. **Rate Limiting**: Implement rate limiting on public endpoints
5. **HTTPS**: Always use HTTPS in production
6. **Database**: Use parameterized queries to prevent SQL injection

### Performance Best Practices

1. **Database Indexing**: Create indexes for frequently queried columns
2. **Caching**: Implement appropriate caching strategies
3. **Bundle Size**: Monitor and optimize frontend bundle size
4. **Memory Management**: Regularly monitor memory usage
5. **Connection Pooling**: Use database connection pooling
6. **Image Optimization**: Optimize images and use appropriate formats

### Deployment Best Practices

1. **Zero Downtime**: Use rolling deployments
2. **Health Checks**: Implement comprehensive health checks
3. **Monitoring**: Set up proper logging and monitoring
4. **Backups**: Implement automated backup strategies
5. **Rollback Plan**: Have a tested rollback procedure
6. **Documentation**: Keep deployment documentation updated

### Maintenance Checklist

#### **Daily**
- [ ] Check application health endpoints
- [ ] Monitor error logs
- [ ] Verify payment sync is running
- [ ] Check system resource usage

#### **Weekly**
- [ ] Review performance metrics
- [ ] Check backup integrity
- [ ] Update dependencies (if needed)
- [ ] Review user feedback

#### **Monthly**
- [ ] Full system backup
- [ ] Security audit
- [ ] Performance optimization review
- [ ] Documentation updates

---

## 🎯 CONCLUSION

This technical documentation provides a comprehensive guide for maintaining, extending, and deploying the Aurova ERP Dashboard. The system is designed with production-grade practices including:

- **Scalable Architecture**: Modular design that can grow with business needs
- **Robust Security**: Multi-layer security with role-based access control
- **Automated Operations**: Cron jobs for payment sync and system maintenance
- **Production Ready**: Complete deployment guides for various environments

The system is fully tested, documented, and ready for production deployment. Regular maintenance following the provided guidelines will ensure optimal performance and reliability.

For ongoing support and development, refer to the troubleshooting guide and maintain the established code quality standards. The modular architecture allows for easy extension and customization as business requirements evolve.

---

**Document Version:** 1.0  
**Last Updated:** December 2024  
**System Version:** Production Ready  
**Author:** Aurova Development Team  
**Contact:** support@aurova.in

*This technical documentation is comprehensive and should serve as the primary reference for all development, deployment, and maintenance activities related to the Aurova ERP Dashboard.*
