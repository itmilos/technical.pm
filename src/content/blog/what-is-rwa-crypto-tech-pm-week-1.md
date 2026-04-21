---
title: "What is RWA Crypto? A Tech PM's First Week in Real World Assets"
description: "RWA (Real World Assets) means tokenizing private credit, treasuries, and real estate on-chain. Here's what I learned in week one — and why it matters for DeFi PMs."
date: "2026-04-24"
author: "Milos Mike Rujevic"
authorBio: "Technical Product Manager transitioning into DeFi — documenting the journey in real time."
authorImage: "/images/authors/itm.jpeg"
tags: ["DeFi", "RWA", "Product Management", "Web3", "Real World Assets", "Tech PM to DeFi PM"]
lastModified: "2026-04-20"
image: "/seo/what-is-rwa-crypto-tech-pm-week-1.png"
---

# What the Hell is RWA? (A Tech PM's First Week)

Real World Assets (RWA) in crypto means taking financial instruments that exist in the physical world — private loans, US treasury bonds, real estate — and representing them as tokens on a blockchain. The goal is to bring $10 trillion in private markets into an infrastructure that settles instantly, operates 24/7, and can be composed with other DeFi protocols.

That's the pitch. Week one was about stress-testing it.

---

## Why private markets are the target

Private markets — private credit, private equity, structured finance — are large, opaque, and operationally manual. Private credit alone is a $1.7 trillion asset class. But unless you're an institutional investor with a minimum check size of $500K, you can't access it. Redemptions take months. Reporting is quarterly PDFs. Settlement is T+2 at best, and often longer for complex instruments.

This is the gap RWA protocols are trying to close.

The pitch to a TradFi allocator: the same asset, but with transparent on-chain NAV, programmable yield distribution, near-instant settlement, and composability with the rest of DeFi liquidity. The pitch to DeFi participants: real yield backed by actual economic activity, not just token emissions.

I came from building financial platforms with settlement precision and audit trail requirements baked in from day one. When I read Centrifuge's architecture docs, the language felt familiar — just implemented on a public ledger instead of a private database.

---

## The three protocols that matter most

**Ondo Finance** is the clearest entry point. Ondo takes US treasury exposure — Blackrock's BUIDL fund is the primary vehicle — and wraps it as USDY or OUSG, two tokens that hold treasury yield on-chain. As a user, you hold an ERC-20 token that accrues yield daily from real treasury bills. The mechanics are: Ondo holds the underlying treasury position off-chain via a bankruptcy-remote SPV, the on-chain token's value is updated by an oracle, and yield is distributed programmatically.

This is the simplest, most battle-tested RWA model. ~$600M TVL as of this writing. The product is tight because the underlying asset is tight — US treasuries don't default.

**Centrifuge** is the complex, interesting one. Centrifuge enables real-world loan pools on-chain. Here's how a pool works: a borrower (say, a fintech lender or invoice financing company) submits their loan portfolio to Centrifuge. That portfolio gets structured into two tranches — senior (lower risk, lower yield) and junior (higher risk, higher yield, absorbs first losses). Those tranches are tokenized. DeFi liquidity providers deposit stablecoins into the pool and earn yield from actual loan repayments.

The technical innovation: each loan is represented as an NFT with its specific terms baked in. The pool's NAV is calculated from those NFT valuations and reported on-chain. $500M+ in originations across real estate, trade finance, and SME credit.

**Maple Finance** targets institutional undercollateralized lending. Borrowers are crypto-native institutions — market makers, trading firms — that can demonstrate creditworthiness without locking up 150% collateral (unlike most DeFi lending). Pool delegates (underwriters) assess each borrower and set terms. Lenders deposit into pools run by delegates they trust. Yield comes from borrower interest payments.

Maple had its worst moment in late 2022 when Orthogonal Trading defaulted on $36M in loans after exposure to FTX. The lesson for a PM: the protocol's architecture held, but the human credit assessment layer failed. That's the product risk in undercollateralized lending — the smart contracts work, the judgment calls are the variable.

---

## What this looks like at the protocol level

I spent time on rwa.xyz tracking TVL across protocols. The overall RWA on-chain market is ~$12B as of April 2026, up from ~$1.5B in early 2023. Tokenized treasuries dominate (~60% of TVL). Private credit is the second category.

The thing that struck me as a PM looking at these protocol UIs: the products are built for institutional participants who already understand the underlying asset. The Centrifuge pool page shows NAV, senior/junior tranche states, pool utilization, redemption queue length. It's correct information, but it assumes you know what a redemption queue is and why it matters.

That UX gap is a product problem, not just a design problem. It points to where these protocols will need to go to access broader capital.

---

## What "permissioned tokens" means and why it's a PM concern

Most RWA tokens aren't permissionless — they can't be. Ondo's OUSG requires KYC. Centrifuge pools require accredited investor status in most jurisdictions. Maple pools require institutional onboarding.

This is implemented via ERC-3643 (also called T-REX), a token standard that embeds transfer restrictions directly in the contract. You can't transfer OUSG to a wallet that hasn't been whitelisted by Ondo's compliance layer. The smart contract enforces it.

From a product perspective, this creates a user funnel that starts with KYC — meaning you have a compliance-gated acquisition flow before anyone touches the protocol. That's a very different product challenge than permissionless DeFi, where the friction is purely technical.

It also means these protocols are building compliance infrastructure, not just financial infrastructure. That's closer to my background than generic DeFi — and it's the specific tension Orca is navigating in on-chain private markets.

---

## What I got wrong on day one

My first assumption was that RWA is primarily about tokenization technology. It's not. The hard problems are off-chain: legal enforceability of on-chain loan agreements, NAV oracle reliability, credit assessment at the borrower level, and regulatory treatment in the jurisdictions where capital pools are formed.

The blockchain part is relatively solved. The trust infrastructure around it is not.

This reframes how I think about the PM role at a protocol like Orca or Centrifuge. You're not primarily shipping contract features — you're designing the system that connects off-chain trust (legal agreements, credit vetting, compliance) with on-chain mechanics. That's a more interesting, harder product problem than I expected.

---

## The one thing a PM needs to understand about RWA

RWA protocols are building the plumbing for a new capital market. The blockchain is the settlement layer. The product is the institutional trust framework — KYC, credit assessment, legal structure, oracle integrity — that makes putting real-world assets on that settlement layer viable.

If you come from regulated financial systems, this is familiar territory in a new context. If you come from permissionless DeFi, it's a different discipline.

Next post: *5 Things That Are Still Broken in On-Chain Private Markets* — the specific limitations I found after a week of studying Centrifuge, Maple, and Ondo. Some of them are technical. Some are product. All of them are interview-relevant.

---

## FAQ

**What is RWA in crypto?**
RWA (Real World Assets) refers to traditional financial instruments — US treasuries, private loans, real estate — that are tokenized and represented on a blockchain. The goal is to bring off-chain asset yields and capital into DeFi infrastructure.

**Which RWA protocols have the most TVL?**
As of April 2026, the leading RWA protocols by TVL are tokenized treasury products (Ondo Finance's USDY/OUSG, Superstate) and on-chain private credit protocols (Centrifuge, Maple Finance). The total on-chain RWA market is approximately $12B.

**How does Centrifuge work?**
Centrifuge lets real-world borrowers (fintechs, invoice financing companies) structure their loan portfolios as on-chain pools. Each loan is represented as an NFT. DeFi liquidity providers deposit stablecoins and earn yield from actual loan repayments, split across senior and junior tranches.

**What is an ERC-3643 token?**
ERC-3643 (T-REX) is a token standard that embeds transfer restrictions directly in the smart contract. It's used by RWA protocols like Ondo Finance to enforce KYC/AML compliance — tokens can only be held or transferred by wallets that have been whitelisted by the protocol's compliance layer.

**Can retail investors access RWA protocols?**
Most RWA protocols currently require KYC and accredited investor status, which limits access to institutional and high-net-worth participants. Ondo Finance's USDY has a lower barrier than some private credit protocols, but regulatory constraints on the underlying assets (private credit, treasury funds) mean full permissionless access is unlikely in the near term.

---

*Are you coming from TradFi and evaluating RWA protocols, or from DeFi and trying to understand the off-chain complexity? I'm curious which side of that gap is harder to cross.*
