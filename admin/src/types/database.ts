// Enums
export enum DeliveryStatus {
  PEDIDO_RECEBIDO = 'PEDIDO_RECEBIDO',
  PREPARANDO_PEDIDO = 'PREPARANDO_PEDIDO',
  PEDIDO_PRONTO = 'PEDIDO_PRONTO',
  SAIU_PARA_ENTREGA = 'SAIU_PARA_ENTREGA',
  EM_TRANSITO = 'EM_TRANSITO',
  ENTREGUE = 'ENTREGUE',
  TENTATIVA_ENTREGA = 'TENTATIVA_ENTREGA',
  REAGENDADO = 'REAGENDADO',
  DEVOLVIDO = 'DEVOLVIDO',
  CANCELADO = 'CANCELADO'
}

export enum Status {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  FAILED = 'FAILED'
}

// Base types
export interface Role {
  id: number
  name: string
  created_at: Date
  updated_at: Date
}

export interface User {
  id: number
  fullname: string
  username: string
  email: string
  password: string
  phone?: string
  avatar?: string
  birthdate?: Date
  role_id: number
  document?: string
  enable_2fa: boolean
  created_at: Date
  updated_at: Date
}

export interface Product {
  id: number
  title: string
  summary: string
  description: string
  brand: string
  price: number
  last_price: number
  installments: number
  blur?: string
  images?: string[]
  views: number
  added_to_cart: number
  added_to_wishlist: number
  details?: any
  flags?: string[]
  categories?: string[]
  sizes?: string[]
  stock: number
  created_at: Date
  updated_at: Date
}

export interface Address {
  id: number
  user_id: number
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  state: string
  zip_code: string
  country: string
  created_at: Date
  updated_at: Date
}

export interface Card {
  id: number
  user_id: number
  number: string
  holder_name: string
  expiry_date: string
  cvv: string
  created_at: Date
  updated_at: Date
}

export interface Notification {
  id: number
  user_id?: number
  title: string
  type: string
  message: string
  data?: any
  read: boolean
  created_at: Date
  updated_at: Date
}

export interface ProductComment {
  id: number
  user_id: number
  product_id: number
  comment: string
  rating: number
  created_at: Date
  updated_at: Date
}

export interface Cart {
  id: number
  user_id: number
  created_at: Date
  updated_at: Date
}

export interface CartItem {
  id: number
  cart_id: number
  product_id: number
  quantity: number
  created_at: Date
  updated_at: Date
}

export interface Transaction {
  id: number
  user_id: number
  status: Status
  total_amount: number
  payment_method: string
  created_at: Date
  updated_at: Date
}

export interface Invoice {
  id: number
  transaction_id: number
  coupon_id?: number
  subtotal: number
  discount: number
  total: number
  created_at: Date
  updated_at: Date
}

export interface InvoiceItem {
  id: number
  invoice_id: number
  product_id: number
  quantity: number
  unit_price: number
  total_price: number
  created_at: Date
  updated_at: Date
}

export interface Coupon {
  id: number
  code: string
  discount_type: string
  discount_value: number
  min_amount?: number
  max_uses?: number
  used_count: number
  expires_at?: Date
  created_at: Date
  updated_at: Date
}

export interface History {
  id: number
  transaction_id: number
  status: Status
  description?: string
  created_at: Date
  updated_at: Date
}

export interface Delivery {
  id: number
  transaction_id: number
  address_id: number
  status: DeliveryStatus
  tracking_code?: string
  estimated_delivery?: Date
  delivered_at?: Date
  created_at: Date
  updated_at: Date
}

// Relations types
export type ProductWithRelations = Product & {
  comments?: (ProductComment & { user?: User })[]
  cart_items?: CartItem[]
  invoices?: InvoiceItem[]
}

export type UserWithRelations = User & {
  role?: Role
  addresses?: Address[]
  cards?: Card[]
  notifications?: Notification[]
  comments?: (ProductComment & { product?: Product })[]
  carts?: (Cart & { items?: CartItem[] })[]
  transactions?: (Transaction & { invoices?: Invoice[] })[]
}

export type TransactionWithRelations = Transaction & {
  user?: User
  invoices?: InvoiceWithItems[]
  histories?: History[]
}

export type InvoiceWithItems = Invoice & {
  items?: InvoiceItemWithProduct[]
  coupon?: Coupon
  transaction?: Transaction
}

export type InvoiceItemWithProduct = InvoiceItem & {
  product?: Product
}

export type NotificationWithUser = Notification & {
  user?: User
}

// Form types
export interface ProductFormData {
  title: string
  summary: string
  description: string
  brand: string
  price: number
  last_price: number
  installments: number
  blur?: string
  details?: string[]
  images?: string[]
  flags?: string[]
  categories?: string[]
  sizes?: string[]
  stock: number
}

export interface UserFormData {
  fullname: string
  username: string
  email: string
  phone?: string
  avatar?: string
  birthdate?: Date
  role_id: number
  document?: string
  enable_2fa: boolean
}

export interface NotificationFormData {
  user_id?: number
  title: string
  type: string
  message: string
  data?: any
}
