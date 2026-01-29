const { test, expect } = require('@playwright/test');

async function runTest(page, testInfo, input, expectedOutput) {
  let actualOutput = '';

  try {
    await page.goto('https://tamil.changathi.com', {
      waitUntil: 'load'
    });

    const inputBox = page.locator('textarea, input[type="text"]').first();
    await inputBox.click();
    await inputBox.fill('');
    
    for (const char of input) {
      await inputBox.type(char, { delay: 75 });
    }
    
    await inputBox.press('Space');
    
    let attempts = 0;
    const maxAttempts = 8;
    while (attempts < maxAttempts) {
      await page.waitForTimeout(800);
      actualOutput = await inputBox.inputValue();
      if (actualOutput.includes(expectedOutput)) {
        break;
      }
      attempts++;
    }

    expect(actualOutput.trim()).toContain(expectedOutput);

  } finally {
    await testInfo.attach('test-data', {
      body: JSON.stringify({
        input: input,
        output: actualOutput.trim(),
        expected: expectedOutput
      }),
      contentType: 'application/json'
    });
  }
}

//positive test cases
test('Pos_Fun_0001: Personal feeling statement', async ({ page }, testInfo) => {
  await runTest(page, testInfo, 'enakku indaikku padikka poka viruppam illa.', 'எனக்கு இண்டைக்கு படிக்க போக விருப்பம் இல்ல.');
});

test('Pos_Fun_0002: Interpersonal conflict', async ({ page }, testInfo) => {
  await runTest(page, testInfo, 'Enakkum amma kkum indaikku sariyaana sandai. naan ippa avaavoda kathaikrathu illa. naalaikku avaavoda kathaippam.naan kathaikkaaddil avaa kastappaduvaa.','எனக்கும் அம்மா க்கும் இண்டைக்கு சரியான சண்டை. நான் இப்ப அவாவோட கதைக்கிறது இல்ல. நாளைக்கு அவாவோட கதைப்பம்.நான் கதைக்காட்டில் அவா கஷ்டப்படுவா.');
});

test('Pos_Fun_0003: Poetic Expression', async ({ page }, testInfo) => {
  await runTest(page, testInfo, 'mulumathi avalathu mugamaakum mallikai avalathu manamaakum','முழுமதி அவளது முகமாகும் மல்லிகை அவளது மணமாகும்');
});

test('Pos_Fun_0004: Commitment', async ({ page }, testInfo) => {
  await runTest(page, testInfo, 'unmaiya naan naalaikku intha velaiya mudichchu tharren','உண்மையா நான் நாளைக்கு இந்த வேலைய முடிச்சு தர்றேன்');
});

test('Pos_Fun_0005: Positive experience', async ({ page }, testInfo) => {
  await runTest(page, testInfo, 'enakku sariyaa pasikkuthu. naan saappida poren','எனக்கு சரியா பசிக்குது. நான் சாப்பிட போறேன்');
});

test('Pos_Fun_0006: Informative Statement', async ({ page }, testInfo) => {
  await runTest(page, testInfo, 'ennoda akka kku naalaikku kalyaanam','என்னோட அக்கா க்கு நாளைக்கு கல்யாணம்');
});

test('Pos_Fun_0007: Daily activity', async ({ page }, testInfo) => {
  await runTest(page, testInfo, 'indaikku thaiyal kadaikku pokanum','இண்டைக்கு தையல் கடைக்கு போகணும்');
});

test('Pos_Fun_0008: Future Event', async ({ page }, testInfo) => {
  await runTest(page, testInfo, 'naalaikku varran', 'நாளைக்கு வர்றன்');
});

test('Pos_Fun_0009: Daily Activity', async ({ page }, testInfo) => {
  await runTest(page, testInfo, 'ippo thaan vilayaadittu vanthen', 'இப்போ தான் விளையாடிட்டு வந்தேன்');
});

test('Pos_Fun_0010: Refusal', async ({ page }, testInfo) => {
  await runTest(page, testInfo, 'naan pokella', 'நான் போகேல்ல');
});

test('Pos_Fun_0011: Poetic Expression', async ({ page }, testInfo) => {
  await runTest(page, testInfo, 'naan pogiren mele mele, boologame kaalin keele vinmeengalin koottam enmele. ean unnai paarththen endre ullam kelvi keadkum. aanaalum nenjam antha neraththai nesikkum.', 'நான் போகிறேன் மேலே மேலே, பூலோகமே காலின் கீழே விண்மீன்களின் கூட்டம் என்மேலே. ஏன் உன்னை பார்த்தேன் என்றே உள்ளம் கேள்வி கேட்க்கும். ஆனாலும் நெஞ்சம் அந்த நேரத்தை நேசிக்கும்.');
});

test('Pos_Fun_0012: Philosophical Thought', async ({ page }, testInfo) => {
  await runTest(page, testInfo, 'vaalkai endaal ippidi thaan', 'வாழ்க்கை எண்டால் இப்பிடி தான்');
});

test('Pos_Fun_0013: Self-Observation', async ({ page }, testInfo) => {
  await runTest(page, testInfo, 'nee varaaddil thaan nallam', 'நீ வராட்டில் தான் நல்லம்');
});

test('Pos_Fun_0014: Reciprocal', async ({ page }, testInfo) => {
  await runTest(page, testInfo, 'intha olungai engada thaan', 'இந்த ஒழுங்கை எங்கட தான்');
});

test('Pos_Fun_0015: Philosophical Question', async ({ page }, testInfo) => {
  await runTest(page, testInfo, 'kalyaanam thaan kaddikkiddu oodi polaama illa oodi pooyi kalyaanam thaan kaddikkalaamaa', 'கல்யாணம் தான் கட்டிக்கிட்டு ஓடி போலாமா இல்ல ஓடி போயி கல்யாணம் தான் கட்டிக்கலாமா');
});

test('Pos_Fun_0016: Interpersonal Incident', async ({ page }, testInfo) => {
  await runTest(page, testInfo, 'orunaal naan pakkaththu veeddu thangachi kooda vilayaadekka enakku theal kadichchittu!', 'ஒருநாள் நான் பக்கத்து வீட்டு தங்கச்சி கூட விளையாடேக்க எனக்கு தேள் கடிச்சிட்டு!');
});

test('Pos_Fun_0017: Query', async ({ page }, testInfo) => {
  await runTest(page, testInfo, 'yaalpaanaththila indaikku mazhaiyo? mazhai endaal enakku orukka solluvingalo?', 'யாழ்ப்பாணத்திலே இண்டைக்கு மழையோ? மழை எண்டால் எனக்கு ஒருக்கா சொல்லுவிங்களோ?');
});

test('Pos_Fun_0018: Emotional Reflection', async ({ page }, testInfo) => {
  await runTest(page, testInfo, 'naan kovaththila ippadi thaan kathaippen', 'நான் கோவத்துல இப்படி தான் கதைப்பேன்');
});

test('Pos_Fun_0019: Moral Aspiration', async ({ page }, testInfo) => {
  await runTest(page, testInfo, 'arram seiya virumbu aaruvathu sinam', 'அறம் செய்ய விரும்பு ஆறுவது சினம்');
});

test('Pos_Fun_0020: Cultural Heritage', async ({ page }, testInfo) => {
  await runTest(page, testInfo, 'naan naalaikku poka maatten', 'நான் நாளைக்கு போக மாட்டேன்');
});

test('Pos_Fun_0021: Educational Value', async ({ page }, testInfo) => {
  await runTest(page, testInfo, 'kalvi illaatha vaalkai kannillaa manithan pola oli irunthum payanillai', 'கல்வி இல்லாத வாழ்க்கை கண்ணில்லா மனிதன் போல ஒளி இருந்தும் பயனில்லை');
});

test('Pos_Fun_0022: Truth and Friendship', async ({ page }, testInfo) => {
  await runTest(page, testInfo, 'saththiyam pesum naavu thean pola inimai pakai kooda nanbanaakum', 'சத்தியம் பேசும் நாவு தேன் போல இனிமை பகை கூட நண்பனாகும்');
});

test('Pos_Fun_0023: Descriptive Insight', async ({ page }, testInfo) => {
  await runTest(page, testInfo, 'avan arivu kaatru pola kannukku theriyaathu aanaa thaakkam perithu', 'அவன் அறிவு காற்று போல கண்ணுக்கு தெரியாது ஆனா தாக்கம் பெரிது');
});

test('Pos_Fun_0024: Understanding', async ({ page }, testInfo) => {
  await runTest(page, testInfo, 'nanban illaatha vaalkai odaatha maadduvandil pola munne pokaathu', 'நண்பன் இல்லாத வாழ்க்கை ஓடாத மாட்டுவண்டில் போல முன்னே போகாது');
});

// negative test cases
test('Neg_Fun_0001: Decision Statement', async ({ page }, testInfo) => {
  await runTest(page, testInfo, 'naan indaikku school pokella', 'நான் இண்டைக்கு school போகேல்ல');
});

test('Neg_Fun_0002: Schedule update statement', async ({ page }, testInfo) => {
  await runTest(page, testInfo, 'naan naalaikku vara konjam late aakum', 'நான் நாளைக்கு வர கொஞ்சம் late ஆகும்');
});

test('Neg_Fun_0003: Narrative Statement', async ({ page }, testInfo) => {
  await runTest(page, testInfo, 'naan campus kku pokekka oru thaaththaava kanden', 'நான் campus க்கு போகேக்க ஒரு தாத்தாவை கண்டேன்');
});

test('Neg_Fun_0004: Fearful Experience Statement', async ({ page }, testInfo) => {
  await runTest(page, testInfo, 'naan morning elumbi bathroom pkekka oru naai ondu velila nindichchu naan payanthu ponen', 'நான் morning எழும்பி bathroom போகேக்க ஒரு நாய் ஒண்டு வெளில நிண்டிச்சு நான் பயந்து போனேன்');
});

test('Neg_Fun_0005: Metaphorical Expression', async ({ page }, testInfo) => {
  await runTest(page, testInfo, 'aval sirippu notification sound pola kedathum manasu happy mood', 'அவள் சிரிப்பு notification sound போல கேட்டதும் மனசு happy mood');
});

test('Neg_Fun_0006: Social Commentary', async ({ page }, testInfo) => {
  await runTest(page, testInfo, 'sombal pidichchavan update aakaatha app pola ethukkum velai seiyaathu', 'சோம்பல் பிடிச்சவன் update ஆகாத app போல எதுக்கும் வேலை செய்யாது');
});

test('Neg_Fun_0007: Positive Review Statement', async ({ page }, testInfo) => {
  await runTest(page, testInfo, 'naan indaikku saappitta saappaadu rompa 😋 nallaa irunthichchu', 'நான் இண்டைக்கு சாப்பிட்ட சாப்பாடு ரொம்ப 😋 நல்லா இருந்திச்சு');
});

test('Neg_Fun_0008: Shedule Statement', async ({ page }, testInfo) => {
  await runTest(page, testInfo, 'iravu 11pm kku naan bus eara poran naalaikku morning mannaar la nikkanum', 'இரவு 11pm க்கு நான் bus ஏற போறன் நாளைக்கு morning மன்னார் ல நிக்கணும்');
});

test('Neg_Fun_0009: Past Action Statement', async ({ page }, testInfo) => {
  await runTest(page, testInfo, 'enakku night sariyaana kaachchal naan seekkirame paduththittan', 'எனக்கு night சரியான காச்சல் நான் சீக்கிரமே படுத்திட்டேன்');
});

test('Neg_Fun_0010: Incident Statement', async ({ page }, testInfo) => {
  await runTest(page, testInfo, 'orunaal naan driving la irukkekka oru accident nadanthittu vehicle ellaam accident aakiddu', 'ஒருநாள் நான் driving ல இருக்கேக்க ஒரு accident ஒண்டு நடந்திட்டு வெஹிகிள் எல்லாம் damage ஆகிட்டு');
});