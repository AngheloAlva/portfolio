# OTC 360 flow illustration (pilot)

Objective: an animated illustration inside the OTC 360 case study that shows how OTC operators, maintenance/operations leads, safety staff and contractors connect through OTC 360. Branch: none yet (pilot is a standalone page; port to Next.js only after approval). Delivery: ask-on-risk. Test runner: none for the pilot (visual checks via the anatomy skill's capture scripts).

## Specs

- S1 — Main flow, quoted verbatim from the user (2026-10-26): "el flujo puede iniciar de varias maneras pero uno comun es en base a una solicitud de trabajo, esta la levanta un operador de OTC, despues de esto el jefe de operaciones o alguien de mantenimiento (son 2) aprueba la solicitud y crea la OT asignada a una empresa contratista, ahora el contratista tiene que crear su libro de obras para agregar los hitos y actividades, y tambien puede ya generar su Permiso de trabajo (que va asociado a una OT), despues de finalizar el trabajo enviar el o los hitos a aprobacion y la persona responsable de la OT que suele ser una de las personas de mantenimiento la aprueba, despues de eso queda la OT cerrada y ese seria el flujo normal"
- S2 — Branches, verbatim: "pero si puede ocurrir en medio que la persona de seguridad agregue una inspeccion de seguridad o que se rechaze un hito por falta de informacion o trabajo mal hecho, etc."
- S3 — Alternate origin, verbatim: "Despues la OT tambien se crea en base a un plan de mantenimiento que es para tareas preventivas, estos planes los crea el area de mantenimiento, son internos y si tienen opcion a crear una OT automaticamente pero normalmente es manual."
- S4 — Placement: inside the case-study content (not the home, not replacing the current UI-inspired wireframes), explaining something of value. Animated, "a modo de video", as an idea from the user; final medium to be evaluated.
- S5 — Modules the user named for the general view: "aprobaciones, Ordenes de trabajo, permisos de trabajo, solicitudes, registro de actividades, charlas de seguridad, planes de mantenimiento, etc."
- S6 — Prerequisites, verbatim (2026-10-26): "Las charlas de trabajo y documentacion en carpetas de arranque son cosas que deben estar aprobadas antes de cualquier tipo de trabajo, las charlas se hacen a travez de un mini curso con un video y examen que da cada contratista en la app, y la documentacion la suele subir un supervisor y es informacion empresarial (seguridad y salud operacional, medio ambiente), vehiculos y trabajadores, y pasa cada documento por aprobacion de OTC (area legal, medio ambiente y seguridad, pero nada de esto es en si parte de la OT si no que son requisitos". Shown as a "before any OT" block, not as swimlane steps.

## Tasks

- T1 — S1–S5 — inline — done: swimlane approved by the user (isometric dispatch line rejected).
- T2 — S1–S3, S6 — inline — done: Aprobado/Rechazado badges on approval steps, mobile duplicate text removed (caption is screen-reader only below lg). S6 prerequisites block added.
- T3 — S4 — inline — done in sketch form: rendered after "La solución" via the optional `flow` field in components/mockups/registry.ts.

## Log

- L1 (2026-10-26, user's request, verbatim): "Si me parece bien, tambien se me ocurre algo mas general que muestre como se une OTC, los operadores de OTC y los contratistas a travez de OTC 360 no se si capaz mas detalle de lo que hay dentro de la app como aprobaciones, Ordenes de trabajo, permisos de trabajo, solicitudes, registro de actividades, charlas de seguridad, planes de mantenimiento, etc. Lo que no se bien es como se podria hacer esto pero podrian ser ilustraciones animadas a modo de video, como idea"
- L2 (2026-10-26): user described the real flow (S1–S3). Recommended medium: animated in-page SVG over video (lighter, themable, interactive, reduced-motion friendly).
- L3 (2026-10-26, user verbatim): "Si me convence pero me cuesta imaginarlo realmente entonces puede que ya viendolo no me guste entonces no se"
- L4 (2026-10-26): sketch built in the session scratchpad (otc-flow/build.mjs, anatomy kit). Two loops: solicitud (6 steps) and plan de mantenimiento (9 steps, with safety inspection and a rejected milestone). Known sketch gaps: stamp-head face reads like a second card; rejection has no distinct visual; no sizes/detail pass. Awaiting user verdict on the concept.
- L5 (2026-10-26, user verbatim): "No, no creo realmente que se entienda si no conoces OTC 360" — the anatomy metaphor hides the names (roles, modules) the reader needs. Switched to a labelled swimlane in the site's own wireframe language.
- L6 (2026-10-26): swimlane sketch: 4 lanes (Operador OTC, Operaciones y mantenimiento, Contratista, Seguridad), 8 nodes with mini wireframes, 2 scenarios (solicitud 6 steps, plan 8 steps incl. inspección + hito rechazado, dashed return edge), autoplay in view, pause/prev/next, reduced-motion = manual, mobile = step list. tsc + eslint clean; checked desktop light/dark and 390 px. Charlas de seguridad still not placed.
- L7 (2026-10-26, user verbatim): "Me parece muy bueno, mucho mejor y entendible asi que vamos por esta linea"
- L8 (2026-10-26): polish applied; tsc + eslint clean; rejected state verified on desktop.
- L9 (2026-10-26): S6 received; prerequisites rendered as a separate block above the swimlanes; contractor lane detail now says the company is enabled.
- L10 (2026-10-26, user verbatim): "Charlas de seguridad" — module name confirmed; card already uses it. T2 done.
