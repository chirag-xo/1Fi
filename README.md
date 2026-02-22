# 1Fi Assignment - SmartEMI

This project is a Next.js application built with the App Router, Prisma ORM, and PostgreSQL. It demonstrates a product display with EMI plans.

## i. Setup and Run Instructions

1. **Clone the repository** (or navigate to the project directory).
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Environment Setup**:
   Create a `.env` file in the root directory based on `.env.local.example` and add your PostgreSQL database connection string:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
   ```
4. **Database Setup**:
   Generate the Prisma client, push the schema to the database, and seed it with initial data:
   ```bash
   npm run db:generate
   npm run db:push
   npm run db:seed
   ```
5. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## ii. API Endpoints and Example Responses

### 1. Get All Products
- **Endpoint**: `GET /api/products`
- **Description**: Retrieves a list of all products along with the count of their variants and EMI plans.
- **Example Response**:
  ```json
  {
    "data": [
      {
        "id": "cuid123",
        "name": "Smartphone X",
        "slug": "smartphone-x",
        "brand": "TechCorp",
        "mrp": 999.99,
        "price": 899.99,
        "imageUrl": "https://example.com/image.png",
        "description": "Latest smartphone model.",
        "createdAt": "2023-10-01T10:00:00.000Z",
        "updatedAt": "2023-10-01T10:00:00.000Z",
        "_count": {
          "emiPlans": 4,
          "variants": 2
        }
      }
    ]
  }
  ```

### 2. Get Product Details by Slug
- **Endpoint**: `GET /api/products/:slug`
- **Description**: Retrieves detailed information for a specific product, including its variants and EMI plans (ordered by tenure).
- **Example Response**:
  ```json
  {
    "data": {
      "id": "cuid123",
      "name": "Smartphone X",
      "slug": "smartphone-x",
      "description": "Latest smartphone model.",
      "brand": "TechCorp",
      "mrp": 999.99,
      "price": 899.99,
      "imageUrl": "https://example.com/image.png",
      "createdAt": "2023-10-01T10:00:00.000Z",
      "updatedAt": "2023-10-01T10:00:00.000Z",
      "variants": [
        {
          "id": "var1",
          "productId": "cuid123",
          "color": "Black",
          "storage": "256GB",
          "imageUrl": "https://example.com/black.png"
        }
      ],
      "emiPlans": [
        {
          "id": "emi1",
          "productId": "cuid123",
          "tenure": 3,
          "monthlyPayment": 300.00,
          "interestRate": 0,
          "cashback": 50,
          "totalPayment": 900.00,
          "recommended": true,
          "tag": "Best Value"
        }
      ]
    }
  }
  ```

## iii. Tech Stack Used

- **Framework**: Next.js 15.5 (App Router)
- **UI & Libraries**: React 19, Tailwind CSS, Lucide React
- **Language**: TypeScript
- **Database & ORM**: PostgreSQL, Prisma
- **Animations**: Framer Motion, GSAP
- **Data Visualization**: Recharts

## iv. Schema Used

The database schema is designed using Prisma and consists of three main models: `Product`, `Variant`, and `EmiPlan`.

```prisma
model Product {
  id          String     @id @default(cuid())
  name        String
  slug        String     @unique
  description String?
  brand       String
  mrp         Float
  price       Float
  imageUrl    String?
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt
  variants    Variant[]
  emiPlans    EmiPlan[]

  @@index([slug])
}

model Variant {
  id        String  @id @default(cuid())
  productId String
  color     String
  storage   String
  imageUrl  String?
  product   Product @relation(fields: [productId], references: [id], onDelete: Cascade)

  @@index([productId])
}

model EmiPlan {
  id             String  @id @default(cuid())
  productId      String
  tenure         Int     // months
  monthlyPayment Float
  interestRate   Float   // annual %
  cashback       Float   @default(0)
  totalPayment   Float
  recommended    Boolean @default(false)
  tag            String? // "Best Value" | "Lowest Cost" | "Most Popular" | "Lowest EMI"
  product        Product @relation(fields: [productId], references: [id], onDelete: Cascade)

  @@index([productId])
}
```
