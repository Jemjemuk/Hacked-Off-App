import React, { useState, useRef, useEffect } from 'react';

// ============ STYLES - DARK THEME ============
const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(180deg, #0a0808 0%, #1a0a0a 50%, #0a0808 100%)',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    color: '#e8e0d5'
  },
  inner: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '0 16px 160px 16px'
  },
  
  // Header with image
  headerImage: {
    width: '100%',
    maxHeight: '200px',
    objectFit: 'cover',
    borderRadius: '0 0 12px 12px',
    marginBottom: '24px',
    opacity: 0.9
  },
  header: {
    marginBottom: '32px',
    textAlign: 'center',
    paddingBottom: '24px',
    borderBottom: '1px solid rgba(139, 0, 0, 0.3)'
  },
  logo: {
    fontSize: '32px',
    fontWeight: '800',
    color: '#d4a954',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    textShadow: '0 0 30px rgba(139, 0, 0, 0.5)'
  },
  tagline: {
    fontSize: '14px',
    color: '#d4a954',
    marginTop: '8px',
    letterSpacing: '0.02em',
    fontWeight: '500'
  },
  
  // Intro section
  introBox: {
    background: 'rgba(20, 12, 12, 0.8)',
    border: '1px solid rgba(139, 0, 0, 0.3)',
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '24px',
    fontSize: '14px',
    lineHeight: '1.8',
    color: '#c9c2b8'
  },
  introText: {
    marginBottom: '16px',
    color: '#d4cfc5'
  },
  introHighlight: {
    color: '#e84545',
    fontWeight: '600'
  },
  introEvidence: {
    marginBottom: '16px'
  },
  evidenceItem: {
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: '10px',
    paddingLeft: '8px'
  },
  evidenceBullet: {
    color: '#e84545',
    marginRight: '10px',
    fontWeight: '700'
  },
  evidenceText: {
    color: '#a89880'
  },
  introPrompt: {
    marginTop: '20px',
    paddingTop: '16px',
    borderTop: '1px solid rgba(139, 0, 0, 0.2)',
    color: '#d4cfc5',
    fontWeight: '500'
  },
  
  message: {
    marginBottom: '20px'
  },
  messageApp: {
    fontSize: '15px',
    lineHeight: '1.7',
    color: '#d4cfc5'
  },
  messageUser: {
    fontSize: '15px',
    color: '#a89880',
    background: 'rgba(139, 0, 0, 0.15)',
    border: '1px solid rgba(139, 0, 0, 0.3)',
    padding: '12px 16px',
    borderRadius: '8px',
    display: 'inline-block',
    maxWidth: '85%'
  },
  
  section: {
    marginBottom: '24px',
    marginTop: '24px'
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '12px'
  },
  sectionNumber: {
    width: '28px',
    height: '28px',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: '700',
    marginRight: '12px'
  },
  sectionTitle: {
    fontSize: '11px',
    fontWeight: '700',
    letterSpacing: '0.12em',
    textTransform: 'uppercase'
  },
  sectionContent: {
    background: 'rgba(20, 12, 12, 0.8)',
    border: '1px solid rgba(139, 0, 0, 0.25)',
    borderRadius: '8px',
    padding: '16px 18px',
    fontSize: '14px',
    lineHeight: '1.7'
  },
  sectionItem: {
    marginBottom: '14px',
    paddingBottom: '14px',
    borderBottom: '1px solid rgba(139, 0, 0, 0.15)',
    color: '#c9c2b8'
  },
  sectionItemLast: {
    marginBottom: '0',
    paddingBottom: '0',
    borderBottom: 'none',
    color: '#c9c2b8'
  },
  
  // Section colors
  vulnNum: { background: 'rgba(139, 0, 0, 0.4)', color: '#d4a954', border: '1px solid rgba(212, 169, 84, 0.3)' },
  vulnTitle: { color: '#d4a954' },
  vulnBorder: { borderColor: 'rgba(212, 169, 84, 0.3)' },
  
  ripNum: { background: 'rgba(180, 30, 30, 0.4)', color: '#e84545', border: '1px solid rgba(232, 69, 69, 0.3)' },
  ripTitle: { color: '#e84545' },
  ripBorder: { borderColor: 'rgba(232, 69, 69, 0.3)' },
  
  stingNum: { background: 'rgba(160, 80, 20, 0.4)', color: '#e89845', border: '1px solid rgba(232, 152, 69, 0.3)' },
  stingTitle: { color: '#e89845' },
  stingBorder: { borderColor: 'rgba(232, 152, 69, 0.3)' },
  
  hitNum: { background: 'rgba(40, 100, 60, 0.4)', color: '#45e88a', border: '1px solid rgba(69, 232, 138, 0.3)' },
  hitTitle: { color: '#45e88a' },
  hitBorder: { borderColor: 'rgba(69, 232, 138, 0.3)' },
  
  // Free tip highlight
  freeTip: {
    background: 'rgba(40, 100, 60, 0.15)',
    border: '1px solid rgba(69, 232, 138, 0.4)',
    borderRadius: '8px',
    padding: '16px 18px',
    fontSize: '14px',
    lineHeight: '1.7',
    color: '#c9c2b8'
  },
  
  // Psychology deep dive (paid)
  psychBox: {
    background: 'rgba(139, 0, 0, 0.15)',
    border: '1px solid rgba(212, 169, 84, 0.3)',
    borderRadius: '8px',
    padding: '16px 18px',
    marginTop: '12px',
    fontSize: '14px',
    lineHeight: '1.7'
  },
  psychTitle: {
    color: '#d4a954',
    fontWeight: '600',
    marginBottom: '8px',
    fontSize: '12px',
    letterSpacing: '0.05em',
    textTransform: 'uppercase'
  },
  psychText: {
    color: '#a89880'
  },
  
  // Action item (paid)
  actionBox: {
    background: 'rgba(40, 100, 60, 0.2)',
    border: '1px solid rgba(69, 232, 138, 0.5)',
    borderRadius: '8px',
    padding: '14px 16px',
    marginTop: '10px',
    fontSize: '13px',
    lineHeight: '1.6'
  },
  actionLabel: {
    color: '#45e88a',
    fontWeight: '700',
    fontSize: '11px',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    marginBottom: '6px'
  },
  actionText: {
    color: '#d4cfc5'
  },
  
  // Paywall card
  paywallCard: {
    background: 'linear-gradient(135deg, rgba(139, 0, 0, 0.3) 0%, rgba(80, 40, 20, 0.3) 100%)',
    border: '1px solid rgba(212, 169, 84, 0.4)',
    borderRadius: '12px',
    padding: '24px 20px',
    marginTop: '16px',
    textAlign: 'center'
  },
  paywallText: {
    fontSize: '14px',
    color: '#a89880',
    marginBottom: '12px',
    lineHeight: '1.6'
  },
  paywallSubtext: {
    fontSize: '13px',
    color: '#d4a954',
    marginBottom: '20px',
    fontWeight: '500'
  },
  paywallHighlight: {
    color: '#d4a954',
    fontWeight: '600'
  },
  buttonRow: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: '12px'
  },
  unlockButtonSingle: {
    background: 'rgba(40, 40, 40, 0.8)',
    border: '1px solid rgba(212, 169, 84, 0.4)',
    borderRadius: '8px',
    padding: '12px 20px',
    fontSize: '14px',
    fontWeight: '600',
    color: '#a89880',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  unlockButtonAll: {
    background: 'linear-gradient(135deg, #8b0000 0%, #a01010 100%)',
    border: '1px solid rgba(212, 169, 84, 0.5)',
    borderRadius: '8px',
    padding: '12px 24px',
    fontSize: '14px',
    fontWeight: '600',
    color: '#d4a954',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  paywallPrice: {
    fontSize: '11px',
    color: '#666',
    marginTop: '8px'
  },
  
  // Unlocked state
  unlockedBadge: {
    display: 'inline-block',
    background: 'rgba(69, 232, 138, 0.2)',
    border: '1px solid rgba(69, 232, 138, 0.4)',
    borderRadius: '4px',
    padding: '4px 10px',
    fontSize: '11px',
    fontWeight: '600',
    color: '#45e88a',
    letterSpacing: '0.05em',
    marginLeft: '12px'
  },
  
  inputArea: {
    position: 'fixed',
    bottom: '0',
    left: '0',
    right: '0',
    background: 'linear-gradient(transparent, #0a0808 30%)',
    padding: '30px 16px 20px 16px'
  },
  inputInner: {
    maxWidth: '600px',
    margin: '0 auto',
    display: 'flex',
    gap: '10px'
  },
  textarea: {
    flex: 1,
    padding: '14px 18px',
    fontSize: '15px',
    background: 'rgba(20, 12, 12, 0.9)',
    border: '1px solid rgba(139, 0, 0, 0.4)',
    borderRadius: '8px',
    resize: 'none',
    minHeight: '50px',
    maxHeight: '120px',
    outline: 'none',
    fontFamily: 'inherit',
    color: '#e8e0d5'
  },
  sendButton: {
    padding: '14px 22px',
    fontSize: '16px',
    fontWeight: '600',
    background: 'linear-gradient(135deg, #8b0000 0%, #a01010 100%)',
    color: '#d4a954',
    border: '1px solid rgba(212, 169, 84, 0.3)',
    borderRadius: '8px',
    cursor: 'pointer'
  },
  
  domainPills: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginTop: '16px'
  },
  domainPill: {
    padding: '8px 14px',
    fontSize: '13px',
    background: 'rgba(139, 0, 0, 0.2)',
    border: '1px solid rgba(139, 0, 0, 0.4)',
    borderRadius: '6px',
    cursor: 'pointer',
    color: '#a89880',
    transition: 'all 0.2s'
  },
  
  thinking: {
    color: '#8b0000',
    fontSize: '14px',
    padding: '8px 0',
    letterSpacing: '0.1em'
  },
  
  followUp: {
    marginTop: '24px',
    paddingTop: '20px',
    borderTop: '1px solid rgba(139, 0, 0, 0.2)',
    fontSize: '15px',
    lineHeight: '1.6',
    color: '#a89880'
  },

  // Footer
  footer: {
    marginTop: '40px',
    paddingTop: '20px',
    paddingBottom: '100px',
    borderTop: '1px solid rgba(139, 0, 0, 0.2)',
    textAlign: 'center',
    fontSize: '12px',
    color: '#555'
  },
  footerLink: {
    color: '#8b4040',
    textDecoration: 'none',
    margin: '0 8px'
  }
};

// ============ INTELLIGENCE DATABASE ============

const intel = {
  
  streaming: {
    name: "streaming & subscriptions",
    triggers: ['disney', 'netflix', 'prime', 'streaming', 'subscription', 'subscribe', 'spotify', 'youtube premium', 'now tv', 'apple tv', 'hulu', 'hbo', 'paramount'],
    
    theyKnow: [
      "Once you've started watching something, cancelling feels like losing it — even though you never owned anything",
      "You'll intend to cancel the free trial but probably won't — most people don't",
      "Comparing £8/month to £12/month feels like a bargain, not comparing £8 to £0"
    ],
    
    theyUseIt: [
      "Free trial captures your card and starts the loss aversion — cancelling now feels like giving something up",
      "Cancellation is buried in menus with 'are you sure' guilt screens and discount offers",
      "Content released weekly keeps you subscribed month after month"
    ],
    
    theTrap: [
      "You pay for months you barely use because cancelling feels like effort and loss",
      "Multiple subscriptions accumulate until you're paying £50+/month without noticing"
    ],
    
    firstTip: "Gift card from supermarket — activate when needed, stops when empty, nothing to cancel, no card stored.",
    
    psychology: "This exploits 'loss aversion' — a principle discovered by Kahneman and Tversky showing that losing something hurts twice as much as gaining it feels good. The free trial isn't generosity; it's creating something for you to lose. Once you've watched two episodes, cancelling feels like abandoning them. Your brain literally processes it as a loss, triggering the same neural pathways as losing money.",
    
    moreTips: [
      {
        tip: "Cancel immediately after signing up — you keep access till the period ends but won't auto-renew",
        action: "Open the app right now, go to Settings → Subscription → Cancel. You'll still have access until your current period ends."
      },
      {
        tip: "Bank statement audit every 3 months — find and kill subscriptions you forgot about",
        action: "Set a calendar reminder for the 1st of every quarter. Download your statement, search for recurring payments under £20 — these are the ones that hide."
      },
      {
        tip: "Never annual, always monthly — annual is them locking your money against your future indifference",
        action: "If any service offers 'save 20% with annual' — decline. That 20% is insurance against you leaving when you lose interest."
      },
      {
        tip: "Share family plans legitimately — one subscription across multiple users beats per-person pricing",
        action: "Check which services allow family sharing (Spotify, Netflix, YouTube). Split the cost with family or housemates — £15 ÷ 4 = £3.75 each."
      }
    ],
    tipCount: 4
  },
  
  gym: {
    name: "gym memberships",
    triggers: ['gym', 'fitness', 'puregym', 'david lloyd', 'virgin active', 'the gym', 'nuffield', 'membership', 'fitness first'],
    
    theyKnow: [
      "January enthusiasm fades by March — but your direct debit doesn't",
      "You'll feel guilty about not going, and that guilt keeps you paying rather than cancelling",
      "Cancelling feels like 'giving up on yourself' — they've tied the payment to your identity"
    ],
    
    theyUseIt: [
      "Low joining fee locks you in — the real money is in 12 months of direct debits from people who stop going",
      "Cancellation requires notice periods, specific windows, sometimes in-person visits — friction by design",
      "'No contract' still has 30-day notice — that's a month of payment for nothing"
    ],
    
    theTrap: [
      "Average gym member goes 4 times in the first month, twice in the second, then pays for 10 months of nothing",
      "The business model depends on non-attendance — you're subsidising people who actually go"
    ],
    
    firstTip: "Pay-as-you-go or day passes until you've proven 3 months of consistent attendance.",
    
    psychology: "This exploits 'identity-based decision making' — you're not just buying gym access, you're buying the identity of 'someone who goes to the gym'. Cancelling doesn't feel like ending a service; it feels like admitting you're not that person. They've made the payment about who you are, not what you use. The guilt of not going is actually more profitable than your attendance.",
    
    moreTips: [
      {
        tip: "If monthly: cancel on day 1 of any month you attend fewer than 8 times",
        action: "Put a note in your phone calendar for the 1st of each month: 'Gym check — did I go 8+ times?' If no, cancel that day."
      },
      {
        tip: "Calculate your per-visit cost — if it's over £10/visit, you're overpaying",
        action: "Check your last 3 months: (monthly fee × 3) ÷ (total visits) = cost per visit. Over £10? You'd be cheaper paying drop-in rates."
      },
      {
        tip: "Negotiate — especially in Feb/Mar when they're desperate to keep January joiners",
        action: "Call in late February and say: 'I'm thinking of cancelling — what can you offer?' They have retention budgets and will discount."
      },
      {
        tip: "Free alternatives exist and work just as well for most goals",
        action: "YouTube: 'HIIT workout no equipment', 'strength training at home'. Park pull-up bars. Running is free. The gym is a convenience, not a necessity."
      }
    ],
    tipCount: 4
  },
  
  car: {
    name: "buying a car",
    triggers: ['car', 'vehicle', 'dealer', 'buy a car', 'second hand', 'used car', 'motor', 'test drive', 'showroom', 'autotrader', 'carwow', 'dealership'],
    
    theyKnow: [
      "If you seem uncertain, you'll defer to whoever acts confident — even if they're not on your side",
      "You'll focus on monthly payments and ignore total cost — £250/month feels manageable, £15,000 feels huge",
      "Urgency makes you stupid — 'someone else is coming to see it later' stops you thinking"
    ],
    
    theyUseIt: [
      "The salesperson never hesitates — they're performing certainty so you stop questioning",
      "Finance focuses on monthly payments while hiding APR, total cost, and balloon payments",
      "Part-exchange lowballing — they offer below market on your car while appearing to discount theirs"
    ],
    
    theTrap: [
      "You pay thousands more than necessary because you didn't want to seem difficult or walk away",
      "You take dealer finance at 9% when your bank would give you 5%"
    ],
    
    firstTip: "Say: 'I don't make decisions on the day.' This single phrase breaks urgency tactics cold.",
    
    psychology: "This exploits 'authority bias' and 'social proof' — your brain is wired to defer to confident people in unfamiliar situations. The salesperson's certainty isn't knowledge, it's a performance. The 'manager approval' theatre triggers reciprocity — they 'fought for you' so you feel obligated. The urgency ('someone else is interested') triggers scarcity bias, which literally reduces activity in your prefrontal cortex — the part that thinks rationally.",
    
    moreTips: [
      {
        tip: "Get your car valued independently before you go in — WeBuyAnyCar sets a floor",
        action: "Go to webuyanycar.com right now and get a valuation. This is your minimum — if the dealer offers less, you have proof they're lowballing."
      },
      {
        tip: "Always ask for total amount payable, not monthly — then compare to bank loan rate",
        action: "Say: 'What's the total I'll pay including all interest and fees?' Compare to a bank loan at moneysupermarket.com/loans. Dealers typically charge 3-4% more."
      },
      {
        tip: "Check MOT history before you go — see what's failed before and what's coming",
        action: "Go to gov.uk/check-mot-history. Enter the reg. Look for patterns — repeated advisories become failures. This is your negotiation ammunition."
      },
      {
        tip: "Never pay by bank transfer — debit card only gives you Section 75 protection",
        action: "If they push bank transfer, say no. Debit card means you can dispute with your bank if the car has hidden faults. Transfer = no protection."
      },
      {
        tip: "Local garage that does servicing is safer than distant dealer",
        action: "Find a local garage with good Google reviews that also sells cars. They have a reputation to protect and premises you can return to."
      }
    ],
    tipCount: 5
  },
  
  telecoms: {
    name: "mobile phones & contracts",
    triggers: ['phone', 'mobile', 'contract', 'upgrade', 'ee', 'vodafone', 'three', 'o2', 'sim', 'mobile contract', 'phone bill', 'phone plan'],
    
    theyKnow: [
      "You'll pay for a 'free' phone for years after it's paid off — most people don't notice when the handset cost ends",
      "Switching feels like hassle, so you'll accept a worse deal to avoid 20 minutes of admin",
      "Loyalty means nothing to them — new customers always get better deals than you"
    ],
    
    theyUseIt: [
      "Bundled handset + contract hides the true cost of each — you can't see you're overpaying",
      "Auto-renewal at higher 'out of contract' rates — they're banking on your inattention",
      "'Unlimited' plans target your fear of running out, not your actual usage"
    ],
    
    theTrap: [
      "You pay £45/month for 2 years, phone is paid off after 18 months, you pay £180 for nothing",
      "You pay for 50GB data and use 4GB — that's £15/month for imaginary usage"
    ],
    
    firstTip: "Set a calendar reminder 30 days before contract ends — this is when you have maximum leverage.",
    
    psychology: "This exploits 'status quo bias' — the tendency to stick with current arrangements even when better options exist. Switching feels like effort and risk; staying feels like nothing. But staying IS a decision — it's choosing to pay more. They've also weaponised 'fear of missing out' with unlimited plans. You're not buying data; you're buying insurance against an anxiety they created.",
    
    moreTips: [
      {
        tip: "Buy phone outright (refurbished), SIM-only contract — always cheaper over 2 years",
        action: "Check backmarket.co.uk or musicmagpie.co.uk for refurbished phones. Then get SIM-only from smarty.co.uk or giffgaff.com. Do the maths — you'll save £200-400."
      },
      {
        tip: "Check your actual data usage — you probably need half what you have",
        action: "iPhone: Settings → Mobile Data → scroll down for usage. Android: Settings → Network → Data usage. Most people use under 5GB but pay for 20GB+."
      },
      {
        tip: "When contract ends: call to cancel, wait for retention offer, compare to market",
        action: "Call and say: 'I'd like my PAC code to leave.' They'll transfer you to retentions who have better deals. Get their offer, then check uswitch.com — take the best."
      },
      {
        tip: "Text PAC to 65075 — they must give you the code to leave within 60 seconds",
        action: "This is the legal requirement. Once you have the PAC, you have 30 days to use it. Having it in hand makes negotiations real."
      }
    ],
    tipCount: 4
  },
  
  insurance: {
    name: "insurance",
    triggers: ['insurance', 'car insurance', 'home insurance', 'renew', 'premium', 'quote', 'compare the market', 'moneysupermarket', 'claim', 'excess'],
    
    theyKnow: [
      "Renewal inertia is their biggest profit centre — most people don't switch even when they should",
      "You'll accept their renewal quote because comparing feels like work",
      "You don't understand what you're covered for, and they prefer it that way"
    ],
    
    theyUseIt: [
      "Renewal price is always higher than new customer price — loyalty is penalised",
      "Low headline price, high excess — you're not really insured for small claims",
      "Auto-renewal is opt-out, not opt-in — they're counting on your forgetfulness"
    ],
    
    theTrap: [
      "You pay 30% more than a new customer for the same policy, year after year",
      "You have £500 excess on a £600 claim — you're effectively uninsured for anything small"
    ],
    
    firstTip: "Never auto-renew. Always compare 3 weeks before renewal date — that's when you get the best prices.",
    
    psychology: "This exploits 'default bias' — whatever is set as the default, most people accept. Auto-renewal is the default; switching requires action. They're also exploiting 'complexity aversion' — insurance documents are deliberately dense so you won't read them, won't understand them, and won't compare. The cognitive load of comparing is the product feature that makes them money.",
    
    moreTips: [
      {
        tip: "Call them with a lower quote — they'll often match it to keep you",
        action: "Get quotes from comparethemarket.com. Call your insurer: 'I've been quoted £X elsewhere. Can you match it?' They usually can — they just don't offer it upfront."
      },
      {
        tip: "Check your excess vs typical claim — over 50% means you're over-insured",
        action: "What's your excess? What would a typical claim be? If excess is £400 and average claim is £600, you're only really covered for £200. Consider higher excess for lower premium."
      },
      {
        tip: "On claims: reject first offer, request itemised breakdown, mention ombudsman",
        action: "If they offer a settlement, say: 'I'd like an itemised breakdown of how you calculated that.' If they lowball, say: 'I'll be referring this to the Financial Ombudsman.' They'll improve."
      },
      {
        tip: "Multi-car and home+car bundles can save 15-20%",
        action: "If you have multiple cars or both home and car insurance, get a combined quote. But also check them separately — sometimes splitting is still cheaper."
      }
    ],
    tipCount: 4
  },
  
  supermarket: {
    name: "supermarket shopping",
    triggers: ['supermarket', 'tesco', 'sainsbury', 'asda', 'morrisons', 'aldi', 'lidl', 'waitrose', 'grocery', 'shopping', 'offers', 'clubcard', 'nectar'],
    
    theyKnow: [
      "You'll buy more if you have to walk past everything to reach essentials — that's why milk is at the back",
      "A 'deal' feels like saving money even when you're spending more than you planned",
      "You'll grab what's at eye level — that's where they put the high-margin products"
    ],
    
    theyUseIt: [
      "Store layout forces you past temptations — essentials are spread to maximise your journey",
      "'3 for £5' makes you buy 3 when you needed 1 — you've spent £5 instead of £2",
      "Price-per-unit is in tiny text, headline price is huge — they don't want you comparing"
    ],
    
    theTrap: [
      "You went in for 5 things and spent £60 — every time",
      "Your trolley is full of 'bargains' you didn't need and won't fully use"
    ],
    
    firstTip: "List on phone, buy only what's on list — physically tick each item, nothing else goes in.",
    
    psychology: "This exploits 'anchoring' and 'scarcity bias'. The '£5' in '3 for £5' becomes your anchor — you stop thinking 'do I need 3?' and start thinking 'that's good value'. Offers create artificial scarcity — 'limited time' triggers urgency. Eye-level placement exploits 'path of least resistance' — reaching up or down requires effort your tired brain won't make. The whole store is a psychological assault course.",
    
    moreTips: [
      {
        tip: "Calculate price per unit, not pack price — big packs are often worse value",
        action: "Look at the small print on the price label showing 'per 100g' or 'per litre'. Compare that number, not the pack price. You'll be surprised how often 'bulk' isn't cheaper."
      },
      {
        tip: "Shop hungry = spend more. Eat first.",
        action: "Studies show hungry shoppers spend 64% more on non-food items and buy more high-calorie foods. Have a snack before you shop — it's not willpower, it's biology."
      },
      {
        tip: "Click and collect removes the entire store manipulation",
        action: "Use Tesco.com, Sainsburys.co.uk, or your store's app. Search for what you need, add to basket, collect. No layout tricks, no impulse buys, no 'just walking past'."
      },
      {
        tip: "Lidl/Aldi for staples — the quality is identical, the price is 30% less",
        action: "Switch your basics (milk, bread, pasta, rice, tinned goods, cleaning products) to Aldi or Lidl. Keep your regular store for specific brands that actually differ."
      }
    ],
    tipCount: 4
  },
  
  online: {
    name: "online shopping",
    triggers: ['amazon', 'online shopping', 'checkout', 'basket', 'delivery', 'prime', 'next day', 'asos', 'ebay', 'add to cart'],
    
    theyKnow: [
      "Friction kills sales — every click you have to make is a chance for you to reconsider",
      "Scarcity and urgency bypass your judgment — 'only 2 left' makes you act before thinking",
      "Free delivery thresholds make you spend more to 'save' on shipping"
    ],
    
    theyUseIt: [
      "One-click buying removes the pause where you might reconsider",
      "'Only 3 left in stock' and countdown timers manufacture urgency that may not exist",
      "'Spend £25 for free delivery' — you add £8 of stuff you don't need to save £3.99 shipping"
    ],
    
    theTrap: [
      "Your purchase history is a graveyard of things you bought at 11pm and barely used",
      "Prime membership makes you feel you 'have to' use it — sunk cost driving more spending"
    ],
    
    firstTip: "Add to cart, close browser, wait 48 hours — if you still want it, buy it. Most of the time you won't.",
    
    psychology: "This exploits 'hot-cold empathy gap' — when you're excited (hot state), you can't imagine how you'll feel later (cold state). Late-night shopping happens in hot states. One-click removes the 'cooling off' moment. 'Only 2 left' triggers 'scarcity heuristic' — rare things feel more valuable, even when they're not. Your brain literally processes scarcity as a threat, triggering fight-or-flight that overrides rational thought.",
    
    moreTips: [
      {
        tip: "Remove saved payment methods — friction is your friend",
        action: "Go to Amazon → Account → Payment options → Remove all saved cards. Having to enter details creates a pause. That pause is where sanity lives."
      },
      {
        tip: "Use Fakespot or ReviewMeta to check for manipulated reviews",
        action: "Install the Fakespot browser extension or go to reviewmeta.com. Paste the Amazon URL. It shows which reviews are fake or incentivised. Many 4.5-star products are actually 3-star."
      },
      {
        tip: "CamelCamelCamel shows price history — the 'sale' price is often the normal price",
        action: "Go to camelcamelcamel.com, paste the Amazon URL. See the actual price history. 'Was £80, now £50!' often means it's been £50 for months."
      },
      {
        tip: "Ignore free delivery threshold — £3.99 shipping is cheaper than £8 of stuff you don't need",
        action: "Do the maths every time: Is the extra item something you'd buy anyway? If not, pay the shipping. Delivery cost is a feature, not a bug."
      },
      {
        tip: "Unsubscribe from all marketing emails — every 'flash sale' is engineered urgency",
        action: "Go through your inbox, search for 'unsubscribe', and click every one. Use unroll.me if needed. No emails = no artificial urgency."
      }
    ],
    tipCount: 5
  },
  
  energy: {
    name: "energy bills",
    triggers: ['energy', 'gas', 'electric', 'bill', 'supplier', 'tariff', 'british gas', 'octopus', 'edf', 'eon', 'ovo', 'meter', 'utility'],
    
    theyKnow: [
      "If you've never switched, you probably won't — so they charge you more",
      "You'll pay estimated bills without checking if they match reality",
      "You're afraid of being cut off, so you'll pay disputed amounts rather than fight"
    ],
    
    theyUseIt: [
      "Loyal customer penalty — people who stay pay more than people who switch",
      "Estimated billing runs high — you're lending them money interest-free",
      "Threatening letters over disputed amounts — pressure to pay now, argue later (you won't)"
    ],
    
    theTrap: [
      "You've paid 20% more than the market rate for years because switching felt like hassle",
      "You're in 'credit' by £300 — that's your money they're holding"
    ],
    
    firstTip: "Submit meter readings monthly — never let them estimate. Photos with dates as backup.",
    
    psychology: "This exploits 'effort heuristic' — the more effort something requires, the less likely you are to do it, regardless of the benefit. Switching is easy but feels hard. They also exploit 'loss aversion' in reverse — the fear of 'what if switching goes wrong' outweighs the certain gain of paying less. Threatening letters exploit 'authority bias' — official-looking documents trigger compliance even when you have the right to dispute.",
    
    moreTips: [
      {
        tip: "Switch or threaten to switch annually — retention team has unadvertised deals",
        action: "Call your supplier: 'I'm comparing prices to switch. What can you offer?' If they won't budge, actually switch via octopus.energy or bulb.co.uk — it takes 5 minutes."
      },
      {
        tip: "If bill seems wrong: dispute in writing, don't pay the disputed amount",
        action: "Email (not phone) your supplier: 'I dispute the amount of £X for reason Y. Please provide meter data to justify this charge.' They must respond. Don't pay disputed amounts."
      },
      {
        tip: "8 weeks unresolved = Energy Ombudsman — free, binding, and they know it",
        action: "If they don't resolve your complaint in 8 weeks, go to energyombudsman.org. It's free, they must comply with the ruling, and just mentioning it often accelerates resolution."
      },
      {
        tip: "Request credit refund if you're more than £100 in credit",
        action: "Log into your account, check your balance. If it shows credit over £100, call and say: 'Please refund my credit balance.' They must do it — it's your money, not theirs."
      }
    ],
    tipCount: 4
  },
  
  travel: {
    name: "travel & holidays",
    triggers: ['holiday', 'flight', 'hotel', 'booking', 'airbnb', 'ryanair', 'easyjet', 'expedia', 'skyscanner', 'travel', 'package'],
    
    theyKnow: [
      "You'll pay more when you're excited about a trip than when you're rationally comparing",
      "Scarcity ('only 2 rooms left!') stops you shopping around",
      "Dynamic pricing means you might pay double what someone else paid for the same seat"
    ],
    
    theyUseIt: [
      "'Only 1 room left at this price' — often a lie, or technically true but meaningless",
      "Drip pricing — headline price is low, then taxes, fees, bags, seats, insurance pile on",
      "Your search history raises prices — they know you're interested"
    ],
    
    theTrap: [
      "You paid £200 more than necessary because you panicked at 'selling fast'",
      "Your £29 flight cost £110 after bags, seats, and boarding priority you didn't need"
    ],
    
    firstTip: "Search in incognito/private browsing — prevents price inflation from tracking cookies.",
    
    psychology: "This exploits 'artificial scarcity' — 'only 2 left' may be true for that specific room category at that specific price, but there are other rooms, other hotels, other dates. Your brain can't process that complexity under pressure, so it panics. 'Dynamic pricing' exploits 'sunk cost' — once you've searched three times, you feel invested. They know this and raise prices. Excitement is a hot state that makes you bad at maths.",
    
    moreTips: [
      {
        tip: "Check hotel price on hotel's own site — often cheaper without booking site commission",
        action: "Find the hotel on Booking.com, then go directly to the hotel's website. Many offer 'best price guarantee' and you avoid the 15-20% commission booking sites charge."
      },
      {
        tip: "Book flights directly with airline — easier rebooking and refunds when things go wrong",
        action: "Use Skyscanner to compare, then book on the airline's site. If flights are cancelled or changed, dealing with the airline directly is faster than going through Expedia."
      },
      {
        tip: "Ignore 'X people looking at this' — it's designed to panic you",
        action: "That notification is either fake or meaningless. 14 people looking doesn't mean 14 people booking. Close the window, come back tomorrow, the room will still be there."
      },
      {
        tip: "Google Flights price alerts tell you when it's actually cheap",
        action: "Go to google.com/flights, search your route, click 'Track prices'. Google will email you when prices drop. Let the algorithm work for you instead of against you."
      }
    ],
    tipCount: 4
  },
  
  trades: {
    name: "builders & tradespeople",
    triggers: ['builder', 'plumber', 'electrician', 'roofer', 'tradesman', 'quote', 'work done', 'kitchen', 'bathroom', 'extension', 'decorator', 'contractor'],
    
    theyKnow: [
      "You can't evaluate their work until it's done — and then it's too late",
      "You'll feel awkward questioning their expertise, so you'll accept what they tell you",
      "Once they've started, you're committed — switching mid-job is worse than overpaying"
    ],
    
    theyUseIt: [
      "Low quote wins the job, then 'unforeseen problems' inflate the final price",
      "'Cash for no VAT' removes your paper trail and consumer protections",
      "Large deposit then slow progress — your money is their leverage, not yours"
    ],
    
    theTrap: [
      "You paid 40% more than quoted because you felt you couldn't say no once work started",
      "You paid in cash and have no recourse when the work fails"
    ],
    
    firstTip: "Final 10% held until snagging complete — this is your only leverage, never give it up early.",
    
    psychology: "This exploits 'commitment and consistency' — once you've started down a path (hired them, paid deposit, let them begin), you feel compelled to continue even when evidence suggests you should stop. 'Unforeseen problems' exploit 'information asymmetry' — they know what's behind the wall, you don't. You can't challenge their expertise, so you accept their assessment. The sunk cost of what you've already paid makes walking away feel impossible.",
    
    moreTips: [
      {
        tip: "3 quotes minimum — not for cheapest, but to spot who asks the best questions",
        action: "Get quotes from Checkatrade, MyBuilder, or local recommendations. The best tradesperson asks questions YOU didn't think of. Cheapest quote often means corners cut."
      },
      {
        tip: "Never more than 15% deposit, staged payments tied to milestones",
        action: "Agree in writing: 15% deposit, 25% at first milestone (e.g., first fix complete), 25% at second milestone, 25% at completion, 10% held for snagging. Put it in the contract."
      },
      {
        tip: "Everything in writing — scope, price, timeline, what happens with problems",
        action: "Before work starts, email: 'Please confirm: scope is X, price is £Y, completion by Z date. Variations require written approval.' Their reply is your contract."
      },
      {
        tip: "Photos throughout — document before, during, after",
        action: "Take photos every day with your phone. Before they start, during work, after completion. If there's a dispute, photos are evidence. No photos = your word against theirs."
      },
      {
        tip: "Check reviews on multiple platforms — fake reviews cluster on one site",
        action: "Check Checkatrade AND Google AND Facebook. If they have 50 five-star reviews on Checkatrade but nothing elsewhere, those reviews may be fake or incentivised."
      }
    ],
    tipCount: 5
  },
  
  scam: {
    name: "scams & fraud",
    triggers: ['scam', 'fraud', 'suspicious', 'bank called', 'hmrc', 'safe account', 'phishing', 'strange email', 'too good to be true', 'gift card'],
    
    theyKnow: [
      "If they can make you panic, you'll stop thinking clearly",
      "You'll trust authority — someone claiming to be your bank, police, or HMRC",
      "You'll keep a secret if they tell you to — 'don't tell anyone' isolates you"
    ],
    
    theyUseIt: [
      "'Your account is being drained right now' — panic disables judgment",
      "Caller ID spoofing makes the call look like it's from your real bank",
      "'This is a police investigation, you mustn't tell anyone' — secrecy prevents intervention"
    ],
    
    theTrap: [
      "You moved your savings to a 'safe account' that belonged to the scammer",
      "You sent gift cards, cryptocurrency, or bank transfers that cannot be reversed"
    ],
    
    firstTip: "Your bank will NEVER ask you to move money to a 'safe account' — if they do, it's not your bank.",
    
    psychology: "This exploits 'amygdala hijack' — when you panic, your amygdala takes over from your prefrontal cortex. You literally cannot think clearly; your brain is in survival mode. Authority bias means you defer to apparent expertise under pressure. Secrecy ('don't tell anyone') isolates you from people who would immediately recognise the scam. These aren't tricks — they're exploits of hard-wired human neurology.",
    
    moreTips: [
      {
        tip: "Hang up, wait 5 minutes, call back on the official number — not the one they gave",
        action: "If someone claims to be your bank: hang up. Wait 5 minutes (scammers can keep the line open). Call the number on the back of your card or your bank's official website. Never use a number the caller provides."
      },
      {
        tip: "If they say 'don't tell anyone' — tell someone immediately",
        action: "That phrase is the scam telling on itself. A real bank, real police, real HMRC would never say this. The moment you hear it, hang up and tell someone what just happened."
      },
      {
        tip: "If you've sent money: call your bank NOW — speed matters for recovery",
        action: "Don't feel embarrassed — banks have fraud teams for this. Call immediately: the faster you report, the more chance of recovery. Every minute counts for stopping transfers."
      },
      {
        tip: "Report to Action Fraud even if you didn't lose money",
        action: "Call 0300 123 2040 or go to actionfraud.police.uk. Reporting helps catch scammers and protects others. Even attempted scams should be reported — it builds the intelligence picture."
      }
    ],
    tipCount: 4
  },
  
  banking: {
    name: "banking & credit",
    triggers: ['bank', 'loan', 'credit card', 'overdraft', 'mortgage', 'interest', 'credit score', 'debt', 'borrowing', 'apr', 'klarna', 'clearpay'],
    
    theyKnow: [
      "You don't understand compound interest — not really, not viscerally",
      "You'll use an overdraft as if it's your money, not expensive borrowing",
      "Minimum payments feel manageable while the debt barely shrinks"
    ],
    
    theyUseIt: [
      "Overdraft 'buffer' normalises expensive borrowing — 39.9% EAR presented as convenience",
      "Credit card minimum payments are designed to maximise interest paid over years",
      "Buy Now Pay Later splits payments to hide the total you're committing to"
    ],
    
    theTrap: [
      "Your £1000 credit card balance takes 10 years to clear on minimum payments — costing £900 in interest",
      "Your 'free' overdraft facility costs you hundreds a year"
    ],
    
    firstTip: "Never treat overdraft as available money — it's a loan at 40%. If you're in it, you're in debt.",
    
    psychology: "This exploits 'hyperbolic discounting' — you value £100 today more than £150 next year, even though that's irrational. Credit makes future-you pay for present-you's decisions. Minimum payments exploit 'denomination effect' — £25 feels affordable even when £25/month for 10 years is £3000. Buy Now Pay Later exploits 'pain of paying' — spreading payments reduces the psychological pain of spending, so you spend more.",
    
    moreTips: [
      {
        tip: "Pay more than minimum on credit cards — any extra goes straight to principal",
        action: "Log into your credit card now. Set up a standing order for more than the minimum — even £10 extra per month dramatically reduces total interest. £1000 at minimum = 10 years. Add £30/month = 2 years."
      },
      {
        tip: "Compare loans before accepting what your bank offers",
        action: "Go to moneysupermarket.com/loans before accepting any offer from your bank. Banks rely on convenience — they know you won't compare. A 2% rate difference on £10,000 = £1000+ saved."
      },
      {
        tip: "0% credit card for big purchases — but set reminder to clear before 0% ends",
        action: "Search 'best 0% purchase credit cards' on MoneySavingExpert. Use it for big purchases. Set calendar reminder 1 month before 0% ends. Pay it off or transfer to another 0% card."
      },
      {
        tip: "Check credit score free — errors can cost you thousands in higher rates",
        action: "Sign up for ClearScore (uses Equifax), Credit Karma (TransUnion), or MSE Credit Club (Experian) — all free. Check for errors: wrong addresses, accounts you don't recognise, incorrect payment history."
      }
    ],
    tipCount: 4
  },
  
  dining: {
    name: "restaurants & delivery",
    triggers: ['restaurant', 'deliveroo', 'uber eats', 'just eat', 'takeaway', 'tipping', 'service charge', 'menu', 'dining'],
    
    theyKnow: [
      "You won't calculate delivery fee + service charge + tip until after you've ordered",
      "Menu psychology — prices without £ signs, expensive items first — shapes what you choose",
      "Hunger makes you order more than you'll eat"
    ],
    
    theyUseIt: [
      "Delivery apps charge restaurants 30% commission — passed to you in higher prices",
      "'Optional' service charge is pre-selected — you have to actively remove it",
      "Photos of food are the most profitable items, not the best"
    ],
    
    theTrap: [
      "Your £15 meal cost £23 after delivery, service charge, and tip — 50% markup",
      "You ordered £30 of food because you were hungry, ate £15, threw away the rest"
    ],
    
    firstTip: "Collection instead of delivery saves 20-30% — often the same wait time.",
    
    psychology: "This exploits 'menu engineering' — prices without pound signs feel less like spending money. Expensive items listed first anchor your expectations high. 'Decoy pricing' makes the middle option (where they make most profit) feel sensible. Delivery apps exploit 'mental accounting' — fees don't feel like the price of food, so you ignore them until checkout when you're already committed.",
    
    moreTips: [
      {
        tip: "Service charge is optional — you can remove it and tip cash instead",
        action: "Service charge legally must be optional. Ask: 'Can you remove the service charge? I'd prefer to tip cash directly to staff.' They must comply. Cash tips go directly to workers."
      },
      {
        tip: "Order direct from restaurant — they keep more, price is often same or cheaper",
        action: "Find the restaurant's own website or call them directly. Many offer delivery themselves. They save 30% commission, often pass savings to you, and food arrives fresher."
      },
      {
        tip: "Decide what you're ordering before opening the app — don't browse hungry",
        action: "Decide 'I'm having curry' BEFORE opening Deliveroo. Search for that specific thing. Don't scroll. Scrolling hungry is how you end up with £45 of food for two people."
      },
      {
        tip: "Check for restaurant own-delivery — avoids app commission entirely",
        action: "Google '[restaurant name] delivery'. Many have their own website ordering, especially local places. Same food, lower price, more money to the restaurant."
      }
    ],
    tipCount: 4
  },
  
  property: {
    name: "property & estate agents",
    triggers: ['estate agent', 'house', 'flat', 'rent', 'buy', 'mortgage', 'letting agent', 'rightmove', 'zoopla', 'deposit', 'moving'],
    
    theyKnow: [
      "You're emotionally invested once you've imagined living somewhere",
      "You don't know what the seller actually needs — the agent does, and won't tell you",
      "Buying/renting is stressful enough that you'll pay to make friction go away"
    ],
    
    theyUseIt: [
      "Agent works for seller, not you — their incentive is fast sale, not best price for you",
      "'Other interest' and 'best and final offers' create urgency that may not exist",
      "'Offers in excess of' anchors you high — actual market value may be lower"
    ],
    
    theTrap: [
      "You paid £15,000 over asking because you panicked about losing it to a fictional other buyer",
      "You didn't negotiate because you felt you couldn't — you could"
    ],
    
    firstTip: "First offer should be 5-10% below asking — they expect negotiation. You're not being rude.",
    
    psychology: "This exploits 'endowment effect' — once you've imagined your furniture in that living room, you mentally own it already. Losing it feels like losing something that's yours. 'Other interest' exploits social proof and scarcity simultaneously. Estate agents exploit 'information asymmetry' — they know if the seller is desperate, if there really are other offers, what the seller's minimum is. You don't. This imbalance is their product.",
    
    moreTips: [
      {
        tip: "Sold prices show actual value — ignore asking prices",
        action: "On Rightmove or Zoopla, search 'sold prices' in the same area. What did similar properties ACTUALLY sell for? That's the real market value. Asking prices are aspirational fiction."
      },
      {
        tip: "Ask letting agent to itemise fees — some are negotiable or waivable",
        action: "Email: 'Please provide an itemised breakdown of all fees.' When they do, ask: 'Which of these are negotiable?' Reference fees, admin fees, checkout fees — many will drop them if challenged."
      },
      {
        tip: "Never believe 'other interest' without proof — they're often exaggerating or lying",
        action: "Say: 'I'd like to proceed but I need to know if there are actually other offers.' They don't have to tell you, but their reaction tells you a lot. Hesitation = probably bluffing."
      },
      {
        tip: "Get mortgage agreement in principle first — you're a more serious buyer",
        action: "Before you start looking, get an AIP from your bank or a mortgage broker. You can make offers immediately and sellers take you seriously. Without AIP, you're a tourist."
      }
    ],
    tipCount: 4
  },
  
  wedding: {
    name: "weddings",
    triggers: ['wedding', 'bride', 'groom', 'venue', 'wedding dress', 'catering', 'wedding photographer', 'reception'],
    
    theyKnow: [
      "You'll pay almost anything to avoid your 'special day' being ruined",
      "You're comparing to imaginary perfection, not realistic alternatives",
      "You're planning this once and have no reference point for what things should cost"
    ],
    
    theyUseIt: [
      "'Wedding' tax — the same service costs 2-3x more when it's for a wedding",
      "Packages bundle things you don't need with things you do",
      "Vendors know you won't haggle — it's your 'special day', not a transaction"
    ],
    
    theTrap: [
      "You spent £30,000 on a day when you could have had 90% of the joy for £10,000",
      "You started your marriage in debt because you couldn't have a 'cheap' wedding"
    ],
    
    firstTip: "Ask for 'party' or 'event' quotes, not 'wedding' quotes — compare the difference. It's often 50%.",
    
    psychology: "This exploits 'affect heuristic' — decisions made in emotional states (excitement, love, family pressure) bypass rational evaluation. The wedding industry also exploits 'social comparison' — you're not planning YOUR wedding, you're planning a wedding that compares favourably to others. Pinterest and Instagram create reference points that didn't exist 20 years ago. Your grandmother didn't compare her wedding to 10,000 professionally photographed alternatives.",
    
    moreTips: [
      {
        tip: "Prioritise ruthlessly — 2 things that matter to you, adequate for everything else",
        action: "Sit down together. Each pick ONE thing that matters most (food? music? venue? dress?). Spend properly on those. Everything else gets 'good enough' budget. Your guests won't remember the napkin rings."
      },
      {
        tip: "Off-season, weekday, or Sunday = significant discounts",
        action: "January-March (not Valentine's), November (not Christmas), Thursdays, Sundays — all cheaper. Many venues offer 30-40% off. Your guests will come anyway; it's your wedding."
      },
      {
        tip: "What would you tell a friend in debt to spend? Apply that to yourself.",
        action: "Seriously: if your best friend earning what you earn asked your advice, what would you say? Now take that advice. The wedding industry relies on you not thinking this clearly."
      },
      {
        tip: "Registry office + restaurant + party later = same marriage, fraction of the price",
        action: "Legal ceremony costs £50-100. Nice restaurant for 20 people = £1000. Party a month later at a pub or hall = £2000. Total: £3000. Same marriage, same memories, no debt."
      }
    ],
    tipCount: 4
  },
  
  funeral: {
    name: "funerals",
    triggers: ['funeral', 'cremation', 'burial', 'funeral director', 'coffin', 'bereavement'],
    
    theyKnow: [
      "You're grieving, time-pressured, and feel that spending less means caring less",
      "You've never done this before and don't know what things should cost",
      "You won't haggle over a coffin — it feels disrespectful"
    ],
    
    theyUseIt: [
      "Upselling plays on guilt — 'a nicer coffin shows how much they meant to you'",
      "Package pricing hides individual costs — you can't see what you're overpaying for",
      "They show you expensive options first, so mid-range feels like restraint"
    ],
    
    theTrap: [
      "You spent £8,000 when £3,000 would have been equally dignified",
      "You bought a £2,000 coffin that was cremated — the £400 option was identical"
    ],
    
    firstTip: "Ask for itemised price list, not package — they're required by law to provide it.",
    
    psychology: "This exploits 'motivated reasoning' — grief makes you want to DO something, and spending feels like action. It also exploits 'taboo trade-off aversion' — comparing coffin prices feels like putting a price on love. But you're not pricing love; you're pricing wood. The funeral industry has weaponised your grief and your decency. The person who died would not want you exploited in their name.",
    
    moreTips: [
      {
        tip: "Get 3 quotes — even in grief, even quickly — prices vary hugely",
        action: "Call three funeral directors. Say: 'I need a quote for [cremation/burial] with [basic/mid/full] service.' Compare. Prices vary by hundreds or thousands of pounds for identical services."
      },
      {
        tip: "Direct cremation is £1000 vs £4000 — service can be separate memorial",
        action: "Direct cremation means no service at the crematorium — body collected, cremated, ashes returned. Have a memorial service separately at a church, park, or home. Same goodbye, £3000 less."
      },
      {
        tip: "The person who died would not want you in debt over their funeral",
        action: "Ask yourself: would they want you to spend the holiday fund on their coffin? Would they want you stressed about money while grieving? Honouring them doesn't require spending."
      },
      {
        tip: "Bring someone less emotionally involved to help make decisions",
        action: "Ask a friend or relative who's one step removed to come with you to the funeral director. They can ask the awkward questions about price that you feel you can't."
      }
    ],
    tipCount: 4
  },
  
  parenting: {
    name: "children & parenting",
    triggers: ['baby', 'child', 'kids', 'nursery', 'toys', 'pushchair', 'pram', 'nappies', 'parenting', 'children', 'newborn'],
    
    theyKnow: [
      "Parental guilt is bottomless — you'll pay anything to not feel like a bad parent",
      "You'll buy safety, or the illusion of it, at any price",
      "First-time parents have no idea what's necessary vs what's marketing"
    ],
    
    theyUseIt: [
      "'Educational' toys that are no more educational than cardboard boxes",
      "Safety certifications that all products have anyway, presented as premium features",
      "New baby pressure — everything must be new and perfect for this new life"
    ],
    
    theTrap: [
      "You bought £2,000 of stuff you used for 3 months",
      "You paid premium for 'baby' version of products identical to regular versions"
    ],
    
    firstTip: "Ask parents of 2-year-olds what they actually used — ignore what they bought. The overlap is small.",
    
    psychology: "This exploits 'protective instinct' — the primal drive to protect offspring makes you vulnerable to anything marketed as safety. It also exploits 'social proof' in a specific way: you see what other parents BUY, not what they USE. Nobody posts photos of the £200 baby gadget gathering dust. 'Good parent' is tied to spending in ways that 'good adult' isn't. The baby industry has monetised your love.",
    
    moreTips: [
      {
        tip: "Facebook Marketplace, NCT sales, hand-me-downs — babies don't care if it's new",
        action: "Join local Facebook parent groups. Search NCT nearly-new sales. Ask friends with older kids. Babies outgrow things in weeks; buying new makes no sense for most items."
      },
      {
        tip: "Wait to buy until you actually need it — half of what 'experts' list you'll never use",
        action: "Buy: car seat, place to sleep, nappies, basic clothes. Wait on everything else until you know you need it. That 'essential' wipe warmer? You don't need it. That 'must-have' swing? Maybe, maybe not."
      },
      {
        tip: "Supermarket nappies and wipes = same quality, half price",
        action: "Aldi Mamia, Lidl Lupilu, Tesco own-brand — all score as well as Pampers in tests. Try them. Most parents can't tell the difference, but the price difference is hundreds of pounds per year."
      },
      {
        tip: "Children need attention, not stuff — time is the expensive one",
        action: "A box is more interesting to a toddler than what came in it. Reading together costs nothing. Your presence matters more than any product. The things they remember aren't things."
      }
    ],
    tipCount: 4
  },
  
  pets: {
    name: "pets",
    triggers: ['dog', 'cat', 'pet', 'vet', 'puppy', 'kitten', 'pet insurance', 'pet food'],
    
    theyKnow: [
      "You'll pay anything when your pet is sick — they're family",
      "Guilt and love bypass rational spending — 'I can't put a price on their health'",
      "You don't know what treatments are necessary vs profitable"
    ],
    
    theyUseIt: [
      "Vets recommend tests and treatments that may not be necessary — you can't challenge expertise",
      "'Premium' pet food has the same nutritional value as supermarket brands at 3x the price",
      "Pet insurance excess and exclusions mean you pay most of small claims anyway"
    ],
    
    theTrap: [
      "You spent £3,000 on a vet bill that a second opinion would have halved",
      "Your pet insurance costs more than you've ever claimed"
    ],
    
    firstTip: "Second opinion on any treatment over £500 — vets vary hugely in approach and price.",
    
    psychology: "This exploits 'anthropomorphism' — we attribute human qualities to pets, so decisions about them feel like decisions about family members. Questioning a vet's recommendation feels like not loving your pet enough. Pet food marketing exploits 'premium placebo' — expensive food makes YOU feel better about your care, regardless of whether the pet can tell. The pet industry has successfully made spending = loving.",
    
    moreTips: [
      {
        tip: "Check pet food ingredients, not marketing — 'vet recommended' often means vet-commissioned",
        action: "Compare ingredients lists, not brand names. allaboutdogfood.co.uk rates foods objectively. Many 'premium' foods are 40% grain filler. Some supermarket brands are better than expensive brands."
      },
      {
        tip: "Self-insure: £30/month in savings instead of insurance",
        action: "Instead of paying £30/month for insurance with £200 excess and exclusions, put £30/month in a savings account labelled 'pet fund'. In 3 years you have £1000+ and no excess, no exclusions."
      },
      {
        tip: "Adopt, don't shop — rescue pets are healthier than many pedigrees",
        action: "Pedigree dogs have higher rates of genetic health problems. Rescue dogs are often healthier, already neutered/vaccinated, and cost £150 vs £2000. Check battersea.org.uk, dogstrust.org.uk."
      },
      {
        tip: "Pet charity vets for lower-cost treatment if you qualify",
        action: "PDSA, Blue Cross, and RSPCA offer subsidised vet care based on income. Check pdsa.org.uk/eligibility. Even if you don't qualify, they can advise on affordable options."
      }
    ],
    tipCount: 4
  },

  // ============ V2: THREE NEW TOPICS ============

  broadband: {
    name: "broadband deals",
    triggers: ['broadband', 'bt broadband', 'sky broadband', 'virgin media', 'talktalk', 'openreach', 'fibre broadband', 'broadband deal', 'broadband contract', 'broadband provider', 'internet provider', 'home broadband', 'wifi contract'],
    
    theyKnow: [
      "Your contract end date — the price increase is automatic, and they're counting on you not acting",
      "If you've never switched, they flag you as low churn risk and make their retention offer accordingly",
      "The more services bundled together, the less likely you are to switch — each addition raises your threshold for leaving"
    ],
    
    theyUseIt: [
      "Introductory prices are real and competitive — then automatically rise 30-50% when the deal expires",
      "'Up to' speeds only need to be delivered to 50% of customers — the other half pay the same for less",
      "Mid-contract price rises (CPI + 3.9%) add £4-6/month by contract end — this was in the small print"
    ],
    
    theTrap: [
      "Out-of-contract customers overpay by £120-240 per year compared with what the same provider is offering new customers right now",
      "Most providers use the same Openreach infrastructure — what differs is only the price, set by their assessment of your likelihood to leave"
    ],
    
    firstTip: "Check what your provider currently offers new customers for your speed. The gap between that price and yours is the loyalty penalty.",
    
    psychology: "This exploits 'inertia bias' combined with 'status quo bias' — the preference for maintaining current arrangements even when better options exist. Switching broadband requires effort: comparing deals, contacting a new provider, coordinating changeover. Each step is small; collectively they form a friction barrier the provider has deliberately not reduced. 'Present bias' ensures the immediate hassle feels larger than the deferred saving. What makes this particularly systematic: the Openreach network means most providers deliver literally the same service over the same cables. What differs is only the price, set by their assessment of how likely you are to leave.",
    
    moreTips: [
      {
        tip: "Call the retention team — not customer service — with a competitor quote in hand",
        action: "Check uswitch.com or broadband.co.uk for the cheapest equivalent deal at your postcode. Then call your provider and ask specifically for 'retentions' or 'disconnection'. Say: 'I've been quoted £X by [competitor] for the same speed. Match it or I'll switch today.' They have a budget. Use it."
      },
      {
        tip: "Know your contract end date — that's when you have maximum leverage",
        action: "Check your broadband agreement or last bill for the contract end date. Set a calendar reminder one month before. That's when comparison sites show best new-customer prices and your provider most wants to keep you."
      },
      {
        tip: "Run a speed test — consistently below minimum guaranteed means you can exit penalty-free",
        action: "Go to speedtest.net. Connect via ethernet (not Wi-Fi) and test at several times of day. If consistently below your minimum guaranteed speed, email your provider: 'My speed is consistently below the minimum guaranteed in my contract. I'd like to exit without penalty.' Ofcom backs this right."
      },
      {
        tip: "Unbundle and price each service separately — the bundle 'discount' often isn't one",
        action: "If you have broadband, TV, mobile, and landline bundled: price each separately from best-of-market providers. Add them up. Compare to your bundle total. You may find you're paying more for the 'discounted' bundle than you would for individual best deals."
      }
    ],
    tipCount: 4
  },

  education: {
    name: "online courses & education",
    triggers: ['online course', 'course', 'udemy', 'coursera', 'skillshare', 'masterclass', 'bootcamp', 'certification', 'upskilling', 'e-learning', 'webinar', 'free masterclass', 'invest in yourself'],
    
    theyKnow: [
      "Your professional insecurity is real — 'upskilling' language positions standing still as falling behind, the urgency is manufactured while the anxiety is genuine",
      "Most people won't finish the course — and when they don't, they blame themselves rather than the product, so no refund is sought and the next course is purchased with renewed determination",
      "Many 'certifications' are self-issued by the platform selling them and carry no weight with employers — the industry relies on you assuming otherwise"
    ],
    
    theyUseIt: [
      "The 'free masterclass' is not education — it's a sales environment: 90 minutes of partial content ending with a time-limited offer at the moment your commitment is highest",
      "Testimonials feature the top percentile of completers as if they were typical — the 80-95% who enrolled, quit, and achieved nothing are invisible",
      "Countdown timers and 'only 12 seats remaining' are standard tactics — the same 'limited' offer is recycled in the next cohort at the same or higher price"
    ],
    
    theTrap: [
      "Paid online course completion rates average 20-30% — the majority of customers pay for a product they never finish, then blame themselves for the failure",
      "A £2,000 course with 40 hours of content costs £50 per hour of instruction — a textbook on the same subject costs £30-40 total and often covers more ground with greater rigour"
    ],
    
    firstTip: "Before enrolling, search the specific credential on job listings in your field. Count how many employers mention it. If the answer is near zero, the credential is decorative.",
    
    psychology: "This exploits 'aspiration gap marketing' — targeting the permanent gap between who you are and who you want to be. The education industry positions its products as bridges across this gap, but the gap is existential, not commercial. No purchase closes it permanently. Each course that fails to transform you generates demand for the next product. This is compounded by 'completion guilt': the industry knows most people won't finish, and that non-completers blame themselves rather than the product. That self-attribution is the load-bearing wall of the business model. A consumer who blamed the product would switch; a consumer who blames themselves buys more and tries harder.",
    
    moreTips: [
      {
        tip: "Ask the provider for completion rate and outcome data before paying",
        action: "Email: 'What percentage of enrolled students complete this course? Of those, what percentage achieve the stated career outcome within twelve months?' Any provider that cannot or will not answer is selling hope, not outcomes. The refusal itself is the answer."
      },
      {
        tip: "Apply a 72-hour cooling-off rule to any course purchase triggered by a webinar or countdown",
        action: "Close the page. Wait three days. If you still want to enrol, the learning value is real. If the urgency has faded, it was the funnel talking. Legitimate educational value does not expire at midnight."
      },
      {
        tip: "Compare hourly cost to free alternatives before paying",
        action: "Calculate: course price ÷ hours of content = cost per hour. Then check: MIT OpenCourseWare, YouTube university channels, library textbooks. A £40 textbook often covers more than a £500 course. The course format is better marketed, not better taught."
      },
      {
        tip: "Separate learning from credentialing — they require different purchases",
        action: "If you want a skill: books, free resources, and practice are usually most effective. If you want a credential: verify it carries weight with specific employers before paying. Search '[credential name] site:indeed.com' or in LinkedIn job listings to see whether real employers mention it."
      }
    ],
    tipCount: 4
  },

  upf: {
    name: "ultra-processed food",
    triggers: ['ultra-processed', 'upf', 'processed food', 'junk food', 'crisps', 'snacks', 'biscuits', 'ready meals', 'cereal', 'bliss point', 'food engineering'],
    
    theyKnow: [
      "Your brain evolved to seek sugar, fat, and salt because they were historically scarce — the reward system that kept your ancestors alive was never designed for an environment where engineered combinations are unlimited, cheap, and on every shelf",
      "There is a 15-20 minute gap between eating and the brain receiving fullness signals — ultra-processed food is engineered for rapid consumption, ensuring substantial calories are ingested before the signal arrives",
      "When you overeat their product, you blame your willpower — that self-attribution is the load-bearing wall of the entire business model"
    ],
    
    theyUseIt: [
      "The 'bliss point' — the precise combination of sugar, fat, and salt that maximises pleasure without triggering satiety — is a standard industry methodology, found through testing and built into every product",
      "Vanishing caloric density: crisps and puffed snacks are engineered to dissolve rapidly in the mouth, so the brain registers the pleasure but underregisters the calories",
      "Fibre and protein, which slow eating and promote fullness, are systematically removed — replaced with refined carbohydrates that are cheap, stable, fast to consume, and do not satisfy"
    ],
    
    theTrap: [
      "An NIH clinical trial found participants on ultra-processed diets consumed around 500 extra calories per day compared to matched unprocessed diets — not because of weaker willpower, but because the products defeated their regulatory systems",
      "Ultra-processed food constitutes over 50% of the average UK adult diet — and the NHS spends an estimated £6.5 billion annually on obesity-related conditions linked to it"
    ],
    
    firstTip: "Pay attention to how fast the food disappears. Speed is not a coincidence — it's a design specification. Slow food gives your satiety signals time to work.",
    
    psychology: "This exploits 'reward circuit hijacking' combined with 'self-attribution bias'. Food science isolated the combinations that produce the strongest dopamine response with the least satiety — not maximising pleasure alone, but maximising repeatability, the ability to trigger desire again and again without triggering satisfaction. Three formulas reliably override appetite regulation: fat + sodium, fat + sugar, and carbohydrates + sodium. These are rare in nature but standard in manufacturing. Then the self-attribution mechanism completes the system: cultural framing ('individual portions', calorie counts, 'balanced diet' messaging) ensures you blame your willpower rather than the product's design. A consumer who blamed the product would stop buying. A consumer who blames themselves tries harder.",
    
    moreTips: [
      {
        tip: "Read the first three ingredients on every packaged food — they reveal what the product actually is",
        action: "The ingredients list is legally required to be in descending order of weight. If the first three are sugar, oil, or refined flour variants, the product is engineered for palatability, not nourishment. Ignore the front of the packet. The back is the only honest part."
      },
      {
        tip: "Check 'of which sugars' against total carbohydrates — 'healthy' packaging often fails this test",
        action: "On the nutrition label, find 'Carbohydrates' and 'of which sugars'. If sugars are more than half the total carbohydrates, it's closer to confectionery than food. Many 'high protein' cereals, yoghurts, and snack bars fail this immediately."
      },
      {
        tip: "Replace one ultra-processed meal per week with an unprocessed equivalent — and track how long fullness lasts",
        action: "Swap one ready meal or packaged snack for a whole-food equivalent this week. Porridge (oats + water) vs processed cereal of equivalent calories. Notice how many hours pass before hunger returns. The comparison is usually dramatic and requires no willpower to interpret."
      },
      {
        tip: "Stop blaming yourself for cravings — the craving is their product specification, not your weakness",
        action: "When you reach for a specific product unexpectedly, recognise: this is an engineered dopamine response, not a failure of discipline. Naming it accurately doesn't eliminate the craving but it removes the guilt loop — guilt → restriction → craving → consumption → guilt — that keeps you buying more."
      }
    ],
    tipCount: 4
  }

};

// ============ APP COMPONENT ============

const HackedOffApp = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [phase, setPhase] = useState('opening');
  const [unlockedTopics, setUnlockedTopics] = useState(new Set());
  const [allUnlocked, setAllUnlocked] = useState(false);
  const messagesEndRef = useRef(null);
  
  useEffect(() => {
    setMessages([{
      type: 'intro',
      content: {}
    }]);
  }, []);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const detectDomain = (text) => {
    const lower = text.toLowerCase();
    for (const [key, data] of Object.entries(intel)) {
      if (data.triggers.some(t => lower.includes(t))) {
        return key;
      }
    }
    return null;
  };
  
  const generateResponse = (userText) => {
    if (phase === 'opening') {
      const detected = detectDomain(userText);
      if (detected) {
        setPhase('briefing');
        return {
          type: 'briefing',
          domain: detected,
          data: intel[detected]
        };
      } else {
        return {
          type: 'app',
          content: { text: "Be more specific. What's the purchase, subscription, contract, or service?" }
        };
      }
    }
    
    if (phase === 'briefing' || phase === 'followup') {
      setPhase('followup');
      const detected = detectDomain(userText);
      if (detected) {
        return {
          type: 'briefing',
          domain: detected,
          data: intel[detected]
        };
      }
      return {
        type: 'app',
        content: { text: "What else are you being ripped off on?" }
      };
    }
    
    return { type: 'app', content: { text: "What's the spending?" } };
  };
  
  const handleSend = () => {
    if (!input.trim() || isThinking) return;
    const userText = input.trim();
    setInput('');
    
    const newMessages = [...messages, { type: 'user', content: { text: userText } }];
    setMessages(newMessages);
    
    setIsThinking(true);
    setTimeout(() => {
      const response = generateResponse(userText);
      setMessages([...newMessages, response]);
      setIsThinking(false);
    }, 600 + Math.random() * 400);
  };
  
  const handleQuickReply = (text) => {
    setInput('');
    const newMessages = [...messages, { type: 'user', content: { text } }];
    setMessages(newMessages);
    
    setIsThinking(true);
    setTimeout(() => {
      const response = generateResponse(text);
      setMessages([...newMessages, response]);
      setIsThinking(false);
    }, 600 + Math.random() * 400);
  };
  
  const handleUnlockSingle = (domain) => {
    window.open('https://buy.stripe.com/28E7sKft526mgMT0Y51gs00', '_blank');
  };
  
  const handleUnlockAll = () => {
    window.open('https://buy.stripe.com/00w7sK2Gj26mcwDgX31gs01', '_blank');
  };
  
  const isTopicUnlocked = (domain) => {
    return allUnlocked || unlockedTopics.has(domain);
  };
  
  const allDomainCategories = [
    { label: "Subscriptions", trigger: "streaming subscription" },
    { label: "Cars", trigger: "buying a car" },
    { label: "Phones", trigger: "mobile contract" },
    { label: "Insurance", trigger: "insurance" },
    { label: "Energy", trigger: "energy bill" },
    { label: "Shopping", trigger: "supermarket" },
    { label: "Online", trigger: "amazon" },
    { label: "Travel", trigger: "holiday" },
    { label: "Builders", trigger: "builder quote" },
    { label: "Gym", trigger: "gym" },
    { label: "Credit", trigger: "loan" },
    { label: "Delivery", trigger: "deliveroo" },
    { label: "Property", trigger: "estate agent" },
    { label: "Wedding", trigger: "wedding" },
    { label: "Funeral", trigger: "funeral" },
    { label: "Kids", trigger: "baby" },
    { label: "Pets", trigger: "vet" },
    { label: "Scams", trigger: "scam" },
    { label: "Broadband", trigger: "broadband" },
    { label: "Education", trigger: "online course" },
    { label: "UPF", trigger: "ultra-processed" }
  ];
  
  const showDomainPills = !isThinking && (
    (phase === 'opening' && messages.length === 1) || 
    phase === 'briefing' || 
    phase === 'followup'
  );
  
  const renderBriefing = (data, domain) => {
    const unlocked = isTopicUnlocked(domain);
    
    return (
      <>
        {/* YOUR VULNERABILITIES */}
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <div style={{...styles.sectionNumber, ...styles.vulnNum}}>⊕</div>
            <div style={{...styles.sectionTitle, ...styles.vulnTitle}}>Your Vulnerabilities</div>
          </div>
          <div style={{...styles.sectionContent, ...styles.vulnBorder}}>
            {data.theyKnow.map((item, i) => (
              <div key={i} style={i === data.theyKnow.length - 1 ? styles.sectionItemLast : styles.sectionItem}>
                {item}
              </div>
            ))}
          </div>
        </div>
        
        {/* HOW THEY'LL RIP YOU OFF */}
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <div style={{...styles.sectionNumber, ...styles.ripNum}}>⚡</div>
            <div style={{...styles.sectionTitle, ...styles.ripTitle}}>How They'll Rip You Off</div>
          </div>
          <div style={{...styles.sectionContent, ...styles.ripBorder}}>
            {data.theyUseIt.map((item, i) => (
              <div key={i} style={i === data.theyUseIt.length - 1 ? styles.sectionItemLast : styles.sectionItem}>
                {item}
              </div>
            ))}
          </div>
        </div>
        
        {/* THE STING */}
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <div style={{...styles.sectionNumber, ...styles.stingNum}}>✕</div>
            <div style={{...styles.sectionTitle, ...styles.stingTitle}}>The Sting</div>
          </div>
          <div style={{...styles.sectionContent, ...styles.stingBorder}}>
            {data.theTrap.map((item, i) => (
              <div key={i} style={i === data.theTrap.length - 1 ? styles.sectionItemLast : styles.sectionItem}>
                {item}
              </div>
            ))}
          </div>
        </div>
        
        {/* HIT BACK */}
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <div style={{...styles.sectionNumber, ...styles.hitNum}}>→</div>
            <div style={{...styles.sectionTitle, ...styles.hitTitle}}>Hit Back</div>
            {unlocked && <span style={styles.unlockedBadge}>FULL ACCESS</span>}
          </div>
          
          {/* Free tip always shown */}
          <div style={styles.freeTip}>
            <strong style={{color: '#45e88a'}}>First move:</strong> {data.firstTip}
          </div>
          
          {/* Paid content or paywall */}
          {unlocked ? (
            <>
              {/* Psychology deep dive */}
              <div style={styles.psychBox}>
                <div style={styles.psychTitle}>🧠 Why This Works On Your Brain</div>
                <div style={styles.psychText}>{data.psychology}</div>
              </div>
              
              {/* More tips with actions */}
              <div style={{...styles.sectionContent, ...styles.hitBorder, marginTop: '12px'}}>
                {data.moreTips.map((item, i) => (
                  <div key={i} style={i === data.moreTips.length - 1 ? styles.sectionItemLast : styles.sectionItem}>
                    <div style={{marginBottom: '8px'}}>{item.tip}</div>
                    <div style={styles.actionBox}>
                      <div style={styles.actionLabel}>→ Do This Now</div>
                      <div style={styles.actionText}>{item.action}</div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div style={styles.paywallCard}>
              <div style={styles.paywallText}>
                <span style={styles.paywallHighlight}>{data.tipCount} more ways to hit back</span> — 
                plus the psychology behind the trick: why your brain falls for it, and step-by-step actions to protect yourself.
              </div>
              <div style={styles.paywallSubtext}>
                Insider knowledge. Specific scripts. Exact steps.
              </div>
              <div style={styles.buttonRow}>
                <button 
                  style={styles.unlockButtonSingle}
                  onClick={() => handleUnlockSingle(domain)}
                >
                  This Topic £1.99
                </button>
                <button 
                  style={styles.unlockButtonAll}
                  onClick={handleUnlockAll}
                >
                  All Topics £4.99
                </button>
              </div>
              <div style={styles.paywallPrice}>
                One-time payment · Lifetime access · No subscription
              </div>
            </div>
          )}
        </div>
        
        <div style={styles.followUp}>
          {unlocked ? "Now you see how they operate. What else?" : "What else are you being ripped off on?"}
        </div>
      </>
    );
  };
  
  const renderMessage = (msg) => {
    if (msg.type === 'user') {
      return <div style={styles.messageUser}>{msg.content.text}</div>;
    }
    if (msg.type === 'briefing') {
      return renderBriefing(msg.data, msg.domain);
    }
    if (msg.type === 'intro') {
      return (
        <div style={styles.introBox}>
          <div style={styles.introText}>
            <span style={styles.introHighlight}>Big Business</span> knows more about you than you realise. 
            Data mining lets advertisers and corporations target your psychological weak spots with precision. 
            That's how they make money at your expense.
          </div>
          <div style={{...styles.introText, marginBottom: '16px'}}>
            Decades of psychology research and commercial data prove exactly how this works:
          </div>
          <div style={styles.introEvidence}>
            <div style={styles.evidenceItem}>
              <span style={styles.evidenceBullet}>•</span>
              <span style={styles.evidenceText}>Loyal customers pay up to <strong>30% more</strong> than new customers for identical insurance policies</span>
            </div>
            <div style={styles.evidenceItem}>
              <span style={styles.evidenceBullet}>•</span>
              <span style={styles.evidenceText}>Your postcode lets them estimate your income — and <strong>charge accordingly</strong></span>
            </div>
            <div style={styles.evidenceItem}>
              <span style={styles.evidenceBullet}>•</span>
              <span style={styles.evidenceText}><strong>92% of people</strong> intend to cancel free trials but don't — that's the business model</span>
            </div>
            <div style={styles.evidenceItem}>
              <span style={styles.evidenceBullet}>•</span>
              <span style={styles.evidenceText}>Saying "someone else is interested" increases sale prices by <strong>12% — even when it's a lie</strong></span>
            </div>
            <div style={styles.evidenceItem}>
              <span style={styles.evidenceBullet}>•</span>
              <span style={styles.evidenceText}>Gyms sell <strong>4x more memberships</strong> than capacity — they're betting you won't show up</span>
            </div>
          </div>
          <div style={styles.introPrompt}>
            What do you need to know to avoid being ripped off? Pick a topic below.
          </div>
        </div>
      );
    }
    return <div style={styles.messageApp}>{msg.content.text.split('\n').map((line, i) => (
      <span key={i}>{line}<br/></span>
    ))}</div>;
  };
  
  const headerImageUrl = "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&h=400&fit=crop&auto=format";
  
  return (
    <div style={styles.container}>
      <div style={styles.inner}>
        {/* Header image */}
        <img 
          src={headerImageUrl}
          alt="Digital surveillance concept"
          style={styles.headerImage}
          onError={(e) => e.target.style.display = 'none'}
        />
        
        <header style={styles.header}>
          <div style={styles.logo}>HACKED OFF</div>
          <div style={styles.tagline}>Exposing the mind tricks used to rip you off.</div>
        </header>
        
        <div>
          {messages.map((msg, i) => (
            <div key={i} style={styles.message}>
              {renderMessage(msg)}
            </div>
          ))}
          
          {isThinking && <div style={styles.thinking}>• • •</div>}
          
          {showDomainPills && (
            <div style={styles.domainPills}>
              {allDomainCategories.map((cat, i) => (
                <button 
                  key={i} 
                  style={styles.domainPill} 
                  onClick={() => handleQuickReply(cat.trigger)}
                  onMouseOver={(e) => {
                    e.target.style.background = 'rgba(139, 0, 0, 0.4)';
                    e.target.style.color = '#d4a954';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = 'rgba(139, 0, 0, 0.2)';
                    e.target.style.color = '#a89880';
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          <a href="https://feelinghackedoff.substack.com" style={styles.footerLink} target="_blank" rel="noopener noreferrer">Newsletter</a>
          <span style={{color: '#333'}}>·</span>
          <a href="#" style={styles.footerLink}>Privacy</a>
          <span style={{color: '#333'}}>·</span>
          <a href="#" style={styles.footerLink}>Terms</a>
        </div>
      </div>
      
      <div style={styles.inputArea}>
        <div style={styles.inputInner}>
          <textarea
            style={styles.textarea}
            placeholder="What are you spending on?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            rows={1}
          />
          <button
            style={{ ...styles.sendButton, opacity: input.trim() ? 1 : 0.5 }}
            onClick={handleSend}
            disabled={!input.trim() || isThinking}
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
};

export default HackedOffApp;

// For backwards compatibility
export { HackedOffApp };
