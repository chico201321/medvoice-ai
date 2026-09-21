import axios from "axios";

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";
const WS_URL = import.meta.env.VITE_WS_URL || "ws://localhost:3001/ws";

// Create axios instance with default config
const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for logging
api.interceptors.request.use((config) => {
  console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export class MedVoiceAPI {
  // Transcribe audio file
  static async transcribe(audioFile) {
    const formData = new FormData();
    formData.append("audio", audioFile);

    const response = await api.post("/transcribe", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  }

  // Batch transcribe multiple audio files
  static async transcribeBatch(audioFiles) {
    const formData = new FormData();
    audioFiles.forEach((file, index) => {
      formData.append(`audio_${index}`, file);
    });

    const response = await api.post("/transcribe-batch", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  }

  // Analyze medical transcription
  static async analyze(transcription) {
    const response = await api.post("/analyze", { transcription });
    return response.data;
  }

  // Quick keyword detection
  static async analyzeKeywords(text) {
    const response = await api.post("/analyze-keywords", { text });
    return response.data;
  }

  // Generate medical report
  static async generateReport(transcription, analysis) {
    const response = await api.post("/generate-report", {
      transcription,
      analysis,
    });
    return response.data;
  }

  // Health check
  static async healthCheck() {
    const response = await api.get(`${API_BASE_URL}/health`);
    return response.data;
  }
}

// WebSocket manager for real-time communication
export class MedVoiceWebSocket {
  constructor() {
    this.socket = null;
    this.isConnected = false;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.reconnectDelay = 1000;
    this.eventHandlers = {};
  }

  connect() {
    return new Promise((resolve, reject) => {
      try {
        this.socket = new WebSocket(WS_URL);

        this.socket.onopen = () => {
          console.log("WebSocket connected");
          this.isConnected = true;
          this.reconnectAttempts = 0;
          resolve(this);
        };

        this.socket.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            this.handleMessage(data);
          } catch (error) {
            console.error("WebSocket message parse error:", error);
          }
        };

        this.socket.onclose = () => {
          console.log("WebSocket disconnected");
          this.isConnected = false;
          this.handleReconnect();
        };

        this.socket.onerror = (error) => {
          console.error("WebSocket error:", error);
          reject(error);
        };
      } catch (error) {
        reject(error);
      }
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
      this.isConnected = false;
    }
  }

  send(data) {
    if (this.isConnected && this.socket) {
      this.socket.send(JSON.stringify(data));
    } else {
      console.warn("WebSocket not connected, message not sent:", data);
    }
  }

  // Event handler registration
  on(eventType, handler) {
    if (!this.eventHandlers[eventType]) {
      this.eventHandlers[eventType] = [];
    }
    this.eventHandlers[eventType].push(handler);
  }

  off(eventType, handler) {
    if (this.eventHandlers[eventType]) {
      const index = this.eventHandlers[eventType].indexOf(handler);
      if (index > -1) {
        this.eventHandlers[eventType].splice(index, 1);
      }
    }
  }

  // Handle incoming WebSocket messages
  handleMessage(data) {
    const { type } = data;

    if (this.eventHandlers[type]) {
      this.eventHandlers[type].forEach((handler) => {
        try {
          handler(data);
        } catch (error) {
          console.error(`Error in ${type} handler:`, error);
        }
      });
    }

    // Emit general message event
    if (this.eventHandlers.message) {
      this.eventHandlers.message.forEach((handler) => handler(data));
    }
  }

  // Auto-reconnect logic
  handleReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(
        `Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})`
      );

      setTimeout(() => {
        this.connect().catch((error) => {
          console.error("Reconnection failed:", error);
        });
      }, this.reconnectDelay * this.reconnectAttempts);
    } else {
      console.error("Max reconnection attempts reached");
      if (this.eventHandlers.maxReconnectAttemptsReached) {
        this.eventHandlers.maxReconnectAttemptsReached.forEach((handler) =>
          handler()
        );
      }
    }
  }

  // Recording control methods
  startRecording() {
    this.send({ type: "start-recording" });
  }

  stopRecording() {
    this.send({ type: "stop-recording" });
  }

  sendAudioChunk(audioData) {
    this.send({
      type: "audio-chunk",
      audioData: audioData,
      timestamp: new Date().toISOString(),
    });
  }

  requestAnalysis(transcription) {
    this.send({
      type: "get-analysis",
      transcription,
    });
  }

  ping() {
    this.send({ type: "ping" });
  }
}

export { API_BASE_URL, WS_URL };
