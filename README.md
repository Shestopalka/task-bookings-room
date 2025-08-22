
## Що потрібно для запуску

### Клонування репозиторію

git clone https://github.com/Shestopalka/task.git
cd task

### Встановити:

- [Node.js](https://nodejs.org/) (LTS версія)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) — для запуску бази даних + redis

---

## Запуск у режимі розробки

### 1. Встановити залежності

npm install

### 2. Запустити базу даних + redis

Запустити Docker Desktop, після чого виконати команду в терміналі проєкту:

docker-compose up -d
База доступна на localhost:5432. та redis на localhost:6379

---

### 3. Запустити додаток у dev-режимі

npm run start:dev
