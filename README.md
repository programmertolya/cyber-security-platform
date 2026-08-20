<div align="center">

# 🛡️ Cyber Security Educational Platform

**Интерактивная образовательная платформа по развитию компетенций в области информационной безопасности посредством игровых механик.**

[![React](https://img.shields.io/badge/React-18-blue?logo=react&logoColor=white)](https://react.dev/)
[![.NET](https://img.shields.io/badge/.NET-10.0-purple?logo=dotnet&logoColor=white)](https://dotnet.microsoft.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)
[![Ollama](https://img.shields.io/badge/Ollama-DeepSeek--R1-black?logo=ollama&logoColor=white)](https://ollama.com/)

</div>

---

## 📖 О проекте

Платформа представляет собой сочетание уроков и задач по информационной безопасности:
* 🎯 **Интерактивные сценарии:** профильные игры, каждая из которых решает конкретную образовательную задачу.
* 🤖 **AI-ассистент:** локально развернутая нейросеть через Ollama, выдающая контекстные подсказки без отправки данных в сторонние API.
* 📊 **Геймификация и рейтинг:** подсчет очков за решение задач, сохранение истории прогресса.

---

## 🏗 Архитектура и структура проекта

```text
├── backend/            # .NET Core Web API (EF Core)
├── frontend/           # React + TypeScript + Vite + Nginx
├── docker-compose.yml  # Оркестрация всех сервисов
└── README.md           # Документация проекта

🚀 Быстрый старт
Требования
Установленный Docker Desktop (с поддержкой Compose v2).
1. Клонирование
  git clone git@github.com:programmertolya/cyber-security-platform.git
  cd cyber-security-platform
2. Запуск контейнеров
  docker compose up -d --build
⏱️ При первом запуске нужно скачать модель Ollama
  docker exec -it ollama_container ollama pull qwen2.5:3b
3. Переход в директорию API(cd backend/src/API) и копирование скрипта в контейнер с БД
  docker cp migrate.sql cyber_db:/migrate.sql
4. Выполнение скрипта внутри контейнера БД
  docker exec -it cyber_db psql -U admin -d cyber_security_db -f /migrate.sql
5. Переход на http://localhost:5050, Servers пкм -> register -> Server:
  Name - cyber_security_db, на вкладке Connection -> Host name - db, пароль из файла appsettings.json
6.Находим таблицу Users(cyber_security_db -> Schemas -> public -> Tables) пкм -> View/Edit Data
  -> All Rows, в окне Query выполняем запрос:
 alter table "Users" alter column "CreatedAt" set default NOW()

🌐 Доступ к сервисам
После успешного запуска перейдите по адресам:
  Сервис	                  Адрес	                      Логин / Пароль (по умолчанию)
  Веб-интерфейс (Frontend)	http://localhost	          —
  Backend REST API	        http://localhost:5000	      —
  pgAdmin 4 (БД)	          http://localhost:5050	      admin@admin.com / admin
  Ollama AI API	            http://localhost:11434	    —
🛑 Остановка и управление
Остановить все сервисы:
  docker compose down
Остановить и сбросить все данные (БД и модели ИИ):
  docker compose down -v
Посмотреть логи бэкенда:
  docker logs azbuka_api -f
