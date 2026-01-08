export const SCAM_KEYWORDS = [
  "lottery", "winner", "prize", "congratulations", "jackpot",
  "free gift", "reward", "lucky draw", "bonus",
  "account blocked", "kyc", "update immediately",
  "urgent", "last warning", "final notice",
  "processing fee", "pay now", "transaction blocked",
  "investment", "double your money", "crypto",
  "bitcoin", "usdt", "forex", "profit guaranteed",
  "otp", "bank verification", "pan update"
];

export const PHISHING_WORDS = [
  "verify your account",
  "click the link below",
  "login to continue",
  "reset your password",
  "confirm your identity"
];

export const SUSPICIOUS_DOMAINS = [
  ".xyz", ".top", ".info", ".store", ".ru"
];

export const URL_SHORTENERS = [
  "bit.ly", "tinyurl.com", "t.ly", "cutt.ly"
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
