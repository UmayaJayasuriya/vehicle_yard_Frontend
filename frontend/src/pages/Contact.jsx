import { useState } from "react";
import "./Contact.css";

const INFO = [
  { icon: "bi-geo-alt", label: "Address", val: "Vehicle Yard, Sri Lanka" },
  { icon: "bi-telephone", label: "Phone", val: "+94 XX XXX XXXX" },
  { icon: "bi-envelope", label: "Email", val: "info@vehicleyard.com" },
  { icon: "bi-clock", label: "Business Hours", val: "Mon–Fri: 9:00 AM – 6:00 PM\nSat: 10:00 AM – 4:00 PM\nSun: Closed" },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function validate() {
    const e = {};
    if (!form.name.trim() || form.name.trim().length < 3) e.name = "At least 3 characters required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Valid email required";
    if (!/^\d{9,15}$/.test(form.phone.replace(/\D/g, ""))) e.phone = "Valid phone number required";
    if (!form.subject.trim() || form.subject.trim().length < 5) e.subject = "At least 5 characters required";
    if (!form.message.trim() || form.message.trim().length < 10) e.message = "At least 10 characters required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: value }));
    if (errors[name]) setErrors(p => ({ ...p, [name]: "" }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
      setSubmitted(true); setLoading(false);
      setTimeout(() => setSubmitted(false), 5000);
    }, 1200);
  }

  return (
    <div className="page-content">
      <div className="ct-head">
        <span className="section-overline">Get in Touch</span>
        <h1>Contact <span className="gradient-text">Us</span></h1>
        <p className="ct-head__sub">Have a question about a vehicle or need assistance? We're here to help.</p>
      </div>

      <div className="ct-layout">
        {/* Form */}
        <div className="ct-form-wrap">
          {submitted && (
            <div className="ct-success">
              <i className="bi bi-check-circle-fill" />
              <div>
                <strong>Message sent successfully.</strong>
                <p>We'll get back to you as soon as possible.</p>
              </div>
              <button className="ct-success__close" onClick={() => setSubmitted(false)}><i className="bi bi-x" /></button>
            </div>
          )}
          <form onSubmit={handleSubmit} className="ct-form">
            <div className="ct-row">
              <div className="ct-group">
                <label className="ct-label">Full Name</label>
                <input className={`vy-input${errors.name ? " is-error" : ""}`} name="name" value={form.name} onChange={handleChange} placeholder="Your full name" />
                {errors.name && <span className="ct-err">{errors.name}</span>}
              </div>
              <div className="ct-group">
                <label className="ct-label">Email Address</label>
                <input className={`vy-input${errors.email ? " is-error" : ""}`} name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" />
                {errors.email && <span className="ct-err">{errors.email}</span>}
              </div>
            </div>
            <div className="ct-row">
              <div className="ct-group">
                <label className="ct-label">Phone Number</label>
                <input className={`vy-input${errors.phone ? " is-error" : ""}`} name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+94 XX XXX XXXX" />
                {errors.phone && <span className="ct-err">{errors.phone}</span>}
              </div>
              <div className="ct-group">
                <label className="ct-label">Subject</label>
                <input className={`vy-input${errors.subject ? " is-error" : ""}`} name="subject" value={form.subject} onChange={handleChange} placeholder="What is this about?" />
                {errors.subject && <span className="ct-err">{errors.subject}</span>}
              </div>
            </div>
            <div className="ct-group">
              <label className="ct-label">Message</label>
              <textarea className={`vy-input${errors.message ? " is-error" : ""}`} name="message" value={form.message} onChange={handleChange} rows={5} placeholder="Write your message here..." />
              {errors.message && <span className="ct-err">{errors.message}</span>}
            </div>
            <div>
              <button type="submit" className="btn-primary-vy" disabled={loading}>
                {loading ? "Sending..." : <><i className="bi bi-send" /> Send Message</>}
              </button>
            </div>
          </form>
        </div>

        {/* Info */}
        <aside className="ct-info">
          <h3 className="ct-info__heading">Contact Information</h3>
          {INFO.map(c => (
            <div key={c.label} className="ct-info__item">
              <div className="ct-info__icon-wrap"><i className={`bi ${c.icon}`} /></div>
              <div>
                <div className="ct-info__label">{c.label}</div>
                <div className="ct-info__val" style={{ whiteSpace: "pre-line" }}>{c.val}</div>
              </div>
            </div>
          ))}
        </aside>
      </div>
    </div>
  );
}
