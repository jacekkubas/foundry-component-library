"use client";
import React from "react";
import { useActionState, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./styles.module.scss";

type LeadResult =
  | { success: true }
  | { success: false; errors: Record<string, string> };

const GetInTouch = ({
  submitLead,
  service,
}: {
  service: string;
  submitLead: (
    prevState: LeadResult | null,
    formData: FormData,
  ) => Promise<LeadResult>;
}) => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [state, formAction] = useActionState(submitLead, null);

  console.log("qq", state);

  if (state?.success) {
    router.push("/hubs/thank-you");
    return null;
  }

  const errors = state?.success === false ? state.errors : {};

  const endSubmitting = () => {
    setSubmitting(false);
  };

  return (
    <section id="get-in-touch" className={styles.formSection}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Get in touch</h2>
        <p className={styles.subtitle}>
          Tell us about your brand and discover how we can help.
        </p>
        <form
          action={formAction}
          className={styles.form}
          onSubmit={() => setSubmitting(true)}
          noValidate>
          <div className={styles.honeypot} aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input
              id="website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <input type="hidden" name="service" value={service} />

          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="firstName">
                First Name *
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                className={`${styles.input} ${errors.firstName ? styles.inputError : ""}`}
                required
                onKeyDown={endSubmitting}
              />
              {errors.firstName && (
                <p className={styles.error}>{errors.firstName}</p>
              )}
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="lastName">
                Last Name *
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                className={`${styles.input} ${errors.lastName ? styles.inputError : ""}`}
                required
                onKeyDown={endSubmitting}
              />
              {errors.lastName && (
                <p className={styles.error}>{errors.lastName}</p>
              )}
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="email">
                Email *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
                required
                onKeyDown={endSubmitting}
              />
              {errors.email && <p className={styles.error}>{errors.email}</p>}
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="phone">
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                className={`${styles.input} ${errors.phone ? styles.inputError : ""}`}
                onKeyDown={endSubmitting}
              />
              {errors.phone && <p className={styles.error}>{errors.phone}</p>}
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="note">
              Note
            </label>
            <textarea id="note" name="note" className={styles.textarea} />
          </div>

          {errors._form && <p className={styles.formError}>{errors._form}</p>}

          <button type="submit" className={styles.submit} disabled={submitting}>
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default GetInTouch;
