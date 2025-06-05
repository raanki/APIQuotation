
# APIQuotation

API REST de gestion de citations, construite avec **Spring Boot** pour le back et Next.js pour le front.  
Le projet propose des opérations CRUD sur les entités `Quotation` et `Category`, avec une documentation Swagger, un déploiement Docker, et une surveillance via Prometheus & Grafana.
il inclue aussi de nombreux test de plusieurs types différent.

---

## 📁 Structure du projet

```
APIQuotation/
├── .github/             → Fichiers GitHub Actions CI/CD
├── docker-compose.yml   → Dockerisation de l'app (Back + Front + DB + Grafana)
├── Dockerfile           → Image du backend Spring Boot
├── front/               → Frontend React (WIP)
├── src/                 → Code source Java Spring Boot
│   ├── controller/      → Contrôleurs REST
│   ├── service/         → Services métiers
│   ├── model/           → Entités JPA
│   ├── dto/             → Objets de transfert de données
│   ├── repository/      → Repositories Spring Data
│   └── config/          → Configuration Swagger, Prometheus, etc.
```

---

## ⚙️ Technologies utilisées

- **Java 21**, **Spring Boot 3.5**
- **PostgreSQL** (via Docker)
- **Swagger UI** pour la documentation
- **Docker / Docker Compose**
- **Prometheus / Grafana** pour la supervision
- **Next.js** (frontend)

---

## 🚀 Lancer le projet

### 📦 Prérequis

- Docker
- Java 21
- Gradle

### 🐳 Lancer tous les services avec Docker

```bash
docker compose up --build
```

Accès :

- ONLINE DEMO : [[http://localhost:3000](http://localhost:3000)]

- FRONT : [http://localhost:3000](http://localhost:3000)
- API : [http://localhost:8080](http://localhost:8080)
- Swagger : [http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html)
- Grafana : [http://localhost:3005](http://localhost:3000)
  - login: `admin`, password: `admin`

---

## 📕 Documentation API

Accessible via Swagger :
[http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html)

Exemples :

### ➕ POST `/api/quotations`

```json
{
  "content": "La vie est belle",
  "author": "Anonyme",
  "categoryId": 1
}
```

### 🔁 GET `/api/quotations`
Retourne la liste des citations.

### ✏️ PUT `/api/quotations/{id}`

### ❌ DELETE `/api/quotations/{id}`

---

## 🧠 Supervision

L'application expose des métriques Prometheus via l’endpoint :

```
/actuator/prometheus
```

ou

```
/metrics
```


Prometheus scrape ces données et Grafana les affiche via un dashboard prédéfini.

---

## 🧪 Tests

Lancer les tests unitaires :
```bash
./gradlew test
```

## 🙋 Auteur

**Rayan Anki**  
**Yessi Recerlyn**  
