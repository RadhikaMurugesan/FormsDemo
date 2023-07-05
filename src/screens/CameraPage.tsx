import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import { Camera, CameraPermissionStatus, useCameraDevices } from 'react-native-vision-camera';

const CameraPage = () => {
  const devices = useCameraDevices()
  const device = devices.back
  const [cameraOpen, setCameraOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState<String | null>(null);
  const cameraRef = useRef<Camera>(null);

  const openCamera = () => {
    setCameraOpen(true);
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const data = await cameraRef.current.takePhoto();
      setCapturedImage(data.path);
    }
  };

  const retakePicture = () => {
    setCapturedImage(null);
  };

  const doneCapture = () => {
    setCameraOpen(false);
  };

  const [cameraPermission, setCameraPermission] = useState<CameraPermissionStatus>();
  const [microphonePermission, setMicrophonePermission] = useState<CameraPermissionStatus>();

  useEffect(() => {
    Camera.getCameraPermissionStatus().then(setCameraPermission);
    Camera.getMicrophonePermissionStatus().then(setMicrophonePermission);
  }, []);

  if (device == null) return null;

  return (
    <View style={styles.container}>
      {cameraOpen ? (
        <View style={styles.cameraContainer}>
          <Camera
            ref={cameraRef}
            style={styles.camera}
            device={device}
            isActive={true}
            photo={true}
          />
          {!capturedImage ? (
            <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
              <View style={styles.innerButton} />
            </TouchableOpacity>
          ) : (
            <View style={styles.captureActions}>
              <TouchableOpacity style={styles.retakeButton} onPress={retakePicture}>
                <Text style={styles.buttonText}>Retake</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.doneButton} onPress={doneCapture}>
                <Text style={styles.buttonText}>Done</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      ) : (
        <TouchableOpacity style={styles.openCameraButton} onPress={openCamera}>
          <Text style={styles.buttonText}>Open Camera</Text>
        </TouchableOpacity>
      )}
      {capturedImage && (
        <View style={styles.preview}>
          <Image style={styles.previewImage} source={{ uri: `file://${capturedImage}` }} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  openCameraButton: {
    width: 200,
    height: 50,
    borderRadius: 8,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  cameraContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  camera: {
    flex: 1,
  },
  captureButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 32,
    alignSelf: 'center',
  },
  innerButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
  },
  captureActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 32,
  },
  retakeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginRight: 16,
  },
  doneButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  preview: {
    width: '100%',
    height: 200,
    marginTop: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default CameraPage;
