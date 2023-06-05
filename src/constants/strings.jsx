const strings = {
  gameTitle: "لبزل",
  alertMessages: {
    winMessages: ['شاباش', 'باز وش'],
    wordNotFoundMessage: 'لبز مان نہ اینت',
    notEnoughLettersMessage: 'لبز ناسرجم اِنت',
    gameCopiedMessage: 'تئی گوازی کاپی بوت',
    hardModeAlertMessage: 'گرانیں موڈ ایوکا لئیب ءِ بندات ءَ انیبل کنگ بیت',
    wrongSpotMessage: (guess, position) => (`"${guess}" lázem  position ${position} ah bibit  `),
    notContainedMessage: (letter) => (`"${letter}" لازم مان بہ بیت`)
  },
  modalTitles: {
    statisticsTitle: 'شمار',
    infoTitle: 'لئیب چون بیت',
    settingsTitle: 'رد ءُ بند'
  },
  infoModalTexts: {
    infoMessage: () => (
      <>
        <p>شش بر ءَ جہد کنگ ءَ گوں لبز ءَ پجّہ بیار.</p>
        <p>ھمک اندازہ یک تچکیں 5 حرفی لبزے ءَ گوں بندوک بہ بیت۔پہ جم دئیگ ءَ انٹر ءِ بٹن ءَ بجن</p>
        <p>ھمک اندازہ ءَ پد ٹائلانی رنگ بدل بیت، تانکہ اے زانگ بیت کہ تئ اندازگ گوں اے لبز ءَ چینچو نزیک بوتگ</p>
      </>
    ),
    infoExample1: () => (<p className="text-sm text-gray-500 dark:text-gray-300">
      <strong>ب</strong> لبز  ءَ مان اِنت ءُ وتی جاگہ ءَ اِنت
    </p>),
    infoExample2: () => (<p className="text-sm text-gray-500 dark:text-gray-300">
      <strong>و</strong> لبز ءَ مان اِنت بلئے وتی جاگہ ءَ نہ اِنت
    </p>),
    infoExample3: () => (<p className="text-sm text-gray-500 dark:text-gray-300">
      <strong>چ</strong> لبز  ءَ مان نہ اِنت
    </p>),
    infoMessage1: () => (
      <p className="text gray-500 dark:text-gray-200 font-bold">ہمک روچ نوکیں لبزے کئیت</p>
    )
  },
  statsModalTexts: {
    guessDistributionText: 'بہر',
    newWordText: 'نوکیں لبز',
    shareText: 'شِنگ',
    totalTriesText: 'کُل',
    successRateText: 'سوبمندی ءِ درسد',
    currentStreakText: 'استیں دور',
    bestStreakText: 'جوانیں دور'
  },
  settingsModalTexts: {
    hardMode: 'گرانیں موڈ',
    darkMode: 'ڈارک موڈ'
  },
  keys: {
    enterText: 'Enter',
    deleteText: 'Delete'
  }
};

export default strings;
