import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <p className={styles.heroDescription}>
          TypeScript checks types. Behavioral Contracts check behavior.
          <br />
          Catch runtime errors before they hit production.
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/introduction/what-are-behavioral-contracts">
            Get Started
          </Link>
          <Link
            className="button button--outline button--lg"
            to="/docs/getting-started/installation"
            style={{marginLeft: '1rem'}}>
            Quick Install
          </Link>
        </div>
      </div>
    </header>
  );
}

function Feature({title, description, example}: {title: string; description: string; example?: string}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
        {example && (
          <pre style={{textAlign: 'left', fontSize: '11px'}}>
            <code>{example}</code>
          </pre>
        )}
      </div>
    </div>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} - Runtime behavior specifications`}
      description="TypeScript checks types. Behavioral Contracts check behavior. Catch runtime errors before they hit production.">
      <HomepageHeader />
      <main>
        <section className={styles.features}>
          <div className="container">
            <div className="row">
              <Feature
                title="Catches What TypeScript Can't"
                description="TypeScript validates types, but can't catch unhandled API errors, missing rate limit handling, or edge cases."
                example={`// TypeScript: ✅ Types are fine\n// Runtime: 💥 Unhandled error\nconst user = await axios.get('/api/user');`}
              />
              <Feature
                title="Source-Backed Claims"
                description="Every behavioral contract is backed by official documentation URLs. No opinions, only facts."
                example={`postcondition:\n  throws: AxiosError\n  required_handling: "..."\n  source: https://axios-http.com/docs`}
              />
              <Feature
                title="AI-Friendly Output"
                description="Structured JSON output designed to feed directly to Claude or ChatGPT for automated fixes."
                example={`verify-cli --output violations.json\n# Feed to AI agent\n# Get automated fixes`}
              />
            </div>
            <div className="row" style={{marginTop: '2rem'}}>
              <Feature
                title="100+ Package Contracts"
                description="Pre-built contracts for axios, prisma, stripe, openai, and 100+ more popular npm packages."
              />
              <Feature
                title="Open Source & Free"
                description="Fully open source under CC BY-SA 4.0 (corpus) and AGPL-3.0 (CLI). Free for all use. No vendor lock-in, no telemetry."
              />
              <Feature
                title="CI/CD Ready"
                description="Integrate into your build pipeline. Fail builds on critical violations before they reach production."
              />
            </div>
          </div>
        </section>

        <section className={styles.example}>
          <div className="container">
            <Heading as="h2" style={{textAlign: 'center', marginBottom: '2rem'}}>
              See It In Action
            </Heading>
            <div className="row">
              <div className="col col--6">
                <Heading as="h4">❌ Before</Heading>
                <pre style={{fontSize: '12px'}}>
                  <code>{`async function getUser(id: string) {
  // No error handling!
  const response = await axios.get(\`/api/users/\${id}\`);
  return response.data;
}`}</code>
                </pre>
              </div>
              <div className="col col--6">
                <Heading as="h4">✅ After</Heading>
                <pre style={{fontSize: '12px'}}>
                  <code>{`async function getUser(id: string) {
  try {
    const response = await axios.get(\`/api/users/\${id}\`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Handle HTTP errors (4xx, 5xx)
      } else {
        // Handle network errors
      }
    }
    throw error;
  }
}`}</code>
                </pre>
              </div>
            </div>
            <div style={{marginTop: '2rem', padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '6px', border: '1px solid var(--border-primary)'}}>
              <Heading as="h5">CLI Output:</Heading>
              <pre style={{fontSize: '11px', margin: 0}}>
                <code style={{color: '#F85149'}}>{`❌ ERROR: axios.get() called without try-catch
   Location: src/api/users.ts:42:15
   Contract: axios@1.0.0 → get → network-failure postcondition
   Required: Check error.response exists before accessing properties
   Source: https://axios-http.com/docs/handling_errors`}</code>
              </pre>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
