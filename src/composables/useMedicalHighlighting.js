import { ref, computed } from "vue";

export function useMedicalHighlighting() {
  const highlightedText = ref("");
  const medicalKeywords = ref([]);
  const highlightConfig = ref({
    symptom: { color: "#ef4444", bgColor: "#fef2f2", label: "Symptom" },
    diagnosis: { color: "#f59e0b", bgColor: "#fffbeb", label: "Diagnosis" },
    medication: { color: "#10b981", bgColor: "#f0fdf4", label: "Medication" },
    anatomy: { color: "#3b82f6", bgColor: "#eff6ff", label: "Anatomy" },
    procedure: { color: "#8b5cf6", bgColor: "#f5f3ff", label: "Procedure" },
    default: { color: "#6b7280", bgColor: "#f9fafb", label: "Medical Term" },
  });

  // Apply highlighting to text
  const applyHighlighting = (text, keywords = []) => {
    if (!text || !keywords.length) {
      highlightedText.value = text;
      return text;
    }

    medicalKeywords.value = keywords;
    let result = text;

    // Sort keywords by position (start index) in descending order
    // This prevents position shifts when replacing text
    const sortedKeywords = [...keywords].sort((a, b) => b.start - a.start);

    sortedKeywords.forEach((keyword) => {
      const { text: keywordText, category, start, end, confidence } = keyword;
      const config =
        highlightConfig.value[category] || highlightConfig.value.default;

      // Create highlighted span
      const highlightedSpan = `<span class="medical-highlight medical-${category}" 
        style="color: ${config.color}; background-color: ${
        config.bgColor
      }; padding: 2px 4px; border-radius: 4px; font-weight: 500; cursor: help;" 
        title="${config.label}: ${keywordText} (confidence: ${Math.round(
        (confidence || 0) * 100
      )}%)"
        data-category="${category}"
        data-confidence="${confidence || 0}">
        ${keywordText}
      </span>`;

      // Replace the keyword with highlighted version
      result =
        result.substring(0, start) + highlightedSpan + result.substring(end);
    });

    highlightedText.value = result;
    return result;
  };

  // Get keywords by category
  const getKeywordsByCategory = (category) => {
    return medicalKeywords.value.filter(
      (keyword) => keyword.category === category
    );
  };

  // Get unique categories from current keywords
  const categories = computed(() => {
    const cats = [...new Set(medicalKeywords.value.map((k) => k.category))];
    return cats.map((cat) => ({
      name: cat,
      count: medicalKeywords.value.filter((k) => k.category === cat).length,
      config: highlightConfig.value[cat] || highlightConfig.value.default,
    }));
  });

  // Statistics about highlighted content
  const statistics = computed(() => {
    const total = medicalKeywords.value.length;
    const avgConfidence =
      medicalKeywords.value.length > 0
        ? medicalKeywords.value.reduce(
            (sum, k) => sum + (k.confidence || 0),
            0
          ) / total
        : 0;

    return {
      totalKeywords: total,
      averageConfidence: Math.round(avgConfidence * 100),
      categoriesCount: categories.value.length,
      categories: categories.value,
    };
  });

  // Real-time highlighting for streaming text
  const addStreamingHighlight = (newText, keywords = []) => {
    const currentText = highlightedText.value || "";
    const updatedText = currentText + " " + newText;

    // Combine existing and new keywords
    const allKeywords = [...medicalKeywords.value, ...keywords];

    return applyHighlighting(updatedText.trim(), allKeywords);
  };

  // Clear all highlighting
  const clearHighlighting = () => {
    highlightedText.value = "";
    medicalKeywords.value = [];
  };

  // Export highlighted text as HTML
  const exportHighlightedHTML = () => {
    if (!highlightedText.value) return "";

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Medical Transcription Analysis</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; margin: 20px; }
          .medical-highlight { padding: 2px 4px; border-radius: 4px; font-weight: 500; }
          .legend { margin-bottom: 20px; }
          .legend-item { display: inline-block; margin: 5px; padding: 5px 10px; border-radius: 4px; }
        </style>
      </head>
      <body>
        <h1>Medical Transcription Analysis</h1>
        <div class="legend">
          <h3>Legend:</h3>
          ${categories.value
            .map(
              (cat) =>
                `<span class="legend-item" style="background-color: ${cat.config.bgColor}; color: ${cat.config.color};">
              ${cat.config.label} (${cat.count})
            </span>`
            )
            .join("")}
        </div>
        <div class="content">
          ${highlightedText.value}
        </div>
        <div class="stats">
          <h3>Statistics:</h3>
          <p>Total Keywords: ${statistics.value.totalKeywords}</p>
          <p>Average Confidence: ${statistics.value.averageConfidence}%</p>
          <p>Categories: ${statistics.value.categoriesCount}</p>
        </div>
      </body>
      </html>
    `;
  };

  // Custom highlighting rules for medical terms
  const customMedicalPatterns = {
    vitals: {
      patterns: [
        "blood pressure",
        "heart rate",
        "temperature",
        "pulse",
        "respiratory rate",
      ],
      category: "vitals",
      config: { color: "#dc2626", bgColor: "#fee2e2", label: "Vital Signs" },
    },
    timeframes: {
      patterns: [
        "daily",
        "twice daily",
        "weekly",
        "monthly",
        "as needed",
        "prn",
      ],
      category: "dosage",
      config: {
        color: "#059669",
        bgColor: "#d1fae5",
        label: "Dosage/Frequency",
      },
    },
    urgency: {
      patterns: ["urgent", "emergency", "stat", "immediately", "asap"],
      category: "urgency",
      config: { color: "#dc2626", bgColor: "#fee2e2", label: "Urgent" },
    },
  };

  // Apply custom medical pattern highlighting
  const applyCustomPatterns = (text) => {
    let result = text;
    const foundKeywords = [];

    Object.entries(customMedicalPatterns).forEach(([patternGroup, config]) => {
      config.patterns.forEach((pattern) => {
        const regex = new RegExp(`\\b${pattern}\\b`, "gi");
        let match;

        while ((match = regex.exec(text)) !== null) {
          foundKeywords.push({
            text: match[0],
            category: config.category,
            start: match.index,
            end: match.index + match[0].length,
            confidence: 0.9,
          });
        }
      });
    });

    // Add custom config to highlighting config
    Object.entries(customMedicalPatterns).forEach(([key, pattern]) => {
      highlightConfig.value[pattern.category] = pattern.config;
    });

    return applyHighlighting(text, foundKeywords);
  };

  return {
    // State
    highlightedText,
    medicalKeywords,
    highlightConfig,

    // Computed
    categories,
    statistics,

    // Methods
    applyHighlighting,
    addStreamingHighlight,
    clearHighlighting,
    getKeywordsByCategory,
    exportHighlightedHTML,
    applyCustomPatterns,
  };
}
