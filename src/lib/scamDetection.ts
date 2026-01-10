export const SCAM_KEYWORDS = [
  // Lottery / Prize
  "lottery", "winner", "prize", "jackpot", "lucky draw", "raffle",
  "you have won", "claim your prize", "congratulations", "free reward",
  "cash prize", "gift voucher", "amazon gift", "flipkart gift",
  "google reward", "iphone giveaway", "car giveaway",

  // Banking / KYC
  "account blocked", "account suspended", "account frozen",
  "kyc update", "update kyc", "verify kyc", "pan update",
  "aadhaar update", "bank verification", "otp verification",
  "atm blocked", "debit card blocked", "credit card blocked",
  "suspicious activity", "unusual login", "security alert",

  // Urgency & Threat
  "urgent", "immediately", "within 24 hours", "last warning",
  "final notice", "legal action", "court notice", "arrest warrant",
  "fine will be charged", "account will be closed",

  // Money Requests
  "processing fee", "activation fee", "registration fee",
  "pay now", "send money", "upi request", "google pay", "phonepe",
  "paytm", "bank transfer", "wire transfer", "transaction pending",

  // Investment / Crypto
  "investment", "guaranteed profit", "double your money",
  "high return", "no risk", "crypto", "bitcoin", "ethereum",
  "usdt", "forex", "nft", "trading bot", "stock tips",
  "profit in 24 hours", "earn daily", "passive income",

  // Job Scams
  "work from home", "part time job", "earn per day",
  "data entry job", "online typing job", "registration charge",
  "training fee", "placement fee",

  // Romance & Social Engineering
  "i love you", "need help urgently", "send money please",
  "stuck abroad", "medical emergency", "hospital bill",

  // Government Impersonation
  "income tax department", "customs office", "police department",
  "cbi", "interpol", "court order", "summon notice",
  "electricity bill", "gas connection", "water bill",

  // Tech Support Scams
  "microsoft support", "windows infected", "virus detected",
  "call immediately", "remote access", "teamviewer",
  "anydesk", "refund department"
];

export const PHISHING_WORDS = [
  "verify your account", "login to continue", "reset your password",
  "confirm your identity", "click the link below",
  "update your details", "secure your account",
  "unusual activity detected", "session expired",
  "re-activate your account", "validate your information",
  "confirm billing details", "verify payment",
  "account limitation", "suspicious login attempt",
  "unlock your account", "security check required",
  "confirm email address", "reconfirm your password",
  "two step verification required", "your mailbox is full",
  "storage limit exceeded", "document shared with you",
  "view secure document", "download invoice",
  "track your parcel", "delivery failed",
  "customs clearance required"
];

export const SUSPICIOUS_DOMAINS = [
  ".xyz", ".top", ".info", ".site", ".store", ".online",
  ".live", ".icu", ".monster", ".buzz", ".club", ".loan",
  ".work", ".support", ".click", ".link", ".tk", ".ml",
  ".ga", ".cf", ".gq", ".ru", ".cn", ".su", ".cc", ".pw",
  ".vip", ".win", ".bid", ".faith", ".stream", ".download",
  ".racing", ".party", ".review", ".accountant", ".trade"
];

export const URL_SHORTENERS = [
  "bit.ly", "tinyurl.com", "t.ly", "cutt.ly", "rebrand.ly",
  "shorturl.at", "is.gd", "soo.gd", "ow.ly", "buff.ly",
  "shorte.st", "adf.ly", "linktr.ee", "rb.gy", "tiny.cc",
  "lnk.bio", "cli.re", "s.id", "v.gd", "t2m.io"
];

export interface DetectionResult {
  riskLevel: 'safe' | 'warning' | 'danger';
  riskScore: number;
  detectedKeywords: string[];
  detectedPhishing: string[];
  suspiciousUrls: string[];
  shortenerUrls: string[];
  summary: string;
}

export function analyzeMessage(message: string): DetectionResult {
  const lowerMessage = message.toLowerCase();
  
  // Detect scam keywords
  const detectedKeywords = SCAM_KEYWORDS.filter(keyword => 
    lowerMessage.includes(keyword.toLowerCase())
  );
  
  // Detect phishing phrases
  const detectedPhishing = PHISHING_WORDS.filter(phrase => 
    lowerMessage.includes(phrase.toLowerCase())
  );
  
  // Extract URLs and check for suspicious domains
  const urlRegex = /(https?:\/\/[^\s]+)/gi;
  const urls = message.match(urlRegex) || [];
  
  const suspiciousUrls = urls.filter(url => 
    SUSPICIOUS_DOMAINS.some(domain => url.toLowerCase().includes(domain))
  );
  
  const shortenerUrls = urls.filter(url => 
    URL_SHORTENERS.some(shortener => url.toLowerCase().includes(shortener))
  );
  
  // Calculate risk score
  let riskScore = 0;
  riskScore += detectedKeywords.length * 15;
  riskScore += detectedPhishing.length * 25;
  riskScore += suspiciousUrls.length * 20;
  riskScore += shortenerUrls.length * 10;
  
  // Cap at 100
  riskScore = Math.min(riskScore, 100);
  
  // Determine risk level
  let riskLevel: 'safe' | 'warning' | 'danger';
  if (riskScore >= 50) {
    riskLevel = 'danger';
  } else if (riskScore >= 20) {
    riskLevel = 'warning';
  } else {
    riskLevel = 'safe';
  }
  
  // Generate summary
  let summary: string;
  if (riskLevel === 'danger') {
    summary = "⚠️ High Risk! This message contains multiple red flags commonly found in scam messages. Do NOT click any links or share personal information.";
  } else if (riskLevel === 'warning') {
    summary = "⚡ Caution! This message has some suspicious elements. Verify the sender before taking any action.";
  } else {
    summary = "✅ This message appears to be safe, but always stay vigilant and verify unexpected requests.";
  }
  
  return {
    riskLevel,
    riskScore,
    detectedKeywords,
    detectedPhishing,
    suspiciousUrls,
    shortenerUrls,
    summary
  };
}

export const SCAM_EXAMPLES = [
  {
    title: "Lottery Scam",
    message: "🎉 CONGRATULATIONS! You've won ₹50,00,000 in the WhatsApp Lucky Draw! Click here to claim: bit.ly/claim-prize. Pay processing fee of ₹999 to receive your prize!",
    category: "lottery"
  },
  {
    title: "KYC Fraud",
    message: "URGENT: Your bank account will be blocked in 24 hours! Update your KYC immediately: http://bank-kyc-update.xyz. Share OTP to verify your identity.",
    category: "banking"
  },
  {
    title: "Crypto Investment Scam",
    message: "🚀 GUARANTEED 300% PROFIT! Invest in Bitcoin today. Double your money in 7 days! Join now: t.ly/crypto-invest. USDT/Forex available!",
    category: "crypto"
  },
  {
    title: "Fake Job Offer",
    message: "Hi! You've been selected for a Work From Home job at Amazon! Earn ₹5000-₹50000 daily. No investment needed. Click to apply: job-offer.store/amazon",
    category: "job"
  },
  {
    title: "Government Impersonation",
    message: "FINAL NOTICE from Income Tax Dept: Your PAN update is pending. Account will be frozen. Click to update immediately: pan-update.info/verify",
    category: "government"
  }
];
