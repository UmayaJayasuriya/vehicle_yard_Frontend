import { Link } from "react-router-dom";
import "./About.css";

const FEATURES = [
  { icon: "bi-check-circle", title: "Transparent Pricing", desc: "No hidden charges. All prices clearly displayed with complete vehicle information." },
  { icon: "bi-shield-check", title: "Secure Transactions", desc: "Professional documentation and verification for every sale." },
  { icon: "bi-award",        title: "Quality Assurance",   desc: "Every vehicle inspected to ensure quality and reliability standards." },
  { icon: "bi-headset",      title: "Expert Support",      desc: "Our team is ready to assist with any question or inquiry." },
];

const VALUES = [
  { title: "Integrity",       desc: "We conduct business with complete honesty and transparency." },
  { title: "Customer Focus",  desc: "Your satisfaction is our priority — we listen and deliver." },
  { title: "Excellence",      desc: "We strive for excellence in every aspect of our service." },
  { title: "Innovation",      desc: "We continuously improve our process to serve you better." },
];

const STATS = [
  { val: "500+",  label: "Vehicles Sold" },
  { val: "1,000+",label: "Happy Customers" },
  { val: "5+",    label: "Years Experience" },
  { val: "4",     label: "Locations" },
];

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="ab-hero">
        <div className="page-content ab-hero__inner">
          <span className="section-overline">About Us</span>
          <h1>Sri Lanka's Trusted<br /><span className="gradient-text">Vehicle Marketplace</span></h1>
          <p className="ab-hero__sub">
            Your trusted partner for buying and selling quality vehicles. With years of experience in the automotive industry, we deliver transparent and reliable services across Sri Lanka.
          </p>
          <div className="ab-hero__actions">
            <Link to="/" className="btn-primary-vy"><i className="bi bi-car-front" /> Browse Vehicles</Link>
            <Link to="/contact" className="btn-ghost-vy"><i className="bi bi-envelope" /> Get in Touch</Link>
          </div>
        </div>
      </section>

      <div className="page-content">
        {/* Stats */}
        <div className="ab-stats">
          {STATS.map(s => (
            <div key={s.label} className="ab-stat">
              <div className="ab-stat__val">{s.val}</div>
              <div className="ab-stat__lbl">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Mission & Vision */}
        <div className="ab-section">
          <div className="ab-mv">
            <div className="ab-mv__card">
              <div className="ab-mv__icon-wrap"><i className="bi bi-bullseye" /></div>
              <h3>Our Mission</h3>
              <p>To provide a seamless, transparent, and customer-centric platform for buying and selling vehicles — building long-term relationships through integrity, quality, and exceptional service.</p>
            </div>
            <div className="ab-mv__card">
              <div className="ab-mv__icon-wrap"><i className="bi bi-eye" /></div>
              <h3>Our Vision</h3>
              <p>To become the most trusted vehicle marketplace in Sri Lanka, where buyers and sellers connect with confidence and clarity.</p>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="ab-section">
          <span className="section-overline">Why Choose Us</span>
          <h2 className="ab-section__h">What Sets Us Apart</h2>
          <div className="ab-features">
            {FEATURES.map(f => (
              <div key={f.title} className="ab-feature">
                <div className="ab-feature__icon-wrap"><i className={`bi ${f.icon}`} /></div>
                <h4 className="ab-feature__title">{f.title}</h4>
                <p className="ab-feature__desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Core Values */}
        <div className="ab-section">
          <span className="section-overline">Our Values</span>
          <h2 className="ab-section__h">What We Stand For</h2>
          <div className="ab-values">
            {VALUES.map(v => (
              <div key={v.title} className="ab-value">
                <i className="bi bi-arrow-right ab-value__arrow" />
                <div>
                  <h4 className="ab-value__title">{v.title}</h4>
                  <p className="ab-value__desc">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="ab-cta">
          <h2>Ready to Find Your Vehicle?</h2>
          <p>Browse our collection or contact our team for personalised assistance.</p>
          <div className="ab-cta__btns">
            <Link to="/" className="btn-primary-vy"><i className="bi bi-grid" /> Browse All Vehicles</Link>
            <Link to="/contact" className="btn-ghost-vy"><i className="bi bi-chat" /> Talk to Us</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
