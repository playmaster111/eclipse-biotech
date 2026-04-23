const CATEGORIES = {
    'anabolic': { name: 'Anabolic-Androgenic (AAS)', desc: 'Synthetic variations of testosterone used to treat hormonal imbalances and muscle wasting conditions.' },
    'ancillaries': { name: 'Ancillaries & Medications', desc: 'Pharmaceuticals utilized for side-effect management, fertility preservation, Post Cycle Therapy (PCT), and extreme fat loss.' },
    'cannabis': { name: 'Cannabis & Concentrates', desc: 'Compounds found in the cannabis plant that interact with the endocannabinoid system and liver metabolism (edibles).' },
    'corticosteroids': { name: 'Corticosteroids', desc: 'Hormones primarily suppressing inflammation and immunity, mimicking adrenal gland production.' },
    'depressants': { name: 'Depressants & Sedatives', desc: 'CNS depressants utilized for anxiety reduction, sleep induction, or recreational intoxication.' },
    'dissociatives': { name: 'Dissociatives', desc: 'Compounds that induce a detachment from physical reality and the self by blocking sensory signals.' },
    'entactogens': { name: 'Entactogens & Empathogens', desc: 'Psychoactive substances that produce feelings of empathy, love, and emotional openness.' },
    'inhalants': { name: 'Inhalants & Volatiles', desc: 'Volatile solvents, gases, and nitrites inhaled for extremely rapid, transient psychoactive or physiological effects.' },
    'nps': { name: 'NPS & Bath Salts', desc: 'New Psychoactive Substances; synthetic research chemicals designed to mimic traditional illicit drugs.' },
    'opioids': { name: 'Opioids & Analgesics', desc: 'Powerful pain-relieving synthetic and natural compounds acting on mu-opioid receptors.' },
    'peptides': { name: 'Peptides & Growth Factors', desc: 'Amino-acid chain based compounds including exogenous HGH, healing factors, and insulin.' },
    'prohormones': { name: 'Designer Steroids & Prohormones', desc: 'Powerful, orally active anabolic steroids historically marketed as legal "supplements" prior to federal bans.' },
    'psychedelics': { name: 'Psychedelics & Hallucinogens', desc: 'Compounds that radically alter human perception, mood, and cognitive processes.' },
    'recreational': { name: 'Stimulants & Neuro-Enhancers', desc: 'CNS stimulants, amphetamines, and wakefulness agents widely utilized to enforce peak cognitive performance and training intensity.' },
    'reference': { name: 'Bloodwork & Health Markers', desc: 'Clinical reference ranges and deep dives into the essential biomarkers impacted by performance enhancing drugs.' },
    'sarms': { name: 'SARMs & PPAR Agonists', desc: 'Selective Androgen Receptor Modulators engineered to target muscle and bone tissue while minimizing prostate and hairline side effects.' },
    'sex-hormones': { name: 'Sex Hormones & Others', desc: 'Steroids primarily involved in reproductive systems, contraceptives, and specialty treatments.' }
};

const WIKI_DATA = [
    // --- TESTOSTERONES ---
    {
        id: 'testosterone_suspension', folder: 'Testosterones', category: 'anabolic', type: 'AAS', name: 'Testosterone (No Ester)', esters: '(Suspension)', status: 'active',
        overview: 'Pure, unesterified testosterone suspended in a water or oil base. It is the oldest form of injectable testosterone and acts almost instantaneously upon injection.',
        primaryUses: 'Requires rapid elevation of testosterone (rarely used clinically today)',
        mechanism: 'Passes instantly into the blood without relying on the cleavage of an ester bond. Effects peak within hours and requires daily or multiple daily injections to maintain stable levels.',
        dosage: '25mg to 50mg IM daily.',
        experimental: { b: 'Not recommended', a: '50–100 mg/day' },
        risks: 'Extreme injection site pain, radically unstable hormone levels, high aromatization risk.',
        impact: { brain: 3, heart: 4, liver: 0, kidneys: 2, blood: 5, hair: 6, joints: 0 }
    },
    {
        id: 'testosterone_enanthate', folder: 'Testosterones', category: 'anabolic', type: 'AAS', name: 'Testosterone Enanthate', esters: '', status: 'active',
        overview: 'Testosterone Enanthate is a slow-acting ester of the primary male androgen. It is highly favored in clinical settings for TRT due to its predictable release curve.',
        primaryUses: 'Hormone replacement (hypogonadism), gender-affirming care',
        mechanism: 'Binds to the androgen receptor. The enanthate ester delays the release of testosterone into the bloodstream, reaching peak levels in roughly 24-48 hours and gradually declining.',
        dosage: '100mg to 200mg IM every 7 to 10 days.',
        experimental: { b: '300–500 mg/wk', a: '600–1000 mg/wk' },
        benefits: 'Significant increases in muscle mass, accelerated recovery, elevated state of well-being, increased libido, and massive strength accumulation.',
        risks: 'Aromatization to estrogen, erythrocytosis, HPTA suppression, hair loss.',
        impact: { brain: 1, heart: 2, liver: 0, kidneys: 1, blood: 4, hair: 3, joints: -1 },
        aestheticProfile: 'Provides a look of overall muscle "fullness" and high density. At performance doses, it creates a "thick" appearance. Can cause a "wet" look (water retention) if estrogen is not managed.',
        physiologicalTargets: 'High receptor density in the trapezius, deltoids, and neck (the "V-taper" muscles). Dramatically increases nitrogen retention in all skeletal muscle tissue.',
        synthesis: 'Produced via the chemical conversion of plant-derived sterols.',
        synthesisSteps: [
            'Extraction of raw diosgenin from wild yams or stigmasterol from soy sterols.',
            'Marker Degradation: Cleavage of the side chain to initialize the steroid nucleus.',
            'Oppenauer Oxidation: Conversion of the steroid alcohol into the target 4-en-3-one system.',
            'Esterification: Reaction with enanthic acid and an acid catalyst to conjugate the C-17 hydroxyl group.',
            'High-vacuum fractional distillation to isolate the 99%+ purity Enanthate powder.'
        ],
        ingredients: ['Wild Yam Extract (Diosgenin)', 'Enanthic Acid', 'Glacial Acetic Acid', 'Hydrogen Peroxide', 'Benzene (Solvent)', 'Acid Catalyst'],
        location: 'Mexico (Wild Yams), Southern United States/China (Soy Sterols)',
        storage: { temp: '15-30°C', light: 'Protect from direct UV', shelf: '36 Months', notes: 'Store upright. Cold temperatures may cause the hormone to "crash" out of the oil carrier; heat gently to re-dissolve.' },
        cycleExamples: '<strong>The Foundational Base:</strong> Nearly all observed cycles utilize testosterone as a base to maintain baseline physiological functions. A simplistic historically documented mass protocol often runs 500mg of Test Enanthate per week for 12-16 weeks.'
    },
    {
        id: 'testosterone_cypionate', folder: 'Testosterones', category: 'anabolic', type: 'AAS', name: 'Testosterone Cypionate', esters: '', status: 'active',
        overview: 'Testosterone Cypionate is a slow-acting injectable ester very similar to Enanthate. It is the most commonly prescribed form of testosterone for TRT in the United States.',
        overview_de: 'Testosteron Cypionat ist ein langsam wirkender injizierbarer Ester, der dem Enanthat sehr ähnlich ist. Es ist die am häufigsten verschriebene Form von Testosteron für die TRT in den Vereinigten Staaten.',
        primaryUses: 'Male hypogonadism, severe osteoporosis',
        primaryUses_de: 'Männlicher Hypogonadismus, schwere Osteoporose',
        mechanism: 'Identical action to testosterone enanthate, though its carbon chain is slightly longer resulting in a marginally longer active half-life in the body (approx 8 days).',
        mechanism_de: 'Identische Wirkung wie bei Testosteron-Enanthat, obwohl die Kohlenstoffkette etwas länger ist, was zu einer geringfügig längeren aktiven Halbwertszeit im Körper führt (ca. 8 Tage).',
        dosage: '100mg to 200mg IM every 7 to 14 days.',
        experimental: { b: '300–500 mg/wk', a: '600–1000 mg/wk' },
        risks: 'Gynecomastia, elevated hematocrit, lipid strain, acne.',
        impact: { brain: 1, heart: 2, liver: 0, kidneys: 1, blood: 4, hair: 3, joints: -1 },
        aestheticProfile: 'Virtually identical to Enanthate. Provides a powerful "masculine" look with increased jawline definition and muscle roundness.',
        physiologicalTargets: 'Systemic muscle growth; particularly effective at increasing the size of the upper pectoral and shoulder girdle muscles.'
    },
    {
        id: 'testosterone_propionate', folder: 'Testosterones', category: 'anabolic', type: 'AAS', name: 'Testosterone Propionate', esters: '', status: 'active',
        overview: 'Testosterone Propionate is a fast-acting engineered ester. Due to its frequent injection requirements, it is rarely used in modern clinical medicine compared to longer esters.',
        primaryUses: 'Historically used for hypogonadism, female breast cancer (palliative)',
        mechanism: 'Releases very rapidly into the bloodstream after intramuscular injection. Half-life is approximately 2 to 3 days, requiring much more frequent dosing.',
        dosage: '25mg to 50mg IM every 2 to 3 days.',
        experimental: { b: '300–400 mg/wk (100mg EOD)', a: '500–700 mg/wk' },
        risks: 'Injection site pain (PIP), rapid hormonal fluctuations, aromatization.',
        impact: { brain: 2, heart: 3, liver: 0, kidneys: 1, blood: 4, hair: 4, joints: -1 },
        aestheticProfile: 'Often used in "cutting" phases. Provides a drier look than longer esters due to less cumulative water retention. Yields a very "hard" and vascular appearance.',
        physiologicalTargets: 'Immediate AR saturation. Excellent for maintaining fullness while on a calorie-restricted diet.'
    },
    {
        id: 'testosterone_undecanoate', folder: 'Testosterones', category: 'anabolic', type: 'AAS', name: 'Testosterone Undecanoate', esters: '(Nebido, Andriol)', status: 'active',
        overview: 'An extremely long-acting ester of testosterone. It is unique in that it can be administered via massive, spaced-out injections (Nebido) or swallowed orally (Andriol) via lymphatic absorption.',
        primaryUses: 'Long-term TRT requiring minimal clinic visits',
        mechanism: 'The extremely heavy undecanoate ester vastly slows absorption. Oral forms bypass catastrophic liver breakdown by absorbing through the lymphatic system rather than the portal vein.',
        dosage: 'IM: 1000mg every 10 to 14 weeks. Oral: 120-160mg daily.',
        experimental: { b: 'Not typically used for performance', a: 'Rare' },
        benefits: 'Maintains ultra-stable physiological levels for months; convenient oral administration with high safety profile.',
        risks: 'Aromatization, minor liver stress (oral), unpredictable absorption curves.',
        impact: { brain: 1, heart: 1, liver: 2, kidneys: 1, blood: 3, hair: 2, joints: -1 },
        cycleExamples: '<strong>The Vacationer:</strong> Used primarily by travelers who cannot carry supplies; 1000mg Nebido injected once every 12 weeks provides a stable, though low-performance, androgenic base.'
    },
    {
        id: 'sustanon', folder: 'Testosterones', category: 'anabolic', type: 'AAS', name: 'Sustanon 250', esters: '(Blend)', status: 'active',
        overview: 'Sustanon 250 is an engineered blend of four separate testosterone esters (Propionate, Phenylpropionate, Isocaproate, Decanoate) designed to provide instant and prolonged hormonal release.',
        primaryUses: 'Hormone replacement therapy (standard in many European nations)',
        mechanism: 'Attempts to bridge the gap between fast and slow esters. The short esters spike levels immediately, while the long esters sustain them over a 3-week period.',
        dosage: '250mg IM every 3 weeks.',
        experimental: { b: '250–500 mg/wk', a: '750–1000 mg/wk' },
        benefits: 'Provides an immediate "kick" from short esters with the long-term stability of slow esters; reduces the need for frequent pinning while maintaining high peak levels.',
        risks: 'Difficult to manage stable blood levels, aromatization, HPTA shutdown.',
        impact: { brain: 2, heart: 2, liver: 0, kidneys: 1, blood: 4, hair: 4, joints: -1 },
        cycleExamples: '<strong>European Standard:</strong> Widely used in the EU as a foundational TRT protocol. In performance circles, it is often dosed twice weekly (e.g., 250mg Monday/Thursday) to smooth out the release of the shorter Propionate ester.'
    },

    // --- DHT DERIVATIVES ---
    {
        id: 'oxandrolone', folder: 'DHT Derivatives', category: 'anabolic', type: 'AAS', name: 'Oxandrolone', esters: '(Anavar)', status: 'active',
        overview: 'Oxandrolone is a mild oral AAS synthesized with remarkably low androgenicity. Clinically prescribed to reverse severe weight loss caused by systemic infection, trauma, or surgery.',
        primaryUses: 'Weight gain after severe trauma, burn recovery, Turner syndrome',
        mechanism: 'Mildly androgenic, very highly anabolic. Promotes tissue retention and does not aromatize into estrogen.',
        dosage: '2.5mg to 20mg per day (standard medical).',
        experimental: { b: '20–40 mg/day', a: '60–100 mg/day' },
        risks: 'Lipid disruption (Lowered HDL), mild hepatotoxicity, testosterone suppression.',
        impact: { brain: 0, heart: 3, liver: 4, kidneys: 2, blood: 6, hair: 1, joints: 0 },
        aestheticProfile: 'The "Beach Body" steroid. Yields incredibly aesthetic, tight, and dry muscle tissue. Does not cause bloat. Increases muscle "pop" and separation.',
        physiologicalTargets: 'Primarily targets Type I and Type II muscle fibers equally, promoting strength without bulk. High affinity for abdominal and core muscle hardening.'
    },
    {
        id: 'stanozolol', folder: 'DHT Derivatives', category: 'anabolic', type: 'AAS', name: 'Stanozolol', esters: '(Winstrol)', status: 'active',
        overview: 'FDA-approved largely for the treatment of hereditary angioedema. It causes profound reductions in sex hormone-binding globulin (SHBG).',
        primaryUses: 'Hereditary angioedema',
        mechanism: 'Decreases frequency and severity of angioedema swelling attacks by increasing the production of C1-inhibitor.',
        dosage: '2mg oral, three times per day.',
        experimental: { b: '25–50 mg/day', a: '50–100 mg/day' },
        risks: 'Severe HDL suppression, joint discomfort, hepatotoxicity.',
        impact: { brain: 1, heart: 5, liver: 7, kidneys: 2, blood: 9, hair: 5, joints: 4 },
        aestheticProfile: 'Creates a "paper-thin" skin appearance by flushing out subcutaneous water. Extreme vascularity (veins like "garden hoses"). Provides a "3D" look to the delts and traps.',
        physiologicalTargets: 'Specifically targets fast-twitch muscle fibers. Known for increasing power output while simultaneously "drying out" the synovial fluid in joints.'
    },
    {
        id: 'drostanolone', folder: 'DHT Derivatives', category: 'anabolic', type: 'AAS', name: 'Drostanolone', esters: '(Masteron)', status: 'active',
        overview: 'Drostanolone is a DHT-derived injectable AAS originally developed in the 1960s to treat inoperable breast cancer in women.',
        primaryUses: 'Historically: Female breast cancer',
        mechanism: 'Binds to the AR. Cannot convert to estrogen due to being DHT-derived, and exhibits strong anti-estrogenic effects.',
        dosage: '100mg to 300mg IM per week (historical female medical dose).',
        experimental: { b: '300–400 mg/wk', a: '500–700 mg/wk' },
        risks: 'Severe hair loss, virilization (in females), lipid strain.',
        impact: { brain: 1, heart: 4, liver: 1, kidneys: 1, blood: 5, hair: 10, joints: 3 },
        aestheticProfile: 'The "Polishing" agent. Enhances muscle graininess and detail. Acts as a mild anti-estrogen, giving the physique a "polished stone" look.',
        physiologicalTargets: 'Androgen receptors in the skin and hair follicles are highly sensitive to this compound. Promotes extreme hardening of existing muscle mass.'
    },
    {
        id: 'methenolone', folder: 'DHT Derivatives', category: 'anabolic', type: 'AAS', name: 'Methenolone Enanthate', esters: '(Primobolan Depot)', status: 'active',
        overview: 'A notoriously mild and expensive DHT derivative. It was historically used to treat muscle wasting in children and premature infants due to its low toxicity. Favorably utilized by high-level athletes for its "clean" tissue-building properties.',
        primaryUses: 'Muscle wasting, severe weight loss, palliative care',
        mechanism: 'Exhibits a highly favorable anabolic-to-androgenic ratio. Cannot aromatize and places extremely low stress on the liver. Enhances nitrogen retention and protein synthesis without water storage.',
        dosage: 'Oral: 50-150mg/day. IM: 100-200mg/week (medical).',
        experimental: { b: '300–400 mg/wk', a: '600–1000 mg/wk' },
        risks: 'Mild suppression, hair loss (in predisposed individuals), lipid disruption at high doses.',
        impact: { brain: 0, heart: 1, liver: 0, kidneys: 1, blood: 3, hair: 3, joints: 0 },
        aestheticProfile: 'Considered the most "aesthetic" steroid. Provides a very slow, high-quality gain of lean muscle that remains post-cycle. Skin looks thin and "paper-like" while muscles appear dense and athletic.',
        physiologicalTargets: 'Primarily targets skeletal muscle tissue AR. Known for its ability to preserve muscle mass even in extreme caloric deficits (starvation levels).'
    },
    {
        id: 'dht', folder: 'DHT Derivatives', category: 'anabolic', type: 'AAS', name: 'Dihydrotestosterone', esters: '(DHT)', status: 'active',
        overview: 'Pure Dihydrotestosterone is the most potent androgen found natively in the human body. In medicine, it is usually administered topically as a gel.',
        primaryUses: 'Microphallus treatment, severe androgen deficiency',
        mechanism: 'Binds to the androgen receptor with significantly greater affinity than testosterone. Non-aromatizable.',
        dosage: 'Topical: 2.5% gel applied daily.',
        experimental: { b: 'Rare', a: 'Rare' },
        benefits: 'Directly provides the most powerful androgenic signals for male development; effective for treating gyno and improving hardness without water retention.',
        risks: 'Prostate enlargement, accelerated male pattern baldness.',
        impact: { brain: 3, heart: 5, liver: 0, kidneys: 1, blood: 3, hair: 10, joints: 2 },
        cycleExamples: '<strong>Local Treatment:</strong> Historically used topically on the chest (Andractim) to directly combat pubertal gynecomastia by antagonizing estrogen at the receptor level.'
    },
    {
        id: 'mesterolone', folder: 'DHT Derivatives', category: 'anabolic', type: 'AAS', name: 'Mesterolone', esters: '(Proviron)', status: 'active',
        overview: 'An orally active, non-17-alpha-alkylated DHT derivative. Uniquely, it is used clinically to treat hypogonadism without causing significant gonadal suppression.',
        primaryUses: 'Androgen replacement, male infertility',
        mechanism: 'Strong affinity for Sex Hormone Binding Globulin (SHBG), increasing free testosterone. Highly androgenic but extremely weakly anabolic.',
        dosage: '25mg to 100mg per day.',
        experimental: { b: '25–50 mg/day', a: '50–100 mg/day' },
        benefits: 'Dramatically improves "free" testosterone by soaking up SHBG; provides a hard, grainy look to muscles; significantly boosts libido and mood.',
        risks: 'Prostate issues, hair loss.',
        impact: { brain: -4, heart: 4, liver: 1, kidneys: 1, blood: 4, hair: 8, joints: 2 },
        cycleExamples: '<strong>The Finisher:</strong> Often added to the final 4 weeks of a contest prep cycle at 50mg daily to enhance muscle hardness and mitigate the libido-crushing effects of low body fat.'
    },
    {
        id: 'epitiostanol', folder: 'DHT Derivatives', category: 'anabolic', type: 'AAS', name: 'Epitiostanol', esters: '', status: 'discontinued',
        overview: 'A unique DHT derivative holding an epithio group. Originally developed in Japan as a potent anti-estrogen to combat breast cancer.',
        primaryUses: 'Breast cancer treatment (Japan)',
        mechanism: 'Highly potent anti-estrogenic androgen. Acts as an aromatase inhibitor as well as binding directly to AR.',
        dosage: '10mg to 20mg IM weekly (historic).',
        experimental: { b: 'Rare', a: '20–40 mg/day (via oral prohormone Epi-Tren)' },
        benefits: 'Strongly anti-estrogenic; useful for mitigating gyno while simultaneously providing a mild anabolic stimulus.',
        risks: 'Lethargy, joint pain (due to low estrogen), liver toxicity.',
        impact: { brain: 2, heart: 4, liver: 5, kidneys: 1, blood: 4, hair: 3, joints: 6 },
        cycleExamples: '<strong>Gyno Suppression:</strong> Historically utilized in Japan at 10mg weekly to treat benign breast tumors and gynecological disorders.'
    },

    // --- NANDROLONE DERIVATIVES ---
    {
        id: 'nandrolone_decanoate', folder: 'Nandrolone Derivatives', category: 'anabolic', type: 'AAS', name: 'Nandrolone Decanoate', esters: '(Deca-Durabolin)', status: 'active',
        overview: 'Deca-Durabolin is a slow-acting 19-nor anabolic steroid historically used to treat osteoporosis and anemia, highly favored for its joint-lubricating properties.',
        primaryUses: 'Severe anemia, osteoporosis, joint pain relief',
        mechanism: 'Lacks a carbon at the 19th position. It aromatizes at roughly 20% the rate of testosterone but binds strongly to the progesterone receptor.',
        dosage: '50mg to 100mg IM every 3-4 weeks.',
        experimental: { b: '200–400 mg/wk', a: '600–800 mg/wk' },
        benefits: 'Profound joint relief via synovial fluid retention, massive intracellular nitrogen retention, and excellent preservation of mass during caloric deficits.',
        risks: 'Prolonged HPTA suppression, prolactin elevation, severe libido decimation ("Deca Dick").',
        impact: { brain: 4, heart: 3, liver: 0, kidneys: 2, blood: 3, hair: 1, joints: -8 },
        aestheticProfile: 'Provides a "soft" but massive look. Muscles appear smooth and watery, but extremely large. Yields a very "thick" appearance in the back and legs.',
        physiologicalTargets: 'Targets the synovial fluid in joints (therapeutic) and the mu-opioid receptors (indirectly, via pain suppression). High affinity for skeletal muscle hypertrophy.',
        cycleExamples: '<strong>The Classic Mass Builder:</strong> Historically stacked alongside a testosterone base to mitigate libido crash. E.g., 500mg Testosterone / 300mg Deca-Durabolin weekly for 16 weeks.'
    },
    {
        id: 'nandrolone_npp', folder: 'Nandrolone Derivatives', category: 'anabolic', type: 'AAS', name: 'Nandrolone Phenylpropionate', esters: '(NPP)', status: 'active',
        overview: 'NPP is the faster-acting ester form of Nandrolone. It clears the system much faster, making side effects easier to mitigate if they arise.',
        primaryUses: 'Breast cancer control, severe osteoporosis',
        mechanism: 'Identical to Decanoate but carries a much shorter ester, reducing the half-life from 15 days to approximately 4-5 days.',
        dosage: '50mg to 100mg IM weekly.',
        experimental: { b: '300–400 mg/wk', a: '500–800 mg/wk' },
        benefits: 'Rapidly clears the body if side effects manifest; identical therapeutic profile to Decanoate with significantly less long-term HPTA suppression lag.',
        risks: 'Prolactin elevation, cardiovascular strain, severe suppression.',
        impact: { brain: 3, heart: 4, liver: 0, kidneys: 2, blood: 3, hair: 1, joints: -6 },
        cycleExamples: '<strong>Short Cycle Support:</strong> Often favored for shorter (8-10 week) cycles where Deca is impractical due to its extremely long clearance time.'
    },
    {
        id: 'trenbolone_acetate', folder: 'Nandrolone Derivatives', category: 'anabolic', type: 'AAS', name: 'Trenbolone Acetate', esters: '(Finaplix)', status: 'discontinued',
        overview: 'A notoriously powerful, fast-acting veterinary steroid. It was never approved for human therapeutic use, instead utilized exclusively to radically increase feed efficiency in cattle.',
        primaryUses: 'Livestock feed efficiency',
        mechanism: 'A 19-nor derivative that is 5x more anabolic and androgenic than testosterone. Extreme nutrient partitioning effects.',
        dosage: 'Administered via subcutaneous pellets in cattle.',
        experimental: { b: '200–300 mg/wk', a: '350–500 mg/wk' },
        synthesis: 'Synthesized through the reduction of 19-nortestosterone derivatives.',
        synthesisSteps: [
            'Synthesis of Nandrolone base via Birch Reduction.',
            'Conversion to a trienic structure (delta-9,11-triene) via selective bromination and dehydrobromination.',
            'Esterification with acetic anhydride to produce the Acetate variant.',
            'Lyophilization and pelletization for commercial veterinary distribution.'
        ],
        ingredients: ['19-Nortestosterone Base', 'Acetic Anhydride', 'Ammonia (Liquid)', 'Lithium Metal', 'Solvent (THF)', 'Magnesium Carbonate'],
        location: 'Global (Industrial Synthesis Centers), primarily China and Europe.',
        storage: { temp: '20-25°C', light: 'Opaque glass recommended', shelf: '24 Months', notes: 'Trenbolone is highly susceptible to oxidation. Discoloration (turning dark orange/red) indicates potential degradation.' },
        risks: 'Severe cardiotoxicity, kidney strain, night sweats, aggression, unrecoverable HPTA shutdown.',
        impact: { brain: 9, heart: 10, liver: 3, kidneys: 7, blood: 8, hair: 9, joints: 0 },
        aestheticProfile: 'The ultimate visual transformer. Creates a "superhuman" look: extreme vascularity, dry muscle, and a "leathery" skin texture. Muscles look like they were "carved out of granite".',
        physiologicalTargets: 'Binds to the AR with 5x the affinity of Testosterone. Directly increases red blood cell count and nutrient partitioning to an extreme degree.'
    },
    {
        id: 'trenbolone_enanthate', folder: 'Nandrolone Derivatives', category: 'anabolic', type: 'AAS', name: 'Trenbolone Enanthate', esters: '', status: 'discontinued',
        overview: 'A long-acting, underground version of Trenbolone. Designed purely for performance enhancement to reduce injection frequency compared to Acetate.',
        primaryUses: 'None (strictly illicit performance use)',
        mechanism: 'Carries the Enanthate ester, delaying release into the bloodstream. Takes weeks to fully clear the system if severe side effects occur.',
        dosage: 'Not medically prescribed.',
        experimental: { b: '200–400 mg/wk', a: '400–800 mg/wk' },
        benefits: 'Provides the most extreme body recomposition known to science; radical fat loss while gaining significant lean tissue; requires less frequent injections than Acetate.',
        risks: 'Insomnia, heavy cardiovascular strain, harsh mental side effects.',
        impact: { brain: 10, heart: 10, liver: 3, kidneys: 8, blood: 9, hair: 9, joints: 0 },
        cycleExamples: '<strong>The Advanced Recomp:</strong> A high-fidelity protocol often documented in underground research involves 400mg Tren Enanthate and 500mg Test Enanthate weekly for 12 weeks.'
    },
    {
        id: 'trenbolone_parabolan', folder: 'Nandrolone Derivatives', category: 'anabolic', type: 'AAS', name: 'Trenbolone Hexahydrobenzylcarbonate', esters: '(Parabolan)', status: 'discontinued',
        overview: 'Parabolan was the only form of Trenbolone ever officially produced for human use (in France). It was prescribed for malnutrition and osteoporosis before being discontinued in 1997.',
        primaryUses: 'Historically: Malnutrition, cachexia',
        mechanism: 'Carries the hexahydrobenzylcarbonate ester, roughly equivalent to Enanthate in release time. Binds violently to androgen and progesterone receptors.',
        dosage: '76mg IM every 14 days (historic).',
        experimental: { b: '150–225 mg/wk', a: '300–450 mg/wk' },
        benefits: 'The only human-grade Trenbolone ever synthesized; historically praised for its extremely high purity and unique release curve.',
        risks: 'Progesterone-based gynecomastia, severe HPTA shutdown.',
        impact: { brain: 8, heart: 10, liver: 3, kidneys: 7, blood: 8, hair: 9, joints: 0 },
        cycleExamples: '<strong>The Vintage Protocol:</strong> In the 1990s, French athletes were documented using 1 ampoule (76mg) every 3 days to achieve a dry, hard physique.'
    },

    // --- ORAL ANABOLICS ---
    {
        id: 'methandrostenolone', folder: 'Oral Anabolics', category: 'anabolic', type: 'AAS', name: 'Methandrostenolone', esters: '(Dianabol)', status: 'discontinued',
        overview: 'Dianabol was famously developed by Dr. John Ziegler and Ciba Pharmaceuticals specifically to help the US Olympic lifting team beat the Soviets in 1956.',
        primaryUses: 'Historically: Muscle wasting, athletic doping',
        mechanism: '17-alpha-alkylated oral steroid. Interacts heavily with aromatase, converting to highly potent 17a-methylestradiol causing enormous rapid water retention and mass gain.',
        dosage: '5mg per day (historic).',
        experimental: { b: '20–30 mg/day', a: '40–50 mg/day' },
        benefits: 'Extremely rapid surges in strength, colossal glycogen storage, and sudden massive weight gain.',
        risks: 'Severe blood pressure spikes, high liver toxicity, extreme bloating, left ventricular hypertrophy.',
        impact: { brain: 2, heart: 8, liver: 9, kidneys: 5, blood: 7, hair: 5, joints: -2 },
        cycleExamples: '<strong>The Kickstart:</strong> Orals are commonly used as "kickstarts" for the first 4 weeks of an injectable cycle while the long esters build up. E.g., 30mg Dianabol daily (Weeks 1-4) stacked with 500mg Testosterone (Weeks 1-12).'
    },
    {
        id: 'oxymetholone', folder: 'Oral Anabolics', category: 'anabolic', type: 'AAS', name: 'Oxymetholone', esters: '(Anadrol)', status: 'active',
        overview: 'One of the most potent oral steroids ever developed. Clinically designed exclusively to drastically stimulate red blood cell production in severe anemia patients.',
        primaryUses: 'Severe anemia, HIV/AIDS wasting',
        mechanism: 'Potent 17aa oral. Drastically stimulates erythropoiesis via enhanced production of erythropoietin. Does not aromatize but still activates estrogen receptors directly.',
        dosage: '1mg to 5mg per kg of bodyweight per day.',
        experimental: { b: '25–50 mg/day', a: '75–100 mg/day' },
        risks: 'High hepatotoxicity, lethal water retention mechanisms, extreme lipid strain.',
        impact: { brain: 3, heart: 10, liver: 10, kidneys: 4, blood: 9, hair: 3, joints: -4 }
    },
    {
        id: 'turinabol', folder: 'Oral Anabolics', category: 'anabolic', type: 'AAS', name: 'Turinabol', esters: '(CDMT)', status: 'discontinued',
        overview: 'Originally developed in East Germany, CDMT was famous for being the backbone of the state-sponsored doping program in the 1960s and 70s.',
        primaryUses: 'Historically: Athletic doping',
        mechanism: 'Essentially Dianabol with an added chloro group at position 4. This entirely prevents aromatization, leading to dry, lean gains without water weight.',
        dosage: '5mg to 10mg per day (Historical medical).',
        experimental: { b: '20–40 mg/day', a: '50–80 mg/day' },
        benefits: 'Provides clean, steady strength gains without the bloating of Dianabol; significantly improves athletic performance without a major change in body weight.',
        risks: 'Severe lipid disruption, highly suppressive to natural hormones.',
        impact: { brain: 1, heart: 5, liver: 5, kidneys: 3, blood: 7, hair: 2, joints: 0 },
        cycleExamples: '<strong>The "Blue Heart" Protocol:</strong> Historically used at 20-40mg daily by Olympic sprinters and swimmers to increase power-to-weight ratios.'
    },
    {
        id: 'fluoxymesterone', folder: 'Oral Anabolics', category: 'anabolic', type: 'AAS', name: 'Fluoxymesterone', esters: '(Halotestin)', status: 'active',
        overview: 'Halotestin is famously one of the most highly toxic oral androgens ever created, utilized primarily by powerlifters to drastically surge strength and aggression before a meet.',
        primaryUses: 'Male hypogonadism (rare), delayed puberty',
        mechanism: 'Features a fluoro group at carbon 9 and a hydroxyl group at carbon 11. It binds absurdly well to the AR, yielding massive strength increases without any mass gain.',
        dosage: '2mg to 10mg per day.',
        experimental: { b: '10–20 mg/day', a: '30–40 mg/day' },
        benefits: 'The most potent oral androgen for raw strength; dramatically increases aggression and motivation before competition; zero estrogenic side effects.',
        risks: 'Extreme liver toxicity, acute aggression ("Roid Rage"), lipid devastation.',
        impact: { brain: 10, heart: 8, liver: 10, kidneys: 6, blood: 10, hair: 8, joints: 0 },
        cycleExamples: '<strong>The Meet Prep:</strong> 10mg taken 60 minutes before a heavy lifting session to maximize CNS output and aggression.'
    },
    {
        id: 'methyltestosterone', folder: 'Oral Anabolics', category: 'anabolic', type: 'AAS', name: 'Methyltestosterone', esters: '', status: 'active',
        overview: 'One of the oldest oral anabolic steroids. It is literally just testosterone with a methyl group attached at C-17 to permit oral survival.',
        primaryUses: 'Testosterone deficiency, advanced breast cancer',
        mechanism: 'C-17 alpha alkylation allows for oral bioavailability. Converts heavily into the extremely potent 17a-methylestradiol causing mass aromatization issues.',
        dosage: '10mg to 50mg per day.',
        experimental: { b: '20–40 mg/day', a: '40–50 mg/day' },
        benefits: 'Fast-acting oral testosterone boost; historically effective for treating delayed puberty and advanced female breast cancer.',
        risks: 'Profound liver stress, massive water retention, gynecomastia.',
        impact: { brain: 3, heart: 7, liver: 8, kidneys: 4, blood: 6, hair: 5, joints: 0 },
        cycleExamples: '<strong>Historical TRT:</strong> Before the advent of injectable esters, 25mg daily was a standard medical dose for treating male androgen deficiency.'
    },

    // --- OTHER AAS ---
    {
        id: 'boldenone', folder: 'Other AAS', category: 'anabolic', type: 'AAS', name: 'Boldenone', esters: '(Equipoise)', status: 'discontinued',
        overview: 'Equipoise is a veterinary steroid initially created to treat horses. It provides slow, extremely steady gains with high cardiovascular endurance improvements.',
        primaryUses: 'Veterinary (Horses) - to improve appetite and coat',
        mechanism: 'Testosterone structure with an added double bond at carbon 1 and 2. It aromatizes at exactly 50% the rate of testosterone and dramatically raises red blood cells.',
        dosage: 'Administered via IM in equines.',
        experimental: { b: '300–400 mg/wk', a: '600–1000 mg/wk' },
        benefits: 'Promotes extreme vascularity and muscle endurance; significantly increases appetite in low-hunger individuals; provides lean, slow, and keepable tissue gains.',
        risks: 'Dangerous hematocrit elevation, severe anxiety (rare), suppression.',
        impact: { brain: 5, heart: 4, liver: 0, kidneys: 2, blood: 10, hair: 3, joints: 0 },
        cycleExamples: '<strong>The Slow Gainer:</strong> Boldenone is typically run for long durations (16-20 weeks) due to the extremely long Undecylenate ester. A common protocol is 600mg Equipoise / 500mg Testosterone weekly.'
    },
    {
        id: 'clostebol', folder: 'Other AAS', category: 'anabolic', type: 'AAS', name: 'Clostebol', esters: '', status: 'active',
        overview: 'A weak synthetic AAS primarily used topically to heal skin lesions or surgically in ophthalmology.',
        primaryUses: 'Dermatology, burn recovery, corneal ulcers',
        mechanism: 'Testosterone derivative with an added 4-chloro modification, preventing conversion to both DHT and estrogen. Very low anabolic potency.',
        dosage: 'Applied topically as a cream or spray.',
        experimental: { b: 'Rare', a: 'Rare' },
        risks: 'Very mild compared to standard AAS, topical irritation.',
    },
    {
        id: 'danazol', folder: 'Other AAS', category: 'anabolic', type: 'AAS', name: 'Danazol', esters: '', status: 'active',
        overview: 'Danazol is a synthetic steroid derived from ethisterone. Unusually, it is heavily used to treat endometriosis in women.',
        primaryUses: 'Endometriosis, profound heavy menstrual bleeding',
        mechanism: 'Suppresses the pituitary-ovarian axis, creating a high-androgen, low-estrogen environment in the body.',
        dosage: '100mg to 400mg per day (oral in females).',
        experimental: { b: 'Not for performance', a: 'Rare' },
        benefits: 'Uniquely effective at halting severe endometriosis pain and heavy bleeding; can be used in males to lower SHBG, though rarely used for this purpose.',
        risks: 'Voice deepening in females, acne, fluid retention.',
        impact: { brain: 1, heart: 2, liver: 4, kidneys: 1, blood: 4, hair: 3, joints: 0 },
        cycleExamples: '<strong>Clinical Protocol:</strong> 400mg daily for 6 months is the standard documented medical regimen for treating endometriosis.'
    },
    {
        id: 'mestanolone', folder: 'Other AAS', category: 'anabolic', type: 'AAS', name: 'Mestanolone', esters: '', status: 'discontinued',
        overview: 'A 17a-methylated version of DHT. Originally part of East German doping to prevent fatigue but rarely seen today.',
        primaryUses: 'Historically: Hypogonadism',
        mechanism: 'Pure DHT that can survive liver pass. Cannot aromatize. Highly androgenic, causes strong CNS stimulation.',
        dosage: '10mg to 20mg a day (historic).',
        experimental: { b: 'Rare', a: 'Rare' },
        benefits: 'Provides an immediate boost in nervous system drive and focus; useful for peaking strength before an athletic event.',
        risks: 'Severe liver stress, prostate hypertrophy.',
        impact: { brain: 6, heart: 4, liver: 8, kidneys: 2, blood: 5, hair: 8, joints: 0 },
        cycleExamples: '<strong>The Pre-Drive:</strong> Historically used at 20mg daily by power athletes to improve "explosiveness" during training sessions.'
    },
    {
        id: 'norbolethone', folder: 'Other AAS', category: 'anabolic', type: 'AAS', name: 'Norbolethone', esters: '', status: 'discontinued',
        overview: 'Norbolethone was the very first "designer steroid", famously produced exclusively to bypass Olympic drug testing in the early 2000s.',
        primaryUses: 'None (used secretly by athletes to evade Wada testing until identified)',
        mechanism: 'Potent oral 19-nor steroid. Creates mass and strength roughly on par with Dianabol but was undetectable for years.',
        dosage: 'Not medically prescribed.',
        experimental: { b: 'Rare', a: 'Rare' },
        risks: 'Liver toxicity, severe HPTA shut down.',
    },
    {
        id: 'trestolone', folder: 'Other AAS', category: 'anabolic', type: 'AAS', name: 'Trestolone', esters: '(MENT)', status: 'experimental',
        overview: 'Trestolone (7a-methyl-19-nortestosterone) was heavily researched as a potential male contraceptive because it totally decimates sperm production while replacing testosterone.',
        primaryUses: 'Experimental male contraceptive research',
        mechanism: 'A 19-nor derivative that is highly resistant to SHBG. Extremely potent—often cited as yielding 10x the muscle building capability of testosterone.',
        dosage: 'Experimental patch/implant.',
        experimental: { b: '10–20 mg/day', a: '25–50 mg/day' },
        benefits: 'The most powerful muscle builder ever synthesized; creates a total physiological shutdown of sperm production (making it a potential male pill) while replacing all androgenic needs.',
        risks: 'Insane aromatization rates (requires heavy AI usage), severe lethargy, complete infertility.',
        impact: { brain: 4, heart: 8, liver: 0, kidneys: 4, blood: 6, hair: 4, joints: 0 },
        cycleExamples: '<strong>The Contraceptive Research:</strong> Documented in clinical trials where 10-20mg daily successfully maintained masculine characteristics while zeroing out sperm count.'
    },

    // --- CORTICOSTEROIDS ---
    {
        id: 'prednisone', folder: 'Glucocorticoids', category: 'corticosteroids', type: 'Glucocorticoid', name: 'Prednisone', esters: '', status: 'active',
        overview: 'Prednisone is a synthetic glucocorticoid mostly used to suppress the immune system and decrease inflammation in conditions such as asthma, COPD, and rheumatologic diseases.',
        primaryUses: 'Asthma, autoimmune diseases, severe allergies',
        mechanism: 'Systemic, potent anti-inflammatory and immunosuppressant. A prodrug that is converted by the liver into prednisolone.',
        dosage: '5mg to 60mg per day (highly variable by condition).',
        experimental: { b: '5–60 mg/day', a: 'Up to 80 mg/day' },
        benefits: 'Rapidly halts acute autoimmune flares and life-threatening allergic reactions; effective at managing severe poison ivy or organ transplant rejection.',
        risks: 'Hyperglycemia, osteoporosis, mood swings, weight gain.',
        impact: { brain: 6, heart: 4, liver: 2, kidneys: 2, blood: 4, hair: 2, joints: -4 },
        cycleExamples: '<strong>The Flare Blast:</strong> A standard 60mg daily dose for 5 days, followed by a slow taper over 14 days, is often used to treat acute asthma or joint inflammation.'
    },
    {
        id: 'prednisolone', folder: 'Glucocorticoids', category: 'corticosteroids', type: 'Glucocorticoid', name: 'Prednisolone', esters: '', status: 'active',
        overview: 'Prednisolone is the active metabolite of Prednisone. It is used directly when patients suffer from severe liver failure and cannot convert prednisone.',
        primaryUses: 'Uveitis, asthma, rheumatoid arthritis',
        mechanism: 'Directly acts on glucocorticoid receptors to halt the transcription of inflammatory genes.',
        dosage: '5mg to 60mg daily.',
        experimental: { b: 'Various', a: 'Various' },
        risks: 'Cataracts, adrenal suppression, skin thinning.',
    },
    {
        id: 'dexamethasone', folder: 'Glucocorticoids', category: 'corticosteroids', type: 'Glucocorticoid', name: 'Dexamethasone', esters: '', status: 'active',
        overview: 'Dexamethasone is an extraordinarily potent, long-acting synthetic glucocorticoid—roughly 25 times more potent than endogenous cortisol.',
        primaryUses: 'Cerebral edema, severe inflammation, certain cancers',
        mechanism: 'Halts inflammatory pathways instantly. Almost entirely devoid of mineralocorticoid (salt-retaining) activity.',
        dosage: '0.75mg to 9mg per day depending on condition.',
        experimental: { b: '0.5–9 mg/day', a: '10–20 mg/day' },
        risks: 'Potent mass immunosuppression, severe adrenal suppression risk.',
    },
    {
        id: 'hydrocortisone', folder: 'Glucocorticoids', category: 'corticosteroids', type: 'Glucocorticoid', name: 'Hydrocortisone', esters: '', status: 'active',
        overview: 'Hydrocortisone is the direct pharmaceutical term for cortisol. Often used to literally replace missing cortisol in Addisons disease patients.',
        primaryUses: 'Adrenal insufficiency, severe eczema',
        mechanism: 'Replaces natural cortisol, carrying equal parts glucocorticoid and mineralocorticoid activity.',
        dosage: 'Oral: 20-40mg/day; Topical: 0.5%-2.5% cream.',
        experimental: { b: 'Variable', a: 'Variable' },
        risks: 'HPA axis suppression, fluid retention, skin thinning.',
    },
    {
        id: 'cortisone', folder: 'Glucocorticoids', category: 'corticosteroids', type: 'Glucocorticoid', name: 'Cortisone', esters: '', status: 'active',
        overview: 'Often administered via painful injections directly into joints to provide rapid, localized relief from arthritis or severe tendonitis.',
        primaryUses: 'Joint inflammation, tendonitis, bursitis',
        mechanism: 'Inactive until converted to cortisol by the liver. Depresses the immune response and localized swelling.',
        dosage: 'Variable via localized joint injection.',
        experimental: { b: 'Variable', a: 'Variable' },
        risks: 'Cartilage destruction (if injected too frequently), localized tendon rupture.',
    },
    {
        id: 'betamethasone', folder: 'Glucocorticoids', category: 'corticosteroids', type: 'Glucocorticoid', name: 'Betamethasone', esters: '', status: 'active',
        overview: 'Betamethasone is extremely potent and routinely given to pregnant mothers right before premature delivery to rapidly accelerate the baby’s lung development.',
        primaryUses: 'Fetal lung maturation, severe eczema (topical)',
        mechanism: 'Easily crosses the placenta. Promotes the production of surfactant within the fetal lungs.',
        dosage: 'Topical: 0.05% cream. IM: roughly 12mg (fetal distress).',
        experimental: { b: 'Variable', a: 'Variable' },
        risks: 'Stunted long-term fetal growth (if overused), typical corticosteroid risks.',
    },
    {
        id: 'methylprednisolone', folder: 'Glucocorticoids', category: 'corticosteroids', type: 'Glucocorticoid', name: 'Methylprednisolone', esters: '', status: 'active',
        overview: 'Typically administered as a "dose pack" starting extremely high and tapering off over a week to blast out acute autoimmune attacks or poison ivy.',
        primaryUses: 'Acute asthmatic attacks, severe allergic reactions',
        mechanism: 'Intense anti-inflammatory properties, marginally more potent than prednisone with slightly less water retention.',
        dosage: 'Medrol Dosepak (4mg to 24mg tapering).',
        experimental: { b: 'Variable', a: 'Variable' },
        risks: 'Intense sleep disruption, dramatic mood swings.',
    },
    {
        id: 'triamcinolone', folder: 'Glucocorticoids', category: 'corticosteroids', type: 'Glucocorticoid', name: 'Triamcinolone', esters: '', status: 'active',
        overview: 'A long-acting corticosteroid often injected into joint spaces or used topically for mouth sores and eczema.',
        primaryUses: 'Intra-articular joint arthritis, severe aphthous stomatitis',
        mechanism: 'Highly localized anti-inflammatory mechanisms. Five times as potent as cortisol.',
        dosage: 'Variable (often 10mg to 40mg per joint).',
        experimental: { b: 'Variable', a: 'Variable' },
        risks: 'Skin discoloration at injection site, systemic absorption side effects.',
    },
    {
        id: 'fluticasone', folder: 'Glucocorticoids', category: 'corticosteroids', type: 'Glucocorticoid', name: 'Fluticasone', esters: '(Flonase)', status: 'active',
        overview: 'Extremely common OTC nasal spray (Flonase) and inhaled powder (Flovent) used daily by millions to battle seasonal allergies or asthma.',
        primaryUses: 'Allergic rhinitis, mild to moderate asthma',
        mechanism: 'Topical/inhaled application heavily mitigates systemic absorption while radically reducing localized nasal or bronchial mast-cell degranulation.',
        dosage: '1 to 2 sprays per nostril daily.',
        experimental: { b: 'Variable', a: 'Variable' },
        risks: 'Nosebleeds, mild throat irritation, oral thrush (if inhaled via mouth).',
    },
    {
        id: 'budesonide', folder: 'Glucocorticoids', category: 'corticosteroids', type: 'Glucocorticoid', name: 'Budesonide', esters: '', status: 'active',
        overview: 'Widely heavily used to combat severe gastrointestinal diseases like Crohns via encapsulated pills designed to release exclusively in the intestines.',
        primaryUses: 'Crohn’s disease, ulcerative colitis, asthma',
        mechanism: 'Features incredibly high first-pass metabolism, meaning when swallowed it hits the gut with massive inflammation suppression but is destroyed before reaching systemic circulation.',
        dosage: 'Oral: 9mg per day for active Crohn’s.',
        experimental: { b: 'Variable', a: 'Variable' },
        risks: 'Relatively low systemic side effects compared to prednisone, mild bone density loss with prolonged use.',
    },

    // --- PEPTIDES & GROWTH FACTORS ---
    {
        id: 'somatropin', folder: 'Growth Factors', category: 'peptides', type: 'Peptide', name: 'Human Growth Hormone', esters: '(Somatropin)', status: 'active',
        overview: 'Synthetic human growth hormone. Highly prized in clinical settings for treating growth failure in children and severe wasting in HIV/AIDS patients. Extensively used in anti-aging and bodybuilding.',
        primaryUses: 'HGH deficiency, Turner syndrome, HIV wasting',
        mechanism: 'Binds to the GH receptor, triggering the liver to produce IGF-1 which mediates profound systemic cellular growth and extreme lipolysis.',
        dosage: '1 to 3 IU daily (clinical/anti-aging).',
        experimental: { b: '2–4 IU/day', a: '8–16 IU/day' },
        benefits: 'Accelerated fat loss, systemic tissue healing, hyperplasia (new muscle cell creation), improved sleep architecture.',
        risks: 'Insulin resistance, carpal tunnel syndrome, organomegaly (enlarged organs).',
        impact: { brain: -3, heart: 4, liver: 0, kidneys: 1, blood: 6, hair: 0, joints: -6 },
        synthesis: 'Manufactured via Recombinant DNA technology (rDNA).',
        synthesisSteps: [
            'Encoding of the 191-amino acid human GH sequence into a bacterial plasmid.',
            'Transformation of a specialized E. coli host cell line (K-12).',
            'Fermentation: Large-scale culturing in bioreactors with strict oxygen/pH monitoring.',
            'Centrifugation and Lysis: Harvesting cells and extracting the raw protein.',
            'Column Chromatography: Precise purification to remove host cell proteins and DNA.',
            'Freeze-drying (Lyophilization) to produce the stable white powder.'
        ],
        ingredients: ['E. Coli K-12 Host Cells', 'Recombinant DNA Plasmid', 'Luria-Bertani (LB) Broth', 'IPTG inducer', 'HEPES Buffer', 'Manganese Sulfate'],
        location: 'Specialized Bio-Safety Level 2 (BSL-2) laboratories globally.',
        storage: { temp: '2-8°C (Refrigerated)', light: 'Sensitive to UV', shelf: '12 Months (Vial)', notes: 'EXTREMELY FRAGILE. Do not shake or freeze. Reconstituted peptides must be used within 14-28 days.' },
        cycleExamples: '<strong>Long Term Anti-Aging:</strong> 2 IU injected subcutaneously every morning upon waking, run continuously for 6+ months.'
    },
    {
        id: 'igf1_lr3', folder: 'Growth Factors', category: 'peptides', type: 'Peptide', name: 'IGF-1 LR3', esters: '', status: 'experimental',
        overview: 'A vastly modified analog of Insulin-Like Growth Factor 1. The LR3 modification dramatically extends the active half-life from 20 minutes to nearly 24 hours.',
        primaryUses: 'Experimental anabolism, tissue repair',
        mechanism: 'Binds directly to muscle tissue IGF receptors entirely bypassing the liver. Extremely potent promoter of localized hyperplasia.',
        dosage: 'Not medically approved.',
        experimental: { b: '20–40 mcg/day', a: '50–100 mcg/day' },
        benefits: 'Nutrient partitioning, localized pumping, hyperplasia.',
        risks: 'Hypoglycemia, immense risk of exacerbating undetected tumors/cancers.',
        impact: { brain: 1, heart: 3, liver: 2, kidneys: 1, blood: 5, hair: 0, joints: 2 },
        cycleExamples: '<strong>Post-Workout Localized:</strong> 40mcg injected bilaterally into the trained muscle group immediately post-workout for 4 weeks.'
    },
    {
        id: 'insulin', folder: 'Metabolism & Fat Loss', category: 'peptides', type: 'Peptide', name: 'Insulin', esters: '(Humalog, Novolog)', status: 'active',
        overview: 'The most anabolic hormone in the human body. Primarily produced by the pancreas to drive glucose from the blood into cells. Clinically used for diabetes management.',
        primaryUses: 'Type 1 & Type 2 Diabetes',
        mechanism: 'Unlocks cellular gates allowing massive and instantaneous shuttling of glucose, amino acids, and nutrients directly into muscle (or fat) tissue.',
        dosage: 'Varies dramatically per patient.',
        experimental: { b: 'Dangerous/Not Rec.', a: '5–10 IU post-workout' },
        benefits: 'Incredible glycogen storage causing massive tissue swelling; extremely synergistic with HGH and AAS.',
        risks: '<strong>Lethal Hypoglycemia.</strong> Acute overdose can cause extremely rapid coma and death.',
        impact: { brain: 1, heart: 2, liver: 0, kidneys: 0, blood: 10, hair: 0, joints: 0 },
        cycleExamples: '<strong>Bulking Protocol:</strong> 5 IU Humalog injected instantly post training, followed within 5 minutes by 60g dextrose and whey. <strong>High death risk.</strong>'
    },
    {
        id: 'bpc157', folder: 'Regeneration & Recovery', category: 'peptides', type: 'Peptide', name: 'BPC-157', esters: '', status: 'experimental',
        overview: 'Body Protection Compound 157 is an astoundingly potent regenerative peptide derived from human gastric juices. Known for nearly miraculous healing of tendons and ligaments.',
        primaryUses: 'Experimental injury recovery',
        mechanism: 'Dramatically upregulates VEGFR2 (angiogenesis) which forms new blood vessels around torn cartilage and tendons, accelerating healing permanently.',
        dosage: 'Not clinically approved.',
        experimental: { b: '250mcg twice daily', a: '500mcg twice daily' },
        benefits: 'Rapid tendon/ligament repair, severe reduction in localized pain, gastric healing.',
        risks: 'Unknown long term tumor risk (due to massive angiogenesis).',
        impact: { brain: 1, heart: 1, liver: 1, kidneys: 1, blood: 1, hair: 0, joints: 10 },
        cycleExamples: '<strong>Injury Protocol:</strong> 250mcg injected subcutaneously as close to the injury site as possible, twice a day for 4-6 weeks.'
    },
    {
        id: 'mk677', folder: 'Growth Factors', category: 'peptides', type: 'SARM / Secretagogue', name: 'Ibutamoren', esters: '(MK-677)', status: 'experimental',
        overview: 'Ibutamoren is an orally active growth hormone secretagogue. Technically not a peptide or SARM itself, but highly grouped with them. It mimics the hunger hormone ghrelin.',
        primaryUses: 'Experimental frail/elderly wasting treatment',
        mechanism: 'Binds to the ghrelin receptor in the pituitary gland, violently forcing a sustained wave of endogenous HGH release without suppressing natural production.',
        dosage: 'Orally bioavailable.',
        experimental: { b: '10–12.5 mg/day', a: '20–25 mg/day' },
        benefits: 'Sustained HGH elevation, massive increase in appetite, deep restorative sleep.',
        risks: 'Lethargy, massive water retention, severe spike in insulin resistance.',
        impact: { brain: 2, heart: 3, liver: 1, kidneys: 1, blood: 4, hair: 0, joints: 2 },
        cycleExamples: '<strong>Bulking Addition:</strong> 25mg taken orally prior to bed for 3+ months to elevate basal IGF-1 and provoke immense appetite.'
    },

    // -- Growth Hormone Secretagogues --
    {
        id: 'cjc1295', folder: 'Growth Factors', category: 'peptides', type: 'Peptide', name: 'CJC-1295', esters: '(with DAC)', status: 'experimental',
        overview: 'A long-acting synthetic version of Growth Hormone Releasing Hormone (GHRH). It binds to albumin to drastically increase its half-life to up to 8 days.',
        primaryUses: 'Experimental GH elevation, anti-aging',
        mechanism: 'Stimulates the pituitary gland to release a steady, prolonged pulse of endogenous growth hormone and IGF-1 without peaking prolactin.',
        dosage: '1000mcg to 2000mcg per week.',
        experimental: { b: '1000mcg/wk', a: '2000mcg/wk' },
        risks: 'Water retention, vivid dreams, mild lethargy.',
        impact: { brain: 2, heart: 2, liver: 1, kidneys: 1, blood: 3, hair: 0, joints: 2 }
    },
    {
        id: 'mod_grf', folder: 'Growth Factors', category: 'peptides', type: 'Peptide', name: 'Mod GRF 1-29', esters: '(CJC-1295 no DAC)', status: 'experimental',
        overview: 'Often confused with CJC-1295, this is a short-acting GHRH analog that perfectly mimics the natural pulsatile release of human growth hormone.',
        primaryUses: 'Experimental GH pulsatile elevation',
        mechanism: 'Instantly provokes a sharp burst of GH from the pituitary. Often stacked with a GHRP (like Ipamorelin) for a synergistic multiplier effect.',
        dosage: '100mcg administered 1-3 times daily.',
        experimental: { b: '100mcg/day', a: '300mcg/day' },
        risks: 'Head rush flush after injection, minor site irritation.',
        impact: { brain: 2, heart: 2, liver: 1, kidneys: 1, blood: 3, hair: 0, joints: 2 }
    },
    {
        id: 'sermorelin', folder: 'Growth Factors', category: 'peptides', type: 'Peptide', name: 'Sermorelin', esters: '', status: 'active',
        overview: 'A highly studied, medically approved GHRH analog often prescribed by anti-aging clinics as a safer alternative to direct HGH injection.',
        primaryUses: 'Anti-aging, idiopathic short stature in children',
        mechanism: 'Binds to the GHRH receptor causing a moderate, natural burst of growth hormone.',
        dosage: '0.2mg to 0.3mg subcutaneously nightly.',
        experimental: { b: '200mcg/day', a: '500mcg/day' },
        risks: 'Injection site pain, headaches, flushing.',
        impact: { brain: 2, heart: 2, liver: 1, kidneys: 1, blood: 2, hair: 0, joints: 2 }
    },
    {
        id: 'ghrp2', folder: 'Growth Factors', category: 'peptides', type: 'Peptide', name: 'GHRP-2', esters: '', status: 'experimental',
        overview: 'A powerful 2nd generation Growth Hormone Releasing Peptide. Extremely effective at spiking HGH but can increase hunger and raise prolactin/cortisol.',
        primaryUses: 'Experimental mass gain',
        mechanism: 'Mimics ghrelin to stimulate massive GH bursts. Less hunger-inducing than GHRP-6 but more prone to raising prolactin.',
        dosage: '100mcg to 300mcg daily.',
        experimental: { b: '100mcg/day', a: '300mcg/day' },
        risks: 'Elevated prolactin and cortisol, moderate hunger spikes.',
        impact: { brain: 2, heart: 2, liver: 1, kidneys: 1, blood: 3, hair: 0, joints: 2 }
    },
    {
        id: 'ghrp6', folder: 'Growth Factors', category: 'peptides', type: 'Peptide', name: 'GHRP-6', esters: '', status: 'experimental',
        overview: 'A 1st generation GHRP notoriously famous for causing almost uncontrollable, ravenous hunger 20 minutes after injection.',
        primaryUses: 'Experimental mass/appetite gain',
        mechanism: 'Powerfully agonizes the ghrelin receptor, releasing GH while mimicking extreme starvation signals to the brain.',
        dosage: '100mcg to 300mcg daily.',
        experimental: { b: '100mcg/day', a: '300mcg/day' },
        risks: 'Extreme hunger, prolactin elevation, water retention.',
        impact: { brain: 2, heart: 2, liver: 1, kidneys: 1, blood: 3, hair: 0, joints: 2 }
    },
    {
        id: 'hexarelin', folder: 'Growth Factors', category: 'peptides', type: 'Peptide', name: 'Hexarelin', esters: '', status: 'experimental',
        overview: 'The absolute strongest, most potent GHRP available. It causes the highest known spike in natural GH but carries the fastest rate of receptor desensitization.',
        primaryUses: 'Short-term peak GH elevation',
        mechanism: 'Acts identically to GHRP-6 but holds a much stronger binding affinity, leading to rapid burnout after 4 weeks of use.',
        dosage: '100mcg to 200mcg daily.',
        experimental: { b: '100mcg/day', a: '200mcg/day' },
        risks: 'Massive prolactin spikes, rapid receptor desensitization, intense lethargy.',
        impact: { brain: 3, heart: 3, liver: 1, kidneys: 1, blood: 4, hair: 0, joints: 2 }
    },
    {
        id: 'ipamorelin', folder: 'Growth Factors', category: 'peptides', type: 'Peptide', name: 'Ipamorelin', esters: '', status: 'active',
        overview: 'Considered the cleanest and mildest GHRP. It releases a prolonged, steady wave of HGH without spiking cortisol, prolactin, or intense hunger.',
        primaryUses: 'Anti-aging, mild fat loss',
        mechanism: 'Highly selective ghrelin mimetic that intentionally avoids triggering other stress hormone cascades.',
        dosage: '100mcg to 300mcg daily.',
        experimental: { b: '100mcg/day', a: '300mcg/day' },
        risks: 'Very mild; occasional head rush or slight water weight.',
        impact: { brain: 1, heart: 1, liver: 0, kidneys: 0, blood: 2, hair: 0, joints: 1 }
    },

    // -- Fat Loss & Metabolism --
    {
        id: 'hgh_frag', folder: 'Metabolism & Fat Loss', category: 'peptides', type: 'Peptide', name: 'HGH Frag 176-191', esters: '', status: 'experimental',
        overview: 'A highly specialized, isolated fragment of the Human Growth Hormone chain (amino acids 176 to 191) which isolates only the fat-burning properties of HGH.',
        primaryUses: 'Targeted lipolysis',
        mechanism: 'Directly upregulates lipolysis (fat breakdown) and severely inhibits lipogenesis (fat formation) without impacting insulin or causing cellular growth.',
        dosage: '250mcg to 500mcg injected multiple times daily.',
        experimental: { b: '250mcg/day', a: '1000mcg/day' },
        risks: 'Injection site welts, minor lethargy.',
        impact: { brain: 0, heart: 1, liver: 0, kidneys: 0, blood: 2, hair: 0, joints: 0 }
    },
    {
        id: 'aod9604', folder: 'Metabolism & Fat Loss', category: 'peptides', type: 'Peptide', name: 'AOD-9604', esters: '', status: 'experimental',
        overview: 'An FDA-contested structural modification of HGH Frag 176-191 originally engineered by Metabolic Pharmaceuticals as an anti-obesity drug.',
        primaryUses: 'Anti-obesity research',
        mechanism: 'Functions identically to Frag 176-191 but features structural stabilization for a slightly longer half-life.',
        dosage: '250mcg to 500mcg daily.',
        experimental: { b: '250mcg/day', a: '500mcg/day' },
        risks: 'Mild headaches, injection site irritation.',
        impact: { brain: 0, heart: 1, liver: 0, kidneys: 0, blood: 2, hair: 0, joints: 0 }
    },
    {
        id: 'tesamorelin', folder: 'Metabolics', category: 'peptides', type: 'Peptide', name: 'Tesamorelin', esters: '', status: 'active',
        overview: 'An FDA-approved highly potent GHRH analog specifically utilized to destroy visceral fat (hard organ fat) in HIV/AIDS patients.',
        primaryUses: 'HIV-associated lipodystrophy (visceral fat accumulation)',
        mechanism: 'Selectively stimulates the pituitary in a manner that radically oxidizes visceral adipose tissue with a higher affinity than subcutaneous fat.',
        dosage: '2mg daily.',
        experimental: { b: '1mg/day', a: '2mg/day' },
        risks: 'Insulin resistance, joint pain, edema.',
        impact: { brain: 2, heart: 3, liver: 1, kidneys: 1, blood: 4, hair: 0, joints: 2 }
    },
    {
        id: 'motsc', folder: 'Metabolism & Fat Loss', category: 'peptides', type: 'Peptide', name: 'MOTS-c', esters: '', status: 'experimental',
        overview: 'A newly discovered mitochondrial-derived peptide. It radically increases cellular energy expenditure, essentially acting as "exercise in a vial".',
        primaryUses: 'Anti-obesity, metabolic research',
        mechanism: 'Targets skeletal muscle mitochondria, activating AMPK and drastically increasing insulin sensitivity and glucose uptake.',
        dosage: '5mg injected weekly.',
        experimental: { b: '5mg/wk', a: '10mg/wk' },
        risks: 'Hypoglycemia, severe injection site pain.',
        impact: { brain: 1, heart: 2, liver: 1, kidneys: 1, blood: 3, hair: 0, joints: 1 }
    },

    // -- Healing & Growth --
    {
        id: 'tb500', folder: 'Regeneration & Recovery', category: 'peptides', type: 'Peptide', name: 'TB-500', esters: '(Thymosin Beta-4)', status: 'experimental',
        overview: 'A synthetic version of the naturally occurring healing protein Thymosin Beta-4. Widely used in horse racing and human sports to heal muscular tears.',
        primaryUses: 'Muscular tear recovery, inflammation reduction',
        mechanism: 'Upregulates actin, the protein responsible for cellular motility, allowing cells to literally swarm injury sites to create rapid healing grids.',
        dosage: 'Not medically approved.',
        experimental: { b: '2mg twice weekly', a: '5mg/wk' },
        risks: 'Lethargy, suspected minor angiogenesis tumor risks.',
        impact: { brain: 1, heart: 1, liver: 1, kidneys: 1, blood: 2, hair: 0, joints: 8 }
    },
    {
        id: 'peg_mgf', folder: 'Growth Hormones', category: 'peptides', type: 'Peptide', name: 'PEG-MGF', esters: '(Pegylated MGF)', status: 'experimental',
        overview: 'A splice variant of IGF-1 inherently produced into muscle tissue when it faces severe mechanical overload (heavy lifting). Pegylated to last days instead of minutes.',
        primaryUses: 'Experimental targeted hypertrophy',
        mechanism: 'Wakes up satellite cells surrounding muscle fibers, commanding them to bind to the fiber to create totally new muscle cells (hyperplasia).',
        dosage: 'Not medically approved.',
        experimental: { b: '200mcg/wk', a: '400mcg/wk' },
        risks: 'Hypoglycemia, intense exhaustion post-injection.',
        impact: { brain: 1, heart: 2, liver: 1, kidneys: 1, blood: 3, hair: 0, joints: 3 }
    },
    {
        id: 'igf1_des', folder: 'Growth Hormones', category: 'peptides', type: 'Peptide', name: 'IGF-1 DES', esters: '', status: 'experimental',
        overview: 'An ultra-short acting (20 minutes) variant of IGF-1, 10x more potent than standard IGF-1. Specifically designed to be shot directly into an overworked, acidic muscle belly.',
        primaryUses: 'Site-specific severe hyperplasia/growth',
        mechanism: 'Unlike LR3, DES bypasses lactic acid destruction entirely. It binds viciously to localized IGF receptors exactly where it is injected.',
        dosage: 'Not medically approved.',
        experimental: { b: '20mcg/day', a: '50mcg/day' },
        risks: 'Dangerous hypoglycemia, severe organ growth if systematically absorbed.',
        impact: { brain: 1, heart: 3, liver: 2, kidneys: 1, blood: 5, hair: 0, joints: 2 }
    },

    // -- Nootropics --
    {
        id: 'semax', folder: 'Nootropic Peptides', category: 'peptides', type: 'Peptide', name: 'Semax', esters: '', status: 'active',
        overview: 'A Russian-developed neuropeptide derived from ACTH. Extensively prescribed in Eastern Europe as an extreme cognitive enhancer and stroke recovery agent.',
        primaryUses: 'Stroke recovery, ADHD, optic nerve disease',
        mechanism: 'Radically increases Brain-Derived Neurotrophic Factor (BDNF) up to 500%, promoting rapid neurogenesis and cognitive clarity.',
        dosage: 'Nasal spray: 200mcg to 1000mcg daily.',
        experimental: { b: '300mcg/day', a: '1mg/day' },
        risks: 'Hair loss (BDNF upregulates DHT in scalp), overstimulation.',
        impact: { brain: 10, heart: 2, liver: 1, kidneys: 1, blood: 2, hair: 4, joints: 0 }
    },
    {
        id: 'selank', folder: 'Nootropic Peptides', category: 'peptides', type: 'Peptide', name: 'Selank', esters: '', status: 'active',
        overview: 'Another Russian-engineered neuropeptide, this one derived from Tuftsin. Highly renowned for its profound anti-anxiety (anxiolytic) effects without sedation.',
        primaryUses: 'Generalized anxiety disorder, PTSD',
        mechanism: 'Modulates GABA receptor expression and vastly increases serotonin/dopamine metabolic breakdown pathways. "Benzodiazepine effects without the brain fog".',
        dosage: 'Nasal spray: 250mcg to 500mcg daily.',
        experimental: { b: '250mcg/day', a: '1mg/day' },
        risks: 'Mild fatigue, completely blunted emotional responses at high doses.',
        impact: { brain: 8, heart: 1, liver: 1, kidneys: 1, blood: 2, hair: 0, joints: 0 }
    },
    {
        id: 'dihexa', folder: 'Nootropic Peptides', category: 'peptides', type: 'Peptide', name: 'Dihexa', esters: '', status: 'experimental',
        overview: 'A synthetic angiotensin IV derivative reportedly possessing 10 million times the neurotrophic potency of BDNF. Often called the "neuro-repair god matrix".',
        primaryUses: 'Alzheimers and Parkinsons research',
        mechanism: 'Binds to Hepatocyte Growth Factor (HGF) and its receptor c-Met, massively driving the formation of entirely new functional synapses in the brain.',
        dosage: 'Orally/Topically: 10mg to 20mg daily.',
        experimental: { b: '10mg/day', a: '20mg/day' },
        risks: 'Autism-like sensory overload, extreme theoretical cancer tumor escalation (binds to c-Met).',
        impact: { brain: 10, heart: 2, liver: 2, kidneys: 1, blood: 2, hair: 0, joints: 0 }
    },
    {
        id: 'cerebrolysin', folder: 'Nootropic Peptides', category: 'peptides', type: 'Peptide', name: 'Cerebrolysin', esters: '', status: 'active',
        overview: 'A unique peptide blend isolated heavily from purified porcine (pig) brains. Extensively used to radically heal extreme traumatic brain injuries.',
        primaryUses: 'TBI, Alzheimer’s, acute stroke recovery',
        mechanism: 'A chaotic blend of hundreds of neurotrophic factors (BDNF, GDNF, NGF) that systematically bathes the brain in raw reparative proteins.',
        dosage: 'IM/IV: 5mL to 20mL daily.',
        experimental: { b: '5mL/wk', a: '10mL/day' },
        risks: 'Lethargy, risk of prion-based diseases (extremely rare/theoretical), large injection volume.',
        impact: { brain: 10, heart: 2, liver: 2, kidneys: 1, blood: 2, hair: 0, joints: 0 }
    },

    // -- Immune & Sexual & Cosmetic --
    {
        id: 'thymosin_a1', folder: 'Immune & Anti-Aging', category: 'peptides', type: 'Peptide', name: 'Thymosin Alpha-1', esters: '', status: 'active',
        overview: 'A peptide naturally produced in the thymus gland. Historically approved in dozens of countries as an ultra-immune booster to fight Hepatitis B and COVID-19.',
        primaryUses: 'Chronic infections, immune fatigue, hepatitis',
        mechanism: 'Trains T-cells to aggressively hunt viruses while balancing out severe autoimmune/inflammatory cytokines.',
        dosage: '1.6mg twice weekly subcutaneously.',
        experimental: { b: '1.5mg/wk', a: '3mg/wk' },
        risks: 'Mild injection site irritation, autoimmune flare-ups (paradoxical).',
        impact: { brain: 1, heart: 1, liver: 1, kidneys: 1, blood: 5, hair: 0, joints: 1 }
    },
    {
        id: 'epitalon', folder: 'Immune & Anti-Aging', category: 'peptides', type: 'Peptide', name: 'Epitalon', esters: '(Epithalon)', status: 'experimental',
        overview: 'A Russian anti-aging tetrapeptide. Famous in anti-aging circles for its theoretical capacity to literally reverse the genetic aging clock by lengthening telomeres.',
        primaryUses: 'Experimental extreme life extension',
        mechanism: 'Activates telomerase directly, re-lengthening the protective caps (telomeres) on DNA strands and regulating the pineal gland/melatonin production.',
        dosage: '10mg daily for 10-20 days every 6 months.',
        experimental: { b: '10mg/day (10d)', a: '10mg/day (20d)' },
        risks: 'Deep/disruptive sleep, theoretical cancer acceleration.',
        impact: { brain: 3, heart: 2, liver: 1, kidneys: 1, blood: 2, hair: 1, joints: 1 }
    },
    {
        id: 'll37', folder: 'Immune & Peptides', category: 'peptides', type: 'Peptide', name: 'LL-37', esters: '', status: 'experimental',
        overview: 'A naturally occurring antimicrobial peptide. It is literally an endogenous human antibiotic capable of destroying extreme bacterial biofilms and pathogens.',
        primaryUses: 'Experimental autoimmune and Lyme disease treatment',
        mechanism: 'Electrostatically punches giant holes directly through the cell walls of harmful bacteria, viruses, and fungi, violently destroying them.',
        dosage: '100mcg to 250mcg daily.',
        experimental: { b: '100mcg/day', a: '100mcg/day' },
        risks: 'Severe autoimmune flare-ups tracking die-off ("Herxheimer reaction").',
        impact: { brain: 1, heart: 1, liver: 1, kidneys: 1, blood: 6, hair: 0, joints: 1 }
    },
    {
        id: 'pt141', folder: 'Sexual Optimization', category: 'peptides', type: 'Peptide', name: 'Bremelanotide', esters: '(PT-141)', status: 'active',
        overview: 'An FDA-approved peptide heavily marketed as Vyleesi. Unlike Viagra, which alters blood flow, PT-141 rewires the brain to cause profound, explosive arousal in both men and women.',
        primaryUses: 'Hypoactive sexual desire disorder (HSDD)',
        mechanism: 'Directly agonizes melanocortin receptors in the brain to trigger severe, unyielding sexual arousal lasting up to 24 hours.',
        dosage: '1.75mg injected 45 minutes before activity.',
        experimental: { b: '1.5mg', a: '2.5mg' },
        risks: 'Severe nausea, facial flushing, uncontrollable priapism (in men).',
        impact: { brain: 6, heart: 3, liver: 1, kidneys: 1, blood: 2, hair: 0, joints: 0 }
    },
    {
        id: 'kisspeptin', folder: 'Fertility Support', category: 'peptides', type: 'Peptide', name: 'Kisspeptin-10', esters: '', status: 'experimental',
        overview: 'A master hormone peptide originally discovered in Hershey, PA (named after Hershey Kisses!). It is the apex trigger for human puberty and fertility.',
        primaryUses: 'Experimental hypogonadism repair, fertility',
        mechanism: 'Commands the hypothalamus to release GnRH, forcing the testes to drastically pump out natural testosterone without suppressing the HPTA.',
        dosage: '100mcg to 200mcg daily.',
        experimental: { b: '100mcg/day', a: '300mcg/day' },
        risks: 'Desensitization of the GnRH axis with overuse, rapid heart rate.',
        impact: { brain: 2, heart: 2, liver: 1, kidneys: 1, blood: 4, hair: 2, joints: 1 }
    },
    {
        id: 'ghkcu', folder: 'Cosmetic Peptides', category: 'peptides', type: 'Peptide', name: 'GHK-Cu', esters: '(Copper Peptide)', status: 'active',
        overview: 'A naturally occurring copper complex heavily famed for reversing skin aging, tightening loose tissue, and wildly accelerating hair growth.',
        primaryUses: 'Topical anti-aging skincare, hair loss treatments',
        mechanism: 'Stimulates rampant connective tissue repair, boosting collagen and elastin production while simultaneously shrinking pores and healing scars.',
        dosage: 'Topical: 1% to 3% serums. SubQ: 1mg to 2mg daily.',
        experimental: { b: '1mg/day', a: '2.5mg/day' },
        risks: 'Severe, burning excruciating injection site pain (PIP) if not heavily diluted with BPC-157 or BAC water.',
        impact: { brain: 0, heart: 0, liver: 0, kidneys: 0, blood: 1, hair: 8, joints: 2 }
    },
    {
        id: 'matrixyl', folder: 'Cosmetic Peptides', category: 'peptides', type: 'Peptide', name: 'Matrixyl', esters: '(Palmitoyl Pentapeptide-4)', status: 'active',
        overview: 'A heavily patented, cosmetic industry holy-grail peptide essentially designed to mimic the dramatic anti-wrinkle effects of Retinol without the painful skin peeling.',
        primaryUses: 'Topical beauty serums/creams',
        mechanism: 'Tricks the skin into believing collagen has broken down, forcing fibroblasts into overdrive to produce completely fresh, unblemished collagen lines.',
        dosage: 'Topical formulation (around 2% concentration).',
        experimental: { b: 'N/A', a: 'N/A' },
        risks: 'Extremely safe; minor skin irritation on ultra-sensitive individuals.',
        impact: { brain: 0, heart: 0, liver: 0, kidneys: 0, blood: 0, hair: 0, joints: 0 }
    },

    // --- ANCILLARIES & MEDICATIONS ---
    // SERMs & PCT
    {
        id: 'tamoxifen', folder: 'SERMs & PCT', category: 'ancillaries', type: 'SERM', name: 'Tamoxifen', esters: '(Nolvadex)', status: 'active',
        overview: 'A Selective Estrogen Receptor Modulator (SERM). Originally developed to treat breast cancer, it is the absolute gold standard for Post Cycle Therapy (PCT) to restart natural testosterone production.',
        primaryUses: 'Breast cancer treatment, male gynecomastia, PCT',
        mechanism: 'Binds competitively to estrogen receptors in breast tissue, blocking estrogen from attaching. In the brain, it tricks the pituitary into sensing dangerously low estrogen, forcing a massive spike in LH and FSH.',
        dosage: '10mg to 20mg daily (PCT).',
        experimental: { b: '20mg/day', a: '40mg/day (rarely)' },
        benefits: 'Reactivates endogenous testosterone production, completely halts glandular breast tissue growth (gyno).',
        risks: 'Minor liver taxation, rare ocular toxicity, blunts IGF-1 production slightly.',
        impact: { brain: 2, heart: 3, liver: 4, kidneys: 1, blood: 3, hair: 1, joints: 1 },
        cycleExamples: '<strong>Standard PCT:</strong> 20mg every day for 4 to 6 weeks immediately following the clearance of exogenous androgens.'
    },
    {
        id: 'clomiphene', folder: 'SERMs & PCT', category: 'ancillaries', type: 'SERM', name: 'Clomiphene', esters: '(Clomid)', status: 'active',
        overview: 'A powerful SERM traditionally prescribed to trigger ovulation in infertile women. In men, it is heavily used alongside or in place of Nolvadex for aggressive PCT recovery.',
        primaryUses: 'Female infertility, male hypogonadism (off-label)',
        mechanism: 'Acts as an anti-estrogen at the hypothalamus, removing the negative feedback loop of estrogen and causing a violent surge of Gonadotropin-Releasing Hormone (GnRH).',
        dosage: '25mg to 50mg daily.',
        experimental: { b: '50mg/day', a: '100mg/day' },
        benefits: 'Massive stimulation of LH/FSH, very rapid restart of the testicular axis.',
        risks: 'Emotional instability ("weepiness"), permanent visual floaters/tracers if overdosed.',
        impact: { brain: 4, heart: 3, liver: 3, kidneys: 1, blood: 3, hair: 1, joints: 1 },
        cycleExamples: '<strong>Heavy PCT:</strong> 50mg Clomid combined with 20mg Nolvadex daily for 4 weeks after heavily suppressive 19-nor cycles.'
    },
    {
        id: 'enclomiphene', folder: 'SERMs & PCT', category: 'ancillaries', type: 'SERM', name: 'Enclomiphene', esters: '', status: 'active',
        overview: 'The purified trans-isomer of Clomiphene. It strips out the zuclomiphene isomer (which acts as a mild estrogen), leaving only the pure testosterone-stimulating compound.',
        primaryUses: 'Secondary male hypogonadism',
        mechanism: 'Pure estrogen antagonism at the pituitary. Vastly superior to standard Clomid because it does not carry the depressive, estrogenic side effects of the zuclomiphene isomer.',
        dosage: '6.25mg to 12.5mg daily.',
        experimental: { b: '6.25mg/day', a: '12.5mg/day' },
        benefits: 'Doubles or triples natural testosterone levels with virtually zero emotional side effects; maintains testicular volume better than any other SERM.',
        risks: 'Mild reduction in IGF-1, expensive/hard to source.',
        impact: { brain: 2, heart: 2, liver: 2, kidneys: 1, blood: 2, hair: 1, joints: 1 },
        cycleExamples: '<strong>Monotherapy:</strong> 12.5mg daily used to treat secondary hypogonadism without the need for lifetime TRT injections.'
    },
    {
        id: 'raloxifene', folder: 'SERMs & PCT', category: 'ancillaries', type: 'SERM', name: 'Raloxifene', esters: '(Evista)', status: 'active',
        overview: 'A highly advanced SERM prescribed primarily to postmenopausal women to prevent osteoporosis. In bodybuilding, it is the absolute most potent drug for shrinking existing gynecomastia.',
        primaryUses: 'Osteoporosis, breast cancer risk reduction',
        mechanism: 'Exerts extreme anti-estrogenic effects explicitly in breast tissue while acting as an estrogen agonist in bone tissue. It is far more targeted than Nolvadex.',
        dosage: '60mg daily.',
        experimental: { b: '60mg/day', a: '120mg/day' },
        benefits: 'Capable of physically shrinking existing, hardened gynecomastia glands better than any other compound; increases bone mineral density.',
        risks: 'Increased risk of deep vein thrombosis (blood clots), leg cramps.',
        impact: { brain: 1, heart: 3, liver: 3, kidneys: 1, blood: 5, hair: 1, joints: 2 },
        cycleExamples: '<strong>Gyno Reversal:</strong> 60mg daily for 6 weeks, often successful at reducing pubertal or AAS-induced gynecomastia that has already begun to fibrose.'
    },

    // Aromatase Inhibitors
    {
        id: 'anastrozole', folder: 'Aromatase Inhibitors', category: 'ancillaries', type: 'AI', name: 'Anastrozole', esters: '(Arimidex)', status: 'active',
        overview: 'A potent, non-steroidal aromatase inhibitor. It is the most commonly prescribed AI for men on TRT to control estrogen conversion.',
        primaryUses: 'Breast cancer, TRT estrogen management',
        mechanism: 'Reversibly binds to the aromatase enzyme, preventing it from converting testosterone into estradiol. Reduces circulating estrogen by roughly 80%.',
        dosage: '0.25mg to 0.5mg twice a week (TRT).',
        experimental: { b: '0.5mg EOD', a: '1mg EOD' },
        benefits: 'Rapidly clears water retention, prevents all high-estrogen side effects (gyno, acne, emotional swings).',
        risks: 'Accidentally "crashing" estrogen to zero, leading to extreme joint pain, totally ruined libido, and severe lethargy.',
        impact: { brain: 3, heart: 4, liver: 2, kidneys: 1, blood: 3, hair: 1, joints: 9 },
        cycleExamples: '<strong>Cycle Management:</strong> 0.5mg taken the morning after each testosterone injection to maintain stable E2 levels.'
    },
    {
        id: 'exemestane', folder: 'Aromatase Inhibitors', category: 'ancillaries', type: 'AI', name: 'Exemestane', esters: '(Aromasin)', status: 'active',
        overview: 'A steroidal, "suicidal" aromatase inhibitor. Highly favored by advanced athletes because it permanently binds to and destroys the aromatase enzyme, preventing estrogen rebound.',
        primaryUses: 'Breast cancer',
        mechanism: 'Irreversibly binds to the aromatase enzyme, permanently disabling it. The body must generate entirely new enzymes to produce estrogen again.',
        dosage: '12.5mg to 25mg every other day.',
        experimental: { b: '12.5mg EOD', a: '25mg/day' },
        benefits: 'Zero risk of estrogen rebound upon cessation, slightly increases IGF-1, less negative impact on lipids.',
        risks: 'Hair loss (due to steroidal structure), joint pain if estrogen is crashed.',
        impact: { brain: 2, heart: 3, liver: 2, kidneys: 1, blood: 2, hair: 3, joints: 7 }
    },
    {
        id: 'letrozole', folder: 'Aromatase Inhibitors', category: 'ancillaries', type: 'AI', name: 'Letrozole', esters: '(Femara)', status: 'active',
        overview: 'The literal nuclear option of Aromatase Inhibitors. Letrozole is so profoundly powerful it can almost entirely eradicate estrogen from the male body within 48 hours.',
        primaryUses: 'Severe breast cancer, ovulation induction',
        mechanism: 'Extremely aggressive competitive binding to the aromatase enzyme. Can reduce systemic estrogen levels by 98% or more.',
        dosage: '2.5mg daily (clinical cancer treatment).',
        experimental: { b: 'Dangerous', a: '1.25mg EOD (Crisis)' },
        benefits: 'Will instantly stop acute gynecomastia flares and violently dry out subcutaneous water for competitive bodybuilders.',
        risks: 'Guaranteed shattered lipid profiles, unbearable joint pain, destroyed libido, deep depression.',
        impact: { brain: 5, heart: 6, liver: 1, kidneys: 1, blood: 7, hair: 0, joints: 10 }
    },

    // Prolactin & 5AR
    {
        id: 'cabergoline', folder: 'Prolactin & 5AR', category: 'ancillaries', type: 'Dopamine Agonist', name: 'Cabergoline', esters: '(Dostinex)', status: 'active',
        overview: 'A remarkably potent dopamine D2 receptor agonist. Used to treat prolactinomas (pituitary tumors). Necessary for controlling the massive prolactin spikes caused by Trenbolone and Deca.',
        primaryUses: 'Hyperprolactinemia, Parkinson’s disease',
        mechanism: 'Violently surges dopamine in the brain, which acts as the direct biological antagonist to prolactin, crashing prolactin levels instantly.',
        dosage: '0.25mg to 0.5mg twice weekly.',
        experimental: { b: '0.25mg/wk', a: '0.5mg/wk' },
        benefits: 'Prevents 19-nor induced lactation/gyno, dramatically reduces the refractory period for sexual intercourse.',
        risks: 'Cardiac valve issues (at extreme daily doses), manic behavior, nausea, orthostatic hypotension.',
        cycleExamples: '<strong>19-Nor Support:</strong> 0.25mg taken twice weekly strictly while running heavy Nandrolone or Trenbolone.'
    },
    {
        id: 'finasteride', folder: 'Prolactin & 5AR', category: 'ancillaries', type: '5AR Inhibitor', name: 'Finasteride', esters: '(Propecia, Proscar)', status: 'active',
        overview: 'A 5-alpha reductase inhibitor practically synonymous with hair loss prevention. Prevents testosterone from converting into its far more androgenic variant, DHT.',
        primaryUses: 'Benign Prostatic Hyperplasia (BPH), Male Pattern Baldness',
        mechanism: 'Blocks the 5AR Type 2 and 3 enzymes, reducing systemic DHT by roughly 70%. Stops follicular miniaturization in the scalp.',
        dosage: '1mg daily (hair) to 5mg daily (prostate).',
        experimental: { b: '1mg/day', a: '1mg/day' },
        benefits: 'Halts and reverses androgenic alopecia (hair loss), shrinks the prostate; essential for maintaining hair on high-testosterone cycles.',
        risks: 'Post-Finasteride Syndrome (PFS), persistent erectile dysfunction, watery semen, depression.',
        impact: { brain: 4, heart: 1, liver: 1, kidneys: 0, blood: 1, hair: -10, joints: 0 },
        cycleExamples: '<strong>Hair Preservation:</strong> 1mg daily, started 2 weeks before a cycle, to maintain follicular density while utilizing androgenic compounds.'
    },
    {
        id: 'dutasteride', folder: 'Prolactin & 5AR', category: 'ancillaries', type: '5AR Inhibitor', name: 'Dutasteride', esters: '(Avodart)', status: 'active',
        overview: 'The older, massive brother of Finasteride. Dutasteride blocks all three types of the 5AR enzyme, practically wiping out DHT entirely from the body.',
        primaryUses: 'Severe BPH, aggressive off-label hair loss',
        mechanism: 'Inhibits 5AR Types 1, 2, and 3. Drops systemic DHT levels by up to 99%. Has an incredibly long half-life of 5 weeks.',
        dosage: '0.5mg daily.',
        experimental: { b: '0.5mg EOD', a: '0.5mg/day' },
        benefits: 'Absolute maximum protection against hair loss; vastly superior scalp results compared to Finasteride; wiped out almost all DHT-related acne.',
        risks: 'Extreme risk of sexual dysfunction, complete alteration of neurosteroid production (ALLOP), lengthy side-effect persistence due to half-life.',
        impact: { brain: 8, heart: 1, liver: 1, kidneys: 0, blood: 1, hair: -15, joints: 0 },
        cycleExamples: '<strong>Nuclear Hair Option:</strong> 0.5mg daily or EOD for those with extreme genetic predisposition to male pattern baldness.'
    },

    // Fat Burners
    {
        id: 'clenbuterol', folder: 'Fat Burners', category: 'ancillaries', type: 'Beta-2 Agonist', name: 'Clenbuterol', esters: '', status: 'active (ex-US)',
        overview: 'A famously potent asthma medication utilized primarily outside the US. In bodybuilding, it is the most widespread and effective central nervous system stimulant for fat loss.',
        primaryUses: 'Asthma/bronchospasm (veterinary or international)',
        mechanism: 'Directly stimulates Beta-2 receptors in fat and muscle tissue. Raises basal metabolic rate by 10% and massively accelerates the breakdown of triglycerides.',
        dosage: '20mcg to 40mcg daily.',
        experimental: { b: '20-40mcg/day', a: '80-120mcg/day' },
        benefits: 'Intense thermogenesis (fat burning), minor anti-catabolic properties preserving muscle tissue.',
        risks: 'Severe hand tremors, agonizing muscle cramps (due to taurine depletion), dangerous tachycardia (racing heart).',
        cycleExamples: '<strong>Cutting Phase:</strong> Tapering up from 20mcg to 80mcg over 2 weeks, then taking 2 weeks off to clear receptor downregulation.'
    },
    {
        id: 'albuterol', folder: 'Fat Burners', category: 'ancillaries', type: 'Beta-2 Agonist', name: 'Albuterol', esters: '(Salbutamol)', status: 'active',
        overview: 'A standard rescue inhaler compound for asthmatics. When taken orally as a sheer powder or liquid, it acts as a much shorter, safer, faster-clearing version of Clenbuterol.',
        primaryUses: 'Acute asthma relief',
        mechanism: 'Acts identically to Clenbuterol but with a half-life of just 4 to 6 hours compared to Clenbuterols 36 hours.',
        dosage: '2mg to 4mg three times daily.',
        experimental: { b: '4mg 2x/day', a: '8mg 3x/day' },
        benefits: 'Excellent targeted fat burning around workouts, allows for actual sleep at night unlike Clenbuterol; much safer profile for the heart.',
        risks: 'Rapid heart rate, sweating, mild tremors.',
        impact: { brain: 3, heart: 6, liver: 1, kidneys: 1, blood: 5, hair: 0, joints: 0 },
        cycleExamples: '<strong>The Safe Cut:</strong> 4mg taken 45 minutes before fasted cardio to maximize fatty acid mobilization.'
    },
    {
        id: 'dnp', folder: 'Fat Burners', category: 'ancillaries', type: 'Mitochondrial Uncoupler', name: '2,4-Dinitrophenol', esters: '(DNP)', status: 'discontinued',
        overview: 'DNP is a highly dangerous industrial explosive chemical that was briefly used as a diet pill in the 1930s until people started literally cooking from the inside out.',
        primaryUses: 'None human (industrial dye, explosive manufacturing)',
        mechanism: 'Uncouples oxidative phosphorylation in the mitochondria. Meaning the energy derived from food is physically wasted as raw, blazing heat instead of producing ATP.',
        dosage: 'Lethal.',
        experimental: { b: 'Not Recommended', a: '200mg to 400mg daily' },
        benefits: 'Burns massive amounts of literal fat at a mathematically unrivaled rate (up to 1lb per day of pure fat).',
        risks: '<strong>Death.</strong> Severe dehydration, cataracts, yellowing of bodily fluids. There is no biological antidote to a DNP overdose.'
    },
    {
        id: 't3_cytomel', folder: 'Fat Burners', category: 'ancillaries', type: 'Thyroid Hormone', name: 'Liothyronine', esters: '(T3 / Cytomel)', status: 'active',
        overview: 'Synthetic thyroid hormone. It dictates the literal baseline metabolic speed of the entire human body.',
        primaryUses: 'Hypothyroidism',
        mechanism: 'Directly replaces or artificially supplements natural T3 production, heavily elevating the basal metabolic rate and cellular oxygen consumption.',
        dosage: '25mcg daily.',
        experimental: { b: '25mcg/day', a: '75-100mcg/day' },
        benefits: 'Rapidly burns fat, acts synergistically with HGH and Clenbuterol to prevent metabolic slowdown during severe diets; clears brain fog associated with hypothyroidism.',
        risks: 'Highly catabolic (will aggressively burn muscle tissue if not taking high doses of AAS to protect it), palpitations, suppressed natural thyroid function.',
        impact: { brain: 2, heart: 7, liver: 0, kidneys: 1, blood: 4, hair: 3, joints: 0 },
        cycleExamples: '<strong>Metabolic Support:</strong> 25mcg daily run alongside an anabolic cycle to offset the thyroid suppression often caused by HGH or Trenbolone.'
    },

    // Fertility
    {
        id: 'hcg', folder: 'Fertility', category: 'ancillaries', type: 'Gonadotropin', name: 'Human Chorionic Gonadotropin', esters: '(hCG)', status: 'active',
        overview: 'A hormone extracted from the urine of pregnant women. For males, it is a biological miracle that perfectly mimics Luteinizing Hormone (LH) to preserve testicular function.',
        primaryUses: 'Female ovulation induction, male cryptorchidism, fertility',
        mechanism: 'Directly mimics LH, commanding the Leydig cells in the testicles to produce testosterone and sperm even while completely shut down by exogenous steroids.',
        dosage: '500 to 1000 IU three times weekly.',
        experimental: { b: '250 IU EOD', a: '500 IU EOD' },
        benefits: 'Prevents testicular atrophy ("shrinkage") during cycle, maintains fertility, makes PCT significantly easier/shorter.',
        risks: 'Can drastically spike aromatization leading to high estrogen, desensitization of Leydig cells if heavily abused.',
        cycleExamples: '<strong>Cycle Support:</strong> 250 IU pinned subcutaneously every other day throughout the entire duration of an AAS cycle to keep testes online.'
    },
    {
        id: 'hmg', folder: 'Fertility', category: 'ancillaries', type: 'Gonadotropin', name: 'Human Menopausal Gonadotropin', esters: '(hMG)', status: 'active',
        overview: 'Extracted from the urine of postmenopausal women. It is vastly superior to hCG for fertility because it provides both LH and FSH.',
        primaryUses: 'Severe male/female infertility',
        mechanism: 'Provides authentic Follicle Stimulating Hormone (FSH), which directly drives spermatogenesis (sperm creation). HCG only provides LH.',
        dosage: '75 IU three times weekly.',
        experimental: { b: '75 IU EOD', a: '150 IU EOD' },
        benefits: 'The ultimate tool for ensuring a male remains completely fertile and actively producing sperm while blasting gear; restores natural testicular volume even after years of shutdown.',
        risks: 'Astronomically expensive.',
        impact: { brain: 1, heart: 1, liver: 1, kidneys: 1, blood: 4, hair: 0, joints: 1 },
        cycleExamples: '<strong>Fertility Restart:</strong> 75 IU HMG combined with 500 IU HCG three times weekly for 12 weeks to restore sperm count after prolonged steroid use.'
    },

    // --- SARMS & RELATED ---
    {
        id: 'ostarine', folder: 'SARMs', category: 'sarms', type: 'SARM', name: 'Ostarine', esters: '(MK-2866)', status: 'experimental',
        overview: 'One of the most heavily researched Selective Androgen Receptor Modulators (SARMs). It was engineered directly to prevent muscle wasting in cancer and osteoporosis patients.',
        primaryUses: 'Muscle wasting, osteoporosis',
        mechanism: 'Binds exclusively to the androgen receptor in muscle and bone tissue, signaling growth without interacting with the prostate or converting to estrogen/DHT.',
        dosage: 'Not medically approved.',
        experimental: { b: '15-20mg/day', a: '25-30mg/day' },
        benefits: 'Excellent preservation of lean mass during extreme caloric deficits, marked improvement in tendon repair.',
        risks: 'Mild, but measurable suppression of natural testosterone, lipid strain (HDL lowering).',
        cycleExamples: '<strong>Cutting Protocol:</strong> 20mg daily for 8 weeks during a strict caloric deficit to retain lean tissue.'
    },
    {
        id: 'ligandrol', folder: 'SARMs', category: 'sarms', type: 'SARM', name: 'Ligandrol', esters: '(LGD-4033)', status: 'experimental',
        overview: 'A highly potent mass-building SARM. Milligram for milligram, it is significantly stronger than Ostarine yielding results somewhat comparable to mild oral steroids.',
        primaryUses: 'Severe cachexia, frailty',
        mechanism: 'Strong, highly selective binding to AR in muscle. Extremely bioavailable orally.',
        dosage: 'Not medically approved.',
        experimental: { b: '2.5-5mg/day', a: '10mg/day' },
        benefits: 'Significant increases in raw muscle volume and strength, heavy glycogen retention.',
        risks: 'Highly suppressive to HPTA (requires PCT at higher doses), temporary water retention.',
        cycleExamples: '<strong>Bulking Protocol:</strong> 5mg to 10mg daily for 8 weeks alongside a caloric surplus.'
    },
    {
        id: 'rad140', folder: 'SARMs', category: 'sarms', type: 'SARM', name: 'Testolone', esters: '(RAD140)', status: 'experimental',
        overview: 'A hardcore SARM initially developed as a safer TRT alternative. Known for providing an extremely "dry" and vascular look, similar to Winstrol or Masteron.',
        primaryUses: 'Breast cancer research, muscle wasting',
        mechanism: 'Aggressively binds to muscle ARs. Uniquely, it has been shown in some models to actually antagonize (block) estrogenic effects in breast tissue.',
        dosage: 'Not medically approved.',
        experimental: { b: '10mg/day', a: '20mg/day' },
        benefits: 'Extreme strength gains, high vascularity, zero water retention, neurological aggression.',
        risks: 'Severe testosterone suppression, hair loss (anecdotal), notable liver strain compared to other SARMs.',
        cycleExamples: '<strong>Recomp Protocol:</strong> 15mg daily for 8 weeks to strip fat while retaining brutal strength.'
    },
    {
        id: 'yk11', folder: 'SARMs', category: 'sarms', type: 'Steroidal SARM / Myostatin Inhibitor', name: 'YK-11', esters: '', status: 'experimental',
        overview: 'An extremely bizarre compound that is technically a synthetic steroid derived from DHT, yet acts as a SARM. It uniquely functions as a Follistatin upregulator/Myostatin inhibitor.',
        primaryUses: 'None human (pure research biochemical)',
        mechanism: 'Partial agonist of the AR, but its main mechanism is inducing muscle cells to produce Follistatin, which chemically blocks Myostatin (the limit on muscle growth).',
        dosage: 'Not medically approved.',
        experimental: { b: '5mg/day', a: '10-15mg/day' },
        benefits: 'Rapid, explosive gains in size and strength that can theoretically breach natural genetic limits; produces a hard, dry, "plastic" muscle look.',
        risks: 'Joint pain (from dry tendons), severe testosterone suppression, potential liver toxicity (it is steroidal), completely unknown long-term consequences.',
        impact: { brain: 3, heart: 6, liver: 6, kidneys: 3, blood: 7, hair: 5, joints: 8 },
        cycleExamples: '<strong>The Genetic Breaker:</strong> 10mg daily for 8 weeks, usually stacked with a testosterone base to mitigate the severe suppression of the HPTA.'
    },
    {
        id: 's23', folder: 'SARMs', category: 'sarms', type: 'SARM', name: 'S-23', esters: '', status: 'experimental',
        overview: 'Originally investigated as a permanent, systemic male contraceptive. It is notoriously one of the most powerful, side-effect heavy SARMs in existence.',
        primaryUses: 'Experimental male contraceptive',
        mechanism: 'Binds so aggressively to the AR that it completely overrides the natural HPTA axis, halting spermatogenesis entirely.',
        dosage: 'Not medically approved.',
        experimental: { b: '10mg/day', a: '20mg/day (split dose)' },
        benefits: 'Profound muscle hardness, extreme drying out of subcutaneous water.',
        risks: '<strong>Total HPTA Shutdown</strong> (not suppression, true shutdown), requires a testosterone base or will cause severe lethargy and zero estrogen.',
        cycleExamples: '<strong>Pre-Contest:</strong> 20mg a day stacked onto a Testosterone base during the final 4 weeks of competition prep.'
    },
    {
        id: 'andarine', folder: 'SARMs', category: 'sarms', type: 'SARM', name: 'Andarine', esters: '(S-4)', status: 'discontinued',
        overview: 'One of the earliest SARMs created. It binds to the androgen receptor at roughly 33% the affinity of pure testosterone.',
        primaryUses: 'Historically evaluated for BPH and muscle wasting',
        mechanism: 'Selective binding in muscle and bone. However, it inadvertently binds competitively to ARs in the eyes (retina).',
        dosage: 'Not medically approved.',
        experimental: { b: '25-50mg/day', a: '50-75mg/day' },
        benefits: 'Excellent strength and fat loss synergy without the extreme suppression of harder SARMs.',
        risks: '<strong>Vision alteration:</strong> Creates a heavy yellow/green tint in vision, severe difficulty adjusting from light to dark environments.'
    },
    {
        id: 'cardarine', folder: 'Metabolics (PPAR)', category: 'sarms', type: 'PPARδ Receptor Agonist', name: 'Cardarine', esters: '(GW501516)', status: 'discontinued',
        overview: 'Cardarine is NOT a SARM, though commonly grouped with them. It was developed to treat cardiovascular diseases and metabolic syndrome but abandoned due to cancer risks in mice.',
        primaryUses: 'Historical endurance research',
        mechanism: 'Binds exclusively to the PPARδ receptor, radically altering genetic output to force the body to burn fat for fuel instead of carbohydrates.',
        dosage: 'Not medically approved.',
        experimental: { b: '10mg/day', a: '20mg/day' },
        benefits: 'Staggering, near-instantaneous increases in cardiovascular endurance and V02 max; profound fat oxidization; helps heal metabolic syndrome.',
        risks: 'Rapid cancer/tumor development observed extensively in Wistar rat models.',
        impact: { brain: 1, heart: -6, liver: 1, kidneys: 1, blood: -5, hair: 0, joints: 0 },
        cycleExamples: '<strong>Endurance Support:</strong> 10mg taken 30 minutes before cardio to radically increase lung capacity and duration.'
    },
    {
        id: 'stenabolic', folder: 'Metabolics (PPAR)', category: 'sarms', type: 'Rev-ErbA Agonist', name: 'Stenabolic', esters: '(SR9009)', status: 'experimental',
        overview: 'A synthetic Rev-ErbA ligand. It physically rewires the body’s circadian rhythm and radically alters mitochondrial output in skeletal muscle.',
        primaryUses: 'Circadian rhythm and metabolic research',
        mechanism: 'Stimulates the Rev-ErbA protein to increase mitochondria counts and severely reduce fat-storing enzymes in the liver.',
        dosage: 'Not medically approved.',
        experimental: { b: '10-20mg/day', a: '30mg/day (dosed every 4 hrs)' },
        benefits: 'Massive endurance boost, heavy fat loss; helps normalize sleep patterns in shift workers; acts as "exercise in a pill".',
        risks: 'Insomnia, circadian rhythm disruption. Extremely poor oral bioavailability (requires sublingual dosing or injection).',
        impact: { brain: 5, heart: 1, liver: 1, kidneys: 1, blood: 2, hair: 0, joints: 0 },
        cycleExamples: '<strong>Metabolic Reset:</strong> 20mg injected daily (or split sublingually) to accelerate fat loss during a cutting phase.'
    },

    // --- DESIGNER STEROIDS & PROHORMONES ---
    {
        id: 'superdrol', folder: 'Designer Steroids', category: 'prohormones', type: 'AAS', name: 'Superdrol', esters: '(Methasterone)', status: 'discontinued',
        overview: 'Superdrol is arguably the most powerful oral designer steroid ever created. Originally formulated in the 1950s but never released, it surfaced on the grey market in 2005 disguised as a legal supplement.',
        primaryUses: 'None human (illicit mass gain)',
        mechanism: 'Essentially Masteron with an added 17a-methyl group and a 2-methyl group. Incredible AR binding affinity leading to insanely rapid mass and strength acquisition.',
        dosage: '10mg to 20mg daily.',
        experimental: { b: '10mg/day', a: '20-30mg/day' },
        benefits: 'Ludicrously fast strength gains, glycogen supercompensation resulting in a heavily pumped, hard look without any estrogenic water retention.',
        risks: 'Massive, unprecedented liver toxicity (hepatotoxicity). Lethargy so severe users often cannot stay awake ("Superdrol lethargy"), shattered lipids.',
        cycleExamples: '<strong>The 3-Week Blast:</strong> 20mg daily for exactly 21 days as a kickstart. Going beyond 3-4 weeks mathematically guarantees severe liver strain.'
    },
    {
        id: 'epistane', folder: 'Designer Steroids', category: 'prohormones', type: 'AAS', name: 'Epistane', esters: '', status: 'discontinued',
        overview: 'A sulfur-containing oral designer steroid derived from DHT. It was historically beloved for its unique ability to increase lean tissue while selectively mimicking SERMs to reduce existing gyno.',
        primaryUses: 'Anti-estrogenic mass acquisition',
        mechanism: 'Highly anabolic, weakly androgenic. It does not aromatize and actively antagonizes the estrogen receptor in breast tissue.',
        dosage: '20mg to 40mg daily.',
        experimental: { b: '20mg/day', a: '40-60mg/day' },
        benefits: 'Extreme muscle hardening, acute fat loss support, prevention/reduction of gynecomastia during cycle; gives a dry, grainy aesthetic.',
        risks: 'Severe joint dehydration (aching joints/tendons), liver toxicity, calf pumps so severe they can inhibit walking.',
        impact: { brain: 1, heart: 4, liver: 5, kidneys: 2, blood: 6, hair: 3, joints: 7 },
        cycleExamples: '<strong>The Gyno Killer:</strong> Historically added to cycles at 30mg daily to counteract estrogenic bloating and nipple sensitivity.'
    },
    {
        id: 'halodrol', folder: 'Designer Steroids', category: 'prohormones', type: 'AAS', name: 'Halodrol', esters: '(H-Drol)', status: 'discontinued',
        overview: 'A grey-market clone of Oral Turinabol with a slight molecular variation. Known as a very mild, highly tolerable oral for beginners.',
        primaryUses: 'Lean, dry muscle gains',
        mechanism: 'Technically a prohormone to Turinabol; it processes through the liver to create highly pure, non-aromatizing anabolic hormones.',
        dosage: '50mg to 75mg daily.',
        experimental: { b: '50mg/day', a: '75-100mg/day' },
        benefits: 'Slow, maintainable dry gains; massive boost to core strength and abdominal visibility; excellent for beginners due to high tolerability.',
        risks: 'Mild liver strain, slight suppression.',
        impact: { brain: 1, heart: 3, liver: 4, kidneys: 1, blood: 5, hair: 2, joints: 0 },
        cycleExamples: '<strong>First Cycle:</strong> 50mg daily for 6 weeks, resulting in moderate but completely retainable gains post-cycle.'
    },
    {
        id: 'msten', folder: 'Designer Steroids', category: 'prohormones', type: 'AAS', name: 'Methylstenbolone', esters: '(M-Sten)', status: 'discontinued',
        overview: 'A DHT-derived designer steroid brought to market after Superdrol was banned. It was designed to mimic Superdrols sheer mass-building power with slightly less liver toxicity.',
        primaryUses: 'Rapid extreme hypertrophy',
        mechanism: 'Does not convert to estrogen or bind to the progesterone receptor. Yields colossal raw size by deeply penetrating the AR without any water smoothing.',
        dosage: '10mg to 20mg daily.',
        experimental: { b: '10mg/day', a: '20mg/day' },
        benefits: 'Massive size and strength mirroring Superdrol but with less intracellular lethargy; incredibly fast acting (visible results within 7 days).',
        risks: 'Very high hepatotoxicity, rapid lipid destruction, severe HPTA shut down.',
        impact: { brain: 2, heart: 7, liver: 9, kidneys: 4, blood: 8, hair: 5, joints: 0 },
        cycleExamples: '<strong>The Mass Kickstart:</strong> 10mg daily for the first 4 weeks of a bulking cycle to ignite immediate growth.'
    },
    {
        id: 'trenavar', folder: 'Designer Steroids', category: 'prohormones', type: 'Prohormone', name: 'Trenavar', esters: '(Trendione)', status: 'discontinued',
        overview: 'An actual, true prohormone. Trenavar contains a ketone at the 17th position, meaning once it passes through the liver, it biologically converts into active, pure Trenbolone.',
        primaryUses: 'Oral Trenbolone conversion',
        mechanism: 'Relies on the 17b-HSD1 enzyme to convert from inactive Trendione entirely into active Trenbolone within the bloodstream.',
        dosage: '30mg to 60mg daily.',
        experimental: { b: '30mg/day', a: '60mg/day' },
        benefits: 'Yields the raw vascularity, aggression, and fat loss of injectable Trenbolone via an oral capsule; extreme nutrient partitioning.',
        risks: 'High blood pressure, severe heartburn, intense night sweats, brutal liver taxation.',
        impact: { brain: 10, heart: 9, liver: 8, kidneys: 6, blood: 9, hair: 9, joints: 0 },
        cycleExamples: '<strong>Oral Recomp:</strong> 30mg daily for 4-6 weeks to rapidly harden the physique before a photoshoot or competition.'
    },

    // --- BLOODWORK & HEALTH MARKERS ---
    {
        id: 'blood_lipids', folder: 'Biomarkers', category: 'reference', type: 'Reference', name: 'Lipid Panel', esters: '(Cholesterol)', status: 'informational',
        overview: 'The primary cardiovascular metric devastated by oral anabolic steroids and AIs. Managing blood lipids is the #1 requirement for long-term health in enhanced athletes.',
        primaryUses: 'Evaluating cardiovascular & arterial health',
        mechanism: 'AAS rapidly ramps up hepatic lipase, an enzyme in the liver that aggressively shreds HDL (good cholesterol) while paradoxically elevating LDL (bad cholesterol).',
        dosage: 'N/A',
        experimental: { b: 'HDL: >40 mg/dL', a: 'LDL: <100 mg/dL' },
        benefits: 'Maintaining healthy lipids entirely prevents atherosclerosis (plaque buildup in arteries) and long-term stroke/heart attack risks.',
        risks: 'Trenbolone, Superdrol, and Winstrol are infamous for crushing HDL into the single digits within 2 weeks.',
        cycleExamples: '<strong>Management:</strong> 4g Omega-3 Fish Oil, 10mg Citrus Bergamot, 500mg Niacin, and massive amounts of steady-state cardio (LISS) daily to protect lipids on cycle.'
    },
    {
        id: 'blood_liver', folder: 'Biomarkers', category: 'reference', type: 'Reference', name: 'Liver Enzymes', esters: '(AST / ALT)', status: 'informational',
        overview: 'AST and ALT are enzymes that normally reside heavily inside liver cells. When the liver is damaged or severely stressed (usually by 17-alpha-alkylated orals), these cells tear open and leak AST/ALT into the bloodstream.',
        primaryUses: 'Evaluating acute hepatotoxicity',
        mechanism: 'Oral steroids force the liver to work exponentially harder to metabolize them. When AST/ALT numbers triple or quadruple, the liver is actively taking damage.',
        dosage: 'N/A',
        experimental: { b: 'AST: 10-40 U/L', a: 'ALT: 7-56 U/L' },
        benefits: 'Keeping these enzymes low ensures the liver can effectively clear toxins entirely and prevent cholestasis (bile duct blockage/jaundice).',
        risks: 'High values over long periods equal jaundice, liver lesions, and eventual cirrhosis.',
        cycleExamples: '<strong>Management:</strong> 1200mg NAC (N-Acetyl Cysteine), 500mg TUDCA (Tauroursodeoxycholic acid), and Milk Thistle.'
    },
    {
        id: 'blood_kidneys', folder: 'Biomarkers', category: 'reference', type: 'Reference', name: 'Kidney Function', esters: '(eGFR / Creatinine)', status: 'informational',
        overview: 'Unlike the liver, the kidneys do not regenerate. Kidney failure is a massive, highly silent killer in the bodybuilding community, specifically driven by heavy Trenbolone use and extreme high-protein diets.',
        primaryUses: 'Evaluating renal clearance',
        mechanism: 'High blood pressure acts like a pressure washer on the delicate filters (glomeruli) in the kidneys. High muscle mass naturally elevates Creatinine, so eGFR (filtration rate) or Cystatin C should be checked.',
        dosage: 'N/A',
        experimental: { b: 'eGFR: >90', a: 'Creatinine: 0.8-1.2' },
        benefits: 'Protecting kidneys prevents dialysis and ensures fluid dynamics remain stable without pitting edema (severe fluid pooling in legs).',
        risks: 'Ignoring high blood pressure on cycle is the #1 cause of irreversible kidney destruction.',
        cycleExamples: '<strong>Management:</strong> Massive water consumption (2+ gallons), strict BP control via ARBs (Telmisartan) or ACE inhibitors.'
    },
    {
        id: 'blood_hematocrit', folder: 'Biomarkers', category: 'reference', type: 'Reference', name: 'Hematocrit', esters: '(RBC / Viscosity)', status: 'informational',
        overview: 'Hematocrit measures how much of your blood is physically made out of red blood cells. Elevated hematocrit turns your blood into literal thick sludge.',
        primaryUses: 'Evaluating blood thickness and clot risk',
        mechanism: 'Androgens directly stimulate the kidneys to aggressively produce erythropoietin (EPO), which commands the bone marrow to mass-produce raw Red Blood Cells.',
        dosage: 'N/A',
        experimental: { b: 'Normal: 40% - 50%', a: 'Crisis: >55%' },
        benefits: 'Higher RBC massively improves oxygen transport and cardiovascular stamina (hence why Equipoise feels so good for endurance).',
        risks: 'If blood turns to sludge, the heart has to work 10x harder to pump it. Leads to extreme left ventricular hypertrophy, strokes, and catastrophic lethargy.',
        cycleExamples: '<strong>Management:</strong> Therapeutic phlebotomy (donating a pint of blood every 8 weeks), daily baby aspirin, massive hydration, and Naringin.'
    },

    // --- RECREATIONAL & STIMULANTS ---
    {
        id: 'modafinil', folder: 'Neuro-Enhancers', category: 'recreational', type: 'Stimulant', name: 'Modafinil', esters: '(Provigil)', status: 'active',
        overview: 'A profoundly powerful "eugeroic" (wakefulness-promoting agent). Originally developed for narcolepsy, it is extensively used off-label by the military, students, and executives to delay sleep.',
        primaryUses: 'Narcolepsy, shift work sleep disorder',
        mechanism: 'Inhibits dopamine reuptake very selectively while elevating histamine and orexin in the hypothalamus, chemically stripping the sensation of sleepiness from the brain.',
        dosage: '100mg to 200mg daily.',
        experimental: { b: '100mg/day', a: '200mg/day' },
        benefits: 'Extreme, unrelenting wakefulness without the jittery peripheral physical stimulation or severe crash of amphetamines.',
        risks: 'Headaches, suppressed appetite, rare severe rash (Stevens-Johnson syndrome), severe long-term sleep debt.',
        cycleExamples: '<strong>Pre-Workout / Focus:</strong> 100mg taken orally immediately upon waking to enforce 14-16 hours of absolute mental clarity.'
    },
    {
        id: 'adderall', folder: 'Stimulants', category: 'recreational', type: 'Amphetamine', name: 'Mixed Amphetamine Salts', esters: '(Adderall)', status: 'active',
        overview: 'A mixture of four amphetamine salts. It is the gold standard pharmaceutical prescribed for ADHD, dramatically surging focus, drive, and physical energy.',
        primaryUses: 'ADHD, severe narcolepsy',
        mechanism: 'Forces the massive release of dopamine and norepinephrine from vesicles directly into the synapse. Extremely powerful CNS stimulant.',
        dosage: '5mg to 30mg daily.',
        experimental: { b: '10-20mg', a: '30-60mg' },
        benefits: 'Intense euphoria, laser-like focus, massive suppression of physical fatigue, heavy temporary strength increase in the gym.',
        risks: 'Severe neurotoxicity at high doses, absolute adrenal burnout, terrible "crash" resulting in deep lethargy and depression, extremely fast addiction vector.',
        cycleExamples: '<strong>Max Effort:</strong> 20mg Instant Release taken 45 minutes prior to a massive training session for extreme neurological drive.'
    },
    {
        id: 'caffeine', folder: 'Stimulants', category: 'recreational', type: 'Xanthine', name: 'Caffeine', esters: '(Anhydrous)', status: 'active',
        overview: 'The most widely consumed psychoactive drug on earth. In bodybuilding, pure anhydrous powder/pills are used in massive doses pre-workout as an acute CNS primer.',
        primaryUses: 'Mental alertness, fatigue suppression',
        mechanism: 'Directly and aggressively blocks adenosine receptors in the brain, preventing the chemical signal for fatigue from registering.',
        dosage: '100mg to 400mg per dose.',
        experimental: { b: '200mg', a: '600-800mg' },
        benefits: 'Cheap, legal, dramatically lowers Rate of Perceived Exertion (RPE) and mobilizes fatty acids for fuel.',
        risks: 'Severe adrenal fatigue with excessive daily usage, extreme anxiety, severe tachycardia.',
        cycleExamples: '<strong>Pre-Workout:</strong> 400mg taken with L-Citrulline 30m prior to training.'
    },
    {
        id: 'ephedrine', folder: 'Fat Burners', category: 'recreational', type: 'Sympathomimetic', name: 'Ephedrine', esters: '(Bronkaid)', status: 'restricted',
        overview: 'A highly potent central nervous system stimulant and decongestant. Famous for the "ECA Stack" (Ephedrine, Caffeine, Aspirin) heavily used in the 90s for rapid fat loss.',
        primaryUses: 'Asthma, hypotension under anesthesia',
        mechanism: 'Stimulates the release of norepinephrine, violently ramping up heart rate, thermogenesis, and acting as a profound appetite suppressant.',
        dosage: '12.5mg to 25mg three times daily.',
        experimental: { b: '12.5mg 2x/day', a: '25mg 3x/day' },
        benefits: 'Kills appetite entirely, massively increases BMR (Basal Metabolic Rate).',
        risks: 'Stroke, extreme blood pressure, severe dehydration.',
        cycleExamples: '<strong>The ECA Stack:</strong> 25mg Ephedrine + 200mg Caffeine + 81mg Baby Aspirin taken 2-3 times per day for absolute appetite annihilation.'
    },
    {
        id: 'amphetamine_sulfate', folder: 'Stimulants', category: 'recreational', type: 'Amphetamine', name: 'Amphetamine Sulphate', esters: '(Speed / Base / Billy)', status: 'restricted',
        overview: 'The illicit street powder version of amphetamine paste. Highly famous across Europe as a cheap, long-lasting energy source for raves or extremely laborious work.',
        primaryUses: 'Recreational stimulation',
        mechanism: 'Essentially identical to Adderall but often heavily impure. Floods the brain with dopamine and norepinephrine.',
        dosage: '10mg to 50mg.',
        experimental: { b: '20mg', a: '100mg+' },
        benefits: 'Massive endurance, euphoria, hyper-focus; allows for prolonged physical labor or athletic performance under extreme fatigue.',
        risks: 'Severe cardiovascular strain, paranoia, heavy jaw clenching (bruxism).',
        impact: { brain: 8, heart: 9, liver: 4, kidneys: 3, blood: 7, hair: 0, joints: 0 },
        cycleExamples: '<strong>The "Billy" Run:</strong> Historically used by long-haul drivers or soldiers to maintain peak alertness for up to 48 hours without rest.'
    },
    {
        id: 'piperazines', folder: 'Stimulants', category: 'recreational', type: 'Piperazine', name: 'Benzylpiperazine', esters: '(BZP / A2 / Blast / Bolts)', status: 'restricted',
        overview: 'Originally manufactured as an anti-parasitic wormer for cattle, BZP (often branded as A2) became famous in the 2000s as a legal alternative to MDMA/Ecstasy before being banned.',
        primaryUses: 'Recreational (Ecstasy mimic)',
        mechanism: 'Releases dopamine, serotonin, and noradrenaline, but with heavy peripheral nervous system stimulation. It acts similarly to a "dirty" amphetamine.',
        dosage: '50mg to 200mg.',
        experimental: { b: '100mg', a: '250mg' },
        benefits: 'Stimulation, mild empathy/euphoria resembling weak MDMA; creates a "party-like" social atmosphere.',
        risks: 'Horrific hangovers, severe nausea, seizures at high doses, terrifyingly bad comedowns compared to standard amphetamines.',
        impact: { brain: 5, heart: 8, liver: 6, kidneys: 4, blood: 6, hair: 0, joints: 0 },
        cycleExamples: '<strong>Historical Usage:</strong> Widely sold in New Zealand as "Legal Highs" (A2) in the mid-2000s, often consumed in 100-200mg doses at dance festivals.'
    },

    // --- PSYCHEDELICS & HALLUCINOGENS ---
    {
        id: 'lsd', folder: 'Classic Psychedelics', category: 'psychedelics', type: 'Ergoline', name: 'LSD', esters: '(Acid / Blotter)', status: 'restricted',
        overview: 'Lysergic acid diethylamide is one of the most potent, mood-changing classic psychedelics globally. Discovered by Albert Hofmann in 1938.',
        primaryUses: 'Recreational, experimental psychotherapy',
        mechanism: 'Acts as a complex partial agonist at the 5-HT2A serotonin receptors in the brain, fundamentally altering cortical information processing and perception.',
        dosage: '50mcg to 200mcg (1-2 tabs).',
        experimental: { b: '50-100mcg', a: '300mcg+' },
        benefits: 'Profound introspection, ego-dissolution, enhanced sensory perception, extreme neuroplasticity spikes.',
        risks: 'HPPD (Hallucinogen Persisting Perception Disorder), severe anxiety or "bad trips", potential triggering of latent schizophrenia.',
        synthesis: 'Semi-synthesized from lysergic acid derived from ergot fungus.',
        synthesisSteps: [
            'Cultivation of Claviceps purpurea (Ergot) on rye crops to produce ergotamine.',
            'Hydrolysis of ergotamine to isolate pure lysergic acid.',
            'Conjugation of lysergic acid with diethylamine in a controlled anhydrous environment.',
            'Chiral chromatography to isolate the pharmacologically active d-LSD isomer.',
            'Dilution into liquid solution or absorption onto paper blotters.'
        ],
        ingredients: ['Ergotamine Tartrate', 'Diethylamine', 'Lithium Aluminum Hydride', 'Hydrazine', 'Chloroform', 'Anhydrous Methanol'],
        location: 'Temperate rye-growing regions (Europe, North America, parts of Russia).',
        storage: { temp: '-20°C (Long term)', light: 'Highly Light Sensitive', shelf: 'Infinite (Frozen)', notes: 'LSD is structurally unstable. Exposure to heat, light, or chlorinated water (tap water) will neuter the molecule instantly.' },
        cycleExamples: '<strong>Microdosing:</strong> 10mcg taken every 3rd day for cognitive enhancement and mood stabilization.'
    },
    {
        id: 'psilocybin', folder: 'Classic Psychedelics', category: 'psychedelics', type: 'Tryptamine', name: 'Psilocybin', esters: '(Magic Mushrooms / Agaric / Amani)', status: 'restricted',
        overview: 'A naturally occurring psychedelic prodrug compound produced by more than 200 species of fungi. Extremely powerful for breaking psychological trauma cycles.',
        primaryUses: 'Recreational, depression/PTSD therapy',
        mechanism: 'Rapidly dephosphorylated in the liver to psilocin, which acts as a potent agonist at the 5-HT2A receptor.',
        dosage: '1g to 3.5g dried P. cubensis.',
        experimental: { b: '1g-2g', a: '5g (Heroic Dose)' },
        benefits: 'Deep emotional processing, "resetting" of the Default Mode Network in the brain, durable relief from treatment-resistant depression; creates long-term openness.',
        risks: 'Nausea, panic attacks, extreme confusion at raw dosages.',
        impact: { brain: -5, heart: 2, liver: 0, kidneys: 0, blood: 1, hair: 0, joints: 0 },
        sensoryImpact: 'Intense fractal geometric patterns, enhanced color saturation, and objects appearing to "breathe" or ripple. High doses can lead to complete visual reconstruction of the environment.',
        cycleExamples: '<strong>Depression Protocol:</strong> A single "macro-dose" of 3.5g taken in a therapeutic setting to facilitate deep psychological breakthrough.'
    },
    {
        id: 'meo_dmt', folder: 'Tryptamines', category: 'psychedelics', type: 'Tryptamine', name: '5-MeO-DMT', esters: '(The Toad / The God Molecule)', status: 'restricted',
        overview: 'An extremely potent psychedelic found in the venom of the Sonoran Desert toad (Bufo alvarius) and some plants. Known for inducing the most intense "ego death" currently known.',
        primaryUses: 'Spiritual/Ceremonial, severe depression research',
        mechanism: 'Full agonist of the 5-HT1A and 5-HT2A receptors.',
        dosage: '5mg to 15mg (Vaporized).',
        experimental: { b: '10mg', a: '20mg' },
        benefits: 'Profound mystical experience, complete dissolution of the self; provides a total perspective shift on existence in under 15 minutes.',
        risks: 'Respiratory depression at high doses, severe psychological trauma, lethal interaction with MAOIs.',
        impact: { brain: 10, heart: 6, liver: 0, kidneys: 0, blood: 4, hair: 0, joints: 0 },
        cycleExamples: '<strong>Spiritual Reset:</strong> A single vaporized dose administered under expert guidance to treat severe existential dread in terminal patients.'
    },
    {
        id: 'ibogaine', folder: 'Oneirogenics', category: 'psychedelics', type: 'Alkaloid', name: 'Ibogaine', esters: '', status: 'experimental',
        overview: 'A psychoactive substance found in the Iboga root bark. Uniquely used in alternative medicine to treat opioid addiction by resetting neurotransmitter systems.',
        primaryUses: 'Addiction treatment, spiritual',
        mechanism: 'Complex interaction with serotonin, opioid receptors, and NMDA receptors.',
        dosage: '10mg to 20mg per kg.',
        benefits: 'Capable of terminating opioid withdrawal and cravings; induces a 24-36 hour waking dream-like state; resets dopamine pathways.',
        risks: 'Fatal cardiotoxicity (QT prolongation), ataxia, severe vomiting.',
        impact: { brain: 8, heart: 10, liver: 4, kidneys: 2, blood: 4, hair: 0, joints: 0 },
        cycleExamples: '<strong>Addiction Termination:</strong> 15mg/kg administered in a clinical setting with full EKG monitoring to interrupt active heroin/fentanyl addiction.'
    },
    {
        id: 'mescaline', folder: 'Phenethylamines', category: 'psychedelics', type: 'Phenethylamine', name: 'Mescaline', esters: '(Peyote / San Pedro)', status: 'restricted',
        overview: 'A naturally occurring psychedelic alkaloid of the phenethylamine class. Historically used by Indigenous peoples of the Americas.',
        primaryUses: 'Native American Church rituals',
        mechanism: 'Non-selective serotonin receptor agonist (primarily 5-HT2A).',
        dosage: '200mg to 400mg.',
        benefits: 'Bright, colorful visual distortions and a deep connection to nature/spirits; remarkably long duration compared to other phenethylamines.',
        risks: 'Severe nausea during onset, dizziness, anxiety.',
        impact: { brain: 4, heart: 5, liver: 2, kidneys: 1, blood: 4, hair: 0, joints: 0 },
        cycleExamples: '<strong>Ritual Usage:</strong> 300mg of pure mescaline sulfate consumed for a 12-hour contemplative experience.'
    },
    {
        id: 'salvia', folder: 'Salvinorins', category: 'psychedelics', type: 'Diterpenoid', name: 'Salvia divinorum', esters: '(Salvinorin A / Sally / Diviner\'s Sage)', status: 'restricted',
        overview: 'A plant species with transient but extremely powerful psychoactive properties. Unlike other psychedelics, it is non-alkaloidal.',
        primaryUses: 'Divination / Recreation',
        mechanism: 'Viciously potent kappa-opioid receptor (KOR) agonist. Induces dysphoric dissociation.',
        dosage: 'Vaporized extract (5x - 40x).',
        benefits: 'Unparalleled intensity of short-term (5-10 min) hallucination; creates a sensation of folding through multiple dimensions/realities.',
        risks: 'Profound confusion, temporary loss of motor control, dysphoria.',
        impact: { brain: 10, heart: 4, liver: 0, kidneys: 0, blood: 1, hair: 0, joints: 0 },
        cycleExamples: '<strong>Short Dive:</strong> 20mg of 10x extract vaporized to induce a short but complete departure from standard consensus reality.'
    },
    {
        id: 'dmt', folder: 'Classic Psychedelics', category: 'psychedelics', type: 'Tryptamine', name: 'Dimethyltryptamine', esters: '(DMT / Ayahuasca)', status: 'restricted',
        overview: 'A massively powerful, ultra-short acting hallucinogenic tryptamine naturally found in trace amounts within the human brain and many plants. Famous for the "breakthrough" experience.',
        primaryUses: 'Shamanic rituals, profound recreational trips',
        mechanism: 'Intense 5-HT2A agonism. When smoked, effects peak in 2 minutes and vanish in 15. When drank via Ayahuasca, an MAOI is used to allow it to survive stomach digestion for a 6-hour trip.',
        dosage: 'Vaporized: 20mg to 50mg.',
        experimental: { b: '15mg', a: '40mg+' },
        benefits: 'Referred to as the "Spirit Molecule"; induces completely immersive, incomprehensible geometric realms and perceived entity contact; zero physical toxicity.',
        risks: 'Traumatic psychological shock from the sheer intensity of the onset.',
        impact: { brain: 10, heart: 8, liver: 0, kidneys: 0, blood: 3, hair: 0, joints: 0 },
        sensoryImpact: 'Near-instantaneous transportation to completely alien, 4-dimensional geometric realms. Perceived contact with complex, autonomous "entities" or "machine elves". Total ego dissolution.',
        cycleExamples: '<strong>The Breakthrough:</strong> 35mg vaporized in a single inhalation to "blast off" into the hyperspace dimension.'
    },
    {
        id: 'amt', folder: 'Tryptamines', category: 'psychedelics', type: 'Psychedelic Amphetamine', name: 'Alpha-Methyltryptamine', esters: '(AMT / Indopan)', status: 'discontinued',
        overview: 'Originally developed as an antidepressant in the 1960s in the Soviet Union. A remarkably long-lasting, stimulating psychedelic.',
        primaryUses: 'Historically: Antidepressant',
        mechanism: 'Acts as a monoamine releasing agent (serotonin/dopamine/norepinephrine) while broadly acting as a non-selective serotonin receptor agonist.',
        dosage: '20mg to 40mg oral.',
        experimental: { b: '15mg', a: '40mg+' },
        benefits: 'Combines the empathy/stimulation of MDMA with the visual distortions of a mild dose of LSD lasting up to 14 hours; intense music appreciation.',
        risks: 'Nausea, terrible crash, severe risk of Serotonin Syndrome if combined with other drugs (acting as a mild MAOI).',
        impact: { brain: 6, heart: 7, liver: 3, kidneys: 2, blood: 5, hair: 0, joints: 0 },
        cycleExamples: '<strong>Clinical Antidepressant (Soviet):</strong> Historically utilized at 5-10mg daily as a potent mood-elevating agent.'
    },
    {
        id: 'pcp', folder: 'Dissociatives', category: 'dissociatives', type: 'Arylcyclohexylamine', name: 'Phencyclidine', esters: '(PCP / Angel Dust)', status: 'restricted',
        overview: 'Developed as a surgical anesthetic in the 1950s but abandoned due to patients showing extreme delirium and mania when waking up.',
        primaryUses: 'Veterinary anesthetic (formerly)',
        mechanism: 'An NMDA receptor antagonist. It physically blocks the brain from receiving sensory signals from the body, inducing severe dissociation.',
        dosage: '5mg to 10mg (smoked/snorted).',
        experimental: { b: '5mg', a: '15mg+' },
        benefits: 'Complete numbness to pain, floating sensation, profound bodily disconnect; gives a sense of immense physical power and invulnerability.',
        risks: 'Induces severe psychotic breaks, stupor, literal superhuman pain tolerance leading to users devastating their own bodies without noticing.',
        impact: { brain: 10, heart: 7, liver: 4, kidneys: 4, blood: 6, hair: 0, joints: -10 },
        cycleExamples: '<strong>Veterinary Anesthesia:</strong> Historically used to sedate large primates and livestock for surgical procedures.'
    },
    {
        id: 'ketamine', folder: 'Dissociatives', category: 'dissociatives', type: 'Arylcyclohexylamine', name: 'Ketamine', esters: '(Special K / K)', status: 'active',
        overview: 'A fast-acting dissociative anesthetic. Recently approved (as Esketamine) for treatment-resistant depression due to its rapid efficacy.',
        primaryUses: 'Anesthesia, depression, pain management',
        mechanism: 'NMDA receptor antagonist. Disrupts glutamate signaling, causing a disconnect between the brain and the body.',
        dosage: 'IM: 0.5mg/kg-2mg/kg; Recreational: 50mg-150mg.',
        benefits: 'Profound sedation, "K-hole" spiritual dissociation, instant anti-depressant effects.',
        risks: 'Bladder toxicity (cystitis), memory loss, severe psychological addiction.',
        synthesis: 'Synthesized via a multi-step organic reaction starting from o-chloronitrobenzene.',
        synthesisSteps: [
            'Reaction of o-chlorobenzonitrile with cyclopentyl magnesium bromide (Grignard reagent).',
            'Formation of o-chlorophenyl cyclopentyl ketone.',
            'Alpha-bromination followed by reaction with methylamine to form the hydroxyimine.',
            'Thermal rearrangement (Stevens rearrangement) at 200°C to finalize the ketamine scaffold.',
            'Acidification with HCl to produce the stable crystalline salt.'
        ],
        ingredients: ['o-Chlorobenzonitrile', 'Cyclopentyl Magnesium Bromide', 'Methylamine', 'Bromine', 'Pentane', 'Hydrochloric Acid'],
    },
    {
        id: 'dxm', folder: 'Dissociatives', category: 'dissociatives', type: 'Morphinan', name: 'Dextromethorphan', esters: '(DXM / Robo)', status: 'active (OTC)',
        overview: 'Found in many over-the-counter cough syrups like Robitussin. In high doses, it acts as a powerful dissociative hallucinogen.',
        primaryUses: 'Cough suppression',
        mechanism: 'Metabolizes to dextrorphan, a potent NMDA receptor antagonist.',
        dosage: 'Recreational (Plateaus): 100mg to 1500mg.',
        benefits: 'Euphoria, visual distortion, music enhancement.',
        risks: 'Liver stress, serotonin syndrome (if mixed), intense nausea, "Robowalk" motor impairment.'
    },
    {
        id: 'mxe', folder: 'Dissociatives', category: 'dissociatives', type: 'Arylcyclohexylamine', name: 'Methoxetamine', esters: '(MXE)', status: 'restricted',
        overview: 'A designer dissociative anesthetic intended to be a safer, longer-lasting version of Ketamine with lower bladder toxicity.',
        primaryUses: 'Experimental/Recreational',
        mechanism: 'High-affinity NMDA antagonist and dopamine reuptake inhibitor.',
        dosage: '25mg to 60mg.',
        benefits: 'Profound spiritual dissociation, warmth, analgesia.',
        risks: 'Prolonged ataxia, psychological dependence, seizures.',
        synthesis: 'Produced as an analog of ketamine, where the 2-chloro group on the phenyl ring is replaced by a 3-methoxy group, and the N-methyl group is replaced by an N-ethyl group. This structural modification was specifically designed to increase potency and duration while minimizing bladder irritation.',
    },

    // --- DEPRESSANTS & SEDATIVES ---
    {
        id: 'alcohol', folder: 'Alcohols', category: 'depressants', type: 'CNS Depressant', name: 'Ethanol', esters: '(Alcohol / Booze / Bevvy)', status: 'active',
        overview: 'The most universally accepted and widely abused psychoactive drug in human history. Found in beer, wine, and spirits.',
        primaryUses: 'Recreational intoxication, social lubrication',
        mechanism: 'Acts globally as a positive allosteric modulator for GABA (the brains primary inhibitory neurotransmitter) while suppressing glutamate.',
        dosage: 'Variable (1 to 15 standard drinks).',
        experimental: { b: '1-3 drinks', a: 'High tolerance binge' },
        benefits: 'Euphoria, dramatic anxiety reduction, social disinhibition.',
        risks: 'Severe hepatotoxicity, motor loss, lethal withdrawal (Delirium Tremens).',
        cycleExamples: '<strong>Bodybuilding Conflict:</strong> A single night of heavy binge drinking violently suppresses muscle protein synthesis, crashes testosterone, and elevates cortisol for up to 48 hours.'
    },
    {
        id: 'alprazolam', folder: 'Benzodiazepines', category: 'depressants', type: 'Benzodiazepine', name: 'Benzodiazepines', esters: '(Alprazolam / Xanax / Bars / Blues / Benzos)', status: 'active',
        overview: 'A class of powerful tranquilizers utilizing GABA-A modulation. Prominent members include Alprazolam (Xanax), Diazepam (Valium), and Lorazepam (Ativan).',
        primaryUses: 'Panic disorder, anxiety, sleep induction',
        mechanism: 'Locks onto the GABA-A receptor specifically, forcing the brain’s inhibitory channels open for far longer, slamming the brakes on the central nervous system.',
        dosage: '0.25mg to 2mg.',
        experimental: { b: '0.5mg', a: '2mg+' },
        benefits: 'Perfect, instantaneous cessation of panic attacks or severe stimulant-induced overstimulation/heart rate.',
        risks: 'Massive "blackout" amnesia potential, terrifyingly rapid physical dependence, <strong>lethal</strong> seizures during withdrawal.',
        synthesis: 'Synthesized via a multi-stage process involving the formation of the triazolobenzodiazepine ring.',
        synthesisSteps: [
            'Synthesis of 2-amino-5-chlorobenzophenone precursor.',
            'Reaction with glycine to form the initial benzodiazepine scaffold.',
            'Addition of a triazole ring via treatment with hydrazine and acetic acid.',
            'Reduction and crystallization to isolate the final high-purity Alprazolam powder.'
        ],
        ingredients: ['2-Amino-5-chlorobenzophenone', 'Hydrazine Hydrate', 'Acetic Acid', 'Glycine', 'Solvent (DCM)', 'Palladium on Carbon'],
        location: 'Global Industrial Pharmaceutical Hubs (India, China, Italy, Germany).'
    },
    {
        id: 'ghb', folder: 'Sedatives', category: 'depressants', type: 'CNS Depressant', name: 'GHB / GBL', esters: '(Liquid Ecstasy / G)', status: 'restricted',
        overview: 'Gamma-hydroxybutyrate is a naturally occurring neurotransmitter used as a date-rape drug and a sleep-aid for narcolepsy (Xyrem).',
        primaryUses: 'Narcolepsy, alcohol withdrawal',
        mechanism: 'Agonizes the GHB receptor and the GABA-B receptor.',
        dosage: '1g to 3g (Oral).',
        benefits: 'Intense euphoria, social disinhibition, growth hormone stimulation.',
        risks: 'Dangerous overdose (coma), lethal interaction with alcohol, physical addiction.'
    },
    {
        id: 'methaqualone', folder: 'Sedatives', category: 'depressants', type: 'Quinazolinone', name: 'Methaqualone', esters: '(Quaaludes / Ludes / 714)', status: 'discontinued',
        overview: 'Methaqualone, famously known as Quaaludes, is a potent sedative-hypnotic that became a cultural icon in the 1970s. Originally developed in India in 1951, it was later banned globally due to its extreme potential for abuse and physical dependence.',
        primaryUses: 'Treating insomnia, anxiety, and muscle tension',
        mechanism: 'Acts as a positive allosteric modulator of GABA-A receptors, increasing the brains inhibitory activity and inducing profound physical relaxation and sedation.',
        dosage: '75mg to 300mg.',
        experimental: { b: '150mg', a: '300mg+' },
        benefits: 'Profound sedation, "jelly-like" physical relaxation, intense sense of calm.',
        risks: 'Lethal respiratory depression (especially when mixed with alcohol), extreme motor impairment ("ludes walk"), severe physical withdrawal.',
        impact: { brain: 10, heart: 6, liver: 2, kidneys: 1, blood: 1, hair: 0, joints: 0 }
    },
    {
        id: 'barbiturates', folder: 'Sedatives', category: 'depressants', type: 'Barbiturate', name: 'Barbiturates', esters: '(Phenobarbital / Butalbital)', status: 'active (Restricted)',
        overview: 'The older generation of sedatives. Largely replaced by Benzos due to their extremely high overdose risk and low therapeutic index.',
        primaryUses: 'Seizures, euthanasia, anesthesia',
        mechanism: 'Increase the duration of GABA-A receptor opening.',
        dosage: 'Variable.',
        benefits: 'Profound CNS shutdown.',
        risks: 'Lethal respiratory depression, severe withdrawal.',
        impact: { brain: 10, heart: 8, liver: 3, kidneys: 1, blood: 2, hair: 0, joints: 0 }
    },
    {
        id: 'phenibut', folder: 'Research Chemicals', category: 'depressants', type: 'Supplement', name: 'Phenibut', esters: '', status: 'active (Unregulated)',
        overview: 'A Russian-developed GABA-B agonist marketed as a supplement. Famous for providing social anxiety relief and pro-sexual effects.',
        primaryUses: 'Anxiety, insomnia',
        mechanism: 'Acts primarily on GABA-B receptors and alpha-2-delta calcium channels.',
        dosage: '250mg to 1500mg.',
        benefits: 'Deep sociability, intense music appreciation, long duration.',
        risks: 'Severe physical withdrawal (comparable to Benzos/Opioids), rapid tolerance.'
    },

    // --- OPIOIDS ---
    {
        id: 'acetylfentanyl', folder: 'Synthetic Opioids', category: 'opioids', type: 'Opioid Analgesic', name: 'Acetylfentanyl', esters: '', status: 'restricted',
        overview: 'A designer drug and heavily restricted fentanyl analog. Roughly 15 times more potent than morphine, often illicitly mixed into heroin or pressed pills causing mass overdoses.',
        primaryUses: 'None human (illicit market)',
        mechanism: 'An extremely potent full agonist at the micro-opioid receptor. Overwhelms the central nervous system instantly, inducing severe analgesia and euphoria.',
        dosage: 'Lethal easily (microgram scale).',
        experimental: { b: 'Extreme Risk', a: 'Extreme Risk' },
        benefits: 'Absolute pain obliteration.',
        risks: '<strong>Respiratory Depression.</strong> The brain simply forgets to command the lungs to breathe, resulting in rapid fatal hypoxia. Highly addictive.'
    },

    // --- INHALANTS & VOLATILES ---
    {
        id: 'amyl_nitrite', folder: 'Alkyl Nitrites', category: 'inhalants', type: 'Vasodilator', name: 'Amyl Nitrite', esters: '(Poppers / Amyls)', status: 'restricted',
        overview: 'A chemical solvent originally sold in small glass ampoules wrapped in mesh meant to be crushed ("popped") to treat angina (heart pain).',
        primaryUses: 'Recreational muscle relaxation, angina (historical)',
        mechanism: 'Inhalation causes an immediate, massive release of nitric oxide into the blood, profoundly and violently relaxing smooth muscles (including sphincters and blood vessels).',
        dosage: 'Inhaled from bottle/soaked cloth.',
        experimental: { b: '1-2 sniffs', a: 'Prolonged use' },
        benefits: 'Instant flush of warmth, severe transient euphoria, extreme relaxation of pelvic/sphincter muscles.',
        risks: 'Dangerous drop in blood pressure (can be fatal if combined with Viagra/Cialis), destruction of red blood cells (methemoglobinemia), optical nerve damage.'
    },
    {
        id: 'nitrous_oxide', folder: 'Solvents & Gases', category: 'inhalants', type: 'Dissociative Gas', name: 'Nitrous Oxide', esters: '(Balloons)', status: 'active',
        overview: 'Known as "laughing gas," it is a colorless gas used in surgery and dentistry for its anesthetic and analgesic effects. Recreationally inhaled via balloons.',
        primaryUses: 'Anesthesia, sedation',
        mechanism: 'Non-competitively antagonizes NMDA receptors while stimulating the release of endogenous opioids in the brain.',
        dosage: 'Variable (via inhalation).',
        experimental: { b: '1-2 balloons', a: 'Binge use' },
        benefits: 'Extremely rapid onset of euphoria, floating sensations, and laughter.',
        risks: 'B12 depletion leading to permanent nerve damage (peripheral neuropathy), hypoxia, severe dizziness.'
    },
    {
        id: 'aerosols', folder: 'Solvents & Gases', category: 'inhalants', type: 'Hydrocarbon', name: 'Aerosols & Glues', esters: '(Butane)', status: 'restricted',
        overview: 'An extremely dangerous class of generalized household industrial products (glue, paint thinner, duster gas, butane) inhaled specifically to induce a toxic, hypoxic stupor.',
        primaryUses: 'Industrial applications only',
        mechanism: 'Displaces oxygen in the lungs and rapidly crosses the blood-brain barrier, essentially suffocating the brain cells and melting myelin sheaths to induce a hallucinogenic drunken state.',
        dosage: 'Unknown (inhalation saturation).',
        experimental: { b: 'Not Recommended', a: 'Lethal Risk' },
        benefits: 'None (toxicity-induced hallucination/euphoria).',
        risks: '<strong>Sudden Sniffing Death Syndrome (SSDS)</strong>: Sudden adrenaline spike combined with a sensitized heart causes immediate, irreversible cardiac arrest. Permanent brain damage.'
    },

    // --- CANNABINOIDS ---
    // --- CANNABIS & CONCENTRATES ---
    {
        id: 'cannabis_indica', folder: 'Cannabis (Indica)', category: 'cannabis', type: 'Cannabinoid', name: 'Cannabis Indica', esters: '(Northern Lights / Granddaddy Purple)', status: 'active',
        overview: 'Strains of cannabis known for their heavy physical sedation and "body high." Typically higher in myrcene content.',
        primaryUses: 'Insomnia, Chronic Pain, Muscle Spasms',
        mechanism: 'Agonizes CB1 and CB2 receptors in the endocannabinoid system.',
        dosage: 'Variable (5mg to 100mg THC).',
        benefits: 'Profound relaxation, sleep induction, appetite stimulation.',
        risks: 'Lethargy, couch-lock, short-term memory impairment.',
        location: 'Hindu Kush Mountain Range (Afghanistan, Pakistan, India, Western China).',
        storage: { temp: '15-20°C', light: 'Dark storage essential', shelf: '12-18 Months', notes: 'Maintain 58-62% relative humidity to prevent mold or terpene evaporation. UV light converts THC to non-psychoactive CBN.' },
        synthesis: 'Originating from the cooler, high-altitude climates of the Hindu Kush mountains. Indica plants are characterized by their short, bushy stature and broad leaves. They thrive in shorter growing seasons and produce dense, resinous buds as a protective mechanism against extreme environmental shifts.',
        experimental: { b: 'Low Dose', a: 'High Stupefaction' }
    },
    {
        id: 'cannabis_sativa', folder: 'Cannabis (Sativa)', category: 'cannabis', type: 'Cannabinoid', name: 'Cannabis Sativa', esters: '(Sour Diesel / Jack Herer)', status: 'active',
        overview: 'Strains known for their cerebral, uplifting, and energetic effects. Often used for creative endeavors.',
        primaryUses: 'Depression, Fatigue, Focus',
        mechanism: 'Agonizes CB1 and CB2 receptors; often associated with higher limonene and pinene terpenes.',
        dosage: 'Variable.',
        benefits: 'Euphoria, increased creativity, energetic sensation.',
        risks: 'Anxiety, paranoia, increased heart rate.',
        location: 'Equatorial Regions (Thailand, Mexico, Colombia, Africa).',
        storage: { temp: '15-20°C', light: 'Dark storage essential', shelf: '12-18 Months', notes: 'Maintain 58-62% relative humidity to prevent mold or terpene evaporation. UV light converts THC to non-psychoactive CBN.' },
        synthesis: 'Originating from equatorial climates with long, hot growing seasons (e.g., Thailand, Mexico, Columbia). Sativa plants are tall, thin-leaved, and take significantly longer to reach maturity compared to Indica. Their chemical profile is rich in invigorating terpenes like limonene and pinene.',
        experimental: { b: 'Creativity', a: 'Hyper-Focus' }
    },
    {
        id: 'cannabis_hybrid', folder: 'Cannabis (Hybrid)', category: 'cannabis', type: 'Cannabinoid', name: 'Cannabis Hybrid', esters: '(OG Kush / Girl Scout Cookies)', status: 'active',
        overview: 'Genetically cross-bred strains designed to balance the sedative properties of indica with the uplifting effects of sativa.',
        primaryUses: 'Balanced relief, Social anxiety',
        mechanism: 'Balanced CB1/CB2 agonism.',
        dosage: 'Variable.',
        benefits: 'Versatile effects, manageable relaxation without extreme lethargy.',
        risks: 'Mixed profile of potential anxiety or mild sedation.',
        experimental: { b: 'Balanced', a: 'Full Spectrum' }
    },
    {
        id: 'cannabis_wax', folder: 'Concentrates & Wax', category: 'cannabis', type: 'THC Concentrate', name: 'Wax / Shatter / Live Resin', esters: '(BHO / PHO / Rosin)', status: 'active',
        overview: 'Highly potent cannabis extracts containing 60-95% THC. Created using solvents (Butane/Propane) or heat/pressure.',
        primaryUses: 'Rapid high-potency THC delivery',
        mechanism: 'Extremely high-density CB1 agonism.',
        dosage: '0.01g to 0.1g (Dab).',
        benefits: 'Instantaneous onset, extreme potency, reduced plant matter inhalation.',
        risks: 'Extreme paranoia, psychological dependency, cyclic vomiting syndrome (if overused).',
        synthesis: 'Extracted from dried cannabis flower using a high-pressure solvent-based extraction system.',
        synthesisSteps: [
            'Primary solvent extraction (Butane/Propane) in a closed-loop system.',
            'Molecular dewaxing to remove lipids and plant waxes.',
            'Primary solvent purge via vacuum oven to isolate the slurry.',
            'Agitation (for Crumble/Budder) or slow cooling (for Shatter) to reach final texture.',
            'Terpene infusion (Optional) to re-introduce flavor lost in the purge.'
        ],
        ingredients: ['High-Terpene Cannabis Flower', 'Instrument-Grade Butane/Propane', 'Dry Ice (for dewaxing)', 'Liquid Nitrogen', 'Activated Carbon'],
        experimental: { b: 'One Dab', a: 'High Purity' }
    },
    {
        id: 'thc_edibles', folder: 'Concentrates & Wax', category: 'cannabis', type: 'Cannabinoid', name: 'THC Edibles', esters: '(Distillate / Infusions)', status: 'active',
        overview: 'Cannabis processed for oral ingestion. Delta-9-THC is converted to 11-Hydroxy-THC by the liver, which is significantly more potent and long-lasting.',
        primaryUses: 'Long-lasting pain relief, stealth consumption',
        mechanism: 'Liver metabolism converts THC into the more potent 11-hydroxy-THC metabolite.',
        dosage: '5mg (Beg) to 50mg+ (Adv).',
        benefits: '8-12 hour duration, intense body high, no pulmonary risk.',
        risks: 'Delayed onset (often leading to overdose), extreme disorientation, prolonged panic attacks.',
        synthesis: 'Produced by decarboxylating raw THC-A and infusing it into a lipid matrix.',
        synthesisSteps: [
            'Selection of high-cannabinoid biomass or pure THC distillate.',
            'Decarboxylation: Heating at 110°C (230°F) for 45 minutes to activate THC-A.',
            'Lipid Fusion: Infusing the activated THC into a carrier oil (MCT/Butter) with lecithin.',
            'Homogenization: Ensuring equal distribution of cannabinoids across the food matrix.',
            'Final Packaging: Testing for multi-point dose consistency and potency.'
        ],
        ingredients: ['Activated THC Distillate', 'MCT Oil / Butter', 'Soy/Sunflower Lecithin', 'Food Matrix (Gummies/Brownies)', 'Potency Stabilizer'],
        experimental: { b: '5mg', a: 'Heroic Dose (100mg+)' }
    },

    // --- NPS & BATH SALTS ---
    {
        id: 'bath_salts', folder: 'Cathinones', category: 'nps', type: 'Synthetic Cathinone', name: 'Bath Salts', esters: '(Mephedrone / Bubble / Bounce)', status: 'restricted',
        overview: 'Synthetic cathinones, commonly known as bath salts, are human-made stimulants chemically related to khat. Emerged as "legal highs" in headshops.',
        primaryUses: 'Recreational (Severe)',
        mechanism: 'Acts as powerful monoamine oxidase inhibitors and releasing agents, flooding the synapse with serotonin and dopamine.',
        dosage: '25mg to 150mg.',
        experimental: { b: '25mg', a: '100mg+' },
        benefits: 'Extreme euphoria, empathy, and energy; provides a surge of confidence mirroring high-dose MDMA but with much higher stimulation.',
        risks: 'Induced psychosis, extreme aggression, rapid heart failure, "excited delirium".',
        impact: { brain: 10, heart: 10, liver: 5, kidneys: 4, blood: 8, hair: 0, joints: 0 },
        cycleExamples: '<strong>Illicit Abuse:</strong> Historically consumed as "Ivory Wave" or "Vanilla Sky" in binge cycles lasting 24-48 hours, often leading to acute hospitalization.'
    },
    {
        id: 'benzofurans', folder: 'Research Chemicals', category: 'nps', type: 'Entactogen', name: 'Benzofuran Compounds', esters: '(Benzo Fury / 6-APB / WhitePearl)', status: 'restricted',
        overview: 'A class of research chemicals structurally related to MDA and MDMA. 6-APB is the most prominent member, known for its long duration.',
        primaryUses: 'Experimental entertainment',
        mechanism: 'Potent Triple Reuptake Inhibitor (SNDRI) and 5-HT2B agonist.',
        dosage: '50mg to 125mg.',
        experimental: { b: '50mg', a: '120mg' },
        benefits: 'Profound empathy, visual distortions, and music enhancement lasting 8-12 hours; often described as "MDA but cleaner".',
        risks: 'Cardiotoxicity (via 5-HT2B binding), severe thermoregulation issues.',
        impact: { brain: 6, heart: 8, liver: 4, kidneys: 2, blood: 5, hair: 0, joints: 0 },
        cycleExamples: '<strong>The Long Roll:</strong> A single 100mg dose taken for a long-duration empathogenic experience without the mid-session crash of MDMA.'
    },
    {
        id: 'phenazepam', folder: 'Sedatives', category: 'nps', type: 'Benzodiazepine', name: 'Phenazepam', esters: '(Bonsai / Bonsai Supersleep)', status: 'active',
        overview: 'A highly potent benzodiazepine developed in the Soviet Union. Known for its extremely long half-life (up to 60 hours).',
        primaryUses: 'Epilepsy, alcohol withdrawal, severe insomnia',
        mechanism: 'High-affinity GABA-A receptor modulation.',
        dosage: '0.5mg to 1mg.',
        experimental: { b: '0.5mg', a: '2.5mg+' },
        benefits: 'Severe sedation, prevents all forms of anxiety.',
        risks: 'Extremely long duration leading to cumulative toxicity, high risk of blackouts lasting days.',
        synthesis: 'Produced via the bromination of the 1,4-benzodiazepine core.',
        synthesisSteps: [
            'Preparation of 2-amino-2\',5-dichlorobenzophenone.',
            'Reaction with glycine ethyl ester to form the benzodiazepine nucleus.',
            'Critical bromination stage to add the bromine atom at the 7-position.',
            'Final crystallization from ethanol.'
        ],
        ingredients: ['2-Amino-2\',5-dichlorobenzophenone', 'Glycine Ethyl Ester', 'Bromine', 'Sodium Methoxide', 'Ethanol', 'Acetic Acid'],
        location: 'Russia and Eastern European pharmaceutical centers.'
    },
    {
        id: 'butylone', folder: 'Cathinones', category: 'nps', type: 'Synthetic Cathinone', name: 'Butylone', esters: '(bk-MBDB)', status: 'restricted',
        overview: 'A synthetic stimulant of the cathinone class. It is the beta-keto analogue of MBDB.',
        primaryUses: 'Recreational',
        mechanism: 'Acts primarily as a dopamine and serotonin reuptake inhibitor.',
        dosage: '50mg to 150mg.',
        experimental: { b: '50mg', a: '150mg' },
        benefits: 'Moderate euphoria, mild stimulation; less aggressive than other cathinones.',
        risks: 'Typical cathinone risks: tachycardia, insomnia, and psychological dependence.',
        impact: { brain: 4, heart: 6, liver: 3, kidneys: 2, blood: 4, hair: 0, joints: 0 },
        cycleExamples: '<strong>Recreational Support:</strong> Historically used at 100mg as a middle-ground stimulant between caffeine and amphetamines.'
    },

    // --- OTHER RECREATIONAL ---
    {
        id: 'tobacco', folder: 'Stimulants', category: 'recreational', type: 'Alkaloid', name: 'Tobacco', esters: '(Baccy / Nicotine)', status: 'active',
        overview: 'One of the most widely used addictive substances in the world. Contains the potent stimulant nicotine.',
        primaryUses: 'Recreational stimulation',
        mechanism: 'Nicotine agonizes nicotinic acetylcholine receptors, triggering the release of dopamine in the reward centers of the brain.',
        dosage: '1mg to 2mg per cigarette.',
        benefits: 'Temporary cognitive sharpening, appetite suppression; enhances the effects of other stimulants.',
        risks: 'Extreme addiction, cancer (due to combustion byproducts), cardiovascular disease.',
        impact: { brain: 4, heart: 7, liver: 2, kidneys: 1, blood: 8, hair: 3, joints: 0 },
        cycleExamples: '<strong>Habitual Usage:</strong> 10-20 cigarettes daily is the standard documented addiction pattern in long-term users.'
    },
    {
        id: 'methylphenidate', folder: 'Stimulants', category: 'recreational', type: 'Phenidate', name: 'Methylphenidate', esters: '(Ritalin / Banshee Dust / Burst)', status: 'active',
        overview: 'A stimulant medication used to treat ADHD and narcolepsy. Chemically related to amphetamines but with a different reuptake profile.',
        primaryUses: 'ADHD, narcolepsy',
        mechanism: 'Inhibits both dopamine and norepinephrine reuptake (NDRI) without forcing release from vesicles.',
        dosage: '10mg to 60mg daily.',
        experimental: { b: '20mg', a: '40mg+' },
        benefits: 'Enhanced focus, increased attention span; allows for high-efficiency cognitive tasks in ADHD patients.',
        risks: 'Anxiety, cardiac strain, stunted growth (in children).',
        impact: { brain: 5, heart: 6, liver: 2, kidneys: 1, blood: 4, hair: 0, joints: 0 },
        cycleExamples: '<strong>Study Protocol:</strong> 20mg extended-release taken in the morning to maintain focus throughout a workday.'
    },
    {
        id: 'cocaine', folder: 'Stimulants', category: 'recreational', type: 'Tropane Alkaloid', name: 'Cocaine', esters: '(Blow / Coke / Snow)', status: 'restricted',
        overview: 'A powerful stimulant obtained from the leaves of the coca plant. It is one of the most widely used illicit stimulants in the world.',
        primaryUses: 'Topical anesthetic (rare medical)',
        mechanism: 'Triple reuptake inhibitor, primarily targeting dopamine reuptake to cause massive, rapid synaptic flooding.',
        dosage: '50mg to 100mg lines.',
        experimental: { b: '50mg', a: 'Binge use' },
        synthesis: 'Extracted from the leaves of the Erythroxylum coca plant via alkaloid isolation.',
        synthesisSteps: [
            'Harvesting and maceration of raw Erythroxylum coca leaves.',
            'Initial extraction using an organic solvent (typically kerosene or gasoline).',
            'Conversion to cocaine base (Pasta) using sulfuric acid and lime.',
            'Purification of the paste through oxidation (Potassium Permanganate).',
            'Dissolution in hydrochloric acid to form the final Cocaine Hydrochloride (crystalline salt).'
        ],
        ingredients: ['Erythroxylum Coca Leaves', 'Sulfuric Acid', 'Potassium Permanganate', 'Hydrochloric Acid', 'Calcium Carbonate (Lime)', 'Organic Solvent (Kerosene)'],
        location: 'The Andean region of South America (Colombia, Peru, and Bolivia).',
        storage: { temp: 'Room Temperature', light: 'N/A', shelf: '48+ Months', notes: 'Cocaine Hydrochloride is highly hygroscopic; it will absorb moisture from the air if not sealed, resulting in a clumpy or "moist" texture.' },
        benefits: 'Intense short-term euphoria, extreme confidence, physical energy.',
        risks: 'Cardiac arrest, perforation of the nasal septum, highly addictive, severe psychological crash.'
    },
    {
        id: 'heroine', folder: 'Opioids', category: 'opioids', type: 'Opioid', name: 'Heroin', esters: '(Brown / Smack / Diacetylmorphine)', status: 'restricted',
        overview: 'A semi-synthetic opioid synthesized from morphine. It is extremely fast-acting and highly addictive.',
        primaryUses: 'Analytical / Palliative care (in some regions)',
        mechanism: 'Rapidly crosses the blood-brain barrier and converts to morphine, binding to mu-opioid receptors.',
        dosage: 'Variable (Milligram scale).',
        experimental: { b: 'Danger', a: 'Fatal Risk' },
        benefits: 'Absolute rush of euphoria and total pain relief; provides a profound sense of warmth and well-being.',
        risks: 'Severe respiratory depression, lethal overdose, rapid physical addiction.',
        impact: { brain: 10, heart: 6, liver: 4, kidneys: 3, blood: 4, hair: 0, joints: 0 },
        cycleExamples: '<strong>Addiction Cycle:</strong> Typically progresses from 5-10mg (snorted) to much higher, frequent intravenous doses as tolerance rapidly escalates.'
    },
    {
        id: 'oxycodone', folder: 'Opioids', category: 'opioids', type: 'Opioid', name: 'Oxycodone', esters: '(OxyContin / Percocet)', status: 'active',
        overview: 'A potent semi-synthetic opioid synthesized from thebaine. Famous for its central role in the US opioid crisis.',
        primaryUses: 'Severe pain relief',
        mechanism: 'Mu-opioid receptor agonist.',
        dosage: '5mg to 80mg.',
        benefits: 'Profound analgesia and sedation; effective for treating chronic, non-malignant pain.',
        risks: 'High addiction potential, respiratory depression, constipation.',
        impact: { brain: 8, heart: 5, liver: 4, kidneys: 3, blood: 4, hair: 0, joints: 0 },
        cycleExamples: '<strong>Pain Management:</strong> 10mg every 6 hours for post-surgical recovery, often tapered over 7 days to prevent dependency.'
    },
    {
        id: 'fentanyl', folder: 'Opioids', category: 'opioids', type: 'Opioid', name: 'Fentanyl', esters: '(Carfentanil / Sufentanil)', status: 'active (Restricted)',
        overview: 'A synthetic opioid 50-100x more potent than morphine. Medical use is primarily for severe pain or anesthesia.',
        primaryUses: 'Anesthesia, cancer breakthrough pain',
        mechanism: 'Extreme affinity for mu-opioid receptors.',
        dosage: 'Microgram scale (12mcg/hr-100mcg/hr patches).',
        benefits: 'Instant analgesia; capable of treating pain that is resistant to all other opioids.',
        risks: 'Lethal respiratory depression (Fatal dose is ~2mg for a non-tolerant male), chest wall rigidity.',
        impact: { brain: 10, heart: 8, liver: 4, kidneys: 4, blood: 6, hair: 0, joints: 0 },
        cycleExamples: '<strong>End-of-Life Care:</strong> 25mcg/hr patch replaced every 72 hours for continuous, high-potency pain suppression.'
    },
    {
        id: 'opioid_maintenance', folder: 'Opioids', category: 'opioids', type: 'Opioid', name: 'Methadone / Buprenorphine', esters: '(Suboxone / Dolophine)', status: 'active',
        overview: 'Standard pharmaceuticals used in Medication-Assisted Treatment (MAT) for opioid use disorder.',
        primaryUses: 'Opioid addiction maintenance, severe chronic pain',
        mechanism: 'Methadone: Full agonist; Buprenorphine: Partial agonist with ceiling effect.',
        dosage: 'Variable (Methadone: 20-120mg; Bupe: 2-32mg).',
        benefits: 'Prevents withdrawal and blocks the euphoria of other opioids; allows individuals to return to a functional, productive life.',
        risks: 'Addiction, long withdrawal periods.',
        impact: { brain: 6, heart: 6, liver: 4, kidneys: 2, blood: 4, hair: 0, joints: 0 },
        cycleExamples: '<strong>Maintenance Program:</strong> 80mg Methadone daily administered under clinical supervision to stabilize a former heroin user.'
    },
    {
        id: 'kratom', folder: 'Opioids', category: 'opioids', type: 'Botanical', name: 'Kratom', esters: '(Mitragyna speciosa)', status: 'active (Unregulated)',
        overview: 'A tropical evergreen tree from Southeast Asia. In low doses acts as a stimulant, in high doses as an opioid.',
        primaryUses: 'Pain relief, anxiety, opioid withdrawal management',
        mechanism: 'Partial agonist of mu-opioid receptors (Mitragynine).',
        dosage: '2g to 10g (Leaf powder).',
        benefits: 'Legal pain relief, mild mood boost; effective for self-managing minor opioid withdrawal symptoms.',
        risks: 'Liver stress, physical dependency, withdrawal.',
        impact: { brain: 3, heart: 3, liver: 5, kidneys: 2, blood: 4, hair: 0, joints: 0 },
        cycleExamples: '<strong>Natural Pain Relief:</strong> 3-5g of Red Vein powder taken twice daily for chronic back pain management.'
    },
    {
        id: 'tianeptine', folder: 'Opioids', category: 'opioids', type: 'Antidepressant / Opioid', name: 'Tianeptine', esters: '(Gas Station Heroin)', status: 'active (Unregulated)',
        overview: 'Originally developed as an atypical antidepressant (SSRE). At high doses, it acts as a potent mu-opioid receptor agonist.',
        primaryUses: 'Major Depressive Disorder (clinical doses)',
        mechanism: 'Full agonist of mu and delta opioid receptors at high doses.',
        dosage: 'Medical: 12.5mg 3x; Recreational: 500mg-1500mg.',
        benefits: 'Rapid mood lift, opioid-like euphoria; effective at treating anxiety-driven depression at low doses.',
        risks: 'Brutal opioid withdrawal, severe addiction potential.',
        impact: { brain: 6, heart: 6, liver: 4, kidneys: 2, blood: 4, hair: 0, joints: 0 },
        cycleExamples: '<strong>Atypical Recovery:</strong> 12.5mg three times daily for clinical depression, or high-dose illicit usage for acute euphoria.'
    },

    // --- ENTACTOGENS ---
    {
        id: 'mdma', folder: 'Entactogens', category: 'entactogens', type: 'Phenethylamine', name: 'MDMA / MDA', esters: '(Ecstasy / Molly)', status: 'restricted',
        overview: '3,4-Methylenedioxymethamphetamine. Famous for its empathogenic effects and presence in the global rave culture.',
        primaryUses: 'Experimental PTSD therapy, recreation',
        mechanism: 'Massive release of Serotonin, Dopamine, and Norepinephrine via VMAT inhibition and TAAR1 agonism.',
        dosage: '80mg to 150mg.',
        experimental: { b: '100mg', a: '150mg' },
        benefits: 'Unparalleled empathy, emotional openness, music appreciation, euphoria; creates deep interpersonal bonds.',
        risks: 'Neurotoxicity (serotonin axon damage), severe "Tuesday Blue" depression/comedown, dehydration, sodium imbalance.',
        impact: { brain: 8, heart: 8, liver: 4, kidneys: 4, blood: 6, hair: 0, joints: 0 },
        cycleExamples: '<strong>The Therapeutic Session:</strong> 120mg administered in a controlled setting to facilitate emotional processing of trauma.'
    },

    // --- NPS & RESEARCH CHEMICALS ---
    {
        id: 'nbome', folder: 'Research Chemicals', category: 'nps', type: 'Phenethylamine', name: 'NBOMe Series', esters: '(25I-NBOMe / 25C / N-Bomb)', status: 'restricted',
        overview: 'Highly potent, dangerous derivatives of the 2C-series. Often missold as LSD.',
        primaryUses: 'None (Pure research)',
        mechanism: 'Super-agonist of the 5-HT2A receptor.',
        dosage: 'Microgram scale (500mcg-1000mcg).',
        benefits: 'Intense fractal visuals; extremely potent sensory distortion.',
        risks: '<strong>High fatality risk.</strong> Seizures, cardiac arrest, vasoconstriction (loss of limbs). Narrow safety margin.',
        impact: { brain: 10, heart: 10, liver: 2, kidneys: 2, blood: 9, hair: 0, joints: 0 },
        cycleExamples: '<strong>LSD Mimicry:</strong> Historically missold on blotter paper as LSD, often resulting in severe physical toxicity at standard acid doses.'
    },
    {
        id: '2c_series', folder: 'Research Chemicals', category: 'nps', type: 'Phenethylamine', name: '2C-Series', esters: '(2C-B / 2C-E / 2C-I / DOM / DOI)', status: 'restricted',
        overview: 'A family of psychedelic phenethylamines synthesized by Alexander Shulgin. Includes the 2C-x family and the high-potency DOx series (DOM, DOB).',
        primaryUses: 'Recreational',
        mechanism: 'Partial agonist of 5-HT2A and 2C receptors.',
        dosage: '10mg to 30mg (2C-series); 1mg-5mg (DOx series).',
        experimental: { b: 'Not documented', a: 'Not documented' },
        benefits: 'Unique blend of LSD-like visuals and MDMA-like physical euphoria; 2C-B is highly prized for its clarity and tactile enhancement.',
        risks: 'Nausea, HPPD, confusion, extreme duration (DOx series can last 24+ hours).',
        impact: { brain: 4, heart: 6, liver: 2, kidneys: 1, blood: 4, hair: 0, joints: 0 },
        cycleExamples: '<strong>2C-B Experience:</strong> 20mg oral dose for a 4-6 hour psychedelic journey with a very manageable headspace.'
    },
    {
        id: 'k2_spice', folder: 'Synthetic Cannabinoids', category: 'nps', type: 'Synthetic CB-Agonist', name: 'K2 / Spice (Synthetic Cannabinoids)', esters: '(JWH-018 / AM-2201 / HU-210)', status: 'restricted',
        overview: 'K2 and Spice refer to a diverse range of synthetic cannabinoids that were originally developed for research into the endocannabinoid system. They are often sprayed on herbal mixtures and sold as "legal" alternatives to cannabis.',
        primaryUses: 'Forensic research, chemical modeling of CB receptors',
        mechanism: 'Full agonists at the CB1 and CB2 receptors. Unlike natural THC (a partial agonist), synthetic cannabinoids can saturate these receptors, leading to a catastrophic cascade of neurotransmitter release and potential "cytokine storms."',
        dosage: '0.5mg to 2mg (Varies by compound; high potency).',
        experimental: { b: 'FATAL_RISK', a: 'EXTREME_TOXICITY' },
        benefits: 'None identified in a performance or clinical setting.',
        risks: 'Acute psychosis, seizures, myocardial infarction, kidney failure, and extreme dependency.',
        impact: { brain: 9, heart: 7, liver: 3, kidneys: 5, blood: 4, hair: 0, joints: 0 },
        aestheticProfile: 'N/A',
        physiologicalTargets: 'CB1 receptors in the central nervous system and CB2 receptors in the peripheral immune system.',
        synthesis: 'Chemical synthesis based on aminoalkylindole or cyclohexylphenol structures.',
        synthesisSteps: [
            'Preparation of the indole or indazole core.',
            'N-alkylation with a specific side chain (e.g., pentyl or fluorinated analogs).',
            'Acylation at the 3-position to attach the naphthoyl or similar group.',
            'Purification via recrystallization or chromatography.'
        ],
        ingredients: ['Indole', 'Naphthoyl Chloride', 'Alkyl Halides', 'Sodium Hydride', 'Dimethylformamide (DMF)'],
        location: 'Global Research Labs, Forensic Facilities',
        storage: { temp: '2-8°C (Long term)', light: 'Light sensitive', shelf: '12 Months', notes: 'Highly potent; handle with extreme caution in a laboratory setting.' }
    },
    {
        id: 'misc_tryptamines', folder: 'Tryptamines', category: 'psychedelics', type: 'Tryptamine', name: 'Research Tryptamines', esters: '(4-AcO-DMT / 4-HO-MET / DET / DiPT)', status: 'experimental',
        overview: 'Exotic analogs of Psilocin and DMT. 4-AcO-DMT is often used as a "synthetic mushroom" while DiPT is unique for its purely auditory distortions.',
        primaryUses: 'Research / Recreational',
        mechanism: 'Varying degrees of 5-HT2A and 5-HT1A agonism.',
        dosage: '10mg to 50mg.',
        benefits: 'Visual/Auditory hallucinations, emotional introspection; 4-AcO-DMT provides a near-identical experience to psilocybin mushrooms.',
        risks: 'Confusion, temporary hearing distortion (DiPT), typical psychedelic risks.',
        impact: { brain: 5, heart: 4, liver: 1, kidneys: 1, blood: 3, hair: 0, joints: 0 },
        cycleExamples: '<strong>Research Dive:</strong> 25mg of 4-AcO-DMT for a deep, 6-hour introspective session similar to a "Level 3" mushroom trip.'
    },
    {
        id: 'lsa', folder: 'Classic Psychedelics', category: 'psychedelics', type: 'Ergoline', name: 'LSA', esters: '(Morning Glory / Hawaiian Baby Woodrose)', status: 'active (Natural)',
        overview: 'Lysergic acid amide is a naturally occurring psychedelic found in certain seeds. It is a chemical precursor to LSD.',
        primaryUses: 'Recreational / Divination',
        mechanism: 'Non-selective serotonin receptor agonist.',
        dosage: '100 to 400 Morning Glory seeds.',
        benefits: 'Dream-like sedation, visuals, and deep introspection; historically significant as a legal, natural source of lysergamides.',
        risks: 'Extreme nausea, severe vasoconstriction (leg pain), lethargy.',
        impact: { brain: 4, heart: 5, liver: 3, kidneys: 2, blood: 7, hair: 0, joints: 0 },
        cycleExamples: '<strong>Traditional Brew:</strong> Cold water extraction of 300 seeds to minimize the nauseating plant matter while isolating the LSA.'
    },
    {
        id: 'methamphetamine', folder: 'Stimulants', category: 'recreational', type: 'Amphetamine', name: 'Methamphetamine', esters: '(Meth / Crystal / Ice)', status: 'active (Restricted)',
        overview: 'A tremendously potent CNS stimulant. Desoxyn is the pharmaceutical version prescribed for extreme ADHD and obesity.',
        primaryUses: 'ADHD (rare), Narcolepsy, Illicit recreation',
        mechanism: 'Potent releaser and reuptake inhibitor of Dopamine, Serotonin, and Norepinephrine. Crosses the blood-brain barrier far more efficiently than amphetamine.',
        dosage: '5mg to 15mg (Medical); 20mg+ (Illicit).',
        benefits: 'Extreme euphoria, limitless energy, total fatigue suppression; allows for unprecedented focus and physical output.',
        risks: 'Severe neurotoxicity, cardiac failure, "Meth mouth" (due to vasoconstriction/hygiene), rapid devastating addiction.',
        impact: { brain: 10, heart: 10, liver: 5, kidneys: 4, blood: 10, hair: 4, joints: 0 },
        cycleExamples: '<strong>Clinical Desoxyn:</strong> 5mg daily prescribed for treatment-resistant ADHD or morbid obesity under strict medical monitoring.'
    },
    {
        id: 'mdea', folder: 'Entactogens', category: 'entactogens', type: 'Phenethylamine', name: 'MDEA', esters: '(Eve)', status: 'restricted',
        overview: '3,4-Methylenedioxy-N-ethylamphetamine. An analog of MDMA that is less stimulating and more sedating.',
        primaryUses: 'Recreational (historical)',
        mechanism: 'Serotonin, dopamine, and norepinephrine releasing agent.',
        dosage: '100mg to 150mg.',
        benefits: 'Warmth, empathy, emotional openness; often described as "milder, more relaxing MDMA".',
        risks: 'Neurotoxicity, thermoregulation issues.',
        impact: { brain: 6, heart: 7, liver: 4, kidneys: 3, blood: 5, hair: 0, joints: 0 },
        cycleExamples: '<strong>The Calm Roll:</strong> 120mg taken orally for a social, empathetic experience with less jaw-clenching and "speedy" effects than MDMA.'
    },
    {
        id: 'oxy_hydro', folder: 'Opioids', category: 'opioids', type: 'Opioid', name: 'Oxycodone / Hydrocodone', esters: '(Vicodin / Norco / OxyContin)', status: 'active',
        overview: 'Semi-synthetic opioids used for moderate-to-severe pain. Hydrocodone is often combined with Acetaminophen (Vicodin).',
        primaryUses: 'Pain management',
        mechanism: 'Full mu-opioid receptor agonists.',
        dosage: '5mg to 30mg.',
        benefits: 'Complete pain relief, relaxation; the absolute clinical standard for managing moderate to severe pain.',
        risks: 'High abuse potential, fatal respiratory depression in overdose.',
        impact: { brain: 7, heart: 5, liver: 4, kidneys: 3, blood: 4, hair: 0, joints: 0 },
        cycleExamples: '<strong>Post-Op Recovery:</strong> 5mg Vicodin (Hydrocodone/Acetaminophen) every 4 hours for the first 3 days after orthopedic surgery.'
    },
    {
        id: 'misc_sedatives', folder: 'Sedatives', category: 'depressants', type: 'Sedative', name: 'Historical Sedatives', esters: '(Quaaludes / Chloral Hydrate)', status: 'discontinued',
        overview: 'Older generations of CNS depressants. Methaqualone (Quaaludes) and Chloral Hydrate were famous for their extreme hypnotic potency.',
        primaryUses: 'Insomnia, sedation',
        mechanism: 'Various GABAergic modulations.',
        dosage: 'Variable.',
        benefits: 'Instant, heavy sleep induction; historically provided a "no-hangover" alternative to barbiturates in some users.',
        risks: 'Fatal overdose when mixed with alcohol, severe ataxia.',
        impact: { brain: 10, heart: 7, liver: 4, kidneys: 2, blood: 3, hair: 0, joints: 0 },
        cycleExamples: '<strong>The Mickey Finn:</strong> Historically, Chloral Hydrate was slipped into drinks to induce immediate, deep unconsciousness in the target.'
    },
    {
        id: 'nootropics', folder: 'Neuro-Enhancers', category: 'recreational', type: 'Nootropic', name: 'Racetams & Noopept', esters: '(Piracetam / Noopept)', status: 'active (Unregulated)',
        overview: 'Synthetic compounds designed to enhance cognitive function, memory, and focus without the heavy stimulation of amphetamines.',
        primaryUses: 'Cognitive enhancement, neuroprotection',
        mechanism: 'Modulate acetylcholine and glutamate neurotransmission.',
        dosage: '10mg (Noopept) to 1600mg (Piracetam).',
        benefits: 'Improved verbal fluency, memory retention, "mental clarity"; helps protect the brain from oxidative stress.',
        risks: 'Headaches (due to choline depletion), irritability.',
        impact: { brain: -3, heart: 1, liver: 1, kidneys: 1, blood: 1, hair: 0, joints: 0 },
        cycleExamples: '<strong>The Cognitive Stack:</strong> 800mg Piracetam with 300mg Alpha-GPC (choline source) twice daily for enhanced study performance.'
    },

    // --- BODYBUILDING ELITE ANCILLARIES ---
    {
        id: 'tirzepatide', folder: 'Metabolics', category: 'peptides', type: 'GLP-1/GIP Agonist', name: 'Tirzepatide / Semaglutide', esters: '(Mounjaro / Ozempic / Wegovy)', status: 'active',
        overview: 'The modern "gold standard" for fat loss. Originally for Type 2 Diabetes, these peptides mimic gut hormones to suppress appetite and slow gastric emptying.',
        primaryUses: 'Type 2 Diabetes, Chronic weight management',
        mechanism: 'Agonizes GLP-1 and/or GIP receptors, signaling the brain to feel full and dramatically improving insulin sensitivity.',
        dosage: '0.25mg to 2.4mg (Semaglutide) weekly; 2.5mg to 15mg (Tirzepatide) weekly.',
        experimental: { b: '0.25–0.5 mg/wk', a: '1.0–2.4 mg/wk' },
        synthesis: 'A highly advanced synthetic peptide produced via automated solid-phase peptide synthesis (SPPS).',
        synthesisSteps: [
            'Assembly of the 39-amino acid chain on a specialized resin base.',
            'Step-wise coupling of individual protected amino acids using specialized reagents.',
            'Conjugation of the C20 diacid fatty acid side chain to the Lysine-20 residue.',
            'Cleavage from the resin and global deprotection of the peptide chain.',
            'Reverse-phase HPLC purification to achieve 99% structural purity.'
        ],
        ingredients: ['Fmoc-protected Amino Acids', 'Chlorot rityl Chloride Resin', 'C20 Diacid Chain', 'Piperidine', 'TFA (Trifluoroacetic acid)', 'N,N-Diisopropylethylamine'],
        benefits: 'Mathematically guaranteed weight loss, profound appetite suppression, improved glycemic control.',
        risks: 'Nausea, gastroparesis (stomach paralysis), potential muscle wasting if protein intake isn\'t high.',
    },
    {
        id: 'retatrutide', folder: 'Metabolics', category: 'peptides', type: 'GLP-1/GIP/Glucagon Agonist', name: 'Retatrutide', esters: '(LY3437943 / Triple Agonist)', status: 'experimental',
        overview: 'The latest evolution in metabolic peptides. A "Triple Agonist" that activates GLP-1, GIP, and Glucagon receptors, potentially offering even greater weight loss than Tirzepatide.',
        primaryUses: 'Investigational weight management, Type 2 Diabetes',
        mechanism: 'Simultaneously agonizes GLP-1 (appetite/insulin), GIP (metabolism/fat), and Glucagon (energy expenditure/thermogenesis) receptors.',
        dosage: '1mg to 12mg weekly (experimental titration).',
        experimental: { b: '1.0–4.0 mg/wk', a: '8.0–12.0 mg/wk' },
        synthesis: 'A complex synthetic peptide manufactured via solid-phase peptide synthesis (SPPS), featuring a unique structure that allows binding to three distinct receptors.',
        synthesisSteps: [
            'Automated sequence assembly of the multi-agonist peptide chain.',
            'Precision folding and stabilization of the triple-binding motif.',
            'Acylation with a fatty acid side chain to prolong half-life.',
            'Cleavage from the solid support and purification via RP-HPLC.',
            'Lyophilization to produce the final research-grade powder.'
        ],
        ingredients: ['Fmoc-protected Amino Acids', 'Resin Support', 'Fatty Acid Side Chain', 'Coupling Reagents', 'TFA', 'Purified Water'],
        benefits: 'Average weight loss of up to 24-28% in trials; significant improvement in metabolic markers; potential "thermogenic" effect due to glucagon agonism.',
        risks: 'Gastrointestinal distress (nausea, vomiting), transient heart rate elevation, potential for muscle loss if weight loss is too rapid.',
        impact: { brain: 2, heart: 5, liver: 0, kidneys: 0, blood: 4, hair: 0, joints: 0 },
        aestheticProfile: 'Rapid and severe depletion of adipose tissue. May cause a "sunken" facial appearance if weight loss occurs too quickly.',
        physiologicalTargets: 'GLP-1, GIP, and Glucagon receptors in the brain, pancreas, liver, and adipose tissue.'
    },
    {
        id: 'melanotan_ii', folder: 'Systemic & Cosmetic', category: 'peptides', type: 'Peptide', name: 'Melanotan II', esters: '(MT2 / Barbarian Tanning)', status: 'experimental',
        overview: 'A synthetic analog of the alpha-melanocyte-stimulating hormone. It induces skin tanning without the need for UV exposure.',
        primaryUses: 'Skin pigmentation, erectile dysfunction (historical)',
        mechanism: 'Non-selective agonist of the melanocortin receptors (MC1, MC3, MC4, MC5).',
        dosage: '250mcg to 500mcg daily.',
        experimental: { b: '250mcg/day', a: '500mcg/day' },
        benefits: 'Extreme skin tanning, dramatic surge in libido, appetite suppression.',
        risks: 'Systemic darkening of moles, severe nausea ("MT-Nausea"), facial flushing, priapism (painful long-lasting erections).'
    },
    {
        id: 'telmisartan', folder: 'Cardiovascular Support', category: 'ancillaries', type: 'ARB', name: 'Telmisartan', esters: '(Micardis)', status: 'active',
        overview: 'Often called the "Elite Bodybuilder\'s ARB". It is the only blood pressure medication that also activates PPAR-gamma, improving metabolism and heart health.',
        primaryUses: 'Hypertension, Left Ventricular Hypertrophy (LVH) prevention',
        mechanism: 'Angiotensin II Receptor Blocker (ARB). Protects the kidneys and heart from the high blood pressure caused by AAS.',
        dosage: '20mg to 80mg daily.',
        experimental: { b: '20mg/day', a: '40–80 mg/day' },
        benefits: 'Reduces visceral fat, improves insulin sensitivity, prevents the thickening of the heart walls (LVH) on-cycle.',
        risks: 'Hyperkalemia (high potassium), dizziness, kidney strain if already damaged.'
    },
    {
        id: 'nebivolol', folder: 'Cardiovascular Support', category: 'ancillaries', type: 'Beta Blocker', name: 'Nebivolol', esters: '(Bystolic)', status: 'active',
        overview: 'The preferred beta-blocker for athletes. Unlike older beta-blockers, it is highly cardioselective and increases Nitric Oxide, improving performance while protecting the heart.',
        primaryUses: 'Hypertension, heart rate control',
        mechanism: 'Selective Beta-1 adrenergic antagonist. Also stimulates Beta-3 receptors in the blood vessels, causing vasodilation via Nitric Oxide release.',
        dosage: '5mg to 10mg daily.',
        experimental: { b: '5mg/day', a: '10mg/day' },
        benefits: 'Lowers resting heart rate, reduces cardiovascular strain without the "lethargy" or "flatness" associated with Propranolol.',
        risks: 'Bradycardia (too low heart rate), masking hypoglycemia symptoms.'
    },
    {
        id: 'lisinopril', folder: 'Cardiovascular Support', category: 'ancillaries', type: 'ACE Inhibitor', name: 'Lisinopril', esters: '(Zestril)', status: 'active',
        overview: 'A standard-of-care ACE inhibitor for blood pressure. Extremely effective for managing the high BP caused by water-retaining steroids like Dianabol or Anadrol.',
        primaryUses: 'Hypertension, Heart failure',
        mechanism: 'Inhibits the Angiotensin-Converting Enzyme, preventing the formation of Angiotensin II—a potent vasoconstrictor.',
        dosage: '10mg to 40mg daily.',
        experimental: { b: '10mg/day', a: '20–40 mg/day' },
        benefits: 'Profoundly drops blood pressure, protects the kidneys, and reduces the workload on the heart.',
        risks: 'Dry persistent cough, dizziness, potential for hyperkalemia.'
    },
    {
        id: 'aspirin_low_dose', folder: 'Cardiovascular Support', category: 'ancillaries', type: 'Antiplatelet', name: 'Low-Dose Aspirin', esters: '(Baby Aspirin)', status: 'active',
        overview: 'A critical ancillary for users of EPO, Equipoise, or high-dose Testosterone to prevent blood clots when hematocrit is elevated.',
        primaryUses: 'Blood thinning, stroke prevention',
        mechanism: 'Irreversibly inhibits the COX-1 enzyme, preventing the production of Thromboxane A2 which is required for platelet aggregation (clotting).',
        dosage: '81mg daily.',
        experimental: { b: '81mg/day', a: '81mg/day' },
        benefits: 'Reduces blood viscosity ("thins the blood"), significantly lowering the risk of stroke and clotted arteries on-cycle.',
        risks: 'Stomach ulcers, increased bleeding from minor cuts/bruises.'
    },
    {
        id: 'vitamin_k2', folder: 'Micronutrient Optimization', category: 'ancillaries', type: 'Vitamin / Cofactor', name: 'Vitamin K2 (MK-7)', esters: '', status: 'active',
        overview: 'Vitamin K2, specifically the MK-7 subtype, is a critical regulator of calcium metabolism. It is frequently utilized in pharmacological research to mitigate the risks of soft tissue calcification associated with high-dose Vitamin D3 administration.',
        primaryUses: 'Arterial health, bone density optimization, cardiovascular protection',
        mechanism: 'Activates Vitamin K-dependent proteins (VKDPs), specifically Matrix Gla Protein (MGP) and Osteocalcin. These proteins act as biological switches that direct calcium into the bone matrix while actively removing it from the vascular walls.',
        dosage: '100mcg to 200mcg daily (oral).',
        experimental: { b: '100mcg/day', a: '200–500 mcg/day' },
        benefits: 'Prevents vascular stiffness, reverses early-stage arterial calcification, and ensures synergistic safety when utilizing mega-dosed Vitamin D3 protocols.',
        risks: 'Minimal; interference with blood-thinning medications (Warfarin).',
        impact: { brain: 0, heart: -2, liver: 0, kidneys: 0, blood: 1, hair: 0, joints: -1 },
        aestheticProfile: 'N/A',
        physiologicalTargets: 'Vascular smooth muscle cells and osteoblasts. Primary focus is the maintenance of arterial elasticity.',
        synthesis: 'Produced via bacterial fermentation (Bacillus subtilis natto).',
        synthesisSteps: [
            'Inoculation of a sterile substrate with Bacillus subtilis.',
            'Controlled fermentation to maximize menaquinone-7 (MK-7) yield.',
            'Supercritical CO2 extraction to isolate the lipophilic K2 fraction.',
            'Purification via molecular distillation to achieve clinical grade potency.'
        ],
        ingredients: ['Bacillus subtilis', 'Substrate (Soy or Chickpea)', 'CO2 (Extraction)'],
        location: 'Japan, European Union',
        storage: { temp: '15-25°C', light: 'Light sensitive', shelf: '24 Months', notes: 'Fat soluble; must be consumed with a lipid source for optimal absorption.' }
    },
    {
        id: 'tadalafil', folder: 'Sexual Health', category: 'ancillaries', type: 'PDE5 Inhibitor', name: 'Tadalafil / Sildenafil', esters: '(Cialis / Viagra)', status: 'active',
        overview: 'Beyond erectile dysfunction, these are used by athletes to improve blood flow, gym "pumps," and lower systemic blood pressure.',
        primaryUses: 'ED, BPH, Pulmonary Hypertension',
        mechanism: 'Inhibits the PDE5 enzyme, increasing cGMP levels and causing prolonged vasodilation (blood vessel widening).',
        dosage: '5mg (Daily Cialis) to 20mg (Standard); 25mg to 100mg (Sildenafil).',
        experimental: { b: '5–10 mg/day', a: '10–20 mg/day' },
        synthesis: 'Produced via a complex multi-step organic synthesis starting from the amino acid D-tryptophan and piperonal. The process involves a Pictet-Spengler reaction to form the fundamental tetrahydro-beta-carboline scaffold, followed by further modifications to create the final PDE5 inhibitor molecule.',
        benefits: 'Massive blood flow to muscles (pumps), lowered blood pressure, improved vascular health.',
        risks: 'Headaches, nasal congestion, dangerous drop in BP if mixed with Nitrates (Poppers/Nitroglycerin).'
    },
    {
        id: 'metformin', folder: 'Metabolism & Fat Loss', category: 'ancillaries', type: 'Biguanide', name: 'Metformin', esters: '(Glucophage)', status: 'active',
        overview: 'A legendary glucose disposal agent (GDA). Used by bodybuilders to maintain insulin sensitivity during high-calorie bulks or when using GH/Insulin.',
        primaryUses: 'Type 2 Diabetes, PCOS',
        mechanism: 'Decreases glucose production in the liver and increases insulin sensitivity in the muscle tissue via AMPK activation.',
        dosage: '500mg to 1500mg daily.',
        experimental: { b: '500mg/day', a: '1000–1500 mg/day' },
        benefits: 'Prevents fat gain, improves longevity, manages the blood sugar spikes from HGH.',
        risks: 'GI distress (loose stools), Vitamin B12 depletion, Lactic acidosis (rare).'
    },
    {
        id: 'vardenafil_avanafil', folder: 'Sexual Health', category: 'ancillaries', type: 'PDE5 Inhibitor', name: 'Vardenafil / Avanafil', esters: '(Levitra / Stendra)', status: 'active',
        overview: 'Alternative PDE5 inhibitors. Vardenafil is similar to Sildenafil but more potent in some users; Avanafil is the newest, fastest-acting member of the class.',
        primaryUses: 'Erectile Dysfunction',
        mechanism: 'Phosphodiesterase-5 inhibition.',
        dosage: '10mg to 20mg (Vardenafil); 50mg to 200mg (Avanafil).',
        experimental: { b: '10mg (Vard)', a: '20mg (Vard)' },
        benefits: 'Rapid onset (Avanafil acts in <15 mins), improved erectile quality.',
        risks: 'Headaches, facial flushing, vision changes (blue tinting).'
    },
    {
        id: 'pt141', folder: 'Sexual Health', category: 'peptides', type: 'Peptide', name: 'PT-141 (Bremelanotide)', esters: '(Vyleesi)', status: 'active',
        overview: 'A unique peptide that treats sexual dysfunction by acting directly in the brain rather than on the vascular system. Often used by those who don\'t respond to Viagra/Cialis.',
        primaryUses: 'HSDD (Hypoactive Sexual Desire Disorder), ED',
        mechanism: 'Melanocortin receptor agonist (primarily MC4R), stimulating the neural pathways responsible for sexual arousal.',
        dosage: '1.75mg (Injection).',
        experimental: { b: '1.0mg', a: '2.0mg' },
        benefits: 'Dramatic increase in libido and erectile function without affecting blood pressure significantly.',
        risks: 'Severe transient nausea, facial flushing, potential for increased blood pressure during use.'
    },
    {
        id: 'cabergoline', folder: 'Prolactin & 5AR', category: 'ancillaries', type: 'Dopamine Agonist', name: 'Cabergoline', esters: '(Dostinex)', status: 'active',
        overview: 'A potent dopamine agonist primarily used to lower prolactin levels. Extremely popular among users of 19-nor steroids (Tren/Deca) to prevent "Deca Dick".',
        primaryUses: 'Prolactinoma, High Prolactin',
        mechanism: 'High-affinity agonist for dopamine D2 receptors, suppressing the pituitary\'s release of prolactin.',
        dosage: '0.25mg to 0.5mg twice weekly.',
        experimental: { b: '0.25mg/wk', a: '0.5mg/wk' },
        benefits: 'Lowers refractory period, restores libido suppressed by prolactin, terminates lactation from high doses of androgens.',
        risks: 'Cardiac valve strain (at high doses), dizziness, "Cabergoline comedown" (depression).'
    },
    {
        id: 'dapoxetine', folder: 'Sexual Optimization', category: 'ancillaries', type: 'SSRI', name: 'Dapoxetine', esters: '(Priligy)', status: 'active',
        overview: 'The first and only compound specifically designed to treat premature ejaculation. It is a short-acting SSRI that increases the time it takes to reach climax.',
        primaryUses: 'Premature Ejaculation (PE)',
        mechanism: 'Selective serotonin reuptake inhibition, increasing the synaptic activity of serotonin which is known to delay ejaculation.',
        dosage: '30mg to 60mg (1-3 hours before activity).',
        experimental: { b: '30mg', a: '60mg' },
        benefits: 'Significantly increases intravaginal ejaculatory latency time (IELT); improves control over ejaculation.',
        risks: 'Nausea, dizziness, headache, dry mouth.'
    },
    {
        id: 'hashish', folder: 'Cannabis & Concentrates', category: 'cannabis', type: 'Concentrate', name: 'Hashish', esters: '(Resinoid)', status: 'active',
        overview: 'A potent concentrate derived from the compressed or purified preparations of stalked resin glands, called trichomes, from the cannabis plant.',
        primaryUses: 'Nausea, chronic pain, insomnia, appetite stimulation.',
        mechanism: 'Direct agonism of CB1 and CB2 receptors. Because it is a concentrate, THC levels typically exceed standard flower by 3x-10x, leading to profound inhibition of neurotransmitter release (GABA/Glutamate) in the CNS.',
        dosage: 'Highly variable (10mg to 100mg+ THC equivalent).',
        experimental: { b: 'Variable', a: 'High tolerance' },
        benefits: 'Extreme sensory enhancement, pain dissociation, significant anti-emetic properties.',
        risks: 'Acute anxiety/panic, cognitive lethargy, vulnerability to drug-induced psychosis in predisposed individuals, cannabinoid hyperemesis syndrome (CHS).',
        impact: { brain: 5, heart: 4, liver: 0, kidneys: 0, blood: 2, hair: 0, joints: 0 }
    },
    {
        id: 'ayahuasca', folder: 'Psychedelics & Hallucinogens', category: 'psychedelics', type: 'Decoction', name: 'Ayahuasca', esters: '(DMT/MAOI)', status: 'active',
        overview: 'A traditional Amazonian decoction composed of the Banisteriopsis caapi vine and various DMT-containing plants. It induces a long-duration, intense psychedelic experience.',
        primaryUses: 'Shamanic rituals, treatment-resistant depression (experimental), addiction counseling (experimental).',
        mechanism: 'The Harmala alkaloids (Harmine/Harmaline) act as reversible Monoamine Oxidase Inhibitors (MAOIs), preventing the breakdown of DMT in the digestive tract and enabling its oral bioavailability to the brain\'s 5-HT2A receptors.',
        dosage: 'Ritual/Clinical (Standardized at 0.5-1.0 mg/kg DMT).',
        experimental: { b: 'Not recommended', a: 'Guided session' },
        benefits: 'Profound spiritual/introspective insights, rapid reduction in depressive symptoms, long-term neuroplasticity.',
        risks: 'Serotonin Syndrome (Lethal if combined with SSRIs), hypertensive crisis, extreme physiological purge (vomiting/diarrhea), severe psychological distress.',
        impact: { brain: 4, heart: 5, liver: 2, kidneys: 1, blood: 3, hair: 0, joints: 0 },
        sensoryImpact: 'Vivid, immersive mythological visions, auditory messages from "nature spirits," and a profound sense of ego death followed by rebirth. Time perception is completely obliterated.'
    },
    {
        id: 'clenbuterol', folder: 'Metabolics', category: 'recreational', type: 'Beta-2 Agonist', name: 'Clenbuterol', esters: '(Clen)', status: 'active',
        overview: 'A powerful bronchodilator and thermogenic agent. While used to treat asthma in some countries, it is most famous in bodybuilding for its ability to incinerate fat while preserving lean tissue.',
        primaryUses: 'Asthma (outside USA), Extreme fat loss',
        mechanism: 'Stimulates the Beta-2 receptors in the body, which drastically increases core body temperature (thermogenesis) and basal metabolic rate (BMR). It is not a hormone.',
        dosage: '20mcg to 40mcg per day (Medical).',
        experimental: { b: '20–60 mcg/day', a: '80–140 mcg/day' },
        benefits: 'Rapid fat oxidation, slight anti-catabolic effect, improved aerobic capacity.',
        risks: 'Cardiac hypertrophy (thickening of the heart), extreme tremors, insomnia, taurine depletion.',
        impact: { brain: 4, heart: 9, liver: 1, kidneys: 3, blood: 5, hair: 0, joints: 0 },
        aestheticProfile: 'Creates an extremely "ripped" look with thin skin. Enhances muscle separation and reveals hidden vascularity. Often causes visible shaking or "trembling" of the muscles.',
        physiologicalTargets: 'Beta-2 adrenoceptors located throughout the cardiovascular system and adipose (fat) tissue. Primarily targets the myocardium (heart muscle) at high doses.'
    },
    {
        id: 'hgh_somatropin', folder: 'Growth Factors', category: 'peptides', type: 'Hormone', name: 'HGH (Somatropin)', esters: '(Humatrope / Genotropin)', status: 'active',
        overview: 'Exogenous Human Growth Hormone. A 191-amino acid single-chain polypeptide that is essential for the growth and regeneration of cells.',
        primaryUses: 'Growth hormone deficiency, muscle wasting (HIV), short stature',
        mechanism: 'Stimulates the liver to produce IGF-1 (Insulin-like Growth Factor 1). Promotes lipolysis (fat loss) and cellular hyperplasia (creation of new muscle cells).',
        dosage: '1 IU to 3 IU daily (Medical).',
        experimental: { b: '2–4 IU/day', a: '6–12 IU/day' },
        benefits: 'Unmatched fat loss, superior recovery, improved skin/hair quality, and the potential for new muscle fiber creation (Hyperplasia).',
        risks: 'Insulin resistance, carpal tunnel syndrome, organomegaly (growth of internal organs), potential for accelerated cancer growth.',
        impact: { brain: -2, heart: 6, liver: 3, kidneys: 2, blood: 4, hair: -5, joints: -10 },
        aestheticProfile: 'Provides a "youthful" glow to the skin. Causes a distinct look of "fullness" and "roundness" to the muscles. Long-term high doses can lead to "HGH Gut" (distended abdomen).',
        physiologicalTargets: 'Systemic cellular impact. Targets the liver for IGF-1 conversion and directly affects adipose tissue for fat mobilization.'
    },
    {
        id: 'insulin_humalog', folder: 'Elite Anabolics', category: 'peptides', type: 'Hormone', name: 'Insulin (Fast Acting)', esters: '(Humalog / Novolog)', status: 'active',
        overview: 'The most anabolic hormone in the human body. Used by elite bodybuilders to drive nutrients into muscle cells at a rate far exceeding physiological norms.',
        primaryUses: 'Type 1 Diabetes, Extreme Hypertrophy',
        mechanism: 'Transports glucose, amino acids, and creatine into the muscle cells by activating GLUT4 transporters. Completely shuts down muscle breakdown.',
        dosage: 'Variable (Medical).',
        experimental: { b: '2–5 IU (Pre/Post workout)', a: '10–20 IU (Pre/Post workout)' },
        benefits: 'Instantaneous muscle fullness, rapid recovery, and massive weight gain in record time.',
        risks: '<strong>Lethal Hypoglycemia.</strong> One incorrect dose or missing a meal can result in immediate coma or death. High risk of visceral fat gain.',
        impact: { brain: 5, heart: 4, liver: 2, kidneys: 4, blood: 6, hair: 0, joints: 0 },
        aestheticProfile: 'Creates a "balloon-like" muscle appearance. Muscles look hyper-inflated and dense. Can lead to "spilling over" and losing definition if carbohydrate timing is off.',
        physiologicalTargets: 'Insulin receptors located on almost every cell in the body, with a heavy focus on skeletal muscle and adipose tissue.'
    },
    {
        id: 'dnp_extreme', folder: 'Metabolics', category: 'recreational', type: 'Uncoupler', name: 'DNP (2,4-Dinitrophenol)', esters: '', status: 'lethal/Restricted',
        overview: 'A chemical used in munitions and dyes that acts as a mitochondrial uncoupler. It is the most powerful (and dangerous) fat burner in existence.',
        primaryUses: 'Industrial chemicals, Munitions',
        mechanism: 'Uncouples oxidative phosphorylation, forcing the body to burn fat for energy at an efficiency rate of near 0%, releasing the excess energy as pure heat.',
        dosage: 'None (Toxic).',
        experimental: { b: '100–200 mg/day', a: '400 mg+ (Lethal Risk)' },
        benefits: 'Fat loss of up to 1lb per day. Does not require exercise or caloric deficit to work.',
        risks: '<strong>Death by Overheating.</strong> The body literally "cooks" from the inside out. Cataracts, neuropathy, and organ failure.',
        impact: { brain: 7, heart: 10, liver: 8, kidneys: 9, blood: 8, hair: 0, joints: 0 },
        aestheticProfile: 'During use, the subject looks "flat," exhausted, and often drenched in yellow sweat. Post-cycle, the fat loss is dramatic, revealing an extremely shredded physique.',
        physiologicalTargets: 'The Mitochondria of every cell in the human body. Bypasses the central nervous system entirely.'
    }
];

// Attach to window so script.js can use it
window.WIKI_DATA = WIKI_DATA;
window.CATEGORIES = CATEGORIES;
