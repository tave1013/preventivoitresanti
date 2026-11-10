// ─────────────────────────────────────────────────────────────
//  TUTTI I CONTENUTI DEL PREVENTIVO SONO QUI.
//  Per cambiare prezzi, testi, date o servizi modifica solo questo file.
// ─────────────────────────────────────────────────────────────

export const cliente = {
  nome: "Trattoria I Tre Santi",
  titolare: "Marino Emanuele",
  emoji: "🫒",
  indirizzo: "Via Ciantagalletto 17, 17100 Savona (SV)",
  sito: "agriturismoitresanti.it",
  intro: "Sito, menù digitale, social e Google pronti per l'apertura. Poi, alla parte online, pensiamo noi.",
};

export const fornitore = {
  nome: "Tavella Distribuzione",
  ragioneSociale: "Tavella Distribuzione di Tavella Ivo",
  indirizzo: "Via San Sebastiano 10, Terzo (AL)",
  piva: "02228570061",
  sito: "www.tavelladistribuzione.com",
  email: "info@tavelladistribuzione.com",
  telefono: "+39 391 4272540",
};

export const contatto = {
  nome: "Eric",
  whatsapp: "393914272540",
  messaggio: "Ciao Eric, ho visto il preventivo per Trattoria I Tre Santi e vorrei fare due domande.",
};

// Date in formato AAAA-MM-GG. La pagina calcola da sola il tempo rimasto.
export const date = {
  emissione: "2026-11-09",
  scadenza: "2026-11-16",
};

// Servizio selezionato all'apertura della pagina
export const pianoIniziale = "avvio";

export const intro = {
  titolo: "Un'identità chiara su ogni piattaforma, pronta per l'apertura.",
  testo: "Partiamo a step, così che tutto sia coerente: prima mettiamo online il locale, con sito, menù digitale, Google, TripAdvisor, Facebook, Instagram e WhatsApp Business, tutto allineato e pronto per l'apertura. Poi ci occupiamo noi di contenuti e presenza online, così tu puoi concentrarti sulla cucina, sui clienti e sulla crescita del locale.",
  step: [
    { n: "1", titolo: "Sopralluogo e materiali", testo: "Veniamo sul posto, raccogliamo informazioni, accessi e prime foto." },
    { n: "2", titolo: "Messa online", testo: "Sito, menù digitale, Google, TripAdvisor, social e WhatsApp pronti per l'apertura." },
    { n: "3", titolo: "Gestione e crescita", testo: "Contenuti, recensioni e aggiornamenti: ci pensiamo noi, mese dopo mese." },
  ],
};

// ─── I DUE SERVIZI ───────────────────────────────────────────
export const plans = [
  {
    id: "avvio",
    numero: "Servizio 1",
    name: "Avvio Online",
    tagline: "Online e trovabile fin dal primo giorno",
    color: "#5E7A3A",
    bg: "#F2F5EC",
    border: "#CFDBBD",
    prezzo: "600",
    prezzoPieno: "900",
    periodo: "pagamento unico",
    durata: "Una tantum",
    extra: "+ € 150 + IVA rimborso trasferte",
    summary: "Tutto quello che serve per essere online e farsi trovare dai clienti fin dal primo giorno. Ce ne occupiamo noi dall'inizio alla fine: realizzazione, configurazione e collegamento di ogni piattaforma.",
    profilo: {
      icon: "⚡",
      badge: "Lavorazione EXPRESS",
      headline: "Pronti per l'apertura di fine novembre.",
      body: "Il lavoro va fatto in tempi molto brevi, quindi gli diamo priorità sul nostro calendario. Veniamo sul posto per il sopralluogo e le prime foto, mettiamo online sito e menù, sistemiamo Google, TripAdvisor e i social e ti seguiamo finché non sei autonomo.",
    },
    supporto: {
      title: "Tempi e assistenza",
      badge: "Priorità EXPRESS",
      points: [
        "Diamo priorità al tuo progetto, per essere online prima dell'apertura.",
        "Ti mostriamo come aggiornare il menù, leggere i messaggi e gestire i contatti, finché non sei autonomo.",
        "Dopo la messa online, l'assistenza su WhatsApp entro 24 ore è compresa nel servizio All in One.",
        "Prima di partire ti mostriamo alcuni lavori già realizzati, menù digitale compreso.",
      ],
    },
    sections: [
      {
        title: "Sito web",
        icon: "🌐",
        items: [
          { label: "Sito su agriturismoitresanti.it", sub: "Semplice ma curato, nei colori carta da zucchero e con gli ulivi, su 2 pagine con tutte le informazioni essenziali." },
          { label: "Orari, chiusure e indicazioni", sub: "Orari di apertura e chiusura, giorni di servizio, indicazioni stradali e mappa per arrivare facilmente." },
          { label: "Pulsante WhatsApp e chiamata", sub: "Il cliente ti scrive o ti chiama con un tocco, direttamente dal sito." },
          { label: "SEO locale", sub: "Ottimizzato per le ricerche in zona, come «trattoria Savona» o «ristorante Savona», per comparire quando i clienti cercano dove mangiare." },
          { label: "Perfetto da smartphone", sub: "Veloce e leggibile da telefono, dove arriva la maggior parte delle visite." },
          { label: "Foto del posto e dei piatti", sub: "Dopo il primo shooting arricchiamo il sito con le immagini del locale e della cucina." },
        ],
      },
      {
        title: "Identità visiva di base",
        icon: "🎨",
        items: [
          { label: "Palette colori del locale", sub: "Definiamo in modo semplice i colori di Trattoria I Tre Santi, partendo dal carta da zucchero e dal verde degli ulivi, con i codici precisi da usare sempre." },
          { label: "Font del locale", sub: "Scegliamo i caratteri per titoli e testi, leggibili e in linea con lo stile della trattoria." },
          { label: "Usati in modo coerente ovunque", sub: "Colori e font vengono applicati a sito, menù digitale, social, Google e WhatsApp, così il locale è riconoscibile su ogni piattaforma. È una base: non comprende logo, menù cartaceo, biglietti da visita o altri materiali." },
        ],
      },
      {
        title: "Dominio, hosting, sicurezza ed email",
        icon: "🔐",
        items: [
          { label: "Configurazione dominio e DNS", sub: "Colleghiamo il tuo dominio a sito, menù digitale ed email, senza che tu debba toccare nulla." },
          { label: "Gestione hosting", sub: "Il sito è ospitato e gestito da noi: aggiornamenti, velocità e funzionamento sotto controllo." },
          { label: "Messa in sicurezza del sito", sub: "Certificato SSL (il lucchetto https), protezioni e controlli, per un sito sicuro e affidabile anche per Google." },
          { label: "Email aziendale", sub: "Un indirizzo professionale sul tuo dominio, per esempio info@agriturismoitresanti.it, configurato su telefono e computer." },
        ],
      },
      {
        title: "Menù digitale con NovaMenu",
        icon: "📱",
        items: [
          { label: "Il nostro software, pensato per i ristoranti", sub: "Mettiamo a disposizione NovaMenu, la nostra piattaforma creata proprio per realizzare un menù in modo rapido e semplice." },
          { label: "Realizzazione e configurazione complete", sub: "Inseriamo noi piatti, prezzi, descrizioni e allergeni, e colleghiamo il menù al sito e ai profili." },
          { label: "Aggiornabile ogni settimana dal telefono", sub: "Cambi piatti e prezzi in pochi minuti, e il menù è subito aggiornato ovunque, anche sul sito." },
          { label: "QR code per i tavoli", sub: "I clienti consultano il menù dal telefono, sempre aggiornato, senza ristampare nulla." },
          { label: "CRM con i tuoi clienti", sub: "Salvi i contatti dei clienti in un archivio ordinato, così puoi ricontattarli uno per uno: menù del weekend, eventi, novità." },
          { label: "Più recensioni, più visibilità", sub: "Dal CRM chiedi la recensione ai clienti soddisfatti. Spesso si lascia per ultima, ma all'inizio è decisiva per salire su Google quando si cerca «ristorante a Savona»." },
        ],
      },
      {
        title: "Google, TripAdvisor e social",
        icon: "📍",
        items: [
          { label: "Recupero delle schede Google e TripAdvisor", sub: "Le schede esistono già: avviamo noi la procedura di rivendicazione per recuperarle. Se per cause indipendenti da noi non fosse possibile, ne creiamo e configuriamo di nuove." },
          { label: "Schede complete e curate", sub: "Orari, foto, categorie, menù, link al sito e contatti, compilati per bene fin dal primo giorno." },
          { label: "Pagine Facebook e Instagram", sub: "Creazione dei profili con logo, copertine, descrizione, link al menù e collegamento tra le due pagine." },
          { label: "WhatsApp Business", sub: "Profilo aziendale, messaggi automatici di benvenuto e di assenza, liste di contatti per inviare i menù del weekend." },
          { label: "Tutto coerente, ovunque", sub: "Stesso nome, stessi orari, stesse foto e stessi link su tutte le piattaforme: per i clienti è più chiaro e Google ti premia." },
        ],
      },
    ],
    tools: ["Sito web", "NovaMenu", "Colori e font", "Google", "TripAdvisor", "Facebook", "Instagram", "WhatsApp Business"],
  },
  {
    id: "gestione",
    numero: "Servizio 2",
    name: "All in One",
    tagline: "Social e presenza online: pensiamo noi a tutto",
    color: "#4F7398",
    bg: "#EDF2F7",
    border: "#C3D3E4",
    prezzo: "500",
    prezzoPieno: "700",
    periodo: "/mese",
    durata: "6 mesi",
    extra: "Addebito automatico mensile · nessun rinnovo automatico",
    summary: "Ci occupiamo noi di tutta la parte online, così tu puoi concentrarti sulla gestione e sulla crescita del locale. Non solo social: teniamo aggiornati Google, TripAdvisor, sito e menù, e ti togliamo un pensiero a 360 gradi.",
    profilo: {
      icon: "🎯",
      badge: "Gestione completa",
      headline: "Tu pensi alla cucina, noi a tutto il resto.",
      body: "Contenuti su misura, recensioni, orari e aggiornamenti su tutte le piattaforme. Veniamo noi sul posto per foto e video, pubblichiamo con costanza, rispondiamo ai clienti e teniamo ogni canale allineato.",
    },
    supporto: {
      title: "Come lavoriamo con te",
      badge: "Risposta entro 24h",
      points: [
        "Un referente dedicato su WhatsApp per qualsiasi richiesta, con risposta entro 24 ore lavorative.",
        "Correzioni e aggiustamenti dei contenuti sono compresi, senza costi in più.",
        "Nei 6 mesi sono comprese 3 trasferte, una per ogni shooting. Le trasferte extra si pagano a parte.",
      ],
    },
    sections: [
      {
        title: "Contenuti su misura",
        icon: "📸",
        items: [
          { label: "1 shooting foto e video ogni 2 mesi", sub: "Veniamo noi sul posto per fotografare e filmare piatti, locale, panorama e momenti di servizio." },
          { label: "4 post + 1 reel al mese", sub: "Contenuti personalizzati su Facebook e Instagram, con le foto e i video realizzati da noi." },
          { label: "Calendario editoriale e testi", sub: "Pianifichiamo il mese e scriviamo i testi, alternando piatti, stagionalità, territorio e dietro le quinte." },
          { label: "Storie per novità ed eventi", sub: "Menù del weekend, serate, novità: le comunichiamo quando servono, per tenere i profili vivi." },
        ],
      },
      {
        title: "Grafiche e community",
        icon: "💬",
        items: [
          { label: "Grafiche base per i social", sub: "Per promuovere eventi, serate speciali e menù del weekend sui tuoi profili. Le grafiche per la stampa, come menù cartacei e locandine, sono escluse." },
          { label: "Risposte a commenti e messaggi", sub: "Gestiamo noi i messaggi diretti e i commenti degli utenti, con un tono coerente con il locale." },
          { label: "Modifiche incluse", sub: "Correzioni e aggiustamenti dei contenuti sono compresi, senza costi in più." },
          { label: "Risposte alle recensioni", sub: "Rispondiamo alle recensioni su Google e TripAdvisor, ringraziando e gestendo con cura anche quelle critiche." },
        ],
      },
      {
        title: "Presenza online sempre aggiornata",
        icon: "📍",
        items: [
          { label: "Orari e aperture straordinarie", sub: "Aggiorniamo noi orari, chiusure per festività e aperture straordinarie su Google, TripAdvisor, social e sito." },
          { label: "Foto sempre aggiornate", sub: "Pubblichiamo le nuove foto degli shooting su Google, TripAdvisor e sito." },
          { label: "Menù pubblicato ovunque", sub: "Il menù digitale è collegato e aggiornato su Google, TripAdvisor e social, così chi ti cerca lo trova subito." },
          { label: "Sito sempre aggiornato", sub: "Piccole modifiche a testi, orari e foto del sito incluse per tutta la durata della gestione." },
          { label: "Assistenza diretta su WhatsApp entro 24 ore", sub: "Un referente dedicato a cui scrivere per qualsiasi richiesta, con risposta entro 24 ore lavorative e senza passaggi intermedi." },
        ],
      },
    ],
    tools: ["Facebook", "Instagram", "Google", "TripAdvisor", "Sito web", "NovaMenu"],
  },
];

// ─── RIEPILOGO INVESTIMENTO ──────────────────────────────────
export const investimento = {
  trasferte: {
    label: "Rimborso spese trasferte",
    prezzo: "150",
    testo: "Comprensivo delle 3 giornate in loco previste per l'avvio (€ 50 a giornata per il carburante di andata e ritorno), da saldare insieme all'Avvio Online. Per l'All in One, che dura 6 mesi, sono comprese nel canone 3 trasferte, una per ogni shooting bimestrale. Eventuali trasferte extra non sono incluse e vengono pagate a parte (€ 50 a giornata).",
  },
  risparmio: "1.500",
  sconto: "Comprendiamo bene quanti costi comporta l'apertura di un locale. Per questo vogliamo venirti incontro il più possibile, con un prezzo riservato: € 600 invece di € 900 per l'Avvio Online e € 500 invece di € 700 al mese per l'All in One, per un risparmio complessivo di € 1.500 nei primi 6 mesi. Così tu puoi dedicarti alla gestione del locale, mentre noi ti supportiamo in tutto il resto.",
};

export const nonIncluso = [
  "Budget per eventuali campagne sponsorizzate, su richiesta e a carico del Cliente.",
  "Brand identity completa: logo, menù cartaceo, biglietti da visita e altri materiali del locale (l'Avvio Online comprende solo la base di colori e font).",
  "Grafiche per la stampa (menù cartacei, locandine, volantini) e costi di stampa.",
  "Rinnovo del dominio e servizi a pagamento di terzi.",
  "Trasferte extra oltre le 3 dell'avvio e le 3 dell'All in One (€ 50 a giornata).",
  "Pagine o funzioni del sito oltre a quelle descritte, preventivate a parte.",
];

export const noteFinali = [
  { icon: "📌", text: "Prezzi IVA esclusa. I due servizi si possono scegliere anche separatamente." },
  { icon: "📃", text: "L'All in One è un contratto di 6 mesi. Alla scadenza si chiude da solo, senza rinnovo automatico." },
  { icon: "🗓️", text: "Hosting, email aziendale e menù digitale NovaMenu sono inclusi per i primi 12 mesi dalla messa online." },
  { icon: "🚗", text: "Nei 6 mesi di All in One sono comprese 3 trasferte, una per ogni shooting bimestrale. Le trasferte extra non sono incluse e si pagano a parte (€ 50 a giornata)." },
  { icon: "🔒", text: "I contatti dei tuoi clienti restano tuoi, sempre." },
];

// ─── CONDIZIONI CONTRATTUALI ─────────────────────────────────
export const condizioniIntro = "Le presenti condizioni regolano il rapporto tra Tavella Distribuzione di Tavella Ivo («Fornitore») e il Cliente indicato in intestazione («Cliente»). Il rapporto intercorre tra professionisti: non si applica la disciplina a tutela del consumatore.";

export const condizioni = [
  { titolo: "Oggetto", testo: ["Il Fornitore presta al Cliente i servizi scelti nella pagina di accettazione tra il servizio «Avvio Online» e il servizio «All in One», come descritti nel presente documento, che ne costituisce parte integrante."] },
  { titolo: "Avvio Online: tempi e consegna", testo: ["Il Fornitore dà priorità alla lavorazione per consentire la messa online in tempi brevi. I tempi dipendono dalla consegna puntuale di materiali, informazioni e accessi da parte del Cliente. Per «messa online» si intende la pubblicazione del sito e del menù digitale. L'assistenza successiva alla messa online è compresa nel servizio All in One."] },
  { titolo: "All in One: durata", testo: ["Il servizio All in One dura 6 mesi dalla data di avvio concordata tra le parti. Alla scadenza non si rinnova in automatico: l'eventuale rinnovo richiede un nuovo accordo scritto."] },
  { titolo: "Corrispettivi e pagamento", testo: ["Avvio Online: € 600,00 + IVA, più € 150,00 + IVA di rimborso trasferte, pagati per il 50% alla firma e per il saldo alla messa online. All in One: € 500,00 + IVA al mese per 6 mesi, con addebito ricorrente sulla carta del Cliente tramite Stripe ogni 30 giorni dalla data di avvio, che il Cliente autorizza con la sottoscrizione. Il canone è dovuto per intero anche nei mesi in cui il Cliente non utilizza, in tutto o in parte, i servizi; quelli non goduti non sono cumulabili né rimborsabili. L'All in One comprende 3 trasferte in loco nei 6 mesi, una per ogni shooting bimestrale; eventuali trasferte extra richieste dal Cliente sono rimborsate a parte nella misura di € 50,00 + IVA a giornata. Per ogni pagamento il Fornitore emette fattura elettronica."] },
  { titolo: "Prezzi riservati", testo: ["I prezzi di avvio indicati sono riservati al Cliente e validi solo per il presente preventivo, se accettato entro la data di validità."] },
  { titolo: "Ritardi, sospensione e risoluzione", testo: ["In caso di mancato pagamento oltre 20 giorni dalla scadenza, il Fornitore può sospendere i servizi, compreso l'accesso alla piattaforma, fino al saldo. Oltre i 30 giorni l'accordo si risolve di diritto ai sensi dell'art. 1456 c.c., a seguito di comunicazione del Fornitore. Restano dovuti gli importi maturati, gli interessi moratori previsti dal D.Lgs. 231/2002 e una penale pari a 1 mensilità dell'All in One, se attivo."] },
  { titolo: "Recesso anticipato del Cliente", testo: ["Il Cliente può recedere dall'All in One solo con comunicazione via PEC a dittatavellaivo@pec.it, con preavviso minimo di 30 giorni. Sono dovuti gli importi maturati fino alla data di efficacia del recesso e una penale pari a 1 mensilità. L'Avvio Online, una volta iniziato, non è soggetto a recesso e il corrispettivo resta dovuto per intero."] },
  { titolo: "Risoluzione per inadempimento del Cliente", testo: ["Il Fornitore può risolvere l'accordo ai sensi dell'art. 1456 c.c. in caso di: mancato pagamento oltre 30 giorni; mancato invio dei materiali o degli accessi richiesti per oltre 30 giorni dopo sollecito scritto; richieste di contenuti illeciti o contrari alle regole delle piattaforme. Sono dovuti gli importi maturati e una penale pari a 2 mensilità dell'All in One, se attivo, salvo il maggior danno."] },
  { titolo: "Collaborazione e manleva", testo: ["Il Cliente fornisce testi, foto, orari, prezzi, informazioni e accessi entro 3 giorni lavorativi dalla richiesta; i ritardi spostano in proporzione le consegne e non sono imputabili al Fornitore. Il Cliente resta responsabile della correttezza di prezzi, ingredienti e allergeni comunicati, anche ai fini del Reg. UE 1169/2011, e tiene indenne il Fornitore da pretese di terzi derivanti dai materiali e dalle informazioni forniti e dall'invio di messaggi senza consenso dei destinatari."] },
  { titolo: "Account, schede e piattaforme di terzi", testo: ["Profili social, schede Google e TripAdvisor, WhatsApp Business e dominio sono intestati al Cliente. Il recupero delle schede esistenti dipende dalle procedure e dalle verifiche delle piattaforme: il Fornitore si impegna a seguirle con diligenza ma non può garantirne l'esito, e in tal caso crea nuove schede. Il Fornitore non risponde di blocchi, sospensioni o modifiche decisi dalle piattaforme."] },
  { titolo: "Sito, hosting ed email", testo: ["Testi, immagini e dominio del sito restano del Cliente; codice, template e strumenti di sviluppo restano del Fornitore. Hosting, email aziendale e manutenzione di sicurezza sono inclusi per 12 mesi dalla messa online; dopo, proseguono con un canone da concordare. Se il Cliente sceglie un altro hosting, il Fornitore gli consegna i contenuti del sito."] },
  { titolo: "Materiali prodotti e uso promozionale", testo: ["Grafiche, testi, foto e video realizzati dal Fornitore possono essere usati dal Cliente per la propria attività, anche dopo la fine dell'accordo, e non possono essere ceduti a terzi. Il Cliente autorizza il Fornitore a usarli, insieme al nome e al logo del locale, per promuovere i propri servizi e quelli dei marchi e progetti a esso collegati, compresa la piattaforma NovaMenu, su qualsiasi canale online e offline, anche dopo la fine dell'accordo. Le immagini con persone riconoscibili sono usate solo con il loro consenso."] },
  { titolo: "Piattaforma NovaMenu e CRM", testo: [
    "1. La piattaforma NovaMenu, il CRM, il software, il codice, i template e le automazioni sono e restano di proprietà esclusiva del Fornitore o dei suoi licenzianti.",
    "2. Al Cliente è concesso il solo diritto d'uso, non esclusivo e non trasferibile, per 12 mesi dalla messa online; dopo, l'uso prosegue sottoscrivendo un nuovo accordo. Non è prevista alcuna cessione né licenza permanente.",
    "3. Alla cessazione del diritto d'uso, menù digitale, QR code e CRM vengono disattivati.",
    "4. I dati dei clienti raccolti restano del Cliente, che può richiederne l'esportazione in formato .csv entro 30 giorni dalla cessazione. Trascorsi 60 giorni, il Fornitore può cancellarli definitivamente.",
    "5. Il Fornitore può aggiornare e migliorare la piattaforma senza ridurre le funzioni descritte nel presente documento.",
  ] },
  { titolo: "Collaboratori", testo: ["Il Fornitore può avvalersi di collaboratori e fornitori terzi, restando responsabile del loro operato verso il Cliente."] },
  { titolo: "Dati personali", testo: ["Per i dati dei clienti del locale raccolti tramite sito, menù digitale e CRM, il Cliente è titolare del trattamento e nomina il Fornitore responsabile ai sensi dell'art. 28 del Reg. UE 2016/679. Il Fornitore tratta i dati solo per le finalità dell'accordo e secondo le istruzioni del Cliente; vincola alla riservatezza le persone autorizzate; adotta misure di sicurezza adeguate; può avvalersi di sub-responsabili (hosting, database, servizi di messaggistica) che offrono garanzie equivalenti; comunica senza ritardo, e comunque entro 72 ore, eventuali violazioni dei dati; assiste il Cliente nelle richieste degli interessati; a fine rapporto restituisce o cancella i dati come previsto all'art. 13; mette a disposizione le informazioni necessarie a dimostrare il rispetto di questi obblighi. Il Cliente garantisce di avere un'informativa privacy aggiornata e che i messaggi promozionali siano inviati solo a chi ha dato il consenso."] },
  { titolo: "Limitazione di responsabilità", testo: ["Il Fornitore non risponde di interruzioni, malfunzionamenti o modifiche di servizi di terzi (Meta, WhatsApp, Google, TripAdvisor, Stripe, provider di domini e hosting), né di risultati in termini di visite, clienti o posizionamento. Salvo dolo o colpa grave, la responsabilità del Fornitore non supera i corrispettivi pagati dal Cliente nei 3 mesi precedenti l'evento."] },
  { titolo: "Comunicazioni", testo: ["Le comunicazioni operative avvengono via WhatsApp e telefono. Recesso e contestazioni si inviano via PEC. Ogni modifica al presente accordo richiede la forma scritta."] },
  { titolo: "Legge applicabile e foro", testo: ["L'accordo è regolato dalla legge italiana. Per ogni controversia è competente in via esclusiva il Foro di Alessandria."] },
];

export const accettazione = {
  titolo: "Firma e accettazione",
  testo: "Per accettare, segna qui sotto i servizi scelti e scrivici su WhatsApp: ti mandiamo il documento da firmare. Puoi anche rimandare il PDF firmato a info@tavelladistribuzione.com.",
  clausole: "Ai sensi degli artt. 1341 e 1342 c.c., il Cliente approva specificamente gli artt. 4, 6, 7, 8, 9, 10, 11, 12, 13, 16 e 18.",
  grazie: "Grazie per la fiducia e per averci scelto come partner digitale di Trattoria I Tre Santi. Siamo felici di accompagnarti nell'apertura e di costruire insieme a te una presenza online chiara, curata e coerente, che ti faccia trovare dai clienti giusti. Per qualsiasi dubbio, prima o dopo la firma, scrivici quando vuoi: siamo sempre a disposizione.",
  firma: "Eric, Tavella Distribuzione",
};
