<template>
  <div class="demo-container">
    <!-- Demo Header -->
    <div class="demo-header">
      <div class="container">
        <h1 class="demo-title">{{ $t("demo.title") }}</h1>
        <p class="demo-subtitle">{{ $t("demo.subtitle") }}</p>
        <router-link to="/" class="back-btn">
          <i class="fas fa-arrow-left"></i>
          {{ $t("demo.backToHome") }}
        </router-link>
      </div>
    </div>

    <!-- Demo Content -->
    <div class="demo-content">
      <div class="container">
        <!-- Demo Instructions Video -->
        <div class="demo-video-section">
          <div class="video-container">
            <h2>
              {{ $t("demo.instructions.title") || "How to Use the Demo" }}
            </h2>
            <div class="video-wrapper">
              <iframe
                src="https://www.youtube.com/embed/BuFJT_2afqw?si=Fo1aSjiK4puR_gGG"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              >
              </iframe>
            </div>
          </div>
        </div>

        <div class="demo-grid">
          <!-- Voice Recording Section -->
          <div class="demo-card">
            <div class="card-header">
              <i class="fas fa-microphone microphone-icon"></i>
              <h3>{{ $t("demo.voiceRecording.title") }}</h3>
            </div>
            <div class="card-body">
              <div class="recording-area">
                <button
                  @click="toggleRecording"
                  :class="['record-btn', { active: isRecording }]"
                  :disabled="isProcessing"
                >
                  <i
                    :class="['fas', isRecording ? 'fa-stop' : 'fa-microphone']"
                  ></i>
                  {{
                    isRecording
                      ? $t("demo.voiceRecording.stop")
                      : $t("demo.voiceRecording.start")
                  }}
                </button>
                <div v-if="isRecording" class="recording-indicator">
                  <div class="pulse"></div>
                  <span>{{ $t("demo.voiceRecording.listening") }}</span>
                </div>
                <div v-if="recordedText" class="recorded-text">
                  <h4>{{ $t("demo.voiceRecording.transcription") }}:</h4>
                  <div
                    v-if="highlightedText"
                    v-html="highlightedText"
                    class="highlighted-transcription"
                  ></div>
                  <p v-else>{{ recordedText }}</p>

                  <!-- Keywords Statistics -->
                  <div v-if="medicalKeywords.length > 0" class="keywords-stats">
                    <small class="text-slate-500">
                      {{ medicalKeywords.length }} medical terms detected
                    </small>
                  </div>
                </div>

                <!-- Connection Status -->
                <div
                  v-if="connectionStatus !== 'connected'"
                  class="connection-status"
                >
                  <div class="status-indicator" :class="connectionStatus">
                    <i class="fas fa-circle"></i>
                    <span>Backend: {{ connectionStatus }}</span>
                  </div>
                </div>

                <!-- Error Display -->
                <div v-if="audioError" class="error-message">
                  <i class="fas fa-exclamation-triangle"></i>
                  <span>{{ audioError }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- AI Analysis Section -->
          <div class="demo-card">
            <div class="card-header">
              <i class="fas fa-brain brain-icon"></i>
              <h3>{{ $t("demo.aiAnalysis.title") }}</h3>
            </div>
            <div class="card-body">
              <div v-if="isProcessing" class="processing">
                <div class="spinner"></div>
                <p>{{ $t("demo.aiAnalysis.processing") }}</p>
              </div>
              <div v-else-if="analysisResult" class="analysis-result">
                <div class="diagnosis-section">
                  <h4>{{ $t("demo.aiAnalysis.diagnosis") }}:</h4>
                  <div class="diagnosis-tags">
                    <span
                      v-for="diagnosis in analysisResult.diagnoses"
                      :key="diagnosis"
                      class="tag"
                    >
                      {{ diagnosis }}
                    </span>
                  </div>
                </div>
                <div class="recommendations-section">
                  <h4>{{ $t("demo.aiAnalysis.recommendations") }}:</h4>
                  <ul>
                    <li
                      v-for="rec in analysisResult.recommendations"
                      :key="rec"
                    >
                      {{ rec }}
                    </li>
                  </ul>
                </div>
              </div>
              <div v-else class="placeholder">
                <p>{{ $t("demo.aiAnalysis.placeholder") }}</p>
              </div>
            </div>
          </div>

          <!-- Generated Report Section -->
          <div class="demo-card full-width">
            <div class="card-header">
              <i class="fas fa-file-medical report-icon"></i>
              <h3>{{ $t("demo.report.title") }}</h3>
            </div>
            <div class="card-body">
              <div v-if="generatedReport" class="medical-report">
                <div class="report-header">
                  <h4>{{ $t("demo.report.medicalReport") }}</h4>
                  <div class="report-meta">
                    <span>{{ $t("demo.report.date") }}: {{ currentDate }}</span>
                    <span
                      >{{ $t("demo.report.doctor") }}: Dr.
                      {{ $t("demo.report.sampleDoctor") }}</span
                    >
                  </div>
                </div>
                <!-- Edit Mode -->
                <div v-if="isEditingReport" class="report-editor">
                  <div class="editor-header">
                    <h5>Edit Medical Report</h5>
                    <div class="editor-controls">
                      <button
                        @click="previewReport"
                        class="btn btn-sm btn-secondary"
                      >
                        <i class="fas fa-eye"></i>
                        Preview
                      </button>
                      <button
                        @click="saveReportChanges"
                        class="btn btn-sm btn-success"
                      >
                        <i class="fas fa-check"></i>
                        Save Changes
                      </button>
                      <button
                        @click="cancelEdit"
                        class="btn btn-sm btn-outline"
                      >
                        <i class="fas fa-times"></i>
                        Cancel
                      </button>
                    </div>
                  </div>
                  <textarea
                    v-model="editableReport"
                    class="report-textarea"
                    placeholder="Edit your medical report in Markdown format..."
                    rows="20"
                  ></textarea>
                  <div class="markdown-help">
                    <small>
                      <strong>Markdown Tips:</strong>
                      Use ## for main headings, ### for subheadings, - for
                      bullet points, **bold text**, *italic text*
                    </small>
                  </div>
                </div>

                <!-- View Mode -->
                <div
                  v-else-if="typeof generatedReport === 'string'"
                  class="report-content markdown-content"
                >
                  <div v-html="renderMarkdown(generatedReport)"></div>
                </div>

                <!-- Fallback for old report format -->
                <div v-else-if="generatedReport" class="report-content">
                  <div class="report-section">
                    <h5>{{ $t("demo.report.patientComplaints") }}:</h5>
                    <p>{{ generatedReport?.complaints }}</p>
                  </div>
                  <div class="report-section">
                    <h5>{{ $t("demo.report.diagnosis") }}:</h5>
                    <p>{{ generatedReport?.diagnosis }}</p>
                  </div>
                  <div class="report-section">
                    <h5>{{ $t("demo.report.treatment") }}:</h5>
                    <p>{{ generatedReport?.treatment }}</p>
                  </div>
                </div>
                <div class="report-actions">
                  <button
                    v-if="!isEditingReport"
                    @click="startEditReport"
                    class="btn btn-edit"
                  >
                    <i class="fas fa-edit"></i>
                    Edit Report
                  </button>
                  <button @click="downloadReport" class="btn btn-primary">
                    <i class="fas fa-download"></i>
                    {{ $t("demo.report.download") }}
                  </button>
                  <button @click="printReport" class="btn btn-secondary">
                    <i class="fas fa-print"></i>
                    {{ $t("demo.report.print") }}
                  </button>
                  <button @click="saveAsTemplate" class="btn btn-outline">
                    <i class="fas fa-bookmark"></i>
                    Save as Template
                  </button>
                </div>
              </div>
              <div v-else class="placeholder">
                <p>{{ $t("demo.report.placeholder") }}</p>

                <!-- Template Selection -->
                <div v-if="savedTemplates.length > 0" class="template-section">
                  <h5>Load from Template</h5>
                  <select
                    @change="loadTemplate($event)"
                    class="template-select"
                  >
                    <option value="">Select a saved template...</option>
                    <option
                      v-for="template in savedTemplates"
                      :key="template.name"
                      :value="template.name"
                    >
                      {{ template.name }} ({{ formatDate(template.created) }})
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Demo Features -->
        <div class="demo-features">
          <h2>{{ $t("demo.features.title") }}</h2>
          <div class="features-grid">
            <div class="feature-card">
              <i class="fas fa-language"></i>
              <h4>{{ $t("demo.features.multilingual") }}</h4>
              <p>{{ $t("demo.features.multilingualDesc") }}</p>
            </div>
            <div class="feature-card">
              <i class="fas fa-clock"></i>
              <h4>{{ $t("demo.features.realtime") }}</h4>
              <p>{{ $t("demo.features.realtimeDesc") }}</p>
            </div>
            <div class="feature-card">
              <i class="fas fa-shield-alt"></i>
              <h4>{{ $t("demo.features.secure") }}</h4>
              <p>{{ $t("demo.features.secureDesc") }}</p>
            </div>
            <div class="feature-card">
              <i class="fas fa-chart-line"></i>
              <h4>{{ $t("demo.features.analytics") }}</h4>
              <p>{{ $t("demo.features.analyticsDesc") }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useI18n } from "vue-i18n";
import axios from "axios";
import { marked } from "marked";

const { t } = useI18n();

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";
const WS_URL = import.meta.env.VITE_WS_URL || "ws://localhost:3001/ws";

// Demo state
const isRecording = ref(false);
const isProcessing = ref(false);
const recordedText = ref("");
const analysisResult = ref<any | null>(null);
const generatedReport = ref<any | null>(null);
const isEditingReport = ref(false);
const editableReport = ref<string>("");
const savedTemplates = ref<
  Array<{ name: string; content: string; created: string }>
>([]);
const connectionStatus = ref("checking");
const audioError = ref("");
const mediaRecorder = ref<MediaRecorder | null>(null);
const audioStream = ref<MediaStream | null>(null);
const websocket = ref<WebSocket | null>(null);
const highlightedText = ref("");
const medicalKeywords = ref<any[]>([]);

// Markdown rendering function
const renderMarkdown = (text: string): string => {
  return marked.parse(text) as string;
};

const currentDate = computed(() => {
  return new Date().toLocaleDateString();
});

// Component lifecycle
onMounted(async () => {
  await checkBackendHealth();
  loadSavedTemplates();
});

onUnmounted(() => {
  cleanup();
});

// Check backend health
const checkBackendHealth = async () => {
  try {
    connectionStatus.value = "checking";
    await axios.get(`${API_BASE_URL}/health`);
    connectionStatus.value = "connected";
  } catch (error) {
    console.error("Backend health check failed:", error);
    connectionStatus.value = "error";
    audioError.value =
      "Backend connection failed. Please ensure the backend server is running.";
  }
};

// Initialize WebSocket connection
const initWebSocket = () => {
  if (websocket.value) return;

  try {
    websocket.value = new WebSocket(WS_URL);

    websocket.value.onopen = () => {
      console.log("WebSocket connected");
      connectionStatus.value = "connected";
    };

    websocket.value.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        handleWebSocketMessage(data);
      } catch (error) {
        console.error("WebSocket message error:", error);
      }
    };

    websocket.value.onclose = () => {
      console.log("WebSocket disconnected");
      websocket.value = null;
    };

    websocket.value.onerror = (error) => {
      console.error("WebSocket error:", error);
      audioError.value = "WebSocket connection failed";
    };
  } catch (error) {
    console.error("WebSocket init error:", error);
    audioError.value = "Failed to initialize WebSocket";
  }
};

// Handle WebSocket messages
const handleWebSocketMessage = (data: any) => {
  switch (data.type) {
    case "transcription-update":
      recordedText.value = data.fullText || data.text;
      highlightMedicalTerms(recordedText.value);
      break;
    case "analysis-complete":
      analysisResult.value = data.analysis;
      isProcessing.value = false;
      generateMedicalReport();
      break;
    case "error":
      audioError.value = data.message;
      break;
  }
};

// Real recording functions
const toggleRecording = async () => {
  try {
    audioError.value = "";

    if (isRecording.value) {
      await stopAudioRecording();
    } else {
      await startAudioRecording();
    }
  } catch (error: any) {
    console.error("Recording error:", error);
    audioError.value = "Recording failed: " + error.message;
  }
};

// Start audio recording
const startAudioRecording = async () => {
  try {
    // Reset state
    recordedText.value = "";
    analysisResult.value = null;
    generatedReport.value = null;
    highlightedText.value = "";

    // Initialize WebSocket if needed
    if (!websocket.value) {
      initWebSocket();
    }

    // Get microphone access
    audioStream.value = await navigator.mediaDevices.getUserMedia({
      audio: {
        sampleRate: 16000,
        channelCount: 1,
        echoCancellation: true,
        noiseSuppression: true,
      },
    });

    // Create MediaRecorder
    mediaRecorder.value = new MediaRecorder(audioStream.value, {
      mimeType: "audio/webm;codecs=opus",
    });

    // Setup MediaRecorder handlers
    const audioChunks: BlobPart[] = [];

    mediaRecorder.value.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunks.push(event.data);
      }
    };

    mediaRecorder.value.onstop = async () => {
      const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
      await processAudioBlob(audioBlob);
    };

    // Start recording
    mediaRecorder.value.start(5000); // 5-second chunks
    isRecording.value = true;

    // Send start signal to WebSocket
    if (websocket.value && websocket.value.readyState === WebSocket.OPEN) {
      websocket.value.send(JSON.stringify({ type: "start-recording" }));
    }
  } catch (error: any) {
    console.error("Start recording error:", error);
    audioError.value = getAudioErrorMessage(error);
  }
};

// Stop audio recording
const stopAudioRecording = async () => {
  if (mediaRecorder.value && isRecording.value) {
    mediaRecorder.value.stop();
    isRecording.value = false;
    isProcessing.value = true;

    // Send stop signal to WebSocket
    if (websocket.value && websocket.value.readyState === WebSocket.OPEN) {
      websocket.value.send(JSON.stringify({ type: "stop-recording" }));
    }
  }

  // Stop audio stream
  if (audioStream.value) {
    audioStream.value.getTracks().forEach((track) => track.stop());
    audioStream.value = null;
  }
};

// Process audio blob for transcription
const processAudioBlob = async (audioBlob: Blob) => {
  try {
    const formData = new FormData();
    formData.append("audio", audioBlob, "recording.webm");

    const response = await axios.post(
      `${API_BASE_URL}/api/transcribe`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 30000,
      }
    );

    if (response.data.success) {
      recordedText.value = response.data.transcription;
      highlightMedicalTerms(recordedText.value);

      // Analyze transcription
      await analyzeMedicalContent(recordedText.value);
    } else {
      throw new Error("Transcription failed");
    }
  } catch (error: any) {
    console.error("Audio processing error:", error);
    audioError.value = "Transcription failed: " + error.message;
    isProcessing.value = false;
  }
};

// Analyze medical content
const analyzeMedicalContent = async (transcription: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/analyze`, {
      transcription,
    });

    if (response.data.success) {
      analysisResult.value = response.data.analysis;
      await generateMedicalReport();
    }
  } catch (error: any) {
    console.error("Analysis error:", error);
    audioError.value = "Analysis failed: " + error.message;
  } finally {
    isProcessing.value = false;
  }
};

// Generate medical report
const generateMedicalReport = async () => {
  if (!analysisResult.value || !recordedText.value) return;

  try {
    const response = await axios.post(`${API_BASE_URL}/api/generate-report`, {
      transcription: recordedText.value,
      analysis: analysisResult.value,
    });

    if (response.data.success) {
      // Store the markdown report directly
      generatedReport.value =
        response.data.report || "No medical report generated";
      // Also initialize editable report
      editableReport.value = generatedReport.value || "";
    }
  } catch (error) {
    console.error("Report generation error:", error);
    // Fallback report in markdown format
    const fallbackReport = `## Medical Report\n\n### Patient Complaints\n${
      recordedText.value || "No complaints recorded"
    }\n\n### Assessment/Diagnosis\nAnalysis pending - please ensure proper transcription and analysis\n\n### Treatment Plan\nRecommendations pending - awaiting complete analysis`;
    generatedReport.value = fallbackReport;
    editableReport.value = fallbackReport;
  }
};

// Highlight medical terms in text
const highlightMedicalTerms = (text: string) => {
  if (!text) return;

  const medicalPatterns = [
    {
      pattern: /\b(pain|ache|discomfort)\b/gi,
      class: "symptom",
      color: "#ef4444",
    },
    {
      pattern: /\b(fever|temperature|chills)\b/gi,
      class: "symptom",
      color: "#ef4444",
    },
    {
      pattern: /\b(headache|migraine|dizziness)\b/gi,
      class: "symptom",
      color: "#ef4444",
    },
    {
      pattern: /\b(nausea|vomiting|nauseous)\b/gi,
      class: "symptom",
      color: "#ef4444",
    },
    {
      pattern: /\b(chest|heart|cardiac)\b/gi,
      class: "anatomy",
      color: "#3b82f6",
    },
    {
      pattern: /\b(aspirin|ibuprofen|acetaminophen|medication)\b/gi,
      class: "medication",
      color: "#10b981",
    },
    {
      pattern: /\b(diagnosis|condition|syndrome)\b/gi,
      class: "diagnosis",
      color: "#f59e0b",
    },
  ];

  let highlightedContent = text;
  const keywords: Record<string, string>[] = [];

  medicalPatterns.forEach(({ pattern, class: className, color }) => {
    highlightedContent = highlightedContent.replace(pattern, (match) => {
      keywords.push({ text: match, category: className });
      return `<span class="medical-highlight ${className}" style="background-color: ${color}20; color: ${color}; padding: 2px 4px; border-radius: 4px; font-weight: 500;">${match}</span>`;
    });
  });

  highlightedText.value = highlightedContent;
  medicalKeywords.value = keywords;
};

// Get user-friendly error message
const getAudioErrorMessage = (error: any) => {
  if (error.name === "NotAllowedError") {
    return "Microphone access denied. Please allow microphone permissions.";
  } else if (error.name === "NotFoundError") {
    return "No microphone found. Please check your audio devices.";
  } else if (error.name === "NotSupportedError") {
    return "Audio recording not supported in this browser.";
  }
  return `Audio error: ${error.message}`;
};

// Cleanup function
const cleanup = () => {
  if (mediaRecorder.value && mediaRecorder.value.state !== "inactive") {
    mediaRecorder.value.stop();
  }
  if (audioStream.value) {
    audioStream.value.getTracks().forEach((track) => track.stop());
  }
  if (websocket.value) {
    websocket.value.close();
  }
};

const downloadReport = () => {
  // Simulate download
  const element = document.createElement("a");
  const file = new Blob(
    [
      `Medical Report - ${currentDate.value}\n\n` + generatedReport.value ||
        "No report generated",
    ],
    { type: "text/plain" }
  );
  element.href = URL.createObjectURL(file);
  element.download = `medical_report_${Date.now()}.txt`;
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

const printReport = () => {
  // Create a new window with the report content for printing
  const printWindow = window.open("", "_blank");
  if (printWindow && generatedReport.value) {
    const printContent = `
      <html>
        <head>
          <title>Medical Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 2rem; line-height: 1.6; }
            h1, h2, h3 { color: #333; }
            .report-meta { margin-bottom: 2rem; padding: 1rem; background: #f5f5f5; }
          </style>
        </head>
        <body>
          <div class="report-meta">
            <h1>Medical Report</h1>
            <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
            <p><strong>Doctor:</strong> Dr. ${t("demo.report.sampleDoctor")}</p>
          </div>
          ${renderMarkdown(generatedReport.value)}
        </body>
      </html>
    `;
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
    printWindow.close();
  }
};

// Report editing functions
const startEditReport = () => {
  if (generatedReport.value) {
    editableReport.value = generatedReport.value;
    isEditingReport.value = true;
  }
};

const saveReportChanges = () => {
  generatedReport.value = editableReport.value;
  isEditingReport.value = false;
  // Auto-save to localStorage for backup
  localStorage.setItem("medvoice_report_backup", editableReport.value);
};

const cancelEdit = () => {
  editableReport.value = "";
  isEditingReport.value = false;
};

const previewReport = () => {
  // Create a preview modal/window
  const previewWindow = window.open("", "_blank", "width=800,height=600");
  if (previewWindow) {
    const previewContent = `
      <html>
        <head>
          <title>Report Preview</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 2rem; line-height: 1.6; }
            h1, h2, h3 { color: #333; }
            .preview-header { background: #e3f2fd; padding: 1rem; margin-bottom: 2rem; border-radius: 8px; }
          </style>
        </head>
        <body>
          <div class="preview-header">
            <h2>Preview Mode</h2>
            <p>This is how your report will look when saved.</p>
          </div>
          ${renderMarkdown(editableReport.value)}
        </body>
      </html>
    `;
    previewWindow.document.write(previewContent);
    previewWindow.document.close();
  }
};

const saveAsTemplate = () => {
  if (generatedReport.value) {
    const templates = JSON.parse(
      localStorage.getItem("medvoice_templates") || "[]"
    );
    const templateName = prompt("Enter template name:");
    if (templateName) {
      templates.push({
        name: templateName,
        content: generatedReport.value,
        created: new Date().toISOString(),
      });
      localStorage.setItem("medvoice_templates", JSON.stringify(templates));
      loadSavedTemplates(); // Refresh the template list
      alert("Template saved successfully!");
    }
  }
};

// Load saved templates from localStorage
const loadSavedTemplates = () => {
  try {
    const templates = JSON.parse(
      localStorage.getItem("medvoice_templates") || "[]"
    );
    savedTemplates.value = templates;
  } catch (error) {
    console.error("Error loading templates:", error);
    savedTemplates.value = [];
  }
};

// Load a template
const loadTemplate = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  const templateName = target.value;
  if (templateName) {
    const template = savedTemplates.value.find((t) => t.name === templateName);
    if (template) {
      generatedReport.value = template.content;
      editableReport.value = template.content;
    }
  }
  target.value = ""; // Reset selection
};

// Format date for display
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString();
};
</script>

<style scoped>
.demo-container {
  min-height: 100vh;
  background: #f8fafc;
}

.demo-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4rem 0 2rem;
  text-align: center;
}

.demo-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.demo-subtitle {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  text-decoration: none;
  background: rgba(255, 255, 255, 0.2);
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.back-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.demo-content {
  padding: 4rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.demo-video-section {
  margin-bottom: 4rem;
}

.video-container {
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  padding: 2rem;
}

.video-container h2 {
  text-align: center;
  color: #1f2937;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
}

.video-wrapper {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  background: #f3f4f6;
  border-radius: 12px;
  overflow: hidden;
}

.video-wrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 12px;
}

.demo-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 4rem;
}

.demo-card {
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.demo-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}

.demo-card.full-width {
  grid-column: 1 / -1;
}

.card-header {
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
}

.card-header i {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  display: block;
}

.microphone-icon {
  color: #10b981;
}

.brain-icon {
  color: #f59e0b;
}

.report-icon {
  color: #ef4444;
}

.card-header h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
}

.card-body {
  padding: 2rem;
}

.recording-area {
  text-align: center;
}

.record-btn {
  background: #10b981;
  color: white;
  border: none;
  border-radius: 50px;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 200px;
  justify-content: center;
}

.record-btn:hover {
  background: #059669;
  transform: translateY(-2px);
}

.record-btn.active {
  background: #ef4444;
}

.record-btn.active:hover {
  background: #dc2626;
}

.record-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.recording-indicator {
  margin-top: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: #ef4444;
}

.pulse {
  width: 12px;
  height: 12px;
  background: #ef4444;
  border-radius: 50%;
  animation: pulse 1s ease-in-out infinite alternate;
}

@keyframes pulse {
  from {
    transform: scale(1);
    opacity: 1;
  }
  to {
    transform: scale(1.2);
    opacity: 0.5;
  }
}

.recorded-text {
  margin-top: 2rem;
  text-align: left;
  background: #f8fafc;
  padding: 1.5rem;
  border-radius: 12px;
}

.recorded-text h4 {
  color: #374151;
  margin-bottom: 0.5rem;
}

.recorded-text p {
  color: #6b7280;
  line-height: 1.6;
}

.processing {
  text-align: center;
  padding: 2rem 0;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e5e7eb;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.analysis-result {
  text-align: left;
}

.diagnosis-section,
.recommendations-section {
  margin-bottom: 1.5rem;
}

.diagnosis-section h4,
.recommendations-section h4 {
  color: #374151;
  margin-bottom: 0.75rem;
}

.diagnosis-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  background: #667eea;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
}

.recommendations-section ul {
  list-style: none;
  padding: 0;
}

.recommendations-section li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #e5e7eb;
  color: #6b7280;
}

.recommendations-section li:before {
  content: "✓";
  color: #10b981;
  font-weight: bold;
  margin-right: 0.5rem;
}

.placeholder {
  text-align: center;
  padding: 2rem;
  color: #9ca3af;
}

.medical-report {
  background: white;
  border-radius: 12px;
  overflow: hidden;
}

.report-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
  text-align: center;
}

.report-header h4 {
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
}

.report-meta {
  display: flex;
  justify-content: center;
  gap: 2rem;
  font-size: 0.9rem;
  opacity: 0.9;
}

.report-content {
  padding: 2rem;
}

/* Markdown content styling */
.markdown-content {
  line-height: 1.7;
}

.markdown-content h2 {
  color: #1f2937;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 1.5rem 0 1rem 0;
  border-bottom: 2px solid #e5e7eb;
  padding-bottom: 0.5rem;
}

.markdown-content h3 {
  color: #374151;
  font-size: 1.2rem;
  font-weight: 600;
  margin: 1.2rem 0 0.8rem 0;
}

.markdown-content h4,
.markdown-content h5 {
  color: #4b5563;
  font-weight: 600;
  margin: 1rem 0 0.5rem 0;
}

.markdown-content ul {
  margin: 0.5rem 0;
  padding-left: 1.5rem;
}

.markdown-content li {
  margin: 0.3rem 0;
  color: #4b5563;
}

.markdown-content p {
  margin: 0.5rem 0;
  color: #4b5563;
}

.markdown-content strong {
  color: #1f2937;
  font-weight: 600;
}

.report-section {
  margin-bottom: 1.5rem;
}

.report-section h5 {
  color: #374151;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.report-section p {
  color: #6b7280;
  line-height: 1.6;
}

.report-actions {
  padding: 1rem 2rem;
  background: #f8fafc;
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

/* Report Editor Styles */
.report-editor {
  padding: 2rem;
}

.editor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e5e7eb;
}

.editor-header h5 {
  color: #1f2937;
  font-size: 1.2rem;
  font-weight: 700;
  margin: 0;
}

.editor-controls {
  display: flex;
  gap: 0.5rem;
}

.report-textarea {
  width: 100%;
  min-height: 400px;
  padding: 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-family: "Monaco", "Menlo", monospace;
  font-size: 0.9rem;
  line-height: 1.6;
  resize: vertical;
  background: #fafafa;
  transition: border-color 0.3s ease;
}

.report-textarea:focus {
  outline: none;
  border-color: #667eea;
  background: #fff;
}

.markdown-help {
  margin-top: 0.5rem;
  padding: 0.75rem;
  background: #f0f9ff;
  border-left: 4px solid #0ea5e9;
  border-radius: 4px;
}

.markdown-help small {
  color: #0369a1;
}

/* Template Section */
.template-section {
  margin-top: 2rem;
  padding: 1.5rem;
  background: #f8fafc;
  border-radius: 8px;
  border: 2px dashed #d1d5db;
}

.template-section h5 {
  color: #374151;
  margin-bottom: 0.75rem;
  font-weight: 600;
}

.template-select {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 6px;
  background: white;
  font-size: 0.9rem;
  color: #374151;
  cursor: pointer;
  transition: border-color 0.3s ease;
}

.template-select:focus {
  outline: none;
  border-color: #667eea;
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-primary {
  background: #667eea;
  color: white;
}

.btn-primary:hover {
  background: #5a67d8;
}

.btn-secondary {
  background: #6b7280;
  color: white;
}

.btn-secondary:hover {
  background: #4b5563;
}

.btn-edit {
  background: #f59e0b;
  color: white;
}

.btn-edit:hover {
  background: #d97706;
}

.btn-success {
  background: #10b981;
  color: white;
}

.btn-success:hover {
  background: #059669;
}

.btn-outline {
  background: transparent;
  color: #6b7280;
  border: 2px solid #d1d5db;
}

.btn-outline:hover {
  background: #f3f4f6;
  border-color: #9ca3af;
}

.btn-sm {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

.demo-features {
  text-align: center;
  margin-top: 4rem;
}

.demo-features h2 {
  font-size: 2.5rem;
  color: #1f2937;
  margin-bottom: 3rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-card i {
  font-size: 3rem;
  color: #667eea;
  margin-bottom: 1rem;
}

.feature-card h4 {
  color: #1f2937;
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.feature-card p {
  color: #6b7280;
  line-height: 1.6;
}

/* Medical highlighting styles */
.highlighted-transcription {
  line-height: 1.6;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.medical-highlight {
  padding: 2px 4px;
  border-radius: 4px;
  font-weight: 500;
  cursor: help;
  transition: all 0.2s ease;
}

.medical-highlight:hover {
  filter: brightness(0.9);
  transform: scale(1.02);
}

.medical-highlight.symptom {
  background-color: rgba(239, 68, 68, 0.1);
  color: #dc2626;
}

.medical-highlight.anatomy {
  background-color: rgba(59, 130, 246, 0.1);
  color: #2563eb;
}

.medical-highlight.medication {
  background-color: rgba(16, 185, 129, 0.1);
  color: #059669;
}

.medical-highlight.diagnosis {
  background-color: rgba(245, 158, 11, 0.1);
  color: #d97706;
}

/* Keywords statistics */
.keywords-stats {
  margin-top: 1rem;
  padding: 0.5rem;
  background: #f1f5f9;
  border-radius: 6px;
  text-align: center;
}

/* Connection status indicator */
.connection-status {
  margin-top: 1rem;
  text-align: center;
}

.status-indicator {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
}

.status-indicator.connected {
  background: rgba(16, 185, 129, 0.1);
  color: #059669;
}

.status-indicator.checking {
  background: rgba(245, 158, 11, 0.1);
  color: #d97706;
}

.status-indicator.error {
  background: rgba(239, 68, 68, 0.1);
  color: #dc2626;
}

.status-indicator i {
  animation: pulse 2s infinite;
}

/* Error message */
.error-message {
  margin-top: 1rem;
  padding: 0.75rem 1rem;
  background: rgba(239, 68, 68, 0.1);
  color: #dc2626;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
}

/* Enhanced analysis result styles */
.analysis-section {
  margin-bottom: 1.5rem;
}

.analysis-section h4 {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #374151;
  margin-bottom: 0.75rem;
  font-size: 1rem;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  color: white;
}

.tag-symptom {
  background: #ef4444;
}

.tag-diagnosis {
  background: #f59e0b;
}

.tag-medication {
  background: #10b981;
}

.recommendations-list {
  list-style: none;
  padding: 0;
}

.recommendations-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid #e5e7eb;
  color: #6b7280;
  line-height: 1.5;
}

.recommendations-list li:last-child {
  border-bottom: none;
}

.recommendations-list i {
  color: #10b981;
  margin-top: 2px;
  flex-shrink: 0;
}

/* Priority indicators */
.priority-indicators {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.priority-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
}

.severity-low {
  background: rgba(16, 185, 129, 0.1);
  color: #059669;
}

.severity-medium {
  background: rgba(245, 158, 11, 0.1);
  color: #d97706;
}

.severity-high {
  background: rgba(239, 68, 68, 0.1);
  color: #dc2626;
}

.urgency-routine {
  background: rgba(107, 114, 128, 0.1);
  color: #6b7280;
}

.urgency-urgent {
  background: rgba(245, 158, 11, 0.1);
  color: #d97706;
}

.urgency-emergency {
  background: rgba(239, 68, 68, 0.1);
  color: #dc2626;
}

/* ICD codes */
.icd-codes {
  margin-top: 1.5rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.icd-codes h5 {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  color: #374151;
  font-size: 0.875rem;
}

.icd-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.icd-item {
  padding: 0.5rem;
  background: white;
  border-radius: 6px;
  font-size: 0.875rem;
  line-height: 1.4;
}

.icd-item strong {
  color: #2563eb;
}

@media (max-width: 768px) {
  .demo-grid {
    grid-template-columns: 1fr;
  }

  .demo-title {
    font-size: 2rem;
  }

  .report-meta {
    flex-direction: column;
    gap: 0.5rem;
  }

  .report-actions {
    flex-direction: column;
  }

  .priority-indicators {
    flex-direction: column;
    gap: 0.5rem;
  }

  .tags-container {
    justify-content: center;
  }
}
</style>
