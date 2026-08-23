import { ArrowRight } from "@phosphor-icons/react";
import { useState } from "react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  return (
    <section className="newsletter">
      <div><p className="eyebrow">THE MODEX EDIT</p><h2>New pieces, considered weekly.</h2></div>
      {submitted ? <p className="newsletter-success">Thank you. You’re on the list.</p> : (
        <form onSubmit={(event) => { event.preventDefault(); if (email) setSubmitted(true); }}>
          <label htmlFor="newsletter-email">Email address</label>
          <div><input id="newsletter-email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email address" /><button aria-label="Subscribe"><ArrowRight size={20} /></button></div>
        </form>
      )}
    </section>
  );
}
