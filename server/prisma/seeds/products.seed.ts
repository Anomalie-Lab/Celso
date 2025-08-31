import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const products = [
  // Produtos Farmacêuticos - Medicamentos
  {
    title: 'Paracetamol 500mg',
    summary: 'Analgésico e antitérmico para alívio de dores e febre',
    description: 'Analgésico e antitérmico para alívio de dores e febre. Indicado para dores de cabeça, dores musculares e febre.',
    brand: 'Laboratório Genérico',
    price: 8.90,
    last_price: 12.90,
    stock: 150,
    categories: ['MEDICAMENTOS', 'ANALGESICOS'],
    images: [
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop'
    ],
    flags: ['PRESCRICAO_MEDICA'],
    details: {
      principio_ativo: 'Paracetamol',
      concentracao: '500mg',
      apresentacao: 'Comprimidos',
      quantidade: '20 comprimidos',
      fabricante: 'Laboratório Genérico',
      registro_anvisa: '123456789'
    }
  },
  {
    title: 'Ibuprofeno 600mg',
    summary: 'Anti-inflamatório não esteroidal para alívio de dores',
    description: 'Anti-inflamatório não esteroidal para alívio de dores, inflamações e febre. Ideal para dores articulares.',
    brand: 'Laboratório Genérico',
    price: 12.50,
    last_price: 18.90,
    stock: 120,
    categories: ['MEDICAMENTOS', 'ANTI_INFLAMATORIOS'],
    images: [
      'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop'
    ],
    flags: ['PRESCRICAO_MEDICA'],
    details: {
      principio_ativo: 'Ibuprofeno',
      concentracao: '600mg',
      apresentacao: 'Comprimidos',
      quantidade: '15 comprimidos',
      fabricante: 'Laboratório Genérico',
      registro_anvisa: '987654321'
    }
  },
  {
    title: 'Dipirona 500mg',
    summary: 'Analgésico e antitérmico de ação rápida',
    description: 'Analgésico e antitérmico de ação rápida. Indicado para dores agudas e febre.',
    brand: 'Laboratório Genérico',
    price: 6.80,
    last_price: 9.90,
    stock: 200,
    categories: ['MEDICAMENTOS', 'ANALGESICOS'],
    images: [
      'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop'
    ],
    flags: ['PRESCRICAO_MEDICA'],
    details: {
      principio_ativo: 'Dipirona',
      concentracao: '500mg',
      apresentacao: 'Comprimidos',
      quantidade: '30 comprimidos',
      fabricante: 'Laboratório Genérico',
      registro_anvisa: '456789123'
    }
  },

  // Produtos Hospitalares - Equipamentos
  {
    title: 'Estetoscópio Littmann Classic III',
    summary: 'Estetoscópio profissional de alta qualidade',
    description: 'Estetoscópio profissional de alta qualidade para auscultação cardíaca e pulmonar. Ideal para médicos e estudantes.',
    brand: 'Littmann',
    price: 299.90,
    last_price: 399.90,
    stock: 25,
    categories: ['EQUIPAMENTOS', 'DIAGNOSTICO'],
    images: [
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop'
    ],
    flags: ['PROFISSIONAL'],
    details: {
      marca: 'Littmann',
      modelo: 'Classic III',
      material: 'Aço inoxidável',
      peso: '180g',
      garantia: '2 anos',
      certificacao: 'CE'
    }
  },
  {
    title: 'Esfigmomanômetro Aneróide',
    summary: 'Aparelho para medição de pressão arterial',
    description: 'Aparelho para medição de pressão arterial. Preciso e durável, ideal para uso profissional.',
    brand: 'Premium',
    price: 189.90,
    last_price: 249.90,
    stock: 40,
    categories: ['EQUIPAMENTOS', 'DIAGNOSTICO'],
    images: [
      'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=400&fit=crop'
    ],
    flags: ['PROFISSIONAL'],
    details: {
      marca: 'Premium',
      modelo: 'Aneróide Profissional',
      faixa_medicao: '0-300 mmHg',
      precisao: '±2 mmHg',
      material: 'Metal e borracha',
      garantia: '1 ano'
    }
  },
  {
    title: 'Termômetro Digital Infravermelho',
    summary: 'Termômetro digital sem contato',
    description: 'Termômetro digital sem contato para medição rápida e precisa da temperatura corporal.',
    brand: 'TechMed',
    price: 89.90,
    last_price: 129.90,
    stock: 60,
    categories: ['EQUIPAMENTOS', 'DIAGNOSTICO'],
    images: [
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=400&fit=crop'
    ],
    flags: ['PROFISSIONAL'],
    details: {
      marca: 'TechMed',
      modelo: 'InfraRed Pro',
      faixa_medicao: '32-42°C',
      precisao: '±0.2°C',
      tempo_medicao: '<1 segundo',
      bateria: '2x AAA',
      garantia: '1 ano'
    }
  },

  // Produtos Hospitalares - Consumíveis
  {
    title: 'Máscara N95 - Caixa com 20 unidades',
    summary: 'Máscara de proteção respiratória N95',
    description: 'Máscara de proteção respiratória N95. Alta eficiência de filtração para uso profissional.',
    brand: 'SafeMask',
    price: 45.90,
    last_price: 69.90,
    stock: 100,
    categories: ['CONSUMIVEIS', 'PROTECAO'],
    images: [
      'https://images.unsplash.com/photo-1584634731339-252c581abfc5?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop'
    ],
    flags: ['PROFISSIONAL'],
    details: {
      marca: 'SafeMask',
      modelo: 'N95 Profissional',
      eficiencia_filtracao: '95%',
      quantidade: '20 unidades',
      material: 'Poliéster e polipropileno',
      certificacao: 'ANVISA'
    }
  },
  {
    title: 'Luvas de Látex - Caixa com 100 unidades',
    summary: 'Luvas descartáveis de látex natural',
    description: 'Luvas descartáveis de látex natural. Ideais para procedimentos médicos e laboratoriais.',
    brand: 'SafeGlove',
    price: 32.90,
    last_price: 49.90,
    stock: 80,
    categories: ['CONSUMIVEIS', 'PROTECAO'],
    images: [
      'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1584634731339-252c581abfc5?w=400&h=400&fit=crop'
    ],
    flags: ['PROFISSIONAL'],
    details: {
      marca: 'SafeGlove',
      modelo: 'Látex Natural',
      tamanho: 'M',
      quantidade: '100 unidades',
      material: 'Látex natural',
      certificacao: 'ANVISA'
    }
  },
  {
    title: 'Seringa 10ml com Agulha',
    summary: 'Seringa descartável de 10ml com agulha',
    description: 'Seringa descartável de 10ml com agulha. Ideal para aplicação de medicamentos.',
    brand: 'SafeSyringe',
    price: 2.50,
    last_price: 3.90,
    stock: 500,
    categories: ['CONSUMIVEIS', 'INJETAVEIS'],
    images: [
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1584634731339-252c581abfc5?w=400&h=400&fit=crop'
    ],
    flags: ['PROFISSIONAL'],
    details: {
      marca: 'SafeSyringe',
      modelo: '10ml com Agulha',
      volume: '10ml',
      agulha: '21G x 1.5"',
      material: 'Polipropileno',
      certificacao: 'ANVISA'
    }
  },

  // Produtos Farmacêuticos - Suplementos
  {
    title: 'Vitamina C 1000mg',
    summary: 'Suplemento de vitamina C de alta absorção',
    description: 'Suplemento de vitamina C de alta absorção. Fortalece o sistema imunológico e combate radicais livres.',
    brand: 'NutriVita',
    price: 28.90,
    last_price: 39.90,
    stock: 75,
    categories: ['SUPLEMENTOS', 'VITAMINAS'],
    images: [
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop'
    ],
    flags: ['NATURAL'],
    details: {
      principio_ativo: 'Ácido Ascórbico',
      concentracao: '1000mg',
      apresentacao: 'Cápsulas',
      quantidade: '60 cápsulas',
      fabricante: 'NutriVita',
      registro_anvisa: '789123456'
    }
  },
  {
    title: 'Ômega 3 1000mg',
    summary: 'Suplemento de ômega 3 de peixe de águas profundas',
    description: 'Suplemento de ômega 3 de peixe de águas profundas. Benefícios para saúde cardiovascular e cerebral.',
    brand: 'NutriVita',
    price: 45.90,
    last_price: 59.90,
    stock: 50,
    categories: ['SUPLEMENTOS', 'OMEGA'],
    images: [
      'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop'
    ],
    flags: ['NATURAL'],
    details: {
      principio_ativo: 'Óleo de Peixe',
      concentracao: '1000mg',
      apresentacao: 'Cápsulas',
      quantidade: '90 cápsulas',
      fabricante: 'NutriVita',
      registro_anvisa: '321654987'
    }
  },
  {
    title: 'Probiótico 10 Bilhões UFC',
    summary: 'Suplemento probiótico com 10 bilhões de UFC',
    description: 'Suplemento probiótico com 10 bilhões de UFC. Melhora a saúde intestinal e sistema imunológico.',
    brand: 'NutriVita',
    price: 38.90,
    last_price: 49.90,
    stock: 65,
    categories: ['SUPLEMENTOS', 'PROBIOTICOS'],
    images: [
      'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop'
    ],
    flags: ['NATURAL'],
    details: {
      principio_ativo: 'Lactobacillus e Bifidobacterium',
      concentracao: '10 bilhões UFC',
      apresentacao: 'Cápsulas',
      quantidade: '30 cápsulas',
      fabricante: 'NutriVita',
      registro_anvisa: '147258369'
    }
  }
];

export async function seedProducts() {
  console.log('🌱 Iniciando seed de produtos...');

  try {
    // Limpar produtos existentes
    await prisma.product.deleteMany();

    // Criar produtos
    for (const product of products) {
      await prisma.product.create({
        data: {
          title: product.title,
          summary: product.summary,
          description: product.description,
          brand: product.brand,
          price: product.price,
          last_price: product.last_price,
          stock: product.stock,
          categories: product.categories,
          images: product.images,
          flags: product.flags,
          details: product.details
        }
      });
    }

    console.log(`✅ ${products.length} produtos criados com sucesso!`);
  } catch (error) {
    console.error('❌ Erro ao criar produtos:', error);
    throw error;
  }
}
