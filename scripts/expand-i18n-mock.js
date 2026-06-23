const fs = require("fs");
const path = require("path");

const mockExpansion = {
  en: {
    risks: {
      r1: {
        title: "Dead Stock",
        description:
          "₸1.1M tied up in unsold inventory older than 90 days",
        agent: "AI Analyst",
      },
      r2: {
        title: "CAC Too High",
        description:
          "Cost per customer at ₸4,800 — 60% above fashion retail benchmark",
        agent: "AI Marketer",
      },
      r3: {
        title: "Net Margin Below Target",
        description: "Net margin at 11% vs 18–22% industry benchmark",
        agent: "AI Accountant",
      },
    },
    actions: {
      a1: {
        title: "Launch Dead Stock Clearance Campaign",
        description:
          "Run a 30-day clearance: discount 30–50%, Instagram stories + Kaspi promo",
        agent: "AI Marketer",
      },
      a2: {
        title: "Create a Referral Program",
        description:
          "Existing customers refer friends → reduce CAC from ₸4,800 to ₸2,200",
        agent: "AI Marketer",
      },
      a3: {
        title: "Run Expense Audit",
        description:
          "Review all monthly expenses. Target: find ₸200K in reducible costs",
        agent: "AI Accountant",
      },
    },
    briefing: {
      body: "{company} is in {status} health at {score}/100, improving by {trendDelta} points since last month. Your strongest area is Team Performance ({teamScore}). Critical attention required: ₸1.1M in dead stock is your biggest drag on inventory health. Marketing CAC at ₸4,800 is 60% above industry benchmark. Recommended focus this week: launch clearance campaign to recover ₸750K and start referral program to cut CAC.",
    },
    agents: {
      ceo: {
        name: "AI CEO",
        role: "Strategic Advisor",
        description:
          "Synthesizes all business intelligence into executive decisions",
        currentTask: "Preparing monthly executive briefing",
        specialty: ["Strategy", "Risk", "Opportunities"],
        lastActivity: "2 min ago",
      },
      analyst: {
        name: "AI Analyst",
        role: "Business Intelligence",
        description:
          "Monitors KPIs, detects anomalies, surfaces insights from data",
        currentTask: "Analyzing dead stock patterns",
        specialty: ["KPIs", "Trends", "Forecasting"],
        lastActivity: "5 min ago",
      },
      marketer: {
        name: "AI Marketer",
        role: "Marketing & Growth",
        description:
          "Plans campaigns, optimizes CAC, manages acquisition funnels",
        currentTask: "Building clearance campaign plan",
        specialty: ["Instagram", "CAC", "Campaigns"],
        lastActivity: "12 min ago",
      },
      accountant: {
        name: "AI Accountant",
        role: "Financial Control",
        description:
          "Tracks margins, cash flow, expenses, and financial health",
        currentTask: "Monthly expense analysis",
        specialty: ["Margins", "Cash Flow", "Expenses"],
        lastActivity: "1 hr ago",
      },
      manager: {
        name: "AI Manager",
        role: "Operations & Team",
        description:
          "Coordinates tasks, tracks team performance, manages processes",
        currentTask: "Reviewing team targets for June",
        specialty: ["Tasks", "Team", "SOP"],
        lastActivity: "3 hr ago",
      },
      smm: {
        name: "AI SMM",
        role: "Social Media & Content",
        description:
          "Plans content calendar, analyzes engagement, drives organic reach",
        currentTask: "Creating June content calendar",
        specialty: ["Instagram", "Content", "Engagement"],
        lastActivity: "30 min ago",
      },
    },
    brain: {
      categories: {
        products: "Products & Inventory",
        sales: "Sales & Pricing",
        marketing: "Marketing & Campaigns",
        team: "Team & Processes",
      },
      items: {
        catalog: "Product Catalogue Spring 2026",
        ads: "Instagram Ads Performance Q1",
        pricing: "Pricing Rules 2026",
        onboarding: "Staff Onboarding SOP",
      },
      itemCategories: {
        products: "Products",
        marketing: "Marketing",
        sales: "Sales",
        team: "Team",
      },
      missing: {
        feedback: "Customer feedback / reviews",
        financials: "Financial statements",
        suppliers: "Supplier contracts",
        history: "Historical sales data",
      },
      coverageLabel: "Brain coverage — {pct}% populated",
      dataCompleteness: "Data completeness: {pct}%",
      tapToChoose: "Tap to choose file",
      documentPreview: "Document preview",
      documentPreviewDesc:
        "Full document viewer available in the next release.",
      view: "View",
    },
    profit: {
      deadStock: "Dead Stock Recovery",
      cacOptimization: "CAC Optimization",
      marginImprovement: "Margin Improvement",
      repeatPurchase: "Repeat Purchase Uplift",
      period: "per month",
    },
    company: {
      name: "Urban Mode",
      industry: "Fashion Retail",
      businessType: "Retail + Online",
    },
    roleDashboard: {
      analyst: "AI Analyst",
      manager: "AI Manager",
      administrator: "AI Administrator",
    },
    insights: {
      marketer: {
        cacOptimization: {
          title: "CAC Optimization Opportunity",
          body: "Narrowing Instagram targeting could reduce CAC by 35% within 14 days.",
        },
        clearanceRoi: {
          title: "Clearance Campaign ROI",
          body: "Dead stock clearance at 30-50% discount projects ₸750K recovery.",
        },
      },
      analyst: {
        deadStockPattern: {
          title: "Dead Stock Pattern",
          body: "78% of dead stock is from Spring 2025 collection — size M and L overrepresented.",
        },
      },
      default: {
        overview: {
          title: "Business Overview",
          body: "{agentName} is monitoring your {specialty} metrics.",
        },
      },
    },
    tasks: {
      clearancePlan: {
        title: "Build clearance campaign plan",
        status: "inProgress",
        priority: "high",
        due: "Jun 5",
      },
      adAnalysis: {
        title: "Analyze Q1 ad performance",
        status: "pending",
        priority: "medium",
        due: "Jun 8",
      },
    },
    taskStatus: {
      inProgress: "In progress",
      pending: "Pending",
    },
    taskPriority: {
      high: "High",
      medium: "Medium",
    },
  },
  ru: {
    risks: {
      r1: {
        title: "Неликвидный товар",
        description:
          "₸1,1 млн заморожено в непроданных остатках старше 90 дней",
        agent: "AI Аналитик",
      },
      r2: {
        title: "Высокий CAC",
        description:
          "Стоимость клиента ₸4 800 — на 60% выше бенчмарка fashion retail",
        agent: "AI Маркетолог",
      },
      r3: {
        title: "Чистая маржа ниже цели",
        description: "Чистая маржа 11% при бенчмарке отрасли 18–22%",
        agent: "AI Бухгалтер",
      },
    },
    actions: {
      a1: {
        title: "Запустить распродажу неликвида",
        description:
          "30-дневная распродажа: скидки 30–50%, stories в Instagram + акция на Kaspi",
        agent: "AI Маркетолог",
      },
      a2: {
        title: "Запустить реферальную программу",
        description:
          "Клиенты приводят друзей → снижение CAC с ₸4 800 до ₸2 200",
        agent: "AI Маркетолог",
      },
      a3: {
        title: "Провести аудит расходов",
        description:
          "Проверить все ежемесячные расходы. Цель: найти ₸200 тыс. для сокращения",
        agent: "AI Бухгалтер",
      },
    },
    briefing: {
      body: "{company} в статусе «{status}» с индексом {score}/100, рост на {trendDelta} пункта с прошлого месяца. Сильная сторона — команда ({teamScore}). Критично: ₸1,1 млн в неликвиде сильнее всего тянет склад вниз. CAC в маркетинге ₸4 800 — на 60% выше бенчмарка. Фокус на неделю: распродажа неликвида на ₸750 тыс. и реферальная программа для снижения CAC.",
    },
    agents: {
      ceo: {
        name: "AI CEO",
        role: "Стратегический советник",
        description:
          "Синтезирует бизнес-аналитику в управленческие решения",
        currentTask: "Готовит ежемесячный брифинг руководителя",
        specialty: ["Стратегия", "Риски", "Возможности"],
        lastActivity: "2 мин назад",
      },
      analyst: {
        name: "AI Аналитик",
        role: "Бизнес-аналитика",
        description:
          "Отслеживает KPI, находит аномалии и инсайты в данных",
        currentTask: "Анализирует паттерны неликвидного товара",
        specialty: ["KPI", "Тренды", "Прогнозы"],
        lastActivity: "5 мин назад",
      },
      marketer: {
        name: "AI Маркетолог",
        role: "Маркетинг и рост",
        description:
          "Планирует кампании, оптимизирует CAC и воронки привлечения",
        currentTask: "Готовит план распродажи неликвида",
        specialty: ["Instagram", "CAC", "Кампании"],
        lastActivity: "12 мин назад",
      },
      accountant: {
        name: "AI Бухгалтер",
        role: "Финансовый контроль",
        description:
          "Контролирует маржу, денежный поток и расходы",
        currentTask: "Анализ ежемесячных расходов",
        specialty: ["Маржа", "Денежный поток", "Расходы"],
        lastActivity: "1 ч назад",
      },
      manager: {
        name: "AI Менеджер",
        role: "Операции и команда",
        description:
          "Координирует задачи, следит за командой и процессами",
        currentTask: "Пересматривает цели команды на июнь",
        specialty: ["Задачи", "Команда", "SOP"],
        lastActivity: "3 ч назад",
      },
      smm: {
        name: "AI SMM",
        role: "Соцсети и контент",
        description:
          "Планирует контент, анализирует вовлечённость и охват",
        currentTask: "Создаёт контент-план на июнь",
        specialty: ["Instagram", "Контент", "Вовлечённость"],
        lastActivity: "30 мин назад",
      },
    },
    brain: {
      categories: {
        products: "Товары и склад",
        sales: "Продажи и цены",
        marketing: "Маркетинг и кампании",
        team: "Команда и процессы",
      },
      items: {
        catalog: "Каталог товаров Весна 2026",
        ads: "Эффективность рекламы Instagram Q1",
        pricing: "Правила ценообразования 2026",
        onboarding: "SOP адаптации сотрудников",
      },
      itemCategories: {
        products: "Товары",
        marketing: "Маркетинг",
        sales: "Продажи",
        team: "Команда",
      },
      missing: {
        feedback: "Отзывы клиентов",
        financials: "Финансовая отчётность",
        suppliers: "Договоры с поставщиками",
        history: "Исторические данные продаж",
      },
      coverageLabel: "Покрытие базы знаний — {pct}%",
      dataCompleteness: "Полнота данных: {pct}%",
      tapToChoose: "Нажмите, чтобы выбрать файл",
      documentPreview: "Просмотр документа",
      documentPreviewDesc:
        "Полный просмотр документов будет в следующем обновлении.",
      view: "Открыть",
    },
    profit: {
      deadStock: "Возврат из неликвида",
      cacOptimization: "Оптимизация CAC",
      marginImprovement: "Улучшение маржи",
      repeatPurchase: "Рост повторных покупок",
      period: "в месяц",
    },
    company: {
      name: "Urban Mode",
      industry: "Fashion Retail",
      businessType: "Розница + онлайн",
    },
    roleDashboard: {
      analyst: "AI Аналитик",
      manager: "AI Менеджер",
      administrator: "AI Администратор",
    },
    insights: {
      marketer: {
        cacOptimization: {
          title: "Возможность оптимизации CAC",
          body: "Сужение таргетинга в Instagram может снизить CAC на 35% за 14 дней.",
        },
        clearanceRoi: {
          title: "ROI распродажи неликвида",
          body: "Распродажа со скидкой 30–50% прогнозирует возврат ₸750 тыс.",
        },
      },
      analyst: {
        deadStockPattern: {
          title: "Паттерн неликвидного товара",
          body: "78% неликвида — коллекция Весна 2025, преобладают размеры M и L.",
        },
      },
      default: {
        overview: {
          title: "Обзор бизнеса",
          body: "{agentName} отслеживает показатели: {specialty}.",
        },
      },
    },
    tasks: {
      clearancePlan: {
        title: "Подготовить план распродажи",
        status: "inProgress",
        priority: "high",
        due: "5 июн",
      },
      adAnalysis: {
        title: "Проанализировать рекламу Q1",
        status: "pending",
        priority: "medium",
        due: "8 июн",
      },
    },
    taskStatus: {
      inProgress: "В работе",
      pending: "Ожидает",
    },
    taskPriority: {
      high: "Высокий",
      medium: "Средний",
    },
  },
  kk: {
    risks: {
      r1: {
        title: "Сатылмайтын қор",
        description:
          "₸1,1 млн 90 күннен астам сатылмаған қорда тұрып қалған",
        agent: "AI Талдаушы",
      },
      r2: {
        title: "CAC тым жоғары",
        description:
          "Бір клиентке ₸4 800 — fashion retail бенчмаркінен 60% жоғары",
        agent: "AI Маркетолог",
      },
      r3: {
        title: "Таза маржа мақсаттан төмен",
        description: "Таза маржа 11% — салалық бенчмарк 18–22%",
        agent: "AI Бухгалтер",
      },
    },
    actions: {
      a1: {
        title: "Сатылмайтын қорды сату науқанын іске қосу",
        description:
          "30 күндік сату: 30–50% жеңілдік, Instagram stories + Kaspi акциясы",
        agent: "AI Маркетолог",
      },
      a2: {
        title: "Рефералдық бағдарлама құру",
        description:
          "Клиенттер достарын әкеледі → CAC ₸4 800-ден ₸2 200-ге дейін төмендейді",
        agent: "AI Маркетолог",
      },
      a3: {
        title: "Шығындарды аудиттеу",
        description:
          "Барлық айлық шығындарды тексеру. Мақсат: ₸200 мың үнемдеу",
        agent: "AI Бухгалтер",
      },
    },
    briefing: {
      body: "{company} {status} күйінде, индекс {score}/100, өткен айға қарағанда +{trendDelta} пункт. Күшті жақ — команда ({teamScore}). Маңызды: ₸1,1 млн сатылмайтын қор қойманы төмендетеді. Маркетинг CAC ₸4 800 — бенчмарктен 60% жоғары. Аптаның фокусы: ₸750 мың қайтару науқаны және CAC төмендету үшін реферал бағдарламасы.",
    },
    agents: {
      ceo: {
        name: "AI CEO",
        role: "Стратегиялық кеңесші",
        description:
          "Барлық бизнес аналитикасын басқарушылық шешімдерге синтездейді",
        currentTask: "Айлық басшы брифингін дайындауда",
        specialty: ["Стратегия", "Тәуекелдер", "Мүмкіндіктер"],
        lastActivity: "2 мин бұрын",
      },
      analyst: {
        name: "AI Талдаушы",
        role: "Бизнес-аналитика",
        description:
          "KPI бақылайды, аномалиялар мен инсайттарды табады",
        currentTask: "Сатылмайтын қор үлгілерін талдауда",
        specialty: ["KPI", "Трендтер", "Болжамдар"],
        lastActivity: "5 мин бұрын",
      },
      marketer: {
        name: "AI Маркетолог",
        role: "Маркетинг және өсу",
        description:
          "Науқандарды жоспарлайды, CAC пен тартылым воронкаларын оңтайландырады",
        currentTask: "Сатылмайтын қор сату жоспарын құрауда",
        specialty: ["Instagram", "CAC", "Науқандар"],
        lastActivity: "12 мин бұрын",
      },
      accountant: {
        name: "AI Бухгалтер",
        role: "Қаржылық бақылау",
        description:
          "Маржа, ақша ағыны мен шығындарды бақылайды",
        currentTask: "Айлық шығындарды талдауда",
        specialty: ["Маржа", "Ақша ағыны", "Шығындар"],
        lastActivity: "1 сағ бұрын",
      },
      manager: {
        name: "AI Менеджер",
        role: "Операциялар және команда",
        description:
          "Тапсырмаларды үйлестіреді, команданы және процестерді бақылайды",
        currentTask: "Маусым команда мақсаттарын қарауда",
        specialty: ["Тапсырмалар", "Команда", "SOP"],
        lastActivity: "3 сағ бұрын",
      },
      smm: {
        name: "AI SMM",
        role: "Әлеуметтік желілер және контент",
        description:
          "Контент күнтізбесін жоспарлайды, қатысу мен охватты талдайды",
        currentTask: "Маусым контент күнтізбесін құрауда",
        specialty: ["Instagram", "Контент", "Қатысу"],
        lastActivity: "30 мин бұрын",
      },
    },
    brain: {
      categories: {
        products: "Тауарлар және қойма",
        sales: "Сату және бағалар",
        marketing: "Маркетинг және науқандар",
        team: "Команда және процестер",
      },
      items: {
        catalog: "Тауар каталогы Көктем 2026",
        ads: "Instagram жарнамасы Q1 нәтижелері",
        pricing: "Бағалау ережелері 2026",
        onboarding: "Қызметкерлерді бейімдеу SOP",
      },
      itemCategories: {
        products: "Тауарлар",
        marketing: "Маркетинг",
        sales: "Сату",
        team: "Команда",
      },
      missing: {
        feedback: "Клиент пікірлері",
        financials: "Қаржылық есептер",
        suppliers: "Жеткізуші келісімдері",
        history: "Сату тарихы",
      },
      coverageLabel: "Білім базасының толтырылуы — {pct}%",
      dataCompleteness: "Деректер толықтығы: {pct}%",
      tapToChoose: "Файл таңдау үшін басыңыз",
      documentPreview: "Құжатты қарау",
      documentPreviewDesc:
        "Толық құжат қарау құралы келесі жаңартуда қолжетімді болады.",
      view: "Ашу",
    },
    profit: {
      deadStock: "Сатылмайтын қорды қайтару",
      cacOptimization: "CAC оңтайландыру",
      marginImprovement: "Маржаны жақсарту",
      repeatPurchase: "Қайта сатып алу өсімі",
      period: "айына",
    },
    company: {
      name: "Urban Mode",
      industry: "Fashion Retail",
      businessType: "Офлайн + онлайн",
    },
    roleDashboard: {
      analyst: "AI Талдаушы",
      manager: "AI Менеджер",
      administrator: "AI Әкімші",
    },
    insights: {
      marketer: {
        cacOptimization: {
          title: "CAC оңтайландыру мүмкіндігі",
          body: "Instagram таргетингін тарылту CAC-ты 14 күнде 35% төмендетуі мүмкін.",
        },
        clearanceRoi: {
          title: "Сату науқанының ROI",
          body: "30–50% жеңілдікпен сату ₸750 мың қайтаруды болжайды.",
        },
      },
      analyst: {
        deadStockPattern: {
          title: "Сатылмайтын қор үлгісі",
          body: "Сатылмайтын қордың 78% — Көктем 2025 коллекциясы, M және L өлшемдері көп.",
        },
      },
      default: {
        overview: {
          title: "Бизнес шолуы",
          body: "{agentName} мына көрсеткіштерді бақылайды: {specialty}.",
        },
      },
    },
    tasks: {
      clearancePlan: {
        title: "Сату жоспарын дайындау",
        status: "inProgress",
        priority: "high",
        due: "5 мау",
      },
      adAnalysis: {
        title: "Q1 жарнамасын талдау",
        status: "pending",
        priority: "medium",
        due: "8 мау",
      },
    },
    taskStatus: {
      inProgress: "Орындалуда",
      pending: "Күтуде",
    },
    taskPriority: {
      high: "Жоғары",
      medium: "Орта",
    },
  },
};

const enPatches = {
  brain: {
    uploadActions: {
      toastDesc: "Upload will be available after AI is connected.",
      document: {
        label: "Add document",
        description: "Upload a PDF, Word file, or spreadsheet",
        example: "Example: price list, product catalog",
      },
      process: {
        label: "Add process",
        description: "Describe a business process or instruction",
        example: "Example: goods receiving procedure",
      },
      decision: {
        label: "Add decision",
        description: "Record a business decision that was made",
        example: "Example: decision to change supplier",
      },
      rule: {
        label: "Add rule",
        description: "Set a rule for employees",
        example: "Example: discounts only with director approval",
      },
    },
  },
  agents: {
    active: "Active",
    yurt: {
      subtitle: "Digital yurt — enter your AI team room",
      roomLabel: "Digital yurt",
      hint: "Select an agent to open their workspace",
      backToRoom: "Back to yurt",
    },
    workspace: {
      tasksPlaceholder: "Agent tasks will appear here",
    },
  },
  wizard: {
    onboardingSteps: {
      "1": "Company identity",
      "2": "Business type",
      "3": "Your team",
      "4": "Business metrics",
      "5": "Knowledge base",
      "6": "Complete",
    },
    brainSeed: {
      title: "Knowledge base",
      subtitle: "Upload 1–3 documents to seed Company Brain",
      why: "Documents become company memory for smarter AI recommendations.",
      gain: "The more knowledge you add, the more accurate the advice.",
      dropzone: "Drag PDF, Word, or spreadsheet here",
      uploadBtn: "Upload document",
      seeded: "Document added to knowledge base",
      skipHint: "You can skip and add documents later",
      uploadSuccess: "Document accepted",
      uploadSuccessDesc: "The file will be processed after AI is connected.",
    },
  },
};

const kkPatches = {
  brain: {
    uploadActions: {
      toastDesc: "Жүктеу AI қосылғаннан кейін қолжетімді болады.",
      document: {
        label: "Құжат қосу",
        description: "PDF, Word немесе кесте жүктеңіз",
        example: "Мысалы: прайс-лист, тауар каталогы",
      },
      process: {
        label: "Процесс қосу",
        description: "Бизнес-процесс немесе нұсқау сипаттаңыз",
        example: "Мысалы: тауарды қабылдау тәртібі",
      },
      decision: {
        label: "Шешім қосу",
        description: "Қабылданған бизнес-шешімді тіркеңіз",
        example: "Мысалы: жеткізушіні ауыстыру шешімі",
      },
      rule: {
        label: "Ереже қосу",
        description: "Қызметкерлерге ереже белгілеңіз",
        example: "Мысалы: жеңілдіктер тек директор рұқсатымен",
      },
    },
  },
  agents: {
    active: "Белсенді",
    yurt: {
      subtitle: "Сандық киіз үй — AI командаңыздың бөлмесіне кіріңіз",
      roomLabel: "Сандық киіз үй",
      hint: "Жұмыс аймағын ашу үшін агентті таңдаңыз",
      backToRoom: "Киіз үйге оралу",
    },
    workspace: {
      tasksPlaceholder: "Агент тапсырмалары осында көрінеді",
    },
  },
  wizard: {
    onboardingSteps: {
      "1": "Компания сәйкестігі",
      "2": "Бизнес түрі",
      "3": "Сіздің командаңыз",
      "4": "Бизнес көрсеткіштері",
      "5": "Білім базасы",
      "6": "Дайын",
    },
    brainSeed: {
      title: "Білім базасы",
      subtitle: "Company Brain бастау үшін 1–3 құжат жүктеңіз",
      why: "Құжаттар компания жадына айналады — AI ұсыныстары дәлірек болады.",
      gain: "Неғұрлым көп білім — соғұрлым нақты кеңестер.",
      dropzone: "PDF, Word немесе кестені осында сүйреңіз",
      uploadBtn: "Құжат жүктеу",
      seeded: "Құжат білім базасына қосылды",
      skipHint: "Өткізіп жіберуге болады — кейін қосасыз",
      uploadSuccess: "Құжат қабылданды",
      uploadSuccessDesc: "Файл AI қосылғаннан кейін өңделеді.",
    },
  },
};

function deepMerge(target, source) {
  for (const [key, value] of Object.entries(source)) {
    if (
      value &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      typeof target[key] === "object"
    ) {
      deepMerge(target[key], value);
    } else {
      target[key] = value;
    }
  }
  return target;
}

for (const locale of ["en", "ru", "kk"]) {
  const file = path.join(__dirname, `../messages/${locale}.json`);
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  deepMerge(data.mock, mockExpansion[locale]);
  if (locale === "en") deepMerge(data, enPatches);
  if (locale === "kk") deepMerge(data, kkPatches);
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n");
  console.log(`Updated messages/${locale}.json`);
}
