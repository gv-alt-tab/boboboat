import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      // NAV
      nav_tours: "Tours",
      nav_how: "How it works",
      nav_providers: "Boat owners",
      nav_contact: "Contact",
      nav_login: "Login",
      nav_provider_q: "Are you a boat owner?",

      // HERO
      hero_tag: "Sorrento · Amalfi · Capri",
      hero_title_1: "Discover the sea",
      hero_title_2: "like never before",
      hero_sub: "Book a spot on a boat with other travellers. The price drops as more 	people join.",
      hero_btn1: "Explore tours →",
      hero_btn2: "Are you a boat owner?",

      // SEARCH
      search_title: "Find your tour",
      search_destination: "Destination",
      search_destination_placeholder: "e.g. Capri, Positano, Amalfi...",
      search_date: "Date",
      search_people: "People",
      search_btn: "Search",
      search_1: "1 person",
      search_2: "2 people",
      search_3: "3 people",
      search_4: "4+ people",

      // TOURS
      tours_title: "Featured tours",
      tours_see_all: "See all →",
      tours_spots_left: "spots left",
      tours_price_current: "Current price",
      tours_price_confirmed: "Confirmed price",
      tours_per_person: "/ person",
      tours_full_price: "→ at full capacity",
      tours_book: "Book",

      // PRICING
      pricing_title: "How pricing works",
      pricing_sub: "The price per person decreases as more people join. Example: 4-seat 	boat at €200 total.",
      pricing_1_seats: "1 booking",
      pricing_2_seats: "2 bookings",
      pricing_4_seats: "4 bookings ✓",
      pricing_note: "Price locked 1h before",
      pricing_full_note: "Full boat, confirmed!",
      pricing_footer: "+ 5% platform fee · Payment held until confirmation",

      // HOW IT WORKS
      how_title: "Simple as stepping aboard",
      how_sub: "Three steps and you're at sea.",
      step1_num: "01",
      step1_title: "Choose your tour",
      step1_desc: "Browse available tours in your area and preferred date.",
      step2_num: "02",
      step2_title: "Book your spot",
      step2_desc: "Enter your details and authorise payment. Nothing is charged yet.",
      step3_num: "03",
      step3_title: "Confirm or cancel",
      step3_desc: "1 hour before the tour the price locks. Confirm or get a full refund.",

      // FOOTER
      footer_tagline: "Shared boat tours",
      footer_copy: "© 2025 BoBoBoat · Sorrento, Italy · hello@boboboat.com",

      // DASHBOARD
      dash_greeting: "Good morning, Marco 👋",
      dash_sub: "You have 3 tours scheduled this week",
      dash_new_tour: "+ New tour",
      dash_overview: "Overview",
      dash_my_tours: "My tours",
      dash_new: "New tour",
      dash_earnings: "Earnings",
      dash_reviews: "Reviews",
      dash_client_view: "← Client view",
	
	// AUTH
	auth_welcome_back: "Welcome back aboard",
	auth_join: "Join the fleet",
	auth_login: "Login",
	auth_register: "Register",
	auth_customer: "I'm a customer",
	auth_provider: "I'm a boat owner",
	auth_full_name: "Full name",
	auth_email: "Email",
	auth_password: "Password",
	auth_submit_login: "Login",
	auth_submit_register: "Create account",
	auth_created: "Account created! You can now login.",

      // STATS
      stat_tours: "Tours this month",
      stat_passengers: "Total passengers",
      stat_earnings: "Net earnings",
      stat_rating: "Average rating",

      // FORM
      form_title: "Create new tour",
      form_tour_name: "Tour name",
      form_tour_name_ph: "e.g. Sunset at Positano",
      form_zone: "Area",
      form_date: "Date",
      form_time: "Departure time",
      form_duration: "Duration (hours)",
      form_spots: "Available spots",
      form_description: "Tour description",
      form_description_ph: "Describe the itinerary, stops, what's included...",
      form_price: "Total tour price (€)",
      form_included: "What's included",
      form_publish: "Publish tour",
      form_draft: "Save draft",
      form_tip: "💡 The price per person is calculated automatically by dividing the total by booked spots. 1 hour before the tour the price locks and passengers decide whether to confirm.",
    },
  },
  it: {
    translation: {
      // NAV
      nav_tours: "Tour",
      nav_how: "Come funziona",
      nav_providers: "Armatori",
      nav_contact: "Contatti",
      nav_login: "Accedi",
      nav_provider_q: "Sei un armatore?",

      // HERO
      hero_tag: "Sorrento · Amalfi · Capri",
      hero_title_1: "Scopri il mare",
      hero_title_2: "come non lo hai mai fatto",
      hero_sub: "Prenota un posto in barca con altri viaggiatori. Il prezzo scende man mano che la barca si riempie.",
      hero_btn1: "Esplora i tour →",
      hero_btn2: "Sei un armatore?",

      // SEARCH
      search_title: "Trova il tuo tour",
      search_destination: "Destinazione",
      search_destination_placeholder: "es. Capri, Positano, Amalfi...",
      search_date: "Data",
      search_people: "Persone",
      search_btn: "Cerca",
      search_1: "1 persona",
      search_2: "2 persone",
      search_3: "3 persone",
      search_4: "4+ persone",

      // TOURS
      tours_title: "Tour in evidenza",
      tours_see_all: "Vedi tutti →",
      tours_spots_left: "posti liberi",
      tours_price_current: "Prezzo attuale",
      tours_price_confirmed: "Prezzo confermato",
      tours_per_person: "/ persona",
      tours_full_price: "→ a barca piena",
      tours_book: "Prenota",

      // PRICING
      pricing_title: "Come funziona il prezzo",
      pricing_sub: "Il prezzo per persona diminuisce man mano che altri si uniscono. Esempio su una barca da 4 posti a €200 totali.",
      pricing_1_seats: "1 prenotazione",
      pricing_2_seats: "2 prenotazioni",
      pricing_4_seats: "4 prenotazioni ✓",
      pricing_note: "Prezzo si blocca -1h",
      pricing_full_note: "Barca piena, confermato!",
      pricing_footer: "+ 5% commissione piattaforma · Pagamento sospeso fino alla conferma",

      // HOW IT WORKS
      how_title: "Semplice come salire a bordo",
      how_sub: "Tre passi e sei in mare.",
      step1_num: "01",
      step1_title: "Scegli il tour",
      step1_desc: "Sfoglia i tour disponibili nella tua zona e data preferita.",
      step2_num: "02",
      step2_title: "Prenota il posto",
      step2_desc: "Inserisci i dati e autorizza il pagamento. Non viene addebitato subito.",
      step3_num: "03",
      step3_title: "Conferma o rinuncia",
      step3_desc: "1 ora prima del tour il prezzo si blocca. Scegli se confermare o ricevere il rimborso.",

      // FOOTER
      footer_tagline: "Tour in barca condivisi",
      footer_copy: "© 2025 BoBoBoat · Sorrento, Italia · hello@boboboat.com",

      // DASHBOARD
      dash_greeting: "Buongiorno, Marco 👋",
      dash_sub: "Hai 3 tour programmati questa settimana",
      dash_new_tour: "+ Nuovo tour",
      dash_overview: "Panoramica",
      dash_my_tours: "I miei tour",
      dash_new: "Nuovo tour",
      dash_earnings: "Guadagni",
      dash_reviews: "Recensioni",
      dash_client_view: "← Vista clienti",

	// AUTH
	auth_welcome_back: "Bentornato a bordo",
	auth_join: "Unisciti alla flotta",
	auth_login: "Accedi",
	auth_register: "Registrati",
	auth_customer: "Sono un cliente",
	auth_provider: "Sono un armatore",
	auth_full_name: "Nome completo",
	auth_email: "Email",
	auth_password: "Password",
	auth_submit_login: "Accedi",
	auth_submit_register: "Crea account",
	auth_created: "Account creato! Puoi ora accedere.",

      // STATS
      stat_tours: "Tour questo mese",
      stat_passengers: "Passeggeri totali",
      stat_earnings: "Guadagni netti",
      stat_rating: "Rating medio",

      // FORM
      form_title: "Crea nuovo tour",
      form_tour_name: "Nome del tour",
      form_tour_name_ph: "es. Tramonto a Positano",
      form_zone: "Zona",
      form_date: "Data",
      form_time: "Ora di partenza",
      form_duration: "Durata (ore)",
      form_spots: "Posti disponibili",
      form_description: "Descrizione del tour",
      form_description_ph: "Descrivi l'itinerario, le soste, cosa è incluso nel prezzo...",
      form_price: "Prezzo totale del tour (€)",
      form_included: "Cosa è incluso",
      form_publish: "Pubblica tour",
      form_draft: "Salva bozza",
      form_tip: "💡 Il prezzo per persona viene calcolato automaticamente dividendo il totale per i posti prenotati. 1 ora prima del tour il prezzo si blocca e i clienti decidono se confermare.",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "it",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n; 
