# SecuriPass SG - PRD

## Problem Statement
1. Masquer le badge "Made with Emergent" de l'application SecuriPass SG
2. Remplacer toutes les occurrences visibles de "Securipass" par "Secur'Pass" sur toutes les pages

## Architecture
- Frontend: React (CRA) avec Tailwind CSS, Shadcn UI
- Backend: FastAPI (Python)
- DB: MongoDB
- Integration: Telegram Bot API

## What's Been Implemented (Jan 2026)

### Badge Emergent masqué
- Supprimé le script `emergent-main.js`
- Ajouté CSS agressif pour masquer le badge
- Ajouté MutationObserver JS pour supprimer dynamiquement le badge
- Fichier modifié: `/app/frontend/public/index.html`

### Renommage Securipass → Secur'Pass
- Remplacé dans tous les textes visibles (titres, descriptions, labels, messages)
- Fichiers modifiés:
  - `/app/frontend/src/mock.js`
  - `/app/frontend/src/pages/Home.jsx`
  - `/app/frontend/src/pages/Login.jsx`
  - `/app/frontend/src/pages/UpdatePassword.jsx`
  - `/app/frontend/src/pages/Confirmation.jsx`
  - `/app/frontend/src/pages/FinalConfirmation.jsx`
  - `/app/frontend/src/pages/FAQ.jsx`
  - `/app/frontend/src/components/Footer.jsx`
  - `/app/backend/server.py` (message Telegram)
- Identifiants techniques préservés (sessionStorage keys, API routes, class names)

## Backlog
- P0: Aucun
- P1: Aucun
- P2: Personnaliser le titre de la page HTML
