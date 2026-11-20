'use strict';

/**
 * AV Group Security - Language Module
 * Handles English ↔ Hindi translation toggle.
 * Uses data-i18n attributes on elements mapped to a translations dictionary.
 * Persists language preference in localStorage.
 */

const Language = (() => {

  const STORAGE_KEY = 'avgroup-lang';
  const DEFAULT_LANG = 'en';

  // ---------------------------------------------------------------------------
  // Hindi Translations
  // ---------------------------------------------------------------------------
  const hi = {

    // ── Navigation ──
    'nav.home': 'होम',
    'nav.about': 'हमारे बारे में',
    'nav.services': 'सेवाएँ',
    'nav.industries': 'उद्योग',
    'nav.clients': 'हमारे ग्राहक',
    'nav.contact': 'संपर्क करें',
    'nav.quote': 'कोटेशन लें',
    'nav.whatsapp': 'व्हाट्सएप करें',
    'brand.tagline': 'सुरक्षा एवं सुविधा प्रबंधन',

    // ── Hero ──
    'hero.label': 'मुंबई का विश्वसनीय सुरक्षा भागीदार',
    'hero.title': 'आपकी सुरक्षा।<br>हमारी <span class="accent">ज़िम्मेदारी।</span>',
    'hero.subtitle': 'बिना समझौता सुरक्षा।',
    'hero.desc': 'AV Group मुंबई भर में पेशेवर सुरक्षा और सुविधा प्रबंधन सेवाएँ प्रदान करता है। प्रशिक्षित सुरक्षा कर्मियों से लेकर एकीकृत सुविधा समाधान तक, हम आपकी विशिष्ट आवश्यकताओं के अनुसार विश्वसनीय सुरक्षा प्रदान करते हैं।',
    'hero.cta1': 'हमारी सेवाएँ देखें',
    'hero.cta2': 'कोटेशन अनुरोध करें',
    'hero.trust1': 'मुंबई स्थित',
    'hero.trust2': '24/7 संचालन',
    'hero.trust3': 'PSARA लाइसेंस प्राप्त',

    // ── Trust Bar ──
    'trust.t1.title': 'पेशेवर प्रशिक्षित कर्मी',
    'trust.t1.desc': 'कुशल और अनुशासित टीम सदस्य',
    'trust.t2.title': 'पृष्ठभूमि सत्यापित कर्मचारी',
    'trust.t2.desc': 'सभी कर्मियों की पूर्ण जाँच',
    'trust.t3.title': '24/7 संचालन केंद्र',
    'trust.t3.desc': 'चौबीसों घंटे निगरानी और सहायता',
    'trust.t4.title': 'अनुकूलित सुरक्षा समाधान',
    'trust.t4.desc': 'हर आवश्यकता के लिए विशेष सेवाएँ',

    // ── About ──
    'about.label': 'AV Group के बारे में',
    'about.heading': 'पेशेवर सुरक्षा के माध्यम से सुरक्षित स्थान बनाना',
    'about.p1': 'AV Group सुरक्षा एवं सुविधा प्रबंधन मुंबई स्थित एक कंपनी है जो पेशेवर सुरक्षा और सुविधा प्रबंधन सेवाएँ प्रदान करने के लिए समर्पित है। हम कॉर्पोरेट, आवासीय, औद्योगिक और वाणिज्यिक क्षेत्रों में विश्वसनीय, प्रशिक्षित कर्मियों के साथ ग्राहकों की सेवा करते हैं।',
    'about.p2': 'हमारा मिशन विश्वसनीय सुरक्षा समाधान प्रदान करना है जो हमारे ग्राहकों को आत्मविश्वास के साथ अपने मुख्य कार्यों पर ध्यान केंद्रित करने देता है। हमारे संस्थापक, हेमंत दुबे के नेतृत्व में, AV Group प्रत्येक तैनाती में उच्च मानक, अनुशासन और व्यावसायिकता बनाए रखने के लिए प्रतिबद्ध है।',
    'about.p3': 'हमारा विज़न मुंबई और व्यापक महाराष्ट्र क्षेत्र में सुरक्षा और सुविधा प्रबंधन में एक विश्वसनीय भागीदार के रूप में पहचाना जाना है।',
    'about.h1': 'मिशन संचालित',
    'about.h2': 'PSARA लाइसेंस प्राप्त',
    'about.h3': 'सत्यापित कर्मी',
    'about.h4': 'पूर्ण सुविधा समाधान',
    'about.cta': 'और जानें',

    // ── Stats ──
    'stats.s1.value': 'विश्वसनीय',
    'stats.s1.label': 'सुरक्षा कर्मी तैनाती',
    'stats.s2.value': '12+',
    'stats.s2.label': 'सेवा श्रेणियाँ',
    'stats.s3.value': 'बढ़ती',
    'stats.s3.label': 'ग्राहक संतुष्टि',
    'stats.s4.value': 'पेशेवर',
    'stats.s4.label': 'अनुभव',

    // ── Services ──
    'services.label': 'हमारी सेवाएँ',
    'services.heading': 'व्यापक सुरक्षा समाधान',
    'services.desc': 'हर सुरक्षा आवश्यकता के लिए पेशेवर सेवाएँ, चाहे कॉर्पोरेट सुरक्षा हो या सुविधा प्रबंधन।',
    'svc.guard.title': 'सुरक्षा गार्ड',
    'svc.guard.text': 'सभी आवश्यकताओं के लिए प्रशिक्षित और वर्दीधारी सुरक्षा कर्मी।',
    'svc.bouncer.title': 'बाउंसर',
    'svc.bouncer.text': 'स्थानों, क्लबों और निजी कार्यक्रमों के लिए पेशेवर बाउंसर।',
    'svc.vip.title': 'VIP सुरक्षा',
    'svc.vip.text': 'VIPs के लिए विवेकपूर्ण और पेशेवर व्यक्तिगत सुरक्षा सेवाएँ।',
    'svc.ex.title': 'पूर्व सैनिक',
    'svc.ex.text': 'उच्च-सुरक्षा तैनाती के लिए सेवानिवृत्त सैन्य कर्मी।',
    'svc.cctv.title': 'CCTV संस्थापन',
    'svc.cctv.text': 'पूर्ण निगरानी प्रणाली संस्थापन और मॉनिटरिंग समाधान।',
    'svc.corporate.title': 'कॉर्पोरेट सुरक्षा',
    'svc.corporate.text': 'कॉर्पोरेट कार्यालयों के लिए व्यापक सुरक्षा समाधान।',
    'svc.event.title': 'इवेंट सुरक्षा',
    'svc.event.text': 'सभी आकार के कार्यक्रमों के लिए संपूर्ण सुरक्षा प्रबंधन।',
    'svc.housekeeping.title': 'हाउसकीपिंग',
    'svc.housekeeping.text': 'स्वच्छ और सुव्यवस्थित परिसर के लिए पेशेवर सुविधा सफाई सेवाएँ।',
    'svc.manpower.title': 'मैनपावर सप्लाई',
    'svc.manpower.text': 'विभिन्न क्षेत्रों में व्यवसायों के लिए विश्वसनीय स्टाफिंग समाधान।',
    'svc.gunman.title': 'गनमैन',
    'svc.gunman.text': 'उच्च-जोखिम कार्यों के लिए लाइसेंस प्राप्त सशस्त्र सुरक्षा।',
    'svc.industrial.title': 'औद्योगिक सुरक्षा',
    'svc.industrial.text': 'कारखानों और औद्योगिक स्थलों के लिए विशेष सुरक्षा।',
    'svc.risk.title': 'जोखिम मूल्यांकन',
    'svc.risk.text': 'पेशेवर सुरक्षा ऑडिट और जोखिम मूल्यांकन सेवाएँ।',
    'svc.learnmore': 'और जानें',
    'services.toggle.show': 'सभी सेवाएँ देखें',
    'services.toggle.hide': 'कम दिखाएँ',

    // ── Industries ──
    'industries.label': 'हम जिन उद्योगों की सेवा करते हैं',
    'industries.heading': 'सभी क्षेत्रों में विश्वसनीय',
    'industries.desc': 'हम मुंबई भर में विविध उद्योगों को पेशेवर सुरक्षा और सुविधा प्रबंधन सेवाएँ प्रदान करते हैं।',
    'ind.corporate': 'कॉर्पोरेट कार्यालय',
    'ind.corporate.desc': 'कार्यालय परिसरों के लिए सुरक्षा समाधान',
    'ind.residential': 'आवासीय सोसाइटी',
    'ind.residential.desc': 'आवासीय समुदायों के लिए सुरक्षा',
    'ind.industrial': 'औद्योगिक सुविधाएँ',
    'ind.industrial.desc': 'कारखानों और गोदामों के लिए सुरक्षा',
    'ind.hotels': 'होटल और आतिथ्य',
    'ind.hotels.desc': 'आतिथ्य उद्योग के लिए सुरक्षा',
    'ind.malls': 'शॉपिंग मॉल',
    'ind.malls.desc': 'खुदरा स्थानों के लिए सुरक्षा प्रबंधन',
    'ind.events': 'इवेंट और प्रदर्शनी',
    'ind.events.desc': 'कार्यक्रमों के लिए सुरक्षा प्रबंधन',
    'ind.education': 'शैक्षणिक संस्थान',
    'ind.education.desc': 'स्कूल और कॉलेज सुरक्षा',
    'ind.construction': 'निर्माण स्थल',
    'ind.construction.desc': 'निर्माण परियोजनाओं के लिए सुरक्षा',

    // ── Why Choose Us ──
    'why.label': 'AV Group क्यों चुनें',
    'why.heading': 'हमें जो अलग बनाता है',
    'why.desc': 'हम हर परियोजना में गुणवत्ता, विश्वसनीयता और व्यावसायिकता प्रदान करने के लिए प्रतिबद्ध हैं।',
    'why.f1.title': 'प्रशिक्षित और सत्यापित पेशेवर',
    'why.f1.text': 'सभी कर्मियों की पूर्ण पृष्ठभूमि जाँच और पेशेवर प्रशिक्षण।',
    'why.f2.title': 'त्वरित तैनाती',
    'why.f2.text': 'तत्काल सुरक्षा आवश्यकताओं के लिए तेज़ प्रतिक्रिया।',
    'why.f3.title': '24/7 संचालन केंद्र',
    'why.f3.text': 'निरंतर सहायता के लिए चौबीसों घंटे निगरानी।',
    'why.f4.title': 'पेशेवर पर्यवेक्षण',
    'why.f4.text': 'गुणवत्ता नियंत्रण सुनिश्चित करने के लिए नियमित निरीक्षण।',
    'why.f5.title': 'अनुकूलित समाधान',
    'why.f5.text': 'आपकी विशिष्ट सुरक्षा आवश्यकताओं के अनुसार सेवाएँ।',
    'why.f6.title': 'एकीकृत सुविधा प्रबंधन',
    'why.f6.text': 'सुरक्षा और सुविधा प्रबंधन का संपूर्ण समाधान।',

    // ── Process ──
    'process.label': 'कैसे शुरू करें',
    'process.heading': 'हमारी प्रक्रिया',
    'process.desc': 'सुरक्षा सेवाएँ प्राप्त करना सरल और तेज़ है।',
    'process.s1.title': 'सेवा चुनें',
    'process.s1.text': 'अपनी आवश्यकता के अनुसार सेवा चुनें।',
    'process.s2.title': 'आवश्यकताएँ भेजें',
    'process.s2.text': 'अपनी विशिष्ट सुरक्षा आवश्यकताएँ साझा करें।',
    'process.s3.title': 'पुष्टि प्राप्त करें',
    'process.s3.text': 'हमारी टीम आपके विवरण की समीक्षा करेगी और पुष्टि करेगी।',
    'process.s4.title': 'कर्मी तैनाती',
    'process.s4.text': 'प्रशिक्षित कर्मी आपके स्थान पर तैनात किए जाएंगे।',

    // ── Testimonials ──
    'testimonials.label': 'ग्राहक प्रतिक्रिया',
    'testimonials.heading': 'हमारे ग्राहक क्या कहते हैं',
    'testimonials.desc': 'नमूना समीक्षाएँ - चित्रण उद्देश्य के लिए',
    'testimonial.1.quote': 'हमारे कॉर्पोरेट कार्यालय के लिए उत्कृष्ट सुरक्षा सेवाएँ। पेशेवर और विश्वसनीय टीम।',
    'testimonial.1.name': 'आर.एम.',
    'testimonial.1.role': 'कॉर्पोरेट ग्राहक, अंधेरी',
    'testimonial.2.quote': 'शानदार इवेंट सुरक्षा प्रबंधन। टीम त्वरित और सुव्यवस्थित थी।',
    'testimonial.2.name': 'पी.के.',
    'testimonial.2.role': 'इवेंट आयोजक, ठाणे',
    'testimonial.3.quote': 'औद्योगिक सुरक्षा समाधानों से बहुत संतुष्ट। अत्यधिक अनुशंसित।',
    'testimonial.3.name': 'ए.एस.',
    'testimonial.3.role': 'औद्योगिक ग्राहक, नवी मुंबई',

    // ── FAQ ──
    'faq.label': 'अक्सर पूछे जाने वाले प्रश्न',
    'faq.heading': 'सामान्य प्रश्न',
    'faq.q1': 'AV Group कौन सी सुरक्षा गार्ड सेवाएँ प्रदान करता है?',
    'faq.a1': 'AV Group आवासीय, वाणिज्यिक और औद्योगिक परिसरों के लिए प्रशिक्षित और वर्दीधारी सुरक्षा गार्ड प्रदान करता है। हमारे गार्ड पृष्ठभूमि सत्यापित हैं और पेशेवर रूप से प्रशिक्षित हैं।',
    'faq.q2': 'AV Group के माध्यम से बाउंसर कैसे बुक करें?',
    'faq.a2': 'आप हमारी वेबसाइट पर फॉर्म भरकर या सीधे WhatsApp पर +91 80976 49810 पर संपर्क करके बाउंसर बुक कर सकते हैं।',
    'faq.q3': 'कॉर्पोरेट सुरक्षा समाधान क्या उपलब्ध हैं?',
    'faq.a3': 'हम एक्सेस कंट्रोल, विज़िटर मैनेजमेंट, CCTV निगरानी और सुरक्षा नीति विकास सहित व्यापक कॉर्पोरेट सुरक्षा समाधान प्रदान करते हैं।',
    'faq.q4': 'क्या AV Group CCTV संस्थापन सेवाएँ प्रदान करता है?',
    'faq.a4': 'हाँ, हम पूर्ण CCTV और निगरानी प्रणाली डिज़ाइन, संस्थापन और रखरखाव सेवाएँ प्रदान करते हैं।',
    'faq.q5': 'मैनपावर सप्लाई सेवाएँ क्या हैं?',
    'faq.a5': 'हम विभिन्न क्षेत्रों में अस्थायी या स्थायी सहायक कर्मचारियों की आवश्यकता वाले व्यवसायों के लिए स्टाफिंग समाधान प्रदान करते हैं।',
    'faq.q6': 'आप मुंबई में कौन से क्षेत्रों में सेवाएँ देते हैं?',
    'faq.a6': 'हम पूरे मुंबई और मुंबई महानगर क्षेत्र (MMR) में सेवाएँ प्रदान करते हैं, जिसमें ठाणे, नवी मुंबई और आसपास के क्षेत्र शामिल हैं।',
    'faq.q7': 'क्या आपकी सेवाएँ 24/7 उपलब्ध हैं?',
    'faq.a7': 'हाँ, AV Group 24/7 उपलब्ध है। हमारा संचालन केंद्र चौबीसों घंटे काम करता है।',
    'faq.q8': 'कोटेशन कैसे प्राप्त करें?',
    'faq.a8': 'आप हमारी वेबसाइट पर फॉर्म भरकर या +91 80976 49810 पर WhatsApp करके निःशुल्क कोटेशन प्राप्त कर सकते हैं।',

    // ── Contact ──
    'contact.hero.title': 'संपर्क करें',
    'contact.hero.desc': 'पूछताछ, परामर्श, या अनुकूलित सुरक्षा कोटेशन के लिए हमारी टीम से संपर्क करें।',
    'contact.label': 'संपर्क करें',
    'contact.heading': 'अपनी सुरक्षा आवश्यकताओं पर चर्चा करें',
    'contact.desc': 'अपनी सुरक्षा आवश्यकताओं पर चर्चा करने के लिए हमारी टीम से संपर्क करें। हम निःशुल्क परामर्श और अनुकूलित कोटेशन प्रदान करते हैं।',
    'contact.phone': 'फ़ोन',
    'contact.whatsapp': 'व्हाट्सएप',
    'contact.location': 'स्थान',
    'contact.location.text': 'मुंबई, महाराष्ट्र, भारत',
    'contact.hours': 'समय',
    'contact.hours.text': '24/7 संचालन — हमेशा उपलब्ध',
    'contact.wa.link': 'WhatsApp पर संदेश भेजें',
    'form.name': 'पूरा नाम',
    'form.phone': 'फ़ोन नंबर',
    'form.email': 'ईमेल पता',
    'form.service': 'आवश्यक सेवा',
    'form.service.placeholder': 'सेवा चुनें',
    'form.location': 'स्थान',
    'form.personnel': 'कर्मियों की संख्या',
    'form.duration': 'अवधि',
    'form.duration.placeholder': 'अवधि चुनें',
    'form.duration.daily': 'दैनिक',
    'form.duration.weekly': 'साप्ताहिक',
    'form.duration.monthly': 'मासिक',
    'form.duration.project': 'परियोजना-आधारित',
    'form.message': 'संदेश',
    'form.submit': 'अनुरोध भेजें',
    'form.success': 'WhatsApp आपकी पूछताछ विवरण के साथ खोला गया है। कृपया सबमिशन पूरा करने के लिए WhatsApp में <strong>भेजें</strong> दबाएँ। हमारी टीम जल्द ही जवाब देगी!',

    // ── Footer ──
    'footer.desc': 'मुंबई स्थित पेशेवर सुरक्षा और सुविधा प्रबंधन सेवाएँ। हम आपकी सुरक्षा आवश्यकताओं के लिए विश्वसनीय, प्रशिक्षित और सत्यापित कर्मी प्रदान करने के लिए प्रतिबद्ध हैं।',
    'footer.services': 'सेवाएँ',
    'footer.quicklinks': 'त्वरित लिंक',
    'footer.contactus': 'संपर्क करें',
    'footer.copyright': '© 2025 AV Group. सर्वाधिकार सुरक्षित।',
    'footer.privacy': 'गोपनीयता नीति',
    'footer.terms': 'सेवा शर्तें',
    'footer.disclaimer': 'अस्वीकरण',
  };

  // ---------------------------------------------------------------------------
  // Core logic
  // ---------------------------------------------------------------------------

  let currentLang = DEFAULT_LANG;

  /** Get saved language or default */
  const getSavedLang = () => {
    try {
      return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
    } catch (e) {
      return DEFAULT_LANG;
    }
  };

  /** Save language preference */
  const saveLang = (lang) => {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) { /* silent */ }
  };

  /** Apply translations to the page */
  const applyLang = (lang) => {
    currentLang = lang;
    document.documentElement.setAttribute('lang', lang === 'hi' ? 'hi' : 'en');

    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach((el) => {
      const key = el.getAttribute('data-i18n');

      if (lang === 'hi' && hi[key]) {
        // Store original English text if not already stored
        if (!el.hasAttribute('data-i18n-en')) {
          el.setAttribute('data-i18n-en', el.innerHTML);
        }
        el.innerHTML = hi[key];
      } else if (lang === 'en') {
        // Restore English
        const original = el.getAttribute('data-i18n-en');
        if (original !== null) {
          el.innerHTML = original;
        }
      }
    });

    // Update toggle button text
    const toggleBtns = document.querySelectorAll('.lang-toggle');
    toggleBtns.forEach((btn) => {
      const enLabel = btn.querySelector('.lang-toggle__en');
      const hiLabel = btn.querySelector('.lang-toggle__hi');
      if (enLabel && hiLabel) {
        enLabel.classList.toggle('is-active', lang === 'en');
        hiLabel.classList.toggle('is-active', lang === 'hi');
      }
    });

    saveLang(lang);
  };

  /** Toggle between en and hi */
  const toggle = () => {
    applyLang(currentLang === 'en' ? 'hi' : 'en');
  };

  /** Initialise - bind toggle buttons, apply saved lang */
  const init = () => {
    currentLang = getSavedLang();

    // Bind all toggle buttons
    document.querySelectorAll('.lang-toggle').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        toggle();
      });
    });

    // Apply saved language (if Hindi was saved previously)
    if (currentLang === 'hi') {
      applyLang('hi');
    }
  };

  return { init, toggle, applyLang };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Language;
}
