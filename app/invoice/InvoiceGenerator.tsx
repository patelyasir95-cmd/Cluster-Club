"use client";

import { useRef, useState } from "react";
import InvoiceDocument, { InvoiceData, LineItem } from "./InvoiceDocument";

const today = new Date().toISOString().split("T")[0];
const thirtyDays = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
  .toISOString()
  .split("T")[0];

const defaultData: InvoiceData = {
  type: "INVOICE",
  invoiceNumber: "INV-001",
  issueDate: today,
  dueDate: thirtyDays,
  logoDataUrl: null,
  currency: "£",
  vatRate: 20,
  from: {
    company: "",
    address: "",
    city: "",
    country: "",
    email: "",
    phone: "",
    vatNumber: "",
  },
  to: {
    company: "",
    address: "",
    city: "",
    country: "",
    email: "",
    vatNumber: "",
  },
  items: [{ id: "1", description: "", quantity: 1, unitPrice: 0 }],
  notes: "",
  paymentTerms: "Payment due within 30 days of invoice date.",
};

function newItem(): LineItem {
  return { id: crypto.randomUUID(), description: "", quantity: 1, unitPrice: 0 };
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-[#2C1A0E] text-[10px] font-bold tracking-[0.2em] uppercase mb-1.5 opacity-60">
      {children}
    </label>
  );
}

function Input({
  value,
  onChange,
  placeholder,
  type = "text",
  className = "",
}: {
  value: string | number;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  className?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full bg-white border border-[#2C1A0E]/10 text-[#2C1A0E] placeholder:text-[#2C1A0E]/25 px-3 py-2 text-sm outline-none focus:border-[#E8771A] transition-colors ${className}`}
    />
  );
}

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#E8771A]">
        {children}
      </span>
      <div className="flex-1 h-px bg-[#2C1A0E]/8" />
    </div>
  );
}

export default function InvoiceGenerator() {
  const [data, setData] = useState<InvoiceData>(defaultData);
  const [isGenerating, setIsGenerating] = useState(false);
  const logoInputRef = useRef<HTMLInputElement>(null);

  const set = (patch: Partial<InvoiceData>) => setData((d) => ({ ...d, ...patch }));
  const setFrom = (patch: Partial<InvoiceData["from"]>) =>
    setData((d) => ({ ...d, from: { ...d.from, ...patch } }));
  const setTo = (patch: Partial<InvoiceData["to"]>) =>
    setData((d) => ({ ...d, to: { ...d.to, ...patch } }));

  const updateItem = (id: string, patch: Partial<LineItem>) =>
    setData((d) => ({
      ...d,
      items: d.items.map((it) => (it.id === id ? { ...it, ...patch } : it)),
    }));

  const addItem = () => setData((d) => ({ ...d, items: [...d.items, newItem()] }));
  const removeItem = (id: string) =>
    setData((d) => ({ ...d, items: d.items.filter((it) => it.id !== id) }));

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => set({ logoDataUrl: ev.target?.result as string });
    reader.readAsDataURL(file);
  };

  const handleDownloadPDF = async () => {
    const element = document.getElementById("invoice-preview");
    if (!element) return;
    setIsGenerating(true);
    try {
      const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
      });

      const imgData = canvas.toDataURL("image/jpeg", 0.95);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const pdf = new (jsPDF as any)({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const ratio = pageW / canvas.width;
      const imgH = canvas.height * ratio;

      if (imgH <= pageH) {
        pdf.addImage(imgData, "JPEG", 0, 0, pageW, imgH);
      } else {
        // Multi-page: slice canvas into page-height chunks
        let yPx = 0;
        const pageHpx = pageH / ratio;
        while (yPx < canvas.height) {
          if (yPx > 0) pdf.addPage();
          pdf.addImage(imgData, "JPEG", 0, -(yPx * ratio), pageW, imgH);
          yPx += pageHpx;
        }
      }

      const filename = `${data.type === "PROFORMA INVOICE" ? "proforma" : "invoice"}-${data.invoiceNumber || "001"}.pdf`;
      pdf.save(filename);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F2E8] flex flex-col">
      {/* Top bar */}
      <div
        id="invoice-editor-topbar"
        className="sticky top-0 z-20 bg-[#2C1A0E] px-6 py-4 flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <span
            className="text-white text-sm font-bold tracking-[0.15em] uppercase"
            style={{ fontFamily: "'Fredoka One', sans-serif" }}
          >
            Invoice Generator
          </span>
          {/* Type toggle */}
          <div className="flex bg-white/10 rounded-sm overflow-hidden">
            {(["INVOICE", "PROFORMA INVOICE"] as const).map((t) => (
              <button
                key={t}
                onClick={() => set({ type: t })}
                className={`px-4 py-2 text-[10px] font-bold tracking-[0.15em] uppercase transition-colors ${
                  data.type === t
                    ? "bg-[#E8771A] text-white"
                    : "text-white/50 hover:text-white/80"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleDownloadPDF}
          disabled={isGenerating}
          className="bg-[#E8771A] text-white text-[11px] font-bold tracking-[0.2em] uppercase px-6 py-2.5 hover:bg-[#d06810] transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isGenerating ? (
            <>
              <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3" />
                <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
              Generating...
            </>
          ) : (
            "Save as PDF"
          )}
        </button>
      </div>

      {/* Body: editor + preview */}
      <div className="flex flex-1 overflow-hidden">
        {/* ── EDITOR ── */}
        <div
          id="invoice-editor"
          className="w-[380px] shrink-0 overflow-y-auto border-r border-[#2C1A0E]/8 bg-[#F5F2E8]"
          style={{ height: "calc(100vh - 57px)" }}
        >
          <div className="p-6 space-y-8">

            {/* Branding */}
            <div>
              <SectionHeader>Branding</SectionHeader>
              <div className="space-y-3">
                {/* Logo upload */}
                <div>
                  <Label>Logo</Label>
                  <div
                    onClick={() => logoInputRef.current?.click()}
                    className="border border-dashed border-[#2C1A0E]/20 bg-white rounded-sm p-4 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-[#E8771A] transition-colors min-h-[80px]"
                  >
                    {data.logoDataUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={data.logoDataUrl}
                        alt="logo"
                        className="max-h-14 max-w-[160px] object-contain"
                      />
                    ) : (
                      <>
                        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" className="opacity-30">
                          <path d="M12 16V8m0 0L9 11m3-3 3 3" stroke="#2C1A0E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <rect x="3" y="3" width="18" height="18" rx="2" stroke="#2C1A0E" strokeWidth="1.5" />
                        </svg>
                        <span className="text-[11px] text-[#2C1A0E]/40 tracking-wider uppercase">
                          Upload Logo
                        </span>
                      </>
                    )}
                  </div>
                  <input
                    ref={logoInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleLogoUpload}
                  />
                  {data.logoDataUrl && (
                    <button
                      onClick={() => set({ logoDataUrl: null })}
                      className="mt-1.5 text-[10px] text-[#2C1A0E]/40 hover:text-[#E8771A] tracking-wider uppercase transition-colors"
                    >
                      Remove logo
                    </button>
                  )}
                </div>

                {/* Currency */}
                <div>
                  <Label>Currency</Label>
                  <div className="flex gap-2">
                    {(["£", "€", "$"] as const).map((c) => (
                      <button
                        key={c}
                        onClick={() => set({ currency: c })}
                        className={`flex-1 py-2 text-sm font-bold border transition-colors ${
                          data.currency === c
                            ? "bg-[#2C1A0E] text-white border-[#2C1A0E]"
                            : "bg-white text-[#2C1A0E]/50 border-[#2C1A0E]/10 hover:border-[#2C1A0E]/30"
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Invoice Details */}
            <div>
              <SectionHeader>Invoice Details</SectionHeader>
              <div className="space-y-3">
                <div>
                  <Label>Invoice Number</Label>
                  <Input
                    value={data.invoiceNumber}
                    onChange={(v) => set({ invoiceNumber: v })}
                    placeholder="INV-001"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Issue Date</Label>
                    <Input
                      type="date"
                      value={data.issueDate}
                      onChange={(v) => set({ issueDate: v })}
                    />
                  </div>
                  <div>
                    <Label>Due Date</Label>
                    <Input
                      type="date"
                      value={data.dueDate}
                      onChange={(v) => set({ dueDate: v })}
                    />
                  </div>
                </div>
                <div>
                  <Label>VAT %</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={data.vatRate}
                      onChange={(v) => set({ vatRate: parseFloat(v) || 0 })}
                      placeholder="20"
                      className="flex-1"
                    />
                    <span className="text-[#2C1A0E]/40 text-sm font-medium">%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* From */}
            <div>
              <SectionHeader>From</SectionHeader>
              <div className="space-y-3">
                <div>
                  <Label>Company Name</Label>
                  <Input value={data.from.company} onChange={(v) => setFrom({ company: v })} placeholder="Your Company Ltd" />
                </div>
                <div>
                  <Label>Address</Label>
                  <Input value={data.from.address} onChange={(v) => setFrom({ address: v })} placeholder="123 Street Name" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>City</Label>
                    <Input value={data.from.city} onChange={(v) => setFrom({ city: v })} placeholder="London" />
                  </div>
                  <div>
                    <Label>Country</Label>
                    <Input value={data.from.country} onChange={(v) => setFrom({ country: v })} placeholder="UK" />
                  </div>
                </div>
                <div>
                  <Label>Email</Label>
                  <Input value={data.from.email} onChange={(v) => setFrom({ email: v })} placeholder="hello@company.com" type="email" />
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input value={data.from.phone} onChange={(v) => setFrom({ phone: v })} placeholder="+44 7700 000000" />
                </div>
                <div>
                  <Label>VAT Number</Label>
                  <Input value={data.from.vatNumber} onChange={(v) => setFrom({ vatNumber: v })} placeholder="GB 123 4567 89" />
                </div>
              </div>
            </div>

            {/* Bill To */}
            <div>
              <SectionHeader>Bill To</SectionHeader>
              <div className="space-y-3">
                <div>
                  <Label>Company Name</Label>
                  <Input value={data.to.company} onChange={(v) => setTo({ company: v })} placeholder="Client Company Ltd" />
                </div>
                <div>
                  <Label>Address</Label>
                  <Input value={data.to.address} onChange={(v) => setTo({ address: v })} placeholder="456 Client Street" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>City</Label>
                    <Input value={data.to.city} onChange={(v) => setTo({ city: v })} placeholder="Manchester" />
                  </div>
                  <div>
                    <Label>Country</Label>
                    <Input value={data.to.country} onChange={(v) => setTo({ country: v })} placeholder="UK" />
                  </div>
                </div>
                <div>
                  <Label>Email</Label>
                  <Input value={data.to.email} onChange={(v) => setTo({ email: v })} placeholder="accounts@client.com" type="email" />
                </div>
                <div>
                  <Label>VAT Number</Label>
                  <Input value={data.to.vatNumber} onChange={(v) => setTo({ vatNumber: v })} placeholder="GB 987 6543 21" />
                </div>
              </div>
            </div>

            {/* Line Items */}
            <div>
              <SectionHeader>Line Items</SectionHeader>
              <div className="space-y-2">
                {/* Header row */}
                <div className="grid gap-2 text-[9px] font-bold tracking-[0.2em] uppercase text-[#2C1A0E]/40 px-1" style={{ gridTemplateColumns: "1fr 52px 80px 28px" }}>
                  <span>Description</span>
                  <span className="text-center">Qty</span>
                  <span className="text-right">Unit Price</span>
                  <span />
                </div>

                {data.items.map((item) => (
                  <div
                    key={item.id}
                    className="grid gap-2 items-center"
                    style={{ gridTemplateColumns: "1fr 52px 80px 28px" }}
                  >
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => updateItem(item.id, { description: e.target.value })}
                      placeholder="Item description"
                      className="bg-white border border-[#2C1A0E]/10 text-[#2C1A0E] placeholder:text-[#2C1A0E]/25 px-3 py-2 text-xs outline-none focus:border-[#E8771A] transition-colors w-full"
                    />
                    <input
                      type="number"
                      value={item.quantity}
                      min={1}
                      onChange={(e) => updateItem(item.id, { quantity: parseInt(e.target.value) || 1 })}
                      className="bg-white border border-[#2C1A0E]/10 text-[#2C1A0E] px-2 py-2 text-xs outline-none focus:border-[#E8771A] transition-colors text-center w-full"
                    />
                    <input
                      type="number"
                      value={item.unitPrice}
                      min={0}
                      step={0.01}
                      onChange={(e) => updateItem(item.id, { unitPrice: parseFloat(e.target.value) || 0 })}
                      className="bg-white border border-[#2C1A0E]/10 text-[#2C1A0E] px-2 py-2 text-xs outline-none focus:border-[#E8771A] transition-colors text-right w-full"
                    />
                    <button
                      onClick={() => removeItem(item.id)}
                      disabled={data.items.length === 1}
                      className="flex items-center justify-center text-[#2C1A0E]/25 hover:text-[#E8771A] transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
                    >
                      <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
                        <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </button>
                  </div>
                ))}

                <button
                  onClick={addItem}
                  className="mt-2 w-full border border-dashed border-[#2C1A0E]/15 text-[#2C1A0E]/40 hover:border-[#E8771A] hover:text-[#E8771A] text-[10px] font-bold tracking-[0.2em] uppercase py-2.5 transition-colors"
                >
                  + Add Item
                </button>
              </div>
            </div>

            {/* Notes & Terms */}
            <div>
              <SectionHeader>Notes & Terms</SectionHeader>
              <div className="space-y-3">
                <div>
                  <Label>Notes</Label>
                  <textarea
                    value={data.notes}
                    onChange={(e) => set({ notes: e.target.value })}
                    placeholder="Any additional notes..."
                    rows={3}
                    className="w-full bg-white border border-[#2C1A0E]/10 text-[#2C1A0E] placeholder:text-[#2C1A0E]/25 px-3 py-2 text-sm outline-none focus:border-[#E8771A] transition-colors resize-none"
                  />
                </div>
                <div>
                  <Label>Payment Terms</Label>
                  <textarea
                    value={data.paymentTerms}
                    onChange={(e) => set({ paymentTerms: e.target.value })}
                    placeholder="Payment due within 30 days..."
                    rows={3}
                    className="w-full bg-white border border-[#2C1A0E]/10 text-[#2C1A0E] placeholder:text-[#2C1A0E]/25 px-3 py-2 text-sm outline-none focus:border-[#E8771A] transition-colors resize-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── PREVIEW ── */}
        <div className="flex-1 overflow-y-auto bg-[#E8E5DC] p-8" style={{ height: "calc(100vh - 57px)" }}>
          <div className="max-w-[794px] mx-auto shadow-2xl shadow-black/20">
            <InvoiceDocument data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}
