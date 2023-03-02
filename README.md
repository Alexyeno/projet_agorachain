CONFIGURER LA BASE DE DONNÉES PostgreSQL(Terminal)

Lancer le serveur SQL :
pg_ctl -D /usr/local/var/postgres

Rentrer dans la console PostgreSQL:
psql postgres

Créer le bon rôle :
CREATE ROLE agora SUPERUSER LOGIN PASSWORD '123';

Créer la bonne database :
CREATE DATABASE agorachain_users;



LANCER LE PROJET :

Pour le frontend, dans le répertoire racine :
npm run dev

Pour le backend, dans le répertoire src :
node backend.js



À NOTER : SI VOUS QUITTEZ PUIS RELANCEZ LE BACKEND, LES DONNÉES DÉJÀ ENREGISTRÉES DANS LA BASE DE DONNÉES SERONT PERDUES.