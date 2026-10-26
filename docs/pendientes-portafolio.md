# Pendientes del portafolio — casos de estudio

Contexto para la próxima ronda de cambios (visuales y de estructura). Los textos y datos de los casos ya se corrigieron el 26-10-2026; lo que sigue son cambios de diseño y componentes.

## 1. Jerarquía entre proyectos — HECHO (26-10-2026)

La home usa `isFlagship`: el carrusel muestra los 4 casos completos y debajo hay tarjetas compactas ("Sitios web para clientes") con captura, resumen, "Ver caso" y "Visitar sitio". Los 4 sitios conservan su página de caso.


Hoy los 8 proyectos tienen `isFlagship: true` y la misma plantilla larga, así que ninguno destaca y un reclutador no sabe cuál mirar. `isFlagship` e `isProduction` no se usan en ningún componente.

Propuesta:

- **Casos completos (4):** OTC 360, Busanc, Dashboard TurismoChileTours y Desafío PEI AIEP. Busanc queda como caso completo por su tamaño, aunque esté pausado (decidido el 26-10-2026).
- **Tarjetas cortas** (captura + 2 líneas + link) para TurismoChileTours (sitio), San Pedro de Atacama, Grupo CAEMP y BZ Consulting.
- Usar `isFlagship` de verdad para decidir qué proyectos muestran el caso completo y en qué orden.

## 2. Visuales de los casos privados

El hero y las 6 tarjetas de "Funcionalidades" de los casos privados (OTC, Busanc, Dashboard, AIEP) son wireframes grises. Se ven como placeholders.

- Opción A: capturas reales de instancias locales con datos ficticios (seed), con blur o recorte donde haga falta.
- Opción B: menos tarjetas de funcionalidades (3 en vez de 6) con un visual más trabajado.
- Los proyectos públicos ya tienen capturas reales en `/public/projects/`.

## 3. Decisiones técnicas: mostrar `detail` — HECHO (26-10-2026)

`case-study.tsx` muestra Restricción / Decisión / Resultado debajo de `reason` cuando existe `detail`.


El tipo `CaseStudyTechItem` tiene `detail` (`constraint` / `decision` / `outcome`), pero `case-study.tsx` solo muestra `reason`. CAEMP y AIEP ya tienen ese contenido escrito y no se ve. Mostrarlo (por ejemplo, como acordeón o en tres columnas) permite reducir la lista a 2–3 decisiones reales por caso. Ya se recortaron las decisiones genéricas (Zustand, Recharts, Vercel, etc.).

## 4. Sección "Qué salió mal / qué aprendí"

Hoy no existe como campo. Para AIEP se agregó como bloques dentro de `solution`. Si se agrega un campo propio (`learnings?: ParagraphBlock[]`) y una sección en `case-study.tsx`, conviene moverlo ahí y sumar uno a OTC y al Dashboard.

## 5. Etiqueta "En producción" en el hero — HECHO (26-10-2026)

La etiqueta ahora es "Lanzamiento" y el valor de OTC pasó a "Abril 2025".


El meta del hero siempre usa la etiqueta "En producción". Para Busanc el valor es "Junio 2026", escrito en pasado a propósito (salió a producción en junio de 2026 y hoy está pausado por el cliente; se decidió no mencionar la pausa). Para no implicar que sigue en uso, conviene cambiar la etiqueta a "Salida a producción" o "Lanzamiento" en todos los casos.

## 6. Ilustraciones dentro de los casos (en evaluación)

Idea: ilustraciones técnicas hechas con `/dimensional-drawing` o `/anatomy`, ubicadas **dentro del contenido** de cada caso completo (no en la home ni reemplazando el hero), que expliquen algo de valor (arquitectura, un flujo clave, una decisión). Los wireframes actuales del hero y de las funcionalidades están inspirados en la UI real de cada proyecto; reemplazarlos solo si la alternativa se evalúa y aporta más.

## 7. Otros

- "Más proyectos" (mini proyectos) tiene botones "Ver demo" y el FAQ "¿Por qué la mayoría de los proyectos son demos…?". Decidir si se mantienen.
- Los meses de OTC se calculan con `monthsSince(2025, 4)` en cada build. Si el sitio pasa mucho tiempo sin desplegarse, el número queda congelado hasta el siguiente deploy.
