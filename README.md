# NodeJS CRUD Application

Aceasta este o aplicație Node.js care oferă operațiuni CRUD (create, read, update, delete) pentru entitățile `Client`, `Motocicleta`, și `Inchirieri`. Aplicația utilizează Prisma pentru gestionarea bazei de date și JWT pentru autentificare.

## Descrierea Aplicației

Aplicația gestionează clienți, motociclete și închirieri, permițându-vă să creați, să citiți, să actualizați și să ștergeți înregistrări pentru fiecare dintre aceste entități.

## Configurare și Instalare

### Pași de Configurare

1. Clonați repository-ul:

   ```bash
   git clone https://github.com/user/repo.git
   cd repo
   ```

2. Instalați dependențele:

   ```bash
   npm install
   ```

3. Configurați baza de date:

   - Deschideți fișierul `.env` și adăugați detaliile de conectare la baza de date:
     ```env
     DATABASE_URL="postgresql://postgres:1234@localhost:5432/nodejs"
     JWT_SECRET="secret"
     ```

4. Rulați migrațiile pentru a crea tabelele în baza de date:

   ```bash
   npx prisma migrate dev --name init
   ```

5. Porniți serverul:
   ```bash
   npm start
   ```

Serverul va porni la `http://localhost:3000`.

## API Endpoints

### Client

- **Creare Client**

  ```http
  POST /clientPost
  ```

- **Obține Toți Clienții**

  ```http
  GET /clientGet
  ```

- **Actualizare Client**

  ```http
  PUT /clientPut/:id
  ```

- **Ștergere Client**
  ```http
  DELETE /client/:id
  ```

### Motocicleta

- **Creare Motocicleta**

  ```http
  POST /motocicletaPost
  ```

- **Obține Toate Motocicletele**

  ```http
  GET /motocicletaGet
  ```

- **Actualizare Motocicleta**

  ```http
  PUT /motocicletaUpdate/:id
  ```

- **Ștergere Motocicleta**
  ```http
  DELETE /motocicletaDelete/:id
  ```

### Inchirieri

- **Creare Inchiriere**

  ```http
  POST /inchirieriPost
  ```

- **Obține Toate Inchirierile**

  ```http
  GET /inchirieriGet
  ```

- **Actualizare Inchiriere**

  ```http
  PUT /inchirieriUpdate/:id
  ```

- **Ștergere Inchiriere**
  ```http
  DELETE /inchirieriDelete/:id
  ```

## Explicarea Variabilelor de Mediu

- `DATABASE_URL`: URL-ul de conectare la baza de date PostgreSQL.
- `JWT_SECRET`: Secretul utilizat pentru semnarea JWT-urilor.

## Diagrama Bazei de Date

![Diagrama Bazei de Date](./images/diagramaNodeJs.png)

Această diagramă ilustrează relațiile dintre entitățile `Client`, `Motocicleta`, și `Inchirieri`.

### Exemple de Cereri

#### Creare Motocicleta

```http
POST /motocicletaPost
Content-Type: application/json

{
  "marca": "Suzuki",
  "an": 2000,
  "idInchiriere": "14"
}
```

## Flow Chart Diagram

Aceasta diagramă arată fluxurile principale de utilizare ale API-ului pentru gestionarea clienților.

1. **Autentificare Client** (`/login`, `POST`)
2. **Creare Client** (`/clientPost`, `POST`)
3. **Vizualizare Clienți** (`/clientGet`, `GET`)
4. **Actualizare Client** (`/clientPut/{id}`, `PUT`)
5. **Ștergere Client** (`/client/{id}`, `DELETE`)

![Flow Chart Diagram](./images/flowchart.png)
