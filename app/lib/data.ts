// Tipos y datos de FIF Store sincronizados con la Base de Datos SQLite.
// Contiene el catálogo completo de 100 productos con imágenes web.

export type Categoria =
  | 'Papas'
  | 'Galletas'
  | 'Gomitas'
  | 'Bebidas'
  | 'Dulces'
  | 'Comida';

export type Producto = {
  id: number;
  nombre: string;
  precio: number;
  categoria: Categoria;
  descripcion: string;
  vendedorId: string;
  vendido: boolean;
  imagenes: string[];
};

export type Usuario = {
  id: string;
  nombre: string;
  carrera: string;
  telefono: string;
  correo: string;
};

export const CATEGORIAS: Categoria[] = [
  'Papas',
  'Galletas',
  'Gomitas',
  'Bebidas',
  'Dulces',
  'Comida',
];

export const ICONO_CATEGORIA: Record<Categoria, string> = {
  Papas: '/icons/fries.png',
  Galletas: '/icons/cookie.png',
  Gomitas: '/icons/candy.png',
  Bebidas: '/icons/soda.png',
  Dulces: '/icons/candy.png',
  Comida: '/icons/pizza.png',
};

export const USUARIO_ACTUAL_ID = 'u1';

export const USUARIOS_INICIALES: Usuario[] = [
  {
    "id": "u1",
    "nombre": "Alan Rubio",
    "carrera": "Ing. en Software",
    "telefono": "4421234567",
    "correo": "alan.rubio@uaq.edu.mx"
  },
  {
    "id": "u2",
    "nombre": "Josue Castillo",
    "carrera": "Ing. en Software",
    "telefono": "4427654321",
    "correo": "josue.castillo@uaq.edu.mx"
  },
  {
    "id": "u3",
    "nombre": "Daniel Fort",
    "carrera": "Ing. en Software",
    "telefono": "4421112233",
    "correo": "daniel.fort@uaq.edu.mx"
  },
  {
    "id": "u4",
    "nombre": "Sofia Morales",
    "carrera": "Lic. en Informática",
    "telefono": "4423334455",
    "correo": "sofia.morales@uaq.edu.mx"
  },
  {
    "id": "u5",
    "nombre": "Carlos Mendoza",
    "carrera": "Ing. en Telecomunicaciones",
    "telefono": "4428889900",
    "correo": "carlos.mendoza@uaq.edu.mx"
  }
];

export const PRODUCTOS_INICIALES: Producto[] = [
  {
    "id": 1,
    "nombre": "Takis Fuego 240g",
    "precio": 25,
    "categoria": "Papas",
    "descripcion": "Bolsa grande de Takis Fuego, totalmente cerrada. Entrego en edificio C o biblioteca.",
    "vendedorId": "u2",
    "vendido": false,
    "imagenes": [
      "https://images.unsplash.com/photo-1621447504864-d8686e12698c?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 2,
    "nombre": "Ruffles Queso 185g",
    "precio": 22,
    "categoria": "Papas",
    "descripcion": "Ruffles sabor a queso, crujientes y frescas. Entrego en la entrada de la FIF.",
    "vendedorId": "u2",
    "vendido": false,
    "imagenes": [
      "https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 3,
    "nombre": "Doritos Nacho 245g",
    "precio": 24,
    "categoria": "Papas",
    "descripcion": "Bolsa rendidora de Doritos Nacho. Ideales para la botana entre clases.",
    "vendedorId": "u3",
    "vendido": false,
    "imagenes": [
      "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 4,
    "nombre": "Chidas Jalapeño",
    "precio": 25,
    "categoria": "Papas",
    "descripcion": "Papas Chidas sabor jalapeño bien picositas. Paquete nuevo.",
    "vendedorId": "u1",
    "vendido": false,
    "imagenes": [
      "https://images.unsplash.com/photo-1613919113640-25732ec5e61f?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 5,
    "nombre": "Chidas Adobadas 250g",
    "precio": 25,
    "categoria": "Papas",
    "descripcion": "Chidas sabor adobo de 250g, recién compradas en mayoreo.",
    "vendedorId": "u2",
    "vendido": false,
    "imagenes": [
      "https://images.unsplash.com/photo-1585238342024-78d387f4a707?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 6,
    "nombre": "Cheetos Torciditos 150g",
    "precio": 18,
    "categoria": "Papas",
    "descripcion": "Cheetos sabor queso y chile torciditos. Vendo en laboratorio de cómputo.",
    "vendedorId": "u4",
    "vendido": false,
    "imagenes": [
      "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 7,
    "nombre": "Cheetos Flamin Hot 160g",
    "precio": 20,
    "categoria": "Papas",
    "descripcion": "Cheetos Flamin Hot con extra picante. Tengo 3 bolsas disponibles.",
    "vendedorId": "u5",
    "vendido": false,
    "imagenes": [
      "https://images.unsplash.com/photo-1621447504864-d8686e12698c?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 8,
    "nombre": "Sabritas Sal Clásicas 170g",
    "precio": 22,
    "categoria": "Papas",
    "descripcion": "Las clásicas papas Sabritas amarillas con sal. Perfectas con salsa y limón.",
    "vendedorId": "u1",
    "vendido": false,
    "imagenes": [
      "https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 9,
    "nombre": "Sabritas Crema y Especias",
    "precio": 23,
    "categoria": "Papas",
    "descripcion": "Papas fritas sabor crema y especias, bolsa mediana.",
    "vendedorId": "u3",
    "vendido": false,
    "imagenes": [
      "https://images.unsplash.com/photo-1600952841320-db92ec4047ca?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 10,
    "nombre": "Chips Fuego Barcel 170g",
    "precio": 24,
    "categoria": "Papas",
    "descripcion": "Chips artesanales Barcel corte grueso sabor fuego.",
    "vendedorId": "u2",
    "vendido": false,
    "imagenes": [
      "https://images.unsplash.com/photo-1613919113640-25732ec5e61f?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 11,
    "nombre": "Chips Jalapeño Barcel 170g",
    "precio": 24,
    "categoria": "Papas",
    "descripcion": "Chips Barcel con chile jalapeño auténtico. Muy crujientes.",
    "vendedorId": "u4",
    "vendido": false,
    "imagenes": [
      "https://images.unsplash.com/photo-1585238342024-78d387f4a707?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 12,
    "nombre": "Papas Caseras con Salsa y Limón",
    "precio": 20,
    "categoria": "Papas",
    "descripcion": "Papas naturales fritas hechas en casa hoy en la mañana, incluye salsa Botanera.",
    "vendedorId": "u1",
    "vendido": false,
    "imagenes": [
      "https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 13,
    "nombre": "Doritos Dinamita Chile y Limón",
    "precio": 20,
    "categoria": "Papas",
    "descripcion": "Totopos enrollados súper crujientes con limón y chile.",
    "vendedorId": "u5",
    "vendido": false,
    "imagenes": [
      "https://images.unsplash.com/photo-1527842891421-42eec6e703ea?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 14,
    "nombre": "Runners Barcel 180g",
    "precio": 19,
    "categoria": "Papas",
    "descripcion": "Botana de maíz en forma de coche con salsa picante.",
    "vendedorId": "u3",
    "vendido": false,
    "imagenes": [
      "https://images.unsplash.com/photo-1621447504864-d8686e12698c?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 15,
    "nombre": "Papas Pringles Original 124g",
    "precio": 38,
    "categoria": "Papas",
    "descripcion": "Tubo de Pringles Original clásico cerrado sellado.",
    "vendedorId": "u4",
    "vendido": false,
    "imagenes": [
      "https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 16,
    "nombre": "Papas Pringles Sour Cream & Onion",
    "precio": 38,
    "categoria": "Papas",
    "descripcion": "Tubo de Pringles crema y cebolla, recién importado.",
    "vendedorId": "u2",
    "vendido": false,
    "imagenes": [
      "https://images.unsplash.com/photo-1600952841320-db92ec4047ca?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 17,
    "nombre": "Tostitos Salsa Verde 240g",
    "precio": 23,
    "categoria": "Papas",
    "descripcion": "Tostitos con toque de salsa verde, listos para preparar con cueritos.",
    "vendedorId": "u1",
    "vendido": true,
    "imagenes": [
      "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 18,
    "nombre": "Emperador Chocolate 101g",
    "precio": 18,
    "categoria": "Galletas",
    "descripcion": "Paquete de galletas Emperador con relleno sabor chocolate.",
    "vendedorId": "u3",
    "vendido": false,
    "imagenes": [
      "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 19,
    "nombre": "Emperador Limón 101g",
    "precio": 18,
    "categoria": "Galletas",
    "descripcion": "Galletas tipo sándwich con relleno ácido y dulce sabor a limón.",
    "vendedorId": "u4",
    "vendido": false,
    "imagenes": [
      "https://images.unsplash.com/photo-1557082673-e847a95781a7?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 20,
    "nombre": "Emperador Combinado 101g",
    "precio": 18,
    "categoria": "Galletas",
    "descripcion": "Emperador mitad vainilla y mitad chocolate.",
    "vendedorId": "u2",
    "vendido": false,
    "imagenes": [
      "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 21,
    "nombre": "Chokis Clásicas 84g",
    "precio": 19,
    "categoria": "Galletas",
    "descripcion": "Galletas con chispas sabor a chocolate que se deshacen en la boca.",
    "vendedorId": "u1",
    "vendido": false,
    "imagenes": [
      "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 22,
    "nombre": "Chokis Brownie 76g",
    "precio": 20,
    "categoria": "Galletas",
    "descripcion": "Galletas Chokis rellenas de suave crema de brownie.",
    "vendedorId": "u5",
    "vendido": false,
    "imagenes": [
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 23,
    "nombre": "Oreo Original 114g",
    "precio": 19,
    "categoria": "Galletas",
    "descripcion": "Paquete de 10 galletas Oreo con su clásica crema de vainilla.",
    "vendedorId": "u3",
    "vendido": false,
    "imagenes": [
      "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 24,
    "nombre": "Oreo Doble Crema 120g",
    "precio": 22,
    "categoria": "Galletas",
    "descripcion": "Oreo con el doble de crema dulce. Paquete individual.",
    "vendedorId": "u2",
    "vendido": false,
    "imagenes": [
      "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 25,
    "nombre": "Brownies Caseros con Nuez",
    "precio": 25,
    "categoria": "Galletas",
    "descripcion": "Brownies artesanales horneados esta mañana con chocolate amargo y nuez.",
    "vendedorId": "u1",
    "vendido": false,
    "imagenes": [
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 26,
    "nombre": "Canelitas Gamesa 120g",
    "precio": 17,
    "categoria": "Galletas",
    "descripcion": "Galletas crujientes con canela y azúcar espolvoreada.",
    "vendedorId": "u4",
    "vendido": false,
    "imagenes": [
      "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 27,
    "nombre": "Polvorones Naranja Gamesa 113g",
    "precio": 17,
    "categoria": "Galletas",
    "descripcion": "Polvorones tradicionales con sabor a naranja.",
    "vendedorId": "u5",
    "vendido": false,
    "imagenes": [
      "https://images.unsplash.com/photo-1557082673-e847a95781a7?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 28,
    "nombre": "Galletas Marías Gamesa 170g",
    "precio": 15,
    "categoria": "Galletas",
    "descripcion": "Rollo de galletas Marías ideales para acompañar con café o té.",
    "vendedorId": "u1",
    "vendido": false,
    "imagenes": [
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 29,
    "nombre": "Príncipe Marinela Chocolate 106g",
    "precio": 18,
    "categoria": "Galletas",
    "descripcion": "Galletas rellenas de abundante chocolate suave.",
    "vendedorId": "u2",
    "vendido": false,
    "imagenes": [
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 30,
    "nombre": "Barritas Marinela Fresa 75g",
    "precio": 16,
    "categoria": "Galletas",
    "descripcion": "Dos barritas horneadas con relleno dulce de mermelada de fresa.",
    "vendedorId": "u3",
    "vendido": false,
    "imagenes": [
      "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 31,
    "nombre": "Barritas Marinela Piña 75g",
    "precio": 16,
    "categoria": "Galletas",
    "descripcion": "Dos barritas con dulce relleno de piña y masa suave.",
    "vendedorId": "u4",
    "vendido": false,
    "imagenes": [
      "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 32,
    "nombre": "Triki Trakes Marinela 86g",
    "precio": 17,
    "categoria": "Galletas",
    "descripcion": "Galletas con chispas crujientes de chocolate.",
    "vendedorId": "u5",
    "vendido": false,
    "imagenes": [
      "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 33,
    "nombre": "Galletas Piruetas Gamesa 100g",
    "precio": 17,
    "categoria": "Galletas",
    "descripcion": "Galletas sándwich rellenas de crema con sabor a limón.",
    "vendedorId": "u2",
    "vendido": false,
    "imagenes": [
      "https://images.unsplash.com/photo-1557082673-e847a95781a7?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 34,
    "nombre": "Wafers Vainilla Bauducco 140g",
    "precio": 20,
    "categoria": "Galletas",
    "descripcion": "Obleas crujientes con tres capas de relleno sabor vainilla.",
    "vendedorId": "u3",
    "vendido": true,
    "imagenes": [
      "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 35,
    "nombre": "Panditas Clásicos Ricolino 65g",
    "precio": 14,
    "categoria": "Gomitas",
    "descripcion": "Gomitas en forma de osito con sabores frutales clásicos.",
    "vendedorId": "u3",
    "vendido": false,
    "imagenes": [
      "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 36,
    "nombre": "Panditas Enchilados 65g",
    "precio": 15,
    "categoria": "Gomitas",
    "descripcion": "Ositos de gomita cubiertos de chile en polvo agridulce.",
    "vendedorId": "u1",
    "vendido": false,
    "imagenes": [
      "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 37,
    "nombre": "Gusanos Ácidos Trolli 100g",
    "precio": 20,
    "categoria": "Gomitas",
    "descripcion": "Gusanitos bicolor con cubierta ácida súper intensa.",
    "vendedorId": "u2",
    "vendido": false,
    "imagenes": [
      "https://images.unsplash.com/photo-1581798459219-318e76aecc7b?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 38,
    "nombre": "Gomitas Enchiladas de Mango",
    "precio": 18,
    "categoria": "Gomitas",
    "descripcion": "Rebanadas de gomita sabor mango con chamoy y chile miguelito casero.",
    "vendedorId": "u4",
    "vendido": false,
    "imagenes": [
      "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 39,
    "nombre": "Aros de Durazno Ácidos 90g",
    "precio": 16,
    "categoria": "Gomitas",
    "descripcion": "Aros de gomita sabor durazno azucarados.",
    "vendedorId": "u5",
    "vendido": false,
    "imagenes": [
      "https://images.unsplash.com/photo-1572097662444-0bab80029b98?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 40,
    "nombre": "Skwinkles Salsagheti Sandía",
    "precio": 16,
    "categoria": "Gomitas",
    "descripcion": "Tiras de caramelo suave sabor sandía con salsa líquida sabor tamarindo Gusano.",
    "vendedorId": "u2",
    "vendido": false,
    "imagenes": [
      "https://images.unsplash.com/photo-1581798459219-318e76aecc7b?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 41,
    "nombre": "Skwinkles Rellenos Piña 26g",
    "precio": 15,
    "categoria": "Gomitas",
    "descripcion": "Tubitos de gomita sabor piña rellenos de tamarindo con chile.",
    "vendedorId": "u1",
    "vendido": false,
    "imagenes": [
      "https://images.unsplash.com/photo-1575224300306-1b8da36134ec?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 42,
    "nombre": "Skwinkles Clásicos Tamarindo",
    "precio": 15,
    "categoria": "Gomitas",
    "descripcion": "Tiras enchiladas sabor tamarindo con sobre de salsa picante.",
    "vendedorId": "u3",
    "vendido": false,
    "imagenes": [
      "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 43,
    "nombre": "Gomitas Dientes Trolli 80g",
    "precio": 18,
    "categoria": "Gomitas",
    "descripcion": "Divertidas gomitas con forma de dentadura sabor fresa y nata.",
    "vendedorId": "u4",
    "vendido": false,
    "imagenes": [
      "https://images.unsplash.com/photo-1572097662444-0bab80029b98?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 44,
    "nombre": "Gomitas Moras Silvestres 90g",
    "precio": 17,
    "categoria": "Gomitas",
    "descripcion": "Gomitas cubiertas de bolitas crujientes sabor mora roja y negra.",
    "vendedorId": "u5",
    "vendido": false,
    "imagenes": [
      "https://images.unsplash.com/photo-1575224300306-1b8da36134ec?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 45,
    "nombre": "Gomitas Frutitas Agridulces 100g",
    "precio": 18,
    "categoria": "Gomitas",
    "descripcion": "Plátanos, fresas y manzanas de gomita con toque acidito.",
    "vendedorId": "u2",
    "vendido": false,
    "imagenes": [
      "https://images.unsplash.com/photo-1572097662444-0bab80029b98?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 46,
    "nombre": "Gomitas Sandía con Chile 100g",
    "precio": 19,
    "categoria": "Gomitas",
    "descripcion": "Gomitas triangulares sabor sandía espolvoreadas con tajín.",
    "vendedorId": "u1",
    "vendido": false,
    "imagenes": [
      "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 47,
    "nombre": "Gomitas Tiburones Azules Trolli",
    "precio": 20,
    "categoria": "Gomitas",
    "descripcion": "Tiburones de gomita sabor moras y crema.",
    "vendedorId": "u3",
    "vendido": false,
    "imagenes": [
      "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 48,
    "nombre": "Gomitas Hamburguesa Trolli",
    "precio": 12,
    "categoria": "Gomitas",
    "descripcion": "Mini hamburguesa de varias capas de gomitas frutales.",
    "vendedorId": "u4",
    "vendido": false,
    "imagenes": [
      "https://images.unsplash.com/photo-1575224300306-1b8da36134ec?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 49,
    "nombre": "Gomitas Pulpos Ácidos 90g",
    "precio": 18,
    "categoria": "Gomitas",
    "descripcion": "Pulpitos de gomita de varios tentáculos bien ácidos.",
    "vendedorId": "u5",
    "vendido": false,
    "imagenes": [
      "https://images.unsplash.com/photo-1581798459219-318e76aecc7b?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 50,
    "nombre": "Gomitas Cerezas Gemelas 90g",
    "precio": 17,
    "categoria": "Gomitas",
    "descripcion": "Cerezas de gomita con tallo verde sabor cereza dulce.",
    "vendedorId": "u2",
    "vendido": false,
    "imagenes": [
      "https://images.unsplash.com/photo-1572097662444-0bab80029b98?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 51,
    "nombre": "Gomitas Fritas Botana Mix 120g",
    "precio": 22,
    "categoria": "Gomitas",
    "descripcion": "Mix de gomitas variadas preparadas con salsa valentina y chamoy casero.",
    "vendedorId": "u1",
    "vendido": true,
    "imagenes": [
      "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 52,
    "nombre": "Coca-Cola 600ml Fría",
    "precio": 22,
    "categoria": "Bebidas",
    "descripcion": "Botella de Coca-Cola original bien helada. Entrego en salón C02 o terraza.",
    "vendedorId": "u2",
    "vendido": false,
    "imagenes": [
      "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 53,
    "nombre": "Coca-Cola Sin Azúcar 600ml",
    "precio": 22,
    "categoria": "Bebidas",
    "descripcion": "Coca-Cola Zero azúcar 600ml bien fría.",
    "vendedorId": "u1",
    "vendido": false,
    "imagenes": [
      "https://images.unsplash.com/photo-1554866585-cd94860890b7?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 54,
    "nombre": "Red Bull Energy Drink 250ml",
    "precio": 45,
    "categoria": "Bebidas",
    "descripcion": "Lata de Red Bull helada para sobrevivir a la semana de exámenes.",
    "vendedorId": "u3",
    "vendido": false,
    "imagenes": [
      "https://images.unsplash.com/photo-1622543925917-763c34d1a86e?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 55,
    "nombre": "Monster Energy Mango Loco 473ml",
    "precio": 42,
    "categoria": "Bebidas",
    "descripcion": "Lata grande de Monster Juice sabor Mango Loco frío.",
    "vendedorId": "u4",
    "vendido": false,
    "imagenes": [
      "https://images.unsplash.com/photo-1622543925917-763c34d1a86e?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 56,
    "nombre": "Monster Energy Ultra White 473ml",
    "precio": 42,
    "categoria": "Bebidas",
    "descripcion": "Monster Ultra sin azúcar sabor cítrico bien helado.",
    "vendedorId": "u5",
    "vendido": false,
    "imagenes": [
      "https://images.unsplash.com/photo-1622543925917-763c34d1a86e?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 57,
    "nombre": "Arizona Green Tea con Miel 680ml",
    "precio": 25,
    "categoria": "Bebidas",
    "descripcion": "Lata grande de té verde Arizona con miel y ginseng. Bien fría.",
    "vendedorId": "u2",
    "vendido": false,
    "imagenes": [
      "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 58,
    "nombre": "Arizona Sandia Mucho Mango 680ml",
    "precio": 25,
    "categoria": "Bebidas",
    "descripcion": "Lata de Arizona sabor Mucho Mango, refrescante para la tarde.",
    "vendedorId": "u1",
    "vendido": false,
    "imagenes": [
      "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 59,
    "nombre": "Boing de Guayaba 500ml",
    "precio": 18,
    "categoria": "Bebidas",
    "descripcion": "Jugo Boing en envase de vidrio frío, el favorito de la cafetería.",
    "vendedorId": "u3",
    "vendido": false,
    "imagenes": [
      "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 60,
    "nombre": "Boing de Mango 500ml",
    "precio": 18,
    "categoria": "Bebidas",
    "descripcion": "Boing de pulpa de mango natural en vidrio, bien frío.",
    "vendedorId": "u4",
    "vendido": false,
    "imagenes": [
      "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 61,
    "nombre": "Agua Ciel Purificada 1 Litro",
    "precio": 15,
    "categoria": "Bebidas",
    "descripcion": "Botella de 1 litro de agua Ciel purificada.",
    "vendedorId": "u5",
    "vendido": false,
    "imagenes": [
      "https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 62,
    "nombre": "Agua Bonafont Levité Fresa 1L",
    "precio": 20,
    "categoria": "Bebidas",
    "descripcion": "Agua infusionada con sabor ligero a fresa natural.",
    "vendedorId": "u2",
    "vendido": false,
    "imagenes": [
      "https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 63,
    "nombre": "Café Frío Americano con Hielo",
    "precio": 25,
    "categoria": "Bebidas",
    "descripcion": "Vaso de café frío recién preparado con grano de Chiapas.",
    "vendedorId": "u1",
    "vendido": false,
    "imagenes": [
      "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 64,
    "nombre": "Iced Latte Vainilla 400ml",
    "precio": 35,
    "categoria": "Bebidas",
    "descripcion": "Café espresso con leche entera y jarabe de vainilla con hielo.",
    "vendedorId": "u3",
    "vendido": false,
    "imagenes": [
      "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 65,
    "nombre": "Jarritos Mandarina 600ml",
    "precio": 18,
    "categoria": "Bebidas",
    "descripcion": "Refresco mexicano tradicional sabor mandarina con gas bien helado.",
    "vendedorId": "u4",
    "vendido": false,
    "imagenes": [
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 66,
    "nombre": "Sprite 600ml Lima-Limón",
    "precio": 22,
    "categoria": "Bebidas",
    "descripcion": "Refresco Sprite 600ml bien frío.",
    "vendedorId": "u5",
    "vendido": false,
    "imagenes": [
      "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 67,
    "nombre": "Electrolit Coco 625ml",
    "precio": 32,
    "categoria": "Bebidas",
    "descripcion": "Suero oral rehidratante sabor coco, ideal para reponer energía.",
    "vendedorId": "u1",
    "vendido": false,
    "imagenes": [
      "https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 68,
    "nombre": "Jugo del Valle Manzana 413ml",
    "precio": 19,
    "categoria": "Bebidas",
    "descripcion": "Néctar clarificado de manzana Del Valle en botella Pet.",
    "vendedorId": "u3",
    "vendido": true,
    "imagenes": [
      "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 69,
    "nombre": "Mazapán De la Rosa Gigante 50g",
    "precio": 10,
    "categoria": "Dulces",
    "descripcion": "El auténtico mazapán de cacahuate que no se rompe si tienes suerte.",
    "vendedorId": "u3",
    "vendido": false,
    "imagenes": [
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 70,
    "nombre": "Mazapán Cubierto de Chocolate",
    "precio": 14,
    "categoria": "Dulces",
    "descripcion": "Mazapán De la Rosa bañado en deliciosa cobertura de chocolate.",
    "vendedorId": "u2",
    "vendido": false,
    "imagenes": [
      "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 71,
    "nombre": "Pelón Pelo Rico 30g",
    "precio": 12,
    "categoria": "Dulces",
    "descripcion": "Caramelo suave sabor tamarindo para empujar.",
    "vendedorId": "u1",
    "vendido": false,
    "imagenes": [
      "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 72,
    "nombre": "Paleta Payaso Ricolino 45g",
    "precio": 18,
    "categoria": "Dulces",
    "descripcion": "Bombón esponjoso cubierto con chocolate y gomitas de cara sonriente.",
    "vendedorId": "u4",
    "vendido": false,
    "imagenes": [
      "https://images.unsplash.com/photo-1575224300306-1b8da36134ec?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 73,
    "nombre": "Duvalín Avellana y Vainilla",
    "precio": 8,
    "categoria": "Dulces",
    "descripcion": "Untable cremoso bicromatico con cucharita plástica incluida.",
    "vendedorId": "u5",
    "vendido": false,
    "imagenes": [
      "https://images.unsplash.com/photo-1534073828943-f801091bb18c?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 74,
    "nombre": "Pulparindo Clásico De la Rosa",
    "precio": 7,
    "categoria": "Dulces",
    "descripcion": "Barrita de pulpa de tamarindo natural salado y enchilado.",
    "vendedorId": "u2",
    "vendido": false,
    "imagenes": [
      "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 75,
    "nombre": "Pulparindo Gigante Extra Picante",
    "precio": 12,
    "categoria": "Dulces",
    "descripcion": "Pulparindo tamaño doble con extra chile habanero.",
    "vendedorId": "u3",
    "vendido": false,
    "imagenes": [
      "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 76,
    "nombre": "Kranky Ricolino 40g",
    "precio": 16,
    "categoria": "Dulces",
    "descripcion": "Hojuelas de maíz tostadas y crujientes cubiertas de chocolate.",
    "vendedorId": "u1",
    "vendido": false,
    "imagenes": [
      "https://images.unsplash.com/photo-1548365328-8c6db3220e4c?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 77,
    "nombre": "Bubu Lubu Ricolino 35g",
    "precio": 14,
    "categoria": "Dulces",
    "descripcion": "Malvavisco con jalea sabor fresa y cubierta de chocolate frío.",
    "vendedorId": "u4",
    "vendido": false,
    "imagenes": [
      "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 78,
    "nombre": "Chocolate Carlos V 18g",
    "precio": 12,
    "categoria": "Dulces",
    "descripcion": "El rey de los chocolates con leche suizo-mexicano.",
    "vendedorId": "u5",
    "vendido": false,
    "imagenes": [
      "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 79,
    "nombre": "Snickers Barra 52g",
    "precio": 22,
    "categoria": "Dulces",
    "descripcion": "Chocolate con relleno de caramelo, turrón y cacahuates tostados.",
    "vendedorId": "u2",
    "vendido": false,
    "imagenes": [
      "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 80,
    "nombre": "Kinder Bueno 43g",
    "precio": 28,
    "categoria": "Dulces",
    "descripcion": "Dos barritas crujientes con barquillo relleno de crema de avellanas.",
    "vendedorId": "u3",
    "vendido": false,
    "imagenes": [
      "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 81,
    "nombre": "Lucas Muecas Chamoy",
    "precio": 15,
    "categoria": "Dulces",
    "descripcion": "Paleta sabor caramelo con chile en polvo en contenedor plástico.",
    "vendedorId": "u1",
    "vendido": false,
    "imagenes": [
      "https://images.unsplash.com/photo-1575224300306-1b8da36134ec?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 82,
    "nombre": "Rockaleta Paleta de Caramelo",
    "precio": 10,
    "categoria": "Dulces",
    "descripcion": "Paleta con 4 capas de chiles de colores y centro de goma de mascar.",
    "vendedorId": "u4",
    "vendido": false,
    "imagenes": [
      "https://images.unsplash.com/photo-1575224300306-1b8da36134ec?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 83,
    "nombre": "Tamborines Enchilados 50g",
    "precio": 14,
    "categoria": "Dulces",
    "descripcion": "Dulce suave de tamarindo con sal y chile en forma de tambor.",
    "vendedorId": "u5",
    "vendido": false,
    "imagenes": [
      "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 84,
    "nombre": "Ferrero Rocher paquete de 3",
    "precio": 35,
    "categoria": "Dulces",
    "descripcion": "Bombones finos de avellana entera tostada envueltos en dorada presentación.",
    "vendedorId": "u2",
    "vendido": true,
    "imagenes": [
      "https://images.unsplash.com/photo-1526081347589-7fa3cb41b4b2?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 85,
    "nombre": "Rebanada de Pizza Pepperoni",
    "precio": 25,
    "categoria": "Comida",
    "descripcion": "Rebanada grande de Little Caesars calientita con extra queso y pepperoni.",
    "vendedorId": "u1",
    "vendido": false,
    "imagenes": [
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 86,
    "nombre": "Rebanada de Pizza Tres Quesos",
    "precio": 25,
    "categoria": "Comida",
    "descripcion": "Pizza con mozzarella, provolone y parmesano crujiente.",
    "vendedorId": "u2",
    "vendido": false,
    "imagenes": [
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 87,
    "nombre": "Torta de Milanesa con Queso",
    "precio": 45,
    "categoria": "Comida",
    "descripcion": "Torta en telera con milanesa de pollo empanizada, frijoles, quesillo y aguacate.",
    "vendedorId": "u3",
    "vendido": false,
    "imagenes": [
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 88,
    "nombre": "Torta de Jamón y Queso Panela",
    "precio": 35,
    "categoria": "Comida",
    "descripcion": "Torta fresca con mayonesa, jitomate, lechuga y chiles en vinagre.",
    "vendedorId": "u4",
    "vendido": false,
    "imagenes": [
      "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 89,
    "nombre": "Burrito de Bistec con Queso",
    "precio": 40,
    "categoria": "Comida",
    "descripcion": "Burrito norteño en tortilla de harina grande con bistec asado y queso gouda.",
    "vendedorId": "u5",
    "vendido": false,
    "imagenes": [
      "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 90,
    "nombre": "Burrito de Chicharrón Prensado",
    "precio": 38,
    "categoria": "Comida",
    "descripcion": "Burrito relleno de chicharrón prensado guisado en salsa verde.",
    "vendedorId": "u1",
    "vendido": false,
    "imagenes": [
      "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 91,
    "nombre": "Sándwich Clásico de Pavo",
    "precio": 30,
    "categoria": "Comida",
    "descripcion": "Pan integral con pechuga de pavo, queso manchego, lechuga y aderezo especial.",
    "vendedorId": "u2",
    "vendido": false,
    "imagenes": [
      "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 92,
    "nombre": "Club Sándwich Triple con Papas",
    "precio": 55,
    "categoria": "Comida",
    "descripcion": "Tres pisos de sándwich con tocino, pollo, jamón, queso y papas fritas.",
    "vendedorId": "u3",
    "vendido": false,
    "imagenes": [
      "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 93,
    "nombre": "Orden de Molletes con Frijol y Queso",
    "precio": 35,
    "categoria": "Comida",
    "descripcion": "Dos mitades de bolillo con frijoles refritos, queso gratinado y pico de gallo.",
    "vendedorId": "u4",
    "vendido": false,
    "imagenes": [
      "https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 94,
    "nombre": "Hot Dog Especial con Tocino",
    "precio": 30,
    "categoria": "Comida",
    "descripcion": "Salchicha de pavo envuelta en tocino crujiente, jitomate, cebolla y aderezos.",
    "vendedorId": "u5",
    "vendido": false,
    "imagenes": [
      "https://images.unsplash.com/photo-1619740455993-9e612b1af08a?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 95,
    "nombre": "Quesadilla Gigante en Harina con Bistec",
    "precio": 42,
    "categoria": "Comida",
    "descripcion": "Tortilla de harina de 30cm doblada a la mitad con queso Oaxaca y bistec.",
    "vendedorId": "u1",
    "vendido": false,
    "imagenes": [
      "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 96,
    "nombre": "Orden de 3 Tacos al Pastor",
    "precio": 45,
    "categoria": "Comida",
    "descripcion": "Tres tacos de carne al pastor con piña, cilantro, cebolla y salsa taquera.",
    "vendedorId": "u2",
    "vendido": false,
    "imagenes": [
      "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 97,
    "nombre": "Sushi Roll California (8 piezas)",
    "precio": 60,
    "categoria": "Comida",
    "descripcion": "Rollo empanizado de surimi, queso crema y aguacate con salsa chipotle y soya.",
    "vendedorId": "u3",
    "vendido": false,
    "imagenes": [
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 98,
    "nombre": "Hamburguesa con Queso y Tocino",
    "precio": 50,
    "categoria": "Comida",
    "descripcion": "Carne 100% res asada, queso americano, tocino crujiente, lechuga y tomate.",
    "vendedorId": "u4",
    "vendido": false,
    "imagenes": [
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 99,
    "nombre": "Ensalada César con Pollo Asado",
    "precio": 48,
    "categoria": "Comida",
    "descripcion": "Lechuga orejona fresca, pechuga de pollo a la plancha, crutones y aderezo césar.",
    "vendedorId": "u5",
    "vendido": false,
    "imagenes": [
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    "id": 100,
    "nombre": "Sincronizada con Jamón y Doble Queso",
    "precio": 28,
    "categoria": "Comida",
    "descripcion": "Dos tortillas de harina con jamón de pavo y abundante queso fundido.",
    "vendedorId": "u1",
    "vendido": true,
    "imagenes": [
      "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=600&q=80"
    ]
  }
];

export const FAVORITOS_INICIALES: number[] = [1, 3, 5, 18, 35, 52, 69, 85];

export function iniciales(nombre: string): string {
  return nombre
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? '')
    .join('');
}

export function imagenProducto(p: Producto): string {
  return p.imagenes[0] ?? ICONO_CATEGORIA[p.categoria];
}

export function enlaceWhatsApp(telefono: string, mensaje: string): string {
  const numero = telefono.replace(/\D/g, '');
  return `https://wa.me/52${numero}?text=${encodeURIComponent(mensaje)}`;
}
