import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Binh Tran',
      email: 'admin@example.com',
      password: bcrypt.hashSync('1234', 8),
      isAdmin: true,
    },
    {
      name: 'Lan Nguyen',
      email: 'user@example.com',
      password: bcrypt.hashSync('1234', 8),
      isAdmin: false,
    },
  ],
  categories: [
    {
      name: 'Furniture',
      slug: 'furniture',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry is standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      parent: null,
      ancestors: [],
    },
    {
      name: 'Coffee & Tables',
      slug: 'coffee-tables',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry is standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      parent: null,
      ancestors: [],
    },
    {
      name: 'Tables',
      slug: 'tables',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry is standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      parent: null,
      ancestors: [],
    },
    {
      name: 'Decoration',
      slug: 'decoration',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry is standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      parent: null,
      ancestors: [],
    },
    {
      name: 'Lighting',
      slug: 'lighting',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry is standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      parent: null,
      ancestors: [],
    },
    {
      name: 'Electronics',
      slug: 'electronics',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry is standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      parent: null,
      ancestors: [],
    },
  ],
  products: [
    {
      name: '2-Seater',
      slug: '2-seater',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry is standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      categories: ['615dd361e664f44a3ce2942e'],
      images: [
        { url: 'images/products/product_1_1.jpg' },
        { url: 'images/products/product_1_2.jpg' },
      ],
      brand: 'Benchmade Modern',
      price: 248,
      countInStock: 10,
      rating: 5,
      numReviews: 6,
    },
    {
      name: 'Block Side Table/Trolley',
      slug: 'block-side-table-trolley',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry is standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      categories: [
        '615dd361e664f44a3ce2942f',
        '615dd361e664f44a3ce2942e',
        '615dd361e664f44a3ce2942f',
      ],
      images: [
        { url: 'images/products/product_2_1.jpg' },
        { url: 'images/products/product_2_2.jpg' },
      ],
      brand: 'Tov Furniture',
      price: 240,
      salePrice: 210,
      countInStock: 20,
      rating: 4.5,
      numReviews: 8,
    },
    {
      name: 'Butler Stool Ladder',
      slug: 'butler-stool-ladder',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry is standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      categories: ['615dd361e664f44a3ce2942e'],
      images: [
        { url: 'images/products/product_3_1.jpg' },
        { url: 'images/products/product_3_2.jpg' },
      ],
      brand: 'Floyd',
      price: 25,
      salePrice: 20,
      countInStock: 25,
      rating: 4,
      numReviews: 9,
    },
    {
      name: 'Can 2-Seater Sofa',
      slug: 'can-2-seater-sofa',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry is standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      categories: ['615dd361e664f44a3ce2942e'],
      images: [
        { url: 'images/products/product_4_1.jpg' },
        { url: 'images/products/product_4_2.jpg' },
      ],
      brand: 'Floyd',
      price: 60,
      countInStock: 12,
      rating: 4.5,
      numReviews: 8,
    },
    {
      name: 'Roots Sofa Bed',
      slug: 'roots-sofa-bed',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry is standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      categories: ['615dd361e664f44a3ce2942e'],
      images: [
        { url: 'images/products/product_11_1.jpg' },
        { url: 'images/products/product_11_2.jpg' },
      ],
      brand: 'Poly & Bark',
      price: 449,
      countInStock: 0,
      rating: 5,
      numReviews: 10,
    },
    {
      name: 'Carronade Table Lamp',
      slug: 'carronade-table-lamp',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry is standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      categories: [
        '615dd361e664f44a3ce29431',
        '615dd361e664f44a3ce29433',
        '615dd361e664f44a3ce29432',
      ],
      images: [
        { url: 'images/products/product_6_1.jpg' },
        { url: 'images/products/product_6_2.jpg' },
      ],
      brand: 'Serena & Lily',
      price: 150,
      salePrice: 110,
      countInStock: 5,
      rating: 5,
      numReviews: 5,
    },
    {
      name: 'Cushion Set 3 Pieces',
      slug: 'cushion-set-3-pieces',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry is standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      categories: ['615dd361e664f44a3ce29431'],
      images: [
        { url: 'images/products/product_7_1.jpg' },
        { url: 'images/products/product_7_2.jpg' },
      ],
      brand: 'Thuma',
      price: 199,
      countInStock: 15,
      rating: 4,
      numReviews: 8,
    },
    {
      name: 'Flow Slim Armchair',
      slug: 'flow-slim-armchair',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry is standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      categories: ['615dd361e664f44a3ce2942e'],
      images: [
        { url: 'images/products/product_8_1.jpg' },
        { url: 'images/products/product_8_2.jpg' },
      ],
      brand: 'Thuma',
      price: 97,
      countInStock: 0,
      rating: 4.5,
      numReviews: 9,
    },
    {
      name: 'Foldable Tray Table',
      slug: 'foldable-tray-table',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry is standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      categories: ['615dd361e664f44a3ce29431', '615dd361e664f44a3ce2942e'],
      images: [
        { url: 'images/products/product_9_1.jpg' },
        { url: 'images/products/product_9_2.jpg' },
      ],
      brand: 'Jonathan Adler',
      price: 308,
      salePrice: 250,
      countInStock: 6,
      rating: 4.5,
      numReviews: 10,
    },
    {
      name: 'Garden Armchair',
      slug: 'garden-armchair',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry is standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      categories: ['615dd361e664f44a3ce29431', '615dd361e664f44a3ce2942e'],
      images: [
        { url: 'images/products/product_10_1.jpg' },
        { url: 'images/products/product_10_2.jpg' },
      ],
      brand: 'Oka',
      price: 100,
      salePrice: 90,
      countInStock: 10,
      rating: 4,
      numReviews: 8,
    },
    {
      name: 'Carronade Large Suspension Lamp',
      slug: 'carronade-large-suspension-lamp',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry is standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      categories: ['615dd361e664f44a3ce29432'],
      images: [
        { url: 'images/products/product_5_1.jpg' },
        { url: 'images/products/product_5_2.jpg' },
      ],
      brand: 'Frontgate',
      price: 341,
      countInStock: 10,
      rating: 4.5,
      numReviews: 8,
    },
    {
      name: 'Petite Table Lamp',
      slug: 'petite-table-lamp',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry is standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      categories: ['615dd361e664f44a3ce29432', '615dd361e664f44a3ce29431'],
      images: [
        { url: 'images/products/product_12_1.jpg' },
        { url: 'images/products/product_12_2.jpg' },
        { url: 'images/products/product_12_3.jpg' },
      ],
      brand: 'Novogratz',
      price: 73,
      salePrice: 65,
      countInStock: 0,
      rating: 5,
      numReviews: 10,
    },
  ],
};

export default data;
