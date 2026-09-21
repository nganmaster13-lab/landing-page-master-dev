import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import db from '../data/db.json';
import { Reveal } from './Reveal';

const topics = ['A question about one of our apps', 'Working together', 'Press', 'Something else'];

const fieldClass =
  'w-full bg-transparent border-b border-line py-3 text-base placeholder:text-muted/70 focus:outline-none focus:border-ink transition-colors';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [topic, setTopic] = useState(topics[0]);
  const [senderName, setSenderName] = useState('');
  const [message, setMessage] = useState('');
  const reduceMotion = useReducedMotion();

  const copyEmail = () => {
    navigator.clipboard.writeText(db.company.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `${topic} — ${senderName}`;
    window.location.href = `mailto:${db.company.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(message)}`;
  };

  return (
    <section id="contact" className="py-20 md:py-28 border-t border-line scroll-mt-16">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 grid gap-14 lg:grid-cols-2">
        <Reveal>
          <h2 className="font-serif text-5xl sm:text-6xl tracking-tight">Say hello</h2>
          <p className="text-muted mt-4 max-w-md leading-relaxed">
            Bug report, feature idea, or just want to chat about a project — write to us. We usually
            reply within a day or two.
          </p>

          <div className="mt-10">
            <a
              href={`mailto:${db.company.email}`}
              className="font-serif text-3xl sm:text-4xl break-all underline underline-offset-[6px] decoration-1 decoration-line hover:decoration-accent transition-colors"
            >
              {db.company.email}
            </a>
            <div>
              <motion.button
                type="button"
                onClick={copyEmail}
                whileTap={reduceMotion ? undefined : { scale: 0.97 }}
                className="mt-3 text-sm text-muted hover:text-ink transition-colors"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={copied ? 'copied' : 'copy'}
                    initial={reduceMotion ? false : { opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -5 }}
                    transition={{ duration: reduceMotion ? 0 : 0.18 }}
                    className="inline-block"
                  >
                    {copied ? 'Copied to clipboard' : 'Copy address'}
                  </motion.span>
                </AnimatePresence>
              </motion.button>
            </div>
          </div>

          <p className="mt-10 text-sm text-muted">
            {db.company.location}
            <br />
            {db.company.workingHours}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={handleSubmit} className="space-y-6 lg:pt-3">
            <label className="block">
              <span className="text-sm text-muted">What's it about?</span>
              <select value={topic} onChange={(e) => setTopic(e.target.value)} className={fieldClass}>
                {topics.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </label>

          <label className="block">
            <span className="text-sm text-muted">Your name</span>
            <input
              type="text"
              required
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              className={fieldClass}
            />
          </label>

          <label className="block">
            <span className="text-sm text-muted">Message</span>
            <textarea
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={`${fieldClass} resize-none`}
            />
          </label>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <motion.button
              type="submit"
              whileHover={reduceMotion ? undefined : { y: -2 }}
              whileTap={reduceMotion ? undefined : { scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 420, damping: 28 }}
              className="px-6 py-3 rounded-full bg-ink text-paper hover:bg-accent transition-colors"
            >
              Write the email
            </motion.button>
            <span className="text-sm text-muted">Opens in your mail app.</span>
          </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
};
