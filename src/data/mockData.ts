export interface Signatory {
  id: string;
  name: string;
  category: 'Kamu' | 'Enerji' | 'Veri Merkezi' | 'Teknoloji' | 'Akademi';
  categoryEn: 'Public' | 'Energy' | 'Data Center' | 'Tech' | 'Academia';
  capacityMW: number;
  targetPUE: number;
  targetYear: number;
  verified: boolean;
  country: string;
  dateSigned: string;
}

export interface AgendaItem {
  id: string;
  date: string;
  dateLabel: string;
  time: string;
  title: string;
  titleEn: string;
  theme: 'Liderler Zirvesi' | 'Yapay Zekâ & Şebeke' | 'Madde 6 Karbon' | '1.5°C & Aşım' | 'Kayıp-Zarar Fonu';
  themeEn: 'Leaders Summit' | 'AI & Grid' | 'Article 6 Carbon' | '1.5°C & Overshoot' | 'Loss & Damage';
  location: string;
  summary: string;
  summaryEn: string;
  keyOutcomes: string[];
  keyOutcomesEn: string[];
  diplomaticStatus: 'Kritik Dönüm Noktası' | 'Genişletilmiş Müzakere' | 'Bakanlar Düzeyi' | 'Teknik Anlaşma';
}

export const INITIAL_SIGNATORIES: Signatory[] = [
  {
    id: 'SIG-001',
    name: 'Enerjisa Üretim & Dağıtım A.Ş.',
    category: 'Enerji',
    categoryEn: 'Energy',
    capacityMW: 450,
    targetPUE: 1.12,
    targetYear: 2026,
    verified: true,
    country: 'Türkiye',
    dateSigned: '2026-03-12',
  },
  {
    id: 'SIG-002',
    name: 'TEİAŞ (Türkiye Elektrik İletim A.Ş.)',
    category: 'Kamu',
    categoryEn: 'Public',
    capacityMW: 600,
    targetPUE: 1.10,
    targetYear: 2026,
    verified: true,
    country: 'Türkiye',
    dateSigned: '2026-04-05',
  },
  {
    id: 'SIG-003',
    name: 'TÜBİTAK BİLGEM & Ulusal Bulut',
    category: 'Kamu',
    categoryEn: 'Public',
    capacityMW: 180,
    targetPUE: 1.14,
    targetYear: 2026,
    verified: true,
    country: 'Türkiye',
    dateSigned: '2026-04-18',
  },
  {
    id: 'SIG-004',
    name: 'Akdeniz Elektrik Dağıtım (AEDAŞ)',
    category: 'Enerji',
    categoryEn: 'Energy',
    capacityMW: 320,
    targetPUE: 1.13,
    targetYear: 2027,
    verified: true,
    country: 'Türkiye',
    dateSigned: '2026-05-02',
  },
  {
    id: 'SIG-005',
    name: 'Turkcell Veri Merkezleri Girişimi',
    category: 'Veri Merkezi',
    categoryEn: 'Data Center',
    capacityMW: 220,
    targetPUE: 1.15,
    targetYear: 2026,
    verified: true,
    country: 'Türkiye',
    dateSigned: '2026-05-19',
  },
  {
    id: 'SIG-006',
    name: 'Türk Telekom Uluslararası Bulut & Veri',
    category: 'Veri Merkezi',
    categoryEn: 'Data Center',
    capacityMW: 190,
    targetPUE: 1.14,
    targetYear: 2027,
    verified: true,
    country: 'Türkiye',
    dateSigned: '2026-06-01',
  },
  {
    id: 'SIG-007',
    name: 'ODTÜ GÜNAM (Güneş Enerjisi Araştırma Merkezi)',
    category: 'Akademi',
    categoryEn: 'Academia',
    capacityMW: 40,
    targetPUE: 1.10,
    targetYear: 2026,
    verified: true,
    country: 'Türkiye',
    dateSigned: '2026-06-15',
  },
  {
    id: 'SIG-008',
    name: 'Mediterranean Clean Power Alliance (MCPA)',
    category: 'Enerji',
    categoryEn: 'Energy',
    capacityMW: 400,
    targetPUE: 1.12,
    targetYear: 2027,
    verified: true,
    country: 'İtalya / Yunanistan / Türkiye',
    dateSigned: '2026-07-08',
  },
];

export const COP31_AGENDA_ITEMS: AgendaItem[] = [
  {
    id: 'AG-01',
    date: '2026-11-11',
    dateLabel: '11 Kasım 2026, Çarşamba',
    time: '09:30 - 13:00',
    title: 'Kritik Dünya Liderleri Zirvesi Açılış Genel Kurulu',
    titleEn: 'World Leaders Climate Summit Opening Plenary',
    theme: 'Liderler Zirvesi',
    themeEn: 'Leaders Summit',
    location: 'Antalya Uluslararası Kongre Merkezi - Akdeniz Ana Salonu',
    summary: 'Devlet ve hükümet başkanlarının katılımıyla 11-12 Kasım 2026 tarihli resmi liderler zirvesi açılışı. Küresel sera gazı azaltım hedefleri ve yapay zekâ veri merkezlerinin şebeke elektrifikasyonu taahhüdünün duyurulması.',
    summaryEn: 'Opening of the official leaders summit on November 11-12, 2026 with heads of state. Global greenhouse gas reduction commitments and the landmark AI data center grid electrification initiative launch.',
    keyOutcomes: [
      'Antalya Liderler İklim Deklarasyonu taslağının kabulü',
      'Yapay zekâ veri merkezleri için 24/7 temiz enerji zorunluluğu ilkesi',
      'Akdeniz Havzası Enerji & Dijital Dönüşüm Finansman Paketi',
    ],
    keyOutcomesEn: [
      'Adoption of the Antalya Leaders Climate Declaration draft',
      '24/7 carbon-free energy obligation mandate for AI infrastructure',
      'Mediterranean Basin Clean Energy & Digital Transformation Fund',
    ],
    diplomaticStatus: 'Kritik Dönüm Noktası',
  },
  {
    id: 'AG-02',
    date: '2026-11-12',
    dateLabel: '12 Kasım 2026, Perşembe',
    time: '14:00 - 18:30',
    title: '1.5°C Küresel Eşik ve Aşım (Overshoot) Politikaları Yuvarlak Masası',
    titleEn: '1.5°C Global Threshold & Overshoot Policies High-Level Roundtable',
    theme: '1.5°C & Aşım',
    themeEn: '1.5°C & Overshoot',
    location: 'Aspendos Diplomatik Müzakere Salonu',
    summary: 'Küresel sıcaklık artışının 1.5°C sınırını geçici olarak aşması durumunda, sıcaklıkların yüzyıl sonuna kadar güvenli seviyelere geri çekilmesi için gereken agresif karbon giderme ve akıllı talep yönetimi mimarisi.',
    summaryEn: 'High-level ministerial negotiation on aggressive carbon removal and AI-driven load shedding strategies in the event of temporary 1.5°C threshold overshoot.',
    keyOutcomes: [
      'Geri dönüşsüz eşiklerin önlenmesi için erken uyarı yapay zekâ şebekesi',
      'Metan ve endüstriyel soğutma gazlarında anlık denetim protokolü',
      'Veri merkezlerinde karbon negatif atık ısı değerlendirme şartı',
    ],
    keyOutcomesEn: [
      'Early-warning climate AI monitoring grid to prevent tipping points',
      'Real-time industrial coolant and methane surveillance protocol',
      'Carbon-negative waste-heat reuse mandate for hyperscale facilities',
    ],
    diplomaticStatus: 'Bakanlar Düzeyi',
  },
  {
    id: 'AG-03',
    date: '2026-11-14',
    dateLabel: '14 Kasım 2026, Cumartesi',
    time: '10:00 - 16:30',
    title: 'Paris Madde 6: Dijital Şeffaflık & Doğrulanabilir Karbon Piyasası',
    titleEn: 'Paris Article 6: Digital Transparency & Verifiable Carbon Markets',
    theme: 'Madde 6 Karbon',
    themeEn: 'Article 6 Carbon',
    location: 'Side İnovasyon ve Karbon Pavyonu',
    summary: 'Paris Anlaşması Madde 6.2 ve 6.4 uyarınca uluslararası karbon kredilerinin çift sayımını (double counting) önleyen, yapay zekâ ve saatlik CFE akıllı sayaç verileriyle çalışan şeffaf denetim defteri standardı.',
    summaryEn: 'Standardizing Article 6.2 and 6.4 digital registries using AI and hourly smart meter CFE telemetry to prevent double counting in cross-border carbon credit transfers.',
    keyOutcomes: [
      'Akdeniz Dijital Karbon Takas Defteri şartnamesi',
      'AB AI Act Madde 50 uyumlu karbon ayak izi hesaplama API’si',
      'Kamu-özel yeşil tahvil entegrasyonu',
    ],
    keyOutcomesEn: [
      'Mediterranean Digital Carbon Exchange Registry specifications',
      'EU AI Act Article 50 compliant carbon footprint accounting standard',
      'Sovereign green bond digital verification integration',
    ],
    diplomaticStatus: 'Teknik Anlaşma',
  },
  {
    id: 'AG-04',
    date: '2026-11-16',
    dateLabel: '16 Kasım 2026, Pazartesi',
    time: '11:00 - 15:00',
    title: 'Akdeniz Kayıp ve Zarar (Loss & Damage) Fonu ve İklim Direnci',
    titleEn: 'Mediterranean Loss & Damage Resilience Fund Session',
    theme: 'Kayıp-Zarar Fonu',
    themeEn: 'Loss & Damage',
    location: 'Perge Çevresel Güvenlik Salonu',
    summary: 'Orman yangınları, kıyı erozyonu ve kuraklık riskine maruz kalan Doğu Akdeniz havzası ülkelerine yönelik 10 milyar dolarlık yeşil teknoloji ve şebeke güçlendirme fonunun işletim kuralları.',
    summaryEn: 'Operational framework for the $10B Mediterranean climate resilience and smart electrical infrastructure replenishment fund.',
    keyOutcomes: [
      'Kritik enerji altyapılarının aşırı hava olaylarına karşı dayanıklılık standardı',
      'Yapay zekâ orman yangını ve kuraklık erken uyarı sistemi finansmanı',
      'Güneş ve rüzgar santrallerinde bölgesel yedekleme koridoru',
    ],
    keyOutcomesEn: [
      'Climate hardening standards for vital electrical grid substations',
      'Financing regional AI wildfire and drought forecasting centers',
      'Cross-border solar & wind dynamic backup interconnects',
    ],
    diplomaticStatus: 'Genişletilmiş Müzakere',
  },
  {
    id: 'AG-05',
    date: '2026-11-18',
    dateLabel: '18 Kasım 2026, Çarşamba',
    time: '09:00 - 17:00',
    title: 'Yapay Zekâ Taahhüdü & Elektrifikasyon: Akdeniz Şebeke Zirvesi',
    titleEn: 'COP31 AI Commitment & Mediterranean Grid Electrification Expo',
    theme: 'Yapay Zekâ & Şebeke',
    themeEn: 'AI & Grid',
    location: 'Antalya Yeşil İnovasyon Pavyonu',
    summary: 'Veri merkezlerinin hesaplama gücünü 24/7 temiz enerjiyle besleyen, yüksek iş yüklerini güneş fazlası saatlere kaydırarak şebekeyi dengeleyen resmi taahhütname imza töreni ve e-dönüşüm çalıştayı.',
    summaryEn: 'Ministerial signing ceremony and demonstration of data centers shifting deep learning compute workloads into peak solar hours to stabilize regional power grids.',
    keyOutcomes: [
      '25 öncü kurum ve teknoloji liderinin resmi taahhüt imzası',
      'PUE ≤ 1.15 ve sıfır tatlı su tüketimi hedefinin tescili',
      'Antalya Akıllı Şebeke & Yapay Zekâ Yol Haritası 2026-2030',
    ],
    keyOutcomesEn: [
      'Official signing ceremony with 25 lead institutions and tech operators',
      'Certification of PUE ≤ 1.15 and zero freshwater cooling criteria',
      'Antalya Smart Grid & AI Roadmap 2026-2030 ratification',
    ],
    diplomaticStatus: 'Kritik Dönüm Noktası',
  },
];

export const HOURLY_GRID_DATA = [
  { hour: '00:00', baseLoad: 2800, solar: 0, wind: 950, hydro: 600, dataCenterFlat: 400, dataCenterFlexible: 200, carbonIntensity: 290 },
  { hour: '02:00', baseLoad: 2500, solar: 0, wind: 980, hydro: 550, dataCenterFlat: 400, dataCenterFlexible: 180, carbonIntensity: 285 },
  { hour: '04:00', baseLoad: 2400, solar: 0, wind: 1020, hydro: 500, dataCenterFlat: 400, dataCenterFlexible: 160, carbonIntensity: 275 },
  { hour: '06:00', baseLoad: 2600, solar: 150, wind: 900, hydro: 520, dataCenterFlat: 400, dataCenterFlexible: 220, carbonIntensity: 260 },
  { hour: '08:00', baseLoad: 3200, solar: 1100, wind: 800, hydro: 580, dataCenterFlat: 400, dataCenterFlexible: 320, carbonIntensity: 210 },
  { hour: '10:00', baseLoad: 3600, solar: 2900, wind: 850, hydro: 400, dataCenterFlat: 400, dataCenterFlexible: 650, carbonIntensity: 90 },
  { hour: '12:00', baseLoad: 3900, solar: 4400, wind: 920, hydro: 300, dataCenterFlat: 400, dataCenterFlexible: 880, carbonIntensity: 35 },
  { hour: '14:00', baseLoad: 3850, solar: 4100, wind: 980, hydro: 320, dataCenterFlat: 400, dataCenterFlexible: 820, carbonIntensity: 45 },
  { hour: '16:00', baseLoad: 3700, solar: 2400, wind: 950, hydro: 450, dataCenterFlat: 400, dataCenterFlexible: 520, carbonIntensity: 120 },
  { hour: '18:00', baseLoad: 4100, solar: 400, wind: 880, hydro: 700, dataCenterFlat: 400, dataCenterFlexible: 250, carbonIntensity: 280 },
  { hour: '20:00', baseLoad: 4200, solar: 0, wind: 840, hydro: 850, dataCenterFlat: 400, dataCenterFlexible: 210, carbonIntensity: 310 },
  { hour: '22:00', baseLoad: 3400, solar: 0, wind: 910, hydro: 750, dataCenterFlat: 400, dataCenterFlexible: 200, carbonIntensity: 295 },
];
