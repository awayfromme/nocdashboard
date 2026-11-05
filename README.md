# NOC Dashboard

Dashboard web per organizzare attività di un Network Operations Center: turni, calendario, notifiche di manutenzione, link utili, file e grafici.

## Requisiti

- Node.js 20.19 o successivo e npm
- MongoDB raggiungibile dall'applicazione
- Per la funzione File Manager, il servizio Syncfusion configurato e raggiungibile (l'URL attuale è `http://localhost:8090/`)

## Avvio in locale

1. Clona il repository e apri la cartella del progetto.
2. Copia `.env.example` in `.env`.
3. Imposta i valori privati descritti sotto.
4. Installa dipendenze backend: `npm install`.
5. Installa dipendenze frontend: `npm run install-client`.
6. Avvia backend e frontend insieme: `npm run develop`.
7. Apri `http://localhost:3000`.

Il backend Express usa la porta 5000; in sviluppo il frontend inoltra le chiamate API al backend tramite il proxy di Create React App.

## Configurazione

| Variabile | Obbligatoria | Descrizione |
| --- | --- | --- |
| `MONGODB_CONNECTION_STRING` | Sì | URI di connessione a MongoDB. |
| `SECRETORKEY` | Sì | Segreto lungo e casuale usato per firmare i token di sessione. |
| `REGISTRATION_INVITE_CODE` | Sì | Codice richiesto per registrare un nuovo account. |
| `PORT` | No | Porta HTTP del backend, predefinita `5000`. |

Non inserire mai segreti nel repository. `.env` è ignorato da Git; in produzione configura le variabili nell'ambiente del provider di hosting.

## Comandi

- `npm run server` avvia solo il backend.
- `npm run start --prefix client` avvia solo il frontend.
- `npm run build` crea la build statica in `client/build`.
- `npm run install-client` installa i pacchetti frontend con la risoluzione peer usata dal progetto.

## Database

La versione attuale usa MongoDB per utenti, turni, attività, notifiche, link e configurazioni. Se il servizio MongoDB attuale non è più disponibile, la direzione consigliata è PostgreSQL gestito (ad esempio Supabase) con accesso dal solo backend Express tramite `pg`; non serve spostare l'autenticazione su Supabase. Prima del cambio occorre verificare se il database esistente è recuperabile, esportare i dati e importare utenti e record mantenendo ID e riferimenti. La migrazione dello schema e dei dati non è ancora implementata: fino ad allora il server richiede `MONGODB_CONNECTION_STRING`.

## Accesso e dati

La registrazione è protetta dal codice invito. Le API che leggono o modificano dati richiedono un token bearer valido; l'interfaccia lo invia dopo il login. Conserva `SECRETORKEY` e `REGISTRATION_INVITE_CODE` privati e sostituiscili se vengono esposti.

## Contribuire

Le contribuzioni sono benvenute: segnalazioni, documentazione, accessibilità, correzioni e nuove funzionalità. Consulta [CONTRIBUTING.md](CONTRIBUTING.md) per setup e indicazioni sulle pull request. Evita di includere credenziali, `.env`, dump del database o dati operativi reali.

## Struttura

- `server.js`, `config/`, `routes/`, `models/`: server Express, autenticazione, API e modelli MongoDB.
- `client/src/`: applicazione React, schermate e stili.
- `validation/`, `helpers/`: validazione degli input e funzioni condivise.

## Deploy

Imposta le variabili d'ambiente sul provider, installa le dipendenze e genera la build frontend. Lo script `heroku-postbuild` installa anche le dipendenze client e crea la build per ambienti che supportano il lifecycle Heroku. Verifica che MongoDB e il servizio file siano raggiungibili dal server distribuito.
