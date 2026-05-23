---
layout: default
title: Plantilla de Caso de Uso
parent: Requerimientos de Negocio
nav_order: 1
---

# 📝 Plantilla de Caso de Uso (Negocio)

*Código de Caso de Uso:* **[CU-XXX]**  
*Nombre:* **[Nombre del caso de uso en lenguaje claro, ej: Registro de nuevo comercio]**  
*Fecha de Creación/Modificación:* **[AAAA-MM-DD]**  
*Propietario / Product Owner:* **[Nombre del responsable de producto]**

---

## 🎯 1. Descripción
*Describe brevemente y en lenguaje no técnico el objetivo que el usuario o el negocio busca lograr con este flujo.*

Ejemplo: Permitir que un nuevo comercio se registre en la plataforma LAND4 para poder recibir pagos electrónicos, recopilando sus datos legales e información bancaria básica.

---

## 👥 2. Actores
*Identifica quién o qué inicia o participa en el caso de uso (usuarios, administradores, sistemas externos).*
*   **Actor Principal:** [Ej. Comercio Solicitante, Administrador del Sistema]
*   **Actores Secundarios:** [Ej. Sistema de Validación de Identidad (Tercero)]

---

## 🚦 3. Precondiciones
*¿Qué condiciones deben cumplirse antes de que este caso de uso pueda comenzar?*
*   El usuario debe contar con un correo electrónico válido.
*   [Precondición 2]

---

## 🛣️ 4. Flujo Principal (Camino Feliz)
*Paso a paso cronológico y numerado de cómo se ejecuta el flujo desde el inicio hasta el éxito.*

1. El **Comercio Solicitante** ingresa al portal y selecciona "Crear Cuenta".
2. El sistema muestra el formulario de datos básicos (Nombre, Identificación, Correo, Teléfono).
3. El **Comercio Solicitante** completa el formulario y presiona "Siguiente".
4. El sistema valida que el formato de los datos sea correcto y que el correo no esté registrado previamente.
5. El sistema envía un código de verificación de 6 dígitos al correo proporcionado.
6. El **Comercio Solicitante** ingresa el código recibido.
7. El sistema confirma la validación y crea la cuenta en estado "Pendiente de Aprobación".

---

## 🔄 5. Flujos Alternativos y Excepciones
*Describe qué sucede si las cosas no van por el camino principal (errores, decisiones, cancelaciones).*

### 5.1. Correo ya registrado (Paso 4)
*   **5.1.1.** El sistema detecta que el correo ya tiene una cuenta asociada.
*   **5.1.2.** El sistema muestra un mensaje indicando que el correo ya existe y ofrece un enlace para "Recuperar Contraseña".
*   **5.1.3.** El flujo vuelve al paso 2.

### 5.2. Código de verificación inválido o expirado (Paso 6)
*   **5.2.1.** El usuario ingresa un código incorrecto.
*   **5.2.2.** El sistema muestra un mensaje de error: "Código inválido. Te quedan N intentos".
*   **5.2.3.** Si supera los 3 intentos, el sistema expira el código y el usuario debe solicitar un nuevo código (volver al paso 5).

---

## 🏁 6. Postcondiciones
*¿Cuál es el estado del sistema una vez completado el caso de uso con éxito?*
*   La cuenta del comercio queda registrada en la base de datos con estado "Pendiente".
*   Se genera un evento de notificación para el equipo de Operaciones para revisión manual de documentos.

---

## ⚖️ 7. Reglas de Negocio
*Políticas o restricciones del negocio que rigen este comportamiento.*

| ID Regla | Nombre | Descripción / Restricción |
| :--- | :--- | :--- |
| **RN-01** | Mayoría de Edad | Solo se permite el registro a representantes legales mayores de 18 años. |
| **RN-02** | Jurisdicción | Solo se permiten registros con identificaciones legales válidas en Costa Rica (cédula física, jurídica, DIMEX). |
