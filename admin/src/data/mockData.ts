export const mockProducts = [
  {
    id: 1,
    title: "Camisa Polo Básica",
    summary: "Camisa polo básica de alta qualidade",
    description: "Camisa polo confeccionada em algodão premium, ideal para o dia a dia",
    brand: "Nike",
    price: 89.90,
    last_price: 99.90,
    installments: 12,
    stock: 45,
    views: 120,
    added_to_cart: 25,
    added_to_wishlist: 8,
    categories: ["Roupas", "Masculino"],
    sizes: ["P", "M", "G", "GG"],
    flags: ["Promoção"],
    created_at: "2024-01-15T10:30:00Z",
    updated_at: "2024-01-20T14:15:00Z"
  },
  {
    id: 2,
    title: "Tênis Esportivo Air Max",
    summary: "Tênis esportivo para performance máxima",
    description: "Tênis desenvolvido com tecnologia Air Max para máximo conforto e performance durante exercícios",
    brand: "Nike",
    price: 299.90,
    last_price: 349.90,
    installments: 12,
    stock: 23,
    views: 89,
    added_to_cart: 12,
    added_to_wishlist: 15,
    categories: ["Calçados", "Esportivo"],
    sizes: ["38", "39", "40", "41", "42"],
    flags: ["Bestseller"],
    created_at: "2024-01-14T09:20:00Z",
    updated_at: "2024-01-19T16:45:00Z"
  },
  {
    id: 3,
    title: "Jaqueta Jeans Premium",
    summary: "Jaqueta jeans de corte premium",
    description: "Jaqueta jeans confeccionada com denim de alta qualidade, corte moderno e acabamento premium",
    brand: "Levi's",
    price: 189.90,
    last_price: 219.90,
    installments: 12,
    stock: 12,
    views: 45,
    added_to_cart: 8,
    added_to_wishlist: 5,
    categories: ["Roupas", "Jaquetas"],
    sizes: ["P", "M", "G"],
    flags: ["Novo"],
    created_at: "2024-01-13T11:15:00Z",
    updated_at: "2024-01-18T13:30:00Z"
  },
  {
    id: 4,
    title: "Smartphone Galaxy S24",
    summary: "Smartphone premium com IA avançada",
    description: "Smartphone Samsung Galaxy S24 com processador de última geração, câmera profissional e recursos de IA",
    brand: "Samsung",
    price: 2499.90,
    last_price: 2699.90,
    installments: 12,
    stock: 8,
    views: 234,
    added_to_cart: 15,
    added_to_wishlist: 28,
    categories: ["Eletrônicos", "Smartphones"],
    sizes: ["128GB", "256GB"],
    flags: ["Lançamento", "Premium"],
    created_at: "2024-01-12T08:45:00Z",
    updated_at: "2024-01-17T12:20:00Z"
  },
  {
    id: 5,
    title: "Notebook Gamer",
    summary: "Notebook para gaming de alta performance",
    description: "Notebook gamer ASUS com placa de vídeo dedicada, processador Intel i7 e 16GB RAM",
    brand: "ASUS",
    price: 3299.90,
    last_price: 3599.90,
    installments: 12,
    stock: 0,
    views: 156,
    added_to_cart: 5,
    added_to_wishlist: 22,
    categories: ["Eletrônicos", "Notebooks"],
    sizes: ["Intel i7 16GB", "Intel i9 32GB"],
    flags: ["Sem Estoque"],
    created_at: "2024-01-11T15:30:00Z",
    updated_at: "2024-01-16T10:45:00Z"
  }
];

export const mockUsers = [
  {
    id: 1,
    google_id: null,
    fullname: "João Silva Santos",
    username: "joao.silva",
    email: "joao.silva@email.com",
    password: "hashed_password",
    phone: "(11) 99999-1111",
    avatar: "https://lh3.googleusercontent.com/a/ACg8ocIjS-kV3SknQdY5dBfUaWuK0kp4WtnhGK89iRlo5OvjIdGGcjM=s96-c",
    birthdate: "1990-05-15",
    role_id: 2,
    document: "123.456.789-01",
    enable_2fa: false,
    role: { id: 2, name: "USER" },
    created_at: "2024-01-15T10:30:00Z",
    updated_at: "2024-01-20T14:15:00Z"
  },
  {
    id: 2,
    google_id: null,
    fullname: "Maria Oliveira Costa",
    username: "maria.oliveira",
    email: "maria.oliveira@email.com",
    password: "hashed_password",
    phone: "(11) 99999-2222",
    avatar: "https://lh3.googleusercontent.com/a/ACg8ocIjS-kV3SknQdY5dBfUaWuK0kp4WtnhGK89iRlo5OvjIdGGcjM=s96-c",
    birthdate: "1985-08-22",
    role_id: 2,
    document: "234.567.890-12",
    enable_2fa: true,
    role: { id: 2, name: "USER" },
    created_at: "2024-01-14T09:20:00Z",
    updated_at: "2024-01-19T16:45:00Z"
  },
  {
    id: 3,
    google_id: null,
    fullname: "Pedro Santos Lima",
    username: "pedro.santos",
    email: "pedro.santos@email.com",
    password: "hashed_password",
    phone: "(11) 99999-3333",
    avatar: "https://lh3.googleusercontent.com/a/ACg8ocIjS-kV3SknQdY5dBfUaWuK0kp4WtnhGK89iRlo5OvjIdGGcjM=s96-c",
    birthdate: "1992-03-10",
    role_id: 2,
    document: "345.678.901-23",
    enable_2fa: false,
    role: { id: 2, name: "USER" },
    created_at: "2024-01-13T11:15:00Z",
    updated_at: "2024-01-18T13:30:00Z"
  },
  {
    id: 4,
    google_id: null,
    fullname: "Ana Carolina Ferreira",
    username: "ana.ferreira",
    email: "ana.ferreira@email.com",
    password: "hashed_password",
    phone: "(11) 99999-4444",
    avatar: "https://lh3.googleusercontent.com/a/ACg8ocIjS-kV3SknQdY5dBfUaWuK0kp4WtnhGK89iRlo5OvjIdGGcjM=s96-c",
    birthdate: "1988-12-05",
    role_id: 1,
    document: "456.789.012-34",
    enable_2fa: true,
    role: { id: 1, name: "ADMIN" },
    created_at: "2024-01-12T08:45:00Z",
    updated_at: "2024-01-20T12:20:00Z"
  },
  {
    id: 5,
    google_id: null,
    fullname: "Carlos Eduardo Souza",
    username: "carlos.souza",
    email: "carlos.souza@email.com",
    password: "hashed_password",
    phone: "(11) 99999-5555",
    avatar: "https://lh3.googleusercontent.com/a/ACg8ocIjS-kV3SknQdY5dBfUaWuK0kp4WtnhGK89iRlo5OvjIdGGcjM=s96-c",
    birthdate: "1995-07-18",
    role_id: 2,
    document: "567.890.123-45",
    enable_2fa: false,
    role: { id: 2, name: "USER" },
    created_at: "2024-01-11T15:30:00Z",
    updated_at: "2024-01-17T10:45:00Z"
  }
];

export const mockTransactions = [
  {
    id: 1,
    user_id: 1,
    user: { fullname: "João Silva Santos", email: "joao.silva@email.com" },
    total_amount: 389.80,
    status: "COMPLETED",
    payment_method: "Cartão de Crédito",
    created_at: "2024-01-20T10:30:00Z",
    invoices: [
      {
        id: 1,
        total_amount: 389.80,
        freight_fee: 15.90,
        payment_method_fee: 5.00,
        products: [
          { title: "Camisa Polo Básica", quantity: 2, price: 89.90 },
          { title: "Tênis Esportivo Air Max", quantity: 1, price: 299.90 }
        ]
      }
    ]
  },
  {
    id: 2,
    user_id: 2,
    user: { fullname: "Maria Oliveira Costa", email: "maria.oliveira@email.com" },
    total_amount: 2499.90,
    status: "SHIPPED",
    payment_method: "PIX",
    created_at: "2024-01-19T14:15:00Z",
    invoices: [
      {
        id: 2,
        total_amount: 2499.90,
        freight_fee: 0.00,
        payment_method_fee: 0.00,
        products: [
          { title: "Smartphone Galaxy S24", quantity: 1, price: 2499.90 }
        ]
      }
    ]
  },
  {
    id: 3,
    user_id: 3,
    user: { fullname: "Pedro Santos Lima", email: "pedro.santos@email.com" },
    total_amount: 189.90,
    status: "PENDING",
    payment_method: "Boleto",
    created_at: "2024-01-18T16:45:00Z",
    invoices: [
      {
        id: 3,
        total_amount: 189.90,
        freight_fee: 12.50,
        payment_method_fee: 2.50,
        products: [
          { title: "Jaqueta Jeans Premium", quantity: 1, price: 189.90 }
        ]
      }
    ]
  }
];

export const mockNotifications = [
  {
    id: 1,
    user_id: 1,
    title: "Pedido Confirmado",
    type: "order",
    message: "Seu pedido #001 foi confirmado e está sendo preparado para envio.",
    read_at: null,
    data: { order_id: 1, amount: 389.80 },
    deleted_at: null,
    created_at: "2024-01-20T10:30:00Z"
  },
  {
    id: 2,
    user_id: 2,
    title: "Produto Enviado",
    type: "shipping",
    message: "Seu produto foi enviado! Código de rastreamento: BR123456789",
    read_at: "2024-01-19T15:20:00Z",
    data: { tracking_code: "BR123456789" },
    deleted_at: null,
    created_at: "2024-01-19T14:15:00Z"
  },
  {
    id: 3,
    user_id: null,
    title: "Promoção Especial",
    type: "promotion",
    message: "Aproveite 20% de desconto em toda linha de eletrônicos!",
    read_at: null,
    data: { discount: 20, category: "eletrônicos" },
    deleted_at: null,
    created_at: "2024-01-18T09:00:00Z"
  }
];