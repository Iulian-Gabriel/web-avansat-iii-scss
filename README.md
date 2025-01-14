Proiectul prezent este un simplu joculeț de tip "clicker incremental" unde jucatorul apasa pe o imagine pentru a genera venituri sub forma de "Poro-Snax" care sunt folosiți pentru a putea îmbunătăți veniturile.

Este un joculeț simplu care urmează și tematica din cadrul sesiunii de comunicări studențești, unde a fost promovată crearea de jocuri video indiferent de resurse și cunoștințe, scoțând în evidență simplicitatea.

Funcționalități principale : 
Apăsarea pentru a genera veniturilor
"Upgrade"-uri care îmbunătățesc generarea de venituri
Sistem de "Prestige" care resetează progresul jucătorului până în acel punct pentru generarea unei monede diferite, bazat pe câte "Poro-Snax" avea jucătorul.
Sistem de autenticare unde jucătorul se poate înregistra și loga
Sistem pentru salvarea progresului, salvând o variabilă "gameState" unde toate "currency"-urile și "upgrade"-urile sunt salvate.
Sistem pentru preluarea din baza de date a progresului, inițializând jucătorul înapoi de unde a ramas.

Tehnologii folosite : 
Vanilla HTML/CSS
Node.js cu Express pentru backend
PostgreSQL pentru baza de date.

API endpoints pentru înregistrare, logare, salvare și preluare a datelor.

Parolele jucătorilor sunt criptate, folosind modulul bcrypt.
