import { useState, useEffect } from "react";

// ─── I18N ─────────────────────────────────────────────────────────────────────
const LANGS = {
  fr: {
    appName: "CoParentPro",
    tabs: ["Calendrier","Événements","Annuel","Réglages"],
    mois: ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"],
    moisC: ["Jan","Fév","Mar","Avr","Mai","Jun","Jul","Aoû","Sep","Oct","Nov","Déc"],
    jours: ["Lu","Ma","Me","Je","Ve","Sa","Di"],
    garde: "Garde", semPaire: "Semaine paire", semImpaire: "Semaine impaire",
    alternee: "🔄 Alternée", classique: "🏠 Clásica",
    paireLabel: "a les semaines paires",
    vacAlt: "Vacances alternées", feries: "Jours fériés",
    addEvt: "+ Événement", addNote: "📝 Note",
    evtTypes: ["🏥 Médical","⚽ Sport","📚 École","🎂 Fête","📌 Autre"],
    privacy: "Privé", shared: "Partagé",
    ajouter: "Ajouter", annuler: "Annuler", enregistrer: "Enregistrer",
    countdown: "Prochain changement", days: "j",
    checkItems: ["Cartable 🎒","Médicaments 💊","Peluche 🧸","Vêtements 👕","Chaussures 👟","Doudou 🧸","Livre scolaire 📖"],
    urgLabel: "Contacts urgence",
    // RGPD screen
    rgpdTitle: "Bienvenue sur CoParentPro",
    rgpdSub: "Avant de commencer, lisez et acceptez nos conditions.",
    rgpdWhat: "Ce que fait cette application",
    rgpdWhatList: ["Afficher un calendrier de garde organisationnel","Gérer vos événements et notes personnels","Visualiser les vacances scolaires et jours fériés","Vous aider à vous organiser au quotidien"],
    rgpdNotWhat: "Ce que cette application ne fait PAS",
    rgpdNotList: ["Donner des conseils juridiques ou calculer une pension","Remplacer une décision de justice ou un avocat","Partager vos données à des tiers ou annonceurs","Accéder à votre localisation ou contacts"],
    rgpdData: "Vos données",
    rgpdDataText: "Vos informations restent sur votre appareil. Aucune donnée personnelle n'est envoyée à un serveur sans votre accord explicite. Vous pouvez effacer toutes vos données à tout moment depuis les Réglages.",
    rgpdCnil: "Conformité RGPD",
    rgpdCnilText: "Cette application est conçue dans le respect du Règlement Général sur la Protection des Données (RGPD - UE 2016/679). Vos données vous appartiennent.",
    rgpdMineur: "Protection des mineurs",
    rgpdMineurText: "Cette application peut contenir des informations concernant des enfants mineurs. En l'utilisant, vous certifiez être le parent ou tuteur légal de ces enfants et avoir le droit de gérer ces informations en votre nom.",
    rgpdAccept1: "J'ai lu et j'accepte les ",
    rgpdCgu: "Conditions Générales d'Utilisation",
    rgpdAccept2: " et la ",
    rgpdPc: "Politique de Confidentialité",
    rgpdCertif: "Je certifie être majeur(e) et parent/tuteur légal des enfants concernés",
    rgpdBtn: "Accéder à l'application →",
    rgpdMustAccept: "Vous devez accepter les conditions et certifier votre qualité de parent pour continuer.",
    // Disclaimer permanent
    disclaimer: "⚠️ Outil d'organisation uniquement — Aucune valeur juridique — Ne remplace pas un avocat ou une décision de justice",
    // CGU modal
    cguTitle: "Conditions Générales d'Utilisation",
    pcTitle: "Politique de Confidentialité",
    // Settings
    deleteData: "🗑️ Effacer toutes mes données",
    deleteConfirm: "Êtes-vous sûr ? Cette action est irréversible.",
    langLabel: "Langue", themeLabel: "Thème",
    themeDark: "Sombre", themeLight: "Clair",
    couleursLabel: "Couleurs",
    statsLabel: ["jours","jours"],
    prochVac: "Prochaines vacances",
  },
  es: {
    appName: "CoParentPro",
    tabs: ["Calendario","Eventos","Anual","Ajustes"],
    mois: ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],
    moisC: ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"],
    jours: ["Lu","Ma","Mi","Ju","Vi","Sá","Do"],
    garde: "Custodia", semPaire: "Semana par", semImpaire: "Semana impar",
    alternee: "🔄 Alternada", classique: "🏠 Clásica",
    paireLabel: "tiene semanas pares",
    vacAlt: "Vacaciones alternadas", feries: "Días festivos",
    addEvt: "+ Evento", addNote: "📝 Nota",
    evtTypes: ["🏥 Médico","⚽ Deporte","📚 Escuela","🎂 Fiesta","📌 Otro"],
    privacy: "Privado", shared: "Compartido",
    ajouter: "Añadir", annuler: "Cancelar", enregistrer: "Guardar",
    countdown: "Próximo cambio", days: "d",
    checkItems: ["Mochila 🎒","Medicamentos 💊","Peluche 🧸","Ropa 👕","Zapatos 👟","Mantita 🧸","Libro escolar 📖"],
    urgLabel: "Contactos urgencia",
    rgpdTitle: "Bienvenido a CoParentPro",
    rgpdSub: "Antes de empezar, lee y acepta nuestras condiciones.",
    rgpdWhat: "Lo que hace esta aplicación",
    rgpdWhatList: ["Mostrar un calendario de custodia organizativo","Gestionar tus eventos y notas personales","Visualizar vacaciones escolares y festivos","Ayudarte a organizarte en el día a día"],
    rgpdNotWhat: "Lo que esta aplicación NO hace",
    rgpdNotList: ["Dar consejos jurídicos o calcular pensiones","Reemplazar una decisión judicial o abogado","Compartir tus datos con terceros","Acceder a tu ubicación o contactos"],
    rgpdData: "Tus datos",
    rgpdDataText: "Tu información permanece en tu dispositivo. Ningún dato personal se envía a un servidor sin tu acuerdo explícito.",
    rgpdCnil: "Cumplimiento RGPD",
    rgpdCnilText: "Esta aplicación respeta el Reglamento General de Protección de Datos (RGPD - UE 2016/679).",
    rgpdMineur: "Protección de menores",
    rgpdMineurText: "Al usar esta app, certificas ser el padre/madre o tutor legal de los menores concernidos.",
    rgpdAccept1: "He leído y acepto los ",
    rgpdCgu: "Términos y Condiciones",
    rgpdAccept2: " y la ",
    rgpdPc: "Política de Privacidad",
    rgpdCertif: "Certifico ser mayor de edad y padre/tutor legal de los menores concernidos",
    rgpdBtn: "Acceder a la aplicación →",
    rgpdMustAccept: "Debe aceptar las condiciones para continuar.",
    disclaimer: "⚠️ Solo herramienta organizativa — Sin valor jurídico — No reemplaza a un abogado",
    cguTitle: "Términos y Condiciones",
    pcTitle: "Política de Privacidad",
    deleteData: "🗑️ Borrar todos mis datos",
    deleteConfirm: "¿Está seguro? Esta acción es irreversible.",
    langLabel: "Idioma", themeLabel: "Tema",
    themeDark: "Oscuro", themeLight: "Claro",
    couleursLabel: "Colores",
    statsLabel: ["días","días"],
    prochVac: "Próximas vacaciones",
  },
  en: {
    appName: "CoParentPro",
    tabs: ["Calendar","Events","Yearly","Settings"],
    mois: ["January","February","March","April","May","June","July","August","September","October","November","December"],
    moisC: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
    jours: ["Mo","Tu","We","Th","Fr","Sa","Su"],
    garde: "Custody", semPaire: "Even week", semImpaire: "Odd week",
    alternee: "🔄 Alternating", classique: "🏠 Classic",
    paireLabel: "has even weeks",
    vacAlt: "Alternating holidays", feries: "Public holidays",
    addEvt: "+ Event", addNote: "📝 Note",
    evtTypes: ["🏥 Medical","⚽ Sport","📚 School","🎂 Party","📌 Other"],
    privacy: "Private", shared: "Shared",
    ajouter: "Add", annuler: "Cancel", enregistrer: "Save",
    countdown: "Next handover", days: "d",
    checkItems: ["School bag 🎒","Medication 💊","Stuffed toy 🧸","Clothes 👕","Shoes 👟","Comfort toy 🧸","School book 📖"],
    urgLabel: "Emergency contacts",
    rgpdTitle: "Welcome to CoParentPro",
    rgpdSub: "Before you start, please read and accept our terms.",
    rgpdWhat: "What this app does",
    rgpdWhatList: ["Display an organisational custody calendar","Manage your personal events and notes","Show school holidays and public holidays","Help you stay organised day to day"],
    rgpdNotWhat: "What this app does NOT do",
    rgpdNotList: ["Give legal advice or calculate child support","Replace a court decision or lawyer","Share your data with third parties","Access your location or contacts"],
    rgpdData: "Your data",
    rgpdDataText: "Your information stays on your device. No personal data is sent to a server without your explicit consent.",
    rgpdCnil: "GDPR Compliance",
    rgpdCnilText: "This application is designed in compliance with the General Data Protection Regulation (GDPR - EU 2016/679).",
    rgpdMineur: "Child protection",
    rgpdMineurText: "By using this app, you confirm you are the parent or legal guardian of any children whose information you enter.",
    rgpdAccept1: "I have read and accept the ",
    rgpdCgu: "Terms of Service",
    rgpdAccept2: " and the ",
    rgpdPc: "Privacy Policy",
    rgpdCertif: "I confirm I am an adult and the legal parent/guardian of the children concerned",
    rgpdBtn: "Enter the app →",
    rgpdMustAccept: "You must accept the terms to continue.",
    disclaimer: "⚠️ Organisational tool only — No legal value — Does not replace a lawyer or court order",
    cguTitle: "Terms of Service",
    pcTitle: "Privacy Policy",
    deleteData: "🗑️ Delete all my data",
    deleteConfirm: "Are you sure? This action cannot be undone.",
    langLabel: "Language", themeLabel: "Theme",
    themeDark: "Dark", themeLight: "Light",
    couleursLabel: "Colors",
    statsLabel: ["days","days"],
    prochVac: "Upcoming holidays",
  }
};

const CGU_FR = `CONDITIONS GÉNÉRALES D'UTILISATION — CoParentPro

Version 1.0 — Avril 2026

1. OBJET ET NATURE DE L'APPLICATION
CoParentPro est un outil numérique d'aide à l'organisation personnelle destiné aux parents séparés ou divorcés. Elle permet de visualiser un calendrier de garde, de noter des événements et de suivre les vacances scolaires.

2. LIMITATION DE RESPONSABILITÉ — POINT ESSENTIEL
⚠️ CoParentPro est un outil d'organisation UNIQUEMENT.
• L'application ne fournit aucun conseil juridique.
• Elle ne constitue pas une décision de justice.
• Elle ne remplace pas l'intervention d'un avocat, d'un médiateur familial ou d'un juge aux affaires familiales (JAF).
• Les calculs de semaines paires/impaires sont indicatifs et doivent être vérifiés par rapport à votre jugement de divorce ou convention parentale.
• En cas de litige, seule une décision de justice fait foi.

3. DONNÉES PERSONNELLES
Conformément au RGPD (UE 2016/679) :
• Vos données restent sur votre appareil.
• Aucune donnée n'est vendue ni cédée à des tiers.
• Vous pouvez effacer vos données à tout moment.
• Aucun profilage commercial n'est effectué.

4. DONNÉES RELATIVES AUX MINEURS
L'utilisateur certifie être le parent ou tuteur légal des enfants dont les informations sont saisies dans l'application et être habilité à gérer ces informations.

5. ACCEPTATION
L'utilisation de l'application vaut acceptation des présentes CGU.`;

const PC_FR = `POLITIQUE DE CONFIDENTIALITÉ — CoParentPro

Version 1.0 — Avril 2026

1. RESPONSABLE DU TRAITEMENT
CoParentPro — Application indépendante.

2. DONNÉES COLLECTÉES
• Prénoms des parents (saisis volontairement)
• Événements et notes (stockés localement sur votre appareil)
• Paramètres de l'application (zone scolaire, mode de garde)
Aucune donnée médicale, financière ou de localisation n'est collectée.

3. FINALITÉ DU TRAITEMENT
Les données sont utilisées exclusivement pour le fonctionnement de l'application sur votre appareil personnel. Elles ne sont pas transmises à des serveurs distants dans cette version.

4. DURÉE DE CONSERVATION
Les données sont conservées sur votre appareil jusqu'à désinstallation de l'application ou suppression manuelle depuis les Réglages.

5. VOS DROITS (RGPD)
Vous disposez des droits suivants :
• Droit d'accès à vos données
• Droit de rectification
• Droit à l'effacement (bouton "Effacer toutes mes données" dans Réglages)
• Droit à la portabilité

6. COOKIES ET TRACEURS
Aucun cookie tiers. Aucun traceur publicitaire. Aucune analyse comportementale.

7. MINEURS
Aucune donnée d'enfant n'est collectée directement. Seuls les parents/tuteurs légaux saisissent et gèrent les informations.

8. CONTACT
Pour toute question relative à vos données personnelles, contactez-nous via le site coparentpro.fr`;

// ─── DONNÉES ─────────────────────────────────────────────────────────────────
const VACANCES = {
  A:[{nom:"Toussaint",debut:new Date(2025,9,18),fin:new Date(2025,10,3)},{nom:"Noël",debut:new Date(2025,11,20),fin:new Date(2026,0,5)},{nom:"Hiver",debut:new Date(2026,1,7),fin:new Date(2026,1,23)},{nom:"Printemps",debut:new Date(2026,3,4),fin:new Date(2026,3,20)},{nom:"Été",debut:new Date(2026,6,4),fin:new Date(2026,8,1)}],
  B:[{nom:"Toussaint",debut:new Date(2025,9,18),fin:new Date(2025,10,3)},{nom:"Noël",debut:new Date(2025,11,20),fin:new Date(2026,0,5)},{nom:"Hiver",debut:new Date(2026,1,21),fin:new Date(2026,2,9)},{nom:"Printemps",debut:new Date(2026,3,18),fin:new Date(2026,4,4)},{nom:"Été",debut:new Date(2026,6,4),fin:new Date(2026,8,1)}],
  C:[{nom:"Toussaint",debut:new Date(2025,9,18),fin:new Date(2025,10,3)},{nom:"Noël",debut:new Date(2025,11,20),fin:new Date(2026,0,5)},{nom:"Hiver",debut:new Date(2026,1,14),fin:new Date(2026,2,2)},{nom:"Printemps",debut:new Date(2026,3,11),fin:new Date(2026,3,27)},{nom:"Été",debut:new Date(2026,6,4),fin:new Date(2026,8,1)}],
};
const FERIES=[new Date(2026,0,1),new Date(2026,3,6),new Date(2026,3,13),new Date(2026,4,1),new Date(2026,4,8),new Date(2026,4,21),new Date(2026,5,1),new Date(2026,6,14),new Date(2026,7,15),new Date(2026,10,1),new Date(2026,10,11),new Date(2026,11,25)];
const PALETTES=[{a:"#60a5fa",b:"#f472b6"},{a:"#34d399",b:"#fb923c"},{a:"#a78bfa",b:"#fbbf24"},{a:"#22d3ee",b:"#f87171"},{a:"#86efac",b:"#c084fc"},{a:"#f9a8d4",b:"#6ee7b7"}];
const EVT_IDS=["rdv","sport","ecole","fete","autre"];
const EVT_COLORS=["#f87171","#34d399","#60a5fa","#f59e0b","#a78bfa"];

// ─── UTILS ────────────────────────────────────────────────────────────────────
function getWN(d){const u=new Date(Date.UTC(d.getFullYear(),d.getMonth(),d.getDate()));const day=u.getUTCDay()||7;u.setUTCDate(u.getUTCDate()+4-day);const y=new Date(Date.UTC(u.getUTCFullYear(),0,1));return Math.ceil((((u-y)/86400000)+1)/7);}
function getVac(date,zone){return VACANCES[zone].find(v=>date>=v.debut&&date<=v.fin)||null;}
function isFerie(d){return FERIES.some(f=>f.toDateString()===d.toDateString());}
function getParent(date,{mode,pA,pB,paireA,zone,vacAlt}){
  const wn=getWN(date);const vac=getVac(date,zone);
  if(mode==="alternee"){if(vac&&vacAlt){const i=VACANCES[zone].findIndex(v=>v.nom===vac.nom);return i%2===0?pA:pB;}return(wn%2===0)?(paireA?pA:pB):(paireA?pB:pA);}
  if(mode==="classique"){if(vac){const i=VACANCES[zone].findIndex(v=>v.nom===vac.nom);return i%2===0?pA:pB;}const dow=date.getDay();if(dow===6||dow===0)return wn%2===0?pA:pB;return pA;}
  return pA;
}
function dim(y,m){return new Date(y,m+1,0).getDate();}
function fdow(y,m){const d=new Date(y,m,1).getDay();return d===0?6:d-1;}
function dk(y,m,d){return`${y}-${String(m+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;}
function hex2rgb(h){return`${parseInt(h.slice(1,3),16)},${parseInt(h.slice(3,5),16)},${parseInt(h.slice(5,7),16)}`;}
function nextChange(cfg){const t=new Date();let d=new Date(t);const cp=getParent(t,cfg);for(let i=1;i<=90;i++){d=new Date(t);d.setDate(t.getDate()+i);if(getParent(d,cfg)!==cp)return{days:i,parent:getParent(d,cfg),date:d};}return null;}

// ─── GLASS BUTTON ─────────────────────────────────────────────────────────────
function Btn({children,onClick,color="#6366f1",size="md",full=false,danger=false}){
  const[h,setH]=useState(false);const[p,setP]=useState(false);
  const rgb=hex2rgb(danger?"#ef4444":color);
  const pad=size==="sm"?"6px 12px":size==="lg"?"14px 30px":"9px 18px";
  const fs=size==="sm"?12:size==="lg"?15:13;
  return(
    <button onMouseEnter={()=>setH(true)} onMouseLeave={()=>{setH(false);setP(false);}} onMouseDown={()=>setP(true)} onMouseUp={()=>setP(false)} onTouchStart={()=>setP(true)} onTouchEnd={()=>{setP(false);onClick&&onClick();}} onClick={onClick} style={{display:"inline-flex",alignItems:"center",justifyContent:"center",gap:6,padding:pad,fontSize:fs,fontWeight:800,color:"#fff",cursor:"pointer",width:full?"100%":"auto",background:h?`rgba(${rgb},0.35)`:`rgba(${rgb},0.18)`,backdropFilter:"blur(16px)",WebkitBackdropFilter:"blur(16px)",border:`1.5px solid rgba(${rgb},${h?0.7:0.35})`,borderRadius:13,boxShadow:h?`0 8px 28px rgba(${rgb},0.45),inset 0 1px 0 rgba(255,255,255,0.2)`:`0 4px 14px rgba(${rgb},0.25),inset 0 1px 0 rgba(255,255,255,0.1)`,transform:p?"scale(0.96) translateY(1px)":h?"translateY(-2px)":"none",transition:"all 0.2s cubic-bezier(0.34,1.56,0.64,1)",outline:"none",fontFamily:"inherit",letterSpacing:"0.2px"}}>
      {children}
    </button>
  );
}

function Pill({active,color,onClick,children}){
  const rgb=hex2rgb(color);
  return <div onClick={onClick} style={{padding:"6px 13px",borderRadius:20,fontSize:13,fontWeight:700,cursor:"pointer",background:active?`rgba(${rgb},0.22)`:"rgba(255,255,255,0.06)",border:`1.5px solid ${active?color:"rgba(255,255,255,0.12)"}`,color:active?color:"rgba(255,255,255,0.45)",backdropFilter:"blur(8px)",boxShadow:active?`0 2px 10px rgba(${rgb},0.3)`:"none",transition:"all 0.18s"}}>{children}</div>;
}

function Tog({on,onChange,label,color="#818cf8"}){
  const rgb=hex2rgb(color);
  return <label onClick={onChange} style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer",userSelect:"none"}}><div style={{width:36,height:20,borderRadius:10,background:on?color:"rgba(255,255,255,0.12)",position:"relative",transition:"all 0.2s",boxShadow:on?`0 2px 8px rgba(${rgb},0.4)`:"none",flexShrink:0}}><div style={{position:"absolute",top:2,left:on?18:2,width:16,height:16,borderRadius:"50%",background:"#fff",transition:"all 0.2s",boxShadow:"0 1px 4px rgba(0,0,0,0.25)"}}/></div><span style={{fontSize:13,fontWeight:600,color:on?color:"rgba(255,255,255,0.45)"}}>{label}</span></label>;
}

// ─── RGPD SCREEN ──────────────────────────────────────────────────────────────
function RgpdScreen({onAccept,lang,setLang}){
  const[cgu,setCgu]=useState(false);const[certif,setCertif]=useState(false);const[err,setErr]=useState(false);const[showCgu,setShowCgu]=useState(null);
  const t=LANGS[lang];
  function accept(){if(!cgu||!certif){setErr(true);return;}onAccept();}
  const S={
    wrap:{minHeight:"100vh",background:"linear-gradient(160deg,#060612 0%,#0f0a2e 50%,#0a1628 100%)",display:"flex",alignItems:"center",justifyContent:"center",padding:"20px 16px",fontFamily:"'Nunito','Segoe UI',sans-serif"},
    card:{background:"rgba(255,255,255,0.06)",backdropFilter:"blur(24px)",WebkitBackdropFilter:"blur(24px)",borderRadius:24,border:"1px solid rgba(255,255,255,0.1)",padding:"28px 24px",maxWidth:480,width:"100%",boxShadow:"0 20px 60px rgba(0,0,0,0.5)"},
    logo:{display:"flex",alignItems:"center",gap:10,marginBottom:20},
    logoBox:{width:44,height:44,background:"linear-gradient(135deg,#6366f1,#818cf8)",borderRadius:13,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,boxShadow:"0 4px 16px rgba(99,102,241,0.4)"},
    logoText:{fontWeight:900,fontSize:22,color:"#fff",letterSpacing:"-0.5px"},
    title:{fontSize:20,fontWeight:900,color:"#fff",marginBottom:4},
    sub:{fontSize:13,color:"rgba(255,255,255,0.45)",marginBottom:20},
    section:{marginBottom:16},
    sTitle:{fontSize:11,fontWeight:700,letterSpacing:"1.2px",textTransform:"uppercase",color:"rgba(255,255,255,0.35)",marginBottom:8},
    list:{listStyle:"none",padding:0,margin:0},
    listItem:{display:"flex",alignItems:"flex-start",gap:8,fontSize:13,color:"rgba(255,255,255,0.7)",marginBottom:5,lineHeight:1.4},
    noList:{background:"rgba(239,68,68,0.08)",border:"1px solid rgba(239,68,68,0.2)",borderRadius:10,padding:"10px 12px"},
    noItem:{display:"flex",alignItems:"flex-start",gap:8,fontSize:12,color:"rgba(239,68,68,0.9)",marginBottom:4,lineHeight:1.4},
    infoBox:{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:10,padding:"10px 12px",fontSize:12,color:"rgba(255,255,255,0.55)",lineHeight:1.5,marginBottom:10},
    checkRow:{display:"flex",alignItems:"flex-start",gap:10,padding:"10px 0",borderTop:"1px solid rgba(255,255,255,0.07)"},
    checkbox:(on)=>({width:20,height:20,borderRadius:6,border:`2px solid ${on?"#6366f1":"rgba(255,255,255,0.25)"}`,background:on?"#6366f1":"transparent",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:0,transition:"all 0.15s",marginTop:1}),
    link:{color:"#818cf8",cursor:"pointer",textDecoration:"underline",textDecorationStyle:"dotted"},
    err:{color:"#f87171",fontSize:12,textAlign:"center",marginBottom:10,fontWeight:600},
    langRow:{display:"flex",gap:8,justifyContent:"center",marginBottom:16},
  };
  return(
    <div style={S.wrap}>
      <div style={S.card}>
        {/* Lang selector */}
        <div style={S.langRow}>
          {[["fr","🇫🇷"],["es","🇪🇸"],["en","🇬🇧"]].map(([l,f])=>(
            <div key={l} onClick={()=>setLang(l)} style={{fontSize:20,cursor:"pointer",opacity:lang===l?1:0.35,transition:"opacity 0.15s"}}>{f}</div>
          ))}
        </div>
        <div style={S.logo}>
          <div style={S.logoBox}>👨‍👧</div>
          <div style={S.logoText}>CoParent<span style={{color:"#818cf8"}}>Pro</span></div>
        </div>
        <div style={S.title}>{t.rgpdTitle}</div>
        <div style={S.sub}>{t.rgpdSub}</div>

        {/* Ce que fait l'app */}
        <div style={S.section}>
          <div style={S.sTitle}>✅ {t.rgpdWhat}</div>
          <ul style={S.list}>{t.rgpdWhatList.map((item,i)=><li key={i} style={S.listItem}><span style={{color:"#34d399",flexShrink:0}}>✓</span>{item}</li>)}</ul>
        </div>

        {/* Ce que ne fait PAS l'app */}
        <div style={{...S.section,...S.noList}}>
          <div style={{...S.sTitle,color:"rgba(239,68,68,0.6)",marginBottom:6}}>❌ {t.rgpdNotWhat}</div>
          {t.rgpdNotList.map((item,i)=><div key={i} style={S.noItem}><span style={{flexShrink:0}}>✕</span>{item}</div>)}
        </div>

        {/* Données */}
        <div style={{...S.infoBox,marginTop:12}}>
          <strong style={{color:"rgba(255,255,255,0.7)"}}>🔒 {t.rgpdData} : </strong>{t.rgpdDataText}
        </div>

        {/* RGPD */}
        <div style={S.infoBox}>
          <strong style={{color:"rgba(255,255,255,0.7)"}}>🇪🇺 {t.rgpdCnil} : </strong>{t.rgpdCnilText}
        </div>

        {/* Mineurs */}
        <div style={S.infoBox}>
          <strong style={{color:"rgba(255,255,255,0.7)"}}>👶 {t.rgpdMineur} : </strong>{t.rgpdMineurText}
        </div>

        {/* Checkbox CGU */}
        <div style={S.checkRow}>
          <div style={S.checkbox(cgu)} onClick={()=>setCgu(v=>!v)}>{cgu&&<span style={{color:"#fff",fontSize:12}}>✓</span>}</div>
          <div style={{fontSize:13,color:"rgba(255,255,255,0.7)",lineHeight:1.5}}>
            {t.rgpdAccept1}
            <span style={S.link} onClick={()=>setShowCgu("cgu")}>{t.rgpdCgu}</span>
            {t.rgpdAccept2}
            <span style={S.link} onClick={()=>setShowCgu("pc")}>{t.rgpdPc}</span>
          </div>
        </div>

        {/* Checkbox majeur/parent */}
        <div style={S.checkRow}>
          <div style={S.checkbox(certif)} onClick={()=>setCertif(v=>!v)}>{certif&&<span style={{color:"#fff",fontSize:12}}>✓</span>}</div>
          <div style={{fontSize:13,color:"rgba(255,255,255,0.7)",lineHeight:1.5}}>{t.rgpdCertif}</div>
        </div>

        {err&&<div style={S.err}>{t.rgpdMustAccept}</div>}

        <div style={{marginTop:16}}>
          <Btn onClick={accept} color="#6366f1" size="lg" full>{t.rgpdBtn}</Btn>
        </div>

        <div style={{textAlign:"center",marginTop:12,fontSize:11,color:"rgba(255,255,255,0.2)",lineHeight:1.4}}>{t.disclaimer}</div>
      </div>

      {/* Modal CGU/PC */}
      {showCgu&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.8)",backdropFilter:"blur(10px)",zIndex:999,display:"flex",alignItems:"flex-end",justifyContent:"center"}} onClick={e=>e.target===e.currentTarget&&setShowCgu(null)}>
          <div style={{background:"#0f0a2e",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"20px 20px 0 0",padding:"24px 20px 40px",width:"100%",maxWidth:480,maxHeight:"80vh",overflow:"auto"}}>
            <div style={{fontWeight:900,fontSize:17,color:"#fff",marginBottom:16}}>{showCgu==="cgu"?t.cguTitle:t.pcTitle}</div>
            <pre style={{fontSize:12,color:"rgba(255,255,255,0.6)",lineHeight:1.7,whiteSpace:"pre-wrap",fontFamily:"inherit"}}>{showCgu==="cgu"?CGU_FR:PC_FR}</pre>
            <div style={{marginTop:16}}>
              <Btn onClick={()=>{setShowCgu(null);setCgu(true);}} color="#34d399">✓ Lu et accepté</Btn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App(){
  const today=new Date();
  const[accepted,setAccepted]=useState(()=>localStorage.getItem("cpp_accepted")==="1");
  const[lang,setLang]=useState("fr");
  const[dark,setDark]=useState(true);
  const[tab,setTab]=useState(0);
  const[month,setMonth]=useState(today.getMonth());
  const[year,setYear]=useState(today.getFullYear());
  const[zone,setZone]=useState("B");
  const[mode,setMode]=useState("alternee");
  const[pA,setPa]=useState("Maman");
  const[pB,setPb]=useState("Papa");
  const[paireA,setPaireA]=useState(true);
  const[vacAlt,setVacAlt]=useState(true);
  const[showFeries,setShowFeries]=useState(true);
  const[colorA,setColorA]=useState(PALETTES[0].a);
  const[colorB,setColorB]=useState(PALETTES[0].b);
  const[palIdx,setPalIdx]=useState(0);
  const[events,setEvents]=useState({});
  const[notes,setNotes]=useState({});
  const[selDay,setSelDay]=useState(null);
  const[modal,setModal]=useState(null);
  const[newEvt,setNewEvt]=useState({type:"rdv",titre:"",heure:"",shared:true});
  const[newNote,setNewNote]=useState("");
  const[checklist,setChecklist]=useState({});
  const[contacts,setContacts]=useState([{nom:"",tel:""}]);
  const[screenW,setScreenW]=useState(typeof window!=="undefined"?window.innerWidth:420);
  const[showCguModal,setShowCguModal]=useState(null);
  const[animIn,setAnimIn]=useState(false);

  const t=LANGS[lang];
  const cfg={mode,pA,pB,paireA,zone,vacAlt};

  useEffect(()=>{
    setTimeout(()=>setAnimIn(true),80);
    const r=()=>setScreenW(window.innerWidth);
    window.addEventListener("resize",r);return()=>window.removeEventListener("resize",r);
  },[]);

  function handleAccept(){localStorage.setItem("cpp_accepted","1");setAccepted(true);}
  function deleteAllData(){if(window.confirm(t.deleteConfirm)){setEvents({});setNotes({});setChecklist({});setContacts([{nom:"",tel:""}]);setPa("Maman");setPb("Papa");localStorage.removeItem("cpp_accepted");setAccepted(false);}}

  if(!accepted)return <RgpdScreen onAccept={handleAccept} lang={lang} setLang={setLang}/>;

  const isDesktop=screenW>=1024;
  const isTablet=screenW>=640;
  const rgb_A=hex2rgb(colorA);const rgb_B=hex2rgb(colorB);

  const dimM2=dim(year,month);const fd=fdow(year,month);
  const cells=[]; for(let i=0;i<fd;i++)cells.push(null); for(let i=1;i<=dimM2;i++)cells.push(i);

  function getCellData(day){
    if(!day)return null;
    const date=new Date(year,month,day);const key=dk(year,month,day);
    const par=getParent(date,cfg);const vac=getVac(date,zone);
    const ferie=isFerie(date);const isA=par===pA;const wn=getWN(date);
    const isToday=date.toDateString()===today.toDateString();
    return{par,vac,ferie,isA,wn,isToday,evts:events[key]||[],note:notes[key]||"",key,date};
  }

  const allD=cells.map(d=>d?getCellData(d):null).filter(Boolean);
  const stA=allD.filter(d=>d.isA).length;const stB=allD.filter(d=>!d.isA).length;
  const pct=Math.round(stA/(stA+stB||1)*100);
  const cntd=nextChange(cfg);
  const selData=selDay?getCellData(selDay):null;

  function addEvent(){if(!newEvt.titre.trim())return;const key=dk(year,month,selDay);setEvents(p=>({...p,[key]:[...(p[key]||[]),{...newEvt,id:Date.now()}]}));setNewEvt({type:"rdv",titre:"",heure:"",shared:true});setModal(null);}
  function delEvent(key,id){setEvents(p=>({...p,[key]:p[key].filter(e=>e.id!==id)}));}
  function saveNote(){const key=dk(year,month,selDay);setNotes(p=>({...p,[key]:newNote}));setModal(null);}

  // Upcoming events
  const upEvts=[];
  for(let m2=0;m2<3;m2++){const mm=(month+m2)%12;const yy=year+Math.floor((month+m2)/12);const d2=dim(yy,mm);for(let d=1;d<=d2;d++){const key=dk(yy,mm,d);if(events[key]?.length){const date=new Date(yy,mm,d);if(date>=today)events[key].forEach(e=>upEvts.push({...e,date,key,day:d,mm,yy}))}}}
  upEvts.sort((a,b)=>a.date-b.date);

  // STYLES
  const bg=dark?"linear-gradient(160deg,#060612 0%,#0f0a2e 45%,#0a1628 100%)":"linear-gradient(160deg,#e8eaf6 0%,#f3e5f5 50%,#e3f2fd 100%)";
  const cardBg=dark?"rgba(255,255,255,0.06)":"rgba(255,255,255,0.6)";
  const cardBorder=dark?"rgba(255,255,255,0.09)":"rgba(200,200,230,0.6)";
  const textMain=dark?"#fff":"#1a1a2e";
  const textSub=dark?"rgba(255,255,255,0.38)":"rgba(26,26,46,0.45)";
  const maxW=isDesktop?920:isTablet?680:460;

  const S={
    app:{minHeight:"100vh",background:bg,color:textMain,fontFamily:"'Nunito','Segoe UI',sans-serif",display:"flex",flexDirection:"column",alignItems:"center",transition:"background 0.4s"},
    hdr:{width:"100%",background:dark?"rgba(6,6,18,0.75)":"rgba(255,255,255,0.65)",backdropFilter:"blur(24px)",WebkitBackdropFilter:"blur(24px)",borderBottom:`1px solid ${cardBorder}`,padding:isDesktop?"14px 40px":"12px 16px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:300,boxSizing:"border-box"},
    logo:{display:"flex",alignItems:"center",gap:8,fontWeight:900,fontSize:isDesktop?20:17,letterSpacing:"-0.5px",color:textMain},
    logoBox:{width:34,height:34,background:"linear-gradient(135deg,#6366f1,#818cf8)",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,boxShadow:"0 3px 12px rgba(99,102,241,0.4)",flexShrink:0},
    layout:{width:"100%",maxWidth:maxW,display:isDesktop?"grid":"flex",gridTemplateColumns:isDesktop?"260px 1fr":"",flexDirection:"column",gap:isDesktop?20:0,padding:isDesktop?"20px 20px 40px":"14px 14px 80px",boxSizing:"border-box",opacity:animIn?1:0,transform:animIn?"none":"translateY(14px)",transition:"all 0.4s ease"},
    sidebar:{display:isDesktop?"flex":"none",flexDirection:"column",gap:6,position:"sticky",top:80,height:"fit-content"},
    sideItem:(on)=>({display:"flex",alignItems:"center",gap:9,padding:"10px 14px",borderRadius:11,cursor:"pointer",fontWeight:700,fontSize:13,background:on?`rgba(${rgb_A},0.16)`:"transparent",color:on?colorA:textSub,border:`1px solid ${on?colorA+"44":"transparent"}`,transition:"all 0.16s"}),
    main:{flex:1,minWidth:0},
    card:{background:cardBg,backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",borderRadius:18,border:`1px solid ${cardBorder}`,padding:isDesktop?"20px":"16px",marginBottom:12,boxShadow:dark?"0 4px 28px rgba(0,0,0,0.3)":"0 4px 20px rgba(0,0,0,0.07)"},
    sec:{fontSize:11,fontWeight:700,letterSpacing:"1.5px",textTransform:"uppercase",color:textSub,marginBottom:9},
    row:{display:"flex",gap:7,flexWrap:"wrap"},
    inp:{background:dark?"rgba(255,255,255,0.08)":"rgba(255,255,255,0.75)",border:`1px solid ${dark?"rgba(255,255,255,0.12)":"rgba(0,0,0,0.1)"}`,borderRadius:10,padding:"9px 12px",color:textMain,fontSize:14,fontWeight:600,outline:"none",width:"100%",boxSizing:"border-box",fontFamily:"inherit"},
    inpLbl:{fontSize:11,color:textSub,marginBottom:3,fontWeight:600},
    calHdr:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12},
    mTitle:{fontSize:isDesktop?22:19,fontWeight:900,color:textMain,letterSpacing:"-0.5px"},
    grid:{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:3},
    dHdr:{textAlign:"center",fontSize:10,fontWeight:700,color:textSub,paddingBottom:5},
    cell:(d,sel)=>{
      if(!d)return{height:42,borderRadius:9};
      return{height:42,borderRadius:9,background:d.isToday?`linear-gradient(135deg,${colorA},${colorB})`:d.isA?`rgba(${rgb_A},0.2)`:`rgba(${rgb_B},0.2)`,cursor:"pointer",position:"relative",border:`2px solid ${sel?"#fff":d.vac?"rgba(251,191,36,0.4)":"transparent"}`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",transition:"all 0.12s",overflow:"hidden",backdropFilter:"blur(4px)"};
    },
    panel:{background:dark?"rgba(255,255,255,0.04)":"rgba(255,255,255,0.75)",borderRadius:13,border:`1px solid ${cardBorder}`,padding:"13px 14px",marginTop:11,backdropFilter:"blur(12px)"},
    statsBar:{marginTop:12,background:dark?"rgba(0,0,0,0.25)":"rgba(0,0,0,0.07)",borderRadius:8,overflow:"hidden",height:7,display:"flex"},
    statsRow:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9,marginTop:9},
    statBox:(c)=>({background:`rgba(${hex2rgb(c)},0.1)`,border:`1px solid rgba(${hex2rgb(c)},0.22)`,borderRadius:11,padding:"11px",textAlign:"center",backdropFilter:"blur(8px)"}),
    badge:(c)=>({padding:"3px 8px",borderRadius:20,fontSize:11,fontWeight:700,background:`rgba(${hex2rgb(c)},0.18)`,color:c,border:`1px solid rgba(${hex2rgb(c)},0.28)`}),
    evtLine:(c)=>({display:"flex",alignItems:"center",gap:8,padding:"8px 0",borderBottom:`1px solid ${dark?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.05)"}`}),
    modal:{position:"fixed",inset:0,background:"rgba(0,0,0,0.65)",backdropFilter:"blur(10px)",WebkitBackdropFilter:"blur(10px)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:500},
    mCard:{background:dark?"#0f0a2e":"#f0f0ff",border:`1px solid ${cardBorder}`,borderRadius:"20px 20px 0 0",padding:"22px 20px 40px",width:"100%",maxWidth:460,backdropFilter:"blur(32px)"},
    navBar:{position:"fixed",bottom:0,left:0,right:0,background:dark?"rgba(6,6,18,0.93)":"rgba(240,240,255,0.93)",backdropFilter:"blur(24px)",WebkitBackdropFilter:"blur(24px)",borderTop:`1px solid ${cardBorder}`,display:isDesktop?"none":"flex",justifyContent:"space-around",padding:"9px 0 12px",zIndex:300},
    navItem:(on)=>({display:"flex",flexDirection:"column",alignItems:"center",gap:2,cursor:"pointer",color:on?colorA:textSub,fontSize:10,fontWeight:700,transition:"all 0.15s",transform:on?"translateY(-1px)":"none"}),
    disclaimer:{background:dark?"rgba(251,191,36,0.07)":"rgba(251,191,36,0.12)",border:"1px solid rgba(251,191,36,0.2)",borderRadius:10,padding:"9px 12px",fontSize:11,color:dark?"rgba(251,191,36,0.8)":"rgba(180,130,0,0.9)",textAlign:"center",marginBottom:12,lineHeight:1.4,fontWeight:600},
    vacItem:(now)=>({display:"flex",alignItems:"center",justifyContent:"space-between",padding:"8px 10px",borderRadius:9,background:now?"rgba(251,191,36,0.09)":"transparent",border:now?"1px solid rgba(251,191,36,0.28)":`1px solid ${dark?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.05)"}`,marginBottom:4}),
    annGrid:{display:"grid",gridTemplateColumns:isDesktop?"repeat(4,1fr)":isTablet?"repeat(3,1fr)":"repeat(3,1fr)",gap:9},
    cdown:{background:`linear-gradient(135deg,rgba(${rgb_A},0.12),rgba(${rgb_B},0.12))`,border:`1px solid rgba(${rgb_A},0.22)`,borderRadius:15,padding:"13px 16px",marginBottom:12,display:"flex",alignItems:"center",justifyContent:"space-between",backdropFilter:"blur(12px)"},
  };

  const tabIcons=["📅","🗓️","📆","⚙️"];

  // ─ CALENDAR VIEW ──────────────────────────────────────────────────────────
  function ViewCal(){
    return(
      <>
        {/* Disclaimer permanent */}
        <div style={S.disclaimer}>{t.disclaimer}</div>

        {/* Countdown */}
        {cntd&&(
          <div style={S.cdown}>
            <div>
              <div style={{fontSize:11,fontWeight:700,color:textSub,textTransform:"uppercase",letterSpacing:1}}>{t.countdown}</div>
              <div style={{fontSize:13,fontWeight:700,color:textMain,marginTop:2}}>→ <span style={{color:cntd.parent===pA?colorA:colorB}}>{cntd.parent}</span> · {cntd.date.toLocaleDateString("fr-FR",{weekday:"short",day:"numeric",month:"short"})}</div>
            </div>
            <div style={{textAlign:"center"}}>
              <div style={{fontSize:32,fontWeight:900,lineHeight:1,color:cntd.parent===pA?colorA:colorB}}>{cntd.days}</div>
              <div style={{fontSize:11,color:textSub,fontWeight:600}}>{t.days}</div>
            </div>
          </div>
        )}

        {/* Config */}
        <div style={S.card}>
          <div style={S.sec}>👤 Parents</div>
          <div style={{display:"flex",gap:8,marginBottom:11}}>
            <div style={{flex:1}}><div style={S.inpLbl}>Parent A</div><input style={{...S.inp,borderColor:`${colorA}44`}} value={pA} onChange={e=>setPa(e.target.value)} placeholder="Maman"/></div>
            <div style={{flex:1}}><div style={S.inpLbl}>Parent B</div><input style={{...S.inp,borderColor:`${colorB}44`}} value={pB} onChange={e=>setPb(e.target.value)} placeholder="Papa"/></div>
          </div>
          <div style={{...S.row,marginBottom:9}}>
            <Pill active={mode==="alternee"} color="#818cf8" onClick={()=>setMode("alternee")}>{t.alternee}</Pill>
            <Pill active={mode==="classique"} color="#818cf8" onClick={()=>setMode("classique")}>{t.classique}</Pill>
          </div>
          {mode==="alternee"&&<div style={{...S.row,marginBottom:9}}><Pill active={paireA} color={colorA} onClick={()=>setPaireA(true)}>{pA||"A"} {t.paireLabel}</Pill><Pill active={!paireA} color={colorB} onClick={()=>setPaireA(false)}>{pB||"B"} {t.paireLabel}</Pill></div>}
          <div style={{...S.row,marginBottom:9}}>{["A","B","C"].map(z=><Pill key={z} active={zone===z} color="#34d399" onClick={()=>setZone(z)}>Zone {z}</Pill>)}</div>
          <div style={{display:"flex",gap:14,flexWrap:"wrap"}}>
            <Tog on={vacAlt} onChange={()=>setVacAlt(v=>!v)} label={t.vacAlt} color="#818cf8"/>
            <Tog on={showFeries} onChange={()=>setShowFeries(v=>!v)} label={t.feries} color="#fbbf24"/>
          </div>
        </div>

        {/* Calendrier */}
        <div style={S.card}>
          <div style={S.calHdr}>
            <Btn onClick={()=>{if(month===0){setMonth(11);setYear(y=>y-1);}else setMonth(m=>m-1)}} color="#6366f1" size="sm">‹</Btn>
            <div style={S.mTitle}>{t.mois[month]} {year}</div>
            <Btn onClick={()=>{if(month===11){setMonth(0);setYear(y=>y+1);}else setMonth(m=>m+1)}} color="#6366f1" size="sm">›</Btn>
          </div>
          <div style={S.grid}>
            {t.jours.map(j=><div key={j} style={S.dHdr}>{j}</div>)}
            {cells.map((day,i)=>{
              const d=day?getCellData(day):null;const sel=selDay===day;
              const ec=(d?.evts||[]).map(e=>EVT_COLORS[EVT_IDS.indexOf(e.type)]||"#a78bfa");
              return(
                <div key={i} style={S.cell(d,sel)} onClick={()=>day&&setSelDay(sel?null:day)}>
                  {day&&<>
                    <span style={{fontSize:12,fontWeight:d?.isToday?900:600,color:d?.isToday?"#fff":textMain,lineHeight:1}}>{day}</span>
                    <span style={{position:"absolute",top:2,right:3,fontSize:7,color:dark?"rgba(255,255,255,0.25)":"rgba(0,0,0,0.2)",fontWeight:700}}>S{d.wn}</span>
                    {d.vac&&<div style={{width:4,height:4,borderRadius:"50%",background:"#fbbf24",marginTop:1}}/>}
                    {!d.vac&&ec.length>0&&<div style={{display:"flex",gap:1.5,marginTop:1}}>{ec.slice(0,3).map((c,ci)=><div key={ci} style={{width:3.5,height:3.5,borderRadius:"50%",background:c}}/>)}</div>}
                    {d.ferie&&showFeries&&!d.isToday&&<div style={{position:"absolute",top:0,left:0,right:0,height:2.5,background:"#fbbf24",borderRadius:"9px 9px 0 0"}}/>}
                    {d.note&&<div style={{position:"absolute",bottom:1,right:2,fontSize:6,opacity:0.6}}>📝</div>}
                  </>}
                </div>
              );
            })}
          </div>
          {/* Légende */}
          <div style={{display:"flex",gap:12,justifyContent:"center",marginTop:10,flexWrap:"wrap"}}>
            {[[colorA,pA],[colorB,pB],["#fbbf24","Vacances"]].map(([c,l])=>(
              <div key={l} style={{display:"flex",alignItems:"center",gap:5,fontSize:12,color:textSub}}>
                <div style={{width:10,height:10,borderRadius:3,background:c}}/><span style={{fontWeight:600}}>{l}</span>
              </div>
            ))}
          </div>
          {/* Panneau jour */}
          {selDay&&selData&&(
            <div style={S.panel}>
              <div style={{fontWeight:900,fontSize:14,marginBottom:5,color:textMain}}>
                📅 {selDay} {t.mois[month]} {year}
                <span style={{fontSize:11,color:textSub,marginLeft:7}}>S{selData.wn} · {selData.wn%2===0?t.semPaire:t.semImpaire}</span>
              </div>
              <div style={{marginBottom:7,fontSize:13}}>{t.garde} : <strong style={{color:selData.isA?colorA:colorB}}>{selData.par}</strong>{selData.ferie&&showFeries&&<span style={{marginLeft:6,color:"#fbbf24",fontSize:11}}>🎌 Férié</span>}{selData.vac&&<span style={{marginLeft:6,color:"#fbbf24",fontSize:11}}>🌴 {selData.vac.nom}</span>}</div>
              {selData.evts.map(e=>{const idx=EVT_IDS.indexOf(e.type);const c=EVT_COLORS[idx]||"#a78bfa";return(
                <div key={e.id} style={S.evtLine(c)}>
                  <div style={{width:3,height:26,borderRadius:2,background:c,flexShrink:0}}/>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:700,fontSize:12,color:textMain}}>{e.titre}</div>
                    <div style={{fontSize:11,color:textSub,display:"flex",gap:6}}>{e.heure&&<span>🕐{e.heure}</span>}<span style={S.badge(e.shared?colorA:"#64748b")}>{e.shared?t.shared:t.privacy}</span></div>
                  </div>
                  <button onClick={()=>delEvent(selData.key,e.id)} style={{background:"none",border:"none",color:textSub,cursor:"pointer",fontSize:15,padding:"0 3px"}}>×</button>
                </div>
              );})}
              {selData.note&&<div style={{marginTop:7,background:dark?"rgba(255,255,255,0.04)":"rgba(0,0,0,0.04)",borderRadius:7,padding:"7px 9px",fontSize:12,color:textSub}}>🔒 {selData.note}</div>}
              <div style={{display:"flex",gap:7,marginTop:10,flexWrap:"wrap"}}>
                <Btn color={colorA} onClick={()=>setModal("event")}>{t.addEvt}</Btn>
                <Btn color="#34d399" onClick={()=>{setNewNote(notes[selData.key]||"");setModal("note");}}>{t.addNote}</Btn>
              </div>
            </div>
          )}
          {/* Stats */}
          <div style={S.statsBar}><div style={{width:`${pct}%`,background:`linear-gradient(90deg,${colorA},${colorA}cc)`,transition:"width 0.4s"}}/><div style={{flex:1,background:`linear-gradient(90deg,${colorB}cc,${colorB})`}}/></div>
          <div style={S.statsRow}>
            <div style={S.statBox(colorA)}><div style={{fontSize:26,fontWeight:900,lineHeight:1,color:colorA}}>{stA}</div><div style={{fontSize:11,color:textSub,marginTop:2}}>{t.statsLabel[0]} {pA}</div></div>
            <div style={S.statBox(colorB)}><div style={{fontSize:26,fontWeight:900,lineHeight:1,color:colorB}}>{stB}</div><div style={{fontSize:11,color:textSub,marginTop:2}}>{t.statsLabel[1]} {pB}</div></div>
          </div>
        </div>

        {/* Vacances */}
        <div style={S.card}>
          <div style={S.sec}>🌴 {t.prochVac} — Zone {zone}</div>
          {VACANCES[zone].filter(v=>v.fin>=today).slice(0,4).map((v,i)=>{
            const now=today>=v.debut&&today<=v.fin;const par=vacAlt?(i%2===0?pA:pB):"—";
            return(<div key={v.nom} style={S.vacItem(now)}><div><div style={{fontWeight:700,fontSize:13,color:textMain}}>{now?"🟢 ":""}{v.nom}</div><div style={{fontSize:11,color:textSub}}>{v.debut.toLocaleDateString("fr-FR")} → {v.fin.toLocaleDateString("fr-FR")}</div></div>{vacAlt&&<span style={S.badge(par===pA?colorA:colorB)}>{par}</span>}</div>);
          })}
        </div>

        {/* Checklist */}
        <div style={S.card}>
          <div style={S.sec}>🎒 {t.checkItems[0].split(" ")[1]} Checklist</div>
          {t.checkItems.map((item,i)=>{const on=checklist[i];return(
            <div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"7px 0",borderBottom:`1px solid ${dark?"rgba(255,255,255,0.04)":"rgba(0,0,0,0.04)"}`}}>
              <div onClick={()=>setChecklist(p=>({...p,[i]:!p[i]}))} style={{width:20,height:20,borderRadius:6,border:`2px solid ${on?colorA:"rgba(255,255,255,0.2)"}`,background:on?colorA:"transparent",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:0,transition:"all 0.14s"}}>{on&&<span style={{color:"#fff",fontSize:11}}>✓</span>}</div>
              <span style={{fontSize:13,fontWeight:600,color:on?textSub:textMain,textDecoration:on?"line-through":"none"}}>{item}</span>
            </div>
          );})}
          <div style={{marginTop:8}}><Btn color="#64748b" size="sm" onClick={()=>setChecklist({})}>Réinitialiser</Btn></div>
        </div>

        {/* Contacts urgence */}
        <div style={S.card}>
          <div style={S.sec}>🚨 {t.urgLabel}</div>
          {contacts.map((c,i)=>(
            <div key={i} style={{display:"flex",gap:7,marginBottom:7}}>
              <input style={{...S.inp,flex:1}} placeholder="Nom" value={c.nom} onChange={e=>setContacts(p=>p.map((x,j)=>j===i?{...x,nom:e.target.value}:x))}/>
              <input style={{...S.inp,flex:1}} placeholder="Téléphone" value={c.tel} onChange={e=>setContacts(p=>p.map((x,j)=>j===i?{...x,tel:e.target.value}:x))}/>
              <button onClick={()=>setContacts(p=>p.filter((_,j)=>j!==i))} style={{background:"none",border:"none",color:textSub,cursor:"pointer",fontSize:17,padding:"0 3px"}}>×</button>
            </div>
          ))}
          <Btn color="#34d399" size="sm" onClick={()=>setContacts(p=>[...p,{nom:"",tel:""}])}>+ Contact</Btn>
        </div>
      </>
    );
  }

  function ViewEvents(){
    return(
      <div style={S.card}>
        <div style={S.sec}>🗓️ {t.tabs[1]}</div>
        <div style={S.disclaimer}>{t.disclaimer}</div>
        {upEvts.length===0&&<div style={{textAlign:"center",padding:"36px 0",color:textSub}}><div style={{fontSize:34,marginBottom:7}}>📭</div><div style={{fontSize:14,fontWeight:600}}>Aucun événement</div><div style={{fontSize:12,marginTop:3}}>Cliquez sur un jour dans le calendrier</div></div>}
        {upEvts.slice(0,30).map((e,i)=>{const idx=EVT_IDS.indexOf(e.type);const c=EVT_COLORS[idx]||"#a78bfa";const par=getParent(e.date,cfg);return(
          <div key={i} style={{...S.evtLine(c),paddingBottom:9}}>
            <div style={{width:3,height:36,borderRadius:2,background:c,flexShrink:0}}/>
            <div style={{flex:1}}>
              <div style={{display:"flex",alignItems:"center",gap:5,flexWrap:"wrap"}}>
                <span style={{fontWeight:800,fontSize:13,color:textMain}}>{e.titre}</span>
                <span style={S.badge(e.shared?colorA:"#64748b")}>{e.shared?t.shared:t.privacy}</span>
              </div>
              <div style={{fontSize:11,color:textSub,marginTop:2}}>
                {e.date.toLocaleDateString("fr-FR",{weekday:"short",day:"numeric",month:"long"})}{e.heure&&" · "+e.heure} · <span style={{color:par===pA?colorA:colorB}}>{par}</span>
              </div>
            </div>
            <button onClick={()=>delEvent(e.key,e.id)} style={{background:"none",border:"none",color:textSub,cursor:"pointer",fontSize:15}}>×</button>
          </div>
        );})}
      </div>
    );
  }

  function ViewAnnuel(){
    return(
      <div style={S.card}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
          <div style={S.sec}>📆 {t.tabs[2]} {year}</div>
          <div style={{display:"flex",gap:6}}><Btn color="#6366f1" size="sm" onClick={()=>setYear(y=>y-1)}>‹</Btn><Btn color="#6366f1" size="sm" onClick={()=>setYear(y=>y+1)}>›</Btn></div>
        </div>
        <div style={S.annGrid}>
          {Array.from({length:12},(_,mi)=>{
            const d2=dim(year,mi);const fd2=fdow(year,mi);
            const mc=[];for(let i=0;i<fd2;i++)mc.push(null);for(let d=1;d<=d2;d++)mc.push(d);
            while(mc.length%7!==0)mc.push(null);
            return(
              <div key={mi} style={{background:cardBg,borderRadius:11,padding:"9px 7px",border:`1px solid ${cardBorder}`}}>
                <div style={{fontSize:10,fontWeight:800,textAlign:"center",marginBottom:5,color:textSub}}>{t.moisC[mi]}</div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:1.5}}>
                  {mc.map((d,j)=>{
                    if(!d)return<div key={j} style={{width:"100%",paddingTop:"100%"}}/>;
                    const isA2=getParent(new Date(year,mi,d),cfg)===pA;
                    const isT2=new Date(year,mi,d).toDateString()===today.toDateString();
                    return<div key={j} style={{width:"100%",paddingTop:"100%",borderRadius:2,background:isT2?"#fff":isA2?`rgba(${rgb_A},0.5)`:`rgba(${rgb_B},0.5)`}}/>;
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <div style={{display:"flex",gap:12,justifyContent:"center",marginTop:11,flexWrap:"wrap"}}>
          {[[colorA,pA],[colorB,pB]].map(([c,l])=>(
            <div key={l} style={{display:"flex",alignItems:"center",gap:5,fontSize:12,color:textSub}}>
              <div style={{width:10,height:10,borderRadius:3,background:c}}/><span style={{fontWeight:600}}>{l}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  function ViewSettings(){
    return(
      <>
        <div style={S.card}>
          <div style={S.sec}>🌍 {t.langLabel}</div>
          <div style={S.row}>
            {[["fr","🇫🇷 Français"],["es","🇪🇸 Español"],["en","🇬🇧 English"]].map(([l,lb])=>(
              <Pill key={l} active={lang===l} color="#818cf8" onClick={()=>setLang(l)}>{lb}</Pill>
            ))}
          </div>
        </div>
        <div style={S.card}>
          <div style={S.sec}>🎨 {t.themeLabel}</div>
          <div style={S.row}>
            <Pill active={dark} color="#818cf8" onClick={()=>setDark(true)}>🌙 {t.themeDark}</Pill>
            <Pill active={!dark} color="#f59e0b" onClick={()=>setDark(false)}>☀️ {t.themeLight}</Pill>
          </div>
        </div>
        <div style={S.card}>
          <div style={S.sec}>🎨 {t.couleursLabel}</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:8,marginBottom:14}}>
            {PALETTES.map((p,i)=>(
              <div key={i} onClick={()=>{setPalIdx(i);setColorA(p.a);setColorB(p.b);}} style={{height:30,borderRadius:8,background:`linear-gradient(135deg,${p.a},${p.b})`,cursor:"pointer",border:palIdx===i?"3px solid #fff":"3px solid transparent",boxShadow:palIdx===i?"0 0 0 2px rgba(255,255,255,0.4)":"none",transition:"all 0.15s"}}/>
            ))}
          </div>
          <div style={{display:"flex",gap:10}}>
            <div style={{flex:1}}><div style={S.inpLbl}>{pA}</div><div style={{display:"flex",gap:7,alignItems:"center"}}><input type="color" value={colorA} onChange={e=>{setColorA(e.target.value);setPalIdx(-1);}} style={{width:38,height:32,borderRadius:7,border:"none",cursor:"pointer",padding:2}}/><span style={{fontSize:11,color:textSub,fontFamily:"monospace"}}>{colorA}</span></div></div>
            <div style={{flex:1}}><div style={S.inpLbl}>{pB}</div><div style={{display:"flex",gap:7,alignItems:"center"}}><input type="color" value={colorB} onChange={e=>{setColorB(e.target.value);setPalIdx(-1);}} style={{width:38,height:32,borderRadius:7,border:"none",cursor:"pointer",padding:2}}/><span style={{fontSize:11,color:textSub,fontFamily:"monospace"}}>{colorB}</span></div></div>
          </div>
          <div style={{display:"flex",gap:8,marginTop:11}}>
            <div style={{flex:1,height:44,borderRadius:11,background:`rgba(${rgb_A},0.2)`,border:`2px solid ${colorA}`,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:13,color:colorA}}>{pA||"Parent A"}</div>
            <div style={{flex:1,height:44,borderRadius:11,background:`rgba(${rgb_B},0.2)`,border:`2px solid ${colorB}`,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:13,color:colorB}}>{pB||"Parent B"}</div>
          </div>
        </div>
        {/* Confidentialité */}
        <div style={S.card}>
          <div style={S.sec}>🔒 Confidentialité & RGPD</div>
          {[["📅 Calendrier","Toujours visible (base de l'app)","#34d399"],["🗓️ Événements","Votre choix par événement (Partagé/Privé)",colorA],["📝 Notes","Toujours privées — jamais partagées","#64748b"],["🚨 Contacts","Gérés localement sur votre appareil","#64748b"]].map(([label,desc,c])=>(
            <div key={label} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderBottom:`1px solid ${dark?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.05)"}`}}>
              <div><div style={{fontWeight:700,fontSize:12,color:textMain}}>{label}</div><div style={{fontSize:11,color:textSub}}>{desc}</div></div>
              <span style={S.badge(c)}>{c==="#64748b"?t.privacy:t.shared}</span>
            </div>
          ))}
        </div>
        {/* Docs légaux */}
        <div style={S.card}>
          <div style={S.sec}>⚖️ Documents légaux</div>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            <Btn color="#6366f1" size="sm" onClick={()=>setShowCguModal("cgu")}>{t.cguTitle}</Btn>
            <Btn color="#6366f1" size="sm" onClick={()=>setShowCguModal("pc")}>{t.pcTitle}</Btn>
          </div>
          <div style={{marginTop:12,fontSize:12,color:textSub,lineHeight:1.6}}>{t.disclaimer}</div>
        </div>
        {/* Supprimer données */}
        <div style={S.card}>
          <div style={S.sec}>🗑️ Mes données</div>
          <div style={{fontSize:13,color:textSub,marginBottom:12,lineHeight:1.5}}>Vous pouvez effacer toutes vos données à tout moment. Cette action est irréversible et réinitialisera l'application.</div>
          <Btn color="#ef4444" danger onClick={deleteAllData}>{t.deleteData}</Btn>
        </div>
        <div style={{textAlign:"center",fontSize:11,color:textSub,padding:"4px 0 8px"}}>CoParentPro v4.0 · 2026</div>
      </>
    );
  }

  const views=[<ViewCal/>,<ViewEvents/>,<ViewAnnuel/>,<ViewSettings/>];

  return(
    <div style={S.app}>
      {/* Header */}
      <div style={S.hdr}>
        <div style={S.logo}>
          <div style={S.logoBox}>👨‍👧</div>
          <span>CoParent<span style={{color:"#818cf8"}}>Pro</span></span>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          {isDesktop&&<div style={{display:"flex",gap:6}}>{[["fr","🇫🇷"],["es","🇪🇸"],["en","🇬🇧"]].map(([l,f])=><div key={l} onClick={()=>setLang(l)} style={{fontSize:17,cursor:"pointer",opacity:lang===l?1:0.35,transition:"opacity 0.15s"}}>{f}</div>)}</div>}
          <div onClick={()=>setDark(d=>!d)} style={{width:30,height:30,borderRadius:8,background:dark?"rgba(255,255,255,0.07)":"rgba(0,0,0,0.07)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:15}}>{dark?"☀️":"🌙"}</div>
        </div>
      </div>

      {/* Layout */}
      <div style={S.layout}>
        {isDesktop&&(
          <div style={S.sidebar}>
            <div style={{fontSize:10,fontWeight:700,letterSpacing:"1.2px",textTransform:"uppercase",color:textSub,padding:"0 6px 5px"}}>Navigation</div>
            {t.tabs.map((label,i)=><div key={i} style={S.sideItem(tab===i)} onClick={()=>setTab(i)}><span style={{fontSize:17}}>{tabIcons[i]}</span><span>{label}</span></div>)}
            <div style={{marginTop:10,padding:"0 6px"}}>
              <div style={{fontSize:10,fontWeight:700,letterSpacing:"1.2px",textTransform:"uppercase",color:textSub,marginBottom:7}}>Couleurs</div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:5}}>{PALETTES.map((p,i)=><div key={i} onClick={()=>{setPalIdx(i);setColorA(p.a);setColorB(p.b);}} style={{height:22,borderRadius:6,background:`linear-gradient(135deg,${p.a},${p.b})`,cursor:"pointer",border:palIdx===i?"2.5px solid #fff":"2.5px solid transparent",transition:"all 0.14s"}}/>)}</div>
            </div>
            <div style={{marginTop:12,padding:"10px",background:"rgba(251,191,36,0.07)",borderRadius:10,border:"1px solid rgba(251,191,36,0.15)",fontSize:10,color:"rgba(251,191,36,0.7)",lineHeight:1.4,fontWeight:600}}>{t.disclaimer}</div>
          </div>
        )}
        <div style={S.main}>{views[tab]}</div>
      </div>

      {/* Nav mobile */}
      <div style={S.navBar}>
        {t.tabs.map((label,i)=>(
          <div key={i} style={S.navItem(tab===i)} onClick={()=>setTab(i)}>
            <span style={{fontSize:19}}>{tabIcons[i]}</span>
            <span>{label}</span>
          </div>
        ))}
      </div>

      {/* Modal ajout événement */}
      {modal==="event"&&selDay&&(
        <div style={S.modal} onClick={e=>e.target===e.currentTarget&&setModal(null)}>
          <div style={S.mCard}>
            <div style={{fontWeight:900,fontSize:16,marginBottom:13,color:textMain}}>{t.addEvt} · {selDay} {t.mois[month]}</div>
            <div style={S.disclaimer}>{t.disclaimer}</div>
            <div style={{marginBottom:11}}><div style={S.inpLbl}>Type</div><div style={{...S.row,gap:5}}>{EVT_IDS.map((id,i)=><Pill key={id} active={newEvt.type===id} color={EVT_COLORS[i]} onClick={()=>setNewEvt(e=>({...e,type:id}))}>{t.evtTypes[i]}</Pill>)}</div></div>
            <div style={{marginBottom:11}}><div style={S.inpLbl}>Titre *</div><input style={S.inp} value={newEvt.titre} onChange={e=>setNewEvt(v=>({...v,titre:e.target.value}))} placeholder="Ex: Pédiatre, match de foot…" autoFocus/></div>
            <div style={{marginBottom:11}}><div style={S.inpLbl}>Heure</div><input type="time" style={S.inp} value={newEvt.heure} onChange={e=>setNewEvt(v=>({...v,heure:e.target.value}))}/></div>
            <div style={{marginBottom:16}}><div style={S.inpLbl}>Visibilité</div><div style={S.row}><Pill active={newEvt.shared} color={colorA} onClick={()=>setNewEvt(v=>({...v,shared:true}))}>{t.shared}</Pill><Pill active={!newEvt.shared} color="#64748b" onClick={()=>setNewEvt(v=>({...v,shared:false}))}>{t.privacy}</Pill></div></div>
            <div style={{display:"flex",gap:8}}><Btn color={colorA} onClick={addEvent}>{t.ajouter}</Btn><Btn color="#64748b" onClick={()=>setModal(null)}>{t.annuler}</Btn></div>
          </div>
        </div>
      )}

      {/* Modal note */}
      {modal==="note"&&selDay&&(
        <div style={S.modal} onClick={e=>e.target===e.currentTarget&&setModal(null)}>
          <div style={S.mCard}>
            <div style={{fontWeight:900,fontSize:16,marginBottom:5,color:textMain}}>📝 Note · {selDay} {t.mois[month]}</div>
            <div style={{fontSize:12,color:"#64748b",marginBottom:11,fontWeight:600}}>🔒 Note privée — jamais visible par l'autre parent</div>
            <textarea style={{...S.inp,height:110,resize:"none",lineHeight:1.5}} value={newNote} onChange={e=>setNewNote(e.target.value)} placeholder="Remarque, rappel, info importante…" autoFocus/>
            <div style={{display:"flex",gap:8,marginTop:12}}><Btn color="#34d399" onClick={saveNote}>{t.enregistrer}</Btn><Btn color="#64748b" onClick={()=>setModal(null)}>{t.annuler}</Btn></div>
          </div>
        </div>
      )}

      {/* Modal CGU/PC */}
      {showCguModal&&(
        <div style={S.modal} onClick={e=>e.target===e.currentTarget&&setShowCguModal(null)}>
          <div style={{...S.mCard,maxHeight:"80vh",overflow:"auto"}}>
            <div style={{fontWeight:900,fontSize:16,marginBottom:14,color:textMain}}>{showCguModal==="cgu"?t.cguTitle:t.pcTitle}</div>
            <pre style={{fontSize:12,color:textSub,lineHeight:1.7,whiteSpace:"pre-wrap",fontFamily:"inherit"}}>{showCguModal==="cgu"?CGU_FR:PC_FR}</pre>
            <div style={{marginTop:14}}><Btn color="#6366f1" onClick={()=>setShowCguModal(null)}>Fermer</Btn></div>
          </div>
        </div>
      )}
    </div>
  );
}
