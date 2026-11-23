const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '..', 'fif_store.db');
const SQL_PATH = path.join(__dirname, '..', 'fif_store.sql');

// Si existe la BD anterior, la recreamos para asegurar los 100 registros limpios
if (fs.existsSync(DB_PATH)) {
  try {
    fs.unlinkSync(DB_PATH);
  } catch (e) {
    console.log('No se pudo borrar BD anterior, sobrescribiendo tablas...');
  }
}

const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// 1. Crear Esquema
db.exec(`
  CREATE TABLE IF NOT EXISTS usuarios (
    id TEXT PRIMARY KEY,
    nombre TEXT NOT NULL,
    carrera TEXT NOT NULL DEFAULT 'Ing. en Software',
    telefono TEXT NOT NULL,
    correo TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS productos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    precio REAL NOT NULL,
    categoria TEXT NOT NULL,
    descripcion TEXT NOT NULL,
    vendedor_id TEXT NOT NULL,
    vendido INTEGER NOT NULL DEFAULT 0,
    imagenes TEXT NOT NULL DEFAULT '[]',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (vendedor_id) REFERENCES usuarios(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS favoritos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id TEXT NOT NULL,
    producto_id INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(usuario_id, producto_id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE CASCADE
  );

  CREATE INDEX IF NOT EXISTS idx_productos_categoria ON productos(categoria);
  CREATE INDEX IF NOT EXISTS idx_productos_vendedor ON productos(vendedor_id);
  CREATE INDEX IF NOT EXISTS idx_favoritos_usuario ON favoritos(usuario_id);
`);

// 2. Preparar Usuarios
const defaultPasswordHash = bcrypt.hashSync('password123', 10);

const usuarios = [
  {
    id: 'u1',
    nombre: 'Alan Rubio',
    carrera: 'Ing. en Software',
    telefono: '4421234567',
    correo: 'alan.rubio@uaq.edu.mx',
    password: defaultPasswordHash,
  },
  {
    id: 'u2',
    nombre: 'Josue Castillo',
    carrera: 'Ing. en Software',
    telefono: '4427654321',
    correo: 'josue.castillo@uaq.edu.mx',
    password: defaultPasswordHash,
  },
  {
    id: 'u3',
    nombre: 'Daniel Fort',
    carrera: 'Ing. en Software',
    telefono: '4421112233',
    correo: 'daniel.fort@uaq.edu.mx',
    password: defaultPasswordHash,
  },
  {
    id: 'u4',
    nombre: 'Sofia Morales',
    carrera: 'Lic. en Informática',
    telefono: '4423334455',
    correo: 'sofia.morales@uaq.edu.mx',
    password: defaultPasswordHash,
  },
  {
    id: 'u5',
    nombre: 'Carlos Mendoza',
    carrera: 'Ing. en Telecomunicaciones',
    telefono: '4428889900',
    correo: 'carlos.mendoza@uaq.edu.mx',
    password: defaultPasswordHash,
  },
];

const insertUser = db.prepare(`
  INSERT INTO usuarios (id, nombre, carrera, telefono, correo, password)
  VALUES (@id, @nombre, @carrera, @telefono, @correo, @password)
`);

usuarios.forEach((u) => insertUser.run(u));
console.log(`✓ Insertados ${usuarios.length} usuarios iniciales.`);

// 3. Catálogo de 100 Productos con Imágenes Web de alta calidad
const unsplash = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=600&q=80`;

const rawProductos = [
  // ==================== PAPAS (17 productos) ====================
  {
    nombre: 'Takis Fuego 240g',
    precio: 25,
    categoria: 'Papas',
    descripcion: 'Bolsa grande de Takis Fuego, totalmente cerrada. Entrego en edificio C o biblioteca.',
    vendedor_id: 'u2',
    vendido: 0,
    img: unsplash('photo-1621447504864-d8686e12698c'),
  },
  {
    nombre: 'Ruffles Queso 185g',
    precio: 22,
    categoria: 'Papas',
    descripcion: 'Ruffles sabor a queso, crujientes y frescas. Entrego en la entrada de la FIF.',
    vendedor_id: 'u2',
    vendido: 0,
    img: unsplash('photo-1566478989037-eec170784d0b'),
  },
  {
    nombre: 'Doritos Nacho 245g',
    precio: 24,
    categoria: 'Papas',
    descripcion: 'Bolsa rendidora de Doritos Nacho. Ideales para la botana entre clases.',
    vendedor_id: 'u3',
    vendido: 0,
    img: unsplash('photo-1513456852971-30c0b8199d4d'),
  },
  {
    nombre: 'Chidas Jalapeño',
    precio: 25,
    categoria: 'Papas',
    descripcion: 'Papas Chidas sabor jalapeño bien picositas. Paquete nuevo.',
    vendedor_id: 'u1',
    vendido: 0,
    img: unsplash('photo-1613919113640-25732ec5e61f'),
  },
  {
    nombre: 'Chidas Adobadas 250g',
    precio: 25,
    categoria: 'Papas',
    descripcion: 'Chidas sabor adobo de 250g, recién compradas en mayoreo.',
    vendedor_id: 'u2',
    vendido: 0,
    img: unsplash('photo-1585238342024-78d387f4a707'),
  },
  {
    nombre: 'Cheetos Torciditos 150g',
    precio: 18,
    categoria: 'Papas',
    descripcion: 'Cheetos sabor queso y chile torciditos. Vendo en laboratorio de cómputo.',
    vendedor_id: 'u4',
    vendido: 0,
    img: unsplash('photo-1599490659213-e2b9527bd087'),
  },
  {
    nombre: 'Cheetos Flamin Hot 160g',
    precio: 20,
    categoria: 'Papas',
    descripcion: 'Cheetos Flamin Hot con extra picante. Tengo 3 bolsas disponibles.',
    vendedor_id: 'u5',
    vendido: 0,
    img: unsplash('photo-1621447504864-d8686e12698c'),
  },
  {
    nombre: 'Sabritas Sal Clásicas 170g',
    precio: 22,
    categoria: 'Papas',
    descripcion: 'Las clásicas papas Sabritas amarillas con sal. Perfectas con salsa y limón.',
    vendedor_id: 'u1',
    vendido: 0,
    img: unsplash('photo-1566478989037-eec170784d0b'),
  },
  {
    nombre: 'Sabritas Crema y Especias',
    precio: 23,
    categoria: 'Papas',
    descripcion: 'Papas fritas sabor crema y especias, bolsa mediana.',
    vendedor_id: 'u3',
    vendido: 0,
    img: unsplash('photo-1600952841320-db92ec4047ca'),
  },
  {
    nombre: 'Chips Fuego Barcel 170g',
    precio: 24,
    categoria: 'Papas',
    descripcion: 'Chips artesanales Barcel corte grueso sabor fuego.',
    vendedor_id: 'u2',
    vendido: 0,
    img: unsplash('photo-1613919113640-25732ec5e61f'),
  },
  {
    nombre: 'Chips Jalapeño Barcel 170g',
    precio: 24,
    categoria: 'Papas',
    descripcion: 'Chips Barcel con chile jalapeño auténtico. Muy crujientes.',
    vendedor_id: 'u4',
    vendido: 0,
    img: unsplash('photo-1585238342024-78d387f4a707'),
  },
  {
    nombre: 'Papas Caseras con Salsa y Limón',
    precio: 20,
    categoria: 'Papas',
    descripcion: 'Papas naturales fritas hechas en casa hoy en la mañana, incluye salsa Botanera.',
    vendedor_id: 'u1',
    vendido: 0,
    img: unsplash('photo-1576107232684-1279f3908594'),
  },
  {
    nombre: 'Doritos Dinamita Chile y Limón',
    precio: 20,
    categoria: 'Papas',
    descripcion: 'Totopos enrollados súper crujientes con limón y chile.',
    vendedor_id: 'u5',
    vendido: 0,
    img: unsplash('photo-1527842891421-42eec6e703ea'),
  },
  {
    nombre: 'Runners Barcel 180g',
    precio: 19,
    categoria: 'Papas',
    descripcion: 'Botana de maíz en forma de coche con salsa picante.',
    vendedor_id: 'u3',
    vendido: 0,
    img: unsplash('photo-1621447504864-d8686e12698c'),
  },
  {
    nombre: 'Papas Pringles Original 124g',
    precio: 38,
    categoria: 'Papas',
    descripcion: 'Tubo de Pringles Original clásico cerrado sellado.',
    vendedor_id: 'u4',
    vendido: 0,
    img: unsplash('photo-1576107232684-1279f3908594'),
  },
  {
    nombre: 'Papas Pringles Sour Cream & Onion',
    precio: 38,
    categoria: 'Papas',
    descripcion: 'Tubo de Pringles crema y cebolla, recién importado.',
    vendedor_id: 'u2',
    vendido: 0,
    img: unsplash('photo-1600952841320-db92ec4047ca'),
  },
  {
    nombre: 'Tostitos Salsa Verde 240g',
    precio: 23,
    categoria: 'Papas',
    descripcion: 'Tostitos con toque de salsa verde, listos para preparar con cueritos.',
    vendedor_id: 'u1',
    vendido: 1,
    img: unsplash('photo-1513456852971-30c0b8199d4d'),
  },

  // ==================== GALLETAS (17 productos) ====================
  {
    nombre: 'Emperador Chocolate 101g',
    precio: 18,
    categoria: 'Galletas',
    descripcion: 'Paquete de galletas Emperador con relleno sabor chocolate.',
    vendedor_id: 'u3',
    vendido: 0,
    img: unsplash('photo-1563729784474-d77dbb933a9e'),
  },
  {
    nombre: 'Emperador Limón 101g',
    precio: 18,
    categoria: 'Galletas',
    descripcion: 'Galletas tipo sándwich con relleno ácido y dulce sabor a limón.',
    vendedor_id: 'u4',
    vendido: 0,
    img: unsplash('photo-1557082673-e847a95781a7'),
  },
  {
    nombre: 'Emperador Combinado 101g',
    precio: 18,
    categoria: 'Galletas',
    descripcion: 'Emperador mitad vainilla y mitad chocolate.',
    vendedor_id: 'u2',
    vendido: 0,
    img: unsplash('photo-1563729784474-d77dbb933a9e'),
  },
  {
    nombre: 'Chokis Clásicas 84g',
    precio: 19,
    categoria: 'Galletas',
    descripcion: 'Galletas con chispas sabor a chocolate que se deshacen en la boca.',
    vendedor_id: 'u1',
    vendido: 0,
    img: unsplash('photo-1499636136210-6f4ee915583e'),
  },
  {
    nombre: 'Chokis Brownie 76g',
    precio: 20,
    categoria: 'Galletas',
    descripcion: 'Galletas Chokis rellenas de suave crema de brownie.',
    vendedor_id: 'u5',
    vendido: 0,
    img: unsplash('photo-1606313564200-e75d5e30476c'),
  },
  {
    nombre: 'Oreo Original 114g',
    precio: 19,
    categoria: 'Galletas',
    descripcion: 'Paquete de 10 galletas Oreo con su clásica crema de vainilla.',
    vendedor_id: 'u3',
    vendido: 0,
    img: unsplash('photo-1563729784474-d77dbb933a9e'),
  },
  {
    nombre: 'Oreo Doble Crema 120g',
    precio: 22,
    categoria: 'Galletas',
    descripcion: 'Oreo con el doble de crema dulce. Paquete individual.',
    vendedor_id: 'u2',
    vendido: 0,
    img: unsplash('photo-1563729784474-d77dbb933a9e'),
  },
  {
    nombre: 'Brownies Caseros con Nuez',
    precio: 25,
    categoria: 'Galletas',
    descripcion: 'Brownies artesanales horneados esta mañana con chocolate amargo y nuez.',
    vendedor_id: 'u1',
    vendido: 0,
    img: unsplash('photo-1606313564200-e75d5e30476c'),
  },
  {
    nombre: 'Canelitas Gamesa 120g',
    precio: 17,
    categoria: 'Galletas',
    descripcion: 'Galletas crujientes con canela y azúcar espolvoreada.',
    vendedor_id: 'u4',
    vendido: 0,
    img: unsplash('photo-1558961363-fa8fdf82db35'),
  },
  {
    nombre: 'Polvorones Naranja Gamesa 113g',
    precio: 17,
    categoria: 'Galletas',
    descripcion: 'Polvorones tradicionales con sabor a naranja.',
    vendedor_id: 'u5',
    vendido: 0,
    img: unsplash('photo-1557082673-e847a95781a7'),
  },
  {
    nombre: 'Galletas Marías Gamesa 170g',
    precio: 15,
    categoria: 'Galletas',
    descripcion: 'Rollo de galletas Marías ideales para acompañar con café o té.',
    vendedor_id: 'u1',
    vendido: 0,
    img: unsplash('photo-1509440159596-0249088772ff'),
  },
  {
    nombre: 'Príncipe Marinela Chocolate 106g',
    precio: 18,
    categoria: 'Galletas',
    descripcion: 'Galletas rellenas de abundante chocolate suave.',
    vendedor_id: 'u2',
    vendido: 0,
    img: unsplash('photo-1584308666744-24d5c474f2ae'),
  },
  {
    nombre: 'Barritas Marinela Fresa 75g',
    precio: 16,
    categoria: 'Galletas',
    descripcion: 'Dos barritas horneadas con relleno dulce de mermelada de fresa.',
    vendedor_id: 'u3',
    vendido: 0,
    img: unsplash('photo-1551024709-8f23befc6f87'),
  },
  {
    nombre: 'Barritas Marinela Piña 75g',
    precio: 16,
    categoria: 'Galletas',
    descripcion: 'Dos barritas con dulce relleno de piña y masa suave.',
    vendedor_id: 'u4',
    vendido: 0,
    img: unsplash('photo-1551024709-8f23befc6f87'),
  },
  {
    nombre: 'Triki Trakes Marinela 86g',
    precio: 17,
    categoria: 'Galletas',
    descripcion: 'Galletas con chispas crujientes de chocolate.',
    vendedor_id: 'u5',
    vendido: 0,
    img: unsplash('photo-1499636136210-6f4ee915583e'),
  },
  {
    nombre: 'Galletas Piruetas Gamesa 100g',
    precio: 17,
    categoria: 'Galletas',
    descripcion: 'Galletas sándwich rellenas de crema con sabor a limón.',
    vendedor_id: 'u2',
    vendido: 0,
    img: unsplash('photo-1557082673-e847a95781a7'),
  },
  {
    nombre: 'Wafers Vainilla Bauducco 140g',
    precio: 20,
    categoria: 'Galletas',
    descripcion: 'Obleas crujientes con tres capas de relleno sabor vainilla.',
    vendedor_id: 'u3',
    vendido: 1,
    img: unsplash('photo-1590080875515-8a3a8dc5735e'),
  },

  // ==================== GOMITAS (17 productos) ====================
  {
    nombre: 'Panditas Clásicos Ricolino 65g',
    precio: 14,
    categoria: 'Gomitas',
    descripcion: 'Gomitas en forma de osito con sabores frutales clásicos.',
    vendedor_id: 'u3',
    vendido: 0,
    img: unsplash('photo-1582058091505-f87a2e55a40f'),
  },
  {
    nombre: 'Panditas Enchilados 65g',
    precio: 15,
    categoria: 'Gomitas',
    descripcion: 'Ositos de gomita cubiertos de chile en polvo agridulce.',
    vendedor_id: 'u1',
    vendido: 0,
    img: unsplash('photo-1541781774459-bb2af2f05b55'),
  },
  {
    nombre: 'Gusanos Ácidos Trolli 100g',
    precio: 20,
    categoria: 'Gomitas',
    descripcion: 'Gusanitos bicolor con cubierta ácida súper intensa.',
    vendedor_id: 'u2',
    vendido: 0,
    img: unsplash('photo-1581798459219-318e76aecc7b'),
  },
  {
    nombre: 'Gomitas Enchiladas de Mango',
    precio: 18,
    categoria: 'Gomitas',
    descripcion: 'Rebanadas de gomita sabor mango con chamoy y chile miguelito casero.',
    vendedor_id: 'u4',
    vendido: 0,
    img: unsplash('photo-1541781774459-bb2af2f05b55'),
  },
  {
    nombre: 'Aros de Durazno Ácidos 90g',
    precio: 16,
    categoria: 'Gomitas',
    descripcion: 'Aros de gomita sabor durazno azucarados.',
    vendedor_id: 'u5',
    vendido: 0,
    img: unsplash('photo-1572097662444-0bab80029b98'),
  },
  {
    nombre: 'Skwinkles Salsagheti Sandía',
    precio: 16,
    categoria: 'Gomitas',
    descripcion: 'Tiras de caramelo suave sabor sandía con salsa líquida sabor tamarindo Gusano.',
    vendedor_id: 'u2',
    vendido: 0,
    img: unsplash('photo-1581798459219-318e76aecc7b'),
  },
  {
    nombre: 'Skwinkles Rellenos Piña 26g',
    precio: 15,
    categoria: 'Gomitas',
    descripcion: 'Tubitos de gomita sabor piña rellenos de tamarindo con chile.',
    vendedor_id: 'u1',
    vendido: 0,
    img: unsplash('photo-1575224300306-1b8da36134ec'),
  },
  {
    nombre: 'Skwinkles Clásicos Tamarindo',
    precio: 15,
    categoria: 'Gomitas',
    descripcion: 'Tiras enchiladas sabor tamarindo con sobre de salsa picante.',
    vendedor_id: 'u3',
    vendido: 0,
    img: unsplash('photo-1541781774459-bb2af2f05b55'),
  },
  {
    nombre: 'Gomitas Dientes Trolli 80g',
    precio: 18,
    categoria: 'Gomitas',
    descripcion: 'Divertidas gomitas con forma de dentadura sabor fresa y nata.',
    vendedor_id: 'u4',
    vendido: 0,
    img: unsplash('photo-1572097662444-0bab80029b98'),
  },
  {
    nombre: 'Gomitas Moras Silvestres 90g',
    precio: 17,
    categoria: 'Gomitas',
    descripcion: 'Gomitas cubiertas de bolitas crujientes sabor mora roja y negra.',
    vendedor_id: 'u5',
    vendido: 0,
    img: unsplash('photo-1575224300306-1b8da36134ec'),
  },
  {
    nombre: 'Gomitas Frutitas Agridulces 100g',
    precio: 18,
    categoria: 'Gomitas',
    descripcion: 'Plátanos, fresas y manzanas de gomita con toque acidito.',
    vendedor_id: 'u2',
    vendido: 0,
    img: unsplash('photo-1572097662444-0bab80029b98'),
  },
  {
    nombre: 'Gomitas Sandía con Chile 100g',
    precio: 19,
    categoria: 'Gomitas',
    descripcion: 'Gomitas triangulares sabor sandía espolvoreadas con tajín.',
    vendedor_id: 'u1',
    vendido: 0,
    img: unsplash('photo-1541781774459-bb2af2f05b55'),
  },
  {
    nombre: 'Gomitas Tiburones Azules Trolli',
    precio: 20,
    categoria: 'Gomitas',
    descripcion: 'Tiburones de gomita sabor moras y crema.',
    vendedor_id: 'u3',
    vendido: 0,
    img: unsplash('photo-1582058091505-f87a2e55a40f'),
  },
  {
    nombre: 'Gomitas Hamburguesa Trolli',
    precio: 12,
    categoria: 'Gomitas',
    descripcion: 'Mini hamburguesa de varias capas de gomitas frutales.',
    vendedor_id: 'u4',
    vendido: 0,
    img: unsplash('photo-1575224300306-1b8da36134ec'),
  },
  {
    nombre: 'Gomitas Pulpos Ácidos 90g',
    precio: 18,
    categoria: 'Gomitas',
    descripcion: 'Pulpitos de gomita de varios tentáculos bien ácidos.',
    vendedor_id: 'u5',
    vendido: 0,
    img: unsplash('photo-1581798459219-318e76aecc7b'),
  },
  {
    nombre: 'Gomitas Cerezas Gemelas 90g',
    precio: 17,
    categoria: 'Gomitas',
    descripcion: 'Cerezas de gomita con tallo verde sabor cereza dulce.',
    vendedor_id: 'u2',
    vendido: 0,
    img: unsplash('photo-1572097662444-0bab80029b98'),
  },
  {
    nombre: 'Gomitas Fritas Botana Mix 120g',
    precio: 22,
    categoria: 'Gomitas',
    descripcion: 'Mix de gomitas variadas preparadas con salsa valentina y chamoy casero.',
    vendedor_id: 'u1',
    vendido: 1,
    img: unsplash('photo-1541781774459-bb2af2f05b55'),
  },

  // ==================== BEBIDAS (17 productos) ====================
  {
    nombre: 'Coca-Cola 600ml Fría',
    precio: 22,
    categoria: 'Bebidas',
    descripcion: 'Botella de Coca-Cola original bien helada. Entrego en salón C02 o terraza.',
    vendedor_id: 'u2',
    vendido: 0,
    img: unsplash('photo-1622483767028-3f66f32aef97'),
  },
  {
    nombre: 'Coca-Cola Sin Azúcar 600ml',
    precio: 22,
    categoria: 'Bebidas',
    descripcion: 'Coca-Cola Zero azúcar 600ml bien fría.',
    vendedor_id: 'u1',
    vendido: 0,
    img: unsplash('photo-1554866585-cd94860890b7'),
  },
  {
    nombre: 'Red Bull Energy Drink 250ml',
    precio: 45,
    categoria: 'Bebidas',
    descripcion: 'Lata de Red Bull helada para sobrevivir a la semana de exámenes.',
    vendedor_id: 'u3',
    vendido: 0,
    img: unsplash('photo-1622543925917-763c34d1a86e'),
  },
  {
    nombre: 'Monster Energy Mango Loco 473ml',
    precio: 42,
    categoria: 'Bebidas',
    descripcion: 'Lata grande de Monster Juice sabor Mango Loco frío.',
    vendedor_id: 'u4',
    vendido: 0,
    img: unsplash('photo-1622543925917-763c34d1a86e'),
  },
  {
    nombre: 'Monster Energy Ultra White 473ml',
    precio: 42,
    categoria: 'Bebidas',
    descripcion: 'Monster Ultra sin azúcar sabor cítrico bien helado.',
    vendedor_id: 'u5',
    vendido: 0,
    img: unsplash('photo-1622543925917-763c34d1a86e'),
  },
  {
    nombre: 'Arizona Green Tea con Miel 680ml',
    precio: 25,
    categoria: 'Bebidas',
    descripcion: 'Lata grande de té verde Arizona con miel y ginseng. Bien fría.',
    vendedor_id: 'u2',
    vendido: 0,
    img: unsplash('photo-1556679343-c7306c1976bc'),
  },
  {
    nombre: 'Arizona Sandia Mucho Mango 680ml',
    precio: 25,
    categoria: 'Bebidas',
    descripcion: 'Lata de Arizona sabor Mucho Mango, refrescante para la tarde.',
    vendedor_id: 'u1',
    vendido: 0,
    img: unsplash('photo-1556679343-c7306c1976bc'),
  },
  {
    nombre: 'Boing de Guayaba 500ml',
    precio: 18,
    categoria: 'Bebidas',
    descripcion: 'Jugo Boing en envase de vidrio frío, el favorito de la cafetería.',
    vendedor_id: 'u3',
    vendido: 0,
    img: unsplash('photo-1600271886742-f049cd451bba'),
  },
  {
    nombre: 'Boing de Mango 500ml',
    precio: 18,
    categoria: 'Bebidas',
    descripcion: 'Boing de pulpa de mango natural en vidrio, bien frío.',
    vendedor_id: 'u4',
    vendido: 0,
    img: unsplash('photo-1600271886742-f049cd451bba'),
  },
  {
    nombre: 'Agua Ciel Purificada 1 Litro',
    precio: 15,
    categoria: 'Bebidas',
    descripcion: 'Botella de 1 litro de agua Ciel purificada.',
    vendedor_id: 'u5',
    vendido: 0,
    img: unsplash('photo-1523362628745-0c100150b504'),
  },
  {
    nombre: 'Agua Bonafont Levité Fresa 1L',
    precio: 20,
    categoria: 'Bebidas',
    descripcion: 'Agua infusionada con sabor ligero a fresa natural.',
    vendedor_id: 'u2',
    vendido: 0,
    img: unsplash('photo-1523362628745-0c100150b504'),
  },
  {
    nombre: 'Café Frío Americano con Hielo',
    precio: 25,
    categoria: 'Bebidas',
    descripcion: 'Vaso de café frío recién preparado con grano de Chiapas.',
    vendedor_id: 'u1',
    vendido: 0,
    img: unsplash('photo-1517256064527-09c73fc73e38'),
  },
  {
    nombre: 'Iced Latte Vainilla 400ml',
    precio: 35,
    categoria: 'Bebidas',
    descripcion: 'Café espresso con leche entera y jarabe de vainilla con hielo.',
    vendedor_id: 'u3',
    vendido: 0,
    img: unsplash('photo-1517256064527-09c73fc73e38'),
  },
  {
    nombre: 'Jarritos Mandarina 600ml',
    precio: 18,
    categoria: 'Bebidas',
    descripcion: 'Refresco mexicano tradicional sabor mandarina con gas bien helado.',
    vendedor_id: 'u4',
    vendido: 0,
    img: unsplash('photo-1581009146145-b5ef050c2e1e'),
  },
  {
    nombre: 'Sprite 600ml Lima-Limón',
    precio: 22,
    categoria: 'Bebidas',
    descripcion: 'Refresco Sprite 600ml bien frío.',
    vendedor_id: 'u5',
    vendido: 0,
    img: unsplash('photo-1622483767028-3f66f32aef97'),
  },
  {
    nombre: 'Electrolit Coco 625ml',
    precio: 32,
    categoria: 'Bebidas',
    descripcion: 'Suero oral rehidratante sabor coco, ideal para reponer energía.',
    vendedor_id: 'u1',
    vendido: 0,
    img: unsplash('photo-1523362628745-0c100150b504'),
  },
  {
    nombre: 'Jugo del Valle Manzana 413ml',
    precio: 19,
    categoria: 'Bebidas',
    descripcion: 'Néctar clarificado de manzana Del Valle en botella Pet.',
    vendedor_id: 'u3',
    vendido: 1,
    img: unsplash('photo-1600271886742-f049cd451bba'),
  },

  // ==================== DULCES (16 productos) ====================
  {
    nombre: 'Mazapán De la Rosa Gigante 50g',
    precio: 10,
    categoria: 'Dulces',
    descripcion: 'El auténtico mazapán de cacahuate que no se rompe si tienes suerte.',
    vendedor_id: 'u3',
    vendido: 0,
    img: unsplash('photo-1509440159596-0249088772ff'),
  },
  {
    nombre: 'Mazapán Cubierto de Chocolate',
    precio: 14,
    categoria: 'Dulces',
    descripcion: 'Mazapán De la Rosa bañado en deliciosa cobertura de chocolate.',
    vendedor_id: 'u2',
    vendido: 0,
    img: unsplash('photo-1606312619070-d48b4c652a52'),
  },
  {
    nombre: 'Pelón Pelo Rico 30g',
    precio: 12,
    categoria: 'Dulces',
    descripcion: 'Caramelo suave sabor tamarindo para empujar.',
    vendedor_id: 'u1',
    vendido: 0,
    img: unsplash('photo-1541781774459-bb2af2f05b55'),
  },
  {
    nombre: 'Paleta Payaso Ricolino 45g',
    precio: 18,
    categoria: 'Dulces',
    descripcion: 'Bombón esponjoso cubierto con chocolate y gomitas de cara sonriente.',
    vendedor_id: 'u4',
    vendido: 0,
    img: unsplash('photo-1575224300306-1b8da36134ec'),
  },
  {
    nombre: 'Duvalín Avellana y Vainilla',
    precio: 8,
    categoria: 'Dulces',
    descripcion: 'Untable cremoso bicromatico con cucharita plástica incluida.',
    vendedor_id: 'u5',
    vendido: 0,
    img: unsplash('photo-1534073828943-f801091bb18c'),
  },
  {
    nombre: 'Pulparindo Clásico De la Rosa',
    precio: 7,
    categoria: 'Dulces',
    descripcion: 'Barrita de pulpa de tamarindo natural salado y enchilado.',
    vendedor_id: 'u2',
    vendido: 0,
    img: unsplash('photo-1541781774459-bb2af2f05b55'),
  },
  {
    nombre: 'Pulparindo Gigante Extra Picante',
    precio: 12,
    categoria: 'Dulces',
    descripcion: 'Pulparindo tamaño doble con extra chile habanero.',
    vendedor_id: 'u3',
    vendido: 0,
    img: unsplash('photo-1541781774459-bb2af2f05b55'),
  },
  {
    nombre: 'Kranky Ricolino 40g',
    precio: 16,
    categoria: 'Dulces',
    descripcion: 'Hojuelas de maíz tostadas y crujientes cubiertas de chocolate.',
    vendedor_id: 'u1',
    vendido: 0,
    img: unsplash('photo-1548365328-8c6db3220e4c'),
  },
  {
    nombre: 'Bubu Lubu Ricolino 35g',
    precio: 14,
    categoria: 'Dulces',
    descripcion: 'Malvavisco con jalea sabor fresa y cubierta de chocolate frío.',
    vendedor_id: 'u4',
    vendido: 0,
    img: unsplash('photo-1606312619070-d48b4c652a52'),
  },
  {
    nombre: 'Chocolate Carlos V 18g',
    precio: 12,
    categoria: 'Dulces',
    descripcion: 'El rey de los chocolates con leche suizo-mexicano.',
    vendedor_id: 'u5',
    vendido: 0,
    img: unsplash('photo-1606312619070-d48b4c652a52'),
  },
  {
    nombre: 'Snickers Barra 52g',
    precio: 22,
    categoria: 'Dulces',
    descripcion: 'Chocolate con relleno de caramelo, turrón y cacahuates tostados.',
    vendedor_id: 'u2',
    vendido: 0,
    img: unsplash('photo-1606312619070-d48b4c652a52'),
  },
  {
    nombre: 'Kinder Bueno 43g',
    precio: 28,
    categoria: 'Dulces',
    descripcion: 'Dos barritas crujientes con barquillo relleno de crema de avellanas.',
    vendedor_id: 'u3',
    vendido: 0,
    img: unsplash('photo-1590080875515-8a3a8dc5735e'),
  },
  {
    nombre: 'Lucas Muecas Chamoy',
    precio: 15,
    categoria: 'Dulces',
    descripcion: 'Paleta sabor caramelo con chile en polvo en contenedor plástico.',
    vendedor_id: 'u1',
    vendido: 0,
    img: unsplash('photo-1575224300306-1b8da36134ec'),
  },
  {
    nombre: 'Rockaleta Paleta de Caramelo',
    precio: 10,
    categoria: 'Dulces',
    descripcion: 'Paleta con 4 capas de chiles de colores y centro de goma de mascar.',
    vendedor_id: 'u4',
    vendido: 0,
    img: unsplash('photo-1575224300306-1b8da36134ec'),
  },
  {
    nombre: 'Tamborines Enchilados 50g',
    precio: 14,
    categoria: 'Dulces',
    descripcion: 'Dulce suave de tamarindo con sal y chile en forma de tambor.',
    vendedor_id: 'u5',
    vendido: 0,
    img: unsplash('photo-1541781774459-bb2af2f05b55'),
  },
  {
    nombre: 'Ferrero Rocher paquete de 3',
    precio: 35,
    categoria: 'Dulces',
    descripcion: 'Bombones finos de avellana entera tostada envueltos en dorada presentación.',
    vendedor_id: 'u2',
    vendido: 1,
    img: unsplash('photo-1526081347589-7fa3cb41b4b2'),
  },

  // ==================== COMIDA (16 productos) ====================
  {
    nombre: 'Rebanada de Pizza Pepperoni',
    precio: 25,
    categoria: 'Comida',
    descripcion: 'Rebanada grande de Little Caesars calientita con extra queso y pepperoni.',
    vendedor_id: 'u1',
    vendido: 0,
    img: unsplash('photo-1513104890138-7c749659a591'),
  },
  {
    nombre: 'Rebanada de Pizza Tres Quesos',
    precio: 25,
    categoria: 'Comida',
    descripcion: 'Pizza con mozzarella, provolone y parmesano crujiente.',
    vendedor_id: 'u2',
    vendido: 0,
    img: unsplash('photo-1513104890138-7c749659a591'),
  },
  {
    nombre: 'Torta de Milanesa con Queso',
    precio: 45,
    categoria: 'Comida',
    descripcion: 'Torta en telera con milanesa de pollo empanizada, frijoles, quesillo y aguacate.',
    vendedor_id: 'u3',
    vendido: 0,
    img: unsplash('photo-1568901346375-23c9450c58cd'),
  },
  {
    nombre: 'Torta de Jamón y Queso Panela',
    precio: 35,
    categoria: 'Comida',
    descripcion: 'Torta fresca con mayonesa, jitomate, lechuga y chiles en vinagre.',
    vendedor_id: 'u4',
    vendido: 0,
    img: unsplash('photo-1528735602780-2552fd46c7af'),
  },
  {
    nombre: 'Burrito de Bistec con Queso',
    precio: 40,
    categoria: 'Comida',
    descripcion: 'Burrito norteño en tortilla de harina grande con bistec asado y queso gouda.',
    vendedor_id: 'u5',
    vendido: 0,
    img: unsplash('photo-1626700051175-6818013e1d4f'),
  },
  {
    nombre: 'Burrito de Chicharrón Prensado',
    precio: 38,
    categoria: 'Comida',
    descripcion: 'Burrito relleno de chicharrón prensado guisado en salsa verde.',
    vendedor_id: 'u1',
    vendido: 0,
    img: unsplash('photo-1626700051175-6818013e1d4f'),
  },
  {
    nombre: 'Sándwich Clásico de Pavo',
    precio: 30,
    categoria: 'Comida',
    descripcion: 'Pan integral con pechuga de pavo, queso manchego, lechuga y aderezo especial.',
    vendedor_id: 'u2',
    vendido: 0,
    img: unsplash('photo-1528735602780-2552fd46c7af'),
  },
  {
    nombre: 'Club Sándwich Triple con Papas',
    precio: 55,
    categoria: 'Comida',
    descripcion: 'Tres pisos de sándwich con tocino, pollo, jamón, queso y papas fritas.',
    vendedor_id: 'u3',
    vendido: 0,
    img: unsplash('photo-1528735602780-2552fd46c7af'),
  },
  {
    nombre: 'Orden de Molletes con Frijol y Queso',
    precio: 35,
    categoria: 'Comida',
    descripcion: 'Dos mitades de bolillo con frijoles refritos, queso gratinado y pico de gallo.',
    vendedor_id: 'u4',
    vendido: 0,
    img: unsplash('photo-1509722747041-616f39b57569'),
  },
  {
    nombre: 'Hot Dog Especial con Tocino',
    precio: 30,
    categoria: 'Comida',
    descripcion: 'Salchicha de pavo envuelta en tocino crujiente, jitomate, cebolla y aderezos.',
    vendedor_id: 'u5',
    vendido: 0,
    img: unsplash('photo-1619740455993-9e612b1af08a'),
  },
  {
    nombre: 'Quesadilla Gigante en Harina con Bistec',
    precio: 42,
    categoria: 'Comida',
    descripcion: 'Tortilla de harina de 30cm doblada a la mitad con queso Oaxaca y bistec.',
    vendedor_id: 'u1',
    vendido: 0,
    img: unsplash('photo-1551504734-5ee1c4a1479b'),
  },
  {
    nombre: 'Orden de 3 Tacos al Pastor',
    precio: 45,
    categoria: 'Comida',
    descripcion: 'Tres tacos de carne al pastor con piña, cilantro, cebolla y salsa taquera.',
    vendedor_id: 'u2',
    vendido: 0,
    img: unsplash('photo-1551504734-5ee1c4a1479b'),
  },
  {
    nombre: 'Sushi Roll California (8 piezas)',
    precio: 60,
    categoria: 'Comida',
    descripcion: 'Rollo empanizado de surimi, queso crema y aguacate con salsa chipotle y soya.',
    vendedor_id: 'u3',
    vendido: 0,
    img: unsplash('photo-1579871494447-9811cf80d66c'),
  },
  {
    nombre: 'Hamburguesa con Queso y Tocino',
    precio: 50,
    categoria: 'Comida',
    descripcion: 'Carne 100% res asada, queso americano, tocino crujiente, lechuga y tomate.',
    vendedor_id: 'u4',
    vendido: 0,
    img: unsplash('photo-1568901346375-23c9450c58cd'),
  },
  {
    nombre: 'Ensalada César con Pollo Asado',
    precio: 48,
    categoria: 'Comida',
    descripcion: 'Lechuga orejona fresca, pechuga de pollo a la plancha, crutones y aderezo césar.',
    vendedor_id: 'u5',
    vendido: 0,
    img: unsplash('photo-1504674900247-0877df9cc836'),
  },
  {
    nombre: 'Sincronizada con Jamón y Doble Queso',
    precio: 28,
    categoria: 'Comida',
    descripcion: 'Dos tortillas de harina con jamón de pavo y abundante queso fundido.',
    vendedor_id: 'u1',
    vendido: 1,
    img: unsplash('photo-1551504734-5ee1c4a1479b'),
  },
];

console.log(`Catálogo preparado con ${rawProductos.length} registros.`);

const insertProducto = db.prepare(`
  INSERT INTO productos (id, nombre, precio, categoria, descripcion, vendedor_id, vendido, imagenes)
  VALUES (@id, @nombre, @precio, @categoria, @descripcion, @vendedor_id, @vendido, @imagenes)
`);

const insertFavorito = db.prepare(`
  INSERT INTO favoritos (usuario_id, producto_id)
  VALUES (?, ?)
`);

db.transaction(() => {
  rawProductos.forEach((p, index) => {
    const id = index + 1;
    insertProducto.run({
      id,
      nombre: p.nombre,
      precio: p.precio,
      categoria: p.categoria,
      descripcion: p.descripcion,
      vendedor_id: p.vendedor_id,
      vendido: p.vendido,
      imagenes: JSON.stringify([p.img]),
    });
  });

  // Favoritos iniciales para pruebas
  [1, 3, 5, 18, 35, 52, 69, 85].forEach((prodId) => {
    insertFavorito.run('u1', prodId);
  });
})();

console.log(`✓ Insertados exactamente ${rawProductos.length} productos en la base de datos.`);

// 4. Generar Script SQL para DBAs (DBeaver, MySQL, SQLite, PostgreSQL)
let sqlDump = `-- =====================================================================
-- FIF STORE - DUMP OFICIAL DE BASE DE DATOS
-- Compatible con: SQLite, DBeaver, TablePlus, MySQL, PostgreSQL
-- Total de productos: 100 registros con imágenes web
-- =====================================================================

DROP TABLE IF EXISTS favoritos;
DROP TABLE IF EXISTS productos;
DROP TABLE IF EXISTS usuarios;

CREATE TABLE usuarios (
  id VARCHAR(64) PRIMARY KEY,
  nombre VARCHAR(150) NOT NULL,
  carrera VARCHAR(100) NOT NULL DEFAULT 'Ing. en Software',
  telefono VARCHAR(20) NOT NULL,
  correo VARCHAR(150) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE productos (
  id INTEGER PRIMARY KEY,
  nombre VARCHAR(200) NOT NULL,
  precio DECIMAL(10,2) NOT NULL,
  categoria VARCHAR(50) NOT NULL,
  descripcion TEXT NOT NULL,
  vendedor_id VARCHAR(64) NOT NULL,
  vendido INT NOT NULL DEFAULT 0,
  imagenes TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (vendedor_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE TABLE favoritos (
  id INTEGER PRIMARY KEY,
  usuario_id VARCHAR(64) NOT NULL,
  producto_id INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(usuario_id, producto_id),
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
  FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE CASCADE
);

CREATE INDEX idx_productos_categoria ON productos(categoria);
CREATE INDEX idx_productos_vendedor ON productos(vendedor_id);
CREATE INDEX idx_favoritos_usuario ON favoritos(usuario_id);

-- ---------------------------------------------------------------------
-- INSERCIONES DE USUARIOS (Contraseña de prueba: password123)
-- ---------------------------------------------------------------------
`;

usuarios.forEach((u) => {
  sqlDump += `INSERT INTO usuarios (id, nombre, carrera, telefono, correo, password) VALUES ('${u.id}', '${u.nombre.replace(/'/g, "''")}', '${u.carrera.replace(/'/g, "''")}', '${u.telefono}', '${u.correo}', '${u.password}');\n`;
});

sqlDump += `\n-- ---------------------------------------------------------------------\n-- INSERCIONES DE 100 PRODUCTOS CON IMÁGENES WEB\n-- ---------------------------------------------------------------------\n`;

rawProductos.forEach((p, index) => {
  const id = index + 1;
  const imgsJson = JSON.stringify([p.img]).replace(/'/g, "''");
  const desc = p.descripcion.replace(/'/g, "''");
  const nom = p.nombre.replace(/'/g, "''");
  sqlDump += `INSERT INTO productos (id, nombre, precio, categoria, descripcion, vendedor_id, vendido, imagenes) VALUES (${id}, '${nom}', ${p.precio}, '${p.categoria}', '${desc}', '${p.vendedor_id}', ${p.vendido}, '${imgsJson}');\n`;
});

sqlDump += `\n-- ---------------------------------------------------------------------\n-- INSERCIONES DE FAVORITOS INICIALES\n-- ---------------------------------------------------------------------\n`;
[1, 3, 5, 18, 35, 52, 69, 85].forEach((prodId) => {
  sqlDump += `INSERT INTO favoritos (usuario_id, producto_id) VALUES ('u1', ${prodId});\n`;
});

fs.writeFileSync(SQL_PATH, sqlDump, 'utf8');
console.log(`✓ Archivo SQL exportado para DBA en: ${SQL_PATH}`);
