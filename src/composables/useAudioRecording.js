import { ref, onUnmounted } from "vue";

export function useAudioRecording() {
  const isRecording = ref(false);
  const isProcessing = ref(false);
  const audioLevel = ref(0);
  const error = ref(null);

  let mediaRecorder = null;
  let audioContext = null;
  let analyser = null;
  let microphone = null;
  let audioStream = null;
  let audioChunks = [];
  let levelCheckInterval = null;

  // Audio recording configuration
  const SAMPLE_RATE = 16000;
  const CHUNK_DURATION = 5000; // 5 seconds
  const recordingOptions = {
    audio: {
      sampleRate: SAMPLE_RATE,
      channelCount: 1,
      echoCancellation: true,
      noiseSuppression: true,
      autoGainControl: true,
    },
  };

  // Initialize audio recording
  const initializeRecording = async () => {
    try {
      error.value = null;

      // Request microphone permission
      audioStream = await navigator.mediaDevices.getUserMedia(recordingOptions);

      // Create audio context for level monitoring
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
      analyser = audioContext.createAnalyser();
      microphone = audioContext.createMediaStreamSource(audioStream);

      analyser.fftSize = 256;
      microphone.connect(analyser);

      // Create MediaRecorder
      const mimeType = getSupportedMimeType();
      mediaRecorder = new MediaRecorder(audioStream, { mimeType });

      setupMediaRecorderHandlers();

      return true;
    } catch (err) {
      console.error("Audio initialization error:", err);
      error.value = handleAudioError(err);
      return false;
    }
  };

  // Setup MediaRecorder event handlers
  const setupMediaRecorderHandlers = () => {
    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunks.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      // Final processing can be handled here
      console.log("MediaRecorder stopped");
    };

    mediaRecorder.onerror = (event) => {
      console.error("MediaRecorder error:", event.error);
      error.value = "Recording error: " + event.error.message;
    };
  };

  // Start recording
  const startRecording = async (onAudioChunk = null) => {
    try {
      if (!mediaRecorder) {
        const initialized = await initializeRecording();
        if (!initialized) return false;
      }

      isRecording.value = true;
      audioChunks = [];

      // Start recording
      mediaRecorder.start(CHUNK_DURATION);

      // Start audio level monitoring
      startAudioLevelMonitoring();

      // Handle audio chunks if callback provided
      if (onAudioChunk) {
        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunks.push(event.data);
            convertBlobToBase64(event.data).then((base64) => {
              onAudioChunk(base64);
            });
          }
        };
      }

      return true;
    } catch (err) {
      console.error("Start recording error:", err);
      error.value = handleAudioError(err);
      isRecording.value = false;
      return false;
    }
  };

  // Stop recording
  const stopRecording = () => {
    return new Promise((resolve) => {
      if (mediaRecorder && isRecording.value) {
        mediaRecorder.onstop = () => {
          isRecording.value = false;
          stopAudioLevelMonitoring();

          // Create final audio blob
          const audioBlob = new Blob(audioChunks, {
            type: mediaRecorder.mimeType,
          });
          resolve(audioBlob);
        };

        mediaRecorder.stop();
      } else {
        isRecording.value = false;
        resolve(null);
      }
    });
  };

  // Get current audio chunks as blob
  const getCurrentAudioBlob = () => {
    if (audioChunks.length > 0) {
      return new Blob(audioChunks, {
        type: mediaRecorder?.mimeType || "audio/webm",
      });
    }
    return null;
  };

  // Start monitoring audio levels for visualization
  const startAudioLevelMonitoring = () => {
    if (!analyser) return;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const updateLevel = () => {
      if (!isRecording.value) return;

      analyser.getByteFrequencyData(dataArray);

      // Calculate average audio level
      const sum = dataArray.reduce((acc, value) => acc + value, 0);
      const average = sum / bufferLength;
      audioLevel.value = Math.round((average / 255) * 100);
    };

    levelCheckInterval = setInterval(updateLevel, 100);
  };

  // Stop audio level monitoring
  const stopAudioLevelMonitoring = () => {
    if (levelCheckInterval) {
      clearInterval(levelCheckInterval);
      levelCheckInterval = null;
    }
    audioLevel.value = 0;
  };

  // Convert blob to base64 for WebSocket transmission
  const convertBlobToBase64 = (blob) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result.split(",")[1]; // Remove data:audio/webm;base64, prefix
        resolve(base64);
      };
      reader.readAsDataURL(blob);
    });
  };

  // Get supported MIME type for MediaRecorder
  const getSupportedMimeType = () => {
    const types = [
      "audio/webm;codecs=opus",
      "audio/webm",
      "audio/mp4",
      "audio/ogg;codecs=opus",
      "audio/wav",
    ];

    for (const type of types) {
      if (MediaRecorder.isTypeSupported(type)) {
        return type;
      }
    }

    return "audio/webm"; // Fallback
  };

  // Handle audio-related errors
  const handleAudioError = (err) => {
    if (err.name === "NotAllowedError") {
      return "Microphone access denied. Please allow microphone permissions and try again.";
    } else if (err.name === "NotFoundError") {
      return "No microphone found. Please check your audio devices.";
    } else if (err.name === "NotSupportedError") {
      return "Audio recording not supported in this browser.";
    } else {
      return `Audio error: ${err.message}`;
    }
  };

  // Cleanup function
  const cleanup = () => {
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      mediaRecorder.stop();
    }

    if (audioStream) {
      audioStream.getTracks().forEach((track) => track.stop());
    }

    if (audioContext) {
      audioContext.close();
    }

    stopAudioLevelMonitoring();

    // Reset state
    isRecording.value = false;
    isProcessing.value = false;
    audioLevel.value = 0;
    error.value = null;
  };

  // Cleanup on component unmount
  onUnmounted(() => {
    cleanup();
  });

  return {
    // State
    isRecording,
    isProcessing,
    audioLevel,
    error,

    // Methods
    initializeRecording,
    startRecording,
    stopRecording,
    getCurrentAudioBlob,
    convertBlobToBase64,
    cleanup,

    // Utils
    getSupportedMimeType,
  };
}
