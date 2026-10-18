import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
    Truck,
    Shield,
    ShieldCheck,
    Lock,
    Key,
    Smartphone,
    Scale,
    Calculator,
    RefreshCw,
    QrCode,
    Search,
    Filter,
    Sun,
    Moon,
    Sparkles,
    Clock,
    ArrowRight,
    ChevronRight,
    Users,
    Eye,
    Receipt,
    ShoppingBag,
    Activity,
    Wifi,
    WifiOff,
    Zap,
    SlidersHorizontal,
    X,
    Share2,
    Download,
    Plus,
    CheckCircle2,
    AlertTriangle,
    Camera,
    Play,
    Volume2,
    VolumeX
} from 'lucide-react';

// ==========================================
// 1. DICTIONARY & MULTI-LANGUAGE TRANSLATIONS
// ==========================================
const TRANSLATIONS = {
    en: {
        appTitle: "DEAL",
        subtitle: "Digital Consignation System for Fisheries & Seafood Trade",
        securedBadge: "Secured Port System",
        firewallActive: "Active Port Firewall & TLS 1.3 Protection",
        sessionGuard: "Session Guard: Monitored & Audited",
        online: "Pier Online (Good Signal)",
        offline: "Pier Offline Mode",
        navListings: "Fresh Catches",
        navPooling: "Hati-Hati (Micro-Pool)",
        navCalculator: "Taripa Calculator",
        navInspector: "Suri-Isda Quality Guard",
        navOffline: "Offline Sync Hub",
        navDashboard: "My Consignation Passes",
        authTitle: "Multi-Role Port Authentication",
        authSubtitle: "Select your role to access verified dockside consignation services",
        roleVendor: "Micro-Vendor Portal (Tingi)",
        roleChecker: "Pier Checker Portal (Tally)",
        roleBroker: "Consignee Broker Portal (Auction)",
        banyera: "Bañera (Tub)",
        perKilo: "per kg",
        claimed: "Claimed",
        available: "Available",
        antiLayeringTitle: "Anti-Layering Quality Verification",
        scanToRelease: "Scan QR to Release Escrow",
        simSignal: "Simulate Pier Signal"
    },
    tl: {
        appTitle: "DEAL",
        subtitle: "Digital na Consignation sa Bagsakan at Kalakalan ng Isda",
        securedBadge: "Protektadong Sistema ng Pier",
        firewallActive: "Aktibong Port Firewall at Proteksyong TLS 1.3",
        sessionGuard: "Bantay-Sesyon: Ligtas at Rehistrado",
        online: "May Signal sa Pier",
        offline: "Offline Mode (Walang Signal)",
        navListings: "Sariwang Huli",
        navPooling: "Hati-Hati sa Bañera",
        navCalculator: "Taripa at Kwenta",
        navInspector: "Suri-Isda Quality Guard",
        navOffline: "Offline Sync Hub",
        navDashboard: "Aking mga Pasaporte sa Isda",
        authTitle: "Pagpapatunay ng Karapatan sa Port",
        authSubtitle: "Pumili ng iyong tungkulin upang makapasok sa consignation",
        roleVendor: "Portal ng Micro-Vendor (Tingi)",
        roleChecker: "Portal ng Pier Checker (Tally)",
        roleBroker: "Portal ng Kunsignataryo (Broker)",
        banyera: "Bañera",
        perKilo: "kada kilo",
        claimed: "Nakuha na",
        available: "May Bakante Pa",
        antiLayeringTitle: "Anti-Patong / Anti-Layering Proteksyon",
        scanToRelease: "I-scan ang QR para Ilabas ang Bayad",
        simSignal: "I-toggle ang Signal ng Pier"
    },
    taglish: {
        appTitle: "DEAL",
        subtitle: "Digital Consignation System for Fisheries & Seafood Trade",
        securedBadge: "Verified Port Escrow & Secured System",
        firewallActive: "Live Dockside Firewall & End-to-End Encryption",
        sessionGuard: "Session Guard: Real-time Anti-Fraud Monitoring",
        online: "Online • Connected sa Pier",
        offline: "Offline • Dockside Pier Mode",
        navListings: "Fresh Catches Floor",
        navPooling: "Hati-Hati Banyera",
        navCalculator: "Taripa Calculator",
        navInspector: "Suri-Isda Quality Guard",
        navOffline: "Offline Sync Engine",
        navDashboard: "My Passes & Ledger",
        authTitle: "Sign In: DEAL Port Access",
        authSubtitle: "Authorized sign-in for micro-vendors, checkers, and consignee brokers",
        roleVendor: "Micro-Vendor Portal (Suki)",
        roleChecker: "Pier Checker Portal (Tally)",
        roleBroker: "Consignee Broker Portal (Auction)",
        banyera: "Bañera",
        perKilo: "per kilo",
        claimed: "Taken Na",
        available: "Open Pa",
        antiLayeringTitle: "Anti-Patong / Anti-Layering Guard",
        scanToRelease: "Scan QR to Release Escrow",
        simSignal: "Simulate No Signal at Pier"
    }
};

// ==========================================
// 2. STRICT RAW / FRESH SEAFOOD CATALOG
// (STRICT: NO COOKED, NO PROCESSED, NO CANNED)
// ==========================================
const RAW_FRESH_CATCHES = [
    {
        id: 'CAT-001',
        name: 'Galunggong (Round Scad)',
        localTerm: 'Dagupan Blackfin Galunggong (Fresh Catch)',
        scientificName: 'Decapterus punctatus',
        category: 'Pelagic',
        qualityTier: 'Grade AAA Pier Fresh',
        gillColor: 'Vibrant Crimson Red',
        hasangScore: 9.8,
        iceCondition: 'Crushed Slush Ice (-2°C)',
        pricePerKg: 185,
        startingBidPerKg: 175,
        currentTopBidPerKg: 195,
        banyeraWeightKg: 40,
        availableBanyeras: 28,
        landingTime: '12 mins ago • Pier 2 Dock B',
        vesselOrigin: 'F/V San Miguel Navotas',
        isAntiLayeredVerified: true,
        checkerBadge: 'Mang Tomas (Tally ID #402)',
        poolAllocations: [
            { id: 'p1', vendor: 'Nanay Rosa Tingi', weight: 15, claimedAt: '12:15 PM' },
            { id: 'p2', vendor: 'Suki Aling Bebang', weight: 10, claimedAt: '12:20 PM' }
        ], // 25kg claimed, 15kg open
        image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80',
        freshProofNote: 'Firm silver sheen, intact clear scales, resilient flesh elasticity.'
    },
    {
        id: 'CAT-002',
        name: 'Salmon (Whole Chilled Atlantic)',
        localTerm: 'Import Chilled Raw Whole Salmon',
        scientificName: 'Salmo salar',
        category: 'Pelagic',
        qualityTier: 'Grade AAA Sashimi Quality',
        gillColor: 'Ruby Scarlet Fresh',
        hasangScore: 9.9,
        iceCondition: 'Deep Flake Dry Ice (-4°C)',
        pricePerKg: 620,
        startingBidPerKg: 590,
        currentTopBidPerKg: 650,
        banyeraWeightKg: 30,
        availableBanyeras: 8,
        landingTime: '55 mins ago • Cold Chain Vessel San Jose',
        vesselOrigin: 'Northern Cold Reefer Vessel #12',
        isAntiLayeredVerified: true,
        checkerBadge: 'Mang Tomas (Tally ID #402)',
        poolAllocations: [
            { id: 'p1', vendor: 'Japanese Resto Suki', weight: 10, claimedAt: '12:00 PM' }
        ], // 10kg claimed, 20kg open
        image: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=800&q=80',
        freshProofNote: 'Silver-bright skin, vibrant orange intramuscular marbling, odorless.'
    },
    {
        id: 'CAT-003',
        name: 'Tilapia (St. Peter Fish)',
        localTerm: 'Laguna Freshwater Live/Chilled Tilapia',
        scientificName: 'Oreochromis niloticus',
        category: 'Freshwater',
        qualityTier: 'Grade A Dockside Fresh',
        gillColor: 'Natural Bright Red',
        hasangScore: 9.3,
        iceCondition: 'Chilled Slurry (-1°C)',
        pricePerKg: 135,
        startingBidPerKg: 125,
        currentTopBidPerKg: 140,
        banyeraWeightKg: 40,
        availableBanyeras: 22,
        landingTime: '40 mins ago • Pier 3 Slipway',
        vesselOrigin: 'Laguna De Bay Harvest Barge #04',
        isAntiLayeredVerified: true,
        checkerBadge: 'Pareng Jun (Tally ID #108)',
        poolAllocations: [
            { id: 'p1', vendor: 'Kanto Grill Suki', weight: 20, claimedAt: '11:50 AM' },
            { id: 'p2', vendor: 'Nanay Cora Stall', weight: 20, claimedAt: '11:52 AM' }
        ], // Full
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
        freshProofNote: 'Firm intact dorsal fins, deep clean belly cavity with zero bloating.'
    },
    {
        id: 'CAT-004',
        name: 'Bangus (Milkfish)',
        localTerm: 'Bonuan Dagupan Raw Milkfish',
        scientificName: 'Chanos chanos',
        category: 'Finfish',
        qualityTier: 'Grade AAA Export Prime',
        gillColor: 'Deep Bright Crimson',
        hasangScore: 9.9,
        iceCondition: 'Flake Ice Submerged (-3°C)',
        pricePerKg: 220,
        startingBidPerKg: 210,
        currentTopBidPerKg: 230,
        banyeraWeightKg: 40,
        availableBanyeras: 16,
        landingTime: '24 mins ago • Pier 1 Dock A',
        vesselOrigin: 'Brgy. Salapingao Fish Farm Carrier',
        isAntiLayeredVerified: true,
        checkerBadge: 'Kuya Berto (Tally ID #305)',
        poolAllocations: [
            { id: 'p1', vendor: 'Tindahan ni Linda', weight: 20, claimedAt: '12:05 PM' }
        ], // 20kg claimed, 20kg open
        image: 'https://images.unsplash.com/photo-1534483509719-3feaee7c30da?auto=format&fit=crop&w=800&q=80',
        freshProofNote: 'Naturally sweet fresh ocean aroma, crystalline cornea, zero cloudiness.'
    },
    {
        id: 'CAT-005',
        name: 'Yellowfin Tuna / Tuna',
        localTerm: 'GenSan Sashimi-Grade Yellowfin Tuna',
        scientificName: 'Thunnus albacares',
        category: 'Pelagic',
        qualityTier: 'Grade AAA Auction Winner',
        gillColor: 'Rich Oxblood Red',
        hasangScore: 9.7,
        iceCondition: 'Brine Chilled Cryo-Cask (-5°C)',
        pricePerKg: 460,
        startingBidPerKg: 440,
        currentTopBidPerKg: 485,
        banyeraWeightKg: 50,
        availableBanyeras: 6,
        landingTime: '1 hr ago • Pier 1 Dockside Bay C',
        vesselOrigin: 'F/V Southern Cross GenSan Carrier',
        isAntiLayeredVerified: true,
        checkerBadge: 'Kuya Berto (Tally ID #305)',
        poolAllocations: [
            { id: 'p1', vendor: 'Divisoria Master Broker', weight: 25, claimedAt: '11:15 AM' }
        ], // 25kg claimed, 25kg open
        image: 'https://images.unsplash.com/photo-1535591273668-578e31182c4f?auto=format&fit=crop&w=800&q=80',
        freshProofNote: 'Tail core-cut verified translucent ruby meat, high fat content, zero drip.'
    },
    {
        id: 'CAT-006',
        name: 'Sugpo (Tiger Prawns)',
        localTerm: 'Jumbo Roxas Raw Tiger Prawns',
        scientificName: 'Penaeus monodon',
        category: 'Crustacean',
        qualityTier: 'Grade AAA Raw Chilled',
        gillColor: 'Clear Translucent Shell',
        hasangScore: 9.8,
        iceCondition: 'Chilled Slurry Ice (-2°C)',
        pricePerKg: 590,
        startingBidPerKg: 560,
        currentTopBidPerKg: 610,
        banyeraWeightKg: 30,
        availableBanyeras: 7,
        landingTime: '18 mins ago • Pier 2 Bay A',
        vesselOrigin: 'Capiz Coastal Prawn Carrier',
        isAntiLayeredVerified: true,
        checkerBadge: 'Pareng Jun (Tally ID #108)',
        poolAllocations: [],
        image: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=800&q=80',
        freshProofNote: 'Intact heads and antennae, tight firm shell adherence, clean salt scent.'
    }
];

// ==========================================
// 3. SYNTHESIZED WEB AUDIO TRUCK HORN
// ("BEEP BEEP / HONK" EFFECT WITH NO EXTERNAL DEPENDENCIES)
// ==========================================
const playTruckHornSound = () => {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return false;
        const ctx = new AudioContext();
        if (ctx.state === 'suspended') {
            ctx.resume();
        }

        const triggerChirp = (timeOffset, duration) => {
            const osc1 = ctx.createOscillator();
            const osc2 = ctx.createOscillator();
            const gain = ctx.createGain();
            const filter = ctx.createBiquadFilter();

            // Authentic brassy vehicle horn frequencies
            osc1.type = 'sawtooth';
            osc2.type = 'sawtooth';
            osc1.frequency.setValueAtTime(370, ctx.currentTime + timeOffset);
            osc2.frequency.setValueAtTime(460, ctx.currentTime + timeOffset);

            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(1400, ctx.currentTime + timeOffset);

            gain.gain.setValueAtTime(0, ctx.currentTime + timeOffset);
            gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + timeOffset + 0.04);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + timeOffset + duration);

            osc1.connect(filter);
            osc2.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);

            osc1.start(ctx.currentTime + timeOffset);
            osc2.start(ctx.currentTime + timeOffset);
            osc1.stop(ctx.currentTime + timeOffset + duration);
            osc2.stop(ctx.currentTime + timeOffset + duration);
        };

        // Double-tap truck horn: "Beep! Beep!"
        triggerChirp(0, 0.28);
        triggerChirp(0.34, 0.40);
        return true;
    } catch (err) {
        console.warn("AudioContext awaiting interaction:", err);
        return false;
    }
};

export default function App() {
    // ==========================================
    // 4. CORE STATE
    // RULE: Set Light Mode as default upon initial load!
    // ==========================================
    const [theme, setTheme] = useState('light'); // 'light' is the system default!
    const [language, setLanguage] = useState('taglish'); // en, tl, taglish
    const [activeTab, setActiveTab] = useState('listings'); // listings, pooling, calculator, inspector, offline, dashboard
    const [isOnline, setIsOnline] = useState(true);

    // Half-Page Animated Intro Overlay State
    const [showHalfPageOverlay, setShowHalfPageOverlay] = useState(true);
    const [isOverlayFadingOut, setIsOverlayFadingOut] = useState(false);
    const [hornPlayedCount, setHornPlayedCount] = useState(0);

    // Multi-Role Authentication State
    const [currentRole, setCurrentRole] = useState('vendor'); // 'vendor', 'checker', 'broker'
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [authActiveTab, setAuthActiveTab] = useState('vendor'); // 'vendor', 'checker', 'broker'
    const [authCredentials, setAuthCredentials] = useState({
        phone: '0917-882-9912',
        pin: '2026',
        checkerId: 'TC-NAV-402',
        dockStation: 'Pier 1 Bay A',
        brokerLicense: 'BKR-NAV-9901',
        brokerPassword: '••••••••',
        twoFactorCode: '882103'
    });

    // Fish Listings State
    const [fishListings, setFishListings] = useState(RAW_FRESH_CATCHES);
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All');

    // Portion Claim Modal State
    const [claimModalFish, setClaimModalFish] = useState(null);
    const [portionKgToClaim, setPortionKgToClaim] = useState(10);

    // Toast Notification
    const [toastMessage, setToastMessage] = useState(null);

    // Calculator State (5% Capped Commission, Port Fee, Handling)
    const [calcInputs, setCalcInputs] = useState({
        fishPricePerKg: 185,
        weightKg: 40,
        portFeePerKg: 2.50,
        brokerCommissionPercent: 5.0, // Capped at 5% max
        iceTubCharge: 60
    });

    // Offline Sync Queue (Simulated IndexedDB/PouchDB)
    const [offlineSyncQueue, setOfflineSyncQueue] = useState([
        {
            id: 'SYNC-NAV-771',
            action: 'Portion Claim: 10kg Galunggong',
            timestamp: '12:20 PM',
            vendor: 'Suki Aling Bebang',
            status: 'Stored Locally (PouchDB)',
            details: 'Reserved from Bañera #CAT-001'
        }
    ]);

    // User Passes & Transactions Ledger
    const [userPasses, setUserPasses] = useState([
        {
            passId: 'QR-DEAL-88902',
            fishName: 'Dagupan Blackfin Galunggong',
            weightKg: 10,
            totalPaid: 2020,
            pickupStatus: 'Ready at Pier 2 Dock B',
            generatedAt: '12:20 PM',
            escrowReleased: false,
            codeVal: 'DEAL-ESCROW-88902-VERIFIED'
        }
    ]);

    const t = TRANSLATIONS[language];

    // Helper Toast
    const showToast = (msg, type = 'success') => {
        setToastMessage({ msg, type });
        setTimeout(() => setToastMessage(null), 3800);
    };

    // ==========================================
    // 5. HALF-PAGE INTRO OVERLAY SEQUENCE & AUDIO
    // ==========================================
    useEffect(() => {
        if (showHalfPageOverlay) {
            // Attempt auto-triggering truck horn at 1.0s into transit
            const hornTimer1 = setTimeout(() => {
                playTruckHornSound();
                setHornPlayedCount(c => c + 1);
            }, 1000);

            // Second horn honk at 3.0s as it passes center
            const hornTimer2 = setTimeout(() => {
                playTruckHornSound();
                setHornPlayedCount(c => c + 1);
            }, 3000);

            // At 5.4s, begin smooth fade-out of the half-page overlay
            const fadeTimer = setTimeout(() => {
                setIsOverlayFadingOut(true);
            }, 5400);

            // At 6.2s, dismiss the overlay completely and bring full focus to homepage
            const dismissTimer = setTimeout(() => {
                setShowHalfPageOverlay(false);
                setIsOverlayFadingOut(false);
            }, 6200);

            return () => {
                clearTimeout(hornTimer1);
                clearTimeout(hornTimer2);
                clearTimeout(fadeTimer);
                clearTimeout(dismissTimer);
            };
        }
    }, [showHalfPageOverlay]);

    const handleReplayIntro = () => {
        setIsOverlayFadingOut(false);
        setShowHalfPageOverlay(true);
        setTimeout(() => {
            playTruckHornSound();
        }, 800);
    };

    const handleManualHonk = () => {
        playTruckHornSound();
        showToast("📢 BEEP BEEP! DEAL Reefer Truck Horn Sounded!", "info");
    };

    const handleDismissOverlayNow = () => {
        setIsOverlayFadingOut(true);
        setTimeout(() => {
            setShowHalfPageOverlay(false);
            setIsOverlayFadingOut(false);
        }, 300);
    };

    // ==========================================
    // 6. THEME TOGGLE (LIGHT AS DEFAULT / DUAL-TONE DARK)
    // ==========================================
    const toggleTheme = () => {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    };

    // Calculator Math Memo
    const calculatedTaripa = useMemo(() => {
        const baseTotal = calcInputs.fishPricePerKg * calcInputs.weightKg;
        const totalPortFee = calcInputs.portFeePerKg * calcInputs.weightKg;
        const cappedCommRate = Math.min(calcInputs.brokerCommissionPercent, 5.0);
        const brokerCommission = baseTotal * (cappedCommRate / 100);
        const iceTub = Number(calcInputs.iceTubCharge);
        const grandTotal = baseTotal + totalPortFee + brokerCommission + iceTub;
        const effectivePricePerKg = grandTotal / (calcInputs.weightKg || 1);

        return {
            baseTotal,
            totalPortFee,
            cappedCommRate,
            brokerCommission,
            iceTub,
            grandTotal,
            effectivePricePerKg
        };
    }, [calcInputs]);

    // Filtered Catches Memo (Strict Raw Seafood)
    const filteredCatches = useMemo(() => {
        return fishListings.filter(f => {
            const matchesSearch = f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                f.localTerm.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCat = categoryFilter === 'All' || f.category === categoryFilter;
            return matchesSearch && matchesCat;
        });
    }, [fishListings, searchQuery, categoryFilter]);

    // ==========================================
    // 7. ACTION HANDLERS
    // ==========================================
    const handleLoginSubmit = (e) => {
        if (e) e.preventDefault();
        setCurrentRole(authActiveTab);
        setIsLoggedIn(true);
        setShowAuthModal(false);
        showToast(`🔒 Authenticated as ${authActiveTab === 'vendor' ? 'Micro-Vendor' : authActiveTab === 'checker' ? 'Pier Checker' : 'Consignee Broker'} • Secured Port Token Issued!`);
    };

    const handleClaimPortion = (fish, weightToClaim) => {
        const currentClaimed = fish.poolAllocations.reduce((sum, item) => sum + item.weight, 0);
        const remaining = fish.banyeraWeightKg - currentClaimed;

        if (weightToClaim > remaining) {
            showToast(`Cannot claim ${weightToClaim}kg! Only ${remaining}kg remaining in this bañera.`, 'error');
            return;
        }

        const newAllocation = {
            id: 'p_' + Date.now(),
            vendor: currentRole === 'vendor' ? 'My Suki Stall (You)' : 'Authorized Port Vendor',
            weight: weightToClaim,
            claimedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        const baseVal = fish.pricePerKg * weightToClaim;
        const commVal = baseVal * 0.05;
        const portVal = 2.50 * weightToClaim;
        const portionTotal = Math.round(baseVal + commVal + portVal + 15);

        const newPass = {
            passId: `QR-DEAL-${Math.floor(10000 + Math.random() * 90000)}`,
            fishName: fish.localTerm,
            weightKg: weightToClaim,
            totalPaid: portionTotal,
            pickupStatus: 'Reserved at Pier Gate Escrow Bay',
            generatedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            escrowReleased: false,
            codeVal: `DEAL-ESCROW-${Date.now()}-VERIFIED`
        };

        if (!isOnline) {
            const offlineItem = {
                id: `SYNC-${Math.floor(1000 + Math.random() * 9000)}`,
                action: `Offline Portion Claim: ${weightToClaim}kg ${fish.name}`,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                vendor: 'You (Local Offline Storage)',
                status: 'Stored Locally (PouchDB)',
                details: `Pass ${newPass.passId} cached offline`
            };
            setOfflineSyncQueue(prev => [offlineItem, ...prev]);
            showToast(`⚡ Stored in Local Offline Storage! Pass ${newPass.passId} will sync automatically once signal returns.`, 'warning');
        } else {
            showToast(`✅ Bañera portion secured! Issued Pass: ${newPass.passId}`, 'success');
        }

        setFishListings(prev => prev.map(f => {
            if (f.id === fish.id) {
                return {
                    ...f,
                    poolAllocations: [...f.poolAllocations, newAllocation]
                };
            }
            return f;
        }));

        setUserPasses(prev => [newPass, ...prev]);
        setClaimModalFish(null);
    };

    const handleReleaseEscrow = (passId) => {
        setUserPasses(prev => prev.map(p => p.passId === passId ? { ...p, escrowReleased: true, pickupStatus: 'Inspected & Escrow Released' } : p));
        showToast(`🛡️ Quality physical inspection passed! Escrow funds released to Broker for Pass #${passId}.`);
    };

    const handleSimulateSync = () => {
        if (offlineSyncQueue.length === 0) {
            showToast("No pending offline items to sync!", "info");
            return;
        }
        showToast("🔄 Syncing local IndexedDB/PouchDB with Port Central Network...", "info");
        setTimeout(() => {
            setOfflineSyncQueue([]);
            showToast("✨ Offline Sync Successful! All tallies, bids, and passes recorded on chain.", "success");
        }, 1600);
    };

    return (
        <div className={`min-h-screen font-sans flex flex-col selection:bg-[#93C5FD] selection:text-[#0F172A] transition-colors duration-200 relative ${theme === 'light'
            ? 'bg-[#F8FAFC] text-[#0F172A]' // LIGHT MODE DEFAULT: Clean neutral bg, plain blue accents, no gradients
            : 'bg-[#0F172A] text-[#F8FAFC]' // DARK MODE: Dual-tone #1E293B containers on #0F172A deep navy with blue #2563EB highlights
            }`}>

            {/* ======================================================== */}
            {/* 1. ANIMATED HALF-PAGE INTRO OVERLAY (ANCHORED OVER MAIN)  */}
            {/* TRUCK TRANSITS SLOWLY LEFT-TO-RIGHT WITH BEEP-BEEP AUDIO */}
            {/* ======================================================== */}
            {showHalfPageOverlay && (
                <div className={`fixed inset-0 z-50 flex items-start justify-center pt-8 sm:pt-14 px-4 bg-black/60 backdrop-blur-sm transition-opacity duration-700 ${isOverlayFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
                    }`}>

                    {/* Half-Page Modal Card: Solid, Plain Color Background (No Gradients) */}
                    <div className={`w-full max-w-4xl rounded-3xl border-2 shadow-2xl overflow-hidden relative ${theme === 'light'
                        ? 'bg-[#1D396B] border-[#8AAEE0] text-white' // Solid plain deep blue container
                        : 'bg-[#1E293B] border-[#3B82F6] text-white' // Solid dark slate container
                        }`}>

                        {/* Top Chrome Pin-Stripe Bar (Jeepney Heritage Accent) */}
                        <div className="h-1.5 w-full bg-[#CBD5E1] flex">
                            <div className="w-1/3 h-full bg-[#FFFFFF]"></div>
                            <div className="w-1/3 h-full bg-[#2563EB]"></div>
                            <div className="w-1/3 h-full bg-[#93C5FD]"></div>
                        </div>

                        {/* Overlay Header Controls */}
                        <div className="px-5 pt-4 pb-2 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="bg-[#2563EB] text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-[#93C5FD]">
                                    NAVPORTECH ESCROW TRANSIT
                                </span>
                                <span className="text-xs font-bold text-[#93C5FD] hidden sm:inline">
                                    Navotas Pier Logistics Inbound
                                </span>
                            </div>

                            {/* Sound & Skip Controls */}
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handleManualHonk}
                                    className="px-2.5 py-1 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-lg text-xs font-bold flex items-center gap-1 transition shadow"
                                    title="Sound truck horn"
                                >
                                    <Volume2 className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                                    <span>Beep Horn!</span>
                                </button>
                                <button
                                    onClick={handleDismissOverlayNow}
                                    className="p-1 text-slate-300 hover:text-white rounded-lg transition"
                                    title="Skip to homepage"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Animated Truck Track Area */}
                        <div className="relative w-full h-44 overflow-hidden flex items-end px-4">

                            {/* Road Line with Asphalt Markers */}
                            <div className="absolute bottom-5 left-0 right-0 h-1 bg-[#475569] flex items-center justify-between px-2">
                                {[...Array(28)].map((_, i) => (
                                    <div key={i} className="w-6 h-1 bg-[#93C5FD] mx-2 flex-shrink-0"></div>
                                ))}
                            </div>

                            {/* Truck Moving Steadily from LEFT TO RIGHT (Slow & Deliberate) */}
                            <div className="animate-truck-l2r flex items-end mb-5">
                                <div className="relative flex items-end">

                                    {/* Cold Smoke / Chilled Mist Trailing Behind Left */}
                                    <div className="absolute -left-10 bottom-4 flex items-center gap-1 opacity-75">
                                        <div className="w-3.5 h-3.5 rounded-full bg-[#93C5FD] blur-sm animate-ping"></div>
                                        <div className="w-6 h-6 rounded-full bg-white blur-md"></div>
                                    </div>

                                    {/* 1. Refrigerated Cargo Box (Left side of truck) */}
                                    <div className="w-52 h-26 bg-[#0F172A] border-2 border-[#93C5FD] rounded-l-xl p-2 flex flex-col justify-between shadow-2xl relative">

                                        {/* Chrome Line Trim */}
                                        <div className="flex justify-between items-center text-[9px] text-[#93C5FD] font-bold border-b border-[#334155] pb-0.5">
                                            <span>COLD REEFER #08</span>
                                            <span className="text-emerald-400 font-black">-3°C CHILLED</span>
                                        </div>

                                        {/* Prominent System Title on Body: DEAL */}
                                        <div className="text-center my-auto">
                                            <div className="text-2xl font-black tracking-widest text-white uppercase font-mono drop-shadow">
                                                DEAL
                                            </div>
                                            <div className="text-[9px] font-black tracking-wider text-[#93C5FD] uppercase">
                                                Digital Consignation Logistics
                                            </div>
                                        </div>

                                        {/* Bottom Chrome Stripe */}
                                        <div className="h-1 w-full bg-[#93C5FD] rounded-sm"></div>
                                    </div>

                                    {/* 2. Truck Cab (Facing Right) */}
                                    <div className="w-22 h-20 bg-[#1E3A8A] border-2 border-[#93C5FD] rounded-r-2xl relative shadow-2xl p-1.5 flex flex-col justify-between">

                                        {/* Animated Horn Sound Wave Badge above Cab */}
                                        <div className="absolute -top-7 -right-2 bg-amber-400 text-slate-950 font-black text-[9px] px-2 py-0.5 rounded-full animate-horn flex items-center gap-1 shadow-md">
                                            <span>📣</span>
                                            <span>BEEP BEEP!</span>
                                        </div>

                                        {/* Cab Windshield (Facing forward to right) */}
                                        <div className="w-12 h-8 bg-[#93C5FD]/35 border border-[#93C5FD] rounded-tr-xl ml-auto"></div>

                                        {/* Front Chrome Bumper & Headlights */}
                                        <div className="w-full h-3.5 bg-[#CBD5E1] border-t border-white rounded-sm flex items-center justify-around px-1">
                                            <div className="w-2 h-2 rounded-full bg-amber-300 animate-pulse shadow-[0_0_8px_#FBBF24]"></div>
                                            <div className="w-2 h-2 rounded-full bg-amber-300 animate-pulse shadow-[0_0_8px_#FBBF24]"></div>
                                        </div>
                                    </div>

                                    {/* Spinning Wheels (Clockwise Forward Translation) */}
                                    <div className="absolute -bottom-3.5 left-5 w-8 h-8 rounded-full bg-slate-900 border-2 border-[#93C5FD] flex items-center justify-center animate-wheel-forward shadow-md">
                                        <div className="w-3.5 h-3.5 rounded-full bg-[#CBD5E1] border border-slate-900"></div>
                                    </div>
                                    <div className="absolute -bottom-3.5 left-36 w-8 h-8 rounded-full bg-slate-900 border-2 border-[#93C5FD] flex items-center justify-center animate-wheel-forward shadow-md">
                                        <div className="w-3.5 h-3.5 rounded-full bg-[#CBD5E1] border border-slate-900"></div>
                                    </div>
                                    <div className="absolute -bottom-3.5 right-3 w-8 h-8 rounded-full bg-slate-900 border-2 border-[#93C5FD] flex items-center justify-center animate-wheel-forward shadow-md">
                                        <div className="w-3.5 h-3.5 rounded-full bg-[#CBD5E1] border border-slate-900"></div>
                                    </div>

                                </div>
                            </div>

                        </div>

                        {/* Overlay Bottom Banner & Title Reveal */}
                        <div className="px-5 py-4 border-t border-slate-700/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
                            <div>
                                <h3 className="text-xl sm:text-2xl font-black tracking-wider uppercase font-mono text-white flex items-center justify-center sm:justify-start gap-2">
                                    <span>DEAL</span>
                                    <span className="text-xs bg-[#2563EB] text-white px-2 py-0.5 rounded font-sans font-bold">
                                        Navotas Consignation Hub
                                    </span>
                                </h3>
                                <p className="text-xs text-[#93C5FD] font-semibold mt-0.5">
                                    Digital Consignation System for Fisheries & Seafood Trade
                                </p>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handleDismissOverlayNow}
                                    className="px-5 py-2 bg-white text-[#1D396B] hover:bg-[#93C5FD] font-black text-xs uppercase tracking-wider rounded-xl transition shadow flex items-center gap-2"
                                >
                                    <span>Enter Consignation Floor</span>
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            )}

            {/* ======================================================== */}
            {/* 2. TOP SECURITY & NETWORK SHIELD STATUS INDICATOR        */}
            {/* ======================================================== */}
            <div className={`text-xs py-1.5 px-4 sm:px-6 flex flex-wrap items-center justify-between border-b transition-colors ${theme === 'light'
                ? 'bg-[#FFFFFF] border-[#E2E8F0] text-[#1D396B]'
                : 'bg-[#1E293B] border-[#334155] text-[#93C5FD]'
                }`}>

                {/* Explicit Firewall & Network Protection Indicator */}
                <div className="flex items-center gap-2 font-bold text-[11px]">
                    <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="uppercase tracking-wider font-extrabold">
                        {t.securedBadge}
                    </span>
                    <span className="opacity-40">•</span>
                    <span className="hidden sm:inline font-semibold">
                        {t.firewallActive}
                    </span>
                    <span className="opacity-40 hidden md:inline">•</span>
                    <span className="hidden md:inline text-emerald-600 dark:text-emerald-400 font-bold">
                        {t.sessionGuard}
                    </span>
                </div>

                {/* Right Quick Controls */}
                <div className="flex items-center gap-2.5 ml-auto text-xs">

                    {/* Replay Half-Page Overlay Button */}
                    <button
                        onClick={handleReplayIntro}
                        className="flex items-center gap-1 font-bold text-[11px] hover:underline text-[#2563EB] dark:text-[#93C5FD]"
                        title="Replay slow deliberate left-to-right truck transit and sound horn"
                    >
                        <Play className="w-3 h-3" />
                        <span className="hidden sm:inline">Replay Truck Transit</span>
                    </button>

                    {/* Manual Horn Test */}
                    <button
                        onClick={handleManualHonk}
                        className="p-1 rounded text-slate-500 hover:text-[#2563EB] transition"
                        title="Beep truck horn"
                    >
                        <Volume2 className="w-3.5 h-3.5" />
                    </button>

                    {/* Pier Online / Offline Signal Simulator */}
                    <button
                        onClick={() => {
                            const next = !isOnline;
                            setIsOnline(next);
                            showToast(
                                next
                                    ? "📶 Port Network Connected! Live dockside auction sync active."
                                    : "⚡ Cellular Signal Lost at Dock! Switched to Local Offline PWA storage.",
                                next ? "success" : "warning"
                            );
                        }}
                        className={`flex items-center gap-1 px-2 py-0.5 rounded font-bold border text-[11px] transition ${isOnline
                            ? theme === 'light' ? 'bg-emerald-50 border-emerald-400 text-emerald-800' : 'bg-[#0F172A] border-emerald-500/60 text-emerald-300'
                            : theme === 'light' ? 'bg-rose-50 border-rose-400 text-rose-800' : 'bg-rose-950 border-rose-500/60 text-rose-300 animate-pulse'
                            }`}
                        title="Toggle cellular connection simulation"
                    >
                        {isOnline ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
                        <span>{isOnline ? t.online : t.offline}</span>
                    </button>

                    {/* Light / Dark Mode Toggle (LIGHT DEFAULT) */}
                    <button
                        onClick={toggleTheme}
                        className={`p-1.5 rounded-lg border transition ${theme === 'light'
                            ? 'bg-[#F1F5F9] border-[#CBD5E1] text-[#1D396B] hover:bg-[#E2E8F0]'
                            : 'bg-[#0F172A] border-[#334155] text-amber-300 hover:bg-[#1E293B]'
                            }`}
                        title={theme === 'light' ? 'Switch to Dark Mode (Dual-tone)' : 'Switch to Light Mode'}
                    >
                        {theme === 'light' ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
                    </button>

                    {/* Language Switcher */}
                    <div className={`flex rounded border overflow-hidden text-[10px] font-bold ${theme === 'light' ? 'border-[#CBD5E1]' : 'border-[#334155]'
                        }`}>
                        <button
                            onClick={() => setLanguage('en')}
                            className={`px-1.5 py-0.5 ${language === 'en' ? 'bg-[#2563EB] text-white' : 'hover:bg-slate-200 dark:hover:bg-slate-700'}`}
                        >
                            EN
                        </button>
                        <button
                            onClick={() => setLanguage('tl')}
                            className={`px-1.5 py-0.5 ${language === 'tl' ? 'bg-[#2563EB] text-white' : 'hover:bg-slate-200 dark:hover:bg-slate-700'}`}
                        >
                            TL
                        </button>
                        <button
                            onClick={() => setLanguage('taglish')}
                            className={`px-1.5 py-0.5 ${language === 'taglish' ? 'bg-[#2563EB] text-white' : 'hover:bg-slate-200 dark:hover:bg-slate-700'}`}
                        >
                            TAGLISH
                        </button>
                    </div>

                </div>

            </div>

            {/* ======================================================== */}
            {/* 3. MAIN HEADER & JEEPNEY CHROME ACCENT LINE              */}
            {/* ======================================================== */}
            <header className={`sticky top-0 z-40 border-b transition-colors shadow-sm ${theme === 'light'
                ? 'bg-[#FFFFFF] border-[#E2E8F0]'
                : 'bg-[#1E293B] border-[#334155]'
                }`}>

                {/* Subtle Jeepney Chrome Line Accent (Metallic Silver & Blue) */}
                <div className="h-1 w-full bg-[#2563EB] flex">
                    <div className="w-1/4 h-full bg-[#CBD5E1]"></div>
                    <div className="w-1/2 h-full bg-[#1D396B]"></div>
                    <div className="w-1/4 h-full bg-[#93C5FD]"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">

                    {/* Brand Logo & Route Placard */}
                    <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
                        <div className="flex items-center gap-2.5">

                            {/* Stylized Chrome Badge */}
                            <div className="w-10 h-10 rounded-xl bg-[#1D396B] border-2 border-[#93C5FD] flex items-center justify-center text-white shadow-md font-black">
                                <Truck className="w-6 h-6 text-[#93C5FD]" />
                            </div>

                            <div>
                                <div className="flex items-center gap-2">
                                    <h1 className="font-black text-2xl tracking-wider uppercase font-mono text-[#1D396B] dark:text-white">
                                        DEAL
                                    </h1>
                                    <span className="bg-[#1D396B] text-[#93C5FD] border border-[#93C5FD] text-[10px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider">
                                        NAVOTAS
                                    </span>
                                </div>
                                <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                                    {t.subtitle}
                                </p>
                            </div>
                        </div>

                        {/* Traditional Hand-Painted Filipino Signage Placard */}
                        <div className={`hidden lg:flex items-center px-3 py-1 rounded-full text-xs font-bold border space-x-2 ${theme === 'light'
                            ? 'bg-[#F1F5F9] border-[#CBD5E1] text-[#1D396B]'
                            : 'bg-[#0F172A] border-[#334155] text-[#93C5FD]'
                            }`}>
                            <span className="text-[#2563EB] dark:text-[#93C5FD]">NAVOTAS PIER 1-3</span>
                            <span>➔</span>
                            <span>DIVISORIA</span>
                            <span>➔</span>
                            <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">SUKI PALENGKE</span>
                        </div>
                    </div>

                    {/* Role Access / Auth Trigger */}
                    <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">

                        {/* Current Role Indicator Pill */}
                        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold ${theme === 'light'
                            ? 'bg-[#F1F5F9] border-[#CBD5E1] text-[#1D396B]'
                            : 'bg-[#0F172A] border-[#334155] text-white'
                            }`}>
                            <Users className="w-3.5 h-3.5 text-[#2563EB] dark:text-[#93C5FD]" />
                            <span>
                                {currentRole === 'vendor' ? t.roleVendor : currentRole === 'checker' ? t.roleChecker : t.roleBroker}
                            </span>
                        </div>

                        {/* Sign In / Switch Role Button */}
                        <button
                            onClick={() => setShowAuthModal(true)}
                            className="px-3.5 py-1.5 bg-[#1D396B] hover:bg-[#2563EB] text-white border border-[#93C5FD] rounded-xl text-xs font-extrabold transition flex items-center gap-1.5 shadow"
                        >
                            <Lock className="w-3.5 h-3.5 text-[#93C5FD]" />
                            <span>{isLoggedIn ? 'Switch Portal' : 'Sign In'}</span>
                        </button>

                    </div>

                </div>

            </header>

            {/* ======================================================== */}
            {/* 4. NAVIGATION TABS BAR                                   */}
            {/* ======================================================== */}
            <nav className={`border-b sticky top-[69px] z-30 transition-colors ${theme === 'light'
                ? 'bg-[#FFFFFF] border-[#E2E8F0]'
                : 'bg-[#1E293B] border-[#334155]'
                }`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center space-x-2 py-2 overflow-x-auto text-xs font-bold">

                    <button
                        onClick={() => setActiveTab('listings')}
                        className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition whitespace-nowrap ${activeTab === 'listings'
                            ? 'bg-[#2563EB] text-white shadow-sm'
                            : theme === 'light' ? 'text-slate-600 hover:bg-[#F1F5F9]' : 'text-slate-300 hover:bg-[#0F172A]'
                            }`}
                    >
                        <ShoppingBag className="w-4 h-4" />
                        <span>{t.navListings}</span>
                        <span className="text-[10px] bg-[#1D396B] text-white px-1.5 py-0.2 rounded-full font-black">
                            Raw Only
                        </span>
                    </button>

                    <button
                        onClick={() => setActiveTab('pooling')}
                        className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition whitespace-nowrap ${activeTab === 'pooling'
                            ? 'bg-[#2563EB] text-white shadow-sm'
                            : theme === 'light' ? 'text-slate-600 hover:bg-[#F1F5F9]' : 'text-slate-300 hover:bg-[#0F172A]'
                            }`}
                    >
                        <Scale className="w-4 h-4" />
                        <span>{t.navPooling}</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('calculator')}
                        className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition whitespace-nowrap ${activeTab === 'calculator'
                            ? 'bg-[#2563EB] text-white shadow-sm'
                            : theme === 'light' ? 'text-slate-600 hover:bg-[#F1F5F9]' : 'text-slate-300 hover:bg-[#0F172A]'
                            }`}
                    >
                        <Calculator className="w-4 h-4" />
                        <span>{t.navCalculator}</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('inspector')}
                        className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition whitespace-nowrap ${activeTab === 'inspector'
                            ? 'bg-[#2563EB] text-white shadow-sm'
                            : theme === 'light' ? 'text-slate-600 hover:bg-[#F1F5F9]' : 'text-slate-300 hover:bg-[#0F172A]'
                            }`}
                    >
                        <ShieldCheck className="w-4 h-4" />
                        <span>{t.navInspector}</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('offline')}
                        className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition whitespace-nowrap ${activeTab === 'offline'
                            ? 'bg-[#2563EB] text-white shadow-sm'
                            : theme === 'light' ? 'text-slate-600 hover:bg-[#F1F5F9]' : 'text-slate-300 hover:bg-[#0F172A]'
                            }`}
                    >
                        <RefreshCw className={`w-4 h-4 ${offlineSyncQueue.length > 0 ? 'animate-spin text-amber-500' : ''}`} />
                        <span>{t.navOffline}</span>
                        {offlineSyncQueue.length > 0 && (
                            <span className="bg-amber-400 text-slate-950 text-[10px] px-1.5 rounded-full font-black">
                                {offlineSyncQueue.length}
                            </span>
                        )}
                    </button>

                    <button
                        onClick={() => setActiveTab('dashboard')}
                        className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition whitespace-nowrap ${activeTab === 'dashboard'
                            ? 'bg-[#2563EB] text-white shadow-sm'
                            : theme === 'light' ? 'text-slate-600 hover:bg-[#F1F5F9]' : 'text-slate-300 hover:bg-[#0F172A]'
                            }`}
                    >
                        <Receipt className="w-4 h-4" />
                        <span>{t.navDashboard}</span>
                        <span className="bg-[#1D396B] text-white text-[10px] px-1.5 rounded-full font-black">
                            {userPasses.length}
                        </span>
                    </button>

                </div>
            </nav>

            {/* ======================================================== */}
            {/* FLOATING TOAST NOTIFICATION                             */}
            {/* ======================================================== */}
            {toastMessage && (
                <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 w-11/12 max-w-md animate-bounce">
                    <div className={`p-3.5 rounded-2xl shadow-2xl border flex items-center gap-3 ${toastMessage.type === 'error'
                        ? 'bg-rose-900 border-rose-500 text-white'
                        : toastMessage.type === 'warning'
                            ? 'bg-amber-900 border-amber-500 text-white'
                            : 'bg-[#1D396B] border-[#93C5FD] text-white'
                        }`}>
                        <Sparkles className="w-5 h-5 text-[#93C5FD] flex-shrink-0" />
                        <p className="text-xs font-bold leading-tight">{toastMessage.msg}</p>
                    </div>
                </div>
            )}

            {/* ======================================================== */}
            {/* MAIN APP BODY CONTENT                                    */}
            {/* ======================================================== */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-5 pb-16 flex-grow w-full space-y-6">

                {/* ==================================================== */}
                {/* 1. FRESH CATCHES LISTINGS (STRICT RAW FISH CATALOG)   */}
                {/* ==================================================== */}
                {activeTab === 'listings' && (
                    <div className="space-y-5">

                        {/* Solid Blue Hero Card with Jeepney Accents (No Gradients) */}
                        <div className={`p-5 rounded-2xl border transition-colors shadow-sm relative overflow-hidden ${theme === 'light'
                            ? 'bg-[#FFFFFF] border-[#CBD5E1]'
                            : 'bg-[#1E293B] border-[#334155]'
                            }`}>

                            {/* Decorative Chrome Corner Accent */}
                            <div className="absolute top-0 right-0 w-28 h-2 bg-[#2563EB]"></div>

                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="bg-[#1D396B] text-white text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider border border-[#93C5FD]">
                                            RAW / UNPROCESSED ONLY
                                        </span>
                                        <span className="text-xs font-bold text-[#2563EB] dark:text-[#93C5FD]">
                                            Navotas Pier 1, 2 & 3 Dockside Inventory
                                        </span>
                                    </div>
                                    <h2 className="text-2xl font-black mt-1 uppercase tracking-wide font-mono text-[#1D396B] dark:text-white">
                                        Raw Seafood Consignation Floor
                                    </h2>
                                    <p className="text-xs mt-1 max-w-2xl font-medium text-slate-600 dark:text-slate-400">
                                        Mandatory raw seafood catalog: Galunggong, Salmon, Tilapia, Bangus, Yellowfin Tuna, and Sugpo. Strictly raw dockside arrivals inspected for gill freshness and anti-layering protection.
                                    </p>
                                </div>

                                <div className={`p-3 rounded-xl border flex items-center gap-3 ${theme === 'light' ? 'bg-[#F1F5F9] border-[#CBD5E1]' : 'bg-[#0F172A] border-[#334155]'
                                    }`}>
                                    <Clock className="w-5 h-5 text-[#2563EB] dark:text-[#93C5FD] animate-pulse" />
                                    <div>
                                        <div className="text-[10px] uppercase font-bold text-slate-400">Auction Engine</div>
                                        <div className="text-xs font-black text-emerald-600 dark:text-emerald-400">Real-Time Bids Active</div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* Search & Category Filter */}
                        <div className={`p-3.5 rounded-2xl border flex flex-col sm:flex-row gap-3 items-center justify-between ${theme === 'light' ? 'bg-[#FFFFFF] border-[#E2E8F0]' : 'bg-[#1E293B] border-[#334155]'
                            }`}>

                            {/* Search Input */}
                            <div className="relative w-full sm:w-80">
                                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search raw catch (Galunggong, Salmon, Tuna...)"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className={`w-full text-xs rounded-xl pl-9 pr-3 py-2 border outline-none font-medium transition ${theme === 'light'
                                        ? 'bg-[#F8FAFC] border-[#CBD5E1] text-[#0F172A] placeholder-slate-400 focus:border-[#2563EB]'
                                        : 'bg-[#0F172A] border-[#334155] text-white placeholder-slate-400 focus:border-[#3B82F6]'
                                        }`}
                                />
                            </div>

                            {/* Category Filter Pills */}
                            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
                                {['All', 'Pelagic', 'Finfish', 'Freshwater', 'Crustacean'].map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setCategoryFilter(cat)}
                                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${categoryFilter === cat
                                            ? 'bg-[#2563EB] text-white shadow-sm'
                                            : theme === 'light'
                                                ? 'bg-[#F1F5F9] text-slate-600 border border-[#CBD5E1] hover:bg-[#E2E8F0]'
                                                : 'bg-[#0F172A] text-slate-300 border border-[#334155] hover:bg-[#334155]'
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>

                        </div>

                        {/* Fresh Catches Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {filteredCatches.map((fish) => {
                                const totalClaimed = fish.poolAllocations.reduce((acc, i) => acc + i.weight, 0);
                                const remainingKg = fish.banyeraWeightKg - totalClaimed;
                                const poolPercent = Math.round((totalClaimed / fish.banyeraWeightKg) * 100);

                                return (
                                    <div
                                        key={fish.id}
                                        className={`rounded-2xl border overflow-hidden shadow-sm transition-transform hover:-translate-y-1 flex flex-col justify-between ${theme === 'light'
                                            ? 'bg-[#FFFFFF] border-[#E2E8F0]'
                                            : 'bg-[#1E293B] border-[#334155]'
                                            }`}
                                    >
                                        {/* Fresh Raw Catch Photo */}
                                        <div className="relative h-48 bg-slate-900 overflow-hidden">
                                            <img
                                                src={fish.image}
                                                alt={fish.name}
                                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                            />
                                            {/* Quality Tier Top Left */}
                                            <div className="absolute top-3 left-3 bg-[#1D396B]/90 border border-[#93C5FD] text-white px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow">
                                                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                                                <span>{fish.qualityTier}</span>
                                            </div>

                                            {/* Anti-Layering Status Top Right */}
                                            <div className="absolute top-3 right-3 bg-emerald-950/90 border border-emerald-400 text-emerald-300 px-2 py-0.5 rounded-lg text-[10px] font-extrabold uppercase flex items-center gap-1 shadow">
                                                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                                                <span>Suri-Isda Verified</span>
                                            </div>

                                            {/* Time Landed Bottom Left */}
                                            <div className="absolute bottom-2 left-3 text-[11px] text-white bg-slate-900/80 px-2 py-0.5 rounded font-medium flex items-center gap-1">
                                                <Clock className="w-3 h-3 text-[#93C5FD]" />
                                                <span>{fish.landingTime}</span>
                                            </div>
                                        </div>

                                        {/* Card Content */}
                                        <div className="p-4 space-y-3 flex-grow flex flex-col justify-between">
                                            <div>
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h3 className="font-black text-base uppercase font-mono text-[#1D396B] dark:text-white">
                                                            {fish.localTerm}
                                                        </h3>
                                                        <p className="text-[11px] text-[#2563EB] dark:text-[#93C5FD] italic font-semibold">
                                                            {fish.scientificName}
                                                        </p>
                                                    </div>
                                                    <span className="text-[10px] bg-[#1D396B] text-white px-2 py-0.5 rounded font-black uppercase border border-[#93C5FD]">
                                                        {fish.category}
                                                    </span>
                                                </div>

                                                {/* Freshness Proof Highlights */}
                                                <div className={`mt-2.5 p-2 rounded-xl text-[11px] border ${theme === 'light' ? 'bg-[#F8FAFC] border-[#E2E8F0]' : 'bg-[#0F172A] border-[#334155]'
                                                    }`}>
                                                    <div className="flex justify-between text-xs font-bold">
                                                        <span>Hasang Freshness:</span>
                                                        <span className="text-emerald-600 dark:text-emerald-400 font-black">{fish.hasangScore} / 10</span>
                                                    </div>
                                                    <div className="text-[10px] opacity-80 mt-0.5">
                                                        {fish.freshProofNote}
                                                    </div>
                                                </div>

                                                {/* Weight & Bañera Specs */}
                                                <div className="grid grid-cols-2 gap-2 mt-2.5 text-xs">
                                                    <div className={`p-2 rounded-xl border text-center ${theme === 'light' ? 'bg-[#F8FAFC] border-[#E2E8F0]' : 'bg-[#0F172A] border-[#334155]'
                                                        }`}>
                                                        <div className="text-[10px] opacity-70 uppercase font-bold">Bañera Capacity</div>
                                                        <div className="font-black text-sm">{fish.banyeraWeightKg} kg</div>
                                                    </div>
                                                    <div className={`p-2 rounded-xl border text-center ${theme === 'light' ? 'bg-[#F8FAFC] border-[#E2E8F0]' : 'bg-[#0F172A] border-[#334155]'
                                                        }`}>
                                                        <div className="text-[10px] opacity-70 uppercase font-bold">Stock at Pier</div>
                                                        <div className="font-black text-sm text-[#2563EB] dark:text-[#93C5FD]">{fish.availableBanyeras} Bañeras</div>
                                                    </div>
                                                </div>

                                                {/* Pricing / Live Auction Bid Box */}
                                                <div className={`mt-3 p-2.5 rounded-xl border flex items-center justify-between ${theme === 'light' ? 'bg-[#F8FAFC] border-[#E2E8F0]' : 'bg-[#0F172A] border-[#334155]'
                                                    }`}>
                                                    <div>
                                                        <div className="text-[10px] uppercase font-bold opacity-70">Top Bid / Taripa</div>
                                                        <div className="text-lg font-black text-emerald-600 dark:text-emerald-400">
                                                            ₱{fish.currentTopBidPerKg}
                                                            <span className="text-[10px] text-slate-400 font-normal"> / kg</span>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-[10px] opacity-70 uppercase font-bold">Per Bañera (40kg)</div>
                                                        <div className="text-sm font-extrabold text-[#2563EB] dark:text-[#93C5FD]">
                                                            ₱{(fish.currentTopBidPerKg * fish.banyeraWeightKg).toLocaleString()}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Hati-Hati Micro-Pooling Progress */}
                                                <div className="mt-3 space-y-1">
                                                    <div className="flex justify-between text-[11px] font-bold">
                                                        <span>Hati-Hati Bañera Allocation</span>
                                                        <span className="text-[#2563EB] dark:text-[#93C5FD]">{totalClaimed}kg / {fish.banyeraWeightKg}kg ({remainingKg}kg open)</span>
                                                    </div>
                                                    <div className="w-full h-2 bg-slate-300 dark:bg-slate-700 rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                                                            style={{ width: `${poolPercent}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Claim Button */}
                                            <div className="pt-3">
                                                <button
                                                    onClick={() => {
                                                        setClaimModalFish(fish);
                                                        setPortionKgToClaim(Math.min(10, remainingKg || 5));
                                                    }}
                                                    disabled={remainingKg <= 0}
                                                    className={`w-full py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-sm ${remainingKg <= 0
                                                        ? 'bg-slate-300 dark:bg-slate-700 text-slate-500 cursor-not-allowed'
                                                        : 'bg-[#1D396B] hover:bg-[#2563EB] text-white'
                                                        }`}
                                                >
                                                    <Scale className="w-4 h-4 text-[#93C5FD]" />
                                                    <span>{remainingKg <= 0 ? 'Bañera Fully Claimed' : 'Claim Portion (Hati-Hati)'}</span>
                                                </button>
                                            </div>

                                        </div>

                                    </div>
                                );
                            })}
                        </div>

                    </div>
                )}

                {/* ==================================================== */}
                {/* 2. HATI-HATI (MICRO-POOLING) TAB                     */}
                {/* ==================================================== */}
                {activeTab === 'pooling' && (
                    <div className="space-y-5">

                        <div className={`p-5 rounded-2xl border transition-colors shadow-sm ${theme === 'light' ? 'bg-[#FFFFFF] border-[#CBD5E1]' : 'bg-[#1E293B] border-[#334155]'
                            }`}>
                            <div className="flex items-center gap-2">
                                <span className="bg-[#1D396B] text-white text-[10px] font-black px-2 py-0.5 rounded uppercase">
                                    Anti-Predatory Pricing
                                </span>
                                <span className="text-xs font-bold text-[#2563EB] dark:text-[#93C5FD]">Micro-Vendor Suki Pool</span>
                            </div>
                            <h2 className="text-2xl font-black mt-1 uppercase font-mono text-[#1D396B] dark:text-white">
                                Hati-Hati Bañera Pooling Engine
                            </h2>
                            <p className="text-xs mt-1 max-w-2xl font-medium text-slate-600 dark:text-slate-400">
                                Micro-vendors with limited capital can co-buy high-volume whole bañeras (30kg - 50kg) at pier wholesale price. Locked into an escrow-protected QR pass.
                            </p>
                        </div>

                        {/* Active Pools Table */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {fishListings.map(fish => {
                                const totalClaimed = fish.poolAllocations.reduce((sum, item) => sum + item.weight, 0);
                                const remaining = fish.banyeraWeightKg - totalClaimed;

                                return (
                                    <div
                                        key={fish.id}
                                        className={`p-4 rounded-2xl border space-y-3 ${theme === 'light' ? 'bg-[#FFFFFF] border-[#CBD5E1]' : 'bg-[#1E293B] border-[#334155]'
                                            }`}
                                    >
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h3 className="font-black text-sm uppercase text-[#1D396B] dark:text-white">
                                                    {fish.localTerm}
                                                </h3>
                                                <div className="text-[11px] text-[#2563EB] dark:text-[#93C5FD] font-bold">
                                                    ₱{fish.pricePerKg}/kg • Total Bañera: {fish.banyeraWeightKg}kg
                                                </div>
                                            </div>
                                            <span className={`text-xs font-black px-2.5 py-1 rounded-full ${remaining > 0 ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-500' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                                                }`}>
                                                {remaining > 0 ? `${remaining}kg Available` : 'Completed'}
                                            </span>
                                        </div>

                                        {/* Allocations breakdown list */}
                                        <div className={`p-3 rounded-xl border space-y-1.5 text-xs ${theme === 'light' ? 'bg-[#F8FAFC] border-[#E2E8F0]' : 'bg-[#0F172A] border-[#334155]'
                                            }`}>
                                            <div className="font-extrabold text-[11px] uppercase text-[#2563EB] dark:text-[#93C5FD]">
                                                Current Suki Participants:
                                            </div>
                                            {fish.poolAllocations.length === 0 ? (
                                                <div className="text-[11px] opacity-70 italic">No portions claimed yet. Be the first to start this pool!</div>
                                            ) : (
                                                fish.poolAllocations.map(al => (
                                                    <div key={al.id} className="flex justify-between items-center text-[11px]">
                                                        <span>{al.vendor}</span>
                                                        <span className="font-black text-emerald-600 dark:text-emerald-400">{al.weight} kg ({al.claimedAt})</span>
                                                    </div>
                                                ))
                                            )}
                                        </div>

                                        {/* Quick Claim Button */}
                                        <button
                                            onClick={() => {
                                                setClaimModalFish(fish);
                                                setPortionKgToClaim(Math.min(10, remaining || 5));
                                            }}
                                            disabled={remaining <= 0}
                                            className={`w-full py-2 rounded-xl text-xs font-black uppercase transition flex items-center justify-center gap-2 ${remaining <= 0
                                                ? 'bg-slate-300 dark:bg-slate-700 text-slate-500 cursor-not-allowed'
                                                : 'bg-[#2563EB] hover:bg-[#1D4ED8] text-white'
                                                }`}
                                        >
                                            <Plus className="w-4 h-4" />
                                            <span>Join Pool & Claim Portion</span>
                                        </button>
                                    </div>
                                );
                            })}
                        </div>

                    </div>
                )}

                {/* ==================================================== */}
                {/* 3. TARIPA & TALLY CALCULATOR TAB                    */}
                {/* ==================================================== */}
                {activeTab === 'calculator' && (
                    <div className="max-w-4xl mx-auto space-y-5">

                        <div className={`p-5 rounded-2xl border transition-colors shadow-sm ${theme === 'light' ? 'bg-[#FFFFFF] border-[#CBD5E1]' : 'bg-[#1E293B] border-[#334155]'
                            }`}>
                            <div className="flex items-center gap-2">
                                <span className="bg-[#1D396B] text-white text-[10px] font-black px-2 py-0.5 rounded uppercase">
                                    Transparent Fees
                                </span>
                                <span className="text-xs font-bold text-[#2563EB] dark:text-[#93C5FD]">Standardized Pier Taripa</span>
                            </div>
                            <h2 className="text-2xl font-black mt-1 uppercase font-mono text-[#1D396B] dark:text-white">
                                Official Taripa & Broker Commission Calculator
                            </h2>
                            <p className="text-xs mt-1 font-medium text-slate-600 dark:text-slate-400">
                                Protects small fish vendors against hidden dockside charges. Automatically caps broker commission at 5.0% and itemizes port and ice tariffs.
                            </p>
                        </div>

                        {/* Interactive Calculator Form & Output */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                            {/* Inputs */}
                            <div className={`p-5 rounded-2xl border space-y-4 ${theme === 'light' ? 'bg-[#FFFFFF] border-[#E2E8F0]' : 'bg-[#1E293B] border-[#334155]'
                                }`}>
                                <h3 className="font-black text-sm uppercase text-[#1D396B] dark:text-white">
                                    Consignation Parameters
                                </h3>

                                <div className="space-y-3 text-xs">
                                    <div>
                                        <label className="block font-bold mb-1">Fish Base Price (₱ per kg)</label>
                                        <input
                                            type="number"
                                            value={calcInputs.fishPricePerKg}
                                            onChange={(e) => setCalcInputs({ ...calcInputs, fishPricePerKg: Number(e.target.value) })}
                                            className={`w-full p-2.5 rounded-xl border outline-none font-bold ${theme === 'light' ? 'bg-[#F8FAFC] border-[#CBD5E1] text-[#0F172A]' : 'bg-[#0F172A] border-[#334155] text-white'
                                                }`}
                                        />
                                    </div>

                                    <div>
                                        <label className="block font-bold mb-1">Total Weight (kg)</label>
                                        <input
                                            type="number"
                                            value={calcInputs.weightKg}
                                            onChange={(e) => setCalcInputs({ ...calcInputs, weightKg: Number(e.target.value) })}
                                            className={`w-full p-2.5 rounded-xl border outline-none font-bold ${theme === 'light' ? 'bg-[#F8FAFC] border-[#CBD5E1] text-[#0F172A]' : 'bg-[#0F172A] border-[#334155] text-white'
                                                }`}
                                        />
                                    </div>

                                    <div>
                                        <label className="block font-bold mb-1">Broker Commission Rate (% - Capped at 5%)</label>
                                        <input
                                            type="number"
                                            max="5"
                                            value={calcInputs.brokerCommissionPercent}
                                            onChange={(e) => setCalcInputs({ ...calcInputs, brokerCommissionPercent: Number(e.target.value) })}
                                            className={`w-full p-2.5 rounded-xl border outline-none font-bold ${theme === 'light' ? 'bg-[#F8FAFC] border-[#CBD5E1] text-[#0F172A]' : 'bg-[#0F172A] border-[#334155] text-white'
                                                }`}
                                        />
                                        <p className="text-[10px] text-amber-600 dark:text-amber-400 mt-1">Strict maximum 5.0% by Navotas Port Consignation rules.</p>
                                    </div>

                                    <div>
                                        <label className="block font-bold mb-1">Ice & Bañera Handling Fee (₱)</label>
                                        <input
                                            type="number"
                                            value={calcInputs.iceTubCharge}
                                            onChange={(e) => setCalcInputs({ ...calcInputs, iceTubCharge: Number(e.target.value) })}
                                            className={`w-full p-2.5 rounded-xl border outline-none font-bold ${theme === 'light' ? 'bg-[#F8FAFC] border-[#CBD5E1] text-[#0F172A]' : 'bg-[#0F172A] border-[#334155] text-white'
                                                }`}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Output Summary Card */}
                            <div className={`p-5 rounded-2xl border space-y-4 flex flex-col justify-between ${theme === 'light' ? 'bg-[#FFFFFF] border-[#E2E8F0]' : 'bg-[#1E293B] border-[#334155]'
                                }`}>
                                <div>
                                    <h3 className="font-black text-sm uppercase text-[#1D396B] dark:text-white">
                                        Itemized Taripa Receipt
                                    </h3>

                                    <div className={`mt-3 p-3.5 rounded-xl border space-y-2 text-xs ${theme === 'light' ? 'bg-[#F8FAFC] border-[#E2E8F0]' : 'bg-[#0F172A] border-[#334155]'
                                        }`}>
                                        <div className="flex justify-between">
                                            <span>Base Seafood Value:</span>
                                            <span className="font-bold">₱{calculatedTaripa.baseTotal.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Navotas Port Dock Fee (₱2.50/kg):</span>
                                            <span className="font-bold">₱{calculatedTaripa.totalPortFee.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between text-[#2563EB] dark:text-[#93C5FD]">
                                            <span>Broker Commission ({calculatedTaripa.cappedCommRate}% capped):</span>
                                            <span className="font-bold">₱{calculatedTaripa.brokerCommission.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Ice & Bañera Handling:</span>
                                            <span className="font-bold">₱{calculatedTaripa.iceTub.toLocaleString()}</span>
                                        </div>
                                        <div className="border-t pt-2 flex justify-between font-black text-sm text-emerald-600 dark:text-emerald-400">
                                            <span>Total Payable:</span>
                                            <span>₱{calculatedTaripa.grandTotal.toLocaleString()}</span>
                                        </div>
                                    </div>

                                    {/* Effective Per Kilo Result */}
                                    <div className="mt-4 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950 border border-emerald-500 text-center">
                                        <div className="text-[10px] text-emerald-800 dark:text-emerald-200 uppercase font-bold">Effective True Price</div>
                                        <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                                            ₱{calculatedTaripa.effectivePricePerKg.toFixed(2)}
                                            <span className="text-xs text-emerald-700 dark:text-emerald-200 font-normal"> / kg</span>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => showToast("🖨️ Official Taripa Receipt generated and downloaded to device.")}
                                    className="w-full py-2.5 bg-[#1D396B] text-white hover:bg-[#2563EB] rounded-xl text-xs font-black uppercase transition flex items-center justify-center gap-2"
                                >
                                    <Download className="w-4 h-4 text-[#93C5FD]" />
                                    <span>Download Taripa Statement</span>
                                </button>
                            </div>

                        </div>

                    </div>
                )}

                {/* ==================================================== */}
                {/* 4. SURI-ISDA QUALITY GUARD (ANTI-LAYERING CHECKER)   */}
                {/* ==================================================== */}
                {activeTab === 'inspector' && (
                    <div className="max-w-4xl mx-auto space-y-5">

                        <div className={`p-5 rounded-2xl border transition-colors shadow-sm ${theme === 'light' ? 'bg-[#FFFFFF] border-[#CBD5E1]' : 'bg-[#1E293B] border-[#334155]'
                            }`}>
                            <div className="flex items-center gap-2">
                                <span className="bg-[#1D396B] text-white text-[10px] font-black px-2 py-0.5 rounded uppercase">
                                    Anti-Patong Fraud Protection
                                </span>
                                <span className="text-xs font-bold text-[#2563EB] dark:text-[#93C5FD]">Dockside Verification</span>
                            </div>
                            <h2 className="text-2xl font-black mt-1 uppercase font-mono text-[#1D396B] dark:text-white">
                                Suri-Isda Quality & Anti-Layering Guard
                            </h2>
                            <p className="text-xs mt-1 font-medium text-slate-600 dark:text-slate-400">
                                Eliminates the fraudulent practice of "patong" (placing large, fresh fish on top of a bañera while hiding stale, damaged fish at the bottom). Checked and signed off with multi-angle digital proof.
                            </p>
                        </div>

                        {/* Inspector Checklist */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                            <div className={`p-4 rounded-2xl border space-y-2 text-center ${theme === 'light' ? 'bg-[#FFFFFF] border-[#CBD5E1]' : 'bg-[#1E293B] border-[#334155]'
                                }`}>
                                <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
                                <h4 className="font-black text-sm uppercase">Bottom Core Sample</h4>
                                <p className="text-[11px] opacity-75">Bottom layer fish pulled and inspected for matching weight and freshness.</p>
                                <span className="inline-block bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-500 text-[10px] font-black px-2 py-0.5 rounded uppercase">Passed</span>
                            </div>

                            <div className={`p-4 rounded-2xl border space-y-2 text-center ${theme === 'light' ? 'bg-[#FFFFFF] border-[#CBD5E1]' : 'bg-[#1E293B] border-[#334155]'
                                }`}>
                                <Sparkles className="w-8 h-8 text-[#2563EB] dark:text-[#93C5FD] mx-auto" />
                                <h4 className="font-black text-sm uppercase">Gill & Eye Score</h4>
                                <p className="text-[11px] opacity-75">Cornea transparency, non-sunken eyes, and bright scarlet/crimson hasang verified.</p>
                                <span className="inline-block bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-500 text-[10px] font-black px-2 py-0.5 rounded uppercase">9.8 / 10 Average</span>
                            </div>

                            <div className={`p-4 rounded-2xl border space-y-2 text-center ${theme === 'light' ? 'bg-[#FFFFFF] border-[#CBD5E1]' : 'bg-[#1E293B] border-[#334155]'
                                }`}>
                                <Camera className="w-8 h-8 text-[#2563EB] dark:text-[#93C5FD] mx-auto" />
                                <h4 className="font-black text-sm uppercase">Multi-Angle Proofs</h4>
                                <p className="text-[11px] opacity-75">Timestamped dockside photos securely uploaded to the DEAL chain ledger.</p>
                                <span className="inline-block bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-500 text-[10px] font-black px-2 py-0.5 rounded uppercase">3 Photos Logged</span>
                            </div>

                        </div>

                        {/* Checker Station Sign-Off */}
                        <div className={`p-5 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 ${theme === 'light' ? 'bg-[#FFFFFF] border-[#CBD5E1]' : 'bg-[#1E293B] border-[#334155]'
                            }`}>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-xl bg-[#1D396B] border border-[#93C5FD] flex items-center justify-center font-black text-white">
                                    #402
                                </div>
                                <div>
                                    <div className="text-xs font-black uppercase text-[#1D396B] dark:text-white">Tally Officer: Mang Tomas</div>
                                    <div className="text-[11px] opacity-70">Pier 1 Tally Station • Badge #402</div>
                                    <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">Inspection Token: DEAL-SRI-2026-9901</div>
                                </div>
                            </div>

                            <button
                                onClick={() => showToast("🛡️ Suri-Isda Certification signed! Bañera batch approved for auction.")}
                                className="px-5 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-black text-xs uppercase rounded-xl shadow transition"
                            >
                                Validate New Bañera Batch
                            </button>
                        </div>

                    </div>
                )}

                {/* ==================================================== */}
                {/* 5. OFFLINE SYNC HUB                                  */}
                {/* ==================================================== */}
                {activeTab === 'offline' && (
                    <div className="max-w-4xl mx-auto space-y-5">

                        <div className={`p-5 rounded-2xl border transition-colors shadow-sm ${theme === 'light' ? 'bg-[#FFFFFF] border-[#CBD5E1]' : 'bg-[#1E293B] border-[#334155]'
                            }`}>
                            <div className="flex items-center gap-2">
                                <span className="bg-[#1D396B] text-white text-[10px] font-black px-2 py-0.5 rounded uppercase">
                                    Local PouchDB / IndexedDB
                                </span>
                                <span className="text-xs font-bold text-[#2563EB] dark:text-[#93C5FD]">Low-Signal Dockside PWA</span>
                            </div>
                            <h2 className="text-2xl font-black mt-1 uppercase font-mono text-[#1D396B] dark:text-white">
                                Offline Resilient Sync Hub
                            </h2>
                            <p className="text-xs mt-1 font-medium text-slate-600 dark:text-slate-400">
                                Dockside cell reception at the pier is notoriously erratic. DEAL caches all portion reservations, tallies, and bids in local browser storage and seamlessly syncs to the central port cloud upon signal reconnection.
                            </p>
                        </div>

                        {/* Sync Queue List */}
                        <div className={`p-5 rounded-2xl border space-y-4 ${theme === 'light' ? 'bg-[#FFFFFF] border-[#E2E8F0]' : 'bg-[#1E293B] border-[#334155]'
                            }`}>
                            <div className="flex justify-between items-center">
                                <h3 className="font-black text-sm uppercase text-[#1D396B] dark:text-white">
                                    Pending Transactions Queue ({offlineSyncQueue.length})
                                </h3>
                                <button
                                    onClick={handleSimulateSync}
                                    className="px-4 py-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-black text-xs uppercase rounded-xl transition flex items-center gap-1.5 shadow"
                                >
                                    <RefreshCw className="w-3.5 h-3.5" />
                                    <span>Sync to Cloud Now</span>
                                </button>
                            </div>

                            {offlineSyncQueue.length === 0 ? (
                                <div className="text-center py-8 text-xs opacity-75">
                                    <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
                                    All offline transactions are completely synchronized with Navotas Central Port Servers!
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    {offlineSyncQueue.map((item) => (
                                        <div
                                            key={item.id}
                                            className={`p-3 rounded-xl border flex items-center justify-between text-xs ${theme === 'light' ? 'bg-[#F8FAFC] border-[#E2E8F0]' : 'bg-[#0F172A] border-[#334155]'
                                                }`}
                                        >
                                            <div>
                                                <div className="font-extrabold">{item.action}</div>
                                                <div className="text-[11px] opacity-75">{item.details} • {item.timestamp}</div>
                                            </div>
                                            <span className="bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-500 text-[10px] font-black px-2 py-0.5 rounded uppercase">
                                                {item.status}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}

                        </div>

                    </div>
                )}

                {/* ==================================================== */}
                {/* 6. CONSIGNATION PASSES & ESCROW DASHBOARD            */}
                {/* ==================================================== */}
                {activeTab === 'dashboard' && (
                    <div className="max-w-4xl mx-auto space-y-5">

                        <div className={`p-5 rounded-2xl border transition-colors shadow-sm ${theme === 'light' ? 'bg-[#FFFFFF] border-[#CBD5E1]' : 'bg-[#1E293B] border-[#334155]'
                            }`}>
                            <div className="flex items-center gap-2">
                                <span className="bg-[#1D396B] text-white text-[10px] font-black px-2 py-0.5 rounded uppercase">
                                    Dock Gate Escrow
                                </span>
                                <span className="text-xs font-bold text-[#2563EB] dark:text-[#93C5FD]">Digital Consignation Passes</span>
                            </div>
                            <h2 className="text-2xl font-black mt-1 uppercase font-mono text-[#1D396B] dark:text-white">
                                My Consignation Passes & Escrow QR
                            </h2>
                            <p className="text-xs mt-1 font-medium text-slate-600 dark:text-slate-400">
                                Show your QR pass at the Pier Release Gate. Once the checker verifies the fish quality, scan to release escrow funds to the consignee broker.
                            </p>
                        </div>

                        {/* Passes List */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {userPasses.map((pass) => (
                                <div
                                    key={pass.passId}
                                    className={`p-5 rounded-2xl border space-y-4 shadow-sm flex flex-col justify-between ${theme === 'light' ? 'bg-[#FFFFFF] border-[#E2E8F0]' : 'bg-[#1E293B] border-[#334155]'
                                        }`}
                                >
                                    <div>
                                        <div className="flex justify-between items-center border-b pb-2">
                                            <div className="font-mono text-xs font-black text-[#2563EB] dark:text-[#93C5FD]">{pass.passId}</div>
                                            <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase ${pass.escrowReleased
                                                ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-500'
                                                : 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-500'
                                                }`}>
                                                {pass.pickupStatus}
                                            </span>
                                        </div>

                                        <div className="mt-3 flex items-center gap-3">
                                            {/* Stylized QR Code Box */}
                                            <div className="w-20 h-20 bg-white rounded-xl p-1.5 flex items-center justify-center border-2 border-[#1D396B] flex-shrink-0 shadow">
                                                <QrCode className="w-full h-full text-[#1D396B]" />
                                            </div>
                                            <div>
                                                <h4 className="font-black text-sm uppercase text-[#1D396B] dark:text-white">{pass.fishName}</h4>
                                                <div className="text-xs text-[#2563EB] dark:text-[#93C5FD] font-bold">Portion: {pass.weightKg} kg</div>
                                                <div className="text-xs font-black text-emerald-600 dark:text-emerald-400 mt-0.5">₱{pass.totalPaid.toLocaleString()} Total Paid</div>
                                                <div className="text-[10px] opacity-70 mt-1">Issued: {pass.generatedAt}</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        {!pass.escrowReleased ? (
                                            <button
                                                onClick={() => handleReleaseEscrow(pass.passId)}
                                                className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black uppercase transition flex items-center justify-center gap-2 shadow"
                                            >
                                                <ShieldCheck className="w-4 h-4" />
                                                <span>Scan & Release Escrow</span>
                                            </button>
                                        ) : (
                                            <div className="p-2 text-center text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 rounded-xl border border-emerald-500">
                                                ✅ Transaction Completed & Released
                                            </div>
                                        )}
                                    </div>

                                </div>
                            ))}
                        </div>

                    </div>
                )}

            </main>

            {/* ======================================================== */}
            {/* PORTION CLAIM MODAL (HATI-HATI QUICK ACTION)             */}
            {/* ======================================================== */}
            {claimModalFish && (
                <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4">
                    <div className={`w-full max-w-md rounded-2xl border p-5 space-y-4 shadow-2xl relative ${theme === 'light' ? 'bg-[#FFFFFF] border-[#1D396B] text-[#0F172A]' : 'bg-[#1E293B] border-[#3B82F6] text-white'
                        }`}>

                        <button
                            onClick={() => setClaimModalFish(null)}
                            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-white"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div>
                            <div className="text-[10px] font-black uppercase text-[#2563EB] dark:text-[#93C5FD]">Hati-Hati Portion Allocation</div>
                            <h3 className="text-lg font-black uppercase font-mono mt-0.5">{claimModalFish.localTerm}</h3>
                            <p className="text-xs opacity-80">Bañera Capacity: {claimModalFish.banyeraWeightKg}kg • ₱{claimModalFish.pricePerKg}/kg</p>
                        </div>

                        {/* Slider / Kg Selector */}
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs font-bold">
                                <span>Select Your Portion:</span>
                                <span className="text-emerald-600 dark:text-emerald-400 text-base font-black">{portionKgToClaim} kg</span>
                            </div>
                            <input
                                type="range"
                                min="1"
                                max={claimModalFish.banyeraWeightKg - claimModalFish.poolAllocations.reduce((sum, i) => sum + i.weight, 0)}
                                value={portionKgToClaim}
                                onChange={(e) => setPortionKgToClaim(Number(e.target.value))}
                                className="w-full accent-[#2563EB] cursor-pointer"
                            />
                            <div className="flex justify-between text-[10px] opacity-70">
                                <span>Min: 1 kg</span>
                                <span>Max available: {claimModalFish.banyeraWeightKg - claimModalFish.poolAllocations.reduce((sum, i) => sum + i.weight, 0)} kg</span>
                            </div>
                        </div>

                        {/* Cost Breakdown */}
                        <div className={`p-3 rounded-xl border text-xs space-y-1 ${theme === 'light' ? 'bg-[#F8FAFC] border-[#E2E8F0]' : 'bg-[#0F172A] border-[#334155]'
                            }`}>
                            <div className="flex justify-between">
                                <span>Base Portion Cost ({portionKgToClaim}kg × ₱{claimModalFish.pricePerKg}):</span>
                                <span className="font-bold">₱{(claimModalFish.pricePerKg * portionKgToClaim).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-[#2563EB] dark:text-[#93C5FD]">
                                <span>Broker Commission (5% max) & Port Taripa:</span>
                                <span className="font-bold">₱{Math.round(claimModalFish.pricePerKg * portionKgToClaim * 0.05 + portionKgToClaim * 2.50)}</span>
                            </div>
                            <div className="border-t pt-1 flex justify-between font-black text-emerald-600 dark:text-emerald-400">
                                <span>Total Payable (Escrow Locked):</span>
                                <span>₱{Math.round(claimModalFish.pricePerKg * portionKgToClaim * 1.05 + portionKgToClaim * 2.50 + 15).toLocaleString()}</span>
                            </div>
                        </div>

                        <button
                            onClick={() => handleClaimPortion(claimModalFish, portionKgToClaim)}
                            className="w-full py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-black text-xs uppercase rounded-xl transition shadow flex items-center justify-center gap-2"
                        >
                            <Lock className="w-4 h-4" />
                            <span>Confirm & Generate Escrow QR Pass</span>
                        </button>

                    </div>
                </div>
            )}

            {/* ======================================================== */}
            {/* MULTI-ROLE AUTHENTICATION MODAL (3 DISTINCT PORTALS)     */}
            {/* ======================================================== */}
            {showAuthModal && (
                <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
                    <div className={`w-full max-w-lg rounded-2xl border p-6 space-y-5 shadow-2xl relative ${theme === 'light' ? 'bg-[#FFFFFF] border-[#1D396B] text-[#0F172A]' : 'bg-[#1E293B] border-[#3B82F6] text-white'
                        }`}>

                        <button
                            onClick={() => setShowAuthModal(false)}
                            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-white"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Modal Header */}
                        <div>
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#1D396B] text-[#93C5FD] border border-[#93C5FD] text-[10px] font-extrabold uppercase mb-1">
                                <ShieldCheck className="w-3.5 h-3.5 text-[#93C5FD]" />
                                <span>Navotas Port Authority Verified Access</span>
                            </div>
                            <h3 className="text-xl font-black uppercase font-mono">{t.authTitle}</h3>
                            <p className="text-xs opacity-75">{t.authSubtitle}</p>
                        </div>

                        {/* 3 Portal Tabs */}
                        <div className={`p-1 rounded-xl border flex ${theme === 'light' ? 'bg-[#F1F5F9] border-[#CBD5E1]' : 'bg-[#0F172A] border-[#334155]'
                            }`}>
                            <button
                                onClick={() => setAuthActiveTab('vendor')}
                                className={`flex-1 py-2 text-xs font-extrabold rounded-lg transition ${authActiveTab === 'vendor'
                                    ? 'bg-[#2563EB] text-white shadow'
                                    : 'opacity-70 hover:opacity-100'
                                    }`}
                            >
                                Micro-Vendor
                            </button>
                            <button
                                onClick={() => setAuthActiveTab('checker')}
                                className={`flex-1 py-2 text-xs font-extrabold rounded-lg transition ${authActiveTab === 'checker'
                                    ? 'bg-[#2563EB] text-white shadow'
                                    : 'opacity-70 hover:opacity-100'
                                    }`}
                            >
                                Pier Checker
                            </button>
                            <button
                                onClick={() => setAuthActiveTab('broker')}
                                className={`flex-1 py-2 text-xs font-extrabold rounded-lg transition ${authActiveTab === 'broker'
                                    ? 'bg-[#2563EB] text-white shadow'
                                    : 'opacity-70 hover:opacity-100'
                                    }`}
                            >
                                Consignee Broker
                            </button>
                        </div>

                        {/* Forms tailored to role */}
                        <form onSubmit={handleLoginSubmit} className="space-y-3 text-xs">

                            {authActiveTab === 'vendor' && (
                                <>
                                    <div className={`p-2.5 rounded-xl border text-[11px] ${theme === 'light' ? 'bg-blue-50 border-blue-200 text-[#1D396B]' : 'bg-[#0F172A] border-[#334155] text-[#93C5FD]'
                                        }`}>
                                        📱 <strong>Micro-Vendor Fast Access:</strong> Enter mobile phone number or tap Quick Suki ID to access pooling and tingi passes.
                                    </div>
                                    <div>
                                        <label className="block font-bold mb-1">Mobile Phone Number</label>
                                        <div className="relative">
                                            <Smartphone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                            <input
                                                type="text"
                                                value={authCredentials.phone}
                                                onChange={(e) => setAuthCredentials({ ...authCredentials, phone: e.target.value })}
                                                placeholder="0917-xxx-xxxx"
                                                className={`w-full pl-9 pr-3 py-2 rounded-xl border outline-none font-bold ${theme === 'light' ? 'bg-[#F8FAFC] border-[#CBD5E1] text-[#0F172A]' : 'bg-[#0F172A] border-[#334155] text-white'
                                                    }`}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block font-bold mb-1">4-Digit Suki PIN</label>
                                        <div className="relative">
                                            <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                            <input
                                                type="password"
                                                maxLength="4"
                                                value={authCredentials.pin}
                                                onChange={(e) => setAuthCredentials({ ...authCredentials, pin: e.target.value })}
                                                className={`w-full pl-9 pr-3 py-2 rounded-xl border outline-none font-bold ${theme === 'light' ? 'bg-[#F8FAFC] border-[#CBD5E1] text-[#0F172A]' : 'bg-[#0F172A] border-[#334155] text-white'
                                                    }`}
                                            />
                                        </div>
                                    </div>
                                </>
                            )}

                            {authActiveTab === 'checker' && (
                                <>
                                    <div className={`p-2.5 rounded-xl border text-[11px] ${theme === 'light' ? 'bg-blue-50 border-blue-200 text-[#1D396B]' : 'bg-[#0F172A] border-[#334155] text-[#93C5FD]'
                                        }`}>
                                        ⚖️ <strong>Dockside Checker Rapid Login:</strong> Log weight scales, tally tallies, and record Suri-Isda anti-layering checks.
                                    </div>
                                    <div>
                                        <label className="block font-bold mb-1">Tally Officer Badge ID</label>
                                        <input
                                            type="text"
                                            value={authCredentials.checkerId}
                                            onChange={(e) => setAuthCredentials({ ...authCredentials, checkerId: e.target.value })}
                                            className={`w-full p-2.5 rounded-xl border outline-none font-bold ${theme === 'light' ? 'bg-[#F8FAFC] border-[#CBD5E1] text-[#0F172A]' : 'bg-[#0F172A] border-[#334155] text-white'
                                                }`}
                                        />
                                    </div>
                                    <div>
                                        <label className="block font-bold mb-1">Assigned Dockside Pier Station</label>
                                        <select
                                            value={authCredentials.dockStation}
                                            onChange={(e) => setAuthCredentials({ ...authCredentials, dockStation: e.target.value })}
                                            className={`w-full p-2.5 rounded-xl border outline-none font-bold ${theme === 'light' ? 'bg-[#F8FAFC] border-[#CBD5E1] text-[#0F172A]' : 'bg-[#0F172A] border-[#334155] text-white'
                                                }`}
                                        >
                                            <option value="Pier 1 Bay A">Pier 1 Bay A (Dagupan & GenSan Vessels)</option>
                                            <option value="Pier 2 Dock B">Pier 2 Dock B (Pelagic & Galunggong)</option>
                                            <option value="Pier 3 Slipway">Pier 3 Slipway (Freshwater & Laguna Barge)</option>
                                        </select>
                                    </div>
                                </>
                            )}

                            {authActiveTab === 'broker' && (
                                <>
                                    <div className={`p-2.5 rounded-xl border text-[11px] ${theme === 'light' ? 'bg-blue-50 border-blue-200 text-[#1D396B]' : 'bg-[#0F172A] border-[#334155] text-[#93C5FD]'
                                        }`}>
                                        💼 <strong>Consignee Broker Auction Suite:</strong> Manage bulk consignations, monitor live bids, and release escrow deposits.
                                    </div>
                                    <div>
                                        <label className="block font-bold mb-1">Broker Official License #</label>
                                        <input
                                            type="text"
                                            value={authCredentials.brokerLicense}
                                            onChange={(e) => setAuthCredentials({ ...authCredentials, brokerLicense: e.target.value })}
                                            className={`w-full p-2.5 rounded-xl border outline-none font-bold ${theme === 'light' ? 'bg-[#F8FAFC] border-[#CBD5E1] text-[#0F172A]' : 'bg-[#0F172A] border-[#334155] text-white'
                                                }`}
                                        />
                                    </div>
                                    <div>
                                        <label className="block font-bold mb-1">Security 2FA Port Passcode</label>
                                        <input
                                            type="text"
                                            value={authCredentials.twoFactorCode}
                                            onChange={(e) => setAuthCredentials({ ...authCredentials, twoFactorCode: e.target.value })}
                                            className={`w-full p-2.5 rounded-xl border outline-none font-bold ${theme === 'light' ? 'bg-[#F8FAFC] border-[#CBD5E1] text-[#0F172A]' : 'bg-[#0F172A] border-[#334155] text-white'
                                                }`}
                                        />
                                    </div>
                                </>
                            )}

                            {/* Explicit Security Indicator across Login Modal */}
                            <div className="pt-2 flex items-center justify-between text-[11px] text-[#2563EB] dark:text-[#93C5FD]">
                                <div className="flex items-center gap-1.5 font-bold">
                                    <Shield className="w-3.5 h-3.5" />
                                    <span>TLS 1.3 / AES-256 Bit Encrypted</span>
                                </div>
                                <span className="font-bold">Active Firewall Shield</span>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-black text-xs uppercase rounded-xl transition shadow mt-3"
                            >
                                Enter {authActiveTab === 'vendor' ? 'Micro-Vendor' : authActiveTab === 'checker' ? 'Pier Checker' : 'Broker'} Portal
                            </button>

                        </form>

                    </div>
                </div>
            )}

            {/* ======================================================== */}
            {/* FOOTER & JEEPNEY CHROME ACCENTS                          */}
            {/* ======================================================== */}
            <footer className={`mt-auto border-t py-6 text-xs transition-colors ${theme === 'light' ? 'bg-[#FFFFFF] border-[#E2E8F0] text-slate-600' : 'bg-[#1E293B] border-[#334155] text-[#93C5FD]'
                }`}>

                {/* Jeepney Chrome Line Bottom Accent */}
                <div className="h-0.5 w-full bg-[#2563EB] mb-4"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
                    <div>
                        <div className="font-mono font-black text-sm tracking-wider uppercase text-[#1D396B] dark:text-[#93C5FD]">
                            DEAL • DIGITAL CONSIGNATION SYSTEM
                        </div>
                        <div className="text-[11px] opacity-75">
                            Navotas Fish Port Complex • Fisheries & Seafood Digital Logistics
                        </div>
                    </div>

                    <div className="flex items-center gap-3 text-[11px] font-bold">
                        <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>Zero Fraud Port Escrow</span>
                        </span>
                        <span>•</span>
                        <span>Active Firewall Protected</span>
                        <span>•</span>
                        <span>Capped 5% Taripa</span>
                    </div>
                </div>

            </footer>

        </div>
    );
}