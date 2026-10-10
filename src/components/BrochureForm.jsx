import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  IconUser, IconPhone, IconActivity, IconChevron, IconLock,
} from './Icons.jsx';
import { submitLeadAd } from '../utils/submitLead.js';

function validatePhone(v) {
  const digits = (v.match(/\d/g) || []).length;
  return digits >= 8;
}

export default function BrochureForm({ t, onSent }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [activity, setActivity] = useState('');
  const [errors, setErrors] = useState({ name: false, phone: false });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownRect, setDropdownRect] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1024px)');
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    function onClickOutside(e) {
      if (
        dropdownRef.current && !dropdownRef.current.contains(e.target) &&
        buttonRef.current && !buttonRef.current.contains(e.target)
      ) {
        setDropdownOpen(false);
      }
    }
    function updateRect() {
      if (buttonRef.current) {
        const r = buttonRef.current.getBoundingClientRect();
        setDropdownRect({ top: r.bottom + 6, left: r.left, width: r.width });
      }
    }
    if (dropdownOpen && !isMobile) {
      updateRect();
      document.addEventListener('mousedown', onClickOutside);
      window.addEventListener('scroll', updateRect, true);
      window.addEventListener('resize', updateRect);
    }
    return () => {
      document.removeEventListener('mousedown', onClickOutside);
      window.removeEventListener('scroll', updateRect, true);
      window.removeEventListener('resize', updateRect);
    };
  }, [dropdownOpen, isMobile]);

  useEffect(() => {
    if (dropdownOpen && isMobile) {
      document.body.style.overflow = 'hidden';
    } else if (!dropdownOpen) {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [dropdownOpen, isMobile]);

  async function handleSubmit() {
    const next = {
      name: !name.trim(),
      phone: !validatePhone(phone),
    };
    setErrors(next);
    if (next.name || next.phone) return;
    if (submitting) return;

    setSubmitError('');
    setSubmitting(true);
    try {
      await submitLeadAd({
        name: name.trim(),
        phone: phone.trim(),
        activity: activity.trim(),
      });
      
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'Giza Crown Lead Submission');
      }

      // onSent flips App into the thank-you screen
      if (onSent) onSent();
    } catch (err) {
      console.error('Lead submission failed:', err);
      setSubmitError(t.form.errorGeneric);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      className="form-card"
      id="brochure-form"
      dir={t.dir}
      onSubmit={(e) => e.preventDefault()}
      noValidate
    >
      <h2>
        {t.form.title}<br />
        <span className="gold">{t.form.titleGold}</span>
      </h2>
      <p className="hint">{t.form.hint}</p>

      <div className={`field ${errors.name ? 'invalid' : ''}`}>
        <input
          type="text"
          autoComplete="name"
          placeholder={t.form.name}
          value={name}
          onChange={(e) => { setName(e.target.value); if (errors.name) setErrors({ ...errors, name: false }); }}
          required
        />
        <IconUser className="ic" />
        <div className="err">{t.form.nameError}</div>
      </div>

      <div className={`field ${errors.phone ? 'invalid' : ''}`}>
        <input
          type="tel"
          autoComplete="tel"
          placeholder={t.form.phone}
          value={phone}
          onChange={(e) => { setPhone(e.target.value); if (errors.phone) setErrors({ ...errors, phone: false }); }}
          required
          dir="ltr"
        />
        <IconPhone className="ic" />
        <div className="err">{t.form.phoneError}</div>
      </div>

      <div className="field">
        <button
          ref={buttonRef}
          type="button"
          className={`custom-select ${activity ? 'has-value' : ''} ${dropdownOpen ? 'is-open' : ''}`}
          onClick={() => setDropdownOpen((v) => !v)}
          aria-haspopup="listbox"
          aria-expanded={dropdownOpen}
        >
          {activity || t.form.activityPlaceholder}
        </button>
        <IconActivity className="ic" />
        <IconChevron className={`chev ${dropdownOpen ? 'flip' : ''}`} width="14" height="14" />
        {dropdownOpen && isMobile && createPortal(
          <div
            className="select-modal"
            dir={t.dir}
            onClick={() => setDropdownOpen(false)}
          >
            <div
              className="select-modal-panel"
              onClick={(e) => e.stopPropagation()}
              ref={dropdownRef}
            >
              <div className="select-modal-head">
                <span>{t.form.activityPlaceholder}</span>
                <button
                  type="button"
                  className="select-modal-close"
                  onClick={() => setDropdownOpen(false)}
                  aria-label="Close"
                >
                  <span /><span />
                </button>
              </div>
              <ul className="select-modal-list" role="listbox">
                {t.form.activities.map((a) => (
                  <li
                    key={a}
                    role="option"
                    aria-selected={activity === a}
                    className={activity === a ? 'selected' : ''}
                    onClick={() => { setActivity(a); setDropdownOpen(false); }}
                  >
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>,
          document.body
        )}
        {dropdownOpen && !isMobile && dropdownRect && createPortal(
          <ul
            ref={dropdownRef}
            className="custom-options"
            role="listbox"
            dir={t.dir}
            style={{
              top: dropdownRect.top,
              left: dropdownRect.left,
              width: dropdownRect.width,
            }}
          >
            {t.form.activities.map((a) => (
              <li
                key={a}
                role="option"
                aria-selected={activity === a}
                className={activity === a ? 'selected' : ''}
                onClick={() => { setActivity(a); setDropdownOpen(false); }}
              >
                {a}
              </li>
            ))}
          </ul>,
          document.body
        )}
      </div>

      <button
        type="button"
        className="submit-btn"
        dir={t.dir}
        onClick={handleSubmit}
        disabled={submitting}
      >
        {submitting ? t.form.sending : t.form.submit}
      </button>

      {submitError && (
        <div className="form-error" role="alert" style={{ marginTop: 8 }}>
          {submitError}
        </div>
      )}

      <div className="privacy">
        <IconLock width="13" height="13" />
        {t.form.privacy}
      </div>
    </form>
  );
}
