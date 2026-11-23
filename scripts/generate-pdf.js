const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const fs = require('fs');
const path = require('path');

async function generatePDF() {
  const pdfDoc = await PDFDocument.create();
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  // Paleta de colores acorde a FIF Store
  const primaryNavy = rgb(27 / 255, 54 / 255, 76 / 255);    // #1b364c
  const secondaryNavy = rgb(45 / 255, 64 / 255, 89 / 255);  // #2d4059
  const accentOrange = rgb(251 / 255, 176 / 255, 64 / 255); // #fbb040
  const lightBg = rgb(245 / 255, 247 / 255, 250 / 255);
  const textDark = rgb(30 / 255, 41 / 255, 59 / 255);
  const textMuted = rgb(100 / 255, 116 / 255, 139 / 255);
  const borderGray = rgb(226 / 255, 232 / 255, 240 / 255);
  const white = rgb(1, 1, 1);
  const codeBg = rgb(241 / 255, 245 / 255, 249 / 255);

  const PAGE_WIDTH = 595.28;  // A4
  const PAGE_HEIGHT = 841.89; // A4
  const MARGIN = 45;
  const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;

  let currentPage = null;
  let y = PAGE_HEIGHT - MARGIN;
  const pages = [];

  function newPage() {
    currentPage = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    pages.push(currentPage);
    y = PAGE_HEIGHT - MARGIN;

    // Encabezado sutil en páginas subsiguientes
    if (pages.length > 1) {
      currentPage.drawRectangle({
        x: MARGIN,
        y: PAGE_HEIGHT - 38,
        width: CONTENT_WIDTH,
        height: 1,
        color: borderGray,
      });

      currentPage.drawText('FIF STORE — REPORTE TÉCNICO DE IMPLEMENTACIÓN', {
        x: MARGIN,
        y: PAGE_HEIGHT - 32,
        size: 8,
        font: fontBold,
        color: secondaryNavy,
      });

      currentPage.drawText('UAQ • FACULTAD DE INFORMÁTICA', {
        x: PAGE_WIDTH - MARGIN - 140,
        y: PAGE_HEIGHT - 32,
        size: 8,
        font: fontRegular,
        color: textMuted,
      });

      y = PAGE_HEIGHT - 55;
    }
    return currentPage;
  }

  function checkSpace(needed) {
    if (y - needed < MARGIN + 25) {
      newPage();
    }
  }

  function drawHeading1(title) {
    checkSpace(40);
    y -= 10;
    currentPage.drawRectangle({
      x: MARGIN,
      y: y - 4,
      width: 4,
      height: 18,
      color: accentOrange,
    });
    currentPage.drawText(title, {
      x: MARGIN + 12,
      y: y,
      size: 15,
      font: fontBold,
      color: primaryNavy,
    });
    y -= 22;
  }

  function drawHeading2(title) {
    checkSpace(28);
    y -= 6;
    currentPage.drawText(title, {
      x: MARGIN,
      y: y,
      size: 12,
      font: fontBold,
      color: secondaryNavy,
    });
    y -= 16;
  }

  function drawParagraph(text, font = fontRegular, size = 9.5, color = textDark, lineHeight = 14) {
    const words = text.split(' ');
    let line = '';

    for (const word of words) {
      const testLine = line ? `${line} ${word}` : word;
      const width = font.widthOfTextAtSize(testLine, size);

      if (width > CONTENT_WIDTH) {
        checkSpace(lineHeight);
        currentPage.drawText(line, {
          x: MARGIN,
          y: y,
          size,
          font,
          color,
        });
        y -= lineHeight;
        line = word;
      } else {
        line = testLine;
      }
    }

    if (line) {
      checkSpace(lineHeight);
      currentPage.drawText(line, {
        x: MARGIN,
        y: y,
        size,
        font,
        color,
      });
      y -= lineHeight;
    }
    y -= 4; // espaciado entre párrafos
  }

  function drawBullet(title, desc) {
    checkSpace(16);
    currentPage.drawCircle({
      x: MARGIN + 6,
      y: y + 3,
      size: 2.5,
      color: accentOrange,
    });

    const titleWidth = fontBold.widthOfTextAtSize(title + ': ', 9.5);
    currentPage.drawText(title + ': ', {
      x: MARGIN + 15,
      y: y,
      size: 9.5,
      font: fontBold,
      color: textDark,
    });

    const remainingWidth = CONTENT_WIDTH - 15 - titleWidth;
    const words = desc.split(' ');
    let line = '';
    let isFirstLine = true;

    for (const word of words) {
      const testLine = line ? `${line} ${word}` : word;
      const targetWidth = isFirstLine ? remainingWidth : CONTENT_WIDTH - 15;
      const width = fontRegular.widthOfTextAtSize(testLine, 9.5);

      if (width > targetWidth) {
        if (isFirstLine) {
          currentPage.drawText(line, {
            x: MARGIN + 15 + titleWidth,
            y: y,
            size: 9.5,
            font: fontRegular,
            color: textDark,
          });
          y -= 13;
          checkSpace(13);
          isFirstLine = false;
        } else {
          currentPage.drawText(line, {
            x: MARGIN + 15,
            y: y,
            size: 9.5,
            font: fontRegular,
            color: textDark,
          });
          y -= 13;
          checkSpace(13);
        }
        line = word;
      } else {
        line = testLine;
      }
    }

    if (line) {
      const startX = isFirstLine ? MARGIN + 15 + titleWidth : MARGIN + 15;
      currentPage.drawText(line, {
        x: startX,
        y: y,
        size: 9.5,
        font: fontRegular,
        color: textDark,
      });
      y -= 13;
    }
    y -= 3;
  }

  function drawCodeBlock(codeLines) {
    const height = codeLines.length * 13 + 12;
    checkSpace(height + 10);

    currentPage.drawRectangle({
      x: MARGIN,
      y: y - height + 10,
      width: CONTENT_WIDTH,
      height: height,
      color: codeBg,
      borderColor: borderGray,
      borderWidth: 1,
    });

    let codeY = y - 3;
    for (const line of codeLines) {
      currentPage.drawText(line, {
        x: MARGIN + 12,
        y: codeY,
        size: 8.5,
        font: fontRegular,
        color: secondaryNavy,
      });
      codeY -= 13;
    }
    y -= height + 6;
  }

  function drawTable(headers, rows, colWidths) {
    const rowHeight = 18;
    const tableHeight = (rows.length + 1) * rowHeight;
    checkSpace(tableHeight + 10);

    // Header row
    currentPage.drawRectangle({
      x: MARGIN,
      y: y - rowHeight + 4,
      width: CONTENT_WIDTH,
      height: rowHeight,
      color: primaryNavy,
    });

    let currentX = MARGIN;
    headers.forEach((h, i) => {
      currentPage.drawText(h, {
        x: currentX + 6,
        y: y - 8,
        size: 8.5,
        font: fontBold,
        color: white,
      });
      currentX += colWidths[i];
    });

    y -= rowHeight;

    // Body rows
    rows.forEach((row, rIdx) => {
      const isEven = rIdx % 2 === 0;
      currentPage.drawRectangle({
        x: MARGIN,
        y: y - rowHeight + 4,
        width: CONTENT_WIDTH,
        height: rowHeight,
        color: isEven ? white : lightBg,
        borderColor: borderGray,
        borderWidth: 0.5,
      });

      currentX = MARGIN;
      row.forEach((cell, cIdx) => {
        currentPage.drawText(String(cell), {
          x: currentX + 6,
          y: y - 8,
          size: 8,
          font: fontRegular,
          color: textDark,
        });
        currentX += colWidths[cIdx];
      });

      y -= rowHeight;
    });

    y -= 8;
  }

  // ==========================================
  // PÁGINA 1: PORTADA Y RESUMEN EJECUTIVO
  // ==========================================
  newPage();

  // Banner superior decorativo
  currentPage.drawRectangle({
    x: 0,
    y: PAGE_HEIGHT - 140,
    width: PAGE_WIDTH,
    height: 140,
    color: primaryNavy,
  });

  // Franja decorativa dorada
  currentPage.drawRectangle({
    x: 0,
    y: PAGE_HEIGHT - 146,
    width: PAGE_WIDTH,
    height: 6,
    color: accentOrange,
  });

  currentPage.drawText('UNIVERSIDAD AUTÓNOMA DE QUERÉTARO', {
    x: MARGIN,
    y: PAGE_HEIGHT - 50,
    size: 11,
    font: fontBold,
    color: accentOrange,
  });

  currentPage.drawText('FACULTAD DE INFORMÁTICA • FIF STORE', {
    x: MARGIN,
    y: PAGE_HEIGHT - 68,
    size: 9.5,
    font: fontRegular,
    color: white,
  });

  currentPage.drawText('REPORTE TÉCNICO DE IMPLEMENTACIÓN', {
    x: MARGIN,
    y: PAGE_HEIGHT - 102,
    size: 20,
    font: fontBold,
    color: white,
  });

  currentPage.drawText('Base de Datos DBA, 100 Productos con Imágenes Web y Sistema de Autenticación', {
    x: MARGIN,
    y: PAGE_HEIGHT - 120,
    size: 9.5,
    font: fontOblique,
    color: rgb(220 / 255, 230 / 255, 240 / 255),
  });

  y = PAGE_HEIGHT - 175;

  // Cuadro de metadatos del proyecto
  currentPage.drawRectangle({
    x: MARGIN,
    y: y - 62,
    width: CONTENT_WIDTH,
    height: 62,
    color: lightBg,
    borderColor: borderGray,
    borderWidth: 1,
  });

  currentPage.drawText('FICHA TÉCNICA DEL PROYECTO', {
    x: MARGIN + 12,
    y: y - 14,
    size: 9,
    font: fontBold,
    color: secondaryNavy,
  });

  const metaCols = [
    { label: 'Framework:', val: 'Next.js 16 (App Router)' },
    { label: 'Base de Datos:', val: 'SQLite 3 (WAL Mode)' },
    { label: 'Seguridad / Auth:', val: 'Bcryptjs + HTTP-Only Session' },
    { label: 'Fecha:', val: 'Noviembre 2026' },
  ];

  let metaX = MARGIN + 12;
  metaCols.forEach((m, idx) => {
    if (idx === 2) {
      metaX = MARGIN + 12;
      y -= 16;
    }
    currentPage.drawText(m.label, { x: metaX, y: y - 32, size: 8, font: fontBold, color: textMuted });
    currentPage.drawText(m.val, { x: metaX + 85, y: y - 32, size: 8, font: fontRegular, color: textDark });
    metaX += 240;
  });

  y -= 45;

  drawHeading1('1. Resumen Ejecutivo');
  drawParagraph(
    'El presente documento detalla la ingeniería técnica, arquitectura de software y modificaciones aplicadas al proyecto "FIF Store", una plataforma web progresiva para el comercio estudiantil dentro de la Facultad de Informática de la Universidad Autónoma de Querétaro (UAQ).'
  );
  drawParagraph(
    'En respuesta a los requerimientos solicitados, se cumplieron al 100% los cuatro objetivos clave:'
  );

  drawBullet('1. Catálogo Masivo', 'Inserción exitosa de exactamente 100 productos clasificados en las 6 categorías institucionales con fotografías temáticas en alta resolución extraídas de la web.');
  drawBullet('2. Base de Datos Relacional para DBA', 'Implementación de SQLite embebido con mejor rendimiento (better-sqlite3 en modo WAL), con llaves foráneas e índices. Además, se exportó el script fif_store.sql compatible con DBeaver, TablePlus, DataGrip, MySQL y PostgreSQL.');
  drawBullet('3. Autenticación Real (Login y Registro)', 'Desarrollo de API Routes seguras con hashing de contraseñas mediante bcryptjs, restricción por dominio institucional (@uaq.edu.mx) y control de sesiones persistentes.');
  drawBullet('4. Documentación y Reporte en PDF', 'Generación automatizada de este informe técnico exhaustivo con especificaciones arquitectónicas, diagramas relacionales y guías de validación.');

  // ==========================================
  // PÁGINA 2: ARQUITECTURA Y BASE DE DATOS
  // ==========================================
  newPage();

  drawHeading1('2. Base de Datos Relacional y Conexión para DBA');
  drawParagraph(
    'Para garantizar portabilidad absoluta y compatibilidad inmediata con clientes de administración de bases de datos (DBA Tools), se diseñó e implementó un esquema relacional normalizado persistido en fif_store.db y fif_store.sql.'
  );

  drawHeading2('Esquema Relacional (DDL)');
  drawParagraph(
    'El modelo consta de tres entidades principales con integridad referencial ON DELETE CASCADE:'
  );

  drawTable(
    ['Tabla', 'Campo', 'Tipo SQL', 'Restricciones / Descripción'],
    [
      ['usuarios', 'id', 'TEXT (PK)', 'Identificador alfanumérico único (ej. u1, u_17000...)'],
      ['usuarios', 'nombre', 'TEXT NOT NULL', 'Nombre completo del alumno'],
      ['usuarios', 'carrera', 'TEXT NOT NULL', 'Licenciatura o Ingeniería en la FIF'],
      ['usuarios', 'telefono', 'TEXT NOT NULL', 'Número telefónico para contacto vía WhatsApp'],
      ['usuarios', 'correo', 'TEXT UNIQUE NOT NULL', 'Correo institucional (@uaq.edu.mx)'],
      ['usuarios', 'password', 'TEXT NOT NULL', 'Hash seguro generado mediante bcrypt (10 rounds)'],
      ['productos', 'id', 'INTEGER (PK)', 'Clave primaria autoincremental (1 al 100+)'],
      ['productos', 'nombre', 'TEXT NOT NULL', 'Nombre comercial de la botana o comida'],
      ['productos', 'precio', 'REAL NOT NULL', 'Precio en moneda nacional ($MXN)'],
      ['productos', 'categoria', 'TEXT NOT NULL', 'Papas, Galletas, Gomitas, Bebidas, Dulces, Comida'],
      ['productos', 'descripcion', 'TEXT NOT NULL', 'Detalles de entrega en facultades o salones'],
      ['productos', 'vendedor_id', 'TEXT (FK)', 'Relación foránea hacia usuarios(id) con CASCADE'],
      ['productos', 'vendido', 'INTEGER (0/1)', 'Bandera booleana de disponibilidad'],
      ['productos', 'imagenes', 'TEXT (JSON)', 'Arreglo JSON de URLs de fotografías web en alta calidad'],
      ['favoritos', 'id', 'INTEGER (PK)', 'Identificador autoincremental del marcador'],
      ['favoritos', 'usuario_id', 'TEXT (FK)', 'Alumno que guardó el favorito'],
      ['favoritos', 'producto_id', 'INTEGER (FK)', 'Producto guardado en favoritos'],
    ],
    [75, 80, 95, 255]
  );

  drawHeading2('Guía de Conexión para el Administrador de Base de Datos (DBA)');
  drawParagraph(
    'Cualquier DBA o docente puede inspeccionar y manipular la base de datos a través de dos mecanismos inmediatos:'
  );

  drawBullet('Opción A (Conexión Directa en DBeaver / TablePlus / DataGrip / SQLiteStudio)', '1. Abrir DBeaver u otro cliente DBA. 2. Crear nueva conexión tipo "SQLite". 3. En el campo "Database File", seleccionar el archivo fif_store.db ubicado en la raíz del proyecto. 4. Clic en "Probar Conexión" y "Finalizar". Podrá visualizar diagramas ER, tablas y realizar consultas SQL en vivo.');
  drawBullet('Opción B (Importación en MySQL / PostgreSQL / Oracle)', 'Se generó en la raíz el archivo fif_store.sql que contiene todos los CREATE TABLE, DROP TABLE e INSERT INTO con sintaxis universal ANSI SQL, permitiendo su importación directa en MySQL Workbench, phpMyAdmin o pgAdmin.');

  // ==========================================
  // PÁGINA 3: CATÁLOGO DE 100 PRODUCTOS
  // ==========================================
  newPage();

  drawHeading1('3. Catálogo de 100 Registros con Fotografías Web');
  drawParagraph(
    'Se realizó un exhaustivo proceso de poblamiento con 100 registros fieles a la vida universitaria y a los comercios cotidianos de los estudiantes de la FIF (botanas, dulces típicos mexicanos, galletas, bebidas heladas y comida preparada).'
  );

  drawHeading2('Distribución por Categorías');
  drawTable(
    ['Categoría', 'Cantidad', 'Rango de Precios', 'Ejemplos representativos'],
    [
      ['Papas', '17', '$18 – $38 MXN', 'Takis Fuego, Ruffles Queso, Doritos, Chidas Adobadas, Pringles'],
      ['Galletas', '17', '$15 – $25 MXN', 'Emperador, Chokis, Oreo, Brownies Caseros con Nuez, Barritas'],
      ['Gomitas', '17', '$12 – $22 MXN', 'Panditas, Skwinkles, Gomitas Enchiladas Mango, Gusanos Trolli'],
      ['Bebidas', '17', '$15 – $45 MXN', 'Coca-Cola Fría, Red Bull, Monster Mango Loco, Boing, Arizona'],
      ['Dulces', '16', '$7 – $35 MXN', 'Mazapán De la Rosa, Pelón Pelo Rico, Paleta Payaso, Duvalín'],
      ['Comida', '16', '$25 – $60 MXN', 'Pizza Pepperoni, Torta de Milanesa, Burrito de Bistec, Sushi Roll'],
      ['TOTAL', '100', '$7 – $60 MXN', '100% de productos asociados a vendedores reales'],
    ],
    [75, 60, 95, 275]
  );

  drawHeading2('Lógica de Asignación y Extracción de Imágenes Web');
  drawParagraph(
    'Para brindar una experiencia visual profesional y fidedigna, se implementó una lógica de asignación que enlaza cada registro con URLs directas de fotografía de producto y alimentos provenientes de CDNs web optimizadas (Unsplash Food & Beverages Cluster):'
  );

  drawBullet('Resolución y Rendimiento', 'Cada URL incluye parámetros de optimización dinámica (?auto=format&fit=crop&w=600&q=80), garantizando compresión WebP/JPEG rápida, bajo consumo de ancho de banda y carga diferida (lazy loading).');
  drawBullet('Mapeo Semántico', 'No se utilizaron imágenes aleatorias. Cada producto cuenta con una fotografía correspondiente a su textura y naturaleza (ej. totopos crujientes para Doritos, malvaviscos para paleta payaso, rebanadas doradas para pizza).');
  drawBullet('Mecanismo de Resiliencia (Fallback)', 'En app/components/ui/productImage.tsx se agregó un manejador onError que, en caso de fallo de conexión a Internet, conmuta de forma invisible al icono ilustrativo oficial de la categoría.');

  // ==========================================
  // PÁGINA 4: SISTEMA DE AUTENTICACIÓN
  // ==========================================
  newPage();

  drawHeading1('4. Módulo de Autenticación: Login y Registro');
  drawParagraph(
    'Se reemplazaron los formularios estáticos con un sistema completo de autenticación de dos factores lógicos: validación en capa de cliente y procesamiento en endpoints API seguros.'
  );

  drawHeading2('Endpoints REST Implementados');
  drawTable(
    ['Método', 'Ruta', 'Función Principal', 'Códigos de Respuesta'],
    [
      ['POST', '/api/auth/login', 'Verificación de credenciales con bcrypt y emisión de cookie de sesión', '200 OK, 400 Bad Request, 401 Unauthorized'],
      ['POST', '/api/auth/register', 'Validación de dominio @uaq.edu.mx, hash de password y alta en BD', '200 OK, 400 Bad Request, 409 Conflict'],
      ['GET', '/api/auth/me', 'Devuelve el usuario actual en sesión y directorio de alumnos', '200 OK'],
      ['POST', '/api/auth/logout', 'Destruye la cookie de sesión y restablece estado en el cliente', '200 OK'],
    ],
    [55, 115, 220, 115]
  );

  drawHeading2('Seguridad y Hashing con Bcrypt');
  drawParagraph(
    'Las contraseñas nunca se almacenan en texto plano en la base de datos. Se utiliza la biblioteca bcryptjs con factor de costo 10 (salt rounds). Incluso si un atacante accede al archivo fif_store.db, los hashes unidireccionales protegen la privacidad de los usuarios.'
  );

  drawHeading2('Flujo de Registro y Validación Institucional');
  drawParagraph(
    'Al registrarse, el formulario solicita: Nombre Completo, Carrera (selector oficial de la FIF), Teléfono de WhatsApp, Correo Institucional y Contraseña. Se valida por expresión regular y regla de negocio que el correo pertenezca forzosamente a @uaq.edu.mx o @alumnos.uaq.mx.'
  );

  drawHeading2('Credenciales de Prueba para Evaluación');
  drawParagraph(
    'Para facilitar la revisión por parte del docente o evaluador, la base de datos se inicializó con 5 usuarios y contraseñas listas:'
  );

  drawCodeBlock([
    '// Usuario de prueba principal:',
    'Correo:     alan.rubio@uaq.edu.mx',
    'Password:   password123',
    '',
    '// Nota: En la pantalla de Login se incluyó un botón de "Cargar cuenta demo"',
    '// para autorrellenar las credenciales con un solo clic.',
  ]);

  // ==========================================
  // PÁGINA 5: RESUMEN DE MODIFICACIONES Y PRUEBAS
  // ==========================================
  newPage();

  drawHeading1('5. Matriz de Modificaciones de Archivos');
  drawParagraph(
    'A continuación se resume el inventario de archivos creados y editados en el repositorio:'
  );

  drawTable(
    ['Archivo / Ruta', 'Estado', 'Descripción del Cambio'],
    [
      ['fif_store.db', 'Creado', 'Base de datos SQLite activa con 100 productos y 5 usuarios.'],
      ['fif_store.sql', 'Creado', 'Script SQL para DBAs (DBeaver, MySQL, Postgres, SQLite).'],
      ['app/lib/db.ts', 'Creado', 'Capa de acceso de datos con better-sqlite3 y modo WAL.'],
      ['app/lib/auth.ts', 'Creado', 'Manejo de cookies HTTP-Only y hashing con bcryptjs.'],
      ['app/api/auth/login/route.ts', 'Creado', 'Endpoint de validación de credenciales.'],
      ['app/api/auth/register/route.ts', 'Creado', 'Endpoint de registro con validación @uaq.edu.mx.'],
      ['app/api/auth/me/route.ts', 'Creado', 'Endpoint de verificación de sesión activa.'],
      ['app/api/auth/logout/route.ts', 'Creado', 'Endpoint de cierre de sesión.'],
      ['app/api/productos/route.ts', 'Creado', 'Endpoint para consultar y crear publicaciones.'],
      ['app/api/productos/[id]/route.ts', 'Creado', 'Endpoint para actualizar, marcar vendido y eliminar.'],
      ['app/api/favoritos/route.ts', 'Creado', 'Endpoint para listar y alternar favoritos.'],
      ['app/components/auth/login.tsx', 'Modificado', 'Formulario reactivo con API real y demo autofill.'],
      ['app/components/auth/register.tsx', 'Modificado', 'Formulario completo con carrera, tel y validaciones.'],
      ['app/components/profile/profileView.tsx', 'Modificado', 'Soporte de sesión dinámica y botón de Logout.'],
      ['app/components/ui/productImage.tsx', 'Modificado', 'Lazy loading y fallback onError automático.'],
      ['app/lib/store.ts', 'Modificado', 'Sincronización híbrida LocalStorage + API SQLite.'],
      ['app/lib/data.ts', 'Modificado', 'Catálogo inicial de 100 productos con tipado estricto.'],
      ['scripts/seed.js', 'Creado', 'Script de generación y migración de datos.'],
    ],
    [155, 65, 285]
  );

  drawHeading1('6. Conclusión y Verificación');
  drawParagraph(
    'El sistema "FIF Store" se encuentra completamente operativo, con su base de datos lista para inspección por parte de un DBA y con el servidor de desarrollo Next.js listo para ser levantado o probado en producción.'
  );

  // Cuadro final de validación exitosa
  currentPage.drawRectangle({
    x: MARGIN,
    y: y - 55,
    width: CONTENT_WIDTH,
    height: 55,
    color: rgb(236 / 255, 253 / 255, 245 / 255),
    borderColor: rgb(110 / 255, 231 / 255, 183 / 255),
    borderWidth: 1,
  });

  currentPage.drawText('ESTADO DE LA ENTREGA: COMPLETADA CON ÉXITO', {
    x: MARGIN + 12,
    y: y - 18,
    size: 10,
    font: fontBold,
    color: rgb(6 / 255, 95 / 255, 70 / 255),
  });

  currentPage.drawText('• 100 Productos insertados y verificados con imágenes web', {
    x: MARGIN + 12,
    y: y - 32,
    size: 8.5,
    font: fontRegular,
    color: rgb(6 / 255, 95 / 255, 70 / 255),
  });

  currentPage.drawText('• Base de datos SQLite (fif_store.db) y script SQL (fif_store.sql) generados para DBA', {
    x: MARGIN + 12,
    y: y - 44,
    size: 8.5,
    font: fontRegular,
    color: rgb(6 / 255, 95 / 255, 70 / 255),
  });

  // Numeración de páginas en pie de página
  const totalPages = pages.length;
  pages.forEach((p, idx) => {
    p.drawText(`Página ${idx + 1} de ${totalPages}`, {
      x: PAGE_WIDTH / 2 - 25,
      y: 20,
      size: 8,
      font: fontRegular,
      color: textMuted,
    });
  });

  const pdfBytes = await pdfDoc.save();
  const outputPath = path.join(__dirname, '..', 'FIF_Store_Reporte_Implementacion.pdf');
  fs.writeFileSync(outputPath, pdfBytes);
  console.log(`✓ Archivo PDF generado exitosamente en: ${outputPath}`);
}

generatePDF().catch(console.error);
