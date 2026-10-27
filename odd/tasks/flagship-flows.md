# Flagship case-study flows (Busanc, Dashboard TurismoChileTours, AIEP PEI)

Objective: give the remaining flagship case studies the same labelled swimlane walkthrough as OTC 360, built on one shared engine. Branch: feat/case-studies-hierarchy-and-flow (not to be merged until the user approves). Delivery: ask-on-risk. Test runner: none (tsc + eslint + visual checks in the browser).

## Specs

- S1 — Engine: extract the OTC 360 swimlane into a reusable component driven by per-project data (lanes, nodes, edges, scenarios). OTC 360 keeps its current look and behavior.
- S2 — Busanc flow (draft accepted by the user, with one correction): SC → Ingeniería guarda componentes → Hispana y Evaluación y Costos en paralelo → cotización → OC → OT por componente (Metálico → Goma → Pintura → Calidad) → guía de despacho. Correction, verbatim (2026-10-27): "La OC en Busanc la revisa el area Comercial." Confirmed (2026-10-27): a repetitive project skips Ingeniería and goes straight to Evaluación y Costos.
- S3 — Dashboard TurismoChileTours flow, user additions verbatim (2026-10-27): "una venta puede venir de una cotizacion igual, y tambien que hay toda una gestion de proveedores con pagos a estos, tambien un analisis grande de informacion historica, y sobre el que se aprueba en esta app pues se aprueban operaciones sensibles como anular un evento, cancelar un tour y por lo tanto devolucion de dinero, etc." Confirmed (2026-10-27): an operator requests the sensitive operation and administration approves it. Wholesalers vs agencies, verbatim (2026-10-27): "1. Agencias Mayoristas son agencias que se dedican a la venta de tours pero no los ejecutan como Despegar 2. Agencias solo hace referencia a otras agencias que operan tours (independiente si venden) y solo a este tipo de agencias se traspasa o recepciona porque operan tours justamente 3. [...] mayoristas no envian pasajeros para recepcion si no que venden pasajeros por lo tanto es una venta por canal mayorista 4. El flujo de cobro de mayoristas es muy distinto al cobro entre agencias que ademas se llama Balance de Agencias y se cobra y paga dependiendo la diferencia entre recepciones y traspasos, en cambio a las agencias se hace a travez del modulo de facturacion y se cobra por venta total" — "no hay que mezclar agencias y agencias mayoristas basicamente".
- S4 — AIEP PEI flow (draft accepted): ingreso @aiep.cl → admin activa pregunta → polling 2–4 s → respuesta en 60 s sin feedback → ranking por sede tras P4 y P8 → sorteo 10/10 y pregunta bonus. Verbatim (2026-10-27): "De AIEP sacar el item de Llegada tardía porque no aporta nada realmente".
- S5 — Placement: same slot as OTC (after "La solución", via the `flow` field in components/mockups/registry.ts), with mobile step list, reduced-motion manual mode and pause/prev/next.

## Tasks

- T1 — S1, S5 — inline — done (edd9568): components/mockups/swimlane-flow.tsx; OTC visually unchanged.
- T2 — S2, S5 — inline — done (5931d4b): 5 lanes, 2 scenarios (nuevo, repetitivo), parallel step.
- T3 — S3, S5 — inline — done (4c610e5): 3 lanes, 3 scenarios (venta, cancelación, entre agencias).
- T4 — S4, S5 — inline — done (4c610e5): 3 lanes; llegada tardía removed in T5.
- T5 — S3, S4 — inline — done: Dashboard split into Agencias mayoristas / Otras agencias lanes, 4 scenarios (venta, cancelación, venta mayorista → Facturación, entre agencias → Balance de agencias); AIEP single scenario; engine node titles wrap to 2 lines.

## Log

- L1 (2026-10-27, user's request, verbatim): "Hola me ayudarias a continuar con la mejora en los proyectos, ahora creo seguiria poner visuales en los proyectos importantes restantes igual que en OTC 360"
- L2 (2026-10-27): drafted the three flows from the case-study copy and asked for corrections.
- L3 (2026-10-27, user verbatim): "La OC en Busanc la revisa el area Comercial. Para El dashboard de TurismoChileTours agregaria que una venta puede venir de una cotizacion igual, y tambien que hay toda una gestion de proveedores con pagos a estos, tambien un analisis grande de informacion historica, y sobre el que se aprueba en esta app pues se aprueban operaciones sensibles como anular un evento, cancelar un tour y por lo tanto devolucion de dinero, etc."
- L4 (2026-10-27): built T1–T4; tsc + eslint clean; checked desktop 1440 (all four) and 390 px (Busanc). Side fix c5eab9f: Dashboard migration glyph key still said "11 años" after the copy fix, so the card fell back to the generic glyph. Pending: user review of the visuals and of the two assumptions (Busanc repetitive skips Ingeniería; Dashboard operator requests, admin approves).
- L5 (2026-10-27): user confirmed both assumptions and asked to remove AIEP llegada tardía and fix the agencies scenario (wholesalers vs operating agencies, Facturación vs Balance de agencias). Done in T5; tsc + eslint clean; checked desktop 1440.
