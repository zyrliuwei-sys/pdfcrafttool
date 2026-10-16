import { m } from '@/paraglide/messages.js';
import { FaqSection } from '@/components/faq-section';

export function faqItems() {
  return [
    { q: m['pc.faq.q1'](), a: m['pc.faq.a1']() },
    { q: m['pc.faq.q2'](), a: m['pc.faq.a2']() },
    { q: m['pc.faq.q3'](), a: m['pc.faq.a3']() },
    { q: m['pc.faq.q12'](), a: m['pc.faq.a12']() },
    { q: m['pc.faq.q4'](), a: m['pc.faq.a4']() },
    { q: m['pc.faq.q5'](), a: m['pc.faq.a5']() },
    { q: m['pc.faq.q6'](), a: m['pc.faq.a6']() },
    { q: m['pc.faq.q7'](), a: m['pc.faq.a7']() },
    { q: m['pc.faq.q8'](), a: m['pc.faq.a8']() },
    { q: m['pc.faq.q9'](), a: m['pc.faq.a9']() },
    { q: m['pc.faq.q10'](), a: m['pc.faq.a10']() },
    { q: m['pc.faq.q11'](), a: m['pc.faq.a11']() },
  ];
}

export function FAQ() {
  return <FaqSection title={m['pc.faq.title']()} items={faqItems()} />;
}
