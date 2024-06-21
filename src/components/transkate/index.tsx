import React, { useState } from 'react';
import translate from 'google-translate-api';

const Translate = () => {
  const [originalText, setOriginalText] = useState('');
  const [translatedText, setTranslatedText] = useState('');

  const handleTranslate = async () => {
    try {
      // 调用 Google Translate API 进行翻译
      const res = await translate(originalText, { to: 'zh-CN' }); // 将原始文本翻译为中文

      // 更新状态，显示翻译结果
      setTranslatedText(res.text);
    } catch (error) {
      console.error('Error translating:', error);
    }
  };

  return (
    <div>
      <textarea
        value={originalText}
        onChange={(e) => setOriginalText(e.target.value)}
        placeholder="Enter text to translate..."
      />
      <button onClick={handleTranslate}>Translate</button>
      <div>
        <h3>Translated Text:</h3>
        <p>{translatedText}</p>
      </div>
    </div>
  );
};

export default Translate;
