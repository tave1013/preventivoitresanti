'use client';

import { useEffect, useRef, useState } from "react";
import {
  cliente, fornitore, contatto, date, pianoIniziale, intro, plans, investimento,
  nonIncluso, noteFinali, condizioniIntro, condizioni, accettazione,
} from "./data";

const SANS = "'DM Sans', sans-serif";
const SERIF = "'DM Serif Display', serif";

function formatData(iso) {
  const [y, m, d] = iso.slice(0, 10).split("-");
  return `${d}/${m}/${y}`;
}

function fineScadenza(iso) {
  if (iso.includes("T")) return new Date(iso).getTime();
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d, 23, 59, 59).getTime();
}

function tempoRimasto(iso) {
  const diff = fineScadenza(iso) - Date.now();
  if (diff <= 0) return null;
  const sec = Math.floor(diff / 1000);
  return { g: Math.floor(sec / 86400), h: Math.floor((sec % 86400) / 3600), m: Math.floor((sec % 3600) / 60), s: sec % 60 };
}

export default function Preventivo() {
  const [active, setActive] = useState(pianoIniziale);
  const [tab, setTab] = useState("include");
  const [showContactModal, setShowContactModal] = useState(false);
  const [openCond, setOpenCond] = useState(null);
  const [scelti, setScelti] = useState(() => Object.fromEntries(plans.map((p) => [p.id, true])));
  const [resto, setResto] = useState(null);
  const [pronto, setPronto] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const lastY = useRef(0);

  // Conto alla rovescia
  useEffect(() => {
    const aggiorna = () => { setResto(tempoRimasto(date.scadenza)); setPronto(true); };
    aggiorna();
    const t = setInterval(aggiorna, 1000);
    return () => clearInterval(t);
  }, []);

  // Pulsante "torna su": compare quando si risale, sparisce quando si scende
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y < 400) setShowTop(false);
      else if (y < lastY.current - 4) setShowTop(true);
      else if (y > lastY.current + 4) setShowTop(false);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scaduto = pronto && resto === null;
  const giorni = resto ? resto.g : null;
  const plan = plans.find((p) => p.id === active);
  const altro = plans.find((p) => p.id !== active);
  const secondo = plans[1];
  const nVoci = (p) => p.sections.reduce((n, s) => n + s.items.length, 0);
  const whatsappUrl = `https://wa.me/${contatto.whatsapp}?text=${encodeURIComponent(contatto.messaggio)}`;

  const serviziScelti = plans.filter((p) => scelti[p.id]);
  const testoAccetto = `Ciao ${contatto.nome}, accetto il preventivo per ${cliente.nome} con: ` +
    serviziScelti.map((p) => p.periodo === "/mese"
      ? `${p.name} (€ ${p.prezzo} + IVA al mese, contratto di ${p.durata})`
      : `${p.name} (€ ${p.prezzo} + IVA, più € ${investimento.trasferte.prezzo} + IVA di trasferte)`).join(" e ") +
    ". Mi mandi il documento da firmare?";
  const accettaUrl = `https://wa.me/${contatto.whatsapp}?text=${encodeURIComponent(testoAccetto)}`;
  const scadutoUrl = `https://wa.me/${contatto.whatsapp}?text=${encodeURIComponent(`Ciao ${contatto.nome}, il preventivo per ${cliente.nome} è scaduto: me lo puoi aggiornare?`)}`;

  const testoScadenza = !pronto
    ? `Valido fino al ${formatData(date.scadenza)}`
    : scaduto
      ? "Preventivo scaduto"
      : giorni === 0
        ? "Scade oggi"
        : `Scade tra ${giorni} ${giorni === 1 ? "giorno" : "giorni"}`;

  const tabs = [
    { id: "include", label: "Cosa include" },
    { id: "not", label: "Non incluso e note" },
  ];

  const sectionLabel = { fontSize: "calc(12px * var(--fs))", color: "#767676", padding: "10px 0 6px", textTransform: "uppercase", letterSpacing: 1, fontFamily: SANS, fontWeight: 600 };

  return (
    <div style={{ fontFamily: "'Georgia', serif", background: "#FAFAF8", minHeight: "100vh", padding: "0" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        :root { --fs: 1; }
        @media (max-width: 500px) { :root { --fs: 1.15; } }
        body { font-family: 'DM Sans', sans-serif; }
        .serif { font-family: 'DM Serif Display', serif; }
        .wrap { max-width: 720px; margin: 0 auto; }
        .check-item { display: flex; gap: 10px; align-items: flex-start; padding: 10px 0; border-bottom: 1px solid rgba(0,0,0,0.06); }
        .check-item:last-child { border-bottom: none; }
        .plan-btn { border: none; cursor: pointer; transition: all .2s; font-family: 'DM Sans', sans-serif; }
        .plan-btn:hover { transform: translateY(-1px); }
        .tab-btn { border: none; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all .15s; }
        .not-inc { display: flex; gap: 8px; align-items: flex-start; padding: 7px 0; font-size: calc(13px * var(--fs)); color: #6b6b6b; line-height: 1.5; }
        .tool-tag { display: inline-block; padding: 3px 9px; border-radius: 20px; font-size: calc(11px * var(--fs)); background: rgba(0,0,0,0.06); color: #444; margin: 2px; font-family: 'DM Sans', sans-serif; }
        s { text-decoration-color: #E53E3E; text-decoration-thickness: 2px; }
        .price-line { display: block; line-height: 1.25; }
        .sec-head { display: flex; align-items: center; gap: 8px; padding: 14px 0 4px; font-size: calc(12px * var(--fs)); font-weight: 700; letter-spacing: 1px; text-transform: uppercase; font-family: 'DM Sans', sans-serif; }
        .cond-btn { width: 100%; background: none; border: none; cursor: pointer; display: flex; justify-content: space-between; align-items: center; gap: 10px; padding: 11px 0; text-align: left; font-family: 'DM Sans', sans-serif; }
        .step { flex: 1; min-width: 0; }
        .inv-row { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.08); }
        .chk { display: flex; gap: 10px; align-items: flex-start; padding: 10px 12px; border-radius: 10px; cursor: pointer; font-family: 'DM Sans', sans-serif; }
        .chk input { width: 18px; height: 18px; margin-top: 2px; flex-shrink: 0; cursor: pointer; }
        .manina { position: absolute; top: -38px; left: 50%; z-index: 5; font-size: calc(28px * var(--fs)); line-height: 1; pointer-events: none; animation: manina 1.1s ease-in-out infinite; filter: drop-shadow(0 3px 4px rgba(0,0,0,0.18)); }
        @keyframes manina { 0%, 100% { transform: translate(-50%, 0); } 50% { transform: translate(-50%, 6px); } }
        .torna-su { position: fixed; left: 16px; bottom: 18px; z-index: 60; width: 46px; height: 46px; border-radius: 999px; border: none; cursor: pointer; background: #1C1C1C; color: #fff; font-size: calc(20px * var(--fs)); display: flex; align-items: center; justify-content: center; box-shadow: 0 10px 24px rgba(0,0,0,0.22); transition: opacity .45s cubic-bezier(.22,1,.36,1), transform .45s cubic-bezier(.22,1,.36,1); }
        @media (prefers-reduced-motion: reduce) { .manina { animation: none; } .torna-su { transition: none; } }
        @media (max-width: 500px) {
          h1 { font-size: calc(26px * var(--fs)) !important; }
          .plan-btn { padding: 12px 8px !important; }
          .tab-btn { font-size: calc(11.5px * var(--fs)) !important; padding: 7px 5px !important; }
          .check-item { gap: 8px; padding: 8px 0; }
          .price-line { font-size: calc(11px * var(--fs)); }
          .steps { flex-direction: column; }
          .plan-foot { flex-direction: column; align-items: flex-start !important; gap: 12px !important; }
          .plan-foot-tools { text-align: left !important; }
          .plan-foot-tools .tool-tag:first-child { margin-left: 0; }
        }
      `}</style>

      {/* HEADER */}
      <div style={{ background: "#1C1C1C", padding: "28px 24px 24px", textAlign: "center" }}>
        <div style={{ fontSize: "calc(12px * var(--fs))", color: "#a6a6a6", letterSpacing: 2, textTransform: "uppercase", marginBottom: 8, fontFamily: SANS }}>Proposta di servizio 2026</div>
        <h1 className="serif" style={{ fontSize: "calc(30px * var(--fs))", color: "#fff", fontWeight: 400, marginBottom: 4 }}>
          {cliente.emoji} {cliente.nome}
        </h1>
        <div style={{ fontSize: "calc(13px * var(--fs))", color: "#8f8f8f", fontFamily: SANS, marginBottom: 10 }}>
          {cliente.titolare} · {cliente.indirizzo}
        </div>
        <p style={{ fontSize: "calc(14px * var(--fs))", color: "#a6a6a6", fontFamily: SANS, maxWidth: 440, margin: "0 auto", lineHeight: 1.5 }}>
          {cliente.intro}
        </p>
        <div style={{ marginTop: 14, display: "inline-flex", gap: 8, alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
          <span style={{ fontSize: "calc(12px * var(--fs))", color: "#b0b0b0", fontFamily: SANS }}>Emesso il {formatData(date.emissione)}</span>
          <span style={{ fontSize: "calc(12px * var(--fs))", fontWeight: 700, fontFamily: SANS, color: scaduto ? "#fff" : "#1C1C1C", background: scaduto ? "#C0392B" : "#F5E97A", borderRadius: 999, padding: "4px 10px" }}>
            ⏳ {testoScadenza}
          </span>
        </div>
      </div>

      <div className="wrap">
        {/* COUNTDOWN SCADENZA */}
        <div style={{ padding: "20px 20px 0" }}>
          <div style={{ background: "#FDF1EC", border: "1px dashed #D85A30", borderRadius: 12, padding: "12px 14px" }}>
            {scaduto ? (
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <span style={{ fontSize: "calc(20px * var(--fs))" }}>⌛</span>
                <span style={{ flex: 1, fontSize: "calc(13.5px * var(--fs))", color: "#444", lineHeight: 1.5, fontFamily: SANS }}>
                  <b style={{ color: "#D85A30" }}>Il preventivo è scaduto</b> il {formatData(date.scadenza)}. Scrivici per riceverne uno aggiornato.
                </span>
              </div>
            ) : (
              <>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <span style={{ fontSize: "calc(20px * var(--fs))", flexShrink: 0 }}>⏳</span>
                  <span style={{ flex: 1, fontSize: "calc(13.5px * var(--fs))", color: "#444", lineHeight: 1.5, fontFamily: SANS }}>
                    <b style={{ color: "#D85A30" }}>Il preventivo scade il {formatData(date.scadenza)}.</b> I prezzi riservati valgono solo se accetti entro questa data.
                  </span>
                </div>
                <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                  {[
                    ["giorni", resto?.g],
                    ["ore", resto?.h],
                    ["minuti", resto?.m],
                    ["secondi", resto?.s],
                  ].map(([lab, v]) => (
                    <div key={lab} style={{ flex: 1, background: "#fff", border: "1px solid #F5C4B3", borderRadius: 10, padding: "8px 4px", textAlign: "center" }}>
                      <div className="serif" style={{ fontSize: "calc(24px * var(--fs))", color: "#D85A30", lineHeight: 1.1 }}>{v === undefined ? "--" : String(v).padStart(2, "0")}</div>
                      <div style={{ fontSize: "calc(10.5px * var(--fs))", color: "#767676", textTransform: "uppercase", letterSpacing: 1, fontFamily: SANS, marginTop: 2 }}>{lab}</div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* INTRO E STEP */}
        <div style={{ padding: "14px 20px 0" }}>
          <div style={{ background: "#fff", border: "1px solid #E8E8E4", borderRadius: 14, padding: "16px 16px 14px" }}>
            <div className="serif" style={{ fontSize: "calc(20px * var(--fs))", color: "#1C1C1C", lineHeight: 1.3, marginBottom: 8 }}>{intro.titolo}</div>
            <p style={{ fontSize: "calc(13.5px * var(--fs))", color: "#505050", lineHeight: 1.7, fontFamily: SANS }}>{intro.testo}</p>
            <div className="steps" style={{ display: "flex", gap: 10, marginTop: 14 }}>
              {intro.step.map((s) => (
                <div key={s.n} className="step" style={{ display: "flex", gap: 10, alignItems: "flex-start", background: "#F5F4EF", borderRadius: 10, padding: "10px 12px" }}>
                  <span className="serif" style={{ fontSize: "calc(22px * var(--fs))", color: "#4F7398", lineHeight: 1 }}>{s.n}</span>
                  <div>
                    <div style={{ fontSize: "calc(13px * var(--fs))", fontWeight: 700, color: "#1C1C1C", fontFamily: SANS }}>{s.titolo}</div>
                    <div style={{ fontSize: "calc(12.5px * var(--fs))", color: "#6b6b6b", fontFamily: SANS, lineHeight: 1.5, marginTop: 2 }}>{s.testo}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SELECTOR SERVIZI */}
        <div style={{ padding: "44px 20px 0", display: "flex", gap: 10 }}>
          {plans.map((p) => (
            <div key={p.id} style={{ flex: 1, position: "relative", display: "flex" }}>
              {p.id === secondo.id && active !== secondo.id && <span className="manina" aria-hidden="true">👇</span>}
              <button
                className="plan-btn"
                onClick={() => setActive(p.id)}
                style={{
                  flex: 1,
                  padding: "14px 10px",
                  borderRadius: 12,
                  background: active === p.id ? p.color : "#fff",
                  border: `2px solid ${active === p.id ? p.color : "#E8E8E4"}`,
                  color: active === p.id ? "#fff" : "#555",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "calc(11px * var(--fs))", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", opacity: active === p.id ? 1 : 0.6, marginBottom: 4 }}>
                  {p.numero}
                </div>
                <div style={{ fontSize: "calc(17px * var(--fs))", fontWeight: 600, fontFamily: SERIF }}>{p.name}</div>
                <div style={{ fontSize: "calc(12px * var(--fs))", marginTop: 2, opacity: 0.85 }}>
                  <span className="price-line"><s>€{p.prezzoPieno}</s> €{p.prezzo}{p.periodo === "/mese" ? "/mese" : ""} + IVA</span>
                  <span className="price-line">{p.periodo === "/mese" ? `contratto di ${p.durata}` : p.periodo}</span>
                </div>
              </button>
            </div>
          ))}
        </div>

        {/* RISPARMIO */}
        <div style={{ padding: "12px 20px 0" }}>
          <button
            className="plan-btn"
            onClick={() => setActive(altro.id)}
            style={{ width: "100%", textAlign: "left", background: "#FFFBEA", border: "1px dashed #D9B500", borderRadius: 12, padding: "12px 14px", display: "flex", gap: 10, alignItems: "center" }}
          >
            <span style={{ fontSize: "calc(20px * var(--fs))", flexShrink: 0 }}>🎁</span>
            <span style={{ flex: 1, fontSize: "calc(13px * var(--fs))", color: "#6B5500", lineHeight: 1.5, fontFamily: SANS }}>
              Prezzo riservato a te: con entrambi i servizi <b>risparmi € {investimento.risparmio}</b> nei primi 6 mesi.
            </span>
            <span style={{ fontSize: "calc(13px * var(--fs))", fontWeight: 700, color: altro.color, whiteSpace: "nowrap", fontFamily: SANS }}>Vedi {altro.name} →</span>
          </button>
        </div>

        {/* MAIN CONTENT */}
        <div style={{ padding: "16px 20px 32px" }}>

          {/* PLAN HEADER */}
          <div style={{ background: plan.bg, border: `1px solid ${plan.border}`, borderRadius: 14, padding: "18px 18px 14px", marginBottom: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10, marginBottom: 8 }}>
              <div>
                <div style={{ fontSize: "calc(11px * var(--fs))", color: plan.color, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", fontFamily: SANS }}>{plan.numero}</div>
                <span className="serif" style={{ fontSize: "calc(24px * var(--fs))", color: plan.color, fontWeight: 400 }}>{plan.name}</span>
                <div style={{ fontSize: "calc(14px * var(--fs))", color: "#505050", marginTop: 2, fontFamily: SANS }}>{plan.tagline}</div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{ fontSize: "calc(13px * var(--fs))", color: "#767676", fontFamily: SANS }}><s>€{plan.prezzoPieno}</s></div>
                <div className="serif" style={{ fontSize: "calc(26px * var(--fs))", color: plan.color, whiteSpace: "nowrap" }}>
                  €{plan.prezzo}{plan.periodo === "/mese" && <span style={{ fontSize: "calc(13px * var(--fs))", color: "#767676", fontFamily: "sans-serif" }}>/mese</span>}
                </div>
                <div style={{ fontSize: "calc(12px * var(--fs))", color: "#767676", fontFamily: SANS }}>+ IVA</div>
              </div>
            </div>
            <p style={{ fontSize: "calc(13.5px * var(--fs))", color: "#444", lineHeight: 1.72, fontFamily: SANS }}>{plan.summary}</p>
            <div className="plan-foot" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, marginTop: 12, paddingTop: 12, borderTop: `1px solid ${plan.border}` }}>
              <div style={{ fontFamily: SANS, flexShrink: 0 }}>
                <span style={{ fontSize: "calc(12px * var(--fs))", color: "#767676" }}>{plan.periodo === "/mese" ? "Durata del contratto" : "Pagamento"}</span>
                <div className="serif" style={{ fontSize: "calc(20px * var(--fs))", color: plan.color }}>
                  {plan.durata}
                </div>
                <div style={{ fontSize: "calc(11.5px * var(--fs))", color: "#767676", maxWidth: 170, lineHeight: 1.4 }}>{plan.extra}</div>
              </div>
              <div className="plan-foot-tools" style={{ fontFamily: SANS, textAlign: "right" }}>
                <div style={{ fontSize: "calc(12px * var(--fs))", color: "#767676" }}>{nVoci(plan)} servizi inclusi</div>
                <div style={{ marginTop: 4 }}>
                  {plan.tools.slice(0, 3).map((t) => (
                    <span key={t} className="tool-tag">{t}</span>
                  ))}
                  {plan.tools.length > 3 && <span className="tool-tag">+{plan.tools.length - 3}</span>}
                </div>
              </div>
            </div>
          </div>

          {/* TAB SELECTOR */}
          <div style={{ display: "flex", gap: 6, marginBottom: 14, background: "#EEEEE9", borderRadius: 10, padding: 4 }}>
            {tabs.map((t) => (
              <button
                key={t.id}
                className="tab-btn"
                onClick={() => setTab(t.id)}
                style={{
                  flex: 1,
                  padding: "8px 6px",
                  borderRadius: 7,
                  fontSize: "calc(12.5px * var(--fs))",
                  fontWeight: tab === t.id ? 600 : 400,
                  background: tab === t.id ? "#fff" : "transparent",
                  color: tab === t.id ? "#1C1C1C" : "#888",
                  boxShadow: tab === t.id ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
                }}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* TAB: COSA INCLUDE */}
          {tab === "include" && (
            <div style={{ background: "#fff", borderRadius: 12, padding: "4px 16px 8px", border: "1px solid #E8E8E4" }}>
              <div style={sectionLabel}>{plan.periodo === "/mese" ? "Incluso nel canone · ogni mese" : "Incluso nel servizio · pagato una volta"}</div>
              <div style={{ margin: "4px 0 8px", padding: "14px 14px", background: "#1C1C1C", borderRadius: 10, display: "flex", gap: 12, alignItems: "flex-start" }}>
                <span style={{ fontSize: "calc(26px * var(--fs))", flexShrink: 0, marginTop: 2 }}>{plan.profilo.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 8, alignItems: "center", marginBottom: 6, flexWrap: "wrap" }}>
                    <div style={{ fontSize: "calc(13px * var(--fs))", color: "#fff", fontWeight: 700, fontFamily: SANS }}>Cosa prevede il servizio?</div>
                    <span style={{ fontSize: "calc(11px * var(--fs))", color: "#fff", background: plan.color, borderRadius: 999, padding: "4px 9px", fontFamily: SANS, whiteSpace: "nowrap", fontWeight: 700 }}>{plan.profilo.badge}</span>
                  </div>
                  <div style={{ fontSize: "calc(13.5px * var(--fs))", color: "#E8E2C8", fontWeight: 700, fontFamily: SERIF, marginBottom: 8, fontStyle: "italic", lineHeight: 1.4 }}>{plan.profilo.headline}</div>
                  <p style={{ fontSize: "calc(12.5px * var(--fs))", color: "#cfcfcf", lineHeight: 1.65, fontFamily: SANS, margin: 0 }}>{plan.profilo.body}</p>
                </div>
              </div>
              <div style={{ margin: "4px 0 8px", padding: "12px 12px", background: plan.bg, border: `1px solid ${plan.border}`, borderRadius: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 8, alignItems: "center" }}>
                  <div style={{ fontSize: "calc(13px * var(--fs))", color: plan.color, fontWeight: 700, fontFamily: SANS }}>{plan.supporto.title}</div>
                  <span style={{ fontSize: "calc(11px * var(--fs))", color: "#fff", background: plan.color, borderRadius: 999, padding: "4px 8px", fontFamily: SANS, whiteSpace: "nowrap" }}>{plan.supporto.badge}</span>
                </div>
                <div style={{ marginTop: 8 }}>
                  {plan.supporto.points.map((point, i) => (
                    <div key={i} style={{ display: "flex", gap: 8, marginBottom: i === plan.supporto.points.length - 1 ? 0 : 6 }}>
                      <span style={{ color: plan.color, fontSize: "calc(13px * var(--fs))" }}>•</span>
                      <span style={{ fontSize: "calc(12.5px * var(--fs))", color: "#444", lineHeight: 1.55, fontFamily: SANS }}>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {plan.sections.map((sec) => (
                <div key={sec.title}>
                  <div className="sec-head" style={{ color: plan.color }}>
                    <span style={{ fontSize: "calc(16px * var(--fs))" }}>{sec.icon}</span>{sec.title}
                  </div>
                  {sec.items.map((item, i) => (
                    <div key={i} className="check-item">
                      <span style={{ fontSize: "calc(14px * var(--fs))", flexShrink: 0, marginTop: 2, color: plan.color, fontWeight: 700 }}>✓</span>
                      <div>
                        <div style={{ fontSize: "calc(14.5px * var(--fs))", fontWeight: 600, color: "#1C1C1C", fontFamily: SANS }}>{item.label}</div>
                        <div style={{ fontSize: "calc(13px * var(--fs))", color: "#6b6b6b", marginTop: 2, fontFamily: SANS, lineHeight: 1.5 }}>{item.sub}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          {/* TAB: NON INCLUSO E NOTE */}
          {tab === "not" && (
            <div style={{ background: "#fff", borderRadius: 12, padding: "4px 16px 10px", border: "1px solid #E8E8E4" }}>
              <div style={{ ...sectionLabel, fontSize: "calc(11px * var(--fs))" }}>Non incluso</div>
              {nonIncluso.map((item, i) => (
                <div key={i} className="not-inc">
                  <span style={{ color: "#E53E3E", fontSize: "calc(14px * var(--fs))", flexShrink: 0 }}>✕</span>
                  <span style={{ fontFamily: SANS }}>{item}</span>
                </div>
              ))}
              <div style={{ ...sectionLabel, fontSize: "calc(11px * var(--fs))", paddingTop: 14 }}>Note</div>
              {noteFinali.map((n, i) => (
                <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8, alignItems: "flex-start" }}>
                  <span style={{ fontSize: "calc(14px * var(--fs))" }}>{n.icon}</span>
                  <span style={{ fontSize: "calc(13px * var(--fs))", color: "#505050", lineHeight: 1.62, fontFamily: SANS }}>{n.text}</span>
                </div>
              ))}
            </div>
          )}

          {/* IL TUO INVESTIMENTO */}
          <div style={{ marginTop: 14, padding: "14px 16px 16px", background: "#1C1C1C", borderRadius: 12 }}>
            <div style={{ fontSize: "calc(12px * var(--fs))", color: "#a6a6a6", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4, fontFamily: SANS, fontWeight: 600 }}>
              Il tuo investimento
            </div>
            {plans.map((p) => (
              <div key={p.id} className="inv-row">
                <div style={{ fontFamily: SANS }}>
                  <div style={{ fontSize: "calc(14px * var(--fs))", color: "#fff", fontWeight: 600 }}>{p.name}</div>
                  <div style={{ fontSize: "calc(12px * var(--fs))", color: "#a6a6a6", marginTop: 2, lineHeight: 1.45 }}>{p.periodo === "/mese" ? `Contratto di ${p.durata} · addebito automatico mensile · nessun rinnovo automatico` : "Pagamento unico · 50% alla firma, saldo alla messa online"}</div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0, fontFamily: SANS }}>
                  <div style={{ fontSize: "calc(12px * var(--fs))", color: "#9a9a9a" }}><s>€ {p.prezzoPieno}</s></div>
                  <div className="serif" style={{ fontSize: "calc(20px * var(--fs))", color: p.id === "avvio" ? "#A9C27E" : "#9DBBD9", whiteSpace: "nowrap" }}>
                    € {p.prezzo}{p.periodo === "/mese" && <span style={{ fontSize: "calc(12px * var(--fs))", fontFamily: SANS }}>/mese</span>}
                  </div>
                  <div style={{ fontSize: "calc(11px * var(--fs))", color: "#9a9a9a" }}>+ IVA</div>
                </div>
              </div>
            ))}
            <div className="inv-row" style={{ borderBottom: "none" }}>
              <div style={{ fontFamily: SANS }}>
                <div style={{ fontSize: "calc(13.5px * var(--fs))", color: "#ddd", fontWeight: 600 }}>{investimento.trasferte.label}</div>
                <div style={{ fontSize: "calc(12px * var(--fs))", color: "#a6a6a6", marginTop: 2, lineHeight: 1.45 }}>{investimento.trasferte.testo}</div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0, fontFamily: SANS }}>
                <div className="serif" style={{ fontSize: "calc(18px * var(--fs))", color: "#ddd", whiteSpace: "nowrap" }}>€ {investimento.trasferte.prezzo}</div>
                <div style={{ fontSize: "calc(11px * var(--fs))", color: "#9a9a9a" }}>+ IVA</div>
              </div>
            </div>
            <div style={{ marginTop: 4, padding: "12px 14px", background: "rgba(245,233,122,0.12)", border: "1px solid rgba(245,233,122,0.35)", borderRadius: 10, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: "calc(13px * var(--fs))", color: "#F5E97A", fontFamily: SANS, fontWeight: 600 }}>Risparmio complessivo nei primi 6 mesi</span>
              <span className="serif" style={{ fontSize: "calc(22px * var(--fs))", color: "#F5E97A", whiteSpace: "nowrap" }}>€ {investimento.risparmio}</span>
            </div>
          </div>

          {/* SCONTO RISERVATO */}
          <div style={{ marginTop: 14, padding: "14px 14px", background: "#FFFBEA", border: "1px solid #F5E97A", borderRadius: 12, display: "flex", gap: 12, alignItems: "flex-start" }}>
            <span style={{ fontSize: "calc(26px * var(--fs))", flexShrink: 0, marginTop: 2 }}>⭐</span>
            <div>
              <div style={{ fontSize: "calc(13px * var(--fs))", fontWeight: 700, color: "#92700A", fontFamily: SANS, marginBottom: 6 }}>Sconto riservato a te</div>
              <p style={{ fontSize: "calc(12.5px * var(--fs))", color: "#6B5500", lineHeight: 1.68, fontFamily: SANS, margin: 0 }}>{investimento.sconto}</p>
            </div>
          </div>

          {/* CONDIZIONI CONTRATTUALI */}
          <div style={{ marginTop: 14, background: "#fff", border: "1px solid #E8E8E4", borderRadius: 12, padding: "6px 16px" }}>
            <div style={{ ...sectionLabel, paddingTop: 10 }}>Condizioni contrattuali</div>
            <p style={{ fontSize: "calc(12.5px * var(--fs))", color: "#6b6b6b", lineHeight: 1.6, fontFamily: SANS, paddingBottom: 6 }}>{condizioniIntro}</p>
            {condizioni.map((c, i) => (
              <div key={i} style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                <button className="cond-btn" onClick={() => setOpenCond(openCond === i ? null : i)}>
                  <span style={{ fontSize: "calc(13.5px * var(--fs))", fontWeight: 600, color: "#1C1C1C" }}>{i + 1}. {c.titolo}</span>
                  <span style={{ fontSize: "calc(13px * var(--fs))", color: "#767676", flexShrink: 0 }}>{openCond === i ? "▾" : "▸"}</span>
                </button>
                {openCond === i && (
                  <div style={{ paddingBottom: 12 }}>
                    {c.testo.map((par, j) => (
                      <p key={j} style={{ fontSize: "calc(13px * var(--fs))", color: "#505050", lineHeight: 1.65, fontFamily: SANS, marginTop: j ? 6 : 0 }}>{par}</p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* ACCETTAZIONE */}
          <div style={{ marginTop: 14, background: "#fff", border: "1px solid #E8E8E4", borderRadius: 12, padding: "14px 16px 16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
              <div className="serif" style={{ fontSize: "calc(20px * var(--fs))", color: "#1C1C1C" }}>{accettazione.titolo}</div>
              <span style={{ fontSize: "calc(11.5px * var(--fs))", fontWeight: 700, fontFamily: SANS, color: scaduto ? "#fff" : "#6B5500", background: scaduto ? "#C0392B" : "#FFF6C2", borderRadius: 999, padding: "4px 10px", whiteSpace: "nowrap" }}>
                ⏳ {testoScadenza}
              </span>
            </div>
            <p style={{ fontSize: "calc(13px * var(--fs))", color: "#505050", lineHeight: 1.6, fontFamily: SANS, marginTop: 6 }}>
              Validità del preventivo: 7 giorni dalla data di emissione (fino al {formatData(date.scadenza)}). {accettazione.testo}
            </p>

            {scaduto ? (
              <a href={scadutoUrl} target="_blank" rel="noreferrer" style={{ marginTop: 12, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 46, borderRadius: 12, background: "#1C1C1C", color: "#fff", textDecoration: "none", fontSize: "calc(14px * var(--fs))", fontWeight: 700, fontFamily: SANS }}>
                Il preventivo è scaduto · chiedi un aggiornamento
              </a>
            ) : (
              <>
                <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
                  {plans.map((p) => (
                    <label key={p.id} className="chk" style={{ background: scelti[p.id] ? p.bg : "#F7F7F4", border: `1px solid ${scelti[p.id] ? p.border : "#E8E8E4"}` }}>
                      <input type="checkbox" checked={!!scelti[p.id]} onChange={() => setScelti((s) => ({ ...s, [p.id]: !s[p.id] }))} style={{ accentColor: p.color }} />
                      <span style={{ fontSize: "calc(13px * var(--fs))", color: "#333", lineHeight: 1.5 }}>
                        <b style={{ color: p.color }}>{p.name}</b>
                        {" · "}
                        {p.periodo === "/mese"
                          ? `€ ${p.prezzo} + IVA al mese, contratto di ${p.durata}`
                          : `€ ${p.prezzo} + IVA, più € ${investimento.trasferte.prezzo} + IVA di rimborso trasferte`}
                      </span>
                    </label>
                  ))}
                </div>
                <a
                  href={serviziScelti.length ? accettaUrl : undefined}
                  target="_blank"
                  rel="noreferrer"
                  aria-disabled={!serviziScelti.length}
                  style={{ marginTop: 12, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 46, borderRadius: 12, background: serviziScelti.length ? "#25D366" : "#CFCFCA", color: "#fff", textDecoration: "none", fontSize: "calc(14.5px * var(--fs))", fontWeight: 700, fontFamily: SANS, pointerEvents: serviziScelti.length ? "auto" : "none" }}
                >
                  ✅ Accetto il preventivo su WhatsApp
                </a>
              </>
            )}
            <p style={{ fontSize: "calc(11.5px * var(--fs))", color: "#8c8c8c", lineHeight: 1.55, fontFamily: SANS, marginTop: 10 }}>{accettazione.clausole}</p>
          </div>

          {/* FOOTER */}
          <footer style={{ marginTop: 16, marginBottom: 84, background: "#fff", border: "1px solid #E8E8E4", borderRadius: 12, padding: "16px 16px", textAlign: "center" }}>
            <div style={{ fontSize: "calc(12px * var(--fs))", color: "#767676", textTransform: "uppercase", letterSpacing: 1, fontFamily: SANS, fontWeight: 600 }}>
              Grazie per aver scelto {fornitore.nome}
            </div>
            <p style={{ marginTop: 8, fontSize: "calc(13px * var(--fs))", color: "#505050", fontFamily: SANS, lineHeight: 1.65 }}>
              {accettazione.grazie}
            </p>
            <div className="serif" style={{ marginTop: 8, fontSize: "calc(15px * var(--fs))", color: "#1C1C1C", fontStyle: "italic" }}>{accettazione.firma}</div>
            <div style={{ marginTop: 12, paddingTop: 10, borderTop: "1px solid #EEE", fontSize: "calc(11.5px * var(--fs))", color: "#767676", fontFamily: SANS, lineHeight: 1.6 }}>
              {fornitore.ragioneSociale} · {fornitore.indirizzo} · P. IVA {fornitore.piva}<br />
              {fornitore.sito} · {fornitore.email} · {fornitore.telefono}
            </div>
          </footer>

        </div>
      </div>

      {/* TORNA SU (a sinistra) */}
      <button
        className="torna-su"
        aria-label="Torna su"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        style={{
          opacity: showTop ? 1 : 0,
          transform: showTop ? "translateY(0) scale(1)" : "translateY(14px) scale(0.9)",
          pointerEvents: showTop ? "auto" : "none",
        }}
      >
        ↑
      </button>

      {/* FLOATING WHATSAPP */}
      <div style={{ position: "fixed", right: 16, bottom: 18, zIndex: 60, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
        <button
          onClick={() => setShowContactModal(true)}
          style={{
            background: "#25D366",
            color: "#fff",
            border: "none",
            borderRadius: 999,
            padding: "10px 14px",
            cursor: "pointer",
            boxShadow: "0 10px 24px rgba(37,211,102,0.28)",
            fontSize: "calc(13px * var(--fs))",
            fontWeight: 700,
            fontFamily: SANS,
            minHeight: 44,
          }}
        >
          💬 Hai qualche dubbio?
        </button>
      </div>

      {showContactModal && (
        <div
          onClick={() => setShowContactModal(false)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.34)", zIndex: 70, display: "flex", alignItems: "flex-end", justifyContent: "center", padding: 12 }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ width: "100%", maxWidth: 420, background: "#fff", borderRadius: 18, border: "1px solid #ECECEC", padding: "14px 14px 12px", boxShadow: "0 22px 50px rgba(0,0,0,0.16)" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <div style={{ fontSize: "calc(15px * var(--fs))", fontWeight: 700, color: "#1C1C1C", fontFamily: SANS }}>Supporto rapido su WhatsApp</div>
              <button onClick={() => setShowContactModal(false)} style={{ border: "none", background: "transparent", cursor: "pointer", fontSize: "calc(20px * var(--fs))", lineHeight: 1, color: "#767676", minWidth: 36, minHeight: 36 }}>×</button>
            </div>

            <p style={{ margin: 0, fontSize: "calc(13px * var(--fs))", color: "#505050", lineHeight: 1.6, fontFamily: SANS }}>
              Ciao {cliente.titolare.split(" ")[0]}, sono {contatto.nome}! Se hai dubbi o domande sul preventivo, o vuoi sistemare qualcosa per l'apertura, scrivimi pure. Sono a disposizione!
            </p>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              style={{ marginTop: 12, display: "inline-flex", alignItems: "center", justifyContent: "center", width: "100%", minHeight: 44, borderRadius: 12, background: "#25D366", color: "#fff", textDecoration: "none", fontSize: "calc(14px * var(--fs))", fontWeight: 700, fontFamily: SANS }}
            >
              Apri WhatsApp
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
