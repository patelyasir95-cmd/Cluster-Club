import React from "react";

export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface InvoiceData {
  type: "INVOICE" | "PROFORMA INVOICE";
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  logoDataUrl: string | null;
  currency: "£" | "€" | "$";
  vatRate: number;
  from: {
    company: string;
    address: string;
    city: string;
    country: string;
    email: string;
    phone: string;
    vatNumber: string;
  };
  to: {
    company: string;
    address: string;
    city: string;
    country: string;
    email: string;
    vatNumber: string;
  };
  items: LineItem[];
  notes: string;
  paymentTerms: string;
}

export default function InvoiceDocument({ data }: { data: InvoiceData }) {
  const subtotal = data.items.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  );
  const vatAmount = subtotal * (data.vatRate / 100);
  const total = subtotal + vatAmount;

  const fmt = (n: number) =>
    `${data.currency}${n.toLocaleString("en-GB", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  const isProforma = data.type === "PROFORMA INVOICE";

  return (
    <div
      id="invoice-preview"
      style={{
        fontFamily: "'Inter', sans-serif",
        background: "#ffffff",
        color: "#2C1A0E",
        width: "100%",
        minHeight: "297mm",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Proforma watermark */}
      {isProforma && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%) rotate(-35deg)",
            fontSize: "9rem",
            fontWeight: 900,
            letterSpacing: "0.2em",
            color: "#E8771A",
            opacity: 0.05,
            pointerEvents: "none",
            userSelect: "none",
            whiteSpace: "nowrap",
            zIndex: 0,
          }}
        >
          PROFORMA
        </div>
      )}

      {/* Content layer */}
      <div style={{ position: "relative", zIndex: 1, padding: "48px 56px" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "32px" }}>
          {/* Logo / company name */}
          <div>
            {data.logoDataUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={data.logoDataUrl}
                alt="Company logo"
                style={{ maxHeight: "72px", maxWidth: "200px", objectFit: "contain" }}
              />
            ) : data.from.company ? (
              <div
                style={{
                  fontFamily: "'Fredoka One', sans-serif",
                  fontSize: "2rem",
                  color: "#2C1A0E",
                  fontWeight: 400,
                }}
              >
                {data.from.company}
              </div>
            ) : (
              <div
                style={{
                  width: "160px",
                  height: "56px",
                  background: "#F5F2E8",
                  borderRadius: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#2C1A0E",
                  opacity: 0.3,
                  fontSize: "0.7rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                }}
              >
                YOUR LOGO
              </div>
            )}
          </div>

          {/* Invoice meta */}
          <div style={{ textAlign: "right" }}>
            <div
              style={{
                display: "inline-block",
                background: "#2C1A0E",
                color: "#ffffff",
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                padding: "5px 14px",
                marginBottom: "16px",
              }}
            >
              {data.type}
            </div>
            <div style={{ fontSize: "0.75rem", color: "#2C1A0E", opacity: 0.5, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "6px" }}>
              Invoice No.
            </div>
            <div style={{ fontSize: "1.4rem", fontWeight: 700, color: "#2C1A0E", marginBottom: "16px", letterSpacing: "0.02em" }}>
              {data.invoiceNumber || "—"}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "auto auto", gap: "4px 16px", justifyContent: "end" }}>
              <span style={{ fontSize: "0.68rem", color: "#2C1A0E", opacity: 0.45, letterSpacing: "0.1em", textTransform: "uppercase", textAlign: "right" }}>Issue Date</span>
              <span style={{ fontSize: "0.75rem", fontWeight: 500, color: "#2C1A0E" }}>{data.issueDate || "—"}</span>
              <span style={{ fontSize: "0.68rem", color: "#2C1A0E", opacity: 0.45, letterSpacing: "0.1em", textTransform: "uppercase", textAlign: "right" }}>Due Date</span>
              <span style={{ fontSize: "0.75rem", fontWeight: 500, color: "#2C1A0E" }}>{data.dueDate || "—"}</span>
            </div>
          </div>
        </div>

        {/* Orange rule */}
        <div style={{ height: "2px", background: "#E8771A", marginBottom: "36px" }} />

        {/* From / Bill To */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", marginBottom: "44px" }}>
          {/* From */}
          <div>
            <div style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#E8771A", marginBottom: "12px" }}>
              From
            </div>
            <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "#2C1A0E", marginBottom: "6px" }}>
              {data.from.company || <span style={{ opacity: 0.3 }}>Company Name</span>}
            </div>
            {[data.from.address, data.from.city, data.from.country].filter(Boolean).map((line, i) => (
              <div key={i} style={{ fontSize: "0.78rem", color: "#2C1A0E", opacity: 0.65, lineHeight: 1.7 }}>{line}</div>
            ))}
            {data.from.email && (
              <div style={{ fontSize: "0.78rem", color: "#2C1A0E", opacity: 0.65, marginTop: "8px" }}>{data.from.email}</div>
            )}
            {data.from.phone && (
              <div style={{ fontSize: "0.78rem", color: "#2C1A0E", opacity: 0.65 }}>{data.from.phone}</div>
            )}
            {data.from.vatNumber && (
              <div style={{ fontSize: "0.72rem", color: "#2C1A0E", opacity: 0.45, marginTop: "8px" }}>
                VAT No. {data.from.vatNumber}
              </div>
            )}
          </div>

          {/* Bill To */}
          <div>
            <div style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#E8771A", marginBottom: "12px" }}>
              Bill To
            </div>
            <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "#2C1A0E", marginBottom: "6px" }}>
              {data.to.company || <span style={{ opacity: 0.3 }}>Client Name</span>}
            </div>
            {[data.to.address, data.to.city, data.to.country].filter(Boolean).map((line, i) => (
              <div key={i} style={{ fontSize: "0.78rem", color: "#2C1A0E", opacity: 0.65, lineHeight: 1.7 }}>{line}</div>
            ))}
            {data.to.email && (
              <div style={{ fontSize: "0.78rem", color: "#2C1A0E", opacity: 0.65, marginTop: "8px" }}>{data.to.email}</div>
            )}
            {data.to.vatNumber && (
              <div style={{ fontSize: "0.72rem", color: "#2C1A0E", opacity: 0.45, marginTop: "8px" }}>
                VAT No. {data.to.vatNumber}
              </div>
            )}
          </div>
        </div>

        {/* Line items table */}
        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "32px" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #2C1A0E" }}>
              <th style={{ textAlign: "left", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#2C1A0E", opacity: 0.5, paddingBottom: "10px", paddingRight: "16px" }}>
                Description
              </th>
              <th style={{ textAlign: "center", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#2C1A0E", opacity: 0.5, paddingBottom: "10px", width: "70px" }}>
                Qty
              </th>
              <th style={{ textAlign: "right", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#2C1A0E", opacity: 0.5, paddingBottom: "10px", width: "110px", paddingLeft: "16px" }}>
                Unit Price
              </th>
              <th style={{ textAlign: "right", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#2C1A0E", opacity: 0.5, paddingBottom: "10px", width: "110px", paddingLeft: "16px" }}>
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item, i) => (
              <tr
                key={item.id}
                style={{ background: i % 2 === 0 ? "#ffffff" : "#faf9f6", borderBottom: "1px solid rgba(44,26,14,0.07)" }}
              >
                <td style={{ padding: "13px 16px 13px 0", fontSize: "0.82rem", color: "#2C1A0E" }}>
                  {item.description || <span style={{ opacity: 0.3 }}>Item description</span>}
                </td>
                <td style={{ padding: "13px 0", fontSize: "0.82rem", color: "#2C1A0E", textAlign: "center" }}>
                  {item.quantity}
                </td>
                <td style={{ padding: "13px 0 13px 16px", fontSize: "0.82rem", color: "#2C1A0E", textAlign: "right" }}>
                  {fmt(item.unitPrice)}
                </td>
                <td style={{ padding: "13px 0 13px 16px", fontSize: "0.82rem", fontWeight: 600, color: "#2C1A0E", textAlign: "right" }}>
                  {fmt(item.quantity * item.unitPrice)}
                </td>
              </tr>
            ))}
            {data.items.length === 0 && (
              <tr>
                <td colSpan={4} style={{ padding: "20px 0", fontSize: "0.8rem", color: "#2C1A0E", opacity: 0.3, textAlign: "center" }}>
                  No items added
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Totals */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "48px" }}>
          <div style={{ width: "280px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid rgba(44,26,14,0.1)" }}>
              <span style={{ fontSize: "0.75rem", color: "#2C1A0E", opacity: 0.55, letterSpacing: "0.05em" }}>Subtotal</span>
              <span style={{ fontSize: "0.82rem", fontWeight: 500, color: "#2C1A0E" }}>{fmt(subtotal)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid rgba(44,26,14,0.1)" }}>
              <span style={{ fontSize: "0.75rem", color: "#2C1A0E", opacity: 0.55, letterSpacing: "0.05em" }}>VAT ({data.vatRate}%)</span>
              <span style={{ fontSize: "0.82rem", fontWeight: 500, color: "#2C1A0E" }}>{fmt(vatAmount)}</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "14px 16px",
                background: "#2C1A0E",
                marginTop: "4px",
              }}
            >
              <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#ffffff" }}>Total</span>
              <span style={{ fontSize: "1.1rem", fontWeight: 700, color: "#E8771A" }}>{fmt(total)}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        {(data.notes || data.paymentTerms) && (
          <div
            style={{
              borderTop: "1px solid rgba(44,26,14,0.12)",
              paddingTop: "28px",
              display: "grid",
              gridTemplateColumns: data.notes && data.paymentTerms ? "1fr 1fr" : "1fr",
              gap: "40px",
            }}
          >
            {data.notes && (
              <div>
                <div style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#E8771A", marginBottom: "8px" }}>
                  Notes
                </div>
                <div style={{ fontSize: "0.75rem", color: "#2C1A0E", opacity: 0.6, lineHeight: 1.8, whiteSpace: "pre-wrap" }}>
                  {data.notes}
                </div>
              </div>
            )}
            {data.paymentTerms && (
              <div>
                <div style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#E8771A", marginBottom: "8px" }}>
                  Payment Terms
                </div>
                <div style={{ fontSize: "0.75rem", color: "#2C1A0E", opacity: 0.6, lineHeight: 1.8, whiteSpace: "pre-wrap" }}>
                  {data.paymentTerms}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Bottom brand strip */}
        <div style={{ marginTop: "48px", height: "3px", background: "linear-gradient(90deg, #E8771A 0%, #2C1A0E 100%)" }} />
      </div>
    </div>
  );
}
